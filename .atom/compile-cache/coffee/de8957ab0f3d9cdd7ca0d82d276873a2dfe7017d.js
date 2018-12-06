(function() {
  var VariableScanner, path, registry, scopeFromFileName;

  path = require('path');

  VariableScanner = require('../lib/variable-scanner');

  registry = require('../lib/variable-expressions');

  scopeFromFileName = require('../lib/scope-from-file-name');

  describe('VariableScanner', function() {
    var editor, ref, scanner, scope, text, withScannerForTextEditor, withTextEditor;
    ref = [], scanner = ref[0], editor = ref[1], text = ref[2], scope = ref[3];
    withTextEditor = function(fixture, block) {
      return describe("with " + fixture + " buffer", function() {
        beforeEach(function() {
          waitsForPromise(function() {
            return atom.workspace.open(fixture);
          });
          return runs(function() {
            editor = atom.workspace.getActiveTextEditor();
            text = editor.getText();
            return scope = scopeFromFileName(editor.getPath());
          });
        });
        afterEach(function() {
          editor = null;
          return scope = null;
        });
        return block();
      });
    };
    withScannerForTextEditor = function(fixture, block) {
      return withTextEditor(fixture, function() {
        beforeEach(function() {
          return scanner = new VariableScanner({
            registry: registry,
            scope: scope
          });
        });
        afterEach(function() {
          return scanner = null;
        });
        return block();
      });
    };
    return describe('::search', function() {
      var result;
      result = [][0];
      withScannerForTextEditor('four-variables.styl', function() {
        beforeEach(function() {
          return result = scanner.search(text);
        });
        it('returns the first match', function() {
          return expect(result).toBeDefined();
        });
        describe('the result object', function() {
          it('has a match string', function() {
            return expect(result.match).toEqual('base-color = #fff');
          });
          it('has a lastIndex property', function() {
            return expect(result.lastIndex).toEqual(17);
          });
          it('has a range property', function() {
            return expect(result.range).toEqual([0, 17]);
          });
          return it('has a variable result', function() {
            expect(result[0].name).toEqual('base-color');
            expect(result[0].value).toEqual('#fff');
            expect(result[0].range).toEqual([0, 17]);
            return expect(result[0].line).toEqual(0);
          });
        });
        describe('the second result object', function() {
          beforeEach(function() {
            return result = scanner.search(text, result.lastIndex);
          });
          it('has a match string', function() {
            return expect(result.match).toEqual('other-color = transparentize(base-color, 50%)');
          });
          it('has a lastIndex property', function() {
            return expect(result.lastIndex).toEqual(64);
          });
          it('has a range property', function() {
            return expect(result.range).toEqual([19, 64]);
          });
          return it('has a variable result', function() {
            expect(result[0].name).toEqual('other-color');
            expect(result[0].value).toEqual('transparentize(base-color, 50%)');
            expect(result[0].range).toEqual([19, 64]);
            return expect(result[0].line).toEqual(2);
          });
        });
        return describe('successive searches', function() {
          return it('returns a result for each match and then undefined', function() {
            var doSearch;
            doSearch = function() {
              return result = scanner.search(text, result.lastIndex);
            };
            expect(doSearch()).toBeDefined();
            expect(doSearch()).toBeDefined();
            expect(doSearch()).toBeDefined();
            return expect(doSearch()).toBeUndefined();
          });
        });
      });
      withScannerForTextEditor('incomplete-stylus-hash.styl', function() {
        beforeEach(function() {
          return result = scanner.search(text);
        });
        return it('does not find any variables', function() {
          return expect(result).toBeUndefined();
        });
      });
      withScannerForTextEditor('variables-in-arguments.scss', function() {
        beforeEach(function() {
          return result = scanner.search(text);
        });
        return it('does not find any variables', function() {
          return expect(result).toBeUndefined();
        });
      });
      withScannerForTextEditor('attribute-selectors.scss', function() {
        beforeEach(function() {
          return result = scanner.search(text);
        });
        return it('does not find any variables', function() {
          return expect(result).toBeUndefined();
        });
      });
      withScannerForTextEditor('variables-in-conditions.scss', function() {
        beforeEach(function() {
          var doSearch;
          result = null;
          doSearch = function() {
            return result = scanner.search(text, result != null ? result.lastIndex : void 0);
          };
          doSearch();
          return doSearch();
        });
        return it('does not find the variable in the if clause', function() {
          return expect(result).toBeUndefined();
        });
      });
      withScannerForTextEditor('variables-after-mixins.scss', function() {
        beforeEach(function() {
          var doSearch;
          result = null;
          doSearch = function() {
            return result = scanner.search(text, result != null ? result.lastIndex : void 0);
          };
          return doSearch();
        });
        return it('finds the variable after the mixin', function() {
          return expect(result).toBeDefined();
        });
      });
      withScannerForTextEditor('variables-from-other-process.less', function() {
        beforeEach(function() {
          var doSearch;
          result = null;
          doSearch = function() {
            return result = scanner.search(text, result != null ? result.lastIndex : void 0);
          };
          return doSearch();
        });
        return it('finds the variable with an interpolation tag', function() {
          return expect(result).toBeDefined();
        });
      });
      return withScannerForTextEditor('crlf.styl', function() {
        beforeEach(function() {
          var doSearch;
          result = null;
          doSearch = function() {
            return result = scanner.search(text, result != null ? result.lastIndex : void 0);
          };
          doSearch();
          return doSearch();
        });
        return it('finds all the variables even with crlf mode', function() {
          return expect(result).toBeDefined();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9waWdtZW50cy9zcGVjL3ZhcmlhYmxlLXNjYW5uZXItc3BlYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7RUFDUCxlQUFBLEdBQWtCLE9BQUEsQ0FBUSx5QkFBUjs7RUFDbEIsUUFBQSxHQUFXLE9BQUEsQ0FBUSw2QkFBUjs7RUFDWCxpQkFBQSxHQUFvQixPQUFBLENBQVEsNkJBQVI7O0VBRXBCLFFBQUEsQ0FBUyxpQkFBVCxFQUE0QixTQUFBO0FBQzFCLFFBQUE7SUFBQSxNQUFpQyxFQUFqQyxFQUFDLGdCQUFELEVBQVUsZUFBVixFQUFrQixhQUFsQixFQUF3QjtJQUV4QixjQUFBLEdBQWlCLFNBQUMsT0FBRCxFQUFVLEtBQVY7YUFDZixRQUFBLENBQVMsT0FBQSxHQUFRLE9BQVIsR0FBZ0IsU0FBekIsRUFBbUMsU0FBQTtRQUNqQyxVQUFBLENBQVcsU0FBQTtVQUNULGVBQUEsQ0FBZ0IsU0FBQTttQkFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0IsT0FBcEI7VUFBSCxDQUFoQjtpQkFDQSxJQUFBLENBQUssU0FBQTtZQUNILE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFmLENBQUE7WUFDVCxJQUFBLEdBQU8sTUFBTSxDQUFDLE9BQVAsQ0FBQTttQkFDUCxLQUFBLEdBQVEsaUJBQUEsQ0FBa0IsTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQUFsQjtVQUhMLENBQUw7UUFGUyxDQUFYO1FBT0EsU0FBQSxDQUFVLFNBQUE7VUFDUixNQUFBLEdBQVM7aUJBQ1QsS0FBQSxHQUFRO1FBRkEsQ0FBVjtlQUlHLEtBQUgsQ0FBQTtNQVppQyxDQUFuQztJQURlO0lBZWpCLHdCQUFBLEdBQTJCLFNBQUMsT0FBRCxFQUFVLEtBQVY7YUFDekIsY0FBQSxD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QUE7aUJBQ3ZDLE1BQUEsQ0FBTyxNQUFQLENBQWMsQ0FBQyxXQUFmLENBQUE7UUFEdUMsQ0FBekM7TUFQc0QsQ0FBeEQ7TUFVQSx3QkFBQSxDQUF5QixtQ0FBekIsRUFBOEQsU0FBQTtRQUM1RCxVQUFBLENBQVcsU0FBQTtBQUNULGNBQUE7VUFBQSxNQUFBLEdBQVM7VUFDVCxRQUFBLEdBQVcsU0FBQTttQkFBRyxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSxJQUFmLG1CQUFxQixNQUFNLENBQUUsa0JBQTdCO1VBQVo7aUJBRVgsUUFBQSxDQUFBO1FBSlMsQ0FBWDtlQU1BLEVBQUEsQ0FBRyw4Q0FBSCxFQUFtRCxTQUFBO2lCQUNqRCxNQUFBLENBQU8sTUFBUCxDQUFjLENBQUMsV0FBZixDQUFBO1FBRGlELENBQW5EO01BUDRELENBQTlEO2FBVUEsd0JBQUEsQ0FBeUIsV0FBekIsRUFBc0MsU0FBQTtRQUNwQyxVQUFBLENBQVcsU0FBQTtBQUNULGNBQUE7VUFBQSxNQUFBLEdBQVM7VUFDVCxRQUFBLEdBQVcsU0FBQTttQkFBRyxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSxJQUFmLG1CQUFxQixNQUFNLENBQUUsa0JBQTdCO1VBQVo7VUFFWCxRQUFBLENBQUE7aUJBQ0EsUUFBQSxDQUFBO1FBTFMsQ0FBWDtlQU9BLEVBQUEsQ0FBRyw2Q0FBSCxFQUFrRCxTQUFBO2lCQUNoRCxNQUFBLENBQU8sTUFBUCxDQUFjLENBQUMsV0FBZixDQUFBO1FBRGdELENBQWxEO01BUm9DLENBQXRDO0lBM0dtQixDQUFyQjtFQTFCMEIsQ0FBNUI7QUFMQSIsInNvdXJjZXNDb250ZW50IjpbInBhdGggPSByZXF1aXJlICdwYXRoJ1xuVmFyaWFibGVTY2FubmVyID0gcmVxdWlyZSAnLi4vbGliL3ZhcmlhYmxlLXNjYW5uZXInXG5yZWdpc3RyeSA9IHJlcXVpcmUgJy4uL2xpYi92YXJpYWJsZS1leHByZXNzaW9ucydcbnNjb3BlRnJvbUZpbGVOYW1lID0gcmVxdWlyZSAnLi4vbGliL3Njb3BlLWZyb20tZmlsZS1uYW1lJ1xuXG5kZXNjcmliZSAnVmFyaWFibGVTY2FubmVyJywgLT5cbiAgW3NjYW5uZXIsIGVkaXRvciwgdGV4dCwgc2NvcGVdID0gW11cblxuICB3aXRoVGV4dEVkaXRvciA9IChmaXh0dXJlLCBibG9jaykgLT5cbiAgICBkZXNjcmliZSBcIndpdGggI3tmaXh0dXJlfSBidWZmZXJcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgd2FpdHNGb3JQcm9taXNlIC0+IGF0b20ud29ya3NwYWNlLm9wZW4oZml4dHVyZSlcbiAgICAgICAgcnVucyAtPlxuICAgICAgICAgIGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuICAgICAgICAgIHRleHQgPSBlZGl0b3IuZ2V0VGV4dCgpXG4gICAgICAgICAgc2NvcGUgPSBzY29wZUZyb21GaWxlTmFtZShlZGl0b3IuZ2V0UGF0aCgpKVxuXG4gICAgICBhZnRlckVhY2ggLT5cbiAgICAgICAgZWRpdG9yID0gbnVsbFxuICAgICAgICBzY29wZSA9IG51bGxcblxuICAgICAgZG8gYmxvY2tcblxuICB3aXRoU2Nhbm5lckZvclRleHRFZGl0b3IgPSAoZml4dHVyZSwgYmxvY2spIC0+XG4gICAgd2l0aFRleHRFZGl0b3IgZml4dHVyZSwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT4gc2Nhbm5lciA9IG5ldyBWYXJpYWJsZVNjYW5uZXIoe3JlZ2lzdHJ5LCBzY29wZX0pXG5cbiAgICAgIGFmdGVyRWFjaCAtPiBzY2FubmVyID0gbnVsbFxuXG4gICAgICBkbyBibG9ja1xuXG4gIGRlc2NyaWJlICc6OnNlYXJjaCcsIC0+XG4gICAgW3Jlc3VsdF0gPSBbXVxuXG4gICAgd2l0aFNjYW5uZXJGb3JUZXh0RWRpdG9yICdmb3VyLXZhcmlhYmxlcy5zdHlsJywgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgcmVzdWx0ID0gc2Nhbm5lci5zZWFyY2godGV4dClcblxuICAgICAgaXQgJ3JldHVybnMgdGhlIGZpcnN0IG1hdGNoJywgLT5cbiAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZURlZmluZWQoKVxuXG4gICAgICBkZXNjcmliZSAndGhlIHJlc3VsdCBvYmplY3QnLCAtPlxuICAgICAgICBpdCAnaGFzIGEgbWF0Y2ggc3RyaW5nJywgLT5cbiAgICAgICAgICBleHBlY3QocmVzdWx0Lm1hdGNoKS50b0VxdWFsKCdiYXNlLWNvbG9yID0gI2ZmZicpXG5cbiAgICAgICAgaXQgJ2hhcyBhIGxhc3RJbmRleCBwcm9wZXJ0eScsIC0+XG4gICAgICAgICAgZXhwZWN0KHJlc3VsdC5sYXN0SW5kZXgpLnRvRXF1YWwoMTcpXG5cbiAgICAgICAgaXQgJ2hhcyBhIHJhbmdlIHByb3BlcnR5JywgLT5cbiAgICAgICAgICBleHBlY3QocmVzdWx0LnJhbmdlKS50b0VxdWFsKFswLDE3XSlcblxuICAgICAgICBpdCAnaGFzIGEgdmFyaWFibGUgcmVzdWx0JywgLT5cbiAgICAgICAgICBleHBlY3QocmVzdWx0WzBdLm5hbWUpLnRvRXF1YWwoJ2Jhc2UtY29sb3InKVxuICAgICAgICAgIGV4cGVjdChyZXN1bHRbMF0udmFsdWUpLnRvRXF1YWwoJyNmZmYnKVxuICAgICAgICAgIGV4cGVjdChyZXN1bHRbMF0ucmFuZ2UpLnRvRXF1YWwoWzAsMTddKVxuICAgICAgICAgIGV4cGVjdChyZXN1bHRbMF0ubGluZSkudG9FcXVhbCgwKVxuXG4gICAgICBkZXNjcmliZSAndGhlIHNlY29uZCByZXN1bHQgb2JqZWN0JywgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIHJlc3VsdCA9IHNjYW5uZXIuc2VhcmNoKHRleHQsIHJlc3VsdC5sYXN0SW5kZXgpXG5cbiAgICAgICAgaXQgJ2hhcyBhIG1hdGNoIHN0cmluZycsIC0+XG4gICAgICAgICAgZXhwZWN0KHJlc3VsdC5tYXRjaCkudG9FcXVhbCgnb3RoZXItY29sb3IgPSB0cmFuc3BhcmVudGl6ZShiYXNlLWNvbG9yLCA1MCUpJylcblxuICAgICAgICBpdCAnaGFzIGEgbGFzdEluZGV4IHByb3BlcnR5JywgLT5cbiAgICAgICAgICBleHBlY3QocmVzdWx0Lmxhc3RJbmRleCkudG9FcXVhbCg2NClcblxuICAgICAgICBpdCAnaGFzIGEgcmFuZ2UgcHJvcGVydHknLCAtPlxuICAgICAgICAgIGV4cGVjdChyZXN1bHQucmFuZ2UpLnRvRXF1YWwoWzE5LDY0XSlcblxuICAgICAgICBpdCAnaGFzIGEgdmFyaWFibGUgcmVzdWx0JywgLT5cbiAgICAgICAgICBleHBlY3QocmVzdWx0WzBdLm5hbWUpLnRvRXF1YWwoJ290aGVyLWNvbG9yJylcbiAgICAgICAgICBleHBlY3QocmVzdWx0WzBdLnZhbHVlKS50b0VxdWFsKCd0cmFuc3BhcmVudGl6ZShiYXNlLWNvbG9yLCA1MCUpJylcbiAgICAgICAgICBleHBlY3QocmVzdWx0WzBdLnJhbmdlKS50b0VxdWFsKFsxOSw2NF0pXG4gICAgICAgICAgZXhwZWN0KHJlc3VsdFswXS5saW5lKS50b0VxdWFsKDIpXG5cbiAgICAgIGRlc2NyaWJlICdzdWNjZXNzaXZlIHNlYXJjaGVzJywgLT5cbiAgICAgICAgaXQgJ3JldHVybnMgYSByZXN1bHQgZm9yIGVhY2ggbWF0Y2ggYW5kIHRoZW4gdW5kZWZpbmVkJywgLT5cbiAgICAgICAgICBkb1NlYXJjaCA9IC0+XG4gICAgICAgICAgICByZXN1bHQgPSBzY2FubmVyLnNlYXJjaCh0ZXh0LCByZXN1bHQubGFzdEluZGV4KVxuXG4gICAgICAgICAgZXhwZWN0KGRvU2VhcmNoKCkpLnRvQmVEZWZpbmVkKClcbiAgICAgICAgICBleHBlY3QoZG9TZWFyY2goKSkudG9CZURlZmluZWQoKVxuICAgICAgICAgIGV4cGVjdChkb1NlYXJjaCgpKS50b0JlRGVmaW5lZCgpXG4gICAgICAgICAgZXhwZWN0KGRvU2VhcmNoKCkpLnRvQmVVbmRlZmluZWQoKVxuXG4gICAgd2l0aFNjYW5uZXJGb3JUZXh0RWRpdG9yICdpbmNvbXBsZXRlLXN0eWx1cy1oYXNoLnN0eWwnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICByZXN1bHQgPSBzY2FubmVyLnNlYXJjaCh0ZXh0KVxuXG4gICAgICBpdCAnZG9lcyBub3QgZmluZCBhbnkgdmFyaWFibGVzJywgLT5cbiAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZVVuZGVmaW5lZCgpXG5cbiAgICB3aXRoU2Nhbm5lckZvclRleHRFZGl0b3IgJ3ZhcmlhYmxlcy1pbi1hcmd1bWVudHMuc2NzcycsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHJlc3VsdCA9IHNjYW5uZXIuc2VhcmNoKHRleHQpXG5cbiAgICAgIGl0ICdkb2VzIG5vdCBmaW5kIGFueSB2YXJpYWJsZXMnLCAtPlxuICAgICAgICBleHBlY3QocmVzdWx0KS50b0JlVW5kZWZpbmVkKClcblxuICAgIHdpdGhTY2FubmVyRm9yVGV4dEVkaXRvciAnYXR0cmlidXRlLXNlbGVjdG9ycy5zY3NzJywgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgcmVzdWx0ID0gc2Nhbm5lci5zZWFyY2godGV4dClcblxuICAgICAgaXQgJ2RvZXMgbm90IGZpbmQgYW55IHZhcmlhYmxlcycsIC0+XG4gICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmVVbmRlZmluZWQoKVxuXG4gICAgd2l0aFNjYW5uZXJGb3JUZXh0RWRpdG9yICd2YXJpYWJsZXMtaW4tY29uZGl0aW9ucy5zY3NzJywgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgcmVzdWx0ID0gbnVsbFxuICAgICAgICBkb1NlYXJjaCA9IC0+IHJlc3VsdCA9IHNjYW5uZXIuc2VhcmNoKHRleHQsIHJlc3VsdD8ubGFzdEluZGV4KVxuXG4gICAgICAgIGRvU2VhcmNoKClcbiAgICAgICAgZG9TZWFyY2goKVxuXG4gICAgICBpdCAnZG9lcyBub3QgZmluZCB0aGUgdmFyaWFibGUgaW4gdGhlIGlmIGNsYXVzZScsIC0+XG4gICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmVVbmRlZmluZWQoKVxuXG4gICAgd2l0aFNjYW5uZXJGb3JUZXh0RWRpdG9yICd2YXJpYWJsZXMtYWZ0ZXItbWl4aW5zLnNjc3MnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICByZXN1bHQgPSBudWxsXG4gICAgICAgIGRvU2VhcmNoID0gLT4gcmVzdWx0ID0gc2Nhbm5lci5zZWFyY2godGV4dCwgcmVzdWx0Py5sYXN0SW5kZXgpXG5cbiAgICAgICAgZG9TZWFyY2goKVxuXG4gICAgICBpdCAnZmluZHMgdGhlIHZhcmlhYmxlIGFmdGVyIHRoZSBtaXhpbicsIC0+XG4gICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmVEZWZpbmVkKClcblxuICAgIHdpdGhTY2FubmVyRm9yVGV4dEVkaXRvciAndmFyaWFibGVzLWZyb20tb3RoZXItcHJvY2Vzcy5sZXNzJywgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgcmVzdWx0ID0gbnVsbFxuICAgICAgICBkb1NlYXJjaCA9IC0+IHJlc3VsdCA9IHNjYW5uZXIuc2VhcmNoKHRleHQsIHJlc3VsdD8ubGFzdEluZGV4KVxuXG4gICAgICAgIGRvU2VhcmNoKClcblxuICAgICAgaXQgJ2ZpbmRzIHRoZSB2YXJpYWJsZSB3aXRoIGFuIGludGVycG9sYXRpb24gdGFnJywgLT5cbiAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZURlZmluZWQoKVxuXG4gICAgd2l0aFNjYW5uZXJGb3JUZXh0RWRpdG9yICdjcmxmLnN0eWwnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICByZXN1bHQgPSBudWxsXG4gICAgICAgIGRvU2VhcmNoID0gLT4gcmVzdWx0ID0gc2Nhbm5lci5zZWFyY2godGV4dCwgcmVzdWx0Py5sYXN0SW5kZXgpXG5cbiAgICAgICAgZG9TZWFyY2goKVxuICAgICAgICBkb1NlYXJjaCgpXG5cbiAgICAgIGl0ICdmaW5kcyBhbGwgdGhlIHZhcmlhYmxlcyBldmVuIHdpdGggY3JsZiBtb2RlJywgLT5cbiAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZURlZmluZWQoKVxuIl19
