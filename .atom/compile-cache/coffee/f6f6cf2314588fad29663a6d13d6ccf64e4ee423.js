(function() {
  var AtomLaTeX;

  module.exports = {
    config: require('./config'),
    activate: function() {
      var CompositeDisposable;
      CompositeDisposable = require('atom').CompositeDisposable;
      this.disposables = new CompositeDisposable;
      this.activated = false;
      global.atom_latex = this;
      return this.disposables.add(atom.workspace.observeTextEditors((function(_this) {
        return function(editor) {
          if (_this.activated) {
            return;
          }
          return editor.observeGrammar(function(grammar) {
            var promise;
            if ((grammar.packageName === 'atom-latex') || (grammar.scopeName.indexOf('text.tex.latex') > -1) || (grammar.name === 'LaTeX')) {
              return promise = new Promise(function(resolve, reject) {
                setTimeout((function() {
                  return _this.lazyLoad();
                }), 100);
                return resolve();
              });
            }
          });
        };
      })(this)));
    },
    lazyLoad: function() {
      var path;
      if (this.activated) {
        return;
      }
      this.activated = true;
      this.latex = new AtomLaTeX;
      this.provide();
      this.provider.lazyLoad(this.latex);
      this.latex.provider = this.provider;
      this.latex["package"] = this;
      this.disposables.add(this.latex);
      this.disposables.add(atom.commands.add('atom-workspace', {
        'atom-latex:build': (function(_this) {
          return function() {
            return _this.latex.builder.build();
          };
        })(this),
        'atom-latex:build-here': (function(_this) {
          return function() {
            return _this.latex.builder.build(true);
          };
        })(this),
        'atom-latex:clean': (function(_this) {
          return function() {
            return _this.latex.cleaner.clean();
          };
        })(this),
        'atom-latex:preview': (function(_this) {
          return function() {
            return _this.latex.viewer.openViewerNewWindow();
          };
        })(this),
        'atom-latex:preview-tab': (function(_this) {
          return function() {
            return _this.latex.viewer.openViewerNewTab();
          };
        })(this),
        'atom-latex:kill': (function(_this) {
          return function() {
            return _this.latex.builder.killProcess();
          };
        })(this),
        'atom-latex:toggle-panel': (function(_this) {
          return function() {
            return _this.latex.panel.togglePanel();
          };
        })(this),
        'atom-latex:synctex': (function(_this) {
          return function() {
            return _this.latex.locator.synctex();
          };
        })(this),
        'atom-latex:tools-doublequote': (function(_this) {
          return function() {
            return _this.latex.provider.syntax.doublequote();
          };
        })(this)
      }));
      path = require('path');
      this.disposables.add(atom.workspace.observeTextEditors((function(_this) {
        return function(editor) {
          return _this.disposables.add(editor.onDidSave(function() {
            var ref, ref1;
            if (atom.config.get('atom-latex.build_after_save') && ((ref = editor.buffer.file) != null ? ref.path : void 0)) {
              if (_this.latex.manager.isTexFile((ref1 = editor.buffer.file) != null ? ref1.path : void 0)) {
                return _this.latex.builder.build();
              }
            }
          }));
        };
      })(this)));
      if ((this.minimap != null) && atom.config.get('atom-latex.delayed_minimap_refresh')) {
        this.disposables.add(this.minimap.observeMinimaps((function(_this) {
          return function(minimap) {
            var editor, handlers, i, minimapElement, ref, ref1, ref2, ref3, results;
            minimapElement = atom.views.getView(minimap);
            editor = minimap.getTextEditor();
            if (((ref = editor.buffer.file) != null ? ref.path : void 0) && _this.latex.manager.isTexFile((ref1 = editor.buffer.file) != null ? ref1.path : void 0)) {
              handlers = (ref2 = editor.emitter) != null ? (ref3 = ref2.handlersByEventName) != null ? ref3['did-change'] : void 0 : void 0;
              if (handlers) {
                results = [];
                for (i in handlers) {
                  if (handlers[i].toString().indexOf('this.emitChanges(changes)') < 0) {
                    continue;
                  }
                  results.push(handlers[i] = function(changes) {
                    clearTimeout(minimap.latexTimeout);
                    return minimap.latexTimeout = setTimeout(function() {
                      return minimap.emitChanges(changes);
                    }, 500);
                  });
                }
                return results;
              }
            }
          };
        })(this)));
      }
      if (atom.config.get('atom-latex.hide_panel')) {
        return this.latex.panel.hidePanel();
      }
    },
    deactivate: function() {
      var ref;
      if ((ref = this.latex) != null) {
        ref.dispose();
      }
      return this.disposables.dispose();
    },
    provide: function() {
      var Provider;
      if (this.provider == null) {
        Provider = require('./provider');
        this.provider = new Provider();
        this.disposables.add(this.provider);
      }
      return this.provider.provider;
    },
    consumeMinimap: function(minimap) {
      return this.minimap = minimap;
    },
    consumeStatusBar: function(statusBar) {
      var Disposable, Status;
      if (this.status == null) {
        Status = require('./view/status');
        this.status = new Status;
        this.disposables.add(this.status);
      }
      this.status.attach(statusBar);
      Disposable = require('atom').Disposable;
      return new Disposable((function(_this) {
        return function() {
          return _this.status.detach();
        };
      })(this));
    }
  };

  AtomLaTeX = (function() {
    function AtomLaTeX() {
      var Builder, Cleaner, CompositeDisposable, Locator, Logger, Manager, Panel, Parser, Server, Viewer;
      CompositeDisposable = require('atom').CompositeDisposable;
      this.disposables = new CompositeDisposable;
      Builder = require('./builder');
      Cleaner = require('./cleaner');
      Manager = require('./manager');
      Server = require('./server');
      Viewer = require('./viewer');
      Parser = require('./parser');
      Locator = require('./locator');
      Panel = require('./view/panel');
      Logger = require('./logger');
      this.builder = new Builder(this);
      this.cleaner = new Cleaner(this);
      this.manager = new Manager(this);
      this.viewer = new Viewer(this);
      this.server = new Server(this);
      this.parser = new Parser(this);
      this.locator = new Locator(this);
      this.panel = new Panel(this);
      this.logger = new Logger(this);
      this.disposables.add(this.builder, this.cleaner, this.manager, this.server, this.viewer, this.parser, this.locator, this.panel, this.logger);
    }

    AtomLaTeX.prototype.dispose = function() {
      return this.disposables.dispose();
    };

    return AtomLaTeX;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi9tYWluLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLE1BQUEsRUFBUSxPQUFBLENBQVEsVUFBUixDQUFSO0lBRUEsUUFBQSxFQUFVLFNBQUE7QUFDUixVQUFBO01BQUUsc0JBQXdCLE9BQUEsQ0FBUSxNQUFSO01BQzFCLElBQUMsQ0FBQSxXQUFELEdBQWUsSUFBSTtNQUNuQixJQUFDLENBQUEsU0FBRCxHQUFhO01BQ2IsTUFBTSxDQUFDLFVBQVAsR0FBb0I7YUFDcEIsSUFBQyxDQUFBLFdBQVcsQ0FBQyxHQUFiLENBQWlCLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWYsQ0FBa0MsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFDLE1BQUQ7VUFDakQsSUFBVSxLQUFDLENBQUEsU0FBWDtBQUFBLG1CQUFBOztpQkFDQSxNQUFNLENBQUMsY0FBUCxDQUFzQixTQUFDLE9BQUQ7QUFDcEIsZ0JBQUE7WUFBQSxJQUFHLENBQUMsT0FBTyxDQUFDLFdBQVIsS0FBdUIsWUFBeEIsQ0FBQSxJQUNDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFsQixDQUEwQixnQkFBMUIsQ0FBQSxHQUE4QyxDQUFDLENBQWhELENBREQsSUFFQyxDQUFDLE9BQU8sQ0FBQyxJQUFSLEtBQWdCLE9BQWpCLENBRko7cUJBR0UsT0FBQSxHQUFVLElBQUksT0FBSixDQUFZLFNBQUMsT0FBRCxFQUFVLE1BQVY7Z0JBQ3BCLFVBQUEsQ0FBVyxDQUFFLFNBQUE7eUJBQUcsS0FBQyxDQUFBLFFBQUQsQ0FBQTtnQkFBSCxDQUFGLENBQVgsRUFBOEIsR0FBOUI7dUJBQ0EsT0FBQSxDQUFBO2NBRm9CLENBQVosRUFIWjs7VUFEb0IsQ0FBdEI7UUFGaUQ7TUFBQSxDQUFBLENBQUEsQ0FB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QUFBLE9BQWxCLEVBQTJCLElBQUMsQ0FBQSxPQUE1QixFQUFxQyxJQUFDLENBQUEsT0FBdEMsRUFBK0MsSUFBQyxDQUFBLE1BQWhELEVBQXdELElBQUMsQ0FBQSxNQUF6RCxFQUFpRSxJQUFDLENBQUEsTUFBbEUsRUFDRSxJQUFDLENBQUEsT0FESCxFQUNZLElBQUMsQ0FBQSxLQURiLEVBQ29CLElBQUMsQ0FBQSxNQURyQjtJQXZCVzs7d0JBMEJiLE9BQUEsR0FBUyxTQUFBO2FBQ1AsSUFBQyxDQUFBLFdBQVcsQ0FBQyxPQUFiLENBQUE7SUFETzs7Ozs7QUF2SFgiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9XG4gIGNvbmZpZzogcmVxdWlyZSAnLi9jb25maWcnXG5cbiAgYWN0aXZhdGU6IC0+XG4gICAgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gPSByZXF1aXJlICdhdG9tJ1xuICAgIEBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlXG4gICAgQGFjdGl2YXRlZCA9IGZhbHNlXG4gICAgZ2xvYmFsLmF0b21fbGF0ZXggPSB0aGlzXG4gICAgQGRpc3Bvc2FibGVzLmFkZCBhdG9tLndvcmtzcGFjZS5vYnNlcnZlVGV4dEVkaXRvcnMgKGVkaXRvcikgPT5cbiAgICAgIHJldHVybiBpZiBAYWN0aXZhdGVkXG4gICAgICBlZGl0b3Iub2JzZXJ2ZUdyYW1tYXIgKGdyYW1tYXIpID0+XG4gICAgICAgIGlmIChncmFtbWFyLnBhY2thZ2VOYW1lIGlzICdhdG9tLWxhdGV4Jykgb3JcbiAgICAgICAgICAgIChncmFtbWFyLnNjb3BlTmFtZS5pbmRleE9mKCd0ZXh0LnRleC5sYXRleCcpID4gLTEpIG9yXG4gICAgICAgICAgICAoZ3JhbW1hci5uYW1lIGlzICdMYVRlWCcpXG4gICAgICAgICAgcHJvbWlzZSA9IG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCggPT4gQGxhenlMb2FkKCkpLCAxMDApXG4gICAgICAgICAgICByZXNvbHZlKClcblxuICBsYXp5TG9hZDogLT5cbiAgICByZXR1cm4gaWYgQGFjdGl2YXRlZFxuICAgIEBhY3RpdmF0ZWQgPSB0cnVlXG5cbiAgICBAbGF0ZXggPSBuZXcgQXRvbUxhVGVYXG5cbiAgICBAcHJvdmlkZSgpXG4gICAgQHByb3ZpZGVyLmxhenlMb2FkKEBsYXRleClcbiAgICBAbGF0ZXgucHJvdmlkZXIgPSBAcHJvdmlkZXJcbiAgICBAbGF0ZXgucGFja2FnZSA9IHRoaXNcblxuICAgIEBkaXNwb3NhYmxlcy5hZGQgQGxhdGV4XG5cbiAgICBAZGlzcG9zYWJsZXMuYWRkIGF0b20uY29tbWFuZHMuYWRkICdhdG9tLXdvcmtzcGFjZScsXG4gICAgICAnYXRvbS1sYXRleDpidWlsZCc6ICgpID0+IEBsYXRleC5idWlsZGVyLmJ1aWxkKClcbiAgICAgICdhdG9tLWxhdGV4OmJ1aWxkLWhlcmUnOiAoKSA9PiBAbGF0ZXguYnVpbGRlci5idWlsZCh0cnVlKVxuICAgICAgJ2F0b20tbGF0ZXg6Y2xlYW4nOiAoKSA9PiBAbGF0ZXguY2xlYW5lci5jbGVhbigpXG4gICAgICAnYXRvbS1sYXRleDpwcmV2aWV3JzogKCkgPT4gQGxhdGV4LnZpZXdlci5vcGVuVmlld2VyTmV3V2luZG93KClcbiAgICAgICdhdG9tLWxhdGV4OnByZXZpZXctdGFiJzogKCkgPT4gQGxhdGV4LnZpZXdlci5vcGVuVmlld2VyTmV3VGFiKClcbiAgICAgICdhdG9tLWxhdGV4OmtpbGwnOiAoKSA9PiBAbGF0ZXguYnVpbGRlci5raWxsUHJvY2VzcygpXG4gICAgICAnYXRvbS1sYXRleDp0b2dnbGUtcGFuZWwnOiAoKSA9PiBAbGF0ZXgucGFuZWwudG9nZ2xlUGFuZWwoKVxuICAgICAgJ2F0b20tbGF0ZXg6c3luY3RleCc6ICgpID0+IEBsYXRleC5sb2NhdG9yLnN5bmN0ZXgoKVxuICAgICAgJ2F0b20tbGF0ZXg6dG9vbHMtZG91YmxlcXVvdGUnOiAoKSA9PiBAbGF0ZXgucHJvdmlkZXIuc3ludGF4LmRvdWJsZXF1b3RlKClcblxuICAgIHBhdGggPSByZXF1aXJlICdwYXRoJ1xuICAgIEBkaXNwb3NhYmxlcy5hZGQgYXRvbS53b3Jrc3BhY2Uub2JzZXJ2ZVRleHRFZGl0b3JzIChlZGl0b3IpID0+XG4gICAgICBAZGlzcG9zYWJsZXMuYWRkIGVkaXRvci5vbkRpZFNhdmUgKCkgPT5cbiAgICAgICAgaWYgYXRvbS5jb25maWcuZ2V0KCdhdG9tLWxhdGV4LmJ1aWxkX2FmdGVyX3NhdmUnKSBhbmQgXFxcbiAgICAgICAgICAgIGVkaXRvci5idWZmZXIuZmlsZT8ucGF0aFxuICAgICAgICAgIGlmIEBsYXRleC5tYW5hZ2VyLmlzVGV4RmlsZShlZGl0b3IuYnVmZmVyLmZpbGU/LnBhdGgpXG4gICAgICAgICAgICBAbGF0ZXguYnVpbGRlci5idWlsZCgpXG5cbiAgICBpZiBAbWluaW1hcD8gYW5kIGF0b20uY29uZmlnLmdldCgnYXRvbS1sYXRleC5kZWxheWVkX21pbmltYXBfcmVmcmVzaCcpXG4gICAgICBAZGlzcG9zYWJsZXMuYWRkIEBtaW5pbWFwLm9ic2VydmVNaW5pbWFwcyAobWluaW1hcCkgPT5cbiAgICAgICAgbWluaW1hcEVsZW1lbnQgPSBhdG9tLnZpZXdzLmdldFZpZXcobWluaW1hcClcbiAgICAgICAgZWRpdG9yID0gbWluaW1hcC5nZXRUZXh0RWRpdG9yKClcbiAgICAgICAgaWYgZWRpdG9yLmJ1ZmZlci5maWxlPy5wYXRoIGFuZCBcXFxuICAgICAgICAgICAgQGxhdGV4Lm1hbmFnZXIuaXNUZXhGaWxlKGVkaXRvci5idWZmZXIuZmlsZT8ucGF0aClcbiAgICAgICAgICBoYW5kbGVycyA9IGVkaXRvci5lbWl0dGVyPy5oYW5kbGVyc0J5RXZlbnROYW1lP1snZGlkLWNoYW5nZSddXG4gICAgICAgICAgaWYgaGFuZGxlcnNcbiAgICAgICAgICAgIGZvciBpIG9mIGhhbmRsZXJzXG4gICAgICAgICAgICAgIGlmIGhhbmRsZXJzW2ldLnRvU3RyaW5nKCkuaW5kZXhPZigndGhpcy5lbWl0Q2hhbmdlcyhjaGFuZ2VzKScpIDwgMFxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgIGhhbmRsZXJzW2ldID0gKGNoYW5nZXMpIC0+XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KG1pbmltYXAubGF0ZXhUaW1lb3V0KVxuICAgICAgICAgICAgICAgIG1pbmltYXAubGF0ZXhUaW1lb3V0ID0gc2V0VGltZW91dCggLT5cbiAgICAgICAgICAgICAgICAgIG1pbmltYXAuZW1pdENoYW5nZXMoY2hhbmdlcylcbiAgICAgICAgICAgICAgICAsIDUwMClcbiAgICBpZiBhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbGF0ZXguaGlkZV9wYW5lbCcpXG4gICAgICBAbGF0ZXgucGFuZWwuaGlkZVBhbmVsKClcblxuICBkZWFjdGl2YXRlOiAtPlxuICAgIEBsYXRleD8uZGlzcG9zZSgpXG4gICAgQGRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuXG4gIHByb3ZpZGU6IC0+XG4gICAgaWYgIUBwcm92aWRlcj9cbiAgICAgIFByb3ZpZGVyID0gcmVxdWlyZSAnLi9wcm92aWRlcidcbiAgICAgIEBwcm92aWRlciA9IG5ldyBQcm92aWRlcigpXG4gICAgICBAZGlzcG9zYWJsZXMuYWRkIEBwcm92aWRlclxuICAgIHJldHVybiBAcHJvdmlkZXIucHJvdmlkZXJcblxuICBjb25zdW1lTWluaW1hcDogKG1pbmltYXApIC0+XG4gICAgQG1pbmltYXAgPSBtaW5pbWFwXG5cbiAgY29uc3VtZVN0YXR1c0JhcjogKHN0YXR1c0JhcikgLT5cbiAgICBpZiAhQHN0YXR1cz9cbiAgICAgIFN0YXR1cyA9IHJlcXVpcmUgJy4vdmlldy9zdGF0dXMnXG4gICAgICBAc3RhdHVzID0gbmV3IFN0YXR1c1xuICAgICAgQGRpc3Bvc2FibGVzLmFkZCBAc3RhdHVzXG4gICAgQHN0YXR1cy5hdHRhY2ggc3RhdHVzQmFyXG4gICAgeyBEaXNwb3NhYmxlIH0gPSByZXF1aXJlICdhdG9tJ1xuICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSggPT4gQHN0YXR1cy5kZXRhY2goKSlcblxuY2xhc3MgQXRvbUxhVGVYXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9ID0gcmVxdWlyZSAnYXRvbSdcbiAgICBAZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZVxuICAgIEJ1aWxkZXIgPSByZXF1aXJlICcuL2J1aWxkZXInXG4gICAgQ2xlYW5lciA9IHJlcXVpcmUgJy4vY2xlYW5lcidcbiAgICBNYW5hZ2VyID0gcmVxdWlyZSAnLi9tYW5hZ2VyJ1xuICAgIFNlcnZlciA9IHJlcXVpcmUgJy4vc2VydmVyJ1xuICAgIFZpZXdlciA9IHJlcXVpcmUgJy4vdmlld2VyJ1xuICAgIFBhcnNlciA9IHJlcXVpcmUgJy4vcGFyc2VyJ1xuICAgIExvY2F0b3IgPSByZXF1aXJlICcuL2xvY2F0b3InXG4gICAgUGFuZWwgPSByZXF1aXJlICcuL3ZpZXcvcGFuZWwnXG4gICAgTG9nZ2VyID0gcmVxdWlyZSAnLi9sb2dnZXInXG5cbiAgICBAYnVpbGRlciA9IG5ldyBCdWlsZGVyKHRoaXMpXG4gICAgQGNsZWFuZXIgPSBuZXcgQ2xlYW5lcih0aGlzKVxuICAgIEBtYW5hZ2VyID0gbmV3IE1hbmFnZXIodGhpcylcbiAgICBAdmlld2VyID0gbmV3IFZpZXdlcih0aGlzKVxuICAgIEBzZXJ2ZXIgPSBuZXcgU2VydmVyKHRoaXMpXG4gICAgQHBhcnNlciA9IG5ldyBQYXJzZXIodGhpcylcbiAgICBAbG9jYXRvciA9IG5ldyBMb2NhdG9yKHRoaXMpXG4gICAgQHBhbmVsID0gbmV3IFBhbmVsKHRoaXMpXG4gICAgQGxvZ2dlciA9IG5ldyBMb2dnZXIodGhpcylcblxuICAgIEBkaXNwb3NhYmxlcy5hZGQgQGJ1aWxkZXIsIEBjbGVhbmVyLCBAbWFuYWdlciwgQHNlcnZlciwgQHZpZXdlciwgQHBhcnNlcixcbiAgICAgIEBsb2NhdG9yLCBAcGFuZWwsIEBsb2dnZXJcblxuICBkaXNwb3NlOiAtPlxuICAgIEBkaXNwb3NhYmxlcy5kaXNwb3NlKClcbiJdfQ==
