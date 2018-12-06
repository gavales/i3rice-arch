(function() {
  var Disposable, Locator, cp, path,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Disposable = require('atom').Disposable;

  path = require('path');

  cp = require('child_process');

  module.exports = Locator = (function(superClass) {
    extend(Locator, superClass);

    function Locator(latex) {
      this.latex = latex;
    }

    Locator.prototype.synctex = function() {
      var cmd, currentPath, currentPosition, editor, ref;
      editor = atom.workspace.getActivePaneItem();
      currentPath = editor != null ? (ref = editor.buffer.file) != null ? ref.path : void 0 : void 0;
      currentPosition = editor != null ? editor.cursors[0].getBufferPosition() : void 0;
      if ((currentPath == null) || !this.latex.manager.isTexFile(currentPath)) {
        return;
      }
      cmd = "synctex view -i \"" + (currentPosition.row + 1) + ":" + (currentPosition.column + 1) + ":" + currentPath + "\" -o \"" + (this.latex.manager.findPDF()) + "\"";
      return cp.exec(cmd, {
        cwd: path.dirname(this.latex.mainFile)
      }, (function(_this) {
        return function(err, stdout, stderr) {
          var record;
          if (err) {
            _this.latex.logger.processError("Failed SyncTeX (code " + err.code + ").", err.message);
            return;
          }
          record = _this.parseResult(stdout);
          if (Object.keys(record).length = 0) {
            _this.latex.logger.processError('Failed SyncTeX', "Unable to parse output:\n\n\n " + stdout);
            return;
          }
          return _this.latex.viewer.synctex(record);
        };
      })(this));
    };

    Locator.prototype.parseResult = function(out) {
      var i, key, len, line, pos, record, ref, started;
      record = {};
      started = false;
      ref = out.split('\n');
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        if (line.indexOf('SyncTeX result begin') > -1) {
          started = true;
          continue;
        }
        if (line.indexOf('SyncTeX result end') > -1) {
          break;
        }
        if (!started) {
          continue;
        }
        pos = line.indexOf(':');
        if (pos < 0) {
          continue;
        }
        key = line.substr(0, pos).toLowerCase();
        if (key in record) {
          continue;
        }
        record[line.substr(0, pos).toLowerCase()] = line.substr(pos + 1);
      }
      return record;
    };

    Locator.prototype.locate = function(data) {
      var cmd;
      cmd = "synctex edit -o \"" + data.page + ":" + data.pos[0] + ":" + data.pos[1] + ":" + (this.latex.manager.findPDF()) + "\"";
      return cp.exec(cmd, {
        cwd: path.dirname(this.latex.mainFile)
      }, (function(_this) {
        return function(err, stdout, stderr) {
          var column, file, record, row;
          if (err) {
            _this.latex.logger.processError("Failed SyncTeX (code " + err.code + ").", err.message);
            return;
          }
          record = _this.parseResult(stdout);
          if (record['column'] < 0) {
            column = 0;
          } else {
            column = record['column'] - 1;
          }
          row = record['line'] - 1;
          if ('input' in record) {
            file = path.resolve(record['input'].replace(/(\r\n|\n|\r)/gm, ''));
            atom.workspace.open(file, {
              initialLine: row,
              initialColumn: column,
              searchAllPanes: true
            });
            return _this.latex.viewer.focusMain();
          } else {
            return _this.latex.logger.processError("Failed SyncTeX. No file path is given.", record);
          }
        };
      })(this));
    };

    return Locator;

  })(Disposable);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi9sb2NhdG9yLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsNkJBQUE7SUFBQTs7O0VBQUUsYUFBZSxPQUFBLENBQVEsTUFBUjs7RUFDakIsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSOztFQUNQLEVBQUEsR0FBSyxPQUFBLENBQVEsZUFBUjs7RUFFTCxNQUFNLENBQUMsT0FBUCxHQUNNOzs7SUFDUyxpQkFBQyxLQUFEO01BQ1gsSUFBQyxDQUFBLEtBQUQsR0FBUztJQURFOztzQkFHYixPQUFBLEdBQVMsU0FBQTtBQUNQLFVBQUE7TUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBZixDQUFBO01BQ1QsV0FBQSw0REFBaUMsQ0FBRTtNQUNuQyxlQUFBLG9CQUFrQixNQUFNLENBQUUsT0FBUSxDQUFBLENBQUEsQ0FBRSxDQUFDLGlCQUFuQixDQUFBO01BRWxCLElBQVcscUJBQUQsSUFBaUIsQ0FBQyxJQUFDLENBQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFmLENBQXlCLFdBQXpCLENBQTVCO0FBQUEsZUFBQTs7TUFFQSxHQUFBLEdBQU0sb0JBQUEsR0FBc0IsQ0FBQyxlQUFlLENBQUMsR0FBaEIsR0FBc0IsQ0FBdkIsQ0FBdEIsR0FBK0MsR0FBL0MsR0FDSSxDQUFDLGVBQWUsQ0FBQyxNQUFoQixHQUF5QixDQUExQixDQURKLEdBQ2dDLEdBRGhDLEdBRUssV0FGTCxHQUVpQixVQUZqQixHQUdJLENBQUMsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZixDQUFBLENBQUQsQ0FISixHQUc4QjthQUNwQyxFQUFFLENBQUMsSUFBSCxDQUFRLEdBQVIsRUFBYTtRQUFDLEdBQUEsRUFBSyxJQUFJLENBQUMsT0FBTCxDQUFhLElBQUMsQ0FBQSxLQUFLLENBQUMsUUFBcEIs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TUFBTyxDQUFBLFFBQUEsQ0FBUCxHQUFtQixFQUg5Qjs7VUFJQSxHQUFBLEdBQU0sTUFBTyxDQUFBLE1BQUEsQ0FBUCxHQUFpQjtVQUN2QixJQUFHLE9BQUEsSUFBVyxNQUFkO1lBQ0UsSUFBQSxHQUFPLElBQUksQ0FBQyxPQUFMLENBQWEsTUFBTyxDQUFBLE9BQUEsQ0FBUSxDQUFDLE9BQWhCLENBQXdCLGdCQUF4QixFQUEwQyxFQUExQyxDQUFiO1lBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLElBQXBCLEVBQ0U7Y0FBQSxXQUFBLEVBQWEsR0FBYjtjQUNBLGFBQUEsRUFBZSxNQURmO2NBRUEsY0FBQSxFQUFnQixJQUZoQjthQURGO21CQUtBLEtBQUMsQ0FBQSxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQWQsQ0FBQSxFQVBGO1dBQUEsTUFBQTttQkFTRSxLQUFDLENBQUEsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFkLENBQ0Usd0NBREYsRUFDZ0QsTUFEaEQsRUFURjs7UUFaZ0Q7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxEO0lBSE07Ozs7S0E5Q1k7QUFMdEIiLCJzb3VyY2VzQ29udGVudCI6WyJ7IERpc3Bvc2FibGUgfSA9IHJlcXVpcmUgJ2F0b20nXG5wYXRoID0gcmVxdWlyZSAncGF0aCdcbmNwID0gcmVxdWlyZSAnY2hpbGRfcHJvY2VzcydcblxubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgTG9jYXRvciBleHRlbmRzIERpc3Bvc2FibGVcbiAgY29uc3RydWN0b3I6IChsYXRleCkgLT5cbiAgICBAbGF0ZXggPSBsYXRleFxuXG4gIHN5bmN0ZXg6IC0+XG4gICAgZWRpdG9yID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZUl0ZW0oKVxuICAgIGN1cnJlbnRQYXRoID0gZWRpdG9yPy5idWZmZXIuZmlsZT8ucGF0aFxuICAgIGN1cnJlbnRQb3NpdGlvbiA9IGVkaXRvcj8uY3Vyc29yc1swXS5nZXRCdWZmZXJQb3NpdGlvbigpXG5cbiAgICByZXR1cm4gaWYgIWN1cnJlbnRQYXRoPyBvciAhQGxhdGV4Lm1hbmFnZXIuaXNUZXhGaWxlKGN1cnJlbnRQYXRoKVxuXG4gICAgY21kID0gXCJcIlwic3luY3RleCB2aWV3IC1pIFxcXCIje2N1cnJlbnRQb3NpdGlvbi5yb3cgKyAxfTpcXFxuICAgICAgICAgICAgICN7Y3VycmVudFBvc2l0aW9uLmNvbHVtbiArIDF9OlxcXG4gICAgICAgICAgICAgI3tjdXJyZW50UGF0aH1cXFwiIC1vIFxcXCJcXFxuICAgICAgICAgICAgICN7QGxhdGV4Lm1hbmFnZXIuZmluZFBERigpfVxcXCJcIlwiXCJcbiAgICBjcC5leGVjKGNtZCwge2N3ZDogcGF0aC5kaXJuYW1lIEBsYXRleC5tYWluRmlsZX0sIChlcnIsIHN0ZG91dCwgc3RkZXJyKSA9PlxuICAgICAgaWYgKGVycilcbiAgICAgICAgQGxhdGV4LmxvZ2dlci5wcm9jZXNzRXJyb3IoXG4gICAgICAgICAgXCJcIlwiRmFpbGVkIFN5bmNUZVggKGNvZGUgI3tlcnIuY29kZX0pLlwiXCJcIiwgZXJyLm1lc3NhZ2VcbiAgICAgICAgKVxuICAgICAgICByZXR1cm5cbiAgICAgIHJlY29yZCA9IEBwYXJzZVJlc3VsdChzdGRvdXQpXG4gICAgICBpZiBPYmplY3Qua2V5cyhyZWNvcmQpLmxlbmd0aCA9IDBcbiAgICAgICAgQGxhdGV4LmxvZ2dlci5wcm9jZXNzRXJyb3IoXG4gICAgICAgICAgJ0ZhaWxlZCBTeW5jVGVYJywgXCJVbmFibGUgdG8gcGFyc2Ugb3V0cHV0OlxcblxcblxcbiAje3N0ZG91dH1cIlxuICAgICAgICApXG4gICAgICAgIHJldHVyblxuICAgICAgQGxhdGV4LnZpZXdlci5zeW5jdGV4KHJlY29yZClcbiAgICApXG5cbiAgcGFyc2VSZXN1bHQ6IChvdXQpIC0+XG4gICAgcmVjb3JkID0ge31cbiAgICBzdGFydGVkID0gZmFsc2VcbiAgICBmb3IgbGluZSBpbiBvdXQuc3BsaXQoJ1xcbicpXG4gICAgICBpZiBsaW5lLmluZGV4T2YoJ1N5bmNUZVggcmVzdWx0IGJlZ2luJykgPiAtMVxuICAgICAgICBzdGFydGVkID0gdHJ1ZVxuICAgICAgICBjb250aW51ZVxuICAgICAgYnJlYWsgaWYgbGluZS5pbmRleE9mKCdTeW5jVGVYIHJlc3VsdCBlbmQnKSA+IC0xXG4gICAgICBjb250aW51ZSBpZiBub3Qgc3RhcnRlZFxuICAgICAgcG9zID0gbGluZS5pbmRleE9mKCc6JylcbiAgICAgIGNvbnRpbnVlIGlmIHBvcyA8IDBcbiAgICAgIGtleSA9IGxpbmUuc3Vic3RyKDAsIHBvcykudG9Mb3dlckNhc2UoKVxuICAgICAgY29udGludWUgaWYga2V5IG9mIHJlY29yZFxuICAgICAgcmVjb3JkW2xpbmUuc3Vic3RyKDAsIHBvcykudG9Mb3dlckNhc2UoKV0gPSBsaW5lLnN1YnN0cihwb3MgKyAxKVxuICAgIHJldHVybiByZWNvcmRcblxuICBsb2NhdGU6IChkYXRhKSAtPlxuICAgIGNtZCA9IFwiXCJcInN5bmN0ZXggZWRpdCAtbyBcXFwiI3tkYXRhLnBhZ2V9OiN7ZGF0YS5wb3NbMF19OiN7ZGF0YS5wb3NbMV19OlxcXG4gICAgICAgICAgICAgI3tAbGF0ZXgubWFuYWdlci5maW5kUERGKCl9XFxcIlwiXCJcIlxuICAgIGNwLmV4ZWMoY21kLCB7Y3dkOiBwYXRoLmRpcm5hbWUgQGxhdGV4Lm1haW5GaWxlfSwgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+XG4gICAgICBpZiAoZXJyKVxuICAgICAgICBAbGF0ZXgubG9nZ2VyLnByb2Nlc3NFcnJvcihcbiAgICAgICAgICBcIlwiXCJGYWlsZWQgU3luY1RlWCAoY29kZSAje2Vyci5jb2RlfSkuXCJcIlwiLCBlcnIubWVzc2FnZVxuICAgICAgICApXG4gICAgICAgIHJldHVyblxuICAgICAgcmVjb3JkID0gQHBhcnNlUmVzdWx0KHN0ZG91dClcbiAgICAgIGlmIHJlY29yZFsnY29sdW1uJ10gPCAwXG4gICAgICAgIGNvbHVtbiA9IDBcbiAgICAgIGVsc2VcbiAgICAgICAgY29sdW1uID0gcmVjb3JkWydjb2x1bW4nXSAtIDFcbiAgICAgIHJvdyA9IHJlY29yZFsnbGluZSddIC0gMVxuICAgICAgaWYgJ2lucHV0JyBvZiByZWNvcmRcbiAgICAgICAgZmlsZSA9IHBhdGgucmVzb2x2ZShyZWNvcmRbJ2lucHV0J10ucmVwbGFjZSgvKFxcclxcbnxcXG58XFxyKS9nbSwgJycpKVxuICAgICAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGZpbGUsXG4gICAgICAgICAgaW5pdGlhbExpbmU6IHJvd1xuICAgICAgICAgIGluaXRpYWxDb2x1bW46IGNvbHVtblxuICAgICAgICAgIHNlYXJjaEFsbFBhbmVzOiB0cnVlXG4gICAgICAgIClcbiAgICAgICAgQGxhdGV4LnZpZXdlci5mb2N1c01haW4oKVxuICAgICAgZWxzZVxuICAgICAgICBAbGF0ZXgubG9nZ2VyLnByb2Nlc3NFcnJvcihcbiAgICAgICAgICBcIlwiXCJGYWlsZWQgU3luY1RlWC4gTm8gZmlsZSBwYXRoIGlzIGdpdmVuLlwiXCJcIiwgcmVjb3JkXG4gICAgICAgIClcbiAgICApXG4iXX0=
