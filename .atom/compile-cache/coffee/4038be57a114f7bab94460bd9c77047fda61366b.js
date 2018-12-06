(function() {
  var CompositeDisposable, EventsDelegation, Palette, PaletteElement, SpacePenDSL, StickyTitle, THEME_VARIABLES, pigments, ref, ref1, registerOrUpdateElement,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ref = require('atom-utils'), SpacePenDSL = ref.SpacePenDSL, EventsDelegation = ref.EventsDelegation, registerOrUpdateElement = ref.registerOrUpdateElement;

  ref1 = [], CompositeDisposable = ref1[0], THEME_VARIABLES = ref1[1], pigments = ref1[2], Palette = ref1[3], StickyTitle = ref1[4];

  PaletteElement = (function(superClass) {
    extend(PaletteElement, superClass);

    function PaletteElement() {
      return PaletteElement.__super__.constructor.apply(this, arguments);
    }

    SpacePenDSL.includeInto(PaletteElement);

    EventsDelegation.includeInto(PaletteElement);

    PaletteElement.content = function() {
      var group, merge, optAttrs, sort;
      sort = atom.config.get('pigments.sortPaletteColors');
      group = atom.config.get('pigments.groupPaletteColors');
      merge = atom.config.get('pigments.mergeColorDuplicates');
      optAttrs = function(bool, name, attrs) {
        if (bool) {
          attrs[name] = name;
        }
        return attrs;
      };
      return this.div({
        "class": 'pigments-palette-panel'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'pigments-palette-controls settings-view pane-item'
          }, function() {
            return _this.div({
              "class": 'pigments-palette-controls-wrapper'
            }, function() {
              _this.span({
                "class": 'input-group-inline'
              }, function() {
                _this.label({
                  "for": 'sort-palette-colors'
                }, 'Sort Colors');
                return _this.select({
                  outlet: 'sort',
                  id: 'sort-palette-colors'
                }, function() {
                  _this.option(optAttrs(sort === 'none', 'selected', {
                    value: 'none'
                  }), 'None');
                  _this.option(optAttrs(sort === 'by name', 'selected', {
                    value: 'by name'
                  }), 'By Name');
                  return _this.option(optAttrs(sort === 'by file', 'selected', {
                    value: 'by color'
                  }), 'By Color');
                });
              });
              _this.span({
                "class": 'input-group-inline'
              }, function() {
                _this.label({
                  "for": 'sort-palette-colors'
                }, 'Group Colors');
                return _this.select({
                  outlet: 'group',
                  id: 'group-palette-colors'
                }, function() {
                  _this.option(optAttrs(group === 'none', 'selected', {
                    value: 'none'
                  }), 'None');
                  return _this.option(optAttrs(group === 'by file', 'selected', {
                    value: 'by file'
                  }), 'By File');
                });
              });
              return _this.span({
                "class": 'input-group-inline'
              }, function() {
                _this.input(optAttrs(merge, 'checked', {
                  type: 'checkbox',
                  id: 'merge-duplicates',
                  outlet: 'merge'
                }));
                return _this.label({
                  "for": 'merge-duplicates'
                }, 'Merge Duplicates');
              });
            });
          });
          return _this.div({
            "class": 'pigments-palette-list native-key-bindings',
            tabindex: -1
          }, function() {
            return _this.ol({
              outlet: 'list'
            });
          });
        };
      })(this));
    };

    PaletteElement.prototype.createdCallback = function() {
      var subscription;
      if (pigments == null) {
        pigments = require('./pigments');
      }
      this.project = pigments.getProject();
      if (this.project != null) {
        return this.init();
      } else {
        return subscription = atom.packages.onDidActivatePackage((function(_this) {
          return function(pkg) {
            if (pkg.name === 'pigments') {
              subscription.dispose();
              _this.project = pigments.getProject();
              return _this.init();
            }
          };
        })(this));
      }
    };

    PaletteElement.prototype.init = function() {
      if (this.project.isDestroyed()) {
        return;
      }
      if (CompositeDisposable == null) {
        CompositeDisposable = require('atom').CompositeDisposable;
      }
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(this.project.onDidUpdateVariables((function(_this) {
        return function() {
          if (_this.palette != null) {
            _this.palette.variables = _this.project.getColorVariables();
            if (_this.attached) {
              return _this.renderList();
            }
          }
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('pigments.sortPaletteColors', (function(_this) {
        return function(sortPaletteColors) {
          _this.sortPaletteColors = sortPaletteColors;
          if ((_this.palette != null) && _this.attached) {
            return _this.renderList();
          }
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('pigments.groupPaletteColors', (function(_this) {
        return function(groupPaletteColors) {
          _this.groupPaletteColors = groupPaletteColors;
          if ((_this.palette != null) && _this.attached) {
            return _this.renderList();
          }
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('pigments.mergeColorDuplicates', (function(_this) {
        return function(mergeColorDuplicates) {
          _this.mergeColorDuplicates = mergeColorDuplicates;
          if ((_this.palette != null) && _this.attached) {
            return _this.renderList();
          }
        };
      })(this)));
      this.subscriptions.add(this.subscribeTo(this.sort, {
        'change': function(e) {
          return atom.config.set('pigments.sortPaletteColors', e.target.value);
        }
      }));
      this.subscriptions.add(this.subscribeTo(this.group, {
        'change': function(e) {
          return atom.config.set('pigments.groupPaletteColors', e.target.value);
        }
      }));
      this.subscriptions.add(this.subscribeTo(this.merge, {
        'change': function(e) {
          return atom.config.set('pigments.mergeColorDuplicates', e.target.checked);
        }
      }));
      return this.subscriptions.add(this.subscribeTo(this.list, '[data-variable-id]', {
        'click': (function(_this) {
          return function(e) {
            var variable, variableId;
            variableId = Number(e.target.dataset.variableId);
            variable = _this.project.getVariableById(variableId);
            return _this.project.showVariableInFile(variable);
          };
        })(this)
      }));
    };

    PaletteElement.prototype.attachedCallback = function() {
      if (this.palette != null) {
        this.renderList();
      }
      return this.attached = true;
    };

    PaletteElement.prototype.detachedCallback = function() {
      this.subscriptions.dispose();
      return this.attached = false;
    };

    PaletteElement.prototype.getModel = function() {
      return this.palette;
    };

    PaletteElement.prototype.setModel = function(palette1) {
      this.palette = palette1;
      if (this.attached) {
        return this.renderList();
      }
    };

    PaletteElement.prototype.getColorsList = function(palette) {
      switch (this.sortPaletteColors) {
        case 'by color':
          return palette.sortedByColor();
        case 'by name':
          return palette.sortedByName();
        default:
          return palette.variables.slice();
      }
    };

    PaletteElement.prototype.renderList = function() {
      var file, li, ol, palette, palettes, ref2;
      if ((ref2 = this.stickyTitle) != null) {
        ref2.dispose();
      }
      this.list.innerHTML = '';
      if (this.groupPaletteColors === 'by file') {
        if (StickyTitle == null) {
          StickyTitle = require('./sticky-title');
        }
        palettes = this.getFilesPalettes();
        for (file in palettes) {
          palette = palettes[file];
          li = document.createElement('li');
          li.className = 'pigments-color-group';
          ol = document.createElement('ol');
          li.appendChild(this.getGroupHeader(atom.project.relativize(file)));
          li.appendChild(ol);
          this.buildList(ol, this.getColorsList(palette));
          this.list.appendChild(li);
        }
        return this.stickyTitle = new StickyTitle(this.list.querySelectorAll('.pigments-color-group-header-content'), this.querySelector('.pigments-palette-list'));
      } else {
        return this.buildList(this.list, this.getColorsList(this.palette));
      }
    };

    PaletteElement.prototype.getGroupHeader = function(label) {
      var content, header;
      if (THEME_VARIABLES == null) {
        THEME_VARIABLES = require('./uris').THEME_VARIABLES;
      }
      header = document.createElement('div');
      header.className = 'pigments-color-group-header';
      content = document.createElement('div');
      content.className = 'pigments-color-group-header-content';
      if (label === THEME_VARIABLES) {
        content.textContent = 'Atom Themes';
      } else {
        content.textContent = label;
      }
      header.appendChild(content);
      return header;
    };

    PaletteElement.prototype.getFilesPalettes = function() {
      var palettes;
      if (Palette == null) {
        Palette = require('./palette');
      }
      palettes = {};
      this.palette.eachColor((function(_this) {
        return function(variable) {
          var path;
          path = variable.path;
          if (palettes[path] == null) {
            palettes[path] = new Palette([]);
          }
          return palettes[path].variables.push(variable);
        };
      })(this));
      return palettes;
    };

    PaletteElement.prototype.buildList = function(container, paletteColors) {
      var color, html, i, id, isAlternate, j, len, len1, li, line, name, path, ref2, ref3, results1, variables;
      if (THEME_VARIABLES == null) {
        THEME_VARIABLES = require('./uris').THEME_VARIABLES;
      }
      paletteColors = this.checkForDuplicates(paletteColors);
      results1 = [];
      for (i = 0, len = paletteColors.length; i < len; i++) {
        variables = paletteColors[i];
        li = document.createElement('li');
        li.className = 'pigments-color-item';
        ref2 = variables[0], color = ref2.color, isAlternate = ref2.isAlternate;
        if (isAlternate) {
          continue;
        }
        if (color.toCSS == null) {
          continue;
        }
        html = "<div class=\"pigments-color\">\n  <span class=\"pigments-color-preview\"\n        style=\"background-color: " + (color.toCSS()) + "\">\n  </span>\n  <span class=\"pigments-color-properties\">\n    <span class=\"pigments-color-component\"><strong>R:</strong> " + (Math.round(color.red)) + "</span>\n    <span class=\"pigments-color-component\"><strong>G:</strong> " + (Math.round(color.green)) + "</span>\n    <span class=\"pigments-color-component\"><strong>B:</strong> " + (Math.round(color.blue)) + "</span>\n    <span class=\"pigments-color-component\"><strong>A:</strong> " + (Math.round(color.alpha * 1000) / 1000) + "</span>\n  </span>\n</div>\n<div class=\"pigments-color-details\">";
        for (j = 0, len1 = variables.length; j < len1; j++) {
          ref3 = variables[j], name = ref3.name, path = ref3.path, line = ref3.line, id = ref3.id;
          html += "<span class=\"pigments-color-occurence\">\n    <span class=\"name\">" + name + "</span>";
          if (path !== THEME_VARIABLES) {
            html += "<span data-variable-id=\"" + id + "\">\n  <span class=\"path\">" + (atom.project.relativize(path)) + "</span>\n  <span class=\"line\">at line " + (line + 1) + "</span>\n</span>";
          }
          html += '</span>';
        }
        html += '</div>';
        li.innerHTML = html;
        results1.push(container.appendChild(li));
      }
      return results1;
    };

    PaletteElement.prototype.checkForDuplicates = function(paletteColors) {
      var colors, findColor, i, key, len, map, results, v;
      results = [];
      if (this.mergeColorDuplicates) {
        map = new Map();
        colors = [];
        findColor = function(color) {
          var col, i, len;
          for (i = 0, len = colors.length; i < len; i++) {
            col = colors[i];
            if (typeof col.isEqual === "function" ? col.isEqual(color) : void 0) {
              return col;
            }
          }
        };
        for (i = 0, len = paletteColors.length; i < len; i++) {
          v = paletteColors[i];
          if (key = findColor(v.color)) {
            map.get(key).push(v);
          } else {
            map.set(v.color, [v]);
            colors.push(v.color);
          }
        }
        map.forEach(function(vars, color) {
          return results.push(vars);
        });
        return results;
      } else {
        return (function() {
          var j, len1, results1;
          results1 = [];
          for (j = 0, len1 = paletteColors.length; j < len1; j++) {
            v = paletteColors[j];
            results1.push([v]);
          }
          return results1;
        })();
      }
    };

    return PaletteElement;

  })(HTMLElement);

  module.exports = PaletteElement = registerOrUpdateElement('pigments-palette', PaletteElement.prototype);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9waWdtZW50cy9saWIvcGFsZXR0ZS1lbGVtZW50LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsdUpBQUE7SUFBQTs7O0VBQUEsTUFBMkQsT0FBQSxDQUFRLFlBQVIsQ0FBM0QsRUFBQyw2QkFBRCxFQUFjLHVDQUFkLEVBQWdDOztFQUVoQyxPQUF5RSxFQUF6RSxFQUFDLDZCQUFELEVBQXNCLHlCQUF0QixFQUF1QyxrQkFBdkMsRUFBaUQsaUJBQWpELEVBQTBEOztFQUVwRDs7Ozs7OztJQUNKLFdBQVcsQ0FBQyxXQUFaLENBQXdCLGNBQXhCOztJQUNBLGdCQUFnQixDQUFDLFdBQWpCLENBQTZCLGNBQTdCOztJQUVBLGNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQTtBQUNSLFVBQUE7TUFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDRCQUFoQjtNQUNQLEtBQUEsR0FBUSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsNkJBQWhCO01BQ1IsS0FBQSxHQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQiwrQkFBaEI7TUFDUixRQUFBLEdBQVcsU0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLEtBQWI7UUFDVCxJQUFzQixJQUF0QjtVQUFBLEtBQU0sQ0FBQSxJQUFBLENBQU4sR0FBYyxLQUFkOztlQUNBO01BRlM7YUFJWCxJQUFDLENBQUEsR0FBRCxDQUFLO1FBQUEsQ0FBQSxLQUFBLENBQUEsRUFBTyx3QkFBUDtPQUFMLEVBQXNDLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUNwQyxLQUFDLENBQUEsR0FBRCxDQUFLO1lBQUEsQ0FBQSxLQUFBLENBQUEsRUFBTyxtREFBUDtXQUFMLEVBQWlFLFNBQUE7bUJBQy9ELEtBQUMsQ0FBQSxHQUFELENBQUs7Y0FBQSxDQUFBLEtBQUEs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RXZlbnRzRGVsZWdhdGlvbiwgcmVnaXN0ZXJPclVwZGF0ZUVsZW1lbnR9ID0gcmVxdWlyZSAnYXRvbS11dGlscydcblxuW0NvbXBvc2l0ZURpc3Bvc2FibGUsIFRIRU1FX1ZBUklBQkxFUywgcGlnbWVudHMsIFBhbGV0dGUsIFN0aWNreVRpdGxlXSA9IFtdXG5cbmNsYXNzIFBhbGV0dGVFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnRcbiAgU3BhY2VQZW5EU0wuaW5jbHVkZUludG8odGhpcylcbiAgRXZlbnRzRGVsZWdhdGlvbi5pbmNsdWRlSW50byh0aGlzKVxuXG4gIEBjb250ZW50OiAtPlxuICAgIHNvcnQgPSBhdG9tLmNvbmZpZy5nZXQoJ3BpZ21lbnRzLnNvcnRQYWxldHRlQ29sb3JzJylcbiAgICBncm91cCA9IGF0b20uY29uZmlnLmdldCgncGlnbWVudHMuZ3JvdXBQYWxldHRlQ29sb3JzJylcbiAgICBtZXJnZSA9IGF0b20uY29uZmlnLmdldCgncGlnbWVudHMubWVyZ2VDb2xvckR1cGxpY2F0ZXMnKVxuICAgIG9wdEF0dHJzID0gKGJvb2wsIG5hbWUsIGF0dHJzKSAtPlxuICAgICAgYXR0cnNbbmFtZV0gPSBuYW1lIGlmIGJvb2xcbiAgICAgIGF0dHJzXG5cbiAgICBAZGl2IGNsYXNzOiAncGlnbWVudHMtcGFsZXR0ZS1wYW5lbCcsID0+XG4gICAgICBAZGl2IGNsYXNzOiAncGlnbWVudHMtcGFsZXR0ZS1jb250cm9scyBzZXR0aW5ncy12aWV3IHBhbmUtaXRlbScsID0+XG4gICAgICAgIEBkaXYgY2xhc3M6ICdwaWdtZW50cy1wYWxldHRlLWNvbnRyb2xzLXdyYXBwZXInLCA9PlxuICAgICAgICAgIEBzcGFuIGNsYXNzOiAnaW5wdXQtZ3JvdXAtaW5saW5lJywgPT5cbiAgICAgICAgICAgIEBsYWJlbCBmb3I6ICdzb3J0LXBhbGV0dGUtY29sb3JzJywgJ1NvcnQgQ29sb3JzJ1xuICAgICAgICAgICAgQHNlbGVjdCBvdXRsZXQ6ICdzb3J0JywgaWQ6ICdzb3J0LXBhbGV0dGUtY29sb3JzJywgPT5cbiAgICAgICAgICAgICAgQG9wdGlvbiBvcHRBdHRycyhzb3J0IGlzICdub25lJywgJ3NlbGVjdGVkJywgdmFsdWU6ICdub25lJyksICdOb25lJ1xuICAgICAgICAgICAgICBAb3B0aW9uIG9wdEF0dHJzKHNvcnQgaXMgJ2J5IG5hbWUnLCAnc2VsZWN0ZWQnLCB2YWx1ZTogJ2J5IG5hbWUnKSwgJ0J5IE5hbWUnXG4gICAgICAgICAgICAgIEBvcHRpb24gb3B0QXR0cnMoc29ydCBpcyAnYnkgZmlsZScsICdzZWxlY3RlZCcsIHZhbHVlOiAnYnkgY29sb3InKSwgJ0J5IENvbG9yJ1xuXG4gICAgICAgICAgQHNwYW4gY2xhc3M6ICdpbnB1dC1ncm91cC1pbmxpbmUnLCA9PlxuICAgICAgICAgICAgQGxhYmVsIGZvcjogJ3NvcnQtcGFsZXR0ZS1jb2xvcnMnLCAnR3JvdXAgQ29sb3JzJ1xuICAgICAgICAgICAgQHNlbGVjdCBvdXRsZXQ6ICdncm91cCcsIGlkOiAnZ3JvdXAtcGFsZXR0ZS1jb2xvcnMnLCA9PlxuICAgICAgICAgICAgICBAb3B0aW9uIG9wdEF0dHJzKGdyb3VwIGlzICdub25lJywgJ3NlbGVjdGVkJywgdmFsdWU6ICdub25lJyksICdOb25lJ1xuICAgICAgICAgICAgICBAb3B0aW9uIG9wdEF0dHJzKGdyb3VwIGlzICdieSBmaWxlJywgJ3NlbGVjdGVkJywgdmFsdWU6ICdieSBmaWxlJyksICdCeSBGaWxlJ1xuXG4gICAgICAgICAgQHNwYW4gY2xhc3M6ICdpbnB1dC1ncm91cC1pbmxpbmUnLCA9PlxuICAgICAgICAgICAgQGlucHV0IG9wdEF0dHJzIG1lcmdlLCAnY2hlY2tlZCcsIHR5cGU6ICdjaGVja2JveCcsIGlkOiAnbWVyZ2UtZHVwbGljYXRlcycsIG91dGxldDogJ21lcmdlJ1xuICAgICAgICAgICAgQGxhYmVsIGZvcjogJ21lcmdlLWR1cGxpY2F0ZXMnLCAnTWVyZ2UgRHVwbGljYXRlcydcblxuICAgICAgQGRpdiBjbGFzczogJ3BpZ21lbnRzLXBhbGV0dGUtbGlzdCBuYXRpdmUta2V5LWJpbmRpbmdzJywgdGFiaW5kZXg6IC0xLCA9PlxuICAgICAgICBAb2wgb3V0bGV0OiAnbGlzdCdcblxuICBjcmVhdGVkQ2FsbGJhY2s6IC0+XG4gICAgcGlnbWVudHMgPz0gcmVxdWlyZSAnLi9waWdtZW50cydcblxuICAgIEBwcm9qZWN0ID0gcGlnbWVudHMuZ2V0UHJvamVjdCgpXG5cbiAgICBpZiBAcHJvamVjdD9cbiAgICAgIEBpbml0KClcbiAgICBlbHNlXG4gICAgICBzdWJzY3JpcHRpb24gPSBhdG9tLnBhY2thZ2VzLm9uRGlkQWN0aXZhdGVQYWNrYWdlIChwa2cpID0+XG4gICAgICAgIGlmIHBrZy5uYW1lIGlzICdwaWdtZW50cydcbiAgICAgICAgICBzdWJzY3JpcHRpb24uZGlzcG9zZSgpXG4gICAgICAgICAgQHByb2plY3QgPSBwaWdtZW50cy5nZXRQcm9qZWN0KClcbiAgICAgICAgICBAaW5pdCgpXG5cbiAgaW5pdDogLT5cbiAgICByZXR1cm4gaWYgQHByb2plY3QuaXNEZXN0cm95ZWQoKVxuXG4gICAgQ29tcG9zaXRlRGlzcG9zYWJsZSA/PSByZXF1aXJlKCdhdG9tJykuQ29tcG9zaXRlRGlzcG9zYWJsZVxuXG4gICAgQHN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZVxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBAcHJvamVjdC5vbkRpZFVwZGF0ZVZhcmlhYmxlcyA9PlxuICAgICAgaWYgQHBhbGV0dGU/XG4gICAgICAgIEBwYWxldHRlLnZhcmlhYmxlcyA9IEBwcm9qZWN0LmdldENvbG9yVmFyaWFibGVzKClcbiAgICAgICAgQHJlbmRlckxpc3QoKSBpZiBAYXR0YWNoZWRcblxuXG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29uZmlnLm9ic2VydmUgJ3BpZ21lbnRzLnNvcnRQYWxldHRlQ29sb3JzJywgKEBzb3J0UGFsZXR0ZUNvbG9ycykgPT5cbiAgICAgIEByZW5kZXJMaXN0KCkgaWYgQHBhbGV0dGU/IGFuZCBAYXR0YWNoZWRcblxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLmNvbmZpZy5vYnNlcnZlICdwaWdtZW50cy5ncm91cFBhbGV0dGVDb2xvcnMnLCAoQGdyb3VwUGFsZXR0ZUNvbG9ycykgPT5cbiAgICAgIEByZW5kZXJMaXN0KCkgaWYgQHBhbGV0dGU/IGFuZCBAYXR0YWNoZWRcblxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLmNvbmZpZy5vYnNlcnZlICdwaWdtZW50cy5tZXJnZUNvbG9yRHVwbGljYXRlcycsIChAbWVyZ2VDb2xvckR1cGxpY2F0ZXMpID0+XG4gICAgICBAcmVuZGVyTGlzdCgpIGlmIEBwYWxldHRlPyBhbmQgQGF0dGFjaGVkXG5cbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgQHN1YnNjcmliZVRvIEBzb3J0LCAnY2hhbmdlJzogKGUpIC0+XG4gICAgICBhdG9tLmNvbmZpZy5zZXQgJ3BpZ21lbnRzLnNvcnRQYWxldHRlQ29sb3JzJywgZS50YXJnZXQudmFsdWVcblxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBAc3Vic2NyaWJlVG8gQGdyb3VwLCAnY2hhbmdlJzogKGUpIC0+XG4gICAgICBhdG9tLmNvbmZpZy5zZXQgJ3BpZ21lbnRzLmdyb3VwUGFsZXR0ZUNvbG9ycycsIGUudGFyZ2V0LnZhbHVlXG5cbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgQHN1YnNjcmliZVRvIEBtZXJnZSwgJ2NoYW5nZSc6IChlKSAtPlxuICAgICAgYXRvbS5jb25maWcuc2V0ICdwaWdtZW50cy5tZXJnZUNvbG9yRHVwbGljYXRlcycsIGUudGFyZ2V0LmNoZWNrZWRcblxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBAc3Vic2NyaWJlVG8gQGxpc3QsICdbZGF0YS12YXJpYWJsZS1pZF0nLCAnY2xpY2snOiAoZSkgPT5cbiAgICAgIHZhcmlhYmxlSWQgPSBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC52YXJpYWJsZUlkKVxuICAgICAgdmFyaWFibGUgPSBAcHJvamVjdC5nZXRWYXJpYWJsZUJ5SWQodmFyaWFibGVJZClcblxuICAgICAgQHByb2plY3Quc2hvd1ZhcmlhYmxlSW5GaWxlKHZhcmlhYmxlKVxuXG4gIGF0dGFjaGVkQ2FsbGJhY2s6IC0+XG4gICAgQHJlbmRlckxpc3QoKSBpZiBAcGFsZXR0ZT9cbiAgICBAYXR0YWNoZWQgPSB0cnVlXG5cbiAgZGV0YWNoZWRDYWxsYmFjazogLT5cbiAgICBAc3Vic2NyaXB0aW9ucy5kaXNwb3NlKClcbiAgICBAYXR0YWNoZWQgPSBmYWxzZVxuXG4gIGdldE1vZGVsOiAtPiBAcGFsZXR0ZVxuXG4gIHNldE1vZGVsOiAoQHBhbGV0dGUpIC0+IEByZW5kZXJMaXN0KCkgaWYgQGF0dGFjaGVkXG5cbiAgZ2V0Q29sb3JzTGlzdDogKHBhbGV0dGUpIC0+XG4gICAgc3dpdGNoIEBzb3J0UGFsZXR0ZUNvbG9yc1xuICAgICAgd2hlbiAnYnkgY29sb3InIHRoZW4gcGFsZXR0ZS5zb3J0ZWRCeUNvbG9yKClcbiAgICAgIHdoZW4gJ2J5IG5hbWUnIHRoZW4gcGFsZXR0ZS5zb3J0ZWRCeU5hbWUoKVxuICAgICAgZWxzZSBwYWxldHRlLnZhcmlhYmxlcy5zbGljZSgpXG5cbiAgcmVuZGVyTGlzdDogLT5cbiAgICBAc3RpY2t5VGl0bGU/LmRpc3Bvc2UoKVxuICAgIEBsaXN0LmlubmVySFRNTCA9ICcnXG5cbiAgICBpZiBAZ3JvdXBQYWxldHRlQ29sb3JzIGlzICdieSBmaWxlJ1xuICAgICAgU3RpY2t5VGl0bGUgPz0gcmVxdWlyZSAnLi9zdGlja3ktdGl0bGUnXG5cbiAgICAgIHBhbGV0dGVzID0gQGdldEZpbGVzUGFsZXR0ZXMoKVxuICAgICAgZm9yIGZpbGUsIHBhbGV0dGUgb2YgcGFsZXR0ZXNcbiAgICAgICAgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGxpLmNsYXNzTmFtZSA9ICdwaWdtZW50cy1jb2xvci1ncm91cCdcbiAgICAgICAgb2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvbCcpXG5cbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQgQGdldEdyb3VwSGVhZGVyKGF0b20ucHJvamVjdC5yZWxhdGl2aXplKGZpbGUpKVxuICAgICAgICBsaS5hcHBlbmRDaGlsZCBvbFxuICAgICAgICBAYnVpbGRMaXN0KG9sLCBAZ2V0Q29sb3JzTGlzdChwYWxldHRlKSlcbiAgICAgICAgQGxpc3QuYXBwZW5kQ2hpbGQobGkpXG5cbiAgICAgIEBzdGlja3lUaXRsZSA9IG5ldyBTdGlja3lUaXRsZShcbiAgICAgICAgQGxpc3QucXVlcnlTZWxlY3RvckFsbCgnLnBpZ21lbnRzLWNvbG9yLWdyb3VwLWhlYWRlci1jb250ZW50JyksXG4gICAgICAgIEBxdWVyeVNlbGVjdG9yKCcucGlnbWVudHMtcGFsZXR0ZS1saXN0JylcbiAgICAgIClcbiAgICBlbHNlXG4gICAgICBAYnVpbGRMaXN0KEBsaXN0LCBAZ2V0Q29sb3JzTGlzdChAcGFsZXR0ZSkpXG5cbiAgZ2V0R3JvdXBIZWFkZXI6IChsYWJlbCkgLT5cbiAgICBUSEVNRV9WQVJJQUJMRVMgPz0gcmVxdWlyZSgnLi91cmlzJykuVEhFTUVfVkFSSUFCTEVTXG5cbiAgICBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGhlYWRlci5jbGFzc05hbWUgPSAncGlnbWVudHMtY29sb3ItZ3JvdXAtaGVhZGVyJ1xuXG4gICAgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGVudC5jbGFzc05hbWUgPSAncGlnbWVudHMtY29sb3ItZ3JvdXAtaGVhZGVyLWNvbnRlbnQnXG4gICAgaWYgbGFiZWwgaXMgVEhFTUVfVkFSSUFCTEVTXG4gICAgICBjb250ZW50LnRleHRDb250ZW50ID0gJ0F0b20gVGhlbWVzJ1xuICAgIGVsc2VcbiAgICAgIGNvbnRlbnQudGV4dENvbnRlbnQgPSBsYWJlbFxuXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGNvbnRlbnQpXG4gICAgaGVhZGVyXG5cbiAgZ2V0RmlsZXNQYWxldHRlczogLT5cbiAgICBQYWxldHRlID89IHJlcXVpcmUgJy4vcGFsZXR0ZSdcblxuICAgIHBhbGV0dGVzID0ge31cblxuICAgIEBwYWxldHRlLmVhY2hDb2xvciAodmFyaWFibGUpID0+XG4gICAgICB7cGF0aH0gPSB2YXJpYWJsZVxuXG4gICAgICBwYWxldHRlc1twYXRoXSA/PSBuZXcgUGFsZXR0ZSBbXVxuICAgICAgcGFsZXR0ZXNbcGF0aF0udmFyaWFibGVzLnB1c2godmFyaWFibGUpXG5cbiAgICBwYWxldHRlc1xuXG4gIGJ1aWxkTGlzdDogKGNvbnRhaW5lciwgcGFsZXR0ZUNvbG9ycykgLT5cbiAgICBUSEVNRV9WQVJJQUJMRVMgPz0gcmVxdWlyZSgnLi91cmlzJykuVEhFTUVfVkFSSUFCTEVTXG5cbiAgICBwYWxldHRlQ29sb3JzID0gQGNoZWNrRm9yRHVwbGljYXRlcyhwYWxldHRlQ29sb3JzKVxuICAgIGZvciB2YXJpYWJsZXMgaW4gcGFsZXR0ZUNvbG9yc1xuICAgICAgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICBsaS5jbGFzc05hbWUgPSAncGlnbWVudHMtY29sb3ItaXRlbSdcbiAgICAgIHtjb2xvciwgaXNBbHRlcm5hdGV9ID0gdmFyaWFibGVzWzBdXG5cbiAgICAgIGNvbnRpbnVlIGlmIGlzQWx0ZXJuYXRlXG4gICAgICBjb250aW51ZSB1bmxlc3MgY29sb3IudG9DU1M/XG5cbiAgICAgIGh0bWwgPSBcIlwiXCJcbiAgICAgIDxkaXYgY2xhc3M9XCJwaWdtZW50cy1jb2xvclwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBpZ21lbnRzLWNvbG9yLXByZXZpZXdcIlxuICAgICAgICAgICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICN7Y29sb3IudG9DU1MoKX1cIj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBpZ21lbnRzLWNvbG9yLXByb3BlcnRpZXNcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpZ21lbnRzLWNvbG9yLWNvbXBvbmVudFwiPjxzdHJvbmc+Ujo8L3N0cm9uZz4gI3tNYXRoLnJvdW5kIGNvbG9yLnJlZH08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaWdtZW50cy1jb2xvci1jb21wb25lbnRcIj48c3Ryb25nPkc6PC9zdHJvbmc+ICN7TWF0aC5yb3VuZCBjb2xvci5ncmVlbn08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaWdtZW50cy1jb2xvci1jb21wb25lbnRcIj48c3Ryb25nPkI6PC9zdHJvbmc+ICN7TWF0aC5yb3VuZCBjb2xvci5ibHVlfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpZ21lbnRzLWNvbG9yLWNvbXBvbmVudFwiPjxzdHJvbmc+QTo8L3N0cm9uZz4gI3tNYXRoLnJvdW5kKGNvbG9yLmFscGhhICogMTAwMCkgLyAxMDAwfTwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicGlnbWVudHMtY29sb3ItZGV0YWlsc1wiPlxuICAgICAgXCJcIlwiXG5cbiAgICAgIGZvciB7bmFtZSwgcGF0aCwgbGluZSwgaWR9IGluIHZhcmlhYmxlc1xuICAgICAgICBodG1sICs9IFwiXCJcIlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBpZ21lbnRzLWNvbG9yLW9jY3VyZW5jZVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYW1lXCI+I3tuYW1lfTwvc3Bhbj5cbiAgICAgICAgXCJcIlwiXG5cbiAgICAgICAgaWYgcGF0aCBpc250IFRIRU1FX1ZBUklBQkxFU1xuICAgICAgICAgIGh0bWwgKz0gXCJcIlwiXG4gICAgICAgICAgPHNwYW4gZGF0YS12YXJpYWJsZS1pZD1cIiN7aWR9XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBhdGhcIj4je2F0b20ucHJvamVjdC5yZWxhdGl2aXplKHBhdGgpfTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGluZVwiPmF0IGxpbmUgI3tsaW5lICsgMX08L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIFwiXCJcIlxuXG4gICAgICAgIGh0bWwgKz0gJzwvc3Bhbj4nXG5cbiAgICAgIGh0bWwgKz0gJzwvZGl2PidcblxuICAgICAgbGkuaW5uZXJIVE1MID0gaHRtbFxuXG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGkpXG5cbiAgY2hlY2tGb3JEdXBsaWNhdGVzOiAocGFsZXR0ZUNvbG9ycykgLT5cbiAgICByZXN1bHRzID0gW11cbiAgICBpZiBAbWVyZ2VDb2xvckR1cGxpY2F0ZXNcbiAgICAgIG1hcCA9IG5ldyBNYXAoKVxuXG4gICAgICBjb2xvcnMgPSBbXVxuXG4gICAgICBmaW5kQ29sb3IgPSAoY29sb3IpIC0+XG4gICAgICAgIHJldHVybiBjb2wgZm9yIGNvbCBpbiBjb2xvcnMgd2hlbiBjb2wuaXNFcXVhbD8oY29sb3IpXG5cbiAgICAgIGZvciB2IGluIHBhbGV0dGVDb2xvcnNcbiAgICAgICAgaWYga2V5ID0gZmluZENvbG9yKHYuY29sb3IpXG4gICAgICAgICAgbWFwLmdldChrZXkpLnB1c2godilcbiAgICAgICAgZWxzZVxuICAgICAgICAgIG1hcC5zZXQodi5jb2xvciwgW3ZdKVxuICAgICAgICAgIGNvbG9ycy5wdXNoKHYuY29sb3IpXG5cbiAgICAgIG1hcC5mb3JFYWNoICh2YXJzLCBjb2xvcikgLT4gcmVzdWx0cy5wdXNoIHZhcnNcblxuICAgICAgcmV0dXJuIHJlc3VsdHNcbiAgICBlbHNlXG4gICAgICByZXR1cm4gKFt2XSBmb3IgdiBpbiBwYWxldHRlQ29sb3JzKVxuXG5cbm1vZHVsZS5leHBvcnRzID1cblBhbGV0dGVFbGVtZW50ID1cbnJlZ2lzdGVyT3JVcGRhdGVFbGVtZW50ICdwaWdtZW50cy1wYWxldHRlJywgUGFsZXR0ZUVsZW1lbnQucHJvdG90eXBlXG4iXX0=
