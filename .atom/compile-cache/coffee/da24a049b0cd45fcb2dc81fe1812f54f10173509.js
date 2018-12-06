(function() {
  var helper, path, pkg;

  path = require('path');

  pkg = require('../lib/main');

  helper = require('./helper');

  describe('Atom-LaTeX', function() {
    beforeEach(function() {
      return waitsForPromise(function() {
        return helper.activatePackages();
      });
    });
    describe('Package', function() {
      return describe('when package initialized', function() {
        return it('has Atom-LaTeX main object', function() {
          expect(pkg.latex).toBeDefined();
          expect(pkg.latex.builder).toBeDefined();
          expect(pkg.latex.manager).toBeDefined();
          expect(pkg.latex.viewer).toBeDefined();
          expect(pkg.latex.server).toBeDefined();
          expect(pkg.latex.panel).toBeDefined();
          expect(pkg.latex.parser).toBeDefined();
          expect(pkg.latex.locator).toBeDefined();
          expect(pkg.latex.logger).toBeDefined();
          return expect(pkg.latex.cleaner).toBeDefined();
        });
      });
    });
    describe('Builder', function() {
      beforeEach(function() {
        var project;
        project = "" + (path.dirname(__filename)) + path.sep + "latex_project";
        atom.project.setPaths([project]);
        return pkg.latex.mainFile = "" + project + path.sep + "main.tex";
      });
      describe('build-after-save feature', function() {
        var builder, builder_;
        builder = builder_ = void 0;
        beforeEach(function() {
          builder = jasmine.createSpyObj('Builder', ['build']);
          builder_ = pkg.latex.builder;
          return pkg.latex.builder = builder;
        });
        afterEach(function() {
          pkg.latex.builder = builder_;
          return helper.restoreConfigs();
        });
        it('compile if current file is a .tex file', function() {
          var project;
          helper.setConfig('atom-latex.build_after_save', true);
          project = "" + (path.dirname(__filename)) + path.sep + "latex_project";
          return waitsForPromise(function() {
            return (atom.workspace.open("" + project + path.sep + "input.tex").then(function(editor) {
              return Promise.resolve(editor.save());
            })).then(function() {
              return expect(builder.build).toHaveBeenCalled();
            });
          });
        });
        it('does nothing if config disabled', function() {
          var project;
          helper.setConfig('atom-latex.build_after_save', false);
          project = "" + (path.dirname(__filename)) + path.sep + "latex_project";
          return waitsForPromise(function() {
            return (atom.workspace.open("" + project + path.sep + "input.tex").then(function(editor) {
              return Promise.resolve(editor.save());
            })).then(function() {
              return expect(builder.build).not.toHaveBeenCalled();
            });
          });
        });
        return it('does nothing if current file is not a .tex file', function() {
          var project;
          helper.setConfig('atom-latex.build_after_save', true);
          project = "" + (path.dirname(__filename)) + path.sep + "latex_project";
          return waitsForPromise(function() {
            return (atom.workspace.open("" + project + path.sep + "dummy.file").then(function(editor) {
              return Promise.resolve(editor.save());
            })).then(function() {
              return expect(builder.build).not.toHaveBeenCalled();
            });
          });
        });
      });
      describe('toolchain feature', function() {
        var binCheck, binCheck_;
        binCheck = binCheck_ = void 0;
        beforeEach(function() {
          binCheck_ = pkg.latex.builder.binCheck;
          return spyOn(pkg.latex.builder, 'binCheck');
        });
        afterEach(function() {
          pkg.latex.builder.binCheck = binCheck_;
          return helper.restoreConfigs();
        });
        it('generates latexmk command when enabled auto', function() {
          helper.setConfig('atom-latex.toolchain', 'auto');
          helper.unsetConfig('atom-latex.latexmk_param');
          pkg.latex.builder.binCheck.andReturn(true);
          pkg.latex.builder.setCmds();
          return expect(pkg.latex.builder.cmds[0]).toBe('latexmk -synctex=1 -interaction=nonstopmode -file-line-error -pdf main');
        });
        it('generates custom command when enabled auto but without binary', function() {
          helper.setConfig('atom-latex.toolchain', 'auto');
          helper.unsetConfig('atom-latex.compiler');
          helper.unsetConfig('atom-latex.bibtex');
          helper.unsetConfig('atom-latex.compiler_param');
          helper.unsetConfig('atom-latex.custom_toolchain');
          pkg.latex.builder.binCheck.andReturn(false);
          pkg.latex.builder.setCmds();
          expect(pkg.latex.builder.cmds[0]).toBe('pdflatex -synctex=1 -interaction=nonstopmode -file-line-error main');
          return expect(pkg.latex.builder.cmds[1]).toBe('bibtex main');
        });
        it('generates latexmk command when enabled latexmk toolchain', function() {
          helper.setConfig('atom-latex.toolchain', 'latexmk toolchain');
          helper.unsetConfig('atom-latex.latexmk_param');
          pkg.latex.builder.binCheck.andReturn(true);
          pkg.latex.builder.setCmds();
          return expect(pkg.latex.builder.cmds[0]).toBe('latexmk -synctex=1 -interaction=nonstopmode -file-line-error -pdf main');
        });
        return it('generates custom command when enabled custom toolchain', function() {
          helper.setConfig('atom-latex.toolchain', 'custom toolchain');
          helper.unsetConfig('atom-latex.compiler');
          helper.unsetConfig('atom-latex.bibtex');
          helper.unsetConfig('atom-latex.compiler_param');
          helper.unsetConfig('atom-latex.custom_toolchain');
          pkg.latex.builder.binCheck.andReturn(false);
          pkg.latex.builder.setCmds();
          expect(pkg.latex.builder.cmds[0]).toBe('pdflatex -synctex=1 -interaction=nonstopmode -file-line-error main');
          return expect(pkg.latex.builder.cmds[1]).toBe('bibtex main');
        });
      });
      return describe('::build', function() {
        var execCmd, execCmd_, open, open_;
        execCmd = execCmd_ = open = open_ = void 0;
        beforeEach(function() {
          var stdout;
          waitsForPromise(function() {
            return atom.packages.activatePackage('status-bar');
          });
          open = jasmine.createSpy('open');
          stdout = jasmine.createSpy('stdout');
          execCmd = jasmine.createSpy('execCmd').andCallFake(function(cmd, cwd, fn) {
            fn();
            return {
              stdout: {
                on: function(data, fn) {
                  return stdout(data, fn);
                }
              }
            };
          });
          open_ = pkg.latex.viewer.openViewerNewWindow;
          pkg.latex.viewer.openViewerNewWindow = open;
          execCmd_ = pkg.latex.builder.execCmd;
          return pkg.latex.builder.execCmd = execCmd;
        });
        afterEach(function() {
          pkg.latex.viewer.openViewerNewWindow = open_;
          pkg.latex.builder.execCmd = execCmd_;
          return helper.restoreConfigs();
        });
        it('should execute all commands sequentially', function() {
          helper.setConfig('atom-latex.toolchain', 'custom toolchain');
          helper.unsetConfig('atom-latex.compiler');
          helper.unsetConfig('atom-latex.bibtex');
          helper.unsetConfig('atom-latex.compiler_param');
          helper.unsetConfig('atom-latex.custom_toolchain');
          helper.setConfig('atom-latex.preview_after_build', 'Do nothing');
          pkg.latex.builder.build();
          expect(execCmd.callCount).toBe(4);
          return expect(open).not.toHaveBeenCalled();
        });
        return it('should open preview when ready if enabled', function() {
          helper.setConfig('atom-latex.toolchain', 'custom toolchain');
          helper.unsetConfig('atom-latex.compiler');
          helper.unsetConfig('atom-latex.bibtex');
          helper.unsetConfig('atom-latex.compiler_param');
          helper.unsetConfig('atom-latex.custom_toolchain');
          helper.setConfig('atom-latex.preview_after_build', true);
          pkg.latex.builder.build();
          return expect(open).toHaveBeenCalled();
        });
      });
    });
    return describe('Manager', function() {
      describe('::fileMain', function() {
        it('should return false when no main file exists in project root', function() {
          var project, result;
          pkg.latex.mainFile = void 0;
          project = "" + (path.dirname(__filename));
          atom.project.setPaths([project]);
          result = pkg.latex.manager.findMain();
          expect(result).toBe(false);
          return expect(pkg.latex.mainFile).toBe(void 0);
        });
        return it('should set main file full path when it exists in project root', function() {
          var project, relative, result;
          pkg.latex.mainFile = void 0;
          project = "" + (path.dirname(__filename)) + path.sep + "latex_project";
          atom.project.setPaths([project]);
          result = pkg.latex.manager.findMain();
          relative = path.relative(project, pkg.latex.mainFile);
          expect(result).toBe(true);
          return expect(pkg.latex.mainFile).toBe("" + project + path.sep + "main.tex");
        });
      });
      return describe('::findAll', function() {
        return it('should return all input files recursively', function() {
          var project, result;
          project = "" + (path.dirname(__filename)) + path.sep + "latex_project";
          atom.project.setPaths([project]);
          pkg.latex.mainFile = "" + project + path.sep + "main.tex";
          result = pkg.latex.manager.findAll();
          expect(pkg.latex.texFiles.length).toBe(2);
          return expect(pkg.latex.bibFiles.length).toBe(0);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L3NwZWMvbWFpbi1zcGVjLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSOztFQUNQLEdBQUEsR0FBTSxPQUFBLENBQVEsYUFBUjs7RUFDTixNQUFBLEdBQVMsT0FBQSxDQUFRLFVBQVI7O0VBR1QsUUFBQSxDQUFTLFlBQVQsRUFBdUIsU0FBQTtJQUNyQixVQUFBLENBQVcsU0FBQTthQUNULGVBQUEsQ0FBZ0IsU0FBQTtBQUNkLGVBQU8sTUFBTSxDQUFDLGdCQUFQLENBQUE7TUFETyxDQUFoQjtJQURTLENBQVg7SUFJQSxRQUFBLENBQVMsU0FBVCxFQUFvQixTQUFBO2FBQ2xCLFFBQUEsQ0FBUywwQkFBVCxFQUFxQyxTQUFBO2VBQ25DLEVBQUEsQ0FBRyw0QkFBSCxFQUFpQyxTQUFBO1VBQy9CLE1BQUEsQ0FBTyxHQUFHLENBQUMsS0FBWCxDQUFpQixDQUFDLFdBQWxCLENBQUE7VUFDQSxNQUFBLENBQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFqQixDQUF5QixDQUFDLFdBQTFCLENBQUE7VUFDQSxNQUFBLENBQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFqQixDQUF5QixDQUFDLFdBQTFCLENBQUE7VUFDQSxNQUFBLENBQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFqQixDQUF3QixDQUFDLFdBQXpCLENBQUE7VUFDQSxNQUFBLENBQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFqQixDQUF3QixDQUFDLFdBQXpCLENBQUE7VUFDQSxNQUFBLENBQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFqQixDQUF1QixDQUFDLFdBQXhCLENBQUE7VUFDQSxNQUFBLENBQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFqQixDQUF3QixDQUFDLFdBQXpCLENBQUE7VUFDQSxNQUFBLENBQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFqQixDQUF5QixDQUFDLFdBQTFCLENBQUE7VUFDQSxNQUFBLENBQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFqQixDQUF3QixDQUFDLFdBQXpCLENBQUE7aUJBQ0EsTUFBQSxDQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBakIsQ0FBeUIsQ0FBQyxXQUExQixDQUFBO1FBVitCLENBQWpDO01BRG1DLENBQXJDO0lBRGtCLENBQXBCO0lBY0EsUUFBQSxDQUFTLFNBQVQsRUFBb0IsU0FBQTtNQUNsQixVQUFBLENBQVcsU0FBQTtBQUNULFlBQUE7UUFBQSxPQUFBLEdBQVUsRUFBQSxHQUFJLENBQUMsSUFBSSxDQUFDLE9BQUwsQ0FBYSxVQUFiLENBQUQsQ0FBSixHQUFnQyxJQUFJLENBQUMsR0FBckMsR0FBeUM7UUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFiLENBQXNCLENBQUMsT0FBRCxDQUF0QjtlQUNBLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBVixHQUFxQixFQUFBLEdBQUssT0FBTCxHQUFlLElBQUksQ0FBQyxHQUFwQixHQUF3QjtNQUhwQyxDQUFYO01BS0EsUUFBQSxDQUFTLDBCQUFULEVBQXFDLFNBQUE7QUFDbkMsWUFBQTtRQUFBLE9BQUEsR0FBVSxRQUFBLEdBQVc7UUFFckIsVUFBQSxDQUFXLFNBQUE7VUFDVCxPQUFBLEdBQVUsT0FBTyxDQUFDLFlBQVIsQ0FBcUIsU0FBckIsRUFBZ0MsQ0FBQyxPQUFELENBQWhDO1VBQ1YsUUFBQSxHQUFXLEdBQUcsQ0FBQyxLQUFLLENBQUM7aUJBQ3JCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBVixHQUFvQjtRQUhYLENBQVg7UUFLQSxTQUFBLENBQVUsU0FBQTtVQUNSLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBVixHQUFvQjtpQkFDcEIsTUFBTSxDQUFDLGNBQVAsQ0FBQTtRQUZRLENBQVY7UUFJQSxFQUFBLENBQUcsd0NBQUgsRUFBNkMsU0FBQTtBQUMzQyxjQUFBO1VBQUEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsNkJBQWpCLEVBQWdELElBQWhEO1VBQ0EsT0FBQSxHQUFVLEVBQUEsR0FBSSxDQUFDLElBQUksQ0FBQyxPQUFMLENBQWEsVUFBYixDQUFELENBQUosR0FBZ0MsSUFBSSxDQUFDLEdBQXJDLEdBQXlDO2lCQUNuRCxlQUFBLENBQWdCLFNBQUE7bUJBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FDbEIsRUFBQSxHQUFLLE9BQUwsR0FBZSxJQUFJLENBQUMsR0FBcEIsR0FBd0IsV0FETixDQUNtQixDQUFDLElBRHBCLENBQ3lCLFNBQUMsTUFBRDtxQkFDekMsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsTUFBTSxDQUFDLElBQVAsQ0FBQSxDQUFoQjtZQUR5QyxDQUR6QixDQUFELENBR2hCLENBQUMsSUFIZSxDQUdWLFNBQUE7cUJBQ0wsTUFBQSxDQUFPLE9BQU8sQ0FBQyxLQUFmLENBQXFCLENBQUMsZ0JBQXRCLENBQUE7WUFESyxDQUhVO1VBQUgsQ0FBaEI7UUFIMkMsQ0FBN0M7UUFTQSxFQUFBLENBQUcsaUNBQUgsRUFBc0MsU0FBQTtBQUNwQyxjQUFBO1VBQUEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsNkJBQWpCLEVBQWdELEtBQWhEO1VBQ0EsT0FBQSxHQUFVLEVBQUEsR0FBSSxDQUFDLElBQUksQ0FBQyxPQUFMLENBQWEsVUFBYixDQUFELENBQUosR0FBZ0MsSUFBSSxDQUFDLEdBQXJDLEdBQXlDO2lCQUNuRCxlQUFBLENBQWdCLFNBQUE7bUJBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FDbEIsRUFBQSxHQUFLLE9BQUwsR0FBZSxJQUFJLENBQUMsR0FBcEIsR0FBd0IsV0FETixDQUNtQixDQUFDLElBRHBCLENBQ3lCLFNBQUMsTUFBRDtxQkFDekMsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsTUFBTSxDQUFDLElBQVAsQ0FBQSxDQUFoQjtZQUR5QyxDQUR6QixDQUFELENBR2hCLENBQUMsSUFIZSxDQUdWLFNBQUE7cUJBQ0wsTUFBQSxDQUFPLE9BQU8sQ0FBQyxLQUFmLENBQXFCLENBQUMsR0FBRyxDQUFDLGdCQUExQixDQUFBO1lBREssQ0FIVTtVQUFILENBQWhCO1FBSG9DLENBQXRDO2VBU0EsRUFBQSxDQUFHLGlEQUFILEVBQXNELFNBQUE7QUFDcEQsY0FBQTtVQUFBLE1BQU0sQ0FBQyxTQUFQLENBQWlCLDZCQUFqQixFQUFnRCxJQUFoRDtVQUNBLE9BQUEsR0FBVSxFQUFBLEdBQUksQ0FBQyxJQUFJLENBQUMsT0FBTCxDQUFhLFVBQWIsQ0FBRCxDQUFKLEdBQWdDLElBQUksQ0FBQyxHQUFyQyxHQUF5QztpQkFDbkQsZUFBQSxDQUFnQixTQUFBO21CQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQ2xCLEVBQUEsR0FBSyxPQUFMLEdBQWUsSUFBSSxDQUFDLEdBQXBCLEdBQXdCLFlBRE4sQ0FDb0IsQ0FBQyxJQURyQixDQUMwQixTQUFDLE1BQUQ7cUJBQzFDLE9BQU8sQ0FBQyxPQUFSLENBQWdCLE1BQU0sQ0FBQyxJQUFQLENBQUEsQ0FBaEI7WUFEMEMsQ0FEMUIsQ0FBRCxDQUdoQixDQUFDLElBSGUsQ0FHVixTQUFBO3FCQUNMLE1BQUEsQ0FBTyxPQUFPLENBQUMsS0FBZixDQUFxQixDQUFDLEdBQUcsQ0FBQyxnQkFBMUIsQ0FBQTtZQURLLENBSFU7VUFBSCxDQUFoQjtRQUhvRCxDQUF0RDtNQTlCbUMsQ0FBckM7TUF1Q0EsUUFBQSxDQUFTLG1CQUFULEVBQThCLFNBQUE7QUFDNUIsWUFBQTtRQUFBLFFBQUEsR0FBVyxTQUFBLEdBQVk7UUFFdkIsVUFBQSxDQUFXLFNBQUE7VUFDVCxTQUFBLEdBQVksR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7aUJBQzlCLEtBQUEsQ0FBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQWhCLEVBQXlCLFVBQXpCO1FBRlMsQ0FBWDtRQUlBLFNBQUEsQ0FBVSxTQUFBO1VBQ1IsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBbEIsR0FBNkI7aUJBQzdCLE1BQU0sQ0FBQyxjQUFQLENBQUE7UUFGUSxDQUFWO1FBSUEsRUFBQSxDQUFHLDZDQUFILEVBQWtELFNBQUE7VUFDaEQsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsc0JBQWpCLEVBQXlDLE1BQXpDO1VBQ0EsTUFBTSxDQUFDLFdBQVAsQ0FBbUIsMEJBQW5CO1VBQ0EsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQTNCLENBQXFDLElBQXJDO1VBQ0EsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBbEIsQ0FBQTtpQkFDQSxNQUFBLENBQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSyxDQUFBLENBQUEsQ0FBOUIsQ0FBaUMsQ0FBQyxJQUFsQyxDQUF1Qyx3RUFBdkM7UUFMZ0QsQ0FBbEQ7UUFRQSxFQUFBLENBQUcsK0RBQUgsRUFBb0UsU0FBQTtVQUNsRSxNQUFNLENBQUMsU0FBUCxDQUFpQixzQkFBakIsRUFBeUMsTUFBekM7VUFDQSxNQUFNLENBQUMsV0FBUCxDQUFtQixxQkFBbkI7VUFDQSxNQUFNLENBQUMsV0FBUCxDQUFtQixtQkFBbkI7VUFDQSxNQUFNLENBQUMsV0FBUCxDQUFtQiwyQkFBbkI7VUFDQSxNQUFNLENBQUMsV0FBUCxDQUFtQiw2QkFBbkI7VUFDQSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBM0IsQ0FBcUMsS0FBckM7VUFDQSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFsQixDQUFBO1VBQ0EsTUFBQSxDQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUssQ0FBQSxDQUFBLENBQTlCLENBQWlDLENBQUMsSUFBbEMsQ0FBdUMsb0VBQXZDO2lCQUVBLE1BQUEsQ0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFLLENBQUEsQ0FBQSxDQUE5QixDQUFpQyxDQUFDLElBQWxDLENBQXVDLGFBQXZDO1FBVmtFLENBQXBFO1FBWUEsRUFBQSxDQUFHLDBEQUFILEVBQStELFNBQUE7VUFDN0QsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsc0JBQWpCLEVBQXlDLG1CQUF6QztVQUNBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLDBCQUFuQjtVQUNBLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUEzQixDQUFxQyxJQUFyQztVQUNBLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQWxCLENBQUE7aUJBQ0EsTUFBQSxDQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUssQ0FBQSxDQUFBLENBQTlCLENBQWlDLENBQUMsSUFBbEMsQ0FBdUMsd0VBQXZDO1FBTDZELENBQS9EO2VBUUEsRUFBQSxDQUFHLHdEQUFILEVBQTZELFNBQUE7VUFDM0QsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsc0JBQWpCLEVBQXlDLGtCQUF6QztVQUNBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLHFCQUFuQjtVQUNBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLG1CQUFuQjtVQUNBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLDJCQUFuQjtVQUNBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLDZCQUFuQjtVQUNBLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUEzQixDQUFxQyxLQUFyQztVQUNBLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQWxCLENBQUE7VUFDQSxNQUFBLENBQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSyxDQUFBLENBQUEsQ0FBOUIsQ0FBaUMsQ0FBQyxJQUFsQyxDQUF1QyxvRUFBdkM7aUJBRUEsTUFBQSxDQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUssQ0FBQSxDQUFBLENBQTlCLENBQWlDLENBQUMsSUFBbEMsQ0FBdUMsYUFBdkM7UUFWMkQsQ0FBN0Q7TUF2QzRCLENBQTlCO2FBbURBLFFBQUEsQ0FBUyxTQUFULEVBQW9CLFNBQUE7QUFDbEIsWUFBQTtRQUFBLE9BQUEsR0FBVSxRQUFBLEdBQVcsSUFBQSxHQUFPLEtBQUEsR0FBUTtRQUVwQyxVQUFBLENBQVcsU0FBQTtBQUNULGNBQUE7VUFBQSxlQUFBLENBQWdCLFNBQUE7bUJBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLFlBQTlCO1VBQUgsQ0FBaEI7VUFDQSxJQUFBLEdBQU8sT0FBTyxDQUFDLFNBQVIsQ0FBa0IsTUFBbEI7VUFDUCxNQUFBLEdBQVMsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsUUFBbEI7VUFDVCxPQUFBLEdBQVUsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsU0FBbEIsQ0FBNEIsQ0FBQyxXQUE3QixDQUF5QyxTQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsRUFBWDtZQUNqRCxFQUFBLENBQUE7QUFDQSxtQkFBTztjQUFBLE1BQUEsRUFDTDtnQkFBQSxFQUFBLEVBQUksU0FBQyxJQUFELEVBQU8sRUFBUDt5QkFDRixNQUFBLENBQU8sSUFBUCxFQUFhLEVBQWI7Z0JBREUsQ0FBSjtlQURLOztVQUYwQyxDQUF6QztVQU1WLEtBQUEsR0FBUSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztVQUN6QixHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxtQkFBakIsR0FBdUM7VUFDdkMsUUFBQSxHQUFXLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUM3QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFsQixHQUE0QjtRQWJuQixDQUFYO1FBZUEsU0FBQSxDQUFVLFNBQUE7VUFDUixHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxtQkFBakIsR0FBdUM7VUFDdkMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBbEIsR0FBNEI7aUJBQzVCLE1BQU0sQ0FBQyxjQUFQLENBQUE7UUFIUSxDQUFWO1FBS0EsRUFBQSxDQUFHLDBDQUFILEVBQStDLFNBQUE7VUFDN0MsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsc0JBQWpCLEVBQXlDLGtCQUF6QztVQUNBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLHFCQUFuQjtVQUNBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLG1CQUFuQjtVQUNBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLDJCQUFuQjtVQUNBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLDZCQUFuQjtVQUNBLE1BQU0sQ0FBQyxTQUFQLENBQWlCLGdDQUFqQixFQUFtRCxZQUFuRDtVQUNBLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQWxCLENBQUE7VUFDQSxNQUFBLENBQU8sT0FBTyxDQUFDLFNBQWYsQ0FBeUIsQ0FBQyxJQUExQixDQUErQixDQUEvQjtpQkFDQSxNQUFBLENBQU8sSUFBUCxDQUFZLENBQUMsR0FBRyxDQUFDLGdCQUFqQixDQUFBO1FBVDZDLENBQS9DO2VBV0EsRUFBQSxDQUFHLDJDQUFILEVBQWdELFNBQUE7VUFDOUMsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsc0JBQWpCLEVBQXlDLGtCQUF6QztVQUNBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLHFCQUFuQjtVQUNBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLG1CQUFuQjtVQUNBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLDJCQUFuQjtVQUNBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLDZCQUFuQjtVQUNBLE1BQU0sQ0FBQyxTQUFQLENBQWlCLGdDQUFqQixFQUFtRCxJQUFuRDtVQUNBLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQWxCLENBQUE7aUJBQ0EsTUFBQSxDQUFPLElBQVAsQ0FBWSxDQUFDLGdCQUFiLENBQUE7UUFSOEMsQ0FBaEQ7TUFsQ2tCLENBQXBCO0lBaEdrQixDQUFwQjtXQTRJQSxRQUFBLENBQVMsU0FBVCxFQUFvQixTQUFBO01BQ2xCLFFBQUEsQ0FBUyxZQUFULEVBQXVCLFNBQUE7UUFDckIsRUFBQSxDQUFHLDhEQUFILEVBQW1FLFNBQUE7QUFDakUsY0FBQTtVQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBVixHQUFxQjtVQUNyQixPQUFBLEdBQVUsRUFBQSxHQUFJLENBQUMsSUFBSSxDQUFDLE9BQUwsQ0FBYSxVQUFiLENBQUQ7VUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQWIsQ0FBc0IsQ0FBQyxPQUFELENBQXRCO1VBQ0EsTUFBQSxHQUFTLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQWxCLENBQUE7VUFDVCxNQUFBLENBQU8sTUFBUCxDQUFjLENBQUMsSUFBZixDQUFvQixLQUFwQjtpQkFDQSxNQUFBLENBQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFqQixDQUEwQixDQUFDLElBQTNCLENBQWdDLE1BQWhDO1FBTmlFLENBQW5FO2VBUUEsRUFBQSxDQUFHLCtEQUFILEVBQW9FLFNBQUE7QUFDbEUsY0FBQTtVQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBVixHQUFxQjtVQUNyQixPQUFBLEdBQVUsRUFBQSxHQUFJLENBQUMsSUFBSSxDQUFDLE9BQUwsQ0FBYSxVQUFiLENBQUQsQ0FBSixHQUFnQyxJQUFJLENBQUMsR0FBckMsR0FBeUM7VUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFiLENBQXNCLENBQUMsT0FBRCxDQUF0QjtVQUNBLE1BQUEsR0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFsQixDQUFBO1VBQ1QsUUFBQSxHQUFXLElBQUksQ0FBQyxRQUFMLENBQWMsT0FBZCxFQUF1QixHQUFHLENBQUMsS0FBSyxDQUFDLFFBQWpDO1VBQ1gsTUFBQSxDQUFPLE1BQVAsQ0FBYyxDQUFDLElBQWYsQ0FBb0IsSUFBcEI7aUJBQ0EsTUFBQSxDQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBakIsQ0FBMEIsQ0FBQyxJQUEzQixDQUFnQyxFQUFBLEdBQUssT0FBTCxHQUFlLElBQUksQ0FBQyxHQUFwQixHQUF3QixVQUF4RDtRQVBrRSxDQUFwRTtNQVRxQixDQUF2QjthQWtCQSxRQUFBLENBQVMsV0FBVCxFQUFzQixTQUFBO2VBQ3BCLEVBQUEsQ0FBRywyQ0FBSCxFQUFnRCxTQUFBO0FBQzlDLGNBQUE7VUFBQSxPQUFBLEdBQVUsRUFBQSxHQUFJLENBQUMsSUFBSSxDQUFDLE9BQUwsQ0FBYSxVQUFiLENBQUQsQ0FBSixHQUFnQyxJQUFJLENBQUMsR0FBckMsR0FBeUM7VUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFiLENBQXNCLENBQUMsT0FBRCxDQUF0QjtVQUNBLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBVixHQUFxQixFQUFBLEdBQUssT0FBTCxHQUFlLElBQUksQ0FBQyxHQUFwQixHQUF3QjtVQUM3QyxNQUFBLEdBQVMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBbEIsQ0FBQTtVQUNULE1BQUEsQ0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUExQixDQUFpQyxDQUFDLElBQWxDLENBQXVDLENBQXZDO2lCQUNBLE1BQUEsQ0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUExQixDQUFpQyxDQUFDLElBQWxDLENBQXVDLENBQXZDO1FBTjhDLENBQWhEO01BRG9CLENBQXRCO0lBbkJrQixDQUFwQjtFQS9KcUIsQ0FBdkI7QUFMQSIsInNvdXJjZXNDb250ZW50IjpbInBhdGggPSByZXF1aXJlICdwYXRoJ1xucGtnID0gcmVxdWlyZSAnLi4vbGliL21haW4nXG5oZWxwZXIgPSByZXF1aXJlICcuL2hlbHBlcidcblxuXG5kZXNjcmliZSAnQXRvbS1MYVRlWCcsIC0+XG4gIGJlZm9yZUVhY2ggLT5cbiAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgIHJldHVybiBoZWxwZXIuYWN0aXZhdGVQYWNrYWdlcygpXG5cbiAgZGVzY3JpYmUgJ1BhY2thZ2UnLCAtPlxuICAgIGRlc2NyaWJlICd3aGVuIHBhY2thZ2UgaW5pdGlhbGl6ZWQnLCAtPlxuICAgICAgaXQgJ2hhcyBBdG9tLUxhVGVYIG1haW4gb2JqZWN0JywgLT5cbiAgICAgICAgZXhwZWN0KHBrZy5sYXRleCkudG9CZURlZmluZWQoKVxuICAgICAgICBleHBlY3QocGtnLmxhdGV4LmJ1aWxkZXIpLnRvQmVEZWZpbmVkKClcbiAgICAgICAgZXhwZWN0KHBrZy5sYXRleC5tYW5hZ2VyKS50b0JlRGVmaW5lZCgpXG4gICAgICAgIGV4cGVjdChwa2cubGF0ZXgudmlld2VyKS50b0JlRGVmaW5lZCgpXG4gICAgICAgIGV4cGVjdChwa2cubGF0ZXguc2VydmVyKS50b0JlRGVmaW5lZCgpXG4gICAgICAgIGV4cGVjdChwa2cubGF0ZXgucGFuZWwpLnRvQmVEZWZpbmVkKClcbiAgICAgICAgZXhwZWN0KHBrZy5sYXRleC5wYXJzZXIpLnRvQmVEZWZpbmVkKClcbiAgICAgICAgZXhwZWN0KHBrZy5sYXRleC5sb2NhdG9yKS50b0JlRGVmaW5lZCgpXG4gICAgICAgIGV4cGVjdChwa2cubGF0ZXgubG9nZ2VyKS50b0JlRGVmaW5lZCgpXG4gICAgICAgIGV4cGVjdChwa2cubGF0ZXguY2xlYW5lcikudG9CZURlZmluZWQoKVxuXG4gIGRlc2NyaWJlICdCdWlsZGVyJywgLT5cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBwcm9qZWN0ID0gXCJcIlwiI3twYXRoLmRpcm5hbWUoX19maWxlbmFtZSl9I3twYXRoLnNlcH1sYXRleF9wcm9qZWN0XCJcIlwiXG4gICAgICBhdG9tLnByb2plY3Quc2V0UGF0aHMgW3Byb2plY3RdXG4gICAgICBwa2cubGF0ZXgubWFpbkZpbGUgPSBcIlwiXCIje3Byb2plY3R9I3twYXRoLnNlcH1tYWluLnRleFwiXCJcIlxuXG4gICAgZGVzY3JpYmUgJ2J1aWxkLWFmdGVyLXNhdmUgZmVhdHVyZScsIC0+XG4gICAgICBidWlsZGVyID0gYnVpbGRlcl8gPSB1bmRlZmluZWRcblxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBidWlsZGVyID0gamFzbWluZS5jcmVhdGVTcHlPYmogJ0J1aWxkZXInLCBbJ2J1aWxkJ11cbiAgICAgICAgYnVpbGRlcl8gPSBwa2cubGF0ZXguYnVpbGRlclxuICAgICAgICBwa2cubGF0ZXguYnVpbGRlciA9IGJ1aWxkZXJcblxuICAgICAgYWZ0ZXJFYWNoIC0+XG4gICAgICAgIHBrZy5sYXRleC5idWlsZGVyID0gYnVpbGRlcl9cbiAgICAgICAgaGVscGVyLnJlc3RvcmVDb25maWdzKClcblxuICAgICAgaXQgJ2NvbXBpbGUgaWYgY3VycmVudCBmaWxlIGlzIGEgLnRleCBmaWxlJywgLT5cbiAgICAgICAgaGVscGVyLnNldENvbmZpZyAnYXRvbS1sYXRleC5idWlsZF9hZnRlcl9zYXZlJywgdHJ1ZVxuICAgICAgICBwcm9qZWN0ID0gXCJcIlwiI3twYXRoLmRpcm5hbWUoX19maWxlbmFtZSl9I3twYXRoLnNlcH1sYXRleF9wcm9qZWN0XCJcIlwiXG4gICAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPiAoYXRvbS53b3Jrc3BhY2Uub3BlbihcbiAgICAgICAgICBcIlwiXCIje3Byb2plY3R9I3twYXRoLnNlcH1pbnB1dC50ZXhcIlwiXCIpLnRoZW4gKGVkaXRvcikgLT5cbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSBlZGl0b3Iuc2F2ZSgpXG4gICAgICAgICAgKS50aGVuICgpIC0+XG4gICAgICAgICAgICBleHBlY3QoYnVpbGRlci5idWlsZCkudG9IYXZlQmVlbkNhbGxlZCgpXG5cbiAgICAgIGl0ICdkb2VzIG5vdGhpbmcgaWYgY29uZmlnIGRpc2FibGVkJywgLT5cbiAgICAgICAgaGVscGVyLnNldENvbmZpZyAnYXRvbS1sYXRleC5idWlsZF9hZnRlcl9zYXZlJywgZmFsc2VcbiAgICAgICAgcHJvamVjdCA9IFwiXCJcIiN7cGF0aC5kaXJuYW1lKF9fZmlsZW5hbWUpfSN7cGF0aC5zZXB9bGF0ZXhfcHJvamVjdFwiXCJcIlxuICAgICAgICB3YWl0c0ZvclByb21pc2UgLT4gKGF0b20ud29ya3NwYWNlLm9wZW4oXG4gICAgICAgICAgXCJcIlwiI3twcm9qZWN0fSN7cGF0aC5zZXB9aW5wdXQudGV4XCJcIlwiKS50aGVuIChlZGl0b3IpIC0+XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUgZWRpdG9yLnNhdmUoKVxuICAgICAgICAgICkudGhlbiAoKSAtPlxuICAgICAgICAgICAgZXhwZWN0KGJ1aWxkZXIuYnVpbGQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKClcblxuICAgICAgaXQgJ2RvZXMgbm90aGluZyBpZiBjdXJyZW50IGZpbGUgaXMgbm90IGEgLnRleCBmaWxlJywgLT5cbiAgICAgICAgaGVscGVyLnNldENvbmZpZyAnYXRvbS1sYXRleC5idWlsZF9hZnRlcl9zYXZlJywgdHJ1ZVxuICAgICAgICBwcm9qZWN0ID0gXCJcIlwiI3twYXRoLmRpcm5hbWUoX19maWxlbmFtZSl9I3twYXRoLnNlcH1sYXRleF9wcm9qZWN0XCJcIlwiXG4gICAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPiAoYXRvbS53b3Jrc3BhY2Uub3BlbihcbiAgICAgICAgICBcIlwiXCIje3Byb2plY3R9I3twYXRoLnNlcH1kdW1teS5maWxlXCJcIlwiKS50aGVuIChlZGl0b3IpIC0+XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUgZWRpdG9yLnNhdmUoKVxuICAgICAgICAgICkudGhlbiAoKSAtPlxuICAgICAgICAgICAgZXhwZWN0KGJ1aWxkZXIuYnVpbGQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKClcblxuICAgIGRlc2NyaWJlICd0b29sY2hhaW4gZmVhdHVyZScsIC0+XG4gICAgICBiaW5DaGVjayA9IGJpbkNoZWNrXyA9IHVuZGVmaW5lZFxuXG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIGJpbkNoZWNrXyA9IHBrZy5sYXRleC5idWlsZGVyLmJpbkNoZWNrXG4gICAgICAgIHNweU9uKHBrZy5sYXRleC5idWlsZGVyLCAnYmluQ2hlY2snKVxuXG4gICAgICBhZnRlckVhY2ggLT5cbiAgICAgICAgcGtnLmxhdGV4LmJ1aWxkZXIuYmluQ2hlY2sgPSBiaW5DaGVja19cbiAgICAgICAgaGVscGVyLnJlc3RvcmVDb25maWdzKClcblxuICAgICAgaXQgJ2dlbmVyYXRlcyBsYXRleG1rIGNvbW1hbmQgd2hlbiBlbmFibGVkIGF1dG8nLCAtPlxuICAgICAgICBoZWxwZXIuc2V0Q29uZmlnICdhdG9tLWxhdGV4LnRvb2xjaGFpbicsICdhdXRvJ1xuICAgICAgICBoZWxwZXIudW5zZXRDb25maWcgJ2F0b20tbGF0ZXgubGF0ZXhta19wYXJhbSdcbiAgICAgICAgcGtnLmxhdGV4LmJ1aWxkZXIuYmluQ2hlY2suYW5kUmV0dXJuKHRydWUpXG4gICAgICAgIHBrZy5sYXRleC5idWlsZGVyLnNldENtZHMoKVxuICAgICAgICBleHBlY3QocGtnLmxhdGV4LmJ1aWxkZXIuY21kc1swXSkudG9CZSgnbGF0ZXhtayAtc3luY3RleD0xIFxcXG4gICAgICAgICAgLWludGVyYWN0aW9uPW5vbnN0b3Btb2RlIC1maWxlLWxpbmUtZXJyb3IgLXBkZiBtYWluJylcblxuICAgICAgaXQgJ2dlbmVyYXRlcyBjdXN0b20gY29tbWFuZCB3aGVuIGVuYWJsZWQgYXV0byBidXQgd2l0aG91dCBiaW5hcnknLCAtPlxuICAgICAgICBoZWxwZXIuc2V0Q29uZmlnICdhdG9tLWxhdGV4LnRvb2xjaGFpbicsICdhdXRvJ1xuICAgICAgICBoZWxwZXIudW5zZXRDb25maWcgJ2F0b20tbGF0ZXguY29tcGlsZXInXG4gICAgICAgIGhlbHBlci51bnNldENvbmZpZyAnYXRvbS1sYXRleC5iaWJ0ZXgnXG4gICAgICAgIGhlbHBlci51bnNldENvbmZpZyAnYXRvbS1sYXRleC5jb21waWxlcl9wYXJhbSdcbiAgICAgICAgaGVscGVyLnVuc2V0Q29uZmlnICdhdG9tLWxhdGV4LmN1c3RvbV90b29sY2hhaW4nXG4gICAgICAgIHBrZy5sYXRleC5idWlsZGVyLmJpbkNoZWNrLmFuZFJldHVybihmYWxzZSlcbiAgICAgICAgcGtnLmxhdGV4LmJ1aWxkZXIuc2V0Q21kcygpXG4gICAgICAgIGV4cGVjdChwa2cubGF0ZXguYnVpbGRlci5jbWRzWzBdKS50b0JlKCdwZGZsYXRleCAtc3luY3RleD0xIFxcXG4gICAgICAgICAgLWludGVyYWN0aW9uPW5vbnN0b3Btb2RlIC1maWxlLWxpbmUtZXJyb3IgbWFpbicpXG4gICAgICAgIGV4cGVjdChwa2cubGF0ZXguYnVpbGRlci5jbWRzWzFdKS50b0JlKCdiaWJ0ZXggbWFpbicpXG5cbiAgICAgIGl0ICdnZW5lcmF0ZXMgbGF0ZXhtayBjb21tYW5kIHdoZW4gZW5hYmxlZCBsYXRleG1rIHRvb2xjaGFpbicsIC0+XG4gICAgICAgIGhlbHBlci5zZXRDb25maWcgJ2F0b20tbGF0ZXgudG9vbGNoYWluJywgJ2xhdGV4bWsgdG9vbGNoYWluJ1xuICAgICAgICBoZWxwZXIudW5zZXRDb25maWcgJ2F0b20tbGF0ZXgubGF0ZXhta19wYXJhbSdcbiAgICAgICAgcGtnLmxhdGV4LmJ1aWxkZXIuYmluQ2hlY2suYW5kUmV0dXJuKHRydWUpXG4gICAgICAgIHBrZy5sYXRleC5idWlsZGVyLnNldENtZHMoKVxuICAgICAgICBleHBlY3QocGtnLmxhdGV4LmJ1aWxkZXIuY21kc1swXSkudG9CZSgnbGF0ZXhtayAtc3luY3RleD0xIFxcXG4gICAgICAgICAgLWludGVyYWN0aW9uPW5vbnN0b3Btb2RlIC1maWxlLWxpbmUtZXJyb3IgLXBkZiBtYWluJylcblxuICAgICAgaXQgJ2dlbmVyYXRlcyBjdXN0b20gY29tbWFuZCB3aGVuIGVuYWJsZWQgY3VzdG9tIHRvb2xjaGFpbicsIC0+XG4gICAgICAgIGhlbHBlci5zZXRDb25maWcgJ2F0b20tbGF0ZXgudG9vbGNoYWluJywgJ2N1c3RvbSB0b29sY2hhaW4nXG4gICAgICAgIGhlbHBlci51bnNldENvbmZpZyAnYXRvbS1sYXRleC5jb21waWxlcidcbiAgICAgICAgaGVscGVyLnVuc2V0Q29uZmlnICdhdG9tLWxhdGV4LmJpYnRleCdcbiAgICAgICAgaGVscGVyLnVuc2V0Q29uZmlnICdhdG9tLWxhdGV4LmNvbXBpbGVyX3BhcmFtJ1xuICAgICAgICBoZWxwZXIudW5zZXRDb25maWcgJ2F0b20tbGF0ZXguY3VzdG9tX3Rvb2xjaGFpbidcbiAgICAgICAgcGtnLmxhdGV4LmJ1aWxkZXIuYmluQ2hlY2suYW5kUmV0dXJuKGZhbHNlKVxuICAgICAgICBwa2cubGF0ZXguYnVpbGRlci5zZXRDbWRzKClcbiAgICAgICAgZXhwZWN0KHBrZy5sYXRleC5idWlsZGVyLmNtZHNbMF0pLnRvQmUoJ3BkZmxhdGV4IC1zeW5jdGV4PTEgXFxcbiAgICAgICAgICAtaW50ZXJhY3Rpb249bm9uc3RvcG1vZGUgLWZpbGUtbGluZS1lcnJvciBtYWluJylcbiAgICAgICAgZXhwZWN0KHBrZy5sYXRleC5idWlsZGVyLmNtZHNbMV0pLnRvQmUoJ2JpYnRleCBtYWluJylcblxuICAgIGRlc2NyaWJlICc6OmJ1aWxkJywgLT5cbiAgICAgIGV4ZWNDbWQgPSBleGVjQ21kXyA9IG9wZW4gPSBvcGVuXyA9IHVuZGVmaW5lZFxuXG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPiBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZSgnc3RhdHVzLWJhcicpXG4gICAgICAgIG9wZW4gPSBqYXNtaW5lLmNyZWF0ZVNweSgnb3BlbicpXG4gICAgICAgIHN0ZG91dCA9IGphc21pbmUuY3JlYXRlU3B5KCdzdGRvdXQnKVxuICAgICAgICBleGVjQ21kID0gamFzbWluZS5jcmVhdGVTcHkoJ2V4ZWNDbWQnKS5hbmRDYWxsRmFrZSgoY21kLCBjd2QsIGZuKSAtPlxuICAgICAgICAgIGZuKClcbiAgICAgICAgICByZXR1cm4gc3Rkb3V0OlxuICAgICAgICAgICAgb246IChkYXRhLCBmbikgLT5cbiAgICAgICAgICAgICAgc3Rkb3V0KGRhdGEsIGZuKVxuICAgICAgICApXG4gICAgICAgIG9wZW5fID0gcGtnLmxhdGV4LnZpZXdlci5vcGVuVmlld2VyTmV3V2luZG93XG4gICAgICAgIHBrZy5sYXRleC52aWV3ZXIub3BlblZpZXdlck5ld1dpbmRvdyA9IG9wZW5cbiAgICAgICAgZXhlY0NtZF8gPSBwa2cubGF0ZXguYnVpbGRlci5leGVjQ21kXG4gICAgICAgIHBrZy5sYXRleC5idWlsZGVyLmV4ZWNDbWQgPSBleGVjQ21kXG5cbiAgICAgIGFmdGVyRWFjaCAtPlxuICAgICAgICBwa2cubGF0ZXgudmlld2VyLm9wZW5WaWV3ZXJOZXdXaW5kb3cgPSBvcGVuX1xuICAgICAgICBwa2cubGF0ZXguYnVpbGRlci5leGVjQ21kID0gZXhlY0NtZF9cbiAgICAgICAgaGVscGVyLnJlc3RvcmVDb25maWdzKClcblxuICAgICAgaXQgJ3Nob3VsZCBleGVjdXRlIGFsbCBjb21tYW5kcyBzZXF1ZW50aWFsbHknLCAtPlxuICAgICAgICBoZWxwZXIuc2V0Q29uZmlnICdhdG9tLWxhdGV4LnRvb2xjaGFpbicsICdjdXN0b20gdG9vbGNoYWluJ1xuICAgICAgICBoZWxwZXIudW5zZXRDb25maWcgJ2F0b20tbGF0ZXguY29tcGlsZXInXG4gICAgICAgIGhlbHBlci51bnNldENvbmZpZyAnYXRvbS1sYXRleC5iaWJ0ZXgnXG4gICAgICAgIGhlbHBlci51bnNldENvbmZpZyAnYXRvbS1sYXRleC5jb21waWxlcl9wYXJhbSdcbiAgICAgICAgaGVscGVyLnVuc2V0Q29uZmlnICdhdG9tLWxhdGV4LmN1c3RvbV90b29sY2hhaW4nXG4gICAgICAgIGhlbHBlci5zZXRDb25maWcgJ2F0b20tbGF0ZXgucHJldmlld19hZnRlcl9idWlsZCcsICdEbyBub3RoaW5nJ1xuICAgICAgICBwa2cubGF0ZXguYnVpbGRlci5idWlsZCgpXG4gICAgICAgIGV4cGVjdChleGVjQ21kLmNhbGxDb3VudCkudG9CZSg0KVxuICAgICAgICBleHBlY3Qob3Blbikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKVxuXG4gICAgICBpdCAnc2hvdWxkIG9wZW4gcHJldmlldyB3aGVuIHJlYWR5IGlmIGVuYWJsZWQnLCAtPlxuICAgICAgICBoZWxwZXIuc2V0Q29uZmlnICdhdG9tLWxhdGV4LnRvb2xjaGFpbicsICdjdXN0b20gdG9vbGNoYWluJ1xuICAgICAgICBoZWxwZXIudW5zZXRDb25maWcgJ2F0b20tbGF0ZXguY29tcGlsZXInXG4gICAgICAgIGhlbHBlci51bnNldENvbmZpZyAnYXRvbS1sYXRleC5iaWJ0ZXgnXG4gICAgICAgIGhlbHBlci51bnNldENvbmZpZyAnYXRvbS1sYXRleC5jb21waWxlcl9wYXJhbSdcbiAgICAgICAgaGVscGVyLnVuc2V0Q29uZmlnICdhdG9tLWxhdGV4LmN1c3RvbV90b29sY2hhaW4nXG4gICAgICAgIGhlbHBlci5zZXRDb25maWcgJ2F0b20tbGF0ZXgucHJldmlld19hZnRlcl9idWlsZCcsIHRydWVcbiAgICAgICAgcGtnLmxhdGV4LmJ1aWxkZXIuYnVpbGQoKVxuICAgICAgICBleHBlY3Qob3BlbikudG9IYXZlQmVlbkNhbGxlZCgpXG5cbiAgZGVzY3JpYmUgJ01hbmFnZXInLCAtPlxuICAgIGRlc2NyaWJlICc6OmZpbGVNYWluJywgLT5cbiAgICAgIGl0ICdzaG91bGQgcmV0dXJuIGZhbHNlIHdoZW4gbm8gbWFpbiBmaWxlIGV4aXN0cyBpbiBwcm9qZWN0IHJvb3QnLCAtPlxuICAgICAgICBwa2cubGF0ZXgubWFpbkZpbGUgPSB1bmRlZmluZWRcbiAgICAgICAgcHJvamVjdCA9IFwiXCJcIiN7cGF0aC5kaXJuYW1lKF9fZmlsZW5hbWUpfVwiXCJcIlxuICAgICAgICBhdG9tLnByb2plY3Quc2V0UGF0aHMgW3Byb2plY3RdXG4gICAgICAgIHJlc3VsdCA9IHBrZy5sYXRleC5tYW5hZ2VyLmZpbmRNYWluKClcbiAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZShmYWxzZSlcbiAgICAgICAgZXhwZWN0KHBrZy5sYXRleC5tYWluRmlsZSkudG9CZSh1bmRlZmluZWQpXG5cbiAgICAgIGl0ICdzaG91bGQgc2V0IG1haW4gZmlsZSBmdWxsIHBhdGggd2hlbiBpdCBleGlzdHMgaW4gcHJvamVjdCByb290JywgLT5cbiAgICAgICAgcGtnLmxhdGV4Lm1haW5GaWxlID0gdW5kZWZpbmVkXG4gICAgICAgIHByb2plY3QgPSBcIlwiXCIje3BhdGguZGlybmFtZShfX2ZpbGVuYW1lKX0je3BhdGguc2VwfWxhdGV4X3Byb2plY3RcIlwiXCJcbiAgICAgICAgYXRvbS5wcm9qZWN0LnNldFBhdGhzIFtwcm9qZWN0XVxuICAgICAgICByZXN1bHQgPSBwa2cubGF0ZXgubWFuYWdlci5maW5kTWFpbigpXG4gICAgICAgIHJlbGF0aXZlID0gcGF0aC5yZWxhdGl2ZShwcm9qZWN0LCBwa2cubGF0ZXgubWFpbkZpbGUpXG4gICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmUodHJ1ZSlcbiAgICAgICAgZXhwZWN0KHBrZy5sYXRleC5tYWluRmlsZSkudG9CZShcIlwiXCIje3Byb2plY3R9I3twYXRoLnNlcH1tYWluLnRleFwiXCJcIilcblxuICAgIGRlc2NyaWJlICc6OmZpbmRBbGwnLCAtPlxuICAgICAgaXQgJ3Nob3VsZCByZXR1cm4gYWxsIGlucHV0IGZpbGVzIHJlY3Vyc2l2ZWx5JywgLT5cbiAgICAgICAgcHJvamVjdCA9IFwiXCJcIiN7cGF0aC5kaXJuYW1lKF9fZmlsZW5hbWUpfSN7cGF0aC5zZXB9bGF0ZXhfcHJvamVjdFwiXCJcIlxuICAgICAgICBhdG9tLnByb2plY3Quc2V0UGF0aHMgW3Byb2plY3RdXG4gICAgICAgIHBrZy5sYXRleC5tYWluRmlsZSA9IFwiXCJcIiN7cHJvamVjdH0je3BhdGguc2VwfW1haW4udGV4XCJcIlwiXG4gICAgICAgIHJlc3VsdCA9IHBrZy5sYXRleC5tYW5hZ2VyLmZpbmRBbGwoKVxuICAgICAgICBleHBlY3QocGtnLmxhdGV4LnRleEZpbGVzLmxlbmd0aCkudG9CZSgyKVxuICAgICAgICBleHBlY3QocGtnLmxhdGV4LmJpYkZpbGVzLmxlbmd0aCkudG9CZSgwKVxuIl19
