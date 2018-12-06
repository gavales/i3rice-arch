(function() {
  var BrowserWindow, Disposable, PDFView, Viewer, fs, getCurrentWindow, path,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Disposable = require('atom').Disposable;

  getCurrentWindow = require('electron').remote.getCurrentWindow;

  BrowserWindow = require('electron').remote.BrowserWindow;

  fs = require('fs');

  path = require('path');

  module.exports = Viewer = (function(superClass) {
    extend(Viewer, superClass);

    function Viewer(latex) {
      this.latex = latex;
      this.client = {};
    }

    Viewer.prototype.dispose = function() {
      if ((this.window != null) && !this.window.isDestroyed()) {
        return this.window.destroy();
      }
    };

    Viewer.prototype.wsHandler = function(ws, msg) {
      var data, ref;
      data = JSON.parse(msg);
      switch (data.type) {
        case 'open':
          if ((ref = this.client.ws) != null) {
            ref.close();
          }
          return this.client.ws = ws;
        case 'loaded':
          if (this.client.position && (this.client.ws != null)) {
            return this.client.ws.send(JSON.stringify(this.client.position));
          }
          break;
        case 'position':
          return this.client.position = data;
        case 'click':
          return this.latex.locator.locate(data);
        case 'close':
          return this.client.ws = void 0;
        case 'link':
          return require('electron').shell.openExternal(data.href);
      }
    };

    Viewer.prototype.refresh = function() {
      var newTitle, ref;
      newTitle = path.basename(this.latex.manager.findPDF());
      if ((this.tabView != null) && this.tabView.title !== newTitle && (atom.workspace.paneForItem(this.tabView) != null)) {
        atom.workspace.paneForItem(this.tabView).activeItem.updateTitle(newTitle);
      } else if ((this.window != null) && !this.window.isDestroyed() && this.window.getTitle() !== newTitle) {
        this.window.setTitle("Atom-LaTeX PDF Viewer - [" + this.latex.mainFile + "]");
      }
      if ((ref = this.client.ws) != null) {
        ref.send(JSON.stringify({
          type: "refresh"
        }));
      }
      this.latex.viewer.focusViewer();
      if (!atom.config.get('atom-latex.focus_viewer')) {
        return this.latex.viewer.focusMain();
      }
    };

    Viewer.prototype.focusViewer = function() {
      if ((this.window != null) && !this.window.isDestroyed()) {
        return this.window.show();
      }
    };

    Viewer.prototype.focusMain = function() {
      if ((this.self != null) && !this.self.focused) {
        return this.self.focus();
      }
    };

    Viewer.prototype.synctex = function(record) {
      var ref;
      if ((ref = this.client.ws) != null) {
        ref.send(JSON.stringify({
          type: "synctex",
          data: record
        }));
      }
      if (atom.config.get('atom-latex.focus_viewer')) {
        return this.focusViewer();
      }
    };

    Viewer.prototype.openViewer = function() {
      if (this.client.ws != null) {
        return this.refresh();
      } else if (atom.config.get('atom-latex.preview_after_build') === 'View in PDF viewer window') {
        this.openViewerNewWindow();
        if (!atom.config.get('atom-latex.focus_viewer')) {
          return this.latex.viewer.focusMain();
        }
      } else if (atom.config.get('atom-latex.preview_after_build') === 'View in PDF viewer tab') {
        this.openViewerNewTab();
        if (!atom.config.get('atom-latex.focus_viewer')) {
          return this.latex.viewer.focusMain();
        }
      }
    };

    Viewer.prototype.openViewerNewWindow = function() {
      var pdfPath;
      pdfPath = this.latex.manager.findPDF();
      if (!fs.existsSync(pdfPath)) {
        return;
      }
      if (!this.getUrl()) {
        return;
      }
      if ((this.tabView != null) && (atom.workspace.paneForItem(this.tabView) != null)) {
        atom.workspace.paneForItem(this.tabView).destroyItem(this.tabView);
        this.tabView = void 0;
      }
      if ((this.window == null) || this.window.isDestroyed()) {
        this.self = getCurrentWindow();
        this.window = new BrowserWindow();
      } else {
        this.window.show();
        this.window.focus();
      }
      this.window.loadURL(this.url);
      this.window.setMenuBarVisibility(false);
      return this.window.setTitle("Atom-LaTeX PDF Viewer - [" + this.latex.mainFile + "]");
    };

    Viewer.prototype.openViewerNewTab = function() {
      var pdfPath;
      pdfPath = this.latex.manager.findPDF();
      if (!fs.existsSync(pdfPath)) {
        return;
      }
      if (!this.getUrl()) {
        return;
      }
      this.self = atom.workspace.getActivePane();
      if ((this.tabView != null) && (atom.workspace.paneForItem(this.tabView) != null)) {
        return atom.workspace.paneForItem(this.tabView).activateItem(this.tabView);
      } else {
        this.tabView = new PDFView(this.url, path.basename(pdfPath));
        return atom.workspace.getActivePane().splitRight().addItem(this.tabView);
      }
    };

    Viewer.prototype.getUrl = function() {
      var address, err, port, ref;
      try {
        ref = this.latex.server.http.address(), address = ref.address, port = ref.port;
        this.url = "http://" + address + ":" + port + "/viewer.html?file=preview.pdf";
      } catch (error) {
        err = error;
        this.latex.server.openTab = true;
        return false;
      }
      return true;
    };

    return Viewer;

  })(Disposable);

  PDFView = (function() {
    function PDFView(url, title) {
      this.element = document.createElement('webview');
      this.element.setAttribute('src', url);
      this.element.addEventListener('console-message', function(e) {
        return console.log(e.message);
      });
      this.title = title;
      this.titleCallbacks = [];
    }

    PDFView.prototype.updateTitle = function(newTitle) {
      this.title = newTitle;
      this.titleCallbacks.map(function(cb) {
        return cb();
      });
      return true;
    };

    PDFView.prototype.onDidChangeTitle = function(cb) {
      this.titleCallbacks.push(cb);
      return {
        dispose: (function(_this) {
          return function() {
            return _this.removeTitleCallback(cb);
          };
        })(this)
      };
    };

    PDFView.prototype.removeTitleCallback = function(cb) {
      return this.titleCallbacks.pop(cb);
    };

    PDFView.prototype.getTitle = function() {
      return "Atom-LaTeX - " + this.title;
    };

    PDFView.prototype.serialize = function() {
      return this.element.getAttribute('src');
    };

    PDFView.prototype.destroy = function() {
      return this.element.remove();
    };

    PDFView.prototype.getElement = function() {
      return this.element;
    };

    return PDFView;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi92aWV3ZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxzRUFBQTtJQUFBOzs7RUFBRSxhQUFlLE9BQUEsQ0FBUSxNQUFSOztFQUNqQixnQkFBQSxHQUFtQixPQUFBLENBQVEsVUFBUixDQUFtQixDQUFDLE1BQU0sQ0FBQzs7RUFDOUMsYUFBQSxHQUFnQixPQUFBLENBQVEsVUFBUixDQUFtQixDQUFDLE1BQU0sQ0FBQzs7RUFDM0MsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSOztFQUNMLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7RUFFUCxNQUFNLENBQUMsT0FBUCxHQUNNOzs7SUFDUyxnQkFBQyxLQUFEO01BQ1gsSUFBQyxDQUFBLEtBQUQsR0FBUztNQUNULElBQUMsQ0FBQSxNQUFELEdBQVU7SUFGQzs7cUJBSWIsT0FBQSxHQUFTLFNBQUE7TUFDUCxJQUFHLHFCQUFBLElBQWEsQ0FBQyxJQUFDLENBQUEsTUFBTSxDQUFDLFdBQVIsQ0FBQSxDQUFqQjtlQUNFLElBQUMsQ0FBQSxNQUFNLENBQUMsT0FBUixDQUFBLEVBREY7O0lBRE87O3FCQUlULFNBQUEsR0FBVyxTQUFDLEVBQUQsRUFBSyxHQUFMO0FBQ1QsVUFBQTtNQUFBLElBQUEsR0FBTyxJQUFJLENBQUMsS0FBTCxDQUFXLEdBQVg7QUFDUCxjQUFPLElBQUksQ0FBQyxJQUFaO0FBQUEsYUFDTyxNQURQOztlQUVjLENBQUUsS0FBWixDQUFBOztpQkFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLEVBQVIsR0FBYTtBQUhqQixhQUlPLFFBSlA7VUFLSSxJQUFHLElBQUMsQ0FBQSxNQUFNLENBQUMsUUFBUixJQUFxQix3QkFBeEI7bUJBQ0UsSUFBQyxDQUFBLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBWCxDQUFnQixJQUFJLENBQUMsU0FBTCxD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QXRCO0lBREU7O3NCQUdYLE9BQUEsR0FBUyxTQUFBO2FBQ1AsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULENBQUE7SUFETzs7c0JBR1QsVUFBQSxHQUFZLFNBQUE7QUFDVixhQUFPLElBQUMsQ0FBQTtJQURFOzs7OztBQXZKZCIsInNvdXJjZXNDb250ZW50IjpbInsgRGlzcG9zYWJsZSB9ID0gcmVxdWlyZSAnYXRvbSdcbmdldEN1cnJlbnRXaW5kb3cgPSByZXF1aXJlKCdlbGVjdHJvbicpLnJlbW90ZS5nZXRDdXJyZW50V2luZG93XG5Ccm93c2VyV2luZG93ID0gcmVxdWlyZSgnZWxlY3Ryb24nKS5yZW1vdGUuQnJvd3NlcldpbmRvd1xuZnMgPSByZXF1aXJlICdmcydcbnBhdGggPSByZXF1aXJlICdwYXRoJ1xuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBWaWV3ZXIgZXh0ZW5kcyBEaXNwb3NhYmxlXG4gIGNvbnN0cnVjdG9yOiAobGF0ZXgpIC0+XG4gICAgQGxhdGV4ID0gbGF0ZXhcbiAgICBAY2xpZW50ID0ge31cblxuICBkaXNwb3NlOiAtPlxuICAgIGlmIEB3aW5kb3c/IGFuZCAhQHdpbmRvdy5pc0Rlc3Ryb3llZCgpXG4gICAgICBAd2luZG93LmRlc3Ryb3koKVxuXG4gIHdzSGFuZGxlcjogKHdzLCBtc2cpIC0+XG4gICAgZGF0YSA9IEpTT04ucGFyc2UgbXNnXG4gICAgc3dpdGNoIGRhdGEudHlwZVxuICAgICAgd2hlbiAnb3BlbidcbiAgICAgICAgQGNsaWVudC53cz8uY2xvc2UoKVxuICAgICAgICBAY2xpZW50LndzID0gd3NcbiAgICAgIHdoZW4gJ2xvYWRlZCdcbiAgICAgICAgaWYgQGNsaWVudC5wb3NpdGlvbiBhbmQgQGNsaWVudC53cz9cbiAgICAgICAgICBAY2xpZW50LndzLnNlbmQgSlNPTi5zdHJpbmdpZnkgQGNsaWVudC5wb3NpdGlvblxuICAgICAgd2hlbiAncG9zaXRpb24nXG4gICAgICAgIEBjbGllbnQucG9zaXRpb24gPSBkYXRhXG4gICAgICB3aGVuICdjbGljaydcbiAgICAgICAgQGxhdGV4LmxvY2F0b3IubG9jYXRlKGRhdGEpXG4gICAgICB3aGVuICdjbG9zZSdcbiAgICAgICAgQGNsaWVudC53cyA9IHVuZGVmaW5lZFxuICAgICAgd2hlbiAnbGluaycgIyBPcGVuIGxpbmsgZXh0ZXJuYWxseVxuICAgICAgICByZXF1aXJlKCdlbGVjdHJvbicpLnNoZWxsLm9wZW5FeHRlcm5hbChkYXRhLmhyZWYpXG5cbiAgcmVmcmVzaDogLT5cbiAgICBuZXdUaXRsZSA9IHBhdGguYmFzZW5hbWUoQGxhdGV4Lm1hbmFnZXIuZmluZFBERigpKVxuXG4gICAgaWYgQHRhYlZpZXc/IGFuZCBAdGFiVmlldy50aXRsZSBpc250IG5ld1RpdGxlIGFuZFxcXG4gICAgICAgIGF0b20ud29ya3NwYWNlLnBhbmVGb3JJdGVtKEB0YWJWaWV3KT9cbiAgICAgIGF0b20ud29ya3NwYWNlLnBhbmVGb3JJdGVtKEB0YWJWaWV3KS5hY3RpdmVJdGVtLnVwZGF0ZVRpdGxlKG5ld1RpdGxlKVxuICAgIGVsc2UgaWYgQHdpbmRvdz8gYW5kICFAd2luZG93LmlzRGVzdHJveWVkKCkgYW5kIEB3aW5kb3cuZ2V0VGl0bGUoKSBpc250IG5ld1RpdGxlXG4gICAgICBAd2luZG93LnNldFRpdGxlKFwiXCJcIkF0b20tTGFUZVggUERGIFZpZXdlciAtIFsje0BsYXRleC5tYWluRmlsZX1dXCJcIlwiKVxuICAgIEBjbGllbnQud3M/LnNlbmQgSlNPTi5zdHJpbmdpZnkgdHlwZTogXCJyZWZyZXNoXCJcblxuICAgIEBsYXRleC52aWV3ZXIuZm9jdXNWaWV3ZXIoKVxuICAgIGlmICFhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbGF0ZXguZm9jdXNfdmlld2VyJylcbiAgICAgIEBsYXRleC52aWV3ZXIuZm9jdXNNYWluKClcblxuICBmb2N1c1ZpZXdlcjogLT5cbiAgICBAd2luZG93LnNob3coKSBpZiBAd2luZG93PyBhbmQgIUB3aW5kb3cuaXNEZXN0cm95ZWQoKVxuXG4gIGZvY3VzTWFpbjogLT5cbiAgICBAc2VsZi5mb2N1cygpIGlmIEBzZWxmPyBhbmQgIUBzZWxmLmZvY3VzZWRcblxuICBzeW5jdGV4OiAocmVjb3JkKSAtPlxuICAgIEBjbGllbnQud3M/LnNlbmQgSlNPTi5zdHJpbmdpZnlcbiAgICAgIHR5cGU6IFwic3luY3RleFwiXG4gICAgICBkYXRhOiByZWNvcmRcbiAgICBpZiBhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbGF0ZXguZm9jdXNfdmlld2VyJylcbiAgICAgIEBmb2N1c1ZpZXdlcigpXG5cbiAgb3BlblZpZXdlcjogLT5cbiAgICBpZiBAY2xpZW50LndzP1xuICAgICAgQHJlZnJlc2goKVxuICAgIGVsc2UgaWYgYXRvbS5jb25maWcuZ2V0KCdhdG9tLWxhdGV4LnByZXZpZXdfYWZ0ZXJfYnVpbGQnKSBpc1xcXG4gICAgICAgICdWaWV3IGluIFBERiB2aWV3ZXIgd2luZG93J1xuICAgICAgQG9wZW5WaWV3ZXJOZXdXaW5kb3coKVxuICAgICAgaWYgIWF0b20uY29uZmlnLmdldCgnYXRvbS1sYXRleC5mb2N1c192aWV3ZXInKVxuICAgICAgICBAbGF0ZXgudmlld2VyLmZvY3VzTWFpbigpXG4gICAgZWxzZSBpZiBhdG9tLmNvbmZpZy5nZXQoJ2F0b20tbGF0ZXgucHJldmlld19hZnRlcl9idWlsZCcpIGlzXFxcbiAgICAgICAgJ1ZpZXcgaW4gUERGIHZpZXdlciB0YWInXG4gICAgICBAb3BlblZpZXdlck5ld1RhYigpXG4gICAgICBpZiAhYXRvbS5jb25maWcuZ2V0KCdhdG9tLWxhdGV4LmZvY3VzX3ZpZXdlcicpXG4gICAgICAgIEBsYXRleC52aWV3ZXIuZm9jdXNNYWluKClcblxuICBvcGVuVmlld2VyTmV3V2luZG93OiAtPlxuICAgIHBkZlBhdGggPSBAbGF0ZXgubWFuYWdlci5maW5kUERGKClcbiAgICBpZiAhZnMuZXhpc3RzU3luYyBwZGZQYXRoXG4gICAgICByZXR1cm5cblxuICAgIGlmICFAZ2V0VXJsKClcbiAgICAgIHJldHVyblxuXG4gICAgaWYgQHRhYlZpZXc/IGFuZCBhdG9tLndvcmtzcGFjZS5wYW5lRm9ySXRlbShAdGFiVmlldyk/XG4gICAgICBhdG9tLndvcmtzcGFjZS5wYW5lRm9ySXRlbShAdGFiVmlldykuZGVzdHJveUl0ZW0oQHRhYlZpZXcpXG4gICAgICBAdGFiVmlldyA9IHVuZGVmaW5lZFxuICAgIGlmICFAd2luZG93PyBvciBAd2luZG93LmlzRGVzdHJveWVkKClcbiAgICAgIEBzZWxmID0gZ2V0Q3VycmVudFdpbmRvdygpXG4gICAgICBAd2luZG93ID0gbmV3IEJyb3dzZXJXaW5kb3coKVxuICAgIGVsc2VcbiAgICAgIEB3aW5kb3cuc2hvdygpXG4gICAgICBAd2luZG93LmZvY3VzKClcblxuICAgIEB3aW5kb3cubG9hZFVSTChAdXJsKVxuICAgIEB3aW5kb3cuc2V0TWVudUJhclZpc2liaWxpdHkoZmFsc2UpXG4gICAgQHdpbmRvdy5zZXRUaXRsZShcIlwiXCJBdG9tLUxhVGVYIFBERiBWaWV3ZXIgLSBbI3tAbGF0ZXgubWFpbkZpbGV9XVwiXCJcIilcblxuICBvcGVuVmlld2VyTmV3VGFiOiAtPlxuICAgIHBkZlBhdGggPSBAbGF0ZXgubWFuYWdlci5maW5kUERGKClcblxuICAgIGlmICFmcy5leGlzdHNTeW5jIHBkZlBhdGhcbiAgICAgIHJldHVyblxuXG4gICAgaWYgIUBnZXRVcmwoKVxuICAgICAgcmV0dXJuXG5cbiAgICBAc2VsZiA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmUoKVxuICAgIGlmIEB0YWJWaWV3PyBhbmQgYXRvbS53b3Jrc3BhY2UucGFuZUZvckl0ZW0oQHRhYlZpZXcpP1xuICAgICAgYXRvbS53b3Jrc3BhY2UucGFuZUZvckl0ZW0oQHRhYlZpZXcpLmFjdGl2YXRlSXRlbShAdGFiVmlldylcbiAgICBlbHNlXG4gICAgICBAdGFiVmlldyA9IG5ldyBQREZWaWV3KEB1cmwscGF0aC5iYXNlbmFtZShwZGZQYXRoKSlcbiAgICAgIGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmUoKS5zcGxpdFJpZ2h0KCkuYWRkSXRlbShAdGFiVmlldylcblxuICBnZXRVcmw6IC0+XG4gICAgdHJ5XG4gICAgICB7IGFkZHJlc3MsIHBvcnQgfSA9IEBsYXRleC5zZXJ2ZXIuaHR0cC5hZGRyZXNzKClcbiAgICAgIEB1cmwgPSBcIlwiXCJodHRwOi8vI3thZGRyZXNzfToje3BvcnR9L3ZpZXdlci5odG1sP2ZpbGU9cHJldmlldy5wZGZcIlwiXCJcbiAgICBjYXRjaCBlcnJcbiAgICAgIEBsYXRleC5zZXJ2ZXIub3BlblRhYiA9IHRydWVcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIHJldHVybiB0cnVlXG5cbmNsYXNzIFBERlZpZXdcbiAgY29uc3RydWN0b3I6ICh1cmwsdGl0bGUpIC0+XG4gICAgQGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICd3ZWJ2aWV3J1xuICAgIEBlbGVtZW50LnNldEF0dHJpYnV0ZSAnc3JjJywgdXJsXG4gICAgQGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY29uc29sZS1tZXNzYWdlJywgKGUpIC0+IGNvbnNvbGUubG9nIGUubWVzc2FnZVxuICAgIEB0aXRsZSA9IHRpdGxlXG4gICAgQHRpdGxlQ2FsbGJhY2tzID0gW11cblxuICB1cGRhdGVUaXRsZToobmV3VGl0bGUpIC0+XG4gICAgQHRpdGxlID0gbmV3VGl0bGVcbiAgICBAdGl0bGVDYWxsYmFja3MubWFwIChjYikgLT4gY2IoKVxuICAgIHJldHVybiB0cnVlXG5cbiAgb25EaWRDaGFuZ2VUaXRsZTogKGNiKSAtPlxuICAgIEB0aXRsZUNhbGxiYWNrcy5wdXNoKGNiKVxuICAgIHJldHVybiBkaXNwb3NlOiAoKSA9PiBAcmVtb3ZlVGl0bGVDYWxsYmFjayhjYilcblxuICByZW1vdmVUaXRsZUNhbGxiYWNrOiAoY2IpIC0+XG4gICAgQHRpdGxlQ2FsbGJhY2tzLnBvcChjYilcblxuICBnZXRUaXRsZTogLT5cbiAgICByZXR1cm4gXCJcIlwiQXRvbS1MYVRlWCAtICN7QHRpdGxlfVwiXCJcIlxuXG4gIHNlcmlhbGl6ZTogLT5cbiAgICByZXR1cm4gQGVsZW1lbnQuZ2V0QXR0cmlidXRlICdzcmMnXG5cbiAgZGVzdHJveTogLT5cbiAgICBAZWxlbWVudC5yZW1vdmUoKVxuXG4gIGdldEVsZW1lbnQ6IC0+XG4gICAgcmV0dXJuIEBlbGVtZW50XG4iXX0=
