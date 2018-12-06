Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @babel */
/** @jsx etch.dom */

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _atom = require('atom');

var Status = (function (_Disposable) {
  _inherits(Status, _Disposable);

  function Status() {
    _classCallCheck(this, Status);

    _get(Object.getPrototypeOf(Status.prototype), 'constructor', this).call(this);
  }

  _createClass(Status, [{
    key: 'attach',
    value: function attach(statusBar) {
      this.view = new StatusView();
      this.tile = statusBar.addLeftTile({
        item: this.view,
        priority: -10
      });
    }
  }, {
    key: 'detach',
    value: function detach() {
      if (this.tile) {
        this.tile.destroy();
        this.tile = undefined;
      }
      if (this.view) {
        this.view.destroy();
        this.view = undefined;
      }
    }
  }]);

  return Status;
})(_atom.Disposable);

exports['default'] = Status;

var StatusView = (function () {
  function StatusView() {
    var _this = this;

    _classCallCheck(this, StatusView);

    _etch2['default'].initialize(this);
    this.addTooltip();
    atom.workspace.onDidChangeActivePaneItem(function () {
      return _etch2['default'].update(_this);
    });
    this.status = 'ready';
  }

  _createClass(StatusView, [{
    key: 'destroy',
    value: _asyncToGenerator(function* () {
      if (this.tooltip) {
        this.tooltip.dispose();
      }
      yield _etch2['default'].destroy(this);
    })
  }, {
    key: 'addTooltip',
    value: function addTooltip() {
      if (this.tooltip) {
        this.tooltip.dispose();
      }
      this.tooltip = atom.tooltips.add(this.element, { title: 'Atom-LaTeX Panel' });
    }
  }, {
    key: 'update',
    value: function update() {
      this.addTooltip();
      return _etch2['default'].update(this);
    }
  }, {
    key: 'shouldDisplay',
    value: function shouldDisplay() {
      var editor = atom.workspace.getActiveTextEditor();
      if (!editor) {
        return false;
      }
      var grammar = editor.getGrammar();
      if (!grammar) {
        return false;
      }
      if (grammar.packageName === 'atom-latex' || grammar.scopeName.indexOf('text.tex.latex') > -1) {
        return true;
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.shouldDisplay()) {
        return _etch2['default'].dom('div', { id: 'atom-latex-status-bar', style: 'display: none' });
      }
      var handleClick = function handleClick() {
        if (atom_latex.latex) atom_latex.latex.panel.togglePanel();
      };
      return _etch2['default'].dom(
        'div',
        { id: 'atom-latex-status-bar', style: 'display: inline-block', onclick: handleClick },
        _etch2['default'].dom('i', { id: 'atom-latex-status-bar-icon', className: 'fa ' + this.getIcon() }),
        _etch2['default'].dom(
          'span',
          { style: 'margin-left: 5px' },
          'LaTeX'
        )
      );
    }
  }, {
    key: 'getIcon',
    value: function getIcon() {
      switch (this.status) {
        case 'error':
          return 'fa-times-circle';
        case 'warning':
          return 'fa-exclamation-circle';
        case 'typesetting':
          return 'fa-question-circle';
        case 'good':
          return 'fa-check-circle';
        case 'building':
          return 'fa-cog fa-spin';
        case 'skipped':
          return 'fa-question-circle atom-latex-latexmk-skipped';
        default:
          return 'fa-file-text-o';
      }
    }
  }]);

  return StatusView;
})();

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2dhdmFyY2gvLmF0b20vcGFja2FnZXMvYXRvbS1sYXRleC9saWIvdmlldy9zdGF0dXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkFHaUIsTUFBTTs7OztvQkFDSSxNQUFNOztJQUVaLE1BQU07WUFBTixNQUFNOztBQUNkLFdBRFEsTUFBTSxHQUNYOzBCQURLLE1BQU07O0FBRXZCLCtCQUZpQixNQUFNLDZDQUVoQjtHQUNSOztlQUhrQixNQUFNOztXQUtuQixnQkFBQyxTQUFTLEVBQUU7QUFDaEIsVUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFBO0FBQzVCLFVBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQztBQUNoQyxZQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7QUFDZixnQkFBUSxFQUFFLENBQUMsRUFBRTtPQUNkLENBQUMsQ0FBQTtLQUNIOzs7V0FFSyxrQkFBRztBQUNQLFVBQUksSUFBSSxDQUFDLElBQUksRUFBRTtBQUNiLFlBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDbkIsWUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUE7T0FDdEI7QUFDRCxVQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFDYixZQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQ25CLFlBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFBO09BQ3RCO0tBQ0Y7OztTQXRCa0IsTUFBTTs7O3FCQUFOLE1BQU07O0lBeUJyQixVQUFVO0FBQ0gsV0FEUCxVQUFVLEdBQ0E7OzswQkFEVixVQUFVOztBQUVaLHNCQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNyQixRQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7QUFDakIsUUFBSSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQzthQUFNLGtCQUFLLE1BQU0sT0FBTTtLQUFBLENBQUMsQ0FBQTtBQUNqRSxRQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQTtHQUN0Qjs7ZUFORyxVQUFVOzs2QkFRRCxhQUFHO0FBQ2QsVUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2hCLFlBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7T0FDdkI7QUFDRCxZQUFNLGtCQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUN6Qjs7O1dBRVMsc0JBQUc7QUFDWCxVQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDaEIsWUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtPQUN2QjtBQUNELFVBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUE7S0FDOUU7OztXQUVLLGtCQUFHO0FBQ1AsVUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0FBQ2pCLGFBQU8sa0JBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ3pCOzs7V0FFWSx5QkFBRztBQUNkLFVBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtBQUNqRCxVQUFJLENBQUMsTUFBTSxFQUFFO0FBQ1gsZUFBTyxLQUFLLENBQUE7T0FDYjtBQUNELFVBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQTtBQUNqQyxVQUFJLENBQUMsT0FBTyxFQUFFO0FBQ1osZUFBTyxLQUFLLENBQUE7T0FDYjtBQUNELFVBQUksQUFBQyxPQUFPLENBQUMsV0FBVyxLQUFLLFlBQVksSUFDdEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQUFBQyxFQUFFO0FBQ3BELGVBQU8sSUFBSSxDQUFBO09BQ1o7QUFDRCxhQUFPLEtBQUssQ0FBQTtLQUNiOzs7V0FFSyxrQkFBRztBQUNQLFVBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUU7QUFDekIsZUFBTywrQkFBSyxFQUFFLEVBQUMsdUJBQXVCLEVBQUMsS0FBSyxFQUFDLGVBQWUsR0FBRSxDQUFBO09BQy9EO0FBQ0QsVUFBSSxXQUFXLEdBQUcsU0FBZCxXQUFXLEdBQVM7QUFDdEIsWUFBSSxVQUFVLENBQUMsS0FBSyxFQUNsQixVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQTtPQUN2QyxDQUFBO0FBQ0QsYUFDRTs7VUFBSyxFQUFFLEVBQUMsdUJBQXVCLEVBQUMsS0FBSyxFQUFDLHVCQUF1QixFQUFDLE9BQU8sRUFBRSxXQUFXLEFBQUM7UUFDakYsNkJBQUcsRUFBRSxFQUFDLDRCQUE0QixFQUFDLFNBQVMsVUFBUSxJQUFJLENBQUMsT0FBTyxFQUFFLEFBQUcsR0FBRTtRQUN2RTs7WUFBTSxLQUFLLEVBQUMsa0JBQWtCOztTQUFhO09BQ3ZDLENBQ1A7S0FDRjs7O1dBRU0sbUJBQUc7QUFDUixjQUFRLElBQUksQ0FBQyxNQUFNO0FBQ2pCLGFBQUssT0FBTztBQUNWLGlCQUFPLGlCQUFpQixDQUFBO0FBQUEsQUFDMUIsYUFBSyxTQUFTO0FBQ1osaUJBQU8sdUJBQXVCLENBQUE7QUFBQSxBQUNoQyxhQUFLLGFBQWE7QUFDaEIsaUJBQU8sb0JBQW9CLENBQUE7QUFBQSxBQUM3QixhQUFLLE1BQU07QUFDVCxpQkFBTyxpQkFBaUIsQ0FBQTtBQUFBLEFBQzFCLGFBQUssVUFBVTtBQUNiLGlCQUFPLGdCQUFnQixDQUFBO0FBQUEsQUFDekIsYUFBSyxTQUFTO0FBQ1osaUJBQU8sK0NBQStDLENBQUE7QUFBQSxBQUN4RDtBQUNFLGlCQUFPLGdCQUFnQixDQUFBO0FBQUEsT0FDMUI7S0FDRjs7O1NBNUVHLFVBQVUiLCJmaWxlIjoiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi92aWV3L3N0YXR1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAYmFiZWwgKi9cbi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQgeyBEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHVzIGV4dGVuZHMgRGlzcG9zYWJsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcbiAgfVxuXG4gIGF0dGFjaChzdGF0dXNCYXIpIHtcbiAgICB0aGlzLnZpZXcgPSBuZXcgU3RhdHVzVmlldygpXG4gICAgdGhpcy50aWxlID0gc3RhdHVzQmFyLmFkZExlZnRUaWxlKHtcbiAgICAgIGl0ZW06IHRoaXMudmlldyxcbiAgICAgIHByaW9yaXR5OiAtMTBcbiAgICB9KVxuICB9XG5cbiAgZGV0YWNoKCkge1xuICAgIGlmICh0aGlzLnRpbGUpIHtcbiAgICAgIHRoaXMudGlsZS5kZXN0cm95KClcbiAgICAgIHRoaXMudGlsZSA9IHVuZGVmaW5lZFxuICAgIH1cbiAgICBpZiAodGhpcy52aWV3KSB7XG4gICAgICB0aGlzLnZpZXcuZGVzdHJveSgpXG4gICAgICB0aGlzLnZpZXcgPSB1bmRlZmluZWRcbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgU3RhdHVzVmlldyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICAgIHRoaXMuYWRkVG9vbHRpcCgpXG4gICAgYXRvbS53b3Jrc3BhY2Uub25EaWRDaGFuZ2VBY3RpdmVQYW5lSXRlbSgoKSA9PiBldGNoLnVwZGF0ZSh0aGlzKSlcbiAgICB0aGlzLnN0YXR1cyA9ICdyZWFkeSdcbiAgfVxuXG4gIGFzeW5jIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgdGhpcy50b29sdGlwLmRpc3Bvc2UoKVxuICAgIH1cbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgfVxuXG4gIGFkZFRvb2x0aXAoKSB7XG4gICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgdGhpcy50b29sdGlwLmRpc3Bvc2UoKVxuICAgIH1cbiAgICB0aGlzLnRvb2x0aXAgPSBhdG9tLnRvb2x0aXBzLmFkZCh0aGlzLmVsZW1lbnQsIHsgdGl0bGU6ICdBdG9tLUxhVGVYIFBhbmVsJyB9KVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMuYWRkVG9vbHRpcCgpXG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBzaG91bGREaXNwbGF5KCkge1xuICAgIGxldCBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcbiAgICBpZiAoIWVkaXRvcikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGxldCBncmFtbWFyID0gZWRpdG9yLmdldEdyYW1tYXIoKVxuICAgIGlmICghZ3JhbW1hcikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmICgoZ3JhbW1hci5wYWNrYWdlTmFtZSA9PT0gJ2F0b20tbGF0ZXgnKSB8fFxuICAgICAgKGdyYW1tYXIuc2NvcGVOYW1lLmluZGV4T2YoJ3RleHQudGV4LmxhdGV4JykgPiAtMSkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5zaG91bGREaXNwbGF5KCkpIHtcbiAgICAgIHJldHVybiA8ZGl2IGlkPVwiYXRvbS1sYXRleC1zdGF0dXMtYmFyXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIvPlxuICAgIH1cbiAgICBsZXQgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICBpZiAoYXRvbV9sYXRleC5sYXRleClcbiAgICAgICAgYXRvbV9sYXRleC5sYXRleC5wYW5lbC50b2dnbGVQYW5lbCgpXG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiYXRvbS1sYXRleC1zdGF0dXMtYmFyXCIgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2tcIiBvbmNsaWNrPXtoYW5kbGVDbGlja30+XG4gICAgICAgIDxpIGlkPVwiYXRvbS1sYXRleC1zdGF0dXMtYmFyLWljb25cIiBjbGFzc05hbWU9e2BmYSAke3RoaXMuZ2V0SWNvbigpfWB9Lz5cbiAgICAgICAgPHNwYW4gc3R5bGU9XCJtYXJnaW4tbGVmdDogNXB4XCI+TGFUZVg8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBnZXRJY29uKCkge1xuICAgIHN3aXRjaCAodGhpcy5zdGF0dXMpIHtcbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgcmV0dXJuICdmYS10aW1lcy1jaXJjbGUnXG4gICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgcmV0dXJuICdmYS1leGNsYW1hdGlvbi1jaXJjbGUnXG4gICAgICBjYXNlICd0eXBlc2V0dGluZyc6XG4gICAgICAgIHJldHVybiAnZmEtcXVlc3Rpb24tY2lyY2xlJ1xuICAgICAgY2FzZSAnZ29vZCc6XG4gICAgICAgIHJldHVybiAnZmEtY2hlY2stY2lyY2xlJ1xuICAgICAgY2FzZSAnYnVpbGRpbmcnOlxuICAgICAgICByZXR1cm4gJ2ZhLWNvZyBmYS1zcGluJ1xuICAgICAgY2FzZSAnc2tpcHBlZCc6XG4gICAgICAgIHJldHVybiAnZmEtcXVlc3Rpb24tY2lyY2xlIGF0b20tbGF0ZXgtbGF0ZXhtay1za2lwcGVkJ1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdmYS1maWxlLXRleHQtbydcbiAgICB9XG4gIH1cbn1cbiJdfQ==