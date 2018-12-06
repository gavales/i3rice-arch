(function() {
  var Disposable, Server, fs, http, path, ws,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Disposable = require('atom').Disposable;

  http = require('http');

  ws = require('ws');

  fs = require('fs');

  path = require('path');

  module.exports = Server = (function(superClass) {
    extend(Server, superClass);

    function Server(latex) {
      this.latex = latex;
      this.http = http.createServer((function(_this) {
        return function(req, res) {
          return _this.httpHandler(req, res);
        };
      })(this));
      this.httpRoot = (path.dirname(__filename)) + "/../viewer";
      this.listen = new Promise((function(_this) {
        return function(c, e) {
          return _this.http.listen(0, 'localhost', void 0, function(err) {
            if (err) {
              return e(err);
            } else if (_this.latex.server.openTab) {
              return _this.latex.viewer.openViewerNewWindow();
            }
          });
        };
      })(this));
      this.ws = new ws.Server({
        server: this.http
      });
      this.ws.on("connection", (function(_this) {
        return function(ws) {
          ws.on("message", function(msg) {
            return _this.latex.viewer.wsHandler(ws, msg);
          });
          ws.on("close", function() {
            return _this.latex.viewer.wsHandler(ws, '{"type":"close"}');
          });
          return ws.on("error", function(e) {
            return console.error(e);
          });
        };
      })(this));
    }

    Server.prototype.httpHandler = function(request, response) {
      var contentType, file, pdfPath, pdfSize, root;
      if (request.url.indexOf('viewer.html') > -1) {
        response.writeHead(200, {
          'Content-Type': 'text/html'
        });
        response.end(fs.readFileSync(this.httpRoot + "/viewer.html"), 'utf-8');
        return;
      }
      if (request.url.indexOf('preview.pdf') > -1) {
        if (!this.latex.manager.findMain()) {
          response.writeHead(404);
          response.end();
          return;
        }
        pdfPath = this.latex.manager.findPDF();
        pdfSize = fs.statSync(pdfPath).size;
        response.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Length': pdfSize
        });
        fs.createReadStream(pdfPath).pipe(response);
        return;
      }
      if (request.url.startsWith('/build/') || request.url.startsWith('/web/')) {
        root = path.resolve((path.dirname(__filename)) + "/../node_modules/pdfjs-dist");
      } else {
        root = this.httpRoot;
      }
      file = path.join(root, request.url.split('?')[0]);
      switch (path.extname(file)) {
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.css':
          contentType = 'text/css';
          break;
        case '.json':
          contentType = 'application/json';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
          contentType = 'image/jpg';
          break;
        default:
          contentType = 'text/html';
      }
      return fs.readFile(file, function(err, content) {
        if (err) {
          if (err.code === 'ENOENT') {
            response.writeHead(404);
          } else {
            response.writeHead(500);
          }
          return response.end();
        } else {
          response.writeHead(200, {
            'Content-Type': contentType
          });
          return response.end(content, 'utf-8');
        }
      });
    };

    return Server;

  })(Disposable);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi9zZXJ2ZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxzQ0FBQTtJQUFBOzs7RUFBRSxhQUFlLE9BQUEsQ0FBUSxNQUFSOztFQUNqQixJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVI7O0VBQ1AsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSOztFQUNMLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUjs7RUFDTCxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVI7O0VBRVAsTUFBTSxDQUFDLE9BQVAsR0FDTTs7O0lBQ1MsZ0JBQUMsS0FBRDtNQUNYLElBQUMsQ0FBQSxLQUFELEdBQVM7TUFFVCxJQUFDLENBQUEsSUFBRCxHQUFRLElBQUksQ0FBQyxZQUFMLENBQWtCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxHQUFELEVBQU0sR0FBTjtpQkFBYyxLQUFDLENBQUEsV0FBRCxDQUFhLEdBQWIsRUFBa0IsR0FBbEI7UUFBZDtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbEI7TUFDUixJQUFDLENBQUEsUUFBRCxHQUFnQixDQUFDLElBQUksQ0FBQyxPQUFMLENBQWEsVUFBYixDQUFELENBQUEsR0FBMEI7TUFDMUMsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFJLE9BQUosQ0FBWSxDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUMsQ0FBRCxFQUFJLENBQUo7aUJBQ3BCLEtBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTixDQUFhLENBQWIsRUFBZ0IsV0FBaEIsRUFBNkIsTUFBN0IsRUFBd0MsU0FBQyxHQUFEO1lBQ3RDLElBQUcsR0FBSDtxQkFDRSxDQUFBLENBQUUsR0FBRixFQURGO2FBQUEsTUFFSyxJQUFHLEtBQUMsQ0FBQSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQWpCO3FCQUNILEtBQUMsQ0FBQSxLQUFLLENBQUMs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RFg7QUFIUCxhQUtPLE9BTFA7VUFNSSxXQUFBLEdBQWM7QUFEWDtBQUxQLGFBT08sTUFQUDtVQVFJLFdBQUEsR0FBYztBQURYO0FBUFAsYUFTTyxNQVRQO1VBVUksV0FBQSxHQUFjO0FBRFg7QUFUUDtVQVlJLFdBQUEsR0FBYztBQVpsQjthQWNBLEVBQUUsQ0FBQyxRQUFILENBQVksSUFBWixFQUFrQixTQUFDLEdBQUQsRUFBTSxPQUFOO1FBQ2hCLElBQUcsR0FBSDtVQUNFLElBQUcsR0FBRyxDQUFDLElBQUosS0FBWSxRQUFmO1lBQ0UsUUFBUSxDQUFDLFNBQVQsQ0FBbUIsR0FBbkIsRUFERjtXQUFBLE1BQUE7WUFHRSxRQUFRLENBQUMsU0FBVCxDQUFtQixHQUFuQixFQUhGOztpQkFJQSxRQUFRLENBQUMsR0FBVCxDQUFBLEVBTEY7U0FBQSxNQUFBO1VBT0UsUUFBUSxDQUFDLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0I7WUFBQSxjQUFBLEVBQWdCLFdBQWhCO1dBQXhCO2lCQUNBLFFBQVEsQ0FBQyxHQUFULENBQWEsT0FBYixFQUFzQixPQUF0QixFQVJGOztNQURnQixDQUFsQjtJQXZDVzs7OztLQW5CTTtBQVByQiIsInNvdXJjZXNDb250ZW50IjpbInsgRGlzcG9zYWJsZSB9ID0gcmVxdWlyZSAnYXRvbSdcbmh0dHAgPSByZXF1aXJlICdodHRwJ1xud3MgPSByZXF1aXJlICd3cydcbmZzID0gcmVxdWlyZSAnZnMnXG5wYXRoID0gcmVxdWlyZSAncGF0aCdcblxubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgU2VydmVyIGV4dGVuZHMgRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3RvcjogKGxhdGV4KSAtPlxuICAgIEBsYXRleCA9IGxhdGV4XG5cbiAgICBAaHR0cCA9IGh0dHAuY3JlYXRlU2VydmVyIChyZXEsIHJlcykgPT4gQGh0dHBIYW5kbGVyKHJlcSwgcmVzKVxuICAgIEBodHRwUm9vdCA9IFwiXCJcIiN7cGF0aC5kaXJuYW1lKF9fZmlsZW5hbWUpfS8uLi92aWV3ZXJcIlwiXCJcbiAgICBAbGlzdGVuID0gbmV3IFByb21pc2UgKGMsIGUpID0+XG4gICAgICBAaHR0cC5saXN0ZW4gMCwgJ2xvY2FsaG9zdCcsIHVuZGVmaW5lZCwgKGVycikgPT5cbiAgICAgICAgaWYgZXJyXG4gICAgICAgICAgZShlcnIpXG4gICAgICAgIGVsc2UgaWYgQGxhdGV4LnNlcnZlci5vcGVuVGFiXG4gICAgICAgICAgQGxhdGV4LnZpZXdlci5vcGVuVmlld2VyTmV3V2luZG93KClcblxuICAgIEB3cyA9IG5ldyB3cy5TZXJ2ZXIgc2VydmVyOiBAaHR0cFxuICAgIEB3cy5vbiBcImNvbm5lY3Rpb25cIiwgKHdzKSA9PlxuICAgICAgd3Mub24gXCJtZXNzYWdlXCIsIChtc2cpID0+IEBsYXRleC52aWV3ZXIud3NIYW5kbGVyKHdzLCBtc2cpXG4gICAgICB3cy5vbiBcImNsb3NlXCIsICgpID0+IEBsYXRleC52aWV3ZXIud3NIYW5kbGVyKHdzLCAne1widHlwZVwiOlwiY2xvc2VcIn0nKVxuICAgICAgd3Mub24gXCJlcnJvclwiLCAoZSkgPT4gY29uc29sZS5lcnJvcihlKVxuXG4gIGh0dHBIYW5kbGVyOiAocmVxdWVzdCwgcmVzcG9uc2UpIC0+XG4gICAgaWYgcmVxdWVzdC51cmwuaW5kZXhPZigndmlld2VyLmh0bWwnKSA+IC0xXG4gICAgICByZXNwb25zZS53cml0ZUhlYWQgMjAwLCAnQ29udGVudC1UeXBlJzogJ3RleHQvaHRtbCdcbiAgICAgIHJlc3BvbnNlLmVuZCBmcy5yZWFkRmlsZVN5bmMoXCJcIlwiI3tAaHR0cFJvb3R9L3ZpZXdlci5odG1sXCJcIlwiKSwgJ3V0Zi04J1xuICAgICAgcmV0dXJuXG5cbiAgICBpZiByZXF1ZXN0LnVybC5pbmRleE9mKCdwcmV2aWV3LnBkZicpID4gLTFcbiAgICAgIGlmICFAbGF0ZXgubWFuYWdlci5maW5kTWFpbigpXG4gICAgICAgIHJlc3BvbnNlLndyaXRlSGVhZCA0MDRcbiAgICAgICAgcmVzcG9uc2UuZW5kKClcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIHBkZlBhdGggPSBAbGF0ZXgubWFuYWdlci5maW5kUERGKClcbiAgICAgIHBkZlNpemUgPSBmcy5zdGF0U3luYyhwZGZQYXRoKS5zaXplXG4gICAgICByZXNwb25zZS53cml0ZUhlYWQgMjAwLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3BkZicsXG4gICAgICAgICdDb250ZW50LUxlbmd0aCc6IHBkZlNpemVcbiAgICAgIGZzLmNyZWF0ZVJlYWRTdHJlYW0ocGRmUGF0aCkucGlwZShyZXNwb25zZSlcbiAgICAgIHJldHVyblxuXG4gICAgaWYgcmVxdWVzdC51cmwuc3RhcnRzV2l0aCgnL2J1aWxkLycpIHx8IHJlcXVlc3QudXJsLnN0YXJ0c1dpdGgoJy93ZWIvJylcbiAgICAgIHJvb3QgPSBwYXRoLnJlc29sdmUoXCIje3BhdGguZGlybmFtZShfX2ZpbGVuYW1lKX0vLi4vbm9kZV9tb2R1bGVzL3BkZmpzLWRpc3RcIilcbiAgICBlbHNlXG4gICAgICByb290ID0gQGh0dHBSb290XG4gICAgZmlsZSA9IHBhdGguam9pbiByb290LCByZXF1ZXN0LnVybC5zcGxpdCgnPycpWzBdXG4gICAgc3dpdGNoIHBhdGguZXh0bmFtZShmaWxlKVxuICAgICAgd2hlbiAnLmpzJ1xuICAgICAgICBjb250ZW50VHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnXG4gICAgICB3aGVuICcuY3NzJ1xuICAgICAgICBjb250ZW50VHlwZSA9ICd0ZXh0L2NzcydcbiAgICAgIHdoZW4gJy5qc29uJ1xuICAgICAgICBjb250ZW50VHlwZSA9ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgd2hlbiAnLnBuZydcbiAgICAgICAgY29udGVudFR5cGUgPSAnaW1hZ2UvcG5nJ1xuICAgICAgd2hlbiAnLmpwZydcbiAgICAgICAgY29udGVudFR5cGUgPSAnaW1hZ2UvanBnJ1xuICAgICAgZWxzZVxuICAgICAgICBjb250ZW50VHlwZSA9ICd0ZXh0L2h0bWwnXG5cbiAgICBmcy5yZWFkRmlsZSBmaWxlLCAoZXJyLCBjb250ZW50KSAtPlxuICAgICAgaWYgZXJyXG4gICAgICAgIGlmIGVyci5jb2RlID09ICdFTk9FTlQnXG4gICAgICAgICAgcmVzcG9uc2Uud3JpdGVIZWFkIDQwNFxuICAgICAgICBlbHNlXG4gICAgICAgICAgcmVzcG9uc2Uud3JpdGVIZWFkIDUwMFxuICAgICAgICByZXNwb25zZS5lbmQoKVxuICAgICAgZWxzZVxuICAgICAgICByZXNwb25zZS53cml0ZUhlYWQgMjAwLCAnQ29udGVudC1UeXBlJzogY29udGVudFR5cGVcbiAgICAgICAgcmVzcG9uc2UuZW5kIGNvbnRlbnQsICd1dGYtOCdcbiJdfQ==
