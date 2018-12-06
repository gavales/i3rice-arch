(function() {
  var ColorContext, ColorScanner, registry;

  ColorScanner = require('../lib/color-scanner');

  ColorContext = require('../lib/color-context');

  registry = require('../lib/color-expressions');

  describe('ColorScanner', function() {
    var editor, lastIndex, ref, result, scanner, text, withScannerForString, withScannerForTextEditor, withTextEditor;
    ref = [], scanner = ref[0], editor = ref[1], text = ref[2], result = ref[3], lastIndex = ref[4];
    withScannerForString = function(string, block) {
      return describe("with '" + (string.replace(/#/g, '+')) + "'", function() {
        beforeEach(function() {
          var context;
          text = string;
          context = new ColorContext({
            registry: registry
          });
          return scanner = new ColorScanner({
            context: context
          });
        });
        afterEach(function() {
          return scanner = null;
        });
        return block();
      });
    };
    withTextEditor = function(fixture, block) {
      return describe("with " + fixture + " buffer", function() {
        beforeEach(function() {
          waitsForPromise(function() {
            return atom.workspace.open(fixture);
          });
          return runs(function() {
            editor = atom.workspace.getActiveTextEditor();
            return text = editor.getText();
          });
        });
        afterEach(function() {
          return editor = null;
        });
        return block();
      });
    };
    withScannerForTextEditor = function(fixture, block) {
      return withTextEditor(fixture, function() {
        beforeEach(function() {
          var context;
          context = new ColorContext({
            registry: registry
          });
          return scanner = new ColorScanner({
            context: context
          });
        });
        afterEach(function() {
          return scanner = null;
        });
        return block();
      });
    };
    return describe('::search', function() {
      withScannerForTextEditor('html-entities.html', function() {
        beforeEach(function() {
          return result = scanner.search(text, 'html');
        });
        return it('returns nothing', function() {
          return expect(result).toBeUndefined();
        });
      });
      withScannerForTextEditor('css-color-with-prefix.less', function() {
        beforeEach(function() {
          return result = scanner.search(text, 'less');
        });
        return it('returns nothing', function() {
          return expect(result).toBeUndefined();
        });
      });
      withScannerForTextEditor('four-variables.styl', function() {
        beforeEach(function() {
          return result = scanner.search(text, 'styl');
        });
        it('returns the first buffer color match', function() {
          return expect(result).toBeDefined();
        });
        describe('the resulting buffer color', function() {
          it('has a text range', function() {
            return expect(result.range).toEqual([13, 17]);
          });
          it('has a color', function() {
            return expect(result.color).toBeColor('#ffffff');
          });
          it('stores the matched text', function() {
            return expect(result.match).toEqual('#fff');
          });
          it('stores the last index', function() {
            return expect(result.lastIndex).toEqual(17);
          });
          return it('stores match line', function() {
            return expect(result.line).toEqual(0);
          });
        });
        return describe('successive searches', function() {
          it('returns a buffer color for each match and then undefined', function() {
            var doSearch;
            doSearch = function() {
              return result = scanner.search(text, 'styl', result.lastIndex);
            };
            expect(doSearch()).toBeDefined();
            expect(doSearch()).toBeDefined();
            expect(doSearch()).toBeDefined();
            return expect(doSearch()).toBeUndefined();
          });
          return it('stores the line of successive matches', function() {
            var doSearch;
            doSearch = function() {
              return result = scanner.search(text, 'styl', result.lastIndex);
            };
            expect(doSearch().line).toEqual(2);
            expect(doSearch().line).toEqual(4);
            return expect(doSearch().line).toEqual(6);
          });
        });
      });
      withScannerForTextEditor('class-after-color.sass', function() {
        beforeEach(function() {
          return result = scanner.search(text, 'sass');
        });
        it('returns the first buffer color match', function() {
          return expect(result).toBeDefined();
        });
        return describe('the resulting buffer color', function() {
          it('has a text range', function() {
            return expect(result.range).toEqual([15, 20]);
          });
          return it('has a color', function() {
            return expect(result.color).toBeColor('#ffffff');
          });
        });
      });
      withScannerForTextEditor('project/styles/variables.styl', function() {
        beforeEach(function() {
          return result = scanner.search(text, 'styl');
        });
        it('returns the first buffer color match', function() {
          return expect(result).toBeDefined();
        });
        return describe('the resulting buffer color', function() {
          it('has a text range', function() {
            return expect(result.range).toEqual([18, 25]);
          });
          return it('has a color', function() {
            return expect(result.color).toBeColor('#BF616A');
          });
        });
      });
      withScannerForTextEditor('crlf.styl', function() {
        beforeEach(function() {
          return result = scanner.search(text, 'styl');
        });
        it('returns the first buffer color match', function() {
          return expect(result).toBeDefined();
        });
        describe('the resulting buffer color', function() {
          it('has a text range', function() {
            return expect(result.range).toEqual([7, 11]);
          });
          return it('has a color', function() {
            return expect(result.color).toBeColor('#ffffff');
          });
        });
        return it('finds the second color', function() {
          var doSearch;
          doSearch = function() {
            return result = scanner.search(text, 'styl', result.lastIndex);
          };
          doSearch();
          return expect(result.color).toBeDefined();
        });
      });
      withScannerForTextEditor('color-in-tag-content.html', function() {
        return it('finds both colors', function() {
          var doSearch;
          result = {
            lastIndex: 0
          };
          doSearch = function() {
            return result = scanner.search(text, 'css', result.lastIndex);
          };
          expect(doSearch()).toBeDefined();
          expect(doSearch()).toBeDefined();
          return expect(doSearch()).toBeUndefined();
        });
      });
      withScannerForString('#add-something {}, #acedbe-foo {}, #acedbeef-foo {}', function() {
        return it('does not find any matches', function() {
          var doSearch;
          result = {
            lastIndex: 0
          };
          doSearch = function() {
            return result = scanner.search(text, 'css', result.lastIndex);
          };
          return expect(doSearch()).toBeUndefined();
        });
      });
      return withScannerForString('#add_something {}, #acedbe_foo {}, #acedbeef_foo {}', function() {
        return it('does not find any matches', function() {
          var doSearch;
          result = {
            lastIndex: 0
          };
          doSearch = function() {
            return result = scanner.search(text, 'css', result.lastIndex);
          };
          return expect(doSearch()).toBeUndefined();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9waWdtZW50cy9zcGVjL2NvbG9yLXNjYW5uZXItc3BlYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLFlBQUEsR0FBZSxPQUFBLENBQVEsc0JBQVI7O0VBQ2YsWUFBQSxHQUFlLE9BQUEsQ0FBUSxzQkFBUjs7RUFDZixRQUFBLEdBQVcsT0FBQSxDQUFRLDBCQUFSOztFQUVYLFFBQUEsQ0FBUyxjQUFULEVBQXlCLFNBQUE7QUFDdkIsUUFBQTtJQUFBLE1BQTZDLEVBQTdDLEVBQUMsZ0JBQUQsRUFBVSxlQUFWLEVBQWtCLGFBQWxCLEVBQXdCLGVBQXhCLEVBQWdDO0lBRWhDLG9CQUFBLEdBQXVCLFNBQUMsTUFBRCxFQUFTLEtBQVQ7YUFDckIsUUFBQSxDQUFTLFFBQUEsR0FBUSxDQUFDLE1BQU0sQ0FBQyxPQUFQLENBQWUsSUFBZixFQUFxQixHQUFyQixDQUFELENBQVIsR0FBbUMsR0FBNUMsRUFBZ0QsU0FBQTtRQUM5QyxVQUFBLENBQVcsU0FBQTtBQUNULGNBQUE7VUFBQSxJQUFBLEdBQU87VUFDUCxPQUFBLEdBQVUsSUFBSSxZQUFKLENBQWlCO1lBQUMsVUFBQSxRQUFEO1dBQWpCO2lCQUNWLE9BQUEsR0FBVSxJQUFJLFlBQUosQ0FBaUI7WUFBQyxTQUFBLE9BQUQ7V0FBakI7UUFIRCxDQUFYO1FBS0EsU0FBQSxDQUFVLFNBQUE7aUJBQUcsT0FBQSxHQUFVO1FBQWIsQ0FBVjtlQUVHLEtBQUgsQ0FBQTtNQVI4QyxDQUFoRDtJQURxQjtJQVd2QixjQUFBLEdBQWlCLFNBQUMsT0FBRCxFQUFVLEtBQVY7YUFDZixRQUFBLENBQVMsT0FBQSxHQUFRLE9BQVIsR0FBZ0IsU0FBekIsRUFBbUMsU0FBQTtRQUNqQyxVQUFBLENBQVcsU0FBQTtVQUNULGVBQUEsQ0FBZ0IsU0FBQTttQkFBRyxJQUFJLENBQUMsU0FBUyxD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WCxNQUFBLENBQU8sUUFBQSxDQUFBLENBQVAsQ0FBa0IsQ0FBQyxXQUFuQixDQUFBO1VBQ0EsTUFBQSxDQUFPLFFBQUEsQ0FBQSxDQUFQLENBQWtCLENBQUMsV0FBbkIsQ0FBQTtpQkFDQSxNQUFBLENBQU8sUUFBQSxDQUFBLENBQVAsQ0FBa0IsQ0FBQyxhQUFuQixDQUFBO1FBTnNCLENBQXhCO01BRG9ELENBQXREO01BU0Esb0JBQUEsQ0FBcUIscURBQXJCLEVBQTRFLFNBQUE7ZUFDMUUsRUFBQSxDQUFHLDJCQUFILEVBQWdDLFNBQUE7QUFDOUIsY0FBQTtVQUFBLE1BQUEsR0FBUztZQUFBLFNBQUEsRUFBVyxDQUFYOztVQUNULFFBQUEsR0FBVyxTQUFBO21CQUFHLE1BQUEsR0FBUyxPQUFPLENBQUMsTUFBUixDQUFlLElBQWYsRUFBcUIsS0FBckIsRUFBNEIsTUFBTSxDQUFDLFNBQW5DO1VBQVo7aUJBRVgsTUFBQSxDQUFPLFFBQUEsQ0FBQSxDQUFQLENBQWtCLENBQUMsYUFBbkIsQ0FBQTtRQUo4QixDQUFoQztNQUQwRSxDQUE1RTthQU9BLG9CQUFBLENBQXFCLHFEQUFyQixFQUE0RSxTQUFBO2VBQzFFLEVBQUEsQ0FBRywyQkFBSCxFQUFnQyxTQUFBO0FBQzlCLGNBQUE7VUFBQSxNQUFBLEdBQVM7WUFBQSxTQUFBLEVBQVcsQ0FBWDs7VUFDVCxRQUFBLEdBQVcsU0FBQTttQkFBRyxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSxJQUFmLEVBQXFCLEtBQXJCLEVBQTRCLE1BQU0sQ0FBQyxTQUFuQztVQUFaO2lCQUVYLE1BQUEsQ0FBTyxRQUFBLENBQUEsQ0FBUCxDQUFrQixDQUFDLGFBQW5CLENBQUE7UUFKOEIsQ0FBaEM7TUFEMEUsQ0FBNUU7SUF2SG1CLENBQXJCO0VBcEN1QixDQUF6QjtBQUpBIiwic291cmNlc0NvbnRlbnQiOlsiQ29sb3JTY2FubmVyID0gcmVxdWlyZSAnLi4vbGliL2NvbG9yLXNjYW5uZXInXG5Db2xvckNvbnRleHQgPSByZXF1aXJlICcuLi9saWIvY29sb3ItY29udGV4dCdcbnJlZ2lzdHJ5ID0gcmVxdWlyZSAnLi4vbGliL2NvbG9yLWV4cHJlc3Npb25zJ1xuXG5kZXNjcmliZSAnQ29sb3JTY2FubmVyJywgLT5cbiAgW3NjYW5uZXIsIGVkaXRvciwgdGV4dCwgcmVzdWx0LCBsYXN0SW5kZXhdID0gW11cblxuICB3aXRoU2Nhbm5lckZvclN0cmluZyA9IChzdHJpbmcsIGJsb2NrKSAtPlxuICAgIGRlc2NyaWJlIFwid2l0aCAnI3tzdHJpbmcucmVwbGFjZSgvIy9nLCAnKycpfSdcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgdGV4dCA9IHN0cmluZ1xuICAgICAgICBjb250ZXh0ID0gbmV3IENvbG9yQ29udGV4dCh7cmVnaXN0cnl9KVxuICAgICAgICBzY2FubmVyID0gbmV3IENvbG9yU2Nhbm5lcih7Y29udGV4dH0pXG5cbiAgICAgIGFmdGVyRWFjaCAtPiBzY2FubmVyID0gbnVsbFxuXG4gICAgICBkbyBibG9ja1xuXG4gIHdpdGhUZXh0RWRpdG9yID0gKGZpeHR1cmUsIGJsb2NrKSAtPlxuICAgIGRlc2NyaWJlIFwid2l0aCAje2ZpeHR1cmV9IGJ1ZmZlclwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICB3YWl0c0ZvclByb21pc2UgLT4gYXRvbS53b3Jrc3BhY2Uub3BlbihmaXh0dXJlKVxuICAgICAgICBydW5zIC0+XG4gICAgICAgICAgZWRpdG9yID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpXG4gICAgICAgICAgdGV4dCA9IGVkaXRvci5nZXRUZXh0KClcblxuICAgICAgYWZ0ZXJFYWNoIC0+IGVkaXRvciA9IG51bGxcblxuICAgICAgZG8gYmxvY2tcblxuICB3aXRoU2Nhbm5lckZvclRleHRFZGl0b3IgPSAoZml4dHVyZSwgYmxvY2spIC0+XG4gICAgd2l0aFRleHRFZGl0b3IgZml4dHVyZSwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgY29udGV4dCA9IG5ldyBDb2xvckNvbnRleHQoe3JlZ2lzdHJ5fSlcbiAgICAgICAgc2Nhbm5lciA9IG5ldyBDb2xvclNjYW5uZXIoe2NvbnRleHR9KVxuXG4gICAgICBhZnRlckVhY2ggLT4gc2Nhbm5lciA9IG51bGxcblxuICAgICAgZG8gYmxvY2tcblxuICBkZXNjcmliZSAnOjpzZWFyY2gnLCAtPlxuICAgIHdpdGhTY2FubmVyRm9yVGV4dEVkaXRvciAnaHRtbC1lbnRpdGllcy5odG1sJywgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgcmVzdWx0ID0gc2Nhbm5lci5zZWFyY2godGV4dCwgJ2h0bWwnKVxuXG4gICAgICBpdCAncmV0dXJucyBub3RoaW5nJywgLT5cbiAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZVVuZGVmaW5lZCgpXG5cbiAgICB3aXRoU2Nhbm5lckZvclRleHRFZGl0b3IgJ2Nzcy1jb2xvci13aXRoLXByZWZpeC5sZXNzJywgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgcmVzdWx0ID0gc2Nhbm5lci5zZWFyY2godGV4dCwgJ2xlc3MnKVxuXG4gICAgICBpdCAncmV0dXJucyBub3RoaW5nJywgLT5cbiAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZVVuZGVmaW5lZCgpXG5cbiAgICB3aXRoU2Nhbm5lckZvclRleHRFZGl0b3IgJ2ZvdXItdmFyaWFibGVzLnN0eWwnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICByZXN1bHQgPSBzY2FubmVyLnNlYXJjaCh0ZXh0LCAnc3R5bCcpXG5cbiAgICAgIGl0ICdyZXR1cm5zIHRoZSBmaXJzdCBidWZmZXIgY29sb3IgbWF0Y2gnLCAtPlxuICAgICAgICBleHBlY3QocmVzdWx0KS50b0JlRGVmaW5lZCgpXG5cbiAgICAgIGRlc2NyaWJlICd0aGUgcmVzdWx0aW5nIGJ1ZmZlciBjb2xvcicsIC0+XG4gICAgICAgIGl0ICdoYXMgYSB0ZXh0IHJhbmdlJywgLT5cbiAgICAgICAgICBleHBlY3QocmVzdWx0LnJhbmdlKS50b0VxdWFsKFsxMywxN10pXG5cbiAgICAgICAgaXQgJ2hhcyBhIGNvbG9yJywgLT5cbiAgICAgICAgICBleHBlY3QocmVzdWx0LmNvbG9yKS50b0JlQ29sb3IoJyNmZmZmZmYnKVxuXG4gICAgICAgIGl0ICdzdG9yZXMgdGhlIG1hdGNoZWQgdGV4dCcsIC0+XG4gICAgICAgICAgZXhwZWN0KHJlc3VsdC5tYXRjaCkudG9FcXVhbCgnI2ZmZicpXG5cbiAgICAgICAgaXQgJ3N0b3JlcyB0aGUgbGFzdCBpbmRleCcsIC0+XG4gICAgICAgICAgZXhwZWN0KHJlc3VsdC5sYXN0SW5kZXgpLnRvRXF1YWwoMTcpXG5cbiAgICAgICAgaXQgJ3N0b3JlcyBtYXRjaCBsaW5lJywgLT5cbiAgICAgICAgICBleHBlY3QocmVzdWx0LmxpbmUpLnRvRXF1YWwoMClcblxuICAgICAgZGVzY3JpYmUgJ3N1Y2Nlc3NpdmUgc2VhcmNoZXMnLCAtPlxuICAgICAgICBpdCAncmV0dXJucyBhIGJ1ZmZlciBjb2xvciBmb3IgZWFjaCBtYXRjaCBhbmQgdGhlbiB1bmRlZmluZWQnLCAtPlxuICAgICAgICAgIGRvU2VhcmNoID0gLT4gcmVzdWx0ID0gc2Nhbm5lci5zZWFyY2godGV4dCwgJ3N0eWwnLCByZXN1bHQubGFzdEluZGV4KVxuXG4gICAgICAgICAgZXhwZWN0KGRvU2VhcmNoKCkpLnRvQmVEZWZpbmVkKClcbiAgICAgICAgICBleHBlY3QoZG9TZWFyY2goKSkudG9CZURlZmluZWQoKVxuICAgICAgICAgIGV4cGVjdChkb1NlYXJjaCgpKS50b0JlRGVmaW5lZCgpXG4gICAgICAgICAgZXhwZWN0KGRvU2VhcmNoKCkpLnRvQmVVbmRlZmluZWQoKVxuXG4gICAgICAgIGl0ICdzdG9yZXMgdGhlIGxpbmUgb2Ygc3VjY2Vzc2l2ZSBtYXRjaGVzJywgLT5cbiAgICAgICAgICBkb1NlYXJjaCA9IC0+IHJlc3VsdCA9IHNjYW5uZXIuc2VhcmNoKHRleHQsICdzdHlsJywgcmVzdWx0Lmxhc3RJbmRleClcblxuICAgICAgICAgIGV4cGVjdChkb1NlYXJjaCgpLmxpbmUpLnRvRXF1YWwoMilcbiAgICAgICAgICBleHBlY3QoZG9TZWFyY2goKS5saW5lKS50b0VxdWFsKDQpXG4gICAgICAgICAgZXhwZWN0KGRvU2VhcmNoKCkubGluZSkudG9FcXVhbCg2KVxuXG4gICAgd2l0aFNjYW5uZXJGb3JUZXh0RWRpdG9yICdjbGFzcy1hZnRlci1jb2xvci5zYXNzJywgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgcmVzdWx0ID0gc2Nhbm5lci5zZWFyY2godGV4dCwgJ3Nhc3MnKVxuXG4gICAgICBpdCAncmV0dXJucyB0aGUgZmlyc3QgYnVmZmVyIGNvbG9yIG1hdGNoJywgLT5cbiAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZURlZmluZWQoKVxuXG4gICAgICBkZXNjcmliZSAndGhlIHJlc3VsdGluZyBidWZmZXIgY29sb3InLCAtPlxuICAgICAgICBpdCAnaGFzIGEgdGV4dCByYW5nZScsIC0+XG4gICAgICAgICAgZXhwZWN0KHJlc3VsdC5yYW5nZSkudG9FcXVhbChbMTUsMjBdKVxuXG4gICAgICAgIGl0ICdoYXMgYSBjb2xvcicsIC0+XG4gICAgICAgICAgZXhwZWN0KHJlc3VsdC5jb2xvcikudG9CZUNvbG9yKCcjZmZmZmZmJylcblxuICAgIHdpdGhTY2FubmVyRm9yVGV4dEVkaXRvciAncHJvamVjdC9zdHlsZXMvdmFyaWFibGVzLnN0eWwnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICByZXN1bHQgPSBzY2FubmVyLnNlYXJjaCh0ZXh0LCAnc3R5bCcpXG5cbiAgICAgIGl0ICdyZXR1cm5zIHRoZSBmaXJzdCBidWZmZXIgY29sb3IgbWF0Y2gnLCAtPlxuICAgICAgICBleHBlY3QocmVzdWx0KS50b0JlRGVmaW5lZCgpXG5cbiAgICAgIGRlc2NyaWJlICd0aGUgcmVzdWx0aW5nIGJ1ZmZlciBjb2xvcicsIC0+XG4gICAgICAgIGl0ICdoYXMgYSB0ZXh0IHJhbmdlJywgLT5cbiAgICAgICAgICBleHBlY3QocmVzdWx0LnJhbmdlKS50b0VxdWFsKFsxOCwyNV0pXG5cbiAgICAgICAgaXQgJ2hhcyBhIGNvbG9yJywgLT5cbiAgICAgICAgICBleHBlY3QocmVzdWx0LmNvbG9yKS50b0JlQ29sb3IoJyNCRjYxNkEnKVxuXG4gICAgd2l0aFNjYW5uZXJGb3JUZXh0RWRpdG9yICdjcmxmLnN0eWwnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICByZXN1bHQgPSBzY2FubmVyLnNlYXJjaCh0ZXh0LCAnc3R5bCcpXG5cbiAgICAgIGl0ICdyZXR1cm5zIHRoZSBmaXJzdCBidWZmZXIgY29sb3IgbWF0Y2gnLCAtPlxuICAgICAgICBleHBlY3QocmVzdWx0KS50b0JlRGVmaW5lZCgpXG5cbiAgICAgIGRlc2NyaWJlICd0aGUgcmVzdWx0aW5nIGJ1ZmZlciBjb2xvcicsIC0+XG4gICAgICAgIGl0ICdoYXMgYSB0ZXh0IHJhbmdlJywgLT5cbiAgICAgICAgICBleHBlY3QocmVzdWx0LnJhbmdlKS50b0VxdWFsKFs3LDExXSlcblxuICAgICAgICBpdCAnaGFzIGEgY29sb3InLCAtPlxuICAgICAgICAgIGV4cGVjdChyZXN1bHQuY29sb3IpLnRvQmVDb2xvcignI2ZmZmZmZicpXG5cbiAgICAgIGl0ICdmaW5kcyB0aGUgc2Vjb25kIGNvbG9yJywgLT5cbiAgICAgICAgZG9TZWFyY2ggPSAtPiByZXN1bHQgPSBzY2FubmVyLnNlYXJjaCh0ZXh0LCAnc3R5bCcsIHJlc3VsdC5sYXN0SW5kZXgpXG5cbiAgICAgICAgZG9TZWFyY2goKVxuXG4gICAgICAgIGV4cGVjdChyZXN1bHQuY29sb3IpLnRvQmVEZWZpbmVkKClcblxuICAgIHdpdGhTY2FubmVyRm9yVGV4dEVkaXRvciAnY29sb3ItaW4tdGFnLWNvbnRlbnQuaHRtbCcsIC0+XG4gICAgICBpdCAnZmluZHMgYm90aCBjb2xvcnMnLCAtPlxuICAgICAgICByZXN1bHQgPSBsYXN0SW5kZXg6IDBcbiAgICAgICAgZG9TZWFyY2ggPSAtPiByZXN1bHQgPSBzY2FubmVyLnNlYXJjaCh0ZXh0LCAnY3NzJywgcmVzdWx0Lmxhc3RJbmRleClcblxuICAgICAgICBleHBlY3QoZG9TZWFyY2goKSkudG9CZURlZmluZWQoKVxuICAgICAgICBleHBlY3QoZG9TZWFyY2goKSkudG9CZURlZmluZWQoKVxuICAgICAgICBleHBlY3QoZG9TZWFyY2goKSkudG9CZVVuZGVmaW5lZCgpXG5cbiAgICB3aXRoU2Nhbm5lckZvclN0cmluZyAnI2FkZC1zb21ldGhpbmcge30sICNhY2VkYmUtZm9vIHt9LCAjYWNlZGJlZWYtZm9vIHt9JywgLT5cbiAgICAgIGl0ICdkb2VzIG5vdCBmaW5kIGFueSBtYXRjaGVzJywgLT5cbiAgICAgICAgcmVzdWx0ID0gbGFzdEluZGV4OiAwXG4gICAgICAgIGRvU2VhcmNoID0gLT4gcmVzdWx0ID0gc2Nhbm5lci5zZWFyY2godGV4dCwgJ2NzcycsIHJlc3VsdC5sYXN0SW5kZXgpXG5cbiAgICAgICAgZXhwZWN0KGRvU2VhcmNoKCkpLnRvQmVVbmRlZmluZWQoKVxuXG4gICAgd2l0aFNjYW5uZXJGb3JTdHJpbmcgJyNhZGRfc29tZXRoaW5nIHt9LCAjYWNlZGJlX2ZvbyB7fSwgI2FjZWRiZWVmX2ZvbyB7fScsIC0+XG4gICAgICBpdCAnZG9lcyBub3QgZmluZCBhbnkgbWF0Y2hlcycsIC0+XG4gICAgICAgIHJlc3VsdCA9IGxhc3RJbmRleDogMFxuICAgICAgICBkb1NlYXJjaCA9IC0+IHJlc3VsdCA9IHNjYW5uZXIuc2VhcmNoKHRleHQsICdjc3MnLCByZXN1bHQubGFzdEluZGV4KVxuXG4gICAgICAgIGV4cGVjdChkb1NlYXJjaCgpKS50b0JlVW5kZWZpbmVkKClcbiJdfQ==
