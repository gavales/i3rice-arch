(function() {
  var Disposable, Parser, araraFailurePattern, araraPattern, latexBox, latexError, latexFatalPattern, latexFile, latexPattern, latexWarn, latexmkPattern, latexmkPatternNoGM, latexmkUpToDate, path,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Disposable = require('atom').Disposable;

  path = require('path');

  latexFile = /^.*?\(\.\/(.*?\.\w+)/;

  latexPattern = /^Output\swritten\son\s(.*)\s\(.*\)\.$/gm;

  latexFatalPattern = /Fatal error occurred, no output PDF file produced!/gm;

  latexError = /^(?:(.*):(\d+):|!)(?: (.+) Error:)? (.+?)\.?$/;

  latexBox = /^((?:Over|Under)full \\[vh]box \([^)]*\)) in paragraph at lines (\d+)--(\d+)$/;

  latexWarn = /^((?:(?:Class|Package) \S+)|LaTeX) (Warning|Info):\s+(.*?)(?: on input line (\d+))?\.$/;

  latexmkPattern = /^Latexmk:\sapplying\srule/gm;

  latexmkPatternNoGM = /^Latexmk:\sapplying\srule/;

  latexmkUpToDate = /^Latexmk: All targets \(.*\) are up-to-date/;

  araraPattern = /Running\s(?:[a-zA-Z]*)\.\.\./g;

  araraFailurePattern = /(FAILURE)/g;

  module.exports = Parser = (function(superClass) {
    extend(Parser, superClass);

    function Parser(latex) {
      this.latex = latex;
    }

    Parser.prototype.parse = function(log) {
      this.latex["package"].status.view.status = 'good';
      this.isLatexmkSkipped = false;
      if (log.match(latexmkPattern)) {
        log = this.trimLatexmk(log);
      }
      if (log.match(araraPattern)) {
        log = this.trimArara(log);
      }
      if (log.match(latexPattern) || log.match(latexFatalPattern) || log.match(araraFailurePattern)) {
        this.parseLatex(log);
      } else if (this.latexmkSkipped(log)) {
        this.latex["package"].status.view.status = 'skipped';
        this.isLatexmkSkipped = true;
      }
      this.latex["package"].status.view.update();
      this.latex.panel.view.update();
      return this.lastFile = this.latex.mainFile;
    };

    Parser.prototype.trimLatexmk = function(log) {
      var finalLine, index, line, lines, result;
      log = log.replace(/(.{78}(\w|\s|\d|\\|\/))(\r\n|\n)/g, '$1');
      lines = log.replace(/(\r\n)|\r/g, '\n').split('\n');
      finalLine = -1;
      for (index in lines) {
        line = lines[index];
        result = line.match(latexmkPatternNoGM);
        if (result) {
          finalLine = index;
        }
      }
      return lines.slice(finalLine).join('\n');
    };

    Parser.prototype.latexmkSkipped = function(log) {
      var lines;
      lines = log.replace(/(\r\n)|\r/g, '\n').split('\n');
      if (lines[0].match(latexmkUpToDate)) {
        return true;
      }
      return false;
    };

    Parser.prototype.trimArara = function(log) {
      var araraRunIdx, index, line, lines, result;
      araraRunIdx = [];
      lines = log.replace(/(\r\n)|\r/g, '\n').split('\n');
      for (index in lines) {
        line = lines[index];
        result = line.match(/Running\s(?:[a-zA-Z]*)\.\.\./);
        if (result) {
          araraRunIdx = araraRunIdx.concat(index);
        }
      }
      return lines.slice(araraRunIdx.slice(-1)[0]).join('\n');
    };

    Parser.prototype.parseLatex = function(log) {
      var file, i, items, len, line, lines, result, types;
      log = log.replace(/(.{78}(\w|\s|\d|\\|\/))(\r\n|\n)/g, '$1');
      lines = log.replace(/(\r\n)|\r/g, '\n').split('\n');
      items = [];
      for (i = 0, len = lines.length; i < len; i++) {
        line = lines[i];
        file = line.match(latexFile);
        if (file) {
          this.lastFile = path.resolve(path.dirname(this.latex.mainFile), file[1]);
        }
        result = line.match(latexBox);
        if (result) {
          items.push({
            type: 'typesetting',
            text: result[1],
            file: this.lastFile,
            line: parseInt(result[2], 10)
          });
          continue;
        }
        result = line.match(latexWarn);
        if (result) {
          items.push({
            type: 'warning',
            text: result[3],
            file: this.lastFile,
            line: parseInt(result[4])
          });
          continue;
        }
        result = line.match(latexError);
        if (result) {
          items.push({
            type: 'error',
            text: result[3] && result[3] !== 'LaTeX' ? result[3] + ": " + result[4] : result[4],
            file: result[1] ? path.resolve(path.dirname(this.latex.mainFile), result[1]) : this.latex.mainFile,
            line: result[2] ? parseInt(result[2], 10) : void 0
          });
          continue;
        }
      }
      types = items.map(function(item) {
        return item.type;
      });
      if (types.indexOf('error') > -1) {
        this.latex["package"].status.view.status = 'error';
      } else if (types.indexOf('warning') > -1) {
        this.latex["package"].status.view.status = 'warning';
      } else if (types.indexOf('typesetting') > -1) {
        this.latex["package"].status.view.status = 'typesetting';
      }
      return this.latex.logger.log = this.latex.logger.log.concat(items);
    };

    return Parser;

  })(Disposable);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi9wYXJzZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSw2TEFBQTtJQUFBOzs7RUFBRSxhQUFlLE9BQUEsQ0FBUSxNQUFSOztFQUNqQixJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVI7O0VBRVAsU0FBQSxHQUFZOztFQUNaLFlBQUEsR0FBZTs7RUFDZixpQkFBQSxHQUFvQjs7RUFDcEIsVUFBQSxHQUFhOztFQUNiLFFBQUEsR0FBVzs7RUFDWCxTQUFBLEdBQVk7O0VBRVosY0FBQSxHQUFpQjs7RUFDakIsa0JBQUEsR0FBcUI7O0VBQ3JCLGVBQUEsR0FBa0I7O0VBRWxCLFlBQUEsR0FBZTs7RUFDZixtQkFBQSxHQUFzQjs7RUFDdEIsTUFBTSxDQUFDLE9BQVAsR0FDTTs7O0lBQ1MsZ0JBQUMsS0FBRDtNQUNYLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFERTs7cUJBR2IsS0FBQSxHQUFPLFNBQUMsR0FBRDtNQUNMLElBQUMsQ0FBQSxLQUFLLEVBQUMsT0FBRCxFQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUEzQixHQUFvQztNQUNwQyxJQUFDLENBQUEsZ0JBQUQsR0FBb0I7TUFDcEIsSUFBRyxHQUFHLENBQUMsS0FBSixDQUFVLGNBQVYsQ0FBSDtRQUNFLEdBQUEsR0FBTSxJQUFDLENBQUEsV0FBRCxDQUFhLEdBQWIsRUFEUjs7TUFFQSxJQUFHLEdBQUcsQ0FBQyxLQUFKLENBQVUsWUFBVixDQUFIO1FBQ0UsR0FBQSxHQUFNLElBQUMsQ0FBQSxTQUFELENBQVcsR0FBWCxFQURSOztNQUVBLElBQUcsR0FBRyxDQUFDLEtBQUosQ0FBVSxZQUFWLENBQUEsSUFBMkIsR0FBRyxDQUFDLEtBQUosQ0FBVSxpQkFBVixDQUEzQixJQUEyRCxHQUFHLENBQUMsS0FBSixDQUFVLG1CQUFWLENBQTlEO1FB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QixRQUFBLENBQVMsTUFBTyxDQUFBLENBQUEsQ0FBaEIsRUFBb0IsRUFBcEIsQ0FBbEIsR0FBOEMsTUFOcEQ7V0FERjtBQVFBLG1CQVRGOztBQXRCRjtNQWlDQSxLQUFBLEdBQVEsS0FBSyxDQUFDLEdBQU4sQ0FBVSxTQUFDLElBQUQ7ZUFBVSxJQUFJLENBQUM7TUFBZixDQUFWO01BQ1IsSUFBRyxLQUFLLENBQUMsT0FBTixDQUFjLE9BQWQsQ0FBQSxHQUF5QixDQUFDLENBQTdCO1FBQ0UsSUFBQyxDQUFBLEtBQUssRUFBQyxPQUFELEVBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQTNCLEdBQW9DLFFBRHRDO09BQUEsTUFFSyxJQUFHLEtBQUssQ0FBQyxPQUFOLENBQWMsU0FBZCxDQUFBLEdBQTJCLENBQUMsQ0FBL0I7UUFDSCxJQUFDLENBQUEsS0FBSyxFQUFDLE9BQUQsRUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBM0IsR0FBb0MsVUFEakM7T0FBQSxNQUVBLElBQUcsS0FBSyxDQUFDLE9BQU4sQ0FBYyxhQUFkLENBQUEsR0FBK0IsQ0FBQyxDQUFuQztRQUNILElBQUMsQ0FBQSxLQUFLLEVBQUMsT0FBRCxFQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUEzQixHQUFvQyxjQURqQzs7YUFFTCxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFkLEdBQW9CLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFsQixDQUF5QixLQUF6QjtJQTVDVjs7OztLQWhETztBQWpCckIiLCJzb3VyY2VzQ29udGVudCI6WyJ7IERpc3Bvc2FibGUgfSA9IHJlcXVpcmUgJ2F0b20nXG5wYXRoID0gcmVxdWlyZSAncGF0aCdcblxubGF0ZXhGaWxlID0gL14uKj9cXChcXC5cXC8oLio/XFwuXFx3KykvXG5sYXRleFBhdHRlcm4gPSAvXk91dHB1dFxcc3dyaXR0ZW5cXHNvblxccyguKilcXHNcXCguKlxcKVxcLiQvZ21cbmxhdGV4RmF0YWxQYXR0ZXJuID0gL0ZhdGFsIGVycm9yIG9jY3VycmVkLCBubyBvdXRwdXQgUERGIGZpbGUgcHJvZHVjZWQhL2dtXG5sYXRleEVycm9yID0gL14oPzooLiopOihcXGQrKTp8ISkoPzogKC4rKSBFcnJvcjopPyAoLis/KVxcLj8kL1xubGF0ZXhCb3ggPSAvXigoPzpPdmVyfFVuZGVyKWZ1bGwgXFxcXFt2aF1ib3ggXFwoW14pXSpcXCkpIGluIHBhcmFncmFwaCBhdCBsaW5lcyAoXFxkKyktLShcXGQrKSQvXG5sYXRleFdhcm4gPSAvXigoPzooPzpDbGFzc3xQYWNrYWdlKSBcXFMrKXxMYVRlWCkgKFdhcm5pbmd8SW5mbyk6XFxzKyguKj8pKD86IG9uIGlucHV0IGxpbmUgKFxcZCspKT9cXC4kL1xuXG5sYXRleG1rUGF0dGVybiA9IC9eTGF0ZXhtazpcXHNhcHBseWluZ1xcc3J1bGUvZ21cbmxhdGV4bWtQYXR0ZXJuTm9HTSA9IC9eTGF0ZXhtazpcXHNhcHBseWluZ1xcc3J1bGUvXG5sYXRleG1rVXBUb0RhdGUgPSAvXkxhdGV4bWs6IEFsbCB0YXJnZXRzIFxcKC4qXFwpIGFyZSB1cC10by1kYXRlL1xuXG5hcmFyYVBhdHRlcm4gPSAvUnVubmluZ1xccyg/OlthLXpBLVpdKilcXC5cXC5cXC4vZ1xuYXJhcmFGYWlsdXJlUGF0dGVybiA9IC8oRkFJTFVSRSkvZ1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgUGFyc2VyIGV4dGVuZHMgRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3RvcjogKGxhdGV4KSAtPlxuICAgIEBsYXRleCA9IGxhdGV4XG5cbiAgcGFyc2U6IChsb2cpIC0+XG4gICAgQGxhdGV4LnBhY2thZ2Uuc3RhdHVzLnZpZXcuc3RhdHVzID0gJ2dvb2QnXG4gICAgQGlzTGF0ZXhta1NraXBwZWQgPSBmYWxzZVxuICAgIGlmIGxvZy5tYXRjaChsYXRleG1rUGF0dGVybilcbiAgICAgIGxvZyA9IEB0cmltTGF0ZXhtayBsb2dcbiAgICBpZiBsb2cubWF0Y2goYXJhcmFQYXR0ZXJuKVxuICAgICAgbG9nID0gQHRyaW1BcmFyYSBsb2dcbiAgICBpZiBsb2cubWF0Y2gobGF0ZXhQYXR0ZXJuKSBvciBsb2cubWF0Y2gobGF0ZXhGYXRhbFBhdHRlcm4pIG9yIGxvZy5tYXRjaChhcmFyYUZhaWx1cmVQYXR0ZXJuKVxuICAgICAgQHBhcnNlTGF0ZXggbG9nXG4gICAgZWxzZSBpZiBAbGF0ZXhta1NraXBwZWQobG9nKVxuICAgICAgQGxhdGV4LnBhY2thZ2Uuc3RhdHVzLnZpZXcuc3RhdHVzID0gJ3NraXBwZWQnXG4gICAgICBAaXNMYXRleG1rU2tpcHBlZCA9IHRydWVcbiAgICBAbGF0ZXgucGFja2FnZS5zdGF0dXMudmlldy51cGRhdGUoKVxuICAgIEBsYXRleC5wYW5lbC52aWV3LnVwZGF0ZSgpXG4gICAgQGxhc3RGaWxlID0gQGxhdGV4Lm1haW5GaWxlXG5cbiAgdHJpbUxhdGV4bWs6IChsb2cpIC0+XG4gICAgbG9nID0gbG9nLnJlcGxhY2UoLyguezc4fShcXHd8XFxzfFxcZHxcXFxcfFxcLykpKFxcclxcbnxcXG4pL2csICckMScpXG4gICAgbGluZXMgPSBsb2cucmVwbGFjZSgvKFxcclxcbil8XFxyL2csICdcXG4nKS5zcGxpdCgnXFxuJylcbiAgICBmaW5hbExpbmUgPSAtMVxuICAgIGZvciBpbmRleCBvZiBsaW5lc1xuICAgICAgbGluZSA9IGxpbmVzW2luZGV4XVxuICAgICAgcmVzdWx0ID0gbGluZS5tYXRjaCBsYXRleG1rUGF0dGVybk5vR01cbiAgICAgIGlmIHJlc3VsdFxuICAgICAgICBmaW5hbExpbmUgPSBpbmRleFxuICAgIHJldHVybiBsaW5lcy5zbGljZShmaW5hbExpbmUpLmpvaW4oJ1xcbicpXG5cbiAgbGF0ZXhta1NraXBwZWQ6IChsb2cpIC0+XG4gICAgbGluZXMgPSBsb2cucmVwbGFjZSgvKFxcclxcbil8XFxyL2csICdcXG4nKS5zcGxpdCgnXFxuJylcbiAgICBpZiBsaW5lc1swXS5tYXRjaChsYXRleG1rVXBUb0RhdGUpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiBmYWxzZVxuXG4gIHRyaW1BcmFyYTogKGxvZykgLT5cbiAgICBhcmFyYVJ1bklkeCA9IFtdXG4gICAgbGluZXMgPSBsb2cucmVwbGFjZSgvKFxcclxcbil8XFxyL2csICdcXG4nKS5zcGxpdCgnXFxuJylcbiAgICBmb3IgaW5kZXggb2YgbGluZXNcbiAgICAgIGxpbmUgPSBsaW5lc1tpbmRleF1cbiAgICAgIHJlc3VsdCA9IGxpbmUubWF0Y2goL1J1bm5pbmdcXHMoPzpbYS16QS1aXSopXFwuXFwuXFwuLylcbiAgICAgIGlmIHJlc3VsdFxuICAgICAgICBhcmFyYVJ1bklkeCA9IGFyYXJhUnVuSWR4LmNvbmNhdCBpbmRleFxuICAgICMgUmV0dXJuIG9ubHkgbGFzdCBhcmFyYSBydW5cbiAgICByZXR1cm4gbGluZXMuc2xpY2UoYXJhcmFSdW5JZHguc2xpY2UoLTEpWzBdKS5qb2luKCdcXG4nKVxuXG4gIHBhcnNlTGF0ZXg6IChsb2cpIC0+XG4gICAgbG9nID0gbG9nLnJlcGxhY2UoLyguezc4fShcXHd8XFxzfFxcZHxcXFxcfFxcLykpKFxcclxcbnxcXG4pL2csICckMScpXG4gICAgbGluZXMgPSBsb2cucmVwbGFjZSgvKFxcclxcbil8XFxyL2csICdcXG4nKS5zcGxpdCgnXFxuJylcbiAgICBpdGVtcyA9IFtdXG4gICAgZm9yIGxpbmUgaW4gbGluZXNcbiAgICAgIGZpbGUgPSBsaW5lLm1hdGNoIGxhdGV4RmlsZVxuICAgICAgaWYgZmlsZVxuICAgICAgICBAbGFzdEZpbGUgPSBwYXRoLnJlc29sdmUocGF0aC5kaXJuYW1lKEBsYXRleC5tYWluRmlsZSksIGZpbGVbMV0pXG5cbiAgICAgIHJlc3VsdCA9IGxpbmUubWF0Y2ggbGF0ZXhCb3hcbiAgICAgIGlmIHJlc3VsdFxuICAgICAgICBpdGVtcy5wdXNoXG4gICAgICAgICAgdHlwZTogJ3R5cGVzZXR0aW5nJyxcbiAgICAgICAgICB0ZXh0OiByZXN1bHRbMV1cbiAgICAgICAgICBmaWxlOiBAbGFzdEZpbGVcbiAgICAgICAgICBsaW5lOiBwYXJzZUludChyZXN1bHRbMl0sIDEwKVxuICAgICAgICBjb250aW51ZVxuICAgICAgcmVzdWx0ID0gbGluZS5tYXRjaCBsYXRleFdhcm5cbiAgICAgIGlmIHJlc3VsdFxuICAgICAgICBpdGVtcy5wdXNoXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxuICAgICAgICAgIHRleHQ6IHJlc3VsdFszXVxuICAgICAgICAgIGZpbGU6IEBsYXN0RmlsZVxuICAgICAgICAgIGxpbmU6IHBhcnNlSW50IHJlc3VsdFs0XVxuICAgICAgICBjb250aW51ZVxuICAgICAgcmVzdWx0ID0gbGluZS5tYXRjaCBsYXRleEVycm9yXG4gICAgICBpZiByZXN1bHRcbiAgICAgICAgaXRlbXMucHVzaFxuICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgdGV4dDogaWYgcmVzdWx0WzNdIGFuZCByZXN1bHRbM10gIT0gJ0xhVGVYJyB0aGVuIFxcXG4gICAgICAgICAgICAgICAgXCJcIlwiI3tyZXN1bHRbM119OiAje3Jlc3VsdFs0XX1cIlwiXCIgZWxzZSByZXN1bHRbNF0sXG4gICAgICAgICAgZmlsZTogaWYgcmVzdWx0WzFdIHRoZW4gXFxcbiAgICAgICAgICAgIHBhdGgucmVzb2x2ZShwYXRoLmRpcm5hbWUoQGxhdGV4Lm1haW5GaWxlKSwgcmVzdWx0WzFdKSBlbHNlIFxcXG4gICAgICAgICAgICBAbGF0ZXgubWFpbkZpbGVcbiAgICAgICAgICBsaW5lOiBpZiByZXN1bHRbMl0gdGhlbiBwYXJzZUludCByZXN1bHRbMl0sIDEwIGVsc2UgdW5kZWZpbmVkXG4gICAgICAgIGNvbnRpbnVlXG5cbiAgICB0eXBlcyA9IGl0ZW1zLm1hcCgoaXRlbSkgLT4gaXRlbS50eXBlKVxuICAgIGlmIHR5cGVzLmluZGV4T2YoJ2Vycm9yJykgPiAtMVxuICAgICAgQGxhdGV4LnBhY2thZ2Uuc3RhdHVzLnZpZXcuc3RhdHVzID0gJ2Vycm9yJ1xuICAgIGVsc2UgaWYgdHlwZXMuaW5kZXhPZignd2FybmluZycpID4gLTFcbiAgICAgIEBsYXRleC5wYWNrYWdlLnN0YXR1cy52aWV3LnN0YXR1cyA9ICd3YXJuaW5nJ1xuICAgIGVsc2UgaWYgdHlwZXMuaW5kZXhPZigndHlwZXNldHRpbmcnKSA+IC0xXG4gICAgICBAbGF0ZXgucGFja2FnZS5zdGF0dXMudmlldy5zdGF0dXMgPSAndHlwZXNldHRpbmcnXG4gICAgQGxhdGV4LmxvZ2dlci5sb2cgPSBAbGF0ZXgubG9nZ2VyLmxvZy5jb25jYXQgaXRlbXNcbiJdfQ==
