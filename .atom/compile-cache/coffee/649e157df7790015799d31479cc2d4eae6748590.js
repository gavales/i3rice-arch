(function() {
  var VariableParser, registry;

  VariableParser = require('../lib/variable-parser');

  registry = require('../lib/variable-expressions');

  describe('VariableParser', function() {
    var itParses, parser;
    parser = [][0];
    itParses = function(expression) {
      return {
        as: function(variables) {
          it("parses '" + expression + "' as variables " + (jasmine.pp(variables)), function() {
            var expected, i, len, name, range, ref, results, results1, value;
            results = parser.parse(expression);
            expect(results.length).toEqual(Object.keys(variables).length);
            results1 = [];
            for (i = 0, len = results.length; i < len; i++) {
              ref = results[i], name = ref.name, value = ref.value, range = ref.range;
              expected = variables[name];
              if (expected.value != null) {
                results1.push(expect(value).toEqual(expected.value));
              } else if (expected.range != null) {
                results1.push(expect(range).toEqual(expected.range));
              } else {
                results1.push(expect(value).toEqual(expected));
              }
            }
            return results1;
          });
          return this;
        },
        asDefault: function(variables) {
          it("parses '" + expression + "' as default variables " + (jasmine.pp(variables)), function() {
            var expected, i, isDefault, len, name, range, ref, results, results1, value;
            results = parser.parse(expression);
            expect(results.length).toEqual(Object.keys(variables).length);
            results1 = [];
            for (i = 0, len = results.length; i < len; i++) {
              ref = results[i], name = ref.name, value = ref.value, range = ref.range, isDefault = ref["default"];
              expected = variables[name];
              expect(isDefault).toBeTruthy();
              if (expected.value != null) {
                results1.push(expect(value).toEqual(expected.value));
              } else if (expected.range != null) {
                results1.push(expect(range).toEqual(expected.range));
              } else {
                results1.push(expect(value).toEqual(expected));
              }
            }
            return results1;
          });
          return this;
        },
        asUndefined: function() {
          return it("does not parse '" + expression + "' as a variable expression", function() {
            var results;
            results = parser.parse(expression);
            return expect(results).toBeUndefined();
          });
        }
      };
    };
    beforeEach(function() {
      return parser = new VariableParser(registry);
    });
    itParses('color = white').as({
      'color': 'white'
    });
    itParses('non-color = 10px').as({
      'non-color': '10px'
    });
    itParses('$color: white').as({
      '$color': 'white'
    });
    itParses('$color: white !default').asDefault({
      '$color': 'white'
    });
    itParses('$color: white // foo').as({
      '$color': 'white'
    });
    itParses('$color  : white').as({
      '$color': 'white'
    });
    itParses('$some-color: white;').as({
      '$some-color': 'white',
      '$some_color': 'white'
    });
    itParses('$some_color  : white').as({
      '$some-color': 'white',
      '$some_color': 'white'
    });
    itParses('$non-color: 10px;').as({
      '$non-color': '10px',
      '$non_color': '10px'
    });
    itParses('$non_color: 10px').as({
      '$non-color': '10px',
      '$non_color': '10px'
    });
    itParses('@color: white;').as({
      '@color': 'white'
    });
    itParses('@non-color: 10px;').as({
      '@non-color': '10px'
    });
    itParses('@non--color: 10px;').as({
      '@non--color': '10px'
    });
    itParses('--color: white;').as({
      'var(--color)': 'white'
    });
    itParses('--non-color: 10px;').as({
      'var(--non-color)': '10px'
    });
    itParses('\\definecolor{orange}{gray}{1}').as({
      '{orange}': 'gray(100%)'
    });
    itParses('\\definecolor{orange}{RGB}{255,127,0}').as({
      '{orange}': 'rgb(255,127,0)'
    });
    itParses('\\definecolor{orange}{rgb}{1,0.5,0}').as({
      '{orange}': 'rgb(255,127,0)'
    });
    itParses('\\definecolor{orange}{cmyk}{0,0.5,1,0}').as({
      '{orange}': 'cmyk(0,0.5,1,0)'
    });
    itParses('\\definecolor{orange}{HTML}{FF7F00}').as({
      '{orange}': '#FF7F00'
    });
    itParses('\\definecolor{darkgreen}{blue!20!black!30!green}').as({
      '{darkgreen}': '{blue!20!black!30!green}'
    });
    itParses('\n.error--large(@color: red) {\n  background-color: @color;\n}').asUndefined();
    return itParses("colors = {\n  red: rgb(255,0,0),\n  green: rgb(0,255,0),\n  blue: rgb(0,0,255)\n  value: 10px\n  light: {\n    base: lightgrey\n  }\n  dark: {\n    base: slategrey\n  }\n}").as({
      'colors.red': {
        value: 'rgb(255,0,0)',
        range: [[1, 2], [1, 14]]
      },
      'colors.green': {
        value: 'rgb(0,255,0)',
        range: [[2, 2], [2, 16]]
      },
      'colors.blue': {
        value: 'rgb(0,0,255)',
        range: [[3, 2], [3, 15]]
      },
      'colors.value': {
        value: '10px',
        range: [[4, 2], [4, 13]]
      },
      'colors.light.base': {
        value: 'lightgrey',
        range: [[9, 4], [9, 17]]
      },
      'colors.dark.base': {
        value: 'slategrey',
        range: [[12, 4], [12, 14]]
      }
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9waWdtZW50cy9zcGVjL3ZhcmlhYmxlLXBhcnNlci1zcGVjLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsY0FBQSxHQUFpQixPQUFBLENBQVEsd0JBQVI7O0VBQ2pCLFFBQUEsR0FBVyxPQUFBLENBQVEsNkJBQVI7O0VBRVgsUUFBQSxDQUFTLGdCQUFULEVBQTJCLFNBQUE7QUFDekIsUUFBQTtJQUFDLFNBQVU7SUFFWCxRQUFBLEdBQVcsU0FBQyxVQUFEO2FBQ1Q7UUFBQSxFQUFBLEVBQUksU0FBQyxTQUFEO1VBQ0YsRUFBQSxDQUFHLFVBQUEsR0FBVyxVQUFYLEdBQXNCLGlCQUF0QixHQUFzQyxDQUFDLE9BQU8sQ0FBQyxFQUFSLENBQVcsU0FBWCxDQUFELENBQXpDLEVBQW1FLFNBQUE7QUFDakUsZ0JBQUE7WUFBQSxPQUFBLEdBQVUsTUFBTSxDQUFDLEtBQVAsQ0FBYSxVQUFiO1lBRVYsTUFBQSxDQUFPLE9BQU8sQ0FBQyxNQUFmLENBQXNCLENBQUMsT0FBdkIsQ0FBK0IsTUFBTSxDQUFDLElBQVAsQ0FBWSxTQUFaLENBQXNCLENBQUMsTUFBdEQ7QUFDQTtpQkFBQSx5Q0FBQTtnQ0FBSyxpQkFBTSxtQkFBTztjQUNoQixRQUFBLEdBQVcsU0FBVSxDQUFBLElBQUE7Y0FDckIsSUFBRyxzQkFBSDs4QkFDRSxNQUFBLENBQU8sS0FBUCxDQUFhLENBQUMsT0FBZCxDQUFzQixRQUFRLENBQUMsS0FBL0IsR0FERjtlQUFBLE1BRUssSUFBRyxzQkFBSDs4QkFDSCxNQUFBLENBQU8sS0FBUCxDQUFhLENBQUMsT0FBZCxDQUFzQixRQUFRLENBQUMsS0FBL0IsR0FERztlQUFBLE1BQUE7OEJBR0gsTUFBQSxDQUFPLEtBQVAsQ0FBYSxDQUFDLE9BQWQsQ0FBc0IsUUFBdEIsR0FIRzs7QUFKUDs7VUFKaUUsQ0FBbkU7aUJB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Q0FBRCxFQUFHLEVBQUgsQ0FBUixDQURQO09BRkk7TUFJTixjQUFBLEVBQ0U7UUFBQSxLQUFBLEVBQU8sY0FBUDtRQUNBLEtBQUEsRUFBTyxDQUFDLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBRCxFQUFRLENBQUMsQ0FBRCxFQUFHLEVBQUgsQ0FBUixDQURQO09BTEk7TUFPTixhQUFBLEVBQ0U7UUFBQSxLQUFBLEVBQU8sY0FBUDtRQUNBLEtBQUEsRUFBTyxDQUFDLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBRCxFQUFPLENBQUMsQ0FBRCxFQUFHLEVBQUgsQ0FBUCxDQURQO09BUkk7TUFVTixjQUFBLEVBQ0U7UUFBQSxLQUFBLEVBQU8sTUFBUDtRQUNBLEtBQUEsRUFBTyxDQUFDLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBRCxFQUFPLENBQUMsQ0FBRCxFQUFHLEVBQUgsQ0FBUCxDQURQO09BWEk7TUFhTixtQkFBQSxFQUNFO1FBQUEsS0FBQSxFQUFPLFdBQVA7UUFDQSxLQUFBLEVBQU8sQ0FBQyxDQUFDLENBQUQsRUFBRyxDQUFILENBQUQsRUFBTyxDQUFDLENBQUQsRUFBRyxFQUFILENBQVAsQ0FEUDtPQWRJO01BZ0JOLGtCQUFBLEVBQ0U7UUFBQSxLQUFBLEVBQU8sV0FBUDtRQUNBLEtBQUEsRUFBTyxDQUFDLENBQUMsRUFBRCxFQUFJLENBQUosQ0FBRCxFQUFRLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBUixDQURQO09BakJJO0tBYlI7RUF4R3lCLENBQTNCO0FBSEEiLCJzb3VyY2VzQ29udGVudCI6WyJWYXJpYWJsZVBhcnNlciA9IHJlcXVpcmUgJy4uL2xpYi92YXJpYWJsZS1wYXJzZXInXG5yZWdpc3RyeSA9IHJlcXVpcmUgJy4uL2xpYi92YXJpYWJsZS1leHByZXNzaW9ucydcblxuZGVzY3JpYmUgJ1ZhcmlhYmxlUGFyc2VyJywgLT5cbiAgW3BhcnNlcl0gPSBbXVxuXG4gIGl0UGFyc2VzID0gKGV4cHJlc3Npb24pIC0+XG4gICAgYXM6ICh2YXJpYWJsZXMpIC0+XG4gICAgICBpdCBcInBhcnNlcyAnI3tleHByZXNzaW9ufScgYXMgdmFyaWFibGVzICN7amFzbWluZS5wcCh2YXJpYWJsZXMpfVwiLCAtPlxuICAgICAgICByZXN1bHRzID0gcGFyc2VyLnBhcnNlKGV4cHJlc3Npb24pXG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdHMubGVuZ3RoKS50b0VxdWFsKE9iamVjdC5rZXlzKHZhcmlhYmxlcykubGVuZ3RoKVxuICAgICAgICBmb3Ige25hbWUsIHZhbHVlLCByYW5nZX0gaW4gcmVzdWx0c1xuICAgICAgICAgIGV4cGVjdGVkID0gdmFyaWFibGVzW25hbWVdXG4gICAgICAgICAgaWYgZXhwZWN0ZWQudmFsdWU/XG4gICAgICAgICAgICBleHBlY3QodmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWQudmFsdWUpXG4gICAgICAgICAgZWxzZSBpZiBleHBlY3RlZC5yYW5nZT9cbiAgICAgICAgICAgIGV4cGVjdChyYW5nZSkudG9FcXVhbChleHBlY3RlZC5yYW5nZSlcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBleHBlY3QodmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWQpXG5cbiAgICAgIHRoaXNcblxuICAgIGFzRGVmYXVsdDogKHZhcmlhYmxlcykgLT5cbiAgICAgIGl0IFwicGFyc2VzICcje2V4cHJlc3Npb259JyBhcyBkZWZhdWx0IHZhcmlhYmxlcyAje2phc21pbmUucHAodmFyaWFibGVzKX1cIiwgLT5cbiAgICAgICAgcmVzdWx0cyA9IHBhcnNlci5wYXJzZShleHByZXNzaW9uKVxuXG4gICAgICAgIGV4cGVjdChyZXN1bHRzLmxlbmd0aCkudG9FcXVhbChPYmplY3Qua2V5cyh2YXJpYWJsZXMpLmxlbmd0aClcbiAgICAgICAgZm9yIHtuYW1lLCB2YWx1ZSwgcmFuZ2UsIGRlZmF1bHQ6IGlzRGVmYXVsdH0gaW4gcmVzdWx0c1xuICAgICAgICAgIGV4cGVjdGVkID0gdmFyaWFibGVzW25hbWVdXG4gICAgICAgICAgZXhwZWN0KGlzRGVmYXVsdCkudG9CZVRydXRoeSgpXG4gICAgICAgICAgaWYgZXhwZWN0ZWQudmFsdWU/XG4gICAgICAgICAgICBleHBlY3QodmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWQudmFsdWUpXG4gICAgICAgICAgZWxzZSBpZiBleHBlY3RlZC5yYW5nZT9cbiAgICAgICAgICAgIGV4cGVjdChyYW5nZSkudG9FcXVhbChleHBlY3RlZC5yYW5nZSlcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBleHBlY3QodmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWQpXG5cbiAgICAgIHRoaXNcblxuXG4gICAgYXNVbmRlZmluZWQ6IC0+XG4gICAgICBpdCBcImRvZXMgbm90IHBhcnNlICcje2V4cHJlc3Npb259JyBhcyBhIHZhcmlhYmxlIGV4cHJlc3Npb25cIiwgLT5cbiAgICAgICAgcmVzdWx0cyA9IHBhcnNlci5wYXJzZShleHByZXNzaW9uKVxuXG4gICAgICAgIGV4cGVjdChyZXN1bHRzKS50b0JlVW5kZWZpbmVkKClcblxuICBiZWZvcmVFYWNoIC0+XG4gICAgcGFyc2VyID0gbmV3IFZhcmlhYmxlUGFyc2VyKHJlZ2lzdHJ5KVxuXG4gIGl0UGFyc2VzKCdjb2xvciA9IHdoaXRlJykuYXMoJ2NvbG9yJzogJ3doaXRlJylcbiAgaXRQYXJzZXMoJ25vbi1jb2xvciA9IDEwcHgnKS5hcygnbm9uLWNvbG9yJzogJzEwcHgnKVxuXG4gIGl0UGFyc2VzKCckY29sb3I6IHdoaXRlJykuYXMoJyRjb2xvcic6ICd3aGl0ZScpXG4gIGl0UGFyc2VzKCckY29sb3I6IHdoaXRlICFkZWZhdWx0JykuYXNEZWZhdWx0KCckY29sb3InOiAnd2hpdGUnKVxuICBpdFBhcnNlcygnJGNvbG9yOiB3aGl0ZSAvLyBmb28nKS5hcygnJGNvbG9yJzogJ3doaXRlJylcbiAgaXRQYXJzZXMoJyRjb2xvciAgOiB3aGl0ZScpLmFzKCckY29sb3InOiAnd2hpdGUnKVxuICBpdFBhcnNlcygnJHNvbWUtY29sb3I6IHdoaXRlOycpLmFzKHtcbiAgICAnJHNvbWUtY29sb3InOiAnd2hpdGUnXG4gICAgJyRzb21lX2NvbG9yJzogJ3doaXRlJ1xuICB9KVxuICBpdFBhcnNlcygnJHNvbWVfY29sb3IgIDogd2hpdGUnKS5hcyh7XG4gICAgJyRzb21lLWNvbG9yJzogJ3doaXRlJ1xuICAgICckc29tZV9jb2xvcic6ICd3aGl0ZSdcbiAgfSlcbiAgaXRQYXJzZXMoJyRub24tY29sb3I6IDEwcHg7JykuYXMoe1xuICAgICckbm9uLWNvbG9yJzogJzEwcHgnXG4gICAgJyRub25fY29sb3InOiAnMTBweCdcbiAgfSlcbiAgaXRQYXJzZXMoJyRub25fY29sb3I6IDEwcHgnKS5hcyh7XG4gICAgJyRub24tY29sb3InOiAnMTBweCdcbiAgICAnJG5vbl9jb2xvcic6ICcxMHB4J1xuICB9KVxuXG4gIGl0UGFyc2VzKCdAY29sb3I6IHdoaXRlOycpLmFzKCdAY29sb3InOiAnd2hpdGUnKVxuICBpdFBhcnNlcygnQG5vbi1jb2xvcjogMTBweDsnKS5hcygnQG5vbi1jb2xvcic6ICcxMHB4JylcbiAgaXRQYXJzZXMoJ0Bub24tLWNvbG9yOiAxMHB4OycpLmFzKCdAbm9uLS1jb2xvcic6ICcxMHB4JylcblxuICBpdFBhcnNlcygnLS1jb2xvcjogd2hpdGU7JykuYXMoJ3ZhcigtLWNvbG9yKSc6ICd3aGl0ZScpXG4gIGl0UGFyc2VzKCctLW5vbi1jb2xvcjogMTBweDsnKS5hcygndmFyKC0tbm9uLWNvbG9yKSc6ICcxMHB4JylcblxuICBpdFBhcnNlcygnXFxcXGRlZmluZWNvbG9ye29yYW5nZX17Z3JheX17MX0nKS5hcyh7XG4gICAgJ3tvcmFuZ2V9JzogJ2dyYXkoMTAwJSknXG4gIH0pXG5cbiAgaXRQYXJzZXMoJ1xcXFxkZWZpbmVjb2xvcntvcmFuZ2V9e1JHQn17MjU1LDEyNywwfScpLmFzKHtcbiAgICAne29yYW5nZX0nOiAncmdiKDI1NSwxMjcsMCknXG4gIH0pXG5cbiAgaXRQYXJzZXMoJ1xcXFxkZWZpbmVjb2xvcntvcmFuZ2V9e3JnYn17MSwwLjUsMH0nKS5hcyh7XG4gICAgJ3tvcmFuZ2V9JzogJ3JnYigyNTUsMTI3LDApJ1xuICB9KVxuXG4gIGl0UGFyc2VzKCdcXFxcZGVmaW5lY29sb3J7b3JhbmdlfXtjbXlrfXswLDAuNSwxLDB9JykuYXMoe1xuICAgICd7b3JhbmdlfSc6ICdjbXlrKDAsMC41LDEsMCknXG4gIH0pXG5cbiAgaXRQYXJzZXMoJ1xcXFxkZWZpbmVjb2xvcntvcmFuZ2V9e0hUTUx9e0ZGN0YwMH0nKS5hcyh7XG4gICAgJ3tvcmFuZ2V9JzogJyNGRjdGMDAnXG4gIH0pXG5cbiAgaXRQYXJzZXMoJ1xcXFxkZWZpbmVjb2xvcntkYXJrZ3JlZW59e2JsdWUhMjAhYmxhY2shMzAhZ3JlZW59JykuYXMoe1xuICAgICd7ZGFya2dyZWVufSc6ICd7Ymx1ZSEyMCFibGFjayEzMCFncmVlbn0nXG4gIH0pXG5cbiAgaXRQYXJzZXMoJ1xcbi5lcnJvci0tbGFyZ2UoQGNvbG9yOiByZWQpIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IEBjb2xvcjtcXG59JykuYXNVbmRlZmluZWQoKVxuXG4gIGl0UGFyc2VzKFwiXCJcIlxuICAgIGNvbG9ycyA9IHtcbiAgICAgIHJlZDogcmdiKDI1NSwwLDApLFxuICAgICAgZ3JlZW46IHJnYigwLDI1NSwwKSxcbiAgICAgIGJsdWU6IHJnYigwLDAsMjU1KVxuICAgICAgdmFsdWU6IDEwcHhcbiAgICAgIGxpZ2h0OiB7XG4gICAgICAgIGJhc2U6IGxpZ2h0Z3JleVxuICAgICAgfVxuICAgICAgZGFyazoge1xuICAgICAgICBiYXNlOiBzbGF0ZWdyZXlcbiAgICAgIH1cbiAgICB9XG4gIFwiXCJcIikuYXMoe1xuICAgICdjb2xvcnMucmVkJzpcbiAgICAgIHZhbHVlOiAncmdiKDI1NSwwLDApJ1xuICAgICAgcmFuZ2U6IFtbMSwyXSwgWzEsMTRdXVxuICAgICdjb2xvcnMuZ3JlZW4nOlxuICAgICAgdmFsdWU6ICdyZ2IoMCwyNTUsMCknXG4gICAgICByYW5nZTogW1syLDJdLCBbMiwxNl1dXG4gICAgJ2NvbG9ycy5ibHVlJzpcbiAgICAgIHZhbHVlOiAncmdiKDAsMCwyNTUpJ1xuICAgICAgcmFuZ2U6IFtbMywyXSxbMywxNV1dXG4gICAgJ2NvbG9ycy52YWx1ZSc6XG4gICAgICB2YWx1ZTogJzEwcHgnXG4gICAgICByYW5nZTogW1s0LDJdLFs0LDEzXV1cbiAgICAnY29sb3JzLmxpZ2h0LmJhc2UnOlxuICAgICAgdmFsdWU6ICdsaWdodGdyZXknXG4gICAgICByYW5nZTogW1s5LDRdLFs5LDE3XV1cbiAgICAnY29sb3JzLmRhcmsuYmFzZSc6XG4gICAgICB2YWx1ZTogJ3NsYXRlZ3JleSdcbiAgICAgIHJhbmdlOiBbWzEyLDRdLFsxMiwxNF1dXG4gIH0pXG4iXX0=
