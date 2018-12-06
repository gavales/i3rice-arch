(function() {
  var ColorBuffer, ColorProject, SERIALIZE_MARKERS_VERSION, SERIALIZE_VERSION, TOTAL_COLORS_VARIABLES_IN_PROJECT, TOTAL_VARIABLES_IN_PROJECT, click, fs, jsonFixture, os, path, ref, temp;

  os = require('os');

  fs = require('fs-plus');

  path = require('path');

  temp = require('temp');

  ref = require('../lib/versions'), SERIALIZE_VERSION = ref.SERIALIZE_VERSION, SERIALIZE_MARKERS_VERSION = ref.SERIALIZE_MARKERS_VERSION;

  ColorProject = require('../lib/color-project');

  ColorBuffer = require('../lib/color-buffer');

  jsonFixture = require('./helpers/fixtures').jsonFixture(__dirname, 'fixtures');

  click = require('./helpers/events').click;

  TOTAL_VARIABLES_IN_PROJECT = 12;

  TOTAL_COLORS_VARIABLES_IN_PROJECT = 10;

  describe('ColorProject', function() {
    var eventSpy, paths, project, promise, ref1, rootPath;
    ref1 = [], project = ref1[0], promise = ref1[1], rootPath = ref1[2], paths = ref1[3], eventSpy = ref1[4];
    beforeEach(function() {
      var fixturesPath;
      atom.config.set('pigments.sourceNames', ['*.styl']);
      atom.config.set('pigments.ignoredNames', []);
      atom.config.set('pigments.filetypesForColorWords', ['*']);
      fixturesPath = atom.project.getPaths()[0];
      rootPath = fixturesPath + "/project";
      atom.project.setPaths([rootPath]);
      return project = new ColorProject({
        ignoredNames: ['vendor/*'],
        sourceNames: ['*.less'],
        ignoredScopes: ['\\.comment']
      });
    });
    afterEach(function() {
      return project.destroy();
    });
    describe('.deserialize', function() {
      return it('restores the project in its previous state', function() {
        var data, json;
        data = {
          root: rootPath,
          timestamp: new Date().toJSON(),
          version: SERIALIZE_VERSION,
          markersVersion: SERIALIZE_MARKERS_VERSION
        };
        json = jsonFixture('base-project.json', data);
        project = ColorProject.deserialize(json);
        expect(project).toBeDefined();
        expect(project.getPaths()).toEqual([rootPath + "/styles/buttons.styl", rootPath + "/styles/variables.styl"]);
        expect(project.getVariables().length).toEqual(TOTAL_VARIABLES_IN_PROJECT);
        return expect(project.getColorVariables().length).toEqual(TOTAL_COLORS_VARIABLES_IN_PROJECT);
      });
    });
    describe('::initialize', function() {
      beforeEach(function() {
        eventSpy = jasmine.createSpy('did-initialize');
        project.onDidInitialize(eventSpy);
        return waitsForPromise(function() {
          return project.initialize();
        });
      });
      it('loads the paths to scan in the project', function() {
        return expect(project.getPaths()).toEqual([rootPath + "/styles/buttons.styl", rootPath + "/styles/variables.styl"]);
      });
      it('scans the loaded paths to retrieve the variables', function() {
        expect(project.getVariables()).toBeDefined();
        return expect(project.getVariables().length).toEqual(TOTAL_VARIABLES_IN_PROJECT);
      });
      return it('dispatches a did-initialize event', function() {
        return expect(eventSpy).toHaveBeenCalled();
      });
    });
    describe('::findAllColors', function() {
      return it('returns all the colors in the legibles files of the project', function() {
        var search;
        search = project.findAllColors();
        return expect(search).toBeDefined();
      });
    });
    describe('when the variables have not been loaded yet', function() {
      describe('::serialize', function() {
        return it('returns an object without paths nor variables', function() {
          var date, expected;
          date = new Date;
          spyOn(project, 'getTimestamp').andCallFake(function() {
            return date;
          });
          expected = {
            deserializer: 'ColorProject',
            timestamp: date,
            version: SERIALIZE_VERSION,
            markersVersion: SERIALIZE_MARKERS_VERSION,
            globalSourceNames: ['*.styl'],
            globalIgnoredNames: [],
            ignoredNames: ['vendor/*'],
            sourceNames: ['*.less'],
            ignoredScopes: ['\\.comment'],
            buffers: {}
          };
          return expect(project.serialize()).toEqual(expected);
        });
      });
      describe('::getVariablesForPath', function() {
        return it('returns undefined', function() {
          return expect(project.getVariablesForPath(rootPath + "/styles/variables.styl")).toEqual([]);
        });
      });
      describe('::getVariableByName', function() {
        return it('returns undefined', function() {
          return expect(project.getVariableByName("foo")).toBeUndefined();
        });
      });
      describe('::getVariableById', function() {
        return it('returns undefined', function() {
          return expect(project.getVariableById(0)).toBeUndefined();
        });
      });
      describe('::getContext', function() {
        return it('returns an empty context', function() {
          expect(project.getContext()).toBeDefined();
          return expect(project.getContext().getVariablesCount()).toEqual(0);
        });
      });
      describe('::getPalette', function() {
        return it('returns an empty palette', function() {
          expect(project.getPalette()).toBeDefined();
          return expect(project.getPalette().getColorsCount()).toEqual(0);
        });
      });
      describe('::reloadVariablesForPath', function() {
        beforeEach(function() {
          spyOn(project, 'initialize').andCallThrough();
          return waitsForPromise(function() {
            return project.reloadVariablesForPath(rootPath + "/styles/variables.styl");
          });
        });
        return it('returns a promise hooked on the initialize promise', function() {
          return expect(project.initialize).toHaveBeenCalled();
        });
      });
      describe('::setIgnoredNames', function() {
        beforeEach(function() {
          project.setIgnoredNames([]);
          return waitsForPromise(function() {
            return project.initialize();
          });
        });
        return it('initializes the project with the new paths', function() {
          return expect(project.getVariables().length).toEqual(32);
        });
      });
      return describe('::setSourceNames', function() {
        beforeEach(function() {
          project.setSourceNames([]);
          return waitsForPromise(function() {
            return project.initialize();
          });
        });
        return it('initializes the project with the new paths', function() {
          return expect(project.getVariables().length).toEqual(12);
        });
      });
    });
    describe('when the project has no variables source files', function() {
      beforeEach(function() {
        var fixturesPath;
        atom.config.set('pigments.sourceNames', ['*.sass']);
        fixturesPath = atom.project.getPaths()[0];
        rootPath = fixturesPath + "-no-sources";
        atom.project.setPaths([rootPath]);
        project = new ColorProject({});
        return waitsForPromise(function() {
          return project.initialize();
        });
      });
      it('initializes the paths with an empty array', function() {
        return expect(project.getPaths()).toEqual([]);
      });
      return it('initializes the variables with an empty array', function() {
        return expect(project.getVariables()).toEqual([]);
      });
    });
    describe('when the project has custom source names defined', function() {
      beforeEach(function() {
        var fixturesPath;
        atom.config.set('pigments.sourceNames', ['*.sass']);
        fixturesPath = atom.project.getPaths()[0];
        project = new ColorProject({
          sourceNames: ['*.styl']
        });
        return waitsForPromise(function() {
          return project.initialize();
        });
      });
      it('initializes the paths with an empty array', function() {
        return expect(project.getPaths().length).toEqual(2);
      });
      return it('initializes the variables with an empty array', function() {
        expect(project.getVariables().length).toEqual(TOTAL_VARIABLES_IN_PROJECT);
        return expect(project.getColorVariables().length).toEqual(TOTAL_COLORS_VARIABLES_IN_PROJECT);
      });
    });
    describe('when the project has looping variable definition', function() {
      beforeEach(function() {
        var fixturesPath;
        atom.config.set('pigments.sourceNames', ['*.sass']);
        fixturesPath = atom.project.getPaths()[0];
        rootPath = fixturesPath + "-with-recursion";
        atom.project.setPaths([rootPath]);
        project = new ColorProject({});
        return waitsForPromise(function() {
          return project.initialize();
        });
      });
      return it('ignores the looping definition', function() {
        expect(project.getVariables().length).toEqual(5);
        return expect(project.getColorVariables().length).toEqual(5);
      });
    });
    describe('when the variables have been loaded', function() {
      beforeEach(function() {
        return waitsForPromise(function() {
          return project.initialize();
        });
      });
      describe('::serialize', function() {
        return it('returns an object with project properties', function() {
          var date;
          date = new Date;
          spyOn(project, 'getTimestamp').andCallFake(function() {
            return date;
          });
          return expect(project.serialize()).toEqual({
            deserializer: 'ColorProject',
            ignoredNames: ['vendor/*'],
            sourceNames: ['*.less'],
            ignoredScopes: ['\\.comment'],
            timestamp: date,
            version: SERIALIZE_VERSION,
            markersVersion: SERIALIZE_MARKERS_VERSION,
            paths: [rootPath + "/styles/buttons.styl", rootPath + "/styles/variables.styl"],
            globalSourceNames: ['*.styl'],
            globalIgnoredNames: [],
            buffers: {},
            variables: project.variables.serialize()
          });
        });
      });
      describe('::getVariablesForPath', function() {
        it('returns the variables defined in the file', function() {
          return expect(project.getVariablesForPath(rootPath + "/styles/variables.styl").length).toEqual(TOTAL_VARIABLES_IN_PROJECT);
        });
        return describe('for a file that was ignored in the scanning process', function() {
          return it('returns undefined', function() {
            return expect(project.getVariablesForPath(rootPath + "/vendor/css/variables.less")).toEqual([]);
          });
        });
      });
      describe('::deleteVariablesForPath', function() {
        return it('removes all the variables coming from the specified file', function() {
          project.deleteVariablesForPath(rootPath + "/styles/variables.styl");
          return expect(project.getVariablesForPath(rootPath + "/styles/variables.styl")).toEqual([]);
        });
      });
      describe('::getContext', function() {
        return it('returns a context with the project variables', function() {
          expect(project.getContext()).toBeDefined();
          return expect(project.getContext().getVariablesCount()).toEqual(TOTAL_VARIABLES_IN_PROJECT);
        });
      });
      describe('::getPalette', function() {
        return it('returns a palette with the colors from the project', function() {
          expect(project.getPalette()).toBeDefined();
          return expect(project.getPalette().getColorsCount()).toEqual(10);
        });
      });
      describe('::showVariableInFile', function() {
        return it('opens the file where is located the variable', function() {
          var spy;
          spy = jasmine.createSpy('did-add-text-editor');
          atom.workspace.onDidAddTextEditor(spy);
          project.showVariableInFile(project.getVariables()[0]);
          waitsFor(function() {
            return spy.callCount > 0;
          });
          return runs(function() {
            var editor;
            editor = atom.workspace.getActiveTextEditor();
            return expect(editor.getSelectedBufferRange()).toEqual([[1, 2], [1, 14]]);
          });
        });
      });
      describe('::reloadVariablesForPath', function() {
        return describe('for a file that is part of the loaded paths', function() {
          describe('where the reload finds new variables', function() {
            beforeEach(function() {
              project.deleteVariablesForPath(rootPath + "/styles/variables.styl");
              eventSpy = jasmine.createSpy('did-update-variables');
              project.onDidUpdateVariables(eventSpy);
              return waitsForPromise(function() {
                return project.reloadVariablesForPath(rootPath + "/styles/variables.styl");
              });
            });
            it('scans again the file to find variables', function() {
              return expect(project.getVariables().length).toEqual(TOTAL_VARIABLES_IN_PROJECT);
            });
            return it('dispatches a did-update-variables event', function() {
              return expect(eventSpy).toHaveBeenCalled();
            });
          });
          return describe('where the reload finds nothing new', function() {
            beforeEach(function() {
              eventSpy = jasmine.createSpy('did-update-variables');
              project.onDidUpdateVariables(eventSpy);
              return waitsForPromise(function() {
                return project.reloadVariablesForPath(rootPath + "/styles/variables.styl");
              });
            });
            it('leaves the file variables intact', function() {
              return expect(project.getVariables().length).toEqual(TOTAL_VARIABLES_IN_PROJECT);
            });
            return it('does not dispatch a did-update-variables event', function() {
              return expect(eventSpy).not.toHaveBeenCalled();
            });
          });
        });
      });
      describe('::reloadVariablesForPaths', function() {
        describe('for a file that is part of the loaded paths', function() {
          describe('where the reload finds new variables', function() {
            beforeEach(function() {
              project.deleteVariablesForPaths([rootPath + "/styles/variables.styl", rootPath + "/styles/buttons.styl"]);
              eventSpy = jasmine.createSpy('did-update-variables');
              project.onDidUpdateVariables(eventSpy);
              return waitsForPromise(function() {
                return project.reloadVariablesForPaths([rootPath + "/styles/variables.styl", rootPath + "/styles/buttons.styl"]);
              });
            });
            it('scans again the file to find variables', function() {
              return expect(project.getVariables().length).toEqual(TOTAL_VARIABLES_IN_PROJECT);
            });
            return it('dispatches a did-update-variables event', function() {
              return expect(eventSpy).toHaveBeenCalled();
            });
          });
          return describe('where the reload finds nothing new', function() {
            beforeEach(function() {
              eventSpy = jasmine.createSpy('did-update-variables');
              project.onDidUpdateVariables(eventSpy);
              return waitsForPromise(function() {
                return project.reloadVariablesForPaths([rootPath + "/styles/variables.styl", rootPath + "/styles/buttons.styl"]);
              });
            });
            it('leaves the file variables intact', function() {
              return expect(project.getVariables().length).toEqual(TOTAL_VARIABLES_IN_PROJECT);
            });
            return it('does not dispatch a did-update-variables event', function() {
              return expect(eventSpy).not.toHaveBeenCalled();
            });
          });
        });
        return describe('for a file that is not part of the loaded paths', function() {
          beforeEach(function() {
            spyOn(project, 'loadVariablesForPath').andCallThrough();
            return waitsForPromise(function() {
              return project.reloadVariablesForPath(rootPath + "/vendor/css/variables.less");
            });
          });
          return it('does nothing', function() {
            return expect(project.loadVariablesForPath).not.toHaveBeenCalled();
          });
        });
      });
      describe('when a buffer with variables is open', function() {
        var colorBuffer, editor, ref2;
        ref2 = [], editor = ref2[0], colorBuffer = ref2[1];
        beforeEach(function() {
          eventSpy = jasmine.createSpy('did-update-variables');
          project.onDidUpdateVariables(eventSpy);
          waitsForPromise(function() {
            return atom.workspace.open('styles/variables.styl').then(function(o) {
              return editor = o;
            });
          });
          runs(function() {
            colorBuffer = project.colorBufferForEditor(editor);
            return spyOn(colorBuffer, 'scanBufferForVariables').andCallThrough();
          });
          waitsForPromise(function() {
            return project.initialize();
          });
          return waitsForPromise(function() {
            return colorBuffer.variablesAvailable();
          });
        });
        it('updates the project variable with the buffer ranges', function() {
          var i, len, ref3, results, variable;
          ref3 = project.getVariables();
          results = [];
          for (i = 0, len = ref3.length; i < len; i++) {
            variable = ref3[i];
            results.push(expect(variable.bufferRange).toBeDefined());
          }
          return results;
        });
        describe('when a color is modified that does not affect other variables ranges', function() {
          var variablesTextRanges;
          variablesTextRanges = [][0];
          beforeEach(function() {
            variablesTextRanges = {};
            project.getVariablesForPath(editor.getPath()).forEach(function(variable) {
              return variablesTextRanges[variable.name] = variable.range;
            });
            editor.setSelectedBufferRange([[1, 7], [1, 14]]);
            editor.insertText('#336');
            editor.getBuffer().emitter.emit('did-stop-changing');
            return waitsFor(function() {
              return eventSpy.callCount > 0;
            });
          });
          it('reloads the variables with the buffer instead of the file', function() {
            expect(colorBuffer.scanBufferForVariables).toHaveBeenCalled();
            return expect(project.getVariables().length).toEqual(TOTAL_VARIABLES_IN_PROJECT);
          });
          it('uses the buffer ranges to detect which variables were really changed', function() {
            expect(eventSpy.argsForCall[0][0].destroyed).toBeUndefined();
            expect(eventSpy.argsForCall[0][0].created).toBeUndefined();
            return expect(eventSpy.argsForCall[0][0].updated.length).toEqual(1);
          });
          it('updates the text range of the other variables', function() {
            return project.getVariablesForPath(rootPath + "/styles/variables.styl").forEach(function(variable) {
              if (variable.name !== 'colors.red') {
                expect(variable.range[0]).toEqual(variablesTextRanges[variable.name][0] - 3);
                return expect(variable.range[1]).toEqual(variablesTextRanges[variable.name][1] - 3);
              }
            });
          });
          return it('dispatches a did-update-variables event', function() {
            return expect(eventSpy).toHaveBeenCalled();
          });
        });
        describe('when a text is inserted that affects other variables ranges', function() {
          var ref3, variablesBufferRanges, variablesTextRanges;
          ref3 = [], variablesTextRanges = ref3[0], variablesBufferRanges = ref3[1];
          beforeEach(function() {
            runs(function() {
              variablesTextRanges = {};
              variablesBufferRanges = {};
              project.getVariablesForPath(editor.getPath()).forEach(function(variable) {
                variablesTextRanges[variable.name] = variable.range;
                return variablesBufferRanges[variable.name] = variable.bufferRange;
              });
              spyOn(project.variables, 'addMany').andCallThrough();
              editor.setSelectedBufferRange([[0, 0], [0, 0]]);
              editor.insertText('\n\n');
              return editor.getBuffer().emitter.emit('did-stop-changing');
            });
            return waitsFor(function() {
              return project.variables.addMany.callCount > 0;
            });
          });
          it('does not trigger a change event', function() {
            return expect(eventSpy.callCount).toEqual(0);
          });
          return it('updates the range of the updated variables', function() {
            return project.getVariablesForPath(rootPath + "/styles/variables.styl").forEach(function(variable) {
              if (variable.name !== 'colors.red') {
                expect(variable.range[0]).toEqual(variablesTextRanges[variable.name][0] + 2);
                expect(variable.range[1]).toEqual(variablesTextRanges[variable.name][1] + 2);
                return expect(variable.bufferRange.isEqual(variablesBufferRanges[variable.name])).toBeFalsy();
              }
            });
          });
        });
        describe('when a color is removed', function() {
          var variablesTextRanges;
          variablesTextRanges = [][0];
          beforeEach(function() {
            runs(function() {
              variablesTextRanges = {};
              project.getVariablesForPath(editor.getPath()).forEach(function(variable) {
                return variablesTextRanges[variable.name] = variable.range;
              });
              editor.setSelectedBufferRange([[1, 0], [2, 0]]);
              editor.insertText('');
              return editor.getBuffer().emitter.emit('did-stop-changing');
            });
            return waitsFor(function() {
              return eventSpy.callCount > 0;
            });
          });
          it('reloads the variables with the buffer instead of the file', function() {
            expect(colorBuffer.scanBufferForVariables).toHaveBeenCalled();
            return expect(project.getVariables().length).toEqual(TOTAL_VARIABLES_IN_PROJECT - 1);
          });
          it('uses the buffer ranges to detect which variables were really changed', function() {
            expect(eventSpy.argsForCall[0][0].destroyed.length).toEqual(1);
            expect(eventSpy.argsForCall[0][0].created).toBeUndefined();
            return expect(eventSpy.argsForCall[0][0].updated).toBeUndefined();
          });
          it('can no longer be found in the project variables', function() {
            expect(project.getVariables().some(function(v) {
              return v.name === 'colors.red';
            })).toBeFalsy();
            return expect(project.getColorVariables().some(function(v) {
              return v.name === 'colors.red';
            })).toBeFalsy();
          });
          return it('dispatches a did-update-variables event', function() {
            return expect(eventSpy).toHaveBeenCalled();
          });
        });
        return describe('when all the colors are removed', function() {
          var variablesTextRanges;
          variablesTextRanges = [][0];
          beforeEach(function() {
            runs(function() {
              variablesTextRanges = {};
              project.getVariablesForPath(editor.getPath()).forEach(function(variable) {
                return variablesTextRanges[variable.name] = variable.range;
              });
              editor.setSelectedBufferRange([[0, 0], [2e308, 2e308]]);
              editor.insertText('');
              return editor.getBuffer().emitter.emit('did-stop-changing');
            });
            return waitsFor(function() {
              return eventSpy.callCount > 0;
            });
          });
          it('removes every variable from the file', function() {
            expect(colorBuffer.scanBufferForVariables).toHaveBeenCalled();
            expect(project.getVariables().length).toEqual(0);
            expect(eventSpy.argsForCall[0][0].destroyed.length).toEqual(TOTAL_VARIABLES_IN_PROJECT);
            expect(eventSpy.argsForCall[0][0].created).toBeUndefined();
            return expect(eventSpy.argsForCall[0][0].updated).toBeUndefined();
          });
          it('can no longer be found in the project variables', function() {
            expect(project.getVariables().some(function(v) {
              return v.name === 'colors.red';
            })).toBeFalsy();
            return expect(project.getColorVariables().some(function(v) {
              return v.name === 'colors.red';
            })).toBeFalsy();
          });
          return it('dispatches a did-update-variables event', function() {
            return expect(eventSpy).toHaveBeenCalled();
          });
        });
      });
      describe('::setIgnoredNames', function() {
        describe('with an empty array', function() {
          beforeEach(function() {
            var spy;
            expect(project.getVariables().length).toEqual(12);
            spy = jasmine.createSpy('did-update-variables');
            project.onDidUpdateVariables(spy);
            project.setIgnoredNames([]);
            return waitsFor(function() {
              return spy.callCount > 0;
            });
          });
          return it('reloads the variables from the new paths', function() {
            return expect(project.getVariables().length).toEqual(32);
          });
        });
        return describe('with a more restrictive array', function() {
          beforeEach(function() {
            var spy;
            expect(project.getVariables().length).toEqual(12);
            spy = jasmine.createSpy('did-update-variables');
            project.onDidUpdateVariables(spy);
            return waitsForPromise(function() {
              return project.setIgnoredNames(['vendor/*', '**/*.styl']);
            });
          });
          return it('clears all the paths as there is no legible paths', function() {
            return expect(project.getPaths().length).toEqual(0);
          });
        });
      });
      describe('when the project has multiple root directory', function() {
        beforeEach(function() {
          var fixturesPath;
          atom.config.set('pigments.sourceNames', ['**/*.sass', '**/*.styl']);
          fixturesPath = atom.project.getPaths()[0];
          atom.project.setPaths(["" + fixturesPath, fixturesPath + "-with-recursion"]);
          project = new ColorProject({});
          return waitsForPromise(function() {
            return project.initialize();
          });
        });
        return it('finds the variables from the two directories', function() {
          return expect(project.getVariables().length).toEqual(17);
        });
      });
      describe('when the project has VCS ignored files', function() {
        var projectPath;
        projectPath = [][0];
        beforeEach(function() {
          var dotGit, dotGitFixture, fixture;
          atom.config.set('pigments.sourceNames', ['*.sass']);
          fixture = path.join(__dirname, 'fixtures', 'project-with-gitignore');
          projectPath = temp.mkdirSync('pigments-project');
          dotGitFixture = path.join(fixture, 'git.git');
          dotGit = path.join(projectPath, '.git');
          fs.copySync(dotGitFixture, dotGit);
          fs.writeFileSync(path.join(projectPath, '.gitignore'), fs.readFileSync(path.join(fixture, 'git.gitignore')));
          fs.writeFileSync(path.join(projectPath, 'base.sass'), fs.readFileSync(path.join(fixture, 'base.sass')));
          fs.writeFileSync(path.join(projectPath, 'ignored.sass'), fs.readFileSync(path.join(fixture, 'ignored.sass')));
          fs.mkdirSync(path.join(projectPath, 'bower_components'));
          fs.writeFileSync(path.join(projectPath, 'bower_components', 'some-ignored-file.sass'), fs.readFileSync(path.join(fixture, 'bower_components', 'some-ignored-file.sass')));
          return atom.project.setPaths([projectPath]);
        });
        describe('when the ignoreVcsIgnoredPaths setting is enabled', function() {
          beforeEach(function() {
            atom.config.set('pigments.ignoreVcsIgnoredPaths', true);
            project = new ColorProject({});
            return waitsForPromise(function() {
              return project.initialize();
            });
          });
          it('finds the variables from the three files', function() {
            expect(project.getVariables().length).toEqual(3);
            return expect(project.getPaths().length).toEqual(1);
          });
          return describe('and then disabled', function() {
            beforeEach(function() {
              var spy;
              spy = jasmine.createSpy('did-update-variables');
              project.onDidUpdateVariables(spy);
              atom.config.set('pigments.ignoreVcsIgnoredPaths', false);
              return waitsFor(function() {
                return spy.callCount > 0;
              });
            });
            it('reloads the paths', function() {
              return expect(project.getPaths().length).toEqual(3);
            });
            return it('reloads the variables', function() {
              return expect(project.getVariables().length).toEqual(10);
            });
          });
        });
        return describe('when the ignoreVcsIgnoredPaths setting is disabled', function() {
          beforeEach(function() {
            atom.config.set('pigments.ignoreVcsIgnoredPaths', false);
            project = new ColorProject({});
            return waitsForPromise(function() {
              return project.initialize();
            });
          });
          it('finds the variables from the three files', function() {
            expect(project.getVariables().length).toEqual(10);
            return expect(project.getPaths().length).toEqual(3);
          });
          return describe('and then enabled', function() {
            beforeEach(function() {
              var spy;
              spy = jasmine.createSpy('did-update-variables');
              project.onDidUpdateVariables(spy);
              atom.config.set('pigments.ignoreVcsIgnoredPaths', true);
              return waitsFor(function() {
                return spy.callCount > 0;
              });
            });
            it('reloads the paths', function() {
              return expect(project.getPaths().length).toEqual(1);
            });
            return it('reloads the variables', function() {
              return expect(project.getVariables().length).toEqual(3);
            });
          });
        });
      });
      describe('when the sourceNames setting is changed', function() {
        var updateSpy;
        updateSpy = [][0];
        beforeEach(function() {
          var originalPaths;
          originalPaths = project.getPaths();
          atom.config.set('pigments.sourceNames', []);
          return waitsFor(function() {
            return project.getPaths().join(',') !== originalPaths.join(',');
          });
        });
        it('updates the variables using the new pattern', function() {
          return expect(project.getVariables().length).toEqual(0);
        });
        return describe('so that new paths are found', function() {
          beforeEach(function() {
            var originalPaths;
            updateSpy = jasmine.createSpy('did-update-variables');
            originalPaths = project.getPaths();
            project.onDidUpdateVariables(updateSpy);
            atom.config.set('pigments.sourceNames', ['**/*.styl']);
            waitsFor(function() {
              return project.getPaths().join(',') !== originalPaths.join(',');
            });
            return waitsFor(function() {
              return updateSpy.callCount > 0;
            });
          });
          return it('loads the variables from these new paths', function() {
            return expect(project.getVariables().length).toEqual(TOTAL_VARIABLES_IN_PROJECT);
          });
        });
      });
      describe('when the ignoredNames setting is changed', function() {
        var updateSpy;
        updateSpy = [][0];
        beforeEach(function() {
          var originalPaths;
          originalPaths = project.getPaths();
          atom.config.set('pigments.ignoredNames', ['**/*.styl']);
          return waitsFor(function() {
            return project.getPaths().join(',') !== originalPaths.join(',');
          });
        });
        it('updates the found using the new pattern', function() {
          return expect(project.getVariables().length).toEqual(0);
        });
        return describe('so that new paths are found', function() {
          beforeEach(function() {
            var originalPaths;
            updateSpy = jasmine.createSpy('did-update-variables');
            originalPaths = project.getPaths();
            project.onDidUpdateVariables(updateSpy);
            atom.config.set('pigments.ignoredNames', []);
            waitsFor(function() {
              return project.getPaths().join(',') !== originalPaths.join(',');
            });
            return waitsFor(function() {
              return updateSpy.callCount > 0;
            });
          });
          return it('loads the variables from these new paths', function() {
            return expect(project.getVariables().length).toEqual(TOTAL_VARIABLES_IN_PROJECT);
          });
        });
      });
      describe('when the extendedSearchNames setting is changed', function() {
        var updateSpy;
        updateSpy = [][0];
        beforeEach(function() {
          return project.setSearchNames(['*.foo']);
        });
        it('updates the search names', function() {
          return expect(project.getSearchNames().length).toEqual(3);
        });
        return it('serializes the setting', function() {
          return expect(project.serialize().searchNames).toEqual(['*.foo']);
        });
      });
      describe('when the ignore global config settings are enabled', function() {
        describe('for the sourceNames field', function() {
          beforeEach(function() {
            project.sourceNames = ['*.foo'];
            return waitsForPromise(function() {
              return project.setIgnoreGlobalSourceNames(true);
            });
          });
          it('ignores the content of the global config', function() {
            return expect(project.getSourceNames()).toEqual(['.pigments', '*.foo']);
          });
          return it('serializes the project setting', function() {
            return expect(project.serialize().ignoreGlobalSourceNames).toBeTruthy();
          });
        });
        describe('for the ignoredNames field', function() {
          beforeEach(function() {
            atom.config.set('pigments.ignoredNames', ['*.foo']);
            project.ignoredNames = ['*.bar'];
            return project.setIgnoreGlobalIgnoredNames(true);
          });
          it('ignores the content of the global config', function() {
            return expect(project.getIgnoredNames()).toEqual(['*.bar']);
          });
          return it('serializes the project setting', function() {
            return expect(project.serialize().ignoreGlobalIgnoredNames).toBeTruthy();
          });
        });
        describe('for the ignoredScopes field', function() {
          beforeEach(function() {
            atom.config.set('pigments.ignoredScopes', ['\\.comment']);
            project.ignoredScopes = ['\\.source'];
            return project.setIgnoreGlobalIgnoredScopes(true);
          });
          it('ignores the content of the global config', function() {
            return expect(project.getIgnoredScopes()).toEqual(['\\.source']);
          });
          return it('serializes the project setting', function() {
            return expect(project.serialize().ignoreGlobalIgnoredScopes).toBeTruthy();
          });
        });
        return describe('for the searchNames field', function() {
          beforeEach(function() {
            atom.config.set('pigments.extendedSearchNames', ['*.css']);
            project.searchNames = ['*.foo'];
            return project.setIgnoreGlobalSearchNames(true);
          });
          it('ignores the content of the global config', function() {
            return expect(project.getSearchNames()).toEqual(['*.less', '*.foo']);
          });
          return it('serializes the project setting', function() {
            return expect(project.serialize().ignoreGlobalSearchNames).toBeTruthy();
          });
        });
      });
      describe('::loadThemesVariables', function() {
        beforeEach(function() {
          atom.packages.activatePackage('atom-light-ui');
          atom.packages.activatePackage('atom-light-syntax');
          atom.config.set('core.themes', ['atom-light-ui', 'atom-light-syntax']);
          waitsForPromise(function() {
            return atom.themes.activateThemes();
          });
          return waitsForPromise(function() {
            return atom.packages.activatePackage('pigments');
          });
        });
        afterEach(function() {
          atom.themes.deactivateThemes();
          return atom.themes.unwatchUserStylesheet();
        });
        return it('returns an array of 62 variables', function() {
          var themeVariables;
          themeVariables = project.loadThemesVariables();
          return expect(themeVariables.length).toEqual(62);
        });
      });
      return describe('when the includeThemes setting is enabled', function() {
        var ref2, spy;
        ref2 = [], paths = ref2[0], spy = ref2[1];
        beforeEach(function() {
          paths = project.getPaths();
          expect(project.getColorVariables().length).toEqual(10);
          atom.packages.activatePackage('atom-light-ui');
          atom.packages.activatePackage('atom-light-syntax');
          atom.packages.activatePackage('atom-dark-ui');
          atom.packages.activatePackage('atom-dark-syntax');
          atom.config.set('core.themes', ['atom-light-ui', 'atom-light-syntax']);
          waitsForPromise(function() {
            return atom.themes.activateThemes();
          });
          waitsForPromise(function() {
            return atom.packages.activatePackage('pigments');
          });
          waitsForPromise(function() {
            return project.initialize();
          });
          return runs(function() {
            spy = jasmine.createSpy('did-change-active-themes');
            atom.themes.onDidChangeActiveThemes(spy);
            return project.setIncludeThemes(true);
          });
        });
        afterEach(function() {
          atom.themes.deactivateThemes();
          return atom.themes.unwatchUserStylesheet();
        });
        it('includes the variables set for ui and syntax themes in the palette', function() {
          return expect(project.getColorVariables().length).toEqual(72);
        });
        it('still includes the paths from the project', function() {
          var i, len, p, results;
          results = [];
          for (i = 0, len = paths.length; i < len; i++) {
            p = paths[i];
            results.push(expect(project.getPaths().indexOf(p)).not.toEqual(-1));
          }
          return results;
        });
        it('serializes the setting with the project', function() {
          var serialized;
          serialized = project.serialize();
          return expect(serialized.includeThemes).toEqual(true);
        });
        describe('and then disabled', function() {
          beforeEach(function() {
            return project.setIncludeThemes(false);
          });
          it('removes all the paths to the themes stylesheets', function() {
            return expect(project.getColorVariables().length).toEqual(10);
          });
          return describe('when the core.themes setting is modified', function() {
            beforeEach(function() {
              spyOn(project, 'loadThemesVariables').andCallThrough();
              atom.config.set('core.themes', ['atom-dark-ui', 'atom-dark-syntax']);
              return waitsFor(function() {
                return spy.callCount > 0;
              });
            });
            return it('does not trigger a paths update', function() {
              return expect(project.loadThemesVariables).not.toHaveBeenCalled();
            });
          });
        });
        return describe('when the core.themes setting is modified', function() {
          beforeEach(function() {
            spyOn(project, 'loadThemesVariables').andCallThrough();
            atom.config.set('core.themes', ['atom-dark-ui', 'atom-dark-syntax']);
            return waitsFor(function() {
              return spy.callCount > 0;
            });
          });
          return it('triggers a paths update', function() {
            return expect(project.loadThemesVariables).toHaveBeenCalled();
          });
        });
      });
    });
    return describe('when restored', function() {
      var createProject;
      createProject = function(params) {
        var stateFixture;
        if (params == null) {
          params = {};
        }
        stateFixture = params.stateFixture;
        delete params.stateFixture;
        if (params.root == null) {
          params.root = rootPath;
        }
        if (params.timestamp == null) {
          params.timestamp = new Date().toJSON();
        }
        if (params.variableMarkers == null) {
          params.variableMarkers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
        if (params.colorMarkers == null) {
          params.colorMarkers = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        }
        if (params.version == null) {
          params.version = SERIALIZE_VERSION;
        }
        if (params.markersVersion == null) {
          params.markersVersion = SERIALIZE_MARKERS_VERSION;
        }
        return ColorProject.deserialize(jsonFixture(stateFixture, params));
      };
      describe('with a timestamp more recent than the files last modification date', function() {
        beforeEach(function() {
          project = createProject({
            stateFixture: "empty-project.json"
          });
          return waitsForPromise(function() {
            return project.initialize();
          });
        });
        return it('does not rescans the files', function() {
          return expect(project.getVariables().length).toEqual(1);
        });
      });
      describe('with a version different that the current one', function() {
        beforeEach(function() {
          project = createProject({
            stateFixture: "empty-project.json",
            version: "0.0.0"
          });
          return waitsForPromise(function() {
            return project.initialize();
          });
        });
        return it('drops the whole serialized state and rescans all the project', function() {
          return expect(project.getVariables().length).toEqual(12);
        });
      });
      describe('with a serialized path that no longer exist', function() {
        beforeEach(function() {
          project = createProject({
            stateFixture: "rename-file-project.json"
          });
          return waitsForPromise(function() {
            return project.initialize();
          });
        });
        it('drops drops the non-existing and reload the paths', function() {
          return expect(project.getPaths()).toEqual([rootPath + "/styles/buttons.styl", rootPath + "/styles/variables.styl"]);
        });
        it('drops the variables from the removed paths', function() {
          return expect(project.getVariablesForPath(rootPath + "/styles/foo.styl").length).toEqual(0);
        });
        return it('loads the variables from the new file', function() {
          return expect(project.getVariablesForPath(rootPath + "/styles/variables.styl").length).toEqual(12);
        });
      });
      describe('with a sourceNames setting value different than when serialized', function() {
        beforeEach(function() {
          atom.config.set('pigments.sourceNames', []);
          project = createProject({
            stateFixture: "empty-project.json"
          });
          return waitsForPromise(function() {
            return project.initialize();
          });
        });
        return it('drops the whole serialized state and rescans all the project', function() {
          return expect(project.getVariables().length).toEqual(0);
        });
      });
      describe('with a markers version different that the current one', function() {
        beforeEach(function() {
          project = createProject({
            stateFixture: "empty-project.json",
            markersVersion: "0.0.0"
          });
          return waitsForPromise(function() {
            return project.initialize();
          });
        });
        it('keeps the project related data', function() {
          expect(project.ignoredNames).toEqual(['vendor/*']);
          return expect(project.getPaths()).toEqual([rootPath + "/styles/buttons.styl", rootPath + "/styles/variables.styl"]);
        });
        return it('drops the variables and buffers data', function() {
          return expect(project.getVariables().length).toEqual(TOTAL_VARIABLES_IN_PROJECT);
        });
      });
      describe('with a timestamp older than the files last modification date', function() {
        beforeEach(function() {
          project = createProject({
            timestamp: new Date(0).toJSON(),
            stateFixture: "empty-project.json"
          });
          return waitsForPromise(function() {
            return project.initialize();
          });
        });
        return it('scans again all the files that have a more recent modification date', function() {
          return expect(project.getVariables().length).toEqual(TOTAL_VARIABLES_IN_PROJECT);
        });
      });
      describe('with some files not saved in the project state', function() {
        beforeEach(function() {
          project = createProject({
            stateFixture: "partial-project.json"
          });
          return waitsForPromise(function() {
            return project.initialize();
          });
        });
        return it('detects the new files and scans them', function() {
          return expect(project.getVariables().length).toEqual(12);
        });
      });
      describe('with an open editor and the corresponding buffer state', function() {
        var colorBuffer, editor, ref2;
        ref2 = [], editor = ref2[0], colorBuffer = ref2[1];
        beforeEach(function() {
          waitsForPromise(function() {
            return atom.workspace.open('variables.styl').then(function(o) {
              return editor = o;
            });
          });
          runs(function() {
            project = createProject({
              stateFixture: "open-buffer-project.json",
              id: editor.id
            });
            return spyOn(ColorBuffer.prototype, 'variablesAvailable').andCallThrough();
          });
          return runs(function() {
            return colorBuffer = project.colorBuffersByEditorId[editor.id];
          });
        });
        it('restores the color buffer in its previous state', function() {
          expect(colorBuffer).toBeDefined();
          return expect(colorBuffer.getColorMarkers().length).toEqual(TOTAL_COLORS_VARIABLES_IN_PROJECT);
        });
        return it('does not wait for the project variables', function() {
          return expect(colorBuffer.variablesAvailable).not.toHaveBeenCalled();
        });
      });
      return describe('with an open editor, the corresponding buffer state and a old timestamp', function() {
        var colorBuffer, editor, ref2;
        ref2 = [], editor = ref2[0], colorBuffer = ref2[1];
        beforeEach(function() {
          waitsForPromise(function() {
            return atom.workspace.open('variables.styl').then(function(o) {
              return editor = o;
            });
          });
          runs(function() {
            spyOn(ColorBuffer.prototype, 'updateVariableRanges').andCallThrough();
            return project = createProject({
              timestamp: new Date(0).toJSON(),
              stateFixture: "open-buffer-project.json",
              id: editor.id
            });
          });
          runs(function() {
            return colorBuffer = project.colorBuffersByEditorId[editor.id];
          });
          return waitsFor(function() {
            return colorBuffer.updateVariableRanges.callCount > 0;
          });
        });
        return it('invalidates the color buffer markers as soon as the dirty paths have been determined', function() {
          return expect(colorBuffer.updateVariableRanges).toHaveBeenCalled();
        });
      });
    });
  });

  describe('ColorProject', function() {
    var project, ref1, rootPath;
    ref1 = [], project = ref1[0], rootPath = ref1[1];
    return describe('when the project has a pigments defaults file', function() {
      beforeEach(function() {
        var fixturesPath;
        atom.config.set('pigments.sourceNames', ['*.sass']);
        fixturesPath = atom.project.getPaths()[0];
        rootPath = fixturesPath + "/project-with-defaults";
        atom.project.setPaths([rootPath]);
        project = new ColorProject({});
        return waitsForPromise(function() {
          return project.initialize();
        });
      });
      return it('loads the defaults file content', function() {
        return expect(project.getColorVariables().length).toEqual(12);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9waWdtZW50cy9zcGVjL2NvbG9yLXByb2plY3Qtc3BlYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUjs7RUFDTCxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVI7O0VBQ0wsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSOztFQUNQLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7RUFFUCxNQUFpRCxPQUFBLENBQVEsaUJBQVIsQ0FBakQsRUFBQyx5Q0FBRCxFQUFvQjs7RUFDcEIsWUFBQSxHQUFlLE9BQUEsQ0FBUSxzQkFBUjs7RUFDZixXQUFBLEdBQWMsT0FBQSxDQUFRLHFCQUFSOztFQUNkLFdBQUEsR0FBYyxPQUFBLENBQVEsb0JBQVIsQ0FBNkIsQ0FBQyxXQUE5QixDQUEwQyxTQUExQyxFQUFxRCxVQUFyRDs7RUFDYixRQUFTLE9BQUEsQ0FBUSxrQkFBUjs7RUFFViwwQkFBQSxHQUE2Qjs7RUFDN0IsaUNBQUEsR0FBb0M7O0VBRXBDLFFBQUEsQ0FBUyxjQUFULEVBQXlCLFNBQUE7QUFDdkIsUUFBQTtJQUFBLE9BQWdELEVBQWhELEVBQUMsaUJBQUQsRUFBVSxpQkFBVixFQUFtQixrQkFBbkIsRUFBNkIsZUFBN0IsRUFBb0M7SUFFcEMsVUFBQSxDQUFXLFNBQUE7QUFDVCxVQUFBO01BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHNCQUFoQixFQUF3QyxDQUN0QyxRQURzQyxDQUF4QztNQUdBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix1QkFBaEIsRUFBeUMsRUFBekM7TUFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsaUNBQWhCLEVBQW1ELENBQUMsR0FBRCxDQUFuRDtNQUVDLGVBQWdCLElBQUksQ0FBQyxPQUFPLENBQUMs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VyxDQUFDLG9CQUFuQixDQUF3QyxDQUFDLGdCQUF6QyxDQUFBO1FBRHlGLENBQTNGO01BakJrRixDQUFwRjtJQWhJd0IsQ0FBMUI7RUEvekJ1QixDQUF6Qjs7RUEyOUJBLFFBQUEsQ0FBUyxjQUFULEVBQXlCLFNBQUE7QUFDdkIsUUFBQTtJQUFBLE9BQXNCLEVBQXRCLEVBQUMsaUJBQUQsRUFBVTtXQUNWLFFBQUEsQ0FBUywrQ0FBVCxFQUEwRCxTQUFBO01BQ3hELFVBQUEsQ0FBVyxTQUFBO0FBQ1QsWUFBQTtRQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixzQkFBaEIsRUFBd0MsQ0FBQyxRQUFELENBQXhDO1FBRUMsZUFBZ0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFiLENBQUE7UUFDakIsUUFBQSxHQUFjLFlBQUQsR0FBYztRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQWIsQ0FBc0IsQ0FBQyxRQUFELENBQXRCO1FBRUEsT0FBQSxHQUFVLElBQUksWUFBSixDQUFpQixFQUFqQjtlQUVWLGVBQUEsQ0FBZ0IsU0FBQTtpQkFBRyxPQUFPLENBQUMsVUFBUixDQUFBO1FBQUgsQ0FBaEI7TUFUUyxDQUFYO2FBV0EsRUFBQSxDQUFHLGlDQUFILEVBQXNDLFNBQUE7ZUFDcEMsTUFBQSxDQUFPLE9BQU8sQ0FBQyxpQkFBUixDQUFBLENBQTJCLENBQUMsTUFBbkMsQ0FBMEMsQ0FBQyxPQUEzQyxDQUFtRCxFQUFuRDtNQURvQyxDQUF0QztJQVp3RCxDQUExRDtFQUZ1QixDQUF6QjtBQXorQkEiLCJzb3VyY2VzQ29udGVudCI6WyJvcyA9IHJlcXVpcmUgJ29zJ1xuZnMgPSByZXF1aXJlICdmcy1wbHVzJ1xucGF0aCA9IHJlcXVpcmUgJ3BhdGgnXG50ZW1wID0gcmVxdWlyZSAndGVtcCdcblxue1NFUklBTElaRV9WRVJTSU9OLCBTRVJJQUxJWkVfTUFSS0VSU19WRVJTSU9OfSA9IHJlcXVpcmUgJy4uL2xpYi92ZXJzaW9ucydcbkNvbG9yUHJvamVjdCA9IHJlcXVpcmUgJy4uL2xpYi9jb2xvci1wcm9qZWN0J1xuQ29sb3JCdWZmZXIgPSByZXF1aXJlICcuLi9saWIvY29sb3ItYnVmZmVyJ1xuanNvbkZpeHR1cmUgPSByZXF1aXJlKCcuL2hlbHBlcnMvZml4dHVyZXMnKS5qc29uRml4dHVyZShfX2Rpcm5hbWUsICdmaXh0dXJlcycpXG57Y2xpY2t9ID0gcmVxdWlyZSAnLi9oZWxwZXJzL2V2ZW50cydcblxuVE9UQUxfVkFSSUFCTEVTX0lOX1BST0pFQ1QgPSAxMlxuVE9UQUxfQ09MT1JTX1ZBUklBQkxFU19JTl9QUk9KRUNUID0gMTBcblxuZGVzY3JpYmUgJ0NvbG9yUHJvamVjdCcsIC0+XG4gIFtwcm9qZWN0LCBwcm9taXNlLCByb290UGF0aCwgcGF0aHMsIGV2ZW50U3B5XSA9IFtdXG5cbiAgYmVmb3JlRWFjaCAtPlxuICAgIGF0b20uY29uZmlnLnNldCAncGlnbWVudHMuc291cmNlTmFtZXMnLCBbXG4gICAgICAnKi5zdHlsJ1xuICAgIF1cbiAgICBhdG9tLmNvbmZpZy5zZXQgJ3BpZ21lbnRzLmlnbm9yZWROYW1lcycsIFtdXG4gICAgYXRvbS5jb25maWcuc2V0ICdwaWdtZW50cy5maWxldHlwZXNGb3JDb2xvcldvcmRzJywgWycqJ11cblxuICAgIFtmaXh0dXJlc1BhdGhdID0gYXRvbS5wcm9qZWN0LmdldFBhdGhzKClcbiAgICByb290UGF0aCA9IFwiI3tmaXh0dXJlc1BhdGh9L3Byb2plY3RcIlxuICAgIGF0b20ucHJvamVjdC5zZXRQYXRocyhbcm9vdFBhdGhdKVxuXG4gICAgcHJvamVjdCA9IG5ldyBDb2xvclByb2plY3Qoe1xuICAgICAgaWdub3JlZE5hbWVzOiBbJ3ZlbmRvci8qJ11cbiAgICAgIHNvdXJjZU5hbWVzOiBbJyoubGVzcyddXG4gICAgICBpZ25vcmVkU2NvcGVzOiBbJ1xcXFwuY29tbWVudCddXG4gICAgfSlcblxuICBhZnRlckVhY2ggLT5cbiAgICBwcm9qZWN0LmRlc3Ryb3koKVxuXG4gIGRlc2NyaWJlICcuZGVzZXJpYWxpemUnLCAtPlxuICAgIGl0ICdyZXN0b3JlcyB0aGUgcHJvamVjdCBpbiBpdHMgcHJldmlvdXMgc3RhdGUnLCAtPlxuICAgICAgZGF0YSA9XG4gICAgICAgIHJvb3Q6IHJvb3RQYXRoXG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0pTT04oKVxuICAgICAgICB2ZXJzaW9uOiBTRVJJQUxJWkVfVkVSU0lPTlxuICAgICAgICBtYXJrZXJzVmVyc2lvbjogU0VSSUFMSVpFX01BUktFUlNfVkVSU0lPTlxuXG4gICAgICBqc29uID0ganNvbkZpeHR1cmUgJ2Jhc2UtcHJvamVjdC5qc29uJywgZGF0YVxuICAgICAgcHJvamVjdCA9IENvbG9yUHJvamVjdC5kZXNlcmlhbGl6ZShqc29uKVxuXG4gICAgICBleHBlY3QocHJvamVjdCkudG9CZURlZmluZWQoKVxuICAgICAgZXhwZWN0KHByb2plY3QuZ2V0UGF0aHMoKSkudG9FcXVhbChbXG4gICAgICAgIFwiI3tyb290UGF0aH0vc3R5bGVzL2J1dHRvbnMuc3R5bFwiXG4gICAgICAgIFwiI3tyb290UGF0aH0vc3R5bGVzL3ZhcmlhYmxlcy5zdHlsXCJcbiAgICAgIF0pXG4gICAgICBleHBlY3QocHJvamVjdC5nZXRWYXJpYWJsZXMoKS5sZW5ndGgpLnRvRXF1YWwoVE9UQUxfVkFSSUFCTEVTX0lOX1BST0pFQ1QpXG4gICAgICBleHBlY3QocHJvamVjdC5nZXRDb2xvclZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbChUT1RBTF9DT0xPUlNfVkFSSUFCTEVTX0lOX1BST0pFQ1QpXG5cbiAgZGVzY3JpYmUgJzo6aW5pdGlhbGl6ZScsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgZXZlbnRTcHkgPSBqYXNtaW5lLmNyZWF0ZVNweSgnZGlkLWluaXRpYWxpemUnKVxuICAgICAgcHJvamVjdC5vbkRpZEluaXRpYWxpemUoZXZlbnRTcHkpXG4gICAgICB3YWl0c0ZvclByb21pc2UgLT4gcHJvamVjdC5pbml0aWFsaXplKClcblxuICAgIGl0ICdsb2FkcyB0aGUgcGF0aHMgdG8gc2NhbiBpbiB0aGUgcHJvamVjdCcsIC0+XG4gICAgICBleHBlY3QocHJvamVjdC5nZXRQYXRocygpKS50b0VxdWFsKFtcbiAgICAgICAgXCIje3Jvb3RQYXRofS9zdHlsZXMvYnV0dG9ucy5zdHlsXCJcbiAgICAgICAgXCIje3Jvb3RQYXRofS9zdHlsZXMvdmFyaWFibGVzLnN0eWxcIlxuICAgICAgXSlcblxuICAgIGl0ICdzY2FucyB0aGUgbG9hZGVkIHBhdGhzIHRvIHJldHJpZXZlIHRoZSB2YXJpYWJsZXMnLCAtPlxuICAgICAgZXhwZWN0KHByb2plY3QuZ2V0VmFyaWFibGVzKCkpLnRvQmVEZWZpbmVkKClcbiAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbChUT1RBTF9WQVJJQUJMRVNfSU5fUFJPSkVDVClcblxuICAgIGl0ICdkaXNwYXRjaGVzIGEgZGlkLWluaXRpYWxpemUgZXZlbnQnLCAtPlxuICAgICAgZXhwZWN0KGV2ZW50U3B5KS50b0hhdmVCZWVuQ2FsbGVkKClcblxuICBkZXNjcmliZSAnOjpmaW5kQWxsQ29sb3JzJywgLT5cbiAgICBpdCAncmV0dXJucyBhbGwgdGhlIGNvbG9ycyBpbiB0aGUgbGVnaWJsZXMgZmlsZXMgb2YgdGhlIHByb2plY3QnLCAtPlxuICAgICAgc2VhcmNoID0gcHJvamVjdC5maW5kQWxsQ29sb3JzKClcbiAgICAgIGV4cGVjdChzZWFyY2gpLnRvQmVEZWZpbmVkKClcblxuICAjIyAgICAjIyAgICAgIyMgICAgIyMjICAgICMjIyMjIyMjICAgIyMjIyMjICAgICAjIyAgICAjIyAgIyMjIyMjIyAgIyMjIyMjIyNcbiAgIyMgICAgIyMgICAgICMjICAgIyMgIyMgICAjIyAgICAgIyMgIyMgICAgIyMgICAgIyMjICAgIyMgIyMgICAgICMjICAgICMjXG4gICMjICAgICMjICAgICAjIyAgIyMgICAjIyAgIyMgICAgICMjICMjICAgICAgICAgICMjIyMgICMjICMjICAgICAjIyAgICAjI1xuICAjIyAgICAjIyAgICAgIyMgIyMgICAgICMjICMjIyMjIyMjICAgIyMjIyMjICAgICAjIyAjIyAjIyAjIyAgICAgIyMgICAgIyNcbiAgIyMgICAgICMjICAgIyMgICMjIyMjIyMjIyAjIyAgICMjICAgICAgICAgIyMgICAgIyMgICMjIyMgIyMgICAgICMjICAgICMjXG4gICMjICAgICAgIyMgIyMgICAjIyAgICAgIyMgIyMgICAgIyMgICMjICAgICMjICAgICMjICAgIyMjICMjICAgICAjIyAgICAjI1xuICAjIyAgICAgICAjIyMgICAgIyMgICAgICMjICMjICAgICAjIyAgIyMjIyMjICAgICAjIyAgICAjIyAgIyMjIyMjIyAgICAgIyNcbiAgIyNcbiAgIyMgICAgIyMgICAgICAgICMjIyMjIyMgICAgICMjIyAgICAjIyMjIyMjIyAgIyMjIyMjIyMgIyMjIyMjIyNcbiAgIyMgICAgIyMgICAgICAgIyMgICAgICMjICAgIyMgIyMgICAjIyAgICAgIyMgIyMgICAgICAgIyMgICAgICMjXG4gICMjICAgICMjICAgICAgICMjICAgICAjIyAgIyMgICAjIyAgIyMgICAgICMjICMjICAgICAgICMjICAgICAjI1xuICAjIyAgICAjIyAgICAgICAjIyAgICAgIyMgIyMgICAgICMjICMjICAgICAjIyAjIyMjIyMgICAjIyAgICAgIyNcbiAgIyMgICAgIyMgICAgICAgIyMgICAgICMjICMjIyMjIyMjIyAjIyAgICAgIyMgIyMgICAgICAgIyMgICAgICMjXG4gICMjICAgICMjICAgICAgICMjICAgICAjIyAjIyAgICAgIyMgIyMgICAgICMjICMjICAgICAgICMjICAgICAjI1xuICAjIyAgICAjIyMjIyMjIyAgIyMjIyMjIyAgIyMgICAgICMjICMjIyMjIyMjICAjIyMjIyMjIyAjIyMjIyMjI1xuXG4gIGRlc2NyaWJlICd3aGVuIHRoZSB2YXJpYWJsZXMgaGF2ZSBub3QgYmVlbiBsb2FkZWQgeWV0JywgLT5cbiAgICBkZXNjcmliZSAnOjpzZXJpYWxpemUnLCAtPlxuICAgICAgaXQgJ3JldHVybnMgYW4gb2JqZWN0IHdpdGhvdXQgcGF0aHMgbm9yIHZhcmlhYmxlcycsIC0+XG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZVxuICAgICAgICBzcHlPbihwcm9qZWN0LCAnZ2V0VGltZXN0YW1wJykuYW5kQ2FsbEZha2UgLT4gZGF0ZVxuICAgICAgICBleHBlY3RlZCA9IHtcbiAgICAgICAgICBkZXNlcmlhbGl6ZXI6ICdDb2xvclByb2plY3QnXG4gICAgICAgICAgdGltZXN0YW1wOiBkYXRlXG4gICAgICAgICAgdmVyc2lvbjogU0VSSUFMSVpFX1ZFUlNJT05cbiAgICAgICAgICBtYXJrZXJzVmVyc2lvbjogU0VSSUFMSVpFX01BUktFUlNfVkVSU0lPTlxuICAgICAgICAgIGdsb2JhbFNvdXJjZU5hbWVzOiBbJyouc3R5bCddXG4gICAgICAgICAgZ2xvYmFsSWdub3JlZE5hbWVzOiBbXVxuICAgICAgICAgIGlnbm9yZWROYW1lczogWyd2ZW5kb3IvKiddXG4gICAgICAgICAgc291cmNlTmFtZXM6IFsnKi5sZXNzJ11cbiAgICAgICAgICBpZ25vcmVkU2NvcGVzOiBbJ1xcXFwuY29tbWVudCddXG4gICAgICAgICAgYnVmZmVyczoge31cbiAgICAgICAgfVxuICAgICAgICBleHBlY3QocHJvamVjdC5zZXJpYWxpemUoKSkudG9FcXVhbChleHBlY3RlZClcblxuICAgIGRlc2NyaWJlICc6OmdldFZhcmlhYmxlc0ZvclBhdGgnLCAtPlxuICAgICAgaXQgJ3JldHVybnMgdW5kZWZpbmVkJywgLT5cbiAgICAgICAgZXhwZWN0KHByb2plY3QuZ2V0VmFyaWFibGVzRm9yUGF0aChcIiN7cm9vdFBhdGh9L3N0eWxlcy92YXJpYWJsZXMuc3R5bFwiKSkudG9FcXVhbChbXSlcblxuICAgIGRlc2NyaWJlICc6OmdldFZhcmlhYmxlQnlOYW1lJywgLT5cbiAgICAgIGl0ICdyZXR1cm5zIHVuZGVmaW5lZCcsIC0+XG4gICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlQnlOYW1lKFwiZm9vXCIpKS50b0JlVW5kZWZpbmVkKClcblxuICAgIGRlc2NyaWJlICc6OmdldFZhcmlhYmxlQnlJZCcsIC0+XG4gICAgICBpdCAncmV0dXJucyB1bmRlZmluZWQnLCAtPlxuICAgICAgICBleHBlY3QocHJvamVjdC5nZXRWYXJpYWJsZUJ5SWQoMCkpLnRvQmVVbmRlZmluZWQoKVxuXG4gICAgZGVzY3JpYmUgJzo6Z2V0Q29udGV4dCcsIC0+XG4gICAgICBpdCAncmV0dXJucyBhbiBlbXB0eSBjb250ZXh0JywgLT5cbiAgICAgICAgZXhwZWN0KHByb2plY3QuZ2V0Q29udGV4dCgpKS50b0JlRGVmaW5lZCgpXG4gICAgICAgIGV4cGVjdChwcm9qZWN0LmdldENvbnRleHQoKS5nZXRWYXJpYWJsZXNDb3VudCgpKS50b0VxdWFsKDApXG5cbiAgICBkZXNjcmliZSAnOjpnZXRQYWxldHRlJywgLT5cbiAgICAgIGl0ICdyZXR1cm5zIGFuIGVtcHR5IHBhbGV0dGUnLCAtPlxuICAgICAgICBleHBlY3QocHJvamVjdC5nZXRQYWxldHRlKCkpLnRvQmVEZWZpbmVkKClcbiAgICAgICAgZXhwZWN0KHByb2plY3QuZ2V0UGFsZXR0ZSgpLmdldENvbG9yc0NvdW50KCkpLnRvRXF1YWwoMClcblxuICAgIGRlc2NyaWJlICc6OnJlbG9hZFZhcmlhYmxlc0ZvclBhdGgnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzcHlPbihwcm9qZWN0LCAnaW5pdGlhbGl6ZScpLmFuZENhbGxUaHJvdWdoKClcblxuICAgICAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgICAgICBwcm9qZWN0LnJlbG9hZFZhcmlhYmxlc0ZvclBhdGgoXCIje3Jvb3RQYXRofS9zdHlsZXMvdmFyaWFibGVzLnN0eWxcIilcblxuICAgICAgaXQgJ3JldHVybnMgYSBwcm9taXNlIGhvb2tlZCBvbiB0aGUgaW5pdGlhbGl6ZSBwcm9taXNlJywgLT5cbiAgICAgICAgZXhwZWN0KHByb2plY3QuaW5pdGlhbGl6ZSkudG9IYXZlQmVlbkNhbGxlZCgpXG5cbiAgICBkZXNjcmliZSAnOjpzZXRJZ25vcmVkTmFtZXMnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBwcm9qZWN0LnNldElnbm9yZWROYW1lcyhbXSlcblxuICAgICAgICB3YWl0c0ZvclByb21pc2UgLT4gcHJvamVjdC5pbml0aWFsaXplKClcblxuICAgICAgaXQgJ2luaXRpYWxpemVzIHRoZSBwcm9qZWN0IHdpdGggdGhlIG5ldyBwYXRocycsIC0+XG4gICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbCgzMilcblxuICAgIGRlc2NyaWJlICc6OnNldFNvdXJjZU5hbWVzJywgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgcHJvamVjdC5zZXRTb3VyY2VOYW1lcyhbXSlcblxuICAgICAgICB3YWl0c0ZvclByb21pc2UgLT4gcHJvamVjdC5pbml0aWFsaXplKClcblxuICAgICAgaXQgJ2luaXRpYWxpemVzIHRoZSBwcm9qZWN0IHdpdGggdGhlIG5ldyBwYXRocycsIC0+XG4gICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbCgxMilcblxuICAjIyAgICAjIyAgICAgIyMgICAgIyMjICAgICMjIyMjIyMjICAgIyMjIyMjXG4gICMjICAgICMjICAgICAjIyAgICMjICMjICAgIyMgICAgICMjICMjICAgICMjXG4gICMjICAgICMjICAgICAjIyAgIyMgICAjIyAgIyMgICAgICMjICMjXG4gICMjICAgICMjICAgICAjIyAjIyAgICAgIyMgIyMjIyMjIyMgICAjIyMjIyNcbiAgIyMgICAgICMjICAgIyMgICMjIyMjIyMjIyAjIyAgICMjICAgICAgICAgIyNcbiAgIyMgICAgICAjIyAjIyAgICMjICAgICAjIyAjIyAgICAjIyAgIyMgICAgIyNcbiAgIyMgICAgICAgIyMjICAgICMjICAgICAjIyAjIyAgICAgIyMgICMjIyMjI1xuICAjI1xuICAjIyAgICAjIyAgICAgICAgIyMjIyMjIyAgICAgIyMjICAgICMjIyMjIyMjICAjIyMjIyMjIyAjIyMjIyMjI1xuICAjIyAgICAjIyAgICAgICAjIyAgICAgIyMgICAjIyAjIyAgICMjICAgICAjIyAjIyAgICAgICAjIyAgICAgIyNcbiAgIyMgICAgIyMgICAgICAgIyMgICAgICMjICAjIyAgICMjICAjIyAgICAgIyMgIyMgICAgICAgIyMgICAgICMjXG4gICMjICAgICMjICAgICAgICMjICAgICAjIyAjIyAgICAgIyMgIyMgICAgICMjICMjIyMjIyAgICMjICAgICAjI1xuICAjIyAgICAjIyAgICAgICAjIyAgICAgIyMgIyMjIyMjIyMjICMjICAgICAjIyAjIyAgICAgICAjIyAgICAgIyNcbiAgIyMgICAgIyMgICAgICAgIyMgICAgICMjICMjICAgICAjIyAjIyAgICAgIyMgIyMgICAgICAgIyMgICAgICMjXG4gICMjICAgICMjIyMjIyMjICAjIyMjIyMjICAjIyAgICAgIyMgIyMjIyMjIyMgICMjIyMjIyMjICMjIyMjIyMjXG5cbiAgZGVzY3JpYmUgJ3doZW4gdGhlIHByb2plY3QgaGFzIG5vIHZhcmlhYmxlcyBzb3VyY2UgZmlsZXMnLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIGF0b20uY29uZmlnLnNldCAncGlnbWVudHMuc291cmNlTmFtZXMnLCBbJyouc2FzcyddXG5cbiAgICAgIFtmaXh0dXJlc1BhdGhdID0gYXRvbS5wcm9qZWN0LmdldFBhdGhzKClcbiAgICAgIHJvb3RQYXRoID0gXCIje2ZpeHR1cmVzUGF0aH0tbm8tc291cmNlc1wiXG4gICAgICBhdG9tLnByb2plY3Quc2V0UGF0aHMoW3Jvb3RQYXRoXSlcblxuICAgICAgcHJvamVjdCA9IG5ldyBDb2xvclByb2plY3Qoe30pXG5cbiAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPiBwcm9qZWN0LmluaXRpYWxpemUoKVxuXG4gICAgaXQgJ2luaXRpYWxpemVzIHRoZSBwYXRocyB3aXRoIGFuIGVtcHR5IGFycmF5JywgLT5cbiAgICAgIGV4cGVjdChwcm9qZWN0LmdldFBhdGhzKCkpLnRvRXF1YWwoW10pXG5cbiAgICBpdCAnaW5pdGlhbGl6ZXMgdGhlIHZhcmlhYmxlcyB3aXRoIGFuIGVtcHR5IGFycmF5JywgLT5cbiAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlcygpKS50b0VxdWFsKFtdKVxuXG4gIGRlc2NyaWJlICd3aGVuIHRoZSBwcm9qZWN0IGhhcyBjdXN0b20gc291cmNlIG5hbWVzIGRlZmluZWQnLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIGF0b20uY29uZmlnLnNldCAncGlnbWVudHMuc291cmNlTmFtZXMnLCBbJyouc2FzcyddXG5cbiAgICAgIFtmaXh0dXJlc1BhdGhdID0gYXRvbS5wcm9qZWN0LmdldFBhdGhzKClcblxuICAgICAgcHJvamVjdCA9IG5ldyBDb2xvclByb2plY3Qoe3NvdXJjZU5hbWVzOiBbJyouc3R5bCddfSlcblxuICAgICAgd2FpdHNGb3JQcm9taXNlIC0+IHByb2plY3QuaW5pdGlhbGl6ZSgpXG5cbiAgICBpdCAnaW5pdGlhbGl6ZXMgdGhlIHBhdGhzIHdpdGggYW4gZW1wdHkgYXJyYXknLCAtPlxuICAgICAgZXhwZWN0KHByb2plY3QuZ2V0UGF0aHMoKS5sZW5ndGgpLnRvRXF1YWwoMilcblxuICAgIGl0ICdpbml0aWFsaXplcyB0aGUgdmFyaWFibGVzIHdpdGggYW4gZW1wdHkgYXJyYXknLCAtPlxuICAgICAgZXhwZWN0KHByb2plY3QuZ2V0VmFyaWFibGVzKCkubGVuZ3RoKS50b0VxdWFsKFRPVEFMX1ZBUklBQkxFU19JTl9QUk9KRUNUKVxuICAgICAgZXhwZWN0KHByb2plY3QuZ2V0Q29sb3JWYXJpYWJsZXMoKS5sZW5ndGgpLnRvRXF1YWwoVE9UQUxfQ09MT1JTX1ZBUklBQkxFU19JTl9QUk9KRUNUKVxuXG4gIGRlc2NyaWJlICd3aGVuIHRoZSBwcm9qZWN0IGhhcyBsb29waW5nIHZhcmlhYmxlIGRlZmluaXRpb24nLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIGF0b20uY29uZmlnLnNldCAncGlnbWVudHMuc291cmNlTmFtZXMnLCBbJyouc2FzcyddXG5cbiAgICAgIFtmaXh0dXJlc1BhdGhdID0gYXRvbS5wcm9qZWN0LmdldFBhdGhzKClcbiAgICAgIHJvb3RQYXRoID0gXCIje2ZpeHR1cmVzUGF0aH0td2l0aC1yZWN1cnNpb25cIlxuICAgICAgYXRvbS5wcm9qZWN0LnNldFBhdGhzKFtyb290UGF0aF0pXG5cbiAgICAgIHByb2plY3QgPSBuZXcgQ29sb3JQcm9qZWN0KHt9KVxuXG4gICAgICB3YWl0c0ZvclByb21pc2UgLT4gcHJvamVjdC5pbml0aWFsaXplKClcblxuICAgIGl0ICdpZ25vcmVzIHRoZSBsb29waW5nIGRlZmluaXRpb24nLCAtPlxuICAgICAgZXhwZWN0KHByb2plY3QuZ2V0VmFyaWFibGVzKCkubGVuZ3RoKS50b0VxdWFsKDUpXG4gICAgICBleHBlY3QocHJvamVjdC5nZXRDb2xvclZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbCg1KVxuXG4gIGRlc2NyaWJlICd3aGVuIHRoZSB2YXJpYWJsZXMgaGF2ZSBiZWVuIGxvYWRlZCcsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgd2FpdHNGb3JQcm9taXNlIC0+IHByb2plY3QuaW5pdGlhbGl6ZSgpXG5cbiAgICBkZXNjcmliZSAnOjpzZXJpYWxpemUnLCAtPlxuICAgICAgaXQgJ3JldHVybnMgYW4gb2JqZWN0IHdpdGggcHJvamVjdCBwcm9wZXJ0aWVzJywgLT5cbiAgICAgICAgZGF0ZSA9IG5ldyBEYXRlXG4gICAgICAgIHNweU9uKHByb2plY3QsICdnZXRUaW1lc3RhbXAnKS5hbmRDYWxsRmFrZSAtPiBkYXRlXG4gICAgICAgIGV4cGVjdChwcm9qZWN0LnNlcmlhbGl6ZSgpKS50b0VxdWFsKHtcbiAgICAgICAgICBkZXNlcmlhbGl6ZXI6ICdDb2xvclByb2plY3QnXG4gICAgICAgICAgaWdub3JlZE5hbWVzOiBbJ3ZlbmRvci8qJ11cbiAgICAgICAgICBzb3VyY2VOYW1lczogWycqLmxlc3MnXVxuICAgICAgICAgIGlnbm9yZWRTY29wZXM6IFsnXFxcXC5jb21tZW50J11cbiAgICAgICAgICB0aW1lc3RhbXA6IGRhdGVcbiAgICAgICAgICB2ZXJzaW9uOiBTRVJJQUxJWkVfVkVSU0lPTlxuICAgICAgICAgIG1hcmtlcnNWZXJzaW9uOiBTRVJJQUxJWkVfTUFSS0VSU19WRVJTSU9OXG4gICAgICAgICAgcGF0aHM6IFtcbiAgICAgICAgICAgIFwiI3tyb290UGF0aH0vc3R5bGVzL2J1dHRvbnMuc3R5bFwiXG4gICAgICAgICAgICBcIiN7cm9vdFBhdGh9L3N0eWxlcy92YXJpYWJsZXMuc3R5bFwiXG4gICAgICAgICAgXVxuICAgICAgICAgIGdsb2JhbFNvdXJjZU5hbWVzOiBbJyouc3R5bCddXG4gICAgICAgICAgZ2xvYmFsSWdub3JlZE5hbWVzOiBbXVxuICAgICAgICAgIGJ1ZmZlcnM6IHt9XG4gICAgICAgICAgdmFyaWFibGVzOiBwcm9qZWN0LnZhcmlhYmxlcy5zZXJpYWxpemUoKVxuICAgICAgICB9KVxuXG4gICAgZGVzY3JpYmUgJzo6Z2V0VmFyaWFibGVzRm9yUGF0aCcsIC0+XG4gICAgICBpdCAncmV0dXJucyB0aGUgdmFyaWFibGVzIGRlZmluZWQgaW4gdGhlIGZpbGUnLCAtPlxuICAgICAgICBleHBlY3QocHJvamVjdC5nZXRWYXJpYWJsZXNGb3JQYXRoKFwiI3tyb290UGF0aH0vc3R5bGVzL3ZhcmlhYmxlcy5zdHlsXCIpLmxlbmd0aCkudG9FcXVhbChUT1RBTF9WQVJJQUJMRVNfSU5fUFJPSkVDVClcblxuICAgICAgZGVzY3JpYmUgJ2ZvciBhIGZpbGUgdGhhdCB3YXMgaWdub3JlZCBpbiB0aGUgc2Nhbm5pbmcgcHJvY2VzcycsIC0+XG4gICAgICAgIGl0ICdyZXR1cm5zIHVuZGVmaW5lZCcsIC0+XG4gICAgICAgICAgZXhwZWN0KHByb2plY3QuZ2V0VmFyaWFibGVzRm9yUGF0aChcIiN7cm9vdFBhdGh9L3ZlbmRvci9jc3MvdmFyaWFibGVzLmxlc3NcIikpLnRvRXF1YWwoW10pXG5cbiAgICBkZXNjcmliZSAnOjpkZWxldGVWYXJpYWJsZXNGb3JQYXRoJywgLT5cbiAgICAgIGl0ICdyZW1vdmVzIGFsbCB0aGUgdmFyaWFibGVzIGNvbWluZyBmcm9tIHRoZSBzcGVjaWZpZWQgZmlsZScsIC0+XG4gICAgICAgIHByb2plY3QuZGVsZXRlVmFyaWFibGVzRm9yUGF0aChcIiN7cm9vdFBhdGh9L3N0eWxlcy92YXJpYWJsZXMuc3R5bFwiKVxuXG4gICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlc0ZvclBhdGgoXCIje3Jvb3RQYXRofS9zdHlsZXMvdmFyaWFibGVzLnN0eWxcIikpLnRvRXF1YWwoW10pXG5cbiAgICBkZXNjcmliZSAnOjpnZXRDb250ZXh0JywgLT5cbiAgICAgIGl0ICdyZXR1cm5zIGEgY29udGV4dCB3aXRoIHRoZSBwcm9qZWN0IHZhcmlhYmxlcycsIC0+XG4gICAgICAgIGV4cGVjdChwcm9qZWN0LmdldENvbnRleHQoKSkudG9CZURlZmluZWQoKVxuICAgICAgICBleHBlY3QocHJvamVjdC5nZXRDb250ZXh0KCkuZ2V0VmFyaWFibGVzQ291bnQoKSkudG9FcXVhbChUT1RBTF9WQVJJQUJMRVNfSU5fUFJPSkVDVClcblxuICAgIGRlc2NyaWJlICc6OmdldFBhbGV0dGUnLCAtPlxuICAgICAgaXQgJ3JldHVybnMgYSBwYWxldHRlIHdpdGggdGhlIGNvbG9ycyBmcm9tIHRoZSBwcm9qZWN0JywgLT5cbiAgICAgICAgZXhwZWN0KHByb2plY3QuZ2V0UGFsZXR0ZSgpKS50b0JlRGVmaW5lZCgpXG4gICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFBhbGV0dGUoKS5nZXRDb2xvcnNDb3VudCgpKS50b0VxdWFsKDEwKVxuXG4gICAgZGVzY3JpYmUgJzo6c2hvd1ZhcmlhYmxlSW5GaWxlJywgLT5cbiAgICAgIGl0ICdvcGVucyB0aGUgZmlsZSB3aGVyZSBpcyBsb2NhdGVkIHRoZSB2YXJpYWJsZScsIC0+XG4gICAgICAgIHNweSA9IGphc21pbmUuY3JlYXRlU3B5KCdkaWQtYWRkLXRleHQtZWRpdG9yJylcbiAgICAgICAgYXRvbS53b3Jrc3BhY2Uub25EaWRBZGRUZXh0RWRpdG9yKHNweSlcblxuICAgICAgICBwcm9qZWN0LnNob3dWYXJpYWJsZUluRmlsZShwcm9qZWN0LmdldFZhcmlhYmxlcygpWzBdKVxuXG4gICAgICAgIHdhaXRzRm9yIC0+IHNweS5jYWxsQ291bnQgPiAwXG5cbiAgICAgICAgcnVucyAtPlxuICAgICAgICAgIGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuXG4gICAgICAgICAgZXhwZWN0KGVkaXRvci5nZXRTZWxlY3RlZEJ1ZmZlclJhbmdlKCkpLnRvRXF1YWwoW1sxLDJdLFsxLDE0XV0pXG5cbiAgICBkZXNjcmliZSAnOjpyZWxvYWRWYXJpYWJsZXNGb3JQYXRoJywgLT5cbiAgICAgIGRlc2NyaWJlICdmb3IgYSBmaWxlIHRoYXQgaXMgcGFydCBvZiB0aGUgbG9hZGVkIHBhdGhzJywgLT5cbiAgICAgICAgZGVzY3JpYmUgJ3doZXJlIHRoZSByZWxvYWQgZmluZHMgbmV3IHZhcmlhYmxlcycsIC0+XG4gICAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgICAgcHJvamVjdC5kZWxldGVWYXJpYWJsZXNGb3JQYXRoKFwiI3tyb290UGF0aH0vc3R5bGVzL3ZhcmlhYmxlcy5zdHlsXCIpXG5cbiAgICAgICAgICAgIGV2ZW50U3B5ID0gamFzbWluZS5jcmVhdGVTcHkoJ2RpZC11cGRhdGUtdmFyaWFibGVzJylcbiAgICAgICAgICAgIHByb2plY3Qub25EaWRVcGRhdGVWYXJpYWJsZXMoZXZlbnRTcHkpXG4gICAgICAgICAgICB3YWl0c0ZvclByb21pc2UgLT4gcHJvamVjdC5yZWxvYWRWYXJpYWJsZXNGb3JQYXRoKFwiI3tyb290UGF0aH0vc3R5bGVzL3ZhcmlhYmxlcy5zdHlsXCIpXG5cbiAgICAgICAgICBpdCAnc2NhbnMgYWdhaW4gdGhlIGZpbGUgdG8gZmluZCB2YXJpYWJsZXMnLCAtPlxuICAgICAgICAgICAgZXhwZWN0KHByb2plY3QuZ2V0VmFyaWFibGVzKCkubGVuZ3RoKS50b0VxdWFsKFRPVEFMX1ZBUklBQkxFU19JTl9QUk9KRUNUKVxuXG4gICAgICAgICAgaXQgJ2Rpc3BhdGNoZXMgYSBkaWQtdXBkYXRlLXZhcmlhYmxlcyBldmVudCcsIC0+XG4gICAgICAgICAgICBleHBlY3QoZXZlbnRTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKVxuXG4gICAgICAgIGRlc2NyaWJlICd3aGVyZSB0aGUgcmVsb2FkIGZpbmRzIG5vdGhpbmcgbmV3JywgLT5cbiAgICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgICBldmVudFNweSA9IGphc21pbmUuY3JlYXRlU3B5KCdkaWQtdXBkYXRlLXZhcmlhYmxlcycpXG4gICAgICAgICAgICBwcm9qZWN0Lm9uRGlkVXBkYXRlVmFyaWFibGVzKGV2ZW50U3B5KVxuICAgICAgICAgICAgd2FpdHNGb3JQcm9taXNlIC0+IHByb2plY3QucmVsb2FkVmFyaWFibGVzRm9yUGF0aChcIiN7cm9vdFBhdGh9L3N0eWxlcy92YXJpYWJsZXMuc3R5bFwiKVxuXG4gICAgICAgICAgaXQgJ2xlYXZlcyB0aGUgZmlsZSB2YXJpYWJsZXMgaW50YWN0JywgLT5cbiAgICAgICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbChUT1RBTF9WQVJJQUJMRVNfSU5fUFJPSkVDVClcblxuICAgICAgICAgIGl0ICdkb2VzIG5vdCBkaXNwYXRjaCBhIGRpZC11cGRhdGUtdmFyaWFibGVzIGV2ZW50JywgLT5cbiAgICAgICAgICAgIGV4cGVjdChldmVudFNweSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKVxuXG4gICAgZGVzY3JpYmUgJzo6cmVsb2FkVmFyaWFibGVzRm9yUGF0aHMnLCAtPlxuICAgICAgZGVzY3JpYmUgJ2ZvciBhIGZpbGUgdGhhdCBpcyBwYXJ0IG9mIHRoZSBsb2FkZWQgcGF0aHMnLCAtPlxuICAgICAgICBkZXNjcmliZSAnd2hlcmUgdGhlIHJlbG9hZCBmaW5kcyBuZXcgdmFyaWFibGVzJywgLT5cbiAgICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgICBwcm9qZWN0LmRlbGV0ZVZhcmlhYmxlc0ZvclBhdGhzKFtcbiAgICAgICAgICAgICAgXCIje3Jvb3RQYXRofS9zdHlsZXMvdmFyaWFibGVzLnN0eWxcIiwgXCIje3Jvb3RQYXRofS9zdHlsZXMvYnV0dG9ucy5zdHlsXCJcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBldmVudFNweSA9IGphc21pbmUuY3JlYXRlU3B5KCdkaWQtdXBkYXRlLXZhcmlhYmxlcycpXG4gICAgICAgICAgICBwcm9qZWN0Lm9uRGlkVXBkYXRlVmFyaWFibGVzKGV2ZW50U3B5KVxuICAgICAgICAgICAgd2FpdHNGb3JQcm9taXNlIC0+IHByb2plY3QucmVsb2FkVmFyaWFibGVzRm9yUGF0aHMoW1xuICAgICAgICAgICAgICBcIiN7cm9vdFBhdGh9L3N0eWxlcy92YXJpYWJsZXMuc3R5bFwiXG4gICAgICAgICAgICAgIFwiI3tyb290UGF0aH0vc3R5bGVzL2J1dHRvbnMuc3R5bFwiXG4gICAgICAgICAgICBdKVxuXG4gICAgICAgICAgaXQgJ3NjYW5zIGFnYWluIHRoZSBmaWxlIHRvIGZpbmQgdmFyaWFibGVzJywgLT5cbiAgICAgICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbChUT1RBTF9WQVJJQUJMRVNfSU5fUFJPSkVDVClcblxuICAgICAgICAgIGl0ICdkaXNwYXRjaGVzIGEgZGlkLXVwZGF0ZS12YXJpYWJsZXMgZXZlbnQnLCAtPlxuICAgICAgICAgICAgZXhwZWN0KGV2ZW50U3B5KS50b0hhdmVCZWVuQ2FsbGVkKClcblxuICAgICAgICBkZXNjcmliZSAnd2hlcmUgdGhlIHJlbG9hZCBmaW5kcyBub3RoaW5nIG5ldycsIC0+XG4gICAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgICAgZXZlbnRTcHkgPSBqYXNtaW5lLmNyZWF0ZVNweSgnZGlkLXVwZGF0ZS12YXJpYWJsZXMnKVxuICAgICAgICAgICAgcHJvamVjdC5vbkRpZFVwZGF0ZVZhcmlhYmxlcyhldmVudFNweSlcbiAgICAgICAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPiBwcm9qZWN0LnJlbG9hZFZhcmlhYmxlc0ZvclBhdGhzKFtcbiAgICAgICAgICAgICAgXCIje3Jvb3RQYXRofS9zdHlsZXMvdmFyaWFibGVzLnN0eWxcIlxuICAgICAgICAgICAgICBcIiN7cm9vdFBhdGh9L3N0eWxlcy9idXR0b25zLnN0eWxcIlxuICAgICAgICAgICAgXSlcblxuICAgICAgICAgIGl0ICdsZWF2ZXMgdGhlIGZpbGUgdmFyaWFibGVzIGludGFjdCcsIC0+XG4gICAgICAgICAgICBleHBlY3QocHJvamVjdC5nZXRWYXJpYWJsZXMoKS5sZW5ndGgpLnRvRXF1YWwoVE9UQUxfVkFSSUFCTEVTX0lOX1BST0pFQ1QpXG5cbiAgICAgICAgICBpdCAnZG9lcyBub3QgZGlzcGF0Y2ggYSBkaWQtdXBkYXRlLXZhcmlhYmxlcyBldmVudCcsIC0+XG4gICAgICAgICAgICBleHBlY3QoZXZlbnRTcHkpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKClcblxuICAgICAgZGVzY3JpYmUgJ2ZvciBhIGZpbGUgdGhhdCBpcyBub3QgcGFydCBvZiB0aGUgbG9hZGVkIHBhdGhzJywgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIHNweU9uKHByb2plY3QsICdsb2FkVmFyaWFibGVzRm9yUGF0aCcpLmFuZENhbGxUaHJvdWdoKClcblxuICAgICAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPlxuICAgICAgICAgICAgcHJvamVjdC5yZWxvYWRWYXJpYWJsZXNGb3JQYXRoKFwiI3tyb290UGF0aH0vdmVuZG9yL2Nzcy92YXJpYWJsZXMubGVzc1wiKVxuXG4gICAgICAgIGl0ICdkb2VzIG5vdGhpbmcnLCAtPlxuICAgICAgICAgIGV4cGVjdChwcm9qZWN0LmxvYWRWYXJpYWJsZXNGb3JQYXRoKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpXG5cbiAgICBkZXNjcmliZSAnd2hlbiBhIGJ1ZmZlciB3aXRoIHZhcmlhYmxlcyBpcyBvcGVuJywgLT5cbiAgICAgIFtlZGl0b3IsIGNvbG9yQnVmZmVyXSA9IFtdXG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIGV2ZW50U3B5ID0gamFzbWluZS5jcmVhdGVTcHkoJ2RpZC11cGRhdGUtdmFyaWFibGVzJylcbiAgICAgICAgcHJvamVjdC5vbkRpZFVwZGF0ZVZhcmlhYmxlcyhldmVudFNweSlcblxuICAgICAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgICAgICBhdG9tLndvcmtzcGFjZS5vcGVuKCdzdHlsZXMvdmFyaWFibGVzLnN0eWwnKS50aGVuIChvKSAtPiBlZGl0b3IgPSBvXG5cbiAgICAgICAgcnVucyAtPlxuICAgICAgICAgIGNvbG9yQnVmZmVyID0gcHJvamVjdC5jb2xvckJ1ZmZlckZvckVkaXRvcihlZGl0b3IpXG4gICAgICAgICAgc3B5T24oY29sb3JCdWZmZXIsICdzY2FuQnVmZmVyRm9yVmFyaWFibGVzJykuYW5kQ2FsbFRocm91Z2goKVxuXG4gICAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPiBwcm9qZWN0LmluaXRpYWxpemUoKVxuICAgICAgICB3YWl0c0ZvclByb21pc2UgLT4gY29sb3JCdWZmZXIudmFyaWFibGVzQXZhaWxhYmxlKClcblxuICAgICAgaXQgJ3VwZGF0ZXMgdGhlIHByb2plY3QgdmFyaWFibGUgd2l0aCB0aGUgYnVmZmVyIHJhbmdlcycsIC0+XG4gICAgICAgIGZvciB2YXJpYWJsZSBpbiBwcm9qZWN0LmdldFZhcmlhYmxlcygpXG4gICAgICAgICAgZXhwZWN0KHZhcmlhYmxlLmJ1ZmZlclJhbmdlKS50b0JlRGVmaW5lZCgpXG5cbiAgICAgIGRlc2NyaWJlICd3aGVuIGEgY29sb3IgaXMgbW9kaWZpZWQgdGhhdCBkb2VzIG5vdCBhZmZlY3Qgb3RoZXIgdmFyaWFibGVzIHJhbmdlcycsIC0+XG4gICAgICAgIFt2YXJpYWJsZXNUZXh0UmFuZ2VzXSA9IFtdXG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICB2YXJpYWJsZXNUZXh0UmFuZ2VzID0ge31cbiAgICAgICAgICBwcm9qZWN0LmdldFZhcmlhYmxlc0ZvclBhdGgoZWRpdG9yLmdldFBhdGgoKSkuZm9yRWFjaCAodmFyaWFibGUpIC0+XG4gICAgICAgICAgICB2YXJpYWJsZXNUZXh0UmFuZ2VzW3ZhcmlhYmxlLm5hbWVdID0gdmFyaWFibGUucmFuZ2VcblxuICAgICAgICAgIGVkaXRvci5zZXRTZWxlY3RlZEJ1ZmZlclJhbmdlKFtbMSw3XSxbMSwxNF1dKVxuICAgICAgICAgIGVkaXRvci5pbnNlcnRUZXh0KCcjMzM2JylcbiAgICAgICAgICBlZGl0b3IuZ2V0QnVmZmVyKCkuZW1pdHRlci5lbWl0KCdkaWQtc3RvcC1jaGFuZ2luZycpXG5cbiAgICAgICAgICB3YWl0c0ZvciAtPiBldmVudFNweS5jYWxsQ291bnQgPiAwXG5cbiAgICAgICAgaXQgJ3JlbG9hZHMgdGhlIHZhcmlhYmxlcyB3aXRoIHRoZSBidWZmZXIgaW5zdGVhZCBvZiB0aGUgZmlsZScsIC0+XG4gICAgICAgICAgZXhwZWN0KGNvbG9yQnVmZmVyLnNjYW5CdWZmZXJGb3JWYXJpYWJsZXMpLnRvSGF2ZUJlZW5DYWxsZWQoKVxuICAgICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbChUT1RBTF9WQVJJQUJMRVNfSU5fUFJPSkVDVClcblxuICAgICAgICBpdCAndXNlcyB0aGUgYnVmZmVyIHJhbmdlcyB0byBkZXRlY3Qgd2hpY2ggdmFyaWFibGVzIHdlcmUgcmVhbGx5IGNoYW5nZWQnLCAtPlxuICAgICAgICAgIGV4cGVjdChldmVudFNweS5hcmdzRm9yQ2FsbFswXVswXS5kZXN0cm95ZWQpLnRvQmVVbmRlZmluZWQoKVxuICAgICAgICAgIGV4cGVjdChldmVudFNweS5hcmdzRm9yQ2FsbFswXVswXS5jcmVhdGVkKS50b0JlVW5kZWZpbmVkKClcbiAgICAgICAgICBleHBlY3QoZXZlbnRTcHkuYXJnc0ZvckNhbGxbMF1bMF0udXBkYXRlZC5sZW5ndGgpLnRvRXF1YWwoMSlcblxuICAgICAgICBpdCAndXBkYXRlcyB0aGUgdGV4dCByYW5nZSBvZiB0aGUgb3RoZXIgdmFyaWFibGVzJywgLT5cbiAgICAgICAgICBwcm9qZWN0LmdldFZhcmlhYmxlc0ZvclBhdGgoXCIje3Jvb3RQYXRofS9zdHlsZXMvdmFyaWFibGVzLnN0eWxcIikuZm9yRWFjaCAodmFyaWFibGUpIC0+XG4gICAgICAgICAgICBpZiB2YXJpYWJsZS5uYW1lIGlzbnQgJ2NvbG9ycy5yZWQnXG4gICAgICAgICAgICAgIGV4cGVjdCh2YXJpYWJsZS5yYW5nZVswXSkudG9FcXVhbCh2YXJpYWJsZXNUZXh0UmFuZ2VzW3ZhcmlhYmxlLm5hbWVdWzBdIC0gMylcbiAgICAgICAgICAgICAgZXhwZWN0KHZhcmlhYmxlLnJhbmdlWzFdKS50b0VxdWFsKHZhcmlhYmxlc1RleHRSYW5nZXNbdmFyaWFibGUubmFtZV1bMV0gLSAzKVxuXG4gICAgICAgIGl0ICdkaXNwYXRjaGVzIGEgZGlkLXVwZGF0ZS12YXJpYWJsZXMgZXZlbnQnLCAtPlxuICAgICAgICAgIGV4cGVjdChldmVudFNweSkudG9IYXZlQmVlbkNhbGxlZCgpXG5cbiAgICAgIGRlc2NyaWJlICd3aGVuIGEgdGV4dCBpcyBpbnNlcnRlZCB0aGF0IGFmZmVjdHMgb3RoZXIgdmFyaWFibGVzIHJhbmdlcycsIC0+XG4gICAgICAgIFt2YXJpYWJsZXNUZXh0UmFuZ2VzLCB2YXJpYWJsZXNCdWZmZXJSYW5nZXNdID0gW11cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIHJ1bnMgLT5cbiAgICAgICAgICAgIHZhcmlhYmxlc1RleHRSYW5nZXMgPSB7fVxuICAgICAgICAgICAgdmFyaWFibGVzQnVmZmVyUmFuZ2VzID0ge31cbiAgICAgICAgICAgIHByb2plY3QuZ2V0VmFyaWFibGVzRm9yUGF0aChlZGl0b3IuZ2V0UGF0aCgpKS5mb3JFYWNoICh2YXJpYWJsZSkgLT5cbiAgICAgICAgICAgICAgdmFyaWFibGVzVGV4dFJhbmdlc1t2YXJpYWJsZS5uYW1lXSA9IHZhcmlhYmxlLnJhbmdlXG4gICAgICAgICAgICAgIHZhcmlhYmxlc0J1ZmZlclJhbmdlc1t2YXJpYWJsZS5uYW1lXSA9IHZhcmlhYmxlLmJ1ZmZlclJhbmdlXG5cbiAgICAgICAgICAgIHNweU9uKHByb2plY3QudmFyaWFibGVzLCAnYWRkTWFueScpLmFuZENhbGxUaHJvdWdoKClcblxuICAgICAgICAgICAgZWRpdG9yLnNldFNlbGVjdGVkQnVmZmVyUmFuZ2UoW1swLDBdLFswLDBdXSlcbiAgICAgICAgICAgIGVkaXRvci5pbnNlcnRUZXh0KCdcXG5cXG4nKVxuICAgICAgICAgICAgZWRpdG9yLmdldEJ1ZmZlcigpLmVtaXR0ZXIuZW1pdCgnZGlkLXN0b3AtY2hhbmdpbmcnKVxuXG4gICAgICAgICAgd2FpdHNGb3IgLT4gcHJvamVjdC52YXJpYWJsZXMuYWRkTWFueS5jYWxsQ291bnQgPiAwXG5cbiAgICAgICAgaXQgJ2RvZXMgbm90IHRyaWdnZXIgYSBjaGFuZ2UgZXZlbnQnLCAtPlxuICAgICAgICAgIGV4cGVjdChldmVudFNweS5jYWxsQ291bnQpLnRvRXF1YWwoMClcblxuICAgICAgICBpdCAndXBkYXRlcyB0aGUgcmFuZ2Ugb2YgdGhlIHVwZGF0ZWQgdmFyaWFibGVzJywgLT5cbiAgICAgICAgICBwcm9qZWN0LmdldFZhcmlhYmxlc0ZvclBhdGgoXCIje3Jvb3RQYXRofS9zdHlsZXMvdmFyaWFibGVzLnN0eWxcIikuZm9yRWFjaCAodmFyaWFibGUpIC0+XG4gICAgICAgICAgICBpZiB2YXJpYWJsZS5uYW1lIGlzbnQgJ2NvbG9ycy5yZWQnXG4gICAgICAgICAgICAgIGV4cGVjdCh2YXJpYWJsZS5yYW5nZVswXSkudG9FcXVhbCh2YXJpYWJsZXNUZXh0UmFuZ2VzW3ZhcmlhYmxlLm5hbWVdWzBdICsgMilcbiAgICAgICAgICAgICAgZXhwZWN0KHZhcmlhYmxlLnJhbmdlWzFdKS50b0VxdWFsKHZhcmlhYmxlc1RleHRSYW5nZXNbdmFyaWFibGUubmFtZV1bMV0gKyAyKVxuICAgICAgICAgICAgICBleHBlY3QodmFyaWFibGUuYnVmZmVyUmFuZ2UuaXNFcXVhbCh2YXJpYWJsZXNCdWZmZXJSYW5nZXNbdmFyaWFibGUubmFtZV0pKS50b0JlRmFsc3koKVxuXG4gICAgICBkZXNjcmliZSAnd2hlbiBhIGNvbG9yIGlzIHJlbW92ZWQnLCAtPlxuICAgICAgICBbdmFyaWFibGVzVGV4dFJhbmdlc10gPSBbXVxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgcnVucyAtPlxuICAgICAgICAgICAgdmFyaWFibGVzVGV4dFJhbmdlcyA9IHt9XG4gICAgICAgICAgICBwcm9qZWN0LmdldFZhcmlhYmxlc0ZvclBhdGgoZWRpdG9yLmdldFBhdGgoKSkuZm9yRWFjaCAodmFyaWFibGUpIC0+XG4gICAgICAgICAgICAgIHZhcmlhYmxlc1RleHRSYW5nZXNbdmFyaWFibGUubmFtZV0gPSB2YXJpYWJsZS5yYW5nZVxuXG4gICAgICAgICAgICBlZGl0b3Iuc2V0U2VsZWN0ZWRCdWZmZXJSYW5nZShbWzEsMF0sWzIsMF1dKVxuICAgICAgICAgICAgZWRpdG9yLmluc2VydFRleHQoJycpXG4gICAgICAgICAgICBlZGl0b3IuZ2V0QnVmZmVyKCkuZW1pdHRlci5lbWl0KCdkaWQtc3RvcC1jaGFuZ2luZycpXG5cbiAgICAgICAgICB3YWl0c0ZvciAtPiBldmVudFNweS5jYWxsQ291bnQgPiAwXG5cbiAgICAgICAgaXQgJ3JlbG9hZHMgdGhlIHZhcmlhYmxlcyB3aXRoIHRoZSBidWZmZXIgaW5zdGVhZCBvZiB0aGUgZmlsZScsIC0+XG4gICAgICAgICAgZXhwZWN0KGNvbG9yQnVmZmVyLnNjYW5CdWZmZXJGb3JWYXJpYWJsZXMpLnRvSGF2ZUJlZW5DYWxsZWQoKVxuICAgICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbChUT1RBTF9WQVJJQUJMRVNfSU5fUFJPSkVDVCAtIDEpXG5cbiAgICAgICAgaXQgJ3VzZXMgdGhlIGJ1ZmZlciByYW5nZXMgdG8gZGV0ZWN0IHdoaWNoIHZhcmlhYmxlcyB3ZXJlIHJlYWxseSBjaGFuZ2VkJywgLT5cbiAgICAgICAgICBleHBlY3QoZXZlbnRTcHkuYXJnc0ZvckNhbGxbMF1bMF0uZGVzdHJveWVkLmxlbmd0aCkudG9FcXVhbCgxKVxuICAgICAgICAgIGV4cGVjdChldmVudFNweS5hcmdzRm9yQ2FsbFswXVswXS5jcmVhdGVkKS50b0JlVW5kZWZpbmVkKClcbiAgICAgICAgICBleHBlY3QoZXZlbnRTcHkuYXJnc0ZvckNhbGxbMF1bMF0udXBkYXRlZCkudG9CZVVuZGVmaW5lZCgpXG5cbiAgICAgICAgaXQgJ2NhbiBubyBsb25nZXIgYmUgZm91bmQgaW4gdGhlIHByb2plY3QgdmFyaWFibGVzJywgLT5cbiAgICAgICAgICBleHBlY3QocHJvamVjdC5nZXRWYXJpYWJsZXMoKS5zb21lICh2KSAtPiB2Lm5hbWUgaXMgJ2NvbG9ycy5yZWQnKS50b0JlRmFsc3koKVxuICAgICAgICAgIGV4cGVjdChwcm9qZWN0LmdldENvbG9yVmFyaWFibGVzKCkuc29tZSAodikgLT4gdi5uYW1lIGlzICdjb2xvcnMucmVkJykudG9CZUZhbHN5KClcblxuICAgICAgICBpdCAnZGlzcGF0Y2hlcyBhIGRpZC11cGRhdGUtdmFyaWFibGVzIGV2ZW50JywgLT5cbiAgICAgICAgICBleHBlY3QoZXZlbnRTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKVxuXG4gICAgICBkZXNjcmliZSAnd2hlbiBhbGwgdGhlIGNvbG9ycyBhcmUgcmVtb3ZlZCcsIC0+XG4gICAgICAgIFt2YXJpYWJsZXNUZXh0UmFuZ2VzXSA9IFtdXG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICBydW5zIC0+XG4gICAgICAgICAgICB2YXJpYWJsZXNUZXh0UmFuZ2VzID0ge31cbiAgICAgICAgICAgIHByb2plY3QuZ2V0VmFyaWFibGVzRm9yUGF0aChlZGl0b3IuZ2V0UGF0aCgpKS5mb3JFYWNoICh2YXJpYWJsZSkgLT5cbiAgICAgICAgICAgICAgdmFyaWFibGVzVGV4dFJhbmdlc1t2YXJpYWJsZS5uYW1lXSA9IHZhcmlhYmxlLnJhbmdlXG5cbiAgICAgICAgICAgIGVkaXRvci5zZXRTZWxlY3RlZEJ1ZmZlclJhbmdlKFtbMCwwXSxbSW5maW5pdHksSW5maW5pdHldXSlcbiAgICAgICAgICAgIGVkaXRvci5pbnNlcnRUZXh0KCcnKVxuICAgICAgICAgICAgZWRpdG9yLmdldEJ1ZmZlcigpLmVtaXR0ZXIuZW1pdCgnZGlkLXN0b3AtY2hhbmdpbmcnKVxuXG4gICAgICAgICAgd2FpdHNGb3IgLT4gZXZlbnRTcHkuY2FsbENvdW50ID4gMFxuXG4gICAgICAgIGl0ICdyZW1vdmVzIGV2ZXJ5IHZhcmlhYmxlIGZyb20gdGhlIGZpbGUnLCAtPlxuICAgICAgICAgIGV4cGVjdChjb2xvckJ1ZmZlci5zY2FuQnVmZmVyRm9yVmFyaWFibGVzKS50b0hhdmVCZWVuQ2FsbGVkKClcbiAgICAgICAgICBleHBlY3QocHJvamVjdC5nZXRWYXJpYWJsZXMoKS5sZW5ndGgpLnRvRXF1YWwoMClcblxuICAgICAgICAgIGV4cGVjdChldmVudFNweS5hcmdzRm9yQ2FsbFswXVswXS5kZXN0cm95ZWQubGVuZ3RoKS50b0VxdWFsKFRPVEFMX1ZBUklBQkxFU19JTl9QUk9KRUNUKVxuICAgICAgICAgIGV4cGVjdChldmVudFNweS5hcmdzRm9yQ2FsbFswXVswXS5jcmVhdGVkKS50b0JlVW5kZWZpbmVkKClcbiAgICAgICAgICBleHBlY3QoZXZlbnRTcHkuYXJnc0ZvckNhbGxbMF1bMF0udXBkYXRlZCkudG9CZVVuZGVmaW5lZCgpXG5cbiAgICAgICAgaXQgJ2NhbiBubyBsb25nZXIgYmUgZm91bmQgaW4gdGhlIHByb2plY3QgdmFyaWFibGVzJywgLT5cbiAgICAgICAgICBleHBlY3QocHJvamVjdC5nZXRWYXJpYWJsZXMoKS5zb21lICh2KSAtPiB2Lm5hbWUgaXMgJ2NvbG9ycy5yZWQnKS50b0JlRmFsc3koKVxuICAgICAgICAgIGV4cGVjdChwcm9qZWN0LmdldENvbG9yVmFyaWFibGVzKCkuc29tZSAodikgLT4gdi5uYW1lIGlzICdjb2xvcnMucmVkJykudG9CZUZhbHN5KClcblxuICAgICAgICBpdCAnZGlzcGF0Y2hlcyBhIGRpZC11cGRhdGUtdmFyaWFibGVzIGV2ZW50JywgLT5cbiAgICAgICAgICBleHBlY3QoZXZlbnRTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKVxuXG4gICAgZGVzY3JpYmUgJzo6c2V0SWdub3JlZE5hbWVzJywgLT5cbiAgICAgIGRlc2NyaWJlICd3aXRoIGFuIGVtcHR5IGFycmF5JywgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbCgxMilcblxuICAgICAgICAgIHNweSA9IGphc21pbmUuY3JlYXRlU3B5ICdkaWQtdXBkYXRlLXZhcmlhYmxlcydcbiAgICAgICAgICBwcm9qZWN0Lm9uRGlkVXBkYXRlVmFyaWFibGVzKHNweSlcbiAgICAgICAgICBwcm9qZWN0LnNldElnbm9yZWROYW1lcyhbXSlcblxuICAgICAgICAgIHdhaXRzRm9yIC0+IHNweS5jYWxsQ291bnQgPiAwXG5cbiAgICAgICAgaXQgJ3JlbG9hZHMgdGhlIHZhcmlhYmxlcyBmcm9tIHRoZSBuZXcgcGF0aHMnLCAtPlxuICAgICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbCgzMilcblxuICAgICAgZGVzY3JpYmUgJ3dpdGggYSBtb3JlIHJlc3RyaWN0aXZlIGFycmF5JywgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbCgxMilcblxuICAgICAgICAgIHNweSA9IGphc21pbmUuY3JlYXRlU3B5ICdkaWQtdXBkYXRlLXZhcmlhYmxlcydcbiAgICAgICAgICBwcm9qZWN0Lm9uRGlkVXBkYXRlVmFyaWFibGVzKHNweSlcbiAgICAgICAgICB3YWl0c0ZvclByb21pc2UgLT4gcHJvamVjdC5zZXRJZ25vcmVkTmFtZXMoWyd2ZW5kb3IvKicsICcqKi8qLnN0eWwnXSlcblxuICAgICAgICBpdCAnY2xlYXJzIGFsbCB0aGUgcGF0aHMgYXMgdGhlcmUgaXMgbm8gbGVnaWJsZSBwYXRocycsIC0+XG4gICAgICAgICAgZXhwZWN0KHByb2plY3QuZ2V0UGF0aHMoKS5sZW5ndGgpLnRvRXF1YWwoMClcblxuICAgIGRlc2NyaWJlICd3aGVuIHRoZSBwcm9qZWN0IGhhcyBtdWx0aXBsZSByb290IGRpcmVjdG9yeScsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIGF0b20uY29uZmlnLnNldCAncGlnbWVudHMuc291cmNlTmFtZXMnLCBbJyoqLyouc2FzcycsICcqKi8qLnN0eWwnXVxuXG4gICAgICAgIFtmaXh0dXJlc1BhdGhdID0gYXRvbS5wcm9qZWN0LmdldFBhdGhzKClcbiAgICAgICAgYXRvbS5wcm9qZWN0LnNldFBhdGhzKFtcbiAgICAgICAgICBcIiN7Zml4dHVyZXNQYXRofVwiXG4gICAgICAgICAgXCIje2ZpeHR1cmVzUGF0aH0td2l0aC1yZWN1cnNpb25cIlxuICAgICAgICBdKVxuXG4gICAgICAgIHByb2plY3QgPSBuZXcgQ29sb3JQcm9qZWN0KHt9KVxuXG4gICAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPiBwcm9qZWN0LmluaXRpYWxpemUoKVxuXG4gICAgICBpdCAnZmluZHMgdGhlIHZhcmlhYmxlcyBmcm9tIHRoZSB0d28gZGlyZWN0b3JpZXMnLCAtPlxuICAgICAgICBleHBlY3QocHJvamVjdC5nZXRWYXJpYWJsZXMoKS5sZW5ndGgpLnRvRXF1YWwoMTcpXG5cbiAgICBkZXNjcmliZSAnd2hlbiB0aGUgcHJvamVjdCBoYXMgVkNTIGlnbm9yZWQgZmlsZXMnLCAtPlxuICAgICAgW3Byb2plY3RQYXRoXSA9IFtdXG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIGF0b20uY29uZmlnLnNldCAncGlnbWVudHMuc291cmNlTmFtZXMnLCBbJyouc2FzcyddXG5cbiAgICAgICAgZml4dHVyZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsICdmaXh0dXJlcycsICdwcm9qZWN0LXdpdGgtZ2l0aWdub3JlJylcblxuICAgICAgICBwcm9qZWN0UGF0aCA9IHRlbXAubWtkaXJTeW5jKCdwaWdtZW50cy1wcm9qZWN0JylcbiAgICAgICAgZG90R2l0Rml4dHVyZSA9IHBhdGguam9pbihmaXh0dXJlLCAnZ2l0LmdpdCcpXG4gICAgICAgIGRvdEdpdCA9IHBhdGguam9pbihwcm9qZWN0UGF0aCwgJy5naXQnKVxuICAgICAgICBmcy5jb3B5U3luYyhkb3RHaXRGaXh0dXJlLCBkb3RHaXQpXG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKHByb2plY3RQYXRoLCAnLmdpdGlnbm9yZScpLCBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGZpeHR1cmUsICdnaXQuZ2l0aWdub3JlJykpKVxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihwcm9qZWN0UGF0aCwgJ2Jhc2Uuc2FzcycpLCBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGZpeHR1cmUsICdiYXNlLnNhc3MnKSkpXG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKHByb2plY3RQYXRoLCAnaWdub3JlZC5zYXNzJyksIGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oZml4dHVyZSwgJ2lnbm9yZWQuc2FzcycpKSlcbiAgICAgICAgZnMubWtkaXJTeW5jKHBhdGguam9pbihwcm9qZWN0UGF0aCwgJ2Jvd2VyX2NvbXBvbmVudHMnKSlcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ocHJvamVjdFBhdGgsICdib3dlcl9jb21wb25lbnRzJywgJ3NvbWUtaWdub3JlZC1maWxlLnNhc3MnKSwgZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihmaXh0dXJlLCAnYm93ZXJfY29tcG9uZW50cycsICdzb21lLWlnbm9yZWQtZmlsZS5zYXNzJykpKVxuXG4gICAgICAgICMgRklYTUUgcmVwby5nZXRXb3JraW5nRGlyZWN0b3J5IHJldHVybnMgdGhlIHByb2plY3QgcGF0aCBwcmVmaXhlZCB3aXRoXG4gICAgICAgICMgL3ByaXZhdGVcbiAgICAgICAgYXRvbS5wcm9qZWN0LnNldFBhdGhzKFtwcm9qZWN0UGF0aF0pXG5cbiAgICAgIGRlc2NyaWJlICd3aGVuIHRoZSBpZ25vcmVWY3NJZ25vcmVkUGF0aHMgc2V0dGluZyBpcyBlbmFibGVkJywgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIGF0b20uY29uZmlnLnNldCAncGlnbWVudHMuaWdub3JlVmNzSWdub3JlZFBhdGhzJywgdHJ1ZVxuICAgICAgICAgIHByb2plY3QgPSBuZXcgQ29sb3JQcm9qZWN0KHt9KVxuXG4gICAgICAgICAgd2FpdHNGb3JQcm9taXNlIC0+IHByb2plY3QuaW5pdGlhbGl6ZSgpXG5cbiAgICAgICAgaXQgJ2ZpbmRzIHRoZSB2YXJpYWJsZXMgZnJvbSB0aGUgdGhyZWUgZmlsZXMnLCAtPlxuICAgICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbCgzKVxuICAgICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFBhdGhzKCkubGVuZ3RoKS50b0VxdWFsKDEpXG5cbiAgICAgICAgZGVzY3JpYmUgJ2FuZCB0aGVuIGRpc2FibGVkJywgLT5cbiAgICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgICBzcHkgPSBqYXNtaW5lLmNyZWF0ZVNweSgnZGlkLXVwZGF0ZS12YXJpYWJsZXMnKVxuICAgICAgICAgICAgcHJvamVjdC5vbkRpZFVwZGF0ZVZhcmlhYmxlcyhzcHkpXG4gICAgICAgICAgICBhdG9tLmNvbmZpZy5zZXQgJ3BpZ21lbnRzLmlnbm9yZVZjc0lnbm9yZWRQYXRocycsIGZhbHNlXG5cbiAgICAgICAgICAgIHdhaXRzRm9yIC0+IHNweS5jYWxsQ291bnQgPiAwXG5cbiAgICAgICAgICBpdCAncmVsb2FkcyB0aGUgcGF0aHMnLCAtPlxuICAgICAgICAgICAgZXhwZWN0KHByb2plY3QuZ2V0UGF0aHMoKS5sZW5ndGgpLnRvRXF1YWwoMylcblxuICAgICAgICAgIGl0ICdyZWxvYWRzIHRoZSB2YXJpYWJsZXMnLCAtPlxuICAgICAgICAgICAgZXhwZWN0KHByb2plY3QuZ2V0VmFyaWFibGVzKCkubGVuZ3RoKS50b0VxdWFsKDEwKVxuXG4gICAgICBkZXNjcmliZSAnd2hlbiB0aGUgaWdub3JlVmNzSWdub3JlZFBhdGhzIHNldHRpbmcgaXMgZGlzYWJsZWQnLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgYXRvbS5jb25maWcuc2V0ICdwaWdtZW50cy5pZ25vcmVWY3NJZ25vcmVkUGF0aHMnLCBmYWxzZVxuICAgICAgICAgIHByb2plY3QgPSBuZXcgQ29sb3JQcm9qZWN0KHt9KVxuXG4gICAgICAgICAgd2FpdHNGb3JQcm9taXNlIC0+IHByb2plY3QuaW5pdGlhbGl6ZSgpXG5cbiAgICAgICAgaXQgJ2ZpbmRzIHRoZSB2YXJpYWJsZXMgZnJvbSB0aGUgdGhyZWUgZmlsZXMnLCAtPlxuICAgICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbCgxMClcbiAgICAgICAgICBleHBlY3QocHJvamVjdC5nZXRQYXRocygpLmxlbmd0aCkudG9FcXVhbCgzKVxuXG4gICAgICAgIGRlc2NyaWJlICdhbmQgdGhlbiBlbmFibGVkJywgLT5cbiAgICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgICBzcHkgPSBqYXNtaW5lLmNyZWF0ZVNweSgnZGlkLXVwZGF0ZS12YXJpYWJsZXMnKVxuICAgICAgICAgICAgcHJvamVjdC5vbkRpZFVwZGF0ZVZhcmlhYmxlcyhzcHkpXG4gICAgICAgICAgICBhdG9tLmNvbmZpZy5zZXQgJ3BpZ21lbnRzLmlnbm9yZVZjc0lnbm9yZWRQYXRocycsIHRydWVcblxuICAgICAgICAgICAgd2FpdHNGb3IgLT4gc3B5LmNhbGxDb3VudCA+IDBcblxuICAgICAgICAgIGl0ICdyZWxvYWRzIHRoZSBwYXRocycsIC0+XG4gICAgICAgICAgICBleHBlY3QocHJvamVjdC5nZXRQYXRocygpLmxlbmd0aCkudG9FcXVhbCgxKVxuXG4gICAgICAgICAgaXQgJ3JlbG9hZHMgdGhlIHZhcmlhYmxlcycsIC0+XG4gICAgICAgICAgICBleHBlY3QocHJvamVjdC5nZXRWYXJpYWJsZXMoKS5sZW5ndGgpLnRvRXF1YWwoMylcblxuICAgICMjICAgICAjIyMjIyMgICMjIyMjIyMjICMjIyMjIyMjICMjIyMjIyMjICMjIyMgIyMgICAgIyMgICMjIyMjIyAgICAjIyMjIyNcbiAgICAjIyAgICAjIyAgICAjIyAjIyAgICAgICAgICAjIyAgICAgICAjIyAgICAgIyMgICMjIyAgICMjICMjICAgICMjICAjIyAgICAjI1xuICAgICMjICAgICMjICAgICAgICMjICAgICAgICAgICMjICAgICAgICMjICAgICAjIyAgIyMjIyAgIyMgIyMgICAgICAgICMjXG4gICAgIyMgICAgICMjIyMjIyAgIyMjIyMjICAgICAgIyMgICAgICAgIyMgICAgICMjICAjIyAjIyAjIyAjIyAgICMjIyMgICMjIyMjI1xuICAgICMjICAgICAgICAgICMjICMjICAgICAgICAgICMjICAgICAgICMjICAgICAjIyAgIyMgICMjIyMgIyMgICAgIyMgICAgICAgICMjXG4gICAgIyMgICAgIyMgICAgIyMgIyMgICAgICAgICAgIyMgICAgICAgIyMgICAgICMjICAjIyAgICMjIyAjIyAgICAjIyAgIyMgICAgIyNcbiAgICAjIyAgICAgIyMjIyMjICAjIyMjIyMjIyAgICAjIyAgICAgICAjIyAgICAjIyMjICMjICAgICMjICAjIyMjIyMgICAgIyMjIyMjXG5cbiAgICBkZXNjcmliZSAnd2hlbiB0aGUgc291cmNlTmFtZXMgc2V0dGluZyBpcyBjaGFuZ2VkJywgLT5cbiAgICAgIFt1cGRhdGVTcHldID0gW11cblxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBvcmlnaW5hbFBhdGhzID0gcHJvamVjdC5nZXRQYXRocygpXG4gICAgICAgIGF0b20uY29uZmlnLnNldCAncGlnbWVudHMuc291cmNlTmFtZXMnLCBbXVxuXG4gICAgICAgIHdhaXRzRm9yIC0+IHByb2plY3QuZ2V0UGF0aHMoKS5qb2luKCcsJykgaXNudCBvcmlnaW5hbFBhdGhzLmpvaW4oJywnKVxuXG4gICAgICBpdCAndXBkYXRlcyB0aGUgdmFyaWFibGVzIHVzaW5nIHRoZSBuZXcgcGF0dGVybicsIC0+XG4gICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbCgwKVxuXG4gICAgICBkZXNjcmliZSAnc28gdGhhdCBuZXcgcGF0aHMgYXJlIGZvdW5kJywgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIHVwZGF0ZVNweSA9IGphc21pbmUuY3JlYXRlU3B5KCdkaWQtdXBkYXRlLXZhcmlhYmxlcycpXG5cbiAgICAgICAgICBvcmlnaW5hbFBhdGhzID0gcHJvamVjdC5nZXRQYXRocygpXG4gICAgICAgICAgcHJvamVjdC5vbkRpZFVwZGF0ZVZhcmlhYmxlcyh1cGRhdGVTcHkpXG5cbiAgICAgICAgICBhdG9tLmNvbmZpZy5zZXQgJ3BpZ21lbnRzLnNvdXJjZU5hbWVzJywgWycqKi8qLnN0eWwnXVxuXG4gICAgICAgICAgd2FpdHNGb3IgLT4gcHJvamVjdC5nZXRQYXRocygpLmpvaW4oJywnKSBpc250IG9yaWdpbmFsUGF0aHMuam9pbignLCcpXG4gICAgICAgICAgd2FpdHNGb3IgLT4gdXBkYXRlU3B5LmNhbGxDb3VudCA+IDBcblxuICAgICAgICBpdCAnbG9hZHMgdGhlIHZhcmlhYmxlcyBmcm9tIHRoZXNlIG5ldyBwYXRocycsIC0+XG4gICAgICAgICAgZXhwZWN0KHByb2plY3QuZ2V0VmFyaWFibGVzKCkubGVuZ3RoKS50b0VxdWFsKFRPVEFMX1ZBUklBQkxFU19JTl9QUk9KRUNUKVxuXG4gICAgZGVzY3JpYmUgJ3doZW4gdGhlIGlnbm9yZWROYW1lcyBzZXR0aW5nIGlzIGNoYW5nZWQnLCAtPlxuICAgICAgW3VwZGF0ZVNweV0gPSBbXVxuXG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIG9yaWdpbmFsUGF0aHMgPSBwcm9qZWN0LmdldFBhdGhzKClcbiAgICAgICAgYXRvbS5jb25maWcuc2V0ICdwaWdtZW50cy5pZ25vcmVkTmFtZXMnLCBbJyoqLyouc3R5bCddXG5cbiAgICAgICAgd2FpdHNGb3IgLT4gcHJvamVjdC5nZXRQYXRocygpLmpvaW4oJywnKSBpc250IG9yaWdpbmFsUGF0aHMuam9pbignLCcpXG5cbiAgICAgIGl0ICd1cGRhdGVzIHRoZSBmb3VuZCB1c2luZyB0aGUgbmV3IHBhdHRlcm4nLCAtPlxuICAgICAgICBleHBlY3QocHJvamVjdC5nZXRWYXJpYWJsZXMoKS5sZW5ndGgpLnRvRXF1YWwoMClcblxuICAgICAgZGVzY3JpYmUgJ3NvIHRoYXQgbmV3IHBhdGhzIGFyZSBmb3VuZCcsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICB1cGRhdGVTcHkgPSBqYXNtaW5lLmNyZWF0ZVNweSgnZGlkLXVwZGF0ZS12YXJpYWJsZXMnKVxuXG4gICAgICAgICAgb3JpZ2luYWxQYXRocyA9IHByb2plY3QuZ2V0UGF0aHMoKVxuICAgICAgICAgIHByb2plY3Qub25EaWRVcGRhdGVWYXJpYWJsZXModXBkYXRlU3B5KVxuXG4gICAgICAgICAgYXRvbS5jb25maWcuc2V0ICdwaWdtZW50cy5pZ25vcmVkTmFtZXMnLCBbXVxuXG4gICAgICAgICAgd2FpdHNGb3IgLT4gcHJvamVjdC5nZXRQYXRocygpLmpvaW4oJywnKSBpc250IG9yaWdpbmFsUGF0aHMuam9pbignLCcpXG4gICAgICAgICAgd2FpdHNGb3IgLT4gdXBkYXRlU3B5LmNhbGxDb3VudCA+IDBcblxuICAgICAgICBpdCAnbG9hZHMgdGhlIHZhcmlhYmxlcyBmcm9tIHRoZXNlIG5ldyBwYXRocycsIC0+XG4gICAgICAgICAgZXhwZWN0KHByb2plY3QuZ2V0VmFyaWFibGVzKCkubGVuZ3RoKS50b0VxdWFsKFRPVEFMX1ZBUklBQkxFU19JTl9QUk9KRUNUKVxuXG4gICAgZGVzY3JpYmUgJ3doZW4gdGhlIGV4dGVuZGVkU2VhcmNoTmFtZXMgc2V0dGluZyBpcyBjaGFuZ2VkJywgLT5cbiAgICAgIFt1cGRhdGVTcHldID0gW11cblxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBwcm9qZWN0LnNldFNlYXJjaE5hbWVzKFsnKi5mb28nXSlcblxuICAgICAgaXQgJ3VwZGF0ZXMgdGhlIHNlYXJjaCBuYW1lcycsIC0+XG4gICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFNlYXJjaE5hbWVzKCkubGVuZ3RoKS50b0VxdWFsKDMpXG5cbiAgICAgIGl0ICdzZXJpYWxpemVzIHRoZSBzZXR0aW5nJywgLT5cbiAgICAgICAgZXhwZWN0KHByb2plY3Quc2VyaWFsaXplKCkuc2VhcmNoTmFtZXMpLnRvRXF1YWwoWycqLmZvbyddKVxuXG4gICAgZGVzY3JpYmUgJ3doZW4gdGhlIGlnbm9yZSBnbG9iYWwgY29uZmlnIHNldHRpbmdzIGFyZSBlbmFibGVkJywgLT5cbiAgICAgIGRlc2NyaWJlICdmb3IgdGhlIHNvdXJjZU5hbWVzIGZpZWxkJywgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIHByb2plY3Quc291cmNlTmFtZXMgPSBbJyouZm9vJ11cbiAgICAgICAgICB3YWl0c0ZvclByb21pc2UgLT4gcHJvamVjdC5zZXRJZ25vcmVHbG9iYWxTb3VyY2VOYW1lcyh0cnVlKVxuXG4gICAgICAgIGl0ICdpZ25vcmVzIHRoZSBjb250ZW50IG9mIHRoZSBnbG9iYWwgY29uZmlnJywgLT5cbiAgICAgICAgICBleHBlY3QocHJvamVjdC5nZXRTb3VyY2VOYW1lcygpKS50b0VxdWFsKFsnLnBpZ21lbnRzJywnKi5mb28nXSlcblxuICAgICAgICBpdCAnc2VyaWFsaXplcyB0aGUgcHJvamVjdCBzZXR0aW5nJywgLT5cbiAgICAgICAgICBleHBlY3QocHJvamVjdC5zZXJpYWxpemUoKS5pZ25vcmVHbG9iYWxTb3VyY2VOYW1lcykudG9CZVRydXRoeSgpXG5cbiAgICAgIGRlc2NyaWJlICdmb3IgdGhlIGlnbm9yZWROYW1lcyBmaWVsZCcsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICBhdG9tLmNvbmZpZy5zZXQgJ3BpZ21lbnRzLmlnbm9yZWROYW1lcycsIFsnKi5mb28nXVxuICAgICAgICAgIHByb2plY3QuaWdub3JlZE5hbWVzID0gWycqLmJhciddXG5cbiAgICAgICAgICBwcm9qZWN0LnNldElnbm9yZUdsb2JhbElnbm9yZWROYW1lcyh0cnVlKVxuXG4gICAgICAgIGl0ICdpZ25vcmVzIHRoZSBjb250ZW50IG9mIHRoZSBnbG9iYWwgY29uZmlnJywgLT5cbiAgICAgICAgICBleHBlY3QocHJvamVjdC5nZXRJZ25vcmVkTmFtZXMoKSkudG9FcXVhbChbJyouYmFyJ10pXG5cbiAgICAgICAgaXQgJ3NlcmlhbGl6ZXMgdGhlIHByb2plY3Qgc2V0dGluZycsIC0+XG4gICAgICAgICAgZXhwZWN0KHByb2plY3Quc2VyaWFsaXplKCkuaWdub3JlR2xvYmFsSWdub3JlZE5hbWVzKS50b0JlVHJ1dGh5KClcblxuICAgICAgZGVzY3JpYmUgJ2ZvciB0aGUgaWdub3JlZFNjb3BlcyBmaWVsZCcsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICBhdG9tLmNvbmZpZy5zZXQgJ3BpZ21lbnRzLmlnbm9yZWRTY29wZXMnLCBbJ1xcXFwuY29tbWVudCddXG4gICAgICAgICAgcHJvamVjdC5pZ25vcmVkU2NvcGVzID0gWydcXFxcLnNvdXJjZSddXG5cbiAgICAgICAgICBwcm9qZWN0LnNldElnbm9yZUdsb2JhbElnbm9yZWRTY29wZXModHJ1ZSlcblxuICAgICAgICBpdCAnaWdub3JlcyB0aGUgY29udGVudCBvZiB0aGUgZ2xvYmFsIGNvbmZpZycsIC0+XG4gICAgICAgICAgZXhwZWN0KHByb2plY3QuZ2V0SWdub3JlZFNjb3BlcygpKS50b0VxdWFsKFsnXFxcXC5zb3VyY2UnXSlcblxuICAgICAgICBpdCAnc2VyaWFsaXplcyB0aGUgcHJvamVjdCBzZXR0aW5nJywgLT5cbiAgICAgICAgICBleHBlY3QocHJvamVjdC5zZXJpYWxpemUoKS5pZ25vcmVHbG9iYWxJZ25vcmVkU2NvcGVzKS50b0JlVHJ1dGh5KClcblxuICAgICAgZGVzY3JpYmUgJ2ZvciB0aGUgc2VhcmNoTmFtZXMgZmllbGQnLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgYXRvbS5jb25maWcuc2V0ICdwaWdtZW50cy5leHRlbmRlZFNlYXJjaE5hbWVzJywgWycqLmNzcyddXG4gICAgICAgICAgcHJvamVjdC5zZWFyY2hOYW1lcyA9IFsnKi5mb28nXVxuXG4gICAgICAgICAgcHJvamVjdC5zZXRJZ25vcmVHbG9iYWxTZWFyY2hOYW1lcyh0cnVlKVxuXG4gICAgICAgIGl0ICdpZ25vcmVzIHRoZSBjb250ZW50IG9mIHRoZSBnbG9iYWwgY29uZmlnJywgLT5cbiAgICAgICAgICBleHBlY3QocHJvamVjdC5nZXRTZWFyY2hOYW1lcygpKS50b0VxdWFsKFsnKi5sZXNzJywnKi5mb28nXSlcblxuICAgICAgICBpdCAnc2VyaWFsaXplcyB0aGUgcHJvamVjdCBzZXR0aW5nJywgLT5cbiAgICAgICAgICBleHBlY3QocHJvamVjdC5zZXJpYWxpemUoKS5pZ25vcmVHbG9iYWxTZWFyY2hOYW1lcykudG9CZVRydXRoeSgpXG5cblxuICAgIGRlc2NyaWJlICc6OmxvYWRUaGVtZXNWYXJpYWJsZXMnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZSgnYXRvbS1saWdodC11aScpXG4gICAgICAgIGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCdhdG9tLWxpZ2h0LXN5bnRheCcpXG5cbiAgICAgICAgYXRvbS5jb25maWcuc2V0KCdjb3JlLnRoZW1lcycsIFsnYXRvbS1saWdodC11aScsICdhdG9tLWxpZ2h0LXN5bnRheCddKVxuXG4gICAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPlxuICAgICAgICAgIGF0b20udGhlbWVzLmFjdGl2YXRlVGhlbWVzKClcblxuICAgICAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgICAgICBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZSgncGlnbWVudHMnKVxuXG4gICAgICBhZnRlckVhY2ggLT5cbiAgICAgICAgYXRvbS50aGVtZXMuZGVhY3RpdmF0ZVRoZW1lcygpXG4gICAgICAgIGF0b20udGhlbWVzLnVud2F0Y2hVc2VyU3R5bGVzaGVldCgpXG5cbiAgICAgIGl0ICdyZXR1cm5zIGFuIGFycmF5IG9mIDYyIHZhcmlhYmxlcycsIC0+XG4gICAgICAgIHRoZW1lVmFyaWFibGVzID0gcHJvamVjdC5sb2FkVGhlbWVzVmFyaWFibGVzKClcbiAgICAgICAgZXhwZWN0KHRoZW1lVmFyaWFibGVzLmxlbmd0aCkudG9FcXVhbCg2MilcblxuICAgIGRlc2NyaWJlICd3aGVuIHRoZSBpbmNsdWRlVGhlbWVzIHNldHRpbmcgaXMgZW5hYmxlZCcsIC0+XG4gICAgICBbcGF0aHMsIHNweV0gPSBbXVxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBwYXRocyA9IHByb2plY3QuZ2V0UGF0aHMoKVxuICAgICAgICBleHBlY3QocHJvamVjdC5nZXRDb2xvclZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbCgxMClcblxuICAgICAgICBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZSgnYXRvbS1saWdodC11aScpXG4gICAgICAgIGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCdhdG9tLWxpZ2h0LXN5bnRheCcpXG4gICAgICAgIGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCdhdG9tLWRhcmstdWknKVxuICAgICAgICBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZSgnYXRvbS1kYXJrLXN5bnRheCcpXG5cbiAgICAgICAgYXRvbS5jb25maWcuc2V0KCdjb3JlLnRoZW1lcycsIFsnYXRvbS1saWdodC11aScsICdhdG9tLWxpZ2h0LXN5bnRheCddKVxuXG4gICAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPlxuICAgICAgICAgIGF0b20udGhlbWVzLmFjdGl2YXRlVGhlbWVzKClcblxuICAgICAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgICAgICBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZSgncGlnbWVudHMnKVxuXG4gICAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPlxuICAgICAgICAgIHByb2plY3QuaW5pdGlhbGl6ZSgpXG5cbiAgICAgICAgcnVucyAtPlxuICAgICAgICAgIHNweSA9IGphc21pbmUuY3JlYXRlU3B5KCdkaWQtY2hhbmdlLWFjdGl2ZS10aGVtZXMnKVxuICAgICAgICAgIGF0b20udGhlbWVzLm9uRGlkQ2hhbmdlQWN0aXZlVGhlbWVzKHNweSlcbiAgICAgICAgICBwcm9qZWN0LnNldEluY2x1ZGVUaGVtZXModHJ1ZSlcblxuICAgICAgYWZ0ZXJFYWNoIC0+XG4gICAgICAgIGF0b20udGhlbWVzLmRlYWN0aXZhdGVUaGVtZXMoKVxuICAgICAgICBhdG9tLnRoZW1lcy51bndhdGNoVXNlclN0eWxlc2hlZXQoKVxuXG4gICAgICBpdCAnaW5jbHVkZXMgdGhlIHZhcmlhYmxlcyBzZXQgZm9yIHVpIGFuZCBzeW50YXggdGhlbWVzIGluIHRoZSBwYWxldHRlJywgLT5cbiAgICAgICAgZXhwZWN0KHByb2plY3QuZ2V0Q29sb3JWYXJpYWJsZXMoKS5sZW5ndGgpLnRvRXF1YWwoNzIpXG5cbiAgICAgIGl0ICdzdGlsbCBpbmNsdWRlcyB0aGUgcGF0aHMgZnJvbSB0aGUgcHJvamVjdCcsIC0+XG4gICAgICAgIGZvciBwIGluIHBhdGhzXG4gICAgICAgICAgZXhwZWN0KHByb2plY3QuZ2V0UGF0aHMoKS5pbmRleE9mIHApLm5vdC50b0VxdWFsKC0xKVxuXG4gICAgICBpdCAnc2VyaWFsaXplcyB0aGUgc2V0dGluZyB3aXRoIHRoZSBwcm9qZWN0JywgLT5cbiAgICAgICAgc2VyaWFsaXplZCA9IHByb2plY3Quc2VyaWFsaXplKClcblxuICAgICAgICBleHBlY3Qoc2VyaWFsaXplZC5pbmNsdWRlVGhlbWVzKS50b0VxdWFsKHRydWUpXG5cbiAgICAgIGRlc2NyaWJlICdhbmQgdGhlbiBkaXNhYmxlZCcsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICBwcm9qZWN0LnNldEluY2x1ZGVUaGVtZXMoZmFsc2UpXG5cbiAgICAgICAgaXQgJ3JlbW92ZXMgYWxsIHRoZSBwYXRocyB0byB0aGUgdGhlbWVzIHN0eWxlc2hlZXRzJywgLT5cbiAgICAgICAgICBleHBlY3QocHJvamVjdC5nZXRDb2xvclZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbCgxMClcblxuICAgICAgICBkZXNjcmliZSAnd2hlbiB0aGUgY29yZS50aGVtZXMgc2V0dGluZyBpcyBtb2RpZmllZCcsIC0+XG4gICAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgICAgc3B5T24ocHJvamVjdCwgJ2xvYWRUaGVtZXNWYXJpYWJsZXMnKS5hbmRDYWxsVGhyb3VnaCgpXG4gICAgICAgICAgICBhdG9tLmNvbmZpZy5zZXQoJ2NvcmUudGhlbWVzJywgWydhdG9tLWRhcmstdWknLCAnYXRvbS1kYXJrLXN5bnRheCddKVxuXG4gICAgICAgICAgICB3YWl0c0ZvciAtPiBzcHkuY2FsbENvdW50ID4gMFxuXG4gICAgICAgICAgaXQgJ2RvZXMgbm90IHRyaWdnZXIgYSBwYXRocyB1cGRhdGUnLCAtPlxuICAgICAgICAgICAgZXhwZWN0KHByb2plY3QubG9hZFRoZW1lc1ZhcmlhYmxlcykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKVxuXG4gICAgICBkZXNjcmliZSAnd2hlbiB0aGUgY29yZS50aGVtZXMgc2V0dGluZyBpcyBtb2RpZmllZCcsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICBzcHlPbihwcm9qZWN0LCAnbG9hZFRoZW1lc1ZhcmlhYmxlcycpLmFuZENhbGxUaHJvdWdoKClcbiAgICAgICAgICBhdG9tLmNvbmZpZy5zZXQoJ2NvcmUudGhlbWVzJywgWydhdG9tLWRhcmstdWknLCAnYXRvbS1kYXJrLXN5bnRheCddKVxuXG4gICAgICAgICAgd2FpdHNGb3IgLT4gc3B5LmNhbGxDb3VudCA+IDBcblxuICAgICAgICBpdCAndHJpZ2dlcnMgYSBwYXRocyB1cGRhdGUnLCAtPlxuICAgICAgICAgIGV4cGVjdChwcm9qZWN0LmxvYWRUaGVtZXNWYXJpYWJsZXMpLnRvSGF2ZUJlZW5DYWxsZWQoKVxuXG4gICMjICAgICMjIyMjIyMjICAjIyMjIyMjIyAgIyMjIyMjICAjIyMjIyMjIyAgIyMjIyMjIyAgIyMjIyMjIyMgICMjIyMjIyMjXG4gICMjICAgICMjICAgICAjIyAjIyAgICAgICAjIyAgICAjIyAgICAjIyAgICAjIyAgICAgIyMgIyMgICAgICMjICMjXG4gICMjICAgICMjICAgICAjIyAjIyAgICAgICAjIyAgICAgICAgICAjIyAgICAjIyAgICAgIyMgIyMgICAgICMjICMjXG4gICMjICAgICMjIyMjIyMjICAjIyMjIyMgICAgIyMjIyMjICAgICAjIyAgICAjIyAgICAgIyMgIyMjIyMjIyMgICMjIyMjI1xuICAjIyAgICAjIyAgICMjICAgIyMgICAgICAgICAgICAgIyMgICAgIyMgICAgIyMgICAgICMjICMjICAgIyMgICAjI1xuICAjIyAgICAjIyAgICAjIyAgIyMgICAgICAgIyMgICAgIyMgICAgIyMgICAgIyMgICAgICMjICMjICAgICMjICAjI1xuICAjIyAgICAjIyAgICAgIyMgIyMjIyMjIyMgICMjIyMjIyAgICAgIyMgICAgICMjIyMjIyMgICMjICAgICAjIyAjIyMjIyMjI1xuXG4gIGRlc2NyaWJlICd3aGVuIHJlc3RvcmVkJywgLT5cbiAgICBjcmVhdGVQcm9qZWN0ID0gKHBhcmFtcz17fSkgLT5cbiAgICAgIHtzdGF0ZUZpeHR1cmV9ID0gcGFyYW1zXG4gICAgICBkZWxldGUgcGFyYW1zLnN0YXRlRml4dHVyZVxuXG4gICAgICBwYXJhbXMucm9vdCA/PSByb290UGF0aFxuICAgICAgcGFyYW1zLnRpbWVzdGFtcCA/PSAgbmV3IERhdGUoKS50b0pTT04oKVxuICAgICAgcGFyYW1zLnZhcmlhYmxlTWFya2VycyA/PSBbMS4uMTJdXG4gICAgICBwYXJhbXMuY29sb3JNYXJrZXJzID89IFsxMy4uMjRdXG4gICAgICBwYXJhbXMudmVyc2lvbiA/PSBTRVJJQUxJWkVfVkVSU0lPTlxuICAgICAgcGFyYW1zLm1hcmtlcnNWZXJzaW9uID89IFNFUklBTElaRV9NQVJLRVJTX1ZFUlNJT05cblxuICAgICAgQ29sb3JQcm9qZWN0LmRlc2VyaWFsaXplKGpzb25GaXh0dXJlKHN0YXRlRml4dHVyZSwgcGFyYW1zKSlcblxuICAgIGRlc2NyaWJlICd3aXRoIGEgdGltZXN0YW1wIG1vcmUgcmVjZW50IHRoYW4gdGhlIGZpbGVzIGxhc3QgbW9kaWZpY2F0aW9uIGRhdGUnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBwcm9qZWN0ID0gY3JlYXRlUHJvamVjdFxuICAgICAgICAgIHN0YXRlRml4dHVyZTogXCJlbXB0eS1wcm9qZWN0Lmpzb25cIlxuXG4gICAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPiBwcm9qZWN0LmluaXRpYWxpemUoKVxuXG4gICAgICBpdCAnZG9lcyBub3QgcmVzY2FucyB0aGUgZmlsZXMnLCAtPlxuICAgICAgICBleHBlY3QocHJvamVjdC5nZXRWYXJpYWJsZXMoKS5sZW5ndGgpLnRvRXF1YWwoMSlcblxuICAgIGRlc2NyaWJlICd3aXRoIGEgdmVyc2lvbiBkaWZmZXJlbnQgdGhhdCB0aGUgY3VycmVudCBvbmUnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBwcm9qZWN0ID0gY3JlYXRlUHJvamVjdFxuICAgICAgICAgIHN0YXRlRml4dHVyZTogXCJlbXB0eS1wcm9qZWN0Lmpzb25cIlxuICAgICAgICAgIHZlcnNpb246IFwiMC4wLjBcIlxuXG4gICAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPiBwcm9qZWN0LmluaXRpYWxpemUoKVxuXG4gICAgICBpdCAnZHJvcHMgdGhlIHdob2xlIHNlcmlhbGl6ZWQgc3RhdGUgYW5kIHJlc2NhbnMgYWxsIHRoZSBwcm9qZWN0JywgLT5cbiAgICAgICAgZXhwZWN0KHByb2plY3QuZ2V0VmFyaWFibGVzKCkubGVuZ3RoKS50b0VxdWFsKDEyKVxuXG4gICAgZGVzY3JpYmUgJ3dpdGggYSBzZXJpYWxpemVkIHBhdGggdGhhdCBubyBsb25nZXIgZXhpc3QnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBwcm9qZWN0ID0gY3JlYXRlUHJvamVjdFxuICAgICAgICAgIHN0YXRlRml4dHVyZTogXCJyZW5hbWUtZmlsZS1wcm9qZWN0Lmpzb25cIlxuXG4gICAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPiBwcm9qZWN0LmluaXRpYWxpemUoKVxuXG4gICAgICBpdCAnZHJvcHMgZHJvcHMgdGhlIG5vbi1leGlzdGluZyBhbmQgcmVsb2FkIHRoZSBwYXRocycsIC0+XG4gICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFBhdGhzKCkpLnRvRXF1YWwoW1xuICAgICAgICAgIFwiI3tyb290UGF0aH0vc3R5bGVzL2J1dHRvbnMuc3R5bFwiXG4gICAgICAgICAgXCIje3Jvb3RQYXRofS9zdHlsZXMvdmFyaWFibGVzLnN0eWxcIlxuICAgICAgICBdKVxuXG4gICAgICBpdCAnZHJvcHMgdGhlIHZhcmlhYmxlcyBmcm9tIHRoZSByZW1vdmVkIHBhdGhzJywgLT5cbiAgICAgICAgZXhwZWN0KHByb2plY3QuZ2V0VmFyaWFibGVzRm9yUGF0aChcIiN7cm9vdFBhdGh9L3N0eWxlcy9mb28uc3R5bFwiKS5sZW5ndGgpLnRvRXF1YWwoMClcblxuICAgICAgaXQgJ2xvYWRzIHRoZSB2YXJpYWJsZXMgZnJvbSB0aGUgbmV3IGZpbGUnLCAtPlxuICAgICAgICBleHBlY3QocHJvamVjdC5nZXRWYXJpYWJsZXNGb3JQYXRoKFwiI3tyb290UGF0aH0vc3R5bGVzL3ZhcmlhYmxlcy5zdHlsXCIpLmxlbmd0aCkudG9FcXVhbCgxMilcblxuXG4gICAgZGVzY3JpYmUgJ3dpdGggYSBzb3VyY2VOYW1lcyBzZXR0aW5nIHZhbHVlIGRpZmZlcmVudCB0aGFuIHdoZW4gc2VyaWFsaXplZCcsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIGF0b20uY29uZmlnLnNldCgncGlnbWVudHMuc291cmNlTmFtZXMnLCBbXSlcblxuICAgICAgICBwcm9qZWN0ID0gY3JlYXRlUHJvamVjdFxuICAgICAgICAgIHN0YXRlRml4dHVyZTogXCJlbXB0eS1wcm9qZWN0Lmpzb25cIlxuXG4gICAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPiBwcm9qZWN0LmluaXRpYWxpemUoKVxuXG4gICAgICBpdCAnZHJvcHMgdGhlIHdob2xlIHNlcmlhbGl6ZWQgc3RhdGUgYW5kIHJlc2NhbnMgYWxsIHRoZSBwcm9qZWN0JywgLT5cbiAgICAgICAgZXhwZWN0KHByb2plY3QuZ2V0VmFyaWFibGVzKCkubGVuZ3RoKS50b0VxdWFsKDApXG5cbiAgICBkZXNjcmliZSAnd2l0aCBhIG1hcmtlcnMgdmVyc2lvbiBkaWZmZXJlbnQgdGhhdCB0aGUgY3VycmVudCBvbmUnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBwcm9qZWN0ID0gY3JlYXRlUHJvamVjdFxuICAgICAgICAgIHN0YXRlRml4dHVyZTogXCJlbXB0eS1wcm9qZWN0Lmpzb25cIlxuICAgICAgICAgIG1hcmtlcnNWZXJzaW9uOiBcIjAuMC4wXCJcblxuICAgICAgICB3YWl0c0ZvclByb21pc2UgLT4gcHJvamVjdC5pbml0aWFsaXplKClcblxuICAgICAgaXQgJ2tlZXBzIHRoZSBwcm9qZWN0IHJlbGF0ZWQgZGF0YScsIC0+XG4gICAgICAgIGV4cGVjdChwcm9qZWN0Lmlnbm9yZWROYW1lcykudG9FcXVhbChbJ3ZlbmRvci8qJ10pXG4gICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFBhdGhzKCkpLnRvRXF1YWwoW1xuICAgICAgICAgIFwiI3tyb290UGF0aH0vc3R5bGVzL2J1dHRvbnMuc3R5bFwiLFxuICAgICAgICAgIFwiI3tyb290UGF0aH0vc3R5bGVzL3ZhcmlhYmxlcy5zdHlsXCJcbiAgICAgICAgXSlcblxuICAgICAgaXQgJ2Ryb3BzIHRoZSB2YXJpYWJsZXMgYW5kIGJ1ZmZlcnMgZGF0YScsIC0+XG4gICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbChUT1RBTF9WQVJJQUJMRVNfSU5fUFJPSkVDVClcblxuICAgIGRlc2NyaWJlICd3aXRoIGEgdGltZXN0YW1wIG9sZGVyIHRoYW4gdGhlIGZpbGVzIGxhc3QgbW9kaWZpY2F0aW9uIGRhdGUnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBwcm9qZWN0ID0gY3JlYXRlUHJvamVjdFxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoMCkudG9KU09OKClcbiAgICAgICAgICBzdGF0ZUZpeHR1cmU6IFwiZW1wdHktcHJvamVjdC5qc29uXCJcblxuICAgICAgICB3YWl0c0ZvclByb21pc2UgLT4gcHJvamVjdC5pbml0aWFsaXplKClcblxuICAgICAgaXQgJ3NjYW5zIGFnYWluIGFsbCB0aGUgZmlsZXMgdGhhdCBoYXZlIGEgbW9yZSByZWNlbnQgbW9kaWZpY2F0aW9uIGRhdGUnLCAtPlxuICAgICAgICBleHBlY3QocHJvamVjdC5nZXRWYXJpYWJsZXMoKS5sZW5ndGgpLnRvRXF1YWwoVE9UQUxfVkFSSUFCTEVTX0lOX1BST0pFQ1QpXG5cbiAgICBkZXNjcmliZSAnd2l0aCBzb21lIGZpbGVzIG5vdCBzYXZlZCBpbiB0aGUgcHJvamVjdCBzdGF0ZScsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHByb2plY3QgPSBjcmVhdGVQcm9qZWN0XG4gICAgICAgICAgc3RhdGVGaXh0dXJlOiBcInBhcnRpYWwtcHJvamVjdC5qc29uXCJcblxuICAgICAgICB3YWl0c0ZvclByb21pc2UgLT4gcHJvamVjdC5pbml0aWFsaXplKClcblxuICAgICAgaXQgJ2RldGVjdHMgdGhlIG5ldyBmaWxlcyBhbmQgc2NhbnMgdGhlbScsIC0+XG4gICAgICAgIGV4cGVjdChwcm9qZWN0LmdldFZhcmlhYmxlcygpLmxlbmd0aCkudG9FcXVhbCgxMilcblxuICAgIGRlc2NyaWJlICd3aXRoIGFuIG9wZW4gZWRpdG9yIGFuZCB0aGUgY29ycmVzcG9uZGluZyBidWZmZXIgc3RhdGUnLCAtPlxuICAgICAgW2VkaXRvciwgY29sb3JCdWZmZXJdID0gW11cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgd2FpdHNGb3JQcm9taXNlIC0+XG4gICAgICAgICAgYXRvbS53b3Jrc3BhY2Uub3BlbigndmFyaWFibGVzLnN0eWwnKS50aGVuIChvKSAtPiBlZGl0b3IgPSBvXG5cbiAgICAgICAgcnVucyAtPlxuICAgICAgICAgIHByb2plY3QgPSBjcmVhdGVQcm9qZWN0XG4gICAgICAgICAgICBzdGF0ZUZpeHR1cmU6IFwib3Blbi1idWZmZXItcHJvamVjdC5qc29uXCJcbiAgICAgICAgICAgIGlkOiBlZGl0b3IuaWRcblxuICAgICAgICAgIHNweU9uKENvbG9yQnVmZmVyLnByb3RvdHlwZSwgJ3ZhcmlhYmxlc0F2YWlsYWJsZScpLmFuZENhbGxUaHJvdWdoKClcblxuICAgICAgICBydW5zIC0+IGNvbG9yQnVmZmVyID0gcHJvamVjdC5jb2xvckJ1ZmZlcnNCeUVkaXRvcklkW2VkaXRvci5pZF1cblxuICAgICAgaXQgJ3Jlc3RvcmVzIHRoZSBjb2xvciBidWZmZXIgaW4gaXRzIHByZXZpb3VzIHN0YXRlJywgLT5cbiAgICAgICAgZXhwZWN0KGNvbG9yQnVmZmVyKS50b0JlRGVmaW5lZCgpXG4gICAgICAgIGV4cGVjdChjb2xvckJ1ZmZlci5nZXRDb2xvck1hcmtlcnMoKS5sZW5ndGgpLnRvRXF1YWwoVE9UQUxfQ09MT1JTX1ZBUklBQkxFU19JTl9QUk9KRUNUKVxuXG4gICAgICBpdCAnZG9lcyBub3Qgd2FpdCBmb3IgdGhlIHByb2plY3QgdmFyaWFibGVzJywgLT5cbiAgICAgICAgZXhwZWN0KGNvbG9yQnVmZmVyLnZhcmlhYmxlc0F2YWlsYWJsZSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKVxuXG4gICAgZGVzY3JpYmUgJ3dpdGggYW4gb3BlbiBlZGl0b3IsIHRoZSBjb3JyZXNwb25kaW5nIGJ1ZmZlciBzdGF0ZSBhbmQgYSBvbGQgdGltZXN0YW1wJywgLT5cbiAgICAgIFtlZGl0b3IsIGNvbG9yQnVmZmVyXSA9IFtdXG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPlxuICAgICAgICAgIGF0b20ud29ya3NwYWNlLm9wZW4oJ3ZhcmlhYmxlcy5zdHlsJykudGhlbiAobykgLT4gZWRpdG9yID0gb1xuXG4gICAgICAgIHJ1bnMgLT5cbiAgICAgICAgICBzcHlPbihDb2xvckJ1ZmZlci5wcm90b3R5cGUsICd1cGRhdGVWYXJpYWJsZVJhbmdlcycpLmFuZENhbGxUaHJvdWdoKClcbiAgICAgICAgICBwcm9qZWN0ID0gY3JlYXRlUHJvamVjdFxuICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgwKS50b0pTT04oKVxuICAgICAgICAgICAgc3RhdGVGaXh0dXJlOiBcIm9wZW4tYnVmZmVyLXByb2plY3QuanNvblwiXG4gICAgICAgICAgICBpZDogZWRpdG9yLmlkXG5cbiAgICAgICAgcnVucyAtPiBjb2xvckJ1ZmZlciA9IHByb2plY3QuY29sb3JCdWZmZXJzQnlFZGl0b3JJZFtlZGl0b3IuaWRdXG5cbiAgICAgICAgd2FpdHNGb3IgLT4gY29sb3JCdWZmZXIudXBkYXRlVmFyaWFibGVSYW5nZXMuY2FsbENvdW50ID4gMFxuXG4gICAgICBpdCAnaW52YWxpZGF0ZXMgdGhlIGNvbG9yIGJ1ZmZlciBtYXJrZXJzIGFzIHNvb24gYXMgdGhlIGRpcnR5IHBhdGhzIGhhdmUgYmVlbiBkZXRlcm1pbmVkJywgLT5cbiAgICAgICAgZXhwZWN0KGNvbG9yQnVmZmVyLnVwZGF0ZVZhcmlhYmxlUmFuZ2VzKS50b0hhdmVCZWVuQ2FsbGVkKClcblxuIyMgICAgIyMjIyMjIyMgICMjIyMjIyMjICMjIyMjIyMjICAgICMjIyAgICAjIyAgICAgIyMgIyMgICAgICAgIyMjIyMjIyNcbiMjICAgICMjICAgICAjIyAjIyAgICAgICAjIyAgICAgICAgICMjICMjICAgIyMgICAgICMjICMjICAgICAgICAgICMjXG4jIyAgICAjIyAgICAgIyMgIyMgICAgICAgIyMgICAgICAgICMjICAgIyMgICMjICAgICAjIyAjIyAgICAgICAgICAjI1xuIyMgICAgIyMgICAgICMjICMjIyMjIyAgICMjIyMjIyAgICMjICAgICAjIyAjIyAgICAgIyMgIyMgICAgICAgICAgIyNcbiMjICAgICMjICAgICAjIyAjIyAgICAgICAjIyAgICAgICAjIyMjIyMjIyMgIyMgICAgICMjICMjICAgICAgICAgICMjXG4jIyAgICAjIyAgICAgIyMgIyMgICAgICAgIyMgICAgICAgIyMgICAgICMjICMjICAgICAjIyAjIyAgICAgICAgICAjI1xuIyMgICAgIyMjIyMjIyMgICMjIyMjIyMjICMjICAgICAgICMjICAgICAjIyAgIyMjIyMjIyAgIyMjIyMjIyMgICAgIyNcblxuZGVzY3JpYmUgJ0NvbG9yUHJvamVjdCcsIC0+XG4gIFtwcm9qZWN0LCByb290UGF0aF0gPSBbXVxuICBkZXNjcmliZSAnd2hlbiB0aGUgcHJvamVjdCBoYXMgYSBwaWdtZW50cyBkZWZhdWx0cyBmaWxlJywgLT5cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBhdG9tLmNvbmZpZy5zZXQgJ3BpZ21lbnRzLnNvdXJjZU5hbWVzJywgWycqLnNhc3MnXVxuXG4gICAgICBbZml4dHVyZXNQYXRoXSA9IGF0b20ucHJvamVjdC5nZXRQYXRocygpXG4gICAgICByb290UGF0aCA9IFwiI3tmaXh0dXJlc1BhdGh9L3Byb2plY3Qtd2l0aC1kZWZhdWx0c1wiXG4gICAgICBhdG9tLnByb2plY3Quc2V0UGF0aHMoW3Jvb3RQYXRoXSlcblxuICAgICAgcHJvamVjdCA9IG5ldyBDb2xvclByb2plY3Qoe30pXG5cbiAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPiBwcm9qZWN0LmluaXRpYWxpemUoKVxuXG4gICAgaXQgJ2xvYWRzIHRoZSBkZWZhdWx0cyBmaWxlIGNvbnRlbnQnLCAtPlxuICAgICAgZXhwZWN0KHByb2plY3QuZ2V0Q29sb3JWYXJpYWJsZXMoKS5sZW5ndGgpLnRvRXF1YWwoMTIpXG4iXX0=
