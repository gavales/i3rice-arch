(function() {
  var Disposable, Logger,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Disposable = require('atom').Disposable;

  module.exports = Logger = (function(superClass) {
    var DebugLog;

    extend(Logger, superClass);

    function Logger(latex) {
      this.latex = latex;
      this.log = [];
      this.debuglog = new DebugLog;
    }

    Logger.prototype.missingMain = function() {
      if ((this.missingMainNotification != null) && !this.missingMainNotification.dismissed) {
        return;
      }
      return this.missingMainNotification = atom.notifications.addError("Cannot find the LaTeX root file with `\\begin{document}`.", {
        dismissable: true,
        description: "Please configure your LaTeX root file first. You can use any oneof the following methods to do so:\n1. Click the `home` icon on the control bar.\n2. Create a `.latexcfg` file at the root directory of yourproject. The file should contain a json object with `root`key set to the root file. An example:\n   ```\n   { \"root\" : \"\\path\\to\\root\\file.tex\" }\n   ```\n3. Add a magic comment `% !TEX root = \\path\\to\\root\\file.tex` to all of your LaTeX source file. The path can be absolute or relative.\n4. Open the root file and use `Build Here` command. Alternatively, use `Build LaTeX from active editor` menu item.\n5. If all previous checks fail to find a root file, Atom-LaTeX will iterate through all LaTeX files in the root directory.\nYou can choose one or multiple methods stated above to setthe root file.",
        buttons: [
          {
            text: "Dismiss",
            onDidClick: (function(_this) {
              return function() {
                if ((_this.missingMainNotification != null) && !_this.missingMainNotification.dismissed) {
                  return _this.missingMainNotification.dismiss();
                }
              };
            })(this)
          }
        ]
      });
    };

    Logger.prototype.setMain = function(method) {
      var methodText;
      if ((this.setMainNotification != null) && !this.setMainNotification.dismissed) {
        this.setMainNotification.dismiss();
      }
      switch (method) {
        case 'self':
          methodText = 'The active editor is a valid LaTeX main file.';
          break;
        case 'magic':
          methodText = 'The active editor has the magic comment line.';
          break;
        case 'config':
          methodText = 'The configuration file setting.';
          break;
        case 'all':
          methodText = 'Found in the root directory.';
      }
      return this.setMainNotification = atom.notifications.addInfo("Set the following file as LaTeX main file.", {
        detail: this.latex.mainFile,
        description: "Reason: " + methodText
      });
    };

    Logger.prototype.processError = function(title, msg, buildError, button) {
      var error;
      if (buildError) {
        this.clearBuildError();
      }
      error = atom.notifications.addError(title, {
        detail: msg,
        dismissable: true,
        buttons: button
      });
      if (buildError) {
        return this.buildError = error;
      }
    };

    Logger.prototype.clearBuildError = function() {
      if ((this.buildError != null) && !this.buildError.dismissed) {
        return this.buildError.dismiss();
      }
    };

    Logger.prototype.showLog = function() {
      var cmd, fs, log, logFile, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, tmp;
      cmd = (ref = this.latex) != null ? (ref1 = ref.builder.execCmds) != null ? ref1[((ref2 = this.latex) != null ? (ref3 = ref2.builder.execCmds) != null ? ref3.length : void 0 : void 0) - 1] : void 0 : void 0;
      log = (ref4 = this.latex) != null ? (ref5 = ref4.builder.buildLogs) != null ? ref5[((ref6 = this.latex) != null ? (ref7 = ref6.builder.buildLogs) != null ? ref7.length : void 0 : void 0) - 1] : void 0 : void 0;
      if (cmd != null) {
        tmp = require('tmp');
        fs = require('fs');
        logFile = tmp.fileSync();
        fs.writeFileSync(logFile.fd, "> " + cmd + "\n\n" + log);
        return atom.workspace.open(logFile.name).then(function(editor) {
          return atom.textEditors.setGrammarOverride(editor, 'text.log.latex');
        });
      }
    };

    Logger.prototype.showDebugLog = function() {
      return atom.workspace.open().then((function(_this) {
        return function(editor) {
          return editor.setText(" <detail>\n<summary> Atom-LaTeX Debug Log </summary>\n\n```\n" + (_this.debuglog.dump()) + "\n```\n</detail>");
        };
      })(this));
    };

    DebugLog = (function() {
      function DebugLog() {
        this.log = [];
        this.logSize = 100;
        this.logIdx = 1;
        this.log[0] = "Atom-LaTeX debug log initiated at " + (new Date().toLocaleTimeString('en-US', {
          hour12: false
        })) + " \n\n";
      }

      DebugLog.prototype.dump = function() {
        return this.log.join('\n');
      };

      DebugLog.prototype.write = function(msg) {
        this.log[this.logIdx] = msg;
        if (this.logIdx === (this.logSize - 1)) {
          this.logIdx += 1;
          return this.info('Log limit reached, overwriting!');
        } else {
          return this.logIdx = (this.logIdx + 1) % this.logSize;
        }
      };

      DebugLog.prototype.info = function(msg) {
        return this.write("[" + (new Date().toLocaleTimeString('en-US', {
          hour12: false
        })) + "| Info] " + msg);
      };

      DebugLog.prototype.debug = function(msg) {
        return this.write("[" + (new Date().toLocaleTimeString('en-US', {
          hour12: false
        })) + "| Debug] " + msg);
      };

      DebugLog.prototype.command = function(msg) {
        return this.write("[" + (new Date().toLocaleTimeString('en-US', {
          hour12: false
        })) + "| Command] " + msg);
      };

      DebugLog.prototype.warn = function(msg) {
        return this.write("[" + (new Date().toLocaleTimeString('en-US', {
          hour12: false
        })) + "| Warn] " + msg);
      };

      return DebugLog;

    })();

    return Logger;

  })(Disposable);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi9sb2dnZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxrQkFBQTtJQUFBOzs7RUFBRSxhQUFlLE9BQUEsQ0FBUSxNQUFSOztFQUVqQixNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osUUFBQTs7OztJQUFhLGdCQUFDLEtBQUQ7TUFDWCxJQUFDLENBQUEsS0FBRCxHQUFTO01BQ1QsSUFBQyxDQUFBLEdBQUQsR0FBTztNQUNQLElBQUMsQ0FBQSxRQUFELEdBQVksSUFBSTtJQUhMOztxQkFLYixXQUFBLEdBQWEsU0FBQTtNQUNYLElBQUcsc0NBQUEsSUFBOEIsQ0FBQyxJQUFDLENBQUEsdUJBQXVCLENBQUMsU0FBM0Q7QUFDRSxlQURGOzthQUVBLElBQUMsQ0FBQSx1QkFBRCxHQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBbkIsQ0FDRSwyREFERixFQUNtRTtRQUMvRCxXQUFBLEVBQWEsSUFEa0Q7UUFFL0QsV0FBQSxFQUNFLG96QkFINkQ7UUF1Qi9ELE9BQUEsRUFBUztVQUFDO1lBQ1IsSUFBQSxFQUFNLFNBREU7WUFFUixVQUFBLEVBQVksQ0FBQSxTQUFBLEtBQUE7cUJBQUEsU0FBQTtnQkFBRyxJQUNWLHVDQUFBLElBQ0QsQ0FBQyxLQUFDLENBQUEsdUJBQXVCLENBQUMsU0FGZjt5QkFBQSxLQUFDLENBQUEsdUJBQXVCLENBQUMsT0FBekIsQ0FBQSxFQUFBOztjQUFIO1lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUZKO1dBQUQ7U0F2QnNEO09BRG5FO0lBSlM7O3FCQW9DYixPQUFBLEdBQVMsU0FBQyxNQUFEO0FBQ1AsVUFBQTtNQUFBLElBQUcsa0NBQUEsSUFBMEIsQ0FBQyxJQUFDLENBQUEsbUJBQW1CLENBQUMsU0FBbkQ7UUFDRSxJQUFDLENBQUEsbUJBQW1CLENBQUMsT0FBckIsQ0FB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QUFBLEdBQUcsQ0FBQyxJQUFJLElBQUosQ0FBQSxDQUFVLENBQUMsa0JBQVgsQ0FBOEIsT0FBOUIsRUFBdUM7VUFBQyxNQUFBLEVBQVEsS0FBVDtTQUF2QyxDQUFELENBQUgsR0FBNEQsVUFBNUQsR0FBc0UsR0FBN0U7TUFESTs7Ozs7Ozs7S0FwSVc7QUFIckIiLCJzb3VyY2VzQ29udGVudCI6WyJ7IERpc3Bvc2FibGUgfSA9IHJlcXVpcmUgJ2F0b20nXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIExvZ2dlciBleHRlbmRzIERpc3Bvc2FibGVcbiAgY29uc3RydWN0b3I6IChsYXRleCkgLT5cbiAgICBAbGF0ZXggPSBsYXRleFxuICAgIEBsb2cgPSBbXVxuICAgIEBkZWJ1Z2xvZyA9IG5ldyBEZWJ1Z0xvZ1xuXG4gIG1pc3NpbmdNYWluOiAtPlxuICAgIGlmIEBtaXNzaW5nTWFpbk5vdGlmaWNhdGlvbj8gYW5kICFAbWlzc2luZ01haW5Ob3RpZmljYXRpb24uZGlzbWlzc2VkXG4gICAgICByZXR1cm5cbiAgICBAbWlzc2luZ01haW5Ob3RpZmljYXRpb24gPVxuICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKFxuICAgICAgICBcIlwiXCJDYW5ub3QgZmluZCB0aGUgTGFUZVggcm9vdCBmaWxlIHdpdGggYFxcXFxiZWdpbntkb2N1bWVudH1gLlwiXCJcIiwge1xuICAgICAgICAgIGRpc21pc3NhYmxlOiB0cnVlXG4gICAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgICBcIlwiXCJQbGVhc2UgY29uZmlndXJlIHlvdXIgTGFUZVggcm9vdCBmaWxlIGZpcnN0LiBZb3UgY2FuIHVzZSBhbnkgb25lXFxcbiAgICAgICAgICAgICAgIG9mIHRoZSBmb2xsb3dpbmcgbWV0aG9kcyB0byBkbyBzbzpcbiAgICAgICAgICAgICAgIDEuIENsaWNrIHRoZSBgaG9tZWAgaWNvbiBvbiB0aGUgY29udHJvbCBiYXIuXG4gICAgICAgICAgICAgICAyLiBDcmVhdGUgYSBgLmxhdGV4Y2ZnYCBmaWxlIGF0IHRoZSByb290IGRpcmVjdG9yeSBvZiB5b3VyXFxcbiAgICAgICAgICAgICAgICAgIHByb2plY3QuIFRoZSBmaWxlIHNob3VsZCBjb250YWluIGEganNvbiBvYmplY3Qgd2l0aCBgcm9vdGBcXFxuICAgICAgICAgICAgICAgICAga2V5IHNldCB0byB0aGUgcm9vdCBmaWxlLiBBbiBleGFtcGxlOlxuICAgICAgICAgICAgICAgICAgYGBgXG4gICAgICAgICAgICAgICAgICB7IFwicm9vdFwiIDogXCJcXFxccGF0aFxcXFx0b1xcXFxyb290XFxcXGZpbGUudGV4XCIgfVxuICAgICAgICAgICAgICAgICAgYGBgXG4gICAgICAgICAgICAgICAzLiBBZGQgYSBtYWdpYyBjb21tZW50IFxcXG4gICAgICAgICAgICAgICAgICBgJSAhVEVYIHJvb3QgPSBcXFxccGF0aFxcXFx0b1xcXFxyb290XFxcXGZpbGUudGV4YCBcXFxuICAgICAgICAgICAgICAgICAgdG8gYWxsIG9mIHlvdXIgTGFUZVggc291cmNlIGZpbGUuIFRoZSBwYXRoIGNhbiBiZSBhYnNvbHV0ZSBcXFxuICAgICAgICAgICAgICAgICAgb3IgcmVsYXRpdmUuXG4gICAgICAgICAgICAgICA0LiBPcGVuIHRoZSByb290IGZpbGUgYW5kIHVzZSBgQnVpbGQgSGVyZWAgY29tbWFuZC4gXFxcbiAgICAgICAgICAgICAgICAgIEFsdGVybmF0aXZlbHksIHVzZSBgQnVpbGQgTGFUZVggZnJvbSBhY3RpdmUgZWRpdG9yYCBtZW51IGl0ZW0uXG4gICAgICAgICAgICAgICA1LiBJZiBhbGwgcHJldmlvdXMgY2hlY2tzIGZhaWwgdG8gZmluZCBhIHJvb3QgZmlsZSwgQXRvbS1MYVRlWCBcXFxuICAgICAgICAgICAgICAgICAgd2lsbCBpdGVyYXRlIHRocm91Z2ggYWxsIExhVGVYIGZpbGVzIGluIHRoZSByb290IGRpcmVjdG9yeS5cbiAgICAgICAgICAgICAgIFlvdSBjYW4gY2hvb3NlIG9uZSBvciBtdWx0aXBsZSBtZXRob2RzIHN0YXRlZCBhYm92ZSB0byBzZXRcXFxuICAgICAgICAgICAgICAgdGhlIHJvb3QgZmlsZS5cbiAgICAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgIGJ1dHRvbnM6IFt7XG4gICAgICAgICAgICB0ZXh0OiBcIkRpc21pc3NcIlxuICAgICAgICAgICAgb25EaWRDbGljazogPT4gQG1pc3NpbmdNYWluTm90aWZpY2F0aW9uLmRpc21pc3MoKSBcXFxuICAgICAgICAgICAgICBpZiBAbWlzc2luZ01haW5Ob3RpZmljYXRpb24/IGFuZCBcXFxuICAgICAgICAgICAgICAgICFAbWlzc2luZ01haW5Ob3RpZmljYXRpb24uZGlzbWlzc2VkXG4gICAgICAgICAgfV1cbiAgICAgICAgfSlcblxuICBzZXRNYWluOiAobWV0aG9kKSAtPlxuICAgIGlmIEBzZXRNYWluTm90aWZpY2F0aW9uPyBhbmQgIUBzZXRNYWluTm90aWZpY2F0aW9uLmRpc21pc3NlZFxuICAgICAgQHNldE1haW5Ob3RpZmljYXRpb24uZGlzbWlzcygpXG5cbiAgICBzd2l0Y2ggbWV0aG9kXG4gICAgICB3aGVuICdzZWxmJ1xuICAgICAgICBtZXRob2RUZXh0ID0gJ1RoZSBhY3RpdmUgZWRpdG9yIGlzIGEgdmFsaWQgTGFUZVggbWFpbiBmaWxlLidcbiAgICAgIHdoZW4gJ21hZ2ljJ1xuICAgICAgICBtZXRob2RUZXh0ID0gJ1RoZSBhY3RpdmUgZWRpdG9yIGhhcyB0aGUgbWFnaWMgY29tbWVudCBsaW5lLidcbiAgICAgIHdoZW4gJ2NvbmZpZydcbiAgICAgICAgbWV0aG9kVGV4dCA9ICdUaGUgY29uZmlndXJhdGlvbiBmaWxlIHNldHRpbmcuJ1xuICAgICAgd2hlbiAnYWxsJ1xuICAgICAgICBtZXRob2RUZXh0ID0gJ0ZvdW5kIGluIHRoZSByb290IGRpcmVjdG9yeS4nXG5cbiAgICBAc2V0TWFpbk5vdGlmaWNhdGlvbiA9XG4gICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkSW5mbyhcbiAgICAgICAgXCJcIlwiU2V0IHRoZSBmb2xsb3dpbmcgZmlsZSBhcyBMYVRlWCBtYWluIGZpbGUuXCJcIlwiLCB7XG4gICAgICAgICAgZGV0YWlsOiBAbGF0ZXgubWFpbkZpbGVcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlwiUmVhc29uOiAje21ldGhvZFRleHR9XCJcIlwiXG4gICAgICAgIH1cbiAgICAgIClcblxuICBwcm9jZXNzRXJyb3I6ICh0aXRsZSwgbXNnLCBidWlsZEVycm9yLCBidXR0b24pIC0+XG4gICAgaWYgYnVpbGRFcnJvclxuICAgICAgQGNsZWFyQnVpbGRFcnJvcigpXG4gICAgZXJyb3IgPVxuICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKHRpdGxlLCB7XG4gICAgICAgIGRldGFpbDogbXNnXG4gICAgICAgIGRpc21pc3NhYmxlOiB0cnVlXG4gICAgICAgIGJ1dHRvbnM6IGJ1dHRvblxuICAgICAgfSlcbiAgICBpZiBidWlsZEVycm9yXG4gICAgICBAYnVpbGRFcnJvciA9IGVycm9yXG5cbiAgY2xlYXJCdWlsZEVycm9yOiAtPlxuICAgIGlmIEBidWlsZEVycm9yPyBhbmQgIUBidWlsZEVycm9yLmRpc21pc3NlZFxuICAgICAgQGJ1aWxkRXJyb3IuZGlzbWlzcygpXG5cbiAgc2hvd0xvZzogKCkgLT5cbiAgICBjbWQgPSBAbGF0ZXg/LmJ1aWxkZXIuZXhlY0NtZHM/W0BsYXRleD8uYnVpbGRlci5leGVjQ21kcz8ubGVuZ3RoIC0gMV1cbiAgICBsb2cgPSBAbGF0ZXg/LmJ1aWxkZXIuYnVpbGRMb2dzP1tAbGF0ZXg/LmJ1aWxkZXIuYnVpbGRMb2dzPy5sZW5ndGggLSAxXVxuICAgIGlmIGNtZD9cbiAgICAgIHRtcCA9IHJlcXVpcmUoJ3RtcCcpXG4gICAgICBmcyA9IHJlcXVpcmUoJ2ZzJylcbiAgICAgIGxvZ0ZpbGUgPSB0bXAuZmlsZVN5bmMoKVxuICAgICAgZnMud3JpdGVGaWxlU3luYyhsb2dGaWxlLmZkLFwiXCJcIj4gI3tjbWR9XFxuXFxuI3tsb2d9XCJcIlwiKVxuICAgICAgYXRvbS53b3Jrc3BhY2Uub3Blbihsb2dGaWxlLm5hbWUpLnRoZW4oKGVkaXRvcikgLT5cbiAgICAgICAgIyBGb3JjZSBMYVRlWCBMb2cgZWRpdG9yIGdyYW1tYXJcbiAgICAgICAgYXRvbS50ZXh0RWRpdG9ycy5zZXRHcmFtbWFyT3ZlcnJpZGUoZWRpdG9yLCAndGV4dC5sb2cubGF0ZXgnKVxuICAgICAgICApXG5cbiAgc2hvd0RlYnVnTG9nOiAoKSAtPlxuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oKS50aGVuKCAoZWRpdG9yKSA9PlxuICAgICAgZWRpdG9yLnNldFRleHQoXG4gICAgICAgIFwiXCJcIiA8ZGV0YWlsPlxuICAgICAgICAgIDxzdW1tYXJ5PiBBdG9tLUxhVGVYIERlYnVnIExvZyA8L3N1bW1hcnk+XG5cbiAgICAgICAgICBgYGBcbiAgICAgICAgICAje0BkZWJ1Z2xvZy5kdW1wKCl9XG4gICAgICAgICAgYGBgXG4gICAgICAgICAgPC9kZXRhaWw+XCJcIlwiKVxuICAgIClcblxuICBjbGFzcyBEZWJ1Z0xvZ1xuICAgIGNvbnN0cnVjdG9yOiAgLT5cbiAgICAgIEBsb2cgPSBbXSAjIEp1c3QgYSBzaW1wbGUgYXJyYXkgZm9yIG5vd1xuICAgICAgQGxvZ1NpemUgPSAxMDAgICMgTGltaXQgc2l6ZSB0byAxMDAgbGluZXNcbiAgICAgIEBsb2dJZHggPSAxXG4gICAgICBAbG9nWzBdID0gXCJBdG9tLUxhVGVYIGRlYnVnIGxvZyBpbml0aWF0ZWQgYXQgI3tuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygnZW4tVVMnLCB7aG91cjEyOiBmYWxzZX0pfSBcXG5cXG5cIlxuXG4gICAgZHVtcDogLT5cbiAgICAgIHJldHVybiBAbG9nLmpvaW4oJ1xcbicpXG5cbiAgICB3cml0ZTogKG1zZykgLT5cbiAgICAgIEBsb2dbQGxvZ0lkeF0gPSBtc2dcbiAgICAgIGlmIEBsb2dJZHggPT0gKEBsb2dTaXplIC0gMSlcbiAgICAgICAgQGxvZ0lkeCArPSAxXG4gICAgICAgIEBpbmZvKCdMb2cgbGltaXQgcmVhY2hlZCwgb3ZlcndyaXRpbmchJylcbiAgICAgIGVsc2VcbiAgICAgICAgQGxvZ0lkeCA9IChAbG9nSWR4ICsgMSkgJSBAbG9nU2l6ZVxuXG4gICAgaW5mbzogKG1zZykgLT5cbiAgICAgIEB3cml0ZShcIlsje25ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCdlbi1VUycsIHtob3VyMTI6IGZhbHNlfSl9fCBJbmZvXSAje21zZ31cIilcblxuICAgIGRlYnVnOiAobXNnKSAtPlxuICAgICAgQHdyaXRlKFwiWyN7bmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoJ2VuLVVTJywge2hvdXIxMjogZmFsc2V9KX18IERlYnVnXSAje21zZ31cIilcblxuICAgIGNvbW1hbmQ6IChtc2cpIC0+XG4gICAgICBAd3JpdGUoXCJbI3tuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygnZW4tVVMnLCB7aG91cjEyOiBmYWxzZX0pfXwgQ29tbWFuZF0gI3ttc2d9XCIpXG5cbiAgICB3YXJuOiAobXNnKSAtPlxuICAgICAgQHdyaXRlKFwiWyN7bmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoJ2VuLVVTJywge2hvdXIxMjogZmFsc2V9KX18IFdhcm5dICN7bXNnfVwiKVxuIl19
