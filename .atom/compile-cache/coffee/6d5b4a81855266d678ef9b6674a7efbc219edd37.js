(function() {
  var Disposable, Provider,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Disposable = require('atom').Disposable;

  module.exports = Provider = (function(superClass) {
    extend(Provider, superClass);

    function Provider() {}

    Provider.prototype.deactivate = function() {
      return this.disposables.dispose();
    };

    Provider.prototype.lazyLoad = function(latex) {
      var Citation, Command, Environment, Reference, SubFiles, Syntax;
      this.latex = latex;
      Citation = require('./autocomplete/citation');
      Reference = require('./autocomplete/reference');
      Environment = require('./autocomplete/environment');
      Command = require('./autocomplete/command');
      Syntax = require('./autocomplete/syntax');
      SubFiles = require('./autocomplete/subFiles');
      this.citation = new Citation(this.latex);
      this.reference = new Reference(this.latex);
      this.environment = new Environment(this.latex);
      this.command = new Command(this.latex);
      this.syntax = new Syntax(this.latex);
      return this.subFiles = new SubFiles(this.latex);
    };

    Provider.prototype.provider = {
      selector: '.text.tex.latex',
      inclusionPriority: 1,
      suggestionPriority: 2,
      getSuggestions: function(arg) {
        var bufferPosition, editor;
        editor = arg.editor, bufferPosition = arg.bufferPosition;
        return new Promise(function(resolve) {
          var command, i, len, line, ref, suggestions;
          line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);
          if (line[line.length - 1] === '{') {
            atom.packages.getActivePackage('autocomplete-plus').mainModule.autocompleteManager.shouldDisplaySuggestions = true;
          }
          ref = ['citation', 'reference', 'environment', 'command', 'subFiles'];
          for (i = 0, len = ref.length; i < len; i++) {
            command = ref[i];
            suggestions = atom_latex.latex.provider.completeCommand(line, command);
            if (suggestions != null) {
              resolve(suggestions);
            }
          }
          return resolve([]);
        });
      },
      onDidInsertSuggestion: function(arg) {
        var editor, lines, rowContent, suggestion, triggerPosition;
        editor = arg.editor, triggerPosition = arg.triggerPosition, suggestion = arg.suggestion;
        if (suggestion.chainComplete) {
          setTimeout((function() {
            return atom.packages.getActivePackage('autocomplete-plus').mainModule.autocompleteManager.findSuggestions();
          }), 100);
        }
        if (suggestion.latexType === 'environment') {
          lines = editor.getBuffer().getLines();
          rowContent = lines[triggerPosition.row].slice(0, triggerPosition.column);
          if (rowContent.indexOf('\\end') > rowContent.indexOf('\\begin')) {
            editor.setCursorBufferPosition({
              row: triggerPosition.row - 1,
              column: lines[triggerPosition.row - 1].length
            });
            if (suggestion.additionalInsert != null) {
              return editor.insertText(suggestion.additionalInsert);
            }
          }
        }
      }
    };

    Provider.prototype.completeCommand = function(line, type) {
      var allKeys, currentPrefix, prefix, provider, reg, result, suggestions;
      switch (type) {
        case 'citation':
          reg = /(?:\\[a-zA-Z]*cite[a-zA-Z]*(?:\[[^\[\]]*\])?){([^}]*)$/;
          provider = this.citation;
          break;
        case 'reference':
          reg = /(?:\\[a-zA-Z]*ref[a-zA-Z]*(?:\[[^\[\]]*\])?){([^}]*)$/;
          provider = this.reference;
          break;
        case 'environment':
          reg = /(?:\\(?:begin|end)(?:\[[^\[\]]*\])?){([^}]*)$/;
          provider = this.environment;
          break;
        case 'command':
          reg = /\\([a-zA-Z]*)$/;
          provider = this.command;
          break;
        case 'subFiles':
          reg = /(?:\\(?:input|include|subfile|includegraphics|addbibresource)(?:\[[^\[\]]*\])?){([^}]*)$/;
          provider = this.subFiles;
      }
      result = line.match(reg);
      if (result) {
        prefix = result[1];
        if (['environment', 'command'].indexOf(type) > -1) {
          currentPrefix = prefix;
        } else {
          allKeys = prefix.split(',');
          currentPrefix = allKeys[allKeys.length - 1].trim();
        }
        suggestions = provider.provide(currentPrefix);
        if (type === 'subFiles') {
          if (line.match(/(?:\\(?:includegraphics)(?:\[[^\[\]]*\])?){([^}]*)$/)) {
            suggestions = provider.provide(currentPrefix, 'files-img');
          } else if (line.match(/(?:\\(?:addbibresource)(?:\[[^\[\]]*\])?){([^}]*)$/)) {
            suggestions = provider.provide(currentPrefix, 'files-bib');
          }
        }
      }
      return suggestions;
    };

    return Provider;

  })(Disposable);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi9wcm92aWRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLG9CQUFBO0lBQUE7OztFQUFFLGFBQWUsT0FBQSxDQUFRLE1BQVI7O0VBRWpCLE1BQU0sQ0FBQyxPQUFQLEdBQ007OztJQUNTLGtCQUFBLEdBQUE7O3VCQUViLFVBQUEsR0FBWSxTQUFBO0FBQ1YsYUFBTyxJQUFDLENBQUEsV0FBVyxDQUFDLE9BQWIsQ0FBQTtJQURHOzt1QkFHWixRQUFBLEdBQVUsU0FBQyxLQUFEO0FBQ1IsVUFBQTtNQUFBLElBQUMsQ0FBQSxLQUFELEdBQVM7TUFFVCxRQUFBLEdBQVcsT0FBQSxDQUFRLHlCQUFSO01BQ1gsU0FBQSxHQUFZLE9BQUEsQ0FBUSwwQkFBUjtNQUNaLFdBQUEsR0FBYyxPQUFBLENBQVEsNEJBQVI7TUFDZCxPQUFBLEdBQVUsT0FBQSxDQUFRLHdCQUFSO01BQ1YsTUFBQSxHQUFTLE9BQUEsQ0FBUSx1QkFBUjtNQUNULFFBQUEsR0FBVyxPQUFBLENBQVEseUJBQVI7TUFDWCxJQUFDLENBQUEsUUFBRCxHQUFZLElBQUksUUFBSixDQUFhLElBQUMsQ0FBQSxLQUFkO01BQ1osSUFBQyxDQUFBLFNBQUQsR0FBYSxJQUFJLFNBQUosQ0FBYyxJQUFDLENBQUEsS0FBZjtNQUNiLElBQUMsQ0FBQSxXQUFELEdBQWUsSUFBSSxXQUFKLENBQWdCLElBQUMsQ0FBQSxLQUFqQjtNQUNmLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBSSxPQUFKLENBQVksSUFBQyxDQUFBLEtBQWI7TUFDWCxJQUFDLENBQUEsTUFBRCxHQUFVLElBQUksTUFBSixDQUFXLElBQUMsQ0FBQSxLQUFaO2FBQ1YsSUFBQyxDQUFBLFFBQUQsR0FBWSxJQUFJLFFBQUosQ0FBYSxJQUFDLENBQUEsS0FBZDtJQWRKOzt1QkFnQlYsUUFBQSxH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LGFBQUQsRUFBZ0IsU0FBaEIsQ0FBMEIsQ0FBQyxPQUEzQixDQUFtQyxJQUFuQyxDQUFBLEdBQTJDLENBQUMsQ0FBL0M7VUFDRSxhQUFBLEdBQWdCLE9BRGxCO1NBQUEsTUFBQTtVQUdFLE9BQUEsR0FBVSxNQUFNLENBQUMsS0FBUCxDQUFhLEdBQWI7VUFDVixhQUFBLEdBQWdCLE9BQVEsQ0FBQSxPQUFPLENBQUMsTUFBUixHQUFpQixDQUFqQixDQUFtQixDQUFDLElBQTVCLENBQUEsRUFKbEI7O1FBS0EsV0FBQSxHQUFjLFFBQVEsQ0FBQyxPQUFULENBQWlCLGFBQWpCO1FBQ2QsSUFBRyxJQUFBLEtBQVEsVUFBWDtVQUNFLElBQUcsSUFBSSxDQUFDLEtBQUwsQ0FBVyxxREFBWCxDQUFIO1lBQ0UsV0FBQSxHQUFjLFFBQVEsQ0FBQyxPQUFULENBQWlCLGFBQWpCLEVBQStCLFdBQS9CLEVBRGhCO1dBQUEsTUFFSyxJQUFHLElBQUksQ0FBQyxLQUFMLENBQVcsb0RBQVgsQ0FBSDtZQUNILFdBQUEsR0FBYyxRQUFRLENBQUMsT0FBVCxDQUFpQixhQUFqQixFQUErQixXQUEvQixFQURYO1dBSFA7U0FSRjs7QUFhQSxhQUFPO0lBaENROzs7O0tBdERJO0FBSHZCIiwic291cmNlc0NvbnRlbnQiOlsieyBEaXNwb3NhYmxlIH0gPSByZXF1aXJlICdhdG9tJ1xuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBQcm92aWRlciBleHRlbmRzIERpc3Bvc2FibGVcbiAgY29uc3RydWN0b3I6IC0+XG5cbiAgZGVhY3RpdmF0ZTogLT5cbiAgICByZXR1cm4gQGRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuXG4gIGxhenlMb2FkOiAobGF0ZXgpIC0+XG4gICAgQGxhdGV4ID0gbGF0ZXhcblxuICAgIENpdGF0aW9uID0gcmVxdWlyZSAnLi9hdXRvY29tcGxldGUvY2l0YXRpb24nXG4gICAgUmVmZXJlbmNlID0gcmVxdWlyZSAnLi9hdXRvY29tcGxldGUvcmVmZXJlbmNlJ1xuICAgIEVudmlyb25tZW50ID0gcmVxdWlyZSAnLi9hdXRvY29tcGxldGUvZW52aXJvbm1lbnQnXG4gICAgQ29tbWFuZCA9IHJlcXVpcmUgJy4vYXV0b2NvbXBsZXRlL2NvbW1hbmQnXG4gICAgU3ludGF4ID0gcmVxdWlyZSAnLi9hdXRvY29tcGxldGUvc3ludGF4J1xuICAgIFN1YkZpbGVzID0gcmVxdWlyZSAnLi9hdXRvY29tcGxldGUvc3ViRmlsZXMnXG4gICAgQGNpdGF0aW9uID0gbmV3IENpdGF0aW9uKEBsYXRleClcbiAgICBAcmVmZXJlbmNlID0gbmV3IFJlZmVyZW5jZShAbGF0ZXgpXG4gICAgQGVudmlyb25tZW50ID0gbmV3IEVudmlyb25tZW50KEBsYXRleClcbiAgICBAY29tbWFuZCA9IG5ldyBDb21tYW5kKEBsYXRleClcbiAgICBAc3ludGF4ID0gbmV3IFN5bnRheChAbGF0ZXgpXG4gICAgQHN1YkZpbGVzID0gbmV3IFN1YkZpbGVzKEBsYXRleClcblxuICBwcm92aWRlcjpcbiAgICBzZWxlY3RvcjogJy50ZXh0LnRleC5sYXRleCdcbiAgICBpbmNsdXNpb25Qcmlvcml0eTogMVxuICAgIHN1Z2dlc3Rpb25Qcmlvcml0eTogMlxuICAgIGdldFN1Z2dlc3Rpb25zOiAoe2VkaXRvciwgYnVmZmVyUG9zaXRpb259KSAtPlxuICAgICAgbmV3IFByb21pc2UgKHJlc29sdmUpIC0+XG4gICAgICAgIGxpbmUgPSBlZGl0b3IuZ2V0VGV4dEluUmFuZ2UoW1tidWZmZXJQb3NpdGlvbi5yb3csIDBdLCBidWZmZXJQb3NpdGlvbl0pXG4gICAgICAgIGlmIGxpbmVbbGluZS5sZW5ndGggLSAxXSBpcyAneydcbiAgICAgICAgICBhdG9tLnBhY2thZ2VzLmdldEFjdGl2ZVBhY2thZ2UoJ2F1dG9jb21wbGV0ZS1wbHVzJylcXFxuICAgICAgICAgICAgLm1haW5Nb2R1bGUuYXV0b2NvbXBsZXRlTWFuYWdlci5zaG91bGREaXNwbGF5U3VnZ2VzdGlvbnMgPSB0cnVlXG5cbiAgICAgICAgZm9yIGNvbW1hbmQgaW4gWydjaXRhdGlvbicsICdyZWZlcmVuY2UnLCAnZW52aXJvbm1lbnQnLCAnY29tbWFuZCcsICdzdWJGaWxlcyddXG4gICAgICAgICAgc3VnZ2VzdGlvbnMgPSBhdG9tX2xhdGV4LmxhdGV4LnByb3ZpZGVyLmNvbXBsZXRlQ29tbWFuZChsaW5lLCBjb21tYW5kKVxuICAgICAgICAgIHJlc29sdmUoc3VnZ2VzdGlvbnMpIGlmIHN1Z2dlc3Rpb25zP1xuXG4gICAgICAgIHJlc29sdmUoW10pXG5cbiAgICBvbkRpZEluc2VydFN1Z2dlc3Rpb246ICh7ZWRpdG9yLCB0cmlnZ2VyUG9zaXRpb24sIHN1Z2dlc3Rpb259KSAtPlxuICAgICAgaWYgc3VnZ2VzdGlvbi5jaGFpbkNvbXBsZXRlXG4gICAgICAgIHNldFRpbWVvdXQoKCAtPiBhdG9tLnBhY2thZ2VzLmdldEFjdGl2ZVBhY2thZ2UoJ2F1dG9jb21wbGV0ZS1wbHVzJylcXFxuICAgICAgICAgIC5tYWluTW9kdWxlLmF1dG9jb21wbGV0ZU1hbmFnZXIuZmluZFN1Z2dlc3Rpb25zKCkpLCAxMDApXG4gICAgICBpZiBzdWdnZXN0aW9uLmxhdGV4VHlwZSBpcyAnZW52aXJvbm1lbnQnXG4gICAgICAgIGxpbmVzID0gZWRpdG9yLmdldEJ1ZmZlcigpLmdldExpbmVzKClcbiAgICAgICAgcm93Q29udGVudCA9IGxpbmVzW3RyaWdnZXJQb3NpdGlvbi5yb3ddLnNsaWNlKDAsIHRyaWdnZXJQb3NpdGlvbi5jb2x1bW4pXG4gICAgICAgIGlmIHJvd0NvbnRlbnQuaW5kZXhPZignXFxcXGVuZCcpID4gcm93Q29udGVudC5pbmRleE9mKCdcXFxcYmVnaW4nKVxuICAgICAgICAgIGVkaXRvci5zZXRDdXJzb3JCdWZmZXJQb3NpdGlvbihcbiAgICAgICAgICAgIHJvdzogdHJpZ2dlclBvc2l0aW9uLnJvdyAtIDFcbiAgICAgICAgICAgIGNvbHVtbjogbGluZXNbdHJpZ2dlclBvc2l0aW9uLnJvdyAtIDFdLmxlbmd0aFxuICAgICAgICAgIClcbiAgICAgICAgICBpZiBzdWdnZXN0aW9uLmFkZGl0aW9uYWxJbnNlcnQ/XG4gICAgICAgICAgICBlZGl0b3IuaW5zZXJ0VGV4dChzdWdnZXN0aW9uLmFkZGl0aW9uYWxJbnNlcnQpXG5cbiAgY29tcGxldGVDb21tYW5kOiAobGluZSwgdHlwZSkgLT5cbiAgICBzd2l0Y2ggdHlwZVxuICAgICAgd2hlbiAnY2l0YXRpb24nXG4gICAgICAgIHJlZyA9IC8oPzpcXFxcW2EtekEtWl0qY2l0ZVthLXpBLVpdKig/OlxcW1teXFxbXFxdXSpcXF0pPyl7KFtefV0qKSQvXG4gICAgICAgIHByb3ZpZGVyID0gQGNpdGF0aW9uXG4gICAgICB3aGVuICdyZWZlcmVuY2UnXG4gICAgICAgIHJlZyA9IC8oPzpcXFxcW2EtekEtWl0qcmVmW2EtekEtWl0qKD86XFxbW15cXFtcXF1dKlxcXSk/KXsoW159XSopJC9cbiAgICAgICAgcHJvdmlkZXIgPSBAcmVmZXJlbmNlXG4gICAgICB3aGVuICdlbnZpcm9ubWVudCdcbiAgICAgICAgcmVnID0gLyg/OlxcXFwoPzpiZWdpbnxlbmQpKD86XFxbW15cXFtcXF1dKlxcXSk/KXsoW159XSopJC9cbiAgICAgICAgcHJvdmlkZXIgPSBAZW52aXJvbm1lbnRcbiAgICAgIHdoZW4gJ2NvbW1hbmQnXG4gICAgICAgIHJlZyA9IC9cXFxcKFthLXpBLVpdKikkL1xuICAgICAgICBwcm92aWRlciA9IEBjb21tYW5kXG4gICAgICB3aGVuICdzdWJGaWxlcydcbiAgICAgICAgcmVnID0gLyg/OlxcXFwoPzppbnB1dHxpbmNsdWRlfHN1YmZpbGV8aW5jbHVkZWdyYXBoaWNzfGFkZGJpYnJlc291cmNlKSg/OlxcW1teXFxbXFxdXSpcXF0pPyl7KFtefV0qKSQvXG4gICAgICAgIHByb3ZpZGVyID0gQHN1YkZpbGVzXG5cbiAgICByZXN1bHQgPSBsaW5lLm1hdGNoKHJlZylcbiAgICBpZiByZXN1bHRcbiAgICAgIHByZWZpeCA9IHJlc3VsdFsxXVxuICAgICAgaWYgWydlbnZpcm9ubWVudCcsICdjb21tYW5kJ10uaW5kZXhPZih0eXBlKSA+IC0xXG4gICAgICAgIGN1cnJlbnRQcmVmaXggPSBwcmVmaXhcbiAgICAgIGVsc2VcbiAgICAgICAgYWxsS2V5cyA9IHByZWZpeC5zcGxpdCgnLCcpXG4gICAgICAgIGN1cnJlbnRQcmVmaXggPSBhbGxLZXlzW2FsbEtleXMubGVuZ3RoIC0gMV0udHJpbSgpXG4gICAgICBzdWdnZXN0aW9ucyA9IHByb3ZpZGVyLnByb3ZpZGUoY3VycmVudFByZWZpeClcbiAgICAgIGlmIHR5cGUgPT0gJ3N1YkZpbGVzJ1xuICAgICAgICBpZiBsaW5lLm1hdGNoKC8oPzpcXFxcKD86aW5jbHVkZWdyYXBoaWNzKSg/OlxcW1teXFxbXFxdXSpcXF0pPyl7KFtefV0qKSQvKVxuICAgICAgICAgIHN1Z2dlc3Rpb25zID0gcHJvdmlkZXIucHJvdmlkZShjdXJyZW50UHJlZml4LCdmaWxlcy1pbWcnKVxuICAgICAgICBlbHNlIGlmIGxpbmUubWF0Y2goLyg/OlxcXFwoPzphZGRiaWJyZXNvdXJjZSkoPzpcXFtbXlxcW1xcXV0qXFxdKT8peyhbXn1dKikkLylcbiAgICAgICAgICBzdWdnZXN0aW9ucyA9IHByb3ZpZGVyLnByb3ZpZGUoY3VycmVudFByZWZpeCwnZmlsZXMtYmliJylcbiAgICByZXR1cm4gc3VnZ2VzdGlvbnNcbiJdfQ==
