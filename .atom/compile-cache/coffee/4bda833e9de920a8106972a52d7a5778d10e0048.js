(function() {
  var Disposable, FileExtsRegString, FileTypes, ImageTypes, SubFiles, fs, path,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  Disposable = require('atom').Disposable;

  path = require('path');

  fs = require('fs-plus');

  module.exports = SubFiles = (function(superClass) {
    extend(SubFiles, superClass);

    function SubFiles(latex) {
      this.latex = latex;
      this.suggestions = [];
      this.items = [];
    }

    SubFiles.prototype.provide = function(prefix, latexType) {
      var FileExts, activeFile, dirName, file, i, item, j, k, len, len1, len2, ref, ref1, ref2, results, suggestions;
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
      if (this.latex.manager.disable_watcher) {
        dirName = path.dirname(this.latex.mainFile);
        results = fs.listTreeSync(dirName);
        FileExts = Object.keys(ImageTypes);
        if (((ref1 = this.latex.manager.config) != null ? ref1.latex_ext : void 0) != null) {
          FileExts.push.apply(FileExts, [".tex", ".bib"].concat(slice.call(this.latex.manager.config.latex_ext)));
        }
        results = fs.listTreeSync(dirName).filter(function(res) {
          return res.match(RegExp("(|[\\/\\\\])\\.(?:" + (FileExts.join("|").replace(/\./g, '')) + ")", "g"));
        });
        for (j = 0, len1 = results.length; j < len1; j++) {
          file = results[j];
          this.getFileItems(file);
        }
      }
      activeFile = atom.project.relativizePath(atom.workspace.getActiveTextEditor().getPath())[1];
      ref2 = this.items;
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        item = ref2[k];
        if (item.latexType === (latexType || 'files-tex') && item.relPath !== activeFile) {
          suggestions.push(item);
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

    SubFiles.prototype.getFileItems = function(file) {
      var dirName, error, extType, latexType, relPath;
      dirName = path.dirname(this.latex.mainFile);
      relPath = path.relative(dirName, file);
      extType = path.extname(relPath);
      if (ImageTypes[extType] != null) {
        latexType = 'files-img';
      } else if (extType === '.bib') {
        latexType = 'files-bib';
      } else {
        latexType = 'files-tex';
      }
      try {
        return this.items.push({
          relPath: relPath,
          text: relPath.replace(/\\/g, '/').replace(RegExp("\\.(?:tex|" + FileExtsRegString + ")"), ''),
          displayText: relPath.substr(0, relPath.lastIndexOf('.')).replace(/\\/g, '/'),
          rightLabel: extType.replace('.', ''),
          iconHTML: "<i class=\"" + (ImageTypes[extType] || FileTypes[extType] || "icon-file-text") + "\"></i>",
          latexType: latexType
        });
      } catch (error1) {
        error = error1;
        return console.log(error);
      }
    };

    SubFiles.prototype.resetFileItems = function(file) {
      var pos, relPath;
      if (file != null) {
        relPath = path.relative(path.dirname(this.latex.mainFile), file);
        pos = this.items.map(function(item) {
          return item.relPath;
        }).indexOf(relPath);
        return this.items.splice(pos, 1);
      } else {
        return this.items = [];
      }
    };

    return SubFiles;

  })(Disposable);

  ImageTypes = {
    '.png': "medium-orange icon-file-media",
    '.eps': "postscript-icon medium-orange icon-file-media",
    '.jpeg': "medium-green icon-file-media",
    '.jpg': "medium-green icon-file-media",
    '.pdf': "medium-red icon-file-pdf"
  };

  FileTypes = {
    '.tex': "tex-icon medium-blue icon-file-text",
    '.cls': "tex-icon medium-orange icon-file-text",
    '.tikz': "tex-icon medium-green icon-file-text",
    '.Rnw': "tex-icon medium-green icon-file-text",
    '.bib': "bibtex-icon medium-yellow icon-file-text"
  };

  FileExtsRegString = "" + (Object.keys(ImageTypes).join("|").replace(/\./g, ''));

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi9hdXRvY29tcGxldGUvc3ViRmlsZXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSx3RUFBQTtJQUFBOzs7O0VBQUUsYUFBZSxPQUFBLENBQVEsTUFBUjs7RUFDakIsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSOztFQUNQLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUjs7RUFFTCxNQUFNLENBQUMsT0FBUCxHQUNNOzs7SUFDUyxrQkFBQyxLQUFEO01BQ1gsSUFBQyxDQUFBLEtBQUQsR0FBUztNQUNULElBQUMsQ0FBQSxXQUFELEdBQWU7TUFDZixJQUFDLENBQUEsS0FBRCxHQUFTO0lBSEU7O3VCQUtiLE9BQUEsR0FBUyxTQUFDLE1BQUQsRUFBUSxTQUFSO0FBQ1AsVUFBQTtNQUFBLFdBQUEsR0FBYztNQUNkLElBQUcsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsQ0FBbkI7QUFDRTtBQUFBLGFBQUEscUNBQUE7O1VBQ0UsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsTUFBbEIsQ0FBQSxHQUE0QixDQUFDLENBQWhDO1lBQ0UsSUFBSSxDQUFDLGlCQUFMLEdBQXlCO1lBQ3pCLFdBQVcsQ0FBQyxJQUFaLENBQWlCLElBQWpCLEVBRkY7O0FBREY7UUFJQSxXQUFXLENBQUMsSUFBWixDQUFpQixTQUFDLENBQUQsRUFBSSxDQUFKO0FBQ2YsaUJBQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFQLENBQWUsTUFBZixDQUFBLEdBQXlCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBUCxDQUFlLE1BQWY7UUFEakIsQ0FBakI7QUFFQSxlQUFPLFlBUFQ7O01BU0EsSUFBRyxDQUFDLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQWYsQ0FBQSxDQUFKO0FBQ0UsZUFBTyxZQURUOztNQUdBLElB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QTdGdEIiLCJzb3VyY2VzQ29udGVudCI6WyJ7IERpc3Bvc2FibGUgfSA9IHJlcXVpcmUgJ2F0b20nXG5wYXRoID0gcmVxdWlyZSAncGF0aCdcbmZzID0gcmVxdWlyZSAnZnMtcGx1cydcblxubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgU3ViRmlsZXMgZXh0ZW5kcyBEaXNwb3NhYmxlXG4gIGNvbnN0cnVjdG9yOiAobGF0ZXgpIC0+XG4gICAgQGxhdGV4ID0gbGF0ZXhcbiAgICBAc3VnZ2VzdGlvbnMgPSBbXVxuICAgIEBpdGVtcyA9IFtdXG5cbiAgcHJvdmlkZTogKHByZWZpeCxsYXRleFR5cGUpIC0+XG4gICAgc3VnZ2VzdGlvbnMgPSBbXVxuICAgIGlmIHByZWZpeC5sZW5ndGggPiAwXG4gICAgICBmb3IgaXRlbSBpbiBAc3VnZ2VzdGlvbnNcbiAgICAgICAgaWYgaXRlbS50ZXh0LmluZGV4T2YocHJlZml4KSA+IC0xXG4gICAgICAgICAgaXRlbS5yZXBsYWNlbWVudFByZWZpeCA9IHByZWZpeFxuICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2ggaXRlbVxuICAgICAgc3VnZ2VzdGlvbnMuc29ydCgoYSwgYikgLT5cbiAgICAgICAgcmV0dXJuIGEudGV4dC5pbmRleE9mKHByZWZpeCkgLSBiLnRleHQuaW5kZXhPZihwcmVmaXgpKVxuICAgICAgcmV0dXJuIHN1Z2dlc3Rpb25zXG5cbiAgICBpZiAhQGxhdGV4Lm1hbmFnZXIuZmluZEFsbCgpXG4gICAgICByZXR1cm4gc3VnZ2VzdGlvbnNcblxuICAgIGlmIEBsYXRleC5tYW5hZ2VyLmRpc2FibGVfd2F0Y2hlclxuICAgICAgZGlyTmFtZSA9IHBhdGguZGlybmFtZShAbGF0ZXgubWFpbkZpbGUpXG4gICAgICByZXN1bHRzID0gIGZzLmxpc3RUcmVlU3luYyhkaXJOYW1lKVxuICAgICAgRmlsZUV4dHMgPSBPYmplY3Qua2V5cyhJbWFnZVR5cGVzKVxuICAgICAgaWYgQGxhdGV4Lm1hbmFnZXIuY29uZmlnPy5sYXRleF9leHQ/XG4gICAgICAgIEZpbGVFeHRzLnB1c2ggXCIudGV4XCIgLCBcIi5iaWJcIiAsIEBsYXRleC5tYW5hZ2VyLmNvbmZpZy5sYXRleF9leHQuLi5cbiAgICAgICMgRmlsdGVyIHJlc3VsdHNcbiAgICAgIHJlc3VsdHMgPSBmcy5saXN0VHJlZVN5bmMoZGlyTmFtZSkuZmlsdGVyIChyZXMpIC0+IHJldHVybiBcXFxuICAgICAgIHJlcy5tYXRjaCgvLy8ofFtcXC9cXFxcXSlcXC4oPzoje0ZpbGVFeHRzLmpvaW4oXCJ8XCIpLnJlcGxhY2UoL1xcLi9nLCcnKX0pLy8vZylcbiAgICAgIEBnZXRGaWxlSXRlbXMoZmlsZSkgZm9yIGZpbGUgaW4gcmVzdWx0c1xuXG4gICAgYWN0aXZlRmlsZSA9IGF0b20ucHJvamVjdC5yZWxhdGl2aXplUGF0aChhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKCkuZ2V0UGF0aCgpKVsxXVxuICAgICMgUHVzaCBmaWx0ZXJlZCBpdGVtcyB0byBzdWdnZXN0aW9uc1xuICAgIGZvciBpdGVtIGluIEBpdGVtcyB3aGVuIGl0ZW0ubGF0ZXhUeXBlIGlzIChsYXRleFR5cGUgfHwgJ2ZpbGVzLXRleCcpIGFuZFxcXG4gICAgICBpdGVtLnJlbFBhdGggaXNudCBhY3RpdmVGaWxlXG4gICAgICAgIHN1Z2dlc3Rpb25zLnB1c2ggaXRlbVxuXG4gICAgc3VnZ2VzdGlvbnMuc29ydCgoYSwgYikgLT5cbiAgICAgIHJldHVybiAtMSBpZiBhLnRleHQgPCBiLnRleHRcbiAgICAgIHJldHVybiAxKVxuICAgIEBzdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zXG4gICAgcmV0dXJuIHN1Z2dlc3Rpb25zXG5cbiAgZ2V0RmlsZUl0ZW1zOiAoZmlsZSkgLT5cbiAgICBkaXJOYW1lID0gcGF0aC5kaXJuYW1lKEBsYXRleC5tYWluRmlsZSlcbiAgICByZWxQYXRoID0gcGF0aC5yZWxhdGl2ZShkaXJOYW1lLGZpbGUpXG4gICAgZXh0VHlwZSA9IHBhdGguZXh0bmFtZShyZWxQYXRoKVxuICAgIGlmIEltYWdlVHlwZXNbZXh0VHlwZV0/XG4gICAgICBsYXRleFR5cGUgPSAnZmlsZXMtaW1nJ1xuICAgIGVsc2UgaWYgZXh0VHlwZSA9PSAnLmJpYidcbiAgICAgIGxhdGV4VHlwZSA9ICdmaWxlcy1iaWInXG4gICAgZWxzZVxuICAgICAgbGF0ZXhUeXBlID0gJ2ZpbGVzLXRleCdcbiAgICB0cnlcbiAgICAgIEBpdGVtcy5wdXNoXG4gICAgICAgIHJlbFBhdGg6IHJlbFBhdGhcbiAgICAgICAgdGV4dDogcmVsUGF0aC5yZXBsYWNlKC9cXFxcL2csICcvJykucmVwbGFjZSgvLy9cXC4oPzp0ZXh8I3tGaWxlRXh0c1JlZ1N0cmluZ30pLy8vLCcnKVxuICAgICAgICBkaXNwbGF5VGV4dDogcmVsUGF0aC5zdWJzdHIoXG4gICAgICAgICAgICAgICAgIDAsIHJlbFBhdGgubGFzdEluZGV4T2YoJy4nKSkucmVwbGFjZSggL1xcXFwvZywnLycpXG4gICAgICAgIHJpZ2h0TGFiZWw6IGV4dFR5cGUucmVwbGFjZSgnLicsJycpXG4gICAgICAgIGljb25IVE1MOiBcIlwiXCI8aSBjbGFzcz1cIiN7KEltYWdlVHlwZXNbZXh0VHlwZV0gfHwgRmlsZVR5cGVzW2V4dFR5cGVdIHx8IFwiaWNvbi1maWxlLXRleHRcIil9XCI+PC9pPlwiXCJcIlxuICAgICAgICBsYXRleFR5cGU6IGxhdGV4VHlwZVxuICAgIGNhdGNoIGVycm9yXG4gICAgICBjb25zb2xlLmxvZyBlcnJvclxuXG4gIHJlc2V0RmlsZUl0ZW1zOihmaWxlKSAtPlxuICAgIGlmIGZpbGU/XG4gICAgICByZWxQYXRoID0gcGF0aC5yZWxhdGl2ZShwYXRoLmRpcm5hbWUoQGxhdGV4Lm1haW5GaWxlKSxmaWxlKVxuICAgICAgcG9zID0gQGl0ZW1zLm1hcCgoaXRlbSkgLT4gaXRlbS5yZWxQYXRoKS5pbmRleE9mKHJlbFBhdGgpXG4gICAgICBAaXRlbXMuc3BsaWNlKHBvcywxKVxuICAgIGVsc2VcbiAgICAgIEBpdGVtcyA9IFtdXG5cbiMgVXNlIGZpbGUtaWNvbnMgYXMgZGVmYXVsdCB3aXRoIEdpdCBPY3RpY29ucyBhcyBiYWNrdXBzXG5JbWFnZVR5cGVzID1cbiAgJy5wbmcnOiAgIFwibWVkaXVtLW9yYW5nZSBpY29uLWZpbGUtbWVkaWFcIlxuICAnLmVwcyc6ICAgXCJwb3N0c2NyaXB0LWljb24gbWVkaXVtLW9yYW5nZSBpY29uLWZpbGUtbWVkaWFcIlxuICAnLmpwZWcnOiAgXCJtZWRpdW0tZ3JlZW4gaWNvbi1maWxlLW1lZGlhXCJcbiAgJy5qcGcnOiAgIFwibWVkaXVtLWdyZWVuIGljb24tZmlsZS1tZWRpYVwiXG4gICcucGRmJzogICBcIm1lZGl1bS1yZWQgaWNvbi1maWxlLXBkZlwiXG5GaWxlVHlwZXMgID1cbiAgJy50ZXgnOiBcInRleC1pY29uIG1lZGl1bS1ibHVlIGljb24tZmlsZS10ZXh0XCJcbiAgJy5jbHMnOiBcInRleC1pY29uIG1lZGl1bS1vcmFuZ2UgaWNvbi1maWxlLXRleHRcIlxuICAnLnRpa3onOiBcInRleC1pY29uIG1lZGl1bS1ncmVlbiBpY29uLWZpbGUtdGV4dFwiXG4gICcuUm53JzogXCJ0ZXgtaWNvbiBtZWRpdW0tZ3JlZW4gaWNvbi1maWxlLXRleHRcIlxuICAnLmJpYic6IFwiYmlidGV4LWljb24gbWVkaXVtLXllbGxvdyBpY29uLWZpbGUtdGV4dFwiXG5cbiMgU3RyaW5nIG9mIGZpbGUgdHlwZXMgdG8gc3RyaXAgZXh0ZW50aW9uc1xuRmlsZUV4dHNSZWdTdHJpbmcgPSBcIiN7T2JqZWN0LmtleXMoSW1hZ2VUeXBlcykuam9pbihcInxcIikucmVwbGFjZSgvXFwuL2csJycpfVwiXG4iXX0=
