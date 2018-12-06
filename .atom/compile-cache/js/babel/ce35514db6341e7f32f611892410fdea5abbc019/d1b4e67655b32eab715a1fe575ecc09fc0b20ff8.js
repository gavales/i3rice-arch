Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/** @babel */
/** @jsx etch.dom */

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _atom = require('atom');

var Message = (function () {
  function Message() {
    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Message);

    this.properties = properties;
    _etch2['default'].initialize(this);
  }

  _createClass(Message, [{
    key: 'destroy',
    value: _asyncToGenerator(function* () {
      yield _etch2['default'].destroy(this);
    })
  }, {
    key: 'update',
    value: function update(properties) {
      this.properties = properties;
      return _etch2['default'].update(this);
    }
  }, {
    key: 'getIconClass',
    value: function getIconClass() {
      var iconName = undefined;
      switch (this.properties.message.type) {
        case 'error':
          iconName = 'fa-times-circle';
          break;
        case 'warning':
          iconName = 'fa-exclamation-circle';
          break;
        case 'typesetting':
          iconName = 'fa-question-circle';
          break;
        default:
          iconName = 'fa-info-circle';
      }
      return 'fa ' + iconName + ' atom-latex-log-icon';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      if (atom.config.get('atom-latex.combine_typesetting_log') && this.properties.message.type === 'typesetting') {
        return _etch2['default'].dom('div', null);
      }
      var clickable = false;
      var file = _etch2['default'].dom('span', null);
      var line = _etch2['default'].dom('span', null);
      if (this.properties.message.file) {
        clickable = true;
        file = _etch2['default'].dom(
          'span',
          null,
          _path2['default'].relative(_path2['default'].dirname(this.properties.latex.mainFile), this.properties.message.file)
        );
        if (this.properties.message.line > 0) {
          line = _etch2['default'].dom(
            'span',
            null,
            ':',
            this.properties.message.line,
            ' '
          );
        } else {
          line = _etch2['default'].dom(
            'span',
            null,
            ' '
          );
        }
      }
      var handleClick = function handleClick() {
        return _this.handleClick(_this.properties.message.file, _this.properties.message.line);
      };
      return _etch2['default'].dom(
        'div',
        { className: 'atom-latex-log-message' + (clickable ? ' atom-latex-log-clickable' : ''), onclick: handleClick },
        _etch2['default'].dom('i', { className: this.getIconClass() }),
        file,
        line,
        this.properties.message.text
      );
    }
  }, {
    key: 'handleClick',
    value: function handleClick(file, line) {
      if (file) {
        atom.workspace.open(file, { initialLine: line > 0 ? line - 1 : 0 });
      }
    }
  }]);

  return Message;
})();

exports['default'] = Message;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2dhdmFyY2gvLmF0b20vcGFja2FnZXMvYXRvbS1sYXRleC9saWIvdmlldy9tZXNzYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztvQkFHaUIsTUFBTTs7OztvQkFDTixNQUFNOzs7O29CQUNJLE1BQU07O0lBRVosT0FBTztBQUNmLFdBRFEsT0FBTyxHQUNHO1FBQWpCLFVBQVUseURBQUcsRUFBRTs7MEJBRFIsT0FBTzs7QUFFeEIsUUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUE7QUFDNUIsc0JBQUssVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0dBQ3RCOztlQUprQixPQUFPOzs2QkFNYixhQUFHO0FBQ2QsWUFBTSxrQkFBSyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDekI7OztXQUVLLGdCQUFDLFVBQVUsRUFBRTtBQUNqQixVQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtBQUM1QixhQUFPLGtCQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUN6Qjs7O1dBRVcsd0JBQUc7QUFDYixVQUFJLFFBQVEsR0FBRyxTQUFTLENBQUE7QUFDeEIsY0FBUSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJO0FBQ2xDLGFBQUssT0FBTztBQUNWLGtCQUFRLEdBQUcsaUJBQWlCLENBQUE7QUFDNUIsZ0JBQU07QUFBQSxBQUNSLGFBQUssU0FBUztBQUNaLGtCQUFRLEdBQUcsdUJBQXVCLENBQUE7QUFDbEMsZ0JBQU07QUFBQSxBQUNSLGFBQUssYUFBYTtBQUNoQixrQkFBUSxHQUFHLG9CQUFvQixDQUFBO0FBQy9CLGdCQUFNO0FBQUEsQUFDUjtBQUNFLGtCQUFRLEdBQUcsZ0JBQWdCLENBQUE7QUFBQSxPQUM5QjtBQUNELHFCQUFhLFFBQVEsMEJBQXNCO0tBQzVDOzs7V0FFSyxrQkFBRzs7O0FBQ1AsVUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxJQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUFFO0FBQ2xELGVBQU8sa0NBQU8sQ0FBQTtPQUNmO0FBQ0QsVUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFBO0FBQ3JCLFVBQUksSUFBSSxHQUFHLG1DQUFRLENBQUE7QUFDbkIsVUFBSSxJQUFJLEdBQUcsbUNBQVEsQ0FBQTtBQUNuQixVQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtBQUNoQyxpQkFBUyxHQUFHLElBQUksQ0FBQTtBQUNoQixZQUFJLEdBQUc7OztVQUFPLGtCQUFLLFFBQVEsQ0FBQyxrQkFBSyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1NBQVEsQ0FBQTtBQUMvRyxZQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7QUFDcEMsY0FBSSxHQUFHOzs7O1lBQVEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSTs7V0FBUyxDQUFBO1NBQ3JELE1BQU07QUFDTCxjQUFJLEdBQUc7Ozs7V0FBYyxDQUFBO1NBQ3RCO09BQ0Y7QUFDRCxVQUFJLFdBQVcsR0FBRyxTQUFkLFdBQVc7ZUFBUyxNQUFLLFdBQVcsQ0FBQyxNQUFLLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQUssVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7T0FBQSxDQUFBO0FBQ3BHLGFBQ0U7O1VBQUssU0FBUyw4QkFBMkIsU0FBUyxHQUFDLDJCQUEyQixHQUFDLEVBQUUsQ0FBQSxBQUFHLEVBQUMsT0FBTyxFQUFFLFdBQVcsQUFBQztRQUN4Ryw2QkFBRyxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxBQUFDLEdBQUU7UUFDbkMsSUFBSTtRQUNKLElBQUk7UUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJO09BQ3pCLENBQ1A7S0FDRjs7O1dBRVUscUJBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtBQUN0QixVQUFJLElBQUksRUFBRTtBQUNSLFlBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtPQUNwRTtLQUNGOzs7U0FqRWtCLE9BQU87OztxQkFBUCxPQUFPIiwiZmlsZSI6Ii9ob21lL2dhdmFyY2gvLmF0b20vcGFja2FnZXMvYXRvbS1sYXRleC9saWIvdmlldy9tZXNzYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBiYWJlbCAqL1xuLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKHByb3BlcnRpZXMgPSB7fSkge1xuICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXNcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIGFzeW5jIGRlc3Ryb3koKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gIH1cblxuICB1cGRhdGUocHJvcGVydGllcykge1xuICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXNcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIGdldEljb25DbGFzcygpIHtcbiAgICBsZXQgaWNvbk5hbWUgPSB1bmRlZmluZWRcbiAgICBzd2l0Y2ggKHRoaXMucHJvcGVydGllcy5tZXNzYWdlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgaWNvbk5hbWUgPSAnZmEtdGltZXMtY2lyY2xlJ1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgICBpY29uTmFtZSA9ICdmYS1leGNsYW1hdGlvbi1jaXJjbGUnXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndHlwZXNldHRpbmcnOlxuICAgICAgICBpY29uTmFtZSA9ICdmYS1xdWVzdGlvbi1jaXJjbGUnXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWNvbk5hbWUgPSAnZmEtaW5mby1jaXJjbGUnXG4gICAgfVxuICAgIHJldHVybiBgZmEgJHtpY29uTmFtZX0gYXRvbS1sYXRleC1sb2ctaWNvbmBcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdhdG9tLWxhdGV4LmNvbWJpbmVfdHlwZXNldHRpbmdfbG9nJykgJiZcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLm1lc3NhZ2UudHlwZSA9PT0gJ3R5cGVzZXR0aW5nJykge1xuICAgICAgcmV0dXJuIDxkaXYgLz5cbiAgICB9XG4gICAgbGV0IGNsaWNrYWJsZSA9IGZhbHNlXG4gICAgbGV0IGZpbGUgPSA8c3BhbiAvPlxuICAgIGxldCBsaW5lID0gPHNwYW4gLz5cbiAgICBpZiAodGhpcy5wcm9wZXJ0aWVzLm1lc3NhZ2UuZmlsZSkge1xuICAgICAgY2xpY2thYmxlID0gdHJ1ZVxuICAgICAgZmlsZSA9IDxzcGFuPntwYXRoLnJlbGF0aXZlKHBhdGguZGlybmFtZSh0aGlzLnByb3BlcnRpZXMubGF0ZXgubWFpbkZpbGUpLCB0aGlzLnByb3BlcnRpZXMubWVzc2FnZS5maWxlKX08L3NwYW4+XG4gICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzLm1lc3NhZ2UubGluZSA+IDApIHtcbiAgICAgICAgbGluZSA9IDxzcGFuPjp7dGhpcy5wcm9wZXJ0aWVzLm1lc3NhZ2UubGluZX0gPC9zcGFuPlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGluZSA9IDxzcGFuPiA8L3NwYW4+XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBoYW5kbGVDbGljayA9ICgpID0+IHRoaXMuaGFuZGxlQ2xpY2sodGhpcy5wcm9wZXJ0aWVzLm1lc3NhZ2UuZmlsZSwgdGhpcy5wcm9wZXJ0aWVzLm1lc3NhZ2UubGluZSlcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BhdG9tLWxhdGV4LWxvZy1tZXNzYWdlJHtjbGlja2FibGU/JyBhdG9tLWxhdGV4LWxvZy1jbGlja2FibGUnOicnfWB9IG9uY2xpY2s9e2hhbmRsZUNsaWNrfT5cbiAgICAgICAgPGkgY2xhc3NOYW1lPXt0aGlzLmdldEljb25DbGFzcygpfS8+XG4gICAgICAgIHtmaWxlfVxuICAgICAgICB7bGluZX1cbiAgICAgICAge3RoaXMucHJvcGVydGllcy5tZXNzYWdlLnRleHR9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBoYW5kbGVDbGljayhmaWxlLCBsaW5lKSB7XG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIGF0b20ud29ya3NwYWNlLm9wZW4oZmlsZSwgeyBpbml0aWFsTGluZTogbGluZSA+IDAgPyBsaW5lIC0gMSA6IDAgfSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==