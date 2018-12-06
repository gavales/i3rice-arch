(function() {
  var CompositeDisposable, Emitter, VimModeline, _, iconv, ref;

  _ = require('underscore-plus');

  iconv = require('iconv-lite');

  ref = require('atom'), Emitter = ref.Emitter, CompositeDisposable = ref.CompositeDisposable;

  module.exports = VimModeline = {
    subscriptions: null,
    emitter: null,
    modelinePattern: null,
    shortOptions: {
      fenc: "fileencoding",
      ff: "fileformat",
      ft: "filetype",
      et: "expandtab",
      ts: "tabstop",
      sts: "softtabstop",
      sw: "shiftwidth",
      noet: "noexpandtab"
    },
    alternativeOptions: {
      useSoftTabs: "expandtab",
      tabLength: "tabstop",
      encoding: "fileencoding",
      lineEnding: "fileformat",
      grammar: "filetype",
      syntax: "filetype"
    },
    pairOptions: [
      {
        on: "expandtab",
        off: "noexpandtab"
      }, {
        on: "spell",
        off: "nospell"
      }
    ],
    lineEnding: {
      unix: "\n",
      dos: "\r\n",
      mac: "\r"
    },
    alternativeValue: {
      lf: "unix",
      crlf: "dos",
      cr: "mac"
    },
    fileTypeMapper: require('./vim-modeline-filetype'),
    activate: function(state) {
      this.emitter = new Emitter;
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.config.onDidChange('vim-modeline.prefix', (function(_this) {
        return function() {
          return _this.updateModelinePattern();
        };
      })(this)));
      this.updateModelinePattern();
      this.subscriptions.add(atom.commands.add('atom-text-editor', {
        'vim-modeline:detect': (function(_this) {
          return function() {
            return _this.detectAndApplyModelineSetting(null, true);
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-text-editor', {
        'vim-modeline:insert-modeline': (function(_this) {
          return function() {
            return _this.insertModeLine();
          };
        })(this)
      }));
      this.subscriptions.add(atom.workspace.observeTextEditors((function(_this) {
        return function(editor) {
          return _this.detectAndApplyModelineSetting(editor, false);
        };
      })(this)));
      return this.subscriptions.add(this.onDidSetEncoding((function(_this) {
        return function(arg) {
          var encoding, pkg;
          encoding = arg.encoding;
          pkg = atom.packages.getActivePackage('auto-encoding');
          if (((pkg != null ? pkg.mainModule.subscriptions : void 0) != null) && !_this.commandDispatched) {
            return atom.notifications.addWarning("WARNING: auto-encoding package is enabled. In this case, file encoding doesn't match the modeline. If you want use vim-modeline parse result, please invoke 'vim-modeline:detect' command or select encoding '" + encoding + "'.", {
              dismissable: true
            });
          }
        };
      })(this)));
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    onDidParse: function(callback) {
      return this.emitter.on('did-parse', callback);
    },
    onDidSetLineEnding: function(callback) {
      return this.emitter.on('did-set-line-ending', callback);
    },
    onDidSetFileType: function(callback) {
      return this.emitter.on('did-set-file-type', callback);
    },
    onDidSetEncoding: function(callback) {
      return this.emitter.on('did-set-encoding', callback);
    },
    onDidSetSoftTabs: function(callback) {
      return this.emitter.on('did-set-softtabs', callback);
    },
    onDidSetTabLength: function(callback) {
      return this.emitter.on('did-set-tab-length', callback);
    },
    provideVimModelineEventHandlerV1: function() {
      return {
        onDidParse: this.onDidParse.bind(this),
        onDidSetLineEnding: this.onDidSetLineEnding.bind(this),
        onDidSetFileType: this.onDidSetFileType.bind(this),
        onDidSetEncoding: this.onDidSetEncoding.bind(this),
        onDidSetSoftTabs: this.onDidSetSoftTabs.bind(this),
        onDidSetTabLength: this.onDidSetTabLength.bind(this)
      };
    },
    detectAndApplyModelineSetting: function(editor, commandDispatched) {
      var options;
      if (editor == null) {
        editor = null;
      }
      this.commandDispatched = commandDispatched != null ? commandDispatched : false;
      if (editor === null) {
        editor = atom.workspace.getActiveTextEditor();
      }
      if (!editor) {
        return;
      }
      options = this.detectVimModeLine(editor);
      this.emitter.emit('did-parse', {
        editor: editor,
        options: options
      });
      if (options) {
        this.setLineEnding(editor, this.lineEnding[options.fileformat]);
        this.setFileType(editor, options.filetype);
        this.setEncoding(editor, options.fileencoding);
        this.setIndent(editor, options);
        if (atom.packages.isPackageActive('spell-check')) {
          return this.setSpellCheck(editor, options);
        } else {
          return atom.packages.onDidActivatePackage((function(_this) {
            return function(pkg) {
              if (pkg.name === 'spell-check') {
                return _this.setSpellCheck(editor, options);
              }
            };
          })(this));
        }
      }
    },
    detectVimModeLine: function(editor) {
      var error, i, j, l, len, lineNum, m, max, n, options, opts, ref1, ref2, ref3, results, results1, results2;
      options = false;
      max = atom.config.get("vim-modeline.readLineNum") - 1;
      try {
        if (editor.getLastBufferRow() > max) {
          lineNum = _.uniq((function() {
            results1 = [];
            for (var l = 0; 0 <= max ? l <= max : l >= max; 0 <= max ? l++ : l--){ results1.push(l); }
            return results1;
          }).apply(this).concat((function() {
            results = [];
            for (var j = ref1 = editor.getLastBufferRow() - max, ref2 = editor.getLastBufferRow(); ref1 <= ref2 ? j <= ref2 : j >= ref2; ref1 <= ref2 ? j++ : j--){ results.push(j); }
            return results;
          }).apply(this)));
        } else {
          lineNum = (function() {
            results2 = [];
            for (var m = 0, ref3 = editor.getLastBufferRow(); 0 <= ref3 ? m <= ref3 : m >= ref3; 0 <= ref3 ? m++ : m--){ results2.push(m); }
            return results2;
          }).apply(this);
        }
        for (n = 0, len = lineNum.length; n < len; n++) {
          i = lineNum[n];
          opts = this.parseVimModeLine(editor.lineTextForBufferRow(i));
          if (opts) {
            options = _.extend({}, options || {}, opts);
          }
        }
      } catch (error1) {
        error = error1;
        console.error(error);
      }
      return options;
    },
    updateModelinePattern: function() {
      var prefix;
      prefix = atom.config.get('vim-modeline.prefix').join("|");
      return this.modelinePattern = new RegExp("(" + prefix + ")([<=>]?\\d+)*:\\s*(set*)*\\s+([^:]+)*\\s*:?");
    },
    parseVimModeLine: function(line) {
      var j, key, l, len, len1, matches, option, options, pair, ref1, ref2, ref3, value;
      matches = line.match(this.modelinePattern);
      options = null;
      if ((matches != null ? matches[4] : void 0) != null) {
        options = {};
        ref1 = matches[4].split(" ");
        for (j = 0, len = ref1.length; j < len; j++) {
          option = ref1[j];
          ref2 = option.split("="), key = ref2[0], value = ref2[1];
          if (this.shortOptions[key] !== void 0) {
            key = this.shortOptions[key];
          }
          if (this.alternativeOptions[key] !== void 0) {
            key = this.alternativeOptions[key];
          }
          if (this.alternativeValue[value] !== void 0) {
            value = this.alternativeValue[value];
          }
          ref3 = this.pairOptions;
          for (l = 0, len1 = ref3.length; l < len1; l++) {
            pair = ref3[l];
            if (key === pair.off && options[pair.on]) {
              delete options[pair.on];
            }
          }
          if (key !== "") {
            options[key] = value != null ? value : true;
          }
        }
      }
      return options;
    },
    setEncoding: function(editor, encoding) {
      if (!iconv.encodingExists(encoding)) {
        return false;
      }
      encoding = encoding.toLowerCase().replace(/[^0-9a-z]|:\d{4}$/g, '');
      if (editor != null) {
        editor.setEncoding(encoding);
      }
      return this.emitter.emit('did-set-encoding', {
        editor: editor,
        encoding: encoding
      }, this);
    },
    setLineEnding: function(editor, lineEnding) {
      var buffer;
      if (!lineEnding) {
        return;
      }
      buffer = editor != null ? editor.getBuffer() : void 0;
      if (!buffer) {
        return;
      }
      buffer.setPreferredLineEnding(lineEnding);
      buffer.setText(buffer.getText().replace(/\r\n|\r|\n/g, lineEnding));
      return this.emitter.emit('did-set-line-ending', {
        editor: editor,
        lineEnding: lineEnding
      }, this);
    },
    setFileType: function(editor, type) {
      var grammar;
      grammar = this.matchFileType(editor, type);
      if (grammar !== atom.grammars.nullGrammar) {
        atom.textEditors.setGrammarOverride(editor, grammar.scopeName);
        if (editor != null) {
          editor.setGrammar(grammar);
        }
        return this.emitter.emit('did-set-file-type', {
          editor: editor,
          grammar: grammar
        }, this);
      }
    },
    matchFileType: function(editor, type) {
      var content, detect, grammar, mapper, ref1, scores;
      mapper = this.getFileTypeMapper(type);
      if (typeof mapper === "string") {
        grammar = atom.grammars.grammarForScopeName(mapper);
      } else if (typeof mapper === "object" && mapper.length > 0) {
        content = editor != null ? (ref1 = editor.getBuffer()) != null ? ref1.getText() : void 0 : void 0;
        scores = mapper.map(function(scopeName) {
          var g;
          g = atom.grammars.grammarForScopeName(scopeName) || atom.grammars.nullGrammar;
          return {
            scopeName: scopeName,
            score: atom.grammars.getGrammarScore(g, editor.getPath(), content)
          };
        });
        detect = _.max(scores, function(score) {
          return score.score;
        });
        grammar = atom.grammars.grammarForScopeName(detect.scopeName);
      } else {
        grammar = atom.grammars.selectGrammar(type);
      }
      return grammar || atom.grammars.nullGrammar;
    },
    getFileTypeMapper: function(type) {
      var extra, ft, j, len, mapper, ref1;
      mapper = this.fileTypeMapper[type] || [];
      extra = atom.config.get("vim-modeline-filetypes") || {};
      if (typeof extra[type] === "string") {
        mapper = extra[type];
      } else if (typeof extra[type] === "object") {
        ref1 = extra[type];
        for (j = 0, len = ref1.length; j < len; j++) {
          ft = ref1[j];
          mapper.push(ft);
        }
      }
      return mapper;
    },
    setIndent: function(editor, options) {
      var softtab, tabstop;
      softtab = void 0;
      if (options.expandtab) {
        softtab = true;
      }
      if (options.noexpandtab) {
        softtab = false;
      }
      if (softtab !== void 0) {
        if (editor != null) {
          editor.setSoftTabs(softtab);
        }
        this.emitter.emit('did-set-softtabs', {
          editor: editor,
          softtab: softtab
        }, this);
      }
      if (options.tabstop) {
        tabstop = parseInt(options.tabstop, 10);
        if (editor != null) {
          editor.setTabLength(tabstop);
        }
        return this.emitter.emit('did-set-tab-length', {
          editor: editor,
          tabstop: tabstop
        }, this);
      }
    },
    setSpellCheck: function(editor, options) {
      var enabled, pkg, view;
      enabled = void 0;
      if (options.spell) {
        enabled = true;
      }
      if (options.nospell) {
        enabled = false;
      }
      if (enabled !== void 0) {
        pkg = atom.packages.getActivePackage("spell-check");
        view = pkg.mainModule.viewsByEditor.get(editor);
        if ((view.buffer !== null && enabled === false) || (view.buffer === null && enabled === true)) {
          return atom.commands.dispatch(document.querySelector('atom-workspace'), "spell-check:toggle");
        }
      }
    },
    insertModeLine: function() {
      var comment, currentPosition, editor, modeline, modelineRange, options, scope;
      editor = atom.workspace.getActiveTextEditor();
      if (!editor) {
        return;
      }
      options = this.getCurrentOptions(editor);
      modelineRange = [this.getInsertModelineRow(editor), 0];
      scope = editor.scopeDescriptorForBufferPosition(modelineRange);
      comment = atom.config.get("editor.commentStart", {
        scope: scope
      });
      if (comment) {
        modeline = "" + comment + (this.makeModeline(options));
        currentPosition = editor.getCursorBufferPosition();
        editor.setCursorBufferPosition(modelineRange);
        if (atom.config.get("vim-modeline.insertModelinePosition") === "first row" || atom.config.get("vim-modeline.insertModelinePosition") === "above cursor row") {
          editor.insertNewlineAbove();
        } else {
          editor.insertNewlineBelow();
        }
        editor.insertText(modeline);
        return editor.setCursorBufferPosition(currentPosition);
      } else {
        return console.error("'editor.commentStart' is undefined in this scope.");
      }
    },
    getCurrentOptions: function(editor) {
      var j, key, keys, len, options, property, ref1, scopeName;
      if (!editor) {
        editor = atom.workspace.getActiveTextEditor();
      }
      scopeName = (ref1 = editor.getGrammar()) != null ? ref1.scopeName.split(".") : void 0;
      keys = (function() {
        switch (atom.config.get("vim-modeline.insertModelineType")) {
          case "short":
            return ["fenc", "ff", "ft", "ts", "et"];
          case "long":
            return ["fileencoding", "fileformat", "filetype", "tabstop", "expandtab"];
          case "original":
            return ["encoding", "lineEnding", "grammar", "tabLength", "useSoftTabs"];
        }
      })();
      options = {};
      for (j = 0, len = keys.length; j < len; j++) {
        key = keys[j];
        property = key;
        if (this.shortOptions[key] !== void 0) {
          key = this.shortOptions[key];
        }
        if (this.alternativeOptions[key] !== void 0) {
          key = this.alternativeOptions[key];
        }
        options[property] = (function() {
          switch (key) {
            case "fileencoding":
              return editor.getEncoding();
            case "fileformat":
              return this.detectLineEnding(editor);
            case "filetype":
              return scopeName[scopeName.length - 1];
            case "tabstop":
              return editor.getTabLength();
            case "expandtab":
              return editor.getSoftTabs();
          }
        }).call(this);
      }
      return options;
    },
    makeModeline: function(options) {
      var prefix, settings;
      prefix = settings = _.map(options, function(v, k) {
        if (typeof v === "boolean") {
          return "" + (v ? "" : "no") + k;
        } else {
          return k + "=" + v;
        }
      }).join(" ");
      return (atom.config.get("vim-modeline.insertPrefix")) + ":set " + settings + ":";
    },
    getInsertModelineRow: function(editor) {
      if (!editor) {
        editor = atom.workspace.getActiveTextEditor();
      }
      switch (atom.config.get("vim-modeline.insertModelinePosition")) {
        case "first row":
          return 0;
        case "last row":
          return editor.getLastBufferRow();
        case "above cursor row":
          return editor.getCursorBufferPosition().row;
        case "below cursor row":
          return editor.getCursorBufferPosition().row;
      }
    },
    detectLineEnding: function(editor) {
      var buffer, key, lineEnding, ref1, val;
      if (!editor) {
        editor = atom.workspace.getActiveTextEditor();
      }
      buffer = editor != null ? editor.getBuffer() : void 0;
      if (!editor) {
        return;
      }
      lineEnding = buffer.lineEndingForRow(buffer.getLastRow() - 1);
      ref1 = this.lineEnding;
      for (key in ref1) {
        val = ref1[key];
        if (val === lineEnding) {
          return key;
        }
      }
      return void 0;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy92aW0tbW9kZWxpbmUvbGliL3ZpbS1tb2RlbGluZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVI7O0VBQ0osS0FBQSxHQUFRLE9BQUEsQ0FBUSxZQUFSOztFQUVSLE1BQWlDLE9BQUEsQ0FBUSxNQUFSLENBQWpDLEVBQUMscUJBQUQsRUFBVTs7RUFFVixNQUFNLENBQUMsT0FBUCxHQUFpQixXQUFBLEdBQ2Y7SUFBQSxhQUFBLEVBQWUsSUFBZjtJQUNBLE9BQUEsRUFBUyxJQURUO0lBRUEsZUFBQSxFQUFpQixJQUZqQjtJQUdBLFlBQUEsRUFBYztNQUNaLElBQUEsRUFBTSxjQURNO01BRVosRUFBQSxFQUFNLFlBRk07TUFHWixFQUFBLEVBQU0sVUFITTtNQUlaLEVBQUEsRUFBTSxXQUpNO01BS1osRUFBQSxFQUFNLFNBTE07TUFNWixHQUFBLEVBQU0sYUFOTTtNQU9aLEVBQUEsRUFBTSxZQVBNO01BUVosSUFBQSxFQUFNLGFBUk07S0FIZDtJQWFBLGtCQUFBLEVBQW9CO01BQ2xCLFdBQUEsRUFBYSxXQURLO01BRWxCLFNBQUEsRUFBVyxTQUZPO01BR2xCLFFBQUEsRUFBVSxjQUhRO01BSWxCLFVBQUEsRUFBWSxZQUpNO01BS2xCLE9BQUEsRUFBUyxVQUxTO01BTWxCLE1BQUEsRUFBUSxVQU5VO0tBYnBCO0lBcUJBLFdBQUEsRUFBYTtNQUNYO1FBQUMsRUFBQSxFQUFJLFdBQUw7UUFBa0IsR0FBQSxFQUFLLGFBQXZCO09BRFcsRUFFWDtRQUFDLEVBQUEsRUFBSSxPQUFMO1FBQWMsR0FBQSxFQUFLLFNBQW5CO09BRlc7S0FyQmI7SUF5QkEsVUFBQSxFQUFZO01BQ1YsSUFBQSxFQUFNLElBREk7TUFFVixHQUFBLEVBQU0sTUFGSTtNQUdWLEdBQUEsRUFBTSxJQUhJO0tB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TUFBRDtBQUNoQixVQUFBO01BQUEsSUFBQSxDQUFxRCxNQUFyRDtRQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFmLENBQUEsRUFBVDs7TUFDQSxNQUFBLG9CQUFTLE1BQU0sQ0FBRSxTQUFSLENBQUE7TUFDVCxJQUFBLENBQWMsTUFBZDtBQUFBLGVBQUE7O01BRUEsVUFBQSxHQUFhLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixNQUFNLENBQUMsVUFBUCxDQUFBLENBQUEsR0FBc0IsQ0FBOUM7QUFDYjtBQUFBLFdBQUEsV0FBQTs7UUFDRSxJQUFHLEdBQUEsS0FBTyxVQUFWO0FBQ0UsaUJBQU8sSUFEVDs7QUFERjtBQUdBLGFBQU87SUFUUyxDQTVSbEI7O0FBTkYiLCJzb3VyY2VzQ29udGVudCI6WyJfID0gcmVxdWlyZSAndW5kZXJzY29yZS1wbHVzJ1xuaWNvbnYgPSByZXF1aXJlICdpY29udi1saXRlJ1xuXG57RW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZX0gPSByZXF1aXJlICdhdG9tJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZpbU1vZGVsaW5lID1cbiAgc3Vic2NyaXB0aW9uczogbnVsbFxuICBlbWl0dGVyOiBudWxsXG4gIG1vZGVsaW5lUGF0dGVybjogbnVsbFxuICBzaG9ydE9wdGlvbnM6IHtcbiAgICBmZW5jOiBcImZpbGVlbmNvZGluZ1wiXG4gICAgZmY6ICAgXCJmaWxlZm9ybWF0XCJcbiAgICBmdDogICBcImZpbGV0eXBlXCJcbiAgICBldDogICBcImV4cGFuZHRhYlwiXG4gICAgdHM6ICAgXCJ0YWJzdG9wXCJcbiAgICBzdHM6ICBcInNvZnR0YWJzdG9wXCJcbiAgICBzdzogICBcInNoaWZ0d2lkdGhcIlxuICAgIG5vZXQ6IFwibm9leHBhbmR0YWJcIlxuICB9XG4gIGFsdGVybmF0aXZlT3B0aW9uczoge1xuICAgIHVzZVNvZnRUYWJzOiBcImV4cGFuZHRhYlwiXG4gICAgdGFiTGVuZ3RoOiBcInRhYnN0b3BcIlxuICAgIGVuY29kaW5nOiBcImZpbGVlbmNvZGluZ1wiXG4gICAgbGluZUVuZGluZzogXCJmaWxlZm9ybWF0XCJcbiAgICBncmFtbWFyOiBcImZpbGV0eXBlXCJcbiAgICBzeW50YXg6IFwiZmlsZXR5cGVcIlxuICB9XG4gIHBhaXJPcHRpb25zOiBbXG4gICAge29uOiBcImV4cGFuZHRhYlwiLCBvZmY6IFwibm9leHBhbmR0YWJcIn1cbiAgICB7b246IFwic3BlbGxcIiwgb2ZmOiBcIm5vc3BlbGxcIn1cbiAgXVxuICBsaW5lRW5kaW5nOiB7XG4gICAgdW5peDogXCJcXG5cIlxuICAgIGRvczogIFwiXFxyXFxuXCJcbiAgICBtYWM6ICBcIlxcclwiXG4gIH1cbiAgYWx0ZXJuYXRpdmVWYWx1ZToge1xuICAgIGxmOiBcInVuaXhcIlxuICAgIGNybGY6IFwiZG9zXCJcbiAgICBjcjogXCJtYWNcIlxuICB9XG4gIGZpbGVUeXBlTWFwcGVyOiByZXF1aXJlICcuL3ZpbS1tb2RlbGluZS1maWxldHlwZSdcblxuICBhY3RpdmF0ZTogKHN0YXRlKSAtPlxuICAgIEBlbWl0dGVyID0gbmV3IEVtaXR0ZXJcblxuICAgICMgRXZlbnRzIHN1YnNjcmliZWQgdG8gaW4gYXRvbSdzIHN5c3RlbSBjYW4gYmUgZWFzaWx5IGNsZWFuZWQgdXAgd2l0aCBhIENvbXBvc2l0ZURpc3Bvc2FibGVcbiAgICBAc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlXG5cbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgYXRvbS5jb25maWcub25EaWRDaGFuZ2UgJ3ZpbS1tb2RlbGluZS5wcmVmaXgnLCA9PiBAdXBkYXRlTW9kZWxpbmVQYXR0ZXJuKClcbiAgICBAdXBkYXRlTW9kZWxpbmVQYXR0ZXJuKClcblxuICAgICMgUmVnaXN0ZXIgY29tbWFuZCB0aGF0IHRvZ2dsZXMgdGhpcyB2aWV3XG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29tbWFuZHMuYWRkICdhdG9tLXRleHQtZWRpdG9yJywgJ3ZpbS1tb2RlbGluZTpkZXRlY3QnOiA9PiBAZGV0ZWN0QW5kQXBwbHlNb2RlbGluZVNldHRpbmcobnVsbCwgdHJ1ZSlcbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgYXRvbS5jb21tYW5kcy5hZGQgJ2F0b20tdGV4dC1lZGl0b3InLCAndmltLW1vZGVsaW5lOmluc2VydC1tb2RlbGluZSc6ID0+IEBpbnNlcnRNb2RlTGluZSgpXG5cbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgYXRvbS53b3Jrc3BhY2Uub2JzZXJ2ZVRleHRFZGl0b3JzIChlZGl0b3IpID0+IEBkZXRlY3RBbmRBcHBseU1vZGVsaW5lU2V0dGluZyhlZGl0b3IsIGZhbHNlKVxuXG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIEBvbkRpZFNldEVuY29kaW5nICh7ZW5jb2Rpbmd9KSA9PlxuICAgICAgcGtnID0gYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlICdhdXRvLWVuY29kaW5nJ1xuICAgICAgaWYgcGtnPy5tYWluTW9kdWxlLnN1YnNjcmlwdGlvbnM/IGFuZCBub3QgQGNvbW1hbmREaXNwYXRjaGVkXG4gICAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRXYXJuaW5nIFwiV0FSTklORzogYXV0by1lbmNvZGluZyBwYWNrYWdlIGlzIGVuYWJsZWQuIEluIHRoaXMgY2FzZSwgZmlsZSBlbmNvZGluZyBkb2Vzbid0IG1hdGNoIHRoZSBtb2RlbGluZS4gSWYgeW91IHdhbnQgdXNlIHZpbS1tb2RlbGluZSBwYXJzZSByZXN1bHQsIHBsZWFzZSBpbnZva2UgJ3ZpbS1tb2RlbGluZTpkZXRlY3QnIGNvbW1hbmQgb3Igc2VsZWN0IGVuY29kaW5nICcje2VuY29kaW5nfScuXCIsIGRpc21pc3NhYmxlOiB0cnVlXG5cblxuICBkZWFjdGl2YXRlOiAtPlxuICAgIEBzdWJzY3JpcHRpb25zLmRpc3Bvc2UoKVxuXG4gIG9uRGlkUGFyc2U6IChjYWxsYmFjaykgLT5cbiAgICBAZW1pdHRlci5vbiAnZGlkLXBhcnNlJywgY2FsbGJhY2tcblxuICBvbkRpZFNldExpbmVFbmRpbmc6IChjYWxsYmFjaykgLT5cbiAgICBAZW1pdHRlci5vbiAnZGlkLXNldC1saW5lLWVuZGluZycsIGNhbGxiYWNrXG5cbiAgb25EaWRTZXRGaWxlVHlwZTogKGNhbGxiYWNrKSAtPlxuICAgIEBlbWl0dGVyLm9uICdkaWQtc2V0LWZpbGUtdHlwZScsIGNhbGxiYWNrXG5cbiAgb25EaWRTZXRFbmNvZGluZzogKGNhbGxiYWNrKSAtPlxuICAgIEBlbWl0dGVyLm9uICdkaWQtc2V0LWVuY29kaW5nJywgY2FsbGJhY2tcblxuICBvbkRpZFNldFNvZnRUYWJzOiAoY2FsbGJhY2spIC0+XG4gICAgQGVtaXR0ZXIub24gJ2RpZC1zZXQtc29mdHRhYnMnLCBjYWxsYmFja1xuXG4gIG9uRGlkU2V0VGFiTGVuZ3RoOiAoY2FsbGJhY2spIC0+XG4gICAgQGVtaXR0ZXIub24gJ2RpZC1zZXQtdGFiLWxlbmd0aCcsIGNhbGxiYWNrXG5cbiAgcHJvdmlkZVZpbU1vZGVsaW5lRXZlbnRIYW5kbGVyVjE6IC0+XG4gICAgb25EaWRQYXJzZTogQG9uRGlkUGFyc2UuYmluZChAKVxuICAgIG9uRGlkU2V0TGluZUVuZGluZzogQG9uRGlkU2V0TGluZUVuZGluZy5iaW5kKEApXG4gICAgb25EaWRTZXRGaWxlVHlwZTogQG9uRGlkU2V0RmlsZVR5cGUuYmluZChAKVxuICAgIG9uRGlkU2V0RW5jb2Rpbmc6IEBvbkRpZFNldEVuY29kaW5nLmJpbmQoQClcbiAgICBvbkRpZFNldFNvZnRUYWJzOiBAb25EaWRTZXRTb2Z0VGFicy5iaW5kKEApXG4gICAgb25EaWRTZXRUYWJMZW5ndGg6IEBvbkRpZFNldFRhYkxlbmd0aC5iaW5kKEApXG5cbiAgZGV0ZWN0QW5kQXBwbHlNb2RlbGluZVNldHRpbmc6IChlZGl0b3IgPSBudWxsLCBAY29tbWFuZERpc3BhdGNoZWQgPSBmYWxzZSkgLT5cbiAgICBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKCkgaWYgZWRpdG9yIGlzIG51bGxcbiAgICByZXR1cm4gdW5sZXNzIGVkaXRvclxuXG4gICAgb3B0aW9ucyA9IEBkZXRlY3RWaW1Nb2RlTGluZSBlZGl0b3JcbiAgICBAZW1pdHRlci5lbWl0ICdkaWQtcGFyc2UnLCB7ZWRpdG9yLCBvcHRpb25zfVxuXG4gICAgaWYgb3B0aW9uc1xuICAgICAgQHNldExpbmVFbmRpbmcgZWRpdG9yLCBAbGluZUVuZGluZ1tvcHRpb25zLmZpbGVmb3JtYXRdXG4gICAgICBAc2V0RmlsZVR5cGUgZWRpdG9yLCBvcHRpb25zLmZpbGV0eXBlXG4gICAgICBAc2V0RW5jb2RpbmcgZWRpdG9yLCBvcHRpb25zLmZpbGVlbmNvZGluZ1xuICAgICAgQHNldEluZGVudCBlZGl0b3IsIG9wdGlvbnNcbiAgICAgIGlmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlICdzcGVsbC1jaGVjaydcbiAgICAgICAgQHNldFNwZWxsQ2hlY2sgZWRpdG9yLCBvcHRpb25zXG4gICAgICBlbHNlXG4gICAgICAgIGF0b20ucGFja2FnZXMub25EaWRBY3RpdmF0ZVBhY2thZ2UgKHBrZykgPT5cbiAgICAgICAgICBpZiBwa2cubmFtZSBpcyAnc3BlbGwtY2hlY2snXG4gICAgICAgICAgICBAc2V0U3BlbGxDaGVjayBlZGl0b3IsIG9wdGlvbnNcblxuICBkZXRlY3RWaW1Nb2RlTGluZTogKGVkaXRvcikgLT5cbiAgICBvcHRpb25zID0gZmFsc2VcbiAgICBtYXggPSBhdG9tLmNvbmZpZy5nZXQoXCJ2aW0tbW9kZWxpbmUucmVhZExpbmVOdW1cIikgLSAxXG4gICAgdHJ5XG4gICAgICBpZiBlZGl0b3IuZ2V0TGFzdEJ1ZmZlclJvdygpID4gbWF4XG4gICAgICAgIGxpbmVOdW0gPSBfLnVuaXEoWzAuLm1heF0uY29uY2F0IFsoZWRpdG9yLmdldExhc3RCdWZmZXJSb3coKSAtIG1heCkuLmVkaXRvci5nZXRMYXN0QnVmZmVyUm93KCldKVxuICAgICAgZWxzZVxuICAgICAgICBsaW5lTnVtID0gWzAuLmVkaXRvci5nZXRMYXN0QnVmZmVyUm93KCldXG4gICAgICBmb3IgaSBpbiBsaW5lTnVtXG4gICAgICAgIG9wdHMgPSBAcGFyc2VWaW1Nb2RlTGluZSBlZGl0b3IubGluZVRleHRGb3JCdWZmZXJSb3coaSlcbiAgICAgICAgb3B0aW9ucyA9IF8uZXh0ZW5kIHt9LCBvcHRpb25zIHx8IHt9LCBvcHRzIGlmIG9wdHNcbiAgICBjYXRjaCBlcnJvclxuICAgICAgY29uc29sZS5lcnJvciBlcnJvclxuICAgIG9wdGlvbnNcblxuICB1cGRhdGVNb2RlbGluZVBhdHRlcm46IC0+XG4gICAgcHJlZml4ID0gYXRvbS5jb25maWcuZ2V0KCd2aW0tbW9kZWxpbmUucHJlZml4Jykuam9pbiBcInxcIlxuICAgIEBtb2RlbGluZVBhdHRlcm4gPSBuZXcgUmVnRXhwIFwiKCN7cHJlZml4fSkoWzw9Pl0/XFxcXGQrKSo6XFxcXHMqKHNldCopKlxcXFxzKyhbXjpdKykqXFxcXHMqOj9cIlxuXG4gIHBhcnNlVmltTW9kZUxpbmU6IChsaW5lKSAtPlxuICAgIG1hdGNoZXMgPSBsaW5lLm1hdGNoIEBtb2RlbGluZVBhdHRlcm5cbiAgICBvcHRpb25zID0gbnVsbFxuICAgIGlmIG1hdGNoZXM/WzRdP1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgICBmb3Igb3B0aW9uIGluIG1hdGNoZXNbNF0uc3BsaXQgXCIgXCJcbiAgICAgICAgW2tleSwgdmFsdWVdID0gb3B0aW9uLnNwbGl0IFwiPVwiXG4gICAgICAgIGtleSA9IEBzaG9ydE9wdGlvbnNba2V5XSBpZiBAc2hvcnRPcHRpb25zW2tleV0gaXNudCB1bmRlZmluZWRcbiAgICAgICAga2V5ID0gQGFsdGVybmF0aXZlT3B0aW9uc1trZXldIGlmIEBhbHRlcm5hdGl2ZU9wdGlvbnNba2V5XSBpc250IHVuZGVmaW5lZFxuICAgICAgICB2YWx1ZSA9IEBhbHRlcm5hdGl2ZVZhbHVlW3ZhbHVlXSBpZiBAYWx0ZXJuYXRpdmVWYWx1ZVt2YWx1ZV0gaXNudCB1bmRlZmluZWRcbiAgICAgICAgZm9yIHBhaXIgaW4gQHBhaXJPcHRpb25zXG4gICAgICAgICAgZGVsZXRlIG9wdGlvbnNbcGFpci5vbl0gaWYga2V5IGlzIHBhaXIub2ZmIGFuZCBvcHRpb25zW3BhaXIub25dXG4gICAgICAgIG9wdGlvbnNba2V5XSA9IHZhbHVlID8gdHJ1ZSBpZiBrZXkgaXNudCBcIlwiXG4gICAgb3B0aW9uc1xuXG4gIHNldEVuY29kaW5nOiAoZWRpdG9yLCBlbmNvZGluZykgLT5cbiAgICByZXR1cm4gZmFsc2UgdW5sZXNzIGljb252LmVuY29kaW5nRXhpc3RzIGVuY29kaW5nXG4gICAgZW5jb2RpbmcgPSBlbmNvZGluZy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UgL1teMC05YS16XXw6XFxkezR9JC9nLCAnJ1xuICAgIGVkaXRvcj8uc2V0RW5jb2RpbmcgZW5jb2RpbmdcbiAgICBAZW1pdHRlci5lbWl0ICdkaWQtc2V0LWVuY29kaW5nJywge2VkaXRvciwgZW5jb2Rpbmd9LCBAXG5cbiAgc2V0TGluZUVuZGluZzogKGVkaXRvciwgbGluZUVuZGluZykgLT5cbiAgICByZXR1cm4gdW5sZXNzIGxpbmVFbmRpbmdcbiAgICBidWZmZXIgPSBlZGl0b3I/LmdldEJ1ZmZlcigpXG4gICAgcmV0dXJuIHVubGVzcyBidWZmZXJcbiAgICBidWZmZXIuc2V0UHJlZmVycmVkTGluZUVuZGluZyBsaW5lRW5kaW5nXG4gICAgYnVmZmVyLnNldFRleHQgYnVmZmVyLmdldFRleHQoKS5yZXBsYWNlKC9cXHJcXG58XFxyfFxcbi9nLCBsaW5lRW5kaW5nKVxuICAgIEBlbWl0dGVyLmVtaXQgJ2RpZC1zZXQtbGluZS1lbmRpbmcnLCB7ZWRpdG9yLCBsaW5lRW5kaW5nfSwgQFxuXG4gIHNldEZpbGVUeXBlOiAoZWRpdG9yLCB0eXBlKSAtPlxuICAgIGdyYW1tYXIgPSBAbWF0Y2hGaWxlVHlwZSBlZGl0b3IsIHR5cGVcbiAgICBpZiBncmFtbWFyIGlzbnQgYXRvbS5ncmFtbWFycy5udWxsR3JhbW1hclxuICAgICAgYXRvbS50ZXh0RWRpdG9ycy5zZXRHcmFtbWFyT3ZlcnJpZGUgZWRpdG9yLCBncmFtbWFyLnNjb3BlTmFtZVxuICAgICAgZWRpdG9yPy5zZXRHcmFtbWFyIGdyYW1tYXJcbiAgICAgIEBlbWl0dGVyLmVtaXQgJ2RpZC1zZXQtZmlsZS10eXBlJywge2VkaXRvciwgZ3JhbW1hcn0sIEBcblxuICBtYXRjaEZpbGVUeXBlOiAoZWRpdG9yLCB0eXBlKSAtPlxuICAgIG1hcHBlciA9IEBnZXRGaWxlVHlwZU1hcHBlciB0eXBlXG4gICAgaWYgdHlwZW9mKG1hcHBlcikgaXMgXCJzdHJpbmdcIlxuICAgICAgZ3JhbW1hciA9IGF0b20uZ3JhbW1hcnMuZ3JhbW1hckZvclNjb3BlTmFtZShtYXBwZXIpXG4gICAgZWxzZSBpZiB0eXBlb2YobWFwcGVyKSBpcyBcIm9iamVjdFwiIGFuZCBtYXBwZXIubGVuZ3RoID4gMFxuICAgICAgY29udGVudCA9IGVkaXRvcj8uZ2V0QnVmZmVyKCk/LmdldFRleHQoKVxuICAgICAgc2NvcmVzID0gbWFwcGVyLm1hcCAoc2NvcGVOYW1lKSAtPlxuICAgICAgICBnID0gYXRvbS5ncmFtbWFycy5ncmFtbWFyRm9yU2NvcGVOYW1lKHNjb3BlTmFtZSkgfHwgYXRvbS5ncmFtbWFycy5udWxsR3JhbW1hclxuICAgICAgICB7XG4gICAgICAgICAgc2NvcGVOYW1lOiBzY29wZU5hbWVcbiAgICAgICAgICBzY29yZTogYXRvbS5ncmFtbWFycy5nZXRHcmFtbWFyU2NvcmUoZywgZWRpdG9yLmdldFBhdGgoKSwgY29udGVudClcbiAgICAgICAgfVxuICAgICAgZGV0ZWN0ID0gXy5tYXggc2NvcmVzLCAoc2NvcmUpIC0+XG4gICAgICAgIHNjb3JlLnNjb3JlXG4gICAgICBncmFtbWFyID0gYXRvbS5ncmFtbWFycy5ncmFtbWFyRm9yU2NvcGVOYW1lKGRldGVjdC5zY29wZU5hbWUpXG4gICAgZWxzZVxuICAgICAgZ3JhbW1hciA9IGF0b20uZ3JhbW1hcnMuc2VsZWN0R3JhbW1hcih0eXBlKVxuICAgIHJldHVybiBncmFtbWFyIHx8IGF0b20uZ3JhbW1hcnMubnVsbEdyYW1tYXJcblxuICBnZXRGaWxlVHlwZU1hcHBlcjogKHR5cGUpIC0+XG4gICAgbWFwcGVyID0gQGZpbGVUeXBlTWFwcGVyW3R5cGVdIHx8IFtdXG4gICAgZXh0cmEgPSBhdG9tLmNvbmZpZy5nZXQoXCJ2aW0tbW9kZWxpbmUtZmlsZXR5cGVzXCIpIHx8IHt9XG4gICAgaWYgdHlwZW9mKGV4dHJhW3R5cGVdKSBpcyBcInN0cmluZ1wiXG4gICAgICBtYXBwZXIgPSBleHRyYVt0eXBlXVxuICAgIGVsc2UgaWYgdHlwZW9mKGV4dHJhW3R5cGVdKSBpcyBcIm9iamVjdFwiXG4gICAgICBmb3IgZnQgaW4gZXh0cmFbdHlwZV1cbiAgICAgICAgbWFwcGVyLnB1c2ggZnRcbiAgICBtYXBwZXJcblxuICBzZXRJbmRlbnQ6IChlZGl0b3IsIG9wdGlvbnMpIC0+XG4gICAgc29mdHRhYiA9IHVuZGVmaW5lZFxuICAgIHNvZnR0YWIgPSB0cnVlIGlmIG9wdGlvbnMuZXhwYW5kdGFiXG4gICAgc29mdHRhYiA9IGZhbHNlIGlmIG9wdGlvbnMubm9leHBhbmR0YWJcbiAgICBpZiBzb2Z0dGFiIGlzbnQgdW5kZWZpbmVkXG4gICAgICBlZGl0b3I/LnNldFNvZnRUYWJzIHNvZnR0YWJcbiAgICAgIEBlbWl0dGVyLmVtaXQgJ2RpZC1zZXQtc29mdHRhYnMnLCB7ZWRpdG9yLCBzb2Z0dGFifSwgQFxuXG4gICAgIyBUT0RPOiBzb2Z0dGFic3RvcCBhbmQgc2hpZnR3aWR0aCBzdXBwb3J0XG4gICAgI2luZGVudCA9IG9wdGlvbnMuc29mdHRhYnN0b3BcbiAgICAjaWYgaW5kZW50IDw9IDBcbiAgICAjICBpbmRlbnQgPSBvcHRpb25zLnNoaWZ0d2lkdGhcbiAgICAjICBpZiBpbmRlbnQgaXMgdW5kZWZpbmVkIG9yIGluZGVudCBpcyBcIjBcIlxuICAgICMgICAgaW5kZW50ID0gb3B0aW9ucy50YWJzdG9wXG4gICAgI3JldHVybiB1bmxlc3MgaW5kZW50XG4gICAgI2VkaXRvcj8uc2V0VGFiTGVuZ3RoIGluZGVudFxuXG4gICAgaWYgb3B0aW9ucy50YWJzdG9wXG4gICAgICB0YWJzdG9wID0gcGFyc2VJbnQgb3B0aW9ucy50YWJzdG9wLCAxMFxuICAgICAgZWRpdG9yPy5zZXRUYWJMZW5ndGggdGFic3RvcFxuICAgICAgQGVtaXR0ZXIuZW1pdCAnZGlkLXNldC10YWItbGVuZ3RoJywge2VkaXRvciwgdGFic3RvcH0sIEBcblxuICBzZXRTcGVsbENoZWNrOiAoZWRpdG9yLCBvcHRpb25zKSAtPlxuICAgIGVuYWJsZWQgPSB1bmRlZmluZWRcbiAgICBlbmFibGVkID0gdHJ1ZSBpZiBvcHRpb25zLnNwZWxsXG4gICAgZW5hYmxlZCA9IGZhbHNlIGlmIG9wdGlvbnMubm9zcGVsbFxuICAgIGlmIGVuYWJsZWQgaXNudCB1bmRlZmluZWRcbiAgICAgICAgcGtnID0gYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlIFwic3BlbGwtY2hlY2tcIlxuICAgICAgICB2aWV3ID0gcGtnLm1haW5Nb2R1bGUudmlld3NCeUVkaXRvci5nZXQoZWRpdG9yKVxuICAgICAgICBpZiAodmlldy5idWZmZXIgaXNudCBudWxsIGFuZCBlbmFibGVkIGlzIGZhbHNlKSBvciAodmlldy5idWZmZXIgaXMgbnVsbCBhbmQgZW5hYmxlZCBpcyB0cnVlKVxuICAgICAgICAgIGF0b20uY29tbWFuZHMuZGlzcGF0Y2goZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXRvbS13b3Jrc3BhY2UnKSwgXCJzcGVsbC1jaGVjazp0b2dnbGVcIilcblxuICBpbnNlcnRNb2RlTGluZTogLT5cbiAgICBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcbiAgICByZXR1cm4gdW5sZXNzIGVkaXRvclxuICAgIG9wdGlvbnMgPSBAZ2V0Q3VycmVudE9wdGlvbnMgZWRpdG9yXG5cbiAgICBtb2RlbGluZVJhbmdlID0gW0BnZXRJbnNlcnRNb2RlbGluZVJvdyhlZGl0b3IpLCAwXVxuICAgIHNjb3BlID0gZWRpdG9yLnNjb3BlRGVzY3JpcHRvckZvckJ1ZmZlclBvc2l0aW9uIG1vZGVsaW5lUmFuZ2VcbiAgICBjb21tZW50ID0gYXRvbS5jb25maWcuZ2V0KFwiZWRpdG9yLmNvbW1lbnRTdGFydFwiLCB7c2NvcGV9KVxuXG4gICAgaWYgY29tbWVudFxuICAgICAgbW9kZWxpbmUgPSBcIiN7Y29tbWVudH0je0BtYWtlTW9kZWxpbmUob3B0aW9ucyl9XCJcbiAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IGVkaXRvci5nZXRDdXJzb3JCdWZmZXJQb3NpdGlvbigpXG4gICAgICBlZGl0b3Iuc2V0Q3Vyc29yQnVmZmVyUG9zaXRpb24gbW9kZWxpbmVSYW5nZVxuICAgICAgaWYgYXRvbS5jb25maWcuZ2V0KFwidmltLW1vZGVsaW5lLmluc2VydE1vZGVsaW5lUG9zaXRpb25cIikgaXMgXCJmaXJzdCByb3dcIiBvciBhdG9tLmNvbmZpZy5nZXQoXCJ2aW0tbW9kZWxpbmUuaW5zZXJ0TW9kZWxpbmVQb3NpdGlvblwiKSBpcyBcImFib3ZlIGN1cnNvciByb3dcIlxuICAgICAgICBlZGl0b3IuaW5zZXJ0TmV3bGluZUFib3ZlKClcbiAgICAgIGVsc2VcbiAgICAgICAgZWRpdG9yLmluc2VydE5ld2xpbmVCZWxvdygpXG4gICAgICBlZGl0b3IuaW5zZXJ0VGV4dCBtb2RlbGluZVxuICAgICAgZWRpdG9yLnNldEN1cnNvckJ1ZmZlclBvc2l0aW9uIGN1cnJlbnRQb3NpdGlvblxuICAgIGVsc2VcbiAgICAgIGNvbnNvbGUuZXJyb3IgXCInZWRpdG9yLmNvbW1lbnRTdGFydCcgaXMgdW5kZWZpbmVkIGluIHRoaXMgc2NvcGUuXCJcblxuICBnZXRDdXJyZW50T3B0aW9uczogKGVkaXRvcikgLT5cbiAgICBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKCkgdW5sZXNzIGVkaXRvclxuICAgIHNjb3BlTmFtZSA9IGVkaXRvci5nZXRHcmFtbWFyKCk/LnNjb3BlTmFtZS5zcGxpdChcIi5cIilcblxuICAgIGtleXMgPSBzd2l0Y2ggYXRvbS5jb25maWcuZ2V0KFwidmltLW1vZGVsaW5lLmluc2VydE1vZGVsaW5lVHlwZVwiKVxuICAgICAgd2hlbiBcInNob3J0XCIgICAgdGhlbiBbXCJmZW5jXCIsIFwiZmZcIiwgXCJmdFwiLCBcInRzXCIsIFwiZXRcIl1cbiAgICAgIHdoZW4gXCJsb25nXCIgICAgIHRoZW4gW1wiZmlsZWVuY29kaW5nXCIsIFwiZmlsZWZvcm1hdFwiLCBcImZpbGV0eXBlXCIsIFwidGFic3RvcFwiLCBcImV4cGFuZHRhYlwiXVxuICAgICAgd2hlbiBcIm9yaWdpbmFsXCIgdGhlbiBbXCJlbmNvZGluZ1wiLCBcImxpbmVFbmRpbmdcIiwgXCJncmFtbWFyXCIsIFwidGFiTGVuZ3RoXCIsIFwidXNlU29mdFRhYnNcIl1cblxuICAgIG9wdGlvbnMgPSB7fVxuICAgIGZvciBrZXkgaW4ga2V5c1xuICAgICAgcHJvcGVydHkgPSBrZXlcbiAgICAgIGtleSA9IEBzaG9ydE9wdGlvbnNba2V5XSBpZiBAc2hvcnRPcHRpb25zW2tleV0gaXNudCB1bmRlZmluZWRcbiAgICAgIGtleSA9IEBhbHRlcm5hdGl2ZU9wdGlvbnNba2V5XSBpZiBAYWx0ZXJuYXRpdmVPcHRpb25zW2tleV0gaXNudCB1bmRlZmluZWRcbiAgICAgIG9wdGlvbnNbcHJvcGVydHldID0gc3dpdGNoIGtleVxuICAgICAgICB3aGVuIFwiZmlsZWVuY29kaW5nXCIgdGhlbiBlZGl0b3IuZ2V0RW5jb2RpbmcoKVxuICAgICAgICB3aGVuIFwiZmlsZWZvcm1hdFwiICAgdGhlbiBAZGV0ZWN0TGluZUVuZGluZyhlZGl0b3IpXG4gICAgICAgIHdoZW4gXCJmaWxldHlwZVwiICAgICB0aGVuIHNjb3BlTmFtZVtzY29wZU5hbWUubGVuZ3RoIC0gMV1cbiAgICAgICAgd2hlbiBcInRhYnN0b3BcIiAgICAgIHRoZW4gZWRpdG9yLmdldFRhYkxlbmd0aCgpXG4gICAgICAgIHdoZW4gXCJleHBhbmR0YWJcIiAgICB0aGVuIGVkaXRvci5nZXRTb2Z0VGFicygpXG4gICAgb3B0aW9uc1xuXG4gIG1ha2VNb2RlbGluZTogKG9wdGlvbnMpIC0+XG4gICAgcHJlZml4ID1cbiAgICBzZXR0aW5ncyA9IF8ubWFwKG9wdGlvbnMsICh2LCBrKSAtPlxuICAgICAgaWYgdHlwZW9mIHYgaXMgXCJib29sZWFuXCJcbiAgICAgICAgcmV0dXJuIFwiI3tpZiB2IHRoZW4gXCJcIiBlbHNlIFwibm9cIn0je2t9XCJcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIFwiI3trfT0je3Z9XCJcbiAgICApLmpvaW4oXCIgXCIpXG4gICAgXCIje2F0b20uY29uZmlnLmdldChcInZpbS1tb2RlbGluZS5pbnNlcnRQcmVmaXhcIil9OnNldCAje3NldHRpbmdzfTpcIlxuXG4gIGdldEluc2VydE1vZGVsaW5lUm93OiAoZWRpdG9yKSAtPlxuICAgIGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKSB1bmxlc3MgZWRpdG9yXG4gICAgc3dpdGNoIGF0b20uY29uZmlnLmdldCBcInZpbS1tb2RlbGluZS5pbnNlcnRNb2RlbGluZVBvc2l0aW9uXCJcbiAgICAgIHdoZW4gXCJmaXJzdCByb3dcIiAgICAgICAgdGhlbiAwXG4gICAgICB3aGVuIFwibGFzdCByb3dcIiAgICAgICAgIHRoZW4gZWRpdG9yLmdldExhc3RCdWZmZXJSb3coKVxuICAgICAgd2hlbiBcImFib3ZlIGN1cnNvciByb3dcIiB0aGVuIGVkaXRvci5nZXRDdXJzb3JCdWZmZXJQb3NpdGlvbigpLnJvd1xuICAgICAgd2hlbiBcImJlbG93IGN1cnNvciByb3dcIiB0aGVuIGVkaXRvci5nZXRDdXJzb3JCdWZmZXJQb3NpdGlvbigpLnJvd1xuXG4gIGRldGVjdExpbmVFbmRpbmc6IChlZGl0b3IpLT5cbiAgICBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKCkgdW5sZXNzIGVkaXRvclxuICAgIGJ1ZmZlciA9IGVkaXRvcj8uZ2V0QnVmZmVyKClcbiAgICByZXR1cm4gdW5sZXNzIGVkaXRvclxuXG4gICAgbGluZUVuZGluZyA9IGJ1ZmZlci5saW5lRW5kaW5nRm9yUm93KGJ1ZmZlci5nZXRMYXN0Um93KCkgLSAxKVxuICAgIGZvciBrZXksIHZhbCBvZiBAbGluZUVuZGluZ1xuICAgICAgaWYgdmFsIGlzIGxpbmVFbmRpbmdcbiAgICAgICAgcmV0dXJuIGtleVxuICAgIHJldHVybiB1bmRlZmluZWRcbiJdfQ==
