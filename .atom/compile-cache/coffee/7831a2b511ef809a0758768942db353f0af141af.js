(function() {
  describe("latex grammar", function() {
    var afterword, grammar, preamble;
    grammar = null;
    preamble = '\\documentclass{article} \\begin{document}';
    afterword = '\\end{document}';
    beforeEach(function() {
      waitsForPromise(function() {
        return atom.packages.activatePackage('language-latex');
      });
      return runs(function() {
        return grammar = atom.grammars.grammarForScopeName('text.tex.latex');
      });
    });
    it("parses the grammar", function() {
      expect(grammar).toBeTruthy();
      return expect(grammar.scopeName).toBe('text.tex.latex');
    });
    return it("parses a simple article", function() {
      var s, tk;
      s = preamble + " Hello, Latex! $2+3=5$ " + afterword;
      tk = grammar.tokenizeLines(s);
      return expect(tk[0][14].scopes[1]).toBe('string.other.math.tex');
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1sYXRleC9zcGVjL2xhdGV4LXNwZWMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQUEsUUFBQSxDQUFTLGVBQVQsRUFBMEIsU0FBQTtBQUN4QixRQUFBO0lBQUEsT0FBQSxHQUFVO0lBQ1YsUUFBQSxHQUFXO0lBQ1gsU0FBQSxHQUFZO0lBRVosVUFBQSxDQUFXLFNBQUE7TUFDVCxlQUFBLENBQWdCLFNBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsZ0JBQTlCO01BRGMsQ0FBaEI7YUFHQSxJQUFBLENBQUssU0FBQTtlQUNILE9BQUEsR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFkLENBQWtDLGdCQUFsQztNQURQLENBQUw7SUFKUyxDQUFYO0lBT0EsRUFBQSxDQUFHLG9CQUFILEVBQXlCLFNBQUE7TUFDdkIsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLFVBQWhCLENBQUE7YUFDQSxNQUFBLENBQU8sT0FBTyxDQUFDLFNBQWYsQ0FBeUIsQ0FBQyxJQUExQixDQUErQixnQkFBL0I7SUFGdUIsQ0FBekI7V0FJQSxFQUFBLENBQUcseUJBQUgsRUFBOEIsU0FBQTtBQUM1QixVQUFBO01BQUEsQ0FBQSxHQUFPLFFBQUQsR0FBVSx5QkFBVixHQUFtQztNQUN6QyxFQUFBLEdBQUssT0FBTyxDQUFDLGFBQVIsQ0FBc0IsQ0FBdEI7YUFDTCxNQUFBLENBQU8sRUFBRyxDQUFBLENBQUEsQ0FBRyxDQUFBLEVBQUEsQ0FBRyxDQUFDLE1BQU8sQ0FBQSxDQUFBLENBQXhCLENBQTJCLENBQUMsSUFBNUIsQ0FBaUMsdUJBQWpDO0lBSDRCLENBQTlCO0VBaEJ3QixDQUExQjtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZGVzY3JpYmUgXCJsYXRleCBncmFtbWFyXCIsIC0+XG4gIGdyYW1tYXIgPSBudWxsXG4gIHByZWFtYmxlID0gJ1xcXFxkb2N1bWVudGNsYXNze2FydGljbGV9IFxcXFxiZWdpbntkb2N1bWVudH0nXG4gIGFmdGVyd29yZCA9ICdcXFxcZW5ke2RvY3VtZW50fSdcblxuICBiZWZvcmVFYWNoIC0+XG4gICAgd2FpdHNGb3JQcm9taXNlIC0+XG4gICAgICBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZSgnbGFuZ3VhZ2UtbGF0ZXgnKVxuXG4gICAgcnVucyAtPlxuICAgICAgZ3JhbW1hciA9IGF0b20uZ3JhbW1hcnMuZ3JhbW1hckZvclNjb3BlTmFtZSgndGV4dC50ZXgubGF0ZXgnKVxuXG4gIGl0IFwicGFyc2VzIHRoZSBncmFtbWFyXCIsIC0+XG4gICAgZXhwZWN0KGdyYW1tYXIpLnRvQmVUcnV0aHkoKVxuICAgIGV4cGVjdChncmFtbWFyLnNjb3BlTmFtZSkudG9CZSAndGV4dC50ZXgubGF0ZXgnXG5cbiAgaXQgXCJwYXJzZXMgYSBzaW1wbGUgYXJ0aWNsZVwiLCAtPlxuICAgIHMgPSBcIiN7cHJlYW1ibGV9IEhlbGxvLCBMYXRleCEgJDIrMz01JCAje2FmdGVyd29yZH1cIlxuICAgIHRrID0gZ3JhbW1hci50b2tlbml6ZUxpbmVzKHMpXG4gICAgZXhwZWN0KHRrWzBdWzE0XS5zY29wZXNbMV0pLnRvQmUgJ3N0cmluZy5vdGhlci5tYXRoLnRleCdcbiJdfQ==
