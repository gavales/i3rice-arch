Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @babel */
/** @jsx etch.dom */

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _atom = require('atom');

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var Panel = (function (_Disposable) {
  _inherits(Panel, _Disposable);

  function Panel(latex) {
    var _this = this;

    _classCallCheck(this, Panel);

    _get(Object.getPrototypeOf(Panel.prototype), 'constructor', this).call(this);
    this.latex = latex;
    this.showPanel = true;
    this.view = new PanelView(latex);
    this.provider = atom.views.addViewProvider(Panel, function (model) {
      return model.view.element;
    });
    this.panel = atom.workspace.addBottomPanel({
      item: this,
      visible: this.shouldDisplay()
    });
    atom.workspace.onDidChangeActivePaneItem(function () {
      if (_this.shouldDisplay()) {
        _this.panel.show();
      } else {
        _this.panel.hide();
      }
    });
  }

  _createClass(Panel, [{
    key: 'togglePanel',
    value: function togglePanel() {
      if (this.panel.visible) {
        this.showPanel = false;
        this.panel.hide();
      } else {
        this.showPanel = true;
        if (this.shouldDisplay()) {
          this.panel.show();
        }
      }
    }
  }, {
    key: 'hidePanel',
    value: function hidePanel() {
      this.showPanel = false;
      this.panel.hide();
    }
  }, {
    key: 'shouldDisplay',
    value: function shouldDisplay() {
      if (!this.showPanel) {
        return false;
      }
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
  }]);

  return Panel;
})(_atom.Disposable);

exports['default'] = Panel;

var PanelView = (function () {
  function PanelView(latex) {
    var _this2 = this;

    _classCallCheck(this, PanelView);

    this.latex = latex;
    this.showLog = true;
    this.mouseMove = function (e) {
      return _this2.resize(e);
    };
    this.mouseRelease = function (e) {
      return _this2.stopResize(e);
    };
    _etch2['default'].initialize(this);
  }

  _createClass(PanelView, [{
    key: 'destroy',
    value: _asyncToGenerator(function* () {
      yield _etch2['default'].destroy(this);
    })
  }, {
    key: 'update',
    value: function update() {
      return _etch2['default'].update(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var logs = '';
      if (this.latex.logger && this.latex.logger.log.length > 0 && this.showLog) {
        var typesetting = _etch2['default'].dom('div', null);
        if (atom.config.get('atom-latex.combine_typesetting_log')) {
          var types = this.latex.logger.log.map(function (item) {
            return item.type;
          });
          if (types.indexOf('typesetting') > -1) {
            typesetting = _etch2['default'].dom(_message2['default'], { message: {
                type: 'status',
                text: 'There are some hidden typesetting messages.'
              } });
          }
        }
        var items = this.latex.logger.log.map(function (item) {
          return _etch2['default'].dom(_message2['default'], { message: item, latex: _this3.latex });
        });
        logs = _etch2['default'].dom(
          'atom-panel',
          { id: 'atom-latex-logs', className: 'bottom' },
          _etch2['default'].dom('div', { id: 'atom-latex-panel-resizer', onmousedown: function (e) {
              return _this3.startResize(e);
            } }),
          items,
          typesetting
        );
      }
      var root = 'LaTeX root file not set.';
      if (this.latex.mainFile) {
        root = this.latex.mainFile;
      }

      var buttons = _etch2['default'].dom(
        'div',
        { id: 'atom-latex-controls' },
        _etch2['default'].dom(ButtonView, { icon: 'play', tooltip: 'Build LaTeX', click: function () {
            return _this3.latex.builder.build();
          } }),
        _etch2['default'].dom(ButtonView, { icon: 'search', tooltip: 'Preview PDF', click: function () {
            return _this3.latex.viewer.openViewer();
          } }),
        _etch2['default'].dom(ButtonView, { icon: 'list-ul', tooltip: this.showLog ? "Hide build log" : "Show build log", click: function () {
            return _this3.toggleLog();
          }, dim: !this.showLog }),
        _etch2['default'].dom(ButtonView, { icon: 'file-text-o', tooltip: 'Show raw log', click: function () {
            return _this3.latex.logger.showLog();
          } }),
        _etch2['default'].dom(
          'div',
          { className: 'atom-latex-control-separator' },
          '|'
        ),
        _etch2['default'].dom(ButtonView, { icon: 'home', tooltip: 'Set LaTeX root', click: function () {
            return _this3.latex.manager.refindMain();
          } }),
        _etch2['default'].dom('input', { id: 'atom-latex-root-input', type: 'file', style: 'display:none' }),
        _etch2['default'].dom(
          'div',
          { id: 'atom-latex-root-text' },
          root
        )
      );
      return _etch2['default'].dom(
        'div',
        null,
        logs,
        buttons
      );
    }
  }, {
    key: 'toggleLog',
    value: function toggleLog() {
      this.showLog = !this.showLog;
      this.update();
    }
  }, {
    key: 'resize',
    value: function resize(e) {
      height = Math.max(this.startY - e.clientY + this.startHeight, 25);
      document.getElementById('atom-latex-logs').style.height = height + 'px';
      document.getElementById('atom-latex-logs').style.maxHeight = 'none';
    }
  }, {
    key: 'startResize',
    value: function startResize(e) {
      document.addEventListener('mousemove', this.mouseMove, true);
      document.addEventListener('mouseup', this.mouseRelease, true);
      this.startY = e.clientY;
      this.startHeight = document.getElementById('atom-latex-logs').offsetHeight;
    }
  }, {
    key: 'stopResize',
    value: function stopResize(e) {
      document.removeEventListener('mousemove', this.mouseMove, true);
      document.removeEventListener('mouseup', this.mouseRelease, true);
    }
  }]);

  return PanelView;
})();

var ButtonView = (function () {
  function ButtonView() {
    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ButtonView);

    this.properties = properties;
    _etch2['default'].initialize(this);
    this.addTooltip();
  }

  _createClass(ButtonView, [{
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
      this.tooltip = atom.tooltips.add(this.element, { title: this.properties.tooltip });
    }
  }, {
    key: 'update',
    value: function update(properties) {
      this.properties = properties;
      this.addTooltip();
      return _etch2['default'].update(this);
    }
  }, {
    key: 'render',
    value: function render() {
      return _etch2['default'].dom('i', { className: 'fa fa-' + this.properties.icon + ' atom-latex-control-icon ' + (this.properties.dim ? ' atom-latex-dimmed' : ''), onclick: this.properties.click });
    }
  }]);

  return ButtonView;
})();

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2dhdmFyY2gvLmF0b20vcGFja2FnZXMvYXRvbS1sYXRleC9saWIvdmlldy9wYW5lbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUdpQixNQUFNOzs7O29CQUNJLE1BQU07O3VCQUNiLFdBQVc7Ozs7SUFFVixLQUFLO1lBQUwsS0FBSzs7QUFDYixXQURRLEtBQUssQ0FDWixLQUFLLEVBQUU7OzswQkFEQSxLQUFLOztBQUV0QiwrQkFGaUIsS0FBSyw2Q0FFZjtBQUNQLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0FBQ2xCLFFBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO0FBQ3JCLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDaEMsUUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQzlDLFVBQUEsS0FBSzthQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTztLQUFBLENBQUMsQ0FBQTtBQUM5QixRQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO0FBQ3pDLFVBQUksRUFBRSxJQUFJO0FBQ1YsYUFBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7S0FDOUIsQ0FBQyxDQUFBO0FBQ0YsUUFBSSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxZQUFNO0FBQzdDLFVBQUksTUFBSyxhQUFhLEVBQUUsRUFBRTtBQUN4QixjQUFLLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQTtPQUNsQixNQUFNO0FBQ0wsY0FBSyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUE7T0FDbEI7S0FDRixDQUFDLENBQUE7R0FDSDs7ZUFuQmtCLEtBQUs7O1dBcUJiLHVCQUFHO0FBQ1osVUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtBQUN0QixZQUFJLENBQUMsU0FB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QUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO0tBQ25GOzs7V0FFSyxnQkFBQyxVQUFVLEVBQUU7QUFDakIsVUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUE7QUFDNUIsVUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0FBQ2pCLGFBQU8sa0JBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ3pCOzs7V0FFSyxrQkFBRztBQUNQLGFBQ0UsNkJBQUcsU0FBUyxhQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxrQ0FBNEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUMsb0JBQW9CLEdBQUMsRUFBRSxDQUFBLEFBQUcsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEFBQUMsR0FBRSxDQUN4SjtLQUNGOzs7U0EvQkcsVUFBVSIsImZpbGUiOiIvaG9tZS9nYXZhcmNoLy5hdG9tL3BhY2thZ2VzL2F0b20tbGF0ZXgvbGliL3ZpZXcvcGFuZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGJhYmVsICovXG4vKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHsgRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgTWVzc2FnZSBmcm9tICcuL21lc3NhZ2UnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbmVsIGV4dGVuZHMgRGlzcG9zYWJsZSB7XG4gIGNvbnN0cnVjdG9yKGxhdGV4KSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMubGF0ZXggPSBsYXRleFxuICAgIHRoaXMuc2hvd1BhbmVsID0gdHJ1ZVxuICAgIHRoaXMudmlldyA9IG5ldyBQYW5lbFZpZXcobGF0ZXgpXG4gICAgdGhpcy5wcm92aWRlciA9IGF0b20udmlld3MuYWRkVmlld1Byb3ZpZGVyKFBhbmVsLFxuICAgICAgbW9kZWwgPT4gbW9kZWwudmlldy5lbGVtZW50KVxuICAgIHRoaXMucGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRCb3R0b21QYW5lbCh7XG4gICAgICBpdGVtOiB0aGlzLFxuICAgICAgdmlzaWJsZTogdGhpcy5zaG91bGREaXNwbGF5KClcbiAgICB9KVxuICAgIGF0b20ud29ya3NwYWNlLm9uRGlkQ2hhbmdlQWN0aXZlUGFuZUl0ZW0oKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuc2hvdWxkRGlzcGxheSgpKSB7XG4gICAgICAgIHRoaXMucGFuZWwuc2hvdygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhbmVsLmhpZGUoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICB0b2dnbGVQYW5lbCgpIHtcbiAgICBpZiAodGhpcy5wYW5lbC52aXNpYmxlKSB7XG4gICAgICB0aGlzLnNob3dQYW5lbCA9IGZhbHNlXG4gICAgICB0aGlzLnBhbmVsLmhpZGUoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dQYW5lbCA9IHRydWVcbiAgICAgIGlmICh0aGlzLnNob3VsZERpc3BsYXkoKSkge1xuICAgICAgICB0aGlzLnBhbmVsLnNob3coKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhpZGVQYW5lbCgpIHtcbiAgICB0aGlzLnNob3dQYW5lbCA9IGZhbHNlXG4gICAgdGhpcy5wYW5lbC5oaWRlKClcbiAgfVxuXG4gIHNob3VsZERpc3BsYXkoKSB7XG4gICAgaWYgKCF0aGlzLnNob3dQYW5lbCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGxldCBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcbiAgICBpZiAoIWVkaXRvcikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGxldCBncmFtbWFyID0gZWRpdG9yLmdldEdyYW1tYXIoKVxuICAgIGlmICghZ3JhbW1hcikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmICgoZ3JhbW1hci5wYWNrYWdlTmFtZSA9PT0gJ2F0b20tbGF0ZXgnKSB8fFxuICAgICAgKGdyYW1tYXIuc2NvcGVOYW1lLmluZGV4T2YoJ3RleHQudGV4LmxhdGV4JykgPiAtMSkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmNsYXNzIFBhbmVsVmlldyB7XG4gIGNvbnN0cnVjdG9yKGxhdGV4KSB7XG4gICAgdGhpcy5sYXRleCA9IGxhdGV4XG4gICAgdGhpcy5zaG93TG9nID0gdHJ1ZVxuICAgIHRoaXMubW91c2VNb3ZlID0gZSA9PiB0aGlzLnJlc2l6ZShlKVxuICAgIHRoaXMubW91c2VSZWxlYXNlID0gZSA9PiB0aGlzLnN0b3BSZXNpemUoZSlcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIGFzeW5jIGRlc3Ryb3koKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGxvZ3MgPSAnJ1xuICAgIGlmICh0aGlzLmxhdGV4LmxvZ2dlciAmJiB0aGlzLmxhdGV4LmxvZ2dlci5sb2cubGVuZ3RoID4gMCAmJiB0aGlzLnNob3dMb2cpIHtcbiAgICAgIGxldCB0eXBlc2V0dGluZyA9IDxkaXYgLz5cbiAgICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbGF0ZXguY29tYmluZV90eXBlc2V0dGluZ19sb2cnKSkge1xuICAgICAgICBsZXQgdHlwZXMgPSB0aGlzLmxhdGV4LmxvZ2dlci5sb2cubWFwKGl0ZW0gPT4gaXRlbS50eXBlKVxuICAgICAgICBpZiAodHlwZXMuaW5kZXhPZigndHlwZXNldHRpbmcnKSA+IC0xKSB7XG4gICAgICAgICAgdHlwZXNldHRpbmcgPSA8TWVzc2FnZSBtZXNzYWdlPXt7XG4gICAgICAgICAgICB0eXBlOiAnc3RhdHVzJyxcbiAgICAgICAgICAgIHRleHQ6ICdUaGVyZSBhcmUgc29tZSBoaWRkZW4gdHlwZXNldHRpbmcgbWVzc2FnZXMuJ1xuICAgICAgICAgIH19Lz5cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGV0IGl0ZW1zID0gdGhpcy5sYXRleC5sb2dnZXIubG9nLm1hcChpdGVtID0+IDxNZXNzYWdlIG1lc3NhZ2U9e2l0ZW19IGxhdGV4PXt0aGlzLmxhdGV4fS8+KVxuICAgICAgbG9ncyA9XG4gICAgICAgIDxhdG9tLXBhbmVsIGlkPVwiYXRvbS1sYXRleC1sb2dzXCIgY2xhc3NOYW1lPVwiYm90dG9tXCI+XG4gICAgICAgICAgPGRpdiBpZD1cImF0b20tbGF0ZXgtcGFuZWwtcmVzaXplclwiIG9ubW91c2Vkb3duPXtlID0+IHRoaXMuc3RhcnRSZXNpemUoZSl9IC8+XG4gICAgICAgICAge2l0ZW1zfVxuICAgICAgICAgIHt0eXBlc2V0dGluZ31cbiAgICAgICAgPC9hdG9tLXBhbmVsPlxuICAgIH1cbiAgICBsZXQgcm9vdCA9ICdMYVRlWCByb290IGZpbGUgbm90IHNldC4nXG4gICAgaWYgKHRoaXMubGF0ZXgubWFpbkZpbGUpIHtcbiAgICAgIHJvb3QgPSB0aGlzLmxhdGV4Lm1haW5GaWxlXG4gICAgfVxuXG4gICAgbGV0IGJ1dHRvbnMgPVxuICAgICAgPGRpdiBpZD1cImF0b20tbGF0ZXgtY29udHJvbHNcIj5cbiAgICAgICAgPEJ1dHRvblZpZXcgaWNvbj1cInBsYXlcIiB0b29sdGlwPVwiQnVpbGQgTGFUZVhcIiBjbGljaz17KCk9PnRoaXMubGF0ZXguYnVpbGRlci5idWlsZCgpfS8+XG4gICAgICAgIDxCdXR0b25WaWV3IGljb249XCJzZWFyY2hcIiB0b29sdGlwPVwiUHJldmlldyBQREZcIiBjbGljaz17KCk9PnRoaXMubGF0ZXgudmlld2VyLm9wZW5WaWV3ZXIoKX0vPlxuICAgICAgICA8QnV0dG9uVmlldyBpY29uPVwibGlzdC11bFwiIHRvb2x0aXA9e3RoaXMuc2hvd0xvZz9cIkhpZGUgYnVpbGQgbG9nXCI6XCJTaG93IGJ1aWxkIGxvZ1wifSBjbGljaz17KCkgPT4gdGhpcy50b2dnbGVMb2coKX0gZGltPXshdGhpcy5zaG93TG9nfS8+XG4gICAgICAgIDxCdXR0b25WaWV3IGljb249XCJmaWxlLXRleHQtb1wiIHRvb2x0aXA9XCJTaG93IHJhdyBsb2dcIiBjbGljaz17KCk9PnRoaXMubGF0ZXgubG9nZ2VyLnNob3dMb2coKX0vPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF0b20tbGF0ZXgtY29udHJvbC1zZXBhcmF0b3JcIj58PC9kaXY+XG4gICAgICAgIDxCdXR0b25WaWV3IGljb249XCJob21lXCIgdG9vbHRpcD1cIlNldCBMYVRlWCByb290XCIgY2xpY2s9eygpPT50aGlzLmxhdGV4Lm1hbmFnZXIucmVmaW5kTWFpbigpfS8+XG4gICAgICAgIDxpbnB1dCBpZD1cImF0b20tbGF0ZXgtcm9vdC1pbnB1dFwiIHR5cGU9J2ZpbGUnIHN0eWxlPVwiZGlzcGxheTpub25lXCIvPlxuICAgICAgICA8ZGl2IGlkPVwiYXRvbS1sYXRleC1yb290LXRleHRcIj57cm9vdH08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7bG9nc31cbiAgICAgICAge2J1dHRvbnN9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICB0b2dnbGVMb2coKSB7XG4gICAgdGhpcy5zaG93TG9nID0gIXRoaXMuc2hvd0xvZ1xuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHJlc2l6ZShlKSB7XG4gICAgaGVpZ2h0ID0gTWF0aC5tYXgodGhpcy5zdGFydFkgLSBlLmNsaWVudFkgKyB0aGlzLnN0YXJ0SGVpZ2h0LCAyNSlcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXRvbS1sYXRleC1sb2dzJykuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdG9tLWxhdGV4LWxvZ3MnKS5zdHlsZS5tYXhIZWlnaHQgPSAnbm9uZSdcbiAgfVxuXG4gIHN0YXJ0UmVzaXplKGUpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZSwgdHJ1ZSlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVJlbGVhc2UsIHRydWUpXG4gICAgdGhpcy5zdGFydFkgPSBlLmNsaWVudFlcbiAgICB0aGlzLnN0YXJ0SGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F0b20tbGF0ZXgtbG9ncycpLm9mZnNldEhlaWdodFxuICB9XG5cbiAgc3RvcFJlc2l6ZShlKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmUsIHRydWUpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VSZWxlYXNlLCB0cnVlKVxuICB9XG59XG5cbmNsYXNzIEJ1dHRvblZpZXcge1xuICBjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzID0ge30pIHtcbiAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gICAgdGhpcy5hZGRUb29sdGlwKClcbiAgfVxuXG4gIGFzeW5jIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgdGhpcy50b29sdGlwLmRpc3Bvc2UoKVxuICAgIH1cbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgfVxuXG4gIGFkZFRvb2x0aXAoKSB7XG4gICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgdGhpcy50b29sdGlwLmRpc3Bvc2UoKVxuICAgIH1cbiAgICB0aGlzLnRvb2x0aXAgPSBhdG9tLnRvb2x0aXBzLmFkZCh0aGlzLmVsZW1lbnQsIHsgdGl0bGU6IHRoaXMucHJvcGVydGllcy50b29sdGlwIH0pXG4gIH1cblxuICB1cGRhdGUocHJvcGVydGllcykge1xuICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXNcbiAgICB0aGlzLmFkZFRvb2x0aXAoKVxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aSBjbGFzc05hbWU9e2BmYSBmYS0ke3RoaXMucHJvcGVydGllcy5pY29ufSBhdG9tLWxhdGV4LWNvbnRyb2wtaWNvbiAke3RoaXMucHJvcGVydGllcy5kaW0/JyBhdG9tLWxhdGV4LWRpbW1lZCc6Jyd9YH0gb25jbGljaz17dGhpcy5wcm9wZXJ0aWVzLmNsaWNrfS8+XG4gICAgKVxuICB9XG5cblxufVxuIl19