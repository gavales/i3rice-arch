(function() {
  var ColorContext, ColorSearch, Emitter, Minimatch, ref, registry;

  ref = [], Emitter = ref[0], Minimatch = ref[1], ColorContext = ref[2], registry = ref[3];

  module.exports = ColorSearch = (function() {
    ColorSearch.deserialize = function(state) {
      return new ColorSearch(state.options);
    };

    function ColorSearch(options) {
      var ref1, subscription;
      this.options = options != null ? options : {};
      ref1 = this.options, this.sourceNames = ref1.sourceNames, this.ignoredNameSources = ref1.ignoredNames, this.context = ref1.context, this.project = ref1.project;
      if (Emitter == null) {
        Emitter = require('atom').Emitter;
      }
      this.emitter = new Emitter;
      if (this.project != null) {
        this.init();
      } else {
        subscription = atom.packages.onDidActivatePackage((function(_this) {
          return function(pkg) {
            if (pkg.name === 'pigments') {
              subscription.dispose();
              _this.project = pkg.mainModule.getProject();
              return _this.init();
            }
          };
        })(this));
      }
    }

    ColorSearch.prototype.init = function() {
      var error, i, ignore, len, ref1;
      if (Minimatch == null) {
        Minimatch = require('minimatch').Minimatch;
      }
      if (ColorContext == null) {
        ColorContext = require('./color-context');
      }
      if (this.context == null) {
        this.context = new ColorContext({
          registry: this.project.getColorExpressionsRegistry()
        });
      }
      this.parser = this.context.parser;
      this.variables = this.context.getVariables();
      if (this.sourceNames == null) {
        this.sourceNames = [];
      }
      if (this.ignoredNameSources == null) {
        this.ignoredNameSources = [];
      }
      this.ignoredNames = [];
      ref1 = this.ignoredNameSources;
      for (i = 0, len = ref1.length; i < len; i++) {
        ignore = ref1[i];
        if (ignore != null) {
          try {
            this.ignoredNames.push(new Minimatch(ignore, {
              matchBase: true,
              dot: true
            }));
          } catch (error1) {
            error = error1;
            console.warn("Error parsing ignore pattern (" + ignore + "): " + error.message);
          }
        }
      }
      if (this.searchRequested) {
        return this.search();
      }
    };

    ColorSearch.prototype.getTitle = function() {
      return 'Pigments Find Results';
    };

    ColorSearch.prototype.getURI = function() {
      return 'pigments://search';
    };

    ColorSearch.prototype.getIconName = function() {
      return "pigments";
    };

    ColorSearch.prototype.onDidFindMatches = function(callback) {
      return this.emitter.on('did-find-matches', callback);
    };

    ColorSearch.prototype.onDidCompleteSearch = function(callback) {
      return this.emitter.on('did-complete-search', callback);
    };

    ColorSearch.prototype.search = function() {
      var promise, re, results;
      if (this.project == null) {
        this.searchRequested = true;
        return;
      }
      re = new RegExp(this.project.getColorExpressionsRegistry().getRegExp());
      results = [];
      promise = atom.workspace.scan(re, {
        paths: this.sourceNames
      }, (function(_this) {
        return function(m) {
          var i, len, newMatches, ref1, ref2, relativePath, result, scope;
          relativePath = atom.project.relativize(m.filePath);
          scope = _this.project.scopeFromFileName(relativePath);
          if (_this.isIgnored(relativePath)) {
            return;
          }
          newMatches = [];
          ref1 = m.matches;
          for (i = 0, len = ref1.length; i < len; i++) {
            result = ref1[i];
            result.color = _this.parser.parse(result.matchText, scope);
            if (!((ref2 = result.color) != null ? ref2.isValid() : void 0)) {
              continue;
            }
            if (result.range[0] == null) {
              console.warn("Color search returned a result with an invalid range", result);
              continue;
            }
            result.range[0][1] += result.matchText.indexOf(result.color.colorExpression);
            result.matchText = result.color.colorExpression;
            results.push(result);
            newMatches.push(result);
          }
          m.matches = newMatches;
          if (m.matches.length > 0) {
            return _this.emitter.emit('did-find-matches', m);
          }
        };
      })(this));
      return promise.then((function(_this) {
        return function() {
          _this.results = results;
          return _this.emitter.emit('did-complete-search', results);
        };
      })(this));
    };

    ColorSearch.prototype.isIgnored = function(relativePath) {
      var i, ignoredName, len, ref1;
      ref1 = this.ignoredNames;
      for (i = 0, len = ref1.length; i < len; i++) {
        ignoredName = ref1[i];
        if (ignoredName.match(relativePath)) {
          return true;
        }
      }
    };

    ColorSearch.prototype.serialize = function() {
      return {
        deserializer: 'ColorSearch',
        options: {
          sourceNames: this.sourceNames,
          ignoredNames: this.ignoredNameSources
        }
      };
    };

    return ColorSearch;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9waWdtZW50cy9saWIvY29sb3Itc2VhcmNoLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsTUFBK0MsRUFBL0MsRUFBQyxnQkFBRCxFQUFVLGtCQUFWLEVBQXFCLHFCQUFyQixFQUFtQzs7RUFFbkMsTUFBTSxDQUFDLE9BQVAsR0FDTTtJQUNKLFdBQUMsQ0FBQSxXQUFELEdBQWMsU0FBQyxLQUFEO2FBQVcsSUFBSSxXQUFKLENBQWdCLEtBQUssQ0FBQyxPQUF0QjtJQUFYOztJQUVELHFCQUFDLE9BQUQ7QUFDWCxVQUFBO01BRFksSUFBQyxDQUFBLDRCQUFELFVBQVM7TUFDckIsT0FBd0UsSUFBQyxDQUFBLE9BQXpFLEVBQUMsSUFBQyxDQUFBLG1CQUFBLFdBQUYsRUFBNkIsSUFBQyxDQUFBLDBCQUFmLFlBQWYsRUFBa0QsSUFBQyxDQUFBLGVBQUEsT0FBbkQsRUFBNEQsSUFBQyxDQUFBLGVBQUE7TUFDN0QsSUFBa0MsZUFBbEM7UUFBQyxVQUFXLE9BQUEsQ0FBUSxNQUFSLFVBQVo7O01BQ0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFJO01BRWYsSUFBRyxvQkFBSDtRQUNFLElBQUMsQ0FBQSxJQUFELENBQUEsRUFERjtPQUFBLE1BQUE7UUFHRSxZQUFBLEdBQWUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBZCxDQUFtQyxDQUFBLFNBQUEsS0FBQTtpQkFBQSxTQUFDLEdBQUQ7WUFDaEQsSUFBRyxHQUFHLENBQUMsSUFBSixLQUFZLFVBQWY7Y0FDRSxZQUFZLENBQUMsT0FBYixDQUFBO2NBQ0EsS0FBQyxDQUFBLE9BQUQsR0FBVyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQWYsQ0FBQTtxQkFDWCxLQUFDLENBQUEsSUFBRCxDQUFBLEVBSEY7O1VBRGdEO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuQyxFQUhq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QUMsT0FBakIsQ0FBeUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUF0QztZQUN0QixNQUFNLENBQUMsU0FBUCxHQUFtQixNQUFNLENBQUMsS0FBSyxDQUFDO1lBRWhDLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYjtZQUNBLFVBQVUsQ0FBQyxJQUFYLENBQWdCLE1BQWhCO0FBZEY7VUFnQkEsQ0FBQyxDQUFDLE9BQUYsR0FBWTtVQUVaLElBQXVDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBVixHQUFtQixDQUExRDttQkFBQSxLQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxrQkFBZCxFQUFrQyxDQUFsQyxFQUFBOztRQXhCcUQ7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTdDO2FBMEJWLE9BQU8sQ0FBQyxJQUFSLENBQWEsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO1VBQ1gsS0FBQyxDQUFBLE9BQUQsR0FBVztpQkFDWCxLQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxxQkFBZCxFQUFxQyxPQUFyQztRQUZXO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFiO0lBbENNOzswQkFzQ1IsU0FBQSxHQUFXLFNBQUMsWUFBRDtBQUNULFVBQUE7QUFBQTtBQUFBLFdBQUEsc0NBQUE7O1FBQ0UsSUFBZSxXQUFXLENBQUMsS0FBWixDQUFrQixZQUFsQixDQUFmO0FBQUEsaUJBQU8sS0FBUDs7QUFERjtJQURTOzswQkFJWCxTQUFBLEdBQVcsU0FBQTthQUNUO1FBQ0UsWUFBQSxFQUFjLGFBRGhCO1FBRUUsT0FBQSxFQUFTO1VBQ04sYUFBRCxJQUFDLENBQUEsV0FETTtVQUVQLFlBQUEsRUFBYyxJQUFDLENBQUEsa0JBRlI7U0FGWDs7SUFEUzs7Ozs7QUE5RmIiLCJzb3VyY2VzQ29udGVudCI6WyJbRW1pdHRlciwgTWluaW1hdGNoLCBDb2xvckNvbnRleHQsIHJlZ2lzdHJ5XSA9IFtdXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIENvbG9yU2VhcmNoXG4gIEBkZXNlcmlhbGl6ZTogKHN0YXRlKSAtPiBuZXcgQ29sb3JTZWFyY2goc3RhdGUub3B0aW9ucylcblxuICBjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuICAgIHtAc291cmNlTmFtZXMsIGlnbm9yZWROYW1lczogQGlnbm9yZWROYW1lU291cmNlcywgQGNvbnRleHQsIEBwcm9qZWN0fSA9IEBvcHRpb25zXG4gICAge0VtaXR0ZXJ9ID0gcmVxdWlyZSAnYXRvbScgdW5sZXNzIEVtaXR0ZXI/XG4gICAgQGVtaXR0ZXIgPSBuZXcgRW1pdHRlclxuXG4gICAgaWYgQHByb2plY3Q/XG4gICAgICBAaW5pdCgpXG4gICAgZWxzZVxuICAgICAgc3Vic2NyaXB0aW9uID0gYXRvbS5wYWNrYWdlcy5vbkRpZEFjdGl2YXRlUGFja2FnZSAocGtnKSA9PlxuICAgICAgICBpZiBwa2cubmFtZSBpcyAncGlnbWVudHMnXG4gICAgICAgICAgc3Vic2NyaXB0aW9uLmRpc3Bvc2UoKVxuICAgICAgICAgIEBwcm9qZWN0ID0gcGtnLm1haW5Nb2R1bGUuZ2V0UHJvamVjdCgpXG4gICAgICAgICAgQGluaXQoKVxuXG4gIGluaXQ6IC0+XG4gICAge01pbmltYXRjaH0gPSByZXF1aXJlICdtaW5pbWF0Y2gnIHVubGVzcyBNaW5pbWF0Y2g/XG4gICAgQ29sb3JDb250ZXh0ID89IHJlcXVpcmUgJy4vY29sb3ItY29udGV4dCdcblxuICAgIEBjb250ZXh0ID89IG5ldyBDb2xvckNvbnRleHQocmVnaXN0cnk6IEBwcm9qZWN0LmdldENvbG9yRXhwcmVzc2lvbnNSZWdpc3RyeSgpKVxuXG4gICAgQHBhcnNlciA9IEBjb250ZXh0LnBhcnNlclxuICAgIEB2YXJpYWJsZXMgPSBAY29udGV4dC5nZXRWYXJpYWJsZXMoKVxuICAgIEBzb3VyY2VOYW1lcyA/PSBbXVxuICAgIEBpZ25vcmVkTmFtZVNvdXJjZXMgPz0gW11cblxuICAgIEBpZ25vcmVkTmFtZXMgPSBbXVxuICAgIGZvciBpZ25vcmUgaW4gQGlnbm9yZWROYW1lU291cmNlcyB3aGVuIGlnbm9yZT9cbiAgICAgIHRyeVxuICAgICAgICBAaWdub3JlZE5hbWVzLnB1c2gobmV3IE1pbmltYXRjaChpZ25vcmUsIG1hdGNoQmFzZTogdHJ1ZSwgZG90OiB0cnVlKSlcbiAgICAgIGNhdGNoIGVycm9yXG4gICAgICAgIGNvbnNvbGUud2FybiBcIkVycm9yIHBhcnNpbmcgaWdub3JlIHBhdHRlcm4gKCN7aWdub3JlfSk6ICN7ZXJyb3IubWVzc2FnZX1cIlxuXG4gICAgQHNlYXJjaCgpIGlmIEBzZWFyY2hSZXF1ZXN0ZWRcblxuICBnZXRUaXRsZTogLT4gJ1BpZ21lbnRzIEZpbmQgUmVzdWx0cydcblxuICBnZXRVUkk6IC0+ICdwaWdtZW50czovL3NlYXJjaCdcblxuICBnZXRJY29uTmFtZTogLT4gXCJwaWdtZW50c1wiXG5cbiAgb25EaWRGaW5kTWF0Y2hlczogKGNhbGxiYWNrKSAtPlxuICAgIEBlbWl0dGVyLm9uICdkaWQtZmluZC1tYXRjaGVzJywgY2FsbGJhY2tcblxuICBvbkRpZENvbXBsZXRlU2VhcmNoOiAoY2FsbGJhY2spIC0+XG4gICAgQGVtaXR0ZXIub24gJ2RpZC1jb21wbGV0ZS1zZWFyY2gnLCBjYWxsYmFja1xuXG4gIHNlYXJjaDogLT5cbiAgICB1bmxlc3MgQHByb2plY3Q/XG4gICAgICBAc2VhcmNoUmVxdWVzdGVkID0gdHJ1ZVxuICAgICAgcmV0dXJuXG5cbiAgICByZSA9IG5ldyBSZWdFeHAgQHByb2plY3QuZ2V0Q29sb3JFeHByZXNzaW9uc1JlZ2lzdHJ5KCkuZ2V0UmVnRXhwKClcbiAgICByZXN1bHRzID0gW11cblxuICAgIHByb21pc2UgPSBhdG9tLndvcmtzcGFjZS5zY2FuIHJlLCBwYXRoczogQHNvdXJjZU5hbWVzLCAobSkgPT5cbiAgICAgIHJlbGF0aXZlUGF0aCA9IGF0b20ucHJvamVjdC5yZWxhdGl2aXplKG0uZmlsZVBhdGgpXG4gICAgICBzY29wZSA9IEBwcm9qZWN0LnNjb3BlRnJvbUZpbGVOYW1lKHJlbGF0aXZlUGF0aClcbiAgICAgIHJldHVybiBpZiBAaXNJZ25vcmVkKHJlbGF0aXZlUGF0aClcblxuICAgICAgbmV3TWF0Y2hlcyA9IFtdXG4gICAgICBmb3IgcmVzdWx0IGluIG0ubWF0Y2hlc1xuICAgICAgICByZXN1bHQuY29sb3IgPSBAcGFyc2VyLnBhcnNlKHJlc3VsdC5tYXRjaFRleHQsIHNjb3BlKVxuICAgICAgICAjIEZJWE1FIGl0IHNob3VsZCBiZSBoYW5kbGVkIHdheSBiZWZvcmUsIGJ1dCBpdCdsbCBuZWVkIGEgY2hhbmdlXG4gICAgICAgICMgaW4gaG93IHdlIHRlc3QgaWYgYSB2YXJpYWJsZSBpcyBhIGNvbG9yLlxuICAgICAgICBjb250aW51ZSB1bmxlc3MgcmVzdWx0LmNvbG9yPy5pc1ZhbGlkKClcbiAgICAgICAgIyBGSVhNRSBTZWVtcyBsaWtlLCBzb21ldGltZSB0aGUgcmFuZ2Ugb2YgdGhlIHJlc3VsdCBpcyB1bmRlZmluZWQsXG4gICAgICAgICMgd2UnbGwgaWdub3JlIHRoYXQgZm9yIG5vdyBhbmQgbG9nIHRoZSBmYXVsdGluZyByZXN1bHQuXG4gICAgICAgIHVubGVzcyByZXN1bHQucmFuZ2VbMF0/XG4gICAgICAgICAgY29uc29sZS53YXJuIFwiQ29sb3Igc2VhcmNoIHJldHVybmVkIGEgcmVzdWx0IHdpdGggYW4gaW52YWxpZCByYW5nZVwiLCByZXN1bHRcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICByZXN1bHQucmFuZ2VbMF1bMV0gKz0gcmVzdWx0Lm1hdGNoVGV4dC5pbmRleE9mKHJlc3VsdC5jb2xvci5jb2xvckV4cHJlc3Npb24pXG4gICAgICAgIHJlc3VsdC5tYXRjaFRleHQgPSByZXN1bHQuY29sb3IuY29sb3JFeHByZXNzaW9uXG5cbiAgICAgICAgcmVzdWx0cy5wdXNoIHJlc3VsdFxuICAgICAgICBuZXdNYXRjaGVzLnB1c2ggcmVzdWx0XG5cbiAgICAgIG0ubWF0Y2hlcyA9IG5ld01hdGNoZXNcblxuICAgICAgQGVtaXR0ZXIuZW1pdCAnZGlkLWZpbmQtbWF0Y2hlcycsIG0gaWYgbS5tYXRjaGVzLmxlbmd0aCA+IDBcblxuICAgIHByb21pc2UudGhlbiA9PlxuICAgICAgQHJlc3VsdHMgPSByZXN1bHRzXG4gICAgICBAZW1pdHRlci5lbWl0ICdkaWQtY29tcGxldGUtc2VhcmNoJywgcmVzdWx0c1xuXG4gIGlzSWdub3JlZDogKHJlbGF0aXZlUGF0aCkgLT5cbiAgICBmb3IgaWdub3JlZE5hbWUgaW4gQGlnbm9yZWROYW1lc1xuICAgICAgcmV0dXJuIHRydWUgaWYgaWdub3JlZE5hbWUubWF0Y2gocmVsYXRpdmVQYXRoKVxuXG4gIHNlcmlhbGl6ZTogLT5cbiAgICB7XG4gICAgICBkZXNlcmlhbGl6ZXI6ICdDb2xvclNlYXJjaCdcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgQHNvdXJjZU5hbWVzLFxuICAgICAgICBpZ25vcmVkTmFtZXM6IEBpZ25vcmVkTmFtZVNvdXJjZXNcbiAgICAgIH1cbiAgICB9XG4iXX0=
