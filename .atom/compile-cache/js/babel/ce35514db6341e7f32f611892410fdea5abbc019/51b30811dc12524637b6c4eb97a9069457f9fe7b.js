Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

var _atom = require("atom");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _child_process = require("child_process");

var _child_process2 = _interopRequireDefault(_child_process);

"use babel";

var warning = /^((?:Under|Over)full [^ ]+ \(.*\) in paragraph) at lines (\d+)--(\d+)/gm;
var error = /^! (?:LaTeX Error: )?((?:.|\n(?!l.\d+).)*)[\s\S]*?^l\.(\d+)/m;

exports["default"] = {
	subscriptions: null,

	activate: function activate() {
		this.subscriptions = new _atom.CompositeDisposable();
	},

	deactivate: function deactivate() {
		this.subscriptions.dispose();
	},

	provideLinter: function provideLinter() {
		return {
			name: "LaTeX",
			scope: "file",
			lintsOnChange: false,
			grammarScopes: ["text.tex.latex"],
			lint: _asyncToGenerator(function* (editor) {
				var path = editor.getPath();
				var dir = editor.getDirectoryPath();
				var cmd = _child_process2["default"].spawn(atom.config.get("linter-latex.compiler"), ["-halt-on-error"].concat(_toConsumableArray(atom.config.get("linter-latex.extraArguments")), [path]), {
					cwd: dir
				});

				var results = [];
				yield new Promise(function (resolve, reject) {
					cmd.stdout.on("data", function (stdout) {
						var matches = undefined;

						matches = error.exec(stdout);
						if (matches) {
							var line = parseInt(matches[2]) - 1;
							results.push({
								severity: "error",
								location: {
									file: path,
									position: [[line, 0], [line, editor.buffer.lineLengthForRow(line)]]
								},
								excerpt: matches[1].replace(/\n/g, "")
							});
						}

						while (true) {
							matches = warning.exec(stdout);
							if (!matches) {
								break;
							}

							var start = parseInt(matches[2]) - 1;
							var end = parseInt(matches[3]) - 2;
							results.push({
								severity: "warning",
								location: {
									file: path,
									position: [[start, 0], [end, editor.buffer.lineLengthForRow(end)]]
								},
								excerpt: matches[1]
							});
						}
					});
					cmd.on("close", resolve);
					cmd.on("error", reject);
					cmd.stdin.end();
				});

				return _lodash2["default"].uniqWith(results, _lodash2["default"].isEqual);
			})
		};
	}
};
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2dhdmFyY2gvLmF0b20vcGFja2FnZXMvbGludGVyLWxhdGV4L2xpYi9saW50ZXItbGF0ZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztvQkFFa0MsTUFBTTs7c0JBQzFCLFFBQVE7Ozs7NkJBQ1AsZUFBZTs7OztBQUo5QixXQUFXLENBQUE7O0FBTVgsSUFBTSxPQUFPLEdBQUcseUVBQXlFLENBQUE7QUFDekYsSUFBTSxLQUFLLEdBQUcsOERBQThELENBQUE7O3FCQUU3RDtBQUNkLGNBQWEsRUFBRSxJQUFJOztBQUVuQixTQUFRLEVBQUEsb0JBQUc7QUFDVixNQUFJLENBQUMsYUFBYSxHQUFHLCtCQUF5QixDQUFBO0VBQzlDOztBQUVELFdBQVUsRUFBQSxzQkFBRztBQUNaLE1BQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUE7RUFDNUI7O0FBRUQsY0FBYSxFQUFBLHlCQUFHO0FBQ2YsU0FBTztBQUNOLE9BQUksRUFBRSxPQUFPO0FBQ2IsUUFBSyxFQUFFLE1BQU07QUFDYixnQkFBYSxFQUFFLEtBQUs7QUFDcEIsZ0JBQWEsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0FBQ2pDLEFBQU0sT0FBSSxvQkFBQSxXQUFDLE1BQU0sRUFBRTtBQUNsQixRQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDN0IsUUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUE7QUFDckMsUUFBTSxHQUFHLEdBQUcsMkJBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLEdBQUcsZ0JBQWdCLDRCQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLElBQUUsSUFBSSxJQUFHO0FBQzNJLFFBQUcsRUFBRSxHQUFHO0tBQ1IsQ0FBQyxDQUFBOztBQUVGLFFBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQTtBQUNsQixVQUFNLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUN0QyxRQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxNQUFNLEVBQUs7QUFDakMsVUFBSSxPQUFPLFlBQUEsQ0FBQTs7QUFFWCxhQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUM1QixVQUFJLE9BQU8sRUFBRTtBQUNaLFdBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDckMsY0FBTyxDQUFDLElBQUksQ0FBQztBQUNaLGdCQUFRLEVBQUUsT0FBTztBQUNqQixnQkFBUSxFQUFFO0FBQ1QsYUFBSSxFQUFFLElBQUk7QUFDVixpQkFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ25FO0FBQ0QsZUFBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztRQUN0QyxDQUFDLENBQUE7T0FDRjs7QUFFRCxhQUFPLElBQUksRUFBRTtBQUNaLGNBQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQzlCLFdBQUksQ0FBQyxPQUFPLEVBQUU7QUFDYixjQUFLO1FBQ0w7O0FBRUQsV0FBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN0QyxXQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3BDLGNBQU8sQ0FBQyxJQUFJLENBQUM7QUFDWixnQkFBUSxFQUFFLFNBQVM7QUFDbkIsZ0JBQVEsRUFBRTtBQUNULGFBQUksRUFBRSxJQUFJO0FBQ1YsaUJBQVEsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNsRTtBQUNELGVBQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQTtPQUNGO01BQ0QsQ0FBQyxDQUFBO0FBQ0YsUUFBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDeEIsUUFBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDdkIsUUFBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTtLQUNmLENBQUMsQ0FBQTs7QUFFRixXQUFPLG9CQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsb0JBQUUsT0FBTyxDQUFDLENBQUE7SUFDckMsQ0FBQTtHQUNELENBQUE7RUFDRDtDQUNEIiwiZmlsZSI6Ii9ob21lL2dhdmFyY2gvLmF0b20vcGFja2FnZXMvbGludGVyLWxhdGV4L2xpYi9saW50ZXItbGF0ZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbmltcG9ydCB7Q29tcG9zaXRlRGlzcG9zYWJsZX0gZnJvbSBcImF0b21cIlxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiXG5pbXBvcnQgY3AgZnJvbSBcImNoaWxkX3Byb2Nlc3NcIlxuXG5jb25zdCB3YXJuaW5nID0gL14oKD86VW5kZXJ8T3ZlcilmdWxsIFteIF0rIFxcKC4qXFwpIGluIHBhcmFncmFwaCkgYXQgbGluZXMgKFxcZCspLS0oXFxkKykvZ21cbmNvbnN0IGVycm9yID0gL14hICg/OkxhVGVYIEVycm9yOiApPygoPzoufFxcbig/IWwuXFxkKykuKSopW1xcc1xcU10qP15sXFwuKFxcZCspL21cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRzdWJzY3JpcHRpb25zOiBudWxsLFxuXG5cdGFjdGl2YXRlKCkge1xuXHRcdHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblx0fSxcblxuXHRkZWFjdGl2YXRlKCkge1xuXHRcdHRoaXMuc3Vic2NyaXB0aW9ucy5kaXNwb3NlKClcblx0fSxcblxuXHRwcm92aWRlTGludGVyKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRuYW1lOiBcIkxhVGVYXCIsXG5cdFx0XHRzY29wZTogXCJmaWxlXCIsXG5cdFx0XHRsaW50c09uQ2hhbmdlOiBmYWxzZSxcblx0XHRcdGdyYW1tYXJTY29wZXM6IFtcInRleHQudGV4LmxhdGV4XCJdLFxuXHRcdFx0YXN5bmMgbGludChlZGl0b3IpIHtcblx0XHRcdFx0Y29uc3QgcGF0aCA9IGVkaXRvci5nZXRQYXRoKClcblx0XHRcdFx0Y29uc3QgZGlyID0gZWRpdG9yLmdldERpcmVjdG9yeVBhdGgoKVxuXHRcdFx0XHRjb25zdCBjbWQgPSBjcC5zcGF3bihhdG9tLmNvbmZpZy5nZXQoXCJsaW50ZXItbGF0ZXguY29tcGlsZXJcIiksIFtcIi1oYWx0LW9uLWVycm9yXCIsIC4uLmF0b20uY29uZmlnLmdldChcImxpbnRlci1sYXRleC5leHRyYUFyZ3VtZW50c1wiKSwgcGF0aF0sIHtcblx0XHRcdFx0XHRjd2Q6IGRpcixcblx0XHRcdFx0fSlcblxuXHRcdFx0XHRjb25zdCByZXN1bHRzID0gW11cblx0XHRcdFx0YXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdGNtZC5zdGRvdXQub24oXCJkYXRhXCIsIChzdGRvdXQpID0+IHtcblx0XHRcdFx0XHRcdGxldCBtYXRjaGVzXG5cblx0XHRcdFx0XHRcdG1hdGNoZXMgPSBlcnJvci5leGVjKHN0ZG91dClcblx0XHRcdFx0XHRcdGlmIChtYXRjaGVzKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGxpbmUgPSBwYXJzZUludChtYXRjaGVzWzJdKSAtIDFcblx0XHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHRzZXZlcml0eTogXCJlcnJvclwiLFxuXHRcdFx0XHRcdFx0XHRcdGxvY2F0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmaWxlOiBwYXRoLFxuXHRcdFx0XHRcdFx0XHRcdFx0cG9zaXRpb246IFtbbGluZSwgMF0sIFtsaW5lLCBlZGl0b3IuYnVmZmVyLmxpbmVMZW5ndGhGb3JSb3cobGluZSldXSxcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdGV4Y2VycHQ6IG1hdGNoZXNbMV0ucmVwbGFjZSgvXFxuL2csIFwiXCIpLFxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR3aGlsZSAodHJ1ZSkge1xuXHRcdFx0XHRcdFx0XHRtYXRjaGVzID0gd2FybmluZy5leGVjKHN0ZG91dClcblx0XHRcdFx0XHRcdFx0aWYgKCFtYXRjaGVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHN0YXJ0ID0gcGFyc2VJbnQobWF0Y2hlc1syXSkgLSAxXG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVuZCA9IHBhcnNlSW50KG1hdGNoZXNbM10pIC0gMlxuXHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRcdHNldmVyaXR5OiBcIndhcm5pbmdcIixcblx0XHRcdFx0XHRcdFx0XHRsb2NhdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZmlsZTogcGF0aCxcblx0XHRcdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiBbW3N0YXJ0LCAwXSwgW2VuZCwgZWRpdG9yLmJ1ZmZlci5saW5lTGVuZ3RoRm9yUm93KGVuZCldXSxcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdGV4Y2VycHQ6IG1hdGNoZXNbMV0sXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRjbWQub24oXCJjbG9zZVwiLCByZXNvbHZlKVxuXHRcdFx0XHRcdGNtZC5vbihcImVycm9yXCIsIHJlamVjdClcblx0XHRcdFx0XHRjbWQuc3RkaW4uZW5kKClcblx0XHRcdFx0fSlcblxuXHRcdFx0XHRyZXR1cm4gXy51bmlxV2l0aChyZXN1bHRzLCBfLmlzRXF1YWwpXG5cdFx0XHR9LFxuXHRcdH1cblx0fSxcbn1cbiJdfQ==