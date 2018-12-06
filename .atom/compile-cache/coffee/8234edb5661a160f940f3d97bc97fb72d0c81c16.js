(function() {
  var Point, TextData, dispatch, getView, getVimState, ref, setEditorWidthInCharacters, settings;

  Point = require('atom').Point;

  ref = require('./spec-helper'), getVimState = ref.getVimState, dispatch = ref.dispatch, TextData = ref.TextData, getView = ref.getView;

  settings = require('../lib/settings');

  setEditorWidthInCharacters = function(editor, widthInCharacters) {
    var component;
    editor.setDefaultCharWidth(1);
    component = editor.component;
    component.element.style.width = component.getGutterContainerWidth() + widthInCharacters * component.measurements.baseCharacterWidth + "px";
    return component.getNextUpdatePromise();
  };

  describe("Motion general", function() {
    var editor, editorElement, ensure, ensureWait, ref1, set, vimState;
    ref1 = [], set = ref1[0], ensure = ref1[1], ensureWait = ref1[2], editor = ref1[3], editorElement = ref1[4], vimState = ref1[5];
    beforeEach(function() {
      return getVimState(function(state, _vim) {
        vimState = state;
        editor = vimState.editor, editorElement = vimState.editorElement;
        return set = _vim.set, ensure = _vim.ensure, ensureWait = _vim.ensureWait, _vim;
      });
    });
    describe("simple motions", function() {
      var text;
      text = null;
      beforeEach(function() {
        text = new TextData("12345\nabcd\nABCDE\n");
        return set({
          text: text.getRaw(),
          cursor: [1, 1]
        });
      });
      describe("the h keybinding", function() {
        describe("as a motion", function() {
          it("moves the cursor left, but not to the previous line", function() {
            ensure('h', {
              cursor: [1, 0]
            });
            return ensure('h', {
              cursor: [1, 0]
            });
          });
          return it("moves the cursor to the previous line if wrapLeftRightMotion is true", function() {
            settings.set('wrapLeftRightMotion', true);
            return ensure('h h', {
              cursor: [0, 4]
            });
          });
        });
        return describe("as a selection", function() {
          return it("selects the character to the left", function() {
            return ensure('y h', {
              cursor: [1, 0],
              register: {
                '"': {
                  text: 'a'
                }
              }
            });
          });
        });
      });
      describe("the j keybinding", function() {
        it("moves the cursor down, but not to the end of the last line", function() {
          ensure('j', {
            cursor: [2, 1]
          });
          return ensure('j', {
            cursor: [2, 1]
          });
        });
        it("moves the cursor to the end of the line, not past it", function() {
          set({
            cursor: [0, 4]
          });
          return ensure('j', {
            cursor: [1, 3]
          });
        });
        it("remembers the column it was in after moving to shorter line", function() {
          set({
            cursor: [0, 4]
          });
          ensure('j', {
            cursor: [1, 3]
          });
          return ensure('j', {
            cursor: [2, 4]
          });
        });
        it("never go past last newline", function() {
          return ensure('1 0 j', {
            cursor: [2, 1]
          });
        });
        return describe("when visual mode", function() {
          beforeEach(function() {
            return ensure('v', {
              cursor: [1, 2],
              selectedText: 'b'
            });
          });
          it("moves the cursor down", function() {
            return ensure('j', {
              cursor: [2, 2],
              selectedText: "bcd\nAB"
            });
          });
          it("doesn't go over after the last line", function() {
            return ensure('j', {
              cursor: [2, 2],
              selectedText: "bcd\nAB"
            });
          });
          it("keep same column(goalColumn) even after across the empty line", function() {
            ensure('escape');
            set({
              text: "abcdefg\n\nabcdefg",
              cursor: [0, 3]
            });
            ensure('v', {
              cursor: [0, 4]
            });
            return ensure('j j', {
              cursor: [2, 4],
              selectedText: "defg\n\nabcd"
            });
          });
          return it("original visual line remains when jk across orignal selection", function() {
            text = new TextData("line0\nline1\nline2\n");
            set({
              text: text.getRaw(),
              cursor: [1, 1]
            });
            ensure('V', {
              selectedText: text.getLines([1])
            });
            ensure('j', {
              selectedText: text.getLines([1, 2])
            });
            ensure('k', {
              selectedText: text.getLines([1])
            });
            ensure('k', {
              selectedText: text.getLines([0, 1])
            });
            ensure('j', {
              selectedText: text.getLines([1])
            });
            return ensure('j', {
              selectedText: text.getLines([1, 2])
            });
          });
        });
      });
      describe("move-down-wrap, move-up-wrap", function() {
        beforeEach(function() {
          atom.keymaps.add("test", {
            'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
              'k': 'vim-mode-plus:move-up-wrap',
              'j': 'vim-mode-plus:move-down-wrap'
            }
          });
          return set({
            text: "hello\nhello\nhello\nhello\n"
          });
        });
        describe('move-down-wrap', function() {
          beforeEach(function() {
            return set({
              cursor: [3, 1]
            });
          });
          it("move down with wrawp", function() {
            return ensure('j', {
              cursor: [0, 1]
            });
          });
          it("move down with wrawp", function() {
            return ensure('2 j', {
              cursor: [1, 1]
            });
          });
          return it("move down with wrawp", function() {
            return ensure('4 j', {
              cursor: [3, 1]
            });
          });
        });
        return describe('move-up-wrap', function() {
          beforeEach(function() {
            return set({
              cursor: [0, 1]
            });
          });
          it("move down with wrawp", function() {
            return ensure('k', {
              cursor: [3, 1]
            });
          });
          it("move down with wrawp", function() {
            return ensure('2 k', {
              cursor: [2, 1]
            });
          });
          return it("move down with wrawp", function() {
            return ensure('4 k', {
              cursor: [0, 1]
            });
          });
        });
      });
      xdescribe("with big count was given", function() {
        var BIG_NUMBER, ensureBigCountMotion;
        BIG_NUMBER = Number.MAX_SAFE_INTEGER;
        ensureBigCountMotion = function(keystrokes, options) {
          var count;
          count = String(BIG_NUMBER).split('').join(' ');
          keystrokes = keystrokes.split('').join(' ');
          return ensure(count + " " + keystrokes, options);
        };
        beforeEach(function() {
          atom.keymaps.add("test", {
            'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
              'g {': 'vim-mode-plus:move-to-previous-fold-start',
              'g }': 'vim-mode-plus:move-to-next-fold-start',
              ', N': 'vim-mode-plus:move-to-previous-number',
              ', n': 'vim-mode-plus:move-to-next-number'
            }
          });
          return set({
            text: "0000\n1111\n2222\n",
            cursor: [1, 2]
          });
        });
        it("by `j`", function() {
          return ensureBigCountMotion('j', {
            cursor: [2, 2]
          });
        });
        it("by `k`", function() {
          return ensureBigCountMotion('k', {
            cursor: [0, 2]
          });
        });
        it("by `h`", function() {
          return ensureBigCountMotion('h', {
            cursor: [1, 0]
          });
        });
        it("by `l`", function() {
          return ensureBigCountMotion('l', {
            cursor: [1, 3]
          });
        });
        it("by `[`", function() {
          return ensureBigCountMotion('[', {
            cursor: [0, 2]
          });
        });
        it("by `]`", function() {
          return ensureBigCountMotion(']', {
            cursor: [2, 2]
          });
        });
        it("by `w`", function() {
          return ensureBigCountMotion('w', {
            cursor: [2, 3]
          });
        });
        it("by `W`", function() {
          return ensureBigCountMotion('W', {
            cursor: [2, 3]
          });
        });
        it("by `b`", function() {
          return ensureBigCountMotion('b', {
            cursor: [0, 0]
          });
        });
        it("by `B`", function() {
          return ensureBigCountMotion('B', {
            cursor: [0, 0]
          });
        });
        it("by `e`", function() {
          return ensureBigCountMotion('e', {
            cursor: [2, 3]
          });
        });
        it("by `(`", function() {
          return ensureBigCountMotion('(', {
            cursor: [0, 0]
          });
        });
        it("by `)`", function() {
          return ensureBigCountMotion(')', {
            cursor: [2, 3]
          });
        });
        it("by `{`", function() {
          return ensureBigCountMotion('{', {
            cursor: [0, 0]
          });
        });
        it("by `}`", function() {
          return ensureBigCountMotion('}', {
            cursor: [2, 3]
          });
        });
        it("by `-`", function() {
          return ensureBigCountMotion('-', {
            cursor: [0, 0]
          });
        });
        it("by `_`", function() {
          return ensureBigCountMotion('_', {
            cursor: [2, 0]
          });
        });
        it("by `g {`", function() {
          return ensureBigCountMotion('g {', {
            cursor: [1, 2]
          });
        });
        it("by `g }`", function() {
          return ensureBigCountMotion('g }', {
            cursor: [1, 2]
          });
        });
        it("by `, N`", function() {
          return ensureBigCountMotion(', N', {
            cursor: [1, 2]
          });
        });
        it("by `, n`", function() {
          return ensureBigCountMotion(', n', {
            cursor: [1, 2]
          });
        });
        return it("by `y y`", function() {
          return ensureBigCountMotion('y y', {
            cursor: [1, 2]
          });
        });
      });
      describe("the k keybinding", function() {
        beforeEach(function() {
          return set({
            cursor: [2, 1]
          });
        });
        it("moves the cursor up", function() {
          return ensure('k', {
            cursor: [1, 1]
          });
        });
        it("moves the cursor up and remember column it was in", function() {
          set({
            cursor: [2, 4]
          });
          ensure('k', {
            cursor: [1, 3]
          });
          return ensure('k', {
            cursor: [0, 4]
          });
        });
        it("moves the cursor up, but not to the beginning of the first line", function() {
          return ensure('1 0 k', {
            cursor: [0, 1]
          });
        });
        return describe("when visual mode", function() {
          return it("keep same column(goalColumn) even after across the empty line", function() {
            set({
              text: "abcdefg\n\nabcdefg",
              cursor: [2, 3]
            });
            ensure('v', {
              cursor: [2, 4],
              selectedText: 'd'
            });
            return ensure('k k', {
              cursor: [0, 3],
              selectedText: "defg\n\nabcd"
            });
          });
        });
      });
      describe("the j, k keybinding in hardTab text", function() {
        beforeEach(function() {
          jasmine.attachToDOM(atom.workspace.getElement());
          waitsForPromise(function() {
            return atom.packages.activatePackage('language-go');
          });
          getVimState(function(state, vimEditor) {
            editor = state.editor, editorElement = state.editorElement;
            return set = vimEditor.set, ensure = vimEditor.ensure, vimEditor;
          });
          return runs(function() {
            set({
              grammar: 'source.go',
              textC: "packa|ge main\n\nimport \"fmt\"\n\nfunc main() {\n\tif 7%2 == 0 {\n\t\tfmt.Println(\"7 is even\")\n\t} else {\n\t\tfmt.Println(\"7 is odd\")\n\t}\n}\n"
            });
            return editor.setSoftTabs(false);
          });
        });
        it("[tabLength = 2] move up/down bufferRow wise with aware of tabLength", function() {
          editor.update({
            tabLength: 2
          });
          ensure('j', {
            cursor: [1, 0],
            cursorScreen: [1, 0]
          });
          ensure('j', {
            cursor: [2, 5],
            cursorScreen: [2, 5]
          });
          ensure('j', {
            cursor: [3, 0],
            cursorScreen: [3, 0]
          });
          ensure('j', {
            cursor: [4, 5],
            cursorScreen: [4, 5]
          });
          ensure('j', {
            cursor: [5, 4],
            cursorScreen: [5, 5]
          });
          ensure('j', {
            cursor: [6, 3],
            cursorScreen: [6, 5]
          });
          ensure('j', {
            cursor: [7, 4],
            cursorScreen: [7, 5]
          });
          ensure('j', {
            cursor: [8, 3],
            cursorScreen: [8, 5]
          });
          ensure('j', {
            cursor: [9, 1],
            cursorScreen: [9, 2]
          });
          ensure('j', {
            cursor: [10, 0],
            cursorScreen: [10, 0]
          });
          ensure('k', {
            cursor: [9, 1],
            cursorScreen: [9, 2]
          });
          ensure('k', {
            cursor: [8, 3],
            cursorScreen: [8, 5]
          });
          ensure('k', {
            cursor: [7, 4],
            cursorScreen: [7, 5]
          });
          ensure('k', {
            cursor: [6, 3],
            cursorScreen: [6, 5]
          });
          ensure('k', {
            cursor: [5, 4],
            cursorScreen: [5, 5]
          });
          ensure('k', {
            cursor: [4, 5],
            cursorScreen: [4, 5]
          });
          ensure('k', {
            cursor: [3, 0],
            cursorScreen: [3, 0]
          });
          ensure('k', {
            cursor: [2, 5],
            cursorScreen: [2, 5]
          });
          ensure('k', {
            cursor: [1, 0],
            cursorScreen: [1, 0]
          });
          return ensure('k', {
            cursor: [0, 5],
            cursorScreen: [0, 5]
          });
        });
        it("[tabLength = 4] move up/down bufferRow wise with aware of tabLength", function() {
          editor.update({
            tabLength: 4
          });
          ensure('j', {
            cursor: [1, 0],
            cursorScreen: [1, 0]
          });
          ensure('j', {
            cursor: [2, 5],
            cursorScreen: [2, 5]
          });
          ensure('j', {
            cursor: [3, 0],
            cursorScreen: [3, 0]
          });
          ensure('j', {
            cursor: [4, 5],
            cursorScreen: [4, 5]
          });
          ensure('j', {
            cursor: [5, 2],
            cursorScreen: [5, 5]
          });
          ensure('j', {
            cursor: [6, 1],
            cursorScreen: [6, 4]
          });
          ensure('j', {
            cursor: [7, 2],
            cursorScreen: [7, 5]
          });
          ensure('j', {
            cursor: [8, 1],
            cursorScreen: [8, 4]
          });
          ensure('j', {
            cursor: [9, 1],
            cursorScreen: [9, 4]
          });
          ensure('j', {
            cursor: [10, 0],
            cursorScreen: [10, 0]
          });
          ensure('k', {
            cursor: [9, 1],
            cursorScreen: [9, 4]
          });
          ensure('k', {
            cursor: [8, 1],
            cursorScreen: [8, 4]
          });
          ensure('k', {
            cursor: [7, 2],
            cursorScreen: [7, 5]
          });
          ensure('k', {
            cursor: [6, 1],
            cursorScreen: [6, 4]
          });
          ensure('k', {
            cursor: [5, 2],
            cursorScreen: [5, 5]
          });
          ensure('k', {
            cursor: [4, 5],
            cursorScreen: [4, 5]
          });
          ensure('k', {
            cursor: [3, 0],
            cursorScreen: [3, 0]
          });
          ensure('k', {
            cursor: [2, 5],
            cursorScreen: [2, 5]
          });
          ensure('k', {
            cursor: [1, 0],
            cursorScreen: [1, 0]
          });
          return ensure('k', {
            cursor: [0, 5],
            cursorScreen: [0, 5]
          });
        });
        return it("[tabLength = 8] move up/down bufferRow wise with aware of tabLength", function() {
          editor.update({
            tabLength: 8
          });
          set({
            cursor: [5, 9]
          });
          ensure('j', {
            cursor: [6, 2],
            cursorScreen: [6, 16]
          });
          ensure('j', {
            cursor: [7, 8],
            cursorScreen: [7, 15]
          });
          ensure('j', {
            cursor: [8, 2],
            cursorScreen: [8, 16]
          });
          ensure('j', {
            cursor: [9, 1],
            cursorScreen: [9, 8]
          });
          ensure('j', {
            cursor: [10, 0],
            cursorScreen: [10, 0]
          });
          ensure('k', {
            cursor: [9, 1],
            cursorScreen: [9, 8]
          });
          ensure('k', {
            cursor: [8, 2],
            cursorScreen: [8, 16]
          });
          ensure('k', {
            cursor: [7, 8],
            cursorScreen: [7, 15]
          });
          return ensure('k', {
            cursor: [6, 2],
            cursorScreen: [6, 16]
          });
        });
      });
      describe("gj gk in softwrap", function() {
        text = [][0];
        beforeEach(function() {
          editor.setSoftWrapped(true);
          editor.setEditorWidthInChars(10);
          editor.setDefaultCharWidth(1);
          text = new TextData("1st line of buffer\n2nd line of buffer, Very long line\n3rd line of buffer\n\n5th line of buffer\n");
          return set({
            text: text.getRaw(),
            cursor: [0, 0]
          });
        });
        describe("selection is not reversed", function() {
          it("screen position and buffer position is different", function() {
            ensure('g j', {
              cursorScreen: [1, 0],
              cursor: [0, 9]
            });
            ensure('g j', {
              cursorScreen: [2, 0],
              cursor: [1, 0]
            });
            ensure('g j', {
              cursorScreen: [3, 0],
              cursor: [1, 9]
            });
            return ensure('g j', {
              cursorScreen: [4, 0],
              cursor: [1, 12]
            });
          });
          return it("jk move selection buffer-line wise", function() {
            ensure('V', {
              selectedText: text.getLines([0])
            });
            ensure('j', {
              selectedText: text.getLines([0, 1])
            });
            ensure('j', {
              selectedText: text.getLines([0, 1, 2])
            });
            ensure('j', {
              selectedText: text.getLines([0, 1, 2, 3])
            });
            ensure('j', {
              selectedText: text.getLines([0, 1, 2, 3, 4])
            });
            ensure('k', {
              selectedText: text.getLines([0, 1, 2, 3])
            });
            ensure('k', {
              selectedText: text.getLines([0, 1, 2])
            });
            ensure('k', {
              selectedText: text.getLines([0, 1])
            });
            ensure('k', {
              selectedText: text.getLines([0])
            });
            return ensure('k', {
              selectedText: text.getLines([0])
            });
          });
        });
        return describe("selection is reversed", function() {
          it("screen position and buffer position is different", function() {
            ensure('g j', {
              cursorScreen: [1, 0],
              cursor: [0, 9]
            });
            ensure('g j', {
              cursorScreen: [2, 0],
              cursor: [1, 0]
            });
            ensure('g j', {
              cursorScreen: [3, 0],
              cursor: [1, 9]
            });
            return ensure('g j', {
              cursorScreen: [4, 0],
              cursor: [1, 12]
            });
          });
          return it("jk move selection buffer-line wise", function() {
            set({
              cursor: [4, 0]
            });
            ensure('V', {
              selectedText: text.getLines([4])
            });
            ensure('k', {
              selectedText: text.getLines([3, 4])
            });
            ensure('k', {
              selectedText: text.getLines([2, 3, 4])
            });
            ensure('k', {
              selectedText: text.getLines([1, 2, 3, 4])
            });
            ensure('k', {
              selectedText: text.getLines([0, 1, 2, 3, 4])
            });
            ensure('j', {
              selectedText: text.getLines([1, 2, 3, 4])
            });
            ensure('j', {
              selectedText: text.getLines([2, 3, 4])
            });
            ensure('j', {
              selectedText: text.getLines([3, 4])
            });
            ensure('j', {
              selectedText: text.getLines([4])
            });
            return ensure('j', {
              selectedText: text.getLines([4])
            });
          });
        });
      });
      describe("the l keybinding", function() {
        beforeEach(function() {
          set({
            textC: "0: aaaa\n1: bbbb\n2: cccc\n\n4:\n"
          });
          return set({
            cursor: [1, 2]
          });
        });
        describe("when wrapLeftRightMotion = false(=default)", function() {
          it("[normal] move to right, count support, but not wrap to next-line", function() {
            set({
              cursor: [0, 0]
            });
            ensure('l', {
              cursor: [0, 1]
            });
            ensure('l', {
              cursor: [0, 2]
            });
            ensure('2 l', {
              cursor: [0, 4]
            });
            ensure('5 l', {
              cursor: [0, 6]
            });
            return ensure('l', {
              cursor: [0, 6]
            });
          });
          it("[normal: at-blank-row] not wrap to next line", function() {
            set({
              cursor: [3, 0]
            });
            return ensure('l', {
              cursor: [3, 0],
              mode: "normal"
            });
          });
          it("[visual: at-last-char] can select newline but not wrap to next-line", function() {
            set({
              cursor: [0, 6]
            });
            ensure("v", {
              selectedText: "a",
              mode: ['visual', 'characterwise'],
              cursor: [0, 7]
            });
            expect(editor.getLastCursor().isAtEndOfLine()).toBe(true);
            ensure("l", {
              selectedText: "a\n",
              mode: ['visual', 'characterwise'],
              cursor: [1, 0]
            });
            return ensure("l", {
              selectedText: "a\n",
              mode: ['visual', 'characterwise'],
              cursor: [1, 0]
            });
          });
          return it("[visual: at-blank-row] can select newline but not wrap to next-line", function() {
            set({
              cursor: [3, 0]
            });
            ensure("v", {
              selectedText: "\n",
              mode: ['visual', 'characterwise'],
              cursor: [4, 0]
            });
            return ensure("l", {
              selectedText: "\n",
              mode: ['visual', 'characterwise'],
              cursor: [4, 0]
            });
          });
        });
        return describe("when wrapLeftRightMotion = true", function() {
          beforeEach(function() {
            return settings.set('wrapLeftRightMotion', true);
          });
          it("[normal: at-last-char] moves the cursor to the next line", function() {
            set({
              cursor: [0, 6]
            });
            return ensure('l', {
              cursor: [1, 0],
              mode: "normal"
            });
          });
          it("[normal: at-blank-row] wrap to next line", function() {
            set({
              cursor: [3, 0]
            });
            return ensure('l', {
              cursor: [4, 0],
              mode: "normal"
            });
          });
          it("[visual: at-last-char] select newline then move to next-line", function() {
            set({
              cursor: [0, 6]
            });
            ensure("v", {
              selectedText: "a",
              mode: ['visual', 'characterwise'],
              cursor: [0, 7]
            });
            expect(editor.getLastCursor().isAtEndOfLine()).toBe(true);
            ensure("l", {
              selectedText: "a\n",
              mode: ['visual', 'characterwise'],
              cursor: [1, 0]
            });
            return ensure("l", {
              selectedText: "a\n1",
              mode: ['visual', 'characterwise'],
              cursor: [1, 1]
            });
          });
          return it("[visual: at-blank-row] move to next-line", function() {
            set({
              cursor: [3, 0]
            });
            ensure("v", {
              selectedText: "\n",
              mode: ['visual', 'characterwise'],
              cursor: [4, 0]
            });
            return ensure("l", {
              selectedText: "\n4",
              mode: ['visual', 'characterwise'],
              cursor: [4, 1]
            });
          });
        });
      });
      return describe("move-(up/down)-to-edge", function() {
        text = null;
        beforeEach(function() {
          text = new TextData("0:  4 67  01234567890123456789\n1:         1234567890123456789\n2:    6 890         0123456789\n3:    6 890         0123456789\n4:   56 890         0123456789\n5:                  0123456789\n6:                  0123456789\n7:  4 67            0123456789\n");
          return set({
            text: text.getRaw(),
            cursor: [4, 3]
          });
        });
        describe("edgeness of first-line and last-line", function() {
          beforeEach(function() {
            return set({
              text_: "____this is line 0\n____this is text of line 1\n____this is text of line 2\n______hello line 3\n______hello line 4",
              cursor: [2, 2]
            });
          });
          describe("when column is leading spaces", function() {
            it("move cursor if it's stoppable", function() {
              ensure('[', {
                cursor: [0, 2]
              });
              return ensure(']', {
                cursor: [4, 2]
              });
            });
            return it("doesn't move cursor if it's NOT stoppable", function() {
              set({
                text_: "__\n____this is text of line 1\n____this is text of line 2\n______hello line 3\n______hello line 4\n__",
                cursor: [2, 2]
              });
              ensure('[', {
                cursor: [2, 2]
              });
              return ensure(']', {
                cursor: [2, 2]
              });
            });
          });
          return describe("when column is trailing spaces", function() {
            return it("doesn't move cursor", function() {
              set({
                cursor: [1, 20]
              });
              ensure(']', {
                cursor: [2, 20]
              });
              ensure(']', {
                cursor: [2, 20]
              });
              ensure('[', {
                cursor: [1, 20]
              });
              return ensure('[', {
                cursor: [1, 20]
              });
            });
          });
        });
        it("move to non-blank-char on both first and last row", function() {
          set({
            cursor: [4, 4]
          });
          ensure('[', {
            cursor: [0, 4]
          });
          return ensure(']', {
            cursor: [7, 4]
          });
        });
        it("move to white space char when both side column is non-blank char", function() {
          set({
            cursor: [4, 5]
          });
          ensure('[', {
            cursor: [0, 5]
          });
          ensure(']', {
            cursor: [4, 5]
          });
          return ensure(']', {
            cursor: [7, 5]
          });
        });
        it("only stops on row one of [first row, last row, up-or-down-row is blank] case-1", function() {
          set({
            cursor: [4, 6]
          });
          ensure('[', {
            cursor: [2, 6]
          });
          ensure('[', {
            cursor: [0, 6]
          });
          ensure(']', {
            cursor: [2, 6]
          });
          ensure(']', {
            cursor: [4, 6]
          });
          return ensure(']', {
            cursor: [7, 6]
          });
        });
        it("only stops on row one of [first row, last row, up-or-down-row is blank] case-2", function() {
          set({
            cursor: [4, 7]
          });
          ensure('[', {
            cursor: [2, 7]
          });
          ensure('[', {
            cursor: [0, 7]
          });
          ensure(']', {
            cursor: [2, 7]
          });
          ensure(']', {
            cursor: [4, 7]
          });
          return ensure(']', {
            cursor: [7, 7]
          });
        });
        it("support count", function() {
          set({
            cursor: [4, 6]
          });
          ensure('2 [', {
            cursor: [0, 6]
          });
          return ensure('3 ]', {
            cursor: [7, 6]
          });
        });
        return describe('editor for hardTab', function() {
          var pack;
          pack = 'language-go';
          beforeEach(function() {
            waitsForPromise(function() {
              return atom.packages.activatePackage(pack);
            });
            getVimState('sample.go', function(state, vimEditor) {
              editor = state.editor, editorElement = state.editorElement;
              return set = vimEditor.set, ensure = vimEditor.ensure, vimEditor;
            });
            return runs(function() {
              set({
                cursorScreen: [8, 2]
              });
              return ensure(null, {
                cursor: [8, 1]
              });
            });
          });
          afterEach(function() {
            return atom.packages.deactivatePackage(pack);
          });
          return it("move up/down to next edge of same *screen* column", function() {
            ensure('[', {
              cursorScreen: [5, 2]
            });
            ensure('[', {
              cursorScreen: [3, 2]
            });
            ensure('[', {
              cursorScreen: [2, 2]
            });
            ensure('[', {
              cursorScreen: [0, 2]
            });
            ensure(']', {
              cursorScreen: [2, 2]
            });
            ensure(']', {
              cursorScreen: [3, 2]
            });
            ensure(']', {
              cursorScreen: [5, 2]
            });
            ensure(']', {
              cursorScreen: [9, 2]
            });
            ensure(']', {
              cursorScreen: [11, 2]
            });
            ensure(']', {
              cursorScreen: [14, 2]
            });
            ensure(']', {
              cursorScreen: [17, 2]
            });
            ensure('[', {
              cursorScreen: [14, 2]
            });
            ensure('[', {
              cursorScreen: [11, 2]
            });
            ensure('[', {
              cursorScreen: [9, 2]
            });
            ensure('[', {
              cursorScreen: [5, 2]
            });
            ensure('[', {
              cursorScreen: [3, 2]
            });
            ensure('[', {
              cursorScreen: [2, 2]
            });
            return ensure('[', {
              cursorScreen: [0, 2]
            });
          });
        });
      });
    });
    describe('moveSuccessOnLinewise behaviral characteristic', function() {
      var originalText;
      originalText = null;
      beforeEach(function() {
        settings.set('useClipboardAsDefaultRegister', false);
        set({
          text: "000\n111\n222\n"
        });
        originalText = editor.getText();
        return ensure(null, {
          register: {
            '"': {
              text: void 0
            }
          }
        });
      });
      describe("moveSuccessOnLinewise=false motion", function() {
        describe("when it can move", function() {
          beforeEach(function() {
            return set({
              cursor: [1, 0]
            });
          });
          it("delete by j", function() {
            return ensure("d j", {
              text: "000\n",
              mode: 'normal'
            });
          });
          it("yank by j", function() {
            return ensure("y j", {
              text: originalText,
              register: {
                '"': {
                  text: "111\n222\n"
                }
              },
              mode: 'normal'
            });
          });
          it("change by j", function() {
            return ensure("c j", {
              textC: "000\n|\n",
              register: {
                '"': {
                  text: "111\n222\n"
                }
              },
              mode: 'insert'
            });
          });
          it("delete by k", function() {
            return ensure("d k", {
              text: "222\n",
              mode: 'normal'
            });
          });
          it("yank by k", function() {
            return ensure("y k", {
              text: originalText,
              register: {
                '"': {
                  text: "000\n111\n"
                }
              },
              mode: 'normal'
            });
          });
          return it("change by k", function() {
            return ensure("c k", {
              textC: "|\n222\n",
              register: {
                '"': {
                  text: "000\n111\n"
                }
              },
              mode: 'insert'
            });
          });
        });
        describe("when it can not move-up", function() {
          beforeEach(function() {
            return set({
              cursor: [0, 0]
            });
          });
          it("delete by dk", function() {
            return ensure("d k", {
              text: originalText,
              mode: 'normal'
            });
          });
          it("yank by yk", function() {
            return ensure("y k", {
              text: originalText,
              register: {
                '"': {
                  text: void 0
                }
              },
              mode: 'normal'
            });
          });
          return it("change by ck", function() {
            return ensure("c k", {
              textC: "|000\n111\n222\n",
              register: {
                '"': {
                  text: void 0
                }
              },
              mode: 'normal'
            });
          });
        });
        return describe("when it can not move-down", function() {
          beforeEach(function() {
            return set({
              cursor: [2, 0]
            });
          });
          it("delete by dj", function() {
            return ensure("d j", {
              text: originalText,
              mode: 'normal'
            });
          });
          it("yank by yj", function() {
            return ensure("y j", {
              text: originalText,
              register: {
                '"': {
                  text: void 0
                }
              },
              mode: 'normal'
            });
          });
          return it("change by cj", function() {
            return ensure("c j", {
              textC: "000\n111\n|222\n",
              register: {
                '"': {
                  text: void 0
                }
              },
              mode: 'normal'
            });
          });
        });
      });
      return describe("moveSuccessOnLinewise=true motion", function() {
        describe("when it can move", function() {
          beforeEach(function() {
            return set({
              cursor: [1, 0]
            });
          });
          it("delete by G", function() {
            return ensure("d G", {
              text: "000\n",
              mode: 'normal'
            });
          });
          it("yank by G", function() {
            return ensure("y G", {
              text: originalText,
              register: {
                '"': {
                  text: "111\n222\n"
                }
              },
              mode: 'normal'
            });
          });
          it("change by G", function() {
            return ensure("c G", {
              textC: "000\n|\n",
              register: {
                '"': {
                  text: "111\n222\n"
                }
              },
              mode: 'insert'
            });
          });
          it("delete by gg", function() {
            return ensure("d g g", {
              text: "222\n",
              mode: 'normal'
            });
          });
          it("yank by gg", function() {
            return ensure("y g g", {
              text: originalText,
              register: {
                '"': {
                  text: "000\n111\n"
                }
              },
              mode: 'normal'
            });
          });
          return it("change by gg", function() {
            return ensure("c g g", {
              textC: "|\n222\n",
              register: {
                '"': {
                  text: "000\n111\n"
                }
              },
              mode: 'insert'
            });
          });
        });
        describe("when it can not move-up", function() {
          beforeEach(function() {
            return set({
              cursor: [0, 0]
            });
          });
          it("delete by gg", function() {
            return ensure("d g g", {
              text: "111\n222\n",
              mode: 'normal'
            });
          });
          it("yank by gg", function() {
            return ensure("y g g", {
              text: originalText,
              register: {
                '"': {
                  text: "000\n"
                }
              },
              mode: 'normal'
            });
          });
          return it("change by gg", function() {
            return ensure("c g g", {
              textC: "|\n111\n222\n",
              register: {
                '"': {
                  text: "000\n"
                }
              },
              mode: 'insert'
            });
          });
        });
        return describe("when it can not move-down", function() {
          beforeEach(function() {
            return set({
              cursor: [2, 0]
            });
          });
          it("delete by G", function() {
            return ensure("d G", {
              text: "000\n111\n",
              mode: 'normal'
            });
          });
          it("yank by G", function() {
            return ensure("y G", {
              text: originalText,
              register: {
                '"': {
                  text: "222\n"
                }
              },
              mode: 'normal'
            });
          });
          return it("change by G", function() {
            return ensure("c G", {
              textC: "000\n111\n|\n",
              register: {
                '"': {
                  text: "222\n"
                }
              },
              mode: 'insert'
            });
          });
        });
      });
    });
    describe("the w keybinding", function() {
      describe("as a motion", function() {
        it("moves the cursor to the beginning of the next word", function() {
          set({
            textC: "|ab cde1+-\n xyz\n\nzip"
          });
          ensure("w", {
            textC: "ab |cde1+-\n xyz\n\nzip"
          });
          ensure("w", {
            textC: "ab cde1|+-\n xyz\n\nzip"
          });
          ensure("w", {
            textC: "ab cde1+-\n |xyz\n\nzip"
          });
          ensure("w", {
            textC: "ab cde1+-\n xyz\n|\nzip"
          });
          ensure("w", {
            textC: "ab cde1+-\n xyz\n\n|zip"
          });
          ensure("w", {
            textC: "ab cde1+-\n xyz\n\nzi|p"
          });
          return ensure("w", {
            textC: "ab cde1+-\n xyz\n\nzi|p"
          });
        });
        it("[CRLF] moves the cursor to the beginning of the next word", function() {
          set({
            textC: "|ab cde1+-\r\n xyz\r\n\r\nzip"
          });
          ensure("w", {
            textC: "ab |cde1+-\r\n xyz\r\n\r\nzip"
          });
          ensure("w", {
            textC: "ab cde1|+-\r\n xyz\r\n\r\nzip"
          });
          ensure("w", {
            textC: "ab cde1+-\r\n |xyz\r\n\r\nzip"
          });
          ensure("w", {
            textC: "ab cde1+-\r\n xyz\r\n|\r\nzip"
          });
          ensure("w", {
            textC: "ab cde1+-\r\n xyz\r\n\r\n|zip"
          });
          ensure("w", {
            textC: "ab cde1+-\r\n xyz\r\n\r\nzi|p"
          });
          return ensure("w", {
            textC: "ab cde1+-\r\n xyz\r\n\r\nzi|p"
          });
        });
        it("move to next word by skipping trailing white spaces", function() {
          set({
            textC: "012|   \n  234"
          });
          return ensure("w", {
            textC: "012   \n  |234"
          });
        });
        return it("move to next word from EOL", function() {
          set({
            textC: "|\n  234"
          });
          return ensure("w", {
            textC: "\n  |234"
          });
        });
      });
      describe("used as change TARGET", function() {
        it("[at-word] not eat whitespace", function() {
          set({
            textC: "v|ar1 = 1"
          });
          return ensure('c w', {
            textC: "v = 1"
          });
        });
        it("[at white-space] only eat white space", function() {
          set({
            textC: "|  var1 = 1"
          });
          return ensure('c w', {
            textC: "var1 = 1"
          });
        });
        it("[at trailing whitespace] doesnt eat new line character", function() {
          set({
            textC: "abc|  \ndef"
          });
          return ensure('c w', {
            textC: "abc|\ndef"
          });
        });
        return it("[at trailing whitespace] eat new line when count is specified", function() {
          set({
            textC: "|\n\n\n\n\nline6\n"
          });
          return ensure('5 c w', {
            textC: "|\nline6\n"
          });
        });
      });
      return describe("as a selection", function() {
        it("[within-word] selects to the end of the word", function() {
          set({
            textC: "|ab cd"
          });
          return ensure('y w', {
            register: {
              '"': {
                text: 'ab '
              }
            }
          });
        });
        return it("[between-word] selects the whitespace", function() {
          set({
            textC: "ab| cd"
          });
          return ensure('y w', {
            register: {
              '"': {
                text: ' '
              }
            }
          });
        });
      });
    });
    describe("the W keybinding", function() {
      describe("as a motion", function() {
        it("moves the cursor to the beginning of the next word", function() {
          set({
            textC: "|cde1+- ab \n xyz\n\nzip"
          });
          ensure("W", {
            textC: "cde1+- |ab \n xyz\n\nzip"
          });
          ensure("W", {
            textC: "cde1+- ab \n |xyz\n\nzip"
          });
          ensure("W", {
            textC: "cde1+- ab \n xyz\n|\nzip"
          });
          ensure("W", {
            textC: "cde1+- ab \n xyz\n\n|zip"
          });
          ensure("W", {
            textC: "cde1+- ab \n xyz\n\nzi|p"
          });
          return ensure("W", {
            textC: "cde1+- ab \n xyz\n\nzi|p"
          });
        });
        it("[at-trailing-WS] moves the cursor to beginning of the next word at next line", function() {
          set({
            textC: "012|   \n  234"
          });
          return ensure('W', {
            textC: "012   \n  |234"
          });
        });
        return it("moves the cursor to beginning of the next word of next line when cursor is at EOL.", function() {
          set({
            textC: "|\n  234"
          });
          return ensure('W', {
            textC: "\n  |234"
          });
        });
      });
      describe("used as change TARGET", function() {
        it("[at-word] not eat whitespace", function() {
          set({
            textC: "v|ar1 = 1"
          });
          return ensure('c W', {
            textC: "v| = 1"
          });
        });
        it("[at-WS] only eat white space", function() {
          set({
            textC: "|  var1 = 1"
          });
          return ensure('c W', {
            textC: "var1 = 1"
          });
        });
        it("[at-trailing-WS] doesn't eat new line character", function() {
          set({
            textC: "abc|  \ndef\n"
          });
          return ensure('c W', {
            textC: "abc|\ndef\n"
          });
        });
        return xit("can eat new line when count is specified", function() {
          set({
            textC: "|\n\n\n\n\nline6\n"
          });
          return ensure('5 c W', {
            textC: "|\nline6\n"
          });
        });
      });
      return describe("as a TARGET", function() {
        it("[at-word] yank", function() {
          set({
            textC: "|cde1+- ab"
          });
          return ensure('y W', {
            register: {
              '"': {
                text: 'cde1+- '
              }
            }
          });
        });
        it("delete new line", function() {
          set({
            textC: "cde1+- ab \n xyz\n|\nzip"
          });
          return ensure('d W', {
            textC: "cde1+- ab \n xyz\n|zip",
            register: {
              '"': {
                text: "\n"
              }
            }
          });
        });
        return it("delete last word in buffer and adjut cursor row to not past vimLastRow", function() {
          set({
            textC: "cde1+- ab \n xyz\n\n|zip"
          });
          return ensure('d W', {
            textC: "cde1+- ab \n xyz\n|\n",
            register: {
              '"': {
                text: "zip"
              }
            }
          });
        });
      });
    });
    describe("the e keybinding", function() {
      describe("as a motion", function() {
        it("moves the cursor to the end of the current word", function() {
          set({
            textC_: "|ab cde1+-_\n_xyz\n\nzip"
          });
          ensure('e', {
            textC_: "a|b cde1+-_\n_xyz\n\nzip"
          });
          ensure('e', {
            textC_: "ab cde|1+-_\n_xyz\n\nzip"
          });
          ensure('e', {
            textC_: "ab cde1+|-_\n_xyz\n\nzip"
          });
          ensure('e', {
            textC_: "ab cde1+-_\n_xy|z\n\nzip"
          });
          return ensure('e', {
            textC_: "ab cde1+-_\n_xyz\n\nzi|p"
          });
        });
        return it("skips whitespace until EOF", function() {
          set({
            textC: "|012\n\n\n012\n\n"
          });
          ensure('e', {
            textC: "01|2\n\n\n012\n\n"
          });
          ensure('e', {
            textC: "012\n\n\n01|2\n\n"
          });
          return ensure('e', {
            textC: "012\n\n\n012\n|\n"
          });
        });
      });
      return describe("as selection", function() {
        it("[in-word] selects to the end of the current word", function() {
          set({
            textC_: "|ab cde1+-_"
          });
          return ensure('y e', {
            register: {
              '"': {
                text: 'ab'
              }
            }
          });
        });
        return it("[between-word] selects to the end of the next word", function() {
          set({
            textC_: "ab| cde1+-_"
          });
          return ensure('y e', {
            register: {
              '"': {
                text: ' cde1'
              }
            }
          });
        });
      });
    });
    describe("the E keybinding", function() {
      beforeEach(function() {
        return set({
          text_: "ab  cde1+-_\n_xyz_\n\nzip\n"
        });
      });
      describe("as a motion", function() {
        beforeEach(function() {
          return set({
            cursor: [0, 0]
          });
        });
        return it("moves the cursor to the end of the current word", function() {
          ensure('E', {
            cursor: [0, 1]
          });
          ensure('E', {
            cursor: [0, 9]
          });
          ensure('E', {
            cursor: [1, 3]
          });
          ensure('E', {
            cursor: [3, 2]
          });
          return ensure('E', {
            cursor: [3, 2]
          });
        });
      });
      return describe("as selection", function() {
        describe("within a word", function() {
          return it("selects to the end of the current word", function() {
            set({
              cursor: [0, 0]
            });
            return ensure('y E', {
              register: {
                '"': {
                  text: 'ab'
                }
              }
            });
          });
        });
        describe("between words", function() {
          return it("selects to the end of the next word", function() {
            set({
              cursor: [0, 2]
            });
            return ensure('y E', {
              register: {
                '"': {
                  text: '  cde1+-'
                }
              }
            });
          });
        });
        return describe("press more than once", function() {
          return it("selects to the end of the current word", function() {
            set({
              cursor: [0, 0]
            });
            return ensure('v E E y', {
              register: {
                '"': {
                  text: 'ab  cde1+-'
                }
              }
            });
          });
        });
      });
    });
    describe("the ge keybinding", function() {
      describe("as a motion", function() {
        it("moves the cursor to the end of the previous word", function() {
          set({
            textC: "1234 5678 wordwo|rd"
          });
          ensure("g e", {
            textC: "1234 567|8 wordword"
          });
          ensure("g e", {
            textC: "123|4 5678 wordword"
          });
          ensure("g e", {
            textC: "|1234 5678 wordword"
          });
          return ensure("g e", {
            textC: "|1234 5678 wordword"
          });
        });
        it("moves corrently when starting between words", function() {
          set({
            textC: "1 leading   |  end"
          });
          return ensure('g e', {
            textC: "1 leadin|g     end"
          });
        });
        it("takes a count", function() {
          set({
            textC: "vim mode plus is getting the|re"
          });
          return ensure('5 g e', {
            textC: "vi|m mode plus is getting there"
          });
        });
        it("handles non-words inside words like vim", function() {
          set({
            textC: "1234 5678 word-wor|d"
          });
          ensure('g e', {
            textC: "1234 5678 word|-word"
          });
          ensure('g e', {
            textC: "1234 5678 wor|d-word"
          });
          return ensure('g e', {
            textC: "1234 567|8 word-word"
          });
        });
        return xit("handles newlines like vim", function() {
          set({
            textC: "1234\n\n\n\n56|78"
          });
          ensure("g e", {
            textC: "1234\n\n\n|\n5678"
          });
          ensure("g e", {
            textC: "1234\n\n|\n\n5678"
          });
          ensure("g e", {
            textC: "1234\n|\n\n\n5678"
          });
          ensure("g e", {
            textC: "123|4\n\n\n\n5678"
          });
          return ensure("g e", {
            textC: "|1234\n\n\n\n5678"
          });
        });
      });
      describe("when used by Change operator", function() {
        it("changes word fragments", function() {
          set({
            text: "cet document",
            cursor: [0, 7]
          });
          return ensure('c g e', {
            cursor: [0, 2],
            text: "cement",
            mode: 'insert'
          });
        });
        return it("changes whitespace properly", function() {
          set({
            text: "ce    doc",
            cursor: [0, 4]
          });
          return ensure('c g e', {
            cursor: [0, 1],
            text: "c doc",
            mode: 'insert'
          });
        });
      });
      return describe("in characterwise visual mode", function() {
        return it("selects word fragments", function() {
          set({
            text: "cet document",
            cursor: [0, 7]
          });
          return ensure('v g e', {
            cursor: [0, 2],
            selectedText: "t docu"
          });
        });
      });
    });
    describe("the gE keybinding", function() {
      return describe("as a motion", function() {
        return it("moves the cursor to the end of the previous word", function() {
          set({
            textC: "12.4 5~7- word-w|ord"
          });
          ensure('g E', {
            textC: "12.4 5~7|- word-word"
          });
          ensure('g E', {
            textC: "12.|4 5~7- word-word"
          });
          ensure('g E', {
            textC: "|12.4 5~7- word-word"
          });
          return ensure('g E', {
            textC: "|12.4 5~7- word-word"
          });
        });
      });
    });
    describe("the (,) sentence keybinding", function() {
      describe("as a motion", function() {
        beforeEach(function() {
          return set({
            cursor: [0, 0],
            text: "sentence one.])'\"    sen.tence .two.\nhere.  sentence three\nmore three\n\n   sentence four\n\n\nsentence five.\nmore five\nmore six\n\n last sentence\nall done seven"
          });
        });
        it("moves the cursor to the end of the sentence", function() {
          ensure(')', {
            cursor: [0, 21]
          });
          ensure(')', {
            cursor: [1, 0]
          });
          ensure(')', {
            cursor: [1, 7]
          });
          ensure(')', {
            cursor: [3, 0]
          });
          ensure(')', {
            cursor: [4, 3]
          });
          ensure(')', {
            cursor: [5, 0]
          });
          ensure(')', {
            cursor: [7, 0]
          });
          ensure(')', {
            cursor: [8, 0]
          });
          ensure(')', {
            cursor: [10, 0]
          });
          ensure(')', {
            cursor: [11, 1]
          });
          ensure(')', {
            cursor: [12, 13]
          });
          ensure(')', {
            cursor: [12, 13]
          });
          ensure('(', {
            cursor: [11, 1]
          });
          ensure('(', {
            cursor: [10, 0]
          });
          ensure('(', {
            cursor: [8, 0]
          });
          ensure('(', {
            cursor: [7, 0]
          });
          ensure('(', {
            cursor: [6, 0]
          });
          ensure('(', {
            cursor: [4, 3]
          });
          ensure('(', {
            cursor: [3, 0]
          });
          ensure('(', {
            cursor: [1, 7]
          });
          ensure('(', {
            cursor: [1, 0]
          });
          ensure('(', {
            cursor: [0, 21]
          });
          ensure('(', {
            cursor: [0, 0]
          });
          return ensure('(', {
            cursor: [0, 0]
          });
        });
        it("skips to beginning of sentence", function() {
          set({
            cursor: [4, 15]
          });
          return ensure('(', {
            cursor: [4, 3]
          });
        });
        it("supports a count", function() {
          set({
            cursor: [0, 0]
          });
          ensure('3 )', {
            cursor: [1, 7]
          });
          return ensure('3 (', {
            cursor: [0, 0]
          });
        });
        it("can move start of buffer or end of buffer at maximum", function() {
          set({
            cursor: [0, 0]
          });
          ensure('2 0 )', {
            cursor: [12, 13]
          });
          return ensure('2 0 (', {
            cursor: [0, 0]
          });
        });
        return describe("sentence motion with skip-blank-row", function() {
          beforeEach(function() {
            return atom.keymaps.add("test", {
              'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
                'g )': 'vim-mode-plus:move-to-next-sentence-skip-blank-row',
                'g (': 'vim-mode-plus:move-to-previous-sentence-skip-blank-row'
              }
            });
          });
          return it("moves the cursor to the end of the sentence", function() {
            ensure('g )', {
              cursor: [0, 21]
            });
            ensure('g )', {
              cursor: [1, 0]
            });
            ensure('g )', {
              cursor: [1, 7]
            });
            ensure('g )', {
              cursor: [4, 3]
            });
            ensure('g )', {
              cursor: [7, 0]
            });
            ensure('g )', {
              cursor: [8, 0]
            });
            ensure('g )', {
              cursor: [11, 1]
            });
            ensure('g )', {
              cursor: [12, 13]
            });
            ensure('g )', {
              cursor: [12, 13]
            });
            ensure('g (', {
              cursor: [11, 1]
            });
            ensure('g (', {
              cursor: [8, 0]
            });
            ensure('g (', {
              cursor: [7, 0]
            });
            ensure('g (', {
              cursor: [4, 3]
            });
            ensure('g (', {
              cursor: [1, 7]
            });
            ensure('g (', {
              cursor: [1, 0]
            });
            ensure('g (', {
              cursor: [0, 21]
            });
            ensure('g (', {
              cursor: [0, 0]
            });
            return ensure('g (', {
              cursor: [0, 0]
            });
          });
        });
      });
      describe("moving inside a blank document", function() {
        beforeEach(function() {
          return set({
            text_: "_____\n_____"
          });
        });
        return it("moves without crashing", function() {
          set({
            cursor: [0, 0]
          });
          ensure(')', {
            cursor: [1, 4]
          });
          ensure(')', {
            cursor: [1, 4]
          });
          ensure('(', {
            cursor: [0, 0]
          });
          return ensure('(', {
            cursor: [0, 0]
          });
        });
      });
      return describe("as a selection", function() {
        beforeEach(function() {
          return set({
            text: "sentence one. sentence two.\n  sentence three."
          });
        });
        it('selects to the end of the current sentence', function() {
          set({
            cursor: [0, 20]
          });
          return ensure('y )', {
            register: {
              '"': {
                text: "ce two.\n  "
              }
            }
          });
        });
        return it('selects to the beginning of the current sentence', function() {
          set({
            cursor: [0, 20]
          });
          return ensure('y (', {
            register: {
              '"': {
                text: "senten"
              }
            }
          });
        });
      });
    });
    describe("the {,} keybinding", function() {
      beforeEach(function() {
        return set({
          text: "\n\n\n3: paragraph-1\n4: paragraph-1\n\n\n\n8: paragraph-2\n\n\n\n12: paragraph-3\n13: paragraph-3\n\n\n16: paragprah-4\n",
          cursor: [0, 0]
        });
      });
      describe("as a motion", function() {
        it("moves the cursor to the end of the paragraph", function() {
          set({
            cursor: [0, 0]
          });
          ensure('}', {
            cursor: [5, 0]
          });
          ensure('}', {
            cursor: [9, 0]
          });
          ensure('}', {
            cursor: [14, 0]
          });
          ensure('{', {
            cursor: [11, 0]
          });
          ensure('{', {
            cursor: [7, 0]
          });
          return ensure('{', {
            cursor: [2, 0]
          });
        });
        it("support count", function() {
          set({
            cursor: [0, 0]
          });
          ensure('3 }', {
            cursor: [14, 0]
          });
          return ensure('3 {', {
            cursor: [2, 0]
          });
        });
        return it("can move start of buffer or end of buffer at maximum", function() {
          set({
            cursor: [0, 0]
          });
          ensure('1 0 }', {
            cursor: [16, 14]
          });
          return ensure('1 0 {', {
            cursor: [0, 0]
          });
        });
      });
      return describe("as a selection", function() {
        it('selects to the end of the current paragraph', function() {
          set({
            cursor: [3, 3]
          });
          return ensure('y }', {
            register: {
              '"': {
                text: "paragraph-1\n4: paragraph-1\n"
              }
            }
          });
        });
        return it('selects to the end of the current paragraph', function() {
          set({
            cursor: [4, 3]
          });
          return ensure('y {', {
            register: {
              '"': {
                text: "\n3: paragraph-1\n4: "
              }
            }
          });
        });
      });
    });
    describe("MoveToNextDiffHunk, MoveToPreviousDiffHunk", function() {
      beforeEach(function() {
        set({
          text: "--- file        2017-12-24 15:11:33.000000000 +0900\n+++ file-new    2017-12-24 15:15:09.000000000 +0900\n@@ -1,9 +1,9 @@\n line 0\n+line 0-1\n line 1\n-line 2\n+line 1-1\n line 3\n-line 4\n line 5\n-line 6\n-line 7\n+line 7-1\n+line 7-2\n line 8\n",
          cursor: [0, 0]
        });
        return runs(function() {
          return atom.keymaps.add("test", {
            'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
              ']': 'vim-mode-plus:move-to-next-diff-hunk',
              '[': 'vim-mode-plus:move-to-previous-diff-hunk'
            }
          });
        });
      });
      return it("move to next and previous hunk", function() {
        ensure(']', {
          cursor: [1, 0]
        });
        ensure(']', {
          cursor: [4, 0]
        });
        ensure(']', {
          cursor: [6, 0]
        });
        ensure(']', {
          cursor: [7, 0]
        });
        ensure(']', {
          cursor: [9, 0]
        });
        ensure(']', {
          cursor: [11, 0]
        });
        ensure(']', {
          cursor: [13, 0]
        });
        ensure(']', {
          cursor: [13, 0]
        });
        ensure('[', {
          cursor: [11, 0]
        });
        ensure('[', {
          cursor: [9, 0]
        });
        ensure('[', {
          cursor: [7, 0]
        });
        ensure('[', {
          cursor: [6, 0]
        });
        ensure('[', {
          cursor: [4, 0]
        });
        ensure('[', {
          cursor: [1, 0]
        });
        ensure('[', {
          cursor: [0, 0]
        });
        return ensure('[', {
          cursor: [0, 0]
        });
      });
    });
    describe("the b keybinding", function() {
      beforeEach(function() {
        return set({
          textC_: "_ab cde1+-_\n_xyz\n\nzip }\n_|last"
        });
      });
      describe("as a motion", function() {
        return it("moves the cursor to the beginning of the previous word", function() {
          ensure('b', {
            textC: " ab cde1+- \n xyz\n\nzip |}\n last"
          });
          ensure('b', {
            textC: " ab cde1+- \n xyz\n\n|zip }\n last"
          });
          ensure('b', {
            textC: " ab cde1+- \n xyz\n|\nzip }\n last"
          });
          ensure('b', {
            textC: " ab cde1+- \n |xyz\n\nzip }\n last"
          });
          ensure('b', {
            textC: " ab cde1|+- \n xyz\n\nzip }\n last"
          });
          ensure('b', {
            textC: " ab |cde1+- \n xyz\n\nzip }\n last"
          });
          ensure('b', {
            textC: " |ab cde1+- \n xyz\n\nzip }\n last"
          });
          ensure('b', {
            textC: "| ab cde1+- \n xyz\n\nzip }\n last"
          });
          return ensure('b', {
            textC: "| ab cde1+- \n xyz\n\nzip }\n last"
          });
        });
      });
      return describe("as a selection", function() {
        describe("within a word", function() {
          return it("selects to the beginning of the current word", function() {
            set({
              textC: " a|b cd"
            });
            return ensure('y b', {
              textC: " |ab cd",
              register: {
                '"': {
                  text: 'a'
                }
              }
            });
          });
        });
        return describe("between words", function() {
          return it("selects to the beginning of the last word", function() {
            set({
              textC: " ab |cd"
            });
            return ensure('y b', {
              textC: " |ab cd",
              register: {
                '"': {
                  text: 'ab '
                }
              }
            });
          });
        });
      });
    });
    describe("the B keybinding", function() {
      beforeEach(function() {
        return set({
          text: "cde1+- ab\n\t xyz-123\n\n zip\n"
        });
      });
      describe("as a motion", function() {
        beforeEach(function() {
          return set({
            cursor: [4, 0]
          });
        });
        return it("moves the cursor to the beginning of the previous word", function() {
          ensure('B', {
            cursor: [3, 1]
          });
          ensure('B', {
            cursor: [2, 0]
          });
          ensure('B', {
            cursor: [1, 2]
          });
          ensure('B', {
            cursor: [0, 7]
          });
          return ensure('B', {
            cursor: [0, 0]
          });
        });
      });
      return describe("as a selection", function() {
        it("selects to the beginning of the whole word", function() {
          set({
            cursor: [1, 8]
          });
          return ensure('y B', {
            register: {
              '"': {
                text: 'xyz-12'
              }
            }
          });
        });
        return it("doesn't go past the beginning of the file", function() {
          set({
            cursor: [0, 0],
            register: {
              '"': {
                text: 'abc'
              }
            }
          });
          return ensure('y B', {
            register: {
              '"': {
                text: 'abc'
              }
            }
          });
        });
      });
    });
    describe("the ^ keybinding", function() {
      beforeEach(function() {
        return set({
          textC: "|  abcde"
        });
      });
      describe("from the beginning of the line", function() {
        describe("as a motion", function() {
          return it("moves the cursor to the first character of the line", function() {
            return ensure('^', {
              cursor: [0, 2]
            });
          });
        });
        return describe("as a selection", function() {
          it('selects to the first character of the line', function() {
            return ensure('d ^', {
              text: 'abcde',
              cursor: [0, 0]
            });
          });
          return it('selects to the first character of the line', function() {
            return ensure('d I', {
              text: 'abcde',
              cursor: [0, 0]
            });
          });
        });
      });
      describe("from the first character of the line", function() {
        beforeEach(function() {
          return set({
            cursor: [0, 2]
          });
        });
        describe("as a motion", function() {
          return it("stays put", function() {
            return ensure('^', {
              cursor: [0, 2]
            });
          });
        });
        return describe("as a selection", function() {
          return it("does nothing", function() {
            return ensure('d ^', {
              text: '  abcde',
              cursor: [0, 2]
            });
          });
        });
      });
      return describe("from the middle of a word", function() {
        beforeEach(function() {
          return set({
            cursor: [0, 4]
          });
        });
        describe("as a motion", function() {
          return it("moves the cursor to the first character of the line", function() {
            return ensure('^', {
              cursor: [0, 2]
            });
          });
        });
        return describe("as a selection", function() {
          it('selects to the first character of the line', function() {
            return ensure('d ^', {
              text: '  cde',
              cursor: [0, 2]
            });
          });
          return it('selects to the first character of the line', function() {
            return ensure('d I', {
              text: '  cde',
              cursor: [0, 2]
            });
          });
        });
      });
    });
    describe("the 0 keybinding", function() {
      beforeEach(function() {
        return set({
          textC: "  ab|cde"
        });
      });
      describe("as a motion", function() {
        return it("moves the cursor to the first column", function() {
          return ensure('0', {
            cursor: [0, 0]
          });
        });
      });
      return describe("as a selection", function() {
        return it('selects to the first column of the line', function() {
          return ensure('d 0', {
            text: 'cde',
            cursor: [0, 0]
          });
        });
      });
    });
    describe("g 0, g ^ and g $", function() {
      var enableSoftWrapAndEnsure;
      enableSoftWrapAndEnsure = function() {
        editor.setSoftWrapped(true);
        expect(editor.lineTextForScreenRow(0)).toBe(" 1234567");
        expect(editor.lineTextForScreenRow(1)).toBe(" 89B1234");
        expect(editor.lineTextForScreenRow(2)).toBe(" 56789C1");
        expect(editor.lineTextForScreenRow(3)).toBe(" 2345678");
        return expect(editor.lineTextForScreenRow(4)).toBe(" 9");
      };
      beforeEach(function() {
        var scrollbarStyle;
        scrollbarStyle = document.createElement('style');
        scrollbarStyle.textContent = '::-webkit-scrollbar { -webkit-appearance: none }';
        jasmine.attachToDOM(scrollbarStyle);
        set({
          text_: "_123456789B123456789C123456789"
        });
        jasmine.attachToDOM(getView(atom.workspace));
        return waitsForPromise(function() {
          return setEditorWidthInCharacters(editor, 10);
        });
      });
      describe("the g 0 keybinding", function() {
        describe("allowMoveToOffScreenColumnOnScreenLineMotion = true(default)", function() {
          beforeEach(function() {
            return settings.set('allowMoveToOffScreenColumnOnScreenLineMotion', true);
          });
          describe("softwrap = false, firstColumnIsVisible = true", function() {
            beforeEach(function() {
              return set({
                cursor: [0, 3]
              });
            });
            return it("move to column 0 of screen line", function() {
              return ensure("g 0", {
                cursor: [0, 0]
              });
            });
          });
          describe("softwrap = false, firstColumnIsVisible = false", function() {
            beforeEach(function() {
              set({
                cursor: [0, 15]
              });
              return editor.setFirstVisibleScreenColumn(10);
            });
            return it("move to column 0 of screen line", function() {
              return ensure("g 0", {
                cursor: [0, 0]
              });
            });
          });
          return describe("softwrap = true", function() {
            beforeEach(function() {
              return enableSoftWrapAndEnsure();
            });
            return it("move to column 0 of screen line", function() {
              set({
                cursorScreen: [0, 3]
              });
              ensure("g 0", {
                cursorScreen: [0, 0]
              });
              set({
                cursorScreen: [1, 3]
              });
              return ensure("g 0", {
                cursorScreen: [1, 1]
              });
            });
          });
        });
        return describe("allowMoveToOffScreenColumnOnScreenLineMotion = false", function() {
          beforeEach(function() {
            return settings.set('allowMoveToOffScreenColumnOnScreenLineMotion', false);
          });
          describe("softwrap = false, firstColumnIsVisible = true", function() {
            beforeEach(function() {
              return set({
                cursor: [0, 3]
              });
            });
            return it("move to column 0 of screen line", function() {
              return ensure("g 0", {
                cursor: [0, 0]
              });
            });
          });
          describe("softwrap = false, firstColumnIsVisible = false", function() {
            beforeEach(function() {
              set({
                cursor: [0, 15]
              });
              return editor.setFirstVisibleScreenColumn(10);
            });
            return it("move to first visible colum of screen line", function() {
              return ensure("g 0", {
                cursor: [0, 10]
              });
            });
          });
          return describe("softwrap = true", function() {
            beforeEach(function() {
              return enableSoftWrapAndEnsure();
            });
            return it("move to column 0 of screen line", function() {
              set({
                cursorScreen: [0, 3]
              });
              ensure("g 0", {
                cursorScreen: [0, 0]
              });
              set({
                cursorScreen: [1, 3]
              });
              return ensure("g 0", {
                cursorScreen: [1, 1]
              });
            });
          });
        });
      });
      describe("the g ^ keybinding", function() {
        describe("allowMoveToOffScreenColumnOnScreenLineMotion = true(default)", function() {
          beforeEach(function() {
            return settings.set('allowMoveToOffScreenColumnOnScreenLineMotion', true);
          });
          describe("softwrap = false, firstColumnIsVisible = true", function() {
            beforeEach(function() {
              return set({
                cursor: [0, 3]
              });
            });
            return it("move to first-char of screen line", function() {
              return ensure("g ^", {
                cursor: [0, 1]
              });
            });
          });
          describe("softwrap = false, firstColumnIsVisible = false", function() {
            beforeEach(function() {
              set({
                cursor: [0, 15]
              });
              return editor.setFirstVisibleScreenColumn(10);
            });
            return it("move to first-char of screen line", function() {
              return ensure("g ^", {
                cursor: [0, 1]
              });
            });
          });
          return describe("softwrap = true", function() {
            beforeEach(function() {
              return enableSoftWrapAndEnsure();
            });
            return it("move to first-char of screen line", function() {
              set({
                cursorScreen: [0, 3]
              });
              ensure("g ^", {
                cursorScreen: [0, 1]
              });
              set({
                cursorScreen: [1, 3]
              });
              return ensure("g ^", {
                cursorScreen: [1, 1]
              });
            });
          });
        });
        return describe("allowMoveToOffScreenColumnOnScreenLineMotion = false", function() {
          beforeEach(function() {
            return settings.set('allowMoveToOffScreenColumnOnScreenLineMotion', false);
          });
          describe("softwrap = false, firstColumnIsVisible = true", function() {
            beforeEach(function() {
              return set({
                cursor: [0, 3]
              });
            });
            return it("move to first-char of screen line", function() {
              return ensure("g ^", {
                cursor: [0, 1]
              });
            });
          });
          describe("softwrap = false, firstColumnIsVisible = false", function() {
            beforeEach(function() {
              set({
                cursor: [0, 15]
              });
              return editor.setFirstVisibleScreenColumn(10);
            });
            return it("move to first-char of screen line", function() {
              return ensure("g ^", {
                cursor: [0, 10]
              });
            });
          });
          return describe("softwrap = true", function() {
            beforeEach(function() {
              return enableSoftWrapAndEnsure();
            });
            return it("move to first-char of screen line", function() {
              set({
                cursorScreen: [0, 3]
              });
              ensure("g ^", {
                cursorScreen: [0, 1]
              });
              set({
                cursorScreen: [1, 3]
              });
              return ensure("g ^", {
                cursorScreen: [1, 1]
              });
            });
          });
        });
      });
      return describe("the g $ keybinding", function() {
        describe("allowMoveToOffScreenColumnOnScreenLineMotion = true(default)", function() {
          beforeEach(function() {
            return settings.set('allowMoveToOffScreenColumnOnScreenLineMotion', true);
          });
          describe("softwrap = false, lastColumnIsVisible = true", function() {
            beforeEach(function() {
              return set({
                cursor: [0, 27]
              });
            });
            return it("move to last-char of screen line", function() {
              return ensure("g $", {
                cursor: [0, 29]
              });
            });
          });
          describe("softwrap = false, lastColumnIsVisible = false", function() {
            beforeEach(function() {
              set({
                cursor: [0, 15]
              });
              return editor.setFirstVisibleScreenColumn(10);
            });
            return it("move to last-char of screen line", function() {
              return ensure("g $", {
                cursor: [0, 29]
              });
            });
          });
          return describe("softwrap = true", function() {
            beforeEach(function() {
              return enableSoftWrapAndEnsure();
            });
            return it("move to last-char of screen line", function() {
              set({
                cursorScreen: [0, 3]
              });
              ensure("g $", {
                cursorScreen: [0, 7]
              });
              set({
                cursorScreen: [1, 3]
              });
              return ensure("g $", {
                cursorScreen: [1, 7]
              });
            });
          });
        });
        return describe("allowMoveToOffScreenColumnOnScreenLineMotion = false", function() {
          beforeEach(function() {
            return settings.set('allowMoveToOffScreenColumnOnScreenLineMotion', false);
          });
          describe("softwrap = false, lastColumnIsVisible = true", function() {
            beforeEach(function() {
              return set({
                cursor: [0, 27]
              });
            });
            return it("move to last-char of screen line", function() {
              return ensure("g $", {
                cursor: [0, 29]
              });
            });
          });
          describe("softwrap = false, lastColumnIsVisible = false", function() {
            beforeEach(function() {
              set({
                cursor: [0, 15]
              });
              return editor.setFirstVisibleScreenColumn(10);
            });
            return it("move to last-char in visible screen line", function() {
              return ensure("g $", {
                cursor: [0, 18]
              });
            });
          });
          return describe("softwrap = true", function() {
            beforeEach(function() {
              return enableSoftWrapAndEnsure();
            });
            return it("move to last-char of screen line", function() {
              set({
                cursorScreen: [0, 3]
              });
              ensure("g $", {
                cursorScreen: [0, 7]
              });
              set({
                cursorScreen: [1, 3]
              });
              return ensure("g $", {
                cursorScreen: [1, 7]
              });
            });
          });
        });
      });
    });
    describe("the | keybinding", function() {
      beforeEach(function() {
        return set({
          text: "  abcde",
          cursor: [0, 4]
        });
      });
      describe("as a motion", function() {
        return it("moves the cursor to the number column", function() {
          ensure('|', {
            cursor: [0, 0]
          });
          ensure('1 |', {
            cursor: [0, 0]
          });
          ensure('3 |', {
            cursor: [0, 2]
          });
          return ensure('4 |', {
            cursor: [0, 3]
          });
        });
      });
      return describe("as operator's target", function() {
        return it('behave exclusively', function() {
          set({
            cursor: [0, 0]
          });
          return ensure('d 4 |', {
            text: 'bcde',
            cursor: [0, 0]
          });
        });
      });
    });
    describe("the $ keybinding", function() {
      beforeEach(function() {
        return set({
          text: "  abcde\n\n1234567890",
          cursor: [0, 4]
        });
      });
      describe("as a motion from empty line", function() {
        return it("moves the cursor to the end of the line", function() {
          set({
            cursor: [1, 0]
          });
          return ensure('$', {
            cursor: [1, 0]
          });
        });
      });
      describe("as a motion", function() {
        it("moves the cursor to the end of the line", function() {
          return ensure('$', {
            cursor: [0, 6]
          });
        });
        it("set goalColumn Infinity", function() {
          expect(editor.getLastCursor().goalColumn).toBe(null);
          ensure('$', {
            cursor: [0, 6]
          });
          return expect(editor.getLastCursor().goalColumn).toBe(2e308);
        });
        it("should remain in the last column when moving down", function() {
          ensure('$ j', {
            cursor: [1, 0]
          });
          return ensure('j', {
            cursor: [2, 9]
          });
        });
        return it("support count", function() {
          return ensure('3 $', {
            cursor: [2, 9]
          });
        });
      });
      return describe("as a selection", function() {
        return it("selects to the end of the lines", function() {
          return ensure('d $', {
            text: "  ab\n\n1234567890",
            cursor: [0, 3]
          });
        });
      });
    });
    describe("the - keybinding", function() {
      beforeEach(function() {
        return set({
          text: "abcdefg\n  abc\n  abc\n"
        });
      });
      describe("from the middle of a line", function() {
        beforeEach(function() {
          return set({
            cursor: [1, 3]
          });
        });
        describe("as a motion", function() {
          return it("moves the cursor to the last character of the previous line", function() {
            return ensure('-', {
              cursor: [0, 0]
            });
          });
        });
        return describe("as a selection", function() {
          return it("deletes the current and previous line", function() {
            return ensure('d -', {
              text: "  abc\n",
              cursor: [0, 2]
            });
          });
        });
      });
      describe("from the first character of a line indented the same as the previous one", function() {
        beforeEach(function() {
          return set({
            cursor: [2, 2]
          });
        });
        describe("as a motion", function() {
          return it("moves to the first character of the previous line (directly above)", function() {
            return ensure('-', {
              cursor: [1, 2]
            });
          });
        });
        return describe("as a selection", function() {
          return it("selects to the first character of the previous line (directly above)", function() {
            return ensure('d -', {
              text: "abcdefg\n"
            });
          });
        });
      });
      describe("from the beginning of a line preceded by an indented line", function() {
        beforeEach(function() {
          return set({
            cursor: [2, 0]
          });
        });
        describe("as a motion", function() {
          return it("moves the cursor to the first character of the previous line", function() {
            return ensure('-', {
              cursor: [1, 2]
            });
          });
        });
        return describe("as a selection", function() {
          return it("selects to the first character of the previous line", function() {
            return ensure('d -', {
              text: "abcdefg\n"
            });
          });
        });
      });
      return describe("with a count", function() {
        beforeEach(function() {
          return set({
            text: "1\n2\n3\n4\n5\n6\n",
            cursor: [4, 0]
          });
        });
        describe("as a motion", function() {
          return it("moves the cursor to the first character of that many lines previous", function() {
            return ensure('3 -', {
              cursor: [1, 0]
            });
          });
        });
        return describe("as a selection", function() {
          return it("deletes the current line plus that many previous lines", function() {
            return ensure('d 3 -', {
              text: "1\n6\n",
              cursor: [1, 0]
            });
          });
        });
      });
    });
    describe("the + keybinding", function() {
      beforeEach(function() {
        return set({
          text_: "__abc\n__abc\nabcdefg\n"
        });
      });
      describe("from the middle of a line", function() {
        beforeEach(function() {
          return set({
            cursor: [1, 3]
          });
        });
        describe("as a motion", function() {
          return it("moves the cursor to the first character of the next line", function() {
            return ensure('+', {
              cursor: [2, 0]
            });
          });
        });
        return describe("as a selection", function() {
          return it("deletes the current and next line", function() {
            return ensure('d +', {
              text: "  abc\n"
            });
          });
        });
      });
      describe("from the first character of a line indented the same as the next one", function() {
        beforeEach(function() {
          return set({
            cursor: [0, 2]
          });
        });
        describe("as a motion", function() {
          return it("moves to the first character of the next line (directly below)", function() {
            return ensure('+', {
              cursor: [1, 2]
            });
          });
        });
        return describe("as a selection", function() {
          return it("selects to the first character of the next line (directly below)", function() {
            return ensure('d +', {
              text: "abcdefg\n"
            });
          });
        });
      });
      describe("from the beginning of a line followed by an indented line", function() {
        beforeEach(function() {
          return set({
            cursor: [0, 0]
          });
        });
        describe("as a motion", function() {
          return it("moves the cursor to the first character of the next line", function() {
            return ensure('+', {
              cursor: [1, 2]
            });
          });
        });
        return describe("as a selection", function() {
          return it("selects to the first character of the next line", function() {
            return ensure('d +', {
              text: "abcdefg\n",
              cursor: [0, 0]
            });
          });
        });
      });
      return describe("with a count", function() {
        beforeEach(function() {
          return set({
            text: "1\n2\n3\n4\n5\n6\n",
            cursor: [1, 0]
          });
        });
        describe("as a motion", function() {
          return it("moves the cursor to the first character of that many lines following", function() {
            return ensure('3 +', {
              cursor: [4, 0]
            });
          });
        });
        return describe("as a selection", function() {
          return it("deletes the current line plus that many following lines", function() {
            return ensure('d 3 +', {
              text: "1\n6\n",
              cursor: [1, 0]
            });
          });
        });
      });
    });
    describe("the _ keybinding", function() {
      beforeEach(function() {
        return set({
          text_: "__abc\n__abc\nabcdefg\n"
        });
      });
      describe("from the middle of a line", function() {
        beforeEach(function() {
          return set({
            cursor: [1, 3]
          });
        });
        describe("as a motion", function() {
          return it("moves the cursor to the first character of the current line", function() {
            return ensure('_', {
              cursor: [1, 2]
            });
          });
        });
        return describe("as a selection", function() {
          return it("deletes the current line", function() {
            return ensure('d _', {
              text_: "__abc\nabcdefg\n",
              cursor: [1, 0]
            });
          });
        });
      });
      return describe("with a count", function() {
        beforeEach(function() {
          return set({
            text: "1\n2\n3\n4\n5\n6\n",
            cursor: [1, 0]
          });
        });
        describe("as a motion", function() {
          return it("moves the cursor to the first character of that many lines following", function() {
            return ensure('3 _', {
              cursor: [3, 0]
            });
          });
        });
        return describe("as a selection", function() {
          return it("deletes the current line plus that many following lines", function() {
            return ensure('d 3 _', {
              text: "1\n5\n6\n",
              cursor: [1, 0]
            });
          });
        });
      });
    });
    describe("the enter keybinding", function() {
      var startingText;
      startingText = "  abc\n  abc\nabcdefg\n";
      return describe("from the middle of a line", function() {
        var startingCursorPosition;
        startingCursorPosition = [1, 3];
        describe("as a motion", function() {
          return it("acts the same as the + keybinding", function() {
            var referenceCursorPosition;
            set({
              text: startingText,
              cursor: startingCursorPosition
            });
            ensure('+');
            referenceCursorPosition = editor.getCursorScreenPosition();
            set({
              text: startingText,
              cursor: startingCursorPosition
            });
            return ensure('enter', {
              cursor: referenceCursorPosition
            });
          });
        });
        return describe("as a selection", function() {
          return it("acts the same as the + keybinding", function() {
            var referenceCursorPosition, referenceText;
            set({
              text: startingText,
              cursor: startingCursorPosition
            });
            ensure('d +');
            referenceText = editor.getText();
            referenceCursorPosition = editor.getCursorScreenPosition();
            set({
              text: startingText,
              cursor: startingCursorPosition
            });
            return ensure('d enter', {
              text: referenceText,
              cursor: referenceCursorPosition
            });
          });
        });
      });
    });
    describe("the gg keybinding with stayOnVerticalMotion = false", function() {
      beforeEach(function() {
        settings.set('stayOnVerticalMotion', false);
        return set({
          text: " 1abc\n 2\n3\n",
          cursor: [0, 2]
        });
      });
      describe("as a motion", function() {
        describe("in normal mode", function() {
          it("moves the cursor to the beginning of the first line", function() {
            set({
              cursor: [2, 0]
            });
            return ensure('g g', {
              cursor: [0, 1]
            });
          });
          return it("move to same position if its on first line and first char", function() {
            return ensure('g g', {
              cursor: [0, 1]
            });
          });
        });
        describe("in linewise visual mode", function() {
          return it("selects to the first line in the file", function() {
            set({
              cursor: [1, 0]
            });
            return ensure('V g g', {
              selectedText: " 1abc\n 2\n",
              cursor: [0, 0]
            });
          });
        });
        return describe("in characterwise visual mode", function() {
          beforeEach(function() {
            return set({
              cursor: [1, 1]
            });
          });
          return it("selects to the first line in the file", function() {
            return ensure('v g g', {
              selectedText: "1abc\n 2",
              cursor: [0, 1]
            });
          });
        });
      });
      return describe("when count specified", function() {
        describe("in normal mode", function() {
          return it("moves the cursor to first char of a specified line", function() {
            return ensure('2 g g', {
              cursor: [1, 1]
            });
          });
        });
        describe("in linewise visual motion", function() {
          return it("selects to a specified line", function() {
            set({
              cursor: [2, 0]
            });
            return ensure('V 2 g g', {
              selectedText: " 2\n3\n",
              cursor: [1, 0]
            });
          });
        });
        return describe("in characterwise visual motion", function() {
          return it("selects to a first character of specified line", function() {
            set({
              cursor: [2, 0]
            });
            return ensure('v 2 g g', {
              selectedText: "2\n3",
              cursor: [1, 1]
            });
          });
        });
      });
    });
    describe("the g_ keybinding", function() {
      beforeEach(function() {
        return set({
          text_: "1__\n    2__\n 3abc\n_"
        });
      });
      describe("as a motion", function() {
        it("moves the cursor to the last nonblank character", function() {
          set({
            cursor: [1, 0]
          });
          return ensure('g _', {
            cursor: [1, 4]
          });
        });
        return it("will move the cursor to the beginning of the line if necessary", function() {
          set({
            cursor: [0, 2]
          });
          return ensure('g _', {
            cursor: [0, 0]
          });
        });
      });
      describe("as a repeated motion", function() {
        return it("moves the cursor downward and outward", function() {
          set({
            cursor: [0, 0]
          });
          return ensure('2 g _', {
            cursor: [1, 4]
          });
        });
      });
      return describe("as a selection", function() {
        return it("selects the current line excluding whitespace", function() {
          set({
            cursor: [1, 2]
          });
          return ensure('v 2 g _', {
            selectedText: "  2  \n 3abc"
          });
        });
      });
    });
    describe("the G keybinding (stayOnVerticalMotion = false)", function() {
      beforeEach(function() {
        settings.set('stayOnVerticalMotion', false);
        return set({
          text_: "1\n____2\n_3abc\n_",
          cursor: [0, 2]
        });
      });
      describe("as a motion", function() {
        return it("moves the cursor to the last line after whitespace", function() {
          return ensure('G', {
            cursor: [3, 0]
          });
        });
      });
      describe("as a repeated motion", function() {
        return it("moves the cursor to a specified line", function() {
          return ensure('2 G', {
            cursor: [1, 4]
          });
        });
      });
      return describe("as a selection", function() {
        return it("selects to the last line in the file", function() {
          set({
            cursor: [1, 0]
          });
          return ensure('v G', {
            selectedText: "    2\n 3abc\n ",
            cursor: [3, 1]
          });
        });
      });
    });
    describe("the N% keybinding", function() {
      beforeEach(function() {
        var i, results;
        return set({
          text: (function() {
            results = [];
            for (i = 0; i <= 999; i++){ results.push(i); }
            return results;
          }).apply(this).join("\n"),
          cursor: [0, 0]
        });
      });
      return describe("put cursor on line specified by percent", function() {
        it("50%", function() {
          return ensure('5 0 %', {
            cursor: [499, 0]
          });
        });
        it("30%", function() {
          return ensure('3 0 %', {
            cursor: [299, 0]
          });
        });
        it("100%", function() {
          return ensure('1 0 0 %', {
            cursor: [999, 0]
          });
        });
        return it("120%", function() {
          return ensure('1 2 0 %', {
            cursor: [999, 0]
          });
        });
      });
    });
    describe("the H, M, L keybinding( stayOnVerticalMotio = false )", function() {
      beforeEach(function() {
        settings.set('stayOnVerticalMotion', false);
        return set({
          textC: "  1\n2\n3\n4\n  5\n6\n7\n8\n|9\n  10"
        });
      });
      describe("the H keybinding", function() {
        beforeEach(function() {
          return spyOn(editor, 'getLastVisibleScreenRow').andReturn(9);
        });
        it("moves the cursor to the non-blank-char on first row if visible", function() {
          spyOn(editor, 'getFirstVisibleScreenRow').andReturn(0);
          return ensure('H', {
            cursor: [0, 2]
          });
        });
        it("moves the cursor to the non-blank-char on first visible row plus scroll offset", function() {
          spyOn(editor, 'getFirstVisibleScreenRow').andReturn(2);
          return ensure('H', {
            cursor: [4, 2]
          });
        });
        return it("respects counts", function() {
          spyOn(editor, 'getFirstVisibleScreenRow').andReturn(0);
          return ensure('4 H', {
            cursor: [3, 0]
          });
        });
      });
      describe("the L keybinding", function() {
        beforeEach(function() {
          return spyOn(editor, 'getFirstVisibleScreenRow').andReturn(0);
        });
        it("moves the cursor to non-blank-char on last row if visible", function() {
          spyOn(editor, 'getLastVisibleScreenRow').andReturn(9);
          return ensure('L', {
            cursor: [9, 2]
          });
        });
        it("moves the cursor to the first visible row plus offset", function() {
          spyOn(editor, 'getLastVisibleScreenRow').andReturn(7);
          return ensure('L', {
            cursor: [4, 2]
          });
        });
        return it("respects counts", function() {
          spyOn(editor, 'getLastVisibleScreenRow').andReturn(9);
          return ensure('3 L', {
            cursor: [7, 0]
          });
        });
      });
      return describe("the M keybinding", function() {
        beforeEach(function() {
          spyOn(editor, 'getFirstVisibleScreenRow').andReturn(0);
          return spyOn(editor, 'getLastVisibleScreenRow').andReturn(9);
        });
        return it("moves the cursor to the non-blank-char of middle of screen", function() {
          return ensure('M', {
            cursor: [4, 2]
          });
        });
      });
    });
    describe("stayOnVerticalMotion setting", function() {
      beforeEach(function() {
        settings.set('stayOnVerticalMotion', true);
        return set({
          text: "  0 000000000000\n  1 111111111111\n2 222222222222\n",
          cursor: [2, 10]
        });
      });
      describe("gg, G, N%", function() {
        return it("go to row with keep column and respect cursor.goalColum", function() {
          ensure('g g', {
            cursor: [0, 10]
          });
          ensure('$', {
            cursor: [0, 15]
          });
          ensure('G', {
            cursor: [2, 13]
          });
          expect(editor.getLastCursor().goalColumn).toBe(2e308);
          ensure('1 %', {
            cursor: [0, 15]
          });
          expect(editor.getLastCursor().goalColumn).toBe(2e308);
          ensure('1 0 h', {
            cursor: [0, 5]
          });
          ensure('5 0 %', {
            cursor: [1, 5]
          });
          return ensure('1 0 0 %', {
            cursor: [2, 5]
          });
        });
      });
      return describe("H, M, L", function() {
        beforeEach(function() {
          spyOn(editor, 'getFirstVisibleScreenRow').andReturn(0);
          return spyOn(editor, 'getLastVisibleScreenRow').andReturn(3);
        });
        return it("go to row with keep column and respect cursor.goalColum", function() {
          ensure('H', {
            cursor: [0, 10]
          });
          ensure('M', {
            cursor: [1, 10]
          });
          ensure('L', {
            cursor: [2, 10]
          });
          ensure('$', {
            cursor: [2, 13]
          });
          expect(editor.getLastCursor().goalColumn).toBe(2e308);
          ensure('H', {
            cursor: [0, 15]
          });
          ensure('M', {
            cursor: [1, 15]
          });
          ensure('L', {
            cursor: [2, 13]
          });
          return expect(editor.getLastCursor().goalColumn).toBe(2e308);
        });
      });
    });
    describe('the mark keybindings', function() {
      beforeEach(function() {
        return set({
          text: "  12\n    34\n56\n",
          cursor: [0, 1]
        });
      });
      it('moves to the beginning of the line of a mark', function() {
        runs(function() {
          set({
            cursor: [1, 1]
          });
          return ensureWait('m a');
        });
        return runs(function() {
          set({
            cursor: [0, 0]
          });
          return ensure("' a", {
            cursor: [1, 4]
          });
        });
      });
      it('moves literally to a mark', function() {
        runs(function() {
          set({
            cursor: [1, 2]
          });
          return ensureWait('m a');
        });
        return runs(function() {
          set({
            cursor: [0, 0]
          });
          return ensure('` a', {
            cursor: [1, 2]
          });
        });
      });
      it('deletes to a mark by line', function() {
        runs(function() {
          set({
            cursor: [1, 5]
          });
          return ensureWait('m a');
        });
        return runs(function() {
          set({
            cursor: [0, 0]
          });
          return ensure("d ' a", {
            text: '56\n'
          });
        });
      });
      it('deletes before to a mark literally', function() {
        runs(function() {
          set({
            cursor: [1, 5]
          });
          return ensureWait('m a');
        });
        return runs(function() {
          set({
            cursor: [0, 2]
          });
          return ensure('d ` a', {
            text: '  4\n56\n'
          });
        });
      });
      it('deletes after to a mark literally', function() {
        runs(function() {
          set({
            cursor: [1, 5]
          });
          return ensureWait('m a');
        });
        return runs(function() {
          set({
            cursor: [2, 1]
          });
          return ensure('d ` a', {
            text: '  12\n    36\n'
          });
        });
      });
      return it('moves back to previous', function() {
        set({
          cursor: [1, 5]
        });
        ensure('` `');
        set({
          cursor: [2, 1]
        });
        return ensure('` `', {
          cursor: [1, 5]
        });
      });
    });
    describe("jump command update ` and ' mark", function() {
      var ensureJumpAndBack, ensureJumpAndBackLinewise, ensureJumpMark;
      ensureJumpMark = function(value) {
        ensure(null, {
          mark: {
            "`": value
          }
        });
        return ensure(null, {
          mark: {
            "'": value
          }
        });
      };
      ensureJumpAndBack = function(keystroke, option) {
        var afterMove, beforeMove;
        afterMove = option.cursor;
        beforeMove = editor.getCursorBufferPosition();
        ensure(keystroke, {
          cursor: afterMove
        });
        ensureJumpMark(beforeMove);
        expect(beforeMove.isEqual(afterMove)).toBe(false);
        ensure("` `", {
          cursor: beforeMove
        });
        return ensureJumpMark(afterMove);
      };
      ensureJumpAndBackLinewise = function(keystroke, option) {
        var afterMove, beforeMove;
        afterMove = option.cursor;
        beforeMove = editor.getCursorBufferPosition();
        expect(beforeMove.column).not.toBe(0);
        ensure(keystroke, {
          cursor: afterMove
        });
        ensureJumpMark(beforeMove);
        expect(beforeMove.isEqual(afterMove)).toBe(false);
        ensure("' '", {
          cursor: [beforeMove.row, 0]
        });
        return ensureJumpMark(afterMove);
      };
      beforeEach(function() {
        var i, len, mark, ref2, ref3;
        ref2 = "`'";
        for (i = 0, len = ref2.length; i < len; i++) {
          mark = ref2[i];
          if ((ref3 = vimState.mark.marks[mark]) != null) {
            ref3.destroy();
          }
          vimState.mark.marks[mark] = null;
        }
        return set({
          text: "0: oo 0\n1: 1111\n2: 2222\n3: oo 3\n4: 4444\n5: oo 5",
          cursor: [1, 0]
        });
      });
      describe("initial state", function() {
        return it("return [0, 0]", function() {
          ensure(null, {
            mark: {
              "'": [0, 0]
            }
          });
          return ensure(null, {
            mark: {
              "`": [0, 0]
            }
          });
        });
      });
      return describe("jump motion in normal-mode", function() {
        var initial;
        initial = [3, 3];
        beforeEach(function() {
          var component;
          jasmine.attachToDOM(getView(atom.workspace));
          if (editorElement.measureDimensions != null) {
            component = editor.component;
            component.element.style.height = component.getLineHeight() * editor.getLineCount() + 'px';
            editorElement.measureDimensions();
          }
          ensure(null, {
            mark: {
              "'": [0, 0]
            }
          });
          ensure(null, {
            mark: {
              "`": [0, 0]
            }
          });
          return set({
            cursor: initial
          });
        });
        it("G jump&back", function() {
          return ensureJumpAndBack('G', {
            cursor: [5, 3]
          });
        });
        it("g g jump&back", function() {
          return ensureJumpAndBack("g g", {
            cursor: [0, 3]
          });
        });
        it("100 % jump&back", function() {
          return ensureJumpAndBack("1 0 0 %", {
            cursor: [5, 3]
          });
        });
        it(") jump&back", function() {
          return ensureJumpAndBack(")", {
            cursor: [5, 6]
          });
        });
        it("( jump&back", function() {
          return ensureJumpAndBack("(", {
            cursor: [0, 0]
          });
        });
        it("] jump&back", function() {
          return ensureJumpAndBack("]", {
            cursor: [5, 3]
          });
        });
        it("[ jump&back", function() {
          return ensureJumpAndBack("[", {
            cursor: [0, 3]
          });
        });
        it("} jump&back", function() {
          return ensureJumpAndBack("}", {
            cursor: [5, 6]
          });
        });
        it("{ jump&back", function() {
          return ensureJumpAndBack("{", {
            cursor: [0, 0]
          });
        });
        it("L jump&back", function() {
          return ensureJumpAndBack("L", {
            cursor: [5, 3]
          });
        });
        it("H jump&back", function() {
          return ensureJumpAndBack("H", {
            cursor: [0, 3]
          });
        });
        it("M jump&back", function() {
          return ensureJumpAndBack("M", {
            cursor: [2, 3]
          });
        });
        it("* jump&back", function() {
          return ensureJumpAndBack("*", {
            cursor: [5, 3]
          });
        });
        it("Sharp(#) jump&back", function() {
          return ensureJumpAndBack('#', {
            cursor: [0, 3]
          });
        });
        it("/ jump&back", function() {
          return ensureJumpAndBack('/ oo enter', {
            cursor: [5, 3]
          });
        });
        it("? jump&back", function() {
          return ensureJumpAndBack('? oo enter', {
            cursor: [0, 3]
          });
        });
        it("n jump&back", function() {
          set({
            cursor: [0, 0]
          });
          ensure('/ oo enter', {
            cursor: [0, 3]
          });
          ensureJumpAndBack("n", {
            cursor: [3, 3]
          });
          return ensureJumpAndBack("N", {
            cursor: [5, 3]
          });
        });
        it("N jump&back", function() {
          set({
            cursor: [0, 0]
          });
          ensure('? oo enter', {
            cursor: [5, 3]
          });
          ensureJumpAndBack("n", {
            cursor: [3, 3]
          });
          return ensureJumpAndBack("N", {
            cursor: [0, 3]
          });
        });
        it("G jump&back linewise", function() {
          return ensureJumpAndBackLinewise('G', {
            cursor: [5, 3]
          });
        });
        it("g g jump&back linewise", function() {
          return ensureJumpAndBackLinewise("g g", {
            cursor: [0, 3]
          });
        });
        it("100 % jump&back linewise", function() {
          return ensureJumpAndBackLinewise("1 0 0 %", {
            cursor: [5, 3]
          });
        });
        it(") jump&back linewise", function() {
          return ensureJumpAndBackLinewise(")", {
            cursor: [5, 6]
          });
        });
        it("( jump&back linewise", function() {
          return ensureJumpAndBackLinewise("(", {
            cursor: [0, 0]
          });
        });
        it("] jump&back linewise", function() {
          return ensureJumpAndBackLinewise("]", {
            cursor: [5, 3]
          });
        });
        it("[ jump&back linewise", function() {
          return ensureJumpAndBackLinewise("[", {
            cursor: [0, 3]
          });
        });
        it("} jump&back linewise", function() {
          return ensureJumpAndBackLinewise("}", {
            cursor: [5, 6]
          });
        });
        it("{ jump&back linewise", function() {
          return ensureJumpAndBackLinewise("{", {
            cursor: [0, 0]
          });
        });
        it("L jump&back linewise", function() {
          return ensureJumpAndBackLinewise("L", {
            cursor: [5, 3]
          });
        });
        it("H jump&back linewise", function() {
          return ensureJumpAndBackLinewise("H", {
            cursor: [0, 3]
          });
        });
        it("M jump&back linewise", function() {
          return ensureJumpAndBackLinewise("M", {
            cursor: [2, 3]
          });
        });
        return it("* jump&back linewise", function() {
          return ensureJumpAndBackLinewise("*", {
            cursor: [5, 3]
          });
        });
      });
    });
    describe('the V keybinding', function() {
      var text;
      text = [][0];
      beforeEach(function() {
        text = new TextData("01\n002\n0003\n00004\n000005\n");
        return set({
          text: text.getRaw(),
          cursor: [1, 1]
        });
      });
      it("selects down a line", function() {
        return ensure('V j j', {
          selectedText: text.getLines([1, 2, 3])
        });
      });
      return it("selects up a line", function() {
        return ensure('V k', {
          selectedText: text.getLines([0, 1])
        });
      });
    });
    describe('MoveTo(Previous|Next)Fold(Start|End)', function() {
      beforeEach(function() {
        waitsForPromise(function() {
          return atom.packages.activatePackage('language-coffee-script');
        });
        getVimState('sample.coffee', function(state, vim) {
          editor = state.editor, editorElement = state.editorElement;
          return set = vim.set, ensure = vim.ensure, vim;
        });
        return runs(function() {
          return atom.keymaps.add("test", {
            'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
              '[ [': 'vim-mode-plus:move-to-previous-fold-start',
              '] [': 'vim-mode-plus:move-to-next-fold-start',
              '[ ]': 'vim-mode-plus:move-to-previous-fold-end',
              '] ]': 'vim-mode-plus:move-to-next-fold-end'
            }
          });
        });
      });
      afterEach(function() {
        return atom.packages.deactivatePackage('language-coffee-script');
      });
      describe("MoveToPreviousFoldStart", function() {
        beforeEach(function() {
          return set({
            cursor: [30, 0]
          });
        });
        return it("move to first char of previous fold start row", function() {
          ensure('[ [', {
            cursor: [22, 6]
          });
          ensure('[ [', {
            cursor: [20, 6]
          });
          ensure('[ [', {
            cursor: [18, 4]
          });
          ensure('[ [', {
            cursor: [9, 2]
          });
          return ensure('[ [', {
            cursor: [8, 0]
          });
        });
      });
      describe("MoveToNextFoldStart", function() {
        beforeEach(function() {
          return set({
            cursor: [0, 0]
          });
        });
        return it("move to first char of next fold start row", function() {
          ensure('] [', {
            cursor: [8, 0]
          });
          ensure('] [', {
            cursor: [9, 2]
          });
          ensure('] [', {
            cursor: [18, 4]
          });
          ensure('] [', {
            cursor: [20, 6]
          });
          return ensure('] [', {
            cursor: [22, 6]
          });
        });
      });
      describe("MoveToPreviousFoldEnd", function() {
        beforeEach(function() {
          return set({
            cursor: [30, 0]
          });
        });
        return it("move to first char of previous fold end row", function() {
          ensure('[ ]', {
            cursor: [28, 2]
          });
          ensure('[ ]', {
            cursor: [25, 4]
          });
          ensure('[ ]', {
            cursor: [23, 8]
          });
          return ensure('[ ]', {
            cursor: [21, 8]
          });
        });
      });
      return describe("MoveToNextFoldEnd", function() {
        beforeEach(function() {
          return set({
            cursor: [0, 0]
          });
        });
        return it("move to first char of next fold end row", function() {
          ensure('] ]', {
            cursor: [21, 8]
          });
          ensure('] ]', {
            cursor: [23, 8]
          });
          ensure('] ]', {
            cursor: [25, 4]
          });
          return ensure('] ]', {
            cursor: [28, 2]
          });
        });
      });
    });
    describe('MoveTo(Previous|Next)Fold(Start|End)WithSameIndent', function() {
      beforeEach(function() {
        waitsForPromise(function() {
          return atom.packages.activatePackage('language-javascript');
        });
        getVimState(function(state, vim) {
          editor = state.editor, editorElement = state.editorElement;
          return set = vim.set, ensure = vim.ensure, vim;
        });
        return runs(function() {
          set({
            grammar: "source.js",
            text: "class TestA {\n  methA() {\n    if (true) {\n      null\n    }\n  }\n}\n\nclass TestB {\n  methB() {\n    if (true) {\n      null\n    }\n  }\n}\n"
          });
          return atom.keymaps.add("test", {
            'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
              '[ [': 'vim-mode-plus:move-to-previous-fold-start-with-same-indent',
              '] [': 'vim-mode-plus:move-to-next-fold-start-with-same-indent',
              '[ ]': 'vim-mode-plus:move-to-previous-fold-end-with-same-indent',
              '] ]': 'vim-mode-plus:move-to-next-fold-end-with-same-indent'
            }
          });
        });
      });
      afterEach(function() {
        return atom.packages.deactivatePackage('language-javascript');
      });
      describe("MoveToPreviousFoldStartWithSameIndent", function() {
        it("[from largetst fold] move to first char of previous fold start row", function() {
          set({
            cursor: [14, 0]
          });
          ensure('[ [', {
            cursor: [8, 0]
          });
          ensure('[ [', {
            cursor: [0, 0]
          });
          return ensure('[ [', {
            cursor: [0, 0]
          });
        });
        it("[from outer fold] move to first char of previous fold start row", function() {
          set({
            cursor: [7, 0]
          });
          ensure('[ [', {
            cursor: [0, 0]
          });
          return ensure('[ [', {
            cursor: [0, 0]
          });
        });
        return it("[from one level deeper fold] move to first char of previous fold start row", function() {
          set({
            cursor: [9, 0]
          });
          ensure('[ [', {
            cursor: [1, 2]
          });
          return ensure('[ [', {
            cursor: [1, 2]
          });
        });
      });
      describe("MoveToNextFoldStartWithSameIndent", function() {
        it("[from largetst fold] move to first char of next fold start row", function() {
          set({
            cursor: [0, 0]
          });
          ensure('] [', {
            cursor: [8, 0]
          });
          return ensure('] [', {
            cursor: [8, 0]
          });
        });
        it("[from outer fold] move to first char of next fold start row", function() {
          set({
            cursor: [7, 0]
          });
          ensure('] [', {
            cursor: [8, 0]
          });
          return ensure('] [', {
            cursor: [8, 0]
          });
        });
        return it("[from one level deeper fold] move to first char of next fold start row", function() {
          set({
            cursor: [1, 0]
          });
          ensure('] [', {
            cursor: [9, 2]
          });
          return ensure('] [', {
            cursor: [9, 2]
          });
        });
      });
      describe("MoveToPreviousFoldEndWithSameIndent", function() {
        it("[from largetst fold] move to first char of previous fold end row", function() {
          set({
            cursor: [14, 0]
          });
          ensure('[ ]', {
            cursor: [6, 0]
          });
          return ensure('[ ]', {
            cursor: [6, 0]
          });
        });
        it("[from outer fold] move to first char of previous fold end row", function() {
          set({
            cursor: [7, 0]
          });
          ensure('[ ]', {
            cursor: [6, 0]
          });
          return ensure('[ ]', {
            cursor: [6, 0]
          });
        });
        return it("[from one level deeper fold] move to first char of previous fold end row", function() {
          set({
            cursor: [13, 0]
          });
          ensure('[ ]', {
            cursor: [5, 2]
          });
          return ensure('[ ]', {
            cursor: [5, 2]
          });
        });
      });
      return describe("MoveToNextFoldEndWithSameIndent", function() {
        it("[from largetst fold] move to first char of next fold end row", function() {
          set({
            cursor: [0, 0]
          });
          ensure('] ]', {
            cursor: [6, 0]
          });
          ensure('] ]', {
            cursor: [14, 0]
          });
          return ensure('] ]', {
            cursor: [14, 0]
          });
        });
        it("[from outer fold] move to first char of next fold end row", function() {
          set({
            cursor: [7, 0]
          });
          ensure('] ]', {
            cursor: [14, 0]
          });
          return ensure('] ]', {
            cursor: [14, 0]
          });
        });
        return it("[from one level deeper fold] move to first char of next fold end row", function() {
          set({
            cursor: [1, 0]
          });
          ensure('] ]', {
            cursor: [5, 2]
          });
          ensure('] ]', {
            cursor: [13, 2]
          });
          return ensure('] ]', {
            cursor: [13, 2]
          });
        });
      });
    });
    return describe('subword motion', function() {
      beforeEach(function() {
        return atom.keymaps.add("test", {
          'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
            'q': 'vim-mode-plus:move-to-next-subword',
            'Q': 'vim-mode-plus:move-to-previous-subword',
            'ctrl-e': 'vim-mode-plus:move-to-end-of-subword'
          }
        });
      });
      it("move to next/previous subword", function() {
        set({
          textC: "|camelCase => (with special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('q', {
          textC: "camel|Case => (with special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('q', {
          textC: "camelCase| => (with special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('q', {
          textC: "camelCase =>| (with special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('q', {
          textC: "camelCase => (|with special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('q', {
          textC: "camelCase => (with |special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('q', {
          textC: "camelCase => (with special|) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('q', {
          textC: "camelCase => (with special) |ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('q', {
          textC: "camelCase => (with special) Cha|RActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('q', {
          textC: "camelCase => (with special) ChaR|ActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('q', {
          textC: "camelCase => (with special) ChaRActer|Rs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('q', {
          textC: "camelCase => (with special) ChaRActerRs\n\n|dash-case\n\nsnake_case_word\n"
        });
        ensure('q', {
          textC: "camelCase => (with special) ChaRActerRs\n\ndash|-case\n\nsnake_case_word\n"
        });
        ensure('q', {
          textC: "camelCase => (with special) ChaRActerRs\n\ndash-|case\n\nsnake_case_word\n"
        });
        ensure('q', {
          textC: "camelCase => (with special) ChaRActerRs\n\ndash-case\n\n|snake_case_word\n"
        });
        ensure('q', {
          textC: "camelCase => (with special) ChaRActerRs\n\ndash-case\n\nsnake|_case_word\n"
        });
        ensure('q', {
          textC: "camelCase => (with special) ChaRActerRs\n\ndash-case\n\nsnake_case|_word\n"
        });
        ensure('q', {
          textC: "camelCase => (with special) ChaRActerRs\n\ndash-case\n\nsnake_case_wor|d\n"
        });
        ensure('Q', {
          textC: "camelCase => (with special) ChaRActerRs\n\ndash-case\n\nsnake_case|_word\n"
        });
        ensure('Q', {
          textC: "camelCase => (with special) ChaRActerRs\n\ndash-case\n\nsnake|_case_word\n"
        });
        ensure('Q', {
          textC: "camelCase => (with special) ChaRActerRs\n\ndash-case\n\n|snake_case_word\n"
        });
        ensure('Q', {
          textC: "camelCase => (with special) ChaRActerRs\n\ndash-|case\n\nsnake_case_word\n"
        });
        ensure('Q', {
          textC: "camelCase => (with special) ChaRActerRs\n\ndash|-case\n\nsnake_case_word\n"
        });
        ensure('Q', {
          textC: "camelCase => (with special) ChaRActerRs\n\n|dash-case\n\nsnake_case_word\n"
        });
        ensure('Q', {
          textC: "camelCase => (with special) ChaRActer|Rs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('Q', {
          textC: "camelCase => (with special) ChaR|ActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('Q', {
          textC: "camelCase => (with special) Cha|RActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('Q', {
          textC: "camelCase => (with special) |ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('Q', {
          textC: "camelCase => (with special|) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('Q', {
          textC: "camelCase => (with |special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('Q', {
          textC: "camelCase => (|with special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('Q', {
          textC: "camelCase =>| (with special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('Q', {
          textC: "camelCase| => (with special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('Q', {
          textC: "camel|Case => (with special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        return ensure('Q', {
          textC: "|camelCase => (with special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
      });
      return it("move-to-end-of-subword", function() {
        set({
          textC: "|camelCase => (with special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('ctrl-e', {
          textC: "came|lCase => (with special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('ctrl-e', {
          textC: "camelCas|e => (with special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('ctrl-e', {
          textC: "camelCase =|> (with special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('ctrl-e', {
          textC: "camelCase => |(with special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('ctrl-e', {
          textC: "camelCase => (wit|h special) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('ctrl-e', {
          textC: "camelCase => (with specia|l) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('ctrl-e', {
          textC: "camelCase => (with special|) ChaRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('ctrl-e', {
          textC: "camelCase => (with special) Ch|aRActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('ctrl-e', {
          textC: "camelCase => (with special) Cha|RActerRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('ctrl-e', {
          textC: "camelCase => (with special) ChaRActe|rRs\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('ctrl-e', {
          textC: "camelCase => (with special) ChaRActerR|s\n\ndash-case\n\nsnake_case_word\n"
        });
        ensure('ctrl-e', {
          textC: "camelCase => (with special) ChaRActerRs\n\ndas|h-case\n\nsnake_case_word\n"
        });
        ensure('ctrl-e', {
          textC: "camelCase => (with special) ChaRActerRs\n\ndash|-case\n\nsnake_case_word\n"
        });
        ensure('ctrl-e', {
          textC: "camelCase => (with special) ChaRActerRs\n\ndash-cas|e\n\nsnake_case_word\n"
        });
        ensure('ctrl-e', {
          textC: "camelCase => (with special) ChaRActerRs\n\ndash-case\n\nsnak|e_case_word\n"
        });
        ensure('ctrl-e', {
          textC: "camelCase => (with special) ChaRActerRs\n\ndash-case\n\nsnake_cas|e_word\n"
        });
        return ensure('ctrl-e', {
          textC: "camelCase => (with special) ChaRActerRs\n\ndash-case\n\nsnake_case_wor|d\n"
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy92aW0tbW9kZS1wbHVzL3NwZWMvbW90aW9uLWdlbmVyYWwtc3BlYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFDLFFBQVMsT0FBQSxDQUFRLE1BQVI7O0VBQ1YsTUFBNkMsT0FBQSxDQUFRLGVBQVIsQ0FBN0MsRUFBQyw2QkFBRCxFQUFjLHVCQUFkLEVBQXdCLHVCQUF4QixFQUFrQzs7RUFDbEMsUUFBQSxHQUFXLE9BQUEsQ0FBUSxpQkFBUjs7RUFFWCwwQkFBQSxHQUE2QixTQUFDLE1BQUQsRUFBUyxpQkFBVDtBQUMzQixRQUFBO0lBQUEsTUFBTSxDQUFDLG1CQUFQLENBQTJCLENBQTNCO0lBQ0EsU0FBQSxHQUFZLE1BQU0sQ0FBQztJQUNuQixTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUF4QixHQUNFLFNBQVMsQ0FBQyx1QkFBVixDQUFBLENBQUEsR0FBc0MsaUJBQUEsR0FBb0IsU0FBUyxDQUFDLFlBQVksQ0FBQyxrQkFBakYsR0FBc0c7QUFDeEcsV0FBTyxTQUFTLENBQUMsb0JBQVYsQ0FBQTtFQUxvQjs7RUFPN0IsUUFBQSxDQUFTLGdCQUFULEVBQTJCLFNBQUE7QUFDekIsUUFBQTtJQUFBLE9BQTZELEVBQTdELEVBQUMsYUFBRCxFQUFNLGdCQUFOLEVBQWMsb0JBQWQsRUFBMEIsZ0JBQTFCLEVBQWtDLHVCQUFsQyxFQUFpRDtJQUVqRCxVQUFBLENBQVcsU0FBQTthQUNULFdBQUEsQ0FBWSxTQUFDLEtBQUQsRUFBUSxJQUFSO1FBQ1YsUUFBQSxHQUFXO1FBQ1Ysd0JBQUQsRUFBUztlQUNSLGNBQUQsRUFBTSxvQkFBTixFQUFjLDRCQUFkLEVBQTRCO01BSGxCLENBQVo7SUFEUyxDQUFYO0lBTUEsUUFBQSxDQUFTLGdCQUFULEVBQTJCLFNBQUE7QUFDekIsVUFBQTtNQUFBLElBQUEsR0FBTztN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QUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtRQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtlQUNBLE1BQUEsQ0FBTyxHQUFQLEVBQVk7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBWjtNQW5Da0MsQ0FBcEM7YUFvQ0EsRUFBQSxDQUFHLHdCQUFILEVBQTZCLFNBQUE7UUFDM0IsR0FBQSxDQUFJO1VBQUEsS0FBQSxFQUFPLDRFQUFQO1NBQUo7UUFDQSxNQUFBLENBQU8sUUFBUCxFQUFpQjtVQUFBLEtBQUEsRUFBTyw0RUFBUDtTQUFqQjtRQUNBLE1BQUEsQ0FBTyxRQUFQLEVBQWlCO1VBQUEsS0FBQSxFQUFPLDRFQUFQO1NBQWpCO1FBQ0EsTUFBQSxDQUFPLFFBQVAsRUFBaUI7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBakI7UUFDQSxNQUFBLENBQU8sUUFBUCxFQUFpQjtVQUFBLEtBQUEsRUFBTyw0RUFBUDtTQUFqQjtRQUNBLE1BQUEsQ0FBTyxRQUFQLEVBQWlCO1VBQUEsS0FBQSxFQUFPLDRFQUFQO1NBQWpCO1FBQ0EsTUFBQSxDQUFPLFFBQVAsRUFBaUI7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBakI7UUFDQSxNQUFBLENBQU8sUUFBUCxFQUFpQjtVQUFBLEtBQUEsRUFBTyw0RUFBUDtTQUFqQjtRQUNBLE1BQUEsQ0FBTyxRQUFQLEVBQWlCO1VBQUEsS0FBQSxFQUFPLDRFQUFQO1NBQWpCO1FBQ0EsTUFBQSxDQUFPLFFBQVAsRUFBaUI7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBakI7UUFDQSxNQUFBLENBQU8sUUFBUCxFQUFpQjtVQUFBLEtBQUEsRUFBTyw0RUFBUDtTQUFqQjtRQUNBLE1BQUEsQ0FBTyxRQUFQLEVBQWlCO1VBQUEsS0FBQSxFQUFPLDRFQUFQO1NBQWpCO1FBQ0EsTUFBQSxDQUFPLFFBQVAsRUFBaUI7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBakI7UUFDQSxNQUFBLENBQU8sUUFBUCxFQUFpQjtVQUFBLEtBQUEsRUFBTyw0RUFBUDtTQUFqQjtRQUNBLE1BQUEsQ0FBTyxRQUFQLEVBQWlCO1VBQUEsS0FBQSxFQUFPLDRFQUFQO1NBQWpCO1FBQ0EsTUFBQSxDQUFPLFFBQVAsRUFBaUI7VUFBQSxLQUFBLEVBQU8sNEVBQVA7U0FBakI7UUFDQSxNQUFBLENBQU8sUUFBUCxFQUFpQjtVQUFBLEtBQUEsRUFBTyw0RUFBUDtTQUFqQjtlQUNBLE1BQUEsQ0FBTyxRQUFQLEVBQWlCO1VBQUEsS0FBQSxFQUFPLDRFQUFQO1NBQWpCO01BbEIyQixDQUE3QjtJQTVDeUIsQ0FBM0I7RUF2aEV5QixDQUEzQjtBQVhBIiwic291cmNlc0NvbnRlbnQiOlsie1BvaW50fSA9IHJlcXVpcmUgJ2F0b20nXG57Z2V0VmltU3RhdGUsIGRpc3BhdGNoLCBUZXh0RGF0YSwgZ2V0Vmlld30gPSByZXF1aXJlICcuL3NwZWMtaGVscGVyJ1xuc2V0dGluZ3MgPSByZXF1aXJlICcuLi9saWIvc2V0dGluZ3MnXG5cbnNldEVkaXRvcldpZHRoSW5DaGFyYWN0ZXJzID0gKGVkaXRvciwgd2lkdGhJbkNoYXJhY3RlcnMpIC0+XG4gIGVkaXRvci5zZXREZWZhdWx0Q2hhcldpZHRoKDEpXG4gIGNvbXBvbmVudCA9IGVkaXRvci5jb21wb25lbnRcbiAgY29tcG9uZW50LmVsZW1lbnQuc3R5bGUud2lkdGggPVxuICAgIGNvbXBvbmVudC5nZXRHdXR0ZXJDb250YWluZXJXaWR0aCgpICsgd2lkdGhJbkNoYXJhY3RlcnMgKiBjb21wb25lbnQubWVhc3VyZW1lbnRzLmJhc2VDaGFyYWN0ZXJXaWR0aCArIFwicHhcIlxuICByZXR1cm4gY29tcG9uZW50LmdldE5leHRVcGRhdGVQcm9taXNlKClcblxuZGVzY3JpYmUgXCJNb3Rpb24gZ2VuZXJhbFwiLCAtPlxuICBbc2V0LCBlbnN1cmUsIGVuc3VyZVdhaXQsIGVkaXRvciwgZWRpdG9yRWxlbWVudCwgdmltU3RhdGVdID0gW11cblxuICBiZWZvcmVFYWNoIC0+XG4gICAgZ2V0VmltU3RhdGUgKHN0YXRlLCBfdmltKSAtPlxuICAgICAgdmltU3RhdGUgPSBzdGF0ZSAjIHRvIHJlZmVyIGFzIHZpbVN0YXRlIGxhdGVyLlxuICAgICAge2VkaXRvciwgZWRpdG9yRWxlbWVudH0gPSB2aW1TdGF0ZVxuICAgICAge3NldCwgZW5zdXJlLCBlbnN1cmVXYWl0fSA9IF92aW1cblxuICBkZXNjcmliZSBcInNpbXBsZSBtb3Rpb25zXCIsIC0+XG4gICAgdGV4dCA9IG51bGxcbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICB0ZXh0ID0gbmV3IFRleHREYXRhIFwiXCJcIlxuICAgICAgICAxMjM0NVxuICAgICAgICBhYmNkXG4gICAgICAgIEFCQ0RFXFxuXG4gICAgICAgIFwiXCJcIlxuXG4gICAgICBzZXRcbiAgICAgICAgdGV4dDogdGV4dC5nZXRSYXcoKVxuICAgICAgICBjdXJzb3I6IFsxLCAxXVxuXG4gICAgZGVzY3JpYmUgXCJ0aGUgaCBrZXliaW5kaW5nXCIsIC0+XG4gICAgICBkZXNjcmliZSBcImFzIGEgbW90aW9uXCIsIC0+XG4gICAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciBsZWZ0LCBidXQgbm90IHRvIHRoZSBwcmV2aW91cyBsaW5lXCIsIC0+XG4gICAgICAgICAgZW5zdXJlICdoJywgY3Vyc29yOiBbMSwgMF1cbiAgICAgICAgICBlbnN1cmUgJ2gnLCBjdXJzb3I6IFsxLCAwXVxuXG4gICAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciB0byB0aGUgcHJldmlvdXMgbGluZSBpZiB3cmFwTGVmdFJpZ2h0TW90aW9uIGlzIHRydWVcIiwgLT5cbiAgICAgICAgICBzZXR0aW5ncy5zZXQoJ3dyYXBMZWZ0UmlnaHRNb3Rpb24nLCB0cnVlKVxuICAgICAgICAgIGVuc3VyZSAnaCBoJywgY3Vyc29yOiBbMCwgNF1cblxuICAgICAgZGVzY3JpYmUgXCJhcyBhIHNlbGVjdGlvblwiLCAtPlxuICAgICAgICBpdCBcInNlbGVjdHMgdGhlIGNoYXJhY3RlciB0byB0aGUgbGVmdFwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAneSBoJyxcbiAgICAgICAgICAgIGN1cnNvcjogWzEsIDBdXG4gICAgICAgICAgICByZWdpc3RlcjogJ1wiJzogdGV4dDogJ2EnXG5cbiAgICBkZXNjcmliZSBcInRoZSBqIGtleWJpbmRpbmdcIiwgLT5cbiAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciBkb3duLCBidXQgbm90IHRvIHRoZSBlbmQgb2YgdGhlIGxhc3QgbGluZVwiLCAtPlxuICAgICAgICBlbnN1cmUgJ2onLCBjdXJzb3I6IFsyLCAxXVxuICAgICAgICBlbnN1cmUgJ2onLCBjdXJzb3I6IFsyLCAxXVxuXG4gICAgICBpdCBcIm1vdmVzIHRoZSBjdXJzb3IgdG8gdGhlIGVuZCBvZiB0aGUgbGluZSwgbm90IHBhc3QgaXRcIiwgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzAsIDRdXG4gICAgICAgIGVuc3VyZSAnaicsIGN1cnNvcjogWzEsIDNdXG5cbiAgICAgIGl0IFwicmVtZW1iZXJzIHRoZSBjb2x1bW4gaXQgd2FzIGluIGFmdGVyIG1vdmluZyB0byBzaG9ydGVyIGxpbmVcIiwgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzAsIDRdXG4gICAgICAgIGVuc3VyZSAnaicsIGN1cnNvcjogWzEsIDNdXG4gICAgICAgIGVuc3VyZSAnaicsIGN1cnNvcjogWzIsIDRdXG5cbiAgICAgIGl0IFwibmV2ZXIgZ28gcGFzdCBsYXN0IG5ld2xpbmVcIiwgLT5cbiAgICAgICAgZW5zdXJlICcxIDAgaicsIGN1cnNvcjogWzIsIDFdXG5cbiAgICAgIGRlc2NyaWJlIFwid2hlbiB2aXN1YWwgbW9kZVwiLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgZW5zdXJlICd2JywgY3Vyc29yOiBbMSwgMl0sIHNlbGVjdGVkVGV4dDogJ2InXG5cbiAgICAgICAgaXQgXCJtb3ZlcyB0aGUgY3Vyc29yIGRvd25cIiwgLT5cbiAgICAgICAgICBlbnN1cmUgJ2onLCBjdXJzb3I6IFsyLCAyXSwgc2VsZWN0ZWRUZXh0OiBcImJjZFxcbkFCXCJcblxuICAgICAgICBpdCBcImRvZXNuJ3QgZ28gb3ZlciBhZnRlciB0aGUgbGFzdCBsaW5lXCIsIC0+XG4gICAgICAgICAgZW5zdXJlICdqJywgY3Vyc29yOiBbMiwgMl0sIHNlbGVjdGVkVGV4dDogXCJiY2RcXG5BQlwiXG5cbiAgICAgICAgaXQgXCJrZWVwIHNhbWUgY29sdW1uKGdvYWxDb2x1bW4pIGV2ZW4gYWZ0ZXIgYWNyb3NzIHRoZSBlbXB0eSBsaW5lXCIsIC0+XG4gICAgICAgICAgZW5zdXJlICdlc2NhcGUnXG4gICAgICAgICAgc2V0XG4gICAgICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICAgICAgYWJjZGVmZ1xuXG4gICAgICAgICAgICAgIGFiY2RlZmdcbiAgICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgICAgICBjdXJzb3I6IFswLCAzXVxuICAgICAgICAgIGVuc3VyZSAndicsIGN1cnNvcjogWzAsIDRdXG4gICAgICAgICAgZW5zdXJlICdqIGonLCBjdXJzb3I6IFsyLCA0XSwgc2VsZWN0ZWRUZXh0OiBcImRlZmdcXG5cXG5hYmNkXCJcblxuICAgICAgICAjIFtGSVhNRV0gdGhlIHBsYWNlIG9mIHRoaXMgc3BlYyBpcyBub3QgYXBwcm9wcmlhdGUuXG4gICAgICAgIGl0IFwib3JpZ2luYWwgdmlzdWFsIGxpbmUgcmVtYWlucyB3aGVuIGprIGFjcm9zcyBvcmlnbmFsIHNlbGVjdGlvblwiLCAtPlxuICAgICAgICAgIHRleHQgPSBuZXcgVGV4dERhdGEgXCJcIlwiXG4gICAgICAgICAgICBsaW5lMFxuICAgICAgICAgICAgbGluZTFcbiAgICAgICAgICAgIGxpbmUyXFxuXG4gICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgICBzZXRcbiAgICAgICAgICAgIHRleHQ6IHRleHQuZ2V0UmF3KClcbiAgICAgICAgICAgIGN1cnNvcjogWzEsIDFdXG5cbiAgICAgICAgICBlbnN1cmUgJ1YnLCBzZWxlY3RlZFRleHQ6IHRleHQuZ2V0TGluZXMoWzFdKVxuICAgICAgICAgIGVuc3VyZSAnaicsIHNlbGVjdGVkVGV4dDogdGV4dC5nZXRMaW5lcyhbMSwgMl0pXG4gICAgICAgICAgZW5zdXJlICdrJywgc2VsZWN0ZWRUZXh0OiB0ZXh0LmdldExpbmVzKFsxXSlcbiAgICAgICAgICBlbnN1cmUgJ2snLCBzZWxlY3RlZFRleHQ6IHRleHQuZ2V0TGluZXMoWzAsIDFdKVxuICAgICAgICAgIGVuc3VyZSAnaicsIHNlbGVjdGVkVGV4dDogdGV4dC5nZXRMaW5lcyhbMV0pXG4gICAgICAgICAgZW5zdXJlICdqJywgc2VsZWN0ZWRUZXh0OiB0ZXh0LmdldExpbmVzKFsxLCAyXSlcblxuICAgIGRlc2NyaWJlIFwibW92ZS1kb3duLXdyYXAsIG1vdmUtdXAtd3JhcFwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBhdG9tLmtleW1hcHMuYWRkIFwidGVzdFwiLFxuICAgICAgICAgICdhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXM6bm90KC5pbnNlcnQtbW9kZSknOlxuICAgICAgICAgICAgJ2snOiAndmltLW1vZGUtcGx1czptb3ZlLXVwLXdyYXAnXG4gICAgICAgICAgICAnaic6ICd2aW0tbW9kZS1wbHVzOm1vdmUtZG93bi13cmFwJ1xuXG4gICAgICAgIHNldFxuICAgICAgICAgIHRleHQ6IFwiXCJcIlxuICAgICAgICAgIGhlbGxvXG4gICAgICAgICAgaGVsbG9cbiAgICAgICAgICBoZWxsb1xuICAgICAgICAgIGhlbGxvXFxuXG4gICAgICAgICAgXCJcIlwiXG4gICAgICBkZXNjcmliZSAnbW92ZS1kb3duLXdyYXAnLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgc2V0IGN1cnNvcjogWzMsIDFdXG4gICAgICAgIGl0IFwibW92ZSBkb3duIHdpdGggd3Jhd3BcIiwgLT4gZW5zdXJlICdqJywgY3Vyc29yOiBbMCwgMV1cbiAgICAgICAgaXQgXCJtb3ZlIGRvd24gd2l0aCB3cmF3cFwiLCAtPiBlbnN1cmUgJzIgaicsIGN1cnNvcjogWzEsIDFdXG4gICAgICAgIGl0IFwibW92ZSBkb3duIHdpdGggd3Jhd3BcIiwgLT4gZW5zdXJlICc0IGonLCBjdXJzb3I6IFszLCAxXVxuXG4gICAgICBkZXNjcmliZSAnbW92ZS11cC13cmFwJywgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFswLCAxXVxuXG4gICAgICAgIGl0IFwibW92ZSBkb3duIHdpdGggd3Jhd3BcIiwgLT4gZW5zdXJlICdrJywgY3Vyc29yOiBbMywgMV1cbiAgICAgICAgaXQgXCJtb3ZlIGRvd24gd2l0aCB3cmF3cFwiLCAtPiBlbnN1cmUgJzIgaycsIGN1cnNvcjogWzIsIDFdXG4gICAgICAgIGl0IFwibW92ZSBkb3duIHdpdGggd3Jhd3BcIiwgLT4gZW5zdXJlICc0IGsnLCBjdXJzb3I6IFswLCAxXVxuXG5cbiAgICAjIFtOT1RFXSBTZWUgIzU2MFxuICAgICMgVGhpcyBzcGVjIGlzIGludGVuZGVkIHRvIGJlIHVzZWQgaW4gbG9jYWwgdGVzdCwgbm90IGF0IENJIHNlcnZpY2UuXG4gICAgIyBTYWZlIHRvIGV4ZWN1dGUgaWYgaXQgcGFzc2VzLCBidXQgZnJlZXplIGVkaXRvciB3aGVuIGl0IGZhaWwuXG4gICAgIyBTbyBleHBsaWNpdGx5IGRpc2FibGVkIGJlY2F1c2UgSSBkb24ndCB3YW50IGJlIGJhbm5lZCBieSBDSSBzZXJ2aWNlLlxuICAgICMgRW5hYmxlIHRoaXMgb24gZGVtbWFuZCB3aGVuIGZyZWV6aW5nIGhhcHBlbnMgYWdhaW4hXG4gICAgeGRlc2NyaWJlIFwid2l0aCBiaWcgY291bnQgd2FzIGdpdmVuXCIsIC0+XG4gICAgICBCSUdfTlVNQkVSID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJcbiAgICAgIGVuc3VyZUJpZ0NvdW50TW90aW9uID0gKGtleXN0cm9rZXMsIG9wdGlvbnMpIC0+XG4gICAgICAgIGNvdW50ID0gU3RyaW5nKEJJR19OVU1CRVIpLnNwbGl0KCcnKS5qb2luKCcgJylcbiAgICAgICAga2V5c3Ryb2tlcyA9IGtleXN0cm9rZXMuc3BsaXQoJycpLmpvaW4oJyAnKVxuICAgICAgICBlbnN1cmUoXCIje2NvdW50fSAje2tleXN0cm9rZXN9XCIsIG9wdGlvbnMpXG5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgYXRvbS5rZXltYXBzLmFkZCBcInRlc3RcIixcbiAgICAgICAgICAnYXRvbS10ZXh0LWVkaXRvci52aW0tbW9kZS1wbHVzOm5vdCguaW5zZXJ0LW1vZGUpJzpcbiAgICAgICAgICAgICdnIHsnOiAndmltLW1vZGUtcGx1czptb3ZlLXRvLXByZXZpb3VzLWZvbGQtc3RhcnQnXG4gICAgICAgICAgICAnZyB9JzogJ3ZpbS1tb2RlLXBsdXM6bW92ZS10by1uZXh0LWZvbGQtc3RhcnQnXG4gICAgICAgICAgICAnLCBOJzogJ3ZpbS1tb2RlLXBsdXM6bW92ZS10by1wcmV2aW91cy1udW1iZXInXG4gICAgICAgICAgICAnLCBuJzogJ3ZpbS1tb2RlLXBsdXM6bW92ZS10by1uZXh0LW51bWJlcidcbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dDogXCJcIlwiXG4gICAgICAgICAgMDAwMFxuICAgICAgICAgIDExMTFcbiAgICAgICAgICAyMjIyXFxuXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgICAgY3Vyc29yOiBbMSwgMl1cblxuICAgICAgaXQgXCJieSBgamBcIiwgICAtPiBlbnN1cmVCaWdDb3VudE1vdGlvbiAnaicsICAgY3Vyc29yOiBbMiwgMl1cbiAgICAgIGl0IFwiYnkgYGtgXCIsICAgLT4gZW5zdXJlQmlnQ291bnRNb3Rpb24gJ2snLCAgIGN1cnNvcjogWzAsIDJdXG4gICAgICBpdCBcImJ5IGBoYFwiLCAgIC0+IGVuc3VyZUJpZ0NvdW50TW90aW9uICdoJywgICBjdXJzb3I6IFsxLCAwXVxuICAgICAgaXQgXCJieSBgbGBcIiwgICAtPiBlbnN1cmVCaWdDb3VudE1vdGlvbiAnbCcsICAgY3Vyc29yOiBbMSwgM11cbiAgICAgIGl0IFwiYnkgYFtgXCIsICAgLT4gZW5zdXJlQmlnQ291bnRNb3Rpb24gJ1snLCAgIGN1cnNvcjogWzAsIDJdXG4gICAgICBpdCBcImJ5IGBdYFwiLCAgIC0+IGVuc3VyZUJpZ0NvdW50TW90aW9uICddJywgICBjdXJzb3I6IFsyLCAyXVxuICAgICAgaXQgXCJieSBgd2BcIiwgICAtPiBlbnN1cmVCaWdDb3VudE1vdGlvbiAndycsICAgY3Vyc29yOiBbMiwgM11cbiAgICAgIGl0IFwiYnkgYFdgXCIsICAgLT4gZW5zdXJlQmlnQ291bnRNb3Rpb24gJ1cnLCAgIGN1cnNvcjogWzIsIDNdXG4gICAgICBpdCBcImJ5IGBiYFwiLCAgIC0+IGVuc3VyZUJpZ0NvdW50TW90aW9uICdiJywgICBjdXJzb3I6IFswLCAwXVxuICAgICAgaXQgXCJieSBgQmBcIiwgICAtPiBlbnN1cmVCaWdDb3VudE1vdGlvbiAnQicsICAgY3Vyc29yOiBbMCwgMF1cbiAgICAgIGl0IFwiYnkgYGVgXCIsICAgLT4gZW5zdXJlQmlnQ291bnRNb3Rpb24gJ2UnLCAgIGN1cnNvcjogWzIsIDNdXG4gICAgICBpdCBcImJ5IGAoYFwiLCAgIC0+IGVuc3VyZUJpZ0NvdW50TW90aW9uICcoJywgICBjdXJzb3I6IFswLCAwXVxuICAgICAgaXQgXCJieSBgKWBcIiwgICAtPiBlbnN1cmVCaWdDb3VudE1vdGlvbiAnKScsICAgY3Vyc29yOiBbMiwgM11cbiAgICAgIGl0IFwiYnkgYHtgXCIsICAgLT4gZW5zdXJlQmlnQ291bnRNb3Rpb24gJ3snLCAgIGN1cnNvcjogWzAsIDBdXG4gICAgICBpdCBcImJ5IGB9YFwiLCAgIC0+IGVuc3VyZUJpZ0NvdW50TW90aW9uICd9JywgICBjdXJzb3I6IFsyLCAzXVxuICAgICAgaXQgXCJieSBgLWBcIiwgICAtPiBlbnN1cmVCaWdDb3VudE1vdGlvbiAnLScsICAgY3Vyc29yOiBbMCwgMF1cbiAgICAgIGl0IFwiYnkgYF9gXCIsICAgLT4gZW5zdXJlQmlnQ291bnRNb3Rpb24gJ18nLCAgIGN1cnNvcjogWzIsIDBdXG4gICAgICBpdCBcImJ5IGBnIHtgXCIsIC0+IGVuc3VyZUJpZ0NvdW50TW90aW9uICdnIHsnLCBjdXJzb3I6IFsxLCAyXSAjIE5vIGZvbGQgbm8gbW92ZSBidXQgd29uJ3QgZnJlZXplLlxuICAgICAgaXQgXCJieSBgZyB9YFwiLCAtPiBlbnN1cmVCaWdDb3VudE1vdGlvbiAnZyB9JywgY3Vyc29yOiBbMSwgMl0gIyBObyBmb2xkIG5vIG1vdmUgYnV0IHdvbid0IGZyZWV6ZS5cbiAgICAgIGl0IFwiYnkgYCwgTmBcIiwgLT4gZW5zdXJlQmlnQ291bnRNb3Rpb24gJywgTicsIGN1cnNvcjogWzEsIDJdICMgTm8gZ3JhbW1hciwgbm8gbW92ZSBidXQgd29uJ3QgZnJlZXplLlxuICAgICAgaXQgXCJieSBgLCBuYFwiLCAtPiBlbnN1cmVCaWdDb3VudE1vdGlvbiAnLCBuJywgY3Vyc29yOiBbMSwgMl0gIyBObyBncmFtbWFyLCBubyBtb3ZlIGJ1dCB3b24ndCBmcmVlemUuXG4gICAgICBpdCBcImJ5IGB5IHlgXCIsIC0+IGVuc3VyZUJpZ0NvdW50TW90aW9uICd5IHknLCBjdXJzb3I6IFsxLCAyXVxuXG4gICAgZGVzY3JpYmUgXCJ0aGUgayBrZXliaW5kaW5nXCIsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFsyLCAxXVxuXG4gICAgICBpdCBcIm1vdmVzIHRoZSBjdXJzb3IgdXBcIiwgLT5cbiAgICAgICAgZW5zdXJlICdrJywgY3Vyc29yOiBbMSwgMV1cblxuICAgICAgaXQgXCJtb3ZlcyB0aGUgY3Vyc29yIHVwIGFuZCByZW1lbWJlciBjb2x1bW4gaXQgd2FzIGluXCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFsyLCA0XVxuICAgICAgICBlbnN1cmUgJ2snLCBjdXJzb3I6IFsxLCAzXVxuICAgICAgICBlbnN1cmUgJ2snLCBjdXJzb3I6IFswLCA0XVxuXG4gICAgICBpdCBcIm1vdmVzIHRoZSBjdXJzb3IgdXAsIGJ1dCBub3QgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgZmlyc3QgbGluZVwiLCAtPlxuICAgICAgICBlbnN1cmUgJzEgMCBrJywgY3Vyc29yOiBbMCwgMV1cblxuICAgICAgZGVzY3JpYmUgXCJ3aGVuIHZpc3VhbCBtb2RlXCIsIC0+XG4gICAgICAgIGl0IFwia2VlcCBzYW1lIGNvbHVtbihnb2FsQ29sdW1uKSBldmVuIGFmdGVyIGFjcm9zcyB0aGUgZW1wdHkgbGluZVwiLCAtPlxuICAgICAgICAgIHNldFxuICAgICAgICAgICAgdGV4dDogXCJcIlwiXG4gICAgICAgICAgICAgIGFiY2RlZmdcblxuICAgICAgICAgICAgICBhYmNkZWZnXG4gICAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgICAgY3Vyc29yOiBbMiwgM11cbiAgICAgICAgICBlbnN1cmUgJ3YnLCBjdXJzb3I6IFsyLCA0XSwgc2VsZWN0ZWRUZXh0OiAnZCdcbiAgICAgICAgICBlbnN1cmUgJ2sgaycsIGN1cnNvcjogWzAsIDNdLCBzZWxlY3RlZFRleHQ6IFwiZGVmZ1xcblxcbmFiY2RcIlxuXG4gICAgZGVzY3JpYmUgXCJ0aGUgaiwgayBrZXliaW5kaW5nIGluIGhhcmRUYWIgdGV4dFwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBqYXNtaW5lLmF0dGFjaFRvRE9NKGF0b20ud29ya3NwYWNlLmdldEVsZW1lbnQoKSlcblxuICAgICAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgICAgICBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZSgnbGFuZ3VhZ2UtZ28nKVxuXG4gICAgICAgIGdldFZpbVN0YXRlIChzdGF0ZSwgdmltRWRpdG9yKSAtPlxuICAgICAgICAgIHtlZGl0b3IsIGVkaXRvckVsZW1lbnR9ID0gc3RhdGVcbiAgICAgICAgICB7c2V0LCBlbnN1cmV9ID0gdmltRWRpdG9yXG5cbiAgICAgICAgcnVucyAtPlxuICAgICAgICAgIHNldFxuICAgICAgICAgICAgZ3JhbW1hcjogJ3NvdXJjZS5nbydcbiAgICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAgIHBhY2thfGdlIG1haW5cblxuICAgICAgICAgICAgaW1wb3J0IFwiZm10XCJcblxuICAgICAgICAgICAgZnVuYyBtYWluKCkge1xuICAgICAgICAgICAgXFx0aWYgNyUyID09IDAge1xuICAgICAgICAgICAgXFx0XFx0Zm10LlByaW50bG4oXCI3IGlzIGV2ZW5cIilcbiAgICAgICAgICAgIFxcdH0gZWxzZSB7XG4gICAgICAgICAgICBcXHRcXHRmbXQuUHJpbnRsbihcIjcgaXMgb2RkXCIpXG4gICAgICAgICAgICBcXHR9XG4gICAgICAgICAgICB9XFxuXG4gICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgICBlZGl0b3Iuc2V0U29mdFRhYnMoZmFsc2UpICMgRklYTUVcblxuICAgICAgaXQgXCJbdGFiTGVuZ3RoID0gMl0gbW92ZSB1cC9kb3duIGJ1ZmZlclJvdyB3aXNlIHdpdGggYXdhcmUgb2YgdGFiTGVuZ3RoXCIsIC0+XG4gICAgICAgIGVkaXRvci51cGRhdGUodGFiTGVuZ3RoOiAyKVxuXG4gICAgICAgIGVuc3VyZSAnaicsIGN1cnNvcjogWzEsIDBdLCBjdXJzb3JTY3JlZW46IFsxLCAwXVxuICAgICAgICBlbnN1cmUgJ2onLCBjdXJzb3I6IFsyLCA1XSwgY3Vyc29yU2NyZWVuOiBbMiwgNV1cbiAgICAgICAgZW5zdXJlICdqJywgY3Vyc29yOiBbMywgMF0sIGN1cnNvclNjcmVlbjogWzMsIDBdXG4gICAgICAgIGVuc3VyZSAnaicsIGN1cnNvcjogWzQsIDVdLCBjdXJzb3JTY3JlZW46IFs0LCA1XVxuICAgICAgICBlbnN1cmUgJ2onLCBjdXJzb3I6IFs1LCA0XSwgY3Vyc29yU2NyZWVuOiBbNSwgNV1cbiAgICAgICAgZW5zdXJlICdqJywgY3Vyc29yOiBbNiwgM10sIGN1cnNvclNjcmVlbjogWzYsIDVdXG4gICAgICAgIGVuc3VyZSAnaicsIGN1cnNvcjogWzcsIDRdLCBjdXJzb3JTY3JlZW46IFs3LCA1XVxuICAgICAgICBlbnN1cmUgJ2onLCBjdXJzb3I6IFs4LCAzXSwgY3Vyc29yU2NyZWVuOiBbOCwgNV1cbiAgICAgICAgZW5zdXJlICdqJywgY3Vyc29yOiBbOSwgMV0sIGN1cnNvclNjcmVlbjogWzksIDJdXG4gICAgICAgIGVuc3VyZSAnaicsIGN1cnNvcjogWzEwLCAwXSwgY3Vyc29yU2NyZWVuOiBbMTAsIDBdXG4gICAgICAgIGVuc3VyZSAnaycsIGN1cnNvcjogWzksIDFdLCBjdXJzb3JTY3JlZW46IFs5LCAyXVxuICAgICAgICBlbnN1cmUgJ2snLCBjdXJzb3I6IFs4LCAzXSwgY3Vyc29yU2NyZWVuOiBbOCwgNV1cbiAgICAgICAgZW5zdXJlICdrJywgY3Vyc29yOiBbNywgNF0sIGN1cnNvclNjcmVlbjogWzcsIDVdXG4gICAgICAgIGVuc3VyZSAnaycsIGN1cnNvcjogWzYsIDNdLCBjdXJzb3JTY3JlZW46IFs2LCA1XVxuICAgICAgICBlbnN1cmUgJ2snLCBjdXJzb3I6IFs1LCA0XSwgY3Vyc29yU2NyZWVuOiBbNSwgNV1cbiAgICAgICAgZW5zdXJlICdrJywgY3Vyc29yOiBbNCwgNV0sIGN1cnNvclNjcmVlbjogWzQsIDVdXG4gICAgICAgIGVuc3VyZSAnaycsIGN1cnNvcjogWzMsIDBdLCBjdXJzb3JTY3JlZW46IFszLCAwXVxuICAgICAgICBlbnN1cmUgJ2snLCBjdXJzb3I6IFsyLCA1XSwgY3Vyc29yU2NyZWVuOiBbMiwgNV1cbiAgICAgICAgZW5zdXJlICdrJywgY3Vyc29yOiBbMSwgMF0sIGN1cnNvclNjcmVlbjogWzEsIDBdXG4gICAgICAgIGVuc3VyZSAnaycsIGN1cnNvcjogWzAsIDVdLCBjdXJzb3JTY3JlZW46IFswLCA1XVxuXG4gICAgICBpdCBcIlt0YWJMZW5ndGggPSA0XSBtb3ZlIHVwL2Rvd24gYnVmZmVyUm93IHdpc2Ugd2l0aCBhd2FyZSBvZiB0YWJMZW5ndGhcIiwgLT5cbiAgICAgICAgZWRpdG9yLnVwZGF0ZSh0YWJMZW5ndGg6IDQpXG5cbiAgICAgICAgZW5zdXJlICdqJywgY3Vyc29yOiBbMSwgMF0sIGN1cnNvclNjcmVlbjogWzEsIDBdXG4gICAgICAgIGVuc3VyZSAnaicsIGN1cnNvcjogWzIsIDVdLCBjdXJzb3JTY3JlZW46IFsyLCA1XVxuICAgICAgICBlbnN1cmUgJ2onLCBjdXJzb3I6IFszLCAwXSwgY3Vyc29yU2NyZWVuOiBbMywgMF1cbiAgICAgICAgZW5zdXJlICdqJywgY3Vyc29yOiBbNCwgNV0sIGN1cnNvclNjcmVlbjogWzQsIDVdXG4gICAgICAgIGVuc3VyZSAnaicsIGN1cnNvcjogWzUsIDJdLCBjdXJzb3JTY3JlZW46IFs1LCA1XVxuICAgICAgICBlbnN1cmUgJ2onLCBjdXJzb3I6IFs2LCAxXSwgY3Vyc29yU2NyZWVuOiBbNiwgNF1cbiAgICAgICAgZW5zdXJlICdqJywgY3Vyc29yOiBbNywgMl0sIGN1cnNvclNjcmVlbjogWzcsIDVdXG4gICAgICAgIGVuc3VyZSAnaicsIGN1cnNvcjogWzgsIDFdLCBjdXJzb3JTY3JlZW46IFs4LCA0XVxuICAgICAgICBlbnN1cmUgJ2onLCBjdXJzb3I6IFs5LCAxXSwgY3Vyc29yU2NyZWVuOiBbOSwgNF1cbiAgICAgICAgZW5zdXJlICdqJywgY3Vyc29yOiBbMTAsIDBdLCBjdXJzb3JTY3JlZW46IFsxMCwgMF1cbiAgICAgICAgZW5zdXJlICdrJywgY3Vyc29yOiBbOSwgMV0sIGN1cnNvclNjcmVlbjogWzksIDRdXG4gICAgICAgIGVuc3VyZSAnaycsIGN1cnNvcjogWzgsIDFdLCBjdXJzb3JTY3JlZW46IFs4LCA0XVxuICAgICAgICBlbnN1cmUgJ2snLCBjdXJzb3I6IFs3LCAyXSwgY3Vyc29yU2NyZWVuOiBbNywgNV1cbiAgICAgICAgZW5zdXJlICdrJywgY3Vyc29yOiBbNiwgMV0sIGN1cnNvclNjcmVlbjogWzYsIDRdXG4gICAgICAgIGVuc3VyZSAnaycsIGN1cnNvcjogWzUsIDJdLCBjdXJzb3JTY3JlZW46IFs1LCA1XVxuICAgICAgICBlbnN1cmUgJ2snLCBjdXJzb3I6IFs0LCA1XSwgY3Vyc29yU2NyZWVuOiBbNCwgNV1cbiAgICAgICAgZW5zdXJlICdrJywgY3Vyc29yOiBbMywgMF0sIGN1cnNvclNjcmVlbjogWzMsIDBdXG4gICAgICAgIGVuc3VyZSAnaycsIGN1cnNvcjogWzIsIDVdLCBjdXJzb3JTY3JlZW46IFsyLCA1XVxuICAgICAgICBlbnN1cmUgJ2snLCBjdXJzb3I6IFsxLCAwXSwgY3Vyc29yU2NyZWVuOiBbMSwgMF1cbiAgICAgICAgZW5zdXJlICdrJywgY3Vyc29yOiBbMCwgNV0sIGN1cnNvclNjcmVlbjogWzAsIDVdXG5cbiAgICAgIGl0IFwiW3RhYkxlbmd0aCA9IDhdIG1vdmUgdXAvZG93biBidWZmZXJSb3cgd2lzZSB3aXRoIGF3YXJlIG9mIHRhYkxlbmd0aFwiLCAtPlxuICAgICAgICBlZGl0b3IudXBkYXRlKHRhYkxlbmd0aDogOClcbiAgICAgICAgc2V0IGN1cnNvcjogWzUsIDldXG5cbiAgICAgICAgZW5zdXJlICdqJywgY3Vyc29yOiBbNiwgMl0sIGN1cnNvclNjcmVlbjogWzYsIDE2XVxuICAgICAgICBlbnN1cmUgJ2onLCBjdXJzb3I6IFs3LCA4XSwgY3Vyc29yU2NyZWVuOiBbNywgMTVdXG4gICAgICAgIGVuc3VyZSAnaicsIGN1cnNvcjogWzgsIDJdLCBjdXJzb3JTY3JlZW46IFs4LCAxNl1cbiAgICAgICAgZW5zdXJlICdqJywgY3Vyc29yOiBbOSwgMV0sIGN1cnNvclNjcmVlbjogWzksIDhdXG4gICAgICAgIGVuc3VyZSAnaicsIGN1cnNvcjogWzEwLCAwXSwgY3Vyc29yU2NyZWVuOiBbMTAsIDBdXG4gICAgICAgIGVuc3VyZSAnaycsIGN1cnNvcjogWzksIDFdLCBjdXJzb3JTY3JlZW46IFs5LCA4XVxuICAgICAgICBlbnN1cmUgJ2snLCBjdXJzb3I6IFs4LCAyXSwgY3Vyc29yU2NyZWVuOiBbOCwgMTZdXG4gICAgICAgIGVuc3VyZSAnaycsIGN1cnNvcjogWzcsIDhdLCBjdXJzb3JTY3JlZW46IFs3LCAxNV1cbiAgICAgICAgZW5zdXJlICdrJywgY3Vyc29yOiBbNiwgMl0sIGN1cnNvclNjcmVlbjogWzYsIDE2XVxuXG4gICAgZGVzY3JpYmUgXCJnaiBnayBpbiBzb2Z0d3JhcFwiLCAtPlxuICAgICAgW3RleHRdID0gW11cblxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBlZGl0b3Iuc2V0U29mdFdyYXBwZWQodHJ1ZSlcbiAgICAgICAgZWRpdG9yLnNldEVkaXRvcldpZHRoSW5DaGFycygxMClcbiAgICAgICAgZWRpdG9yLnNldERlZmF1bHRDaGFyV2lkdGgoMSlcbiAgICAgICAgdGV4dCA9IG5ldyBUZXh0RGF0YSBcIlwiXCJcbiAgICAgICAgICAxc3QgbGluZSBvZiBidWZmZXJcbiAgICAgICAgICAybmQgbGluZSBvZiBidWZmZXIsIFZlcnkgbG9uZyBsaW5lXG4gICAgICAgICAgM3JkIGxpbmUgb2YgYnVmZmVyXG5cbiAgICAgICAgICA1dGggbGluZSBvZiBidWZmZXJcXG5cbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgc2V0IHRleHQ6IHRleHQuZ2V0UmF3KCksIGN1cnNvcjogWzAsIDBdXG5cbiAgICAgIGRlc2NyaWJlIFwic2VsZWN0aW9uIGlzIG5vdCByZXZlcnNlZFwiLCAtPlxuICAgICAgICBpdCBcInNjcmVlbiBwb3NpdGlvbiBhbmQgYnVmZmVyIHBvc2l0aW9uIGlzIGRpZmZlcmVudFwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnZyBqJywgY3Vyc29yU2NyZWVuOiBbMSwgMF0sIGN1cnNvcjogWzAsIDldXG4gICAgICAgICAgZW5zdXJlICdnIGonLCBjdXJzb3JTY3JlZW46IFsyLCAwXSwgY3Vyc29yOiBbMSwgMF1cbiAgICAgICAgICBlbnN1cmUgJ2cgaicsIGN1cnNvclNjcmVlbjogWzMsIDBdLCBjdXJzb3I6IFsxLCA5XVxuICAgICAgICAgIGVuc3VyZSAnZyBqJywgY3Vyc29yU2NyZWVuOiBbNCwgMF0sIGN1cnNvcjogWzEsIDEyXVxuXG4gICAgICAgIGl0IFwiamsgbW92ZSBzZWxlY3Rpb24gYnVmZmVyLWxpbmUgd2lzZVwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnVicsIHNlbGVjdGVkVGV4dDogdGV4dC5nZXRMaW5lcyhbMC4uMF0pXG4gICAgICAgICAgZW5zdXJlICdqJywgc2VsZWN0ZWRUZXh0OiB0ZXh0LmdldExpbmVzKFswLi4xXSlcbiAgICAgICAgICBlbnN1cmUgJ2onLCBzZWxlY3RlZFRleHQ6IHRleHQuZ2V0TGluZXMoWzAuLjJdKVxuICAgICAgICAgIGVuc3VyZSAnaicsIHNlbGVjdGVkVGV4dDogdGV4dC5nZXRMaW5lcyhbMC4uM10pXG4gICAgICAgICAgZW5zdXJlICdqJywgc2VsZWN0ZWRUZXh0OiB0ZXh0LmdldExpbmVzKFswLi40XSlcbiAgICAgICAgICBlbnN1cmUgJ2snLCBzZWxlY3RlZFRleHQ6IHRleHQuZ2V0TGluZXMoWzAuLjNdKVxuICAgICAgICAgIGVuc3VyZSAnaycsIHNlbGVjdGVkVGV4dDogdGV4dC5nZXRMaW5lcyhbMC4uMl0pXG4gICAgICAgICAgZW5zdXJlICdrJywgc2VsZWN0ZWRUZXh0OiB0ZXh0LmdldExpbmVzKFswLi4xXSlcbiAgICAgICAgICBlbnN1cmUgJ2snLCBzZWxlY3RlZFRleHQ6IHRleHQuZ2V0TGluZXMoWzAuLjBdKVxuICAgICAgICAgIGVuc3VyZSAnaycsIHNlbGVjdGVkVGV4dDogdGV4dC5nZXRMaW5lcyhbMC4uMF0pICMgZG8gbm90aGluZ1xuXG4gICAgICBkZXNjcmliZSBcInNlbGVjdGlvbiBpcyByZXZlcnNlZFwiLCAtPlxuICAgICAgICBpdCBcInNjcmVlbiBwb3NpdGlvbiBhbmQgYnVmZmVyIHBvc2l0aW9uIGlzIGRpZmZlcmVudFwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnZyBqJywgY3Vyc29yU2NyZWVuOiBbMSwgMF0sIGN1cnNvcjogWzAsIDldXG4gICAgICAgICAgZW5zdXJlICdnIGonLCBjdXJzb3JTY3JlZW46IFsyLCAwXSwgY3Vyc29yOiBbMSwgMF1cbiAgICAgICAgICBlbnN1cmUgJ2cgaicsIGN1cnNvclNjcmVlbjogWzMsIDBdLCBjdXJzb3I6IFsxLCA5XVxuICAgICAgICAgIGVuc3VyZSAnZyBqJywgY3Vyc29yU2NyZWVuOiBbNCwgMF0sIGN1cnNvcjogWzEsIDEyXVxuXG4gICAgICAgIGl0IFwiamsgbW92ZSBzZWxlY3Rpb24gYnVmZmVyLWxpbmUgd2lzZVwiLCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFs0LCAwXVxuICAgICAgICAgIGVuc3VyZSAnVicsIHNlbGVjdGVkVGV4dDogdGV4dC5nZXRMaW5lcyhbNC4uNF0pXG4gICAgICAgICAgZW5zdXJlICdrJywgc2VsZWN0ZWRUZXh0OiB0ZXh0LmdldExpbmVzKFszLi40XSlcbiAgICAgICAgICBlbnN1cmUgJ2snLCBzZWxlY3RlZFRleHQ6IHRleHQuZ2V0TGluZXMoWzIuLjRdKVxuICAgICAgICAgIGVuc3VyZSAnaycsIHNlbGVjdGVkVGV4dDogdGV4dC5nZXRMaW5lcyhbMS4uNF0pXG4gICAgICAgICAgZW5zdXJlICdrJywgc2VsZWN0ZWRUZXh0OiB0ZXh0LmdldExpbmVzKFswLi40XSlcbiAgICAgICAgICBlbnN1cmUgJ2onLCBzZWxlY3RlZFRleHQ6IHRleHQuZ2V0TGluZXMoWzEuLjRdKVxuICAgICAgICAgIGVuc3VyZSAnaicsIHNlbGVjdGVkVGV4dDogdGV4dC5nZXRMaW5lcyhbMi4uNF0pXG4gICAgICAgICAgZW5zdXJlICdqJywgc2VsZWN0ZWRUZXh0OiB0ZXh0LmdldExpbmVzKFszLi40XSlcbiAgICAgICAgICBlbnN1cmUgJ2onLCBzZWxlY3RlZFRleHQ6IHRleHQuZ2V0TGluZXMoWzQuLjRdKVxuICAgICAgICAgIGVuc3VyZSAnaicsIHNlbGVjdGVkVGV4dDogdGV4dC5nZXRMaW5lcyhbNC4uNF0pICMgZG8gbm90aGluZ1xuXG4gICAgZGVzY3JpYmUgXCJ0aGUgbCBrZXliaW5kaW5nXCIsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAwOiBhYWFhXG4gICAgICAgICAgMTogYmJiYlxuICAgICAgICAgIDI6IGNjY2NcblxuICAgICAgICAgIDQ6XFxuXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgIHNldCBjdXJzb3I6IFsxLCAyXVxuXG4gICAgICBkZXNjcmliZSBcIndoZW4gd3JhcExlZnRSaWdodE1vdGlvbiA9IGZhbHNlKD1kZWZhdWx0KVwiLCAtPlxuICAgICAgICBpdCBcIltub3JtYWxdIG1vdmUgdG8gcmlnaHQsIGNvdW50IHN1cHBvcnQsIGJ1dCBub3Qgd3JhcCB0byBuZXh0LWxpbmVcIiwgLT5cbiAgICAgICAgICBzZXQgY3Vyc29yOiBbMCwgMF1cbiAgICAgICAgICBlbnN1cmUgJ2wnLCBjdXJzb3I6IFswLCAxXVxuICAgICAgICAgIGVuc3VyZSAnbCcsIGN1cnNvcjogWzAsIDJdXG4gICAgICAgICAgZW5zdXJlICcyIGwnLCBjdXJzb3I6IFswLCA0XVxuICAgICAgICAgIGVuc3VyZSAnNSBsJywgY3Vyc29yOiBbMCwgNl1cbiAgICAgICAgICBlbnN1cmUgJ2wnLCBjdXJzb3I6IFswLCA2XSAjIG5vIHdyYXBcbiAgICAgICAgaXQgXCJbbm9ybWFsOiBhdC1ibGFuay1yb3ddIG5vdCB3cmFwIHRvIG5leHQgbGluZVwiLCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFszLCAwXVxuICAgICAgICAgIGVuc3VyZSAnbCcsIGN1cnNvcjogWzMsIDBdLCBtb2RlOiBcIm5vcm1hbFwiXG4gICAgICAgIGl0IFwiW3Zpc3VhbDogYXQtbGFzdC1jaGFyXSBjYW4gc2VsZWN0IG5ld2xpbmUgYnV0IG5vdCB3cmFwIHRvIG5leHQtbGluZVwiLCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFswLCA2XVxuICAgICAgICAgIGVuc3VyZSBcInZcIiwgc2VsZWN0ZWRUZXh0OiBcImFcIiwgbW9kZTogWyd2aXN1YWwnLCAnY2hhcmFjdGVyd2lzZSddLCBjdXJzb3I6IFswLCA3XVxuICAgICAgICAgIGV4cGVjdChlZGl0b3IuZ2V0TGFzdEN1cnNvcigpLmlzQXRFbmRPZkxpbmUoKSkudG9CZSh0cnVlKVxuICAgICAgICAgIGVuc3VyZSBcImxcIiwgc2VsZWN0ZWRUZXh0OiBcImFcXG5cIiwgbW9kZTogWyd2aXN1YWwnLCAnY2hhcmFjdGVyd2lzZSddLCBjdXJzb3I6IFsxLCAwXVxuICAgICAgICAgIGVuc3VyZSBcImxcIiwgc2VsZWN0ZWRUZXh0OiBcImFcXG5cIiwgbW9kZTogWyd2aXN1YWwnLCAnY2hhcmFjdGVyd2lzZSddLCBjdXJzb3I6IFsxLCAwXVxuICAgICAgICBpdCBcIlt2aXN1YWw6IGF0LWJsYW5rLXJvd10gY2FuIHNlbGVjdCBuZXdsaW5lIGJ1dCBub3Qgd3JhcCB0byBuZXh0LWxpbmVcIiwgLT5cbiAgICAgICAgICBzZXQgY3Vyc29yOiBbMywgMF1cbiAgICAgICAgICBlbnN1cmUgXCJ2XCIsIHNlbGVjdGVkVGV4dDogXCJcXG5cIiwgbW9kZTogWyd2aXN1YWwnLCAnY2hhcmFjdGVyd2lzZSddLCBjdXJzb3I6IFs0LCAwXVxuICAgICAgICAgIGVuc3VyZSBcImxcIiwgc2VsZWN0ZWRUZXh0OiBcIlxcblwiLCBtb2RlOiBbJ3Zpc3VhbCcsICdjaGFyYWN0ZXJ3aXNlJ10sIGN1cnNvcjogWzQsIDBdXG5cbiAgICAgIGRlc2NyaWJlIFwid2hlbiB3cmFwTGVmdFJpZ2h0TW90aW9uID0gdHJ1ZVwiLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgc2V0dGluZ3Muc2V0KCd3cmFwTGVmdFJpZ2h0TW90aW9uJywgdHJ1ZSlcblxuICAgICAgICBpdCBcIltub3JtYWw6IGF0LWxhc3QtY2hhcl0gbW92ZXMgdGhlIGN1cnNvciB0byB0aGUgbmV4dCBsaW5lXCIsIC0+XG4gICAgICAgICAgc2V0IGN1cnNvcjogWzAsIDZdXG4gICAgICAgICAgZW5zdXJlICdsJywgY3Vyc29yOiBbMSwgMF0sIG1vZGU6IFwibm9ybWFsXCJcbiAgICAgICAgaXQgXCJbbm9ybWFsOiBhdC1ibGFuay1yb3ddIHdyYXAgdG8gbmV4dCBsaW5lXCIsIC0+XG4gICAgICAgICAgc2V0IGN1cnNvcjogWzMsIDBdXG4gICAgICAgICAgZW5zdXJlICdsJywgY3Vyc29yOiBbNCwgMF0sIG1vZGU6IFwibm9ybWFsXCJcbiAgICAgICAgaXQgXCJbdmlzdWFsOiBhdC1sYXN0LWNoYXJdIHNlbGVjdCBuZXdsaW5lIHRoZW4gbW92ZSB0byBuZXh0LWxpbmVcIiwgLT5cbiAgICAgICAgICBzZXQgY3Vyc29yOiBbMCwgNl1cbiAgICAgICAgICBlbnN1cmUgXCJ2XCIsIHNlbGVjdGVkVGV4dDogXCJhXCIsIG1vZGU6IFsndmlzdWFsJywgJ2NoYXJhY3Rlcndpc2UnXSwgY3Vyc29yOiBbMCwgN11cbiAgICAgICAgICBleHBlY3QoZWRpdG9yLmdldExhc3RDdXJzb3IoKS5pc0F0RW5kT2ZMaW5lKCkpLnRvQmUodHJ1ZSlcbiAgICAgICAgICBlbnN1cmUgXCJsXCIsIHNlbGVjdGVkVGV4dDogXCJhXFxuXCIsIG1vZGU6IFsndmlzdWFsJywgJ2NoYXJhY3Rlcndpc2UnXSwgY3Vyc29yOiBbMSwgMF1cbiAgICAgICAgICBlbnN1cmUgXCJsXCIsIHNlbGVjdGVkVGV4dDogXCJhXFxuMVwiLCBtb2RlOiBbJ3Zpc3VhbCcsICdjaGFyYWN0ZXJ3aXNlJ10sIGN1cnNvcjogWzEsIDFdXG4gICAgICAgIGl0IFwiW3Zpc3VhbDogYXQtYmxhbmstcm93XSBtb3ZlIHRvIG5leHQtbGluZVwiLCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFszLCAwXVxuICAgICAgICAgIGVuc3VyZSBcInZcIiwgc2VsZWN0ZWRUZXh0OiBcIlxcblwiLCBtb2RlOiBbJ3Zpc3VhbCcsICdjaGFyYWN0ZXJ3aXNlJ10sIGN1cnNvcjogWzQsIDBdXG4gICAgICAgICAgZW5zdXJlIFwibFwiLCBzZWxlY3RlZFRleHQ6IFwiXFxuNFwiLCBtb2RlOiBbJ3Zpc3VhbCcsICdjaGFyYWN0ZXJ3aXNlJ10sIGN1cnNvcjogWzQsIDFdXG5cbiAgICBkZXNjcmliZSBcIm1vdmUtKHVwL2Rvd24pLXRvLWVkZ2VcIiwgLT5cbiAgICAgIHRleHQgPSBudWxsXG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHRleHQgPSBuZXcgVGV4dERhdGEgXCJcIlwiXG4gICAgICAgICAgMDogIDQgNjcgIDAxMjM0NTY3ODkwMTIzNDU2Nzg5XG4gICAgICAgICAgMTogICAgICAgICAxMjM0NTY3ODkwMTIzNDU2Nzg5XG4gICAgICAgICAgMjogICAgNiA4OTAgICAgICAgICAwMTIzNDU2Nzg5XG4gICAgICAgICAgMzogICAgNiA4OTAgICAgICAgICAwMTIzNDU2Nzg5XG4gICAgICAgICAgNDogICA1NiA4OTAgICAgICAgICAwMTIzNDU2Nzg5XG4gICAgICAgICAgNTogICAgICAgICAgICAgICAgICAwMTIzNDU2Nzg5XG4gICAgICAgICAgNjogICAgICAgICAgICAgICAgICAwMTIzNDU2Nzg5XG4gICAgICAgICAgNzogIDQgNjcgICAgICAgICAgICAwMTIzNDU2Nzg5XFxuXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgIHNldCB0ZXh0OiB0ZXh0LmdldFJhdygpLCBjdXJzb3I6IFs0LCAzXVxuXG4gICAgICBkZXNjcmliZSBcImVkZ2VuZXNzIG9mIGZpcnN0LWxpbmUgYW5kIGxhc3QtbGluZVwiLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgc2V0XG4gICAgICAgICAgICB0ZXh0XzogXCJcIlwiXG4gICAgICAgICAgICBfX19fdGhpcyBpcyBsaW5lIDBcbiAgICAgICAgICAgIF9fX190aGlzIGlzIHRleHQgb2YgbGluZSAxXG4gICAgICAgICAgICBfX19fdGhpcyBpcyB0ZXh0IG9mIGxpbmUgMlxuICAgICAgICAgICAgX19fX19faGVsbG8gbGluZSAzXG4gICAgICAgICAgICBfX19fX19oZWxsbyBsaW5lIDRcbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgICAgY3Vyc29yOiBbMiwgMl1cblxuICAgICAgICBkZXNjcmliZSBcIndoZW4gY29sdW1uIGlzIGxlYWRpbmcgc3BhY2VzXCIsIC0+XG4gICAgICAgICAgaXQgXCJtb3ZlIGN1cnNvciBpZiBpdCdzIHN0b3BwYWJsZVwiLCAtPlxuICAgICAgICAgICAgZW5zdXJlICdbJywgY3Vyc29yOiBbMCwgMl1cbiAgICAgICAgICAgIGVuc3VyZSAnXScsIGN1cnNvcjogWzQsIDJdXG5cbiAgICAgICAgICBpdCBcImRvZXNuJ3QgbW92ZSBjdXJzb3IgaWYgaXQncyBOT1Qgc3RvcHBhYmxlXCIsIC0+XG4gICAgICAgICAgICBzZXRcbiAgICAgICAgICAgICAgdGV4dF86IFwiXCJcIlxuICAgICAgICAgICAgICBfX1xuICAgICAgICAgICAgICBfX19fdGhpcyBpcyB0ZXh0IG9mIGxpbmUgMVxuICAgICAgICAgICAgICBfX19fdGhpcyBpcyB0ZXh0IG9mIGxpbmUgMlxuICAgICAgICAgICAgICBfX19fX19oZWxsbyBsaW5lIDNcbiAgICAgICAgICAgICAgX19fX19faGVsbG8gbGluZSA0XG4gICAgICAgICAgICAgIF9fXG4gICAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgICAgICBjdXJzb3I6IFsyLCAyXVxuICAgICAgICAgICAgZW5zdXJlICdbJywgY3Vyc29yOiBbMiwgMl1cbiAgICAgICAgICAgIGVuc3VyZSAnXScsIGN1cnNvcjogWzIsIDJdXG5cbiAgICAgICAgZGVzY3JpYmUgXCJ3aGVuIGNvbHVtbiBpcyB0cmFpbGluZyBzcGFjZXNcIiwgLT5cbiAgICAgICAgICBpdCBcImRvZXNuJ3QgbW92ZSBjdXJzb3JcIiwgLT5cbiAgICAgICAgICAgIHNldCBjdXJzb3I6IFsxLCAyMF1cbiAgICAgICAgICAgIGVuc3VyZSAnXScsIGN1cnNvcjogWzIsIDIwXVxuICAgICAgICAgICAgZW5zdXJlICddJywgY3Vyc29yOiBbMiwgMjBdXG4gICAgICAgICAgICBlbnN1cmUgJ1snLCBjdXJzb3I6IFsxLCAyMF1cbiAgICAgICAgICAgIGVuc3VyZSAnWycsIGN1cnNvcjogWzEsIDIwXVxuXG4gICAgICBpdCBcIm1vdmUgdG8gbm9uLWJsYW5rLWNoYXIgb24gYm90aCBmaXJzdCBhbmQgbGFzdCByb3dcIiwgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzQsIDRdXG4gICAgICAgIGVuc3VyZSAnWycsIGN1cnNvcjogWzAsIDRdXG4gICAgICAgIGVuc3VyZSAnXScsIGN1cnNvcjogWzcsIDRdXG4gICAgICBpdCBcIm1vdmUgdG8gd2hpdGUgc3BhY2UgY2hhciB3aGVuIGJvdGggc2lkZSBjb2x1bW4gaXMgbm9uLWJsYW5rIGNoYXJcIiwgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzQsIDVdXG4gICAgICAgIGVuc3VyZSAnWycsIGN1cnNvcjogWzAsIDVdXG4gICAgICAgIGVuc3VyZSAnXScsIGN1cnNvcjogWzQsIDVdXG4gICAgICAgIGVuc3VyZSAnXScsIGN1cnNvcjogWzcsIDVdXG4gICAgICBpdCBcIm9ubHkgc3RvcHMgb24gcm93IG9uZSBvZiBbZmlyc3Qgcm93LCBsYXN0IHJvdywgdXAtb3ItZG93bi1yb3cgaXMgYmxhbmtdIGNhc2UtMVwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbNCwgNl1cbiAgICAgICAgZW5zdXJlICdbJywgY3Vyc29yOiBbMiwgNl1cbiAgICAgICAgZW5zdXJlICdbJywgY3Vyc29yOiBbMCwgNl1cbiAgICAgICAgZW5zdXJlICddJywgY3Vyc29yOiBbMiwgNl1cbiAgICAgICAgZW5zdXJlICddJywgY3Vyc29yOiBbNCwgNl1cbiAgICAgICAgZW5zdXJlICddJywgY3Vyc29yOiBbNywgNl1cbiAgICAgIGl0IFwib25seSBzdG9wcyBvbiByb3cgb25lIG9mIFtmaXJzdCByb3csIGxhc3Qgcm93LCB1cC1vci1kb3duLXJvdyBpcyBibGFua10gY2FzZS0yXCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFs0LCA3XVxuICAgICAgICBlbnN1cmUgJ1snLCBjdXJzb3I6IFsyLCA3XVxuICAgICAgICBlbnN1cmUgJ1snLCBjdXJzb3I6IFswLCA3XVxuICAgICAgICBlbnN1cmUgJ10nLCBjdXJzb3I6IFsyLCA3XVxuICAgICAgICBlbnN1cmUgJ10nLCBjdXJzb3I6IFs0LCA3XVxuICAgICAgICBlbnN1cmUgJ10nLCBjdXJzb3I6IFs3LCA3XVxuICAgICAgaXQgXCJzdXBwb3J0IGNvdW50XCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFs0LCA2XVxuICAgICAgICBlbnN1cmUgJzIgWycsIGN1cnNvcjogWzAsIDZdXG4gICAgICAgIGVuc3VyZSAnMyBdJywgY3Vyc29yOiBbNywgNl1cblxuICAgICAgZGVzY3JpYmUgJ2VkaXRvciBmb3IgaGFyZFRhYicsIC0+XG4gICAgICAgIHBhY2sgPSAnbGFuZ3VhZ2UtZ28nXG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgICAgICAgIGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKHBhY2spXG5cbiAgICAgICAgICBnZXRWaW1TdGF0ZSAnc2FtcGxlLmdvJywgKHN0YXRlLCB2aW1FZGl0b3IpIC0+XG4gICAgICAgICAgICB7ZWRpdG9yLCBlZGl0b3JFbGVtZW50fSA9IHN0YXRlXG4gICAgICAgICAgICB7c2V0LCBlbnN1cmV9ID0gdmltRWRpdG9yXG5cbiAgICAgICAgICBydW5zIC0+XG4gICAgICAgICAgICBzZXQgY3Vyc29yU2NyZWVuOiBbOCwgMl1cbiAgICAgICAgICAgICMgSW4gaGFyZFRhYiBpbmRlbnQgYnVmZmVyUG9zaXRpb24gaXMgbm90IHNhbWUgYXMgc2NyZWVuUG9zaXRpb25cbiAgICAgICAgICAgIGVuc3VyZSBudWxsLCBjdXJzb3I6IFs4LCAxXVxuXG4gICAgICAgIGFmdGVyRWFjaCAtPlxuICAgICAgICAgIGF0b20ucGFja2FnZXMuZGVhY3RpdmF0ZVBhY2thZ2UocGFjaylcblxuICAgICAgICBpdCBcIm1vdmUgdXAvZG93biB0byBuZXh0IGVkZ2Ugb2Ygc2FtZSAqc2NyZWVuKiBjb2x1bW5cIiwgLT5cbiAgICAgICAgICBlbnN1cmUgJ1snLCBjdXJzb3JTY3JlZW46IFs1LCAyXVxuICAgICAgICAgIGVuc3VyZSAnWycsIGN1cnNvclNjcmVlbjogWzMsIDJdXG4gICAgICAgICAgZW5zdXJlICdbJywgY3Vyc29yU2NyZWVuOiBbMiwgMl1cbiAgICAgICAgICBlbnN1cmUgJ1snLCBjdXJzb3JTY3JlZW46IFswLCAyXVxuXG4gICAgICAgICAgZW5zdXJlICddJywgY3Vyc29yU2NyZWVuOiBbMiwgMl1cbiAgICAgICAgICBlbnN1cmUgJ10nLCBjdXJzb3JTY3JlZW46IFszLCAyXVxuICAgICAgICAgIGVuc3VyZSAnXScsIGN1cnNvclNjcmVlbjogWzUsIDJdXG4gICAgICAgICAgZW5zdXJlICddJywgY3Vyc29yU2NyZWVuOiBbOSwgMl1cbiAgICAgICAgICBlbnN1cmUgJ10nLCBjdXJzb3JTY3JlZW46IFsxMSwgMl1cbiAgICAgICAgICBlbnN1cmUgJ10nLCBjdXJzb3JTY3JlZW46IFsxNCwgMl1cbiAgICAgICAgICBlbnN1cmUgJ10nLCBjdXJzb3JTY3JlZW46IFsxNywgMl1cblxuICAgICAgICAgIGVuc3VyZSAnWycsIGN1cnNvclNjcmVlbjogWzE0LCAyXVxuICAgICAgICAgIGVuc3VyZSAnWycsIGN1cnNvclNjcmVlbjogWzExLCAyXVxuICAgICAgICAgIGVuc3VyZSAnWycsIGN1cnNvclNjcmVlbjogWzksIDJdXG4gICAgICAgICAgZW5zdXJlICdbJywgY3Vyc29yU2NyZWVuOiBbNSwgMl1cbiAgICAgICAgICBlbnN1cmUgJ1snLCBjdXJzb3JTY3JlZW46IFszLCAyXVxuICAgICAgICAgIGVuc3VyZSAnWycsIGN1cnNvclNjcmVlbjogWzIsIDJdXG4gICAgICAgICAgZW5zdXJlICdbJywgY3Vyc29yU2NyZWVuOiBbMCwgMl1cblxuICBkZXNjcmliZSAnbW92ZVN1Y2Nlc3NPbkxpbmV3aXNlIGJlaGF2aXJhbCBjaGFyYWN0ZXJpc3RpYycsIC0+XG4gICAgb3JpZ2luYWxUZXh0ID0gbnVsbFxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIHNldHRpbmdzLnNldCgndXNlQ2xpcGJvYXJkQXNEZWZhdWx0UmVnaXN0ZXInLCBmYWxzZSlcbiAgICAgIHNldFxuICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICAwMDBcbiAgICAgICAgICAxMTFcbiAgICAgICAgICAyMjJcXG5cbiAgICAgICAgICBcIlwiXCJcbiAgICAgIG9yaWdpbmFsVGV4dCA9IGVkaXRvci5nZXRUZXh0KClcbiAgICAgIGVuc3VyZSBudWxsLCByZWdpc3RlcjogeydcIic6IHRleHQ6IHVuZGVmaW5lZH1cblxuICAgIGRlc2NyaWJlIFwibW92ZVN1Y2Nlc3NPbkxpbmV3aXNlPWZhbHNlIG1vdGlvblwiLCAtPlxuICAgICAgZGVzY3JpYmUgXCJ3aGVuIGl0IGNhbiBtb3ZlXCIsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT4gc2V0IGN1cnNvcjogWzEsIDBdXG4gICAgICAgIGl0IFwiZGVsZXRlIGJ5IGpcIiwgLT4gZW5zdXJlIFwiZCBqXCIsIHRleHQ6IFwiMDAwXFxuXCIsIG1vZGU6ICdub3JtYWwnXG4gICAgICAgIGl0IFwieWFuayBieSBqXCIsIC0+ICAgZW5zdXJlIFwieSBqXCIsIHRleHQ6IG9yaWdpbmFsVGV4dCwgcmVnaXN0ZXI6IHsnXCInOiB0ZXh0OiBcIjExMVxcbjIyMlxcblwifSwgbW9kZTogJ25vcm1hbCdcbiAgICAgICAgaXQgXCJjaGFuZ2UgYnkgalwiLCAtPiBlbnN1cmUgXCJjIGpcIiwgdGV4dEM6IFwiMDAwXFxufFxcblwiLCByZWdpc3RlcjogeydcIic6IHRleHQ6IFwiMTExXFxuMjIyXFxuXCJ9LCBtb2RlOiAnaW5zZXJ0J1xuXG4gICAgICAgIGl0IFwiZGVsZXRlIGJ5IGtcIiwgLT4gZW5zdXJlIFwiZCBrXCIsIHRleHQ6IFwiMjIyXFxuXCIsIG1vZGU6ICdub3JtYWwnXG4gICAgICAgIGl0IFwieWFuayBieSBrXCIsIC0+ICAgZW5zdXJlIFwieSBrXCIsIHRleHQ6IG9yaWdpbmFsVGV4dCwgcmVnaXN0ZXI6IHsnXCInOiB0ZXh0OiBcIjAwMFxcbjExMVxcblwifSwgbW9kZTogJ25vcm1hbCdcbiAgICAgICAgaXQgXCJjaGFuZ2UgYnkga1wiLCAtPiBlbnN1cmUgXCJjIGtcIiwgdGV4dEM6IFwifFxcbjIyMlxcblwiLCByZWdpc3RlcjogeydcIic6IHRleHQ6IFwiMDAwXFxuMTExXFxuXCJ9LCBtb2RlOiAnaW5zZXJ0J1xuXG4gICAgICBkZXNjcmliZSBcIndoZW4gaXQgY2FuIG5vdCBtb3ZlLXVwXCIsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT4gc2V0IGN1cnNvcjogWzAsIDBdXG4gICAgICAgIGl0IFwiZGVsZXRlIGJ5IGRrXCIsIC0+IGVuc3VyZSBcImQga1wiLCB0ZXh0OiBvcmlnaW5hbFRleHQsIG1vZGU6ICdub3JtYWwnXG4gICAgICAgIGl0IFwieWFuayBieSB5a1wiLCAtPiAgIGVuc3VyZSBcInkga1wiLCB0ZXh0OiBvcmlnaW5hbFRleHQsIHJlZ2lzdGVyOiB7J1wiJzogdGV4dDogdW5kZWZpbmVkfSwgbW9kZTogJ25vcm1hbCdcbiAgICAgICAgaXQgXCJjaGFuZ2UgYnkgY2tcIiwgLT4gZW5zdXJlIFwiYyBrXCIsIHRleHRDOiBcInwwMDBcXG4xMTFcXG4yMjJcXG5cIiwgcmVnaXN0ZXI6IHsnXCInOiB0ZXh0OiB1bmRlZmluZWR9LCBtb2RlOiAnbm9ybWFsJ1xuXG4gICAgICBkZXNjcmliZSBcIndoZW4gaXQgY2FuIG5vdCBtb3ZlLWRvd25cIiwgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPiBzZXQgY3Vyc29yOiBbMiwgMF1cbiAgICAgICAgaXQgXCJkZWxldGUgYnkgZGpcIiwgLT4gZW5zdXJlIFwiZCBqXCIsIHRleHQ6IG9yaWdpbmFsVGV4dCwgbW9kZTogJ25vcm1hbCdcbiAgICAgICAgaXQgXCJ5YW5rIGJ5IHlqXCIsIC0+ICAgZW5zdXJlIFwieSBqXCIsIHRleHQ6IG9yaWdpbmFsVGV4dCwgcmVnaXN0ZXI6IHsnXCInOiB0ZXh0OiB1bmRlZmluZWR9LCBtb2RlOiAnbm9ybWFsJ1xuICAgICAgICBpdCBcImNoYW5nZSBieSBjalwiLCAtPiBlbnN1cmUgXCJjIGpcIiwgdGV4dEM6IFwiMDAwXFxuMTExXFxufDIyMlxcblwiLCByZWdpc3RlcjogeydcIic6IHRleHQ6IHVuZGVmaW5lZH0sIG1vZGU6ICdub3JtYWwnXG5cbiAgICBkZXNjcmliZSBcIm1vdmVTdWNjZXNzT25MaW5ld2lzZT10cnVlIG1vdGlvblwiLCAtPlxuICAgICAgZGVzY3JpYmUgXCJ3aGVuIGl0IGNhbiBtb3ZlXCIsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT4gc2V0IGN1cnNvcjogWzEsIDBdXG4gICAgICAgIGl0IFwiZGVsZXRlIGJ5IEdcIiwgLT4gZW5zdXJlIFwiZCBHXCIsIHRleHQ6IFwiMDAwXFxuXCIsIG1vZGU6ICdub3JtYWwnXG4gICAgICAgIGl0IFwieWFuayBieSBHXCIsIC0+ICAgZW5zdXJlIFwieSBHXCIsIHRleHQ6IG9yaWdpbmFsVGV4dCwgcmVnaXN0ZXI6IHsnXCInOiB0ZXh0OiBcIjExMVxcbjIyMlxcblwifSwgbW9kZTogJ25vcm1hbCdcbiAgICAgICAgaXQgXCJjaGFuZ2UgYnkgR1wiLCAtPiBlbnN1cmUgXCJjIEdcIiwgdGV4dEM6IFwiMDAwXFxufFxcblwiLCByZWdpc3RlcjogeydcIic6IHRleHQ6IFwiMTExXFxuMjIyXFxuXCJ9LCBtb2RlOiAnaW5zZXJ0J1xuXG4gICAgICAgIGl0IFwiZGVsZXRlIGJ5IGdnXCIsIC0+IGVuc3VyZSBcImQgZyBnXCIsIHRleHQ6IFwiMjIyXFxuXCIsIG1vZGU6ICdub3JtYWwnXG4gICAgICAgIGl0IFwieWFuayBieSBnZ1wiLCAtPiAgIGVuc3VyZSBcInkgZyBnXCIsIHRleHQ6IG9yaWdpbmFsVGV4dCwgcmVnaXN0ZXI6IHsnXCInOiB0ZXh0OiBcIjAwMFxcbjExMVxcblwifSwgbW9kZTogJ25vcm1hbCdcbiAgICAgICAgaXQgXCJjaGFuZ2UgYnkgZ2dcIiwgLT4gZW5zdXJlIFwiYyBnIGdcIiwgdGV4dEM6IFwifFxcbjIyMlxcblwiLCByZWdpc3RlcjogeydcIic6IHRleHQ6IFwiMDAwXFxuMTExXFxuXCJ9LCBtb2RlOiAnaW5zZXJ0J1xuXG4gICAgICBkZXNjcmliZSBcIndoZW4gaXQgY2FuIG5vdCBtb3ZlLXVwXCIsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT4gc2V0IGN1cnNvcjogWzAsIDBdXG4gICAgICAgIGl0IFwiZGVsZXRlIGJ5IGdnXCIsIC0+IGVuc3VyZSBcImQgZyBnXCIsIHRleHQ6IFwiMTExXFxuMjIyXFxuXCIsIG1vZGU6ICdub3JtYWwnXG4gICAgICAgIGl0IFwieWFuayBieSBnZ1wiLCAtPiAgIGVuc3VyZSBcInkgZyBnXCIsIHRleHQ6IG9yaWdpbmFsVGV4dCwgcmVnaXN0ZXI6IHsnXCInOiB0ZXh0OiBcIjAwMFxcblwifSwgbW9kZTogJ25vcm1hbCdcbiAgICAgICAgaXQgXCJjaGFuZ2UgYnkgZ2dcIiwgLT4gZW5zdXJlIFwiYyBnIGdcIiwgdGV4dEM6IFwifFxcbjExMVxcbjIyMlxcblwiLCByZWdpc3RlcjogeydcIic6IHRleHQ6IFwiMDAwXFxuXCJ9LCBtb2RlOiAnaW5zZXJ0J1xuICAgICAgZGVzY3JpYmUgXCJ3aGVuIGl0IGNhbiBub3QgbW92ZS1kb3duXCIsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT4gc2V0IGN1cnNvcjogWzIsIDBdXG4gICAgICAgIGl0IFwiZGVsZXRlIGJ5IEdcIiwgLT4gIGVuc3VyZSBcImQgR1wiLCB0ZXh0OiBcIjAwMFxcbjExMVxcblwiLCBtb2RlOiAnbm9ybWFsJ1xuICAgICAgICBpdCBcInlhbmsgYnkgR1wiLCAtPiAgICBlbnN1cmUgXCJ5IEdcIiwgdGV4dDogb3JpZ2luYWxUZXh0LCByZWdpc3RlcjogeydcIic6IHRleHQ6IFwiMjIyXFxuXCJ9LCBtb2RlOiAnbm9ybWFsJ1xuICAgICAgICBpdCBcImNoYW5nZSBieSBHXCIsIC0+ICBlbnN1cmUgXCJjIEdcIiwgdGV4dEM6IFwiMDAwXFxuMTExXFxufFxcblwiLCByZWdpc3RlcjogeydcIic6IHRleHQ6IFwiMjIyXFxuXCJ9LCBtb2RlOiAnaW5zZXJ0J1xuXG4gIGRlc2NyaWJlIFwidGhlIHcga2V5YmluZGluZ1wiLCAtPlxuICAgIGRlc2NyaWJlIFwiYXMgYSBtb3Rpb25cIiwgLT5cbiAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBuZXh0IHdvcmRcIiwgLT5cbiAgICAgICAgc2V0ICAgICAgICAgdGV4dEM6IFwifGFiIGNkZTErLVxcbiB4eXpcXG5cXG56aXBcIlxuICAgICAgICBlbnN1cmUgXCJ3XCIsIHRleHRDOiBcImFiIHxjZGUxKy1cXG4geHl6XFxuXFxuemlwXCJcbiAgICAgICAgZW5zdXJlIFwid1wiLCB0ZXh0QzogXCJhYiBjZGUxfCstXFxuIHh5elxcblxcbnppcFwiXG4gICAgICAgIGVuc3VyZSBcIndcIiwgdGV4dEM6IFwiYWIgY2RlMSstXFxuIHx4eXpcXG5cXG56aXBcIlxuICAgICAgICBlbnN1cmUgXCJ3XCIsIHRleHRDOiBcImFiIGNkZTErLVxcbiB4eXpcXG58XFxuemlwXCJcbiAgICAgICAgZW5zdXJlIFwid1wiLCB0ZXh0QzogXCJhYiBjZGUxKy1cXG4geHl6XFxuXFxufHppcFwiXG4gICAgICAgIGVuc3VyZSBcIndcIiwgdGV4dEM6IFwiYWIgY2RlMSstXFxuIHh5elxcblxcbnppfHBcIlxuICAgICAgICBlbnN1cmUgXCJ3XCIsIHRleHRDOiBcImFiIGNkZTErLVxcbiB4eXpcXG5cXG56aXxwXCIgIyBEbyBub3RoaW5nIGF0IHZpbUVPRlxuXG4gICAgICBpdCBcIltDUkxGXSBtb3ZlcyB0aGUgY3Vyc29yIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIG5leHQgd29yZFwiLCAtPlxuICAgICAgICBzZXQgICAgICAgICB0ZXh0QzogXCJ8YWIgY2RlMSstXFxyXFxuIHh5elxcclxcblxcclxcbnppcFwiXG4gICAgICAgIGVuc3VyZSBcIndcIiwgdGV4dEM6IFwiYWIgfGNkZTErLVxcclxcbiB4eXpcXHJcXG5cXHJcXG56aXBcIlxuICAgICAgICBlbnN1cmUgXCJ3XCIsIHRleHRDOiBcImFiIGNkZTF8Ky1cXHJcXG4geHl6XFxyXFxuXFxyXFxuemlwXCJcbiAgICAgICAgZW5zdXJlIFwid1wiLCB0ZXh0QzogXCJhYiBjZGUxKy1cXHJcXG4gfHh5elxcclxcblxcclxcbnppcFwiXG4gICAgICAgIGVuc3VyZSBcIndcIiwgdGV4dEM6IFwiYWIgY2RlMSstXFxyXFxuIHh5elxcclxcbnxcXHJcXG56aXBcIlxuICAgICAgICBlbnN1cmUgXCJ3XCIsIHRleHRDOiBcImFiIGNkZTErLVxcclxcbiB4eXpcXHJcXG5cXHJcXG58emlwXCJcbiAgICAgICAgZW5zdXJlIFwid1wiLCB0ZXh0QzogXCJhYiBjZGUxKy1cXHJcXG4geHl6XFxyXFxuXFxyXFxueml8cFwiXG4gICAgICAgIGVuc3VyZSBcIndcIiwgdGV4dEM6IFwiYWIgY2RlMSstXFxyXFxuIHh5elxcclxcblxcclxcbnppfHBcIiAjIERvIG5vdGhpbmcgYXQgdmltRU9GXG5cbiAgICAgIGl0IFwibW92ZSB0byBuZXh0IHdvcmQgYnkgc2tpcHBpbmcgdHJhaWxpbmcgd2hpdGUgc3BhY2VzXCIsIC0+XG4gICAgICAgIHNldCAgICAgICAgIHRleHRDOiBcIjAxMnwgICBcXG4gIDIzNFwiXG4gICAgICAgIGVuc3VyZSBcIndcIiwgdGV4dEM6IFwiMDEyICAgXFxuICB8MjM0XCJcblxuICAgICAgaXQgXCJtb3ZlIHRvIG5leHQgd29yZCBmcm9tIEVPTFwiLCAtPlxuICAgICAgICBzZXQgICAgICAgICB0ZXh0QzogXCJ8XFxuICAyMzRcIlxuICAgICAgICBlbnN1cmUgXCJ3XCIsIHRleHRDOiBcIlxcbiAgfDIzNFwiXG5cbiAgICBkZXNjcmliZSBcInVzZWQgYXMgY2hhbmdlIFRBUkdFVFwiLCAtPlxuICAgICAgaXQgXCJbYXQtd29yZF0gbm90IGVhdCB3aGl0ZXNwYWNlXCIsIC0+XG4gICAgICAgIHNldCAgICAgICAgICAgdGV4dEM6IFwidnxhcjEgPSAxXCJcbiAgICAgICAgZW5zdXJlICdjIHcnLCB0ZXh0QzogXCJ2ID0gMVwiXG5cbiAgICAgIGl0IFwiW2F0IHdoaXRlLXNwYWNlXSBvbmx5IGVhdCB3aGl0ZSBzcGFjZVwiLCAtPlxuICAgICAgICBzZXQgICAgICAgICAgIHRleHRDOiBcInwgIHZhcjEgPSAxXCJcbiAgICAgICAgZW5zdXJlICdjIHcnLCB0ZXh0QzogXCJ2YXIxID0gMVwiXG5cbiAgICAgIGl0IFwiW2F0IHRyYWlsaW5nIHdoaXRlc3BhY2VdIGRvZXNudCBlYXQgbmV3IGxpbmUgY2hhcmFjdGVyXCIsIC0+XG4gICAgICAgIHNldCAgICAgICAgICAgdGV4dEM6IFwiYWJjfCAgXFxuZGVmXCJcbiAgICAgICAgZW5zdXJlICdjIHcnLCB0ZXh0QzogXCJhYmN8XFxuZGVmXCJcblxuICAgICAgaXQgXCJbYXQgdHJhaWxpbmcgd2hpdGVzcGFjZV0gZWF0IG5ldyBsaW5lIHdoZW4gY291bnQgaXMgc3BlY2lmaWVkXCIsIC0+ICMgVE9ETyByZS1lbmFibGUgYWZ0ZXIgYXRvbS9hdG9tIzE2OTgzIGNvbWVzIGluIHRvIFNUQUJMRVxuICAgICAgICBzZXQgICAgICAgICAgICAgdGV4dEM6IFwifFxcblxcblxcblxcblxcbmxpbmU2XFxuXCJcbiAgICAgICAgZW5zdXJlICc1IGMgdycsIHRleHRDOiBcInxcXG5saW5lNlxcblwiXG5cbiAgICBkZXNjcmliZSBcImFzIGEgc2VsZWN0aW9uXCIsIC0+XG4gICAgICBpdCBcIlt3aXRoaW4td29yZF0gc2VsZWN0cyB0byB0aGUgZW5kIG9mIHRoZSB3b3JkXCIsIC0+XG4gICAgICAgIHNldCB0ZXh0QzogXCJ8YWIgY2RcIlxuICAgICAgICBlbnN1cmUgJ3kgdycsIHJlZ2lzdGVyOiAnXCInOiB0ZXh0OiAnYWIgJ1xuXG4gICAgICBpdCBcIltiZXR3ZWVuLXdvcmRdIHNlbGVjdHMgdGhlIHdoaXRlc3BhY2VcIiwgLT5cbiAgICAgICAgc2V0IHRleHRDOiBcImFifCBjZFwiXG4gICAgICAgIGVuc3VyZSAneSB3JywgcmVnaXN0ZXI6ICdcIic6IHRleHQ6ICcgJ1xuXG4gIGRlc2NyaWJlIFwidGhlIFcga2V5YmluZGluZ1wiLCAtPlxuICAgIGRlc2NyaWJlIFwiYXMgYSBtb3Rpb25cIiwgLT5cbiAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBuZXh0IHdvcmRcIiwgLT5cbiAgICAgICAgc2V0ICAgICAgICAgdGV4dEM6IFwifGNkZTErLSBhYiBcXG4geHl6XFxuXFxuemlwXCJcbiAgICAgICAgZW5zdXJlIFwiV1wiLCB0ZXh0QzogXCJjZGUxKy0gfGFiIFxcbiB4eXpcXG5cXG56aXBcIlxuICAgICAgICBlbnN1cmUgXCJXXCIsIHRleHRDOiBcImNkZTErLSBhYiBcXG4gfHh5elxcblxcbnppcFwiXG4gICAgICAgIGVuc3VyZSBcIldcIiwgdGV4dEM6IFwiY2RlMSstIGFiIFxcbiB4eXpcXG58XFxuemlwXCJcbiAgICAgICAgZW5zdXJlIFwiV1wiLCB0ZXh0QzogXCJjZGUxKy0gYWIgXFxuIHh5elxcblxcbnx6aXBcIlxuICAgICAgICBlbnN1cmUgXCJXXCIsIHRleHRDOiBcImNkZTErLSBhYiBcXG4geHl6XFxuXFxueml8cFwiXG4gICAgICAgIGVuc3VyZSBcIldcIiwgdGV4dEM6IFwiY2RlMSstIGFiIFxcbiB4eXpcXG5cXG56aXxwXCIgIyBEbyBub3RoaW5nIGF0IHZpbUVPRlxuXG4gICAgICBpdCBcIlthdC10cmFpbGluZy1XU10gbW92ZXMgdGhlIGN1cnNvciB0byBiZWdpbm5pbmcgb2YgdGhlIG5leHQgd29yZCBhdCBuZXh0IGxpbmVcIiwgLT5cbiAgICAgICAgc2V0ICAgICAgICAgdGV4dEM6IFwiMDEyfCAgIFxcbiAgMjM0XCJcbiAgICAgICAgZW5zdXJlICdXJywgdGV4dEM6IFwiMDEyICAgXFxuICB8MjM0XCJcblxuICAgICAgaXQgXCJtb3ZlcyB0aGUgY3Vyc29yIHRvIGJlZ2lubmluZyBvZiB0aGUgbmV4dCB3b3JkIG9mIG5leHQgbGluZSB3aGVuIGN1cnNvciBpcyBhdCBFT0wuXCIsIC0+XG4gICAgICAgIHNldCAgICAgICAgIHRleHRDOiBcInxcXG4gIDIzNFwiXG4gICAgICAgIGVuc3VyZSAnVycsIHRleHRDOiBcIlxcbiAgfDIzNFwiXG5cbiAgICAjIFRoaXMgc3BlYyBpcyByZWR1bmRhbnQgc2luY2UgVyhNb3ZlVG9OZXh0V2hvbGVXb3JkKSBpcyBjaGlsZCBvZiB3KE1vdmVUb05leHRXb3JkKS5cbiAgICBkZXNjcmliZSBcInVzZWQgYXMgY2hhbmdlIFRBUkdFVFwiLCAtPlxuICAgICAgaXQgXCJbYXQtd29yZF0gbm90IGVhdCB3aGl0ZXNwYWNlXCIsIC0+XG4gICAgICAgIHNldCAgICAgICAgICAgdGV4dEM6IFwidnxhcjEgPSAxXCJcbiAgICAgICAgZW5zdXJlICdjIFcnLCB0ZXh0QzogXCJ2fCA9IDFcIlxuXG4gICAgICBpdCBcIlthdC1XU10gb25seSBlYXQgd2hpdGUgc3BhY2VcIiwgLT5cbiAgICAgICAgc2V0ICAgICAgICAgICB0ZXh0QzogXCJ8ICB2YXIxID0gMVwiXG4gICAgICAgIGVuc3VyZSAnYyBXJywgdGV4dEM6IFwidmFyMSA9IDFcIlxuXG4gICAgICBpdCBcIlthdC10cmFpbGluZy1XU10gZG9lc24ndCBlYXQgbmV3IGxpbmUgY2hhcmFjdGVyXCIsIC0+XG4gICAgICAgIHNldCAgICAgICAgICAgdGV4dEM6IFwiYWJjfCAgXFxuZGVmXFxuXCJcbiAgICAgICAgZW5zdXJlICdjIFcnLCB0ZXh0QzogXCJhYmN8XFxuZGVmXFxuXCJcblxuICAgICAgeGl0IFwiY2FuIGVhdCBuZXcgbGluZSB3aGVuIGNvdW50IGlzIHNwZWNpZmllZFwiLCAtPiAgIyBUT0RPIHJlLWVuYWJsZSBhZnRlciBhdG9tL2F0b20jMTY5ODMgY29tZXMgaW4gdG8gU1RBQkxFXG4gICAgICAgIHNldCAgICAgICAgICAgICB0ZXh0QzogXCJ8XFxuXFxuXFxuXFxuXFxubGluZTZcXG5cIlxuICAgICAgICBlbnN1cmUgJzUgYyBXJywgdGV4dEM6IFwifFxcbmxpbmU2XFxuXCJcblxuICAgIGRlc2NyaWJlIFwiYXMgYSBUQVJHRVRcIiwgLT5cbiAgICAgIGl0IFwiW2F0LXdvcmRdIHlhbmtcIiwgLT5cbiAgICAgICAgc2V0IHRleHRDOiBcInxjZGUxKy0gYWJcIlxuICAgICAgICBlbnN1cmUgJ3kgVycsIHJlZ2lzdGVyOiAnXCInOiB0ZXh0OiAnY2RlMSstICdcblxuICAgICAgaXQgXCJkZWxldGUgbmV3IGxpbmVcIiwgLT5cbiAgICAgICAgc2V0ICAgICAgICAgICB0ZXh0QzogXCJjZGUxKy0gYWIgXFxuIHh5elxcbnxcXG56aXBcIlxuICAgICAgICBlbnN1cmUgJ2QgVycsIHRleHRDOiBcImNkZTErLSBhYiBcXG4geHl6XFxufHppcFwiLCByZWdpc3RlcjogeydcIic6IHRleHQ6IFwiXFxuXCJ9XG5cbiAgICAgIGl0IFwiZGVsZXRlIGxhc3Qgd29yZCBpbiBidWZmZXIgYW5kIGFkanV0IGN1cnNvciByb3cgdG8gbm90IHBhc3QgdmltTGFzdFJvd1wiLCAtPlxuICAgICAgICBzZXQgICAgICAgICAgIHRleHRDOiBcImNkZTErLSBhYiBcXG4geHl6XFxuXFxufHppcFwiXG4gICAgICAgIGVuc3VyZSAnZCBXJywgdGV4dEM6IFwiY2RlMSstIGFiIFxcbiB4eXpcXG58XFxuXCIsIHJlZ2lzdGVyOiB7J1wiJzogdGV4dDogXCJ6aXBcIn1cblxuICBkZXNjcmliZSBcInRoZSBlIGtleWJpbmRpbmdcIiwgLT5cbiAgICBkZXNjcmliZSBcImFzIGEgbW90aW9uXCIsIC0+XG4gICAgICBpdCBcIm1vdmVzIHRoZSBjdXJzb3IgdG8gdGhlIGVuZCBvZiB0aGUgY3VycmVudCB3b3JkXCIsIC0+XG4gICAgICAgIHNldCAgICAgICAgIHRleHRDXzogXCJ8YWIgY2RlMSstX1xcbl94eXpcXG5cXG56aXBcIlxuICAgICAgICBlbnN1cmUgJ2UnLCB0ZXh0Q186IFwiYXxiIGNkZTErLV9cXG5feHl6XFxuXFxuemlwXCJcbiAgICAgICAgZW5zdXJlICdlJywgdGV4dENfOiBcImFiIGNkZXwxKy1fXFxuX3h5elxcblxcbnppcFwiXG4gICAgICAgIGVuc3VyZSAnZScsIHRleHRDXzogXCJhYiBjZGUxK3wtX1xcbl94eXpcXG5cXG56aXBcIlxuICAgICAgICBlbnN1cmUgJ2UnLCB0ZXh0Q186IFwiYWIgY2RlMSstX1xcbl94eXx6XFxuXFxuemlwXCJcbiAgICAgICAgZW5zdXJlICdlJywgdGV4dENfOiBcImFiIGNkZTErLV9cXG5feHl6XFxuXFxueml8cFwiXG5cbiAgICAgIGl0IFwic2tpcHMgd2hpdGVzcGFjZSB1bnRpbCBFT0ZcIiwgLT5cbiAgICAgICAgc2V0ICAgICAgICAgdGV4dEM6IFwifDAxMlxcblxcblxcbjAxMlxcblxcblwiXG4gICAgICAgIGVuc3VyZSAnZScsIHRleHRDOiBcIjAxfDJcXG5cXG5cXG4wMTJcXG5cXG5cIlxuICAgICAgICBlbnN1cmUgJ2UnLCB0ZXh0QzogXCIwMTJcXG5cXG5cXG4wMXwyXFxuXFxuXCJcbiAgICAgICAgZW5zdXJlICdlJywgdGV4dEM6IFwiMDEyXFxuXFxuXFxuMDEyXFxufFxcblwiXG5cbiAgICBkZXNjcmliZSBcImFzIHNlbGVjdGlvblwiLCAtPlxuICAgICAgaXQgXCJbaW4td29yZF0gc2VsZWN0cyB0byB0aGUgZW5kIG9mIHRoZSBjdXJyZW50IHdvcmRcIiwgLT5cbiAgICAgICAgc2V0IHRleHRDXzogXCJ8YWIgY2RlMSstX1wiXG4gICAgICAgIGVuc3VyZSAneSBlJywgcmVnaXN0ZXI6ICdcIic6IHRleHQ6ICdhYidcblxuICAgICAgaXQgXCJbYmV0d2Vlbi13b3JkXSBzZWxlY3RzIHRvIHRoZSBlbmQgb2YgdGhlIG5leHQgd29yZFwiLCAtPlxuICAgICAgICBzZXQgdGV4dENfOiBcImFifCBjZGUxKy1fXCJcbiAgICAgICAgZW5zdXJlICd5IGUnLCByZWdpc3RlcjogJ1wiJzogdGV4dDogJyBjZGUxJ1xuXG4gIGRlc2NyaWJlIFwidGhlIEUga2V5YmluZGluZ1wiLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIHNldCB0ZXh0XzogXCJcIlwiXG4gICAgICBhYiAgY2RlMSstX1xuICAgICAgX3h5el9cblxuICAgICAgemlwXFxuXG4gICAgICBcIlwiXCJcblxuICAgIGRlc2NyaWJlIFwiYXMgYSBtb3Rpb25cIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzAsIDBdXG5cbiAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciB0byB0aGUgZW5kIG9mIHRoZSBjdXJyZW50IHdvcmRcIiwgLT5cbiAgICAgICAgZW5zdXJlICdFJywgY3Vyc29yOiBbMCwgMV1cbiAgICAgICAgZW5zdXJlICdFJywgY3Vyc29yOiBbMCwgOV1cbiAgICAgICAgZW5zdXJlICdFJywgY3Vyc29yOiBbMSwgM11cbiAgICAgICAgZW5zdXJlICdFJywgY3Vyc29yOiBbMywgMl1cbiAgICAgICAgZW5zdXJlICdFJywgY3Vyc29yOiBbMywgMl1cblxuICAgIGRlc2NyaWJlIFwiYXMgc2VsZWN0aW9uXCIsIC0+XG4gICAgICBkZXNjcmliZSBcIndpdGhpbiBhIHdvcmRcIiwgLT5cbiAgICAgICAgaXQgXCJzZWxlY3RzIHRvIHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgd29yZFwiLCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFswLCAwXVxuICAgICAgICAgIGVuc3VyZSAneSBFJywgcmVnaXN0ZXI6ICdcIic6IHRleHQ6ICdhYidcblxuICAgICAgZGVzY3JpYmUgXCJiZXR3ZWVuIHdvcmRzXCIsIC0+XG4gICAgICAgIGl0IFwic2VsZWN0cyB0byB0aGUgZW5kIG9mIHRoZSBuZXh0IHdvcmRcIiwgLT5cbiAgICAgICAgICBzZXQgY3Vyc29yOiBbMCwgMl1cbiAgICAgICAgICBlbnN1cmUgJ3kgRScsIHJlZ2lzdGVyOiAnXCInOiB0ZXh0OiAnICBjZGUxKy0nXG5cbiAgICAgIGRlc2NyaWJlIFwicHJlc3MgbW9yZSB0aGFuIG9uY2VcIiwgLT5cbiAgICAgICAgaXQgXCJzZWxlY3RzIHRvIHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgd29yZFwiLCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFswLCAwXVxuICAgICAgICAgIGVuc3VyZSAndiBFIEUgeScsIHJlZ2lzdGVyOiAnXCInOiB0ZXh0OiAnYWIgIGNkZTErLSdcblxuICBkZXNjcmliZSBcInRoZSBnZSBrZXliaW5kaW5nXCIsIC0+XG4gICAgZGVzY3JpYmUgXCJhcyBhIG1vdGlvblwiLCAtPlxuICAgICAgaXQgXCJtb3ZlcyB0aGUgY3Vyc29yIHRvIHRoZSBlbmQgb2YgdGhlIHByZXZpb3VzIHdvcmRcIiwgLT5cbiAgICAgICAgc2V0ICAgICAgICAgICB0ZXh0QzogXCIxMjM0IDU2Nzggd29yZHdvfHJkXCJcbiAgICAgICAgZW5zdXJlIFwiZyBlXCIsIHRleHRDOiBcIjEyMzQgNTY3fDggd29yZHdvcmRcIlxuICAgICAgICBlbnN1cmUgXCJnIGVcIiwgdGV4dEM6IFwiMTIzfDQgNTY3OCB3b3Jkd29yZFwiXG4gICAgICAgIGVuc3VyZSBcImcgZVwiLCB0ZXh0QzogXCJ8MTIzNCA1Njc4IHdvcmR3b3JkXCJcbiAgICAgICAgZW5zdXJlIFwiZyBlXCIsIHRleHRDOiBcInwxMjM0IDU2Nzggd29yZHdvcmRcIlxuXG4gICAgICBpdCBcIm1vdmVzIGNvcnJlbnRseSB3aGVuIHN0YXJ0aW5nIGJldHdlZW4gd29yZHNcIiwgLT5cbiAgICAgICAgc2V0ICAgICAgICAgICB0ZXh0QzogXCIxIGxlYWRpbmcgICB8ICBlbmRcIlxuICAgICAgICBlbnN1cmUgJ2cgZScsIHRleHRDOiBcIjEgbGVhZGlufGcgICAgIGVuZFwiXG5cbiAgICAgIGl0IFwidGFrZXMgYSBjb3VudFwiLCAtPlxuICAgICAgICBzZXQgICAgICAgICAgICAgdGV4dEM6IFwidmltIG1vZGUgcGx1cyBpcyBnZXR0aW5nIHRoZXxyZVwiXG4gICAgICAgIGVuc3VyZSAnNSBnIGUnLCB0ZXh0QzogXCJ2aXxtIG1vZGUgcGx1cyBpcyBnZXR0aW5nIHRoZXJlXCJcblxuICAgICAgaXQgXCJoYW5kbGVzIG5vbi13b3JkcyBpbnNpZGUgd29yZHMgbGlrZSB2aW1cIiwgLT5cbiAgICAgICAgc2V0ICAgICAgICAgICB0ZXh0QzogXCIxMjM0IDU2Nzggd29yZC13b3J8ZFwiXG4gICAgICAgIGVuc3VyZSAnZyBlJywgdGV4dEM6IFwiMTIzNCA1Njc4IHdvcmR8LXdvcmRcIlxuICAgICAgICBlbnN1cmUgJ2cgZScsIHRleHRDOiBcIjEyMzQgNTY3OCB3b3J8ZC13b3JkXCJcbiAgICAgICAgZW5zdXJlICdnIGUnLCB0ZXh0QzogXCIxMjM0IDU2N3w4IHdvcmQtd29yZFwiXG5cbiAgICAgIHhpdCBcImhhbmRsZXMgbmV3bGluZXMgbGlrZSB2aW1cIiwgLT4gIyBUT0RPIHJlLWVuYWJsZSBhZnRlciBhdG9tL2F0b20jMTY5ODMgY29tZXMgaW4gdG8gU1RBQkxFXG4gICAgICAgIHNldCAgICAgICAgICAgdGV4dEM6IFwiMTIzNFxcblxcblxcblxcbjU2fDc4XCJcbiAgICAgICAgZW5zdXJlIFwiZyBlXCIsIHRleHRDOiBcIjEyMzRcXG5cXG5cXG58XFxuNTY3OFwiXG4gICAgICAgIGVuc3VyZSBcImcgZVwiLCB0ZXh0QzogXCIxMjM0XFxuXFxufFxcblxcbjU2NzhcIlxuICAgICAgICBlbnN1cmUgXCJnIGVcIiwgdGV4dEM6IFwiMTIzNFxcbnxcXG5cXG5cXG41Njc4XCJcbiAgICAgICAgZW5zdXJlIFwiZyBlXCIsIHRleHRDOiBcIjEyM3w0XFxuXFxuXFxuXFxuNTY3OFwiXG4gICAgICAgIGVuc3VyZSBcImcgZVwiLCB0ZXh0QzogXCJ8MTIzNFxcblxcblxcblxcbjU2NzhcIlxuXG4gICAgZGVzY3JpYmUgXCJ3aGVuIHVzZWQgYnkgQ2hhbmdlIG9wZXJhdG9yXCIsIC0+XG4gICAgICBpdCBcImNoYW5nZXMgd29yZCBmcmFnbWVudHNcIiwgLT5cbiAgICAgICAgc2V0IHRleHQ6IFwiY2V0IGRvY3VtZW50XCIsIGN1cnNvcjogWzAsIDddXG4gICAgICAgIGVuc3VyZSAnYyBnIGUnLCBjdXJzb3I6IFswLCAyXSwgdGV4dDogXCJjZW1lbnRcIiwgbW9kZTogJ2luc2VydCdcbiAgICAgICAgIyBUT0RPOiBJJ20gbm90IHN1cmUgaG93IHRvIGNoZWNrIHRoZSByZWdpc3RlciBhZnRlciBjaGVja2luZyB0aGUgZG9jdW1lbnRcbiAgICAgICAgIyBlbnN1cmUgbnVsbCwgcmVnaXN0ZXI6ICdcIicsIHRleHQ6ICd0IGRvY3UnXG5cbiAgICAgIGl0IFwiY2hhbmdlcyB3aGl0ZXNwYWNlIHByb3Blcmx5XCIsIC0+XG4gICAgICAgIHNldCB0ZXh0OiBcImNlICAgIGRvY1wiLCBjdXJzb3I6IFswLCA0XVxuICAgICAgICBlbnN1cmUgJ2MgZyBlJywgY3Vyc29yOiBbMCwgMV0sIHRleHQ6IFwiYyBkb2NcIiwgbW9kZTogJ2luc2VydCdcblxuICAgIGRlc2NyaWJlIFwiaW4gY2hhcmFjdGVyd2lzZSB2aXN1YWwgbW9kZVwiLCAtPlxuICAgICAgaXQgXCJzZWxlY3RzIHdvcmQgZnJhZ21lbnRzXCIsIC0+XG4gICAgICAgIHNldCB0ZXh0OiBcImNldCBkb2N1bWVudFwiLCBjdXJzb3I6IFswLCA3XVxuICAgICAgICBlbnN1cmUgJ3YgZyBlJywgY3Vyc29yOiBbMCwgMl0sIHNlbGVjdGVkVGV4dDogXCJ0IGRvY3VcIlxuXG4gIGRlc2NyaWJlIFwidGhlIGdFIGtleWJpbmRpbmdcIiwgLT5cbiAgICBkZXNjcmliZSBcImFzIGEgbW90aW9uXCIsIC0+XG4gICAgICBpdCBcIm1vdmVzIHRoZSBjdXJzb3IgdG8gdGhlIGVuZCBvZiB0aGUgcHJldmlvdXMgd29yZFwiLCAtPlxuICAgICAgICBzZXQgdGV4dEM6IFwiMTIuNCA1fjctIHdvcmQtd3xvcmRcIlxuICAgICAgICBlbnN1cmUgJ2cgRScsIHRleHRDOiBcIjEyLjQgNX43fC0gd29yZC13b3JkXCJcbiAgICAgICAgZW5zdXJlICdnIEUnLCB0ZXh0QzogXCIxMi58NCA1fjctIHdvcmQtd29yZFwiXG4gICAgICAgIGVuc3VyZSAnZyBFJywgdGV4dEM6IFwifDEyLjQgNX43LSB3b3JkLXdvcmRcIlxuICAgICAgICBlbnN1cmUgJ2cgRScsIHRleHRDOiBcInwxMi40IDV+Ny0gd29yZC13b3JkXCJcblxuICBkZXNjcmliZSBcInRoZSAoLCkgc2VudGVuY2Uga2V5YmluZGluZ1wiLCAtPlxuICAgIGRlc2NyaWJlIFwiYXMgYSBtb3Rpb25cIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgc2V0XG4gICAgICAgICAgY3Vyc29yOiBbMCwgMF1cbiAgICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICBzZW50ZW5jZSBvbmUuXSknXCIgICAgc2VuLnRlbmNlIC50d28uXG4gICAgICAgICAgaGVyZS4gIHNlbnRlbmNlIHRocmVlXG4gICAgICAgICAgbW9yZSB0aHJlZVxuXG4gICAgICAgICAgICAgc2VudGVuY2UgZm91clxuXG5cbiAgICAgICAgICBzZW50ZW5jZSBmaXZlLlxuICAgICAgICAgIG1vcmUgZml2ZVxuICAgICAgICAgIG1vcmUgc2l4XG5cbiAgICAgICAgICAgbGFzdCBzZW50ZW5jZVxuICAgICAgICAgIGFsbCBkb25lIHNldmVuXG4gICAgICAgICAgXCJcIlwiXG5cbiAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciB0byB0aGUgZW5kIG9mIHRoZSBzZW50ZW5jZVwiLCAtPlxuICAgICAgICBlbnN1cmUgJyknLCBjdXJzb3I6IFswLCAyMV1cbiAgICAgICAgZW5zdXJlICcpJywgY3Vyc29yOiBbMSwgMF1cbiAgICAgICAgZW5zdXJlICcpJywgY3Vyc29yOiBbMSwgN11cbiAgICAgICAgZW5zdXJlICcpJywgY3Vyc29yOiBbMywgMF1cbiAgICAgICAgZW5zdXJlICcpJywgY3Vyc29yOiBbNCwgM11cbiAgICAgICAgZW5zdXJlICcpJywgY3Vyc29yOiBbNSwgMF0gIyBib3VuZGFyeSBpcyBkaWZmZXJlbnQgYnkgZGlyZWN0aW9uXG4gICAgICAgIGVuc3VyZSAnKScsIGN1cnNvcjogWzcsIDBdXG4gICAgICAgIGVuc3VyZSAnKScsIGN1cnNvcjogWzgsIDBdXG4gICAgICAgIGVuc3VyZSAnKScsIGN1cnNvcjogWzEwLCAwXVxuICAgICAgICBlbnN1cmUgJyknLCBjdXJzb3I6IFsxMSwgMV1cblxuICAgICAgICBlbnN1cmUgJyknLCBjdXJzb3I6IFsxMiwgMTNdXG4gICAgICAgIGVuc3VyZSAnKScsIGN1cnNvcjogWzEyLCAxM11cblxuICAgICAgICBlbnN1cmUgJygnLCBjdXJzb3I6IFsxMSwgMV1cbiAgICAgICAgZW5zdXJlICcoJywgY3Vyc29yOiBbMTAsIDBdXG4gICAgICAgIGVuc3VyZSAnKCcsIGN1cnNvcjogWzgsIDBdXG4gICAgICAgIGVuc3VyZSAnKCcsIGN1cnNvcjogWzcsIDBdXG4gICAgICAgIGVuc3VyZSAnKCcsIGN1cnNvcjogWzYsIDBdICMgYm91bmRhcnkgaXMgZGlmZmVyZW50IGJ5IGRpcmVjdGlvblxuICAgICAgICBlbnN1cmUgJygnLCBjdXJzb3I6IFs0LCAzXVxuICAgICAgICBlbnN1cmUgJygnLCBjdXJzb3I6IFszLCAwXVxuICAgICAgICBlbnN1cmUgJygnLCBjdXJzb3I6IFsxLCA3XVxuICAgICAgICBlbnN1cmUgJygnLCBjdXJzb3I6IFsxLCAwXVxuICAgICAgICBlbnN1cmUgJygnLCBjdXJzb3I6IFswLCAyMV1cblxuICAgICAgICBlbnN1cmUgJygnLCBjdXJzb3I6IFswLCAwXVxuICAgICAgICBlbnN1cmUgJygnLCBjdXJzb3I6IFswLCAwXVxuXG4gICAgICBpdCBcInNraXBzIHRvIGJlZ2lubmluZyBvZiBzZW50ZW5jZVwiLCAtPlxuICAgICAgICBzZXQgICAgICAgICBjdXJzb3I6IFs0LCAxNV1cbiAgICAgICAgZW5zdXJlICcoJywgY3Vyc29yOiBbNCwgM11cblxuICAgICAgaXQgXCJzdXBwb3J0cyBhIGNvdW50XCIsIC0+XG4gICAgICAgIHNldCAgICAgICAgICAgY3Vyc29yOiBbMCwgMF1cbiAgICAgICAgZW5zdXJlICczICknLCBjdXJzb3I6IFsxLCA3XVxuICAgICAgICBlbnN1cmUgJzMgKCcsIGN1cnNvcjogWzAsIDBdXG5cbiAgICAgIGl0IFwiY2FuIG1vdmUgc3RhcnQgb2YgYnVmZmVyIG9yIGVuZCBvZiBidWZmZXIgYXQgbWF4aW11bVwiLCAtPlxuICAgICAgICBzZXQgICAgICAgICAgICAgY3Vyc29yOiBbMCwgMF1cbiAgICAgICAgZW5zdXJlICcyIDAgKScsIGN1cnNvcjogWzEyLCAxM11cbiAgICAgICAgZW5zdXJlICcyIDAgKCcsIGN1cnNvcjogWzAsIDBdXG5cbiAgICAgIGRlc2NyaWJlIFwic2VudGVuY2UgbW90aW9uIHdpdGggc2tpcC1ibGFuay1yb3dcIiwgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIGF0b20ua2V5bWFwcy5hZGQgXCJ0ZXN0XCIsXG4gICAgICAgICAgICAnYXRvbS10ZXh0LWVkaXRvci52aW0tbW9kZS1wbHVzOm5vdCguaW5zZXJ0LW1vZGUpJzpcbiAgICAgICAgICAgICAgJ2cgKSc6ICd2aW0tbW9kZS1wbHVzOm1vdmUtdG8tbmV4dC1zZW50ZW5jZS1za2lwLWJsYW5rLXJvdydcbiAgICAgICAgICAgICAgJ2cgKCc6ICd2aW0tbW9kZS1wbHVzOm1vdmUtdG8tcHJldmlvdXMtc2VudGVuY2Utc2tpcC1ibGFuay1yb3cnXG5cbiAgICAgICAgaXQgXCJtb3ZlcyB0aGUgY3Vyc29yIHRvIHRoZSBlbmQgb2YgdGhlIHNlbnRlbmNlXCIsIC0+XG4gICAgICAgICAgZW5zdXJlICdnICknLCBjdXJzb3I6IFswLCAyMV1cbiAgICAgICAgICBlbnN1cmUgJ2cgKScsIGN1cnNvcjogWzEsIDBdXG4gICAgICAgICAgZW5zdXJlICdnICknLCBjdXJzb3I6IFsxLCA3XVxuICAgICAgICAgIGVuc3VyZSAnZyApJywgY3Vyc29yOiBbNCwgM11cbiAgICAgICAgICBlbnN1cmUgJ2cgKScsIGN1cnNvcjogWzcsIDBdXG4gICAgICAgICAgZW5zdXJlICdnICknLCBjdXJzb3I6IFs4LCAwXVxuICAgICAgICAgIGVuc3VyZSAnZyApJywgY3Vyc29yOiBbMTEsIDFdXG5cbiAgICAgICAgICBlbnN1cmUgJ2cgKScsIGN1cnNvcjogWzEyLCAxM11cbiAgICAgICAgICBlbnN1cmUgJ2cgKScsIGN1cnNvcjogWzEyLCAxM11cblxuICAgICAgICAgIGVuc3VyZSAnZyAoJywgY3Vyc29yOiBbMTEsIDFdXG4gICAgICAgICAgZW5zdXJlICdnICgnLCBjdXJzb3I6IFs4LCAwXVxuICAgICAgICAgIGVuc3VyZSAnZyAoJywgY3Vyc29yOiBbNywgMF1cbiAgICAgICAgICBlbnN1cmUgJ2cgKCcsIGN1cnNvcjogWzQsIDNdXG4gICAgICAgICAgZW5zdXJlICdnICgnLCBjdXJzb3I6IFsxLCA3XVxuICAgICAgICAgIGVuc3VyZSAnZyAoJywgY3Vyc29yOiBbMSwgMF1cbiAgICAgICAgICBlbnN1cmUgJ2cgKCcsIGN1cnNvcjogWzAsIDIxXVxuXG4gICAgICAgICAgZW5zdXJlICdnICgnLCBjdXJzb3I6IFswLCAwXVxuICAgICAgICAgIGVuc3VyZSAnZyAoJywgY3Vyc29yOiBbMCwgMF1cblxuICAgIGRlc2NyaWJlIFwibW92aW5nIGluc2lkZSBhIGJsYW5rIGRvY3VtZW50XCIsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIHRleHRfOiBcIlwiXCJcbiAgICAgICAgICBfX19fX1xuICAgICAgICAgIF9fX19fXG4gICAgICAgICAgXCJcIlwiXG5cbiAgICAgIGl0IFwibW92ZXMgd2l0aG91dCBjcmFzaGluZ1wiLCAtPlxuICAgICAgICBzZXQgICAgICAgICBjdXJzb3I6IFswLCAwXVxuICAgICAgICBlbnN1cmUgJyknLCBjdXJzb3I6IFsxLCA0XVxuICAgICAgICBlbnN1cmUgJyknLCBjdXJzb3I6IFsxLCA0XVxuICAgICAgICBlbnN1cmUgJygnLCBjdXJzb3I6IFswLCAwXVxuICAgICAgICBlbnN1cmUgJygnLCBjdXJzb3I6IFswLCAwXVxuXG4gICAgZGVzY3JpYmUgXCJhcyBhIHNlbGVjdGlvblwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXQgdGV4dDogXCJzZW50ZW5jZSBvbmUuIHNlbnRlbmNlIHR3by5cXG4gIHNlbnRlbmNlIHRocmVlLlwiXG5cbiAgICAgIGl0ICdzZWxlY3RzIHRvIHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgc2VudGVuY2UnLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMCwgMjBdXG4gICAgICAgIGVuc3VyZSAneSApJywgcmVnaXN0ZXI6ICdcIic6IHRleHQ6IFwiY2UgdHdvLlxcbiAgXCJcblxuICAgICAgaXQgJ3NlbGVjdHMgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgY3VycmVudCBzZW50ZW5jZScsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFswLCAyMF1cbiAgICAgICAgZW5zdXJlICd5ICgnLCByZWdpc3RlcjogJ1wiJzogdGV4dDogXCJzZW50ZW5cIlxuXG4gIGRlc2NyaWJlIFwidGhlIHssfSBrZXliaW5kaW5nXCIsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgc2V0XG4gICAgICAgIHRleHQ6IFwiXCJcIlxuXG5cblxuICAgICAgICAzOiBwYXJhZ3JhcGgtMVxuICAgICAgICA0OiBwYXJhZ3JhcGgtMVxuXG5cblxuICAgICAgICA4OiBwYXJhZ3JhcGgtMlxuXG5cblxuICAgICAgICAxMjogcGFyYWdyYXBoLTNcbiAgICAgICAgMTM6IHBhcmFncmFwaC0zXG5cblxuICAgICAgICAxNjogcGFyYWdwcmFoLTRcXG5cbiAgICAgICAgXCJcIlwiXG4gICAgICAgIGN1cnNvcjogWzAsIDBdXG5cbiAgICBkZXNjcmliZSBcImFzIGEgbW90aW9uXCIsIC0+XG4gICAgICBpdCBcIm1vdmVzIHRoZSBjdXJzb3IgdG8gdGhlIGVuZCBvZiB0aGUgcGFyYWdyYXBoXCIsIC0+XG4gICAgICAgIHNldCAgICAgICAgIGN1cnNvcjogWzAsIDBdXG4gICAgICAgIGVuc3VyZSAnfScsIGN1cnNvcjogWzUsIDBdXG4gICAgICAgIGVuc3VyZSAnfScsIGN1cnNvcjogWzksIDBdXG4gICAgICAgIGVuc3VyZSAnfScsIGN1cnNvcjogWzE0LCAwXVxuICAgICAgICBlbnN1cmUgJ3snLCBjdXJzb3I6IFsxMSwgMF1cbiAgICAgICAgZW5zdXJlICd7JywgY3Vyc29yOiBbNywgMF1cbiAgICAgICAgZW5zdXJlICd7JywgY3Vyc29yOiBbMiwgMF1cblxuICAgICAgaXQgXCJzdXBwb3J0IGNvdW50XCIsIC0+XG4gICAgICAgIHNldCAgICAgICAgICAgY3Vyc29yOiBbMCwgMF1cbiAgICAgICAgZW5zdXJlICczIH0nLCBjdXJzb3I6IFsxNCwgMF1cbiAgICAgICAgZW5zdXJlICczIHsnLCBjdXJzb3I6IFsyLCAwXVxuXG4gICAgICBpdCBcImNhbiBtb3ZlIHN0YXJ0IG9mIGJ1ZmZlciBvciBlbmQgb2YgYnVmZmVyIGF0IG1heGltdW1cIiwgLT5cbiAgICAgICAgc2V0ICAgICAgICAgICAgIGN1cnNvcjogWzAsIDBdXG4gICAgICAgIGVuc3VyZSAnMSAwIH0nLCBjdXJzb3I6IFsxNiwgMTRdXG4gICAgICAgIGVuc3VyZSAnMSAwIHsnLCBjdXJzb3I6IFswLCAwXVxuXG4gICAgZGVzY3JpYmUgXCJhcyBhIHNlbGVjdGlvblwiLCAtPlxuICAgICAgaXQgJ3NlbGVjdHMgdG8gdGhlIGVuZCBvZiB0aGUgY3VycmVudCBwYXJhZ3JhcGgnLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMywgM11cbiAgICAgICAgZW5zdXJlICd5IH0nLCByZWdpc3RlcjogJ1wiJzogdGV4dDogXCJwYXJhZ3JhcGgtMVxcbjQ6IHBhcmFncmFwaC0xXFxuXCJcbiAgICAgIGl0ICdzZWxlY3RzIHRvIHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgcGFyYWdyYXBoJywgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzQsIDNdXG4gICAgICAgIGVuc3VyZSAneSB7JywgcmVnaXN0ZXI6ICdcIic6IHRleHQ6IFwiXFxuMzogcGFyYWdyYXBoLTFcXG40OiBcIlxuXG4gIGRlc2NyaWJlIFwiTW92ZVRvTmV4dERpZmZIdW5rLCBNb3ZlVG9QcmV2aW91c0RpZmZIdW5rXCIsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgc2V0XG4gICAgICAgIHRleHQ6IFwiXCJcIlxuICAgICAgICAtLS0gZmlsZSAgICAgICAgMjAxNy0xMi0yNCAxNToxMTozMy4wMDAwMDAwMDAgKzA5MDBcbiAgICAgICAgKysrIGZpbGUtbmV3ICAgIDIwMTctMTItMjQgMTU6MTU6MDkuMDAwMDAwMDAwICswOTAwXG4gICAgICAgIEBAIC0xLDkgKzEsOSBAQFxuICAgICAgICAgbGluZSAwXG4gICAgICAgICtsaW5lIDAtMVxuICAgICAgICAgbGluZSAxXG4gICAgICAgIC1saW5lIDJcbiAgICAgICAgK2xpbmUgMS0xXG4gICAgICAgICBsaW5lIDNcbiAgICAgICAgLWxpbmUgNFxuICAgICAgICAgbGluZSA1XG4gICAgICAgIC1saW5lIDZcbiAgICAgICAgLWxpbmUgN1xuICAgICAgICArbGluZSA3LTFcbiAgICAgICAgK2xpbmUgNy0yXG4gICAgICAgICBsaW5lIDhcXG5cbiAgICAgICAgXCJcIlwiXG4gICAgICAgIGN1cnNvcjogWzAsIDBdXG5cbiAgICAgIHJ1bnMgLT5cbiAgICAgICAgYXRvbS5rZXltYXBzLmFkZCBcInRlc3RcIixcbiAgICAgICAgICAnYXRvbS10ZXh0LWVkaXRvci52aW0tbW9kZS1wbHVzOm5vdCguaW5zZXJ0LW1vZGUpJzpcbiAgICAgICAgICAgICddJzogJ3ZpbS1tb2RlLXBsdXM6bW92ZS10by1uZXh0LWRpZmYtaHVuaydcbiAgICAgICAgICAgICdbJzogJ3ZpbS1tb2RlLXBsdXM6bW92ZS10by1wcmV2aW91cy1kaWZmLWh1bmsnXG5cbiAgICBpdCBcIm1vdmUgdG8gbmV4dCBhbmQgcHJldmlvdXMgaHVua1wiLCAtPlxuICAgICAgZW5zdXJlICddJywgY3Vyc29yOiBbMSwgMF1cbiAgICAgIGVuc3VyZSAnXScsIGN1cnNvcjogWzQsIDBdXG4gICAgICBlbnN1cmUgJ10nLCBjdXJzb3I6IFs2LCAwXVxuICAgICAgZW5zdXJlICddJywgY3Vyc29yOiBbNywgMF1cbiAgICAgIGVuc3VyZSAnXScsIGN1cnNvcjogWzksIDBdXG4gICAgICBlbnN1cmUgJ10nLCBjdXJzb3I6IFsxMSwgMF1cbiAgICAgIGVuc3VyZSAnXScsIGN1cnNvcjogWzEzLCAwXVxuICAgICAgZW5zdXJlICddJywgY3Vyc29yOiBbMTMsIDBdXG5cbiAgICAgIGVuc3VyZSAnWycsIGN1cnNvcjogWzExLCAwXVxuICAgICAgZW5zdXJlICdbJywgY3Vyc29yOiBbOSwgMF1cbiAgICAgIGVuc3VyZSAnWycsIGN1cnNvcjogWzcsIDBdXG4gICAgICBlbnN1cmUgJ1snLCBjdXJzb3I6IFs2LCAwXVxuICAgICAgZW5zdXJlICdbJywgY3Vyc29yOiBbNCwgMF1cbiAgICAgIGVuc3VyZSAnWycsIGN1cnNvcjogWzEsIDBdXG4gICAgICBlbnN1cmUgJ1snLCBjdXJzb3I6IFswLCAwXVxuICAgICAgZW5zdXJlICdbJywgY3Vyc29yOiBbMCwgMF1cblxuICBkZXNjcmliZSBcInRoZSBiIGtleWJpbmRpbmdcIiwgLT5cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBzZXRcbiAgICAgICAgdGV4dENfOiBcIlwiXCJcbiAgICAgICAgX2FiIGNkZTErLV9cbiAgICAgICAgX3h5elxuXG4gICAgICAgIHppcCB9XG4gICAgICAgIF98bGFzdFxuICAgICAgICBcIlwiXCJcblxuICAgIGRlc2NyaWJlIFwiYXMgYSBtb3Rpb25cIiwgLT5cbiAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBwcmV2aW91cyB3b3JkXCIsIC0+XG4gICAgICAgIGVuc3VyZSAnYicsIHRleHRDOiBcIiBhYiBjZGUxKy0gXFxuIHh5elxcblxcbnppcCB8fVxcbiBsYXN0XCJcbiAgICAgICAgZW5zdXJlICdiJywgdGV4dEM6IFwiIGFiIGNkZTErLSBcXG4geHl6XFxuXFxufHppcCB9XFxuIGxhc3RcIlxuICAgICAgICBlbnN1cmUgJ2InLCB0ZXh0QzogXCIgYWIgY2RlMSstIFxcbiB4eXpcXG58XFxuemlwIH1cXG4gbGFzdFwiXG4gICAgICAgIGVuc3VyZSAnYicsIHRleHRDOiBcIiBhYiBjZGUxKy0gXFxuIHx4eXpcXG5cXG56aXAgfVxcbiBsYXN0XCJcbiAgICAgICAgZW5zdXJlICdiJywgdGV4dEM6IFwiIGFiIGNkZTF8Ky0gXFxuIHh5elxcblxcbnppcCB9XFxuIGxhc3RcIlxuICAgICAgICBlbnN1cmUgJ2InLCB0ZXh0QzogXCIgYWIgfGNkZTErLSBcXG4geHl6XFxuXFxuemlwIH1cXG4gbGFzdFwiXG4gICAgICAgIGVuc3VyZSAnYicsIHRleHRDOiBcIiB8YWIgY2RlMSstIFxcbiB4eXpcXG5cXG56aXAgfVxcbiBsYXN0XCJcblxuICAgICAgICAjIEdvIHRvIHN0YXJ0IG9mIHRoZSBmaWxlLCBhZnRlciBtb3ZpbmcgcGFzdCB0aGUgZmlyc3Qgd29yZFxuICAgICAgICBlbnN1cmUgJ2InLCB0ZXh0QzogXCJ8IGFiIGNkZTErLSBcXG4geHl6XFxuXFxuemlwIH1cXG4gbGFzdFwiXG4gICAgICAgICMgRG8gbm90aGluZ1xuICAgICAgICBlbnN1cmUgJ2InLCB0ZXh0QzogXCJ8IGFiIGNkZTErLSBcXG4geHl6XFxuXFxuemlwIH1cXG4gbGFzdFwiXG5cbiAgICBkZXNjcmliZSBcImFzIGEgc2VsZWN0aW9uXCIsIC0+XG4gICAgICBkZXNjcmliZSBcIndpdGhpbiBhIHdvcmRcIiwgLT5cbiAgICAgICAgaXQgXCJzZWxlY3RzIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGN1cnJlbnQgd29yZFwiLCAtPlxuICAgICAgICAgIHNldCB0ZXh0QzogXCIgYXxiIGNkXCI7IGVuc3VyZSAneSBiJywgdGV4dEM6IFwiIHxhYiBjZFwiLCByZWdpc3RlcjogJ1wiJzogdGV4dDogJ2EnXG5cbiAgICAgIGRlc2NyaWJlIFwiYmV0d2VlbiB3b3Jkc1wiLCAtPlxuICAgICAgICBpdCBcInNlbGVjdHMgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgbGFzdCB3b3JkXCIsIC0+XG4gICAgICAgICAgc2V0IHRleHRDOiBcIiBhYiB8Y2RcIjsgZW5zdXJlICd5IGInLCB0ZXh0QzogXCIgfGFiIGNkXCIsIHJlZ2lzdGVyOiAnXCInOiB0ZXh0OiAnYWIgJ1xuXG4gIGRlc2NyaWJlIFwidGhlIEIga2V5YmluZGluZ1wiLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIHNldFxuICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICBjZGUxKy0gYWJcbiAgICAgICAgICBcXHQgeHl6LTEyM1xuXG4gICAgICAgICAgIHppcFxcblxuICAgICAgICAgIFwiXCJcIlxuXG4gICAgZGVzY3JpYmUgXCJhcyBhIG1vdGlvblwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbNCwgMF1cblxuICAgICAgaXQgXCJtb3ZlcyB0aGUgY3Vyc29yIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHByZXZpb3VzIHdvcmRcIiwgLT5cbiAgICAgICAgZW5zdXJlICdCJywgY3Vyc29yOiBbMywgMV1cbiAgICAgICAgZW5zdXJlICdCJywgY3Vyc29yOiBbMiwgMF1cbiAgICAgICAgZW5zdXJlICdCJywgY3Vyc29yOiBbMSwgMl1cbiAgICAgICAgZW5zdXJlICdCJywgY3Vyc29yOiBbMCwgN11cbiAgICAgICAgZW5zdXJlICdCJywgY3Vyc29yOiBbMCwgMF1cblxuICAgIGRlc2NyaWJlIFwiYXMgYSBzZWxlY3Rpb25cIiwgLT5cbiAgICAgIGl0IFwic2VsZWN0cyB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSB3aG9sZSB3b3JkXCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFsxLCA4XVxuICAgICAgICBlbnN1cmUgJ3kgQicsIHJlZ2lzdGVyOiAnXCInOiB0ZXh0OiAneHl6LTEyJyAjIGJlY2F1c2UgY3Vyc29yIGlzIG9uIHRoZSBgM2BcblxuICAgICAgaXQgXCJkb2Vzbid0IGdvIHBhc3QgdGhlIGJlZ2lubmluZyBvZiB0aGUgZmlsZVwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMCwgMF0sIHJlZ2lzdGVyOiAnXCInOiB0ZXh0OiAnYWJjJ1xuICAgICAgICBlbnN1cmUgJ3kgQicsIHJlZ2lzdGVyOiAnXCInOiB0ZXh0OiAnYWJjJ1xuXG4gIGRlc2NyaWJlIFwidGhlIF4ga2V5YmluZGluZ1wiLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIHNldCB0ZXh0QzogXCJ8ICBhYmNkZVwiXG5cbiAgICBkZXNjcmliZSBcImZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgbGluZVwiLCAtPlxuICAgICAgZGVzY3JpYmUgXCJhcyBhIG1vdGlvblwiLCAtPlxuICAgICAgICBpdCBcIm1vdmVzIHRoZSBjdXJzb3IgdG8gdGhlIGZpcnN0IGNoYXJhY3RlciBvZiB0aGUgbGluZVwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnXicsIGN1cnNvcjogWzAsIDJdXG5cbiAgICAgIGRlc2NyaWJlIFwiYXMgYSBzZWxlY3Rpb25cIiwgLT5cbiAgICAgICAgaXQgJ3NlbGVjdHMgdG8gdGhlIGZpcnN0IGNoYXJhY3RlciBvZiB0aGUgbGluZScsIC0+XG4gICAgICAgICAgZW5zdXJlICdkIF4nLCB0ZXh0OiAnYWJjZGUnLCBjdXJzb3I6IFswLCAwXVxuICAgICAgICBpdCAnc2VsZWN0cyB0byB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBsaW5lJywgLT5cbiAgICAgICAgICBlbnN1cmUgJ2QgSScsIHRleHQ6ICdhYmNkZScsIGN1cnNvcjogWzAsIDBdXG5cbiAgICBkZXNjcmliZSBcImZyb20gdGhlIGZpcnN0IGNoYXJhY3RlciBvZiB0aGUgbGluZVwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMCwgMl1cblxuICAgICAgZGVzY3JpYmUgXCJhcyBhIG1vdGlvblwiLCAtPlxuICAgICAgICBpdCBcInN0YXlzIHB1dFwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnXicsIGN1cnNvcjogWzAsIDJdXG5cbiAgICAgIGRlc2NyaWJlIFwiYXMgYSBzZWxlY3Rpb25cIiwgLT5cbiAgICAgICAgaXQgXCJkb2VzIG5vdGhpbmdcIiwgLT5cbiAgICAgICAgICBlbnN1cmUgJ2QgXicsXG4gICAgICAgICAgICB0ZXh0OiAnICBhYmNkZSdcbiAgICAgICAgICAgIGN1cnNvcjogWzAsIDJdXG5cbiAgICBkZXNjcmliZSBcImZyb20gdGhlIG1pZGRsZSBvZiBhIHdvcmRcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzAsIDRdXG5cbiAgICAgIGRlc2NyaWJlIFwiYXMgYSBtb3Rpb25cIiwgLT5cbiAgICAgICAgaXQgXCJtb3ZlcyB0aGUgY3Vyc29yIHRvIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIGxpbmVcIiwgLT5cbiAgICAgICAgICBlbnN1cmUgJ14nLCBjdXJzb3I6IFswLCAyXVxuXG4gICAgICBkZXNjcmliZSBcImFzIGEgc2VsZWN0aW9uXCIsIC0+XG4gICAgICAgIGl0ICdzZWxlY3RzIHRvIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIGxpbmUnLCAtPlxuICAgICAgICAgIGVuc3VyZSAnZCBeJyxcbiAgICAgICAgICAgIHRleHQ6ICcgIGNkZSdcbiAgICAgICAgICAgIGN1cnNvcjogWzAsIDJdXG4gICAgICAgIGl0ICdzZWxlY3RzIHRvIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIGxpbmUnLCAtPlxuICAgICAgICAgIGVuc3VyZSAnZCBJJywgdGV4dDogJyAgY2RlJywgY3Vyc29yOiBbMCwgMl0sXG5cbiAgZGVzY3JpYmUgXCJ0aGUgMCBrZXliaW5kaW5nXCIsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgc2V0IHRleHRDOiBcIiAgYWJ8Y2RlXCJcblxuICAgIGRlc2NyaWJlIFwiYXMgYSBtb3Rpb25cIiwgLT5cbiAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciB0byB0aGUgZmlyc3QgY29sdW1uXCIsIC0+XG4gICAgICAgIGVuc3VyZSAnMCcsIGN1cnNvcjogWzAsIDBdXG5cbiAgICBkZXNjcmliZSBcImFzIGEgc2VsZWN0aW9uXCIsIC0+XG4gICAgICBpdCAnc2VsZWN0cyB0byB0aGUgZmlyc3QgY29sdW1uIG9mIHRoZSBsaW5lJywgLT5cbiAgICAgICAgZW5zdXJlICdkIDAnLCB0ZXh0OiAnY2RlJywgY3Vyc29yOiBbMCwgMF1cblxuICBkZXNjcmliZSBcImcgMCwgZyBeIGFuZCBnICRcIiwgLT5cbiAgICBlbmFibGVTb2Z0V3JhcEFuZEVuc3VyZSA9IC0+XG4gICAgICBlZGl0b3Iuc2V0U29mdFdyYXBwZWQodHJ1ZSlcbiAgICAgIGV4cGVjdChlZGl0b3IubGluZVRleHRGb3JTY3JlZW5Sb3coMCkpLnRvQmUoXCIgMTIzNDU2N1wiKVxuICAgICAgZXhwZWN0KGVkaXRvci5saW5lVGV4dEZvclNjcmVlblJvdygxKSkudG9CZShcIiA4OUIxMjM0XCIpICMgZmlyc3Qgc3BhY2UgaXMgc29mdHdyYXAgaW5kZW50YXRpb25cbiAgICAgIGV4cGVjdChlZGl0b3IubGluZVRleHRGb3JTY3JlZW5Sb3coMikpLnRvQmUoXCIgNTY3ODlDMVwiKSAjIGZpcnN0IHNwYWNlIGlzIHNvZnR3cmFwIGluZGVudGF0aW9uXG4gICAgICBleHBlY3QoZWRpdG9yLmxpbmVUZXh0Rm9yU2NyZWVuUm93KDMpKS50b0JlKFwiIDIzNDU2NzhcIikgIyBmaXJzdCBzcGFjZSBpcyBzb2Z0d3JhcCBpbmRlbnRhdGlvblxuICAgICAgZXhwZWN0KGVkaXRvci5saW5lVGV4dEZvclNjcmVlblJvdyg0KSkudG9CZShcIiA5XCIpICMgZmlyc3Qgc3BhY2UgaXMgc29mdHdyYXAgaW5kZW50YXRpb25cblxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICMgRm9yY2Ugc2Nyb2xsYmFycyB0byBiZSB2aXNpYmxlIHJlZ2FyZGxlc3Mgb2YgbG9jYWwgc3lzdGVtIGNvbmZpZ3VyYXRpb25cbiAgICAgIHNjcm9sbGJhclN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICAgICAgc2Nyb2xsYmFyU3R5bGUudGV4dENvbnRlbnQgPSAnOjotd2Via2l0LXNjcm9sbGJhciB7IC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZSB9J1xuICAgICAgamFzbWluZS5hdHRhY2hUb0RPTShzY3JvbGxiYXJTdHlsZSlcblxuICAgICAgc2V0IHRleHRfOiBcIlwiXCJcbiAgICAgIF8xMjM0NTY3ODlCMTIzNDU2Nzg5QzEyMzQ1Njc4OVxuICAgICAgXCJcIlwiXG4gICAgICBqYXNtaW5lLmF0dGFjaFRvRE9NKGdldFZpZXcoYXRvbS53b3Jrc3BhY2UpKVxuICAgICAgd2FpdHNGb3JQcm9taXNlIC0+XG4gICAgICAgIHNldEVkaXRvcldpZHRoSW5DaGFyYWN0ZXJzKGVkaXRvciwgMTApXG5cbiAgICBkZXNjcmliZSBcInRoZSBnIDAga2V5YmluZGluZ1wiLCAtPlxuICAgICAgZGVzY3JpYmUgXCJhbGxvd01vdmVUb09mZlNjcmVlbkNvbHVtbk9uU2NyZWVuTGluZU1vdGlvbiA9IHRydWUoZGVmYXVsdClcIiwgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPiBzZXR0aW5ncy5zZXQoJ2FsbG93TW92ZVRvT2ZmU2NyZWVuQ29sdW1uT25TY3JlZW5MaW5lTW90aW9uJywgdHJ1ZSlcblxuICAgICAgICBkZXNjcmliZSBcInNvZnR3cmFwID0gZmFsc2UsIGZpcnN0Q29sdW1uSXNWaXNpYmxlID0gdHJ1ZVwiLCAtPlxuICAgICAgICAgIGJlZm9yZUVhY2ggLT4gc2V0IGN1cnNvcjogWzAsIDNdXG4gICAgICAgICAgaXQgXCJtb3ZlIHRvIGNvbHVtbiAwIG9mIHNjcmVlbiBsaW5lXCIsIC0+IGVuc3VyZSBcImcgMFwiLCBjdXJzb3I6IFswLCAwXVxuXG4gICAgICAgIGRlc2NyaWJlIFwic29mdHdyYXAgPSBmYWxzZSwgZmlyc3RDb2x1bW5Jc1Zpc2libGUgPSBmYWxzZVwiLCAtPlxuICAgICAgICAgIGJlZm9yZUVhY2ggLT4gc2V0IGN1cnNvcjogWzAsIDE1XTsgZWRpdG9yLnNldEZpcnN0VmlzaWJsZVNjcmVlbkNvbHVtbigxMClcbiAgICAgICAgICBpdCBcIm1vdmUgdG8gY29sdW1uIDAgb2Ygc2NyZWVuIGxpbmVcIiwgLT4gZW5zdXJlIFwiZyAwXCIsIGN1cnNvcjogWzAsIDBdXG5cbiAgICAgICAgZGVzY3JpYmUgXCJzb2Z0d3JhcCA9IHRydWVcIiwgLT5cbiAgICAgICAgICBiZWZvcmVFYWNoIC0+IGVuYWJsZVNvZnRXcmFwQW5kRW5zdXJlKClcbiAgICAgICAgICBpdCBcIm1vdmUgdG8gY29sdW1uIDAgb2Ygc2NyZWVuIGxpbmVcIiwgLT5cbiAgICAgICAgICAgIHNldCBjdXJzb3JTY3JlZW46IFswLCAzXTsgZW5zdXJlIFwiZyAwXCIsIGN1cnNvclNjcmVlbjogWzAsIDBdXG4gICAgICAgICAgICBzZXQgY3Vyc29yU2NyZWVuOiBbMSwgM107IGVuc3VyZSBcImcgMFwiLCBjdXJzb3JTY3JlZW46IFsxLCAxXSAjIHNraXAgc29mdHdyYXAgaW5kZW50YXRpb24uXG5cbiAgICAgIGRlc2NyaWJlIFwiYWxsb3dNb3ZlVG9PZmZTY3JlZW5Db2x1bW5PblNjcmVlbkxpbmVNb3Rpb24gPSBmYWxzZVwiLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+IHNldHRpbmdzLnNldCgnYWxsb3dNb3ZlVG9PZmZTY3JlZW5Db2x1bW5PblNjcmVlbkxpbmVNb3Rpb24nLCBmYWxzZSlcblxuICAgICAgICBkZXNjcmliZSBcInNvZnR3cmFwID0gZmFsc2UsIGZpcnN0Q29sdW1uSXNWaXNpYmxlID0gdHJ1ZVwiLCAtPlxuICAgICAgICAgIGJlZm9yZUVhY2ggLT4gc2V0IGN1cnNvcjogWzAsIDNdXG4gICAgICAgICAgaXQgXCJtb3ZlIHRvIGNvbHVtbiAwIG9mIHNjcmVlbiBsaW5lXCIsIC0+IGVuc3VyZSBcImcgMFwiLCBjdXJzb3I6IFswLCAwXVxuXG4gICAgICAgIGRlc2NyaWJlIFwic29mdHdyYXAgPSBmYWxzZSwgZmlyc3RDb2x1bW5Jc1Zpc2libGUgPSBmYWxzZVwiLCAtPlxuICAgICAgICAgIGJlZm9yZUVhY2ggLT4gc2V0IGN1cnNvcjogWzAsIDE1XTsgZWRpdG9yLnNldEZpcnN0VmlzaWJsZVNjcmVlbkNvbHVtbigxMClcbiAgICAgICAgICBpdCBcIm1vdmUgdG8gZmlyc3QgdmlzaWJsZSBjb2x1bSBvZiBzY3JlZW4gbGluZVwiLCAtPiBlbnN1cmUgXCJnIDBcIiwgY3Vyc29yOiBbMCwgMTBdXG5cbiAgICAgICAgZGVzY3JpYmUgXCJzb2Z0d3JhcCA9IHRydWVcIiwgLT5cbiAgICAgICAgICBiZWZvcmVFYWNoIC0+IGVuYWJsZVNvZnRXcmFwQW5kRW5zdXJlKClcbiAgICAgICAgICBpdCBcIm1vdmUgdG8gY29sdW1uIDAgb2Ygc2NyZWVuIGxpbmVcIiwgLT5cbiAgICAgICAgICAgIHNldCBjdXJzb3JTY3JlZW46IFswLCAzXTsgZW5zdXJlIFwiZyAwXCIsIGN1cnNvclNjcmVlbjogWzAsIDBdXG4gICAgICAgICAgICBzZXQgY3Vyc29yU2NyZWVuOiBbMSwgM107IGVuc3VyZSBcImcgMFwiLCBjdXJzb3JTY3JlZW46IFsxLCAxXSAjIHNraXAgc29mdHdyYXAgaW5kZW50YXRpb24uXG5cbiAgICBkZXNjcmliZSBcInRoZSBnIF4ga2V5YmluZGluZ1wiLCAtPlxuICAgICAgZGVzY3JpYmUgXCJhbGxvd01vdmVUb09mZlNjcmVlbkNvbHVtbk9uU2NyZWVuTGluZU1vdGlvbiA9IHRydWUoZGVmYXVsdClcIiwgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPiBzZXR0aW5ncy5zZXQoJ2FsbG93TW92ZVRvT2ZmU2NyZWVuQ29sdW1uT25TY3JlZW5MaW5lTW90aW9uJywgdHJ1ZSlcblxuICAgICAgICBkZXNjcmliZSBcInNvZnR3cmFwID0gZmFsc2UsIGZpcnN0Q29sdW1uSXNWaXNpYmxlID0gdHJ1ZVwiLCAtPlxuICAgICAgICAgIGJlZm9yZUVhY2ggLT4gc2V0IGN1cnNvcjogWzAsIDNdXG4gICAgICAgICAgaXQgXCJtb3ZlIHRvIGZpcnN0LWNoYXIgb2Ygc2NyZWVuIGxpbmVcIiwgLT4gZW5zdXJlIFwiZyBeXCIsIGN1cnNvcjogWzAsIDFdXG5cbiAgICAgICAgZGVzY3JpYmUgXCJzb2Z0d3JhcCA9IGZhbHNlLCBmaXJzdENvbHVtbklzVmlzaWJsZSA9IGZhbHNlXCIsIC0+XG4gICAgICAgICAgYmVmb3JlRWFjaCAtPiBzZXQgY3Vyc29yOiBbMCwgMTVdOyBlZGl0b3Iuc2V0Rmlyc3RWaXNpYmxlU2NyZWVuQ29sdW1uKDEwKVxuICAgICAgICAgIGl0IFwibW92ZSB0byBmaXJzdC1jaGFyIG9mIHNjcmVlbiBsaW5lXCIsIC0+IGVuc3VyZSBcImcgXlwiLCBjdXJzb3I6IFswLCAxXVxuXG4gICAgICAgIGRlc2NyaWJlIFwic29mdHdyYXAgPSB0cnVlXCIsIC0+XG4gICAgICAgICAgYmVmb3JlRWFjaCAtPiBlbmFibGVTb2Z0V3JhcEFuZEVuc3VyZSgpXG4gICAgICAgICAgaXQgXCJtb3ZlIHRvIGZpcnN0LWNoYXIgb2Ygc2NyZWVuIGxpbmVcIiwgLT5cbiAgICAgICAgICAgIHNldCBjdXJzb3JTY3JlZW46IFswLCAzXTsgZW5zdXJlIFwiZyBeXCIsIGN1cnNvclNjcmVlbjogWzAsIDFdXG4gICAgICAgICAgICBzZXQgY3Vyc29yU2NyZWVuOiBbMSwgM107IGVuc3VyZSBcImcgXlwiLCBjdXJzb3JTY3JlZW46IFsxLCAxXSAjIHNraXAgc29mdHdyYXAgaW5kZW50YXRpb24uXG5cbiAgICAgIGRlc2NyaWJlIFwiYWxsb3dNb3ZlVG9PZmZTY3JlZW5Db2x1bW5PblNjcmVlbkxpbmVNb3Rpb24gPSBmYWxzZVwiLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+IHNldHRpbmdzLnNldCgnYWxsb3dNb3ZlVG9PZmZTY3JlZW5Db2x1bW5PblNjcmVlbkxpbmVNb3Rpb24nLCBmYWxzZSlcblxuICAgICAgICBkZXNjcmliZSBcInNvZnR3cmFwID0gZmFsc2UsIGZpcnN0Q29sdW1uSXNWaXNpYmxlID0gdHJ1ZVwiLCAtPlxuICAgICAgICAgIGJlZm9yZUVhY2ggLT4gc2V0IGN1cnNvcjogWzAsIDNdXG4gICAgICAgICAgaXQgXCJtb3ZlIHRvIGZpcnN0LWNoYXIgb2Ygc2NyZWVuIGxpbmVcIiwgLT4gZW5zdXJlIFwiZyBeXCIsIGN1cnNvcjogWzAsIDFdXG5cbiAgICAgICAgZGVzY3JpYmUgXCJzb2Z0d3JhcCA9IGZhbHNlLCBmaXJzdENvbHVtbklzVmlzaWJsZSA9IGZhbHNlXCIsIC0+XG4gICAgICAgICAgYmVmb3JlRWFjaCAtPiBzZXQgY3Vyc29yOiBbMCwgMTVdOyBlZGl0b3Iuc2V0Rmlyc3RWaXNpYmxlU2NyZWVuQ29sdW1uKDEwKVxuICAgICAgICAgIGl0IFwibW92ZSB0byBmaXJzdC1jaGFyIG9mIHNjcmVlbiBsaW5lXCIsIC0+IGVuc3VyZSBcImcgXlwiLCBjdXJzb3I6IFswLCAxMF1cblxuICAgICAgICBkZXNjcmliZSBcInNvZnR3cmFwID0gdHJ1ZVwiLCAtPlxuICAgICAgICAgIGJlZm9yZUVhY2ggLT4gZW5hYmxlU29mdFdyYXBBbmRFbnN1cmUoKVxuICAgICAgICAgIGl0IFwibW92ZSB0byBmaXJzdC1jaGFyIG9mIHNjcmVlbiBsaW5lXCIsIC0+XG4gICAgICAgICAgICBzZXQgY3Vyc29yU2NyZWVuOiBbMCwgM107IGVuc3VyZSBcImcgXlwiLCBjdXJzb3JTY3JlZW46IFswLCAxXVxuICAgICAgICAgICAgc2V0IGN1cnNvclNjcmVlbjogWzEsIDNdOyBlbnN1cmUgXCJnIF5cIiwgY3Vyc29yU2NyZWVuOiBbMSwgMV0gIyBza2lwIHNvZnR3cmFwIGluZGVudGF0aW9uLlxuXG4gICAgZGVzY3JpYmUgXCJ0aGUgZyAkIGtleWJpbmRpbmdcIiwgLT5cbiAgICAgIGRlc2NyaWJlIFwiYWxsb3dNb3ZlVG9PZmZTY3JlZW5Db2x1bW5PblNjcmVlbkxpbmVNb3Rpb24gPSB0cnVlKGRlZmF1bHQpXCIsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT4gc2V0dGluZ3Muc2V0KCdhbGxvd01vdmVUb09mZlNjcmVlbkNvbHVtbk9uU2NyZWVuTGluZU1vdGlvbicsIHRydWUpXG5cbiAgICAgICAgZGVzY3JpYmUgXCJzb2Z0d3JhcCA9IGZhbHNlLCBsYXN0Q29sdW1uSXNWaXNpYmxlID0gdHJ1ZVwiLCAtPlxuICAgICAgICAgIGJlZm9yZUVhY2ggLT4gc2V0IGN1cnNvcjogWzAsIDI3XVxuICAgICAgICAgIGl0IFwibW92ZSB0byBsYXN0LWNoYXIgb2Ygc2NyZWVuIGxpbmVcIiwgLT4gZW5zdXJlIFwiZyAkXCIsIGN1cnNvcjogWzAsIDI5XVxuXG4gICAgICAgIGRlc2NyaWJlIFwic29mdHdyYXAgPSBmYWxzZSwgbGFzdENvbHVtbklzVmlzaWJsZSA9IGZhbHNlXCIsIC0+XG4gICAgICAgICAgYmVmb3JlRWFjaCAtPiBzZXQgY3Vyc29yOiBbMCwgMTVdOyBlZGl0b3Iuc2V0Rmlyc3RWaXNpYmxlU2NyZWVuQ29sdW1uKDEwKVxuICAgICAgICAgIGl0IFwibW92ZSB0byBsYXN0LWNoYXIgb2Ygc2NyZWVuIGxpbmVcIiwgLT4gZW5zdXJlIFwiZyAkXCIsIGN1cnNvcjogWzAsIDI5XVxuXG4gICAgICAgIGRlc2NyaWJlIFwic29mdHdyYXAgPSB0cnVlXCIsIC0+XG4gICAgICAgICAgYmVmb3JlRWFjaCAtPiBlbmFibGVTb2Z0V3JhcEFuZEVuc3VyZSgpXG4gICAgICAgICAgaXQgXCJtb3ZlIHRvIGxhc3QtY2hhciBvZiBzY3JlZW4gbGluZVwiLCAtPlxuICAgICAgICAgICAgc2V0IGN1cnNvclNjcmVlbjogWzAsIDNdOyBlbnN1cmUgXCJnICRcIiwgY3Vyc29yU2NyZWVuOiBbMCwgN11cbiAgICAgICAgICAgIHNldCBjdXJzb3JTY3JlZW46IFsxLCAzXTsgZW5zdXJlIFwiZyAkXCIsIGN1cnNvclNjcmVlbjogWzEsIDddXG5cbiAgICAgIGRlc2NyaWJlIFwiYWxsb3dNb3ZlVG9PZmZTY3JlZW5Db2x1bW5PblNjcmVlbkxpbmVNb3Rpb24gPSBmYWxzZVwiLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+IHNldHRpbmdzLnNldCgnYWxsb3dNb3ZlVG9PZmZTY3JlZW5Db2x1bW5PblNjcmVlbkxpbmVNb3Rpb24nLCBmYWxzZSlcblxuICAgICAgICBkZXNjcmliZSBcInNvZnR3cmFwID0gZmFsc2UsIGxhc3RDb2x1bW5Jc1Zpc2libGUgPSB0cnVlXCIsIC0+XG4gICAgICAgICAgYmVmb3JlRWFjaCAtPiBzZXQgY3Vyc29yOiBbMCwgMjddXG4gICAgICAgICAgaXQgXCJtb3ZlIHRvIGxhc3QtY2hhciBvZiBzY3JlZW4gbGluZVwiLCAtPiBlbnN1cmUgXCJnICRcIiwgY3Vyc29yOiBbMCwgMjldXG5cbiAgICAgICAgZGVzY3JpYmUgXCJzb2Z0d3JhcCA9IGZhbHNlLCBsYXN0Q29sdW1uSXNWaXNpYmxlID0gZmFsc2VcIiwgLT5cbiAgICAgICAgICBiZWZvcmVFYWNoIC0+IHNldCBjdXJzb3I6IFswLCAxNV07IGVkaXRvci5zZXRGaXJzdFZpc2libGVTY3JlZW5Db2x1bW4oMTApXG4gICAgICAgICAgaXQgXCJtb3ZlIHRvIGxhc3QtY2hhciBpbiB2aXNpYmxlIHNjcmVlbiBsaW5lXCIsIC0+IGVuc3VyZSBcImcgJFwiLCBjdXJzb3I6IFswLCAxOF1cblxuICAgICAgICBkZXNjcmliZSBcInNvZnR3cmFwID0gdHJ1ZVwiLCAtPlxuICAgICAgICAgIGJlZm9yZUVhY2ggLT4gZW5hYmxlU29mdFdyYXBBbmRFbnN1cmUoKVxuICAgICAgICAgIGl0IFwibW92ZSB0byBsYXN0LWNoYXIgb2Ygc2NyZWVuIGxpbmVcIiwgLT5cbiAgICAgICAgICAgIHNldCBjdXJzb3JTY3JlZW46IFswLCAzXTsgZW5zdXJlIFwiZyAkXCIsIGN1cnNvclNjcmVlbjogWzAsIDddXG4gICAgICAgICAgICBzZXQgY3Vyc29yU2NyZWVuOiBbMSwgM107IGVuc3VyZSBcImcgJFwiLCBjdXJzb3JTY3JlZW46IFsxLCA3XVxuXG4gIGRlc2NyaWJlIFwidGhlIHwga2V5YmluZGluZ1wiLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIHNldCB0ZXh0OiBcIiAgYWJjZGVcIiwgY3Vyc29yOiBbMCwgNF1cblxuICAgIGRlc2NyaWJlIFwiYXMgYSBtb3Rpb25cIiwgLT5cbiAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciB0byB0aGUgbnVtYmVyIGNvbHVtblwiLCAtPlxuICAgICAgICBlbnN1cmUgJ3wnLCAgIGN1cnNvcjogWzAsIDBdXG4gICAgICAgIGVuc3VyZSAnMSB8JywgY3Vyc29yOiBbMCwgMF1cbiAgICAgICAgZW5zdXJlICczIHwnLCBjdXJzb3I6IFswLCAyXVxuICAgICAgICBlbnN1cmUgJzQgfCcsIGN1cnNvcjogWzAsIDNdXG5cbiAgICBkZXNjcmliZSBcImFzIG9wZXJhdG9yJ3MgdGFyZ2V0XCIsIC0+XG4gICAgICBpdCAnYmVoYXZlIGV4Y2x1c2l2ZWx5JywgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzAsIDBdXG4gICAgICAgIGVuc3VyZSAnZCA0IHwnLCB0ZXh0OiAnYmNkZScsIGN1cnNvcjogWzAsIDBdXG5cbiAgZGVzY3JpYmUgXCJ0aGUgJCBrZXliaW5kaW5nXCIsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgc2V0XG4gICAgICAgIHRleHQ6IFwiICBhYmNkZVxcblxcbjEyMzQ1Njc4OTBcIlxuICAgICAgICBjdXJzb3I6IFswLCA0XVxuXG4gICAgZGVzY3JpYmUgXCJhcyBhIG1vdGlvbiBmcm9tIGVtcHR5IGxpbmVcIiwgLT5cbiAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciB0byB0aGUgZW5kIG9mIHRoZSBsaW5lXCIsIC0+XG4gICAgICAgIHNldCAgICAgICAgIGN1cnNvcjogWzEsIDBdXG4gICAgICAgIGVuc3VyZSAnJCcsIGN1cnNvcjogWzEsIDBdXG5cbiAgICBkZXNjcmliZSBcImFzIGEgbW90aW9uXCIsIC0+XG4gICAgICAjIEZJWE1FOiBTZWUgYXRvbS92aW0tbW9kZSMyXG4gICAgICBpdCBcIm1vdmVzIHRoZSBjdXJzb3IgdG8gdGhlIGVuZCBvZiB0aGUgbGluZVwiLCAtPlxuICAgICAgICBlbnN1cmUgJyQnLCBjdXJzb3I6IFswLCA2XVxuXG4gICAgICBpdCBcInNldCBnb2FsQ29sdW1uIEluZmluaXR5XCIsIC0+XG4gICAgICAgIGV4cGVjdChlZGl0b3IuZ2V0TGFzdEN1cnNvcigpLmdvYWxDb2x1bW4pLnRvQmUobnVsbClcbiAgICAgICAgZW5zdXJlICckJywgY3Vyc29yOiBbMCwgNl1cbiAgICAgICAgZXhwZWN0KGVkaXRvci5nZXRMYXN0Q3Vyc29yKCkuZ29hbENvbHVtbikudG9CZShJbmZpbml0eSlcblxuICAgICAgaXQgXCJzaG91bGQgcmVtYWluIGluIHRoZSBsYXN0IGNvbHVtbiB3aGVuIG1vdmluZyBkb3duXCIsIC0+XG4gICAgICAgIGVuc3VyZSAnJCBqJywgY3Vyc29yOiBbMSwgMF1cbiAgICAgICAgZW5zdXJlICdqJywgICBjdXJzb3I6IFsyLCA5XVxuXG4gICAgICBpdCBcInN1cHBvcnQgY291bnRcIiwgLT5cbiAgICAgICAgZW5zdXJlICczICQnLCBjdXJzb3I6IFsyLCA5XVxuXG4gICAgZGVzY3JpYmUgXCJhcyBhIHNlbGVjdGlvblwiLCAtPlxuICAgICAgaXQgXCJzZWxlY3RzIHRvIHRoZSBlbmQgb2YgdGhlIGxpbmVzXCIsIC0+XG4gICAgICAgIGVuc3VyZSAnZCAkJyxcbiAgICAgICAgICB0ZXh0OiBcIiAgYWJcXG5cXG4xMjM0NTY3ODkwXCJcbiAgICAgICAgICBjdXJzb3I6IFswLCAzXVxuXG4gIGRlc2NyaWJlIFwidGhlIC0ga2V5YmluZGluZ1wiLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIHNldCB0ZXh0OiBcIlwiXCJcbiAgICAgICAgYWJjZGVmZ1xuICAgICAgICAgIGFiY1xuICAgICAgICAgIGFiY1xcblxuICAgICAgICBcIlwiXCJcblxuICAgIGRlc2NyaWJlIFwiZnJvbSB0aGUgbWlkZGxlIG9mIGEgbGluZVwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMSwgM11cbiAgICAgIGRlc2NyaWJlIFwiYXMgYSBtb3Rpb25cIiwgLT5cbiAgICAgICAgaXQgXCJtb3ZlcyB0aGUgY3Vyc29yIHRvIHRoZSBsYXN0IGNoYXJhY3RlciBvZiB0aGUgcHJldmlvdXMgbGluZVwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnLScsIGN1cnNvcjogWzAsIDBdXG5cbiAgICAgIGRlc2NyaWJlIFwiYXMgYSBzZWxlY3Rpb25cIiwgLT5cbiAgICAgICAgaXQgXCJkZWxldGVzIHRoZSBjdXJyZW50IGFuZCBwcmV2aW91cyBsaW5lXCIsIC0+XG4gICAgICAgICAgZW5zdXJlICdkIC0nLCB0ZXh0OiBcIiAgYWJjXFxuXCIsIGN1cnNvcjogWzAsIDJdXG5cbiAgICBkZXNjcmliZSBcImZyb20gdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBhIGxpbmUgaW5kZW50ZWQgdGhlIHNhbWUgYXMgdGhlIHByZXZpb3VzIG9uZVwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMiwgMl1cblxuICAgICAgZGVzY3JpYmUgXCJhcyBhIG1vdGlvblwiLCAtPlxuICAgICAgICBpdCBcIm1vdmVzIHRvIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIHByZXZpb3VzIGxpbmUgKGRpcmVjdGx5IGFib3ZlKVwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnLScsIGN1cnNvcjogWzEsIDJdXG5cbiAgICAgIGRlc2NyaWJlIFwiYXMgYSBzZWxlY3Rpb25cIiwgLT5cbiAgICAgICAgaXQgXCJzZWxlY3RzIHRvIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIHByZXZpb3VzIGxpbmUgKGRpcmVjdGx5IGFib3ZlKVwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnZCAtJywgdGV4dDogXCJhYmNkZWZnXFxuXCJcbiAgICAgICAgICAjIEZJWE1FIGNvbW1lbnRlZCBvdXQgYmVjYXVzZSB0aGUgY29sdW1uIGlzIHdyb25nIGR1ZSB0byBhIGJ1ZyBpbiBga2A7IHJlLWVuYWJsZSB3aGVuIGBrYCBpcyBmaXhlZFxuICAgICAgICAgICMgZW5zdXJlIG51bGwsIGN1cnNvcjogWzAsIDJdXG5cbiAgICBkZXNjcmliZSBcImZyb20gdGhlIGJlZ2lubmluZyBvZiBhIGxpbmUgcHJlY2VkZWQgYnkgYW4gaW5kZW50ZWQgbGluZVwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMiwgMF1cblxuICAgICAgZGVzY3JpYmUgXCJhcyBhIG1vdGlvblwiLCAtPlxuICAgICAgICBpdCBcIm1vdmVzIHRoZSBjdXJzb3IgdG8gdGhlIGZpcnN0IGNoYXJhY3RlciBvZiB0aGUgcHJldmlvdXMgbGluZVwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnLScsIGN1cnNvcjogWzEsIDJdXG5cbiAgICAgIGRlc2NyaWJlIFwiYXMgYSBzZWxlY3Rpb25cIiwgLT5cbiAgICAgICAgaXQgXCJzZWxlY3RzIHRvIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIHByZXZpb3VzIGxpbmVcIiwgLT5cbiAgICAgICAgICBlbnN1cmUgJ2QgLScsIHRleHQ6IFwiYWJjZGVmZ1xcblwiXG5cbiAgICBkZXNjcmliZSBcIndpdGggYSBjb3VudFwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0OiBcIjFcXG4yXFxuM1xcbjRcXG41XFxuNlxcblwiXG4gICAgICAgICAgY3Vyc29yOiBbNCwgMF1cblxuICAgICAgZGVzY3JpYmUgXCJhcyBhIG1vdGlvblwiLCAtPlxuICAgICAgICBpdCBcIm1vdmVzIHRoZSBjdXJzb3IgdG8gdGhlIGZpcnN0IGNoYXJhY3RlciBvZiB0aGF0IG1hbnkgbGluZXMgcHJldmlvdXNcIiwgLT5cbiAgICAgICAgICBlbnN1cmUgJzMgLScsIGN1cnNvcjogWzEsIDBdXG5cbiAgICAgIGRlc2NyaWJlIFwiYXMgYSBzZWxlY3Rpb25cIiwgLT5cbiAgICAgICAgaXQgXCJkZWxldGVzIHRoZSBjdXJyZW50IGxpbmUgcGx1cyB0aGF0IG1hbnkgcHJldmlvdXMgbGluZXNcIiwgLT5cbiAgICAgICAgICBlbnN1cmUgJ2QgMyAtJyxcbiAgICAgICAgICAgIHRleHQ6IFwiMVxcbjZcXG5cIixcbiAgICAgICAgICAgIGN1cnNvcjogWzEsIDBdLFxuXG4gIGRlc2NyaWJlIFwidGhlICsga2V5YmluZGluZ1wiLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIHNldCB0ZXh0XzogXCJcIlwiXG4gICAgICBfX2FiY1xuICAgICAgX19hYmNcbiAgICAgIGFiY2RlZmdcXG5cbiAgICAgIFwiXCJcIlxuXG4gICAgZGVzY3JpYmUgXCJmcm9tIHRoZSBtaWRkbGUgb2YgYSBsaW5lXCIsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFsxLCAzXVxuXG4gICAgICBkZXNjcmliZSBcImFzIGEgbW90aW9uXCIsIC0+XG4gICAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciB0byB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBuZXh0IGxpbmVcIiwgLT5cbiAgICAgICAgICBlbnN1cmUgJysnLCBjdXJzb3I6IFsyLCAwXVxuXG4gICAgICBkZXNjcmliZSBcImFzIGEgc2VsZWN0aW9uXCIsIC0+XG4gICAgICAgIGl0IFwiZGVsZXRlcyB0aGUgY3VycmVudCBhbmQgbmV4dCBsaW5lXCIsIC0+XG4gICAgICAgICAgZW5zdXJlICdkICsnLCB0ZXh0OiBcIiAgYWJjXFxuXCJcblxuICAgIGRlc2NyaWJlIFwiZnJvbSB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIGEgbGluZSBpbmRlbnRlZCB0aGUgc2FtZSBhcyB0aGUgbmV4dCBvbmVcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT4gc2V0IGN1cnNvcjogWzAsIDJdXG5cbiAgICAgIGRlc2NyaWJlIFwiYXMgYSBtb3Rpb25cIiwgLT5cbiAgICAgICAgaXQgXCJtb3ZlcyB0byB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBuZXh0IGxpbmUgKGRpcmVjdGx5IGJlbG93KVwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnKycsIGN1cnNvcjogWzEsIDJdXG5cbiAgICAgIGRlc2NyaWJlIFwiYXMgYSBzZWxlY3Rpb25cIiwgLT5cbiAgICAgICAgaXQgXCJzZWxlY3RzIHRvIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIG5leHQgbGluZSAoZGlyZWN0bHkgYmVsb3cpXCIsIC0+XG4gICAgICAgICAgZW5zdXJlICdkICsnLCB0ZXh0OiBcImFiY2RlZmdcXG5cIlxuXG4gICAgZGVzY3JpYmUgXCJmcm9tIHRoZSBiZWdpbm5pbmcgb2YgYSBsaW5lIGZvbGxvd2VkIGJ5IGFuIGluZGVudGVkIGxpbmVcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT4gc2V0IGN1cnNvcjogWzAsIDBdXG5cbiAgICAgIGRlc2NyaWJlIFwiYXMgYSBtb3Rpb25cIiwgLT5cbiAgICAgICAgaXQgXCJtb3ZlcyB0aGUgY3Vyc29yIHRvIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIG5leHQgbGluZVwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnKycsIGN1cnNvcjogWzEsIDJdXG5cbiAgICAgIGRlc2NyaWJlIFwiYXMgYSBzZWxlY3Rpb25cIiwgLT5cbiAgICAgICAgaXQgXCJzZWxlY3RzIHRvIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIG5leHQgbGluZVwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnZCArJyxcbiAgICAgICAgICAgIHRleHQ6IFwiYWJjZGVmZ1xcblwiXG4gICAgICAgICAgICBjdXJzb3I6IFswLCAwXVxuXG4gICAgZGVzY3JpYmUgXCJ3aXRoIGEgY291bnRcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dDogXCIxXFxuMlxcbjNcXG40XFxuNVxcbjZcXG5cIlxuICAgICAgICAgIGN1cnNvcjogWzEsIDBdXG5cbiAgICAgIGRlc2NyaWJlIFwiYXMgYSBtb3Rpb25cIiwgLT5cbiAgICAgICAgaXQgXCJtb3ZlcyB0aGUgY3Vyc29yIHRvIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhhdCBtYW55IGxpbmVzIGZvbGxvd2luZ1wiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnMyArJywgY3Vyc29yOiBbNCwgMF1cblxuICAgICAgZGVzY3JpYmUgXCJhcyBhIHNlbGVjdGlvblwiLCAtPlxuICAgICAgICBpdCBcImRlbGV0ZXMgdGhlIGN1cnJlbnQgbGluZSBwbHVzIHRoYXQgbWFueSBmb2xsb3dpbmcgbGluZXNcIiwgLT5cbiAgICAgICAgICBlbnN1cmUgJ2QgMyArJyxcbiAgICAgICAgICAgIHRleHQ6IFwiMVxcbjZcXG5cIlxuICAgICAgICAgICAgY3Vyc29yOiBbMSwgMF1cblxuICBkZXNjcmliZSBcInRoZSBfIGtleWJpbmRpbmdcIiwgLT5cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBzZXQgdGV4dF86IFwiXCJcIlxuICAgICAgICBfX2FiY1xuICAgICAgICBfX2FiY1xuICAgICAgICBhYmNkZWZnXFxuXG4gICAgICAgIFwiXCJcIlxuXG4gICAgZGVzY3JpYmUgXCJmcm9tIHRoZSBtaWRkbGUgb2YgYSBsaW5lXCIsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+IHNldCBjdXJzb3I6IFsxLCAzXVxuXG4gICAgICBkZXNjcmliZSBcImFzIGEgbW90aW9uXCIsIC0+XG4gICAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciB0byB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBjdXJyZW50IGxpbmVcIiwgLT5cbiAgICAgICAgICBlbnN1cmUgJ18nLCBjdXJzb3I6IFsxLCAyXVxuXG4gICAgICBkZXNjcmliZSBcImFzIGEgc2VsZWN0aW9uXCIsIC0+XG4gICAgICAgIGl0IFwiZGVsZXRlcyB0aGUgY3VycmVudCBsaW5lXCIsIC0+XG4gICAgICAgICAgZW5zdXJlICdkIF8nLFxuICAgICAgICAgICAgdGV4dF86IFwiXCJcIlxuICAgICAgICAgICAgX19hYmNcbiAgICAgICAgICAgIGFiY2RlZmdcXG5cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgICAgY3Vyc29yOiBbMSwgMF1cblxuICAgIGRlc2NyaWJlIFwid2l0aCBhIGNvdW50XCIsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIHRleHQ6IFwiMVxcbjJcXG4zXFxuNFxcbjVcXG42XFxuXCJcbiAgICAgICAgICBjdXJzb3I6IFsxLCAwXVxuXG4gICAgICBkZXNjcmliZSBcImFzIGEgbW90aW9uXCIsIC0+XG4gICAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciB0byB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIHRoYXQgbWFueSBsaW5lcyBmb2xsb3dpbmdcIiwgLT5cbiAgICAgICAgICBlbnN1cmUgJzMgXycsIGN1cnNvcjogWzMsIDBdXG5cbiAgICAgIGRlc2NyaWJlIFwiYXMgYSBzZWxlY3Rpb25cIiwgLT5cbiAgICAgICAgaXQgXCJkZWxldGVzIHRoZSBjdXJyZW50IGxpbmUgcGx1cyB0aGF0IG1hbnkgZm9sbG93aW5nIGxpbmVzXCIsIC0+XG4gICAgICAgICAgZW5zdXJlICdkIDMgXycsXG4gICAgICAgICAgICB0ZXh0OiBcIjFcXG41XFxuNlxcblwiXG4gICAgICAgICAgICBjdXJzb3I6IFsxLCAwXVxuXG4gIGRlc2NyaWJlIFwidGhlIGVudGVyIGtleWJpbmRpbmdcIiwgLT5cbiAgICAjIFtGSVhNRV0gRGlydHkgdGVzdCwgd2hhdHMgdGhpcyE/XG4gICAgc3RhcnRpbmdUZXh0ID0gXCIgIGFiY1xcbiAgYWJjXFxuYWJjZGVmZ1xcblwiXG5cbiAgICBkZXNjcmliZSBcImZyb20gdGhlIG1pZGRsZSBvZiBhIGxpbmVcIiwgLT5cbiAgICAgIHN0YXJ0aW5nQ3Vyc29yUG9zaXRpb24gPSBbMSwgM11cblxuICAgICAgZGVzY3JpYmUgXCJhcyBhIG1vdGlvblwiLCAtPlxuICAgICAgICBpdCBcImFjdHMgdGhlIHNhbWUgYXMgdGhlICsga2V5YmluZGluZ1wiLCAtPlxuICAgICAgICAgICMgZG8gaXQgd2l0aCArIGFuZCBzYXZlIHRoZSByZXN1bHRzXG4gICAgICAgICAgc2V0XG4gICAgICAgICAgICB0ZXh0OiBzdGFydGluZ1RleHRcbiAgICAgICAgICAgIGN1cnNvcjogc3RhcnRpbmdDdXJzb3JQb3NpdGlvblxuICAgICAgICAgIGVuc3VyZSAnKydcbiAgICAgICAgICByZWZlcmVuY2VDdXJzb3JQb3NpdGlvbiA9IGVkaXRvci5nZXRDdXJzb3JTY3JlZW5Qb3NpdGlvbigpXG4gICAgICAgICAgc2V0XG4gICAgICAgICAgICB0ZXh0OiBzdGFydGluZ1RleHRcbiAgICAgICAgICAgIGN1cnNvcjogc3RhcnRpbmdDdXJzb3JQb3NpdGlvblxuICAgICAgICAgIGVuc3VyZSAnZW50ZXInLFxuICAgICAgICAgICAgY3Vyc29yOiByZWZlcmVuY2VDdXJzb3JQb3NpdGlvblxuXG4gICAgICBkZXNjcmliZSBcImFzIGEgc2VsZWN0aW9uXCIsIC0+XG4gICAgICAgIGl0IFwiYWN0cyB0aGUgc2FtZSBhcyB0aGUgKyBrZXliaW5kaW5nXCIsIC0+XG4gICAgICAgICAgIyBkbyBpdCB3aXRoICsgYW5kIHNhdmUgdGhlIHJlc3VsdHNcbiAgICAgICAgICBzZXRcbiAgICAgICAgICAgIHRleHQ6IHN0YXJ0aW5nVGV4dFxuICAgICAgICAgICAgY3Vyc29yOiBzdGFydGluZ0N1cnNvclBvc2l0aW9uXG5cbiAgICAgICAgICBlbnN1cmUgJ2QgKydcbiAgICAgICAgICByZWZlcmVuY2VUZXh0ID0gZWRpdG9yLmdldFRleHQoKVxuICAgICAgICAgIHJlZmVyZW5jZUN1cnNvclBvc2l0aW9uID0gZWRpdG9yLmdldEN1cnNvclNjcmVlblBvc2l0aW9uKClcblxuICAgICAgICAgIHNldFxuICAgICAgICAgICAgdGV4dDogc3RhcnRpbmdUZXh0XG4gICAgICAgICAgICBjdXJzb3I6IHN0YXJ0aW5nQ3Vyc29yUG9zaXRpb25cbiAgICAgICAgICBlbnN1cmUgJ2QgZW50ZXInLFxuICAgICAgICAgICAgdGV4dDogcmVmZXJlbmNlVGV4dFxuICAgICAgICAgICAgY3Vyc29yOiByZWZlcmVuY2VDdXJzb3JQb3NpdGlvblxuXG4gIGRlc2NyaWJlIFwidGhlIGdnIGtleWJpbmRpbmcgd2l0aCBzdGF5T25WZXJ0aWNhbE1vdGlvbiA9IGZhbHNlXCIsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgc2V0dGluZ3Muc2V0KCdzdGF5T25WZXJ0aWNhbE1vdGlvbicsIGZhbHNlKVxuICAgICAgc2V0XG4gICAgICAgIHRleHQ6IFwiXCJcIlxuICAgICAgICAgICAxYWJjXG4gICAgICAgICAgIDJcbiAgICAgICAgICAzXFxuXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgIGN1cnNvcjogWzAsIDJdXG5cbiAgICBkZXNjcmliZSBcImFzIGEgbW90aW9uXCIsIC0+XG4gICAgICBkZXNjcmliZSBcImluIG5vcm1hbCBtb2RlXCIsIC0+XG4gICAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBmaXJzdCBsaW5lXCIsIC0+XG4gICAgICAgICAgc2V0ICAgICAgICAgICBjdXJzb3I6IFsyLCAwXVxuICAgICAgICAgIGVuc3VyZSAnZyBnJywgY3Vyc29yOiBbMCwgMV1cblxuICAgICAgICBpdCBcIm1vdmUgdG8gc2FtZSBwb3NpdGlvbiBpZiBpdHMgb24gZmlyc3QgbGluZSBhbmQgZmlyc3QgY2hhclwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnZyBnJywgY3Vyc29yOiBbMCwgMV1cblxuICAgICAgZGVzY3JpYmUgXCJpbiBsaW5ld2lzZSB2aXN1YWwgbW9kZVwiLCAtPlxuICAgICAgICBpdCBcInNlbGVjdHMgdG8gdGhlIGZpcnN0IGxpbmUgaW4gdGhlIGZpbGVcIiwgLT5cbiAgICAgICAgICBzZXQgY3Vyc29yOiBbMSwgMF1cbiAgICAgICAgICBlbnN1cmUgJ1YgZyBnJyxcbiAgICAgICAgICAgIHNlbGVjdGVkVGV4dDogXCIgMWFiY1xcbiAyXFxuXCJcbiAgICAgICAgICAgIGN1cnNvcjogWzAsIDBdXG5cbiAgICAgIGRlc2NyaWJlIFwiaW4gY2hhcmFjdGVyd2lzZSB2aXN1YWwgbW9kZVwiLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgc2V0IGN1cnNvcjogWzEsIDFdXG4gICAgICAgIGl0IFwic2VsZWN0cyB0byB0aGUgZmlyc3QgbGluZSBpbiB0aGUgZmlsZVwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAndiBnIGcnLFxuICAgICAgICAgICAgc2VsZWN0ZWRUZXh0OiBcIjFhYmNcXG4gMlwiXG4gICAgICAgICAgICBjdXJzb3I6IFswLCAxXVxuXG4gICAgZGVzY3JpYmUgXCJ3aGVuIGNvdW50IHNwZWNpZmllZFwiLCAtPlxuICAgICAgZGVzY3JpYmUgXCJpbiBub3JtYWwgbW9kZVwiLCAtPlxuICAgICAgICBpdCBcIm1vdmVzIHRoZSBjdXJzb3IgdG8gZmlyc3QgY2hhciBvZiBhIHNwZWNpZmllZCBsaW5lXCIsIC0+XG4gICAgICAgICAgZW5zdXJlICcyIGcgZycsIGN1cnNvcjogWzEsIDFdXG5cbiAgICAgIGRlc2NyaWJlIFwiaW4gbGluZXdpc2UgdmlzdWFsIG1vdGlvblwiLCAtPlxuICAgICAgICBpdCBcInNlbGVjdHMgdG8gYSBzcGVjaWZpZWQgbGluZVwiLCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFsyLCAwXVxuICAgICAgICAgIGVuc3VyZSAnViAyIGcgZycsXG4gICAgICAgICAgICBzZWxlY3RlZFRleHQ6IFwiIDJcXG4zXFxuXCJcbiAgICAgICAgICAgIGN1cnNvcjogWzEsIDBdXG5cbiAgICAgIGRlc2NyaWJlIFwiaW4gY2hhcmFjdGVyd2lzZSB2aXN1YWwgbW90aW9uXCIsIC0+XG4gICAgICAgIGl0IFwic2VsZWN0cyB0byBhIGZpcnN0IGNoYXJhY3RlciBvZiBzcGVjaWZpZWQgbGluZVwiLCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFsyLCAwXVxuICAgICAgICAgIGVuc3VyZSAndiAyIGcgZycsXG4gICAgICAgICAgICBzZWxlY3RlZFRleHQ6IFwiMlxcbjNcIlxuICAgICAgICAgICAgY3Vyc29yOiBbMSwgMV1cblxuICBkZXNjcmliZSBcInRoZSBnXyBrZXliaW5kaW5nXCIsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgc2V0IHRleHRfOiBcIlwiXCJcbiAgICAgICAgMV9fXG4gICAgICAgICAgICAyX19cbiAgICAgICAgIDNhYmNcbiAgICAgICAgX1xuICAgICAgICBcIlwiXCJcblxuICAgIGRlc2NyaWJlIFwiYXMgYSBtb3Rpb25cIiwgLT5cbiAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciB0byB0aGUgbGFzdCBub25ibGFuayBjaGFyYWN0ZXJcIiwgLT5cbiAgICAgICAgc2V0ICAgICAgICAgICBjdXJzb3I6IFsxLCAwXVxuICAgICAgICBlbnN1cmUgJ2cgXycsIGN1cnNvcjogWzEsIDRdXG5cbiAgICAgIGl0IFwid2lsbCBtb3ZlIHRoZSBjdXJzb3IgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgbGluZSBpZiBuZWNlc3NhcnlcIiwgLT5cbiAgICAgICAgc2V0ICAgICAgICAgICBjdXJzb3I6IFswLCAyXVxuICAgICAgICBlbnN1cmUgJ2cgXycsIGN1cnNvcjogWzAsIDBdXG5cbiAgICBkZXNjcmliZSBcImFzIGEgcmVwZWF0ZWQgbW90aW9uXCIsIC0+XG4gICAgICBpdCBcIm1vdmVzIHRoZSBjdXJzb3IgZG93bndhcmQgYW5kIG91dHdhcmRcIiwgLT5cbiAgICAgICAgc2V0ICAgICAgICAgICAgIGN1cnNvcjogWzAsIDBdXG4gICAgICAgIGVuc3VyZSAnMiBnIF8nLCBjdXJzb3I6IFsxLCA0XVxuXG4gICAgZGVzY3JpYmUgXCJhcyBhIHNlbGVjdGlvblwiLCAtPlxuICAgICAgaXQgXCJzZWxlY3RzIHRoZSBjdXJyZW50IGxpbmUgZXhjbHVkaW5nIHdoaXRlc3BhY2VcIiwgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzEsIDJdXG4gICAgICAgIGVuc3VyZSAndiAyIGcgXycsXG4gICAgICAgICAgc2VsZWN0ZWRUZXh0OiBcIiAgMiAgXFxuIDNhYmNcIlxuXG4gIGRlc2NyaWJlIFwidGhlIEcga2V5YmluZGluZyAoc3RheU9uVmVydGljYWxNb3Rpb24gPSBmYWxzZSlcIiwgLT5cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBzZXR0aW5ncy5zZXQoJ3N0YXlPblZlcnRpY2FsTW90aW9uJywgZmFsc2UpXG4gICAgICBzZXRcbiAgICAgICAgdGV4dF86IFwiXCJcIlxuICAgICAgICAxXG4gICAgICAgIF9fX18yXG4gICAgICAgIF8zYWJjXG4gICAgICAgIF9cbiAgICAgICAgXCJcIlwiXG4gICAgICAgIGN1cnNvcjogWzAsIDJdXG5cbiAgICBkZXNjcmliZSBcImFzIGEgbW90aW9uXCIsIC0+XG4gICAgICBpdCBcIm1vdmVzIHRoZSBjdXJzb3IgdG8gdGhlIGxhc3QgbGluZSBhZnRlciB3aGl0ZXNwYWNlXCIsIC0+XG4gICAgICAgIGVuc3VyZSAnRycsIGN1cnNvcjogWzMsIDBdXG5cbiAgICBkZXNjcmliZSBcImFzIGEgcmVwZWF0ZWQgbW90aW9uXCIsIC0+XG4gICAgICBpdCBcIm1vdmVzIHRoZSBjdXJzb3IgdG8gYSBzcGVjaWZpZWQgbGluZVwiLCAtPlxuICAgICAgICBlbnN1cmUgJzIgRycsIGN1cnNvcjogWzEsIDRdXG5cbiAgICBkZXNjcmliZSBcImFzIGEgc2VsZWN0aW9uXCIsIC0+XG4gICAgICBpdCBcInNlbGVjdHMgdG8gdGhlIGxhc3QgbGluZSBpbiB0aGUgZmlsZVwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMSwgMF1cbiAgICAgICAgZW5zdXJlICd2IEcnLFxuICAgICAgICAgIHNlbGVjdGVkVGV4dDogXCIgICAgMlxcbiAzYWJjXFxuIFwiXG4gICAgICAgICAgY3Vyc29yOiBbMywgMV1cblxuICBkZXNjcmliZSBcInRoZSBOJSBrZXliaW5kaW5nXCIsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgc2V0XG4gICAgICAgIHRleHQ6IFswLi45OTldLmpvaW4oXCJcXG5cIilcbiAgICAgICAgY3Vyc29yOiBbMCwgMF1cblxuICAgIGRlc2NyaWJlIFwicHV0IGN1cnNvciBvbiBsaW5lIHNwZWNpZmllZCBieSBwZXJjZW50XCIsIC0+XG4gICAgICBpdCBcIjUwJVwiLCAtPiAgZW5zdXJlICc1IDAgJScsICAgY3Vyc29yOiBbNDk5LCAwXVxuICAgICAgaXQgXCIzMCVcIiwgLT4gIGVuc3VyZSAnMyAwICUnLCAgIGN1cnNvcjogWzI5OSwgMF1cbiAgICAgIGl0IFwiMTAwJVwiLCAtPiBlbnN1cmUgJzEgMCAwICUnLCBjdXJzb3I6IFs5OTksIDBdXG4gICAgICBpdCBcIjEyMCVcIiwgLT4gZW5zdXJlICcxIDIgMCAlJywgY3Vyc29yOiBbOTk5LCAwXVxuXG4gIGRlc2NyaWJlIFwidGhlIEgsIE0sIEwga2V5YmluZGluZyggc3RheU9uVmVydGljYWxNb3RpbyA9IGZhbHNlIClcIiwgLT5cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBzZXR0aW5ncy5zZXQoJ3N0YXlPblZlcnRpY2FsTW90aW9uJywgZmFsc2UpXG5cbiAgICAgIHNldFxuICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgICAxXG4gICAgICAgICAgMlxuICAgICAgICAgIDNcbiAgICAgICAgICA0XG4gICAgICAgICAgICA1XG4gICAgICAgICAgNlxuICAgICAgICAgIDdcbiAgICAgICAgICA4XG4gICAgICAgICAgfDlcbiAgICAgICAgICAgIDEwXG4gICAgICAgICAgXCJcIlwiXG5cbiAgICBkZXNjcmliZSBcInRoZSBIIGtleWJpbmRpbmdcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgc3B5T24oZWRpdG9yLCAnZ2V0TGFzdFZpc2libGVTY3JlZW5Sb3cnKS5hbmRSZXR1cm4oOSlcblxuICAgICAgaXQgXCJtb3ZlcyB0aGUgY3Vyc29yIHRvIHRoZSBub24tYmxhbmstY2hhciBvbiBmaXJzdCByb3cgaWYgdmlzaWJsZVwiLCAtPlxuICAgICAgICBzcHlPbihlZGl0b3IsICdnZXRGaXJzdFZpc2libGVTY3JlZW5Sb3cnKS5hbmRSZXR1cm4oMClcbiAgICAgICAgZW5zdXJlICdIJywgY3Vyc29yOiBbMCwgMl1cblxuICAgICAgaXQgXCJtb3ZlcyB0aGUgY3Vyc29yIHRvIHRoZSBub24tYmxhbmstY2hhciBvbiBmaXJzdCB2aXNpYmxlIHJvdyBwbHVzIHNjcm9sbCBvZmZzZXRcIiwgLT5cbiAgICAgICAgc3B5T24oZWRpdG9yLCAnZ2V0Rmlyc3RWaXNpYmxlU2NyZWVuUm93JykuYW5kUmV0dXJuKDIpXG4gICAgICAgIGVuc3VyZSAnSCcsIGN1cnNvcjogWzQsIDJdXG5cbiAgICAgIGl0IFwicmVzcGVjdHMgY291bnRzXCIsIC0+XG4gICAgICAgIHNweU9uKGVkaXRvciwgJ2dldEZpcnN0VmlzaWJsZVNjcmVlblJvdycpLmFuZFJldHVybigwKVxuICAgICAgICBlbnN1cmUgJzQgSCcsIGN1cnNvcjogWzMsIDBdXG5cbiAgICBkZXNjcmliZSBcInRoZSBMIGtleWJpbmRpbmdcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgc3B5T24oZWRpdG9yLCAnZ2V0Rmlyc3RWaXNpYmxlU2NyZWVuUm93JykuYW5kUmV0dXJuKDApXG5cbiAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciB0byBub24tYmxhbmstY2hhciBvbiBsYXN0IHJvdyBpZiB2aXNpYmxlXCIsIC0+XG4gICAgICAgIHNweU9uKGVkaXRvciwgJ2dldExhc3RWaXNpYmxlU2NyZWVuUm93JykuYW5kUmV0dXJuKDkpXG4gICAgICAgIGVuc3VyZSAnTCcsIGN1cnNvcjogWzksIDJdXG5cbiAgICAgIGl0IFwibW92ZXMgdGhlIGN1cnNvciB0byB0aGUgZmlyc3QgdmlzaWJsZSByb3cgcGx1cyBvZmZzZXRcIiwgLT5cbiAgICAgICAgc3B5T24oZWRpdG9yLCAnZ2V0TGFzdFZpc2libGVTY3JlZW5Sb3cnKS5hbmRSZXR1cm4oNylcbiAgICAgICAgZW5zdXJlICdMJywgY3Vyc29yOiBbNCwgMl1cblxuICAgICAgaXQgXCJyZXNwZWN0cyBjb3VudHNcIiwgLT5cbiAgICAgICAgc3B5T24oZWRpdG9yLCAnZ2V0TGFzdFZpc2libGVTY3JlZW5Sb3cnKS5hbmRSZXR1cm4oOSlcbiAgICAgICAgZW5zdXJlICczIEwnLCBjdXJzb3I6IFs3LCAwXVxuXG4gICAgZGVzY3JpYmUgXCJ0aGUgTSBrZXliaW5kaW5nXCIsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNweU9uKGVkaXRvciwgJ2dldEZpcnN0VmlzaWJsZVNjcmVlblJvdycpLmFuZFJldHVybigwKVxuICAgICAgICBzcHlPbihlZGl0b3IsICdnZXRMYXN0VmlzaWJsZVNjcmVlblJvdycpLmFuZFJldHVybig5KVxuXG4gICAgICBpdCBcIm1vdmVzIHRoZSBjdXJzb3IgdG8gdGhlIG5vbi1ibGFuay1jaGFyIG9mIG1pZGRsZSBvZiBzY3JlZW5cIiwgLT5cbiAgICAgICAgZW5zdXJlICdNJywgY3Vyc29yOiBbNCwgMl1cblxuICBkZXNjcmliZSBcInN0YXlPblZlcnRpY2FsTW90aW9uIHNldHRpbmdcIiwgLT5cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBzZXR0aW5ncy5zZXQoJ3N0YXlPblZlcnRpY2FsTW90aW9uJywgdHJ1ZSlcbiAgICAgIHNldFxuICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICAwIDAwMDAwMDAwMDAwMFxuICAgICAgICAgIDEgMTExMTExMTExMTExXG4gICAgICAgIDIgMjIyMjIyMjIyMjIyXFxuXG4gICAgICAgIFwiXCJcIlxuICAgICAgICBjdXJzb3I6IFsyLCAxMF1cblxuICAgIGRlc2NyaWJlIFwiZ2csIEcsIE4lXCIsIC0+XG4gICAgICBpdCBcImdvIHRvIHJvdyB3aXRoIGtlZXAgY29sdW1uIGFuZCByZXNwZWN0IGN1cnNvci5nb2FsQ29sdW1cIiwgLT5cbiAgICAgICAgZW5zdXJlICdnIGcnLCAgICAgY3Vyc29yOiBbMCwgMTBdXG4gICAgICAgIGVuc3VyZSAnJCcsICAgICAgIGN1cnNvcjogWzAsIDE1XVxuICAgICAgICBlbnN1cmUgJ0cnLCAgICAgICBjdXJzb3I6IFsyLCAxM11cbiAgICAgICAgZXhwZWN0KGVkaXRvci5nZXRMYXN0Q3Vyc29yKCkuZ29hbENvbHVtbikudG9CZShJbmZpbml0eSlcbiAgICAgICAgZW5zdXJlICcxICUnLCAgICAgY3Vyc29yOiBbMCwgMTVdXG4gICAgICAgIGV4cGVjdChlZGl0b3IuZ2V0TGFzdEN1cnNvcigpLmdvYWxDb2x1bW4pLnRvQmUoSW5maW5pdHkpXG4gICAgICAgIGVuc3VyZSAnMSAwIGgnLCAgIGN1cnNvcjogWzAsIDVdXG4gICAgICAgIGVuc3VyZSAnNSAwICUnLCAgIGN1cnNvcjogWzEsIDVdXG4gICAgICAgIGVuc3VyZSAnMSAwIDAgJScsIGN1cnNvcjogWzIsIDVdXG5cbiAgICBkZXNjcmliZSBcIkgsIE0sIExcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgc3B5T24oZWRpdG9yLCAnZ2V0Rmlyc3RWaXNpYmxlU2NyZWVuUm93JykuYW5kUmV0dXJuKDApXG4gICAgICAgIHNweU9uKGVkaXRvciwgJ2dldExhc3RWaXNpYmxlU2NyZWVuUm93JykuYW5kUmV0dXJuKDMpXG5cbiAgICAgIGl0IFwiZ28gdG8gcm93IHdpdGgga2VlcCBjb2x1bW4gYW5kIHJlc3BlY3QgY3Vyc29yLmdvYWxDb2x1bVwiLCAtPlxuICAgICAgICBlbnN1cmUgJ0gnLCBjdXJzb3I6IFswLCAxMF1cbiAgICAgICAgZW5zdXJlICdNJywgY3Vyc29yOiBbMSwgMTBdXG4gICAgICAgIGVuc3VyZSAnTCcsIGN1cnNvcjogWzIsIDEwXVxuICAgICAgICBlbnN1cmUgJyQnLCBjdXJzb3I6IFsyLCAxM11cbiAgICAgICAgZXhwZWN0KGVkaXRvci5nZXRMYXN0Q3Vyc29yKCkuZ29hbENvbHVtbikudG9CZShJbmZpbml0eSlcbiAgICAgICAgZW5zdXJlICdIJywgY3Vyc29yOiBbMCwgMTVdXG4gICAgICAgIGVuc3VyZSAnTScsIGN1cnNvcjogWzEsIDE1XVxuICAgICAgICBlbnN1cmUgJ0wnLCBjdXJzb3I6IFsyLCAxM11cbiAgICAgICAgZXhwZWN0KGVkaXRvci5nZXRMYXN0Q3Vyc29yKCkuZ29hbENvbHVtbikudG9CZShJbmZpbml0eSlcblxuICBkZXNjcmliZSAndGhlIG1hcmsga2V5YmluZGluZ3MnLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIHNldFxuICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICAxMlxuICAgICAgICAgICAgMzRcbiAgICAgICAgNTZcXG5cbiAgICAgICAgXCJcIlwiXG4gICAgICAgIGN1cnNvcjogWzAsIDFdXG5cbiAgICBpdCAnbW92ZXMgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgbGluZSBvZiBhIG1hcmsnLCAtPlxuICAgICAgcnVucyAtPiBzZXQgY3Vyc29yOiBbMSwgMV07IGVuc3VyZVdhaXQgJ20gYSdcbiAgICAgIHJ1bnMgLT4gc2V0IGN1cnNvcjogWzAsIDBdOyBlbnN1cmUgXCInIGFcIiwgY3Vyc29yOiBbMSwgNF1cblxuICAgIGl0ICdtb3ZlcyBsaXRlcmFsbHkgdG8gYSBtYXJrJywgLT5cbiAgICAgIHJ1bnMgLT4gc2V0IGN1cnNvcjogWzEsIDJdOyBlbnN1cmVXYWl0ICdtIGEnXG4gICAgICBydW5zIC0+IHNldCBjdXJzb3I6IFswLCAwXTsgZW5zdXJlICdgIGEnLCBjdXJzb3I6IFsxLCAyXVxuXG4gICAgaXQgJ2RlbGV0ZXMgdG8gYSBtYXJrIGJ5IGxpbmUnLCAtPlxuICAgICAgcnVucyAtPiBzZXQgY3Vyc29yOiBbMSwgNV07IGVuc3VyZVdhaXQgJ20gYSdcbiAgICAgIHJ1bnMgLT4gc2V0IGN1cnNvcjogWzAsIDBdOyBlbnN1cmUgXCJkICcgYVwiLCB0ZXh0OiAnNTZcXG4nXG5cbiAgICBpdCAnZGVsZXRlcyBiZWZvcmUgdG8gYSBtYXJrIGxpdGVyYWxseScsIC0+XG4gICAgICBydW5zIC0+IHNldCBjdXJzb3I6IFsxLCA1XTsgZW5zdXJlV2FpdCAnbSBhJ1xuICAgICAgcnVucyAtPiBzZXQgY3Vyc29yOiBbMCwgMl07IGVuc3VyZSAnZCBgIGEnLCB0ZXh0OiAnICA0XFxuNTZcXG4nXG5cbiAgICBpdCAnZGVsZXRlcyBhZnRlciB0byBhIG1hcmsgbGl0ZXJhbGx5JywgLT5cbiAgICAgIHJ1bnMgLT4gc2V0IGN1cnNvcjogWzEsIDVdOyBlbnN1cmVXYWl0ICdtIGEnXG4gICAgICBydW5zIC0+IHNldCBjdXJzb3I6IFsyLCAxXTsgZW5zdXJlICdkIGAgYScsIHRleHQ6ICcgIDEyXFxuICAgIDM2XFxuJ1xuXG4gICAgaXQgJ21vdmVzIGJhY2sgdG8gcHJldmlvdXMnLCAtPlxuICAgICAgc2V0IGN1cnNvcjogWzEsIDVdXG4gICAgICBlbnN1cmUgJ2AgYCdcbiAgICAgIHNldCBjdXJzb3I6IFsyLCAxXVxuICAgICAgZW5zdXJlICdgIGAnLCBjdXJzb3I6IFsxLCA1XVxuXG4gIGRlc2NyaWJlIFwianVtcCBjb21tYW5kIHVwZGF0ZSBgIGFuZCAnIG1hcmtcIiwgLT5cbiAgICBlbnN1cmVKdW1wTWFyayA9ICh2YWx1ZSkgLT5cbiAgICAgIGVuc3VyZSBudWxsLCBtYXJrOiBcImBcIjogdmFsdWVcbiAgICAgIGVuc3VyZSBudWxsLCBtYXJrOiBcIidcIjogdmFsdWVcblxuICAgIGVuc3VyZUp1bXBBbmRCYWNrID0gKGtleXN0cm9rZSwgb3B0aW9uKSAtPlxuICAgICAgYWZ0ZXJNb3ZlID0gb3B0aW9uLmN1cnNvclxuICAgICAgYmVmb3JlTW92ZSA9IGVkaXRvci5nZXRDdXJzb3JCdWZmZXJQb3NpdGlvbigpXG5cbiAgICAgIGVuc3VyZSBrZXlzdHJva2UsIGN1cnNvcjogYWZ0ZXJNb3ZlXG4gICAgICBlbnN1cmVKdW1wTWFyayhiZWZvcmVNb3ZlKVxuXG4gICAgICBleHBlY3QoYmVmb3JlTW92ZS5pc0VxdWFsKGFmdGVyTW92ZSkpLnRvQmUoZmFsc2UpXG5cbiAgICAgIGVuc3VyZSBcImAgYFwiLCBjdXJzb3I6IGJlZm9yZU1vdmVcbiAgICAgIGVuc3VyZUp1bXBNYXJrKGFmdGVyTW92ZSlcblxuICAgIGVuc3VyZUp1bXBBbmRCYWNrTGluZXdpc2UgPSAoa2V5c3Ryb2tlLCBvcHRpb24pIC0+XG4gICAgICBhZnRlck1vdmUgPSBvcHRpb24uY3Vyc29yXG4gICAgICBiZWZvcmVNb3ZlID0gZWRpdG9yLmdldEN1cnNvckJ1ZmZlclBvc2l0aW9uKClcblxuICAgICAgZXhwZWN0KGJlZm9yZU1vdmUuY29sdW1uKS5ub3QudG9CZSgwKVxuXG4gICAgICBlbnN1cmUga2V5c3Ryb2tlLCBjdXJzb3I6IGFmdGVyTW92ZVxuICAgICAgZW5zdXJlSnVtcE1hcmsoYmVmb3JlTW92ZSlcblxuICAgICAgZXhwZWN0KGJlZm9yZU1vdmUuaXNFcXVhbChhZnRlck1vdmUpKS50b0JlKGZhbHNlKVxuXG4gICAgICBlbnN1cmUgXCInICdcIiwgY3Vyc29yOiBbYmVmb3JlTW92ZS5yb3csIDBdXG4gICAgICBlbnN1cmVKdW1wTWFyayhhZnRlck1vdmUpXG5cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBmb3IgbWFyayBpbiBcImAnXCJcbiAgICAgICAgdmltU3RhdGUubWFyay5tYXJrc1ttYXJrXT8uZGVzdHJveSgpXG4gICAgICAgIHZpbVN0YXRlLm1hcmsubWFya3NbbWFya10gPSBudWxsXG5cbiAgICAgIHNldFxuICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgMDogb28gMFxuICAgICAgICAxOiAxMTExXG4gICAgICAgIDI6IDIyMjJcbiAgICAgICAgMzogb28gM1xuICAgICAgICA0OiA0NDQ0XG4gICAgICAgIDU6IG9vIDVcbiAgICAgICAgXCJcIlwiXG4gICAgICAgIGN1cnNvcjogWzEsIDBdXG5cbiAgICBkZXNjcmliZSBcImluaXRpYWwgc3RhdGVcIiwgLT5cbiAgICAgIGl0IFwicmV0dXJuIFswLCAwXVwiLCAtPlxuICAgICAgICBlbnN1cmUgbnVsbCwgbWFyazogXCInXCI6IFswLCAwXVxuICAgICAgICBlbnN1cmUgbnVsbCwgbWFyazogXCJgXCI6IFswLCAwXVxuXG4gICAgZGVzY3JpYmUgXCJqdW1wIG1vdGlvbiBpbiBub3JtYWwtbW9kZVwiLCAtPlxuICAgICAgaW5pdGlhbCA9IFszLCAzXVxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBqYXNtaW5lLmF0dGFjaFRvRE9NKGdldFZpZXcoYXRvbS53b3Jrc3BhY2UpKSAjIGZvciBMLCBNLCBIXG5cbiAgICAgICAgIyBUT0RPOiByZW1vdmUgd2hlbiAxLjE5IGJlY29tZSBzdGFibGVcbiAgICAgICAgaWYgZWRpdG9yRWxlbWVudC5tZWFzdXJlRGltZW5zaW9ucz9cbiAgICAgICAgICB7Y29tcG9uZW50fSA9IGVkaXRvclxuICAgICAgICAgIGNvbXBvbmVudC5lbGVtZW50LnN0eWxlLmhlaWdodCA9IGNvbXBvbmVudC5nZXRMaW5lSGVpZ2h0KCkgKiBlZGl0b3IuZ2V0TGluZUNvdW50KCkgKyAncHgnXG4gICAgICAgICAgZWRpdG9yRWxlbWVudC5tZWFzdXJlRGltZW5zaW9ucygpXG5cbiAgICAgICAgZW5zdXJlIG51bGwsIG1hcms6IFwiJ1wiOiBbMCwgMF1cbiAgICAgICAgZW5zdXJlIG51bGwsIG1hcms6IFwiYFwiOiBbMCwgMF1cbiAgICAgICAgc2V0IGN1cnNvcjogaW5pdGlhbFxuXG4gICAgICBpdCBcIkcganVtcCZiYWNrXCIsIC0+IGVuc3VyZUp1bXBBbmRCYWNrICdHJywgY3Vyc29yOiBbNSwgM11cbiAgICAgIGl0IFwiZyBnIGp1bXAmYmFja1wiLCAtPiBlbnN1cmVKdW1wQW5kQmFjayBcImcgZ1wiLCBjdXJzb3I6IFswLCAzXVxuICAgICAgaXQgXCIxMDAgJSBqdW1wJmJhY2tcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2sgXCIxIDAgMCAlXCIsIGN1cnNvcjogWzUsIDNdXG4gICAgICBpdCBcIikganVtcCZiYWNrXCIsIC0+IGVuc3VyZUp1bXBBbmRCYWNrIFwiKVwiLCBjdXJzb3I6IFs1LCA2XVxuICAgICAgaXQgXCIoIGp1bXAmYmFja1wiLCAtPiBlbnN1cmVKdW1wQW5kQmFjayBcIihcIiwgY3Vyc29yOiBbMCwgMF1cbiAgICAgIGl0IFwiXSBqdW1wJmJhY2tcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2sgXCJdXCIsIGN1cnNvcjogWzUsIDNdXG4gICAgICBpdCBcIlsganVtcCZiYWNrXCIsIC0+IGVuc3VyZUp1bXBBbmRCYWNrIFwiW1wiLCBjdXJzb3I6IFswLCAzXVxuICAgICAgaXQgXCJ9IGp1bXAmYmFja1wiLCAtPiBlbnN1cmVKdW1wQW5kQmFjayBcIn1cIiwgY3Vyc29yOiBbNSwgNl1cbiAgICAgIGl0IFwieyBqdW1wJmJhY2tcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2sgXCJ7XCIsIGN1cnNvcjogWzAsIDBdXG4gICAgICBpdCBcIkwganVtcCZiYWNrXCIsIC0+IGVuc3VyZUp1bXBBbmRCYWNrIFwiTFwiLCBjdXJzb3I6IFs1LCAzXVxuICAgICAgaXQgXCJIIGp1bXAmYmFja1wiLCAtPiBlbnN1cmVKdW1wQW5kQmFjayBcIkhcIiwgY3Vyc29yOiBbMCwgM11cbiAgICAgIGl0IFwiTSBqdW1wJmJhY2tcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2sgXCJNXCIsIGN1cnNvcjogWzIsIDNdXG4gICAgICBpdCBcIioganVtcCZiYWNrXCIsIC0+IGVuc3VyZUp1bXBBbmRCYWNrIFwiKlwiLCBjdXJzb3I6IFs1LCAzXVxuXG4gICAgICAjIFtCVUddIFN0cmFuZ2UgYnVnIG9mIGphc21pbmUgb3IgYXRvbSdzIGphc21pbmUgZW5oYW5jbWVudD9cbiAgICAgICMgVXNpbmcgc3ViamVjdCBcIiMganVtcCAmIGJhY2tcIiBza2lwcyBzcGVjLlxuICAgICAgIyBOb3RlIGF0IEF0b20gdjEuMTEuMlxuICAgICAgaXQgXCJTaGFycCgjKSBqdW1wJmJhY2tcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2soJyMnLCBjdXJzb3I6IFswLCAzXSlcblxuICAgICAgaXQgXCIvIGp1bXAmYmFja1wiLCAtPiBlbnN1cmVKdW1wQW5kQmFjayAnLyBvbyBlbnRlcicsIGN1cnNvcjogWzUsIDNdXG4gICAgICBpdCBcIj8ganVtcCZiYWNrXCIsIC0+IGVuc3VyZUp1bXBBbmRCYWNrICc/IG9vIGVudGVyJywgY3Vyc29yOiBbMCwgM11cblxuICAgICAgaXQgXCJuIGp1bXAmYmFja1wiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMCwgMF1cbiAgICAgICAgZW5zdXJlICcvIG9vIGVudGVyJywgY3Vyc29yOiBbMCwgM11cbiAgICAgICAgZW5zdXJlSnVtcEFuZEJhY2sgXCJuXCIsIGN1cnNvcjogWzMsIDNdXG4gICAgICAgIGVuc3VyZUp1bXBBbmRCYWNrIFwiTlwiLCBjdXJzb3I6IFs1LCAzXVxuXG4gICAgICBpdCBcIk4ganVtcCZiYWNrXCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFswLCAwXVxuICAgICAgICBlbnN1cmUgJz8gb28gZW50ZXInLCBjdXJzb3I6IFs1LCAzXVxuICAgICAgICBlbnN1cmVKdW1wQW5kQmFjayBcIm5cIiwgY3Vyc29yOiBbMywgM11cbiAgICAgICAgZW5zdXJlSnVtcEFuZEJhY2sgXCJOXCIsIGN1cnNvcjogWzAsIDNdXG5cbiAgICAgIGl0IFwiRyBqdW1wJmJhY2sgbGluZXdpc2VcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2tMaW5ld2lzZSAnRycsIGN1cnNvcjogWzUsIDNdXG4gICAgICBpdCBcImcgZyBqdW1wJmJhY2sgbGluZXdpc2VcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2tMaW5ld2lzZSBcImcgZ1wiLCBjdXJzb3I6IFswLCAzXVxuICAgICAgaXQgXCIxMDAgJSBqdW1wJmJhY2sgbGluZXdpc2VcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2tMaW5ld2lzZSBcIjEgMCAwICVcIiwgY3Vyc29yOiBbNSwgM11cbiAgICAgIGl0IFwiKSBqdW1wJmJhY2sgbGluZXdpc2VcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2tMaW5ld2lzZSBcIilcIiwgY3Vyc29yOiBbNSwgNl1cbiAgICAgIGl0IFwiKCBqdW1wJmJhY2sgbGluZXdpc2VcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2tMaW5ld2lzZSBcIihcIiwgY3Vyc29yOiBbMCwgMF1cbiAgICAgIGl0IFwiXSBqdW1wJmJhY2sgbGluZXdpc2VcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2tMaW5ld2lzZSBcIl1cIiwgY3Vyc29yOiBbNSwgM11cbiAgICAgIGl0IFwiWyBqdW1wJmJhY2sgbGluZXdpc2VcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2tMaW5ld2lzZSBcIltcIiwgY3Vyc29yOiBbMCwgM11cbiAgICAgIGl0IFwifSBqdW1wJmJhY2sgbGluZXdpc2VcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2tMaW5ld2lzZSBcIn1cIiwgY3Vyc29yOiBbNSwgNl1cbiAgICAgIGl0IFwieyBqdW1wJmJhY2sgbGluZXdpc2VcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2tMaW5ld2lzZSBcIntcIiwgY3Vyc29yOiBbMCwgMF1cbiAgICAgIGl0IFwiTCBqdW1wJmJhY2sgbGluZXdpc2VcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2tMaW5ld2lzZSBcIkxcIiwgY3Vyc29yOiBbNSwgM11cbiAgICAgIGl0IFwiSCBqdW1wJmJhY2sgbGluZXdpc2VcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2tMaW5ld2lzZSBcIkhcIiwgY3Vyc29yOiBbMCwgM11cbiAgICAgIGl0IFwiTSBqdW1wJmJhY2sgbGluZXdpc2VcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2tMaW5ld2lzZSBcIk1cIiwgY3Vyc29yOiBbMiwgM11cbiAgICAgIGl0IFwiKiBqdW1wJmJhY2sgbGluZXdpc2VcIiwgLT4gZW5zdXJlSnVtcEFuZEJhY2tMaW5ld2lzZSBcIipcIiwgY3Vyc29yOiBbNSwgM11cblxuICBkZXNjcmliZSAndGhlIFYga2V5YmluZGluZycsIC0+XG4gICAgW3RleHRdID0gW11cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICB0ZXh0ID0gbmV3IFRleHREYXRhIFwiXCJcIlxuICAgICAgICAwMVxuICAgICAgICAwMDJcbiAgICAgICAgMDAwM1xuICAgICAgICAwMDAwNFxuICAgICAgICAwMDAwMDVcXG5cbiAgICAgICAgXCJcIlwiXG4gICAgICBzZXRcbiAgICAgICAgdGV4dDogdGV4dC5nZXRSYXcoKVxuICAgICAgICBjdXJzb3I6IFsxLCAxXVxuXG4gICAgaXQgXCJzZWxlY3RzIGRvd24gYSBsaW5lXCIsIC0+XG4gICAgICBlbnN1cmUgJ1YgaiBqJywgc2VsZWN0ZWRUZXh0OiB0ZXh0LmdldExpbmVzKFsxLi4zXSlcblxuICAgIGl0IFwic2VsZWN0cyB1cCBhIGxpbmVcIiwgLT5cbiAgICAgIGVuc3VyZSAnViBrJywgc2VsZWN0ZWRUZXh0OiB0ZXh0LmdldExpbmVzKFswLi4xXSlcblxuICBkZXNjcmliZSAnTW92ZVRvKFByZXZpb3VzfE5leHQpRm9sZChTdGFydHxFbmQpJywgLT5cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgICAgYXRvbS5wYWNrYWdlcy5hY3RpdmF0ZVBhY2thZ2UoJ2xhbmd1YWdlLWNvZmZlZS1zY3JpcHQnKVxuICAgICAgZ2V0VmltU3RhdGUgJ3NhbXBsZS5jb2ZmZWUnLCAoc3RhdGUsIHZpbSkgLT5cbiAgICAgICAge2VkaXRvciwgZWRpdG9yRWxlbWVudH0gPSBzdGF0ZVxuICAgICAgICB7c2V0LCBlbnN1cmV9ID0gdmltXG5cbiAgICAgIHJ1bnMgLT5cbiAgICAgICAgYXRvbS5rZXltYXBzLmFkZCBcInRlc3RcIixcbiAgICAgICAgICAnYXRvbS10ZXh0LWVkaXRvci52aW0tbW9kZS1wbHVzOm5vdCguaW5zZXJ0LW1vZGUpJzpcbiAgICAgICAgICAgICdbIFsnOiAndmltLW1vZGUtcGx1czptb3ZlLXRvLXByZXZpb3VzLWZvbGQtc3RhcnQnXG4gICAgICAgICAgICAnXSBbJzogJ3ZpbS1tb2RlLXBsdXM6bW92ZS10by1uZXh0LWZvbGQtc3RhcnQnXG4gICAgICAgICAgICAnWyBdJzogJ3ZpbS1tb2RlLXBsdXM6bW92ZS10by1wcmV2aW91cy1mb2xkLWVuZCdcbiAgICAgICAgICAgICddIF0nOiAndmltLW1vZGUtcGx1czptb3ZlLXRvLW5leHQtZm9sZC1lbmQnXG5cbiAgICBhZnRlckVhY2ggLT5cbiAgICAgIGF0b20ucGFja2FnZXMuZGVhY3RpdmF0ZVBhY2thZ2UoJ2xhbmd1YWdlLWNvZmZlZS1zY3JpcHQnKVxuXG4gICAgZGVzY3JpYmUgXCJNb3ZlVG9QcmV2aW91c0ZvbGRTdGFydFwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMzAsIDBdXG4gICAgICBpdCBcIm1vdmUgdG8gZmlyc3QgY2hhciBvZiBwcmV2aW91cyBmb2xkIHN0YXJ0IHJvd1wiLCAtPlxuICAgICAgICBlbnN1cmUgJ1sgWycsIGN1cnNvcjogWzIyLCA2XVxuICAgICAgICBlbnN1cmUgJ1sgWycsIGN1cnNvcjogWzIwLCA2XVxuICAgICAgICBlbnN1cmUgJ1sgWycsIGN1cnNvcjogWzE4LCA0XVxuICAgICAgICBlbnN1cmUgJ1sgWycsIGN1cnNvcjogWzksIDJdXG4gICAgICAgIGVuc3VyZSAnWyBbJywgY3Vyc29yOiBbOCwgMF1cblxuICAgIGRlc2NyaWJlIFwiTW92ZVRvTmV4dEZvbGRTdGFydFwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMCwgMF1cbiAgICAgIGl0IFwibW92ZSB0byBmaXJzdCBjaGFyIG9mIG5leHQgZm9sZCBzdGFydCByb3dcIiwgLT5cbiAgICAgICAgZW5zdXJlICddIFsnLCBjdXJzb3I6IFs4LCAwXVxuICAgICAgICBlbnN1cmUgJ10gWycsIGN1cnNvcjogWzksIDJdXG4gICAgICAgIGVuc3VyZSAnXSBbJywgY3Vyc29yOiBbMTgsIDRdXG4gICAgICAgIGVuc3VyZSAnXSBbJywgY3Vyc29yOiBbMjAsIDZdXG4gICAgICAgIGVuc3VyZSAnXSBbJywgY3Vyc29yOiBbMjIsIDZdXG5cbiAgICBkZXNjcmliZSBcIk1vdmVUb1ByZXZpb3VzRm9sZEVuZFwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMzAsIDBdXG4gICAgICBpdCBcIm1vdmUgdG8gZmlyc3QgY2hhciBvZiBwcmV2aW91cyBmb2xkIGVuZCByb3dcIiwgLT5cbiAgICAgICAgZW5zdXJlICdbIF0nLCBjdXJzb3I6IFsyOCwgMl1cbiAgICAgICAgZW5zdXJlICdbIF0nLCBjdXJzb3I6IFsyNSwgNF1cbiAgICAgICAgZW5zdXJlICdbIF0nLCBjdXJzb3I6IFsyMywgOF1cbiAgICAgICAgZW5zdXJlICdbIF0nLCBjdXJzb3I6IFsyMSwgOF1cblxuICAgIGRlc2NyaWJlIFwiTW92ZVRvTmV4dEZvbGRFbmRcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzAsIDBdXG4gICAgICBpdCBcIm1vdmUgdG8gZmlyc3QgY2hhciBvZiBuZXh0IGZvbGQgZW5kIHJvd1wiLCAtPlxuICAgICAgICBlbnN1cmUgJ10gXScsIGN1cnNvcjogWzIxLCA4XVxuICAgICAgICBlbnN1cmUgJ10gXScsIGN1cnNvcjogWzIzLCA4XVxuICAgICAgICBlbnN1cmUgJ10gXScsIGN1cnNvcjogWzI1LCA0XVxuICAgICAgICBlbnN1cmUgJ10gXScsIGN1cnNvcjogWzI4LCAyXVxuXG4gIGRlc2NyaWJlICdNb3ZlVG8oUHJldmlvdXN8TmV4dClGb2xkKFN0YXJ0fEVuZClXaXRoU2FtZUluZGVudCcsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgd2FpdHNGb3JQcm9taXNlIC0+XG4gICAgICAgIGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCdsYW5ndWFnZS1qYXZhc2NyaXB0JylcbiAgICAgIGdldFZpbVN0YXRlIChzdGF0ZSwgdmltKSAtPlxuICAgICAgICB7ZWRpdG9yLCBlZGl0b3JFbGVtZW50fSA9IHN0YXRlXG4gICAgICAgIHtzZXQsIGVuc3VyZX0gPSB2aW1cblxuICAgICAgcnVucyAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICBncmFtbWFyOiBcInNvdXJjZS5qc1wiXG4gICAgICAgICAgdGV4dDogXCJcIlwiXG4gICAgICAgICAgY2xhc3MgVGVzdEEge1xuICAgICAgICAgICAgbWV0aEEoKSB7XG4gICAgICAgICAgICAgIGlmICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2xhc3MgVGVzdEIge1xuICAgICAgICAgICAgbWV0aEIoKSB7XG4gICAgICAgICAgICAgIGlmICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxcblxuICAgICAgICAgIFwiXCJcIlxuXG4gICAgICAgIGF0b20ua2V5bWFwcy5hZGQgXCJ0ZXN0XCIsXG4gICAgICAgICAgJ2F0b20tdGV4dC1lZGl0b3IudmltLW1vZGUtcGx1czpub3QoLmluc2VydC1tb2RlKSc6XG4gICAgICAgICAgICAnWyBbJzogJ3ZpbS1tb2RlLXBsdXM6bW92ZS10by1wcmV2aW91cy1mb2xkLXN0YXJ0LXdpdGgtc2FtZS1pbmRlbnQnXG4gICAgICAgICAgICAnXSBbJzogJ3ZpbS1tb2RlLXBsdXM6bW92ZS10by1uZXh0LWZvbGQtc3RhcnQtd2l0aC1zYW1lLWluZGVudCdcbiAgICAgICAgICAgICdbIF0nOiAndmltLW1vZGUtcGx1czptb3ZlLXRvLXByZXZpb3VzLWZvbGQtZW5kLXdpdGgtc2FtZS1pbmRlbnQnXG4gICAgICAgICAgICAnXSBdJzogJ3ZpbS1tb2RlLXBsdXM6bW92ZS10by1uZXh0LWZvbGQtZW5kLXdpdGgtc2FtZS1pbmRlbnQnXG5cbiAgICBhZnRlckVhY2ggLT5cbiAgICAgIGF0b20ucGFja2FnZXMuZGVhY3RpdmF0ZVBhY2thZ2UoJ2xhbmd1YWdlLWphdmFzY3JpcHQnKVxuXG4gICAgZGVzY3JpYmUgXCJNb3ZlVG9QcmV2aW91c0ZvbGRTdGFydFdpdGhTYW1lSW5kZW50XCIsIC0+XG4gICAgICBpdCBcIltmcm9tIGxhcmdldHN0IGZvbGRdIG1vdmUgdG8gZmlyc3QgY2hhciBvZiBwcmV2aW91cyBmb2xkIHN0YXJ0IHJvd1wiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMTQsIDBdXG4gICAgICAgIGVuc3VyZSAnWyBbJywgY3Vyc29yOiBbOCwgMF1cbiAgICAgICAgZW5zdXJlICdbIFsnLCBjdXJzb3I6IFswLCAwXVxuICAgICAgICBlbnN1cmUgJ1sgWycsIGN1cnNvcjogWzAsIDBdXG4gICAgICBpdCBcIltmcm9tIG91dGVyIGZvbGRdIG1vdmUgdG8gZmlyc3QgY2hhciBvZiBwcmV2aW91cyBmb2xkIHN0YXJ0IHJvd1wiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbNywgMF0gIyBibGFuayByb3dcbiAgICAgICAgZW5zdXJlICdbIFsnLCBjdXJzb3I6IFswLCAwXVxuICAgICAgICBlbnN1cmUgJ1sgWycsIGN1cnNvcjogWzAsIDBdXG4gICAgICBpdCBcIltmcm9tIG9uZSBsZXZlbCBkZWVwZXIgZm9sZF0gbW92ZSB0byBmaXJzdCBjaGFyIG9mIHByZXZpb3VzIGZvbGQgc3RhcnQgcm93XCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFs5LCAwXVxuICAgICAgICBlbnN1cmUgJ1sgWycsIGN1cnNvcjogWzEsIDJdXG4gICAgICAgIGVuc3VyZSAnWyBbJywgY3Vyc29yOiBbMSwgMl1cblxuICAgIGRlc2NyaWJlIFwiTW92ZVRvTmV4dEZvbGRTdGFydFdpdGhTYW1lSW5kZW50XCIsIC0+XG4gICAgICBpdCBcIltmcm9tIGxhcmdldHN0IGZvbGRdIG1vdmUgdG8gZmlyc3QgY2hhciBvZiBuZXh0IGZvbGQgc3RhcnQgcm93XCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFswLCAwXVxuICAgICAgICBlbnN1cmUgJ10gWycsIGN1cnNvcjogWzgsIDBdXG4gICAgICAgIGVuc3VyZSAnXSBbJywgY3Vyc29yOiBbOCwgMF1cbiAgICAgIGl0IFwiW2Zyb20gb3V0ZXIgZm9sZF0gbW92ZSB0byBmaXJzdCBjaGFyIG9mIG5leHQgZm9sZCBzdGFydCByb3dcIiwgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzcsIDBdICMgYmxhbmsgcm93XG4gICAgICAgIGVuc3VyZSAnXSBbJywgY3Vyc29yOiBbOCwgMF1cbiAgICAgICAgZW5zdXJlICddIFsnLCBjdXJzb3I6IFs4LCAwXVxuICAgICAgaXQgXCJbZnJvbSBvbmUgbGV2ZWwgZGVlcGVyIGZvbGRdIG1vdmUgdG8gZmlyc3QgY2hhciBvZiBuZXh0IGZvbGQgc3RhcnQgcm93XCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFsxLCAwXVxuICAgICAgICBlbnN1cmUgJ10gWycsIGN1cnNvcjogWzksIDJdXG4gICAgICAgIGVuc3VyZSAnXSBbJywgY3Vyc29yOiBbOSwgMl1cblxuICAgIGRlc2NyaWJlIFwiTW92ZVRvUHJldmlvdXNGb2xkRW5kV2l0aFNhbWVJbmRlbnRcIiwgLT5cbiAgICAgIGl0IFwiW2Zyb20gbGFyZ2V0c3QgZm9sZF0gbW92ZSB0byBmaXJzdCBjaGFyIG9mIHByZXZpb3VzIGZvbGQgZW5kIHJvd1wiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMTQsIDBdXG4gICAgICAgIGVuc3VyZSAnWyBdJywgY3Vyc29yOiBbNiwgMF1cbiAgICAgICAgZW5zdXJlICdbIF0nLCBjdXJzb3I6IFs2LCAwXVxuICAgICAgaXQgXCJbZnJvbSBvdXRlciBmb2xkXSBtb3ZlIHRvIGZpcnN0IGNoYXIgb2YgcHJldmlvdXMgZm9sZCBlbmQgcm93XCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFs3LCAwXSAjIGJsYW5rIHJvd1xuICAgICAgICBlbnN1cmUgJ1sgXScsIGN1cnNvcjogWzYsIDBdXG4gICAgICAgIGVuc3VyZSAnWyBdJywgY3Vyc29yOiBbNiwgMF1cbiAgICAgIGl0IFwiW2Zyb20gb25lIGxldmVsIGRlZXBlciBmb2xkXSBtb3ZlIHRvIGZpcnN0IGNoYXIgb2YgcHJldmlvdXMgZm9sZCBlbmQgcm93XCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFsxMywgMF1cbiAgICAgICAgZW5zdXJlICdbIF0nLCBjdXJzb3I6IFs1LCAyXVxuICAgICAgICBlbnN1cmUgJ1sgXScsIGN1cnNvcjogWzUsIDJdXG5cbiAgICBkZXNjcmliZSBcIk1vdmVUb05leHRGb2xkRW5kV2l0aFNhbWVJbmRlbnRcIiwgLT5cbiAgICAgIGl0IFwiW2Zyb20gbGFyZ2V0c3QgZm9sZF0gbW92ZSB0byBmaXJzdCBjaGFyIG9mIG5leHQgZm9sZCBlbmQgcm93XCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFswLCAwXVxuICAgICAgICBlbnN1cmUgJ10gXScsIGN1cnNvcjogWzYsIDBdXG4gICAgICAgIGVuc3VyZSAnXSBdJywgY3Vyc29yOiBbMTQsIDBdXG4gICAgICAgIGVuc3VyZSAnXSBdJywgY3Vyc29yOiBbMTQsIDBdXG4gICAgICBpdCBcIltmcm9tIG91dGVyIGZvbGRdIG1vdmUgdG8gZmlyc3QgY2hhciBvZiBuZXh0IGZvbGQgZW5kIHJvd1wiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbNywgMF0gIyBibGFuayByb3dcbiAgICAgICAgZW5zdXJlICddIF0nLCBjdXJzb3I6IFsxNCwgMF1cbiAgICAgICAgZW5zdXJlICddIF0nLCBjdXJzb3I6IFsxNCwgMF1cbiAgICAgIGl0IFwiW2Zyb20gb25lIGxldmVsIGRlZXBlciBmb2xkXSBtb3ZlIHRvIGZpcnN0IGNoYXIgb2YgbmV4dCBmb2xkIGVuZCByb3dcIiwgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzEsIDBdICMgYmxhbmsgcm93XG4gICAgICAgIGVuc3VyZSAnXSBdJywgY3Vyc29yOiBbNSwgMl1cbiAgICAgICAgZW5zdXJlICddIF0nLCBjdXJzb3I6IFsxMywgMl1cbiAgICAgICAgZW5zdXJlICddIF0nLCBjdXJzb3I6IFsxMywgMl1cblxuICBkZXNjcmliZSAnc3Vid29yZCBtb3Rpb24nLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIGF0b20ua2V5bWFwcy5hZGQgXCJ0ZXN0XCIsXG4gICAgICAgICdhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXM6bm90KC5pbnNlcnQtbW9kZSknOlxuICAgICAgICAgICdxJzogJ3ZpbS1tb2RlLXBsdXM6bW92ZS10by1uZXh0LXN1YndvcmQnXG4gICAgICAgICAgJ1EnOiAndmltLW1vZGUtcGx1czptb3ZlLXRvLXByZXZpb3VzLXN1YndvcmQnXG4gICAgICAgICAgJ2N0cmwtZSc6ICd2aW0tbW9kZS1wbHVzOm1vdmUtdG8tZW5kLW9mLXN1YndvcmQnXG5cbiAgICBpdCBcIm1vdmUgdG8gbmV4dC9wcmV2aW91cyBzdWJ3b3JkXCIsIC0+XG4gICAgICBzZXQgdGV4dEM6IFwifGNhbWVsQ2FzZSA9PiAod2l0aCBzcGVjaWFsKSBDaGFSQWN0ZXJSc1xcblxcbmRhc2gtY2FzZVxcblxcbnNuYWtlX2Nhc2Vfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ3EnLCB0ZXh0QzogXCJjYW1lbHxDYXNlID0+ICh3aXRoIHNwZWNpYWwpIENoYVJBY3RlclJzXFxuXFxuZGFzaC1jYXNlXFxuXFxuc25ha2VfY2FzZV93b3JkXFxuXCJcbiAgICAgIGVuc3VyZSAncScsIHRleHRDOiBcImNhbWVsQ2FzZXwgPT4gKHdpdGggc3BlY2lhbCkgQ2hhUkFjdGVyUnNcXG5cXG5kYXNoLWNhc2VcXG5cXG5zbmFrZV9jYXNlX3dvcmRcXG5cIlxuICAgICAgZW5zdXJlICdxJywgdGV4dEM6IFwiY2FtZWxDYXNlID0+fCAod2l0aCBzcGVjaWFsKSBDaGFSQWN0ZXJSc1xcblxcbmRhc2gtY2FzZVxcblxcbnNuYWtlX2Nhc2Vfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ3EnLCB0ZXh0QzogXCJjYW1lbENhc2UgPT4gKHx3aXRoIHNwZWNpYWwpIENoYVJBY3RlclJzXFxuXFxuZGFzaC1jYXNlXFxuXFxuc25ha2VfY2FzZV93b3JkXFxuXCJcbiAgICAgIGVuc3VyZSAncScsIHRleHRDOiBcImNhbWVsQ2FzZSA9PiAod2l0aCB8c3BlY2lhbCkgQ2hhUkFjdGVyUnNcXG5cXG5kYXNoLWNhc2VcXG5cXG5zbmFrZV9jYXNlX3dvcmRcXG5cIlxuICAgICAgZW5zdXJlICdxJywgdGV4dEM6IFwiY2FtZWxDYXNlID0+ICh3aXRoIHNwZWNpYWx8KSBDaGFSQWN0ZXJSc1xcblxcbmRhc2gtY2FzZVxcblxcbnNuYWtlX2Nhc2Vfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ3EnLCB0ZXh0QzogXCJjYW1lbENhc2UgPT4gKHdpdGggc3BlY2lhbCkgfENoYVJBY3RlclJzXFxuXFxuZGFzaC1jYXNlXFxuXFxuc25ha2VfY2FzZV93b3JkXFxuXCJcbiAgICAgIGVuc3VyZSAncScsIHRleHRDOiBcImNhbWVsQ2FzZSA9PiAod2l0aCBzcGVjaWFsKSBDaGF8UkFjdGVyUnNcXG5cXG5kYXNoLWNhc2VcXG5cXG5zbmFrZV9jYXNlX3dvcmRcXG5cIlxuICAgICAgZW5zdXJlICdxJywgdGV4dEM6IFwiY2FtZWxDYXNlID0+ICh3aXRoIHNwZWNpYWwpIENoYVJ8QWN0ZXJSc1xcblxcbmRhc2gtY2FzZVxcblxcbnNuYWtlX2Nhc2Vfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ3EnLCB0ZXh0QzogXCJjYW1lbENhc2UgPT4gKHdpdGggc3BlY2lhbCkgQ2hhUkFjdGVyfFJzXFxuXFxuZGFzaC1jYXNlXFxuXFxuc25ha2VfY2FzZV93b3JkXFxuXCJcbiAgICAgIGVuc3VyZSAncScsIHRleHRDOiBcImNhbWVsQ2FzZSA9PiAod2l0aCBzcGVjaWFsKSBDaGFSQWN0ZXJSc1xcblxcbnxkYXNoLWNhc2VcXG5cXG5zbmFrZV9jYXNlX3dvcmRcXG5cIlxuICAgICAgZW5zdXJlICdxJywgdGV4dEM6IFwiY2FtZWxDYXNlID0+ICh3aXRoIHNwZWNpYWwpIENoYVJBY3RlclJzXFxuXFxuZGFzaHwtY2FzZVxcblxcbnNuYWtlX2Nhc2Vfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ3EnLCB0ZXh0QzogXCJjYW1lbENhc2UgPT4gKHdpdGggc3BlY2lhbCkgQ2hhUkFjdGVyUnNcXG5cXG5kYXNoLXxjYXNlXFxuXFxuc25ha2VfY2FzZV93b3JkXFxuXCJcbiAgICAgIGVuc3VyZSAncScsIHRleHRDOiBcImNhbWVsQ2FzZSA9PiAod2l0aCBzcGVjaWFsKSBDaGFSQWN0ZXJSc1xcblxcbmRhc2gtY2FzZVxcblxcbnxzbmFrZV9jYXNlX3dvcmRcXG5cIlxuICAgICAgZW5zdXJlICdxJywgdGV4dEM6IFwiY2FtZWxDYXNlID0+ICh3aXRoIHNwZWNpYWwpIENoYVJBY3RlclJzXFxuXFxuZGFzaC1jYXNlXFxuXFxuc25ha2V8X2Nhc2Vfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ3EnLCB0ZXh0QzogXCJjYW1lbENhc2UgPT4gKHdpdGggc3BlY2lhbCkgQ2hhUkFjdGVyUnNcXG5cXG5kYXNoLWNhc2VcXG5cXG5zbmFrZV9jYXNlfF93b3JkXFxuXCJcbiAgICAgIGVuc3VyZSAncScsIHRleHRDOiBcImNhbWVsQ2FzZSA9PiAod2l0aCBzcGVjaWFsKSBDaGFSQWN0ZXJSc1xcblxcbmRhc2gtY2FzZVxcblxcbnNuYWtlX2Nhc2Vfd29yfGRcXG5cIlxuICAgICAgZW5zdXJlICdRJywgdGV4dEM6IFwiY2FtZWxDYXNlID0+ICh3aXRoIHNwZWNpYWwpIENoYVJBY3RlclJzXFxuXFxuZGFzaC1jYXNlXFxuXFxuc25ha2VfY2FzZXxfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ1EnLCB0ZXh0QzogXCJjYW1lbENhc2UgPT4gKHdpdGggc3BlY2lhbCkgQ2hhUkFjdGVyUnNcXG5cXG5kYXNoLWNhc2VcXG5cXG5zbmFrZXxfY2FzZV93b3JkXFxuXCJcbiAgICAgIGVuc3VyZSAnUScsIHRleHRDOiBcImNhbWVsQ2FzZSA9PiAod2l0aCBzcGVjaWFsKSBDaGFSQWN0ZXJSc1xcblxcbmRhc2gtY2FzZVxcblxcbnxzbmFrZV9jYXNlX3dvcmRcXG5cIlxuICAgICAgZW5zdXJlICdRJywgdGV4dEM6IFwiY2FtZWxDYXNlID0+ICh3aXRoIHNwZWNpYWwpIENoYVJBY3RlclJzXFxuXFxuZGFzaC18Y2FzZVxcblxcbnNuYWtlX2Nhc2Vfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ1EnLCB0ZXh0QzogXCJjYW1lbENhc2UgPT4gKHdpdGggc3BlY2lhbCkgQ2hhUkFjdGVyUnNcXG5cXG5kYXNofC1jYXNlXFxuXFxuc25ha2VfY2FzZV93b3JkXFxuXCJcbiAgICAgIGVuc3VyZSAnUScsIHRleHRDOiBcImNhbWVsQ2FzZSA9PiAod2l0aCBzcGVjaWFsKSBDaGFSQWN0ZXJSc1xcblxcbnxkYXNoLWNhc2VcXG5cXG5zbmFrZV9jYXNlX3dvcmRcXG5cIlxuICAgICAgZW5zdXJlICdRJywgdGV4dEM6IFwiY2FtZWxDYXNlID0+ICh3aXRoIHNwZWNpYWwpIENoYVJBY3RlcnxSc1xcblxcbmRhc2gtY2FzZVxcblxcbnNuYWtlX2Nhc2Vfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ1EnLCB0ZXh0QzogXCJjYW1lbENhc2UgPT4gKHdpdGggc3BlY2lhbCkgQ2hhUnxBY3RlclJzXFxuXFxuZGFzaC1jYXNlXFxuXFxuc25ha2VfY2FzZV93b3JkXFxuXCJcbiAgICAgIGVuc3VyZSAnUScsIHRleHRDOiBcImNhbWVsQ2FzZSA9PiAod2l0aCBzcGVjaWFsKSBDaGF8UkFjdGVyUnNcXG5cXG5kYXNoLWNhc2VcXG5cXG5zbmFrZV9jYXNlX3dvcmRcXG5cIlxuICAgICAgZW5zdXJlICdRJywgdGV4dEM6IFwiY2FtZWxDYXNlID0+ICh3aXRoIHNwZWNpYWwpIHxDaGFSQWN0ZXJSc1xcblxcbmRhc2gtY2FzZVxcblxcbnNuYWtlX2Nhc2Vfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ1EnLCB0ZXh0QzogXCJjYW1lbENhc2UgPT4gKHdpdGggc3BlY2lhbHwpIENoYVJBY3RlclJzXFxuXFxuZGFzaC1jYXNlXFxuXFxuc25ha2VfY2FzZV93b3JkXFxuXCJcbiAgICAgIGVuc3VyZSAnUScsIHRleHRDOiBcImNhbWVsQ2FzZSA9PiAod2l0aCB8c3BlY2lhbCkgQ2hhUkFjdGVyUnNcXG5cXG5kYXNoLWNhc2VcXG5cXG5zbmFrZV9jYXNlX3dvcmRcXG5cIlxuICAgICAgZW5zdXJlICdRJywgdGV4dEM6IFwiY2FtZWxDYXNlID0+ICh8d2l0aCBzcGVjaWFsKSBDaGFSQWN0ZXJSc1xcblxcbmRhc2gtY2FzZVxcblxcbnNuYWtlX2Nhc2Vfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ1EnLCB0ZXh0QzogXCJjYW1lbENhc2UgPT58ICh3aXRoIHNwZWNpYWwpIENoYVJBY3RlclJzXFxuXFxuZGFzaC1jYXNlXFxuXFxuc25ha2VfY2FzZV93b3JkXFxuXCJcbiAgICAgIGVuc3VyZSAnUScsIHRleHRDOiBcImNhbWVsQ2FzZXwgPT4gKHdpdGggc3BlY2lhbCkgQ2hhUkFjdGVyUnNcXG5cXG5kYXNoLWNhc2VcXG5cXG5zbmFrZV9jYXNlX3dvcmRcXG5cIlxuICAgICAgZW5zdXJlICdRJywgdGV4dEM6IFwiY2FtZWx8Q2FzZSA9PiAod2l0aCBzcGVjaWFsKSBDaGFSQWN0ZXJSc1xcblxcbmRhc2gtY2FzZVxcblxcbnNuYWtlX2Nhc2Vfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ1EnLCB0ZXh0QzogXCJ8Y2FtZWxDYXNlID0+ICh3aXRoIHNwZWNpYWwpIENoYVJBY3RlclJzXFxuXFxuZGFzaC1jYXNlXFxuXFxuc25ha2VfY2FzZV93b3JkXFxuXCJcbiAgICBpdCBcIm1vdmUtdG8tZW5kLW9mLXN1YndvcmRcIiwgLT5cbiAgICAgIHNldCB0ZXh0QzogXCJ8Y2FtZWxDYXNlID0+ICh3aXRoIHNwZWNpYWwpIENoYVJBY3RlclJzXFxuXFxuZGFzaC1jYXNlXFxuXFxuc25ha2VfY2FzZV93b3JkXFxuXCJcbiAgICAgIGVuc3VyZSAnY3RybC1lJywgdGV4dEM6IFwiY2FtZXxsQ2FzZSA9PiAod2l0aCBzcGVjaWFsKSBDaGFSQWN0ZXJSc1xcblxcbmRhc2gtY2FzZVxcblxcbnNuYWtlX2Nhc2Vfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ2N0cmwtZScsIHRleHRDOiBcImNhbWVsQ2FzfGUgPT4gKHdpdGggc3BlY2lhbCkgQ2hhUkFjdGVyUnNcXG5cXG5kYXNoLWNhc2VcXG5cXG5zbmFrZV9jYXNlX3dvcmRcXG5cIlxuICAgICAgZW5zdXJlICdjdHJsLWUnLCB0ZXh0QzogXCJjYW1lbENhc2UgPXw+ICh3aXRoIHNwZWNpYWwpIENoYVJBY3RlclJzXFxuXFxuZGFzaC1jYXNlXFxuXFxuc25ha2VfY2FzZV93b3JkXFxuXCJcbiAgICAgIGVuc3VyZSAnY3RybC1lJywgdGV4dEM6IFwiY2FtZWxDYXNlID0+IHwod2l0aCBzcGVjaWFsKSBDaGFSQWN0ZXJSc1xcblxcbmRhc2gtY2FzZVxcblxcbnNuYWtlX2Nhc2Vfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ2N0cmwtZScsIHRleHRDOiBcImNhbWVsQ2FzZSA9PiAod2l0fGggc3BlY2lhbCkgQ2hhUkFjdGVyUnNcXG5cXG5kYXNoLWNhc2VcXG5cXG5zbmFrZV9jYXNlX3dvcmRcXG5cIlxuICAgICAgZW5zdXJlICdjdHJsLWUnLCB0ZXh0QzogXCJjYW1lbENhc2UgPT4gKHdpdGggc3BlY2lhfGwpIENoYVJBY3RlclJzXFxuXFxuZGFzaC1jYXNlXFxuXFxuc25ha2VfY2FzZV93b3JkXFxuXCJcbiAgICAgIGVuc3VyZSAnY3RybC1lJywgdGV4dEM6IFwiY2FtZWxDYXNlID0+ICh3aXRoIHNwZWNpYWx8KSBDaGFSQWN0ZXJSc1xcblxcbmRhc2gtY2FzZVxcblxcbnNuYWtlX2Nhc2Vfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ2N0cmwtZScsIHRleHRDOiBcImNhbWVsQ2FzZSA9PiAod2l0aCBzcGVjaWFsKSBDaHxhUkFjdGVyUnNcXG5cXG5kYXNoLWNhc2VcXG5cXG5zbmFrZV9jYXNlX3dvcmRcXG5cIlxuICAgICAgZW5zdXJlICdjdHJsLWUnLCB0ZXh0QzogXCJjYW1lbENhc2UgPT4gKHdpdGggc3BlY2lhbCkgQ2hhfFJBY3RlclJzXFxuXFxuZGFzaC1jYXNlXFxuXFxuc25ha2VfY2FzZV93b3JkXFxuXCJcbiAgICAgIGVuc3VyZSAnY3RybC1lJywgdGV4dEM6IFwiY2FtZWxDYXNlID0+ICh3aXRoIHNwZWNpYWwpIENoYVJBY3RlfHJSc1xcblxcbmRhc2gtY2FzZVxcblxcbnNuYWtlX2Nhc2Vfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ2N0cmwtZScsIHRleHRDOiBcImNhbWVsQ2FzZSA9PiAod2l0aCBzcGVjaWFsKSBDaGFSQWN0ZXJSfHNcXG5cXG5kYXNoLWNhc2VcXG5cXG5zbmFrZV9jYXNlX3dvcmRcXG5cIlxuICAgICAgZW5zdXJlICdjdHJsLWUnLCB0ZXh0QzogXCJjYW1lbENhc2UgPT4gKHdpdGggc3BlY2lhbCkgQ2hhUkFjdGVyUnNcXG5cXG5kYXN8aC1jYXNlXFxuXFxuc25ha2VfY2FzZV93b3JkXFxuXCJcbiAgICAgIGVuc3VyZSAnY3RybC1lJywgdGV4dEM6IFwiY2FtZWxDYXNlID0+ICh3aXRoIHNwZWNpYWwpIENoYVJBY3RlclJzXFxuXFxuZGFzaHwtY2FzZVxcblxcbnNuYWtlX2Nhc2Vfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ2N0cmwtZScsIHRleHRDOiBcImNhbWVsQ2FzZSA9PiAod2l0aCBzcGVjaWFsKSBDaGFSQWN0ZXJSc1xcblxcbmRhc2gtY2FzfGVcXG5cXG5zbmFrZV9jYXNlX3dvcmRcXG5cIlxuICAgICAgZW5zdXJlICdjdHJsLWUnLCB0ZXh0QzogXCJjYW1lbENhc2UgPT4gKHdpdGggc3BlY2lhbCkgQ2hhUkFjdGVyUnNcXG5cXG5kYXNoLWNhc2VcXG5cXG5zbmFrfGVfY2FzZV93b3JkXFxuXCJcbiAgICAgIGVuc3VyZSAnY3RybC1lJywgdGV4dEM6IFwiY2FtZWxDYXNlID0+ICh3aXRoIHNwZWNpYWwpIENoYVJBY3RlclJzXFxuXFxuZGFzaC1jYXNlXFxuXFxuc25ha2VfY2FzfGVfd29yZFxcblwiXG4gICAgICBlbnN1cmUgJ2N0cmwtZScsIHRleHRDOiBcImNhbWVsQ2FzZSA9PiAod2l0aCBzcGVjaWFsKSBDaGFSQWN0ZXJSc1xcblxcbmRhc2gtY2FzZVxcblxcbnNuYWtlX2Nhc2Vfd29yfGRcXG5cIlxuIl19
