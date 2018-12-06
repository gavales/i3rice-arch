(function() {
  var Citation, Disposable, bibEntries, fs, path,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Disposable = require('atom').Disposable;

  fs = require('fs');

  path = require('path');

  module.exports = Citation = (function(superClass) {
    extend(Citation, superClass);

    function Citation(latex) {
      this.latex = latex;
      this.suggestions = [];
      this.items = {};
    }

    Citation.prototype.provide = function(prefix) {
      var bib, description, item, j, k, len, len1, ref, ref1, suggestions;
      suggestions = [];
      if (prefix.length > 0) {
        ref = this.suggestions;
        for (j = 0, len = ref.length; j < len; j++) {
          item = ref[j];
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
      for (bib in this.items) {
        ref1 = this.items[bib];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          item = ref1[k];
          description = item.title;
          if (item.author != null) {
            description += " - " + (item.author.split(' and ').join('; '));
          }
          suggestions.push({
            text: item.key,
            type: 'tag',
            latexType: 'citation',
            description: description
          });
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

    Citation.prototype.getBibItems = function(bib) {
      var content, error, fileContent, item, itemPos, itemReg, items, prev_result, ref, result;
      items = [];
      if (!fs.existsSync(bib)) {
        return this.items;
      }
      fileContent = fs.readFileSync(bib, 'utf-8');
      content = fileContent.replace(/[\r\n]/g, ' ');
      itemReg = /@(\w+){/g;
      result = itemReg.exec(content);
      prev_result = void 0;
      try {
        while ((result != null) || (prev_result != null)) {
          if ((prev_result != null) && (ref = prev_result[1].toLowerCase(), indexOf.call(bibEntries, ref) >= 0)) {
            item = content.substring(prev_result.index, result != null ? result.index : void 0).trim();
            itemPos = fileContent.substring(0, prev_result.index).split('\n');
            items.push(this.splitBibItem(item));
          }
          prev_result = result;
          if (result != null) {
            result = itemReg.exec(content);
          }
        }
      } catch (error1) {
        error = error1;
        atom.notifications.addError("Error parsing citations in `" + (path.basename(bib)) + "`", {
          detail: "Unexpected syntax in the entry:\n\n" + (fileContent.substring(prev_result.index, result != null ? result.index : void 0)),
          dismissable: true,
          buttons: [
            {
              text: 'Open File',
              onDidClick: function() {
                return atom.workspace.open(bib, {
                  initialLine: itemPos.length - 1
                });
              }
            }
          ]
        });
      }
      return this.items[bib] = items;
    };

    Citation.prototype.splitBibItem = function(item) {
      var bibItem, char, eqSign, i, j, k, key, last, lastSplit, len, len1, segment, segments, unclosed, value;
      unclosed = 0;
      lastSplit = -1;
      segments = [];
      for (i = j = 0, len = item.length; j < len; i = ++j) {
        char = item[i];
        if (char === '{' && item[i - 1] !== '\\') {
          unclosed++;
        } else if (char === '}' && item[i - 1] !== '\\') {
          unclosed--;
        } else if (char === ',' && unclosed === 1) {
          segments.push(item.substring(lastSplit + 1, i).trim());
          lastSplit = i;
        }
      }
      segments.push(item.substring(lastSplit + 1).trim());
      bibItem = {};
      bibItem.key = segments.shift();
      bibItem.key = bibItem.key.substring(bibItem.key.indexOf('{') + 1);
      last = segments[segments.length - 1];
      last = last.substring(0, last.lastIndexOf('}'));
      segments[segments.length - 1] = last;
      for (k = 0, len1 = segments.length; k < len1; k++) {
        segment = segments[k];
        eqSign = segment.indexOf('=');
        key = segment.substring(0, eqSign).trim();
        value = segment.substring(eqSign + 1).trim();
        if (value[0] === '{' && value[value.length - 1] === '}') {
          value = value.substring(1, value.length - 1);
        }
        value = value.replace(/(\\.)|({)/g, '$1').replace(/(\\.)|(})/g, '$1');
        bibItem[key] = value;
      }
      return bibItem;
    };

    Citation.prototype.resetBibItems = function(bib) {
      if (bib != null) {
        return delete this.items[bib];
      } else {
        return this.items = [];
      }
    };

    return Citation;

  })(Disposable);

  bibEntries = ['article', 'book', 'bookinbook', 'booklet', 'collection', 'conference', 'inbook', 'incollection', 'inproceedings', 'inreference', 'manual', 'mastersthesis', 'misc', 'mvbook', 'mvcollection', 'mvproceedings', 'mvreference', 'online', 'patent', 'periodical', 'phdthesis', 'proceedings', 'reference', 'report', 'set', 'suppbook', 'suppcollection', 'suppperiodical', 'techreport', 'thesis', 'unpublished'];

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi9hdXRvY29tcGxldGUvY2l0YXRpb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSwwQ0FBQTtJQUFBOzs7O0VBQUUsYUFBZSxPQUFBLENBQVEsTUFBUjs7RUFDakIsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSOztFQUNMLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7RUFFUCxNQUFNLENBQUMsT0FBUCxHQUNNOzs7SUFDUyxrQkFBQyxLQUFEO01BQ1gsSUFBQyxDQUFBLEtBQUQsR0FBUztNQUNULElBQUMsQ0FBQSxXQUFELEdBQWU7TUFDZixJQUFDLENBQUEsS0FBRCxHQUFTO0lBSEU7O3VCQUliLE9BQUEsR0FBUyxTQUFDLE1BQUQ7QUFDUCxVQUFBO01BQUEsV0FBQSxHQUFjO01BQ2QsSUFBRyxNQUFNLENBQUMsTUFBUCxHQUFnQixDQUFuQjtBQUNFO0FBQUEsYUFBQSxxQ0FBQTs7VUFDRSxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBVixDQUFrQixNQUFsQixDQUFBLEdBQTRCLENBQUMsQ0FBaEM7WUFDRSxJQUFJLENBQUMsaUJBQUwsR0FBeUI7WUFDekIsV0FBVyxDQUFDLElBQVosQ0FBaUIsSUFBakIsRUFGRjs7QUFERjtRQUlBLFdBQVcsQ0FBQyxJQUFaLENBQWlCLFNBQUMsQ0FBRCxFQUFJLENBQUo7QUFDZixpQkFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQVAsQ0FBZSxNQUFmLENBQUEsR0FBeUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFQLENBQWUsTUFBZjtRQURqQixDQUFqQjtBQUVBLGVBQU8sWUFQVDs7TUFRQSxJQUFHLENBQUMsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZixDQUFBLENBQUo7QUFDRSxlQUFPLFlBRFQ7O0FBRUEsV0FBQSxpQkFBQTtB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QyxFQUdvRCxLQUhwRCxFQUcyRCxVQUgzRCxFQUd1RSxnQkFIdkUsRUFJQyxnQkFKRCxFQUltQixZQUpuQixFQUlpQyxRQUpqQyxFQUkyQyxhQUozQztBQTNHYiIsInNvdXJjZXNDb250ZW50IjpbInsgRGlzcG9zYWJsZSB9ID0gcmVxdWlyZSAnYXRvbSdcbmZzID0gcmVxdWlyZSAnZnMnXG5wYXRoID0gcmVxdWlyZSAncGF0aCdcblxubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgQ2l0YXRpb24gZXh0ZW5kcyBEaXNwb3NhYmxlXG4gIGNvbnN0cnVjdG9yOiAobGF0ZXgpIC0+XG4gICAgQGxhdGV4ID0gbGF0ZXhcbiAgICBAc3VnZ2VzdGlvbnMgPSBbXVxuICAgIEBpdGVtcyA9IHt9XG4gIHByb3ZpZGU6IChwcmVmaXgpIC0+XG4gICAgc3VnZ2VzdGlvbnMgPSBbXVxuICAgIGlmIHByZWZpeC5sZW5ndGggPiAwXG4gICAgICBmb3IgaXRlbSBpbiBAc3VnZ2VzdGlvbnNcbiAgICAgICAgaWYgaXRlbS50ZXh0LmluZGV4T2YocHJlZml4KSA+IC0xXG4gICAgICAgICAgaXRlbS5yZXBsYWNlbWVudFByZWZpeCA9IHByZWZpeFxuICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2ggaXRlbVxuICAgICAgc3VnZ2VzdGlvbnMuc29ydCgoYSwgYikgLT5cbiAgICAgICAgcmV0dXJuIGEudGV4dC5pbmRleE9mKHByZWZpeCkgLSBiLnRleHQuaW5kZXhPZihwcmVmaXgpKVxuICAgICAgcmV0dXJuIHN1Z2dlc3Rpb25zXG4gICAgaWYgIUBsYXRleC5tYW5hZ2VyLmZpbmRBbGwoKVxuICAgICAgcmV0dXJuIHN1Z2dlc3Rpb25zXG4gICAgZm9yIGJpYiBvZiBAaXRlbXNcbiAgICAgIGZvciBpdGVtIGluIEBpdGVtc1tiaWJdXG4gICAgICAgIGRlc2NyaXB0aW9uID0gaXRlbS50aXRsZVxuICAgICAgICBpZiBpdGVtLmF1dGhvcj9cbiAgICAgICAgICBkZXNjcmlwdGlvbiArPSBcIlwiXCIgLSAje2l0ZW0uYXV0aG9yLnNwbGl0KCcgYW5kICcpLmpvaW4oJzsgJyl9XCJcIlwiXG4gICAgICAgIHN1Z2dlc3Rpb25zLnB1c2hcbiAgICAgICAgICB0ZXh0OiBpdGVtLmtleVxuICAgICAgICAgIHR5cGU6ICd0YWcnXG4gICAgICAgICAgbGF0ZXhUeXBlOiAnY2l0YXRpb24nXG4gICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uXG4gICAgc3VnZ2VzdGlvbnMuc29ydCgoYSwgYikgLT5cbiAgICAgIHJldHVybiAtMSBpZiBhLnRleHQgPCBiLnRleHRcbiAgICAgIHJldHVybiAxKVxuICAgIEBzdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zXG4gICAgcmV0dXJuIHN1Z2dlc3Rpb25zXG5cbiAgZ2V0QmliSXRlbXM6IChiaWIpIC0+XG4gICAgaXRlbXMgPSBbXVxuICAgIGlmICFmcy5leGlzdHNTeW5jKGJpYilcbiAgICAgIHJldHVybiBAaXRlbXNcbiAgICBmaWxlQ29udGVudCA9IGZzLnJlYWRGaWxlU3luYyBiaWIsICd1dGYtOCdcbiAgICBjb250ZW50ID0gZmlsZUNvbnRlbnQucmVwbGFjZSgvW1xcclxcbl0vZywgJyAnKVxuICAgIGl0ZW1SZWcgPSAvQChcXHcrKXsvZ1xuICAgIHJlc3VsdCA9IGl0ZW1SZWcuZXhlYyBjb250ZW50XG4gICAgcHJldl9yZXN1bHQgPSB1bmRlZmluZWRcbiAgICB0cnlcbiAgICAgIHdoaWxlIHJlc3VsdD8gb3IgcHJldl9yZXN1bHQ/XG4gICAgICAgIGlmIHByZXZfcmVzdWx0PyBhbmQgcHJldl9yZXN1bHRbMV0udG9Mb3dlckNhc2UoKSBpbiBiaWJFbnRyaWVzXG4gICAgICAgICAgaXRlbSA9IGNvbnRlbnQuc3Vic3RyaW5nKHByZXZfcmVzdWx0LmluZGV4LCByZXN1bHQ/LmluZGV4KS50cmltKClcbiAgICAgICAgICBpdGVtUG9zID0gZmlsZUNvbnRlbnQuc3Vic3RyaW5nKDAsIHByZXZfcmVzdWx0LmluZGV4KS5zcGxpdCgnXFxuJylcbiAgICAgICAgICBpdGVtcy5wdXNoIEBzcGxpdEJpYkl0ZW0gaXRlbVxuICAgICAgICBwcmV2X3Jlc3VsdCA9IHJlc3VsdFxuICAgICAgICBpZiByZXN1bHQ/XG4gICAgICAgICAgcmVzdWx0ID0gaXRlbVJlZy5leGVjIGNvbnRlbnRcbiAgICBjYXRjaCBlcnJvclxuICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKFwiRXJyb3IgcGFyc2luZyBjaXRhdGlvbnMgaW4gYCN7cGF0aC5iYXNlbmFtZShiaWIpfWBcIixcbiAgICAgIGRldGFpbDogXCJcIlwiVW5leHBlY3RlZCBzeW50YXggaW4gdGhlIGVudHJ5OlxuXG4gICAgICAgICAgICAgICN7ZmlsZUNvbnRlbnQuc3Vic3RyaW5nKHByZXZfcmVzdWx0LmluZGV4LCByZXN1bHQ/LmluZGV4KX1cIlwiXCJcbiAgICAgIGRpc21pc3NhYmxlOnRydWVcbiAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgdGV4dDogJ09wZW4gRmlsZSdcbiAgICAgICAgb25EaWRDbGljazogLT5cbiAgICAgICAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGJpYixcbiAgICAgICAgICBpbml0aWFsTGluZTogaXRlbVBvcy5sZW5ndGgtMSlcbiAgICAgICAgXVxuICAgICAgKVxuICAgIEBpdGVtc1tiaWJdID0gaXRlbXNcblxuICBzcGxpdEJpYkl0ZW06IChpdGVtKSAtPlxuICAgIHVuY2xvc2VkID0gMFxuICAgIGxhc3RTcGxpdCA9IC0xXG4gICAgc2VnbWVudHMgPSBbXVxuICAgIGZvciBjaGFyLCBpIGluIGl0ZW1cbiAgICAgIGlmIGNoYXIgaXMgJ3snIGFuZCBpdGVtW2kgLSAxXSBpc250ICdcXFxcJ1xuICAgICAgICB1bmNsb3NlZCsrXG4gICAgICBlbHNlIGlmIGNoYXIgaXMgJ30nIGFuZCBpdGVtW2kgLSAxXSBpc250ICdcXFxcJ1xuICAgICAgICB1bmNsb3NlZC0tXG4gICAgICBlbHNlIGlmIGNoYXIgaXMgJywnIGFuZCB1bmNsb3NlZCBpcyAxXG4gICAgICAgIHNlZ21lbnRzLnB1c2ggaXRlbS5zdWJzdHJpbmcobGFzdFNwbGl0ICsgMSwgaSkudHJpbSgpXG4gICAgICAgIGxhc3RTcGxpdCA9IGlcbiAgICBzZWdtZW50cy5wdXNoIGl0ZW0uc3Vic3RyaW5nKGxhc3RTcGxpdCArIDEpLnRyaW0oKVxuICAgIGJpYkl0ZW0gPSB7fVxuICAgIGJpYkl0ZW0ua2V5ID0gc2VnbWVudHMuc2hpZnQoKVxuICAgIGJpYkl0ZW0ua2V5ID0gYmliSXRlbS5rZXkuc3Vic3RyaW5nKGJpYkl0ZW0ua2V5LmluZGV4T2YoJ3snKSArIDEpXG4gICAgbGFzdCA9IHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDFdXG4gICAgbGFzdCA9IGxhc3Quc3Vic3RyaW5nKDAsIGxhc3QubGFzdEluZGV4T2YoJ30nKSlcbiAgICBzZWdtZW50c1tzZWdtZW50cy5sZW5ndGggLSAxXSA9IGxhc3RcbiAgICBmb3Igc2VnbWVudCBpbiBzZWdtZW50c1xuICAgICAgZXFTaWduID0gc2VnbWVudC5pbmRleE9mKCc9JylcbiAgICAgIGtleSA9IHNlZ21lbnQuc3Vic3RyaW5nKDAsIGVxU2lnbikudHJpbSgpXG4gICAgICB2YWx1ZSA9IHNlZ21lbnQuc3Vic3RyaW5nKGVxU2lnbiArIDEpLnRyaW0oKVxuICAgICAgaWYgdmFsdWVbMF0gaXMgJ3snIGFuZCB2YWx1ZVt2YWx1ZS5sZW5ndGggLSAxXSBpcyAnfSdcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcoMSwgdmFsdWUubGVuZ3RoIC0gMSlcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvKFxcXFwuKXwoeykvZywgJyQxJykucmVwbGFjZSgvKFxcXFwuKXwofSkvZywgJyQxJylcbiAgICAgIGJpYkl0ZW1ba2V5XSA9IHZhbHVlXG4gICAgcmV0dXJuIGJpYkl0ZW1cblxuICByZXNldEJpYkl0ZW1zOiAoYmliKSAtPlxuICAgICMgUmVtb3ZlIHNwZWNpZmljIG9yIGFsbCBjaXRhdGlvbiBzdWdnZXN0aW9uc1xuICAgIGlmIGJpYj9cbiAgICAgIGRlbGV0ZSBAaXRlbXNbYmliXVxuICAgIGVsc2VcbiAgICAgIEBpdGVtcyA9IFtdXG5cbmJpYkVudHJpZXMgPSBbJ2FydGljbGUnLCAnYm9vaycsICdib29raW5ib29rJywgJ2Jvb2tsZXQnLCAnY29sbGVjdGlvbicsICdjb25mZXJlbmNlJywgJ2luYm9vaycsXG4gICAgICAgICAgICAgICdpbmNvbGxlY3Rpb24nLCAnaW5wcm9jZWVkaW5ncycsICdpbnJlZmVyZW5jZScsICdtYW51YWwnLCAnbWFzdGVyc3RoZXNpcycsICdtaXNjJyxcbiAgICAgICAgICAgICAgJ212Ym9vaycsICdtdmNvbGxlY3Rpb24nLCAnbXZwcm9jZWVkaW5ncycsICdtdnJlZmVyZW5jZScsICdvbmxpbmUnLCAncGF0ZW50JywgJ3BlcmlvZGljYWwnLFxuICAgICAgICAgICAgICAncGhkdGhlc2lzJywgJ3Byb2NlZWRpbmdzJywgJ3JlZmVyZW5jZScsICdyZXBvcnQnLCAnc2V0JywgJ3N1cHBib29rJywgJ3N1cHBjb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgJ3N1cHBwZXJpb2RpY2FsJywgJ3RlY2hyZXBvcnQnLCAndGhlc2lzJywgJ3VucHVibGlzaGVkJ11cbiJdfQ==
