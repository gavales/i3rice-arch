(function() {
  var Builder, Disposable, cp, hb, path,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Disposable = require('atom').Disposable;

  path = require('path');

  cp = require('child_process');

  hb = require('hasbin');

  module.exports = Builder = (function(superClass) {
    extend(Builder, superClass);

    function Builder(latex) {
      this.latex = latex;
    }

    Builder.prototype.build = function(here) {
      var promise;
      if (!this.latex.manager.findMain(here)) {
        return false;
      }
      this.killProcess();
      this.setCmds();
      promise = Promise.resolve();
      if (atom.config.get('atom-latex.save_on_build')) {
        promise = this.saveonBuild();
      }
      promise.then((function(_this) {
        return function() {
          _this.buildTimer = Date.now();
          _this.latex.logger.log = [];
          _this.latex["package"].status.view.status = 'building';
          _this.latex["package"].status.view.update();
          _this.buildLogs = [];
          _this.buildErrs = [];
          _this.execCmds = [];
          return _this.buildProcess();
        };
      })(this));
      return true;
    };

    Builder.prototype.saveonBuild = function() {
      var editor, i, len, promises, ref, ref1, ref2;
      if (!((ref = this.latex) != null ? ref.texFiles : void 0)) {
        this.latex.manager.findAll();
      }
      promises = [];
      ref1 = atom.workspace.getTextEditors();
      for (i = 0, len = ref1.length; i < len; i++) {
        editor = ref1[i];
        if (editor.isModified() && (ref2 = editor.getPath(), indexOf.call(this.latex.texFiles, ref2) >= 0)) {
          promises.push(editor.save());
        }
      }
      return Promise.all(promises);
    };

    Builder.prototype.buildProcess = function() {
      var cmd, throwErrors, toolchain;
      cmd = this.cmds.shift();
      if (cmd === void 0) {
        this.postBuild();
        return;
      }
      if (atom.config.get('atom-latex.hide_log_if_success')) {
        this.latex.panel.view.showLog = false;
      }
      this.buildLogs.push('');
      this.buildErrs.push('');
      this.execCmds.push(cmd);
      this.latex.logger.log.push({
        type: 'status',
        text: "Step " + this.buildLogs.length + "> " + cmd
      });
      toolchain = cmd.match(/(?:[^\s"]+|"[^"]*")+/g).map(function(arg) {
        return arg.replace(/"/g, '');
      });
      this.currentProcess = cp.spawn(toolchain.shift(), toolchain, {
        cwd: path.dirname(this.latex.mainFile)
      });
      this.currentProcess.stdout.on('data', (function(_this) {
        return function(data) {
          return _this.buildLogs[_this.buildLogs.length - 1] += data;
        };
      })(this));
      this.currentProcess.stderr.on('data', (function(_this) {
        return function(data) {
          return _this.buildErrs[_this.buildErrs.length - 1] += data;
        };
      })(this));
      this.currentProcess.on('error', (function(_this) {
        return function(err) {
          var ref, ref1;
          throwErrors(err);
          _this.latex.parser.parse((ref = _this.buildLogs) != null ? ref[((ref1 = _this.buildLogs) != null ? ref1.length : void 0) - 1] : void 0);
          return _this.currentProcess = void 0;
        };
      })(this));
      this.currentProcess.on('exit', (function(_this) {
        return function(exitCode, signal) {
          var err, ref, ref1;
          if (!exitCode && (signal == null)) {
            _this.buildProcess();
          } else {
            err = {
              code: exitCode,
              message: _this.buildErrs.length > 1 ? _this.buildErrs : "Command Failed: " + cmd
            };
            throwErrors(err, signal != null ? 'Build Aborted!' : void 0);
            _this.latex.parser.parse((ref = _this.buildLogs) != null ? ref[((ref1 = _this.buildLogs) != null ? ref1.length : void 0) - 1] : void 0);
            _this.cmds = [];
          }
          return _this.currentProcess = void 0;
        };
      })(this));
      return throwErrors = (function(_this) {
        return function(err, title) {
          _this.latex["package"].status.view.status = 'error';
          _this.latex.panel.view.showLog = true;
          _this.latex.logger.processError(title || ("Failed Building LaTeX (code " + err.code + ")."), err.message, true, [
            {
              text: "Dismiss",
              onDidClick: function() {
                return _this.latex.logger.clearBuildError();
              }
            }, {
              text: "Show build log",
              onDidClick: function() {
                _this.latex.logger.clearBuildError();
                return _this.latex.logger.showLog();
              }
            }
          ]);
          return _this.latex.logger.log.push({
            type: 'error',
            text: 'Error occurred while building LaTeX.'
          });
        };
      })(this);
    };

    Builder.prototype.postBuild = function() {
      var logText, ref, ref1;
      this.latex.logger.clearBuildError();
      this.latex.parser.parse((ref = this.buildLogs) != null ? ref[((ref1 = this.buildLogs) != null ? ref1.length : void 0) - 1] : void 0);
      if (this.latex.parser.isLatexmkSkipped) {
        logText = 'latexmk skipped building process.';
      } else {
        logText = "Successfully built LaTeX in " + (Date.now() - this.buildTimer) + " ms";
      }
      this.latex.logger.log.push({
        type: 'status',
        text: logText
      });
      this.latex.panel.view.update();
      if (this.latex.viewer.client.ws != null) {
        this.latex.viewer.refresh();
      } else if (atom.config.get('atom-latex.preview_after_build') !== 'Do nothing') {
        this.latex.viewer.openViewer();
      }
      if (atom.config.get('atom-latex.clean_after_build')) {
        return this.latex.cleaner.clean();
      }
    };

    Builder.prototype.killProcess = function() {
      var killcmd;
      this.cmds = [];
      if (this.currentProcess != null) {
        this.latex.logger.log.push({
          type: 'warning',
          text: "Killing running LaTeX command (PID: " + this.currentProcess.pid + ")"
        });
        if (process.platform === 'win32') {
          killcmd = "taskkill -pid " + this.currentProcess.pid + " /T /F";
        } else {
          killcmd = "pkill -P " + this.currentProcess.pid;
        }
        return cp.exec(killcmd, function(error, stdout, stderr) {
          if (error != null) {
            console.log(error);
          }
          if (stdout != null) {
            console.log("> " + killcmd + "\n\n" + stdout);
          }
          if (stderr) {
            return console.log(stderr);
          }
        });
      }
    };

    Builder.prototype.binCheck = function(binary) {
      if (hb.sync(binary)) {
        return true;
      }
      return false;
    };

    Builder.prototype.setCmds = function() {
      var ref;
      this.latex.manager.loadLocalCfg();
      if ((ref = this.latex.manager.config) != null ? ref.toolchain : void 0) {
        return this.custom_toolchain(this.latex.manager.config.toolchain);
      } else if (atom.config.get('atom-latex.toolchain') === 'auto') {
        if (!this.latexmk_toolchain()) {
          return this.custom_toolchain();
        }
      } else if (atom.config.get('atom-latex.toolchain') === 'latexmk toolchain') {
        return this.latexmk_toolchain();
      } else if (atom.config.get('atom-latex.toolchain') === 'custom toolchain') {
        return this.custom_toolchain();
      }
    };

    Builder.prototype.latexmk_toolchain = function() {
      this.cmds = ["latexmk " + (atom.config.get('atom-latex.latexmk_param')) + " " + (this.escapeFileName(path.basename(this.latex.mainFile, '.tex')))];
      if (!this.binCheck('latexmk') || !this.binCheck('perl')) {
        return false;
      }
      return true;
    };

    Builder.prototype.custom_toolchain = function(toolchain) {
      var args, bibCompiler, cmd, i, len, result, results, texCompiler, toolPrototype;
      texCompiler = atom.config.get('atom-latex.compiler');
      bibCompiler = atom.config.get('atom-latex.bibtex');
      args = atom.config.get('atom-latex.compiler_param');
      if (toolchain == null) {
        toolchain = atom.config.get('atom-latex.custom_toolchain');
      }
      toolchain = toolchain.split('&&').map(function(cmd) {
        return cmd.trim();
      });
      this.cmds = [];
      result = [];
      results = [];
      for (i = 0, len = toolchain.length; i < len; i++) {
        toolPrototype = toolchain[i];
        cmd = toolPrototype;
        cmd = cmd.split('%TEX').join(texCompiler);
        cmd = cmd.split('%BIB').join(bibCompiler);
        cmd = cmd.split('%ARG').join(args);
        cmd = cmd.split('%DOC').join(this.escapeFileName(path.basename(this.latex.mainFile).replace(/\.([^\/]*)$/, '')));
        cmd = cmd.split('%EXT').join(path.basename(this.latex.mainFile).match(/\.([^\/]*)$/)[1]);
        results.push(this.cmds.push(cmd));
      }
      return results;
    };

    Builder.prototype.escapeFileName = function(file) {
      if (file.indexOf(' ') > -1) {
        return '"' + file + '"';
      }
      return file;
    };

    return Builder;

  })(Disposable);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi9idWlsZGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsaUNBQUE7SUFBQTs7OztFQUFFLGFBQWUsT0FBQSxDQUFRLE1BQVI7O0VBQ2pCLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7RUFDUCxFQUFBLEdBQUssT0FBQSxDQUFRLGVBQVI7O0VBQ0wsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztFQUVMLE1BQU0sQ0FBQyxPQUFQLEdBQ007OztJQUNTLGlCQUFDLEtBQUQ7TUFDWCxJQUFDLENBQUEsS0FBRCxHQUFTO0lBREU7O3NCQUdiLEtBQUEsR0FBTyxTQUFDLElBQUQ7QUFDTCxVQUFBO01BQUEsSUFBRyxDQUFDLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQWYsQ0FBd0IsSUFBeEIsQ0FBSjtBQUNFLGVBQU8sTUFEVDs7TUFHQSxJQUFDLENBQUEsV0FBRCxDQUFBO01BQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBQTtNQUNBLE9BQUEsR0FBVSxPQUFPLENBQUMsT0FBUixDQUFBO01BQ1YsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsMEJBQWhCLENBQUg7UUFDRSxPQUFBLEdBQVUsSUFBQyxDQUFBLFdBQUQsQ0FBQSxFQURaOztNQUVBLE9BQU8sQ0FBQyxJQUFSLENBQWEsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO1VBQ1gsS0FBQyxDQUFBLFVBQUQsR0FBYyxJQUFJLENBQUMsR0FBTCxDQUFBO1VBQ2QsS0FBQyxDQUFBLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBZCxHQUFvQjtVQUNwQixLQUFDLENBQUEsS0FBSyxFQUFDLE9BQUQsRUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBM0IsR0FBb0M7VUFDcEMsS0FBQyxDQUFBLEtBQUssRUFBQyxPQUFE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QXZCO1FBQ04sR0FBQSxHQUFNLEdBQUcsQ0FBQyxLQUFKLENBQVUsTUFBVixDQUFpQixDQUFDLElBQWxCLENBQXVCLFdBQXZCO1FBQ04sR0FBQSxHQUFNLEdBQUcsQ0FBQyxLQUFKLENBQVUsTUFBVixDQUFpQixDQUFDLElBQWxCLENBQXVCLElBQXZCO1FBQ04sR0FBQSxHQUFNLEdBQUcsQ0FBQyxLQUFKLENBQVUsTUFBVixDQUFpQixDQUFDLElBQWxCLENBRUosSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsSUFBSSxDQUFDLFFBQUwsQ0FBYyxJQUFDLENBQUEsS0FBSyxDQUFDLFFBQXJCLENBQThCLENBQUMsT0FBL0IsQ0FBdUMsYUFBdkMsRUFBc0QsRUFBdEQsQ0FBaEIsQ0FGSTtRQUlOLEdBQUEsR0FBTSxHQUFHLENBQUMsS0FBSixDQUFVLE1BQVYsQ0FBaUIsQ0FBQyxJQUFsQixDQUF1QixJQUFJLENBQUMsUUFBTCxDQUFjLElBQUMsQ0FBQSxLQUFLLENBQUMsUUFBckIsQ0FBOEIsQ0FBQyxLQUEvQixDQUFxQyxhQUFyQyxDQUFvRCxDQUFBLENBQUEsQ0FBM0U7cUJBQ04sSUFBQyxDQUFBLElBQUksQ0FBQyxJQUFOLENBQVcsR0FBWDtBQVZGOztJQVRnQjs7c0JBcUJsQixjQUFBLEdBQWdCLFNBQUMsSUFBRDtNQUNkLElBQUcsSUFBSSxDQUFDLE9BQUwsQ0FBYSxHQUFiLENBQUEsR0FBb0IsQ0FBQyxDQUF4QjtBQUNFLGVBQU8sR0FBQSxHQUFNLElBQU4sR0FBYSxJQUR0Qjs7QUFFQSxhQUFPO0lBSE87Ozs7S0E1TEk7QUFOdEIiLCJzb3VyY2VzQ29udGVudCI6WyJ7IERpc3Bvc2FibGUgfSA9IHJlcXVpcmUgJ2F0b20nXG5wYXRoID0gcmVxdWlyZSAncGF0aCdcbmNwID0gcmVxdWlyZSAnY2hpbGRfcHJvY2VzcydcbmhiID0gcmVxdWlyZSAnaGFzYmluJ1xuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBCdWlsZGVyIGV4dGVuZHMgRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3RvcjogKGxhdGV4KSAtPlxuICAgIEBsYXRleCA9IGxhdGV4XG5cbiAgYnVpbGQ6IChoZXJlKSAtPlxuICAgIGlmICFAbGF0ZXgubWFuYWdlci5maW5kTWFpbihoZXJlKVxuICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICBAa2lsbFByb2Nlc3MoKVxuICAgIEBzZXRDbWRzKClcbiAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKClcbiAgICBpZiBhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbGF0ZXguc2F2ZV9vbl9idWlsZCcpXG4gICAgICBwcm9taXNlID0gQHNhdmVvbkJ1aWxkKClcbiAgICBwcm9taXNlLnRoZW4gKCkgPT5cbiAgICAgIEBidWlsZFRpbWVyID0gRGF0ZS5ub3coKVxuICAgICAgQGxhdGV4LmxvZ2dlci5sb2cgPSBbXVxuICAgICAgQGxhdGV4LnBhY2thZ2Uuc3RhdHVzLnZpZXcuc3RhdHVzID0gJ2J1aWxkaW5nJ1xuICAgICAgQGxhdGV4LnBhY2thZ2Uuc3RhdHVzLnZpZXcudXBkYXRlKClcbiAgICAgIEBidWlsZExvZ3MgPSBbXVxuICAgICAgQGJ1aWxkRXJycyA9IFtdXG4gICAgICBAZXhlY0NtZHMgPSBbXVxuICAgICAgQGJ1aWxkUHJvY2VzcygpXG5cbiAgICByZXR1cm4gdHJ1ZVxuXG4gIHNhdmVvbkJ1aWxkOiAtPlxuICAgIGlmICFAbGF0ZXg/LnRleEZpbGVzXG4gICAgICBAbGF0ZXgubWFuYWdlci5maW5kQWxsKClcbiAgICBwcm9taXNlcyA9IFtdXG4gICAgZm9yIGVkaXRvciBpbiBhdG9tLndvcmtzcGFjZS5nZXRUZXh0RWRpdG9ycygpXG4gICAgICBpZiBlZGl0b3IuaXNNb2RpZmllZCgpIGFuZCBlZGl0b3IuZ2V0UGF0aCgpIGluIEBsYXRleC50ZXhGaWxlc1xuICAgICAgICBwcm9taXNlcy5wdXNoIGVkaXRvci5zYXZlKClcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpXG5cblxuICBidWlsZFByb2Nlc3M6IC0+XG4gICAgY21kID0gQGNtZHMuc2hpZnQoKVxuICAgIGlmIGNtZCA9PSB1bmRlZmluZWRcbiAgICAgIEBwb3N0QnVpbGQoKVxuICAgICAgcmV0dXJuXG5cbiAgICBpZiBhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbGF0ZXguaGlkZV9sb2dfaWZfc3VjY2VzcycpXG4gICAgICBAbGF0ZXgucGFuZWwudmlldy5zaG93TG9nID0gZmFsc2VcbiAgICBAYnVpbGRMb2dzLnB1c2ggJydcbiAgICBAYnVpbGRFcnJzLnB1c2ggJydcbiAgICBAZXhlY0NtZHMucHVzaCBjbWRcblxuICAgIEBsYXRleC5sb2dnZXIubG9nLnB1c2goe1xuICAgICAgdHlwZTogJ3N0YXR1cycsXG4gICAgICB0ZXh0OiBcIlwiXCJTdGVwICN7QGJ1aWxkTG9ncy5sZW5ndGh9PiAje2NtZH1cIlwiXCJcbiAgICB9KVxuICAgICMgU3BsaXQgaW50byBhcnJheSBvZiBjbWQgKyBhcmd1bWVudHMgKHVuLWVzY2FwaW5nIFwiXCIgYWdhaW4pXG4gICAgdG9vbGNoYWluID0gY21kLm1hdGNoKC8oPzpbXlxcc1wiXSt8XCJbXlwiXSpcIikrL2cpLm1hcCgoYXJnKSAtPiBhcmcucmVwbGFjZSgvXCIvZywnJykpXG4gICAgQGN1cnJlbnRQcm9jZXNzID0gY3Auc3Bhd24odG9vbGNoYWluLnNoaWZ0KCksIHRvb2xjaGFpbiwge2N3ZDpwYXRoLmRpcm5hbWUgQGxhdGV4Lm1haW5GaWxlfSlcblxuICAgICMgUmVnaXN0ZXIgY2FsbGJhY2tzIGZvciB0aGUgc3Bhd25wcm9jZXNzXG4gICAgQGN1cnJlbnRQcm9jZXNzLnN0ZG91dC5vbiAnZGF0YScsIChkYXRhKSA9PlxuICAgICAgQGJ1aWxkTG9nc1tAYnVpbGRMb2dzLmxlbmd0aCAtIDFdICs9IGRhdGFcblxuICAgIEBjdXJyZW50UHJvY2Vzcy5zdGRlcnIub24gJ2RhdGEnLCAoZGF0YSkgPT5cbiAgICAgIEBidWlsZEVycnNbQGJ1aWxkRXJycy5sZW5ndGggLSAxXSArPSBkYXRhXG5cbiAgICBAY3VycmVudFByb2Nlc3Mub24gJ2Vycm9yJywgKGVycikgPT5cbiAgICAgICMgRmF0YWwgZXhlY3V0YWJsZSBlcnJvclxuICAgICAgdGhyb3dFcnJvcnMoZXJyKVxuICAgICAgQGxhdGV4LnBhcnNlci5wYXJzZSBAYnVpbGRMb2dzP1tAYnVpbGRMb2dzPy5sZW5ndGggLSAxXVxuICAgICAgQGN1cnJlbnRQcm9jZXNzID0gdW5kZWZpbmVkXG5cbiAgICBAY3VycmVudFByb2Nlc3Mub24gJ2V4aXQnICwgKGV4aXRDb2RlLCBzaWduYWwpID0+XG4gICAgICBpZiAhZXhpdENvZGUgYW5kICFzaWduYWw/ICAgICAjIFByb2NlZWQgaWYgbm8gZXJyb3Igb3Iga2lsbCBzaWduYWxcbiAgICAgICAgQGJ1aWxkUHJvY2VzcygpXG4gICAgICBlbHNlXG4gICAgICAgICMgQnVpbGQgdXAgZXJyIG9iamVjdCB3aXRoIGEgZGVmYXVsdCBtc2dcbiAgICAgICAgZXJyID1cbiAgICAgICAgICBjb2RlOiBleGl0Q29kZVxuICAgICAgICAgIG1lc3NhZ2U6IGlmIEBidWlsZEVycnMubGVuZ3RoID4gMSB0aGVuIEBidWlsZEVycnMgZWxzZSAgXCJDb21tYW5kIEZhaWxlZDogXCIgKyBjbWRcbiAgICAgICAgdGhyb3dFcnJvcnMoZXJyLCdCdWlsZCBBYm9ydGVkIScgaWYgc2lnbmFsPylcbiAgICAgICAgIyBQYXJzZSBsYXN0IGNvbW1hbmQncyBsb2dcbiAgICAgICAgQGxhdGV4LnBhcnNlci5wYXJzZSBAYnVpbGRMb2dzP1tAYnVpbGRMb2dzPy5sZW5ndGggLSAxXVxuICAgICAgICAjIENsZWFyIHBlbmRpbmcgY29tbWFuZHMgYW5kIGN1cnJlbnRQcm9jZXNzXG4gICAgICAgIEBjbWRzID0gW11cbiAgICAgIEBjdXJyZW50UHJvY2VzcyA9IHVuZGVmaW5lZFxuXG4gICAgdGhyb3dFcnJvcnMgPSAoZXJyLHRpdGxlKSA9PlxuICAgICAgQGxhdGV4LnBhY2thZ2Uuc3RhdHVzLnZpZXcuc3RhdHVzID0gJ2Vycm9yJ1xuICAgICAgQGxhdGV4LnBhbmVsLnZpZXcuc2hvd0xvZyA9IHRydWVcbiAgICAgIEBsYXRleC5sb2dnZXIucHJvY2Vzc0Vycm9yKFxuICAgICAgICB0aXRsZSB8fCBcIlwiXCJGYWlsZWQgQnVpbGRpbmcgTGFUZVggKGNvZGUgI3tlcnIuY29kZX0pLlwiXCJcIiwgZXJyLm1lc3NhZ2UsIHRydWUsXG4gICAgICAgIFt7XG4gICAgICAgICAgdGV4dDogXCJEaXNtaXNzXCJcbiAgICAgICAgICBvbkRpZENsaWNrOiA9PiBAbGF0ZXgubG9nZ2VyLmNsZWFyQnVpbGRFcnJvcigpXG4gICAgICAgIH0sIHtcbiAgICAgICAgICB0ZXh0OiBcIlNob3cgYnVpbGQgbG9nXCJcbiAgICAgICAgICBvbkRpZENsaWNrOiAoKT0+XG4gICAgICAgICAgICBAbGF0ZXgubG9nZ2VyLmNsZWFyQnVpbGRFcnJvcigpXG4gICAgICAgICAgICBAbGF0ZXgubG9nZ2VyLnNob3dMb2coKVxuICAgICAgICB9XVxuICAgICAgKVxuICAgICAgQGxhdGV4LmxvZ2dlci5sb2cucHVzaCh7XG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgIHRleHQ6ICdFcnJvciBvY2N1cnJlZCB3aGlsZSBidWlsZGluZyBMYVRlWC4nXG4gICAgICB9KVxuXG4gIHBvc3RCdWlsZDogLT5cbiAgICBAbGF0ZXgubG9nZ2VyLmNsZWFyQnVpbGRFcnJvcigpXG4gICAgQGxhdGV4LnBhcnNlci5wYXJzZSBAYnVpbGRMb2dzP1tAYnVpbGRMb2dzPy5sZW5ndGggLSAxXVxuICAgIGlmIEBsYXRleC5wYXJzZXIuaXNMYXRleG1rU2tpcHBlZFxuICAgICAgbG9nVGV4dCA9ICdsYXRleG1rIHNraXBwZWQgYnVpbGRpbmcgcHJvY2Vzcy4nXG4gICAgZWxzZVxuICAgICAgbG9nVGV4dCA9IFwiU3VjY2Vzc2Z1bGx5IGJ1aWx0IExhVGVYIGluICN7RGF0ZS5ub3coKSAtIEBidWlsZFRpbWVyfSBtc1wiXG4gICAgQGxhdGV4LmxvZ2dlci5sb2cucHVzaCh7XG4gICAgICB0eXBlOiAnc3RhdHVzJyxcbiAgICAgIHRleHQ6IGxvZ1RleHRcbiAgICB9KVxuICAgIEBsYXRleC5wYW5lbC52aWV3LnVwZGF0ZSgpXG4gICAgaWYgQGxhdGV4LnZpZXdlci5jbGllbnQud3M/XG4gICAgICBAbGF0ZXgudmlld2VyLnJlZnJlc2goKVxuICAgIGVsc2UgaWYgYXRvbS5jb25maWcuZ2V0KCdhdG9tLWxhdGV4LnByZXZpZXdfYWZ0ZXJfYnVpbGQnKSBpc250XFxcbiAgICAgICAgJ0RvIG5vdGhpbmcnXG4gICAgICBAbGF0ZXgudmlld2VyLm9wZW5WaWV3ZXIoKVxuICAgIGlmIGF0b20uY29uZmlnLmdldCgnYXRvbS1sYXRleC5jbGVhbl9hZnRlcl9idWlsZCcpXG4gICAgICBAbGF0ZXguY2xlYW5lci5jbGVhbigpXG5cbiAga2lsbFByb2Nlc3M6IC0+XG4gICAgQGNtZHMgPSBbXVxuICAgIGlmIEBjdXJyZW50UHJvY2Vzcz9cbiAgICAgIEBsYXRleC5sb2dnZXIubG9nLnB1c2goe1xuICAgICAgICB0eXBlOiAnd2FybmluZycsXG4gICAgICAgIHRleHQ6IFwiS2lsbGluZyBydW5uaW5nIExhVGVYIGNvbW1hbmQgKFBJRDogI3tAY3VycmVudFByb2Nlc3MucGlkfSlcIlxuICAgICAgfSlcbiAgICAgICMgS2lsbCBlbnRpcmUgcHJvY2VzcyB0cmVlXG4gICAgICBpZiBwcm9jZXNzLnBsYXRmb3JtIGlzICd3aW4zMidcbiAgICAgICAga2lsbGNtZCA9IFwidGFza2tpbGwgLXBpZCAje0BjdXJyZW50UHJvY2Vzcy5waWR9IC9UIC9GXCJcbiAgICAgIGVsc2VcbiAgICAgICAga2lsbGNtZCA9IFwicGtpbGwgLVAgI3tAY3VycmVudFByb2Nlc3MucGlkfVwiXG4gICAgICBjcC5leGVjKGtpbGxjbWQsIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpIC0+XG4gICAgICAgIGNvbnNvbGUubG9nIGVycm9yIGlmIGVycm9yP1xuICAgICAgICBjb25zb2xlLmxvZyBcIj4gI3traWxsY21kfVxcblxcbiN7c3Rkb3V0fVwiIGlmIHN0ZG91dD9cbiAgICAgICAgY29uc29sZS5sb2cgc3RkZXJyIGlmIHN0ZGVycilcblxuICBiaW5DaGVjazogKGJpbmFyeSkgLT5cbiAgICBpZiBoYi5zeW5jIGJpbmFyeVxuICAgICAgcmV0dXJuIHRydWVcbiAgICByZXR1cm4gZmFsc2VcblxuICBzZXRDbWRzOiAtPlxuICAgIEBsYXRleC5tYW5hZ2VyLmxvYWRMb2NhbENmZygpXG4gICAgaWYgQGxhdGV4Lm1hbmFnZXIuY29uZmlnPy50b29sY2hhaW5cbiAgICAgIEBjdXN0b21fdG9vbGNoYWluKEBsYXRleC5tYW5hZ2VyLmNvbmZpZy50b29sY2hhaW4pXG4gICAgZWxzZSBpZiBhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbGF0ZXgudG9vbGNoYWluJykgPT0gJ2F1dG8nXG4gICAgICBpZiAhQGxhdGV4bWtfdG9vbGNoYWluKClcbiAgICAgICAgQGN1c3RvbV90b29sY2hhaW4oKVxuICAgIGVsc2UgaWYgYXRvbS5jb25maWcuZ2V0KCdhdG9tLWxhdGV4LnRvb2xjaGFpbicpID09ICdsYXRleG1rIHRvb2xjaGFpbidcbiAgICAgIEBsYXRleG1rX3Rvb2xjaGFpbigpXG4gICAgZWxzZSBpZiBhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbGF0ZXgudG9vbGNoYWluJykgPT0gJ2N1c3RvbSB0b29sY2hhaW4nXG4gICAgICBAY3VzdG9tX3Rvb2xjaGFpbigpXG5cbiAgbGF0ZXhta190b29sY2hhaW46IC0+XG4gICAgQGNtZHMgPSBbXG4gICAgICBcIlwiXCJsYXRleG1rIFxcXG4gICAgICAje2F0b20uY29uZmlnLmdldCgnYXRvbS1sYXRleC5sYXRleG1rX3BhcmFtJyl9IFxcXG4gICAgICAje0Blc2NhcGVGaWxlTmFtZShwYXRoLmJhc2VuYW1lKEBsYXRleC5tYWluRmlsZSwgJy50ZXgnKSl9XCJcIlwiXG4gICAgXVxuICAgIGlmICFAYmluQ2hlY2soJ2xhdGV4bWsnKSBvciAhQGJpbkNoZWNrKCdwZXJsJylcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIHJldHVybiB0cnVlXG5cbiAgY3VzdG9tX3Rvb2xjaGFpbjogKHRvb2xjaGFpbikgLT5cbiAgICB0ZXhDb21waWxlciA9IGF0b20uY29uZmlnLmdldCgnYXRvbS1sYXRleC5jb21waWxlcicpXG4gICAgYmliQ29tcGlsZXIgPSBhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbGF0ZXguYmlidGV4JylcbiAgICBhcmdzID0gYXRvbS5jb25maWcuZ2V0KCdhdG9tLWxhdGV4LmNvbXBpbGVyX3BhcmFtJylcbiAgICBpZiAhdG9vbGNoYWluP1xuICAgICAgdG9vbGNoYWluID0gYXRvbS5jb25maWcuZ2V0KCdhdG9tLWxhdGV4LmN1c3RvbV90b29sY2hhaW4nKVxuICAgIHRvb2xjaGFpbiA9IHRvb2xjaGFpbi5zcGxpdCgnJiYnKS5tYXAoKGNtZCkgLT4gY21kLnRyaW0oKSlcbiAgICBAY21kcyA9IFtdXG4gICAgcmVzdWx0ID0gW11cbiAgICBmb3IgdG9vbFByb3RvdHlwZSBpbiB0b29sY2hhaW5cbiAgICAgIGNtZCA9IHRvb2xQcm90b3R5cGVcbiAgICAgIGNtZCA9IGNtZC5zcGxpdCgnJVRFWCcpLmpvaW4odGV4Q29tcGlsZXIpXG4gICAgICBjbWQgPSBjbWQuc3BsaXQoJyVCSUInKS5qb2luKGJpYkNvbXBpbGVyKVxuICAgICAgY21kID0gY21kLnNwbGl0KCclQVJHJykuam9pbihhcmdzKVxuICAgICAgY21kID0gY21kLnNwbGl0KCclRE9DJykuam9pbihcbiAgICAgICAgIyBnZXQgYmFzZW5hbWUgYW5kIHN0cmlwIGZpbGUgZXh0ZW5zaW9uc1xuICAgICAgICBAZXNjYXBlRmlsZU5hbWUocGF0aC5iYXNlbmFtZShAbGF0ZXgubWFpbkZpbGUpLnJlcGxhY2UoL1xcLihbXlxcL10qKSQvLCAnJykpXG4gICAgICApXG4gICAgICBjbWQgPSBjbWQuc3BsaXQoJyVFWFQnKS5qb2luKHBhdGguYmFzZW5hbWUoQGxhdGV4Lm1haW5GaWxlKS5tYXRjaCgvXFwuKFteXFwvXSopJC8pWzFdKVxuICAgICAgQGNtZHMucHVzaCBjbWRcblxuICBlc2NhcGVGaWxlTmFtZTogKGZpbGUpIC0+XG4gICAgaWYgZmlsZS5pbmRleE9mKCcgJykgPiAtMVxuICAgICAgcmV0dXJuICdcIicgKyBmaWxlICsgJ1wiJ1xuICAgIHJldHVybiBmaWxlXG4iXX0=
