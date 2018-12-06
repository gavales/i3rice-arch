(function() {
  var Cleaner, Disposable, fs, glob, path,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Disposable = require('atom').Disposable;

  path = require('path');

  fs = require('fs');

  glob = require('glob');

  module.exports = Cleaner = (function(superClass) {
    extend(Cleaner, superClass);

    function Cleaner(latex) {
      this.latex = latex;
    }

    Cleaner.prototype.clean = function() {
      var FileExts, rootDir;
      if (!this.latex.manager.findMain()) {
        return false;
      }
      rootDir = path.dirname(this.latex.mainFile);
      FileExts = atom.config.get('atom-latex.file_ext_to_clean').replace(/\*\./g, '').replace(/\,\s/g, '|');
      glob("**/*.*(" + FileExts + ")", {
        cwd: rootDir
      }, function(err, files) {
        var file, fullPath, i, len, results;
        if (err) {
          console.log(err);
          return;
        }
        results = [];
        for (i = 0, len = files.length; i < len; i++) {
          file = files[i];
          fullPath = path.resolve(rootDir, file);
          results.push(fs.unlink(fullPath, function(e) {
            if (e != null) {
              return console.log(e);
            }
          }));
        }
        return results;
      });
      return true;
    };

    return Cleaner;

  })(Disposable);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi9jbGVhbmVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsbUNBQUE7SUFBQTs7O0VBQUUsYUFBZSxPQUFBLENBQVEsTUFBUjs7RUFDakIsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSOztFQUNQLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUjs7RUFDTCxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVI7O0VBRVAsTUFBTSxDQUFDLE9BQVAsR0FDTTs7O0lBQ1MsaUJBQUMsS0FBRDtNQUNYLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFERTs7c0JBR2IsS0FBQSxHQUFPLFNBQUE7QUFDTCxVQUFBO01BQUEsSUFBRyxDQUFDLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQWYsQ0FBQSxDQUFKO0FBQ0UsZUFBTyxNQURUOztNQUVBLE9BQUEsR0FBVSxJQUFJLENBQUMsT0FBTCxDQUFhLElBQUMsQ0FBQSxLQUFLLENBQUMsUUFBcEI7TUFDVixRQUFBLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDhCQUFoQixDQUNULENBQUMsT0FEUSxDQUNBLE9BREEsRUFDUSxFQURSLENBQ1csQ0FBQyxPQURaLENBQ29CLE9BRHBCLEVBQzRCLEdBRDVCO01BRVgsSUFBQSxDQUFLLFNBQUEsR0FBVSxRQUFWLEdBQW1CLEdBQXhCLEVBQTRCO1FBQUEsR0FBQSxFQUFLLE9BQUw7T0FBNUIsRUFBMEMsU0FBQyxHQUFELEVBQU0sS0FBTjtBQUN4QyxZQUFBO1FBQUEsSUFBRyxHQUFIO1VBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxHQUFaO0FBQ0EsaUJBRkY7O0FBR0E7YUFBQSx1Q0FBQTs7VUFDRSxRQUFBLEdBQVcsSUFBSSxDQUFDLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLElBQXRCO3VCQUNYLEVBQUUsQ0FBQyxNQUFILENBQVUsUUFBVixFQUFtQixTQUFDLENBQUQ7WUFDakIsSUFBaUIsU0FBakI7cUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxDQUFaLEVBQUE7O1VBRGlCLENBQW5CO0FBRkY7O01BSndDLENBQTFDO0FBU0EsYUFBTztJQWZGOzs7O0tBSmE7QUFOdEIiLCJzb3VyY2VzQ29udGVudCI6WyJ7IERpc3Bvc2FibGUgfSA9IHJlcXVpcmUgJ2F0b20nXG5wYXRoID0gcmVxdWlyZSAncGF0aCdcbmZzID0gcmVxdWlyZSAnZnMnXG5nbG9iID0gcmVxdWlyZSAnZ2xvYidcblxubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgQ2xlYW5lciBleHRlbmRzIERpc3Bvc2FibGVcbiAgY29uc3RydWN0b3I6IChsYXRleCkgLT5cbiAgICBAbGF0ZXggPSBsYXRleFxuXG4gIGNsZWFuOiAtPlxuICAgIGlmICFAbGF0ZXgubWFuYWdlci5maW5kTWFpbigpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICByb290RGlyID0gcGF0aC5kaXJuYW1lKEBsYXRleC5tYWluRmlsZSlcbiAgICBGaWxlRXh0cyA9IGF0b20uY29uZmlnLmdldCgnYXRvbS1sYXRleC5maWxlX2V4dF90b19jbGVhbicpXFxcbiAgICAgIC5yZXBsYWNlKC9cXCpcXC4vZywnJykucmVwbGFjZSgvXFwsXFxzL2csJ3wnKVxuICAgIGdsb2IoXCIqKi8qLiooI3tGaWxlRXh0c30pXCIsIGN3ZDogcm9vdERpciwgKGVyciwgZmlsZXMpIC0+XG4gICAgICBpZiBlcnJcbiAgICAgICAgY29uc29sZS5sb2cgZXJyXG4gICAgICAgIHJldHVyblxuICAgICAgZm9yIGZpbGUgaW4gZmlsZXNcbiAgICAgICAgZnVsbFBhdGggPSBwYXRoLnJlc29sdmUocm9vdERpciwgZmlsZSlcbiAgICAgICAgZnMudW5saW5rKGZ1bGxQYXRoLChlKSAtPlxuICAgICAgICAgIGNvbnNvbGUubG9nIGUgaWYgZT8pXG4gICAgKVxuICAgIHJldHVybiB0cnVlXG4iXX0=
