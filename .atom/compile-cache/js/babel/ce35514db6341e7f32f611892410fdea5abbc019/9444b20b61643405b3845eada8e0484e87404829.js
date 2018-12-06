Object.defineProperty(exports, '__esModule', {
  value: true
});

var _atom = require('atom');

'use babel';

exports['default'] = {

  subscriptions: null,

  activate: function activate(state) {
    var _this = this;

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new _atom.CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'restart-atom:restart': function restartAtomRestart() {
        return _this.restart();
      }
    }));
  },

  deactivate: function deactivate() {
    this.subscriptions.dispose();
  },

  serialize: function serialize() {},

  restart: function restart() {
    console.log('RestartAtom was called!');
    atom.restartApplication();
  }

};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2dhdmFyY2gvLmF0b20vcGFja2FnZXMvcmVzdGFydC1hdG9tL2xpYi9yZXN0YXJ0LWF0b20uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztvQkFFb0MsTUFBTTs7QUFGMUMsV0FBVyxDQUFDOztxQkFJRzs7QUFFYixlQUFhLEVBQUUsSUFBSTs7QUFFbkIsVUFBUSxFQUFBLGtCQUFDLEtBQUssRUFBRTs7OztBQUVkLFFBQUksQ0FBQyxhQUFhLEdBQUcsK0JBQXlCLENBQUM7OztBQUcvQyxRQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtBQUN6RCw0QkFBc0IsRUFBRTtlQUFNLE1BQUssT0FBTyxFQUFFO09BQUE7S0FDN0MsQ0FBQyxDQUFDLENBQUM7R0FDTDs7QUFFRCxZQUFVLEVBQUEsc0JBQUc7QUFDWCxRQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO0dBQzlCOztBQUVELFdBQVMsRUFBQSxxQkFBRyxFQUNYOztBQUVELFNBQU8sRUFBQSxtQkFBRztBQUNSLFdBQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUN2QyxRQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztHQUMzQjs7Q0FFRiIsImZpbGUiOiIvaG9tZS9nYXZhcmNoLy5hdG9tL3BhY2thZ2VzL3Jlc3RhcnQtYXRvbS9saWIvcmVzdGFydC1hdG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gIHN1YnNjcmlwdGlvbnM6IG51bGwsXG5cbiAgYWN0aXZhdGUoc3RhdGUpIHtcbiAgICAvLyBFdmVudHMgc3Vic2NyaWJlZCB0byBpbiBhdG9tJ3Mgc3lzdGVtIGNhbiBiZSBlYXNpbHkgY2xlYW5lZCB1cCB3aXRoIGEgQ29tcG9zaXRlRGlzcG9zYWJsZVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG5cbiAgICAvLyBSZWdpc3RlciBjb21tYW5kIHRoYXQgdG9nZ2xlcyB0aGlzIHZpZXdcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAgICdyZXN0YXJ0LWF0b206cmVzdGFydCc6ICgpID0+IHRoaXMucmVzdGFydCgpXG4gICAgfSkpO1xuICB9LFxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKTtcbiAgfSxcblxuICBzZXJpYWxpemUoKSB7XG4gIH0sXG5cbiAgcmVzdGFydCgpIHtcbiAgICBjb25zb2xlLmxvZygnUmVzdGFydEF0b20gd2FzIGNhbGxlZCEnKTtcbiAgICBhdG9tLnJlc3RhcnRBcHBsaWNhdGlvbigpO1xuICB9XG5cbn07XG4iXX0=