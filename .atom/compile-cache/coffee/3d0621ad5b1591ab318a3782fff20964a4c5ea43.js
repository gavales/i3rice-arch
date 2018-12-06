(function() {
  var Disposable, Environment,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Disposable = require('atom').Disposable;

  module.exports = Environment = (function(superClass) {
    extend(Environment, superClass);

    function Environment(latex) {
      this.latex = latex;
    }

    Environment.prototype.provide = function(prefix) {
      var env, item, suggestions;
      suggestions = [];
      for (env in this.suggestions.latex) {
        item = this.suggestions.latex[env];
        if (prefix.length === 0 || item.text.indexOf(prefix) > -1) {
          item.replacementPrefix = prefix;
          item.type = 'tag';
          item.latexType = 'environment';
          suggestions.push(item);
        }
      }
      suggestions.sort(function(a, b) {
        if (a.text < b.text) {
          return -1;
        }
        return 1;
      });
      return suggestions;
    };

    Environment.prototype.suggestions = {
      latex: {
        figure: {
          text: 'figure',
          additionalInsert: '\\caption{title}'
        },
        table: {
          text: 'table',
          additionalInsert: '\\caption{title}'
        },
        description: {
          text: 'description',
          additionalInsert: '\\item [label] '
        },
        enumerate: {
          text: 'enumerate',
          additionalInsert: '\\item '
        },
        itemize: {
          text: 'itemize',
          additionalInsert: '\\item '
        },
        math: {
          text: 'math'
        },
        displaymath: {
          text: 'displaymath'
        },
        split: {
          text: 'split'
        },
        array: {
          text: 'array'
        },
        eqnarray: {
          text: 'eqnarray'
        },
        equation: {
          text: 'equation'
        },
        equationAst: {
          text: 'equation*'
        },
        subequations: {
          text: 'subequations'
        },
        subequationsAst: {
          text: 'subequations*'
        },
        multiline: {
          text: 'multiline'
        },
        multilineAst: {
          text: 'multiline*'
        },
        gather: {
          text: 'gather'
        },
        gatherAst: {
          text: 'gather*'
        },
        align: {
          text: 'align'
        },
        alignAst: {
          text: 'align*'
        },
        alignat: {
          text: 'alignat'
        },
        alignatAst: {
          text: 'alignat*'
        },
        flalign: {
          text: 'flalign'
        },
        flalignAst: {
          text: 'flalign*'
        },
        theorem: {
          text: 'theorem'
        },
        cases: {
          text: 'cases'
        },
        center: {
          text: 'center'
        },
        flushleft: {
          text: 'flushleft'
        },
        flushright: {
          text: 'flushright'
        },
        minipage: {
          text: 'minipage'
        },
        quotation: {
          text: 'quotation'
        },
        quote: {
          text: 'quote'
        },
        verbatim: {
          text: 'verbatim'
        },
        verse: {
          text: 'verse'
        },
        picture: {
          text: 'picture'
        },
        tabbing: {
          text: 'tabbing'
        },
        tabular: {
          text: 'tabular'
        },
        thebibliography: {
          text: 'thebibliography'
        },
        titlepage: {
          text: 'titlepage'
        },
        frame: {
          text: 'frame'
        }
      }
    };

    return Environment;

  })(Disposable);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi9hdXRvY29tcGxldGUvZW52aXJvbm1lbnQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSx1QkFBQTtJQUFBOzs7RUFBRSxhQUFlLE9BQUEsQ0FBUSxNQUFSOztFQUVqQixNQUFNLENBQUMsT0FBUCxHQUNNOzs7SUFDUyxxQkFBQyxLQUFEO01BQ1gsSUFBQyxDQUFBLEtBQUQsR0FBUztJQURFOzswQkFHYixPQUFBLEdBQVMsU0FBQyxNQUFEO0FBQ1AsVUFBQTtNQUFBLFdBQUEsR0FBYztBQUNkLFdBQUEsNkJBQUE7UUFDRSxJQUFBLEdBQU8sSUFBQyxDQUFBLFdBQVcsQ0FBQyxLQUFNLENBQUEsR0FBQTtRQUMxQixJQUFHLE1BQU0sQ0FBQyxNQUFQLEtBQWlCLENBQWpCLElBQXNCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBVixDQUFrQixNQUFsQixDQUFBLEdBQTRCLENBQUMsQ0FBdEQ7VUFDRSxJQUFJLENBQUMsaUJBQUwsR0FBeUI7VUFDekIsSUFBSSxDQUFDLElBQUwsR0FBWTtVQUNaLElBQUksQ0FBQyxTQUFMLEdBQWlCO1VBQ2pCLFdBQVcsQ0FBQyxJQUFaLENBQWlCLElBQWpCLEVBSkY7O0FBRkY7TUFPQSxXQUFXLENBQUMsSUFBWixDQUFpQixTQUFDLENBQUQsRUFBSSxDQUFKO1FBQ2YsSUFBYSxDQUFDLENBQUMsSUFBRixHQUFTLENBQUMsQ0FBQyxJQUF4QjtBQUFBLGlCQUFPLENBQUMsRUFBUjs7QUFDQSxlQUFPO01BRlEsQ0FBakI7QUFHQSxhQUFPO0lBWkE7OzBCQWNULFdBQUEsR0FDRTtNQUFBLEtBQUEsRUFDRTtRQUFBLE1BQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxRQUFOO1VBQ0EsZ0JBQUEsRUFBa0Isa0JBRGxCO1NBREY7UUFHQSxLQUFBLEVBQ0U7VUFBQSxJQUFBLEVBQU0sT0FBTjtVQUNBLGdCQUFBLEVBQWtCLGtCQURsQjtTQUpGO1FBTUEsV0FBQSxFQUNFO1VBQUEsSUFBQSxFQUFNLGFBQU47VUFDQSxnQkFBQSxFQUFrQixpQkFEbEI7U0FQRjtRQVNBLFNBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxXQUFOO1VBQ0EsZ0JBQUEsRUFBa0IsU0FEbEI7U0FWRjtRQVlBLE9BQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxTQUFOO1VBQ0EsZ0JBQUEsRUFBa0IsU0FEbEI7U0FiRjtRQWVBLElBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxNQUFOO1NBaEJGO1FBaUJBLFdBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxhQUFOO1NBbEJGO1FBbUJBLEtBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxPQUFOO1NBcEJGO1FBcUJBLEtBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxPQUFOO1NBdEJGO1FBdUJBLFFBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxVQUFOO1NBeEJGO1FBeUJBLFFBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxVQUFOO1NBMUJGO1FBMkJBLFdBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxXQUFOO1NBNUJGO1FBNkJBLFlBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxjQUFOO1NBOUJGO1FBK0JBLGVBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxlQUFOO1NBaENGO1FBaUNBLFNBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxXQUFOO1NBbENGO1FBbUNBLFlBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxZQUFOO1NBcENGO1FBcUNBLE1BQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxRQUFOO1NBdENGO1FBdUNBLFNBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxTQUFOO1NBeENGO1FBeUNBLEtBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxPQUFOO1NBMUNGO1FBMkNBLFFBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxRQUFOO1NBNUNGO1FBNkNBLE9BQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxTQUFOO1NBOUNGO1FBK0NBLFVBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxVQUFOO1NBaERGO1FBaURBLE9BQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxTQUFOO1NBbERGO1FBbURBLFVBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxVQUFOO1NBcERGO1FBcURBLE9BQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxTQUFOO1NBdERGO1FBdURBLEtBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxPQUFOO1NBeERGO1FBeURBLE1BQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxRQUFOO1NBMURGO1FBMkRBLFNBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxXQUFOO1NBNURGO1FBNkRBLFVBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxZQUFOO1NBOURGO1FBK0RBLFFBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxVQUFOO1NBaEVGO1FBaUVBLFNBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxXQUFOO1NBbEVGO1FBbUVBLEtBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxPQUFOO1NBcEVGO1FBcUVBLFFBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxVQUFOO1NBdEVGO1FBdUVBLEtBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxPQUFOO1NBeEVGO1FBeUVBLE9BQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxTQUFOO1NBMUVGO1FBMkVBLE9BQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxTQUFOO1NBNUVGO1FBNkVBLE9BQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxTQUFOO1NBOUVGO1FBK0VBLGVBQUEsRUFDRTtVQUFBLElBQUEsRUFBTSxpQkFBTjtTQWhGRjtRQWlGQSxTQUFBLEVBQ0U7VUFBQSxJQUFBLEVBQU0sV0FBTjtTQWxGRjtRQW1GQSxLQUFBLEVBQ0U7VUFBQSxJQUFBLEVBQU0sT0FBTjtTQXBGRjtPQURGOzs7OztLQW5Cc0I7QUFIMUIiLCJzb3VyY2VzQ29udGVudCI6WyJ7IERpc3Bvc2FibGUgfSA9IHJlcXVpcmUgJ2F0b20nXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIEVudmlyb25tZW50IGV4dGVuZHMgRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3RvcjogKGxhdGV4KSAtPlxuICAgIEBsYXRleCA9IGxhdGV4XG5cbiAgcHJvdmlkZTogKHByZWZpeCkgLT5cbiAgICBzdWdnZXN0aW9ucyA9IFtdXG4gICAgZm9yIGVudiBvZiBAc3VnZ2VzdGlvbnMubGF0ZXhcbiAgICAgIGl0ZW0gPSBAc3VnZ2VzdGlvbnMubGF0ZXhbZW52XVxuICAgICAgaWYgcHJlZml4Lmxlbmd0aCBpcyAwIG9yIGl0ZW0udGV4dC5pbmRleE9mKHByZWZpeCkgPiAtMVxuICAgICAgICBpdGVtLnJlcGxhY2VtZW50UHJlZml4ID0gcHJlZml4XG4gICAgICAgIGl0ZW0udHlwZSA9ICd0YWcnXG4gICAgICAgIGl0ZW0ubGF0ZXhUeXBlID0gJ2Vudmlyb25tZW50J1xuICAgICAgICBzdWdnZXN0aW9ucy5wdXNoIGl0ZW1cbiAgICBzdWdnZXN0aW9ucy5zb3J0KChhLCBiKSAtPlxuICAgICAgcmV0dXJuIC0xIGlmIGEudGV4dCA8IGIudGV4dFxuICAgICAgcmV0dXJuIDEpXG4gICAgcmV0dXJuIHN1Z2dlc3Rpb25zXG5cbiAgc3VnZ2VzdGlvbnM6XG4gICAgbGF0ZXg6XG4gICAgICBmaWd1cmU6XG4gICAgICAgIHRleHQ6ICdmaWd1cmUnXG4gICAgICAgIGFkZGl0aW9uYWxJbnNlcnQ6ICdcXFxcY2FwdGlvbnt0aXRsZX0nXG4gICAgICB0YWJsZTpcbiAgICAgICAgdGV4dDogJ3RhYmxlJ1xuICAgICAgICBhZGRpdGlvbmFsSW5zZXJ0OiAnXFxcXGNhcHRpb257dGl0bGV9J1xuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgIHRleHQ6ICdkZXNjcmlwdGlvbidcbiAgICAgICAgYWRkaXRpb25hbEluc2VydDogJ1xcXFxpdGVtIFtsYWJlbF0gJ1xuICAgICAgZW51bWVyYXRlOlxuICAgICAgICB0ZXh0OiAnZW51bWVyYXRlJ1xuICAgICAgICBhZGRpdGlvbmFsSW5zZXJ0OiAnXFxcXGl0ZW0gJ1xuICAgICAgaXRlbWl6ZTpcbiAgICAgICAgdGV4dDogJ2l0ZW1pemUnXG4gICAgICAgIGFkZGl0aW9uYWxJbnNlcnQ6ICdcXFxcaXRlbSAnXG4gICAgICBtYXRoOlxuICAgICAgICB0ZXh0OiAnbWF0aCdcbiAgICAgIGRpc3BsYXltYXRoOlxuICAgICAgICB0ZXh0OiAnZGlzcGxheW1hdGgnXG4gICAgICBzcGxpdDpcbiAgICAgICAgdGV4dDogJ3NwbGl0J1xuICAgICAgYXJyYXk6XG4gICAgICAgIHRleHQ6ICdhcnJheSdcbiAgICAgIGVxbmFycmF5OlxuICAgICAgICB0ZXh0OiAnZXFuYXJyYXknXG4gICAgICBlcXVhdGlvbjpcbiAgICAgICAgdGV4dDogJ2VxdWF0aW9uJ1xuICAgICAgZXF1YXRpb25Bc3Q6XG4gICAgICAgIHRleHQ6ICdlcXVhdGlvbionXG4gICAgICBzdWJlcXVhdGlvbnM6XG4gICAgICAgIHRleHQ6ICdzdWJlcXVhdGlvbnMnXG4gICAgICBzdWJlcXVhdGlvbnNBc3Q6XG4gICAgICAgIHRleHQ6ICdzdWJlcXVhdGlvbnMqJ1xuICAgICAgbXVsdGlsaW5lOlxuICAgICAgICB0ZXh0OiAnbXVsdGlsaW5lJ1xuICAgICAgbXVsdGlsaW5lQXN0OlxuICAgICAgICB0ZXh0OiAnbXVsdGlsaW5lKidcbiAgICAgIGdhdGhlcjpcbiAgICAgICAgdGV4dDogJ2dhdGhlcidcbiAgICAgIGdhdGhlckFzdDpcbiAgICAgICAgdGV4dDogJ2dhdGhlcionXG4gICAgICBhbGlnbjpcbiAgICAgICAgdGV4dDogJ2FsaWduJ1xuICAgICAgYWxpZ25Bc3Q6XG4gICAgICAgIHRleHQ6ICdhbGlnbionXG4gICAgICBhbGlnbmF0OlxuICAgICAgICB0ZXh0OiAnYWxpZ25hdCdcbiAgICAgIGFsaWduYXRBc3Q6XG4gICAgICAgIHRleHQ6ICdhbGlnbmF0KidcbiAgICAgIGZsYWxpZ246XG4gICAgICAgIHRleHQ6ICdmbGFsaWduJ1xuICAgICAgZmxhbGlnbkFzdDpcbiAgICAgICAgdGV4dDogJ2ZsYWxpZ24qJ1xuICAgICAgdGhlb3JlbTpcbiAgICAgICAgdGV4dDogJ3RoZW9yZW0nXG4gICAgICBjYXNlczpcbiAgICAgICAgdGV4dDogJ2Nhc2VzJ1xuICAgICAgY2VudGVyOlxuICAgICAgICB0ZXh0OiAnY2VudGVyJ1xuICAgICAgZmx1c2hsZWZ0OlxuICAgICAgICB0ZXh0OiAnZmx1c2hsZWZ0J1xuICAgICAgZmx1c2hyaWdodDpcbiAgICAgICAgdGV4dDogJ2ZsdXNocmlnaHQnXG4gICAgICBtaW5pcGFnZTpcbiAgICAgICAgdGV4dDogJ21pbmlwYWdlJ1xuICAgICAgcXVvdGF0aW9uOlxuICAgICAgICB0ZXh0OiAncXVvdGF0aW9uJ1xuICAgICAgcXVvdGU6XG4gICAgICAgIHRleHQ6ICdxdW90ZSdcbiAgICAgIHZlcmJhdGltOlxuICAgICAgICB0ZXh0OiAndmVyYmF0aW0nXG4gICAgICB2ZXJzZTpcbiAgICAgICAgdGV4dDogJ3ZlcnNlJ1xuICAgICAgcGljdHVyZTpcbiAgICAgICAgdGV4dDogJ3BpY3R1cmUnXG4gICAgICB0YWJiaW5nOlxuICAgICAgICB0ZXh0OiAndGFiYmluZydcbiAgICAgIHRhYnVsYXI6XG4gICAgICAgIHRleHQ6ICd0YWJ1bGFyJ1xuICAgICAgdGhlYmlibGlvZ3JhcGh5OlxuICAgICAgICB0ZXh0OiAndGhlYmlibGlvZ3JhcGh5J1xuICAgICAgdGl0bGVwYWdlOlxuICAgICAgICB0ZXh0OiAndGl0bGVwYWdlJ1xuICAgICAgZnJhbWU6XG4gICAgICAgIHRleHQ6ICdmcmFtZSdcbiJdfQ==
