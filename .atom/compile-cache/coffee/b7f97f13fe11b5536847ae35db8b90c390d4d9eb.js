(function() {
  var Command, Disposable, fs, latexSymbols, path,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Disposable = require('atom').Disposable;

  path = require('path');

  fs = require('fs');

  latexSymbols = require('latex-symbols-list');

  module.exports = Command = (function(superClass) {
    extend(Command, superClass);

    function Command(latex) {
      this.latex = latex;
      this.additionalSuggestions = [];
      this.items = {};
    }

    Command.prototype.provide = function(prefix) {
      var currentContent, currentPath, editor, item, j, key, len, pkg, ref, ref1, suggestions, texItems;
      suggestions = this.predefinedCommands(prefix);
      if (prefix.length > 0) {
        ref = this.additionalSuggestions;
        for (j = 0, len = ref.length; j < len; j++) {
          item = ref[j];
          if (item.displayText.indexOf(prefix) > -1) {
            item.replacementPrefix = prefix;
            suggestions.push(item);
          }
        }
        suggestions.sort(function(a, b) {
          if (a.displayText.indexOf(prefix) !== b.displayText.indexOf(prefix)) {
            return a.displayText.indexOf(prefix) - b.displayText.indexOf(prefix);
          } else {
            return b.counts - a.counts;
          }
        });
        return suggestions;
      }
      if (!this.latex.manager.findAll()) {
        return suggestions;
      }
      this.additionalSuggestions = [];
      editor = atom.workspace.getActivePaneItem();
      currentPath = editor != null ? (ref1 = editor.buffer.file) != null ? ref1.path : void 0 : void 0;
      currentContent = editor != null ? editor.getText() : void 0;
      if (currentPath && currentContent) {
        if (this.latex.manager.isTexFile(currentPath)) {
          texItems = this.getCommandsFromContent(currentContent);
          for (key in texItems) {
            if (!(key in this.items)) {
              this.items[key] = texItems[key];
            }
          }
        }
      }
      for (key in this.items) {
        for (pkg in this.suggestions) {
          if (!(key in this.suggestions[pkg])) {
            this.additionalSuggestions.push(this.items[key]);
          }
        }
      }
      suggestions = suggestions.concat(this.additionalSuggestions);
      suggestions.sort(function(a, b) {
        if (a.counts > b.counts) {
          return -1;
        }
        return 1;
      });
      suggestions.unshift({
        text: '\n',
        displayText: 'Press ENTER for new line.',
        chainComplete: false,
        replacementPrefix: '',
        latexType: 'command'
      });
      return suggestions;
    };

    Command.prototype.predefinedCommands = function(prefix) {
      var env, item, j, len, suggestions, symbol;
      suggestions = [];
      for (env in this.suggestions.latex) {
        item = this.suggestions.latex[env];
        if (prefix.length === 0 || env.indexOf(prefix) > -1) {
          item.replacementPrefix = prefix;
          item.type = 'function';
          item.latexType = 'command';
          suggestions.push(item);
        }
      }
      for (j = 0, len = latexSymbols.length; j < len; j++) {
        symbol = latexSymbols[j];
        if (prefix.length === 0 || symbol.indexOf(prefix) > -1) {
          if (symbol[0] !== '\\') {
            continue;
          }
          suggestions.push({
            displayText: symbol.slice(1),
            snippet: symbol.slice(1),
            chainComplete: false,
            replacementPrefix: prefix,
            type: 'function',
            latexType: 'command',
            counts: 0
          });
        }
      }
      return suggestions;
    };

    Command.prototype.getCommands = function(tex) {
      var content, key, results, texItems;
      if (!fs.existsSync(tex)) {
        return {};
      }
      content = fs.readFileSync(tex, 'utf-8');
      texItems = this.getCommandsFromContent(content);
      results = [];
      for (key in texItems) {
        if (!(key in this.items)) {
          results.push(this.items[key] = texItems[key]);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    Command.prototype.getCommandsFromContent = function(content) {
      var args_display, args_snippet, chainComplete, i, itemReg, items, j, k, newCommandReg, number_of_param, ref, ref1, result, snippet;
      items = {};
      itemReg = /\\([a-zA-Z]+)({[^{}]*})?({[^{}]*})?({[^{}]*})?/g;
      while (true) {
        result = itemReg.exec(content);
        if (result == null) {
          break;
        }
        if (!(result[1] in items)) {
          if (result[2]) {
            chainComplete = true;
            snippet = result[1] + '{$1}';
            if (result[3]) {
              snippet += '{$2}';
              if (result[4]) {
                snippet += '{$3}';
              }
            }
          } else {
            chainComplete = false;
            snippet = result[1];
          }
          items[result[1]] = {
            displayText: result[1],
            snippet: snippet,
            type: 'function',
            latexType: 'command',
            chainComplete: chainComplete,
            counts: 1
          };
        } else {
          items[result[1]].counts += 1;
        }
      }
      newCommandReg = /\\(?:re|provide)?(?:new)?command(?:{)?\\(\w+)(?:})?(?:\[([0-9])\]|\[[0-9]\]\[\]{)?/g;
      while (true) {
        result = newCommandReg.exec(content);
        if (result == null) {
          break;
        }
        if (!(result[1] in items)) {
          args_snippet = '';
          args_display = '';
          chainComplete = false;
          number_of_param = 0;
          if (result[2]) {
            number_of_param = parseInt(result[2], 10);
            chainComplete = true;
            for (i = j = 1, ref = number_of_param; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
              args_snippet += "{$" + i + "}";
            }
            for (i = k = 1, ref1 = number_of_param; 1 <= ref1 ? k <= ref1 : k >= ref1; i = 1 <= ref1 ? ++k : --k) {
              args_display += "{}";
            }
          }
          items[result[1]] = {
            displayText: result[1] + args_display,
            snippet: result[1] + args_snippet + ("$" + (number_of_param + 1)),
            type: 'function',
            latexType: 'command',
            chainComplete: chainComplete,
            counts: 1
          };
        } else {
          items[result[1]].counts += 1;
        }
      }
      return items;
    };

    Command.prototype.resetCommands = function() {
      return this.items = {};
    };

    Command.prototype.suggestions = {
      latex: {
        begin: {
          displayText: 'begin',
          snippet: 'begin{$1}\n\t$2\n\\\\end{$1}',
          chainComplete: true
        },
        cite: {
          displayText: 'cite',
          snippet: 'cite{$1}$2',
          chainComplete: true
        },
        ref: {
          displayText: 'ref',
          snippet: 'ref{$1}$2',
          chainComplete: true
        },
        input: {
          displayText: 'input',
          snippet: 'input{$1}$2',
          chainComplete: true
        },
        include: {
          displayText: 'include',
          snippet: 'include{$1}$2',
          chainComplete: true
        },
        subfile: {
          displayText: 'subfile',
          snippet: 'subfile{$1}$2',
          chainComplete: true
        },
        includegraphics: {
          displayText: 'includegraphics',
          snippet: 'includegraphics{$1}$2',
          chainComplete: true
        }
      }
    };

    return Command;

  })(Disposable);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi9hdXRvY29tcGxldGUvY29tbWFuZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLDJDQUFBO0lBQUE7OztFQUFFLGFBQWUsT0FBQSxDQUFRLE1BQVI7O0VBQ2pCLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7RUFDUCxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVI7O0VBQ0wsWUFBQSxHQUFlLE9BQUEsQ0FBUSxvQkFBUjs7RUFFZixNQUFNLENBQUMsT0FBUCxHQUNNOzs7SUFDUyxpQkFBQyxLQUFEO01BQ1gsSUFBQyxDQUFBLEtBQUQsR0FBUztNQUNULElBQUMsQ0FBQSxxQkFBRCxHQUF5QjtNQUN6QixJQUFDLENBQUEsS0FBRCxHQUFTO0lBSEU7O3NCQUliLE9BQUEsR0FBUyxTQUFDLE1BQUQ7QUFDUCxVQUFBO01BQUEsV0FBQSxHQUFjLElBQUMsQ0FBQSxrQkFBRCxDQUFvQixNQUFwQjtNQUNkLElBQUcsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsQ0FBbkI7QUFDRTtBQUFBLGFBQUEscUNBQUE7O1VBQ0UsSUFBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQWpCLENBQXlCLE1BQXpCLENBQUEsR0FBbUMsQ0FBQyxDQUF2QztZQUNFLElBQUksQ0FBQyxpQkFBTCxHQUF5QjtZQUN6QixXQUFXLENBQUMsSUFBWixDQUFpQixJQUFqQixFQUZGOztBQURGO1FBSUEsV0FBVyxDQUFDLElBQVosQ0FBaUIsU0FBQyxDQUFELEVBQUksQ0FBSjtVQUNmLElBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFkLENBQXNCLE1BQXRCLENBQUEsS0FBbUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFkLENBQXNCLE1BQXRCLENBQXRDO0FBQ0UsbUJBQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFkLENBQXNCLE1BQXRCLENB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PSByZXF1aXJlICdhdG9tJ1xucGF0aCA9IHJlcXVpcmUgJ3BhdGgnXG5mcyA9IHJlcXVpcmUgJ2ZzJ1xubGF0ZXhTeW1ib2xzID0gcmVxdWlyZSgnbGF0ZXgtc3ltYm9scy1saXN0JylcblxubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgQ29tbWFuZCBleHRlbmRzIERpc3Bvc2FibGVcbiAgY29uc3RydWN0b3I6IChsYXRleCkgLT5cbiAgICBAbGF0ZXggPSBsYXRleFxuICAgIEBhZGRpdGlvbmFsU3VnZ2VzdGlvbnMgPSBbXVxuICAgIEBpdGVtcyA9IHt9XG4gIHByb3ZpZGU6IChwcmVmaXgpIC0+XG4gICAgc3VnZ2VzdGlvbnMgPSBAcHJlZGVmaW5lZENvbW1hbmRzKHByZWZpeClcbiAgICBpZiBwcmVmaXgubGVuZ3RoID4gMFxuICAgICAgZm9yIGl0ZW0gaW4gQGFkZGl0aW9uYWxTdWdnZXN0aW9uc1xuICAgICAgICBpZiBpdGVtLmRpc3BsYXlUZXh0LmluZGV4T2YocHJlZml4KSA+IC0xXG4gICAgICAgICAgaXRlbS5yZXBsYWNlbWVudFByZWZpeCA9IHByZWZpeFxuICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2ggaXRlbVxuICAgICAgc3VnZ2VzdGlvbnMuc29ydCgoYSwgYikgLT5cbiAgICAgICAgaWYgYS5kaXNwbGF5VGV4dC5pbmRleE9mKHByZWZpeCkgaXNudCBiLmRpc3BsYXlUZXh0LmluZGV4T2YocHJlZml4KVxuICAgICAgICAgIHJldHVybiBhLmRpc3BsYXlUZXh0LmluZGV4T2YocHJlZml4KSAtIGIuZGlzcGxheVRleHQuaW5kZXhPZihwcmVmaXgpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXR1cm4gYi5jb3VudHMgLSBhLmNvdW50c1xuICAgICAgKVxuICAgICAgcmV0dXJuIHN1Z2dlc3Rpb25zXG4gICAgaWYgIUBsYXRleC5tYW5hZ2VyLmZpbmRBbGwoKVxuICAgICAgcmV0dXJuIHN1Z2dlc3Rpb25zXG4gICAgQGFkZGl0aW9uYWxTdWdnZXN0aW9ucyA9IFtdXG5cbiAgICBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lSXRlbSgpXG4gICAgY3VycmVudFBhdGggPSBlZGl0b3I/LmJ1ZmZlci5maWxlPy5wYXRoXG4gICAgY3VycmVudENvbnRlbnQgPSBlZGl0b3I/LmdldFRleHQoKVxuICAgIGlmIGN1cnJlbnRQYXRoIGFuZCBjdXJyZW50Q29udGVudFxuICAgICAgaWYgQGxhdGV4Lm1hbmFnZXIuaXNUZXhGaWxlKGN1cnJlbnRQYXRoKVxuICAgICAgICB0ZXhJdGVtcyA9IEBnZXRDb21tYW5kc0Zyb21Db250ZW50IGN1cnJlbnRDb250ZW50XG4gICAgICAgIGZvciBrZXkgb2YgdGV4SXRlbXNcbiAgICAgICAgICBAaXRlbXNba2V5XSA9IHRleEl0ZW1zW2tleV0gaWYgbm90IChrZXkgb2YgQGl0ZW1zKVxuICAgIGZvciBrZXkgb2YgQGl0ZW1zXG4gICAgICBmb3IgcGtnIG9mIEBzdWdnZXN0aW9uc1xuICAgICAgICBpZiAhKGtleSBvZiBAc3VnZ2VzdGlvbnNbcGtnXSlcbiAgICAgICAgICBAYWRkaXRpb25hbFN1Z2dlc3Rpb25zLnB1c2ggQGl0ZW1zW2tleV1cblxuICAgIHN1Z2dlc3Rpb25zID0gc3VnZ2VzdGlvbnMuY29uY2F0IEBhZGRpdGlvbmFsU3VnZ2VzdGlvbnNcbiAgICBzdWdnZXN0aW9ucy5zb3J0KChhLCBiKSAtPlxuICAgICAgcmV0dXJuIC0xIGlmIGEuY291bnRzID4gYi5jb3VudHNcbiAgICAgIHJldHVybiAxKVxuICAgIHN1Z2dlc3Rpb25zLnVuc2hpZnQoXG4gICAgICB0ZXh0OiAnXFxuJ1xuICAgICAgZGlzcGxheVRleHQ6ICdQcmVzcyBFTlRFUiBmb3IgbmV3IGxpbmUuJ1xuICAgICAgY2hhaW5Db21wbGV0ZTogZmFsc2VcbiAgICAgIHJlcGxhY2VtZW50UHJlZml4OiAnJ1xuICAgICAgbGF0ZXhUeXBlOiAnY29tbWFuZCcpXG4gICAgcmV0dXJuIHN1Z2dlc3Rpb25zXG5cbiAgcHJlZGVmaW5lZENvbW1hbmRzOiAocHJlZml4KSAtPlxuICAgIHN1Z2dlc3Rpb25zID0gW11cbiAgICBmb3IgZW52IG9mIEBzdWdnZXN0aW9ucy5sYXRleFxuICAgICAgaXRlbSA9IEBzdWdnZXN0aW9ucy5sYXRleFtlbnZdXG4gICAgICBpZiBwcmVmaXgubGVuZ3RoIGlzIDAgb3IgZW52LmluZGV4T2YocHJlZml4KSA+IC0xXG4gICAgICAgIGl0ZW0ucmVwbGFjZW1lbnRQcmVmaXggPSBwcmVmaXhcbiAgICAgICAgaXRlbS50eXBlID0gJ2Z1bmN0aW9uJ1xuICAgICAgICBpdGVtLmxhdGV4VHlwZSA9ICdjb21tYW5kJ1xuICAgICAgICBzdWdnZXN0aW9ucy5wdXNoIGl0ZW1cbiAgICBmb3Igc3ltYm9sIGluIGxhdGV4U3ltYm9sc1xuICAgICAgaWYgcHJlZml4Lmxlbmd0aCBpcyAwIG9yIHN5bWJvbC5pbmRleE9mKHByZWZpeCkgPiAtMVxuICAgICAgICBpZiBzeW1ib2xbMF0gaXNudCAnXFxcXCdcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICBzdWdnZXN0aW9ucy5wdXNoXG4gICAgICAgICAgZGlzcGxheVRleHQ6IHN5bWJvbC5zbGljZSgxKVxuICAgICAgICAgIHNuaXBwZXQ6IHN5bWJvbC5zbGljZSgxKVxuICAgICAgICAgIGNoYWluQ29tcGxldGU6IGZhbHNlXG4gICAgICAgICAgcmVwbGFjZW1lbnRQcmVmaXg6IHByZWZpeFxuICAgICAgICAgIHR5cGU6ICdmdW5jdGlvbidcbiAgICAgICAgICBsYXRleFR5cGU6ICdjb21tYW5kJ1xuICAgICAgICAgIGNvdW50czogMFxuICAgIHJldHVybiBzdWdnZXN0aW9uc1xuXG4gIGdldENvbW1hbmRzOiAodGV4KSAtPlxuICAgIGlmICFmcy5leGlzdHNTeW5jKHRleClcbiAgICAgIHJldHVybiB7fVxuICAgIGNvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMgdGV4LCAndXRmLTgnXG4gICAgdGV4SXRlbXMgPSBAZ2V0Q29tbWFuZHNGcm9tQ29udGVudChjb250ZW50KVxuICAgIGZvciBrZXkgb2YgdGV4SXRlbXNcbiAgICAgIEBpdGVtc1trZXldID0gdGV4SXRlbXNba2V5XSBpZiBub3QgKGtleSBvZiBAaXRlbXMpXG5cbiAgZ2V0Q29tbWFuZHNGcm9tQ29udGVudDogKGNvbnRlbnQpIC0+XG4gICAgaXRlbXMgPSB7fVxuICAgIGl0ZW1SZWcgPSAvXFxcXChbYS16QS1aXSspKHtbXnt9XSp9KT8oe1tee31dKn0pPyh7W157fV0qfSk/L2dcbiAgICBsb29wXG4gICAgICByZXN1bHQgPSBpdGVtUmVnLmV4ZWMgY29udGVudFxuICAgICAgYnJlYWsgaWYgIXJlc3VsdD9cbiAgICAgIGlmIG5vdCAocmVzdWx0WzFdIG9mIGl0ZW1zKVxuICAgICAgICBpZiByZXN1bHRbMl1cbiAgICAgICAgICBjaGFpbkNvbXBsZXRlID0gdHJ1ZVxuICAgICAgICAgIHNuaXBwZXQgPSByZXN1bHRbMV0gKyAneyQxfSdcbiAgICAgICAgICBpZiByZXN1bHRbM11cbiAgICAgICAgICAgIHNuaXBwZXQgKz0gJ3skMn0nXG4gICAgICAgICAgICBpZiByZXN1bHRbNF1cbiAgICAgICAgICAgICAgc25pcHBldCArPSAneyQzfSdcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGNoYWluQ29tcGxldGUgPSBmYWxzZVxuICAgICAgICAgIHNuaXBwZXQgPSByZXN1bHRbMV1cbiAgICAgICAgaXRlbXNbcmVzdWx0WzFdXSA9XG4gICAgICAgICAgZGlzcGxheVRleHQ6IHJlc3VsdFsxXVxuICAgICAgICAgIHNuaXBwZXQ6IHNuaXBwZXRcbiAgICAgICAgICB0eXBlOiAnZnVuY3Rpb24nXG4gICAgICAgICAgbGF0ZXhUeXBlOiAnY29tbWFuZCdcbiAgICAgICAgICBjaGFpbkNvbXBsZXRlOiBjaGFpbkNvbXBsZXRlXG4gICAgICAgICAgY291bnRzOiAxXG4gICAgICBlbHNlXG4gICAgICAgIGl0ZW1zW3Jlc3VsdFsxXV0uY291bnRzICs9IDFcbiAgICBuZXdDb21tYW5kUmVnID0gL1xcXFwoPzpyZXxwcm92aWRlKT8oPzpuZXcpP2NvbW1hbmQoPzp7KT9cXFxcKFxcdyspKD86fSk/KD86XFxbKFswLTldKVxcXXxcXFtbMC05XVxcXVxcW1xcXXspPy9nXG4gICAgbG9vcFxuICAgICAgcmVzdWx0ID0gbmV3Q29tbWFuZFJlZy5leGVjIGNvbnRlbnRcbiAgICAgIGJyZWFrIGlmICFyZXN1bHQ/XG4gICAgICBpZiBub3QgKHJlc3VsdFsxXSBvZiBpdGVtcylcbiAgICAgICAgYXJnc19zbmlwcGV0ID0gJydcbiAgICAgICAgYXJnc19kaXNwbGF5ID0gJydcbiAgICAgICAgY2hhaW5Db21wbGV0ZSA9IGZhbHNlXG4gICAgICAgIG51bWJlcl9vZl9wYXJhbSA9IDBcbiAgICAgICAgaWYgcmVzdWx0WzJdXG4gICAgICAgICAgbnVtYmVyX29mX3BhcmFtID0gcGFyc2VJbnQocmVzdWx0WzJdLDEwKVxuICAgICAgICAgIGNoYWluQ29tcGxldGUgPSB0cnVlXG4gICAgICAgICAgYXJnc19zbmlwcGV0ICs9IFwieyQje2l9fVwiIGZvciBpIGluIFsxIC4uIG51bWJlcl9vZl9wYXJhbV1cbiAgICAgICAgICBhcmdzX2Rpc3BsYXkgKz0gXCJ7fVwiIGZvciBpIGluIFsxIC4uIG51bWJlcl9vZl9wYXJhbV1cbiAgICAgICAgaXRlbXNbcmVzdWx0WzFdXSA9XG4gICAgICAgICAgZGlzcGxheVRleHQ6IHJlc3VsdFsxXSArIGFyZ3NfZGlzcGxheVxuICAgICAgICAgIHNuaXBwZXQ6IHJlc3VsdFsxXSArIGFyZ3Nfc25pcHBldCArIFwiJCN7bnVtYmVyX29mX3BhcmFtICsgMX1cIlxuICAgICAgICAgIHR5cGU6ICdmdW5jdGlvbidcbiAgICAgICAgICBsYXRleFR5cGU6ICdjb21tYW5kJ1xuICAgICAgICAgIGNoYWluQ29tcGxldGU6IGNoYWluQ29tcGxldGVcbiAgICAgICAgICBjb3VudHM6IDFcbiAgICAgIGVsc2VcbiAgICAgICAgaXRlbXNbcmVzdWx0WzFdXS5jb3VudHMgKz0gMVxuICAgIHJldHVybiBpdGVtc1xuXG4gIHJlc2V0Q29tbWFuZHM6IC0+XG4gICAgQGl0ZW1zID0ge31cblxuICBzdWdnZXN0aW9uczpcbiAgICBsYXRleDpcbiAgICAgIGJlZ2luOlxuICAgICAgICBkaXNwbGF5VGV4dDogJ2JlZ2luJ1xuICAgICAgICBzbmlwcGV0OiAnYmVnaW57JDF9XFxuXFx0JDJcXG5cXFxcXFxcXGVuZHskMX0nXG4gICAgICAgIGNoYWluQ29tcGxldGU6IHRydWVcbiAgICAgIGNpdGU6XG4gICAgICAgIGRpc3BsYXlUZXh0OiAnY2l0ZSdcbiAgICAgICAgc25pcHBldDogJ2NpdGV7JDF9JDInXG4gICAgICAgIGNoYWluQ29tcGxldGU6IHRydWVcbiAgICAgIHJlZjpcbiAgICAgICAgZGlzcGxheVRleHQ6ICdyZWYnXG4gICAgICAgIHNuaXBwZXQ6ICdyZWZ7JDF9JDInXG4gICAgICAgIGNoYWluQ29tcGxldGU6IHRydWVcbiAgICAgIGlucHV0OlxuICAgICAgICBkaXNwbGF5VGV4dDogJ2lucHV0J1xuICAgICAgICBzbmlwcGV0OiAnaW5wdXR7JDF9JDInXG4gICAgICAgIGNoYWluQ29tcGxldGU6IHRydWVcbiAgICAgIGluY2x1ZGU6XG4gICAgICAgIGRpc3BsYXlUZXh0OiAnaW5jbHVkZSdcbiAgICAgICAgc25pcHBldDogJ2luY2x1ZGV7JDF9JDInXG4gICAgICAgIGNoYWluQ29tcGxldGU6IHRydWVcbiAgICAgIHN1YmZpbGU6XG4gICAgICAgIGRpc3BsYXlUZXh0OiAnc3ViZmlsZSdcbiAgICAgICAgc25pcHBldDogJ3N1YmZpbGV7JDF9JDInXG4gICAgICAgIGNoYWluQ29tcGxldGU6IHRydWVcbiAgICAgIGluY2x1ZGVncmFwaGljczpcbiAgICAgICAgZGlzcGxheVRleHQ6ICdpbmNsdWRlZ3JhcGhpY3MnXG4gICAgICAgIHNuaXBwZXQ6ICdpbmNsdWRlZ3JhcGhpY3N7JDF9JDInXG4gICAgICAgIGNoYWluQ29tcGxldGU6IHRydWVcbiJdfQ==
