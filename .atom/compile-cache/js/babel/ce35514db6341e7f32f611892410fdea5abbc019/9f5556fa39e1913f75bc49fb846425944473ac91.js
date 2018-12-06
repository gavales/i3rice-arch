'use babel';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _require = require('atom');

var BufferedProcess = _require.BufferedProcess;

var settings = require('./settings');
var VimState = require('./vim-state');

// NOTE: changing order affects output of lib/json/command-table.json
var VMPOperationFiles = ['./operator', './operator-insert', './operator-transform-string', './motion', './motion-search', './text-object', './misc-command'];

// Borrowed from underscore-plus
var ModifierKeyMap = {
  'ctrl-cmd-': '⌃⌘',
  'cmd-': '⌘',
  'ctrl-': '⌃',
  alt: '⌥',
  option: '⌥',
  enter: '⏎',
  left: '←',
  right: '→',
  up: '↑',
  down: '↓',
  backspace: 'BS',
  space: 'SPC'
};

var SelectorMap = {
  'atom-text-editor.vim-mode-plus': '',
  '.normal-mode': 'n',
  '.insert-mode': 'i',
  '.replace': 'R',
  '.visual-mode': 'v',
  '.characterwise': 'C',
  '.blockwise': 'B',
  '.linewise': 'L',
  '.operator-pending-mode': 'o',
  '.with-count': '#',
  '.has-persistent-selection': '%'
};

var Developer = (function () {
  function Developer() {
    _classCallCheck(this, Developer);
  }

  _createClass(Developer, [{
    key: 'init',
    value: function init() {
      var _this = this;

      return atom.commands.add('atom-text-editor', {
        'vim-mode-plus:toggle-debug': function vimModePlusToggleDebug() {
          return _this.toggleDebug();
        },
        'vim-mode-plus:open-in-vim': function vimModePlusOpenInVim() {
          return _this.openInVim();
        },
        'vim-mode-plus:generate-command-summary-table': function vimModePlusGenerateCommandSummaryTable() {
          return _this.generateCommandSummaryTable();
        },
        'vim-mode-plus:write-command-table-and-file-table-to-disk': function vimModePlusWriteCommandTableAndFileTableToDisk() {
          return _this.writeCommandTableAndFileTableToDisk();
        },
        'vim-mode-plus:set-global-vim-state': function vimModePlusSetGlobalVimState() {
          return _this.setGlobalVimState();
        },
        'vim-mode-plus:clear-debug-output': function vimModePlusClearDebugOutput() {
          return _this.clearDebugOutput();
        },
        'vim-mode-plus:reload': function vimModePlusReload() {
          return _this.reload();
        },
        'vim-mode-plus:reload-with-dependencies': function vimModePlusReloadWithDependencies() {
          return _this.reload(true);
        },
        'vim-mode-plus:report-total-marker-count': function vimModePlusReportTotalMarkerCount() {
          return _this.reportTotalMarkerCount();
        },
        'vim-mode-plus:report-total-and-per-editor-marker-count': function vimModePlusReportTotalAndPerEditorMarkerCount() {
          return _this.reportTotalMarkerCount(true);
        },
        'vim-mode-plus:report-require-cache': function vimModePlusReportRequireCache() {
          return _this.reportRequireCache({ excludeNodModules: true });
        },
        'vim-mode-plus:report-require-cache-all': function vimModePlusReportRequireCacheAll() {
          return _this.reportRequireCache({ excludeNodModules: false });
        }
      });
    }
  }, {
    key: 'setGlobalVimState',
    value: function setGlobalVimState() {
      global.vimState = VimState.get(atom.workspace.getActiveTextEditor());
      console.log('set global.vimState for debug', global.vimState);
    }
  }, {
    key: 'reportRequireCache',
    value: function reportRequireCache(_ref) {
      var focus = _ref.focus;
      var excludeNodModules = _ref.excludeNodModules;

      var path = require('path');
      var packPath = atom.packages.getLoadedPackage('vim-mode-plus').path;
      var cachedPaths = Object.keys(require.cache).filter(function (p) {
        return p.startsWith(packPath + path.sep);
      }).map(function (p) {
        return p.replace(packPath, '');
      });

      for (var cachedPath of cachedPaths) {
        if (excludeNodModules && cachedPath.search(/node_modules/) >= 0) {
          continue;
        }
        if (focus && cachedPath.search(new RegExp('' + focus)) >= 0) {
          cachedPath = '*' + cachedPath;
        }
        console.log(cachedPath);
      }
    }
  }, {
    key: 'reportTotalMarkerCount',
    value: function reportTotalMarkerCount() {
      var showEditorsReport = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      var _require2 = require('util');

      var inspect = _require2.inspect;

      var _require3 = require('path');

      var basename = _require3.basename;

      var total = {
        mark: 0,
        hlsearch: 0,
        mutation: 0,
        occurrence: 0,
        persistentSel: 0
      };

      for (var editor of atom.workspace.getTextEditors()) {
        var vimState = VimState.get(editor);
        var mark = vimState.mark.markerLayer.getMarkerCount();
        var hlsearch = vimState.highlightSearch.markerLayer.getMarkerCount();
        var mutation = vimState.mutationManager.markerLayer.getMarkerCount();
        var occurrence = vimState.occurrenceManager.markerLayer.getMarkerCount();
        var persistentSel = vimState.persistentSelection.markerLayer.getMarkerCount();
        if (showEditorsReport) {
          console.log(basename(editor.getPath()), inspect({ mark: mark, hlsearch: hlsearch, mutation: mutation, occurrence: occurrence, persistentSel: persistentSel }));
        }

        total.mark += mark;
        total.hlsearch += hlsearch;
        total.mutation += mutation;
        total.occurrence += occurrence;
        total.persistentSel += persistentSel;
      }

      return console.log('total', inspect(total));
    }
  }, {
    key: 'reload',
    value: _asyncToGenerator(function* (reloadDependencies) {
      function deleteRequireCacheForPathPrefix(prefix) {
        Object.keys(require.cache).filter(function (p) {
          return p.startsWith(prefix);
        }).forEach(function (p) {
          return delete require.cache[p];
        });
      }

      var packagesNeedReload = ['vim-mode-plus'];
      if (reloadDependencies) packagesNeedReload.push.apply(packagesNeedReload, _toConsumableArray(settings.get('devReloadPackages')));

      var loadedPackages = packagesNeedReload.filter(function (packName) {
        return atom.packages.isPackageLoaded(packName);
      });
      console.log('reload', loadedPackages);

      var pathSeparator = require('path').sep;

      for (var packName of loadedPackages) {
        console.log('- deactivating ' + packName);
        var packPath = atom.packages.getLoadedPackage(packName).path;
        yield atom.packages.deactivatePackage(packName);
        atom.packages.unloadPackage(packName);
        deleteRequireCacheForPathPrefix(packPath + pathSeparator);
      }
      console.time('activate');

      loadedPackages.forEach(function (packName) {
        console.log('+ activating ' + packName);
        atom.packages.loadPackage(packName);
        atom.packages.activatePackage(packName);
      });

      console.timeEnd('activate');
    })
  }, {
    key: 'clearDebugOutput',
    value: function clearDebugOutput(name, fn) {
      var _require4 = require('fs-plus');

      var normalize = _require4.normalize;

      var filePath = normalize(settings.get('debugOutputFilePath'));
      atom.workspace.open(filePath, { searchAllPanes: true, activatePane: false }).then(function (editor) {
        editor.setText('');
        editor.save();
      });
    }
  }, {
    key: 'toggleDebug',
    value: function toggleDebug() {
      settings.set('debug', !settings.get('debug'));
      console.log(settings.scope + ' debug:', settings.get('debug'));
    }
  }, {
    key: 'getCommandSpecs',
    value: function getCommandSpecs() {
      var _require5 = require('underscore-plus');

      var escapeRegExp = _require5.escapeRegExp;

      var _require6 = require('./utils');

      var getKeyBindingForCommand = _require6.getKeyBindingForCommand;

      var specs = [];
      for (var file of VMPOperationFiles) {
        for (var klass of Object.values(require(file))) {
          if (!klass.isCommand()) continue;

          var commandName = klass.getCommandName();

          var keymaps = getKeyBindingForCommand(commandName, { packageName: 'vim-mode-plus' });
          var keymap = keymaps ? keymaps.map(function (k) {
            return '`' + compactSelector(k.selector) + '` <code>' + compactKeystrokes(k.keystrokes) + '</code>';
          }).join('<br/>') : undefined;

          specs.push({
            name: klass.name,
            commandName: commandName,
            kind: klass.operationKind,
            keymap: keymap
          });
        }
      }

      return specs;

      function compactSelector(selector) {
        var sources = Object.keys(SelectorMap).map(escapeRegExp);
        var regex = new RegExp('(' + sources.join('|') + ')', 'g');
        return selector.split(/,\s*/g).map(function (scope) {
          return scope.replace(/:not\((.*?)\)/g, '!$1').replace(regex, function (s) {
            return SelectorMap[s];
          });
        }).join(',');
      }

      function compactKeystrokes(keystrokes) {
        var specialChars = '\\`*_{}[]()#+-.!';

        var modifierKeyRegexSources = Object.keys(ModifierKeyMap).map(escapeRegExp);
        var modifierKeyRegex = new RegExp('(' + modifierKeyRegexSources.join('|') + ')');
        var specialCharsRegexSources = specialChars.split('').map(escapeRegExp);
        var specialCharsRegex = new RegExp('(' + specialCharsRegexSources.join('|') + ')', 'g');

        return keystrokes
        // .replace(/(`|_)/g, '\\$1')
        .replace(modifierKeyRegex, function (s) {
          return ModifierKeyMap[s];
        }).replace(specialCharsRegex, '\\$1').replace(/\|/g, '&#124;').replace(/\s+/, '');
      }
    }
  }, {
    key: 'generateSummaryTableForCommandSpecs',
    value: function generateSummaryTableForCommandSpecs(specs) {
      var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var header = _ref2.header;

      var grouped = {};
      for (var spec of specs) {
        if (!grouped[spec.kind]) grouped[spec.kind] = [];

        grouped[spec.kind].push(spec);
      }

      var result = '';
      var OPERATION_KINDS = ['operator', 'motion', 'text-object', 'misc-command'];

      for (var kind of OPERATION_KINDS) {
        var _specs = grouped[kind];
        if (!_specs) continue;

        // prettier-ignore
        var table = ['| Keymap | Command | Description |', '|:-------|:--------|:------------|'];

        for (var _ref32 of _specs) {
          var _ref3$keymap = _ref32.keymap;
          var keymap = _ref3$keymap === undefined ? '' : _ref3$keymap;
          var commandName = _ref32.commandName;
          var _ref3$description = _ref32.description;
          var description = _ref3$description === undefined ? '' : _ref3$description;

          commandName = commandName.replace(/vim-mode-plus:/, '');
          table.push('| ' + keymap + ' | `' + commandName + '` | ' + description + ' |');
        }
        result += '## ' + kind + '\n\n' + table.join('\n') + '\n\n';
      }

      atom.workspace.open().then(function (editor) {
        if (header) editor.insertText(header + '\n\n');
        editor.insertText(result);
      });
    }
  }, {
    key: 'generateCommandSummaryTable',
    value: function generateCommandSummaryTable() {
      var _require7 = require('./utils');

      var removeIndent = _require7.removeIndent;

      var header = removeIndent('\n      ## Keymap selector abbreviations\n\n      In this document, following abbreviations are used for shortness.\n\n      | Abbrev | Selector                     | Description                         |\n      |:-------|:-----------------------------|:------------------------------------|\n      | `!i`   | `:not(.insert-mode)`         | except insert-mode                  |\n      | `i`    | `.insert-mode`               |                                     |\n      | `o`    | `.operator-pending-mode`     |                                     |\n      | `n`    | `.normal-mode`               |                                     |\n      | `v`    | `.visual-mode`               |                                     |\n      | `vB`   | `.visual-mode.blockwise`     |                                     |\n      | `vL`   | `.visual-mode.linewise`      |                                     |\n      | `vC`   | `.visual-mode.characterwise` |                                     |\n      | `iR`   | `.insert-mode.replace`       |                                     |\n      | `#`    | `.with-count`                | when count is specified             |\n      | `%`    | `.has-persistent-selection`  | when persistent-selection is exists |\n      ');

      this.generateSummaryTableForCommandSpecs(this.getCommandSpecs(), { header: header });
    }
  }, {
    key: 'openInVim',
    value: function openInVim() {
      var editor = atom.workspace.getActiveTextEditor();

      var _editor$getCursorBufferPosition = editor.getCursorBufferPosition();

      var row = _editor$getCursorBufferPosition.row;
      var column = _editor$getCursorBufferPosition.column;

      // e.g. /Applications/MacVim.app/Contents/MacOS/Vim -g /etc/hosts "+call cursor(4, 3)"
      return new BufferedProcess({
        command: '/Applications/MacVim.app/Contents/MacOS/Vim',
        args: ['-g', editor.getPath(), '+call cursor(' + (row + 1) + ', ' + (column + 1) + ')']
      });
    }
  }, {
    key: 'buildCommandTableAndFileTable',
    value: function buildCommandTableAndFileTable() {
      var fileTable = {};
      var commandTable = [];
      var seen = {}; // Just to detect duplicate name

      for (var file of VMPOperationFiles) {
        fileTable[file] = [];

        for (var klass of Object.values(require(file))) {
          if (seen[klass.name]) {
            throw new Error('Duplicate class ' + klass.name + ' in "' + file + '" and "' + seen[klass.name] + '"');
          }
          seen[klass.name] = file;
          fileTable[file].push(klass.name);
          if (klass.isCommand()) commandTable.push(klass.getCommandName());
        }
      }
      return { commandTable: commandTable, fileTable: fileTable };
    }

    // # How vmp commands become available?
    // #========================================
    // Vmp have many commands, loading full commands at startup slow down pkg activation.
    // So vmp load summary command table at startup then lazy require command body on-use timing.
    // Here is how vmp commands are registerd and invoked.
    // Initially introduced in PR #758
    //
    // 1. [On dev]: Preparation done by developer
    //   - Invoking `Vim Mode Plus:Write Command Table And File Table To Disk`. it does following.
    //   - "./json/command-table.json" and "./json/file-table.json". are updated.
    //
    // 2. [On atom/vmp startup]
    //   - Register commands(e.g. `move-down`) from "./json/command-table.json".
    //
    // 3. [On run time]: e.g. Invoke `move-down` by `j` keystroke
    //   - Fire `move-down` command.
    //   - It execute `vimState.operationStack.run("MoveDown")`
    //   - Determine files to require from "./json/file-table.json".
    //   - Load `MoveDown` class by require('./motions') and run it!
    //
  }, {
    key: 'writeCommandTableAndFileTableToDisk',
    value: _asyncToGenerator(function* () {
      var fs = require('fs-plus');
      var path = require('path');

      var _buildCommandTableAndFileTable = this.buildCommandTableAndFileTable();

      var commandTable = _buildCommandTableAndFileTable.commandTable;
      var fileTable = _buildCommandTableAndFileTable.fileTable;

      var getStateFor = function getStateFor(baseName, object, pretty) {
        var filePath = path.join(__dirname, 'json', baseName) + (pretty ? '-pretty.json' : '.json');
        var jsonString = pretty ? JSON.stringify(object, null, '  ') : JSON.stringify(object);
        var needUpdate = fs.readFileSync(filePath, 'utf8').trimRight() !== jsonString;
        return { filePath: filePath, jsonString: jsonString, needUpdate: needUpdate };
      };

      var statesNeedUpdate = [getStateFor('command-table', commandTable, false), getStateFor('command-table', commandTable, true), getStateFor('file-table', fileTable, false), getStateFor('file-table', fileTable, true)].filter(function (state) {
        return state.needUpdate;
      });

      if (!statesNeedUpdate.length) {
        atom.notifications.addInfo('No changfes in commandTable and fileTable', { dismissable: true });
        return;
      }

      var _loop = function* (_ref4) {
        var jsonString = _ref4.jsonString;
        var filePath = _ref4.filePath;

        yield atom.workspace.open(filePath, { activatePane: false, activateItem: false }).then(function (editor) {
          editor.setText(jsonString);
          return editor.save().then(function () {
            atom.notifications.addInfo('Updated ' + path.basename(filePath), { dismissable: true });
          });
        });
      };

      for (var _ref4 of statesNeedUpdate) {
        yield* _loop(_ref4);
      }
    })
  }]);

  return Developer;
})();

module.exports = new Developer();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2dhdmFyY2gvLmF0b20vcGFja2FnZXMvdmltLW1vZGUtcGx1cy9saWIvZGV2ZWxvcGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQTs7Ozs7Ozs7OztlQUVlLE9BQU8sQ0FBQyxNQUFNLENBQUM7O0lBQWxDLGVBQWUsWUFBZixlQUFlOztBQUV0QixJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDdEMsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBOzs7QUFHdkMsSUFBTSxpQkFBaUIsR0FBRyxDQUN4QixZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLDZCQUE2QixFQUM3QixVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixnQkFBZ0IsQ0FDakIsQ0FBQTs7O0FBR0QsSUFBTSxjQUFjLEdBQUc7QUFDckIsYUFBVyxFQUFFLElBQWM7QUFDM0IsUUFBTSxFQUFFLEdBQVE7QUFDaEIsU0FBTyxFQUFFLEdBQVE7QUFDakIsS0FBRyxFQUFFLEdBQVE7QUFDYixRQUFNLEVBQUUsR0FBUTtBQUNoQixPQUFLLEVBQUUsR0FBUTtBQUNmLE1BQUksRUFBRSxHQUFRO0FBQ2QsT0FBSyxFQUFFLEdBQVE7QUFDZixJQUFFLEVBQUUsR0FBUTtBQUNaLE1BQUksRUFBRSxHQUFRO0FBQ2QsV0FBUyxFQUFFLElBQUk7QUFDZixPQUFLLEVBQUUsS0FBSztDQUNiLENBQUE7O0FBRUQsSUFBTSxXQUFXLEdBQUc7QUFDbEIsa0NBQWdDLEVBQUUsRUFBRTtBQUNwQyxnQkFBYyxFQUFFLEdBQUc7QUFDbkIsZ0JBQWMsRUFBRSxHQUFHO0FBQ25CLFlBQVUsRUFBRSxHQUFHO0FBQ2YsZ0JBQWMsRUFBRSxHQUFHO0FBQ25CLGtCQUFnQixFQUFFLEdBQUc7QUFDckIsY0FBWSxFQUFFLEdBQUc7QUFDakIsYUFBVyxFQUFFLEdBQUc7QUFDaEIsMEJBQXdCLEVBQUUsR0FBRztBQUM3QixlQUFhLEVB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SSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsMkNBQTJDLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtBQUM1RixlQUFNO09BQ1A7OztZQUVXLFVBQVUsU0FBVixVQUFVO1lBQUUsUUFBUSxTQUFSLFFBQVE7O0FBQzlCLGNBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDN0YsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDMUIsaUJBQU8sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQzlCLGdCQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sY0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFJLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7V0FDdEYsQ0FBQyxDQUFBO1NBQ0gsQ0FBQyxDQUFBOzs7QUFOSix3QkFBcUMsZ0JBQWdCLEVBQUU7O09BT3REO0tBQ0Y7OztTQS9URyxTQUFTOzs7QUFrVWYsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFBIiwiZmlsZSI6Ii9ob21lL2dhdmFyY2gvLmF0b20vcGFja2FnZXMvdmltLW1vZGUtcGx1cy9saWIvZGV2ZWxvcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCdcblxuY29uc3Qge0J1ZmZlcmVkUHJvY2Vzc30gPSByZXF1aXJlKCdhdG9tJylcblxuY29uc3Qgc2V0dGluZ3MgPSByZXF1aXJlKCcuL3NldHRpbmdzJylcbmNvbnN0IFZpbVN0YXRlID0gcmVxdWlyZSgnLi92aW0tc3RhdGUnKVxuXG4vLyBOT1RFOiBjaGFuZ2luZyBvcmRlciBhZmZlY3RzIG91dHB1dCBvZiBsaWIvanNvbi9jb21tYW5kLXRhYmxlLmpzb25cbmNvbnN0IFZNUE9wZXJhdGlvbkZpbGVzID0gW1xuICAnLi9vcGVyYXRvcicsXG4gICcuL29wZXJhdG9yLWluc2VydCcsXG4gICcuL29wZXJhdG9yLXRyYW5zZm9ybS1zdHJpbmcnLFxuICAnLi9tb3Rpb24nLFxuICAnLi9tb3Rpb24tc2VhcmNoJyxcbiAgJy4vdGV4dC1vYmplY3QnLFxuICAnLi9taXNjLWNvbW1hbmQnXG5dXG5cbi8vIEJvcnJvd2VkIGZyb20gdW5kZXJzY29yZS1wbHVzXG5jb25zdCBNb2RpZmllcktleU1hcCA9IHtcbiAgJ2N0cmwtY21kLSc6ICdcXHUyMzAzXFx1MjMxOCcsXG4gICdjbWQtJzogJ1xcdTIzMTgnLFxuICAnY3RybC0nOiAnXFx1MjMwMycsXG4gIGFsdDogJ1xcdTIzMjUnLFxuICBvcHRpb246ICdcXHUyMzI1JyxcbiAgZW50ZXI6ICdcXHUyM2NlJyxcbiAgbGVmdDogJ1xcdTIxOTAnLFxuICByaWdodDogJ1xcdTIxOTInLFxuICB1cDogJ1xcdTIxOTEnLFxuICBkb3duOiAnXFx1MjE5MycsXG4gIGJhY2tzcGFjZTogJ0JTJyxcbiAgc3BhY2U6ICdTUEMnXG59XG5cbmNvbnN0IFNlbGVjdG9yTWFwID0ge1xuICAnYXRvbS10ZXh0LWVkaXRvci52aW0tbW9kZS1wbHVzJzogJycsXG4gICcubm9ybWFsLW1vZGUnOiAnbicsXG4gICcuaW5zZXJ0LW1vZGUnOiAnaScsXG4gICcucmVwbGFjZSc6ICdSJyxcbiAgJy52aXN1YWwtbW9kZSc6ICd2JyxcbiAgJy5jaGFyYWN0ZXJ3aXNlJzogJ0MnLFxuICAnLmJsb2Nrd2lzZSc6ICdCJyxcbiAgJy5saW5ld2lzZSc6ICdMJyxcbiAgJy5vcGVyYXRvci1wZW5kaW5nLW1vZGUnOiAnbycsXG4gICcud2l0aC1jb3VudCc6ICcjJyxcbiAgJy5oYXMtcGVyc2lzdGVudC1zZWxlY3Rpb24nOiAnJSdcbn1cblxuY2xhc3MgRGV2ZWxvcGVyIHtcbiAgaW5pdCAoKSB7XG4gICAgcmV0dXJuIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXRleHQtZWRpdG9yJywge1xuICAgICAgJ3ZpbS1tb2RlLXBsdXM6dG9nZ2xlLWRlYnVnJzogKCkgPT4gdGhpcy50b2dnbGVEZWJ1ZygpLFxuICAgICAgJ3ZpbS1tb2RlLXBsdXM6b3Blbi1pbi12aW0nOiAoKSA9PiB0aGlzLm9wZW5JblZpbSgpLFxuICAgICAgJ3ZpbS1tb2RlLXBsdXM6Z2VuZXJhdGUtY29tbWFuZC1zdW1tYXJ5LXRhYmxlJzogKCkgPT4gdGhpcy5nZW5lcmF0ZUNvbW1hbmRTdW1tYXJ5VGFibGUoKSxcbiAgICAgICd2aW0tbW9kZS1wbHVzOndyaXRlLWNvbW1hbmQtdGFibGUtYW5kLWZpbGUtdGFibGUtdG8tZGlzayc6ICgpID0+IHRoaXMud3JpdGVDb21tYW5kVGFibGVBbmRGaWxlVGFibGVUb0Rpc2soKSxcbiAgICAgICd2aW0tbW9kZS1wbHVzOnNldC1nbG9iYWwtdmltLXN0YXRlJzogKCkgPT4gdGhpcy5zZXRHbG9iYWxWaW1TdGF0ZSgpLFxuICAgICAgJ3ZpbS1tb2RlLXBsdXM6Y2xlYXItZGVidWctb3V0cHV0JzogKCkgPT4gdGhpcy5jbGVhckRlYnVnT3V0cHV0KCksXG4gICAgICAndmltLW1vZGUtcGx1czpyZWxvYWQnOiAoKSA9PiB0aGlzLnJlbG9hZCgpLFxuICAgICAgJ3ZpbS1tb2RlLXBsdXM6cmVsb2FkLXdpdGgtZGVwZW5kZW5jaWVzJzogKCkgPT4gdGhpcy5yZWxvYWQodHJ1ZSksXG4gICAgICAndmltLW1vZGUtcGx1czpyZXBvcnQtdG90YWwtbWFya2VyLWNvdW50JzogKCkgPT4gdGhpcy5yZXBvcnRUb3RhbE1hcmtlckNvdW50KCksXG4gICAgICAndmltLW1vZGUtcGx1czpyZXBvcnQtdG90YWwtYW5kLXBlci1lZGl0b3ItbWFya2VyLWNvdW50JzogKCkgPT4gdGhpcy5yZXBvcnRUb3RhbE1hcmtlckNvdW50KHRydWUpLFxuICAgICAgJ3ZpbS1tb2RlLXBsdXM6cmVwb3J0LXJlcXVpcmUtY2FjaGUnOiAoKSA9PiB0aGlzLnJlcG9ydFJlcXVpcmVDYWNoZSh7ZXhjbHVkZU5vZE1vZHVsZXM6IHRydWV9KSxcbiAgICAgICd2aW0tbW9kZS1wbHVzOnJlcG9ydC1yZXF1aXJlLWNhY2hlLWFsbCc6ICgpID0+IHRoaXMucmVwb3J0UmVxdWlyZUNhY2hlKHtleGNsdWRlTm9kTW9kdWxlczogZmFsc2V9KVxuICAgIH0pXG4gIH1cblxuICBzZXRHbG9iYWxWaW1TdGF0ZSAoKSB7XG4gICAgZ2xvYmFsLnZpbVN0YXRlID0gVmltU3RhdGUuZ2V0KGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKSlcbiAgICBjb25zb2xlLmxvZygnc2V0IGdsb2JhbC52aW1TdGF0ZSBmb3IgZGVidWcnLCBnbG9iYWwudmltU3RhdGUpXG4gIH1cblxuICByZXBvcnRSZXF1aXJlQ2FjaGUgKHtmb2N1cywgZXhjbHVkZU5vZE1vZHVsZXN9KSB7XG4gICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuICAgIGNvbnN0IHBhY2tQYXRoID0gYXRvbS5wYWNrYWdlcy5nZXRMb2FkZWRQYWNrYWdlKCd2aW0tbW9kZS1wbHVzJykucGF0aFxuICAgIGNvbnN0IGNhY2hlZFBhdGhzID0gT2JqZWN0LmtleXMocmVxdWlyZS5jYWNoZSlcbiAgICAgIC5maWx0ZXIocCA9PiBwLnN0YXJ0c1dpdGgocGFja1BhdGggKyBwYXRoLnNlcCkpXG4gICAgICAubWFwKHAgPT4gcC5yZXBsYWNlKHBhY2tQYXRoLCAnJykpXG5cbiAgICBmb3IgKGxldCBjYWNoZWRQYXRoIG9mIGNhY2hlZFBhdGhzKSB7XG4gICAgICBpZiAoZXhjbHVkZU5vZE1vZHVsZXMgJiYgY2FjaGVkUGF0aC5zZWFyY2goL25vZGVfbW9kdWxlcy8pID49IDApIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGlmIChmb2N1cyAmJiBjYWNoZWRQYXRoLnNlYXJjaChuZXcgUmVnRXhwKGAke2ZvY3VzfWApKSA+PSAwKSB7XG4gICAgICAgIGNhY2hlZFBhdGggPSBgKiR7Y2FjaGVkUGF0aH1gXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhjYWNoZWRQYXRoKVxuICAgIH1cbiAgfVxuXG4gIHJlcG9ydFRvdGFsTWFya2VyQ291bnQgKHNob3dFZGl0b3JzUmVwb3J0ID0gZmFsc2UpIHtcbiAgICBjb25zdCB7aW5zcGVjdH0gPSByZXF1aXJlKCd1dGlsJylcbiAgICBjb25zdCB7YmFzZW5hbWV9ID0gcmVxdWlyZSgncGF0aCcpXG4gICAgY29uc3QgdG90YWwgPSB7XG4gICAgICBtYXJrOiAwLFxuICAgICAgaGxzZWFyY2g6IDAsXG4gICAgICBtdXRhdGlvbjogMCxcbiAgICAgIG9jY3VycmVuY2U6IDAsXG4gICAgICBwZXJzaXN0ZW50U2VsOiAwXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBlZGl0b3Igb2YgYXRvbS53b3Jrc3BhY2UuZ2V0VGV4dEVkaXRvcnMoKSkge1xuICAgICAgY29uc3QgdmltU3RhdGUgPSBWaW1TdGF0ZS5nZXQoZWRpdG9yKVxuICAgICAgY29uc3QgbWFyayA9IHZpbVN0YXRlLm1hcmsubWFya2VyTGF5ZXIuZ2V0TWFya2VyQ291bnQoKVxuICAgICAgY29uc3QgaGxzZWFyY2ggPSB2aW1TdGF0ZS5oaWdobGlnaHRTZWFyY2gubWFya2VyTGF5ZXIuZ2V0TWFya2VyQ291bnQoKVxuICAgICAgY29uc3QgbXV0YXRpb24gPSB2aW1TdGF0ZS5tdXRhdGlvbk1hbmFnZXIubWFya2VyTGF5ZXIuZ2V0TWFya2VyQ291bnQoKVxuICAgICAgY29uc3Qgb2NjdXJyZW5jZSA9IHZpbVN0YXRlLm9jY3VycmVuY2VNYW5hZ2VyLm1hcmtlckxheWVyLmdldE1hcmtlckNvdW50KClcbiAgICAgIGNvbnN0IHBlcnNpc3RlbnRTZWwgPSB2aW1TdGF0ZS5wZXJzaXN0ZW50U2VsZWN0aW9uLm1hcmtlckxheWVyLmdldE1hcmtlckNvdW50KClcbiAgICAgIGlmIChzaG93RWRpdG9yc1JlcG9ydCkge1xuICAgICAgICBjb25zb2xlLmxvZyhiYXNlbmFtZShlZGl0b3IuZ2V0UGF0aCgpKSwgaW5zcGVjdCh7bWFyaywgaGxzZWFyY2gsIG11dGF0aW9uLCBvY2N1cnJlbmNlLCBwZXJzaXN0ZW50U2VsfSkpXG4gICAgICB9XG5cbiAgICAgIHRvdGFsLm1hcmsgKz0gbWFya1xuICAgICAgdG90YWwuaGxzZWFyY2ggKz0gaGxzZWFyY2hcbiAgICAgIHRvdGFsLm11dGF0aW9uICs9IG11dGF0aW9uXG4gICAgICB0b3RhbC5vY2N1cnJlbmNlICs9IG9jY3VycmVuY2VcbiAgICAgIHRvdGFsLnBlcnNpc3RlbnRTZWwgKz0gcGVyc2lzdGVudFNlbFxuICAgIH1cblxuICAgIHJldHVybiBjb25zb2xlLmxvZygndG90YWwnLCBpbnNwZWN0KHRvdGFsKSlcbiAgfVxuXG4gIGFzeW5jIHJlbG9hZCAocmVsb2FkRGVwZW5kZW5jaWVzKSB7XG4gICAgZnVuY3Rpb24gZGVsZXRlUmVxdWlyZUNhY2hlRm9yUGF0aFByZWZpeCAocHJlZml4KSB7XG4gICAgICBPYmplY3Qua2V5cyhyZXF1aXJlLmNhY2hlKVxuICAgICAgICAuZmlsdGVyKHAgPT4gcC5zdGFydHNXaXRoKHByZWZpeCkpXG4gICAgICAgIC5mb3JFYWNoKHAgPT4gZGVsZXRlIHJlcXVpcmUuY2FjaGVbcF0pXG4gICAgfVxuXG4gICAgY29uc3QgcGFja2FnZXNOZWVkUmVsb2FkID0gWyd2aW0tbW9kZS1wbHVzJ11cbiAgICBpZiAocmVsb2FkRGVwZW5kZW5jaWVzKSBwYWNrYWdlc05lZWRSZWxvYWQucHVzaCguLi5zZXR0aW5ncy5nZXQoJ2RldlJlbG9hZFBhY2thZ2VzJykpXG5cbiAgICBjb25zdCBsb2FkZWRQYWNrYWdlcyA9IHBhY2thZ2VzTmVlZFJlbG9hZC5maWx0ZXIocGFja05hbWUgPT4gYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VMb2FkZWQocGFja05hbWUpKVxuICAgIGNvbnNvbGUubG9nKCdyZWxvYWQnLCBsb2FkZWRQYWNrYWdlcylcblxuICAgIGNvbnN0IHBhdGhTZXBhcmF0b3IgPSByZXF1aXJlKCdwYXRoJykuc2VwXG5cbiAgICBmb3IgKGNvbnN0IHBhY2tOYW1lIG9mIGxvYWRlZFBhY2thZ2VzKSB7XG4gICAgICBjb25zb2xlLmxvZyhgLSBkZWFjdGl2YXRpbmcgJHtwYWNrTmFtZX1gKVxuICAgICAgY29uc3QgcGFja1BhdGggPSBhdG9tLnBhY2thZ2VzLmdldExvYWRlZFBhY2thZ2UocGFja05hbWUpLnBhdGhcbiAgICAgIGF3YWl0IGF0b20ucGFja2FnZXMuZGVhY3RpdmF0ZVBhY2thZ2UocGFja05hbWUpXG4gICAgICBhdG9tLnBhY2thZ2VzLnVubG9hZFBhY2thZ2UocGFja05hbWUpXG4gICAgICBkZWxldGVSZXF1aXJlQ2FjaGVGb3JQYXRoUHJlZml4KHBhY2tQYXRoICsgcGF0aFNlcGFyYXRvcilcbiAgICB9XG4gICAgY29uc29sZS50aW1lKCdhY3RpdmF0ZScpXG5cbiAgICBsb2FkZWRQYWNrYWdlcy5mb3JFYWNoKHBhY2tOYW1lID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGArIGFjdGl2YXRpbmcgJHtwYWNrTmFtZX1gKVxuICAgICAgYXRvbS5wYWNrYWdlcy5sb2FkUGFja2FnZShwYWNrTmFtZSlcbiAgICAgIGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKHBhY2tOYW1lKVxuICAgIH0pXG5cbiAgICBjb25zb2xlLnRpbWVFbmQoJ2FjdGl2YXRlJylcbiAgfVxuXG4gIGNsZWFyRGVidWdPdXRwdXQgKG5hbWUsIGZuKSB7XG4gICAgY29uc3Qge25vcm1hbGl6ZX0gPSByZXF1aXJlKCdmcy1wbHVzJylcbiAgICBjb25zdCBmaWxlUGF0aCA9IG5vcm1hbGl6ZShzZXR0aW5ncy5nZXQoJ2RlYnVnT3V0cHV0RmlsZVBhdGgnKSlcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGZpbGVQYXRoLCB7c2VhcmNoQWxsUGFuZXM6IHRydWUsIGFjdGl2YXRlUGFuZTogZmFsc2V9KS50aGVuKGVkaXRvciA9PiB7XG4gICAgICBlZGl0b3Iuc2V0VGV4dCgnJylcbiAgICAgIGVkaXRvci5zYXZlKClcbiAgICB9KVxuICB9XG5cbiAgdG9nZ2xlRGVidWcgKCkge1xuICAgIHNldHRpbmdzLnNldCgnZGVidWcnLCAhc2V0dGluZ3MuZ2V0KCdkZWJ1ZycpKVxuICAgIGNvbnNvbGUubG9nKGAke3NldHRpbmdzLnNjb3BlfSBkZWJ1ZzpgLCBzZXR0aW5ncy5nZXQoJ2RlYnVnJykpXG4gIH1cblxuICBnZXRDb21tYW5kU3BlY3MgKCkge1xuICAgIGNvbnN0IHtlc2NhcGVSZWdFeHB9ID0gcmVxdWlyZSgndW5kZXJzY29yZS1wbHVzJylcbiAgICBjb25zdCB7Z2V0S2V5QmluZGluZ0ZvckNvbW1hbmR9ID0gcmVxdWlyZSgnLi91dGlscycpXG5cbiAgICBjb25zdCBzcGVjcyA9IFtdXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIFZNUE9wZXJhdGlvbkZpbGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IGtsYXNzIG9mIE9iamVjdC52YWx1ZXMocmVxdWlyZShmaWxlKSkpIHtcbiAgICAgICAgaWYgKCFrbGFzcy5pc0NvbW1hbmQoKSkgY29udGludWVcblxuICAgICAgICBjb25zdCBjb21tYW5kTmFtZSA9IGtsYXNzLmdldENvbW1hbmROYW1lKClcblxuICAgICAgICBjb25zdCBrZXltYXBzID0gZ2V0S2V5QmluZGluZ0ZvckNvbW1hbmQoY29tbWFuZE5hbWUsIHtwYWNrYWdlTmFtZTogJ3ZpbS1tb2RlLXBsdXMnfSlcbiAgICAgICAgY29uc3Qga2V5bWFwID0ga2V5bWFwc1xuICAgICAgICAgID8ga2V5bWFwc1xuICAgICAgICAgICAgICAubWFwKGsgPT4gYFxcYCR7Y29tcGFjdFNlbGVjdG9yKGsuc2VsZWN0b3IpfVxcYCA8Y29kZT4ke2NvbXBhY3RLZXlzdHJva2VzKGsua2V5c3Ryb2tlcyl9PC9jb2RlPmApXG4gICAgICAgICAgICAgIC5qb2luKCc8YnIvPicpXG4gICAgICAgICAgOiB1bmRlZmluZWRcblxuICAgICAgICBzcGVjcy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBrbGFzcy5uYW1lLFxuICAgICAgICAgIGNvbW1hbmROYW1lOiBjb21tYW5kTmFtZSxcbiAgICAgICAgICBraW5kOiBrbGFzcy5vcGVyYXRpb25LaW5kLFxuICAgICAgICAgIGtleW1hcDoga2V5bWFwXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwZWNzXG5cbiAgICBmdW5jdGlvbiBjb21wYWN0U2VsZWN0b3IgKHNlbGVjdG9yKSB7XG4gICAgICBjb25zdCBzb3VyY2VzID0gT2JqZWN0LmtleXMoU2VsZWN0b3JNYXApLm1hcChlc2NhcGVSZWdFeHApXG4gICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYCgke3NvdXJjZXMuam9pbignfCcpfSlgLCAnZycpXG4gICAgICByZXR1cm4gc2VsZWN0b3JcbiAgICAgICAgLnNwbGl0KC8sXFxzKi9nKVxuICAgICAgICAubWFwKHNjb3BlID0+IHNjb3BlLnJlcGxhY2UoLzpub3RcXCgoLio/KVxcKS9nLCAnISQxJykucmVwbGFjZShyZWdleCwgcyA9PiBTZWxlY3Rvck1hcFtzXSkpXG4gICAgICAgIC5qb2luKCcsJylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb21wYWN0S2V5c3Ryb2tlcyAoa2V5c3Ryb2tlcykge1xuICAgICAgY29uc3Qgc3BlY2lhbENoYXJzID0gJ1xcXFxgKl97fVtdKCkjKy0uISdcblxuICAgICAgY29uc3QgbW9kaWZpZXJLZXlSZWdleFNvdXJjZXMgPSBPYmplY3Qua2V5cyhNb2RpZmllcktleU1hcCkubWFwKGVzY2FwZVJlZ0V4cClcbiAgICAgIGNvbnN0IG1vZGlmaWVyS2V5UmVnZXggPSBuZXcgUmVnRXhwKGAoJHttb2RpZmllcktleVJlZ2V4U291cmNlcy5qb2luKCd8Jyl9KWApXG4gICAgICBjb25zdCBzcGVjaWFsQ2hhcnNSZWdleFNvdXJjZXMgPSBzcGVjaWFsQ2hhcnMuc3BsaXQoJycpLm1hcChlc2NhcGVSZWdFeHApXG4gICAgICBjb25zdCBzcGVjaWFsQ2hhcnNSZWdleCA9IG5ldyBSZWdFeHAoYCgke3NwZWNpYWxDaGFyc1JlZ2V4U291cmNlcy5qb2luKCd8Jyl9KWAsICdnJylcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAga2V5c3Ryb2tlc1xuICAgICAgICAgIC8vIC5yZXBsYWNlKC8oYHxfKS9nLCAnXFxcXCQxJylcbiAgICAgICAgICAucmVwbGFjZShtb2RpZmllcktleVJlZ2V4LCBzID0+IE1vZGlmaWVyS2V5TWFwW3NdKVxuICAgICAgICAgIC5yZXBsYWNlKHNwZWNpYWxDaGFyc1JlZ2V4LCAnXFxcXCQxJylcbiAgICAgICAgICAucmVwbGFjZSgvXFx8L2csICcmIzEyNDsnKVxuICAgICAgICAgIC5yZXBsYWNlKC9cXHMrLywgJycpXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVTdW1tYXJ5VGFibGVGb3JDb21tYW5kU3BlY3MgKHNwZWNzLCB7aGVhZGVyfSA9IHt9KSB7XG4gICAgY29uc3QgZ3JvdXBlZCA9IHt9XG4gICAgZm9yIChjb25zdCBzcGVjIG9mIHNwZWNzKSB7XG4gICAgICBpZiAoIWdyb3VwZWRbc3BlYy5raW5kXSkgZ3JvdXBlZFtzcGVjLmtpbmRdID0gW11cblxuICAgICAgZ3JvdXBlZFtzcGVjLmtpbmRdLnB1c2goc3BlYylcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gJydcbiAgICBjb25zdCBPUEVSQVRJT05fS0lORFMgPSBbJ29wZXJhdG9yJywgJ21vdGlvbicsICd0ZXh0LW9iamVjdCcsICdtaXNjLWNvbW1hbmQnXVxuXG4gICAgZm9yIChsZXQga2luZCBvZiBPUEVSQVRJT05fS0lORFMpIHtcbiAgICAgIGNvbnN0IHNwZWNzID0gZ3JvdXBlZFtraW5kXVxuICAgICAgaWYgKCFzcGVjcykgY29udGludWVcblxuICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICBjb25zdCB0YWJsZSA9IFtcbiAgICAgICAgJ3wgS2V5bWFwIHwgQ29tbWFuZCB8IERlc2NyaXB0aW9uIHwnLFxuICAgICAgICAnfDotLS0tLS0tfDotLS0tLS0tLXw6LS0tLS0tLS0tLS0tfCdcbiAgICAgIF1cblxuICAgICAgZm9yIChsZXQge2tleW1hcCA9ICcnLCBjb21tYW5kTmFtZSwgZGVzY3JpcHRpb24gPSAnJ30gb2Ygc3BlY3MpIHtcbiAgICAgICAgY29tbWFuZE5hbWUgPSBjb21tYW5kTmFtZS5yZXBsYWNlKC92aW0tbW9kZS1wbHVzOi8sICcnKVxuICAgICAgICB0YWJsZS5wdXNoKGB8ICR7a2V5bWFwfSB8IFxcYCR7Y29tbWFuZE5hbWV9XFxgIHwgJHtkZXNjcmlwdGlvbn0gfGApXG4gICAgICB9XG4gICAgICByZXN1bHQgKz0gYCMjICR7a2luZH1cXG5cXG5gICsgdGFibGUuam9pbignXFxuJykgKyAnXFxuXFxuJ1xuICAgIH1cblxuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oKS50aGVuKGVkaXRvciA9PiB7XG4gICAgICBpZiAoaGVhZGVyKSBlZGl0b3IuaW5zZXJ0VGV4dChoZWFkZXIgKyAnXFxuXFxuJylcbiAgICAgIGVkaXRvci5pbnNlcnRUZXh0KHJlc3VsdClcbiAgICB9KVxuICB9XG5cbiAgZ2VuZXJhdGVDb21tYW5kU3VtbWFyeVRhYmxlICgpIHtcbiAgICBjb25zdCB7cmVtb3ZlSW5kZW50fSA9IHJlcXVpcmUoJy4vdXRpbHMnKVxuICAgIGNvbnN0IGhlYWRlciA9IHJlbW92ZUluZGVudChgXG4gICAgICAjIyBLZXltYXAgc2VsZWN0b3IgYWJicmV2aWF0aW9uc1xuXG4gICAgICBJbiB0aGlzIGRvY3VtZW50LCBmb2xsb3dpbmcgYWJicmV2aWF0aW9ucyBhcmUgdXNlZCBmb3Igc2hvcnRuZXNzLlxuXG4gICAgICB8IEFiYnJldiB8IFNlbGVjdG9yICAgICAgICAgICAgICAgICAgICAgfCBEZXNjcmlwdGlvbiAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgICB8Oi0tLS0tLS18Oi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfDotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gICAgICB8IFxcYCFpXFxgICAgfCBcXGA6bm90KC5pbnNlcnQtbW9kZSlcXGAgICAgICAgICB8IGV4Y2VwdCBpbnNlcnQtbW9kZSAgICAgICAgICAgICAgICAgIHxcbiAgICAgIHwgXFxgaVxcYCAgICB8IFxcYC5pbnNlcnQtbW9kZVxcYCAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgICAgfCBcXGBvXFxgICAgIHwgXFxgLm9wZXJhdG9yLXBlbmRpbmctbW9kZVxcYCAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgICB8IFxcYG5cXGAgICAgfCBcXGAubm9ybWFsLW1vZGVcXGAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgICAgIHwgXFxgdlxcYCAgICB8IFxcYC52aXN1YWwtbW9kZVxcYCAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgICAgfCBcXGB2QlxcYCAgIHwgXFxgLnZpc3VhbC1tb2RlLmJsb2Nrd2lzZVxcYCAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgICB8IFxcYHZMXFxgICAgfCBcXGAudmlzdWFsLW1vZGUubGluZXdpc2VcXGAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgICAgIHwgXFxgdkNcXGAgICB8IFxcYC52aXN1YWwtbW9kZS5jaGFyYWN0ZXJ3aXNlXFxgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgICAgfCBcXGBpUlxcYCAgIHwgXFxgLmluc2VydC1tb2RlLnJlcGxhY2VcXGAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgICB8IFxcYCNcXGAgICAgfCBcXGAud2l0aC1jb3VudFxcYCAgICAgICAgICAgICAgICB8IHdoZW4gY291bnQgaXMgc3BlY2lmaWVkICAgICAgICAgICAgIHxcbiAgICAgIHwgXFxgJVxcYCAgICB8IFxcYC5oYXMtcGVyc2lzdGVudC1zZWxlY3Rpb25cXGAgIHwgd2hlbiBwZXJzaXN0ZW50LXNlbGVjdGlvbiBpcyBleGlzdHMgfFxuICAgICAgYClcblxuICAgIHRoaXMuZ2VuZXJhdGVTdW1tYXJ5VGFibGVGb3JDb21tYW5kU3BlY3ModGhpcy5nZXRDb21tYW5kU3BlY3MoKSwge2hlYWRlcn0pXG4gIH1cblxuICBvcGVuSW5WaW0gKCkge1xuICAgIGNvbnN0IGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuICAgIGNvbnN0IHtyb3csIGNvbHVtbn0gPSBlZGl0b3IuZ2V0Q3Vyc29yQnVmZmVyUG9zaXRpb24oKVxuICAgIC8vIGUuZy4gL0FwcGxpY2F0aW9ucy9NYWNWaW0uYXBwL0NvbnRlbnRzL01hY09TL1ZpbSAtZyAvZXRjL2hvc3RzIFwiK2NhbGwgY3Vyc29yKDQsIDMpXCJcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcmVkUHJvY2Vzcyh7XG4gICAgICBjb21tYW5kOiAnL0FwcGxpY2F0aW9ucy9NYWNWaW0uYXBwL0NvbnRlbnRzL01hY09TL1ZpbScsXG4gICAgICBhcmdzOiBbJy1nJywgZWRpdG9yLmdldFBhdGgoKSwgYCtjYWxsIGN1cnNvcigke3JvdyArIDF9LCAke2NvbHVtbiArIDF9KWBdXG4gICAgfSlcbiAgfVxuXG4gIGJ1aWxkQ29tbWFuZFRhYmxlQW5kRmlsZVRhYmxlICgpIHtcbiAgICBjb25zdCBmaWxlVGFibGUgPSB7fVxuICAgIGNvbnN0IGNvbW1hbmRUYWJsZSA9IFtdXG4gICAgY29uc3Qgc2VlbiA9IHt9IC8vIEp1c3QgdG8gZGV0ZWN0IGR1cGxpY2F0ZSBuYW1lXG5cbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgVk1QT3BlcmF0aW9uRmlsZXMpIHtcbiAgICAgIGZpbGVUYWJsZVtmaWxlXSA9IFtdXG5cbiAgICAgIGZvciAoY29uc3Qga2xhc3Mgb2YgT2JqZWN0LnZhbHVlcyhyZXF1aXJlKGZpbGUpKSkge1xuICAgICAgICBpZiAoc2VlbltrbGFzcy5uYW1lXSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRHVwbGljYXRlIGNsYXNzICR7a2xhc3MubmFtZX0gaW4gXCIke2ZpbGV9XCIgYW5kIFwiJHtzZWVuW2tsYXNzLm5hbWVdfVwiYClcbiAgICAgICAgfVxuICAgICAgICBzZWVuW2tsYXNzLm5hbWVdID0gZmlsZVxuICAgICAgICBmaWxlVGFibGVbZmlsZV0ucHVzaChrbGFzcy5uYW1lKVxuICAgICAgICBpZiAoa2xhc3MuaXNDb21tYW5kKCkpIGNvbW1hbmRUYWJsZS5wdXNoKGtsYXNzLmdldENvbW1hbmROYW1lKCkpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7Y29tbWFuZFRhYmxlLCBmaWxlVGFibGV9XG4gIH1cblxuICAvLyAjIEhvdyB2bXAgY29tbWFuZHMgYmVjb21lIGF2YWlsYWJsZT9cbiAgLy8gIz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgLy8gVm1wIGhhdmUgbWFueSBjb21tYW5kcywgbG9hZGluZyBmdWxsIGNvbW1hbmRzIGF0IHN0YXJ0dXAgc2xvdyBkb3duIHBrZyBhY3RpdmF0aW9uLlxuICAvLyBTbyB2bXAgbG9hZCBzdW1tYXJ5IGNvbW1hbmQgdGFibGUgYXQgc3RhcnR1cCB0aGVuIGxhenkgcmVxdWlyZSBjb21tYW5kIGJvZHkgb24tdXNlIHRpbWluZy5cbiAgLy8gSGVyZSBpcyBob3cgdm1wIGNvbW1hbmRzIGFyZSByZWdpc3RlcmQgYW5kIGludm9rZWQuXG4gIC8vIEluaXRpYWxseSBpbnRyb2R1Y2VkIGluIFBSICM3NThcbiAgLy9cbiAgLy8gMS4gW09uIGRldl06IFByZXBhcmF0aW9uIGRvbmUgYnkgZGV2ZWxvcGVyXG4gIC8vICAgLSBJbnZva2luZyBgVmltIE1vZGUgUGx1czpXcml0ZSBDb21tYW5kIFRhYmxlIEFuZCBGaWxlIFRhYmxlIFRvIERpc2tgLiBpdCBkb2VzIGZvbGxvd2luZy5cbiAgLy8gICAtIFwiLi9qc29uL2NvbW1hbmQtdGFibGUuanNvblwiIGFuZCBcIi4vanNvbi9maWxlLXRhYmxlLmpzb25cIi4gYXJlIHVwZGF0ZWQuXG4gIC8vXG4gIC8vIDIuIFtPbiBhdG9tL3ZtcCBzdGFydHVwXVxuICAvLyAgIC0gUmVnaXN0ZXIgY29tbWFuZHMoZS5nLiBgbW92ZS1kb3duYCkgZnJvbSBcIi4vanNvbi9jb21tYW5kLXRhYmxlLmpzb25cIi5cbiAgLy9cbiAgLy8gMy4gW09uIHJ1biB0aW1lXTogZS5nLiBJbnZva2UgYG1vdmUtZG93bmAgYnkgYGpgIGtleXN0cm9rZVxuICAvLyAgIC0gRmlyZSBgbW92ZS1kb3duYCBjb21tYW5kLlxuICAvLyAgIC0gSXQgZXhlY3V0ZSBgdmltU3RhdGUub3BlcmF0aW9uU3RhY2sucnVuKFwiTW92ZURvd25cIilgXG4gIC8vICAgLSBEZXRlcm1pbmUgZmlsZXMgdG8gcmVxdWlyZSBmcm9tIFwiLi9qc29uL2ZpbGUtdGFibGUuanNvblwiLlxuICAvLyAgIC0gTG9hZCBgTW92ZURvd25gIGNsYXNzIGJ5IHJlcXVpcmUoJy4vbW90aW9ucycpIGFuZCBydW4gaXQhXG4gIC8vXG4gIGFzeW5jIHdyaXRlQ29tbWFuZFRhYmxlQW5kRmlsZVRhYmxlVG9EaXNrICgpIHtcbiAgICBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzLXBsdXMnKVxuICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcblxuICAgIGNvbnN0IHtjb21tYW5kVGFibGUsIGZpbGVUYWJsZX0gPSB0aGlzLmJ1aWxkQ29tbWFuZFRhYmxlQW5kRmlsZVRhYmxlKClcblxuICAgIGNvbnN0IGdldFN0YXRlRm9yID0gKGJhc2VOYW1lLCBvYmplY3QsIHByZXR0eSkgPT4ge1xuICAgICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnanNvbicsIGJhc2VOYW1lKSArIChwcmV0dHkgPyAnLXByZXR0eS5qc29uJyA6ICcuanNvbicpXG4gICAgICBjb25zdCBqc29uU3RyaW5nID0gcHJldHR5ID8gSlNPTi5zdHJpbmdpZnkob2JqZWN0LCBudWxsLCAnICAnKSA6IEpTT04uc3RyaW5naWZ5KG9iamVjdClcbiAgICAgIGNvbnN0IG5lZWRVcGRhdGUgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4JykudHJpbVJpZ2h0KCkgIT09IGpzb25TdHJpbmdcbiAgICAgIHJldHVybiB7ZmlsZVBhdGgsIGpzb25TdHJpbmcsIG5lZWRVcGRhdGV9XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdGVzTmVlZFVwZGF0ZSA9IFtcbiAgICAgIGdldFN0YXRlRm9yKCdjb21tYW5kLXRhYmxlJywgY29tbWFuZFRhYmxlLCBmYWxzZSksXG4gICAgICBnZXRTdGF0ZUZvcignY29tbWFuZC10YWJsZScsIGNvbW1hbmRUYWJsZSwgdHJ1ZSksXG4gICAgICBnZXRTdGF0ZUZvcignZmlsZS10YWJsZScsIGZpbGVUYWJsZSwgZmFsc2UpLFxuICAgICAgZ2V0U3RhdGVGb3IoJ2ZpbGUtdGFibGUnLCBmaWxlVGFibGUsIHRydWUpXG4gICAgXS5maWx0ZXIoc3RhdGUgPT4gc3RhdGUubmVlZFVwZGF0ZSlcblxuICAgIGlmICghc3RhdGVzTmVlZFVwZGF0ZS5sZW5ndGgpIHtcbiAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRJbmZvKCdObyBjaGFuZ2ZlcyBpbiBjb21tYW5kVGFibGUgYW5kIGZpbGVUYWJsZScsIHtkaXNtaXNzYWJsZTogdHJ1ZX0pXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHtqc29uU3RyaW5nLCBmaWxlUGF0aH0gb2Ygc3RhdGVzTmVlZFVwZGF0ZSkge1xuICAgICAgYXdhaXQgYXRvbS53b3Jrc3BhY2Uub3BlbihmaWxlUGF0aCwge2FjdGl2YXRlUGFuZTogZmFsc2UsIGFjdGl2YXRlSXRlbTogZmFsc2V9KS50aGVuKGVkaXRvciA9PiB7XG4gICAgICAgIGVkaXRvci5zZXRUZXh0KGpzb25TdHJpbmcpXG4gICAgICAgIHJldHVybiBlZGl0b3Iuc2F2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRJbmZvKGBVcGRhdGVkICR7cGF0aC5iYXNlbmFtZShmaWxlUGF0aCl9YCwge2Rpc21pc3NhYmxlOiB0cnVlfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IERldmVsb3BlcigpXG4iXX0=