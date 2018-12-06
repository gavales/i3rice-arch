(function() {
  var Disposable, Manager, chokidar, fs, path,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Disposable = require('atom').Disposable;

  fs = require('fs');

  path = require('path');

  chokidar = require('chokidar');

  module.exports = Manager = (function(superClass) {
    extend(Manager, superClass);

    function Manager(latex) {
      this.latex = latex;
      this.disable_watcher = atom.config.get("atom-latex.disable_watcher");
      this.watched = [];
    }

    Manager.prototype.rootDir = function() {
      var editor, ref, texEditors;
      texEditors = (function() {
        var i, len, ref, results;
        ref = atom.workspace.getTextEditors();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          editor = ref[i];
          if (editor.getGrammar().scopeName.match(/text.tex.latex/)) {
            results.push(editor);
          }
        }
        return results;
      })();
      if (ref = atom.workspace.getActiveTextEditor(), indexOf.call(texEditors, ref) >= 0) {
        return atom.project.relativizePath(atom.workspace.getActiveTextEditor().getPath())[0];
      } else if (texEditors.length > 0) {
        return atom.project.relativizePath(texEditors[0].getPath())[0];
      } else {
        this.latex.logger.log.push({
          type: status,
          text: "No active TeX editors were open - Setting Project: " + (atom.project.getPaths()[0])
        });
      }
      return atom.project.getPaths()[0];
    };

    Manager.prototype.loadLocalCfg = function() {
      var err, fileContent, filePath, rootDir;
      if ((this.lastCfgTime != null) && Date.now() - this.lastCfgTime < 200 || (atom.workspace.getActiveTextEditor() == null)) {
        return this.config != null;
      }
      this.lastCfgTime = Date.now();
      rootDir = this.rootDir();
      if (rootDir == null) {
        return false;
      }
      if (indexOf.call(fs.readdirSync(rootDir), '.latexcfg') >= 0) {
        try {
          filePath = path.join(rootDir, '.latexcfg');
          fileContent = fs.readFileSync(filePath, 'utf-8');
          this.config = JSON.parse(fileContent);
          if (this.config.root != null) {
            this.config.root = path.resolve(rootDir, this.config.root);
          }
          return true;
        } catch (error) {
          err = error;
          console.log(err);
        }
      }
      return false;
    };

    Manager.prototype.isTexFile = function(name) {
      var ref, ref1, ref2;
      this.latex.manager.loadLocalCfg();
      if (((ref = path.extname(name)) === '.tex' || ref === '.tikz') || ((ref1 = this.latex.manager.config) != null ? (ref2 = ref1.latex_ext) != null ? ref2.indexOf(path.extname(name)) : void 0 : void 0) > -1) {
        return true;
      }
      return false;
    };

    Manager.prototype.findMain = function(here) {
      var result;
      result = this.findMainSequence(here);
      if (result && !fs.existsSync(this.latex.mainFile)) {
        this.latex.logger.processError("Invalid LaTeX root file `" + (path.basename(this.latex.mainFile)) + "`", "The path " + this.latex.mainFile + " does not exist!", true, [
          {
            text: "Set LaTeX root",
            onDidClick: (function(_this) {
              return function() {
                _this.latex.manager.refindMain();
                return _this.latex.logger.clearBuildError();
              };
            })(this)
          }
        ]);
        return false;
      }
      this.latex.panel.view.update();
      return result;
    };

    Manager.prototype.refindMain = function() {
      var input;
      input = document.getElementById('atom-latex-root-input');
      input.onchange = ((function(_this) {
        return function() {
          if (input.files.length > 0) {
            _this.latex.mainFile = input.files[0].path;
          }
          return _this.latex.panel.view.update();
        };
      })(this));
      return input.click();
    };

    Manager.prototype.findMainSequence = function(here) {
      if (here) {
        if (this.findMainSelfMagic()) {
          return true;
        }
        if (this.findMainSelf()) {
          return true;
        }
      }
      if ((this.latex.mainFile != null) && atom.project.relativizePath(this.latex.mainFile)[0] === this.rootDir()) {
        return true;
      }
      if (this.findMainConfig()) {
        return true;
      }
      if (this.findMainSelfMagic()) {
        return true;
      }
      if (this.findMainSelf()) {
        return true;
      }
      if (this.findMainAllRoot()) {
        return true;
      }
      this.latex.logger.missingMain();
      return false;
    };

    Manager.prototype.findMainSelf = function() {
      var currentContent, currentPath, docRegex, editor;
      docRegex = /\\begin{document}/;
      editor = atom.workspace.getActiveTextEditor();
      currentPath = editor != null ? editor.getPath() : void 0;
      currentContent = editor != null ? editor.getText() : void 0;
      if (currentPath && currentContent) {
        if (this.isTexFile(currentPath) && currentContent.match(docRegex)) {
          this.latex.mainFile = currentPath;
          this.latex.logger.setMain('self');
          return true;
        }
      }
      return false;
    };

    Manager.prototype.findMainSelfMagic = function() {
      var currentContent, currentPath, editor, magicRegex, result;
      magicRegex = /(?:%\s*!TEX\sroot\s*=\s*([^\s]*\.tex)$)/m;
      editor = atom.workspace.getActiveTextEditor();
      currentPath = editor != null ? editor.getPath() : void 0;
      currentContent = editor != null ? editor.getText() : void 0;
      if (currentPath && currentContent) {
        if (this.isTexFile(currentPath)) {
          result = currentContent.match(magicRegex);
          if (result) {
            this.latex.mainFile = path.resolve(path.dirname(currentPath), result[1]);
            this.latex.logger.setMain('magic');
            return true;
          }
        }
      }
      return false;
    };

    Manager.prototype.findMainConfig = function() {
      var ref;
      this.loadLocalCfg();
      if ((ref = this.config) != null ? ref.root : void 0) {
        this.latex.mainFile = this.config.root;
        this.latex.logger.setMain('config');
        return true;
      }
      return false;
    };

    Manager.prototype.findMainAllRoot = function() {
      var docRegex, file, fileContent, filePath, i, j, len, len1, ref, ref1, rootDir;
      docRegex = /\\begin{document}/;
      ref = atom.project.getPaths();
      for (i = 0, len = ref.length; i < len; i++) {
        rootDir = ref[i];
        ref1 = fs.readdirSync(rootDir);
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          file = ref1[j];
          if (!this.isTexFile(file)) {
            continue;
          }
          filePath = path.join(rootDir, file);
          fileContent = fs.readFileSync(filePath, 'utf-8');
          if (fileContent.match(docRegex)) {
            this.latex.mainFile = filePath;
            this.latex.logger.setMain('all');
            return true;
          }
        }
      }
      return false;
    };

    Manager.prototype.findPDF = function() {
      var pdfPath;
      if (!this.findMain()) {
        return false;
      }
      pdfPath = this.latex.mainFile.replace(/\.([^\\|\/]*)$/, '.pdf');
      this.latex.logger.debuglog.info("PDF path: " + pdfPath);
      return pdfPath;
    };

    Manager.prototype.prevWatcherClosed = function(watcher, watchPath) {
      var watchedPaths;
      watchedPaths = watcher.getWatched();
      if (!(watchPath in watchedPaths)) {
        this.latex.provider.command.resetCommands();
        this.latex.provider.reference.resetRefItems();
        this.latex.provider.subFiles.resetFileItems();
        this.latex.provider.citation.resetBibItems();
        watcher.close();
        return true;
      } else {
        return false;
      }
    };

    Manager.prototype.watchRoot = function() {
      var ref, root, watchFileExts;
      root = this.rootDir();
      if (root == null) {
        return false;
      }
      if ((this.rootWatcher == null) || this.prevWatcherClosed(this.rootWatcher, root)) {
        this.latex.logger.log.push({
          type: status,
          text: "Watching project " + root + " for changes"
        });
        watchFileExts = ['png', 'eps', 'jpeg', 'jpg', 'pdf', 'tex', 'bib'];
        if (((ref = this.latex.manager.config) != null ? ref.latex_ext : void 0) != null) {
          watchFileExts.push.apply(watchFileExts, this.latex.manager.config.latex_ext);
        }
        this.rootWatcher = chokidar.watch(root, {
          ignored: RegExp("(|[\\/\\\\])\\.(?!" + (watchFileExts.join("|").replace(/\./g, '')) + ")", "g")
        });
        this.watched.push(root);
        console.time('RootWatcher Init');
        this.rootWatcher.on('add', (function(_this) {
          return function(fpath) {
            _this.watchActions(fpath, 'add');
          };
        })(this));
        this.rootWatcher.on('ready', (function(_this) {
          return function() {
            _this.rootWatcher.on('change', function(fpath, stats) {
              if (_this.isTexFile(fpath)) {
                if (fpath === _this.latex.mainFile) {
                  _this.latex.texFiles = [_this.latex.mainFile];
                  _this.latex.bibFiles = [];
                  _this.findDependentFiles(_this.latex.mainFile);
                }
                _this.watchActions(fpath);
              }
            });
            return _this.rootWatcher.on('unlink', function(fpath) {
              _this.watchActions(fpath, 'unlink');
            });
          };
        })(this));
        console.timeEnd('RootWatcher Init');
        return true;
      }
      return false;
    };

    Manager.prototype.watchActions = function(fpath, event) {
      if (event === 'add') {
        this.latex.provider.subFiles.getFileItems(fpath);
      } else if (event === 'unlink') {
        this.latex.provider.subFiles.resetFileItems(fpath);
        this.latex.provider.reference.resetRefItems(fpath);
      }
      if (this.isTexFile(fpath)) {
        this.latex.provider.command.getCommands(fpath);
        return this.latex.provider.reference.getRefItems(fpath);
      }
    };

    Manager.prototype.findAll = function() {
      var file, i, len, ref;
      if (!this.findMain()) {
        return false;
      }
      if (this.disable_watcher || this.watchRoot()) {
        this.latex.texFiles = [this.latex.mainFile];
        this.latex.bibFiles = [];
        this.findDependentFiles(this.latex.mainFile);
        if (this.disable_watcher) {
          ref = this.latex.texFiles;
          for (i = 0, len = ref.length; i < len; i++) {
            file = ref[i];
            this.watchActions(file, 'add');
          }
        }
      }
      return true;
    };

    Manager.prototype.findDependentFiles = function(file) {
      var baseDir, bib, bibReg, bibs, content, filePath, fpath, i, inputFile, inputReg, j, len, len1, ref, result;
      content = fs.readFileSync(file, 'utf-8');
      baseDir = path.dirname(this.latex.mainFile);
      inputReg = /(?:\\(?:input|include|subfile)(?:\[[^\[\]\{\}]*\])?){([^}]*)}/g;
      while (true) {
        result = inputReg.exec(content);
        if (result == null) {
          break;
        }
        inputFile = result[1];
        if (path.extname(inputFile) === '') {
          inputFile += '.tex';
        }
        filePath = path.resolve(path.join(baseDir, inputFile));
        if (this.latex.texFiles.indexOf(filePath) < 0 && fs.existsSync(filePath)) {
          this.latex.texFiles.push(filePath);
          this.findDependentFiles(filePath);
        }
      }
      bibReg = /(?:\\(?:bibliography|addbibresource)(?:\[[^\[\]\{\}]*\])?){(.+?)}/g;
      while (true) {
        result = bibReg.exec(content);
        if (result == null) {
          break;
        }
        bibs = result[1].split(',').map(function(bib) {
          return bib.trim();
        });
        for (i = 0, len = bibs.length; i < len; i++) {
          bib = bibs[i];
          this.addBibToWatcher(bib);
        }
      }
      ref = this.watched;
      for (j = 0, len1 = ref.length; j < len1; j++) {
        fpath = ref[j];
        if ((fpath != null) && indexOf.call(this.latex.bibFiles, fpath) < 0 && !(fpath.indexOf('.bib') < 0)) {
          this.latex.provider.citation.resetBibItems(fpath);
          this.bibWatcher.unwatch(fpath);
          this.watched.splice(this.watched.indexOf(fpath), 1);
        }
      }
      return true;
    };

    Manager.prototype.addBibToWatcher = function(bib) {
      if (path.extname(bib) === '') {
        bib += '.bib';
      }
      bib = path.resolve(path.join(path.dirname(this.latex.mainFile), bib));
      if (this.latex.bibFiles.indexOf(bib) < 0) {
        this.latex.bibFiles.push(bib);
      }
      if (this.disable_watcher) {
        this.latex.provider.citation.getBibItems(bib);
        return;
      }
      if ((this.bibWatcher == null) || this.bibWatcher.closed) {
        this.bibWatcher = chokidar.watch(bib);
        this.watched.push(bib);
        this.bibWatcher.on('add', (function(_this) {
          return function(fpath) {
            _this.latex.provider.citation.getBibItems(fpath);
          };
        })(this));
        this.bibWatcher.on('change', (function(_this) {
          return function(fpath) {
            _this.latex.provider.citation.getBibItems(fpath);
          };
        })(this));
        return this.bibWatcher.on('unlink', (function(_this) {
          return function(fpath) {
            _this.latex.provider.citation.resetBibItems(fpath);
            _this.bibWatcher.unwatch(fpath);
            _this.watched.splice(_this.watched.indexOf(fpath), 1);
          };
        })(this));
      } else if (indexOf.call(this.watched, bib) < 0) {
        this.bibWatcher.add(bib);
        return this.watched.push(bib);
      }
    };

    return Manager;

  })(Disposable);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi9tYW5hZ2VyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsdUNBQUE7SUFBQTs7OztFQUFFLGFBQWUsT0FBQSxDQUFRLE1BQVI7O0VBQ2pCLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUjs7RUFDTCxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVI7O0VBQ1AsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztFQUVYLE1BQU0sQ0FBQyxPQUFQLEdBQ007OztJQUNTLGlCQUFDLEtBQUQ7TUFDWCxJQUFDLENBQUEsS0FBRCxHQUFTO01BQ1QsSUFBQyxDQUFBLGVBQUQsR0FBbUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDRCQUFoQjtNQUNuQixJQUFDLENBQUEsT0FBRCxHQUFXO0lBSEE7O3NCQUliLE9BQUEsR0FBUyxTQUFBO0FBRVAsVUFBQTtNQUFBLFVBQUE7O0FBQWM7QUFBQTthQUFBLHFDQUFBOztjQUNPLE1BQU0sQ0FBQyxVQUFQLENBQUEsQ0FBbUIsQ0FBQyxTQUFTLENBQUMsS0FBOUIsQ0FBb0MsZ0JBQXBDO3lCQURQOztBQUFBOzs7TUFFZCxVQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQSxDQUFBLEVBQUEsYUFBd0MsVUFBeEMsRUFBQSxHQUFBLE1BQUg7QUFDRSxlQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYixDQUE0QixJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFmLENBQUEsQ0FBb0MsQ0FBQyxPQUFyQyxDQUFBLENBQTVCLENBQTRFLENBQUEsQ0FBQSxFQURyRjtPQUFBLE1BRUssSUFBRyxVQUFVLENBQUMsTUFBWCxHQUFvQixDQUF2QjtBQUNILGVBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFiLENBQTRCLFVBQVcsQ0FBQSxDQUFBLENBQUUsQ0FBQyxP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QUMsQ0FBQSxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUF6QixDQUF1QyxLQUF2QztZQUNBLEtBQUMsQ0FBQSxVQUFVLENBQUMsT0FBWixDQUFvQixLQUFwQjtZQUNBLEtBQUMsQ0FBQSxPQUFPLENBQUMsTUFBVCxDQUFnQixLQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsQ0FBaUIsS0FBakIsQ0FBaEIsRUFBd0MsQ0FBeEM7VUFKdUI7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXpCLEVBcEJGO09BQUEsTUEwQkssSUFBRyxhQUFXLElBQUMsQ0FBQSxPQUFaLEVBQUEsR0FBQSxLQUFIO1FBRUgsSUFBQyxDQUFBLFVBQVUsQ0FBQyxHQUFaLENBQWdCLEdBQWhCO2VBQ0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsR0FBZCxFQUhHOztJQXBDVTs7OztLQTlQRztBQU50QiIsInNvdXJjZXNDb250ZW50IjpbInsgRGlzcG9zYWJsZSB9ID0gcmVxdWlyZSAnYXRvbSdcbmZzID0gcmVxdWlyZSAnZnMnXG5wYXRoID0gcmVxdWlyZSAncGF0aCdcbmNob2tpZGFyID0gcmVxdWlyZSAnY2hva2lkYXInXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIE1hbmFnZXIgZXh0ZW5kcyBEaXNwb3NhYmxlXG4gIGNvbnN0cnVjdG9yOiAobGF0ZXgpIC0+XG4gICAgQGxhdGV4ID0gbGF0ZXhcbiAgICBAZGlzYWJsZV93YXRjaGVyID0gYXRvbS5jb25maWcuZ2V0IFwiYXRvbS1sYXRleC5kaXNhYmxlX3dhdGNoZXJcIlxuICAgIEB3YXRjaGVkID0gW11cbiAgcm9vdERpcjogLT5cbiAgICAjIENvbGxlY3QgYWxsIG9wZW4gVGV4dEVkaXRvcnMgd2l0aCBMYVRlWCBncmFtbWFyXG4gICAgdGV4RWRpdG9ycyA9IChlZGl0b3IgZm9yIGVkaXRvciBpbiBhdG9tLndvcmtzcGFjZS5nZXRUZXh0RWRpdG9ycygpXFxcbiAgICAgICAgICAgICAgICAgICAgd2hlbiBlZGl0b3IuZ2V0R3JhbW1hcigpLnNjb3BlTmFtZS5tYXRjaCgvdGV4dC50ZXgubGF0ZXgvKSlcbiAgICBpZiBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKCkgaW4gdGV4RWRpdG9ycyAjIEFuIGFjdGl2ZSBUZVhlZGl0b3IgaXMgb3BlblxuICAgICAgcmV0dXJuIGF0b20ucHJvamVjdC5yZWxhdGl2aXplUGF0aChhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKCkuZ2V0UGF0aCgpKVswXVxuICAgIGVsc2UgaWYgdGV4RWRpdG9ycy5sZW5ndGggPiAwICAgIyBGaXJzdCBvcGVuIGVkaXRvciB3aXRoIExhVGVYIGdyYW1tYXJcbiAgICAgIHJldHVybiBhdG9tLnByb2plY3QucmVsYXRpdml6ZVBhdGgodGV4RWRpdG9yc1swXS5nZXRQYXRoKCkpWzBdXG4gICAgZWxzZSAjIGJhY2t1cCwgcmV0dXJuIGZpcnN0IGFjdGl2ZSBwcm9qZWN0XG4gICAgICAgIEBsYXRleC5sb2dnZXIubG9nLnB1c2gge1xuICAgICAgICAgIHR5cGU6IHN0YXR1c1xuICAgICAgICAgIHRleHQ6IFwiTm8gYWN0aXZlIFRlWCBlZGl0b3JzIHdlcmUgb3BlbiAtIFNldHRpbmcgUHJvamVjdDogI3thdG9tLnByb2plY3QuZ2V0UGF0aHMoKVswXX1cIlxuICAgICAgICB9XG4gICAgICByZXR1cm4gYXRvbS5wcm9qZWN0LmdldFBhdGhzKClbMF1cblxuICBsb2FkTG9jYWxDZmc6IC0+XG4gICAgaWYgQGxhc3RDZmdUaW1lPyBhbmQgRGF0ZS5ub3coKSAtIEBsYXN0Q2ZnVGltZSA8IDIwMCBvclxcXG4gICAgICAgIWF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKT9cbiAgICAgIHJldHVybiBAY29uZmlnP1xuICAgIEBsYXN0Q2ZnVGltZSA9IERhdGUubm93KClcbiAgICByb290RGlyID0gQHJvb3REaXIoKVxuICAgIHJldHVybiBmYWxzZSBpZiAhcm9vdERpcj9cbiAgICBpZiAnLmxhdGV4Y2ZnJyBpbiBmcy5yZWFkZGlyU3luYyByb290RGlyXG4gICAgICB0cnlcbiAgICAgICAgZmlsZVBhdGggPSBwYXRoLmpvaW4gcm9vdERpciwgJy5sYXRleGNmZydcbiAgICAgICAgZmlsZUNvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMgZmlsZVBhdGgsICd1dGYtOCdcbiAgICAgICAgQGNvbmZpZyA9IEpTT04ucGFyc2UgZmlsZUNvbnRlbnRcbiAgICAgICAgaWYgQGNvbmZpZy5yb290P1xuICAgICAgICAgIEBjb25maWcucm9vdCA9IHBhdGgucmVzb2x2ZSByb290RGlyLCBAY29uZmlnLnJvb3RcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIGNhdGNoIGVyclxuICAgICAgICBjb25zb2xlLmxvZyBlcnJcbiAgICByZXR1cm4gZmFsc2VcblxuICBpc1RleEZpbGU6IChuYW1lKSAtPlxuICAgIEBsYXRleC5tYW5hZ2VyLmxvYWRMb2NhbENmZygpXG4gICAgaWYgcGF0aC5leHRuYW1lKG5hbWUpIGluIFsnLnRleCcsJy50aWt6J10gb3IgXFxcbiAgICAgICAgQGxhdGV4Lm1hbmFnZXIuY29uZmlnPy5sYXRleF9leHQ/LmluZGV4T2YocGF0aC5leHRuYW1lKG5hbWUpKSA+IC0xXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiBmYWxzZVxuXG4gIGZpbmRNYWluOiAoaGVyZSkgLT5cbiAgICByZXN1bHQgPSBAZmluZE1haW5TZXF1ZW5jZShoZXJlKVxuICAgIGlmIHJlc3VsdCBhbmQgIWZzLmV4aXN0c1N5bmMoQGxhdGV4Lm1haW5GaWxlKVxuICAgICAgQGxhdGV4LmxvZ2dlci5wcm9jZXNzRXJyb3IoXG4gICAgICAgIFwiSW52YWxpZCBMYVRlWCByb290IGZpbGUgYCN7cGF0aC5iYXNlbmFtZShAbGF0ZXgubWFpbkZpbGUpfWBcIixcbiAgICAgICAgXCJUaGUgcGF0aCAje0BsYXRleC5tYWluRmlsZX0gZG9lcyBub3QgZXhpc3QhXCIsIHRydWUsXG4gICAgICAgIFt7XG4gICAgICAgICAgdGV4dDogXCJTZXQgTGFUZVggcm9vdFwiXG4gICAgICAgICAgb25EaWRDbGljazogPT5cbiAgICAgICAgICAgIEBsYXRleC5tYW5hZ2VyLnJlZmluZE1haW4oKVxuICAgICAgICAgICAgQGxhdGV4LmxvZ2dlci5jbGVhckJ1aWxkRXJyb3IoKVxuICAgICAgICB9XSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIEBsYXRleC5wYW5lbC52aWV3LnVwZGF0ZSgpXG4gICAgcmV0dXJuIHJlc3VsdFxuXG4gIHJlZmluZE1haW46ICgpIC0+XG4gICAgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXRvbS1sYXRleC1yb290LWlucHV0JylcbiAgICBpbnB1dC5vbmNoYW5nZSA9ICg9PlxuICAgICAgaWYgaW5wdXQuZmlsZXMubGVuZ3RoID4gMFxuICAgICAgICBAbGF0ZXgubWFpbkZpbGUgPSBpbnB1dC5maWxlc1swXS5wYXRoXG4gICAgICBAbGF0ZXgucGFuZWwudmlldy51cGRhdGUoKVxuICAgIClcbiAgICBpbnB1dC5jbGljaygpXG5cbiAgZmluZE1haW5TZXF1ZW5jZTogKGhlcmUpIC0+XG4gICAgaWYgaGVyZVxuICAgICAgcmV0dXJuIHRydWUgaWYgQGZpbmRNYWluU2VsZk1hZ2ljKClcbiAgICAgIHJldHVybiB0cnVlIGlmIEBmaW5kTWFpblNlbGYoKVxuXG4gICAgIyBDaGVjayBpZiB0aGUgbWFpbkZpbGUgaXMgcGFydCBvZiB0aGUgY3VyZW50IHByb2plY3QgcGF0aFxuICAgIGlmIEBsYXRleC5tYWluRmlsZT8gYW5kIGF0b20ucHJvamVjdC5yZWxhdGl2aXplUGF0aChAbGF0ZXgubWFpbkZpbGUpWzBdID09IEByb290RGlyKClcbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICByZXR1cm4gdHJ1ZSBpZiBAZmluZE1haW5Db25maWcoKVxuICAgIHJldHVybiB0cnVlIGlmIEBmaW5kTWFpblNlbGZNYWdpYygpXG4gICAgcmV0dXJuIHRydWUgaWYgQGZpbmRNYWluU2VsZigpXG4gICAgcmV0dXJuIHRydWUgaWYgQGZpbmRNYWluQWxsUm9vdCgpXG5cbiAgICBAbGF0ZXgubG9nZ2VyLm1pc3NpbmdNYWluKClcbiAgICByZXR1cm4gZmFsc2VcblxuICBmaW5kTWFpblNlbGY6IC0+XG4gICAgZG9jUmVnZXggPSAvXFxcXGJlZ2lue2RvY3VtZW50fS9cbiAgICBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcbiAgICBjdXJyZW50UGF0aCA9IGVkaXRvcj8uZ2V0UGF0aCgpXG4gICAgY3VycmVudENvbnRlbnQgPSBlZGl0b3I/LmdldFRleHQoKVxuXG4gICAgaWYgY3VycmVudFBhdGggYW5kIGN1cnJlbnRDb250ZW50XG4gICAgICBpZiBAaXNUZXhGaWxlKGN1cnJlbnRQYXRoKSBhbmQgY3VycmVudENvbnRlbnQubWF0Y2goZG9jUmVnZXgpXG4gICAgICAgIEBsYXRleC5tYWluRmlsZSA9IGN1cnJlbnRQYXRoXG4gICAgICAgIEBsYXRleC5sb2dnZXIuc2V0TWFpbignc2VsZicpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgZmluZE1haW5TZWxmTWFnaWM6IC0+XG4gICAgbWFnaWNSZWdleCA9IC8oPzolXFxzKiFURVhcXHNyb290XFxzKj1cXHMqKFteXFxzXSpcXC50ZXgpJCkvbVxuICAgIGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuICAgIGN1cnJlbnRQYXRoID0gZWRpdG9yPy5nZXRQYXRoKClcbiAgICBjdXJyZW50Q29udGVudCA9IGVkaXRvcj8uZ2V0VGV4dCgpXG5cbiAgICBpZiBjdXJyZW50UGF0aCBhbmQgY3VycmVudENvbnRlbnRcbiAgICAgIGlmIEBpc1RleEZpbGUoY3VycmVudFBhdGgpXG4gICAgICAgIHJlc3VsdCA9IGN1cnJlbnRDb250ZW50Lm1hdGNoIG1hZ2ljUmVnZXhcbiAgICAgICAgaWYgcmVzdWx0XG4gICAgICAgICAgQGxhdGV4Lm1haW5GaWxlID0gcGF0aC5yZXNvbHZlKHBhdGguZGlybmFtZShjdXJyZW50UGF0aCksIHJlc3VsdFsxXSlcbiAgICAgICAgICBAbGF0ZXgubG9nZ2VyLnNldE1haW4oJ21hZ2ljJylcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiBmYWxzZVxuXG4gIGZpbmRNYWluQ29uZmlnOiAtPlxuICAgIEBsb2FkTG9jYWxDZmcoKVxuICAgIGlmIEBjb25maWc/LnJvb3RcbiAgICAgIEBsYXRleC5tYWluRmlsZSA9IEBjb25maWcucm9vdFxuICAgICAgQGxhdGV4LmxvZ2dlci5zZXRNYWluKCdjb25maWcnKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICByZXR1cm4gZmFsc2VcblxuICBmaW5kTWFpbkFsbFJvb3Q6IC0+XG4gICAgZG9jUmVnZXggPSAvXFxcXGJlZ2lue2RvY3VtZW50fS9cbiAgICBmb3Igcm9vdERpciBpbiBhdG9tLnByb2plY3QuZ2V0UGF0aHMoKVxuICAgICAgZm9yIGZpbGUgaW4gZnMucmVhZGRpclN5bmMgcm9vdERpclxuICAgICAgICBjb250aW51ZSBpZiAhQGlzVGV4RmlsZShmaWxlKVxuICAgICAgICBmaWxlUGF0aCA9IHBhdGguam9pbiByb290RGlyLCBmaWxlXG4gICAgICAgIGZpbGVDb250ZW50ID0gZnMucmVhZEZpbGVTeW5jIGZpbGVQYXRoLCAndXRmLTgnXG4gICAgICAgIGlmIGZpbGVDb250ZW50Lm1hdGNoIGRvY1JlZ2V4XG4gICAgICAgICAgQGxhdGV4Lm1haW5GaWxlID0gZmlsZVBhdGhcbiAgICAgICAgICBAbGF0ZXgubG9nZ2VyLnNldE1haW4oJ2FsbCcpXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICByZXR1cm4gZmFsc2VcblxuICBmaW5kUERGOiAtPlxuICAgIGlmICFAZmluZE1haW4oKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgIyAvL3NvbWUucGF0aC90by9tYWluRmlsZS5ibGFoLnRleCAtPiAvL3NvbWUucGF0aC90by9tYWluRmlsZS9tYWluRmlsZS5wZGZcbiAgICBwZGZQYXRoID0gQGxhdGV4Lm1haW5GaWxlLnJlcGxhY2UoL1xcLihbXlxcXFx8XFwvXSopJC8sICcucGRmJylcbiAgICBAbGF0ZXgubG9nZ2VyLmRlYnVnbG9nLmluZm8oXCJcIlwiUERGIHBhdGg6ICN7cGRmUGF0aH1cIlwiXCIpXG4gICAgcmV0dXJuIHBkZlBhdGhcblxuICBwcmV2V2F0Y2hlckNsb3NlZDogKHdhdGNoZXIsIHdhdGNoUGF0aCkgLT5cbiAgICB3YXRjaGVkUGF0aHMgPSB3YXRjaGVyLmdldFdhdGNoZWQoKVxuICAgIGlmICEoIHdhdGNoUGF0aCBvZiB3YXRjaGVkUGF0aHMpXG4gICAgICAjIHJvb3RXYXRjaGVyIGV4aXN0cywgYnV0IHByb2plY3QgZGlyIGhhcyBiZWVuIGNoYW5nZWRcbiAgICAgICMgYW5kIHJlc2V0IGFsbCBzdWdnZXN0aW9ucyBhbmQgY2xvc2Ugd2F0Y2hlclxuICAgICAgQGxhdGV4LnByb3ZpZGVyLmNvbW1hbmQucmVzZXRDb21tYW5kcygpXG4gICAgICBAbGF0ZXgucHJvdmlkZXIucmVmZXJlbmNlLnJlc2V0UmVmSXRlbXMoKVxuICAgICAgQGxhdGV4LnByb3ZpZGVyLnN1YkZpbGVzLnJlc2V0RmlsZUl0ZW1zKClcbiAgICAgIEBsYXRleC5wcm92aWRlci5jaXRhdGlvbi5yZXNldEJpYkl0ZW1zKClcbiAgICAgIHdhdGNoZXIuY2xvc2UoKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICBlbHNlXG4gICAgICByZXR1cm4gZmFsc2VcblxuICB3YXRjaFJvb3Q6IC0+XG4gICAgcm9vdCA9IEByb290RGlyKClcbiAgICByZXR1cm4gZmFsc2UgaWYgIXJvb3Q/XG4gICAgaWYgIUByb290V2F0Y2hlcj8gb3IgQHByZXZXYXRjaGVyQ2xvc2VkKEByb290V2F0Y2hlcixyb290KVxuICAgICAgQGxhdGV4LmxvZ2dlci5sb2cucHVzaCB7XG4gICAgICAgIHR5cGU6IHN0YXR1c1xuICAgICAgICB0ZXh0OiBcIldhdGNoaW5nIHByb2plY3QgI3tyb290fSBmb3IgY2hhbmdlc1wiXG4gICAgICB9XG4gICAgICB3YXRjaEZpbGVFeHRzID0gWydwbmcnLCdlcHMnLCdqcGVnJywnanBnJywncGRmJywndGV4JywnYmliJ11cbiAgICAgIGlmIEBsYXRleC5tYW5hZ2VyLmNvbmZpZz8ubGF0ZXhfZXh0P1xuICAgICAgICB3YXRjaEZpbGVFeHRzLnB1c2ggQGxhdGV4Lm1hbmFnZXIuY29uZmlnLmxhdGV4X2V4dC4uLlxuICAgICAgQHJvb3RXYXRjaGVyID0gY2hva2lkYXIud2F0Y2gocm9vdCx7XG4gICAgICAgIGlnbm9yZWQ6IC8vLyh8W1xcL1xcXFxdKVxcLig/ISN7d2F0Y2hGaWxlRXh0cy5qb2luKFwifFwiKS5yZXBsYWNlKC9cXC4vZywnJyl9KS8vL2dcbiAgICAgICAgfSlcbiAgICAgIEB3YXRjaGVkLnB1c2gocm9vdClcbiAgICAgIGNvbnNvbGUudGltZSgnUm9vdFdhdGNoZXIgSW5pdCcpXG4gICAgICBAcm9vdFdhdGNoZXIub24oJ2FkZCcsKGZwYXRoKT0+XG4gICAgICAgIEB3YXRjaEFjdGlvbnMoZnBhdGgsJ2FkZCcpXG4gICAgICAgIHJldHVybilcbiAgICAgIEByb290V2F0Y2hlci5vbigncmVhZHknLFxuICAgICAgKCkgPT5cbiAgICAgICAgQHJvb3RXYXRjaGVyLm9uKCdjaGFuZ2UnLCAoZnBhdGgsc3RhdHMpID0+XG4gICAgICAgICAgaWYgQGlzVGV4RmlsZShmcGF0aClcbiAgICAgICAgICAgIGlmIGZwYXRoID09IEBsYXRleC5tYWluRmlsZVxuICAgICAgICAgICAgICAjIFVwZGF0ZSBkZXBlbmRlbnQgZmlsZXNcbiAgICAgICAgICAgICAgQGxhdGV4LnRleEZpbGVzID0gWyBAbGF0ZXgubWFpbkZpbGUgXVxuICAgICAgICAgICAgICBAbGF0ZXguYmliRmlsZXMgPSBbXVxuICAgICAgICAgICAgICBAZmluZERlcGVuZGVudEZpbGVzKEBsYXRleC5tYWluRmlsZSlcbiAgICAgICAgICAgIEB3YXRjaEFjdGlvbnMoZnBhdGgpXG4gICAgICAgICAgcmV0dXJuKVxuICAgICAgICBAcm9vdFdhdGNoZXIub24oJ3VubGluaycsKGZwYXRoKSA9PlxuICAgICAgICAgIEB3YXRjaEFjdGlvbnMoZnBhdGgsJ3VubGluaycpXG4gICAgICAgICAgcmV0dXJuKVxuICAgICAgKVxuICAgICAgY29uc29sZS50aW1lRW5kKCdSb290V2F0Y2hlciBJbml0JylcbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICByZXR1cm4gZmFsc2VcblxuICB3YXRjaEFjdGlvbnM6IChmcGF0aCxldmVudCkgLT5cbiAgICAjIFB1c2gvU3BsaWNlIGZpbGUgc3VnZ2VzdGlvbnMgb24gbmV3IGZpbGUgYWRkaXRpb25zIG9yIHJlbW92YWxzXG4gICAgaWYgZXZlbnQgaXMgJ2FkZCdcbiAgICAgIEBsYXRleC5wcm92aWRlci5zdWJGaWxlcy5nZXRGaWxlSXRlbXMoZnBhdGgpXG4gICAgZWxzZSBpZiBldmVudCBpcyAndW5saW5rJ1xuICAgICAgQGxhdGV4LnByb3ZpZGVyLnN1YkZpbGVzLiByZXNldEZpbGVJdGVtcyhmcGF0aClcbiAgICAgIEBsYXRleC5wcm92aWRlci5yZWZlcmVuY2UucmVzZXRSZWZJdGVtcyhmcGF0aClcbiAgICBpZiBAaXNUZXhGaWxlKGZwYXRoKVxuICAgICAgIyBQdXNoIGNvbW1hbmQgYW5kIHJlZmVyZW5jZXMgc3VnZ2VzdGlvbnNcbiAgICAgIEBsYXRleC5wcm92aWRlci5jb21tYW5kLmdldENvbW1hbmRzKGZwYXRoKVxuICAgICAgQGxhdGV4LnByb3ZpZGVyLnJlZmVyZW5jZS5nZXRSZWZJdGVtcyhmcGF0aClcblxuICBmaW5kQWxsOiAtPlxuICAgIGlmICFAZmluZE1haW4oKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgaWYgQGRpc2FibGVfd2F0Y2hlciBvciBAd2F0Y2hSb290KClcbiAgICAgIEBsYXRleC50ZXhGaWxlcyA9IFsgQGxhdGV4Lm1haW5GaWxlIF1cbiAgICAgIEBsYXRleC5iaWJGaWxlcyA9IFtdXG4gICAgICBAZmluZERlcGVuZGVudEZpbGVzKEBsYXRleC5tYWluRmlsZSlcbiAgICAgIGlmIEBkaXNhYmxlX3dhdGNoZXJcbiAgICAgICAgQHdhdGNoQWN0aW9ucyhmaWxlLCdhZGQnKSBmb3IgZmlsZSBpbiBAbGF0ZXgudGV4RmlsZXNcbiAgICByZXR1cm4gdHJ1ZVxuXG4gIGZpbmREZXBlbmRlbnRGaWxlczogKGZpbGUpIC0+XG4gICAgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyBmaWxlLCAndXRmLTgnXG4gICAgYmFzZURpciA9IHBhdGguZGlybmFtZShAbGF0ZXgubWFpbkZpbGUpXG5cbiAgICBpbnB1dFJlZyA9IC8oPzpcXFxcKD86aW5wdXR8aW5jbHVkZXxzdWJmaWxlKSg/OlxcW1teXFxbXFxdXFx7XFx9XSpcXF0pPyl7KFtefV0qKX0vZ1xuICAgIGxvb3BcbiAgICAgIHJlc3VsdCA9IGlucHV0UmVnLmV4ZWMgY29udGVudFxuICAgICAgYnJlYWsgaWYgIXJlc3VsdD9cbiAgICAgIGlucHV0RmlsZSA9IHJlc3VsdFsxXVxuICAgICAgaWYgcGF0aC5leHRuYW1lKGlucHV0RmlsZSkgaXMgJydcbiAgICAgICAgaW5wdXRGaWxlICs9ICcudGV4J1xuICAgICAgZmlsZVBhdGggPSBwYXRoLnJlc29sdmUocGF0aC5qb2luKGJhc2VEaXIsIGlucHV0RmlsZSkpXG4gICAgICBpZiBAbGF0ZXgudGV4RmlsZXMuaW5kZXhPZihmaWxlUGF0aCkgPCAwIGFuZCBmcy5leGlzdHNTeW5jKGZpbGVQYXRoKVxuICAgICAgICBAbGF0ZXgudGV4RmlsZXMucHVzaChmaWxlUGF0aClcbiAgICAgICAgQGZpbmREZXBlbmRlbnRGaWxlcyhmaWxlUGF0aClcblxuICAgIGJpYlJlZyA9IC8oPzpcXFxcKD86YmlibGlvZ3JhcGh5fGFkZGJpYnJlc291cmNlKSg/OlxcW1teXFxbXFxdXFx7XFx9XSpcXF0pPyl7KC4rPyl9L2dcbiAgICBsb29wXG4gICAgICByZXN1bHQgPSBiaWJSZWcuZXhlYyBjb250ZW50XG4gICAgICBicmVhayBpZiAhcmVzdWx0P1xuICAgICAgYmlicyA9IHJlc3VsdFsxXS5zcGxpdCgnLCcpLm1hcCgoYmliKSAtPiBiaWIudHJpbSgpKVxuICAgICAgQGFkZEJpYlRvV2F0Y2hlcihiaWIpIGZvciBiaWIgaW4gYmlic1xuXG4gICAgIyBSZXNldCBDaXRhdGlvbnNcbiAgICBmb3IgZnBhdGggaW4gQHdhdGNoZWRcbiAgICAgICMgVGhlIHJhY2UgaXMgb24gYi93IHRoaXMgdGVzdCBhbmQgc2V0dGluZyB1cCBiaWJXYXRjaGVyLCBoZW5jZSB0aGUgZmlyc3QgY2hlY2tcbiAgICAgIGlmIGZwYXRoPyBhbmQgZnBhdGggbm90IGluIEBsYXRleC5iaWJGaWxlcyBhbmQgIShmcGF0aC5pbmRleE9mKCcuYmliJykgPCAwKVxuICAgICAgICAjIGJpYiBmaWxlIHJlbW92ZWQsIHJlbW92ZSBjaXRhdGlvbiBzdWdnZXN0aW9ucyBhbmQgdW53YXRjaFxuICAgICAgICBAbGF0ZXgucHJvdmlkZXIuY2l0YXRpb24ucmVzZXRCaWJJdGVtcyhmcGF0aClcbiAgICAgICAgQGJpYldhdGNoZXIudW53YXRjaChmcGF0aClcbiAgICAgICAgQHdhdGNoZWQuc3BsaWNlKEB3YXRjaGVkLmluZGV4T2YoZnBhdGgpLDEpXG4gICAgcmV0dXJuIHRydWVcblxuICBhZGRCaWJUb1dhdGNoZXI6IChiaWIpIC0+XG4gICAgaWYgcGF0aC5leHRuYW1lKGJpYikgaXMgJydcbiAgICAgIGJpYiArPSAnLmJpYidcbiAgICBiaWIgPSBwYXRoLnJlc29sdmUocGF0aC5qb2luKHBhdGguZGlybmFtZShAbGF0ZXgubWFpbkZpbGUpLGJpYikpXG4gICAgaWYgQGxhdGV4LmJpYkZpbGVzLmluZGV4T2YoYmliKSA8IDBcbiAgICAgIEBsYXRleC5iaWJGaWxlcy5wdXNoKGJpYilcbiAgICBpZiBAZGlzYWJsZV93YXRjaGVyXG4gICAgICBAbGF0ZXgucHJvdmlkZXIuY2l0YXRpb24uZ2V0QmliSXRlbXMoYmliKVxuICAgICAgcmV0dXJuXG4gICAgIyBJbml0IGJpYldhdGNoZXIgbGlzdGVuZXJzXG4gICAgaWYgIUBiaWJXYXRjaGVyPyBvciBAYmliV2F0Y2hlci5jbG9zZWRcbiAgICAgIEBiaWJXYXRjaGVyID0gY2hva2lkYXIud2F0Y2goYmliKVxuICAgICAgQHdhdGNoZWQucHVzaChiaWIpXG4gICAgICAjIEBsYXRleC5sb2dnZXIubG9nLnB1c2gge1xuICAgICAgIyAgIHR5cGU6IHN0YXR1c1xuICAgICAgIyAgIHRleHQ6IFwiV2F0Y2hpbmcgYmliIGZpbGUgI3tiaWJ9IGZvciBjaGFuZ2VzXCJcbiAgICAgICMgfVxuICAgICAgIyBSZWdpc3RlciB3YXRjaGVyIGNhbGxiYWNrc1xuICAgICAgQGJpYldhdGNoZXIub24oJ2FkZCcsIChmcGF0aCkgPT5cbiAgICAgICAgIyBiaWIgZmlsZSBhZGRlZCwgcGFyc2VcbiAgICAgICAgQGxhdGV4LnByb3ZpZGVyLmNpdGF0aW9uLmdldEJpYkl0ZW1zKGZwYXRoKVxuICAgICAgICAjIEBsYXRleC5sb2dnZXIubG9nLnB1c2gge1xuICAgICAgICAjICAgdHlwZTogc3RhdHVzXG4gICAgICAgICMgICB0ZXh0OiBcIkFkZGVkIGJpYiBmaWxlICN7ZnBhdGh9IHRvIFdhdGNoZXJcIlxuICAgICAgICAjIH1cbiAgICAgICAgcmV0dXJuKVxuICAgICAgQGJpYldhdGNoZXIub24oJ2NoYW5nZScsIChmcGF0aCkgPT5cbiAgICAgICAgIyBiaWIgZmlsZSBjaGFuZ2VkLCByZXBhcnNlXG4gICAgICAgIEBsYXRleC5wcm92aWRlci5jaXRhdGlvbi5nZXRCaWJJdGVtcyhmcGF0aClcbiAgICAgICAgcmV0dXJuKVxuICAgICAgQGJpYldhdGNoZXIub24oJ3VubGluaycsIChmcGF0aCkgPT5cbiAgICAgICAgIyBiaWIgZmlsZSBkZWxldGVkLCByZW1vdmUgY2l0YXRpb24gc3VnZ2VzdGlvbnMgYW5kIHVud2F0Y2hcbiAgICAgICAgQGxhdGV4LnByb3ZpZGVyLmNpdGF0aW9uLnJlc2V0QmliSXRlbXMoZnBhdGgpXG4gICAgICAgIEBiaWJXYXRjaGVyLnVud2F0Y2goZnBhdGgpXG4gICAgICAgIEB3YXRjaGVkLnNwbGljZShAd2F0Y2hlZC5pbmRleE9mKGZwYXRoKSwxKVxuICAgICAgICByZXR1cm4pXG4gICAgZWxzZSBpZiBiaWIgbm90IGluIEB3YXRjaGVkXG4gICAgICAjIFByb2Nlc3MgbmV3IHVud2F0Y2hlZCBiaWIgZmlsZVxuICAgICAgQGJpYldhdGNoZXIuYWRkKGJpYilcbiAgICAgIEB3YXRjaGVkLnB1c2goYmliKVxuIl19
