(function() {
  var Disposable, Syntax,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Disposable = require('atom').Disposable;

  module.exports = Syntax = (function(superClass) {
    extend(Syntax, superClass);

    function Syntax(latex) {
      this.latex = latex;
    }

    Syntax.prototype.doublequote = function() {
      var editor, range, selected;
      editor = atom.workspace.getActiveTextEditor();
      selected = editor.getSelectedText();
      if (selected) {
        range = editor.getSelectedBufferRange();
        range.start.column += 1;
        range.end.column += 1;
        editor.insertText("``" + selected + "\'\'");
        editor.setSelectedBufferRange(range);
        return;
      }
      return editor.insertText('\"');
    };

    return Syntax;

  })(Disposable);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi9hdXRvY29tcGxldGUvc3ludGF4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsa0JBQUE7SUFBQTs7O0VBQUUsYUFBZSxPQUFBLENBQVEsTUFBUjs7RUFFakIsTUFBTSxDQUFDLE9BQVAsR0FDTTs7O0lBQ1MsZ0JBQUMsS0FBRDtNQUNYLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFERTs7cUJBR2IsV0FBQSxHQUFhLFNBQUE7QUFDWCxVQUFBO01BQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQTtNQUNULFFBQUEsR0FBVyxNQUFNLENBQUMsZUFBUCxDQUFBO01BQ1gsSUFBRyxRQUFIO1FBQ0UsS0FBQSxHQUFRLE1BQU0sQ0FBQyxzQkFBUCxDQUFBO1FBQ1IsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFaLElBQXNCO1FBQ3RCLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBVixJQUFvQjtRQUNwQixNQUFNLENBQUMsVUFBUCxDQUFrQixJQUFBLEdBQU8sUUFBUCxHQUFnQixNQUFsQztRQUNBLE1BQU0sQ0FBQyxzQkFBUCxDQUE4QixLQUE5QjtBQUNBLGVBTkY7O2FBUUEsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsSUFBbEI7SUFYVzs7OztLQUpNO0FBSHJCIiwic291cmNlc0NvbnRlbnQiOlsieyBEaXNwb3NhYmxlIH0gPSByZXF1aXJlICdhdG9tJ1xuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBTeW50YXggZXh0ZW5kcyBEaXNwb3NhYmxlXG4gIGNvbnN0cnVjdG9yOiAobGF0ZXgpIC0+XG4gICAgQGxhdGV4ID0gbGF0ZXhcblxuICBkb3VibGVxdW90ZTogLT5cbiAgICBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcbiAgICBzZWxlY3RlZCA9IGVkaXRvci5nZXRTZWxlY3RlZFRleHQoKVxuICAgIGlmIHNlbGVjdGVkXG4gICAgICByYW5nZSA9IGVkaXRvci5nZXRTZWxlY3RlZEJ1ZmZlclJhbmdlKClcbiAgICAgIHJhbmdlLnN0YXJ0LmNvbHVtbiArPSAxXG4gICAgICByYW5nZS5lbmQuY29sdW1uICs9IDFcbiAgICAgIGVkaXRvci5pbnNlcnRUZXh0KFwiXCJcImBgI3tzZWxlY3RlZH1cXCdcXCdcIlwiXCIpXG4gICAgICBlZGl0b3Iuc2V0U2VsZWN0ZWRCdWZmZXJSYW5nZShyYW5nZSlcbiAgICAgIHJldHVyblxuXG4gICAgZWRpdG9yLmluc2VydFRleHQoJ1xcXCInKVxuIl19
