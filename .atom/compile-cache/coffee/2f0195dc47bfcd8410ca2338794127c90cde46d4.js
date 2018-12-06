(function() {
  var Disposable, Reference, fs, path,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Disposable = require('atom').Disposable;

  fs = require('fs');

  path = require('path');

  module.exports = Reference = (function(superClass) {
    extend(Reference, superClass);

    function Reference(latex) {
      this.latex = latex;
      this.suggestions = [];
      this.items = {};
    }

    Reference.prototype.provide = function(prefix) {
      var currentContent, currentPath, editor, i, item, j, len, len1, ref, ref1, ref2, suggestions, tex;
      suggestions = [];
      if (prefix.length > 0) {
        ref = this.suggestions;
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          if (item.text.indexOf(prefix) > -1) {
            item.replacementPrefix = prefix;
            suggestions.push(item);
          }
        }
        suggestions.sort(function(a, b) {
          return a.text.indexOf(prefix) - b.text.indexOf(prefix);
        });
        return suggestions;
      }
      if (!this.latex.manager.findAll()) {
        return suggestions;
      }
      editor = atom.workspace.getActivePaneItem();
      currentPath = editor != null ? (ref1 = editor.buffer.file) != null ? ref1.path : void 0 : void 0;
      currentContent = editor != null ? editor.getText() : void 0;
      if (currentPath && currentContent) {
        if (this.latex.manager.isTexFile(currentPath)) {
          this.getRefItems(currentPath);
        }
      }
      for (tex in this.items) {
        if (indexOf.call(this.latex.texFiles, tex) >= 0) {
          ref2 = this.items[tex];
          for (j = 0, len1 = ref2.length; j < len1; j++) {
            item = ref2[j];
            suggestions.push({
              text: item,
              type: 'tag',
              latexType: 'reference'
            });
          }
        }
      }
      suggestions.sort(function(a, b) {
        if (a.text < b.text) {
          return -1;
        }
        return 1;
      });
      this.suggestions = suggestions;
      return suggestions;
    };

    Reference.prototype.getItems = function(content) {
      var itemReg, items, result;
      items = [];
      itemReg = /(?:\\label(?:\[[^\[\]\{\}]*\])?){([^}]*)}/g;
      while (true) {
        result = itemReg.exec(content);
        if (result == null) {
          break;
        }
        if (items.indexOf(result[1] < 0)) {
          items.push(result[1]);
        }
      }
      return items;
    };

    Reference.prototype.getRefItems = function(tex) {
      var content;
      if (!fs.existsSync(tex)) {
        return [];
      }
      content = fs.readFileSync(tex, 'utf-8');
      return this.items[tex] = this.getItems(content);
    };

    Reference.prototype.resetRefItems = function(tex) {
      if (tex != null) {
        return delete this.items[tex];
      } else {
        return this.items = {};
      }
    };

    return Reference;

  })(Disposable);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi9hdXRvY29tcGxldGUvcmVmZXJlbmNlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsK0JBQUE7SUFBQTs7OztFQUFFLGFBQWUsT0FBQSxDQUFRLE1BQVI7O0VBQ2pCLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUjs7RUFDTCxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVI7O0VBRVAsTUFBTSxDQUFDLE9BQVAsR0FDTTs7O0lBQ1MsbUJBQUMsS0FBRDtNQUNYLElBQUMsQ0FBQSxLQUFELEdBQVM7TUFDVCxJQUFDLENBQUEsV0FBRCxHQUFlO01BQ2YsSUFBQyxDQUFBLEtBQUQsR0FBUztJQUhFOzt3QkFLYixPQUFBLEdBQVMsU0FBQyxNQUFEO0FBQ1AsVUFBQTtNQUFBLFdBQUEsR0FBYztNQUNkLElBQUcsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsQ0FBbkI7QUFDRTtBQUFBLGFBQUEscUNBQUE7O1VBQ0UsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsTUFBbEIsQ0FBQSxHQUE0QixDQUFDLENBQWhDO1lBQ0UsSUFBSSxDQUFDLGlCQUFMLEdBQXlCO1lBQ3pCLFdBQVcsQ0FBQyxJQUFaLENBQWlCLElBQWpCLEVBRkY7O0FBREY7UUFJQSxXQUFXLENBQUMsSUFBWixDQUFpQixTQUFDLENBQUQsRUFBSSxDQUFKO0FBQ2YsaUJBQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFQLENBQWUsTUFBZixDQUFBLEdBQXlCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBUCxDQUFlLE1BQWY7UUFEakIsQ0FBakI7QUFFQSxlQUFPLFlBUFQ7O01BU0EsSUFBRyxDQUFDLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQWYsQ0FBQSxDQUFKO0FBQ0UsZUFBTyxZQURUOztNQUdBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFmLENBQUE7TUFDVCxXQUFBLDhEQUFpQyxDQUFFO01BQ25DLGNBQUEsb0JBQWlCLE1BQU0sQ0FBRSxPQUFSLENBQUE7TUFFakIsSUFBRyxXQUFBLElBQWdCLGNBQW5CO1FBQ0UsSUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFmLENBQXlCLFdBQXpCLENBQUg7VUFDRSxJQUFDLENBQUEsV0FBRCxDQUFhLFdBQWIsRUFERjtTQURGOztBQUlBLFdBQUEsaUJBQUE7UUFDRSxJQUFHLGFBQVEsSUFBQyxDQUFBLEtBQUssQ0FBQyxRQUFmLEVBQUEsR0FBQSxNQUFIO0FBQ0U7QUFBQSxlQUFBLHdDQUFBOztZQUNFLFdBQVcsQ0FBQyxJQUFaLENBQ0U7Y0FBQSxJQUFBLEVBQU0sSUFBTjtjQUNBLElBQUEsRUFBTSxLQUROO2NBRUEsU0FBQSxFQUFXLFdBRlg7YUFERjtBQURGLFdBREY7O0FBREY7TUFRQSxXQUFXLENBQUMsSUFBWixDQUFpQixTQUFDLENBQUQsRUFBSSxDQUFKO1FBQ2YsSUFBYSxDQUFDLENBQUMsSUFBRixHQUFTLENBQUMsQ0FBQyxJQUF4QjtBQUFBLGlCQUFPLENBQUMsRUFBUjs7QUFDQSxlQUFPO01BRlEsQ0FBakI7TUFHQSxJQUFDLENBQUEsV0FBRCxHQUFlO0FBQ2YsYUFBTztJQWxDQTs7d0JBb0NULFFBQUEsR0FBVSxTQUFDLE9BQUQ7QUFDUixVQUFBO01BQUEsS0FBQSxHQUFRO01BQ1IsT0FBQSxHQUFVO0FBQ1YsYUFBQSxJQUFBO1FBQ0UsTUFBQSxHQUFTLE9BQU8sQ0FBQyxJQUFSLENBQWEsT0FBYjtRQUNULElBQVUsY0FBVjtBQUFBLGdCQUFBOztRQUNBLElBQUcsS0FBSyxDQUFDLE9BQU4sQ0FBYyxNQUFPLENBQUEsQ0FBQSxDQUFQLEdBQVksQ0FBMUIsQ0FBSDtVQUNFLEtBQUssQ0FBQyxJQUFOLENBQVcsTUFBTyxDQUFBLENBQUEsQ0FBbEIsRUFERjs7TUFIRjtBQUtBLGFBQU87SUFSQzs7d0JBVVYsV0FBQSxHQUFhLFNBQUMsR0FBRDtBQUNYLFVBQUE7TUFBQSxJQUFHLENBQUMsRUFBRSxDQUFDLFVBQUgsQ0FBYyxHQUFkLENBQUo7QUFDRSxlQUFPLEdBRFQ7O01BRUEsT0FBQSxHQUFVLEVBQUUsQ0FBQyxZQUFILENBQWdCLEdBQWhCLEVBQXFCLE9BQXJCO2FBQ1YsSUFBQyxDQUFBLEtBQU0sQ0FBQSxHQUFBLENBQVAsR0FBYyxJQUFDLENBQUEsUUFBRCxDQUFVLE9BQVY7SUFKSDs7d0JBTWIsYUFBQSxHQUFlLFNBQUMsR0FBRDtNQUNiLElBQUcsV0FBSDtlQUNFLE9BQU8sSUFBQyxDQUFBLEtBQU0sQ0FBQSxHQUFBLEVBRGhCO09BQUEsTUFBQTtlQUdFLElBQUMsQ0FBQSxLQUFELEdBQVMsR0FIWDs7SUFEYTs7OztLQTFETztBQUx4QiIsInNvdXJjZXNDb250ZW50IjpbInsgRGlzcG9zYWJsZSB9ID0gcmVxdWlyZSAnYXRvbSdcbmZzID0gcmVxdWlyZSAnZnMnXG5wYXRoID0gcmVxdWlyZSAncGF0aCdcblxubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgUmVmZXJlbmNlIGV4dGVuZHMgRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3RvcjogKGxhdGV4KSAtPlxuICAgIEBsYXRleCA9IGxhdGV4XG4gICAgQHN1Z2dlc3Rpb25zID0gW11cbiAgICBAaXRlbXMgPSB7fVxuXG4gIHByb3ZpZGU6IChwcmVmaXgpIC0+XG4gICAgc3VnZ2VzdGlvbnMgPSBbXVxuICAgIGlmIHByZWZpeC5sZW5ndGggPiAwXG4gICAgICBmb3IgaXRlbSBpbiBAc3VnZ2VzdGlvbnNcbiAgICAgICAgaWYgaXRlbS50ZXh0LmluZGV4T2YocHJlZml4KSA+IC0xXG4gICAgICAgICAgaXRlbS5yZXBsYWNlbWVudFByZWZpeCA9IHByZWZpeFxuICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2ggaXRlbVxuICAgICAgc3VnZ2VzdGlvbnMuc29ydCgoYSwgYikgLT5cbiAgICAgICAgcmV0dXJuIGEudGV4dC5pbmRleE9mKHByZWZpeCkgLSBiLnRleHQuaW5kZXhPZihwcmVmaXgpKVxuICAgICAgcmV0dXJuIHN1Z2dlc3Rpb25zXG5cbiAgICBpZiAhQGxhdGV4Lm1hbmFnZXIuZmluZEFsbCgpXG4gICAgICByZXR1cm4gc3VnZ2VzdGlvbnNcblxuICAgIGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmVJdGVtKClcbiAgICBjdXJyZW50UGF0aCA9IGVkaXRvcj8uYnVmZmVyLmZpbGU/LnBhdGhcbiAgICBjdXJyZW50Q29udGVudCA9IGVkaXRvcj8uZ2V0VGV4dCgpXG5cbiAgICBpZiBjdXJyZW50UGF0aCBhbmQgY3VycmVudENvbnRlbnRcbiAgICAgIGlmIEBsYXRleC5tYW5hZ2VyLmlzVGV4RmlsZShjdXJyZW50UGF0aClcbiAgICAgICAgQGdldFJlZkl0ZW1zIGN1cnJlbnRQYXRoXG5cbiAgICBmb3IgdGV4IG9mIEBpdGVtc1xuICAgICAgaWYgdGV4IGluICBAbGF0ZXgudGV4RmlsZXNcbiAgICAgICAgZm9yIGl0ZW0gaW4gQGl0ZW1zW3RleF1cbiAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoXG4gICAgICAgICAgICB0ZXh0OiBpdGVtXG4gICAgICAgICAgICB0eXBlOiAndGFnJ1xuICAgICAgICAgICAgbGF0ZXhUeXBlOiAncmVmZXJlbmNlJ1xuXG4gICAgc3VnZ2VzdGlvbnMuc29ydCgoYSwgYikgLT5cbiAgICAgIHJldHVybiAtMSBpZiBhLnRleHQgPCBiLnRleHRcbiAgICAgIHJldHVybiAxKVxuICAgIEBzdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zXG4gICAgcmV0dXJuIHN1Z2dlc3Rpb25zXG5cbiAgZ2V0SXRlbXM6IChjb250ZW50KSAtPlxuICAgIGl0ZW1zID0gW11cbiAgICBpdGVtUmVnID0gLyg/OlxcXFxsYWJlbCg/OlxcW1teXFxbXFxdXFx7XFx9XSpcXF0pPyl7KFtefV0qKX0vZ1xuICAgIGxvb3BcbiAgICAgIHJlc3VsdCA9IGl0ZW1SZWcuZXhlYyBjb250ZW50XG4gICAgICBicmVhayBpZiAhcmVzdWx0P1xuICAgICAgaWYgaXRlbXMuaW5kZXhPZiByZXN1bHRbMV0gPCAwXG4gICAgICAgIGl0ZW1zLnB1c2ggcmVzdWx0WzFdXG4gICAgcmV0dXJuIGl0ZW1zXG5cbiAgZ2V0UmVmSXRlbXM6ICh0ZXgpIC0+XG4gICAgaWYgIWZzLmV4aXN0c1N5bmModGV4KVxuICAgICAgcmV0dXJuIFtdXG4gICAgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyB0ZXgsICd1dGYtOCdcbiAgICBAaXRlbXNbdGV4XSA9IEBnZXRJdGVtcyhjb250ZW50KVxuXG4gIHJlc2V0UmVmSXRlbXM6ICh0ZXgpIC0+XG4gICAgaWYgdGV4P1xuICAgICAgZGVsZXRlIEBpdGVtc1t0ZXhdXG4gICAgZWxzZVxuICAgICAgQGl0ZW1zID0ge31cbiJdfQ==
