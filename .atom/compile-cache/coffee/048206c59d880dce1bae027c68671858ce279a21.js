(function() {
  var TextData, dispatch, getVimState, rangeForRows, ref, settings;

  ref = require('./spec-helper'), getVimState = ref.getVimState, dispatch = ref.dispatch, TextData = ref.TextData;

  settings = require('../lib/settings');

  rangeForRows = function(startRow, endRow) {
    return [[startRow, 0], [endRow + 1, 0]];
  };

  describe("TextObject", function() {
    var editor, editorElement, ensure, ensureWait, getCheckFunctionFor, ref1, set, vimState;
    ref1 = [], set = ref1[0], ensure = ref1[1], ensureWait = ref1[2], editor = ref1[3], editorElement = ref1[4], vimState = ref1[5];
    getCheckFunctionFor = function(textObject) {
      return function(initialPoint, keystroke, options) {
        set({
          cursor: initialPoint
        });
        return ensure(keystroke + " " + textObject, options);
      };
    };
    beforeEach(function() {
      return getVimState(function(state, vimEditor) {
        vimState = state;
        editor = vimState.editor, editorElement = vimState.editorElement;
        return set = vimEditor.set, ensure = vimEditor.ensure, ensureWait = vimEditor.ensureWait, vimEditor;
      });
    });
    describe("TextObject", function() {
      beforeEach(function() {
        waitsForPromise(function() {
          return atom.packages.activatePackage('language-coffee-script');
        });
        return getVimState('sample.coffee', function(state, vimEditor) {
          editor = state.editor, editorElement = state.editorElement;
          return set = vimEditor.set, ensure = vimEditor.ensure, vimEditor;
        });
      });
      afterEach(function() {
        return atom.packages.deactivatePackage('language-coffee-script');
      });
      return describe("when TextObject is excuted directly", function() {
        return it("select that TextObject", function() {
          set({
            cursor: [8, 7]
          });
          dispatch(editorElement, 'vim-mode-plus:inner-word');
          return ensure(null, {
            selectedText: 'QuickSort'
          });
        });
      });
    });
    describe("Word", function() {
      describe("inner-word", function() {
        beforeEach(function() {
          return set({
            text: "12345 abcde ABCDE",
            cursor: [0, 9]
          });
        });
        it("applies operators inside the current word in operator-pending mode", function() {
          return ensure('d i w', {
            text: "12345  ABCDE",
            cursor: [0, 6],
            register: {
              '"': {
                text: 'abcde'
              }
            },
            mode: 'normal'
          });
        });
        it("selects inside the current word in visual mode", function() {
          return ensure('v i w', {
            selectedScreenRange: [[0, 6], [0, 11]]
          });
        });
        it("works with multiple cursors", function() {
          set({
            addCursor: [0, 1]
          });
          return ensure('v i w', {
            selectedBufferRange: [[[0, 6], [0, 11]], [[0, 0], [0, 5]]]
          });
        });
        describe("cursor is on next to NonWordCharacter", function() {
          beforeEach(function() {
            return set({
              text: "abc(def)",
              cursor: [0, 4]
            });
          });
          it("change inside word", function() {
            return ensure('c i w', {
              text: "abc()",
              mode: "insert"
            });
          });
          return it("delete inside word", function() {
            return ensure('d i w', {
              text: "abc()",
              mode: "normal"
            });
          });
        });
        return describe("cursor's next char is NonWordCharacter", function() {
          beforeEach(function() {
            return set({
              text: "abc(def)",
              cursor: [0, 6]
            });
          });
          it("change inside word", function() {
            return ensure('c i w', {
              text: "abc()",
              mode: "insert"
            });
          });
          return it("delete inside word", function() {
            return ensure('d i w', {
              text: "abc()",
              mode: "normal"
            });
          });
        });
      });
      return describe("a-word", function() {
        beforeEach(function() {
          return set({
            text: "12345 abcde ABCDE",
            cursor: [0, 9]
          });
        });
        it("select current-word and trailing white space", function() {
          return ensure('d a w', {
            text: "12345 ABCDE",
            cursor: [0, 6],
            register: {
              '"': {
                text: "abcde "
              }
            }
          });
        });
        it("select current-word and leading white space in case trailing white space wasn't there", function() {
          set({
            cursor: [0, 15]
          });
          return ensure('d a w', {
            text: "12345 abcde",
            cursor: [0, 10],
            register: {
              '"': {
                text: " ABCDE"
              }
            }
          });
        });
        it("selects from the start of the current word to the start of the next word in visual mode", function() {
          return ensure('v a w', {
            selectedScreenRange: [[0, 6], [0, 12]]
          });
        });
        it("doesn't span newlines", function() {
          set({
            text: "12345\nabcde ABCDE",
            cursor: [0, 3]
          });
          return ensure('v a w', {
            selectedBufferRange: [[0, 0], [0, 5]]
          });
        });
        return it("doesn't span special characters", function() {
          set({
            text: "1(345\nabcde ABCDE",
            cursor: [0, 3]
          });
          return ensure('v a w', {
            selectedBufferRange: [[0, 2], [0, 5]]
          });
        });
      });
    });
    describe("WholeWord", function() {
      describe("inner-whole-word", function() {
        beforeEach(function() {
          return set({
            text: "12(45 ab'de ABCDE",
            cursor: [0, 9]
          });
        });
        it("applies operators inside the current whole word in operator-pending mode", function() {
          return ensure('d i W', {
            text: "12(45  ABCDE",
            cursor: [0, 6],
            register: {
              '"': {
                text: "ab'de"
              }
            }
          });
        });
        return it("selects inside the current whole word in visual mode", function() {
          return ensure('v i W', {
            selectedScreenRange: [[0, 6], [0, 11]]
          });
        });
      });
      return describe("a-whole-word", function() {
        beforeEach(function() {
          return set({
            text: "12(45 ab'de ABCDE",
            cursor: [0, 9]
          });
        });
        it("select whole-word and trailing white space", function() {
          return ensure('d a W', {
            text: "12(45 ABCDE",
            cursor: [0, 6],
            register: {
              '"': {
                text: "ab'de "
              }
            },
            mode: 'normal'
          });
        });
        it("select whole-word and leading white space in case trailing white space wasn't there", function() {
          set({
            cursor: [0, 15]
          });
          return ensure('d a w', {
            text: "12(45 ab'de",
            cursor: [0, 10],
            register: {
              '"': {
                text: " ABCDE"
              }
            }
          });
        });
        it("selects from the start of the current whole word to the start of the next whole word in visual mode", function() {
          return ensure('v a W', {
            selectedScreenRange: [[0, 6], [0, 12]]
          });
        });
        return it("doesn't span newlines", function() {
          set({
            text: "12(45\nab'de ABCDE",
            cursor: [0, 4]
          });
          return ensure('v a W', {
            selectedBufferRange: [[0, 0], [0, 5]]
          });
        });
      });
    });
    describe("Subword", function() {
      var escape;
      escape = function() {
        return ensure('escape');
      };
      beforeEach(function() {
        return atom.keymaps.add("test", {
          'atom-text-editor.vim-mode-plus.operator-pending-mode, atom-text-editor.vim-mode-plus.visual-mode': {
            'a q': 'vim-mode-plus:a-subword',
            'i q': 'vim-mode-plus:inner-subword'
          }
        });
      });
      describe("inner-subword", function() {
        return it("select subword", function() {
          set({
            textC: "cam|elCase"
          });
          ensure("v i q", {
            selectedText: "camel"
          });
          escape();
          set({
            textC: "came|lCase"
          });
          ensure("v i q", {
            selectedText: "camel"
          });
          escape();
          set({
            textC: "camel|Case"
          });
          ensure("v i q", {
            selectedText: "Case"
          });
          escape();
          set({
            textC: "camelCas|e"
          });
          ensure("v i q", {
            selectedText: "Case"
          });
          escape();
          set({
            textC: "|_snake__case_"
          });
          ensure("v i q", {
            selectedText: "_snake"
          });
          escape();
          set({
            textC: "_snak|e__case_"
          });
          ensure("v i q", {
            selectedText: "_snake"
          });
          escape();
          set({
            textC: "_snake|__case_"
          });
          ensure("v i q", {
            selectedText: "__case"
          });
          escape();
          set({
            textC: "_snake_|_case_"
          });
          ensure("v i q", {
            selectedText: "__case"
          });
          escape();
          set({
            textC: "_snake__cas|e_"
          });
          ensure("v i q", {
            selectedText: "__case"
          });
          escape();
          set({
            textC: "_snake__case|_"
          });
          ensure("v i q", {
            selectedText: "_"
          });
          return escape();
        });
      });
      return describe("a-subword", function() {
        return it("select subword and spaces", function() {
          set({
            textC: "camelCa|se  NextCamel"
          });
          ensure("v a q", {
            selectedText: "Case  "
          });
          escape();
          set({
            textC: "camelCase  Ne|xtCamel"
          });
          ensure("v a q", {
            selectedText: "  Next"
          });
          escape();
          set({
            textC: "snake_c|ase  next_snake"
          });
          ensure("v a q", {
            selectedText: "_case  "
          });
          escape();
          set({
            textC: "snake_case  ne|xt_snake"
          });
          ensure("v a q", {
            selectedText: "  next"
          });
          return escape();
        });
      });
    });
    describe("AnyPair", function() {
      var complexText, ref2, simpleText;
      ref2 = {}, simpleText = ref2.simpleText, complexText = ref2.complexText;
      beforeEach(function() {
        simpleText = ".... \"abc\" ....\n.... 'abc' ....\n.... `abc` ....\n.... {abc} ....\n.... <abc> ....\n.... [abc] ....\n.... (abc) ....";
        complexText = "[4s\n--{3s\n----\"2s(1s-1e)2e\"\n---3e}-4e\n]";
        return set({
          text: simpleText,
          cursor: [0, 7]
        });
      });
      describe("inner-any-pair", function() {
        it("applies operators any inner-pair and repeatable", function() {
          ensure('d i s', {
            text: ".... \"\" ....\n.... 'abc' ....\n.... `abc` ....\n.... {abc} ....\n.... <abc> ....\n.... [abc] ....\n.... (abc) ...."
          });
          return ensure('j . j . j . j . j . j . j .', {
            text: ".... \"\" ....\n.... '' ....\n.... `` ....\n.... {} ....\n.... <> ....\n.... [] ....\n.... () ...."
          });
        });
        return it("can expand selection", function() {
          set({
            text: complexText,
            cursor: [2, 8]
          });
          ensure('v');
          ensure('i s', {
            selectedText: "1s-1e"
          });
          ensure('i s', {
            selectedText: "2s(1s-1e)2e"
          });
          ensure('i s', {
            selectedText: "3s\n----\"2s(1s-1e)2e\"\n---3e"
          });
          return ensure('i s', {
            selectedText: "4s\n--{3s\n----\"2s(1s-1e)2e\"\n---3e}-4e"
          });
        });
      });
      return describe("a-any-pair", function() {
        it("applies operators any a-pair and repeatable", function() {
          ensure('d a s', {
            text: "....  ....\n.... 'abc' ....\n.... `abc` ....\n.... {abc} ....\n.... <abc> ....\n.... [abc] ....\n.... (abc) ...."
          });
          return ensure('j . j . j . j . j . j . j .', {
            text: "....  ....\n....  ....\n....  ....\n....  ....\n....  ....\n....  ....\n....  ...."
          });
        });
        return it("can expand selection", function() {
          set({
            text: complexText,
            cursor: [2, 8]
          });
          ensure('v');
          ensure('a s', {
            selectedText: "(1s-1e)"
          });
          ensure('a s', {
            selectedText: "\"2s(1s-1e)2e\""
          });
          ensure('a s', {
            selectedText: "{3s\n----\"2s(1s-1e)2e\"\n---3e}"
          });
          return ensure('a s', {
            selectedText: "[4s\n--{3s\n----\"2s(1s-1e)2e\"\n---3e}-4e\n]"
          });
        });
      });
    });
    describe("AnyQuote", function() {
      beforeEach(function() {
        return set({
          text: "--\"abc\" `def`  'efg'--",
          cursor: [0, 0]
        });
      });
      describe("inner-any-quote", function() {
        it("applies operators any inner-pair and repeatable", function() {
          ensure('d i q', {
            text: "--\"\" `def`  'efg'--"
          });
          ensure('.', {
            text: "--\"\" ``  'efg'--"
          });
          return ensure('.', {
            text: "--\"\" ``  ''--"
          });
        });
        return it("can select next quote", function() {
          ensure('v');
          ensure('i q', {
            selectedText: 'abc'
          });
          ensure('i q', {
            selectedText: 'def'
          });
          return ensure('i q', {
            selectedText: 'efg'
          });
        });
      });
      return describe("a-any-quote", function() {
        it("applies operators any a-quote and repeatable", function() {
          ensure('d a q', {
            text: "-- `def`  'efg'--"
          });
          ensure('.', {
            text: "--   'efg'--"
          });
          return ensure('.', {
            text: "--   --"
          });
        });
        return it("can select next quote", function() {
          ensure('v');
          ensure('a q', {
            selectedText: '"abc"'
          });
          ensure('a q', {
            selectedText: '`def`'
          });
          return ensure('a q', {
            selectedText: "'efg'"
          });
        });
      });
    });
    describe("DoubleQuote", function() {
      describe("issue-635 new behavior of inner-double-quote", function() {
        beforeEach(function() {
          return atom.keymaps.add("test", {
            'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
              'g r': 'vim-mode-plus:replace'
            }
          });
        });
        describe("quote is un-balanced", function() {
          it("case1", function() {
            set({
              textC_: '_|_"____"____"'
            });
            return ensureWait('g r i " +', {
              textC_: '__"|++++"____"'
            });
          });
          it("case2", function() {
            set({
              textC_: '__"__|__"____"'
            });
            return ensureWait('g r i " +', {
              textC_: '__"|++++"____"'
            });
          });
          it("case3", function() {
            set({
              textC_: '__"____"__|__"'
            });
            return ensureWait('g r i " +', {
              textC_: '__"____"|++++"'
            });
          });
          it("case4", function() {
            set({
              textC_: '__|"____"____"'
            });
            return ensureWait('g r i " +', {
              textC_: '__"|++++"____"'
            });
          });
          it("case5", function() {
            set({
              textC_: '__"____|"____"'
            });
            return ensureWait('g r i " +', {
              textC_: '__"|++++"____"'
            });
          });
          return it("case6", function() {
            set({
              textC_: '__"____"____|"'
            });
            return ensureWait('g r i " +', {
              textC_: '__"____"|++++"'
            });
          });
        });
        return describe("quote is balanced", function() {
          it("case1", function() {
            set({
              textC_: '_|_"===="____"==="'
            });
            return ensureWait('g r i " +', {
              textC_: '__"|++++"____"==="'
            });
          });
          it("case2", function() {
            set({
              textC_: '__"==|=="____"==="'
            });
            return ensureWait('g r i " +', {
              textC_: '__"|++++"____"==="'
            });
          });
          it("case3", function() {
            set({
              textC_: '__"===="__|__"==="'
            });
            return ensureWait('g r i " +', {
              textC_: '__"===="|++++"==="'
            });
          });
          it("case4", function() {
            set({
              textC_: '__"===="____"=|=="'
            });
            return ensureWait('g r i " +', {
              textC_: '__"===="____"|+++"'
            });
          });
          it("case5", function() {
            set({
              textC_: '__|"===="____"==="'
            });
            return ensureWait('g r i " +', {
              textC_: '__"|++++"____"==="'
            });
          });
          it("case6", function() {
            set({
              textC_: '__"====|"____"==="'
            });
            return ensureWait('g r i " +', {
              textC_: '__"|++++"____"==="'
            });
          });
          return it("case7", function() {
            set({
              textC_: '__"===="____|"==="'
            });
            return ensureWait('g r i " +', {
              textC_: '__"===="____"|+++"'
            });
          });
        });
      });
      describe("inner-double-quote", function() {
        beforeEach(function() {
          return set({
            text: '" something in here and in "here" " and over here',
            cursor: [0, 9]
          });
        });
        it("applies operators inside the current string in operator-pending mode", function() {
          return ensure('d i "', {
            text: '""here" " and over here',
            cursor: [0, 1]
          });
        });
        it("applies operators inside the current string in operator-pending mode", function() {
          set({
            cursor: [0, 29]
          });
          return ensure('d i "', {
            text: '" something in here and in "" " and over here',
            cursor: [0, 28]
          });
        });
        it("makes no change if past the last string on a line", function() {
          set({
            cursor: [0, 39]
          });
          return ensure('d i "', {
            text: '" something in here and in "here" " and over here',
            cursor: [0, 39]
          });
        });
        return describe("cursor is on the pair char", function() {
          var check, close, open, selectedText, text, textFinal;
          check = getCheckFunctionFor('i "');
          text = '-"+"-';
          textFinal = '-""-';
          selectedText = '+';
          open = [0, 1];
          close = [0, 3];
          beforeEach(function() {
            return set({
              text: text
            });
          });
          it("case-1 normal", function() {
            return check(open, 'd', {
              text: textFinal,
              cursor: [0, 2]
            });
          });
          it("case-2 normal", function() {
            return check(close, 'd', {
              text: textFinal,
              cursor: [0, 2]
            });
          });
          it("case-3 visual", function() {
            return check(open, 'v', {
              selectedText: selectedText
            });
          });
          return it("case-4 visual", function() {
            return check(close, 'v', {
              selectedText: selectedText
            });
          });
        });
      });
      return describe("a-double-quote", function() {
        var originalText;
        originalText = '" something in here and in "here" "';
        beforeEach(function() {
          return set({
            text: originalText,
            cursor: [0, 9]
          });
        });
        it("applies operators around the current double quotes in operator-pending mode", function() {
          return ensure('d a "', {
            text: 'here" "',
            cursor: [0, 0],
            mode: 'normal'
          });
        });
        it("delete a-double-quote", function() {
          set({
            cursor: [0, 29]
          });
          return ensure('d a "', {
            text: '" something in here and in  "',
            cursor: [0, 27],
            mode: 'normal'
          });
        });
        return describe("cursor is on the pair char", function() {
          var check, close, open, selectedText, text, textFinal;
          check = getCheckFunctionFor('a "');
          text = '-"+"-';
          textFinal = '--';
          selectedText = '"+"';
          open = [0, 1];
          close = [0, 3];
          beforeEach(function() {
            return set({
              text: text
            });
          });
          it("case-1 normal", function() {
            return check(open, 'd', {
              text: textFinal,
              cursor: [0, 1]
            });
          });
          it("case-2 normal", function() {
            return check(close, 'd', {
              text: textFinal,
              cursor: [0, 1]
            });
          });
          it("case-3 visual", function() {
            return check(open, 'v', {
              selectedText: selectedText
            });
          });
          return it("case-4 visual", function() {
            return check(close, 'v', {
              selectedText: selectedText
            });
          });
        });
      });
    });
    describe("SingleQuote", function() {
      describe("inner-single-quote", function() {
        beforeEach(function() {
          return set({
            text: "' something in here and in 'here' ' and over here",
            cursor: [0, 9]
          });
        });
        describe("don't treat literal backslash(double backslash) as escape char", function() {
          beforeEach(function() {
            return set({
              text: "'some-key-here\\\\': 'here-is-the-val'"
            });
          });
          it("case-1", function() {
            set({
              cursor: [0, 2]
            });
            return ensure("d i '", {
              text: "'': 'here-is-the-val'",
              cursor: [0, 1]
            });
          });
          return it("case-2", function() {
            set({
              cursor: [0, 19]
            });
            return ensure("d i '", {
              text: "'some-key-here\\\\': ''",
              cursor: [0, 20]
            });
          });
        });
        describe("treat backslash(single backslash) as escape char", function() {
          beforeEach(function() {
            return set({
              text: "'some-key-here\\'': 'here-is-the-val'"
            });
          });
          it("case-1", function() {
            set({
              cursor: [0, 2]
            });
            return ensure("d i '", {
              text: "'': 'here-is-the-val'",
              cursor: [0, 1]
            });
          });
          return it("case-2", function() {
            set({
              cursor: [0, 17]
            });
            return ensure("d i '", {
              text: "'some-key-here\\'''here-is-the-val'",
              cursor: [0, 17]
            });
          });
        });
        it("applies operators inside the current string in operator-pending mode", function() {
          return ensure("d i '", {
            text: "''here' ' and over here",
            cursor: [0, 1]
          });
        });
        it("applies operators inside the next string in operator-pending mode (if not in a string)", function() {
          set({
            cursor: [0, 26]
          });
          return ensure("d i '", {
            text: "''here' ' and over here",
            cursor: [0, 1]
          });
        });
        it("makes no change if past the last string on a line", function() {
          set({
            cursor: [0, 39]
          });
          return ensure("d i '", {
            text: "' something in here and in 'here' ' and over here",
            cursor: [0, 39]
          });
        });
        return describe("cursor is on the pair char", function() {
          var check, close, open, selectedText, text, textFinal;
          check = getCheckFunctionFor("i '");
          text = "-'+'-";
          textFinal = "-''-";
          selectedText = '+';
          open = [0, 1];
          close = [0, 3];
          beforeEach(function() {
            return set({
              text: text
            });
          });
          it("case-1 normal", function() {
            return check(open, 'd', {
              text: textFinal,
              cursor: [0, 2]
            });
          });
          it("case-2 normal", function() {
            return check(close, 'd', {
              text: textFinal,
              cursor: [0, 2]
            });
          });
          it("case-3 visual", function() {
            return check(open, 'v', {
              selectedText: selectedText
            });
          });
          return it("case-4 visual", function() {
            return check(close, 'v', {
              selectedText: selectedText
            });
          });
        });
      });
      return describe("a-single-quote", function() {
        var originalText;
        originalText = "' something in here and in 'here' '";
        beforeEach(function() {
          return set({
            text: originalText,
            cursor: [0, 9]
          });
        });
        it("applies operators around the current single quotes in operator-pending mode", function() {
          return ensure("d a '", {
            text: "here' '",
            cursor: [0, 0],
            mode: 'normal'
          });
        });
        it("applies operators inside the next string in operator-pending mode (if not in a string)", function() {
          set({
            cursor: [0, 29]
          });
          return ensure("d a '", {
            text: "' something in here and in  '",
            cursor: [0, 27],
            mode: 'normal'
          });
        });
        return describe("cursor is on the pair char", function() {
          var check, close, open, selectedText, text, textFinal;
          check = getCheckFunctionFor("a '");
          text = "-'+'-";
          textFinal = "--";
          selectedText = "'+'";
          open = [0, 1];
          close = [0, 3];
          beforeEach(function() {
            return set({
              text: text
            });
          });
          it("case-1 normal", function() {
            return check(open, 'd', {
              text: textFinal,
              cursor: [0, 1]
            });
          });
          it("case-2 normal", function() {
            return check(close, 'd', {
              text: textFinal,
              cursor: [0, 1]
            });
          });
          it("case-3 visual", function() {
            return check(open, 'v', {
              selectedText: selectedText
            });
          });
          return it("case-4 visual", function() {
            return check(close, 'v', {
              selectedText: selectedText
            });
          });
        });
      });
    });
    describe("BackTick", function() {
      var originalText;
      originalText = "this is `sample` text.";
      beforeEach(function() {
        return set({
          text: originalText,
          cursor: [0, 9]
        });
      });
      describe("inner-back-tick", function() {
        it("applies operators inner-area", function() {
          return ensure("d i `", {
            text: "this is `` text.",
            cursor: [0, 9]
          });
        });
        it("do nothing when pair range is not under cursor", function() {
          set({
            cursor: [0, 16]
          });
          return ensure("d i `", {
            text: originalText,
            cursor: [0, 16]
          });
        });
        return describe("cursor is on the pair char", function() {
          var check, close, open, selectedText, text, textFinal;
          check = getCheckFunctionFor('i `');
          text = '-`+`-';
          textFinal = '-``-';
          selectedText = '+';
          open = [0, 1];
          close = [0, 3];
          beforeEach(function() {
            return set({
              text: text
            });
          });
          it("case-1 normal", function() {
            return check(open, 'd', {
              text: textFinal,
              cursor: [0, 2]
            });
          });
          it("case-2 normal", function() {
            return check(close, 'd', {
              text: textFinal,
              cursor: [0, 2]
            });
          });
          it("case-3 visual", function() {
            return check(open, 'v', {
              selectedText: selectedText
            });
          });
          return it("case-4 visual", function() {
            return check(close, 'v', {
              selectedText: selectedText
            });
          });
        });
      });
      return describe("a-back-tick", function() {
        it("applies operators inner-area", function() {
          return ensure("d a `", {
            text: "this is  text.",
            cursor: [0, 8]
          });
        });
        it("do nothing when pair range is not under cursor", function() {
          set({
            cursor: [0, 16]
          });
          return ensure("d a `", {
            text: originalText,
            cursor: [0, 16]
          });
        });
        return describe("cursor is on the pair char", function() {
          var check, close, open, selectedText, text, textFinal;
          check = getCheckFunctionFor("a `");
          text = "-`+`-";
          textFinal = "--";
          selectedText = "`+`";
          open = [0, 1];
          close = [0, 3];
          beforeEach(function() {
            return set({
              text: text
            });
          });
          it("case-1 normal", function() {
            return check(open, 'd', {
              text: textFinal,
              cursor: [0, 1]
            });
          });
          it("case-2 normal", function() {
            return check(close, 'd', {
              text: textFinal,
              cursor: [0, 1]
            });
          });
          it("case-3 visual", function() {
            return check(open, 'v', {
              selectedText: selectedText
            });
          });
          return it("case-4 visual", function() {
            return check(close, 'v', {
              selectedText: selectedText
            });
          });
        });
      });
    });
    describe("CurlyBracket", function() {
      describe("scope awareness of bracket", function() {
        it("[search from outside of double-quote] skips bracket in within-line-balanced-double-quotes", function() {
          set({
            textC: "{ | \"hello {\" }"
          });
          return ensure("v a {", {
            selectedText: "{  \"hello {\" }"
          });
        });
        it("Not ignore bracket in within-line-not-balanced-double-quotes", function() {
          set({
            textC: "{  \"hello {\" | '\"' }"
          });
          return ensure("v a {", {
            selectedText: "{\"  '\"' }"
          });
        });
        it("[search from inside of double-quote] skips bracket in within-line-balanced-double-quotes", function() {
          set({
            textC: "{  \"h|ello {\" }"
          });
          return ensure("v a {", {
            selectedText: "{  \"hello {\" }"
          });
        });
        return beforeEach(function() {
          return set({
            textC_: ""
          });
        });
      });
      describe("inner-curly-bracket", function() {
        beforeEach(function() {
          return set({
            text: "{ something in here and in {here} }",
            cursor: [0, 9]
          });
        });
        it("applies operators to inner-area in operator-pending mode", function() {
          return ensure('d i {', {
            text: "{}",
            cursor: [0, 1]
          });
        });
        it("applies operators to inner-area in operator-pending mode (second test)", function() {
          set({
            cursor: [0, 29]
          });
          return ensure('d i {', {
            text: "{ something in here and in {} }",
            cursor: [0, 28]
          });
        });
        describe("cursor is on the pair char", function() {
          var check, close, open, selectedText, text, textFinal;
          check = getCheckFunctionFor('i {');
          text = '-{+}-';
          textFinal = '-{}-';
          selectedText = '+';
          open = [0, 1];
          close = [0, 3];
          beforeEach(function() {
            return set({
              text: text
            });
          });
          it("case-1 normal", function() {
            return check(open, 'd', {
              text: textFinal,
              cursor: [0, 2]
            });
          });
          it("case-2 normal", function() {
            return check(close, 'd', {
              text: textFinal,
              cursor: [0, 2]
            });
          });
          it("case-3 visual", function() {
            return check(open, 'v', {
              selectedText: selectedText
            });
          });
          return it("case-4 visual", function() {
            return check(close, 'v', {
              selectedText: selectedText
            });
          });
        });
        return describe("change mode to characterwise", function() {
          var textSelected;
          textSelected = "__1,\n__2,\n__3".replace(/_/g, ' ');
          beforeEach(function() {
            set({
              textC: "{\n  |1,\n  2,\n  3\n}"
            });
            return ensure(null, {
              mode: 'normal'
            });
          });
          it("from vC, final-mode is 'characterwise'", function() {
            ensure('v', {
              selectedText: ['1'],
              mode: ['visual', 'characterwise']
            });
            return ensure('i B', {
              selectedText: textSelected,
              mode: ['visual', 'characterwise']
            });
          });
          it("from vL, final-mode is 'characterwise'", function() {
            ensure('V', {
              selectedText: ["  1,\n"],
              mode: ['visual', 'linewise']
            });
            return ensure('i B', {
              selectedText: textSelected,
              mode: ['visual', 'characterwise']
            });
          });
          it("from vB, final-mode is 'characterwise'", function() {
            ensure('ctrl-v', {
              selectedText: ["1"],
              mode: ['visual', 'blockwise']
            });
            return ensure('i B', {
              selectedText: textSelected,
              mode: ['visual', 'characterwise']
            });
          });
          return describe("as operator target", function() {
            it("change inner-pair", function() {
              return ensure("c i B", {
                textC: "{\n|\n}",
                mode: 'insert'
              });
            });
            return it("delete inner-pair", function() {
              return ensure("d i B", {
                textC: "{\n|}",
                mode: 'normal'
              });
            });
          });
        });
      });
      return describe("a-curly-bracket", function() {
        beforeEach(function() {
          return set({
            text: "{ something in here and in {here} }",
            cursor: [0, 9]
          });
        });
        it("applies operators to a-area in operator-pending mode", function() {
          return ensure('d a {', {
            text: '',
            cursor: [0, 0],
            mode: 'normal'
          });
        });
        it("applies operators to a-area in operator-pending mode (second test)", function() {
          set({
            cursor: [0, 29]
          });
          return ensure('d a {', {
            text: "{ something in here and in  }",
            cursor: [0, 27],
            mode: 'normal'
          });
        });
        describe("cursor is on the pair char", function() {
          var check, close, open, selectedText, text, textFinal;
          check = getCheckFunctionFor("a {");
          text = "-{+}-";
          textFinal = "--";
          selectedText = "{+}";
          open = [0, 1];
          close = [0, 3];
          beforeEach(function() {
            return set({
              text: text
            });
          });
          it("case-1 normal", function() {
            return check(open, 'd', {
              text: textFinal,
              cursor: [0, 1]
            });
          });
          it("case-2 normal", function() {
            return check(close, 'd', {
              text: textFinal,
              cursor: [0, 1]
            });
          });
          it("case-3 visual", function() {
            return check(open, 'v', {
              selectedText: selectedText
            });
          });
          return it("case-4 visual", function() {
            return check(close, 'v', {
              selectedText: selectedText
            });
          });
        });
        return describe("change mode to characterwise", function() {
          var textSelected;
          textSelected = "{\n  1,\n  2,\n  3\n}";
          beforeEach(function() {
            set({
              textC: "{\n  |1,\n  2,\n  3\n}\n\nhello"
            });
            return ensure(null, {
              mode: 'normal'
            });
          });
          it("from vC, final-mode is 'characterwise'", function() {
            ensure('v', {
              selectedText: ['1'],
              mode: ['visual', 'characterwise']
            });
            return ensure('a B', {
              selectedText: textSelected,
              mode: ['visual', 'characterwise']
            });
          });
          it("from vL, final-mode is 'characterwise'", function() {
            ensure('V', {
              selectedText: ["  1,\n"],
              mode: ['visual', 'linewise']
            });
            return ensure('a B', {
              selectedText: textSelected,
              mode: ['visual', 'characterwise']
            });
          });
          it("from vB, final-mode is 'characterwise'", function() {
            ensure('ctrl-v', {
              selectedText: ["1"],
              mode: ['visual', 'blockwise']
            });
            return ensure('a B', {
              selectedText: textSelected,
              mode: ['visual', 'characterwise']
            });
          });
          return describe("as operator target", function() {
            it("change inner-pair", function() {
              return ensure("c a B", {
                textC: "|\n\nhello",
                mode: 'insert'
              });
            });
            return it("delete inner-pair", function() {
              return ensure("d a B", {
                textC: "|\n\nhello",
                mode: 'normal'
              });
            });
          });
        });
      });
    });
    describe("AngleBracket", function() {
      describe("inner-angle-bracket", function() {
        beforeEach(function() {
          return set({
            text: "< something in here and in <here> >",
            cursor: [0, 9]
          });
        });
        it("applies operators inside the current word in operator-pending mode", function() {
          return ensure('d i <', {
            text: "<>",
            cursor: [0, 1]
          });
        });
        it("applies operators inside the current word in operator-pending mode (second test)", function() {
          set({
            cursor: [0, 29]
          });
          return ensure('d i <', {
            text: "< something in here and in <> >",
            cursor: [0, 28]
          });
        });
        return describe("cursor is on the pair char", function() {
          var check, close, open, selectedText, text, textFinal;
          check = getCheckFunctionFor('i <');
          text = '-<+>-';
          textFinal = '-<>-';
          selectedText = '+';
          open = [0, 1];
          close = [0, 3];
          beforeEach(function() {
            return set({
              text: text
            });
          });
          it("case-1 normal", function() {
            return check(open, 'd', {
              text: textFinal,
              cursor: [0, 2]
            });
          });
          it("case-2 normal", function() {
            return check(close, 'd', {
              text: textFinal,
              cursor: [0, 2]
            });
          });
          it("case-3 visual", function() {
            return check(open, 'v', {
              selectedText: selectedText
            });
          });
          return it("case-4 visual", function() {
            return check(close, 'v', {
              selectedText: selectedText
            });
          });
        });
      });
      return describe("a-angle-bracket", function() {
        beforeEach(function() {
          return set({
            text: "< something in here and in <here> >",
            cursor: [0, 9]
          });
        });
        it("applies operators around the current angle brackets in operator-pending mode", function() {
          return ensure('d a <', {
            text: '',
            cursor: [0, 0],
            mode: 'normal'
          });
        });
        it("applies operators around the current angle brackets in operator-pending mode (second test)", function() {
          set({
            cursor: [0, 29]
          });
          return ensure('d a <', {
            text: "< something in here and in  >",
            cursor: [0, 27],
            mode: 'normal'
          });
        });
        return describe("cursor is on the pair char", function() {
          var check, close, open, selectedText, text, textFinal;
          check = getCheckFunctionFor("a <");
          text = "-<+>-";
          textFinal = "--";
          selectedText = "<+>";
          open = [0, 1];
          close = [0, 3];
          beforeEach(function() {
            return set({
              text: text
            });
          });
          it("case-1 normal", function() {
            return check(open, 'd', {
              text: textFinal,
              cursor: [0, 1]
            });
          });
          it("case-2 normal", function() {
            return check(close, 'd', {
              text: textFinal,
              cursor: [0, 1]
            });
          });
          it("case-3 visual", function() {
            return check(open, 'v', {
              selectedText: selectedText
            });
          });
          return it("case-4 visual", function() {
            return check(close, 'v', {
              selectedText: selectedText
            });
          });
        });
      });
    });
    describe("AllowForwarding family", function() {
      beforeEach(function() {
        atom.keymaps.add("test", {
          'atom-text-editor.vim-mode-plus.operator-pending-mode, atom-text-editor.vim-mode-plus.visual-mode': {
            'i }': 'vim-mode-plus:inner-curly-bracket-allow-forwarding',
            'i >': 'vim-mode-plus:inner-angle-bracket-allow-forwarding',
            'i ]': 'vim-mode-plus:inner-square-bracket-allow-forwarding',
            'i )': 'vim-mode-plus:inner-parenthesis-allow-forwarding',
            'a }': 'vim-mode-plus:a-curly-bracket-allow-forwarding',
            'a >': 'vim-mode-plus:a-angle-bracket-allow-forwarding',
            'a ]': 'vim-mode-plus:a-square-bracket-allow-forwarding',
            'a )': 'vim-mode-plus:a-parenthesis-allow-forwarding'
          }
        });
        return set({
          text: "__{000}__\n__<111>__\n__[222]__\n__(333)__"
        });
      });
      describe("inner", function() {
        return it("select forwarding range", function() {
          set({
            cursor: [0, 0]
          });
          ensure('escape v i }', {
            selectedText: "000"
          });
          set({
            cursor: [1, 0]
          });
          ensure('escape v i >', {
            selectedText: "111"
          });
          set({
            cursor: [2, 0]
          });
          ensure('escape v i ]', {
            selectedText: "222"
          });
          set({
            cursor: [3, 0]
          });
          return ensure('escape v i )', {
            selectedText: "333"
          });
        });
      });
      describe("a", function() {
        return it("select forwarding range", function() {
          set({
            cursor: [0, 0]
          });
          ensure('escape v a }', {
            selectedText: "{000}"
          });
          set({
            cursor: [1, 0]
          });
          ensure('escape v a >', {
            selectedText: "<111>"
          });
          set({
            cursor: [2, 0]
          });
          ensure('escape v a ]', {
            selectedText: "[222]"
          });
          set({
            cursor: [3, 0]
          });
          return ensure('escape v a )', {
            selectedText: "(333)"
          });
        });
      });
      return describe("multi line text", function() {
        var ref2, textOneA, textOneInner;
        ref2 = [], textOneInner = ref2[0], textOneA = ref2[1];
        beforeEach(function() {
          set({
            text: "000\n000{11\n111{22}\n111\n111}"
          });
          textOneInner = "11\n111{22}\n111\n111";
          return textOneA = "{11\n111{22}\n111\n111}";
        });
        describe("forwarding inner", function() {
          it("select forwarding range", function() {
            set({
              cursor: [1, 0]
            });
            return ensure("v i }", {
              selectedText: textOneInner
            });
          });
          it("select forwarding range", function() {
            set({
              cursor: [2, 0]
            });
            return ensure("v i }", {
              selectedText: "22"
            });
          });
          it("[c1] no fwd open, fail to find", function() {
            set({
              cursor: [0, 0]
            });
            return ensure("v i }", {
              selectedText: '0',
              cursor: [0, 1]
            });
          });
          it("[c2] no fwd open, select enclosed", function() {
            set({
              cursor: [1, 4]
            });
            return ensure("v i }", {
              selectedText: textOneInner
            });
          });
          it("[c3] no fwd open, select enclosed", function() {
            set({
              cursor: [3, 0]
            });
            return ensure("v i }", {
              selectedText: textOneInner
            });
          });
          return it("[c3] no fwd open, select enclosed", function() {
            set({
              cursor: [4, 0]
            });
            return ensure("v i }", {
              selectedText: textOneInner
            });
          });
        });
        return describe("forwarding a", function() {
          it("select forwarding range", function() {
            set({
              cursor: [1, 0]
            });
            return ensure("v a }", {
              selectedText: textOneA
            });
          });
          it("select forwarding range", function() {
            set({
              cursor: [2, 0]
            });
            return ensure("v a }", {
              selectedText: "{22}"
            });
          });
          it("[c1] no fwd open, fail to find", function() {
            set({
              cursor: [0, 0]
            });
            return ensure("v a }", {
              selectedText: '0',
              cursor: [0, 1]
            });
          });
          it("[c2] no fwd open, select enclosed", function() {
            set({
              cursor: [1, 4]
            });
            return ensure("v a }", {
              selectedText: textOneA
            });
          });
          it("[c3] no fwd open, select enclosed", function() {
            set({
              cursor: [3, 0]
            });
            return ensure("v a }", {
              selectedText: textOneA
            });
          });
          return it("[c3] no fwd open, select enclosed", function() {
            set({
              cursor: [4, 0]
            });
            return ensure("v a }", {
              selectedText: textOneA
            });
          });
        });
      });
    });
    describe("AnyPairAllowForwarding", function() {
      beforeEach(function() {
        atom.keymaps.add("text", {
          'atom-text-editor.vim-mode-plus.operator-pending-mode, atom-text-editor.vim-mode-plus.visual-mode': {
            ";": 'vim-mode-plus:inner-any-pair-allow-forwarding',
            ":": 'vim-mode-plus:a-any-pair-allow-forwarding'
          }
        });
        return set({
          text: "00\n00[11\n11\"222\"11{333}11(\n444()444\n)\n111]00{555}"
        });
      });
      describe("inner", function() {
        return it("select forwarding range within enclosed range(if exists)", function() {
          set({
            cursor: [2, 0]
          });
          ensure('v');
          ensure(';', {
            selectedText: "222"
          });
          ensure(';', {
            selectedText: "333"
          });
          return ensure(';', {
            selectedText: "444()444"
          });
        });
      });
      return describe("a", function() {
        return it("select forwarding range within enclosed range(if exists)", function() {
          set({
            cursor: [2, 0]
          });
          ensure('v');
          ensure(':', {
            selectedText: '"222"'
          });
          ensure(':', {
            selectedText: "{333}"
          });
          ensure(':', {
            selectedText: "(\n444()444\n)"
          });
          return ensure(':', {
            selectedText: "[11\n11\"222\"11{333}11(\n444()444\n)\n111]"
          });
        });
      });
    });
    describe("Tag", function() {
      var ensureSelectedText;
      ensureSelectedText = [][0];
      ensureSelectedText = function(start, keystroke, selectedText) {
        set({
          cursor: start
        });
        return ensure(keystroke, {
          selectedText: selectedText
        });
      };
      describe("inner-tag", function() {
        describe("precisely select inner", function() {
          var check, innerABC, selectedText, text, textAfterDeleted;
          check = getCheckFunctionFor('i t');
          text = "<abc>\n  <title>TITLE</title>\n</abc>";
          selectedText = "TITLE";
          innerABC = "\n  <title>TITLE</title>\n";
          textAfterDeleted = "<abc>\n  <title></title>\n</abc>";
          beforeEach(function() {
            return set({
              text: text
            });
          });
          it("[1] forwarding", function() {
            return check([1, 0], 'v', {
              selectedText: selectedText
            });
          });
          it("[2] openTag leftmost", function() {
            return check([1, 2], 'v', {
              selectedText: selectedText
            });
          });
          it("[3] openTag rightmost", function() {
            return check([1, 8], 'v', {
              selectedText: selectedText
            });
          });
          it("[4] Inner text", function() {
            return check([1, 10], 'v', {
              selectedText: selectedText
            });
          });
          it("[5] closeTag leftmost", function() {
            return check([1, 14], 'v', {
              selectedText: selectedText
            });
          });
          it("[6] closeTag rightmost", function() {
            return check([1, 21], 'v', {
              selectedText: selectedText
            });
          });
          it("[7] right of closeTag", function() {
            return check([2, 0], 'v', {
              selectedText: innerABC
            });
          });
          it("[8] forwarding", function() {
            return check([1, 0], 'd', {
              text: textAfterDeleted
            });
          });
          it("[9] openTag leftmost", function() {
            return check([1, 2], 'd', {
              text: textAfterDeleted
            });
          });
          it("[10] openTag rightmost", function() {
            return check([1, 8], 'd', {
              text: textAfterDeleted
            });
          });
          it("[11] Inner text", function() {
            return check([1, 10], 'd', {
              text: textAfterDeleted
            });
          });
          it("[12] closeTag leftmost", function() {
            return check([1, 14], 'd', {
              text: textAfterDeleted
            });
          });
          it("[13] closeTag rightmost", function() {
            return check([1, 21], 'd', {
              text: textAfterDeleted
            });
          });
          return it("[14] right of closeTag", function() {
            return check([2, 0], 'd', {
              text: "<abc></abc>"
            });
          });
        });
        describe("expansion and deletion", function() {
          beforeEach(function() {
            var htmlLikeText;
            htmlLikeText = "<DOCTYPE html>\n<html lang=\"en\">\n<head>\n__<meta charset=\"UTF-8\" />\n__<title>Document</title>\n</head>\n<body>\n__<div>\n____<div>\n|______<div>\n________<p><a>\n______</div>\n____</div>\n__</div>\n</body>\n</html>\n";
            return set({
              textC_: htmlLikeText
            });
          });
          it("can expand selection when repeated", function() {
            ensure('v i t', {
              selectedText_: "\n________<p><a>\n______"
            });
            ensure('i t', {
              selectedText_: "\n______<div>\n________<p><a>\n______</div>\n____"
            });
            ensure('i t', {
              selectedText_: "\n____<div>\n______<div>\n________<p><a>\n______</div>\n____</div>\n__"
            });
            ensure('i t', {
              selectedText_: "\n__<div>\n____<div>\n______<div>\n________<p><a>\n______</div>\n____</div>\n__</div>\n"
            });
            return ensure('i t', {
              selectedText_: "\n<head>\n__<meta charset=\"UTF-8\" />\n__<title>Document</title>\n</head>\n<body>\n__<div>\n____<div>\n______<div>\n________<p><a>\n______</div>\n____</div>\n__</div>\n</body>\n"
            });
          });
          return it('delete inner-tag and repatable', function() {
            set({
              cursor: [9, 0]
            });
            ensure("d i t", {
              text_: "<DOCTYPE html>\n<html lang=\"en\">\n<head>\n__<meta charset=\"UTF-8\" />\n__<title>Document</title>\n</head>\n<body>\n__<div>\n____<div>\n______<div></div>\n____</div>\n__</div>\n</body>\n</html>\n"
            });
            ensure("3 .", {
              text_: "<DOCTYPE html>\n<html lang=\"en\">\n<head>\n__<meta charset=\"UTF-8\" />\n__<title>Document</title>\n</head>\n<body></body>\n</html>\n"
            });
            return ensure(".", {
              text_: "<DOCTYPE html>\n<html lang=\"en\"></html>\n"
            });
          });
        });
        return describe("tag's IN-tag/Off-tag recognition", function() {
          describe("When tagStart's row contains NO NON-whitespaece till tagStart", function() {
            return it("[multi-line] select forwarding tag", function() {
              set({
                textC: "<span>\n  |  <span>inner</span>\n</span>"
              });
              return ensure("d i t", {
                text: "<span>\n    <span></span>\n</span>"
              });
            });
          });
          return describe("When tagStart's row contains SOME NON-whitespaece till tagStart", function() {
            it("[multi-line] select enclosing tag", function() {
              set({
                textC: "<span>\nhello | <span>inner</span>\n</span>"
              });
              return ensure("d i t", {
                text: "<span></span>"
              });
            });
            it("[one-line-1] select enclosing tag", function() {
              set({
                textC: "<span> | <span>inner</span></span>"
              });
              return ensure("d i t", {
                text: "<span></span>"
              });
            });
            return it("[one-line-2] select enclosing tag", function() {
              set({
                textC: "<span>h|ello<span>inner</span></span>"
              });
              return ensure("d i t", {
                text: "<span></span>"
              });
            });
          });
        });
      });
      return describe("a-tag", function() {
        return describe("precisely select a", function() {
          var aABC, check, selectedText, text, textAfterDeleted;
          check = getCheckFunctionFor('a t');
          text = "<abc>\n  <title>TITLE</title>\n</abc>";
          selectedText = "<title>TITLE</title>";
          aABC = text;
          textAfterDeleted = "<abc>\n__\n</abc>".replace(/_/g, ' ');
          beforeEach(function() {
            return set({
              text: text
            });
          });
          it("[1] forwarding", function() {
            return check([1, 0], 'v', {
              selectedText: selectedText
            });
          });
          it("[2] openTag leftmost", function() {
            return check([1, 2], 'v', {
              selectedText: selectedText
            });
          });
          it("[3] openTag rightmost", function() {
            return check([1, 8], 'v', {
              selectedText: selectedText
            });
          });
          it("[4] Inner text", function() {
            return check([1, 10], 'v', {
              selectedText: selectedText
            });
          });
          it("[5] closeTag leftmost", function() {
            return check([1, 14], 'v', {
              selectedText: selectedText
            });
          });
          it("[6] closeTag rightmost", function() {
            return check([1, 21], 'v', {
              selectedText: selectedText
            });
          });
          it("[7] right of closeTag", function() {
            return check([2, 0], 'v', {
              selectedText: aABC
            });
          });
          it("[8] forwarding", function() {
            return check([1, 0], 'd', {
              text: textAfterDeleted
            });
          });
          it("[9] openTag leftmost", function() {
            return check([1, 2], 'd', {
              text: textAfterDeleted
            });
          });
          it("[10] openTag rightmost", function() {
            return check([1, 8], 'd', {
              text: textAfterDeleted
            });
          });
          it("[11] Inner text", function() {
            return check([1, 10], 'd', {
              text: textAfterDeleted
            });
          });
          it("[12] closeTag leftmost", function() {
            return check([1, 14], 'd', {
              text: textAfterDeleted
            });
          });
          it("[13] closeTag rightmost", function() {
            return check([1, 21], 'd', {
              text: textAfterDeleted
            });
          });
          return it("[14] right of closeTag", function() {
            return check([2, 0], 'd', {
              text: ""
            });
          });
        });
      });
    });
    describe("SquareBracket", function() {
      describe("inner-square-bracket", function() {
        beforeEach(function() {
          return set({
            text: "[ something in here and in [here] ]",
            cursor: [0, 9]
          });
        });
        it("applies operators inside the current word in operator-pending mode", function() {
          return ensure('d i [', {
            text: "[]",
            cursor: [0, 1]
          });
        });
        return it("applies operators inside the current word in operator-pending mode (second test)", function() {
          set({
            cursor: [0, 29]
          });
          return ensure('d i [', {
            text: "[ something in here and in [] ]",
            cursor: [0, 28]
          });
        });
      });
      return describe("a-square-bracket", function() {
        beforeEach(function() {
          return set({
            text: "[ something in here and in [here] ]",
            cursor: [0, 9]
          });
        });
        it("applies operators around the current square brackets in operator-pending mode", function() {
          return ensure('d a [', {
            text: '',
            cursor: [0, 0],
            mode: 'normal'
          });
        });
        it("applies operators around the current square brackets in operator-pending mode (second test)", function() {
          set({
            cursor: [0, 29]
          });
          return ensure('d a [', {
            text: "[ something in here and in  ]",
            cursor: [0, 27],
            mode: 'normal'
          });
        });
        describe("cursor is on the pair char", function() {
          var check, close, open, selectedText, text, textFinal;
          check = getCheckFunctionFor('i [');
          text = '-[+]-';
          textFinal = '-[]-';
          selectedText = '+';
          open = [0, 1];
          close = [0, 3];
          beforeEach(function() {
            return set({
              text: text
            });
          });
          it("case-1 normal", function() {
            return check(open, 'd', {
              text: textFinal,
              cursor: [0, 2]
            });
          });
          it("case-2 normal", function() {
            return check(close, 'd', {
              text: textFinal,
              cursor: [0, 2]
            });
          });
          it("case-3 visual", function() {
            return check(open, 'v', {
              selectedText: selectedText
            });
          });
          return it("case-4 visual", function() {
            return check(close, 'v', {
              selectedText: selectedText
            });
          });
        });
        return describe("cursor is on the pair char", function() {
          var check, close, open, selectedText, text, textFinal;
          check = getCheckFunctionFor('a [');
          text = '-[+]-';
          textFinal = '--';
          selectedText = '[+]';
          open = [0, 1];
          close = [0, 3];
          beforeEach(function() {
            return set({
              text: text
            });
          });
          it("case-1 normal", function() {
            return check(open, 'd', {
              text: textFinal,
              cursor: [0, 1]
            });
          });
          it("case-2 normal", function() {
            return check(close, 'd', {
              text: textFinal,
              cursor: [0, 1]
            });
          });
          it("case-3 visual", function() {
            return check(open, 'v', {
              selectedText: selectedText
            });
          });
          return it("case-4 visual", function() {
            return check(close, 'v', {
              selectedText: selectedText
            });
          });
        });
      });
    });
    describe("Parenthesis", function() {
      describe("inner-parenthesis", function() {
        beforeEach(function() {
          return set({
            text: "( something in here and in (here) )",
            cursor: [0, 9]
          });
        });
        it("applies operators inside the current word in operator-pending mode", function() {
          return ensure('d i (', {
            text: "()",
            cursor: [0, 1]
          });
        });
        it("applies operators inside the current word in operator-pending mode (second test)", function() {
          set({
            cursor: [0, 29]
          });
          return ensure('d i (', {
            text: "( something in here and in () )",
            cursor: [0, 28]
          });
        });
        it("select inner () by skipping nesting pair", function() {
          set({
            text: 'expect(editor.getScrollTop())',
            cursor: [0, 7]
          });
          return ensure('v i (', {
            selectedText: 'editor.getScrollTop()'
          });
        });
        it("skip escaped pair case-1", function() {
          set({
            text: 'expect(editor.g\\(etScrollTp())',
            cursor: [0, 20]
          });
          return ensure('v i (', {
            selectedText: 'editor.g\\(etScrollTp()'
          });
        });
        it("dont skip literal backslash", function() {
          set({
            text: 'expect(editor.g\\\\(etScrollTp())',
            cursor: [0, 20]
          });
          return ensure('v i (', {
            selectedText: 'etScrollTp()'
          });
        });
        it("skip escaped pair case-2", function() {
          set({
            text: 'expect(editor.getSc\\)rollTp())',
            cursor: [0, 7]
          });
          return ensure('v i (', {
            selectedText: 'editor.getSc\\)rollTp()'
          });
        });
        it("skip escaped pair case-3", function() {
          set({
            text: 'expect(editor.ge\\(tSc\\)rollTp())',
            cursor: [0, 7]
          });
          return ensure('v i (', {
            selectedText: 'editor.ge\\(tSc\\)rollTp()'
          });
        });
        it("works with multiple cursors", function() {
          set({
            text: "( a b ) cde ( f g h ) ijk",
            cursor: [[0, 2], [0, 18]]
          });
          return ensure('v i (', {
            selectedBufferRange: [[[0, 1], [0, 6]], [[0, 13], [0, 20]]]
          });
        });
        return describe("cursor is on the pair char", function() {
          var check, close, open, selectedText, text, textFinal;
          check = getCheckFunctionFor('i (');
          text = '-(+)-';
          textFinal = '-()-';
          selectedText = '+';
          open = [0, 1];
          close = [0, 3];
          beforeEach(function() {
            return set({
              text: text
            });
          });
          it("case-1 normal", function() {
            return check(open, 'd', {
              text: textFinal,
              cursor: [0, 2]
            });
          });
          it("case-2 normal", function() {
            return check(close, 'd', {
              text: textFinal,
              cursor: [0, 2]
            });
          });
          it("case-3 visual", function() {
            return check(open, 'v', {
              selectedText: selectedText
            });
          });
          return it("case-4 visual", function() {
            return check(close, 'v', {
              selectedText: selectedText
            });
          });
        });
      });
      return describe("a-parenthesis", function() {
        beforeEach(function() {
          return set({
            text: "( something in here and in (here) )",
            cursor: [0, 9]
          });
        });
        it("applies operators around the current parentheses in operator-pending mode", function() {
          return ensure('d a (', {
            text: '',
            cursor: [0, 0],
            mode: 'normal'
          });
        });
        it("applies operators around the current parentheses in operator-pending mode (second test)", function() {
          set({
            cursor: [0, 29]
          });
          return ensure('d a (', {
            text: "( something in here and in  )",
            cursor: [0, 27]
          });
        });
        return describe("cursor is on the pair char", function() {
          var check, close, open, selectedText, text, textFinal;
          check = getCheckFunctionFor('a (');
          text = '-(+)-';
          textFinal = '--';
          selectedText = '(+)';
          open = [0, 1];
          close = [0, 3];
          beforeEach(function() {
            return set({
              text: text
            });
          });
          it("case-1 normal", function() {
            return check(open, 'd', {
              text: textFinal,
              cursor: [0, 1]
            });
          });
          it("case-2 normal", function() {
            return check(close, 'd', {
              text: textFinal,
              cursor: [0, 1]
            });
          });
          it("case-3 visual", function() {
            return check(open, 'v', {
              selectedText: selectedText
            });
          });
          return it("case-4 visual", function() {
            return check(close, 'v', {
              selectedText: selectedText
            });
          });
        });
      });
    });
    describe("Paragraph", function() {
      var ensureParagraph, text;
      text = null;
      ensureParagraph = function(keystroke, options) {
        if (!options.setCursor) {
          throw new Errow("no setCursor provided");
        }
        set({
          cursor: options.setCursor
        });
        delete options.setCursor;
        ensure(keystroke, options);
        return ensure('escape', {
          mode: 'normal'
        });
      };
      beforeEach(function() {
        text = new TextData("\n1: P-1\n\n3: P-2\n4: P-2\n\n\n7: P-3\n8: P-3\n9: P-3\n\n");
        return set({
          cursor: [1, 0],
          text: text.getRaw()
        });
      });
      describe("inner-paragraph", function() {
        it("select consequtive blank rows", function() {
          ensureParagraph('v i p', {
            setCursor: [0, 0],
            selectedText: text.getLines([0])
          });
          ensureParagraph('v i p', {
            setCursor: [2, 0],
            selectedText: text.getLines([2])
          });
          return ensureParagraph('v i p', {
            setCursor: [5, 0],
            selectedText: text.getLines([5, 6])
          });
        });
        it("select consequtive non-blank rows", function() {
          ensureParagraph('v i p', {
            setCursor: [1, 0],
            selectedText: text.getLines([1])
          });
          ensureParagraph('v i p', {
            setCursor: [3, 0],
            selectedText: text.getLines([3, 4])
          });
          return ensureParagraph('v i p', {
            setCursor: [7, 0],
            selectedText: text.getLines([7, 8, 9])
          });
        });
        return it("operate on inner paragraph", function() {
          return ensureParagraph('y i p', {
            setCursor: [7, 0],
            register: {
              '"': {
                text: text.getLines([7, 8, 9])
              }
            }
          });
        });
      });
      return describe("a-paragraph", function() {
        it("select two paragraph as one operation", function() {
          ensureParagraph('v a p', {
            setCursor: [0, 0],
            selectedText: text.getLines([0, 1])
          });
          ensureParagraph('v a p', {
            setCursor: [2, 0],
            selectedText: text.getLines([2, 3, 4])
          });
          return ensureParagraph('v a p', {
            setCursor: [5, 0],
            selectedText: text.getLines([5, 6, 7, 8, 9])
          });
        });
        it("select two paragraph as one operation", function() {
          ensureParagraph('v a p', {
            setCursor: [1, 0],
            selectedText: text.getLines([1, 2])
          });
          ensureParagraph('v a p', {
            setCursor: [3, 0],
            selectedText: text.getLines([3, 4, 5, 6])
          });
          return ensureParagraph('v a p', {
            setCursor: [7, 0],
            selectedText: text.getLines([7, 8, 9, 10])
          });
        });
        return it("operate on a paragraph", function() {
          return ensureParagraph('y a p', {
            setCursor: [3, 0],
            register: {
              '"': {
                text: text.getLines([3, 4, 5, 6])
              }
            }
          });
        });
      });
    });
    describe('Comment', function() {
      beforeEach(function() {
        waitsForPromise(function() {
          return atom.packages.activatePackage('language-coffee-script');
        });
        return runs(function() {
          return set({
            grammar: 'source.coffee',
            text: "###\nmultiline comment\n###\n\n# One line comment\n\n# Comment\n# border\nclass QuickSort"
          });
        });
      });
      afterEach(function() {
        return atom.packages.deactivatePackage('language-coffee-script');
      });
      return describe('inner-comment', function() {
        it('select inner comment block', function() {
          set({
            cursor: [0, 0]
          });
          return ensure('v i /', {
            selectedText: '###\nmultiline comment\n###\n',
            selectedBufferRange: [[0, 0], [3, 0]]
          });
        });
        it('select one line comment', function() {
          set({
            cursor: [4, 0]
          });
          return ensure('v i /', {
            selectedText: '# One line comment\n',
            selectedBufferRange: [[4, 0], [5, 0]]
          });
        });
        return it('not select non-comment line', function() {
          set({
            cursor: [6, 0]
          });
          return ensure('v i /', {
            selectedText: '# Comment\n# border\n',
            selectedBufferRange: [[6, 0], [8, 0]]
          });
        });
      });
    });
    describe('BlockComment', function() {
      var pack;
      pack = 'language-javascript';
      beforeEach(function() {
        waitsForPromise(function() {
          return atom.packages.activatePackage(pack);
        });
        return runs(function() {
          return set({
            grammar: 'source.js'
          });
        });
      });
      afterEach(function() {
        return atom.packages.deactivatePackage(pack);
      });
      describe("inner-line block comment", function() {
        it('select inner comment block', function() {
          set({
            textC: "let a, b |/* 2nd var */, c"
          });
          ensure('v i *', {
            selectedText: '2nd var'
          });
          set({
            textC: "let a, b /* 2nd |var */, c"
          });
          ensure('v i *', {
            selectedText: '2nd var'
          });
          set({
            textC: "let a, b /* 2nd var *|/, c"
          });
          ensure('v i *', {
            selectedText: '2nd var'
          });
          set({
            textC: "let a, b /* 2nd var */|, c"
          });
          return ensure('v i *', {
            selectedText: ','
          });
        });
        return it('select a comment block', function() {
          set({
            textC: "let a, b |/* 2nd var */, c"
          });
          ensure('v a *', {
            selectedText: '/* 2nd var */'
          });
          set({
            textC: "let a, b /* 2nd |var */, c"
          });
          ensure('v a *', {
            selectedText: '/* 2nd var */'
          });
          set({
            textC: "let a, b /* 2nd var *|/, c"
          });
          ensure('v a *', {
            selectedText: '/* 2nd var */'
          });
          set({
            textC: "let a, b /* 2nd var */|, c"
          });
          return ensure('v a *', {
            selectedText: ','
          });
        });
      });
      return describe('a-block-comment', function() {
        beforeEach(function() {
          return set({
            text: "if (true) {\n  /** consecutive\n  block\n  comment **/ console.log(\"hello\")\n}"
          });
        });
        it('select inner comment block', function() {
          set({
            cursor: [1, 3]
          });
          ensure('v i *', {
            selectedText: 'consecutive\n  block\n  comment'
          });
          set({
            cursor: [2, 0]
          });
          ensure('v i *', {
            selectedText: 'consecutive\n  block\n  comment'
          });
          set({
            cursor: [3, 12]
          });
          ensure('v i *', {
            selectedText: 'consecutive\n  block\n  comment'
          });
          set({
            cursor: [3, 13]
          });
          return ensure('v i *', {
            selectedText: ' '
          });
        });
        return it('select a comment block', function() {
          set({
            cursor: [1, 3]
          });
          ensure('v a *', {
            selectedText: '/** consecutive\n  block\n  comment **/'
          });
          set({
            cursor: [2, 0]
          });
          ensure('v a *', {
            selectedText: '/** consecutive\n  block\n  comment **/'
          });
          set({
            cursor: [3, 12]
          });
          ensure('v a *', {
            selectedText: '/** consecutive\n  block\n  comment **/'
          });
          set({
            cursor: [3, 13]
          });
          return ensure('v a *', {
            selectedText: ' '
          });
        });
      });
    });
    describe('Indentation', function() {
      beforeEach(function() {
        waitsForPromise(function() {
          return atom.packages.activatePackage('language-coffee-script');
        });
        return getVimState('sample.coffee', function(vimState, vim) {
          editor = vimState.editor, editorElement = vimState.editorElement;
          return set = vim.set, ensure = vim.ensure, vim;
        });
      });
      afterEach(function() {
        return atom.packages.deactivatePackage('language-coffee-script');
      });
      describe('inner-indentation', function() {
        return it('select lines with deeper indent-level', function() {
          set({
            cursor: [12, 0]
          });
          return ensure('v i i', {
            selectedBufferRange: [[12, 0], [15, 0]]
          });
        });
      });
      return describe('a-indentation', function() {
        return it('wont stop on blank line when selecting indent', function() {
          set({
            cursor: [12, 0]
          });
          return ensure('v a i', {
            selectedBufferRange: [[10, 0], [27, 0]]
          });
        });
      });
    });
    describe('Fold', function() {
      beforeEach(function() {
        waitsForPromise(function() {
          return atom.packages.activatePackage('language-coffee-script');
        });
        return getVimState('sample.coffee', function(vimState, vim) {
          editor = vimState.editor, editorElement = vimState.editorElement;
          return set = vim.set, ensure = vim.ensure, vim;
        });
      });
      afterEach(function() {
        return atom.packages.deactivatePackage('language-coffee-script');
      });
      describe('inner-fold', function() {
        it("select inner range of fold", function() {
          set({
            cursor: [13, 0]
          });
          return ensure('v i z', {
            selectedBufferRange: rangeForRows(10, 25)
          });
        });
        it("[when cursor is at column 0 of fold start row] select inner range of fold", function() {
          set({
            cursor: [9, 0]
          });
          return ensure('v i z', {
            selectedBufferRange: rangeForRows(10, 25)
          });
        });
        it("select inner range of fold", function() {
          set({
            cursor: [19, 0]
          });
          return ensure('v i z', {
            selectedBufferRange: rangeForRows(19, 23)
          });
        });
        it("can expand selection", function() {
          set({
            cursor: [23, 0]
          });
          ensure('v');
          ensure('i z', {
            selectedBufferRange: rangeForRows(23, 23)
          });
          ensure('i z', {
            selectedBufferRange: rangeForRows(19, 23)
          });
          ensure('i z', {
            selectedBufferRange: rangeForRows(10, 25)
          });
          return ensure('i z', {
            selectedBufferRange: rangeForRows(9, 28)
          });
        });
        describe("when startRow of selection is on fold startRow", function() {
          return it('select inner fold', function() {
            set({
              cursor: [20, 7]
            });
            return ensure('v i z', {
              selectedBufferRange: rangeForRows(21, 21)
            });
          });
        });
        describe("when containing fold are not found", function() {
          return it("do nothing", function() {
            set({
              cursor: [20, 0]
            });
            ensure('V G', {
              selectedBufferRange: rangeForRows(20, 30)
            });
            return ensure('i z', {
              selectedBufferRange: rangeForRows(20, 30)
            });
          });
        });
        return describe("when indent level of fold startRow and endRow is same", function() {
          beforeEach(function() {
            waitsForPromise(function() {
              return atom.packages.activatePackage('language-javascript');
            });
            return getVimState('sample.js', function(state, vimEditor) {
              editor = state.editor, editorElement = state.editorElement;
              return set = vimEditor.set, ensure = vimEditor.ensure, vimEditor;
            });
          });
          afterEach(function() {
            return atom.packages.deactivatePackage('language-javascript');
          });
          return it("doesn't select fold endRow", function() {
            set({
              cursor: [5, 0]
            });
            ensure('v i z', {
              selectedBufferRange: rangeForRows(5, 6)
            });
            return ensure('a z', {
              selectedBufferRange: rangeForRows(4, 7)
            });
          });
        });
      });
      return describe('a-fold', function() {
        it('select fold row range', function() {
          set({
            cursor: [13, 0]
          });
          return ensure('v a z', {
            selectedBufferRange: rangeForRows(9, 25)
          });
        });
        it("[when cursor is at column 0 of fold start row] select inner range of fold", function() {
          set({
            cursor: [9, 0]
          });
          return ensure('v a z', {
            selectedBufferRange: rangeForRows(9, 25)
          });
        });
        it('select fold row range', function() {
          set({
            cursor: [19, 0]
          });
          return ensure('v a z', {
            selectedBufferRange: rangeForRows(18, 23)
          });
        });
        it('can expand selection', function() {
          set({
            cursor: [23, 0]
          });
          ensure('v');
          ensure('a z', {
            selectedBufferRange: rangeForRows(22, 23)
          });
          ensure('a z', {
            selectedBufferRange: rangeForRows(18, 23)
          });
          ensure('a z', {
            selectedBufferRange: rangeForRows(9, 25)
          });
          return ensure('a z', {
            selectedBufferRange: rangeForRows(8, 28)
          });
        });
        describe("when startRow of selection is on fold startRow", function() {
          return it('select fold starting from current row', function() {
            set({
              cursor: [20, 7]
            });
            return ensure('v a z', {
              selectedBufferRange: rangeForRows(20, 21)
            });
          });
        });
        describe("when containing fold are not found", function() {
          return it("do nothing", function() {
            set({
              cursor: [20, 0]
            });
            ensure('V G', {
              selectedBufferRange: rangeForRows(20, 30)
            });
            return ensure('a z', {
              selectedBufferRange: rangeForRows(20, 30)
            });
          });
        });
        return describe("select conjoined fold", function() {
          var ensureSelectedText;
          ensureSelectedText = [][0];
          beforeEach(function() {
            return waitsForPromise(function() {
              return atom.packages.activatePackage('language-javascript');
            });
          });
          afterEach(function() {
            return atom.packages.deactivatePackage('language-javascript');
          });
          describe("select if/else if/else from any row", function() {
            beforeEach(function() {
              return ensureSelectedText = function() {
                var selectedText;
                set({
                  grammar: "source.js",
                  text: "\nif (num === 1) {\n  console.log(1)\n} else if (num === 2) {\n  console.log(2)\n} else if (num === 3) {\n  console.log(3)\n} else {\n  console.log(4)\n}\n"
                });
                selectedText = "if (num === 1) {\n  console.log(1)\n} else if (num === 2) {\n  console.log(2)\n} else if (num === 3) {\n  console.log(3)\n} else {\n  console.log(4)\n}\n";
                set({
                  cursor: [1, 0]
                });
                ensure("v a z", {
                  selectedText: selectedText
                });
                ensure("escape", {
                  mode: "normal"
                });
                set({
                  cursor: [2, 0]
                });
                ensure("v a z", {
                  selectedText: selectedText
                });
                ensure("escape", {
                  mode: "normal"
                });
                set({
                  cursor: [3, 0]
                });
                ensure("v a z", {
                  selectedText: selectedText
                });
                ensure("escape", {
                  mode: "normal"
                });
                set({
                  cursor: [4, 0]
                });
                ensure("v a z", {
                  selectedText: selectedText
                });
                ensure("escape", {
                  mode: "normal"
                });
                set({
                  cursor: [5, 0]
                });
                ensure("v a z", {
                  selectedText: selectedText
                });
                ensure("escape", {
                  mode: "normal"
                });
                set({
                  cursor: [6, 0]
                });
                ensure("v a z", {
                  selectedText: selectedText
                });
                ensure("escape", {
                  mode: "normal"
                });
                set({
                  cursor: [7, 0]
                });
                ensure("v a z", {
                  selectedText: selectedText
                });
                ensure("escape", {
                  mode: "normal"
                });
                set({
                  cursor: [8, 0]
                });
                ensure("v a z", {
                  selectedText: selectedText
                });
                ensure("escape", {
                  mode: "normal"
                });
                set({
                  cursor: [9, 0]
                });
                ensure("v a z", {
                  selectedText: selectedText
                });
                return ensure("escape", {
                  mode: "normal"
                });
              };
            });
            it("[treeSitter = on] outmost conjoined range", function() {
              atom.config.set('core.useTreeSitterParsers', true);
              return ensureSelectedText();
            });
            return it("[treeSitter = off] outmost conjoined range", function() {
              atom.config.set('core.useTreeSitterParsers', false);
              return ensureSelectedText();
            });
          });
          return describe("select try/catch/finally from any row", function() {
            beforeEach(function() {
              return ensureSelectedText = function() {
                var selectedText;
                set({
                  grammar: "source.js",
                  text: "\ntry {\n  console.log(1);\n} catch (e) {\n  console.log(2);\n} finally {\n  console.log(3);\n}\n"
                });
                selectedText = "try {\n  console.log(1);\n} catch (e) {\n  console.log(2);\n} finally {\n  console.log(3);\n}\n";
                set({
                  cursor: [1, 0]
                });
                ensure("v a z", {
                  selectedText: selectedText
                });
                ensure("escape", {
                  mode: "normal"
                });
                set({
                  cursor: [2, 0]
                });
                ensure("v a z", {
                  selectedText: selectedText
                });
                ensure("escape", {
                  mode: "normal"
                });
                set({
                  cursor: [3, 0]
                });
                ensure("v a z", {
                  selectedText: selectedText
                });
                ensure("escape", {
                  mode: "normal"
                });
                set({
                  cursor: [4, 0]
                });
                ensure("v a z", {
                  selectedText: selectedText
                });
                ensure("escape", {
                  mode: "normal"
                });
                set({
                  cursor: [5, 0]
                });
                ensure("v a z", {
                  selectedText: selectedText
                });
                ensure("escape", {
                  mode: "normal"
                });
                set({
                  cursor: [6, 0]
                });
                ensure("v a z", {
                  selectedText: selectedText
                });
                ensure("escape", {
                  mode: "normal"
                });
                set({
                  cursor: [7, 0]
                });
                ensure("v a z", {
                  selectedText: selectedText
                });
                return ensure("escape", {
                  mode: "normal"
                });
              };
            });
            it("[treeSitter = on] outmost range", function() {
              atom.config.set('core.useTreeSitterParsers', true);
              return ensureSelectedText();
            });
            return it("[treeSitter = off] outmost range", function() {
              atom.config.set('core.useTreeSitterParsers', false);
              return ensureSelectedText();
            });
          });
        });
      });
    });
    describe('Function', function() {
      describe('coffee', function() {
        var pack, scope;
        pack = 'language-coffee-script';
        scope = 'source.coffee';
        beforeEach(function() {
          waitsForPromise(function() {
            return atom.packages.activatePackage(pack);
          });
          set({
            text: "# Commment\n\nhello = ->\n  a = 1\n  b = 2\n  c = 3\n\n# Commment"
          });
          return runs(function() {
            var grammar;
            grammar = atom.grammars.grammarForScopeName(scope);
            return editor.setGrammar(grammar);
          });
        });
        afterEach(function() {
          return atom.packages.deactivatePackage(pack);
        });
        describe('inner-function for coffee', function() {
          it('select except start row', function() {
            set({
              cursor: [3, 3]
            });
            return ensure('v i f', {
              selectedBufferRange: [[3, 0], [6, 0]]
            });
          });
          return it("[when cursor is at column 0 of function-fold start row]", function() {
            set({
              cursor: [2, 0]
            });
            return ensure('v i f', {
              selectedBufferRange: [[3, 0], [6, 0]]
            });
          });
        });
        return describe('a-function for coffee', function() {
          it('select function', function() {
            set({
              cursor: [3, 3]
            });
            return ensure('v a f', {
              selectedBufferRange: [[2, 0], [6, 0]]
            });
          });
          return it("[when cursor is at column 0 of function-fold start row]", function() {
            set({
              cursor: [2, 0]
            });
            return ensure('v a f', {
              selectedBufferRange: [[2, 0], [6, 0]]
            });
          });
        });
      });
      describe('javascript', function() {
        var pack, scope;
        pack = 'language-javascript';
        scope = 'source.js';
        beforeEach(function() {
          waitsForPromise(function() {
            return atom.packages.activatePackage(pack);
          });
          return runs(function() {
            return editor.setGrammar(atom.grammars.grammarForScopeName(scope));
          });
        });
        afterEach(function() {
          return atom.packages.deactivatePackage(pack);
        });
        describe('non-multi-line-param function', function() {
          beforeEach(function() {
            return set({
              text: "\nfunction f1(a1, a2, a3) {\n  if (true) {\n    console.log(\"hello\")\n  }\n}\n"
            });
          });
          it('[from param] a f', function() {
            set({
              cursor: [1, 0]
            });
            return ensure('v a f', {
              selectedBufferRange: rangeForRows(1, 5)
            });
          });
          it('[from  body] a f', function() {
            set({
              cursor: [3, 0]
            });
            return ensure('v a f', {
              selectedBufferRange: rangeForRows(1, 5)
            });
          });
          it('[from param] i f', function() {
            set({
              cursor: [1, 0]
            });
            return ensure('v i f', {
              selectedBufferRange: rangeForRows(2, 4)
            });
          });
          return it('[from  body] i f', function() {
            set({
              cursor: [3, 0]
            });
            return ensure('v i f', {
              selectedBufferRange: rangeForRows(2, 4)
            });
          });
        });
        describe('[case-1]: multi-line-param-function', function() {
          beforeEach(function() {
            return set({
              text: "\nfunction f2(\n  a1,\n  a2,\n  a3\n) {\n  // comment\n  console.log(a1, a2, a3)\n}\n"
            });
          });
          it('[from param] a f', function() {
            set({
              cursor: [3, 0]
            });
            return ensure('v a f', {
              selectedBufferRange: rangeForRows(1, 8)
            });
          });
          it('[from  body] a f', function() {
            set({
              cursor: [6, 0]
            });
            return ensure('v a f', {
              selectedBufferRange: rangeForRows(1, 8)
            });
          });
          it('[from param] i f', function() {
            set({
              cursor: [3, 0]
            });
            return ensure('v i f', {
              selectedBufferRange: rangeForRows(6, 7)
            });
          });
          return it('[from  body] i f', function() {
            set({
              cursor: [6, 0]
            });
            return ensure('v i f', {
              selectedBufferRange: rangeForRows(6, 7)
            });
          });
        });
        describe('[case-2]: multi-line-param-function', function() {
          beforeEach(function() {
            return set({
              textC: "\nfunction f3(\n  a1,\n  a2,\n  a3\n)\n{\n  // comment\n  console.log(a1, a2, a3)\n}\n"
            });
          });
          it('[from param] a f', function() {
            set({
              cursor: [3, 0]
            });
            return ensure('v a f', {
              selectedBufferRange: rangeForRows(1, 9)
            });
          });
          it('[from  body] a f', function() {
            set({
              cursor: [7, 0]
            });
            return ensure('v a f', {
              selectedBufferRange: rangeForRows(1, 9)
            });
          });
          it('[from param] i f', function() {
            set({
              cursor: [3, 0]
            });
            return ensure('v i f', {
              selectedBufferRange: rangeForRows(7, 8)
            });
          });
          return it('[from  body] i f', function() {
            set({
              cursor: [7, 0]
            });
            return ensure('v i f', {
              selectedBufferRange: rangeForRows(7, 8)
            });
          });
        });
        return describe('[case-3]: body start from next-row-of-param-end-row', function() {
          beforeEach(function() {
            return set({
              textC: "\nfunction f3(a1, a2, a3)\n{\n  // comment\n  console.log(a1, a2, a3)\n}\n"
            });
          });
          it('[from param] a f', function() {
            set({
              cursor: [1, 0]
            });
            return ensure('v a f', {
              selectedBufferRange: rangeForRows(1, 5)
            });
          });
          it('[from  body] a f', function() {
            set({
              cursor: [3, 0]
            });
            return ensure('v a f', {
              selectedBufferRange: rangeForRows(1, 5)
            });
          });
          it('[from param] i f', function() {
            set({
              cursor: [1, 0]
            });
            return ensure('v i f', {
              selectedBufferRange: rangeForRows(3, 4)
            });
          });
          return it('[from  body] i f', function() {
            set({
              cursor: [3, 0]
            });
            return ensure('v i f', {
              selectedBufferRange: rangeForRows(3, 4)
            });
          });
        });
      });
      describe('ruby', function() {
        var pack, scope;
        pack = 'language-ruby';
        scope = 'source.ruby';
        beforeEach(function() {
          waitsForPromise(function() {
            return atom.packages.activatePackage(pack);
          });
          set({
            text: "# Commment\n\ndef hello\n  a = 1\n  b = 2\n  c = 3\nend\n\n# Commment",
            cursor: [3, 0]
          });
          return runs(function() {
            var grammar;
            grammar = atom.grammars.grammarForScopeName(scope);
            return editor.setGrammar(grammar);
          });
        });
        afterEach(function() {
          return atom.packages.deactivatePackage(pack);
        });
        describe('inner-function for ruby', function() {
          return it('select except start row', function() {
            return ensure('v i f', {
              selectedBufferRange: [[3, 0], [6, 0]]
            });
          });
        });
        return describe('a-function for ruby', function() {
          return it('select function', function() {
            return ensure('v a f', {
              selectedBufferRange: [[2, 0], [7, 0]]
            });
          });
        });
      });
      return describe('go', function() {
        var pack, scope;
        pack = 'language-go';
        scope = 'source.go';
        beforeEach(function() {
          waitsForPromise(function() {
            return atom.packages.activatePackage(pack);
          });
          set({
            text: "// Commment\n\nfunc main() {\n  a := 1\n  b := 2\n  c := 3\n}\n\n// Commment",
            cursor: [3, 0]
          });
          return runs(function() {
            var grammar;
            grammar = atom.grammars.grammarForScopeName(scope);
            return editor.setGrammar(grammar);
          });
        });
        afterEach(function() {
          return atom.packages.deactivatePackage(pack);
        });
        describe('inner-function for go', function() {
          return it('select except start row', function() {
            return ensure('v i f', {
              selectedBufferRange: [[3, 0], [6, 0]]
            });
          });
        });
        return describe('a-function for go', function() {
          return it('select function', function() {
            return ensure('v a f', {
              selectedBufferRange: [[2, 0], [7, 0]]
            });
          });
        });
      });
    });
    describe('CurrentLine', function() {
      beforeEach(function() {
        return set({
          text: "This is\n  multi line\ntext"
        });
      });
      describe('inner-current-line', function() {
        it('select current line without including last newline', function() {
          set({
            cursor: [0, 0]
          });
          return ensure('v i l', {
            selectedText: 'This is'
          });
        });
        return it('also skip leading white space', function() {
          set({
            cursor: [1, 0]
          });
          return ensure('v i l', {
            selectedText: 'multi line'
          });
        });
      });
      return describe('a-current-line', function() {
        it('select current line without including last newline as like `vil`', function() {
          set({
            cursor: [0, 0]
          });
          return ensure('v a l', {
            selectedText: 'This is'
          });
        });
        return it('wont skip leading white space not like `vil`', function() {
          set({
            cursor: [1, 0]
          });
          return ensure('v a l', {
            selectedText: '  multi line'
          });
        });
      });
    });
    describe('Arguments', function() {
      describe('auto-detect inner-pair target', function() {
        describe('inner-pair is comma separated', function() {
          it("target inner-paren by auto-detect", function() {
            set({
              textC: "(1|st, 2nd)"
            });
            ensure('d i ,', {
              textC: "(|, 2nd)"
            });
            set({
              textC: "(1|st, 2nd)"
            });
            ensure('d a ,', {
              textC: "(|2nd)"
            });
            set({
              textC: "(1st, 2|nd)"
            });
            ensure('d i ,', {
              textC: "(1st, |)"
            });
            set({
              textC: "(1st, 2|nd)"
            });
            return ensure('d a ,', {
              textC: "(1st|)"
            });
          });
          it("target inner-curly-bracket by auto-detect", function() {
            set({
              textC: "{1|st, 2nd}"
            });
            ensure('d i ,', {
              textC: "{|, 2nd}"
            });
            set({
              textC: "{1|st, 2nd}"
            });
            ensure('d a ,', {
              textC: "{|2nd}"
            });
            set({
              textC: "{1st, 2|nd}"
            });
            ensure('d i ,', {
              textC: "{1st, |}"
            });
            set({
              textC: "{1st, 2|nd}"
            });
            return ensure('d a ,', {
              textC: "{1st|}"
            });
          });
          return it("target inner-square-bracket by auto-detect", function() {
            set({
              textC: "[1|st, 2nd]"
            });
            ensure('d i ,', {
              textC: "[|, 2nd]"
            });
            set({
              textC: "[1|st, 2nd]"
            });
            ensure('d a ,', {
              textC: "[|2nd]"
            });
            set({
              textC: "[1st, 2|nd]"
            });
            ensure('d i ,', {
              textC: "[1st, |]"
            });
            set({
              textC: "[1st, 2|nd]"
            });
            return ensure('d a ,', {
              textC: "[1st|]"
            });
          });
        });
        return describe('inner-pair is space separated', function() {
          it("target inner-paren by auto-detect", function() {
            set({
              textC: "(1|st 2nd)"
            });
            ensure('d i ,', {
              textC: "(| 2nd)"
            });
            set({
              textC: "(1|st 2nd)"
            });
            ensure('d a ,', {
              textC: "(|2nd)"
            });
            set({
              textC: "(1st 2|nd)"
            });
            ensure('d i ,', {
              textC: "(1st |)"
            });
            set({
              textC: "(1st 2|nd)"
            });
            return ensure('d a ,', {
              textC: "(1st|)"
            });
          });
          it("target inner-curly-bracket by auto-detect", function() {
            set({
              textC: "{1|st 2nd}"
            });
            ensure('d i ,', {
              textC: "{| 2nd}"
            });
            set({
              textC: "{1|st 2nd}"
            });
            ensure('d a ,', {
              textC: "{|2nd}"
            });
            set({
              textC: "{1st 2|nd}"
            });
            ensure('d i ,', {
              textC: "{1st |}"
            });
            set({
              textC: "{1st 2|nd}"
            });
            return ensure('d a ,', {
              textC: "{1st|}"
            });
          });
          return it("target inner-square-bracket by auto-detect", function() {
            set({
              textC: "[1|st 2nd]"
            });
            ensure('d i ,', {
              textC: "[| 2nd]"
            });
            set({
              textC: "[1|st 2nd]"
            });
            ensure('d a ,', {
              textC: "[|2nd]"
            });
            set({
              textC: "[1st 2|nd]"
            });
            ensure('d i ,', {
              textC: "[1st |]"
            });
            set({
              textC: "[1st 2|nd]"
            });
            return ensure('d a ,', {
              textC: "[1st|]"
            });
          });
        });
      });
      describe("[fallback] when auto-detect failed, target current-line", function() {
        beforeEach(function() {
          return set({
            text: "if hello(world) and good(bye) {\n  1st;\n  2nd;\n}"
          });
        });
        it("delete 1st elem of inner-curly-bracket when auto-detect succeeded", function() {
          set({
            cursor: [1, 3]
          });
          return ensure('d a ,', {
            textC: "if hello(world) and good(bye) {\n  |2nd;\n}"
          });
        });
        it("delete 2st elem of inner-curly-bracket when auto-detect succeeded", function() {
          set({
            cursor: [2, 3]
          });
          return ensure('d a ,', {
            textC: "if hello(world) and good(bye) {\n  1st|;\n}"
          });
        });
        it("delete 1st elem of current-line when auto-detect failed", function() {
          set({
            cursor: [0, 0]
          });
          return ensure('d a ,', {
            textC: "|hello(world) and good(bye) {\n  1st;\n  2nd;\n}"
          });
        });
        it("delete 2nd elem of current-line when auto-detect failed", function() {
          set({
            cursor: [0, 3]
          });
          return ensure('d a ,', {
            textC: "if |and good(bye) {\n  1st;\n  2nd;\n}"
          });
        });
        it("delete 3rd elem of current-line when auto-detect failed", function() {
          set({
            cursor: [0, 16]
          });
          return ensure('d a ,', {
            textC: "if hello(world) |good(bye) {\n  1st;\n  2nd;\n}"
          });
        });
        return it("delete 4th elem of current-line when auto-detect failed", function() {
          set({
            cursor: [0, 20]
          });
          return ensure('d a ,', {
            textC: "if hello(world) and |{\n  1st;\n  2nd;\n}"
          });
        });
      });
      describe('single line comma separated text', function() {
        describe("change 1st arg", function() {
          beforeEach(function() {
            return set({
              textC: "var a = func(f|irst(1, 2, 3), second(), 3)"
            });
          });
          it('change', function() {
            return ensure('c i ,', {
              textC: "var a = func(|, second(), 3)"
            });
          });
          return it('change', function() {
            return ensure('c a ,', {
              textC: "var a = func(|second(), 3)"
            });
          });
        });
        describe('change 2nd arg', function() {
          beforeEach(function() {
            return set({
              textC: "var a = func(first(1, 2, 3),| second(), 3)"
            });
          });
          it('change', function() {
            return ensure('c i ,', {
              textC: "var a = func(first(1, 2, 3), |, 3)"
            });
          });
          return it('change', function() {
            return ensure('c a ,', {
              textC: "var a = func(first(1, 2, 3), |3)"
            });
          });
        });
        describe('change 3rd arg', function() {
          beforeEach(function() {
            return set({
              textC: "var a = func(first(1, 2, 3), second(),| 3)"
            });
          });
          it('change', function() {
            return ensure('c i ,', {
              textC: "var a = func(first(1, 2, 3), second(), |)"
            });
          });
          return it('change', function() {
            return ensure('c a ,', {
              textC: "var a = func(first(1, 2, 3), second()|)"
            });
          });
        });
        describe('when cursor is on-comma-separator, it affects preceeding arg', function() {
          beforeEach(function() {
            return set({
              textC: "var a = func(first(1, 2, 3)|, second(), 3)"
            });
          });
          it('change 1st', function() {
            return ensure('c i ,', {
              textC: "var a = func(|, second(), 3)"
            });
          });
          return it('change 1st', function() {
            return ensure('c a ,', {
              textC: "var a = func(|second(), 3)"
            });
          });
        });
        describe('cursor-is-on-white-space, it affects followed arg', function() {
          beforeEach(function() {
            return set({
              textC: "var a = func(first(1, 2, 3),| second(), 3)"
            });
          });
          it('change 2nd', function() {
            return ensure('c i ,', {
              textC: "var a = func(first(1, 2, 3), |, 3)"
            });
          });
          return it('change 2nd', function() {
            return ensure('c a ,', {
              textC: "var a = func(first(1, 2, 3), |3)"
            });
          });
        });
        describe("cursor-is-on-parehthesis, it wont target inner-parent", function() {
          it('change 1st of outer-paren', function() {
            set({
              textC: "var a = func(first|(1, 2, 3), second(), 3)"
            });
            return ensure('c i ,', {
              textC: "var a = func(|, second(), 3)"
            });
          });
          return it('change 3rd of outer-paren', function() {
            set({
              textC: "var a = func(first(1, 2, 3|), second(), 3)"
            });
            return ensure('c i ,', {
              textC: "var a = func(|, second(), 3)"
            });
          });
        });
        return describe("cursor-is-next-or-before parehthesis, it target inner-parent", function() {
          it('change 1st of inner-paren', function() {
            set({
              textC: "var a = func(first(|1, 2, 3), second(), 3)"
            });
            return ensure('c i ,', {
              textC: "var a = func(first(|, 2, 3), second(), 3)"
            });
          });
          return it('change 3rd of inner-paren', function() {
            set({
              textC: "var a = func(first(1, 2, |3), second(), 3)"
            });
            return ensure('c i ,', {
              textC: "var a = func(first(1, 2, |), second(), 3)"
            });
          });
        });
      });
      describe('slingle line space separated text', function() {
        describe("change 1st arg", function() {
          beforeEach(function() {
            return set({
              textC: "%w(|1st 2nd 3rd)"
            });
          });
          it('change', function() {
            return ensure('c i ,', {
              textC: "%w(| 2nd 3rd)"
            });
          });
          return it('change', function() {
            return ensure('c a ,', {
              textC: "%w(|2nd 3rd)"
            });
          });
        });
        describe("change 2nd arg", function() {
          beforeEach(function() {
            return set({
              textC: "%w(1st |2nd 3rd)"
            });
          });
          it('change', function() {
            return ensure('c i ,', {
              textC: "%w(1st | 3rd)"
            });
          });
          return it('change', function() {
            return ensure('c a ,', {
              textC: "%w(1st |3rd)"
            });
          });
        });
        return describe("change 2nd arg", function() {
          beforeEach(function() {
            return set({
              textC: "%w(1st 2nd |3rd)"
            });
          });
          it('change', function() {
            return ensure('c i ,', {
              textC: "%w(1st 2nd |)"
            });
          });
          return it('change', function() {
            return ensure('c a ,', {
              textC: "%w(1st 2nd|)"
            });
          });
        });
      });
      describe('multi line comma separated text', function() {
        beforeEach(function() {
          return set({
            textC_: "[\n  \"1st elem is string\",\n  () => hello('2nd elm is function'),\n  3rdElmHasTrailingComma,\n]"
          });
        });
        return describe("change 1st arg", function() {
          it('change 1st inner-arg', function() {
            set({
              cursor: [1, 0]
            });
            return ensure('c i ,', {
              textC: "[\n  |,\n  () => hello('2nd elm is function'),\n  3rdElmHasTrailingComma,\n]"
            });
          });
          it('change 1st a-arg', function() {
            set({
              cursor: [1, 0]
            });
            return ensure('c a ,', {
              textC: "[\n  |() => hello('2nd elm is function'),\n  3rdElmHasTrailingComma,\n]"
            });
          });
          it('change 2nd inner-arg', function() {
            set({
              cursor: [2, 0]
            });
            return ensure('c i ,', {
              textC: "[\n  \"1st elem is string\",\n  |,\n  3rdElmHasTrailingComma,\n]"
            });
          });
          it('change 2nd a-arg', function() {
            set({
              cursor: [2, 0]
            });
            return ensure('c a ,', {
              textC: "[\n  \"1st elem is string\",\n  |3rdElmHasTrailingComma,\n]"
            });
          });
          it('change 3rd inner-arg', function() {
            set({
              cursor: [3, 0]
            });
            return ensure('c i ,', {
              textC: "[\n  \"1st elem is string\",\n  () => hello('2nd elm is function'),\n  |,\n]"
            });
          });
          return it('change 3rd a-arg', function() {
            set({
              cursor: [3, 0]
            });
            return ensure('c a ,', {
              textC: "[\n  \"1st elem is string\",\n  () => hello('2nd elm is function')|,\n]"
            });
          });
        });
      });
      return describe('when it coudnt find inner-pair from cursor it target current-line', function() {
        beforeEach(function() {
          return set({
            textC_: "if |isMorning(time, of, the, day) {\n  helllo(\"world\");\n}"
          });
        });
        it("change inner-arg", function() {
          return ensure("c i ,", {
            textC_: "if | {\n  helllo(\"world\");\n}"
          });
        });
        return it("change a-arg", function() {
          return ensure("c a ,", {
            textC_: "if |{\n  helllo(\"world\");\n}"
          });
        });
      });
    });
    describe('Entire', function() {
      var text;
      text = "This is\n  multi line\ntext";
      beforeEach(function() {
        return set({
          text: text,
          cursor: [0, 0]
        });
      });
      describe('inner-entire', function() {
        return it('select entire buffer', function() {
          ensure('escape', {
            selectedText: ''
          });
          ensure('v i e', {
            selectedText: text
          });
          ensure('escape', {
            selectedText: ''
          });
          return ensure('j j v i e', {
            selectedText: text
          });
        });
      });
      return describe('a-entire', function() {
        return it('select entire buffer', function() {
          ensure('escape', {
            selectedText: ''
          });
          ensure('v a e', {
            selectedText: text
          });
          ensure('escape', {
            selectedText: ''
          });
          return ensure('j j v a e', {
            selectedText: text
          });
        });
      });
    });
    return describe('SearchMatchForward, SearchBackwards', function() {
      var text;
      text = "0 xxx\n1 abc xxx\n2   xxx yyy\n3 xxx abc\n4 abc\n";
      beforeEach(function() {
        jasmine.attachToDOM(atom.views.getView(atom.workspace));
        set({
          text: text,
          cursor: [0, 0]
        });
        ensure('/ abc enter', {
          cursor: [1, 2],
          mode: 'normal'
        });
        return expect(vimState.globalState.get('lastSearchPattern')).toEqual(/abc/g);
      });
      describe('gn from normal mode', function() {
        return it('select ranges matches to last search pattern and extend selection', function() {
          ensure('g n', {
            cursor: [1, 5],
            mode: ['visual', 'characterwise'],
            selectionIsReversed: false,
            selectedText: 'abc'
          });
          ensure('g n', {
            selectionIsReversed: false,
            mode: ['visual', 'characterwise'],
            selectedText: "abc xxx\n2   xxx yyy\n3 xxx abc"
          });
          ensure('g n', {
            selectionIsReversed: false,
            mode: ['visual', 'characterwise'],
            selectedText: "abc xxx\n2   xxx yyy\n3 xxx abc\n4 abc"
          });
          return ensure('g n', {
            selectionIsReversed: false,
            mode: ['visual', 'characterwise'],
            selectedText: "abc xxx\n2   xxx yyy\n3 xxx abc\n4 abc"
          });
        });
      });
      describe('gN from normal mode', function() {
        beforeEach(function() {
          return set({
            cursor: [4, 3]
          });
        });
        return it('select ranges matches to last search pattern and extend selection', function() {
          ensure('g N', {
            cursor: [4, 2],
            mode: ['visual', 'characterwise'],
            selectionIsReversed: true,
            selectedText: 'abc'
          });
          ensure('g N', {
            selectionIsReversed: true,
            mode: ['visual', 'characterwise'],
            selectedText: "abc\n4 abc"
          });
          ensure('g N', {
            selectionIsReversed: true,
            mode: ['visual', 'characterwise'],
            selectedText: "abc xxx\n2   xxx yyy\n3 xxx abc\n4 abc"
          });
          return ensure('g N', {
            selectionIsReversed: true,
            mode: ['visual', 'characterwise'],
            selectedText: "abc xxx\n2   xxx yyy\n3 xxx abc\n4 abc"
          });
        });
      });
      return describe('as operator target', function() {
        it('delete next occurrence of last search pattern', function() {
          ensure('d g n', {
            cursor: [1, 2],
            mode: 'normal',
            text: "0 xxx\n1  xxx\n2   xxx yyy\n3 xxx abc\n4 abc\n"
          });
          ensure('.', {
            cursor: [3, 5],
            mode: 'normal',
            text_: "0 xxx\n1  xxx\n2   xxx yyy\n3 xxx_\n4 abc\n"
          });
          return ensure('.', {
            cursor: [4, 1],
            mode: 'normal',
            text_: "0 xxx\n1  xxx\n2   xxx yyy\n3 xxx_\n4 \n"
          });
        });
        return it('change next occurrence of last search pattern', function() {
          ensure('c g n', {
            cursor: [1, 2],
            mode: 'insert',
            text: "0 xxx\n1  xxx\n2   xxx yyy\n3 xxx abc\n4 abc\n"
          });
          ensure('escape');
          set({
            cursor: [4, 0]
          });
          return ensure('c g N', {
            cursor: [3, 6],
            mode: 'insert',
            text_: "0 xxx\n1  xxx\n2   xxx yyy\n3 xxx_\n4 abc\n"
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy92aW0tbW9kZS1wbHVzL3NwZWMvdGV4dC1vYmplY3Qtc3BlYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLE1BQW9DLE9BQUEsQ0FBUSxlQUFSLENBQXBDLEVBQUMsNkJBQUQsRUFBYyx1QkFBZCxFQUF3Qjs7RUFDeEIsUUFBQSxHQUFXLE9BQUEsQ0FBUSxpQkFBUjs7RUFDWCxZQUFBLEdBQWUsU0FBQyxRQUFELEVBQVcsTUFBWDtXQUNiLENBQUMsQ0FBQyxRQUFELEVBQVcsQ0FBWCxDQUFELEVBQWdCLENBQUMsTUFBQSxHQUFTLENBQVYsRUFBYSxDQUFiLENBQWhCO0VBRGE7O0VBR2YsUUFBQSxDQUFTLFlBQVQsRUFBdUIsU0FBQTtBQUNyQixRQUFBO0lBQUEsT0FBNkQsRUFBN0QsRUFBQyxhQUFELEVBQU0sZ0JBQU4sRUFBYyxvQkFBZCxFQUEwQixnQkFBMUIsRUFBa0MsdUJBQWxDLEVBQWlEO0lBRWpELG1CQUFBLEdBQXNCLFNBQUMsVUFBRDthQUNwQixTQUFDLFlBQUQsRUFBZSxTQUFmLEVBQTBCLE9BQTFCO1FBQ0UsR0FBQSxDQUFJO1VBQUEsTUFBQSxFQUFRLFlBQVI7U0FBSjtlQUNBLE1BQUEsQ0FBVSxTQUFELEdBQVcsR0FBWCxHQUFjLFVBQXZCLEVBQXFDLE9BQXJDO01BRkY7SUFEb0I7SUFLdEIsVUFBQSxDQUFXLFNBQUE7YUFDVCxXQUFBLENBQVksU0FBQyxLQUFELEVBQVEsU0FBUjtRQUNWLFFBQUEsR0FBVztRQUNWLHdCQUFELEVBQVM7ZUFDUixtQkFBRCxFQUFNLHlCQUFOLEVBQWMsaUNBQWQsRUFBNEI7TUFIbEIsQ0FBWjtJQURTLENBQVg7SUFNQSxRQUFBLENBQVMsWUFBVCxFQUF1QixTQUFBO01BQ3JCLFVBQUEsQ0FBVyxTQUFBO1FBQ1QsZUFBQSxDQUFnQixTQUFBO2lCQUNkLElBQUks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QUFBLENBQU8sUUFBUCxFQUFpQjtrQkFBQSxJQUFBLEVBQU0sUUFBTjtpQkFBakI7Z0JBQ3BELEdBQUEsQ0FBSTtrQkFBQSxNQUFBLEVBQVEsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFSO2lCQUFKO2dCQUFvQixNQUFBLENBQU8sT0FBUCxFQUFnQjtrQkFBQyxjQUFBLFlBQUQ7aUJBQWhCO2dCQUFnQyxNQUFBLENBQU8sUUFBUCxFQUFpQjtrQkFBQSxJQUFBLEVBQU0sUUFBTjtpQkFBakI7Z0JBQ3BELEdBQUEsQ0FBSTtrQkFBQSxNQUFBLEVBQVEsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFSO2lCQUFKO2dCQUFvQixNQUFBLENBQU8sT0FBUCxFQUFnQjtrQkFBQyxjQUFBLFlBQUQ7aUJBQWhCO2dCQUFnQyxNQUFBLENBQU8sUUFBUCxFQUFpQjtrQkFBQSxJQUFBLEVBQU0sUUFBTjtpQkFBakI7Z0JBQ3BELEdBQUEsQ0FBSTtrQkFBQSxNQUFBLEVBQVEsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFSO2lCQUFKO2dCQUFvQixNQUFBLENBQU8sT0FBUCxFQUFnQjtrQkFBQyxjQUFBLFlBQUQ7aUJBQWhCO2dCQUFnQyxNQUFBLENBQU8sUUFBUCxFQUFpQjtrQkFBQSxJQUFBLEVBQU0sUUFBTjtpQkFBakI7Z0JBQ3BELEdBQUEsQ0FBSTtrQkFBQSxNQUFBLEVBQVEsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFSO2lCQUFKO2dCQUFvQixNQUFBLENBQU8sT0FBUCxFQUFnQjtrQkFBQyxjQUFBLFlBQUQ7aUJBQWhCO2dCQUFnQyxNQUFBLENBQU8sUUFBUCxFQUFpQjtrQkFBQSxJQUFBLEVBQU0sUUFBTjtpQkFBakI7Z0JBQ3BELEdBQUEsQ0FBSTtrQkFBQSxNQUFBLEVBQVEsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFSO2lCQUFKO2dCQUFvQixNQUFBLENBQU8sT0FBUCxFQUFnQjtrQkFBQyxjQUFBLFlBQUQ7aUJBQWhCO3VCQUFnQyxNQUFBLENBQU8sUUFBUCxFQUFpQjtrQkFBQSxJQUFBLEVBQU0sUUFBTjtpQkFB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cmVxdWlyZSAnLi9zcGVjLWhlbHBlcidcbnNldHRpbmdzID0gcmVxdWlyZSAnLi4vbGliL3NldHRpbmdzJ1xucmFuZ2VGb3JSb3dzID0gKHN0YXJ0Um93LCBlbmRSb3cpIC0+XG4gIFtbc3RhcnRSb3csIDBdLCBbZW5kUm93ICsgMSwgMF1dXG5cbmRlc2NyaWJlIFwiVGV4dE9iamVjdFwiLCAtPlxuICBbc2V0LCBlbnN1cmUsIGVuc3VyZVdhaXQsIGVkaXRvciwgZWRpdG9yRWxlbWVudCwgdmltU3RhdGVdID0gW11cblxuICBnZXRDaGVja0Z1bmN0aW9uRm9yID0gKHRleHRPYmplY3QpIC0+XG4gICAgKGluaXRpYWxQb2ludCwga2V5c3Ryb2tlLCBvcHRpb25zKSAtPlxuICAgICAgc2V0IGN1cnNvcjogaW5pdGlhbFBvaW50XG4gICAgICBlbnN1cmUgXCIje2tleXN0cm9rZX0gI3t0ZXh0T2JqZWN0fVwiLCBvcHRpb25zXG5cbiAgYmVmb3JlRWFjaCAtPlxuICAgIGdldFZpbVN0YXRlIChzdGF0ZSwgdmltRWRpdG9yKSAtPlxuICAgICAgdmltU3RhdGUgPSBzdGF0ZVxuICAgICAge2VkaXRvciwgZWRpdG9yRWxlbWVudH0gPSB2aW1TdGF0ZVxuICAgICAge3NldCwgZW5zdXJlLCBlbnN1cmVXYWl0fSA9IHZpbUVkaXRvclxuXG4gIGRlc2NyaWJlIFwiVGV4dE9iamVjdFwiLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPlxuICAgICAgICBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZSgnbGFuZ3VhZ2UtY29mZmVlLXNjcmlwdCcpXG4gICAgICBnZXRWaW1TdGF0ZSAnc2FtcGxlLmNvZmZlZScsIChzdGF0ZSwgdmltRWRpdG9yKSAtPlxuICAgICAgICB7ZWRpdG9yLCBlZGl0b3JFbGVtZW50fSA9IHN0YXRlXG4gICAgICAgIHtzZXQsIGVuc3VyZX0gPSB2aW1FZGl0b3JcbiAgICBhZnRlckVhY2ggLT5cbiAgICAgIGF0b20ucGFja2FnZXMuZGVhY3RpdmF0ZVBhY2thZ2UoJ2xhbmd1YWdlLWNvZmZlZS1zY3JpcHQnKVxuXG4gICAgZGVzY3JpYmUgXCJ3aGVuIFRleHRPYmplY3QgaXMgZXhjdXRlZCBkaXJlY3RseVwiLCAtPlxuICAgICAgaXQgXCJzZWxlY3QgdGhhdCBUZXh0T2JqZWN0XCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFs4LCA3XVxuICAgICAgICBkaXNwYXRjaChlZGl0b3JFbGVtZW50LCAndmltLW1vZGUtcGx1czppbm5lci13b3JkJylcbiAgICAgICAgZW5zdXJlIG51bGwsIHNlbGVjdGVkVGV4dDogJ1F1aWNrU29ydCdcblxuICBkZXNjcmliZSBcIldvcmRcIiwgLT5cbiAgICBkZXNjcmliZSBcImlubmVyLXdvcmRcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dDogXCIxMjM0NSBhYmNkZSBBQkNERVwiXG4gICAgICAgICAgY3Vyc29yOiBbMCwgOV1cblxuICAgICAgaXQgXCJhcHBsaWVzIG9wZXJhdG9ycyBpbnNpZGUgdGhlIGN1cnJlbnQgd29yZCBpbiBvcGVyYXRvci1wZW5kaW5nIG1vZGVcIiwgLT5cbiAgICAgICAgZW5zdXJlICdkIGkgdycsXG4gICAgICAgICAgdGV4dDogICAgIFwiMTIzNDUgIEFCQ0RFXCJcbiAgICAgICAgICBjdXJzb3I6ICAgWzAsIDZdXG4gICAgICAgICAgcmVnaXN0ZXI6ICdcIic6IHRleHQ6ICdhYmNkZSdcbiAgICAgICAgICBtb2RlOiAnbm9ybWFsJ1xuXG4gICAgICBpdCBcInNlbGVjdHMgaW5zaWRlIHRoZSBjdXJyZW50IHdvcmQgaW4gdmlzdWFsIG1vZGVcIiwgLT5cbiAgICAgICAgZW5zdXJlICd2IGkgdycsXG4gICAgICAgICAgc2VsZWN0ZWRTY3JlZW5SYW5nZTogW1swLCA2XSwgWzAsIDExXV1cblxuICAgICAgaXQgXCJ3b3JrcyB3aXRoIG11bHRpcGxlIGN1cnNvcnNcIiwgLT5cbiAgICAgICAgc2V0IGFkZEN1cnNvcjogWzAsIDFdXG4gICAgICAgIGVuc3VyZSAndiBpIHcnLFxuICAgICAgICAgIHNlbGVjdGVkQnVmZmVyUmFuZ2U6IFtcbiAgICAgICAgICAgIFtbMCwgNl0sIFswLCAxMV1dXG4gICAgICAgICAgICBbWzAsIDBdLCBbMCwgNV1dXG4gICAgICAgICAgXVxuXG4gICAgICBkZXNjcmliZSBcImN1cnNvciBpcyBvbiBuZXh0IHRvIE5vbldvcmRDaGFyYWN0ZXJcIiwgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIHNldFxuICAgICAgICAgICAgdGV4dDogXCJhYmMoZGVmKVwiXG4gICAgICAgICAgICBjdXJzb3I6IFswLCA0XVxuXG4gICAgICAgIGl0IFwiY2hhbmdlIGluc2lkZSB3b3JkXCIsIC0+XG4gICAgICAgICAgZW5zdXJlICdjIGkgdycsIHRleHQ6IFwiYWJjKClcIiwgbW9kZTogXCJpbnNlcnRcIlxuXG4gICAgICAgIGl0IFwiZGVsZXRlIGluc2lkZSB3b3JkXCIsIC0+XG4gICAgICAgICAgZW5zdXJlICdkIGkgdycsIHRleHQ6IFwiYWJjKClcIiwgbW9kZTogXCJub3JtYWxcIlxuXG4gICAgICBkZXNjcmliZSBcImN1cnNvcidzIG5leHQgY2hhciBpcyBOb25Xb3JkQ2hhcmFjdGVyXCIsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICBzZXRcbiAgICAgICAgICAgIHRleHQ6IFwiYWJjKGRlZilcIlxuICAgICAgICAgICAgY3Vyc29yOiBbMCwgNl1cblxuICAgICAgICBpdCBcImNoYW5nZSBpbnNpZGUgd29yZFwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnYyBpIHcnLCB0ZXh0OiBcImFiYygpXCIsIG1vZGU6IFwiaW5zZXJ0XCJcblxuICAgICAgICBpdCBcImRlbGV0ZSBpbnNpZGUgd29yZFwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnZCBpIHcnLCB0ZXh0OiBcImFiYygpXCIsIG1vZGU6IFwibm9ybWFsXCJcblxuICAgIGRlc2NyaWJlIFwiYS13b3JkXCIsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNldCB0ZXh0OiBcIjEyMzQ1IGFiY2RlIEFCQ0RFXCIsIGN1cnNvcjogWzAsIDldXG5cbiAgICAgIGl0IFwic2VsZWN0IGN1cnJlbnQtd29yZCBhbmQgdHJhaWxpbmcgd2hpdGUgc3BhY2VcIiwgLT5cbiAgICAgICAgZW5zdXJlICdkIGEgdycsXG4gICAgICAgICAgdGV4dDogXCIxMjM0NSBBQkNERVwiXG4gICAgICAgICAgY3Vyc29yOiBbMCwgNl1cbiAgICAgICAgICByZWdpc3RlcjogJ1wiJzogdGV4dDogXCJhYmNkZSBcIlxuXG4gICAgICBpdCBcInNlbGVjdCBjdXJyZW50LXdvcmQgYW5kIGxlYWRpbmcgd2hpdGUgc3BhY2UgaW4gY2FzZSB0cmFpbGluZyB3aGl0ZSBzcGFjZSB3YXNuJ3QgdGhlcmVcIiwgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzAsIDE1XVxuICAgICAgICBlbnN1cmUgJ2QgYSB3JyxcbiAgICAgICAgICB0ZXh0OiBcIjEyMzQ1IGFiY2RlXCJcbiAgICAgICAgICBjdXJzb3I6IFswLCAxMF1cbiAgICAgICAgICByZWdpc3RlcjogJ1wiJzogdGV4dDogXCIgQUJDREVcIlxuXG4gICAgICBpdCBcInNlbGVjdHMgZnJvbSB0aGUgc3RhcnQgb2YgdGhlIGN1cnJlbnQgd29yZCB0byB0aGUgc3RhcnQgb2YgdGhlIG5leHQgd29yZCBpbiB2aXN1YWwgbW9kZVwiLCAtPlxuICAgICAgICBlbnN1cmUgJ3YgYSB3Jywgc2VsZWN0ZWRTY3JlZW5SYW5nZTogW1swLCA2XSwgWzAsIDEyXV1cblxuICAgICAgaXQgXCJkb2Vzbid0IHNwYW4gbmV3bGluZXNcIiwgLT5cbiAgICAgICAgc2V0IHRleHQ6IFwiMTIzNDVcXG5hYmNkZSBBQkNERVwiLCBjdXJzb3I6IFswLCAzXVxuICAgICAgICBlbnN1cmUgJ3YgYSB3Jywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogW1swLCAwXSwgWzAsIDVdXVxuXG4gICAgICBpdCBcImRvZXNuJ3Qgc3BhbiBzcGVjaWFsIGNoYXJhY3RlcnNcIiwgLT5cbiAgICAgICAgc2V0IHRleHQ6IFwiMSgzNDVcXG5hYmNkZSBBQkNERVwiLCBjdXJzb3I6IFswLCAzXVxuICAgICAgICBlbnN1cmUgJ3YgYSB3Jywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogW1swLCAyXSwgWzAsIDVdXVxuXG4gIGRlc2NyaWJlIFwiV2hvbGVXb3JkXCIsIC0+XG4gICAgZGVzY3JpYmUgXCJpbm5lci13aG9sZS13b3JkXCIsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNldCB0ZXh0OiBcIjEyKDQ1IGFiJ2RlIEFCQ0RFXCIsIGN1cnNvcjogWzAsIDldXG5cbiAgICAgIGl0IFwiYXBwbGllcyBvcGVyYXRvcnMgaW5zaWRlIHRoZSBjdXJyZW50IHdob2xlIHdvcmQgaW4gb3BlcmF0b3ItcGVuZGluZyBtb2RlXCIsIC0+XG4gICAgICAgIGVuc3VyZSAnZCBpIFcnLCB0ZXh0OiBcIjEyKDQ1ICBBQkNERVwiLCBjdXJzb3I6IFswLCA2XSwgcmVnaXN0ZXI6ICdcIic6IHRleHQ6IFwiYWInZGVcIlxuXG4gICAgICBpdCBcInNlbGVjdHMgaW5zaWRlIHRoZSBjdXJyZW50IHdob2xlIHdvcmQgaW4gdmlzdWFsIG1vZGVcIiwgLT5cbiAgICAgICAgZW5zdXJlICd2IGkgVycsIHNlbGVjdGVkU2NyZWVuUmFuZ2U6IFtbMCwgNl0sIFswLCAxMV1dXG4gICAgZGVzY3JpYmUgXCJhLXdob2xlLXdvcmRcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgc2V0IHRleHQ6IFwiMTIoNDUgYWInZGUgQUJDREVcIiwgY3Vyc29yOiBbMCwgOV1cblxuICAgICAgaXQgXCJzZWxlY3Qgd2hvbGUtd29yZCBhbmQgdHJhaWxpbmcgd2hpdGUgc3BhY2VcIiwgLT5cbiAgICAgICAgZW5zdXJlICdkIGEgVycsXG4gICAgICAgICAgdGV4dDogXCIxMig0NSBBQkNERVwiXG4gICAgICAgICAgY3Vyc29yOiBbMCwgNl1cbiAgICAgICAgICByZWdpc3RlcjogJ1wiJzogdGV4dDogXCJhYidkZSBcIlxuICAgICAgICAgIG1vZGU6ICdub3JtYWwnXG5cbiAgICAgIGl0IFwic2VsZWN0IHdob2xlLXdvcmQgYW5kIGxlYWRpbmcgd2hpdGUgc3BhY2UgaW4gY2FzZSB0cmFpbGluZyB3aGl0ZSBzcGFjZSB3YXNuJ3QgdGhlcmVcIiwgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzAsIDE1XVxuICAgICAgICBlbnN1cmUgJ2QgYSB3JyxcbiAgICAgICAgICB0ZXh0OiBcIjEyKDQ1IGFiJ2RlXCJcbiAgICAgICAgICBjdXJzb3I6IFswLCAxMF1cbiAgICAgICAgICByZWdpc3RlcjogJ1wiJzogdGV4dDogXCIgQUJDREVcIlxuXG4gICAgICBpdCBcInNlbGVjdHMgZnJvbSB0aGUgc3RhcnQgb2YgdGhlIGN1cnJlbnQgd2hvbGUgd29yZCB0byB0aGUgc3RhcnQgb2YgdGhlIG5leHQgd2hvbGUgd29yZCBpbiB2aXN1YWwgbW9kZVwiLCAtPlxuICAgICAgICBlbnN1cmUgJ3YgYSBXJywgc2VsZWN0ZWRTY3JlZW5SYW5nZTogW1swLCA2XSwgWzAsIDEyXV1cblxuICAgICAgaXQgXCJkb2Vzbid0IHNwYW4gbmV3bGluZXNcIiwgLT5cbiAgICAgICAgc2V0IHRleHQ6IFwiMTIoNDVcXG5hYidkZSBBQkNERVwiLCBjdXJzb3I6IFswLCA0XVxuICAgICAgICBlbnN1cmUgJ3YgYSBXJywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogW1swLCAwXSwgWzAsIDVdXVxuXG4gIGRlc2NyaWJlIFwiU3Vid29yZFwiLCAtPlxuICAgIGVzY2FwZSA9IC0+IGVuc3VyZSgnZXNjYXBlJylcbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBhdG9tLmtleW1hcHMuYWRkIFwidGVzdFwiLFxuICAgICAgICAnYXRvbS10ZXh0LWVkaXRvci52aW0tbW9kZS1wbHVzLm9wZXJhdG9yLXBlbmRpbmctbW9kZSwgYXRvbS10ZXh0LWVkaXRvci52aW0tbW9kZS1wbHVzLnZpc3VhbC1tb2RlJzpcbiAgICAgICAgICAnYSBxJzogJ3ZpbS1tb2RlLXBsdXM6YS1zdWJ3b3JkJ1xuICAgICAgICAgICdpIHEnOiAndmltLW1vZGUtcGx1czppbm5lci1zdWJ3b3JkJ1xuXG4gICAgZGVzY3JpYmUgXCJpbm5lci1zdWJ3b3JkXCIsIC0+XG4gICAgICBpdCBcInNlbGVjdCBzdWJ3b3JkXCIsIC0+XG4gICAgICAgIHNldCB0ZXh0QzogXCJjYW18ZWxDYXNlXCI7IGVuc3VyZSBcInYgaSBxXCIsIHNlbGVjdGVkVGV4dDogXCJjYW1lbFwiOyBlc2NhcGUoKVxuICAgICAgICBzZXQgdGV4dEM6IFwiY2FtZXxsQ2FzZVwiOyBlbnN1cmUgXCJ2IGkgcVwiLCBzZWxlY3RlZFRleHQ6IFwiY2FtZWxcIjsgZXNjYXBlKClcbiAgICAgICAgc2V0IHRleHRDOiBcImNhbWVsfENhc2VcIjsgZW5zdXJlIFwidiBpIHFcIiwgc2VsZWN0ZWRUZXh0OiBcIkNhc2VcIjsgZXNjYXBlKClcbiAgICAgICAgc2V0IHRleHRDOiBcImNhbWVsQ2FzfGVcIjsgZW5zdXJlIFwidiBpIHFcIiwgc2VsZWN0ZWRUZXh0OiBcIkNhc2VcIjsgZXNjYXBlKClcblxuICAgICAgICBzZXQgdGV4dEM6IFwifF9zbmFrZV9fY2FzZV9cIjsgZW5zdXJlIFwidiBpIHFcIiwgc2VsZWN0ZWRUZXh0OiBcIl9zbmFrZVwiOyBlc2NhcGUoKVxuICAgICAgICBzZXQgdGV4dEM6IFwiX3NuYWt8ZV9fY2FzZV9cIjsgZW5zdXJlIFwidiBpIHFcIiwgc2VsZWN0ZWRUZXh0OiBcIl9zbmFrZVwiOyBlc2NhcGUoKVxuICAgICAgICBzZXQgdGV4dEM6IFwiX3NuYWtlfF9fY2FzZV9cIjsgZW5zdXJlIFwidiBpIHFcIiwgc2VsZWN0ZWRUZXh0OiBcIl9fY2FzZVwiOyBlc2NhcGUoKVxuICAgICAgICBzZXQgdGV4dEM6IFwiX3NuYWtlX3xfY2FzZV9cIjsgZW5zdXJlIFwidiBpIHFcIiwgc2VsZWN0ZWRUZXh0OiBcIl9fY2FzZVwiOyBlc2NhcGUoKVxuICAgICAgICBzZXQgdGV4dEM6IFwiX3NuYWtlX19jYXN8ZV9cIjsgZW5zdXJlIFwidiBpIHFcIiwgc2VsZWN0ZWRUZXh0OiBcIl9fY2FzZVwiOyBlc2NhcGUoKVxuICAgICAgICBzZXQgdGV4dEM6IFwiX3NuYWtlX19jYXNlfF9cIjsgZW5zdXJlIFwidiBpIHFcIiwgc2VsZWN0ZWRUZXh0OiBcIl9cIjsgZXNjYXBlKClcblxuICAgIGRlc2NyaWJlIFwiYS1zdWJ3b3JkXCIsIC0+XG4gICAgICBpdCBcInNlbGVjdCBzdWJ3b3JkIGFuZCBzcGFjZXNcIiwgLT5cbiAgICAgICAgc2V0IHRleHRDOiBcImNhbWVsQ2F8c2UgIE5leHRDYW1lbFwiOyBlbnN1cmUgXCJ2IGEgcVwiLCBzZWxlY3RlZFRleHQ6IFwiQ2FzZSAgXCI7IGVzY2FwZSgpXG4gICAgICAgIHNldCB0ZXh0QzogXCJjYW1lbENhc2UgIE5lfHh0Q2FtZWxcIjsgZW5zdXJlIFwidiBhIHFcIiwgc2VsZWN0ZWRUZXh0OiBcIiAgTmV4dFwiOyBlc2NhcGUoKVxuICAgICAgICBzZXQgdGV4dEM6IFwic25ha2VfY3xhc2UgIG5leHRfc25ha2VcIjsgZW5zdXJlIFwidiBhIHFcIiwgc2VsZWN0ZWRUZXh0OiBcIl9jYXNlICBcIjsgZXNjYXBlKClcbiAgICAgICAgc2V0IHRleHRDOiBcInNuYWtlX2Nhc2UgIG5lfHh0X3NuYWtlXCI7IGVuc3VyZSBcInYgYSBxXCIsIHNlbGVjdGVkVGV4dDogXCIgIG5leHRcIjsgZXNjYXBlKClcblxuICBkZXNjcmliZSBcIkFueVBhaXJcIiwgLT5cbiAgICB7c2ltcGxlVGV4dCwgY29tcGxleFRleHR9ID0ge31cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBzaW1wbGVUZXh0ID0gXCJcIlwiXG4gICAgICAgIC4uLi4gXCJhYmNcIiAuLi4uXG4gICAgICAgIC4uLi4gJ2FiYycgLi4uLlxuICAgICAgICAuLi4uIGBhYmNgIC4uLi5cbiAgICAgICAgLi4uLiB7YWJjfSAuLi4uXG4gICAgICAgIC4uLi4gPGFiYz4gLi4uLlxuICAgICAgICAuLi4uIFthYmNdIC4uLi5cbiAgICAgICAgLi4uLiAoYWJjKSAuLi4uXG4gICAgICAgIFwiXCJcIlxuICAgICAgY29tcGxleFRleHQgPSBcIlwiXCJcbiAgICAgICAgWzRzXG4gICAgICAgIC0tezNzXG4gICAgICAgIC0tLS1cIjJzKDFzLTFlKTJlXCJcbiAgICAgICAgLS0tM2V9LTRlXG4gICAgICAgIF1cbiAgICAgICAgXCJcIlwiXG4gICAgICBzZXRcbiAgICAgICAgdGV4dDogc2ltcGxlVGV4dFxuICAgICAgICBjdXJzb3I6IFswLCA3XVxuICAgIGRlc2NyaWJlIFwiaW5uZXItYW55LXBhaXJcIiwgLT5cbiAgICAgIGl0IFwiYXBwbGllcyBvcGVyYXRvcnMgYW55IGlubmVyLXBhaXIgYW5kIHJlcGVhdGFibGVcIiwgLT5cbiAgICAgICAgZW5zdXJlICdkIGkgcycsXG4gICAgICAgICAgdGV4dDogXCJcIlwiXG4gICAgICAgICAgICAuLi4uIFwiXCIgLi4uLlxuICAgICAgICAgICAgLi4uLiAnYWJjJyAuLi4uXG4gICAgICAgICAgICAuLi4uIGBhYmNgIC4uLi5cbiAgICAgICAgICAgIC4uLi4ge2FiY30gLi4uLlxuICAgICAgICAgICAgLi4uLiA8YWJjPiAuLi4uXG4gICAgICAgICAgICAuLi4uIFthYmNdIC4uLi5cbiAgICAgICAgICAgIC4uLi4gKGFiYykgLi4uLlxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZSAnaiAuIGogLiBqIC4gaiAuIGogLiBqIC4gaiAuJyxcbiAgICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICAgIC4uLi4gXCJcIiAuLi4uXG4gICAgICAgICAgICAuLi4uICcnIC4uLi5cbiAgICAgICAgICAgIC4uLi4gYGAgLi4uLlxuICAgICAgICAgICAgLi4uLiB7fSAuLi4uXG4gICAgICAgICAgICAuLi4uIDw+IC4uLi5cbiAgICAgICAgICAgIC4uLi4gW10gLi4uLlxuICAgICAgICAgICAgLi4uLiAoKSAuLi4uXG4gICAgICAgICAgICBcIlwiXCJcbiAgICAgIGl0IFwiY2FuIGV4cGFuZCBzZWxlY3Rpb25cIiwgLT5cbiAgICAgICAgc2V0IHRleHQ6IGNvbXBsZXhUZXh0LCBjdXJzb3I6IFsyLCA4XVxuICAgICAgICBlbnN1cmUgJ3YnXG4gICAgICAgIGVuc3VyZSAnaSBzJywgc2VsZWN0ZWRUZXh0OiBcIlwiXCIxcy0xZVwiXCJcIlxuICAgICAgICBlbnN1cmUgJ2kgcycsIHNlbGVjdGVkVGV4dDogXCJcIlwiMnMoMXMtMWUpMmVcIlwiXCJcbiAgICAgICAgZW5zdXJlICdpIHMnLCBzZWxlY3RlZFRleHQ6IFwiXCJcIjNzXFxuLS0tLVwiMnMoMXMtMWUpMmVcIlxcbi0tLTNlXCJcIlwiXG4gICAgICAgIGVuc3VyZSAnaSBzJywgc2VsZWN0ZWRUZXh0OiBcIlwiXCI0c1xcbi0tezNzXFxuLS0tLVwiMnMoMXMtMWUpMmVcIlxcbi0tLTNlfS00ZVwiXCJcIlxuICAgIGRlc2NyaWJlIFwiYS1hbnktcGFpclwiLCAtPlxuICAgICAgaXQgXCJhcHBsaWVzIG9wZXJhdG9ycyBhbnkgYS1wYWlyIGFuZCByZXBlYXRhYmxlXCIsIC0+XG4gICAgICAgIGVuc3VyZSAnZCBhIHMnLFxuICAgICAgICAgIHRleHQ6IFwiXCJcIlxuICAgICAgICAgICAgLi4uLiAgLi4uLlxuICAgICAgICAgICAgLi4uLiAnYWJjJyAuLi4uXG4gICAgICAgICAgICAuLi4uIGBhYmNgIC4uLi5cbiAgICAgICAgICAgIC4uLi4ge2FiY30gLi4uLlxuICAgICAgICAgICAgLi4uLiA8YWJjPiAuLi4uXG4gICAgICAgICAgICAuLi4uIFthYmNdIC4uLi5cbiAgICAgICAgICAgIC4uLi4gKGFiYykgLi4uLlxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZSAnaiAuIGogLiBqIC4gaiAuIGogLiBqIC4gaiAuJyxcbiAgICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICAgIC4uLi4gIC4uLi5cbiAgICAgICAgICAgIC4uLi4gIC4uLi5cbiAgICAgICAgICAgIC4uLi4gIC4uLi5cbiAgICAgICAgICAgIC4uLi4gIC4uLi5cbiAgICAgICAgICAgIC4uLi4gIC4uLi5cbiAgICAgICAgICAgIC4uLi4gIC4uLi5cbiAgICAgICAgICAgIC4uLi4gIC4uLi5cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgaXQgXCJjYW4gZXhwYW5kIHNlbGVjdGlvblwiLCAtPlxuICAgICAgICBzZXQgdGV4dDogY29tcGxleFRleHQsIGN1cnNvcjogWzIsIDhdXG4gICAgICAgIGVuc3VyZSAndidcbiAgICAgICAgZW5zdXJlICdhIHMnLCBzZWxlY3RlZFRleHQ6IFwiXCJcIigxcy0xZSlcIlwiXCJcbiAgICAgICAgZW5zdXJlICdhIHMnLCBzZWxlY3RlZFRleHQ6IFwiXCJcIlxcXCIycygxcy0xZSkyZVxcXCJcIlwiXCJcbiAgICAgICAgZW5zdXJlICdhIHMnLCBzZWxlY3RlZFRleHQ6IFwiXCJcInszc1xcbi0tLS1cIjJzKDFzLTFlKTJlXCJcXG4tLS0zZX1cIlwiXCJcbiAgICAgICAgZW5zdXJlICdhIHMnLCBzZWxlY3RlZFRleHQ6IFwiXCJcIls0c1xcbi0tezNzXFxuLS0tLVwiMnMoMXMtMWUpMmVcIlxcbi0tLTNlfS00ZVxcbl1cIlwiXCJcblxuICBkZXNjcmliZSBcIkFueVF1b3RlXCIsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgc2V0XG4gICAgICAgIHRleHQ6IFwiXCJcIlxuICAgICAgICAtLVwiYWJjXCIgYGRlZmAgICdlZmcnLS1cbiAgICAgICAgXCJcIlwiXG4gICAgICAgIGN1cnNvcjogWzAsIDBdXG4gICAgZGVzY3JpYmUgXCJpbm5lci1hbnktcXVvdGVcIiwgLT5cbiAgICAgIGl0IFwiYXBwbGllcyBvcGVyYXRvcnMgYW55IGlubmVyLXBhaXIgYW5kIHJlcGVhdGFibGVcIiwgLT5cbiAgICAgICAgZW5zdXJlICdkIGkgcScsIHRleHQ6IFwiXCJcIi0tXCJcIiBgZGVmYCAgJ2VmZyctLVwiXCJcIlxuICAgICAgICBlbnN1cmUgJy4nLCB0ZXh0OiBcIlwiXCItLVwiXCIgYGAgICdlZmcnLS1cIlwiXCJcbiAgICAgICAgZW5zdXJlICcuJywgdGV4dDogXCJcIlwiLS1cIlwiIGBgICAnJy0tXCJcIlwiXG4gICAgICBpdCBcImNhbiBzZWxlY3QgbmV4dCBxdW90ZVwiLCAtPlxuICAgICAgICBlbnN1cmUgJ3YnXG4gICAgICAgIGVuc3VyZSAnaSBxJywgc2VsZWN0ZWRUZXh0OiAnYWJjJ1xuICAgICAgICBlbnN1cmUgJ2kgcScsIHNlbGVjdGVkVGV4dDogJ2RlZidcbiAgICAgICAgZW5zdXJlICdpIHEnLCBzZWxlY3RlZFRleHQ6ICdlZmcnXG4gICAgZGVzY3JpYmUgXCJhLWFueS1xdW90ZVwiLCAtPlxuICAgICAgaXQgXCJhcHBsaWVzIG9wZXJhdG9ycyBhbnkgYS1xdW90ZSBhbmQgcmVwZWF0YWJsZVwiLCAtPlxuICAgICAgICBlbnN1cmUgJ2QgYSBxJywgdGV4dDogXCJcIlwiLS0gYGRlZmAgICdlZmcnLS1cIlwiXCJcbiAgICAgICAgZW5zdXJlICcuJyAgLCB0ZXh0OiBcIlwiXCItLSAgICdlZmcnLS1cIlwiXCJcbiAgICAgICAgZW5zdXJlICcuJyAgLCB0ZXh0OiBcIlwiXCItLSAgIC0tXCJcIlwiXG4gICAgICBpdCBcImNhbiBzZWxlY3QgbmV4dCBxdW90ZVwiLCAtPlxuICAgICAgICBlbnN1cmUgJ3YnXG4gICAgICAgIGVuc3VyZSAnYSBxJywgc2VsZWN0ZWRUZXh0OiAnXCJhYmNcIidcbiAgICAgICAgZW5zdXJlICdhIHEnLCBzZWxlY3RlZFRleHQ6ICdgZGVmYCdcbiAgICAgICAgZW5zdXJlICdhIHEnLCBzZWxlY3RlZFRleHQ6IFwiJ2VmZydcIlxuXG4gIGRlc2NyaWJlIFwiRG91YmxlUXVvdGVcIiwgLT5cbiAgICBkZXNjcmliZSBcImlzc3VlLTYzNSBuZXcgYmVoYXZpb3Igb2YgaW5uZXItZG91YmxlLXF1b3RlXCIsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIGF0b20ua2V5bWFwcy5hZGQgXCJ0ZXN0XCIsXG4gICAgICAgICAgJ2F0b20tdGV4dC1lZGl0b3IudmltLW1vZGUtcGx1czpub3QoLmluc2VydC1tb2RlKSc6XG4gICAgICAgICAgICAnZyByJzogJ3ZpbS1tb2RlLXBsdXM6cmVwbGFjZSdcblxuICAgICAgZGVzY3JpYmUgXCJxdW90ZSBpcyB1bi1iYWxhbmNlZFwiLCAtPlxuICAgICAgICBpdCBcImNhc2UxXCIsIC0+XG4gICAgICAgICAgc2V0ICAgICAgICAgICAgICAgICAgICAgdGV4dENfOiAnX3xfXCJfX19fXCJfX19fXCInXG4gICAgICAgICAgZW5zdXJlV2FpdCAnZyByIGkgXCIgKycsIHRleHRDXzogJ19fXCJ8KysrK1wiX19fX1wiJ1xuICAgICAgICBpdCBcImNhc2UyXCIsIC0+XG4gICAgICAgICAgc2V0ICAgICAgICAgICAgICAgICAgICAgdGV4dENfOiAnX19cIl9ffF9fXCJfX19fXCInXG4gICAgICAgICAgZW5zdXJlV2FpdCAnZyByIGkgXCIgKycsIHRleHRDXzogJ19fXCJ8KysrK1wiX19fX1wiJ1xuICAgICAgICBpdCBcImNhc2UzXCIsIC0+XG4gICAgICAgICAgc2V0ICAgICAgICAgICAgICAgICAgICAgdGV4dENfOiAnX19cIl9fX19cIl9ffF9fXCInXG4gICAgICAgICAgZW5zdXJlV2FpdCAnZyByIGkgXCIgKycsIHRleHRDXzogJ19fXCJfX19fXCJ8KysrK1wiJ1xuICAgICAgICBpdCBcImNhc2U0XCIsIC0+XG4gICAgICAgICAgc2V0ICAgICAgICAgICAgICAgICAgICAgdGV4dENfOiAnX198XCJfX19fXCJfX19fXCInXG4gICAgICAgICAgZW5zdXJlV2FpdCAnZyByIGkgXCIgKycsIHRleHRDXzogJ19fXCJ8KysrK1wiX19fX1wiJ1xuICAgICAgICBpdCBcImNhc2U1XCIsIC0+XG4gICAgICAgICAgc2V0ICAgICAgICAgICAgICAgICAgICAgdGV4dENfOiAnX19cIl9fX198XCJfX19fXCInXG4gICAgICAgICAgZW5zdXJlV2FpdCAnZyByIGkgXCIgKycsIHRleHRDXzogJ19fXCJ8KysrK1wiX19fX1wiJ1xuICAgICAgICBpdCBcImNhc2U2XCIsIC0+XG4gICAgICAgICAgc2V0ICAgICAgICAgICAgICAgICAgICAgdGV4dENfOiAnX19cIl9fX19cIl9fX198XCInXG4gICAgICAgICAgZW5zdXJlV2FpdCAnZyByIGkgXCIgKycsIHRleHRDXzogJ19fXCJfX19fXCJ8KysrK1wiJ1xuXG4gICAgICBkZXNjcmliZSBcInF1b3RlIGlzIGJhbGFuY2VkXCIsIC0+XG4gICAgICAgIGl0IFwiY2FzZTFcIiwgLT5cbiAgICAgICAgICBzZXQgICAgICAgICAgICAgICAgICAgICB0ZXh0Q186ICdffF9cIj09PT1cIl9fX19cIj09PVwiJ1xuICAgICAgICAgIGVuc3VyZVdhaXQgJ2cgciBpIFwiICsnLCB0ZXh0Q186ICdfX1wifCsrKytcIl9fX19cIj09PVwiJ1xuICAgICAgICBpdCBcImNhc2UyXCIsIC0+XG4gICAgICAgICAgc2V0ICAgICAgICAgICAgICAgICAgICAgdGV4dENfOiAnX19cIj09fD09XCJfX19fXCI9PT1cIidcbiAgICAgICAgICBlbnN1cmVXYWl0ICdnIHIgaSBcIiArJywgdGV4dENfOiAnX19cInwrKysrXCJfX19fXCI9PT1cIidcbiAgICAgICAgaXQgXCJjYXNlM1wiLCAtPlxuICAgICAgICAgIHNldCAgICAgICAgICAgICAgICAgICAgIHRleHRDXzogJ19fXCI9PT09XCJfX3xfX1wiPT09XCInXG4gICAgICAgICAgZW5zdXJlV2FpdCAnZyByIGkgXCIgKycsIHRleHRDXzogJ19fXCI9PT09XCJ8KysrK1wiPT09XCInXG4gICAgICAgIGl0IFwiY2FzZTRcIiwgLT5cbiAgICAgICAgICBzZXQgICAgICAgICAgICAgICAgICAgICB0ZXh0Q186ICdfX1wiPT09PVwiX19fX1wiPXw9PVwiJ1xuICAgICAgICAgIGVuc3VyZVdhaXQgJ2cgciBpIFwiICsnLCB0ZXh0Q186ICdfX1wiPT09PVwiX19fX1wifCsrK1wiJ1xuICAgICAgICBpdCBcImNhc2U1XCIsIC0+XG4gICAgICAgICAgc2V0ICAgICAgICAgICAgICAgICAgICAgdGV4dENfOiAnX198XCI9PT09XCJfX19fXCI9PT1cIidcbiAgICAgICAgICBlbnN1cmVXYWl0ICdnIHIgaSBcIiArJywgdGV4dENfOiAnX19cInwrKysrXCJfX19fXCI9PT1cIidcbiAgICAgICAgaXQgXCJjYXNlNlwiLCAtPlxuICAgICAgICAgIHNldCAgICAgICAgICAgICAgICAgICAgIHRleHRDXzogJ19fXCI9PT09fFwiX19fX1wiPT09XCInXG4gICAgICAgICAgZW5zdXJlV2FpdCAnZyByIGkgXCIgKycsIHRleHRDXzogJ19fXCJ8KysrK1wiX19fX1wiPT09XCInXG4gICAgICAgIGl0IFwiY2FzZTdcIiwgLT5cbiAgICAgICAgICBzZXQgICAgICAgICAgICAgICAgICAgICB0ZXh0Q186ICdfX1wiPT09PVwiX19fX3xcIj09PVwiJ1xuICAgICAgICAgIGVuc3VyZVdhaXQgJ2cgciBpIFwiICsnLCB0ZXh0Q186ICdfX1wiPT09PVwiX19fX1wifCsrK1wiJ1xuXG4gICAgZGVzY3JpYmUgXCJpbm5lci1kb3VibGUtcXVvdGVcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dDogJ1wiIHNvbWV0aGluZyBpbiBoZXJlIGFuZCBpbiBcImhlcmVcIiBcIiBhbmQgb3ZlciBoZXJlJ1xuICAgICAgICAgIGN1cnNvcjogWzAsIDldXG5cbiAgICAgIGl0IFwiYXBwbGllcyBvcGVyYXRvcnMgaW5zaWRlIHRoZSBjdXJyZW50IHN0cmluZyBpbiBvcGVyYXRvci1wZW5kaW5nIG1vZGVcIiwgLT5cbiAgICAgICAgZW5zdXJlICdkIGkgXCInLFxuICAgICAgICAgIHRleHQ6ICdcIlwiaGVyZVwiIFwiIGFuZCBvdmVyIGhlcmUnXG4gICAgICAgICAgY3Vyc29yOiBbMCwgMV1cblxuICAgICAgaXQgXCJhcHBsaWVzIG9wZXJhdG9ycyBpbnNpZGUgdGhlIGN1cnJlbnQgc3RyaW5nIGluIG9wZXJhdG9yLXBlbmRpbmcgbW9kZVwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMCwgMjldXG4gICAgICAgIGVuc3VyZSAnZCBpIFwiJyxcbiAgICAgICAgICB0ZXh0OiAnXCIgc29tZXRoaW5nIGluIGhlcmUgYW5kIGluIFwiXCIgXCIgYW5kIG92ZXIgaGVyZSdcbiAgICAgICAgICBjdXJzb3I6IFswLCAyOF1cblxuICAgICAgaXQgXCJtYWtlcyBubyBjaGFuZ2UgaWYgcGFzdCB0aGUgbGFzdCBzdHJpbmcgb24gYSBsaW5lXCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFswLCAzOV1cbiAgICAgICAgZW5zdXJlICdkIGkgXCInLFxuICAgICAgICAgIHRleHQ6ICdcIiBzb21ldGhpbmcgaW4gaGVyZSBhbmQgaW4gXCJoZXJlXCIgXCIgYW5kIG92ZXIgaGVyZSdcbiAgICAgICAgICBjdXJzb3I6IFswLCAzOV1cblxuICAgICAgZGVzY3JpYmUgXCJjdXJzb3IgaXMgb24gdGhlIHBhaXIgY2hhclwiLCAtPlxuICAgICAgICBjaGVjayA9IGdldENoZWNrRnVuY3Rpb25Gb3IoJ2kgXCInKVxuICAgICAgICB0ZXh0ID0gJy1cIitcIi0nXG4gICAgICAgIHRleHRGaW5hbCA9ICctXCJcIi0nXG4gICAgICAgIHNlbGVjdGVkVGV4dCA9ICcrJ1xuICAgICAgICBvcGVuID0gWzAsIDFdXG4gICAgICAgIGNsb3NlID0gWzAsIDNdXG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICBzZXQge3RleHR9XG4gICAgICAgIGl0IFwiY2FzZS0xIG5vcm1hbFwiLCAtPiBjaGVjayBvcGVuLCAgJ2QnLCB0ZXh0OiB0ZXh0RmluYWwsIGN1cnNvcjogWzAsIDJdXG4gICAgICAgIGl0IFwiY2FzZS0yIG5vcm1hbFwiLCAtPiBjaGVjayBjbG9zZSwgJ2QnLCB0ZXh0OiB0ZXh0RmluYWwsIGN1cnNvcjogWzAsIDJdXG4gICAgICAgIGl0IFwiY2FzZS0zIHZpc3VhbFwiLCAtPiBjaGVjayBvcGVuLCAgJ3YnLCB7c2VsZWN0ZWRUZXh0fVxuICAgICAgICBpdCBcImNhc2UtNCB2aXN1YWxcIiwgLT4gY2hlY2sgY2xvc2UsICd2Jywge3NlbGVjdGVkVGV4dH1cbiAgICBkZXNjcmliZSBcImEtZG91YmxlLXF1b3RlXCIsIC0+XG4gICAgICBvcmlnaW5hbFRleHQgPSAnXCIgc29tZXRoaW5nIGluIGhlcmUgYW5kIGluIFwiaGVyZVwiIFwiJ1xuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXQgdGV4dDogb3JpZ2luYWxUZXh0LCBjdXJzb3I6IFswLCA5XVxuXG4gICAgICBpdCBcImFwcGxpZXMgb3BlcmF0b3JzIGFyb3VuZCB0aGUgY3VycmVudCBkb3VibGUgcXVvdGVzIGluIG9wZXJhdG9yLXBlbmRpbmcgbW9kZVwiLCAtPlxuICAgICAgICBlbnN1cmUgJ2QgYSBcIicsXG4gICAgICAgICAgdGV4dDogJ2hlcmVcIiBcIidcbiAgICAgICAgICBjdXJzb3I6IFswLCAwXVxuICAgICAgICAgIG1vZGU6ICdub3JtYWwnXG5cbiAgICAgIGl0IFwiZGVsZXRlIGEtZG91YmxlLXF1b3RlXCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFswLCAyOV1cbiAgICAgICAgZW5zdXJlICdkIGEgXCInLFxuICAgICAgICAgIHRleHQ6ICdcIiBzb21ldGhpbmcgaW4gaGVyZSBhbmQgaW4gIFwiJ1xuICAgICAgICAgIGN1cnNvcjogWzAsIDI3XVxuICAgICAgICAgIG1vZGU6ICdub3JtYWwnXG4gICAgICBkZXNjcmliZSBcImN1cnNvciBpcyBvbiB0aGUgcGFpciBjaGFyXCIsIC0+XG4gICAgICAgIGNoZWNrID0gZ2V0Q2hlY2tGdW5jdGlvbkZvcignYSBcIicpXG4gICAgICAgIHRleHQgPSAnLVwiK1wiLSdcbiAgICAgICAgdGV4dEZpbmFsID0gJy0tJ1xuICAgICAgICBzZWxlY3RlZFRleHQgPSAnXCIrXCInXG4gICAgICAgIG9wZW4gPSBbMCwgMV1cbiAgICAgICAgY2xvc2UgPSBbMCwgM11cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIHNldCB7dGV4dH1cbiAgICAgICAgaXQgXCJjYXNlLTEgbm9ybWFsXCIsIC0+IGNoZWNrIG9wZW4sICAnZCcsIHRleHQ6IHRleHRGaW5hbCwgY3Vyc29yOiBbMCwgMV1cbiAgICAgICAgaXQgXCJjYXNlLTIgbm9ybWFsXCIsIC0+IGNoZWNrIGNsb3NlLCAnZCcsIHRleHQ6IHRleHRGaW5hbCwgY3Vyc29yOiBbMCwgMV1cbiAgICAgICAgaXQgXCJjYXNlLTMgdmlzdWFsXCIsIC0+IGNoZWNrIG9wZW4sICAndicsIHtzZWxlY3RlZFRleHR9XG4gICAgICAgIGl0IFwiY2FzZS00IHZpc3VhbFwiLCAtPiBjaGVjayBjbG9zZSwgJ3YnLCB7c2VsZWN0ZWRUZXh0fVxuICBkZXNjcmliZSBcIlNpbmdsZVF1b3RlXCIsIC0+XG4gICAgZGVzY3JpYmUgXCJpbm5lci1zaW5nbGUtcXVvdGVcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dDogXCInIHNvbWV0aGluZyBpbiBoZXJlIGFuZCBpbiAnaGVyZScgJyBhbmQgb3ZlciBoZXJlXCJcbiAgICAgICAgICBjdXJzb3I6IFswLCA5XVxuXG4gICAgICBkZXNjcmliZSBcImRvbid0IHRyZWF0IGxpdGVyYWwgYmFja3NsYXNoKGRvdWJsZSBiYWNrc2xhc2gpIGFzIGVzY2FwZSBjaGFyXCIsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICBzZXRcbiAgICAgICAgICAgIHRleHQ6IFwiJ3NvbWUta2V5LWhlcmVcXFxcXFxcXCc6ICdoZXJlLWlzLXRoZS12YWwnXCJcbiAgICAgICAgaXQgXCJjYXNlLTFcIiwgLT5cbiAgICAgICAgICBzZXQgY3Vyc29yOiBbMCwgMl1cbiAgICAgICAgICBlbnN1cmUgXCJkIGkgJ1wiLFxuICAgICAgICAgICAgdGV4dDogXCInJzogJ2hlcmUtaXMtdGhlLXZhbCdcIlxuICAgICAgICAgICAgY3Vyc29yOiBbMCwgMV1cblxuICAgICAgICBpdCBcImNhc2UtMlwiLCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFswLCAxOV1cbiAgICAgICAgICBlbnN1cmUgXCJkIGkgJ1wiLFxuICAgICAgICAgICAgdGV4dDogXCInc29tZS1rZXktaGVyZVxcXFxcXFxcJzogJydcIlxuICAgICAgICAgICAgY3Vyc29yOiBbMCwgMjBdXG5cbiAgICAgIGRlc2NyaWJlIFwidHJlYXQgYmFja3NsYXNoKHNpbmdsZSBiYWNrc2xhc2gpIGFzIGVzY2FwZSBjaGFyXCIsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICBzZXRcbiAgICAgICAgICAgIHRleHQ6IFwiJ3NvbWUta2V5LWhlcmVcXFxcJyc6ICdoZXJlLWlzLXRoZS12YWwnXCJcblxuICAgICAgICBpdCBcImNhc2UtMVwiLCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFswLCAyXVxuICAgICAgICAgIGVuc3VyZSBcImQgaSAnXCIsXG4gICAgICAgICAgICB0ZXh0OiBcIicnOiAnaGVyZS1pcy10aGUtdmFsJ1wiXG4gICAgICAgICAgICBjdXJzb3I6IFswLCAxXVxuICAgICAgICBpdCBcImNhc2UtMlwiLCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFswLCAxN11cbiAgICAgICAgICBlbnN1cmUgXCJkIGkgJ1wiLFxuICAgICAgICAgICAgdGV4dDogXCInc29tZS1rZXktaGVyZVxcXFwnJydoZXJlLWlzLXRoZS12YWwnXCJcbiAgICAgICAgICAgIGN1cnNvcjogWzAsIDE3XVxuXG4gICAgICBpdCBcImFwcGxpZXMgb3BlcmF0b3JzIGluc2lkZSB0aGUgY3VycmVudCBzdHJpbmcgaW4gb3BlcmF0b3ItcGVuZGluZyBtb2RlXCIsIC0+XG4gICAgICAgIGVuc3VyZSBcImQgaSAnXCIsXG4gICAgICAgICAgdGV4dDogXCInJ2hlcmUnICcgYW5kIG92ZXIgaGVyZVwiXG4gICAgICAgICAgY3Vyc29yOiBbMCwgMV1cblxuICAgICAgIyBbTk9URV1cbiAgICAgICMgSSBkb24ndCBsaWtlIG9yaWdpbmFsIGJlaGF2aW9yLCB0aGlzIGlzIGNvdW50ZXIgaW50dWl0aXZlLlxuICAgICAgIyBTaW1wbHkgc2VsZWN0aW5nIGFyZWEgYmV0d2VlbiBxdW90ZSBpcyB0aGF0IG5vcm1hbCB1c2VyIGV4cGVjdHMuXG4gICAgICAjIGl0IFwiYXBwbGllcyBvcGVyYXRvcnMgaW5zaWRlIHRoZSBuZXh0IHN0cmluZyBpbiBvcGVyYXRvci1wZW5kaW5nIG1vZGUgKGlmIG5vdCBpbiBhIHN0cmluZylcIiwgLT5cbiAgICAgICMgPT4gUmV2ZXJ0ZWQgdG8gb3JpZ2luYWwgYmVoYXZpb3IsIGJ1dCBuZWVkIGNhcmVmdWwgY29uc2lkZXJhdGlvbiB3aGF0IGlzIGJlc3QuXG5cbiAgICAgICMgaXQgXCJbQ2hhbmdlZCBiZWhhdmlvcl0gYXBwbGllcyBvcGVyYXRvcnMgaW5zaWRlIGFyZWEgYmV0d2VlbiBxdW90ZVwiLCAtPlxuICAgICAgaXQgXCJhcHBsaWVzIG9wZXJhdG9ycyBpbnNpZGUgdGhlIG5leHQgc3RyaW5nIGluIG9wZXJhdG9yLXBlbmRpbmcgbW9kZSAoaWYgbm90IGluIGEgc3RyaW5nKVwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMCwgMjZdXG4gICAgICAgIGVuc3VyZSBcImQgaSAnXCIsXG4gICAgICAgICAgdGV4dDogXCInJ2hlcmUnICcgYW5kIG92ZXIgaGVyZVwiXG4gICAgICAgICAgY3Vyc29yOiBbMCwgMV1cblxuICAgICAgaXQgXCJtYWtlcyBubyBjaGFuZ2UgaWYgcGFzdCB0aGUgbGFzdCBzdHJpbmcgb24gYSBsaW5lXCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFswLCAzOV1cbiAgICAgICAgZW5zdXJlIFwiZCBpICdcIixcbiAgICAgICAgICB0ZXh0OiBcIicgc29tZXRoaW5nIGluIGhlcmUgYW5kIGluICdoZXJlJyAnIGFuZCBvdmVyIGhlcmVcIlxuICAgICAgICAgIGN1cnNvcjogWzAsIDM5XVxuICAgICAgZGVzY3JpYmUgXCJjdXJzb3IgaXMgb24gdGhlIHBhaXIgY2hhclwiLCAtPlxuICAgICAgICBjaGVjayA9IGdldENoZWNrRnVuY3Rpb25Gb3IoXCJpICdcIilcbiAgICAgICAgdGV4dCA9IFwiLScrJy1cIlxuICAgICAgICB0ZXh0RmluYWwgPSBcIi0nJy1cIlxuICAgICAgICBzZWxlY3RlZFRleHQgPSAnKydcbiAgICAgICAgb3BlbiA9IFswLCAxXVxuICAgICAgICBjbG9zZSA9IFswLCAzXVxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgc2V0IHt0ZXh0fVxuICAgICAgICBpdCBcImNhc2UtMSBub3JtYWxcIiwgLT4gY2hlY2sgb3BlbiwgICdkJywgdGV4dDogdGV4dEZpbmFsLCBjdXJzb3I6IFswLCAyXVxuICAgICAgICBpdCBcImNhc2UtMiBub3JtYWxcIiwgLT4gY2hlY2sgY2xvc2UsICdkJywgdGV4dDogdGV4dEZpbmFsLCBjdXJzb3I6IFswLCAyXVxuICAgICAgICBpdCBcImNhc2UtMyB2aXN1YWxcIiwgLT4gY2hlY2sgb3BlbiwgICd2Jywge3NlbGVjdGVkVGV4dH1cbiAgICAgICAgaXQgXCJjYXNlLTQgdmlzdWFsXCIsIC0+IGNoZWNrIGNsb3NlLCAndicsIHtzZWxlY3RlZFRleHR9XG4gICAgZGVzY3JpYmUgXCJhLXNpbmdsZS1xdW90ZVwiLCAtPlxuICAgICAgb3JpZ2luYWxUZXh0ID0gXCInIHNvbWV0aGluZyBpbiBoZXJlIGFuZCBpbiAnaGVyZScgJ1wiXG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNldCB0ZXh0OiBvcmlnaW5hbFRleHQsIGN1cnNvcjogWzAsIDldXG5cbiAgICAgIGl0IFwiYXBwbGllcyBvcGVyYXRvcnMgYXJvdW5kIHRoZSBjdXJyZW50IHNpbmdsZSBxdW90ZXMgaW4gb3BlcmF0b3ItcGVuZGluZyBtb2RlXCIsIC0+XG4gICAgICAgIGVuc3VyZSBcImQgYSAnXCIsXG4gICAgICAgICAgdGV4dDogXCJoZXJlJyAnXCJcbiAgICAgICAgICBjdXJzb3I6IFswLCAwXVxuICAgICAgICAgIG1vZGU6ICdub3JtYWwnXG5cbiAgICAgIGl0IFwiYXBwbGllcyBvcGVyYXRvcnMgaW5zaWRlIHRoZSBuZXh0IHN0cmluZyBpbiBvcGVyYXRvci1wZW5kaW5nIG1vZGUgKGlmIG5vdCBpbiBhIHN0cmluZylcIiwgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzAsIDI5XVxuICAgICAgICBlbnN1cmUgXCJkIGEgJ1wiLFxuICAgICAgICAgIHRleHQ6IFwiJyBzb21ldGhpbmcgaW4gaGVyZSBhbmQgaW4gICdcIlxuICAgICAgICAgIGN1cnNvcjogWzAsIDI3XVxuICAgICAgICAgIG1vZGU6ICdub3JtYWwnXG4gICAgICBkZXNjcmliZSBcImN1cnNvciBpcyBvbiB0aGUgcGFpciBjaGFyXCIsIC0+XG4gICAgICAgIGNoZWNrID0gZ2V0Q2hlY2tGdW5jdGlvbkZvcihcImEgJ1wiKVxuICAgICAgICB0ZXh0ID0gXCItJysnLVwiXG4gICAgICAgIHRleHRGaW5hbCA9IFwiLS1cIlxuICAgICAgICBzZWxlY3RlZFRleHQgPSBcIicrJ1wiXG4gICAgICAgIG9wZW4gPSBbMCwgMV1cbiAgICAgICAgY2xvc2UgPSBbMCwgM11cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIHNldCB7dGV4dH1cbiAgICAgICAgaXQgXCJjYXNlLTEgbm9ybWFsXCIsIC0+IGNoZWNrIG9wZW4sICdkJywgdGV4dDogdGV4dEZpbmFsLCBjdXJzb3I6IFswLCAxXVxuICAgICAgICBpdCBcImNhc2UtMiBub3JtYWxcIiwgLT4gY2hlY2sgY2xvc2UsICdkJywgdGV4dDogdGV4dEZpbmFsLCBjdXJzb3I6IFswLCAxXVxuICAgICAgICBpdCBcImNhc2UtMyB2aXN1YWxcIiwgLT4gY2hlY2sgb3BlbiwgJ3YnLCB7c2VsZWN0ZWRUZXh0fVxuICAgICAgICBpdCBcImNhc2UtNCB2aXN1YWxcIiwgLT4gY2hlY2sgY2xvc2UsICd2Jywge3NlbGVjdGVkVGV4dH1cbiAgZGVzY3JpYmUgXCJCYWNrVGlja1wiLCAtPlxuICAgIG9yaWdpbmFsVGV4dCA9IFwidGhpcyBpcyBgc2FtcGxlYCB0ZXh0LlwiXG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgc2V0IHRleHQ6IG9yaWdpbmFsVGV4dCwgY3Vyc29yOiBbMCwgOV1cblxuICAgIGRlc2NyaWJlIFwiaW5uZXItYmFjay10aWNrXCIsIC0+XG4gICAgICBpdCBcImFwcGxpZXMgb3BlcmF0b3JzIGlubmVyLWFyZWFcIiwgLT5cbiAgICAgICAgZW5zdXJlIFwiZCBpIGBcIiwgdGV4dDogXCJ0aGlzIGlzIGBgIHRleHQuXCIsIGN1cnNvcjogWzAsIDldXG5cbiAgICAgIGl0IFwiZG8gbm90aGluZyB3aGVuIHBhaXIgcmFuZ2UgaXMgbm90IHVuZGVyIGN1cnNvclwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMCwgMTZdXG4gICAgICAgIGVuc3VyZSBcImQgaSBgXCIsIHRleHQ6IG9yaWdpbmFsVGV4dCwgY3Vyc29yOiBbMCwgMTZdXG4gICAgICBkZXNjcmliZSBcImN1cnNvciBpcyBvbiB0aGUgcGFpciBjaGFyXCIsIC0+XG4gICAgICAgIGNoZWNrID0gZ2V0Q2hlY2tGdW5jdGlvbkZvcignaSBgJylcbiAgICAgICAgdGV4dCA9ICctYCtgLSdcbiAgICAgICAgdGV4dEZpbmFsID0gJy1gYC0nXG4gICAgICAgIHNlbGVjdGVkVGV4dCA9ICcrJ1xuICAgICAgICBvcGVuID0gWzAsIDFdXG4gICAgICAgIGNsb3NlID0gWzAsIDNdXG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICBzZXQge3RleHR9XG4gICAgICAgIGl0IFwiY2FzZS0xIG5vcm1hbFwiLCAtPiBjaGVjayBvcGVuLCAnZCcsIHRleHQ6IHRleHRGaW5hbCwgY3Vyc29yOiBbMCwgMl1cbiAgICAgICAgaXQgXCJjYXNlLTIgbm9ybWFsXCIsIC0+IGNoZWNrIGNsb3NlLCAnZCcsIHRleHQ6IHRleHRGaW5hbCwgY3Vyc29yOiBbMCwgMl1cbiAgICAgICAgaXQgXCJjYXNlLTMgdmlzdWFsXCIsIC0+IGNoZWNrIG9wZW4sICd2Jywge3NlbGVjdGVkVGV4dH1cbiAgICAgICAgaXQgXCJjYXNlLTQgdmlzdWFsXCIsIC0+IGNoZWNrIGNsb3NlLCAndicsIHtzZWxlY3RlZFRleHR9XG4gICAgZGVzY3JpYmUgXCJhLWJhY2stdGlja1wiLCAtPlxuICAgICAgaXQgXCJhcHBsaWVzIG9wZXJhdG9ycyBpbm5lci1hcmVhXCIsIC0+XG4gICAgICAgIGVuc3VyZSBcImQgYSBgXCIsIHRleHQ6IFwidGhpcyBpcyAgdGV4dC5cIiwgY3Vyc29yOiBbMCwgOF1cblxuICAgICAgaXQgXCJkbyBub3RoaW5nIHdoZW4gcGFpciByYW5nZSBpcyBub3QgdW5kZXIgY3Vyc29yXCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFswLCAxNl1cbiAgICAgICAgZW5zdXJlIFwiZCBhIGBcIiwgdGV4dDogb3JpZ2luYWxUZXh0LCBjdXJzb3I6IFswLCAxNl1cbiAgICAgIGRlc2NyaWJlIFwiY3Vyc29yIGlzIG9uIHRoZSBwYWlyIGNoYXJcIiwgLT5cbiAgICAgICAgY2hlY2sgPSBnZXRDaGVja0Z1bmN0aW9uRm9yKFwiYSBgXCIpXG4gICAgICAgIHRleHQgPSBcIi1gK2AtXCJcbiAgICAgICAgdGV4dEZpbmFsID0gXCItLVwiXG4gICAgICAgIHNlbGVjdGVkVGV4dCA9IFwiYCtgXCJcbiAgICAgICAgb3BlbiA9IFswLCAxXVxuICAgICAgICBjbG9zZSA9IFswLCAzXVxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgc2V0IHt0ZXh0fVxuICAgICAgICBpdCBcImNhc2UtMSBub3JtYWxcIiwgLT4gY2hlY2sgb3BlbiwgJ2QnLCB0ZXh0OiB0ZXh0RmluYWwsIGN1cnNvcjogWzAsIDFdXG4gICAgICAgIGl0IFwiY2FzZS0yIG5vcm1hbFwiLCAtPiBjaGVjayBjbG9zZSwgJ2QnLCB0ZXh0OiB0ZXh0RmluYWwsIGN1cnNvcjogWzAsIDFdXG4gICAgICAgIGl0IFwiY2FzZS0zIHZpc3VhbFwiLCAtPiBjaGVjayBvcGVuLCAndicsIHtzZWxlY3RlZFRleHR9XG4gICAgICAgIGl0IFwiY2FzZS00IHZpc3VhbFwiLCAtPiBjaGVjayBjbG9zZSwgJ3YnLCB7c2VsZWN0ZWRUZXh0fVxuICBkZXNjcmliZSBcIkN1cmx5QnJhY2tldFwiLCAtPlxuICAgIGRlc2NyaWJlIFwic2NvcGUgYXdhcmVuZXNzIG9mIGJyYWNrZXRcIiwgLT5cbiAgICAgIGl0IFwiW3NlYXJjaCBmcm9tIG91dHNpZGUgb2YgZG91YmxlLXF1b3RlXSBza2lwcyBicmFja2V0IGluIHdpdGhpbi1saW5lLWJhbGFuY2VkLWRvdWJsZS1xdW90ZXNcIiwgLT5cbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgIHsgfCBcImhlbGxvIHtcIiB9XG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZSBcInYgYSB7XCIsXG4gICAgICAgICAgc2VsZWN0ZWRUZXh0OiBcIlwiXCJcbiAgICAgICAgICB7ICBcImhlbGxvIHtcIiB9XG4gICAgICAgICAgXCJcIlwiXG5cbiAgICAgIGl0IFwiTm90IGlnbm9yZSBicmFja2V0IGluIHdpdGhpbi1saW5lLW5vdC1iYWxhbmNlZC1kb3VibGUtcXVvdGVzXCIsIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICB7ICBcImhlbGxvIHtcIiB8ICdcIicgfVxuICAgICAgICAgIFwiXCJcIlxuICAgICAgICBlbnN1cmUgXCJ2IGEge1wiLFxuICAgICAgICAgIHNlbGVjdGVkVGV4dDogXCJcIlwiXG4gICAgICAgICAge1wiICAnXCInIH1cbiAgICAgICAgICBcIlwiXCJcbiAgICAgIGl0IFwiW3NlYXJjaCBmcm9tIGluc2lkZSBvZiBkb3VibGUtcXVvdGVdIHNraXBzIGJyYWNrZXQgaW4gd2l0aGluLWxpbmUtYmFsYW5jZWQtZG91YmxlLXF1b3Rlc1wiLCAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgeyAgXCJofGVsbG8ge1wiIH1cbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgZW5zdXJlIFwidiBhIHtcIixcbiAgICAgICAgICBzZWxlY3RlZFRleHQ6IFwiXCJcIlxuICAgICAgICAgIHsgIFwiaGVsbG8ge1wiIH1cbiAgICAgICAgICBcIlwiXCJcblxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0Q186IFwiXCJcIlxuXG4gICAgICAgICAgXCJcIlwiXG4gICAgZGVzY3JpYmUgXCJpbm5lci1jdXJseS1icmFja2V0XCIsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIHRleHQ6IFwieyBzb21ldGhpbmcgaW4gaGVyZSBhbmQgaW4ge2hlcmV9IH1cIlxuICAgICAgICAgIGN1cnNvcjogWzAsIDldXG5cbiAgICAgIGl0IFwiYXBwbGllcyBvcGVyYXRvcnMgdG8gaW5uZXItYXJlYSBpbiBvcGVyYXRvci1wZW5kaW5nIG1vZGVcIiwgLT5cbiAgICAgICAgZW5zdXJlICdkIGkgeycsXG4gICAgICAgICAgdGV4dDogXCJ7fVwiXG4gICAgICAgICAgY3Vyc29yOiBbMCwgMV1cblxuICAgICAgaXQgXCJhcHBsaWVzIG9wZXJhdG9ycyB0byBpbm5lci1hcmVhIGluIG9wZXJhdG9yLXBlbmRpbmcgbW9kZSAoc2Vjb25kIHRlc3QpXCIsIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIGN1cnNvcjogWzAsIDI5XVxuICAgICAgICBlbnN1cmUgJ2QgaSB7JyxcbiAgICAgICAgICB0ZXh0OiBcInsgc29tZXRoaW5nIGluIGhlcmUgYW5kIGluIHt9IH1cIlxuICAgICAgICAgIGN1cnNvcjogWzAsIDI4XVxuXG4gICAgICBkZXNjcmliZSBcImN1cnNvciBpcyBvbiB0aGUgcGFpciBjaGFyXCIsIC0+XG4gICAgICAgIGNoZWNrID0gZ2V0Q2hlY2tGdW5jdGlvbkZvcignaSB7JylcbiAgICAgICAgdGV4dCA9ICcteyt9LSdcbiAgICAgICAgdGV4dEZpbmFsID0gJy17fS0nXG4gICAgICAgIHNlbGVjdGVkVGV4dCA9ICcrJ1xuICAgICAgICBvcGVuID0gWzAsIDFdXG4gICAgICAgIGNsb3NlID0gWzAsIDNdXG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICBzZXQge3RleHR9XG4gICAgICAgIGl0IFwiY2FzZS0xIG5vcm1hbFwiLCAtPiBjaGVjayBvcGVuLCAgJ2QnLCB0ZXh0OiB0ZXh0RmluYWwsIGN1cnNvcjogWzAsIDJdXG4gICAgICAgIGl0IFwiY2FzZS0yIG5vcm1hbFwiLCAtPiBjaGVjayBjbG9zZSwgJ2QnLCB0ZXh0OiB0ZXh0RmluYWwsIGN1cnNvcjogWzAsIDJdXG4gICAgICAgIGl0IFwiY2FzZS0zIHZpc3VhbFwiLCAtPiBjaGVjayBvcGVuLCAgJ3YnLCB7c2VsZWN0ZWRUZXh0fVxuICAgICAgICBpdCBcImNhc2UtNCB2aXN1YWxcIiwgLT4gY2hlY2sgY2xvc2UsICd2Jywge3NlbGVjdGVkVGV4dH1cblxuICAgICAgZGVzY3JpYmUgXCJjaGFuZ2UgbW9kZSB0byBjaGFyYWN0ZXJ3aXNlXCIsIC0+XG4gICAgICAgICMgRklYTUUgbGFzdCBcIlxcblwiIHNob3VsZCBub3QgYmUgc2VsZWN0ZWRcbiAgICAgICAgdGV4dFNlbGVjdGVkID0gXCJcIlwiXG4gICAgICAgIF9fMSxcbiAgICAgICAgX18yLFxuICAgICAgICBfXzNcbiAgICAgICAgXCJcIlwiLnJlcGxhY2UoL18vZywgJyAnKVxuXG5cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIHNldFxuICAgICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB8MSxcbiAgICAgICAgICAgICAgMixcbiAgICAgICAgICAgICAgM1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgICAgZW5zdXJlIG51bGwsIG1vZGU6ICdub3JtYWwnXG5cbiAgICAgICAgaXQgXCJmcm9tIHZDLCBmaW5hbC1tb2RlIGlzICdjaGFyYWN0ZXJ3aXNlJ1wiLCAtPlxuICAgICAgICAgIGVuc3VyZSAndicsXG4gICAgICAgICAgICBzZWxlY3RlZFRleHQ6IFsnMSddXG4gICAgICAgICAgICBtb2RlOiBbJ3Zpc3VhbCcsICdjaGFyYWN0ZXJ3aXNlJ11cbiAgICAgICAgICBlbnN1cmUgJ2kgQicsXG4gICAgICAgICAgICBzZWxlY3RlZFRleHQ6IHRleHRTZWxlY3RlZFxuICAgICAgICAgICAgbW9kZTogWyd2aXN1YWwnLCAnY2hhcmFjdGVyd2lzZSddXG5cbiAgICAgICAgaXQgXCJmcm9tIHZMLCBmaW5hbC1tb2RlIGlzICdjaGFyYWN0ZXJ3aXNlJ1wiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnVicsXG4gICAgICAgICAgICBzZWxlY3RlZFRleHQ6IFtcIiAgMSxcXG5cIl1cbiAgICAgICAgICAgIG1vZGU6IFsndmlzdWFsJywgJ2xpbmV3aXNlJ11cbiAgICAgICAgICBlbnN1cmUgJ2kgQicsXG4gICAgICAgICAgICBzZWxlY3RlZFRleHQ6IHRleHRTZWxlY3RlZFxuICAgICAgICAgICAgbW9kZTogWyd2aXN1YWwnLCAnY2hhcmFjdGVyd2lzZSddXG5cbiAgICAgICAgaXQgXCJmcm9tIHZCLCBmaW5hbC1tb2RlIGlzICdjaGFyYWN0ZXJ3aXNlJ1wiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnY3RybC12JyxcbiAgICAgICAgICAgIHNlbGVjdGVkVGV4dDogW1wiMVwiXVxuICAgICAgICAgICAgbW9kZTogWyd2aXN1YWwnLCAnYmxvY2t3aXNlJ11cbiAgICAgICAgICBlbnN1cmUgJ2kgQicsXG4gICAgICAgICAgICBzZWxlY3RlZFRleHQ6IHRleHRTZWxlY3RlZFxuICAgICAgICAgICAgbW9kZTogWyd2aXN1YWwnLCAnY2hhcmFjdGVyd2lzZSddXG5cbiAgICAgICAgZGVzY3JpYmUgXCJhcyBvcGVyYXRvciB0YXJnZXRcIiwgLT5cbiAgICAgICAgICBpdCBcImNoYW5nZSBpbm5lci1wYWlyXCIsIC0+XG4gICAgICAgICAgICBlbnN1cmUgXCJjIGkgQlwiLFxuICAgICAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgfFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgICAgICBtb2RlOiAnaW5zZXJ0J1xuICAgICAgICAgIGl0IFwiZGVsZXRlIGlubmVyLXBhaXJcIiwgLT5cbiAgICAgICAgICAgIGVuc3VyZSBcImQgaSBCXCIsXG4gICAgICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICB8fVxuICAgICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCdcblxuICAgIGRlc2NyaWJlIFwiYS1jdXJseS1icmFja2V0XCIsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIHRleHQ6IFwieyBzb21ldGhpbmcgaW4gaGVyZSBhbmQgaW4ge2hlcmV9IH1cIlxuICAgICAgICAgIGN1cnNvcjogWzAsIDldXG5cbiAgICAgIGl0IFwiYXBwbGllcyBvcGVyYXRvcnMgdG8gYS1hcmVhIGluIG9wZXJhdG9yLXBlbmRpbmcgbW9kZVwiLCAtPlxuICAgICAgICBlbnN1cmUgJ2QgYSB7JyxcbiAgICAgICAgICB0ZXh0OiAnJ1xuICAgICAgICAgIGN1cnNvcjogWzAsIDBdXG4gICAgICAgICAgbW9kZTogJ25vcm1hbCdcblxuICAgICAgaXQgXCJhcHBsaWVzIG9wZXJhdG9ycyB0byBhLWFyZWEgaW4gb3BlcmF0b3ItcGVuZGluZyBtb2RlIChzZWNvbmQgdGVzdClcIiwgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzAsIDI5XVxuICAgICAgICBlbnN1cmUgJ2QgYSB7JyxcbiAgICAgICAgICB0ZXh0OiBcInsgc29tZXRoaW5nIGluIGhlcmUgYW5kIGluICB9XCJcbiAgICAgICAgICBjdXJzb3I6IFswLCAyN11cbiAgICAgICAgICBtb2RlOiAnbm9ybWFsJ1xuICAgICAgZGVzY3JpYmUgXCJjdXJzb3IgaXMgb24gdGhlIHBhaXIgY2hhclwiLCAtPlxuICAgICAgICBjaGVjayA9IGdldENoZWNrRnVuY3Rpb25Gb3IoXCJhIHtcIilcbiAgICAgICAgdGV4dCA9IFwiLXsrfS1cIlxuICAgICAgICB0ZXh0RmluYWwgPSBcIi0tXCJcbiAgICAgICAgc2VsZWN0ZWRUZXh0ID0gXCJ7K31cIlxuICAgICAgICBvcGVuID0gWzAsIDFdXG4gICAgICAgIGNsb3NlID0gWzAsIDNdXG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICBzZXQge3RleHR9XG4gICAgICAgIGl0IFwiY2FzZS0xIG5vcm1hbFwiLCAtPiBjaGVjayBvcGVuLCAgJ2QnLCB0ZXh0OiB0ZXh0RmluYWwsIGN1cnNvcjogWzAsIDFdXG4gICAgICAgIGl0IFwiY2FzZS0yIG5vcm1hbFwiLCAtPiBjaGVjayBjbG9zZSwgJ2QnLCB0ZXh0OiB0ZXh0RmluYWwsIGN1cnNvcjogWzAsIDFdXG4gICAgICAgIGl0IFwiY2FzZS0zIHZpc3VhbFwiLCAtPiBjaGVjayBvcGVuLCAgJ3YnLCB7c2VsZWN0ZWRUZXh0fVxuICAgICAgICBpdCBcImNhc2UtNCB2aXN1YWxcIiwgLT4gY2hlY2sgY2xvc2UsICd2Jywge3NlbGVjdGVkVGV4dH1cblxuICAgICAgZGVzY3JpYmUgXCJjaGFuZ2UgbW9kZSB0byBjaGFyYWN0ZXJ3aXNlXCIsIC0+XG4gICAgICAgIHRleHRTZWxlY3RlZCA9IFwiXCJcIlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAyLFxuICAgICAgICAgICAgM1xuICAgICAgICAgIH1cbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIHNldFxuICAgICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB8MSxcbiAgICAgICAgICAgICAgMixcbiAgICAgICAgICAgICAgM1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBoZWxsb1xuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgICAgZW5zdXJlIG51bGwsIG1vZGU6ICdub3JtYWwnXG5cbiAgICAgICAgaXQgXCJmcm9tIHZDLCBmaW5hbC1tb2RlIGlzICdjaGFyYWN0ZXJ3aXNlJ1wiLCAtPlxuICAgICAgICAgIGVuc3VyZSAndicsXG4gICAgICAgICAgICBzZWxlY3RlZFRleHQ6IFsnMSddXG4gICAgICAgICAgICBtb2RlOiBbJ3Zpc3VhbCcsICdjaGFyYWN0ZXJ3aXNlJ11cbiAgICAgICAgICBlbnN1cmUgJ2EgQicsXG4gICAgICAgICAgICBzZWxlY3RlZFRleHQ6IHRleHRTZWxlY3RlZFxuICAgICAgICAgICAgbW9kZTogWyd2aXN1YWwnLCAnY2hhcmFjdGVyd2lzZSddXG5cbiAgICAgICAgaXQgXCJmcm9tIHZMLCBmaW5hbC1tb2RlIGlzICdjaGFyYWN0ZXJ3aXNlJ1wiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnVicsXG4gICAgICAgICAgICBzZWxlY3RlZFRleHQ6IFtcIiAgMSxcXG5cIl1cbiAgICAgICAgICAgIG1vZGU6IFsndmlzdWFsJywgJ2xpbmV3aXNlJ11cbiAgICAgICAgICBlbnN1cmUgJ2EgQicsXG4gICAgICAgICAgICBzZWxlY3RlZFRleHQ6IHRleHRTZWxlY3RlZFxuICAgICAgICAgICAgbW9kZTogWyd2aXN1YWwnLCAnY2hhcmFjdGVyd2lzZSddXG5cbiAgICAgICAgaXQgXCJmcm9tIHZCLCBmaW5hbC1tb2RlIGlzICdjaGFyYWN0ZXJ3aXNlJ1wiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnY3RybC12JyxcbiAgICAgICAgICAgIHNlbGVjdGVkVGV4dDogW1wiMVwiXVxuICAgICAgICAgICAgbW9kZTogWyd2aXN1YWwnLCAnYmxvY2t3aXNlJ11cbiAgICAgICAgICBlbnN1cmUgJ2EgQicsXG4gICAgICAgICAgICBzZWxlY3RlZFRleHQ6IHRleHRTZWxlY3RlZFxuICAgICAgICAgICAgbW9kZTogWyd2aXN1YWwnLCAnY2hhcmFjdGVyd2lzZSddXG5cbiAgICAgICAgZGVzY3JpYmUgXCJhcyBvcGVyYXRvciB0YXJnZXRcIiwgLT5cbiAgICAgICAgICBpdCBcImNoYW5nZSBpbm5lci1wYWlyXCIsIC0+XG4gICAgICAgICAgICBlbnN1cmUgXCJjIGEgQlwiLFxuICAgICAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgICAgIHxcblxuICAgICAgICAgICAgICBoZWxsb1xuICAgICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgICAgICAgbW9kZTogJ2luc2VydCdcbiAgICAgICAgICBpdCBcImRlbGV0ZSBpbm5lci1wYWlyXCIsIC0+XG4gICAgICAgICAgICBlbnN1cmUgXCJkIGEgQlwiLFxuICAgICAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgICAgIHxcblxuICAgICAgICAgICAgICBoZWxsb1xuICAgICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgICAgICAgbW9kZTogJ25vcm1hbCdcblxuXG4gIGRlc2NyaWJlIFwiQW5nbGVCcmFja2V0XCIsIC0+XG4gICAgZGVzY3JpYmUgXCJpbm5lci1hbmdsZS1icmFja2V0XCIsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIHRleHQ6IFwiPCBzb21ldGhpbmcgaW4gaGVyZSBhbmQgaW4gPGhlcmU+ID5cIlxuICAgICAgICAgIGN1cnNvcjogWzAsIDldXG5cbiAgICAgIGl0IFwiYXBwbGllcyBvcGVyYXRvcnMgaW5zaWRlIHRoZSBjdXJyZW50IHdvcmQgaW4gb3BlcmF0b3ItcGVuZGluZyBtb2RlXCIsIC0+XG4gICAgICAgIGVuc3VyZSAnZCBpIDwnLFxuICAgICAgICAgIHRleHQ6IFwiPD5cIlxuICAgICAgICAgIGN1cnNvcjogWzAsIDFdXG5cbiAgICAgIGl0IFwiYXBwbGllcyBvcGVyYXRvcnMgaW5zaWRlIHRoZSBjdXJyZW50IHdvcmQgaW4gb3BlcmF0b3ItcGVuZGluZyBtb2RlIChzZWNvbmQgdGVzdClcIiwgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzAsIDI5XVxuICAgICAgICBlbnN1cmUgJ2QgaSA8JyxcbiAgICAgICAgICB0ZXh0OiBcIjwgc29tZXRoaW5nIGluIGhlcmUgYW5kIGluIDw+ID5cIlxuICAgICAgICAgIGN1cnNvcjogWzAsIDI4XVxuICAgICAgZGVzY3JpYmUgXCJjdXJzb3IgaXMgb24gdGhlIHBhaXIgY2hhclwiLCAtPlxuICAgICAgICBjaGVjayA9IGdldENoZWNrRnVuY3Rpb25Gb3IoJ2kgPCcpXG4gICAgICAgIHRleHQgPSAnLTwrPi0nXG4gICAgICAgIHRleHRGaW5hbCA9ICctPD4tJ1xuICAgICAgICBzZWxlY3RlZFRleHQgPSAnKydcbiAgICAgICAgb3BlbiA9IFswLCAxXVxuICAgICAgICBjbG9zZSA9IFswLCAzXVxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgc2V0IHt0ZXh0fVxuICAgICAgICBpdCBcImNhc2UtMSBub3JtYWxcIiwgLT4gY2hlY2sgb3BlbiwgICdkJywgdGV4dDogdGV4dEZpbmFsLCBjdXJzb3I6IFswLCAyXVxuICAgICAgICBpdCBcImNhc2UtMiBub3JtYWxcIiwgLT4gY2hlY2sgY2xvc2UsICdkJywgdGV4dDogdGV4dEZpbmFsLCBjdXJzb3I6IFswLCAyXVxuICAgICAgICBpdCBcImNhc2UtMyB2aXN1YWxcIiwgLT4gY2hlY2sgb3BlbiwgICd2Jywge3NlbGVjdGVkVGV4dH1cbiAgICAgICAgaXQgXCJjYXNlLTQgdmlzdWFsXCIsIC0+IGNoZWNrIGNsb3NlLCAndicsIHtzZWxlY3RlZFRleHR9XG4gICAgZGVzY3JpYmUgXCJhLWFuZ2xlLWJyYWNrZXRcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dDogXCI8IHNvbWV0aGluZyBpbiBoZXJlIGFuZCBpbiA8aGVyZT4gPlwiXG4gICAgICAgICAgY3Vyc29yOiBbMCwgOV1cblxuICAgICAgaXQgXCJhcHBsaWVzIG9wZXJhdG9ycyBhcm91bmQgdGhlIGN1cnJlbnQgYW5nbGUgYnJhY2tldHMgaW4gb3BlcmF0b3ItcGVuZGluZyBtb2RlXCIsIC0+XG4gICAgICAgIGVuc3VyZSAnZCBhIDwnLFxuICAgICAgICAgIHRleHQ6ICcnXG4gICAgICAgICAgY3Vyc29yOiBbMCwgMF1cbiAgICAgICAgICBtb2RlOiAnbm9ybWFsJ1xuXG4gICAgICBpdCBcImFwcGxpZXMgb3BlcmF0b3JzIGFyb3VuZCB0aGUgY3VycmVudCBhbmdsZSBicmFja2V0cyBpbiBvcGVyYXRvci1wZW5kaW5nIG1vZGUgKHNlY29uZCB0ZXN0KVwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMCwgMjldXG4gICAgICAgIGVuc3VyZSAnZCBhIDwnLFxuICAgICAgICAgIHRleHQ6IFwiPCBzb21ldGhpbmcgaW4gaGVyZSBhbmQgaW4gID5cIlxuICAgICAgICAgIGN1cnNvcjogWzAsIDI3XVxuICAgICAgICAgIG1vZGU6ICdub3JtYWwnXG4gICAgICBkZXNjcmliZSBcImN1cnNvciBpcyBvbiB0aGUgcGFpciBjaGFyXCIsIC0+XG4gICAgICAgIGNoZWNrID0gZ2V0Q2hlY2tGdW5jdGlvbkZvcihcImEgPFwiKVxuICAgICAgICB0ZXh0ID0gXCItPCs+LVwiXG4gICAgICAgIHRleHRGaW5hbCA9IFwiLS1cIlxuICAgICAgICBzZWxlY3RlZFRleHQgPSBcIjwrPlwiXG4gICAgICAgIG9wZW4gPSBbMCwgMV1cbiAgICAgICAgY2xvc2UgPSBbMCwgM11cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIHNldCB7dGV4dH1cbiAgICAgICAgaXQgXCJjYXNlLTEgbm9ybWFsXCIsIC0+IGNoZWNrIG9wZW4sICAnZCcsIHRleHQ6IHRleHRGaW5hbCwgY3Vyc29yOiBbMCwgMV1cbiAgICAgICAgaXQgXCJjYXNlLTIgbm9ybWFsXCIsIC0+IGNoZWNrIGNsb3NlLCAnZCcsIHRleHQ6IHRleHRGaW5hbCwgY3Vyc29yOiBbMCwgMV1cbiAgICAgICAgaXQgXCJjYXNlLTMgdmlzdWFsXCIsIC0+IGNoZWNrIG9wZW4sICAndicsIHtzZWxlY3RlZFRleHR9XG4gICAgICAgIGl0IFwiY2FzZS00IHZpc3VhbFwiLCAtPiBjaGVjayBjbG9zZSwgJ3YnLCB7c2VsZWN0ZWRUZXh0fVxuXG4gIGRlc2NyaWJlIFwiQWxsb3dGb3J3YXJkaW5nIGZhbWlseVwiLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIGF0b20ua2V5bWFwcy5hZGQgXCJ0ZXN0XCIsXG4gICAgICAgICdhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXMub3BlcmF0b3ItcGVuZGluZy1tb2RlLCBhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXMudmlzdWFsLW1vZGUnOlxuICAgICAgICAgICdpIH0nOiAndmltLW1vZGUtcGx1czppbm5lci1jdXJseS1icmFja2V0LWFsbG93LWZvcndhcmRpbmcnXG4gICAgICAgICAgJ2kgPic6ICd2aW0tbW9kZS1wbHVzOmlubmVyLWFuZ2xlLWJyYWNrZXQtYWxsb3ctZm9yd2FyZGluZydcbiAgICAgICAgICAnaSBdJzogJ3ZpbS1tb2RlLXBsdXM6aW5uZXItc3F1YXJlLWJyYWNrZXQtYWxsb3ctZm9yd2FyZGluZydcbiAgICAgICAgICAnaSApJzogJ3ZpbS1tb2RlLXBsdXM6aW5uZXItcGFyZW50aGVzaXMtYWxsb3ctZm9yd2FyZGluZydcblxuICAgICAgICAgICdhIH0nOiAndmltLW1vZGUtcGx1czphLWN1cmx5LWJyYWNrZXQtYWxsb3ctZm9yd2FyZGluZydcbiAgICAgICAgICAnYSA+JzogJ3ZpbS1tb2RlLXBsdXM6YS1hbmdsZS1icmFja2V0LWFsbG93LWZvcndhcmRpbmcnXG4gICAgICAgICAgJ2EgXSc6ICd2aW0tbW9kZS1wbHVzOmEtc3F1YXJlLWJyYWNrZXQtYWxsb3ctZm9yd2FyZGluZydcbiAgICAgICAgICAnYSApJzogJ3ZpbS1tb2RlLXBsdXM6YS1wYXJlbnRoZXNpcy1hbGxvdy1mb3J3YXJkaW5nJ1xuXG4gICAgICBzZXRcbiAgICAgICAgdGV4dDogXCJcIlwiXG4gICAgICAgIF9fezAwMH1fX1xuICAgICAgICBfXzwxMTE+X19cbiAgICAgICAgX19bMjIyXV9fXG4gICAgICAgIF9fKDMzMylfX1xuICAgICAgICBcIlwiXCJcbiAgICBkZXNjcmliZSBcImlubmVyXCIsIC0+XG4gICAgICBpdCBcInNlbGVjdCBmb3J3YXJkaW5nIHJhbmdlXCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFswLCAwXTsgZW5zdXJlICdlc2NhcGUgdiBpIH0nLCBzZWxlY3RlZFRleHQ6IFwiMDAwXCJcbiAgICAgICAgc2V0IGN1cnNvcjogWzEsIDBdOyBlbnN1cmUgJ2VzY2FwZSB2IGkgPicsIHNlbGVjdGVkVGV4dDogXCIxMTFcIlxuICAgICAgICBzZXQgY3Vyc29yOiBbMiwgMF07IGVuc3VyZSAnZXNjYXBlIHYgaSBdJywgc2VsZWN0ZWRUZXh0OiBcIjIyMlwiXG4gICAgICAgIHNldCBjdXJzb3I6IFszLCAwXTsgZW5zdXJlICdlc2NhcGUgdiBpICknLCBzZWxlY3RlZFRleHQ6IFwiMzMzXCJcbiAgICBkZXNjcmliZSBcImFcIiwgLT5cbiAgICAgIGl0IFwic2VsZWN0IGZvcndhcmRpbmcgcmFuZ2VcIiwgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzAsIDBdOyBlbnN1cmUgJ2VzY2FwZSB2IGEgfScsIHNlbGVjdGVkVGV4dDogXCJ7MDAwfVwiXG4gICAgICAgIHNldCBjdXJzb3I6IFsxLCAwXTsgZW5zdXJlICdlc2NhcGUgdiBhID4nLCBzZWxlY3RlZFRleHQ6IFwiPDExMT5cIlxuICAgICAgICBzZXQgY3Vyc29yOiBbMiwgMF07IGVuc3VyZSAnZXNjYXBlIHYgYSBdJywgc2VsZWN0ZWRUZXh0OiBcIlsyMjJdXCJcbiAgICAgICAgc2V0IGN1cnNvcjogWzMsIDBdOyBlbnN1cmUgJ2VzY2FwZSB2IGEgKScsIHNlbGVjdGVkVGV4dDogXCIoMzMzKVwiXG4gICAgZGVzY3JpYmUgXCJtdWx0aSBsaW5lIHRleHRcIiwgLT5cbiAgICAgIFt0ZXh0T25lSW5uZXIsIHRleHRPbmVBXSA9IFtdXG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIHRleHQ6IFwiXCJcIlxuICAgICAgICAgIDAwMFxuICAgICAgICAgIDAwMHsxMVxuICAgICAgICAgIDExMXsyMn1cbiAgICAgICAgICAxMTFcbiAgICAgICAgICAxMTF9XG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgIHRleHRPbmVJbm5lciA9IFwiXCJcIlxuICAgICAgICAgIDExXG4gICAgICAgICAgMTExezIyfVxuICAgICAgICAgIDExMVxuICAgICAgICAgIDExMVxuICAgICAgICAgIFwiXCJcIlxuICAgICAgICB0ZXh0T25lQSA9IFwiXCJcIlxuICAgICAgICAgIHsxMVxuICAgICAgICAgIDExMXsyMn1cbiAgICAgICAgICAxMTFcbiAgICAgICAgICAxMTF9XG4gICAgICAgICAgXCJcIlwiXG4gICAgICBkZXNjcmliZSBcImZvcndhcmRpbmcgaW5uZXJcIiwgLT5cbiAgICAgICAgaXQgXCJzZWxlY3QgZm9yd2FyZGluZyByYW5nZVwiLCAtPiAgICAgICAgICAgc2V0IGN1cnNvcjogWzEsIDBdOyBlbnN1cmUgXCJ2IGkgfVwiLCBzZWxlY3RlZFRleHQ6IHRleHRPbmVJbm5lclxuICAgICAgICBpdCBcInNlbGVjdCBmb3J3YXJkaW5nIHJhbmdlXCIsIC0+ICAgICAgICAgICBzZXQgY3Vyc29yOiBbMiwgMF07IGVuc3VyZSBcInYgaSB9XCIsIHNlbGVjdGVkVGV4dDogXCIyMlwiXG4gICAgICAgIGl0IFwiW2MxXSBubyBmd2Qgb3BlbiwgZmFpbCB0byBmaW5kXCIsIC0+ICAgIHNldCBjdXJzb3I6IFswLCAwXTsgZW5zdXJlIFwidiBpIH1cIiwgc2VsZWN0ZWRUZXh0OiAnMCcsIGN1cnNvcjogWzAsIDFdXG4gICAgICAgIGl0IFwiW2MyXSBubyBmd2Qgb3Blbiwgc2VsZWN0IGVuY2xvc2VkXCIsIC0+IHNldCBjdXJzb3I6IFsxLCA0XTsgZW5zdXJlIFwidiBpIH1cIiwgc2VsZWN0ZWRUZXh0OiB0ZXh0T25lSW5uZXJcbiAgICAgICAgaXQgXCJbYzNdIG5vIGZ3ZCBvcGVuLCBzZWxlY3QgZW5jbG9zZWRcIiwgLT4gc2V0IGN1cnNvcjogWzMsIDBdOyBlbnN1cmUgXCJ2IGkgfVwiLCBzZWxlY3RlZFRleHQ6IHRleHRPbmVJbm5lclxuICAgICAgICBpdCBcIltjM10gbm8gZndkIG9wZW4sIHNlbGVjdCBlbmNsb3NlZFwiLCAtPiBzZXQgY3Vyc29yOiBbNCwgMF07IGVuc3VyZSBcInYgaSB9XCIsIHNlbGVjdGVkVGV4dDogdGV4dE9uZUlubmVyXG4gICAgICBkZXNjcmliZSBcImZvcndhcmRpbmcgYVwiLCAtPlxuICAgICAgICBpdCBcInNlbGVjdCBmb3J3YXJkaW5nIHJhbmdlXCIsIC0+ICAgICAgICAgICBzZXQgY3Vyc29yOiBbMSwgMF07IGVuc3VyZSBcInYgYSB9XCIsIHNlbGVjdGVkVGV4dDogdGV4dE9uZUFcbiAgICAgICAgaXQgXCJzZWxlY3QgZm9yd2FyZGluZyByYW5nZVwiLCAtPiAgICAgICAgICAgc2V0IGN1cnNvcjogWzIsIDBdOyBlbnN1cmUgXCJ2IGEgfVwiLCBzZWxlY3RlZFRleHQ6IFwiezIyfVwiXG4gICAgICAgIGl0IFwiW2MxXSBubyBmd2Qgb3BlbiwgZmFpbCB0byBmaW5kXCIsIC0+ICAgIHNldCBjdXJzb3I6IFswLCAwXTsgZW5zdXJlIFwidiBhIH1cIiwgc2VsZWN0ZWRUZXh0OiAnMCcsIGN1cnNvcjogWzAsIDFdXG4gICAgICAgIGl0IFwiW2MyXSBubyBmd2Qgb3Blbiwgc2VsZWN0IGVuY2xvc2VkXCIsIC0+IHNldCBjdXJzb3I6IFsxLCA0XTsgZW5zdXJlIFwidiBhIH1cIiwgc2VsZWN0ZWRUZXh0OiB0ZXh0T25lQVxuICAgICAgICBpdCBcIltjM10gbm8gZndkIG9wZW4sIHNlbGVjdCBlbmNsb3NlZFwiLCAtPiBzZXQgY3Vyc29yOiBbMywgMF07IGVuc3VyZSBcInYgYSB9XCIsIHNlbGVjdGVkVGV4dDogdGV4dE9uZUFcbiAgICAgICAgaXQgXCJbYzNdIG5vIGZ3ZCBvcGVuLCBzZWxlY3QgZW5jbG9zZWRcIiwgLT4gc2V0IGN1cnNvcjogWzQsIDBdOyBlbnN1cmUgXCJ2IGEgfVwiLCBzZWxlY3RlZFRleHQ6IHRleHRPbmVBXG5cbiAgZGVzY3JpYmUgXCJBbnlQYWlyQWxsb3dGb3J3YXJkaW5nXCIsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgYXRvbS5rZXltYXBzLmFkZCBcInRleHRcIixcbiAgICAgICAgJ2F0b20tdGV4dC1lZGl0b3IudmltLW1vZGUtcGx1cy5vcGVyYXRvci1wZW5kaW5nLW1vZGUsIGF0b20tdGV4dC1lZGl0b3IudmltLW1vZGUtcGx1cy52aXN1YWwtbW9kZSc6XG4gICAgICAgICAgXCI7XCI6ICd2aW0tbW9kZS1wbHVzOmlubmVyLWFueS1wYWlyLWFsbG93LWZvcndhcmRpbmcnXG4gICAgICAgICAgXCI6XCI6ICd2aW0tbW9kZS1wbHVzOmEtYW55LXBhaXItYWxsb3ctZm9yd2FyZGluZydcblxuICAgICAgc2V0IHRleHQ6IFwiXCJcIlxuICAgICAgICAwMFxuICAgICAgICAwMFsxMVxuICAgICAgICAxMVwiMjIyXCIxMXszMzN9MTEoXG4gICAgICAgIDQ0NCgpNDQ0XG4gICAgICAgIClcbiAgICAgICAgMTExXTAwezU1NX1cbiAgICAgICAgXCJcIlwiXG4gICAgZGVzY3JpYmUgXCJpbm5lclwiLCAtPlxuICAgICAgaXQgXCJzZWxlY3QgZm9yd2FyZGluZyByYW5nZSB3aXRoaW4gZW5jbG9zZWQgcmFuZ2UoaWYgZXhpc3RzKVwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMiwgMF1cbiAgICAgICAgZW5zdXJlICd2J1xuICAgICAgICBlbnN1cmUgJzsnLCBzZWxlY3RlZFRleHQ6IFwiMjIyXCJcbiAgICAgICAgZW5zdXJlICc7Jywgc2VsZWN0ZWRUZXh0OiBcIjMzM1wiXG4gICAgICAgIGVuc3VyZSAnOycsIHNlbGVjdGVkVGV4dDogXCI0NDQoKTQ0NFwiXG4gICAgZGVzY3JpYmUgXCJhXCIsIC0+XG4gICAgICBpdCBcInNlbGVjdCBmb3J3YXJkaW5nIHJhbmdlIHdpdGhpbiBlbmNsb3NlZCByYW5nZShpZiBleGlzdHMpXCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFsyLCAwXVxuICAgICAgICBlbnN1cmUgJ3YnXG4gICAgICAgIGVuc3VyZSAnOicsIHNlbGVjdGVkVGV4dDogJ1wiMjIyXCInXG4gICAgICAgIGVuc3VyZSAnOicsIHNlbGVjdGVkVGV4dDogXCJ7MzMzfVwiXG4gICAgICAgIGVuc3VyZSAnOicsIHNlbGVjdGVkVGV4dDogXCIoXFxuNDQ0KCk0NDRcXG4pXCJcbiAgICAgICAgZW5zdXJlICc6Jywgc2VsZWN0ZWRUZXh0OiBcIlwiXCJcbiAgICAgICAgWzExXG4gICAgICAgIDExXCIyMjJcIjExezMzM30xMShcbiAgICAgICAgNDQ0KCk0NDRcbiAgICAgICAgKVxuICAgICAgICAxMTFdXG4gICAgICAgIFwiXCJcIlxuXG4gIGRlc2NyaWJlIFwiVGFnXCIsIC0+XG4gICAgW2Vuc3VyZVNlbGVjdGVkVGV4dF0gPSBbXVxuICAgIGVuc3VyZVNlbGVjdGVkVGV4dCA9IChzdGFydCwga2V5c3Ryb2tlLCBzZWxlY3RlZFRleHQpIC0+XG4gICAgICBzZXQgY3Vyc29yOiBzdGFydFxuICAgICAgZW5zdXJlIGtleXN0cm9rZSwge3NlbGVjdGVkVGV4dH1cblxuICAgIGRlc2NyaWJlIFwiaW5uZXItdGFnXCIsIC0+XG4gICAgICBkZXNjcmliZSBcInByZWNpc2VseSBzZWxlY3QgaW5uZXJcIiwgLT5cbiAgICAgICAgY2hlY2sgPSBnZXRDaGVja0Z1bmN0aW9uRm9yKCdpIHQnKVxuICAgICAgICB0ZXh0ID0gXCJcIlwiXG4gICAgICAgICAgPGFiYz5cbiAgICAgICAgICAgIDx0aXRsZT5USVRMRTwvdGl0bGU+XG4gICAgICAgICAgPC9hYmM+XG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgIHNlbGVjdGVkVGV4dCA9IFwiVElUTEVcIlxuICAgICAgICBpbm5lckFCQyA9IFwiXFxuICA8dGl0bGU+VElUTEU8L3RpdGxlPlxcblwiXG4gICAgICAgIHRleHRBZnRlckRlbGV0ZWQgPSBcIlwiXCJcbiAgICAgICAgICA8YWJjPlxuICAgICAgICAgICAgPHRpdGxlPjwvdGl0bGU+XG4gICAgICAgICAgPC9hYmM+XG4gICAgICAgICAgXCJcIlwiXG5cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIHNldCB7dGV4dH1cblxuICAgICAgICAjIFNlbGVjdFxuICAgICAgICBpdCBcIlsxXSBmb3J3YXJkaW5nXCIsICAgICAgICAgLT4gY2hlY2sgWzEsICAwXSwgICd2Jywge3NlbGVjdGVkVGV4dH1cbiAgICAgICAgaXQgXCJbMl0gb3BlblRhZyBsZWZ0bW9zdFwiLCAgIC0+IGNoZWNrIFsxLCAgMl0sICAndicsIHtzZWxlY3RlZFRleHR9XG4gICAgICAgIGl0IFwiWzNdIG9wZW5UYWcgcmlnaHRtb3N0XCIsICAtPiBjaGVjayBbMSwgIDhdLCAgJ3YnLCB7c2VsZWN0ZWRUZXh0fVxuICAgICAgICBpdCBcIls0XSBJbm5lciB0ZXh0XCIsICAgICAgICAgLT4gY2hlY2sgWzEsICAxMF0sICd2Jywge3NlbGVjdGVkVGV4dH1cbiAgICAgICAgaXQgXCJbNV0gY2xvc2VUYWcgbGVmdG1vc3RcIiwgIC0+IGNoZWNrIFsxLCAgMTRdLCAndicsIHtzZWxlY3RlZFRleHR9XG4gICAgICAgIGl0IFwiWzZdIGNsb3NlVGFnIHJpZ2h0bW9zdFwiLCAtPiBjaGVjayBbMSwgIDIxXSwgJ3YnLCB7c2VsZWN0ZWRUZXh0fVxuICAgICAgICBpdCBcIls3XSByaWdodCBvZiBjbG9zZVRhZ1wiLCAgLT4gY2hlY2sgWzIsICAwXSwgICd2Jywge3NlbGVjdGVkVGV4dDogaW5uZXJBQkN9XG5cbiAgICAgICAgIyBEZWxldGVcbiAgICAgICAgaXQgXCJbOF0gZm9yd2FyZGluZ1wiLCAgICAgICAgICAtPiBjaGVjayBbMSwgMF0sICAnZCcsIHt0ZXh0OiB0ZXh0QWZ0ZXJEZWxldGVkfVxuICAgICAgICBpdCBcIls5XSBvcGVuVGFnIGxlZnRtb3N0XCIsICAgIC0+IGNoZWNrIFsxLCAyXSwgICdkJywge3RleHQ6IHRleHRBZnRlckRlbGV0ZWR9XG4gICAgICAgIGl0IFwiWzEwXSBvcGVuVGFnIHJpZ2h0bW9zdFwiLCAgLT4gY2hlY2sgWzEsIDhdLCAgJ2QnLCB7dGV4dDogdGV4dEFmdGVyRGVsZXRlZH1cbiAgICAgICAgaXQgXCJbMTFdIElubmVyIHRleHRcIiwgICAgICAgICAtPiBjaGVjayBbMSwgMTBdLCAnZCcsIHt0ZXh0OiB0ZXh0QWZ0ZXJEZWxldGVkfVxuICAgICAgICBpdCBcIlsxMl0gY2xvc2VUYWcgbGVmdG1vc3RcIiwgIC0+IGNoZWNrIFsxLCAxNF0sICdkJywge3RleHQ6IHRleHRBZnRlckRlbGV0ZWR9XG4gICAgICAgIGl0IFwiWzEzXSBjbG9zZVRhZyByaWdodG1vc3RcIiwgLT4gY2hlY2sgWzEsIDIxXSwgJ2QnLCB7dGV4dDogdGV4dEFmdGVyRGVsZXRlZH1cbiAgICAgICAgaXQgXCJbMTRdIHJpZ2h0IG9mIGNsb3NlVGFnXCIsICAtPiBjaGVjayBbMiwgMF0sICAnZCcsIHt0ZXh0OiBcIjxhYmM+PC9hYmM+XCJ9XG5cbiAgICAgIGRlc2NyaWJlIFwiZXhwYW5zaW9uIGFuZCBkZWxldGlvblwiLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgIyBbTk9URV0gSW50ZW50aW9uYWxseSBvbWl0IGAhYCBwcmVmaXggb2YgRE9DVFlQRSBzaW5jZSBpdCByZXByZXNlbnQgbGFzdCBjdXJzb3IgaW4gdGV4dEMuXG4gICAgICAgICAgaHRtbExpa2VUZXh0ID0gXCJcIlwiXG4gICAgICAgICAgPERPQ1RZUEUgaHRtbD5cbiAgICAgICAgICA8aHRtbCBsYW5nPVwiZW5cIj5cbiAgICAgICAgICA8aGVhZD5cbiAgICAgICAgICBfXzxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiIC8+XG4gICAgICAgICAgX188dGl0bGU+RG9jdW1lbnQ8L3RpdGxlPlxuICAgICAgICAgIDwvaGVhZD5cbiAgICAgICAgICA8Ym9keT5cbiAgICAgICAgICBfXzxkaXY+XG4gICAgICAgICAgX19fXzxkaXY+XG4gICAgICAgICAgfF9fX19fXzxkaXY+XG4gICAgICAgICAgX19fX19fX188cD48YT5cbiAgICAgICAgICBfX19fX188L2Rpdj5cbiAgICAgICAgICBfX19fPC9kaXY+XG4gICAgICAgICAgX188L2Rpdj5cbiAgICAgICAgICA8L2JvZHk+XG4gICAgICAgICAgPC9odG1sPlxcblxuICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgIHNldCB0ZXh0Q186IGh0bWxMaWtlVGV4dFxuXG4gICAgICAgIGl0IFwiY2FuIGV4cGFuZCBzZWxlY3Rpb24gd2hlbiByZXBlYXRlZFwiLCAtPlxuICAgICAgICAgIGVuc3VyZSAndiBpIHQnLCBzZWxlY3RlZFRleHRfOiBcIlwiXCJcbiAgICAgICAgICAgIFxcbl9fX19fX19fPHA+PGE+XG4gICAgICAgICAgICBfX19fX19cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgIGVuc3VyZSAnaSB0Jywgc2VsZWN0ZWRUZXh0XzogXCJcIlwiXG4gICAgICAgICAgICBcXG5fX19fX188ZGl2PlxuICAgICAgICAgICAgX19fX19fX188cD48YT5cbiAgICAgICAgICAgIF9fX19fXzwvZGl2PlxuICAgICAgICAgICAgX19fX1xuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgICAgZW5zdXJlICdpIHQnLCBzZWxlY3RlZFRleHRfOiBcIlwiXCJcbiAgICAgICAgICAgIFxcbl9fX188ZGl2PlxuICAgICAgICAgICAgX19fX19fPGRpdj5cbiAgICAgICAgICAgIF9fX19fX19fPHA+PGE+XG4gICAgICAgICAgICBfX19fX188L2Rpdj5cbiAgICAgICAgICAgIF9fX188L2Rpdj5cbiAgICAgICAgICAgIF9fXG4gICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgICBlbnN1cmUgJ2kgdCcsIHNlbGVjdGVkVGV4dF86IFwiXCJcIlxuICAgICAgICAgICAgXFxuX188ZGl2PlxuICAgICAgICAgICAgX19fXzxkaXY+XG4gICAgICAgICAgICBfX19fX188ZGl2PlxuICAgICAgICAgICAgX19fX19fX188cD48YT5cbiAgICAgICAgICAgIF9fX19fXzwvZGl2PlxuICAgICAgICAgICAgX19fXzwvZGl2PlxuICAgICAgICAgICAgX188L2Rpdj5cXG5cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgIGVuc3VyZSAnaSB0Jywgc2VsZWN0ZWRUZXh0XzogXCJcIlwiXG4gICAgICAgICAgICBcXG48aGVhZD5cbiAgICAgICAgICAgIF9fPG1ldGEgY2hhcnNldD1cIlVURi04XCIgLz5cbiAgICAgICAgICAgIF9fPHRpdGxlPkRvY3VtZW50PC90aXRsZT5cbiAgICAgICAgICAgIDwvaGVhZD5cbiAgICAgICAgICAgIDxib2R5PlxuICAgICAgICAgICAgX188ZGl2PlxuICAgICAgICAgICAgX19fXzxkaXY+XG4gICAgICAgICAgICBfX19fX188ZGl2PlxuICAgICAgICAgICAgX19fX19fX188cD48YT5cbiAgICAgICAgICAgIF9fX19fXzwvZGl2PlxuICAgICAgICAgICAgX19fXzwvZGl2PlxuICAgICAgICAgICAgX188L2Rpdj5cbiAgICAgICAgICAgIDwvYm9keT5cXG5cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICBpdCAnZGVsZXRlIGlubmVyLXRhZyBhbmQgcmVwYXRhYmxlJywgLT5cbiAgICAgICAgICBzZXQgY3Vyc29yOiBbOSwgMF1cbiAgICAgICAgICBlbnN1cmUgXCJkIGkgdFwiLCB0ZXh0XzogXCJcIlwiXG4gICAgICAgICAgICA8RE9DVFlQRSBodG1sPlxuICAgICAgICAgICAgPGh0bWwgbGFuZz1cImVuXCI+XG4gICAgICAgICAgICA8aGVhZD5cbiAgICAgICAgICAgIF9fPG1ldGEgY2hhcnNldD1cIlVURi04XCIgLz5cbiAgICAgICAgICAgIF9fPHRpdGxlPkRvY3VtZW50PC90aXRsZT5cbiAgICAgICAgICAgIDwvaGVhZD5cbiAgICAgICAgICAgIDxib2R5PlxuICAgICAgICAgICAgX188ZGl2PlxuICAgICAgICAgICAgX19fXzxkaXY+XG4gICAgICAgICAgICBfX19fX188ZGl2PjwvZGl2PlxuICAgICAgICAgICAgX19fXzwvZGl2PlxuICAgICAgICAgICAgX188L2Rpdj5cbiAgICAgICAgICAgIDwvYm9keT5cbiAgICAgICAgICAgIDwvaHRtbD5cXG5cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgIGVuc3VyZSBcIjMgLlwiLCB0ZXh0XzogXCJcIlwiXG4gICAgICAgICAgICA8RE9DVFlQRSBodG1sPlxuICAgICAgICAgICAgPGh0bWwgbGFuZz1cImVuXCI+XG4gICAgICAgICAgICA8aGVhZD5cbiAgICAgICAgICAgIF9fPG1ldGEgY2hhcnNldD1cIlVURi04XCIgLz5cbiAgICAgICAgICAgIF9fPHRpdGxlPkRvY3VtZW50PC90aXRsZT5cbiAgICAgICAgICAgIDwvaGVhZD5cbiAgICAgICAgICAgIDxib2R5PjwvYm9keT5cbiAgICAgICAgICAgIDwvaHRtbD5cXG5cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgIGVuc3VyZSBcIi5cIiwgdGV4dF86IFwiXCJcIlxuICAgICAgICAgICAgPERPQ1RZUEUgaHRtbD5cbiAgICAgICAgICAgIDxodG1sIGxhbmc9XCJlblwiPjwvaHRtbD5cXG5cbiAgICAgICAgICAgIFwiXCJcIlxuXG4gICAgICBkZXNjcmliZSBcInRhZydzIElOLXRhZy9PZmYtdGFnIHJlY29nbml0aW9uXCIsIC0+XG4gICAgICAgIGRlc2NyaWJlIFwiV2hlbiB0YWdTdGFydCdzIHJvdyBjb250YWlucyBOTyBOT04td2hpdGVzcGFlY2UgdGlsbCB0YWdTdGFydFwiLCAtPlxuICAgICAgICAgIGl0IFwiW211bHRpLWxpbmVdIHNlbGVjdCBmb3J3YXJkaW5nIHRhZ1wiLCAtPlxuICAgICAgICAgICAgc2V0IHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgfCAgPHNwYW4+aW5uZXI8L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgICAgICBlbnN1cmUgXCJkIGkgdFwiLCB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgXCJcIlwiXG5cbiAgICAgICAgZGVzY3JpYmUgXCJXaGVuIHRhZ1N0YXJ0J3Mgcm93IGNvbnRhaW5zIFNPTUUgTk9OLXdoaXRlc3BhZWNlIHRpbGwgdGFnU3RhcnRcIiwgLT5cbiAgICAgICAgICBpdCBcIlttdWx0aS1saW5lXSBzZWxlY3QgZW5jbG9zaW5nIHRhZ1wiLCAtPlxuICAgICAgICAgICAgc2V0IHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgaGVsbG8gfCA8c3Bhbj5pbm5lcjwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgICAgZW5zdXJlIFwiZCBpIHRcIiwgdGV4dDogXCI8c3Bhbj48L3NwYW4+XCJcblxuICAgICAgICAgIGl0IFwiW29uZS1saW5lLTFdIHNlbGVjdCBlbmNsb3NpbmcgdGFnXCIsIC0+XG4gICAgICAgICAgICBzZXQgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgICAgICA8c3Bhbj4gfCA8c3Bhbj5pbm5lcjwvc3Bhbj48L3NwYW4+XG4gICAgICAgICAgICAgIFwiXCJcIlxuXG4gICAgICAgICAgICBlbnN1cmUgXCJkIGkgdFwiLCB0ZXh0OiBcIjxzcGFuPjwvc3Bhbj5cIlxuXG4gICAgICAgICAgaXQgXCJbb25lLWxpbmUtMl0gc2VsZWN0IGVuY2xvc2luZyB0YWdcIiwgLT5cbiAgICAgICAgICAgIHNldCB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgICAgIDxzcGFuPmh8ZWxsbzxzcGFuPmlubmVyPC9zcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgICAgXCJcIlwiXG5cbiAgICAgICAgICAgIGVuc3VyZSBcImQgaSB0XCIsIHRleHQ6IFwiPHNwYW4+PC9zcGFuPlwiXG5cbiAgICBkZXNjcmliZSBcImEtdGFnXCIsIC0+XG4gICAgICBkZXNjcmliZSBcInByZWNpc2VseSBzZWxlY3QgYVwiLCAtPlxuICAgICAgICBjaGVjayA9IGdldENoZWNrRnVuY3Rpb25Gb3IoJ2EgdCcpXG4gICAgICAgIHRleHQgPSBcIlwiXCJcbiAgICAgICAgICA8YWJjPlxuICAgICAgICAgICAgPHRpdGxlPlRJVExFPC90aXRsZT5cbiAgICAgICAgICA8L2FiYz5cbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgc2VsZWN0ZWRUZXh0ID0gXCI8dGl0bGU+VElUTEU8L3RpdGxlPlwiXG4gICAgICAgIGFBQkMgPSB0ZXh0XG4gICAgICAgIHRleHRBZnRlckRlbGV0ZWQgPSBcIlwiXCJcbiAgICAgICAgICA8YWJjPlxuICAgICAgICAgIF9fXG4gICAgICAgICAgPC9hYmM+XG4gICAgICAgICAgXCJcIlwiLnJlcGxhY2UoL18vZywgJyAnKVxuXG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICBzZXQge3RleHR9XG5cbiAgICAgICAgIyBTZWxlY3RcbiAgICAgICAgaXQgXCJbMV0gZm9yd2FyZGluZ1wiLCAgICAgICAgIC0+IGNoZWNrIFsxLCAwXSwgICd2Jywge3NlbGVjdGVkVGV4dH1cbiAgICAgICAgaXQgXCJbMl0gb3BlblRhZyBsZWZ0bW9zdFwiLCAgIC0+IGNoZWNrIFsxLCAyXSwgICd2Jywge3NlbGVjdGVkVGV4dH1cbiAgICAgICAgaXQgXCJbM10gb3BlblRhZyByaWdodG1vc3RcIiwgIC0+IGNoZWNrIFsxLCA4XSwgICd2Jywge3NlbGVjdGVkVGV4dH1cbiAgICAgICAgaXQgXCJbNF0gSW5uZXIgdGV4dFwiLCAgICAgICAgIC0+IGNoZWNrIFsxLCAxMF0sICd2Jywge3NlbGVjdGVkVGV4dH1cbiAgICAgICAgaXQgXCJbNV0gY2xvc2VUYWcgbGVmdG1vc3RcIiwgIC0+IGNoZWNrIFsxLCAxNF0sICd2Jywge3NlbGVjdGVkVGV4dH1cbiAgICAgICAgaXQgXCJbNl0gY2xvc2VUYWcgcmlnaHRtb3N0XCIsIC0+IGNoZWNrIFsxLCAyMV0sICd2Jywge3NlbGVjdGVkVGV4dH1cbiAgICAgICAgaXQgXCJbN10gcmlnaHQgb2YgY2xvc2VUYWdcIiwgIC0+IGNoZWNrIFsyLCAwXSwgICd2Jywge3NlbGVjdGVkVGV4dDogYUFCQ31cblxuICAgICAgICAjIERlbGV0ZVxuICAgICAgICBpdCBcIls4XSBmb3J3YXJkaW5nXCIsICAgICAgICAgIC0+IGNoZWNrIFsxLCAwXSwgICdkJywge3RleHQ6IHRleHRBZnRlckRlbGV0ZWR9XG4gICAgICAgIGl0IFwiWzldIG9wZW5UYWcgbGVmdG1vc3RcIiwgICAgLT4gY2hlY2sgWzEsIDJdLCAgJ2QnLCB7dGV4dDogdGV4dEFmdGVyRGVsZXRlZH1cbiAgICAgICAgaXQgXCJbMTBdIG9wZW5UYWcgcmlnaHRtb3N0XCIsICAtPiBjaGVjayBbMSwgOF0sICAnZCcsIHt0ZXh0OiB0ZXh0QWZ0ZXJEZWxldGVkfVxuICAgICAgICBpdCBcIlsxMV0gSW5uZXIgdGV4dFwiLCAgICAgICAgIC0+IGNoZWNrIFsxLCAxMF0sICdkJywge3RleHQ6IHRleHRBZnRlckRlbGV0ZWR9XG4gICAgICAgIGl0IFwiWzEyXSBjbG9zZVRhZyBsZWZ0bW9zdFwiLCAgLT4gY2hlY2sgWzEsIDE0XSwgJ2QnLCB7dGV4dDogdGV4dEFmdGVyRGVsZXRlZH1cbiAgICAgICAgaXQgXCJbMTNdIGNsb3NlVGFnIHJpZ2h0bW9zdFwiLCAtPiBjaGVjayBbMSwgMjFdLCAnZCcsIHt0ZXh0OiB0ZXh0QWZ0ZXJEZWxldGVkfVxuICAgICAgICBpdCBcIlsxNF0gcmlnaHQgb2YgY2xvc2VUYWdcIiwgIC0+IGNoZWNrIFsyLCAwXSwgICdkJywge3RleHQ6IFwiXCJ9XG5cbiAgZGVzY3JpYmUgXCJTcXVhcmVCcmFja2V0XCIsIC0+XG4gICAgZGVzY3JpYmUgXCJpbm5lci1zcXVhcmUtYnJhY2tldFwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0OiBcIlsgc29tZXRoaW5nIGluIGhlcmUgYW5kIGluIFtoZXJlXSBdXCJcbiAgICAgICAgICBjdXJzb3I6IFswLCA5XVxuXG4gICAgICBpdCBcImFwcGxpZXMgb3BlcmF0b3JzIGluc2lkZSB0aGUgY3VycmVudCB3b3JkIGluIG9wZXJhdG9yLXBlbmRpbmcgbW9kZVwiLCAtPlxuICAgICAgICBlbnN1cmUgJ2QgaSBbJyxcbiAgICAgICAgICB0ZXh0OiBcIltdXCJcbiAgICAgICAgICBjdXJzb3I6IFswLCAxXVxuXG4gICAgICBpdCBcImFwcGxpZXMgb3BlcmF0b3JzIGluc2lkZSB0aGUgY3VycmVudCB3b3JkIGluIG9wZXJhdG9yLXBlbmRpbmcgbW9kZSAoc2Vjb25kIHRlc3QpXCIsIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIGN1cnNvcjogWzAsIDI5XVxuICAgICAgICBlbnN1cmUgJ2QgaSBbJyxcbiAgICAgICAgICB0ZXh0OiBcIlsgc29tZXRoaW5nIGluIGhlcmUgYW5kIGluIFtdIF1cIlxuICAgICAgICAgIGN1cnNvcjogWzAsIDI4XVxuICAgIGRlc2NyaWJlIFwiYS1zcXVhcmUtYnJhY2tldFwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0OiBcIlsgc29tZXRoaW5nIGluIGhlcmUgYW5kIGluIFtoZXJlXSBdXCJcbiAgICAgICAgICBjdXJzb3I6IFswLCA5XVxuXG4gICAgICBpdCBcImFwcGxpZXMgb3BlcmF0b3JzIGFyb3VuZCB0aGUgY3VycmVudCBzcXVhcmUgYnJhY2tldHMgaW4gb3BlcmF0b3ItcGVuZGluZyBtb2RlXCIsIC0+XG4gICAgICAgIGVuc3VyZSAnZCBhIFsnLFxuICAgICAgICAgIHRleHQ6ICcnXG4gICAgICAgICAgY3Vyc29yOiBbMCwgMF1cbiAgICAgICAgICBtb2RlOiAnbm9ybWFsJ1xuXG4gICAgICBpdCBcImFwcGxpZXMgb3BlcmF0b3JzIGFyb3VuZCB0aGUgY3VycmVudCBzcXVhcmUgYnJhY2tldHMgaW4gb3BlcmF0b3ItcGVuZGluZyBtb2RlIChzZWNvbmQgdGVzdClcIiwgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzAsIDI5XVxuICAgICAgICBlbnN1cmUgJ2QgYSBbJyxcbiAgICAgICAgICB0ZXh0OiBcIlsgc29tZXRoaW5nIGluIGhlcmUgYW5kIGluICBdXCJcbiAgICAgICAgICBjdXJzb3I6IFswLCAyN11cbiAgICAgICAgICBtb2RlOiAnbm9ybWFsJ1xuICAgICAgZGVzY3JpYmUgXCJjdXJzb3IgaXMgb24gdGhlIHBhaXIgY2hhclwiLCAtPlxuICAgICAgICBjaGVjayA9IGdldENoZWNrRnVuY3Rpb25Gb3IoJ2kgWycpXG4gICAgICAgIHRleHQgPSAnLVsrXS0nXG4gICAgICAgIHRleHRGaW5hbCA9ICctW10tJ1xuICAgICAgICBzZWxlY3RlZFRleHQgPSAnKydcbiAgICAgICAgb3BlbiA9IFswLCAxXVxuICAgICAgICBjbG9zZSA9IFswLCAzXVxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgc2V0IHt0ZXh0fVxuICAgICAgICBpdCBcImNhc2UtMSBub3JtYWxcIiwgLT4gY2hlY2sgb3BlbiwgJ2QnLCB0ZXh0OiB0ZXh0RmluYWwsIGN1cnNvcjogWzAsIDJdXG4gICAgICAgIGl0IFwiY2FzZS0yIG5vcm1hbFwiLCAtPiBjaGVjayBjbG9zZSwgJ2QnLCB0ZXh0OiB0ZXh0RmluYWwsIGN1cnNvcjogWzAsIDJdXG4gICAgICAgIGl0IFwiY2FzZS0zIHZpc3VhbFwiLCAtPiBjaGVjayBvcGVuLCAndicsIHtzZWxlY3RlZFRleHR9XG4gICAgICAgIGl0IFwiY2FzZS00IHZpc3VhbFwiLCAtPiBjaGVjayBjbG9zZSwgJ3YnLCB7c2VsZWN0ZWRUZXh0fVxuICAgICAgZGVzY3JpYmUgXCJjdXJzb3IgaXMgb24gdGhlIHBhaXIgY2hhclwiLCAtPlxuICAgICAgICBjaGVjayA9IGdldENoZWNrRnVuY3Rpb25Gb3IoJ2EgWycpXG4gICAgICAgIHRleHQgPSAnLVsrXS0nXG4gICAgICAgIHRleHRGaW5hbCA9ICctLSdcbiAgICAgICAgc2VsZWN0ZWRUZXh0ID0gJ1srXSdcbiAgICAgICAgb3BlbiA9IFswLCAxXVxuICAgICAgICBjbG9zZSA9IFswLCAzXVxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgc2V0IHt0ZXh0fVxuICAgICAgICBpdCBcImNhc2UtMSBub3JtYWxcIiwgLT4gY2hlY2sgb3BlbiwgJ2QnLCB0ZXh0OiB0ZXh0RmluYWwsIGN1cnNvcjogWzAsIDFdXG4gICAgICAgIGl0IFwiY2FzZS0yIG5vcm1hbFwiLCAtPiBjaGVjayBjbG9zZSwgJ2QnLCB0ZXh0OiB0ZXh0RmluYWwsIGN1cnNvcjogWzAsIDFdXG4gICAgICAgIGl0IFwiY2FzZS0zIHZpc3VhbFwiLCAtPiBjaGVjayBvcGVuLCAndicsIHtzZWxlY3RlZFRleHR9XG4gICAgICAgIGl0IFwiY2FzZS00IHZpc3VhbFwiLCAtPiBjaGVjayBjbG9zZSwgJ3YnLCB7c2VsZWN0ZWRUZXh0fVxuICBkZXNjcmliZSBcIlBhcmVudGhlc2lzXCIsIC0+XG4gICAgZGVzY3JpYmUgXCJpbm5lci1wYXJlbnRoZXNpc1wiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0OiBcIiggc29tZXRoaW5nIGluIGhlcmUgYW5kIGluIChoZXJlKSApXCJcbiAgICAgICAgICBjdXJzb3I6IFswLCA5XVxuXG4gICAgICBpdCBcImFwcGxpZXMgb3BlcmF0b3JzIGluc2lkZSB0aGUgY3VycmVudCB3b3JkIGluIG9wZXJhdG9yLXBlbmRpbmcgbW9kZVwiLCAtPlxuICAgICAgICBlbnN1cmUgJ2QgaSAoJyxcbiAgICAgICAgICB0ZXh0OiBcIigpXCJcbiAgICAgICAgICBjdXJzb3I6IFswLCAxXVxuXG4gICAgICBpdCBcImFwcGxpZXMgb3BlcmF0b3JzIGluc2lkZSB0aGUgY3VycmVudCB3b3JkIGluIG9wZXJhdG9yLXBlbmRpbmcgbW9kZSAoc2Vjb25kIHRlc3QpXCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFswLCAyOV1cbiAgICAgICAgZW5zdXJlICdkIGkgKCcsXG4gICAgICAgICAgdGV4dDogXCIoIHNvbWV0aGluZyBpbiBoZXJlIGFuZCBpbiAoKSApXCJcbiAgICAgICAgICBjdXJzb3I6IFswLCAyOF1cblxuICAgICAgaXQgXCJzZWxlY3QgaW5uZXIgKCkgYnkgc2tpcHBpbmcgbmVzdGluZyBwYWlyXCIsIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIHRleHQ6ICdleHBlY3QoZWRpdG9yLmdldFNjcm9sbFRvcCgpKSdcbiAgICAgICAgICBjdXJzb3I6IFswLCA3XVxuICAgICAgICBlbnN1cmUgJ3YgaSAoJywgc2VsZWN0ZWRUZXh0OiAnZWRpdG9yLmdldFNjcm9sbFRvcCgpJ1xuXG4gICAgICBpdCBcInNraXAgZXNjYXBlZCBwYWlyIGNhc2UtMVwiLCAtPlxuICAgICAgICBzZXQgdGV4dDogJ2V4cGVjdChlZGl0b3IuZ1xcXFwoZXRTY3JvbGxUcCgpKScsIGN1cnNvcjogWzAsIDIwXVxuICAgICAgICBlbnN1cmUgJ3YgaSAoJywgc2VsZWN0ZWRUZXh0OiAnZWRpdG9yLmdcXFxcKGV0U2Nyb2xsVHAoKSdcblxuICAgICAgaXQgXCJkb250IHNraXAgbGl0ZXJhbCBiYWNrc2xhc2hcIiwgLT5cbiAgICAgICAgc2V0IHRleHQ6ICdleHBlY3QoZWRpdG9yLmdcXFxcXFxcXChldFNjcm9sbFRwKCkpJywgY3Vyc29yOiBbMCwgMjBdXG4gICAgICAgIGVuc3VyZSAndiBpICgnLCBzZWxlY3RlZFRleHQ6ICdldFNjcm9sbFRwKCknXG5cbiAgICAgIGl0IFwic2tpcCBlc2NhcGVkIHBhaXIgY2FzZS0yXCIsIC0+XG4gICAgICAgIHNldCB0ZXh0OiAnZXhwZWN0KGVkaXRvci5nZXRTY1xcXFwpcm9sbFRwKCkpJywgY3Vyc29yOiBbMCwgN11cbiAgICAgICAgZW5zdXJlICd2IGkgKCcsIHNlbGVjdGVkVGV4dDogJ2VkaXRvci5nZXRTY1xcXFwpcm9sbFRwKCknXG5cbiAgICAgIGl0IFwic2tpcCBlc2NhcGVkIHBhaXIgY2FzZS0zXCIsIC0+XG4gICAgICAgIHNldCB0ZXh0OiAnZXhwZWN0KGVkaXRvci5nZVxcXFwodFNjXFxcXClyb2xsVHAoKSknLCBjdXJzb3I6IFswLCA3XVxuICAgICAgICBlbnN1cmUgJ3YgaSAoJywgc2VsZWN0ZWRUZXh0OiAnZWRpdG9yLmdlXFxcXCh0U2NcXFxcKXJvbGxUcCgpJ1xuXG4gICAgICBpdCBcIndvcmtzIHdpdGggbXVsdGlwbGUgY3Vyc29yc1wiLCAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0OiBcIiggYSBiICkgY2RlICggZiBnIGggKSBpamtcIlxuICAgICAgICAgIGN1cnNvcjogW1swLCAyXSwgWzAsIDE4XV1cbiAgICAgICAgZW5zdXJlICd2IGkgKCcsXG4gICAgICAgICAgc2VsZWN0ZWRCdWZmZXJSYW5nZTogW1xuICAgICAgICAgICAgW1swLCAxXSwgIFswLCA2XV1cbiAgICAgICAgICAgIFtbMCwgMTNdLCBbMCwgMjBdXVxuICAgICAgICAgIF1cbiAgICAgIGRlc2NyaWJlIFwiY3Vyc29yIGlzIG9uIHRoZSBwYWlyIGNoYXJcIiwgLT5cbiAgICAgICAgY2hlY2sgPSBnZXRDaGVja0Z1bmN0aW9uRm9yKCdpICgnKVxuICAgICAgICB0ZXh0ID0gJy0oKyktJ1xuICAgICAgICB0ZXh0RmluYWwgPSAnLSgpLSdcbiAgICAgICAgc2VsZWN0ZWRUZXh0ID0gJysnXG4gICAgICAgIG9wZW4gPSBbMCwgMV1cbiAgICAgICAgY2xvc2UgPSBbMCwgM11cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIHNldCB7dGV4dH1cbiAgICAgICAgaXQgXCJjYXNlLTEgbm9ybWFsXCIsIC0+IGNoZWNrIG9wZW4sICdkJywgdGV4dDogdGV4dEZpbmFsLCBjdXJzb3I6IFswLCAyXVxuICAgICAgICBpdCBcImNhc2UtMiBub3JtYWxcIiwgLT4gY2hlY2sgY2xvc2UsICdkJywgdGV4dDogdGV4dEZpbmFsLCBjdXJzb3I6IFswLCAyXVxuICAgICAgICBpdCBcImNhc2UtMyB2aXN1YWxcIiwgLT4gY2hlY2sgb3BlbiwgJ3YnLCB7c2VsZWN0ZWRUZXh0fVxuICAgICAgICBpdCBcImNhc2UtNCB2aXN1YWxcIiwgLT4gY2hlY2sgY2xvc2UsICd2Jywge3NlbGVjdGVkVGV4dH1cblxuICAgIGRlc2NyaWJlIFwiYS1wYXJlbnRoZXNpc1wiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0OiBcIiggc29tZXRoaW5nIGluIGhlcmUgYW5kIGluIChoZXJlKSApXCJcbiAgICAgICAgICBjdXJzb3I6IFswLCA5XVxuXG4gICAgICBpdCBcImFwcGxpZXMgb3BlcmF0b3JzIGFyb3VuZCB0aGUgY3VycmVudCBwYXJlbnRoZXNlcyBpbiBvcGVyYXRvci1wZW5kaW5nIG1vZGVcIiwgLT5cbiAgICAgICAgZW5zdXJlICdkIGEgKCcsXG4gICAgICAgICAgdGV4dDogJydcbiAgICAgICAgICBjdXJzb3I6IFswLCAwXVxuICAgICAgICAgIG1vZGU6ICdub3JtYWwnXG5cbiAgICAgIGl0IFwiYXBwbGllcyBvcGVyYXRvcnMgYXJvdW5kIHRoZSBjdXJyZW50IHBhcmVudGhlc2VzIGluIG9wZXJhdG9yLXBlbmRpbmcgbW9kZSAoc2Vjb25kIHRlc3QpXCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFswLCAyOV1cbiAgICAgICAgZW5zdXJlICdkIGEgKCcsXG4gICAgICAgICAgdGV4dDogXCIoIHNvbWV0aGluZyBpbiBoZXJlIGFuZCBpbiAgKVwiXG4gICAgICAgICAgY3Vyc29yOiBbMCwgMjddXG4gICAgICBkZXNjcmliZSBcImN1cnNvciBpcyBvbiB0aGUgcGFpciBjaGFyXCIsIC0+XG4gICAgICAgIGNoZWNrID0gZ2V0Q2hlY2tGdW5jdGlvbkZvcignYSAoJylcbiAgICAgICAgdGV4dCA9ICctKCspLSdcbiAgICAgICAgdGV4dEZpbmFsID0gJy0tJ1xuICAgICAgICBzZWxlY3RlZFRleHQgPSAnKCspJ1xuICAgICAgICBvcGVuID0gWzAsIDFdXG4gICAgICAgIGNsb3NlID0gWzAsIDNdXG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICBzZXQge3RleHR9XG4gICAgICAgIGl0IFwiY2FzZS0xIG5vcm1hbFwiLCAtPiBjaGVjayBvcGVuLCAnZCcsIHRleHQ6IHRleHRGaW5hbCwgY3Vyc29yOiBbMCwgMV1cbiAgICAgICAgaXQgXCJjYXNlLTIgbm9ybWFsXCIsIC0+IGNoZWNrIGNsb3NlLCAnZCcsIHRleHQ6IHRleHRGaW5hbCwgY3Vyc29yOiBbMCwgMV1cbiAgICAgICAgaXQgXCJjYXNlLTMgdmlzdWFsXCIsIC0+IGNoZWNrIG9wZW4sICd2Jywge3NlbGVjdGVkVGV4dH1cbiAgICAgICAgaXQgXCJjYXNlLTQgdmlzdWFsXCIsIC0+IGNoZWNrIGNsb3NlLCAndicsIHtzZWxlY3RlZFRleHR9XG5cbiAgZGVzY3JpYmUgXCJQYXJhZ3JhcGhcIiwgLT5cbiAgICB0ZXh0ID0gbnVsbFxuICAgIGVuc3VyZVBhcmFncmFwaCA9IChrZXlzdHJva2UsIG9wdGlvbnMpIC0+XG4gICAgICB1bmxlc3Mgb3B0aW9ucy5zZXRDdXJzb3JcbiAgICAgICAgdGhyb3cgbmV3IEVycm93KFwibm8gc2V0Q3Vyc29yIHByb3ZpZGVkXCIpXG4gICAgICBzZXQgY3Vyc29yOiBvcHRpb25zLnNldEN1cnNvclxuICAgICAgZGVsZXRlIG9wdGlvbnMuc2V0Q3Vyc29yXG4gICAgICBlbnN1cmUoa2V5c3Ryb2tlLCBvcHRpb25zKVxuICAgICAgZW5zdXJlKCdlc2NhcGUnLCBtb2RlOiAnbm9ybWFsJylcblxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIHRleHQgPSBuZXcgVGV4dERhdGEgXCJcIlwiXG5cbiAgICAgICAgMTogUC0xXG5cbiAgICAgICAgMzogUC0yXG4gICAgICAgIDQ6IFAtMlxuXG5cbiAgICAgICAgNzogUC0zXG4gICAgICAgIDg6IFAtM1xuICAgICAgICA5OiBQLTNcblxuXG4gICAgICAgIFwiXCJcIlxuICAgICAgc2V0XG4gICAgICAgIGN1cnNvcjogWzEsIDBdXG4gICAgICAgIHRleHQ6IHRleHQuZ2V0UmF3KClcblxuICAgIGRlc2NyaWJlIFwiaW5uZXItcGFyYWdyYXBoXCIsIC0+XG4gICAgICBpdCBcInNlbGVjdCBjb25zZXF1dGl2ZSBibGFuayByb3dzXCIsIC0+XG4gICAgICAgIGVuc3VyZVBhcmFncmFwaCAndiBpIHAnLCBzZXRDdXJzb3I6IFswLCAwXSwgc2VsZWN0ZWRUZXh0OiB0ZXh0LmdldExpbmVzKFswXSlcbiAgICAgICAgZW5zdXJlUGFyYWdyYXBoICd2IGkgcCcsIHNldEN1cnNvcjogWzIsIDBdLCBzZWxlY3RlZFRleHQ6IHRleHQuZ2V0TGluZXMoWzJdKVxuICAgICAgICBlbnN1cmVQYXJhZ3JhcGggJ3YgaSBwJywgc2V0Q3Vyc29yOiBbNSwgMF0sIHNlbGVjdGVkVGV4dDogdGV4dC5nZXRMaW5lcyhbNS4uNl0pXG4gICAgICBpdCBcInNlbGVjdCBjb25zZXF1dGl2ZSBub24tYmxhbmsgcm93c1wiLCAtPlxuICAgICAgICBlbnN1cmVQYXJhZ3JhcGggJ3YgaSBwJywgc2V0Q3Vyc29yOiBbMSwgMF0sIHNlbGVjdGVkVGV4dDogdGV4dC5nZXRMaW5lcyhbMV0pXG4gICAgICAgIGVuc3VyZVBhcmFncmFwaCAndiBpIHAnLCBzZXRDdXJzb3I6IFszLCAwXSwgc2VsZWN0ZWRUZXh0OiB0ZXh0LmdldExpbmVzKFszLi40XSlcbiAgICAgICAgZW5zdXJlUGFyYWdyYXBoICd2IGkgcCcsIHNldEN1cnNvcjogWzcsIDBdLCBzZWxlY3RlZFRleHQ6IHRleHQuZ2V0TGluZXMoWzcuLjldKVxuICAgICAgaXQgXCJvcGVyYXRlIG9uIGlubmVyIHBhcmFncmFwaFwiLCAtPlxuICAgICAgICBlbnN1cmVQYXJhZ3JhcGggJ3kgaSBwJywgc2V0Q3Vyc29yOiBbNywgMF0sIHJlZ2lzdGVyOiAnXCInOiB0ZXh0OiB0ZXh0LmdldExpbmVzKFs3LCA4LCA5XSlcblxuICAgIGRlc2NyaWJlIFwiYS1wYXJhZ3JhcGhcIiwgLT5cbiAgICAgIGl0IFwic2VsZWN0IHR3byBwYXJhZ3JhcGggYXMgb25lIG9wZXJhdGlvblwiLCAtPlxuICAgICAgICBlbnN1cmVQYXJhZ3JhcGggJ3YgYSBwJywgc2V0Q3Vyc29yOiBbMCwgMF0sIHNlbGVjdGVkVGV4dDogdGV4dC5nZXRMaW5lcyhbMCwgMV0pXG4gICAgICAgIGVuc3VyZVBhcmFncmFwaCAndiBhIHAnLCBzZXRDdXJzb3I6IFsyLCAwXSwgc2VsZWN0ZWRUZXh0OiB0ZXh0LmdldExpbmVzKFsyLi40XSlcbiAgICAgICAgZW5zdXJlUGFyYWdyYXBoICd2IGEgcCcsIHNldEN1cnNvcjogWzUsIDBdLCBzZWxlY3RlZFRleHQ6IHRleHQuZ2V0TGluZXMoWzUuLjldKVxuICAgICAgaXQgXCJzZWxlY3QgdHdvIHBhcmFncmFwaCBhcyBvbmUgb3BlcmF0aW9uXCIsIC0+XG4gICAgICAgIGVuc3VyZVBhcmFncmFwaCAndiBhIHAnLCBzZXRDdXJzb3I6IFsxLCAwXSwgc2VsZWN0ZWRUZXh0OiB0ZXh0LmdldExpbmVzKFsxLi4yXSlcbiAgICAgICAgZW5zdXJlUGFyYWdyYXBoICd2IGEgcCcsIHNldEN1cnNvcjogWzMsIDBdLCBzZWxlY3RlZFRleHQ6IHRleHQuZ2V0TGluZXMoWzMuLjZdKVxuICAgICAgICBlbnN1cmVQYXJhZ3JhcGggJ3YgYSBwJywgc2V0Q3Vyc29yOiBbNywgMF0sIHNlbGVjdGVkVGV4dDogdGV4dC5nZXRMaW5lcyhbNy4uMTBdKVxuICAgICAgaXQgXCJvcGVyYXRlIG9uIGEgcGFyYWdyYXBoXCIsIC0+XG4gICAgICAgIGVuc3VyZVBhcmFncmFwaCAneSBhIHAnLCBzZXRDdXJzb3I6IFszLCAwXSwgcmVnaXN0ZXI6ICdcIic6IHRleHQ6IHRleHQuZ2V0TGluZXMoWzMuLjZdKVxuXG4gIGRlc2NyaWJlICdDb21tZW50JywgLT5cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgICAgYXRvbS5wYWNrYWdlcy5hY3RpdmF0ZVBhY2thZ2UoJ2xhbmd1YWdlLWNvZmZlZS1zY3JpcHQnKVxuICAgICAgcnVucyAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICBncmFtbWFyOiAnc291cmNlLmNvZmZlZSdcbiAgICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICAjIyNcbiAgICAgICAgICBtdWx0aWxpbmUgY29tbWVudFxuICAgICAgICAgICMjI1xuXG4gICAgICAgICAgIyBPbmUgbGluZSBjb21tZW50XG5cbiAgICAgICAgICAjIENvbW1lbnRcbiAgICAgICAgICAjIGJvcmRlclxuICAgICAgICAgIGNsYXNzIFF1aWNrU29ydFxuICAgICAgICAgIFwiXCJcIlxuICAgIGFmdGVyRWFjaCAtPlxuICAgICAgYXRvbS5wYWNrYWdlcy5kZWFjdGl2YXRlUGFja2FnZSgnbGFuZ3VhZ2UtY29mZmVlLXNjcmlwdCcpXG5cbiAgICBkZXNjcmliZSAnaW5uZXItY29tbWVudCcsIC0+XG4gICAgICBpdCAnc2VsZWN0IGlubmVyIGNvbW1lbnQgYmxvY2snLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMCwgMF1cbiAgICAgICAgZW5zdXJlICd2IGkgLycsXG4gICAgICAgICAgc2VsZWN0ZWRUZXh0OiAnIyMjXFxubXVsdGlsaW5lIGNvbW1lbnRcXG4jIyNcXG4nXG4gICAgICAgICAgc2VsZWN0ZWRCdWZmZXJSYW5nZTogW1swLCAwXSwgWzMsIDBdXVxuXG4gICAgICBpdCAnc2VsZWN0IG9uZSBsaW5lIGNvbW1lbnQnLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbNCwgMF1cbiAgICAgICAgZW5zdXJlICd2IGkgLycsXG4gICAgICAgICAgc2VsZWN0ZWRUZXh0OiAnIyBPbmUgbGluZSBjb21tZW50XFxuJ1xuICAgICAgICAgIHNlbGVjdGVkQnVmZmVyUmFuZ2U6IFtbNCwgMF0sIFs1LCAwXV1cblxuICAgICAgaXQgJ25vdCBzZWxlY3Qgbm9uLWNvbW1lbnQgbGluZScsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFs2LCAwXVxuICAgICAgICBlbnN1cmUgJ3YgaSAvJyxcbiAgICAgICAgICBzZWxlY3RlZFRleHQ6ICcjIENvbW1lbnRcXG4jIGJvcmRlclxcbidcbiAgICAgICAgICBzZWxlY3RlZEJ1ZmZlclJhbmdlOiBbWzYsIDBdLCBbOCwgMF1dXG5cbiAgZGVzY3JpYmUgJ0Jsb2NrQ29tbWVudCcsIC0+XG4gICAgcGFjayA9ICdsYW5ndWFnZS1qYXZhc2NyaXB0J1xuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPiBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZShwYWNrKVxuICAgICAgcnVucyAtPiBzZXQgZ3JhbW1hcjogJ3NvdXJjZS5qcydcblxuICAgIGFmdGVyRWFjaCAtPlxuICAgICAgYXRvbS5wYWNrYWdlcy5kZWFjdGl2YXRlUGFja2FnZShwYWNrKVxuXG4gICAgZGVzY3JpYmUgXCJpbm5lci1saW5lIGJsb2NrIGNvbW1lbnRcIiwgLT5cbiAgICAgIGl0ICdzZWxlY3QgaW5uZXIgY29tbWVudCBibG9jaycsIC0+XG4gICAgICAgIHNldCB0ZXh0QzogXCJsZXQgYSwgYiB8LyogMm5kIHZhciAqLywgY1wiOyBlbnN1cmUgJ3YgaSAqJywgc2VsZWN0ZWRUZXh0OiAnMm5kIHZhcidcbiAgICAgICAgc2V0IHRleHRDOiBcImxldCBhLCBiIC8qIDJuZCB8dmFyICovLCBjXCI7IGVuc3VyZSAndiBpIConLCBzZWxlY3RlZFRleHQ6ICcybmQgdmFyJ1xuICAgICAgICBzZXQgdGV4dEM6IFwibGV0IGEsIGIgLyogMm5kIHZhciAqfC8sIGNcIjsgZW5zdXJlICd2IGkgKicsIHNlbGVjdGVkVGV4dDogJzJuZCB2YXInXG4gICAgICAgIHNldCB0ZXh0QzogXCJsZXQgYSwgYiAvKiAybmQgdmFyICovfCwgY1wiOyBlbnN1cmUgJ3YgaSAqJywgc2VsZWN0ZWRUZXh0OiAnLCdcbiAgICAgIGl0ICdzZWxlY3QgYSBjb21tZW50IGJsb2NrJywgLT5cbiAgICAgICAgc2V0IHRleHRDOiBcImxldCBhLCBiIHwvKiAybmQgdmFyICovLCBjXCI7IGVuc3VyZSAndiBhIConLCBzZWxlY3RlZFRleHQ6ICcvKiAybmQgdmFyICovJ1xuICAgICAgICBzZXQgdGV4dEM6IFwibGV0IGEsIGIgLyogMm5kIHx2YXIgKi8sIGNcIjsgZW5zdXJlICd2IGEgKicsIHNlbGVjdGVkVGV4dDogJy8qIDJuZCB2YXIgKi8nXG4gICAgICAgIHNldCB0ZXh0QzogXCJsZXQgYSwgYiAvKiAybmQgdmFyICp8LywgY1wiOyBlbnN1cmUgJ3YgYSAqJywgc2VsZWN0ZWRUZXh0OiAnLyogMm5kIHZhciAqLydcbiAgICAgICAgc2V0IHRleHRDOiBcImxldCBhLCBiIC8qIDJuZCB2YXIgKi98LCBjXCI7IGVuc3VyZSAndiBhIConLCBzZWxlY3RlZFRleHQ6ICcsJ1xuXG4gICAgZGVzY3JpYmUgJ2EtYmxvY2stY29tbWVudCcsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNldCB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICBpZiAodHJ1ZSkge1xuICAgICAgICAgICAgLyoqIGNvbnNlY3V0aXZlXG4gICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgY29tbWVudCAqKi8gY29uc29sZS5sb2coXCJoZWxsb1wiKVxuICAgICAgICAgIH1cbiAgICAgICAgICBcIlwiXCJcbiAgICAgIGl0ICdzZWxlY3QgaW5uZXIgY29tbWVudCBibG9jaycsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFsxLCAzXTsgIGVuc3VyZSAndiBpIConLCBzZWxlY3RlZFRleHQ6ICdjb25zZWN1dGl2ZVxcbiAgYmxvY2tcXG4gIGNvbW1lbnQnXG4gICAgICAgIHNldCBjdXJzb3I6IFsyLCAwXTsgIGVuc3VyZSAndiBpIConLCBzZWxlY3RlZFRleHQ6ICdjb25zZWN1dGl2ZVxcbiAgYmxvY2tcXG4gIGNvbW1lbnQnXG4gICAgICAgIHNldCBjdXJzb3I6IFszLCAxMl07IGVuc3VyZSAndiBpIConLCBzZWxlY3RlZFRleHQ6ICdjb25zZWN1dGl2ZVxcbiAgYmxvY2tcXG4gIGNvbW1lbnQnXG4gICAgICAgIHNldCBjdXJzb3I6IFszLCAxM107IGVuc3VyZSAndiBpIConLCBzZWxlY3RlZFRleHQ6ICcgJ1xuICAgICAgaXQgJ3NlbGVjdCBhIGNvbW1lbnQgYmxvY2snLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMSwgM107ICBlbnN1cmUgJ3YgYSAqJywgc2VsZWN0ZWRUZXh0OiAnLyoqIGNvbnNlY3V0aXZlXFxuICBibG9ja1xcbiAgY29tbWVudCAqKi8nXG4gICAgICAgIHNldCBjdXJzb3I6IFsyLCAwXTsgIGVuc3VyZSAndiBhIConLCBzZWxlY3RlZFRleHQ6ICcvKiogY29uc2VjdXRpdmVcXG4gIGJsb2NrXFxuICBjb21tZW50ICoqLydcbiAgICAgICAgc2V0IGN1cnNvcjogWzMsIDEyXTsgZW5zdXJlICd2IGEgKicsIHNlbGVjdGVkVGV4dDogJy8qKiBjb25zZWN1dGl2ZVxcbiAgYmxvY2tcXG4gIGNvbW1lbnQgKiovJ1xuICAgICAgICBzZXQgY3Vyc29yOiBbMywgMTNdOyBlbnN1cmUgJ3YgYSAqJywgc2VsZWN0ZWRUZXh0OiAnICdcblxuICBkZXNjcmliZSAnSW5kZW50YXRpb24nLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPlxuICAgICAgICBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZSgnbGFuZ3VhZ2UtY29mZmVlLXNjcmlwdCcpXG4gICAgICBnZXRWaW1TdGF0ZSAnc2FtcGxlLmNvZmZlZScsICh2aW1TdGF0ZSwgdmltKSAtPlxuICAgICAgICB7ZWRpdG9yLCBlZGl0b3JFbGVtZW50fSA9IHZpbVN0YXRlXG4gICAgICAgIHtzZXQsIGVuc3VyZX0gPSB2aW1cbiAgICBhZnRlckVhY2ggLT5cbiAgICAgIGF0b20ucGFja2FnZXMuZGVhY3RpdmF0ZVBhY2thZ2UoJ2xhbmd1YWdlLWNvZmZlZS1zY3JpcHQnKVxuXG4gICAgZGVzY3JpYmUgJ2lubmVyLWluZGVudGF0aW9uJywgLT5cbiAgICAgIGl0ICdzZWxlY3QgbGluZXMgd2l0aCBkZWVwZXIgaW5kZW50LWxldmVsJywgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzEyLCAwXVxuICAgICAgICBlbnN1cmUgJ3YgaSBpJyxcbiAgICAgICAgICBzZWxlY3RlZEJ1ZmZlclJhbmdlOiBbWzEyLCAwXSwgWzE1LCAwXV1cbiAgICBkZXNjcmliZSAnYS1pbmRlbnRhdGlvbicsIC0+XG4gICAgICBpdCAnd29udCBzdG9wIG9uIGJsYW5rIGxpbmUgd2hlbiBzZWxlY3RpbmcgaW5kZW50JywgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzEyLCAwXVxuICAgICAgICBlbnN1cmUgJ3YgYSBpJyxcbiAgICAgICAgICBzZWxlY3RlZEJ1ZmZlclJhbmdlOiBbWzEwLCAwXSwgWzI3LCAwXV1cblxuICBkZXNjcmliZSAnRm9sZCcsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgd2FpdHNGb3JQcm9taXNlIC0+XG4gICAgICAgIGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCdsYW5ndWFnZS1jb2ZmZWUtc2NyaXB0JylcbiAgICAgIGdldFZpbVN0YXRlICdzYW1wbGUuY29mZmVlJywgKHZpbVN0YXRlLCB2aW0pIC0+XG4gICAgICAgIHtlZGl0b3IsIGVkaXRvckVsZW1lbnR9ID0gdmltU3RhdGVcbiAgICAgICAge3NldCwgZW5zdXJlfSA9IHZpbVxuICAgIGFmdGVyRWFjaCAtPlxuICAgICAgYXRvbS5wYWNrYWdlcy5kZWFjdGl2YXRlUGFja2FnZSgnbGFuZ3VhZ2UtY29mZmVlLXNjcmlwdCcpXG5cbiAgICBkZXNjcmliZSAnaW5uZXItZm9sZCcsIC0+XG4gICAgICBpdCBcInNlbGVjdCBpbm5lciByYW5nZSBvZiBmb2xkXCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFsxMywgMF1cbiAgICAgICAgZW5zdXJlICd2IGkgeicsIHNlbGVjdGVkQnVmZmVyUmFuZ2U6IHJhbmdlRm9yUm93cygxMCwgMjUpXG5cbiAgICAgIGl0IFwiW3doZW4gY3Vyc29yIGlzIGF0IGNvbHVtbiAwIG9mIGZvbGQgc3RhcnQgcm93XSBzZWxlY3QgaW5uZXIgcmFuZ2Ugb2YgZm9sZFwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbOSwgMF1cbiAgICAgICAgZW5zdXJlICd2IGkgeicsIHNlbGVjdGVkQnVmZmVyUmFuZ2U6IHJhbmdlRm9yUm93cygxMCwgMjUpXG5cbiAgICAgIGl0IFwic2VsZWN0IGlubmVyIHJhbmdlIG9mIGZvbGRcIiwgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzE5LCAwXVxuICAgICAgICBlbnN1cmUgJ3YgaSB6Jywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogcmFuZ2VGb3JSb3dzKDE5LCAyMylcblxuICAgICAgaXQgXCJjYW4gZXhwYW5kIHNlbGVjdGlvblwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMjMsIDBdXG4gICAgICAgIGVuc3VyZSAndidcbiAgICAgICAgZW5zdXJlICdpIHonLCBzZWxlY3RlZEJ1ZmZlclJhbmdlOiByYW5nZUZvclJvd3MoMjMsIDIzKVxuICAgICAgICBlbnN1cmUgJ2kgeicsIHNlbGVjdGVkQnVmZmVyUmFuZ2U6IHJhbmdlRm9yUm93cygxOSwgMjMpXG4gICAgICAgIGVuc3VyZSAnaSB6Jywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogcmFuZ2VGb3JSb3dzKDEwLCAyNSlcbiAgICAgICAgZW5zdXJlICdpIHonLCBzZWxlY3RlZEJ1ZmZlclJhbmdlOiByYW5nZUZvclJvd3MoOSwgMjgpXG5cbiAgICAgIGRlc2NyaWJlIFwid2hlbiBzdGFydFJvdyBvZiBzZWxlY3Rpb24gaXMgb24gZm9sZCBzdGFydFJvd1wiLCAtPlxuICAgICAgICBpdCAnc2VsZWN0IGlubmVyIGZvbGQnLCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFsyMCwgN11cbiAgICAgICAgICBlbnN1cmUgJ3YgaSB6Jywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogcmFuZ2VGb3JSb3dzKDIxLCAyMSlcblxuICAgICAgZGVzY3JpYmUgXCJ3aGVuIGNvbnRhaW5pbmcgZm9sZCBhcmUgbm90IGZvdW5kXCIsIC0+XG4gICAgICAgIGl0IFwiZG8gbm90aGluZ1wiLCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFsyMCwgMF1cbiAgICAgICAgICBlbnN1cmUgJ1YgRycsIHNlbGVjdGVkQnVmZmVyUmFuZ2U6IHJhbmdlRm9yUm93cygyMCwgMzApXG4gICAgICAgICAgZW5zdXJlICdpIHonLCBzZWxlY3RlZEJ1ZmZlclJhbmdlOiByYW5nZUZvclJvd3MoMjAsIDMwKVxuXG4gICAgICBkZXNjcmliZSBcIndoZW4gaW5kZW50IGxldmVsIG9mIGZvbGQgc3RhcnRSb3cgYW5kIGVuZFJvdyBpcyBzYW1lXCIsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgICAgICAgIGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCdsYW5ndWFnZS1qYXZhc2NyaXB0JylcbiAgICAgICAgICBnZXRWaW1TdGF0ZSAnc2FtcGxlLmpzJywgKHN0YXRlLCB2aW1FZGl0b3IpIC0+XG4gICAgICAgICAgICB7ZWRpdG9yLCBlZGl0b3JFbGVtZW50fSA9IHN0YXRlXG4gICAgICAgICAgICB7c2V0LCBlbnN1cmV9ID0gdmltRWRpdG9yXG4gICAgICAgIGFmdGVyRWFjaCAtPlxuICAgICAgICAgIGF0b20ucGFja2FnZXMuZGVhY3RpdmF0ZVBhY2thZ2UoJ2xhbmd1YWdlLWphdmFzY3JpcHQnKVxuXG4gICAgICAgIGl0IFwiZG9lc24ndCBzZWxlY3QgZm9sZCBlbmRSb3dcIiwgLT5cbiAgICAgICAgICBzZXQgY3Vyc29yOiBbNSwgMF1cbiAgICAgICAgICBlbnN1cmUgJ3YgaSB6Jywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogcmFuZ2VGb3JSb3dzKDUsIDYpXG4gICAgICAgICAgZW5zdXJlICdhIHonLCBzZWxlY3RlZEJ1ZmZlclJhbmdlOiByYW5nZUZvclJvd3MoNCwgNylcblxuICAgIGRlc2NyaWJlICdhLWZvbGQnLCAtPlxuICAgICAgaXQgJ3NlbGVjdCBmb2xkIHJvdyByYW5nZScsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFsxMywgMF1cbiAgICAgICAgZW5zdXJlICd2IGEgeicsIHNlbGVjdGVkQnVmZmVyUmFuZ2U6IHJhbmdlRm9yUm93cyg5LCAyNSlcblxuICAgICAgaXQgXCJbd2hlbiBjdXJzb3IgaXMgYXQgY29sdW1uIDAgb2YgZm9sZCBzdGFydCByb3ddIHNlbGVjdCBpbm5lciByYW5nZSBvZiBmb2xkXCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFs5LCAwXVxuICAgICAgICBlbnN1cmUgJ3YgYSB6Jywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogcmFuZ2VGb3JSb3dzKDksIDI1KVxuXG4gICAgICBpdCAnc2VsZWN0IGZvbGQgcm93IHJhbmdlJywgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzE5LCAwXVxuICAgICAgICBlbnN1cmUgJ3YgYSB6Jywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogcmFuZ2VGb3JSb3dzKDE4LCAyMylcblxuICAgICAgaXQgJ2NhbiBleHBhbmQgc2VsZWN0aW9uJywgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzIzLCAwXVxuICAgICAgICBlbnN1cmUgJ3YnXG4gICAgICAgIGVuc3VyZSAnYSB6Jywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogcmFuZ2VGb3JSb3dzKDIyLCAyMylcbiAgICAgICAgZW5zdXJlICdhIHonLCBzZWxlY3RlZEJ1ZmZlclJhbmdlOiByYW5nZUZvclJvd3MoMTgsIDIzKVxuICAgICAgICBlbnN1cmUgJ2EgeicsIHNlbGVjdGVkQnVmZmVyUmFuZ2U6IHJhbmdlRm9yUm93cyg5LCAyNSlcbiAgICAgICAgZW5zdXJlICdhIHonLCBzZWxlY3RlZEJ1ZmZlclJhbmdlOiByYW5nZUZvclJvd3MoOCwgMjgpXG5cbiAgICAgIGRlc2NyaWJlIFwid2hlbiBzdGFydFJvdyBvZiBzZWxlY3Rpb24gaXMgb24gZm9sZCBzdGFydFJvd1wiLCAtPlxuICAgICAgICBpdCAnc2VsZWN0IGZvbGQgc3RhcnRpbmcgZnJvbSBjdXJyZW50IHJvdycsIC0+XG4gICAgICAgICAgc2V0IGN1cnNvcjogWzIwLCA3XVxuICAgICAgICAgIGVuc3VyZSAndiBhIHonLCBzZWxlY3RlZEJ1ZmZlclJhbmdlOiByYW5nZUZvclJvd3MoMjAsIDIxKVxuXG4gICAgICBkZXNjcmliZSBcIndoZW4gY29udGFpbmluZyBmb2xkIGFyZSBub3QgZm91bmRcIiwgLT5cbiAgICAgICAgaXQgXCJkbyBub3RoaW5nXCIsIC0+XG4gICAgICAgICAgc2V0IGN1cnNvcjogWzIwLCAwXVxuICAgICAgICAgIGVuc3VyZSAnViBHJywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogcmFuZ2VGb3JSb3dzKDIwLCAzMClcbiAgICAgICAgICBlbnN1cmUgJ2EgeicsIHNlbGVjdGVkQnVmZmVyUmFuZ2U6IHJhbmdlRm9yUm93cygyMCwgMzApXG5cbiAgICAgIGRlc2NyaWJlIFwic2VsZWN0IGNvbmpvaW5lZCBmb2xkXCIsIC0+XG4gICAgICAgICMgVGhpcyBmZWF0dXJlIGlzIGxhbmd1YWdlIGFnbm9zdGljLCBkb24ndCBtaXN1bmRlcnN0c2FuZCBpdCBhcyBKUyBzcGVjaWZpYyBmZWF0dXJlLlxuICAgICAgICBbZW5zdXJlU2VsZWN0ZWRUZXh0XSA9IFtdXG5cbiAgICAgICAgYmVmb3JlRWFjaCAtPiB3YWl0c0ZvclByb21pc2UgLT4gYXRvbS5wYWNrYWdlcy5hY3RpdmF0ZVBhY2thZ2UoJ2xhbmd1YWdlLWphdmFzY3JpcHQnKVxuICAgICAgICBhZnRlckVhY2ggLT4gYXRvbS5wYWNrYWdlcy5kZWFjdGl2YXRlUGFja2FnZSgnbGFuZ3VhZ2UtamF2YXNjcmlwdCcpXG5cbiAgICAgICAgZGVzY3JpYmUgXCJzZWxlY3QgaWYvZWxzZSBpZi9lbHNlIGZyb20gYW55IHJvd1wiLCAtPlxuICAgICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICAgIGVuc3VyZVNlbGVjdGVkVGV4dCA9IC0+XG4gICAgICAgICAgICAgIHNldFxuICAgICAgICAgICAgICAgIGdyYW1tYXI6IFwic291cmNlLmpzXCJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlwiXCJcblxuICAgICAgICAgICAgICAgIGlmIChudW0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDEpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChudW0gPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDIpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChudW0gPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDMpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDQpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgXCJcIlwiXG5cbiAgICAgICAgICAgICAgc2VsZWN0ZWRUZXh0ID0gXCJcIlwiXG4gICAgICAgICAgICAgICAgaWYgKG51bSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coMSlcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG51bSA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coMilcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG51bSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coMylcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coNClcbiAgICAgICAgICAgICAgICB9XFxuXG4gICAgICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgICAgICAgIHNldCBjdXJzb3I6IFsxLCAwXTsgZW5zdXJlIFwidiBhIHpcIiwge3NlbGVjdGVkVGV4dH07IGVuc3VyZSBcImVzY2FwZVwiLCBtb2RlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgIHNldCBjdXJzb3I6IFsyLCAwXTsgZW5zdXJlIFwidiBhIHpcIiwge3NlbGVjdGVkVGV4dH07IGVuc3VyZSBcImVzY2FwZVwiLCBtb2RlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgIHNldCBjdXJzb3I6IFszLCAwXTsgZW5zdXJlIFwidiBhIHpcIiwge3NlbGVjdGVkVGV4dH07IGVuc3VyZSBcImVzY2FwZVwiLCBtb2RlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgIHNldCBjdXJzb3I6IFs0LCAwXTsgZW5zdXJlIFwidiBhIHpcIiwge3NlbGVjdGVkVGV4dH07IGVuc3VyZSBcImVzY2FwZVwiLCBtb2RlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgIHNldCBjdXJzb3I6IFs1LCAwXTsgZW5zdXJlIFwidiBhIHpcIiwge3NlbGVjdGVkVGV4dH07IGVuc3VyZSBcImVzY2FwZVwiLCBtb2RlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgIHNldCBjdXJzb3I6IFs2LCAwXTsgZW5zdXJlIFwidiBhIHpcIiwge3NlbGVjdGVkVGV4dH07IGVuc3VyZSBcImVzY2FwZVwiLCBtb2RlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgIHNldCBjdXJzb3I6IFs3LCAwXTsgZW5zdXJlIFwidiBhIHpcIiwge3NlbGVjdGVkVGV4dH07IGVuc3VyZSBcImVzY2FwZVwiLCBtb2RlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgIHNldCBjdXJzb3I6IFs4LCAwXTsgZW5zdXJlIFwidiBhIHpcIiwge3NlbGVjdGVkVGV4dH07IGVuc3VyZSBcImVzY2FwZVwiLCBtb2RlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICAgIHNldCBjdXJzb3I6IFs5LCAwXTsgZW5zdXJlIFwidiBhIHpcIiwge3NlbGVjdGVkVGV4dH07IGVuc3VyZSBcImVzY2FwZVwiLCBtb2RlOiBcIm5vcm1hbFwiXG5cbiAgICAgICAgICBpdCBcIlt0cmVlU2l0dGVyID0gb25dIG91dG1vc3QgY29uam9pbmVkIHJhbmdlXCIsIC0+XG4gICAgICAgICAgICBhdG9tLmNvbmZpZy5zZXQoJ2NvcmUudXNlVHJlZVNpdHRlclBhcnNlcnMnLCB0cnVlKVxuICAgICAgICAgICAgZW5zdXJlU2VsZWN0ZWRUZXh0KClcblxuICAgICAgICAgIGl0IFwiW3RyZWVTaXR0ZXIgPSBvZmZdIG91dG1vc3QgY29uam9pbmVkIHJhbmdlXCIsIC0+XG4gICAgICAgICAgICBhdG9tLmNvbmZpZy5zZXQoJ2NvcmUudXNlVHJlZVNpdHRlclBhcnNlcnMnLCBmYWxzZSlcbiAgICAgICAgICAgIGVuc3VyZVNlbGVjdGVkVGV4dCgpXG5cbiAgICAgICAgZGVzY3JpYmUgXCJzZWxlY3QgdHJ5L2NhdGNoL2ZpbmFsbHkgZnJvbSBhbnkgcm93XCIsIC0+XG4gICAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgICAgZW5zdXJlU2VsZWN0ZWRUZXh0ID0gLT5cbiAgICAgICAgICAgICAgc2V0XG4gICAgICAgICAgICAgICAgZ3JhbW1hcjogXCJzb3VyY2UuanNcIlxuICAgICAgICAgICAgICAgIHRleHQ6IFwiXCJcIlxuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDEpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDIpO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgICAgICAgc2VsZWN0ZWRUZXh0ID0gXCJcIlwiXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDEpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDIpO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygzKTtcbiAgICAgICAgICAgICAgICB9XFxuXG4gICAgICAgICAgICAgICAgXCJcIlwiXG5cbiAgICAgICAgICAgICAgc2V0IGN1cnNvcjogWzEsIDBdOyBlbnN1cmUgXCJ2IGEgelwiLCB7c2VsZWN0ZWRUZXh0fTsgZW5zdXJlIFwiZXNjYXBlXCIsIG1vZGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgc2V0IGN1cnNvcjogWzIsIDBdOyBlbnN1cmUgXCJ2IGEgelwiLCB7c2VsZWN0ZWRUZXh0fTsgZW5zdXJlIFwiZXNjYXBlXCIsIG1vZGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgc2V0IGN1cnNvcjogWzMsIDBdOyBlbnN1cmUgXCJ2IGEgelwiLCB7c2VsZWN0ZWRUZXh0fTsgZW5zdXJlIFwiZXNjYXBlXCIsIG1vZGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgc2V0IGN1cnNvcjogWzQsIDBdOyBlbnN1cmUgXCJ2IGEgelwiLCB7c2VsZWN0ZWRUZXh0fTsgZW5zdXJlIFwiZXNjYXBlXCIsIG1vZGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgc2V0IGN1cnNvcjogWzUsIDBdOyBlbnN1cmUgXCJ2IGEgelwiLCB7c2VsZWN0ZWRUZXh0fTsgZW5zdXJlIFwiZXNjYXBlXCIsIG1vZGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgc2V0IGN1cnNvcjogWzYsIDBdOyBlbnN1cmUgXCJ2IGEgelwiLCB7c2VsZWN0ZWRUZXh0fTsgZW5zdXJlIFwiZXNjYXBlXCIsIG1vZGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgICAgc2V0IGN1cnNvcjogWzcsIDBdOyBlbnN1cmUgXCJ2IGEgelwiLCB7c2VsZWN0ZWRUZXh0fTsgZW5zdXJlIFwiZXNjYXBlXCIsIG1vZGU6IFwibm9ybWFsXCJcblxuICAgICAgICAgIGl0IFwiW3RyZWVTaXR0ZXIgPSBvbl0gb3V0bW9zdCByYW5nZVwiLCAtPlxuICAgICAgICAgICAgYXRvbS5jb25maWcuc2V0KCdjb3JlLnVzZVRyZWVTaXR0ZXJQYXJzZXJzJywgdHJ1ZSlcbiAgICAgICAgICAgIGVuc3VyZVNlbGVjdGVkVGV4dCgpXG5cbiAgICAgICAgICBpdCBcIlt0cmVlU2l0dGVyID0gb2ZmXSBvdXRtb3N0IHJhbmdlXCIsIC0+XG4gICAgICAgICAgICBhdG9tLmNvbmZpZy5zZXQoJ2NvcmUudXNlVHJlZVNpdHRlclBhcnNlcnMnLCBmYWxzZSlcbiAgICAgICAgICAgIGVuc3VyZVNlbGVjdGVkVGV4dCgpXG5cbiAgIyBBbHRob3VnaCBmb2xsb3dpbmcgdGVzdCBwaWNrcyBzcGVjaWZpYyBsYW5ndWFnZSwgb3RoZXIgbGFuZ2F1YWdlcyBhcmUgYWxzb2Ugc3VwcG9ydGVkLlxuICBkZXNjcmliZSAnRnVuY3Rpb24nLCAtPlxuICAgIGRlc2NyaWJlICdjb2ZmZWUnLCAtPlxuICAgICAgcGFjayA9ICdsYW5ndWFnZS1jb2ZmZWUtc2NyaXB0J1xuICAgICAgc2NvcGUgPSAnc291cmNlLmNvZmZlZSdcbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgd2FpdHNGb3JQcm9taXNlIC0+XG4gICAgICAgICAgYXRvbS5wYWNrYWdlcy5hY3RpdmF0ZVBhY2thZ2UocGFjaylcblxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICAgICMgQ29tbW1lbnRcblxuICAgICAgICAgICAgaGVsbG8gPSAtPlxuICAgICAgICAgICAgICBhID0gMVxuICAgICAgICAgICAgICBiID0gMlxuICAgICAgICAgICAgICBjID0gM1xuXG4gICAgICAgICAgICAjIENvbW1tZW50XG4gICAgICAgICAgICBcIlwiXCJcblxuICAgICAgICBydW5zIC0+XG4gICAgICAgICAgZ3JhbW1hciA9IGF0b20uZ3JhbW1hcnMuZ3JhbW1hckZvclNjb3BlTmFtZShzY29wZSlcbiAgICAgICAgICBlZGl0b3Iuc2V0R3JhbW1hcihncmFtbWFyKVxuICAgICAgYWZ0ZXJFYWNoIC0+XG4gICAgICAgIGF0b20ucGFja2FnZXMuZGVhY3RpdmF0ZVBhY2thZ2UocGFjaylcblxuICAgICAgZGVzY3JpYmUgJ2lubmVyLWZ1bmN0aW9uIGZvciBjb2ZmZWUnLCAtPlxuICAgICAgICBpdCAnc2VsZWN0IGV4Y2VwdCBzdGFydCByb3cnLCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFszLCAzXVxuICAgICAgICAgIGVuc3VyZSAndiBpIGYnLCBzZWxlY3RlZEJ1ZmZlclJhbmdlOiBbWzMsIDBdLCBbNiwgMF1dXG5cbiAgICAgICAgaXQgXCJbd2hlbiBjdXJzb3IgaXMgYXQgY29sdW1uIDAgb2YgZnVuY3Rpb24tZm9sZCBzdGFydCByb3ddXCIsIC0+XG4gICAgICAgICAgc2V0IGN1cnNvcjogWzIsIDBdXG4gICAgICAgICAgZW5zdXJlICd2IGkgZicsIHNlbGVjdGVkQnVmZmVyUmFuZ2U6IFtbMywgMF0sIFs2LCAwXV1cblxuICAgICAgZGVzY3JpYmUgJ2EtZnVuY3Rpb24gZm9yIGNvZmZlZScsIC0+XG4gICAgICAgIGl0ICdzZWxlY3QgZnVuY3Rpb24nLCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFszLCAzXVxuICAgICAgICAgIGVuc3VyZSAndiBhIGYnLCBzZWxlY3RlZEJ1ZmZlclJhbmdlOiBbWzIsIDBdLCBbNiwgMF1dXG5cbiAgICAgICAgaXQgXCJbd2hlbiBjdXJzb3IgaXMgYXQgY29sdW1uIDAgb2YgZnVuY3Rpb24tZm9sZCBzdGFydCByb3ddXCIsIC0+XG4gICAgICAgICAgc2V0IGN1cnNvcjogWzIsIDBdXG4gICAgICAgICAgZW5zdXJlICd2IGEgZicsIHNlbGVjdGVkQnVmZmVyUmFuZ2U6IFtbMiwgMF0sIFs2LCAwXV1cblxuICAgIGRlc2NyaWJlICdqYXZhc2NyaXB0JywgLT5cbiAgICAgIHBhY2sgPSAnbGFuZ3VhZ2UtamF2YXNjcmlwdCdcbiAgICAgIHNjb3BlID0gJ3NvdXJjZS5qcydcbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgd2FpdHNGb3JQcm9taXNlIC0+IGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKHBhY2spXG4gICAgICAgIHJ1bnMgLT4gZWRpdG9yLnNldEdyYW1tYXIoYXRvbS5ncmFtbWFycy5ncmFtbWFyRm9yU2NvcGVOYW1lKHNjb3BlKSlcbiAgICAgIGFmdGVyRWFjaCAtPlxuICAgICAgICBhdG9tLnBhY2thZ2VzLmRlYWN0aXZhdGVQYWNrYWdlKHBhY2spXG5cbiAgICAgIGRlc2NyaWJlICdub24tbXVsdGktbGluZS1wYXJhbSBmdW5jdGlvbicsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICBzZXRcbiAgICAgICAgICAgIHRleHQ6IFwiXCJcIlxuXG4gICAgICAgICAgICBmdW5jdGlvbiBmMShhMSwgYTIsIGEzKSB7XG4gICAgICAgICAgICAgIGlmICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWxsb1wiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFwiXCJcIlxuXG4gICAgICAgIGl0ICdbZnJvbSBwYXJhbV0gYSBmJywgLT4gc2V0IGN1cnNvcjogWzEsIDBdOyBlbnN1cmUgJ3YgYSBmJywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogcmFuZ2VGb3JSb3dzKDEsIDUpXG4gICAgICAgIGl0ICdbZnJvbSAgYm9keV0gYSBmJywgLT4gc2V0IGN1cnNvcjogWzMsIDBdOyBlbnN1cmUgJ3YgYSBmJywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogcmFuZ2VGb3JSb3dzKDEsIDUpXG4gICAgICAgIGl0ICdbZnJvbSBwYXJhbV0gaSBmJywgLT4gc2V0IGN1cnNvcjogWzEsIDBdOyBlbnN1cmUgJ3YgaSBmJywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogcmFuZ2VGb3JSb3dzKDIsIDQpXG4gICAgICAgIGl0ICdbZnJvbSAgYm9keV0gaSBmJywgLT4gc2V0IGN1cnNvcjogWzMsIDBdOyBlbnN1cmUgJ3YgaSBmJywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogcmFuZ2VGb3JSb3dzKDIsIDQpXG5cbiAgICAgIGRlc2NyaWJlICdbY2FzZS0xXTogbXVsdGktbGluZS1wYXJhbS1mdW5jdGlvbicsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICBzZXRcbiAgICAgICAgICAgIHRleHQ6IFwiXCJcIlxuXG4gICAgICAgICAgICBmdW5jdGlvbiBmMihcbiAgICAgICAgICAgICAgYTEsXG4gICAgICAgICAgICAgIGEyLFxuICAgICAgICAgICAgICBhM1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIC8vIGNvbW1lbnRcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coYTEsIGEyLCBhMylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXCJcIlwiXG5cbiAgICAgICAgaXQgJ1tmcm9tIHBhcmFtXSBhIGYnLCAtPiBzZXQgY3Vyc29yOiBbMywgMF07IGVuc3VyZSAndiBhIGYnLCBzZWxlY3RlZEJ1ZmZlclJhbmdlOiByYW5nZUZvclJvd3MoMSwgOClcbiAgICAgICAgaXQgJ1tmcm9tICBib2R5XSBhIGYnLCAtPiBzZXQgY3Vyc29yOiBbNiwgMF07IGVuc3VyZSAndiBhIGYnLCBzZWxlY3RlZEJ1ZmZlclJhbmdlOiByYW5nZUZvclJvd3MoMSwgOClcbiAgICAgICAgaXQgJ1tmcm9tIHBhcmFtXSBpIGYnLCAtPiBzZXQgY3Vyc29yOiBbMywgMF07IGVuc3VyZSAndiBpIGYnLCBzZWxlY3RlZEJ1ZmZlclJhbmdlOiByYW5nZUZvclJvd3MoNiwgNylcbiAgICAgICAgaXQgJ1tmcm9tICBib2R5XSBpIGYnLCAtPiBzZXQgY3Vyc29yOiBbNiwgMF07IGVuc3VyZSAndiBpIGYnLCBzZWxlY3RlZEJ1ZmZlclJhbmdlOiByYW5nZUZvclJvd3MoNiwgNylcblxuICAgICAgZGVzY3JpYmUgJ1tjYXNlLTJdOiBtdWx0aS1saW5lLXBhcmFtLWZ1bmN0aW9uJywgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIHNldFxuICAgICAgICAgICAgdGV4dEM6IFwiXCJcIlxuXG4gICAgICAgICAgICBmdW5jdGlvbiBmMyhcbiAgICAgICAgICAgICAgYTEsXG4gICAgICAgICAgICAgIGEyLFxuICAgICAgICAgICAgICBhM1xuICAgICAgICAgICAgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAvLyBjb21tZW50XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGExLCBhMiwgYTMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFwiXCJcIlxuXG4gICAgICAgIGl0ICdbZnJvbSBwYXJhbV0gYSBmJywgLT4gc2V0IGN1cnNvcjogWzMsIDBdOyBlbnN1cmUgJ3YgYSBmJywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogcmFuZ2VGb3JSb3dzKDEsIDkpXG4gICAgICAgIGl0ICdbZnJvbSAgYm9keV0gYSBmJywgLT4gc2V0IGN1cnNvcjogWzcsIDBdOyBlbnN1cmUgJ3YgYSBmJywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogcmFuZ2VGb3JSb3dzKDEsIDkpXG4gICAgICAgIGl0ICdbZnJvbSBwYXJhbV0gaSBmJywgLT4gc2V0IGN1cnNvcjogWzMsIDBdOyBlbnN1cmUgJ3YgaSBmJywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogcmFuZ2VGb3JSb3dzKDcsIDgpXG4gICAgICAgIGl0ICdbZnJvbSAgYm9keV0gaSBmJywgLT4gc2V0IGN1cnNvcjogWzcsIDBdOyBlbnN1cmUgJ3YgaSBmJywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogcmFuZ2VGb3JSb3dzKDcsIDgpXG5cbiAgICAgIGRlc2NyaWJlICdbY2FzZS0zXTogYm9keSBzdGFydCBmcm9tIG5leHQtcm93LW9mLXBhcmFtLWVuZC1yb3cnLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgc2V0XG4gICAgICAgICAgICB0ZXh0QzogXCJcIlwiXG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGYzKGExLCBhMiwgYTMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIC8vIGNvbW1lbnRcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coYTEsIGEyLCBhMylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXCJcIlwiXG5cbiAgICAgICAgaXQgJ1tmcm9tIHBhcmFtXSBhIGYnLCAtPiBzZXQgY3Vyc29yOiBbMSwgMF07IGVuc3VyZSAndiBhIGYnLCBzZWxlY3RlZEJ1ZmZlclJhbmdlOiByYW5nZUZvclJvd3MoMSwgNSlcbiAgICAgICAgaXQgJ1tmcm9tICBib2R5XSBhIGYnLCAtPiBzZXQgY3Vyc29yOiBbMywgMF07IGVuc3VyZSAndiBhIGYnLCBzZWxlY3RlZEJ1ZmZlclJhbmdlOiByYW5nZUZvclJvd3MoMSwgNSlcbiAgICAgICAgaXQgJ1tmcm9tIHBhcmFtXSBpIGYnLCAtPiBzZXQgY3Vyc29yOiBbMSwgMF07IGVuc3VyZSAndiBpIGYnLCBzZWxlY3RlZEJ1ZmZlclJhbmdlOiByYW5nZUZvclJvd3MoMywgNClcbiAgICAgICAgaXQgJ1tmcm9tICBib2R5XSBpIGYnLCAtPiBzZXQgY3Vyc29yOiBbMywgMF07IGVuc3VyZSAndiBpIGYnLCBzZWxlY3RlZEJ1ZmZlclJhbmdlOiByYW5nZUZvclJvd3MoMywgNClcblxuICAgIGRlc2NyaWJlICdydWJ5JywgLT5cbiAgICAgIHBhY2sgPSAnbGFuZ3VhZ2UtcnVieSdcbiAgICAgIHNjb3BlID0gJ3NvdXJjZS5ydWJ5J1xuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgICAgICBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZShwYWNrKVxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICAgICMgQ29tbW1lbnRcblxuICAgICAgICAgICAgZGVmIGhlbGxvXG4gICAgICAgICAgICAgIGEgPSAxXG4gICAgICAgICAgICAgIGIgPSAyXG4gICAgICAgICAgICAgIGMgPSAzXG4gICAgICAgICAgICBlbmRcblxuICAgICAgICAgICAgIyBDb21tbWVudFxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgICAgY3Vyc29yOiBbMywgMF1cbiAgICAgICAgcnVucyAtPlxuICAgICAgICAgIGdyYW1tYXIgPSBhdG9tLmdyYW1tYXJzLmdyYW1tYXJGb3JTY29wZU5hbWUoc2NvcGUpXG4gICAgICAgICAgZWRpdG9yLnNldEdyYW1tYXIoZ3JhbW1hcilcbiAgICAgIGFmdGVyRWFjaCAtPlxuICAgICAgICBhdG9tLnBhY2thZ2VzLmRlYWN0aXZhdGVQYWNrYWdlKHBhY2spXG5cbiAgICAgIGRlc2NyaWJlICdpbm5lci1mdW5jdGlvbiBmb3IgcnVieScsIC0+XG4gICAgICAgIGl0ICdzZWxlY3QgZXhjZXB0IHN0YXJ0IHJvdycsIC0+XG4gICAgICAgICAgZW5zdXJlICd2IGkgZicsIHNlbGVjdGVkQnVmZmVyUmFuZ2U6IFtbMywgMF0sIFs2LCAwXV1cbiAgICAgIGRlc2NyaWJlICdhLWZ1bmN0aW9uIGZvciBydWJ5JywgLT5cbiAgICAgICAgaXQgJ3NlbGVjdCBmdW5jdGlvbicsIC0+XG4gICAgICAgICAgZW5zdXJlICd2IGEgZicsIHNlbGVjdGVkQnVmZmVyUmFuZ2U6IFtbMiwgMF0sIFs3LCAwXV1cblxuICAgIGRlc2NyaWJlICdnbycsIC0+XG4gICAgICBwYWNrID0gJ2xhbmd1YWdlLWdvJ1xuICAgICAgc2NvcGUgPSAnc291cmNlLmdvJ1xuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgICAgICBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZShwYWNrKVxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICAgIC8vIENvbW1tZW50XG5cbiAgICAgICAgICAgIGZ1bmMgbWFpbigpIHtcbiAgICAgICAgICAgICAgYSA6PSAxXG4gICAgICAgICAgICAgIGIgOj0gMlxuICAgICAgICAgICAgICBjIDo9IDNcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ29tbW1lbnRcbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgIGN1cnNvcjogWzMsIDBdXG4gICAgICAgIHJ1bnMgLT5cbiAgICAgICAgICBncmFtbWFyID0gYXRvbS5ncmFtbWFycy5ncmFtbWFyRm9yU2NvcGVOYW1lKHNjb3BlKVxuICAgICAgICAgIGVkaXRvci5zZXRHcmFtbWFyKGdyYW1tYXIpXG4gICAgICBhZnRlckVhY2ggLT5cbiAgICAgICAgYXRvbS5wYWNrYWdlcy5kZWFjdGl2YXRlUGFja2FnZShwYWNrKVxuXG4gICAgICBkZXNjcmliZSAnaW5uZXItZnVuY3Rpb24gZm9yIGdvJywgLT5cbiAgICAgICAgaXQgJ3NlbGVjdCBleGNlcHQgc3RhcnQgcm93JywgLT5cbiAgICAgICAgICBlbnN1cmUgJ3YgaSBmJywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogW1szLCAwXSwgWzYsIDBdXVxuXG4gICAgICBkZXNjcmliZSAnYS1mdW5jdGlvbiBmb3IgZ28nLCAtPlxuICAgICAgICBpdCAnc2VsZWN0IGZ1bmN0aW9uJywgLT5cbiAgICAgICAgICBlbnN1cmUgJ3YgYSBmJywgc2VsZWN0ZWRCdWZmZXJSYW5nZTogW1syLCAwXSwgWzcsIDBdXVxuXG4gIGRlc2NyaWJlICdDdXJyZW50TGluZScsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgc2V0XG4gICAgICAgIHRleHQ6IFwiXCJcIlxuICAgICAgICAgIFRoaXMgaXNcbiAgICAgICAgICAgIG11bHRpIGxpbmVcbiAgICAgICAgICB0ZXh0XG4gICAgICAgICAgXCJcIlwiXG5cbiAgICBkZXNjcmliZSAnaW5uZXItY3VycmVudC1saW5lJywgLT5cbiAgICAgIGl0ICdzZWxlY3QgY3VycmVudCBsaW5lIHdpdGhvdXQgaW5jbHVkaW5nIGxhc3QgbmV3bGluZScsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFswLCAwXVxuICAgICAgICBlbnN1cmUgJ3YgaSBsJywgc2VsZWN0ZWRUZXh0OiAnVGhpcyBpcydcbiAgICAgIGl0ICdhbHNvIHNraXAgbGVhZGluZyB3aGl0ZSBzcGFjZScsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFsxLCAwXVxuICAgICAgICBlbnN1cmUgJ3YgaSBsJywgc2VsZWN0ZWRUZXh0OiAnbXVsdGkgbGluZSdcbiAgICBkZXNjcmliZSAnYS1jdXJyZW50LWxpbmUnLCAtPlxuICAgICAgaXQgJ3NlbGVjdCBjdXJyZW50IGxpbmUgd2l0aG91dCBpbmNsdWRpbmcgbGFzdCBuZXdsaW5lIGFzIGxpa2UgYHZpbGAnLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMCwgMF1cbiAgICAgICAgZW5zdXJlICd2IGEgbCcsIHNlbGVjdGVkVGV4dDogJ1RoaXMgaXMnXG4gICAgICBpdCAnd29udCBza2lwIGxlYWRpbmcgd2hpdGUgc3BhY2Ugbm90IGxpa2UgYHZpbGAnLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMSwgMF1cbiAgICAgICAgZW5zdXJlICd2IGEgbCcsIHNlbGVjdGVkVGV4dDogJyAgbXVsdGkgbGluZSdcblxuICBkZXNjcmliZSAnQXJndW1lbnRzJywgLT5cbiAgICBkZXNjcmliZSAnYXV0by1kZXRlY3QgaW5uZXItcGFpciB0YXJnZXQnLCAtPlxuICAgICAgZGVzY3JpYmUgJ2lubmVyLXBhaXIgaXMgY29tbWEgc2VwYXJhdGVkJywgLT5cbiAgICAgICAgaXQgXCJ0YXJnZXQgaW5uZXItcGFyZW4gYnkgYXV0by1kZXRlY3RcIiwgLT5cbiAgICAgICAgICBzZXQgdGV4dEM6IFwiKDF8c3QsIDJuZClcIjsgZW5zdXJlICdkIGkgLCcsIHRleHRDOiBcIih8LCAybmQpXCJcbiAgICAgICAgICBzZXQgdGV4dEM6IFwiKDF8c3QsIDJuZClcIjsgZW5zdXJlICdkIGEgLCcsIHRleHRDOiBcIih8Mm5kKVwiXG4gICAgICAgICAgc2V0IHRleHRDOiBcIigxc3QsIDJ8bmQpXCI7IGVuc3VyZSAnZCBpICwnLCB0ZXh0QzogXCIoMXN0LCB8KVwiXG4gICAgICAgICAgc2V0IHRleHRDOiBcIigxc3QsIDJ8bmQpXCI7IGVuc3VyZSAnZCBhICwnLCB0ZXh0QzogXCIoMXN0fClcIlxuICAgICAgICBpdCBcInRhcmdldCBpbm5lci1jdXJseS1icmFja2V0IGJ5IGF1dG8tZGV0ZWN0XCIsIC0+XG4gICAgICAgICAgc2V0IHRleHRDOiBcInsxfHN0LCAybmR9XCI7IGVuc3VyZSAnZCBpICwnLCB0ZXh0QzogXCJ7fCwgMm5kfVwiXG4gICAgICAgICAgc2V0IHRleHRDOiBcInsxfHN0LCAybmR9XCI7IGVuc3VyZSAnZCBhICwnLCB0ZXh0QzogXCJ7fDJuZH1cIlxuICAgICAgICAgIHNldCB0ZXh0QzogXCJ7MXN0LCAyfG5kfVwiOyBlbnN1cmUgJ2QgaSAsJywgdGV4dEM6IFwiezFzdCwgfH1cIlxuICAgICAgICAgIHNldCB0ZXh0QzogXCJ7MXN0LCAyfG5kfVwiOyBlbnN1cmUgJ2QgYSAsJywgdGV4dEM6IFwiezFzdHx9XCJcbiAgICAgICAgaXQgXCJ0YXJnZXQgaW5uZXItc3F1YXJlLWJyYWNrZXQgYnkgYXV0by1kZXRlY3RcIiwgLT5cbiAgICAgICAgICBzZXQgdGV4dEM6IFwiWzF8c3QsIDJuZF1cIjsgZW5zdXJlICdkIGkgLCcsIHRleHRDOiBcIlt8LCAybmRdXCJcbiAgICAgICAgICBzZXQgdGV4dEM6IFwiWzF8c3QsIDJuZF1cIjsgZW5zdXJlICdkIGEgLCcsIHRleHRDOiBcIlt8Mm5kXVwiXG4gICAgICAgICAgc2V0IHRleHRDOiBcIlsxc3QsIDJ8bmRdXCI7IGVuc3VyZSAnZCBpICwnLCB0ZXh0QzogXCJbMXN0LCB8XVwiXG4gICAgICAgICAgc2V0IHRleHRDOiBcIlsxc3QsIDJ8bmRdXCI7IGVuc3VyZSAnZCBhICwnLCB0ZXh0QzogXCJbMXN0fF1cIlxuICAgICAgZGVzY3JpYmUgJ2lubmVyLXBhaXIgaXMgc3BhY2Ugc2VwYXJhdGVkJywgLT5cbiAgICAgICAgaXQgXCJ0YXJnZXQgaW5uZXItcGFyZW4gYnkgYXV0by1kZXRlY3RcIiwgLT5cbiAgICAgICAgICBzZXQgdGV4dEM6IFwiKDF8c3QgMm5kKVwiOyBlbnN1cmUgJ2QgaSAsJywgdGV4dEM6IFwiKHwgMm5kKVwiXG4gICAgICAgICAgc2V0IHRleHRDOiBcIigxfHN0IDJuZClcIjsgZW5zdXJlICdkIGEgLCcsIHRleHRDOiBcIih8Mm5kKVwiXG4gICAgICAgICAgc2V0IHRleHRDOiBcIigxc3QgMnxuZClcIjsgZW5zdXJlICdkIGkgLCcsIHRleHRDOiBcIigxc3QgfClcIlxuICAgICAgICAgIHNldCB0ZXh0QzogXCIoMXN0IDJ8bmQpXCI7IGVuc3VyZSAnZCBhICwnLCB0ZXh0QzogXCIoMXN0fClcIlxuICAgICAgICBpdCBcInRhcmdldCBpbm5lci1jdXJseS1icmFja2V0IGJ5IGF1dG8tZGV0ZWN0XCIsIC0+XG4gICAgICAgICAgc2V0IHRleHRDOiBcInsxfHN0IDJuZH1cIjsgZW5zdXJlICdkIGkgLCcsIHRleHRDOiBcInt8IDJuZH1cIlxuICAgICAgICAgIHNldCB0ZXh0QzogXCJ7MXxzdCAybmR9XCI7IGVuc3VyZSAnZCBhICwnLCB0ZXh0QzogXCJ7fDJuZH1cIlxuICAgICAgICAgIHNldCB0ZXh0QzogXCJ7MXN0IDJ8bmR9XCI7IGVuc3VyZSAnZCBpICwnLCB0ZXh0QzogXCJ7MXN0IHx9XCJcbiAgICAgICAgICBzZXQgdGV4dEM6IFwiezFzdCAyfG5kfVwiOyBlbnN1cmUgJ2QgYSAsJywgdGV4dEM6IFwiezFzdHx9XCJcbiAgICAgICAgaXQgXCJ0YXJnZXQgaW5uZXItc3F1YXJlLWJyYWNrZXQgYnkgYXV0by1kZXRlY3RcIiwgLT5cbiAgICAgICAgICBzZXQgdGV4dEM6IFwiWzF8c3QgMm5kXVwiOyBlbnN1cmUgJ2QgaSAsJywgdGV4dEM6IFwiW3wgMm5kXVwiXG4gICAgICAgICAgc2V0IHRleHRDOiBcIlsxfHN0IDJuZF1cIjsgZW5zdXJlICdkIGEgLCcsIHRleHRDOiBcIlt8Mm5kXVwiXG4gICAgICAgICAgc2V0IHRleHRDOiBcIlsxc3QgMnxuZF1cIjsgZW5zdXJlICdkIGkgLCcsIHRleHRDOiBcIlsxc3QgfF1cIlxuICAgICAgICAgIHNldCB0ZXh0QzogXCJbMXN0IDJ8bmRdXCI7IGVuc3VyZSAnZCBhICwnLCB0ZXh0QzogXCJbMXN0fF1cIlxuICAgIGRlc2NyaWJlIFwiW2ZhbGxiYWNrXSB3aGVuIGF1dG8tZGV0ZWN0IGZhaWxlZCwgdGFyZ2V0IGN1cnJlbnQtbGluZVwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICBpZiBoZWxsbyh3b3JsZCkgYW5kIGdvb2QoYnllKSB7XG4gICAgICAgICAgICAxc3Q7XG4gICAgICAgICAgICAybmQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIFwiXCJcIlxuXG4gICAgICBpdCBcImRlbGV0ZSAxc3QgZWxlbSBvZiBpbm5lci1jdXJseS1icmFja2V0IHdoZW4gYXV0by1kZXRlY3Qgc3VjY2VlZGVkXCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFsxLCAzXVxuICAgICAgICBlbnN1cmUgJ2QgYSAsJyxcbiAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgaWYgaGVsbG8od29ybGQpIGFuZCBnb29kKGJ5ZSkge1xuICAgICAgICAgICAgfDJuZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgXCJcIlwiXG4gICAgICBpdCBcImRlbGV0ZSAyc3QgZWxlbSBvZiBpbm5lci1jdXJseS1icmFja2V0IHdoZW4gYXV0by1kZXRlY3Qgc3VjY2VlZGVkXCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFsyLCAzXVxuICAgICAgICBlbnN1cmUgJ2QgYSAsJyxcbiAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgaWYgaGVsbG8od29ybGQpIGFuZCBnb29kKGJ5ZSkge1xuICAgICAgICAgICAgMXN0fDtcbiAgICAgICAgICB9XG4gICAgICAgICAgXCJcIlwiXG4gICAgICBpdCBcImRlbGV0ZSAxc3QgZWxlbSBvZiBjdXJyZW50LWxpbmUgd2hlbiBhdXRvLWRldGVjdCBmYWlsZWRcIiwgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzAsIDBdXG4gICAgICAgIGVuc3VyZSAnZCBhICwnLFxuICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICB8aGVsbG8od29ybGQpIGFuZCBnb29kKGJ5ZSkge1xuICAgICAgICAgICAgMXN0O1xuICAgICAgICAgICAgMm5kO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcIlwiXCJcbiAgICAgIGl0IFwiZGVsZXRlIDJuZCBlbGVtIG9mIGN1cnJlbnQtbGluZSB3aGVuIGF1dG8tZGV0ZWN0IGZhaWxlZFwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMCwgM11cbiAgICAgICAgZW5zdXJlICdkIGEgLCcsXG4gICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgIGlmIHxhbmQgZ29vZChieWUpIHtcbiAgICAgICAgICAgIDFzdDtcbiAgICAgICAgICAgIDJuZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgXCJcIlwiXG4gICAgICBpdCBcImRlbGV0ZSAzcmQgZWxlbSBvZiBjdXJyZW50LWxpbmUgd2hlbiBhdXRvLWRldGVjdCBmYWlsZWRcIiwgLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzAsIDE2XVxuICAgICAgICBlbnN1cmUgJ2QgYSAsJyxcbiAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgaWYgaGVsbG8od29ybGQpIHxnb29kKGJ5ZSkge1xuICAgICAgICAgICAgMXN0O1xuICAgICAgICAgICAgMm5kO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcIlwiXCJcbiAgICAgIGl0IFwiZGVsZXRlIDR0aCBlbGVtIG9mIGN1cnJlbnQtbGluZSB3aGVuIGF1dG8tZGV0ZWN0IGZhaWxlZFwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMCwgMjBdXG4gICAgICAgIGVuc3VyZSAnZCBhICwnLFxuICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICBpZiBoZWxsbyh3b3JsZCkgYW5kIHx7XG4gICAgICAgICAgICAxc3Q7XG4gICAgICAgICAgICAybmQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIFwiXCJcIlxuXG4gICAgZGVzY3JpYmUgJ3NpbmdsZSBsaW5lIGNvbW1hIHNlcGFyYXRlZCB0ZXh0JywgLT5cbiAgICAgIGRlc2NyaWJlIFwiY2hhbmdlIDFzdCBhcmdcIiwgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPiAgICAgICAgICAgICAgIHNldCB0ZXh0QzogXCJ2YXIgYSA9IGZ1bmMoZnxpcnN0KDEsIDIsIDMpLCBzZWNvbmQoKSwgMylcIlxuICAgICAgICBpdCAnY2hhbmdlJywgLT4gZW5zdXJlICdjIGkgLCcsIHRleHRDOiBcInZhciBhID0gZnVuYyh8LCBzZWNvbmQoKSwgMylcIlxuICAgICAgICBpdCAnY2hhbmdlJywgLT4gZW5zdXJlICdjIGEgLCcsIHRleHRDOiBcInZhciBhID0gZnVuYyh8c2Vjb25kKCksIDMpXCJcblxuICAgICAgZGVzY3JpYmUgJ2NoYW5nZSAybmQgYXJnJywgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPiAgICAgICAgICAgICAgIHNldCB0ZXh0QzogXCJ2YXIgYSA9IGZ1bmMoZmlyc3QoMSwgMiwgMyksfCBzZWNvbmQoKSwgMylcIlxuICAgICAgICBpdCAnY2hhbmdlJywgLT4gZW5zdXJlICdjIGkgLCcsIHRleHRDOiBcInZhciBhID0gZnVuYyhmaXJzdCgxLCAyLCAzKSwgfCwgMylcIlxuICAgICAgICBpdCAnY2hhbmdlJywgLT4gZW5zdXJlICdjIGEgLCcsIHRleHRDOiBcInZhciBhID0gZnVuYyhmaXJzdCgxLCAyLCAzKSwgfDMpXCJcblxuICAgICAgZGVzY3JpYmUgJ2NoYW5nZSAzcmQgYXJnJywgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPiAgICAgICAgICAgICAgIHNldCB0ZXh0QzogXCJ2YXIgYSA9IGZ1bmMoZmlyc3QoMSwgMiwgMyksIHNlY29uZCgpLHwgMylcIlxuICAgICAgICBpdCAnY2hhbmdlJywgLT4gZW5zdXJlICdjIGkgLCcsIHRleHRDOiBcInZhciBhID0gZnVuYyhmaXJzdCgxLCAyLCAzKSwgc2Vjb25kKCksIHwpXCJcbiAgICAgICAgaXQgJ2NoYW5nZScsIC0+IGVuc3VyZSAnYyBhICwnLCB0ZXh0QzogXCJ2YXIgYSA9IGZ1bmMoZmlyc3QoMSwgMiwgMyksIHNlY29uZCgpfClcIlxuXG4gICAgICBkZXNjcmliZSAnd2hlbiBjdXJzb3IgaXMgb24tY29tbWEtc2VwYXJhdG9yLCBpdCBhZmZlY3RzIHByZWNlZWRpbmcgYXJnJywgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPiAgICAgICAgICAgICAgICAgICBzZXQgdGV4dEM6IFwidmFyIGEgPSBmdW5jKGZpcnN0KDEsIDIsIDMpfCwgc2Vjb25kKCksIDMpXCJcbiAgICAgICAgaXQgJ2NoYW5nZSAxc3QnLCAtPiBlbnN1cmUgJ2MgaSAsJywgdGV4dEM6IFwidmFyIGEgPSBmdW5jKHwsIHNlY29uZCgpLCAzKVwiXG4gICAgICAgIGl0ICdjaGFuZ2UgMXN0JywgLT4gZW5zdXJlICdjIGEgLCcsIHRleHRDOiBcInZhciBhID0gZnVuYyh8c2Vjb25kKCksIDMpXCJcblxuICAgICAgZGVzY3JpYmUgJ2N1cnNvci1pcy1vbi13aGl0ZS1zcGFjZSwgaXQgYWZmZWN0cyBmb2xsb3dlZCBhcmcnLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+ICAgICAgICAgICAgICAgICAgIHNldCB0ZXh0QzogXCJ2YXIgYSA9IGZ1bmMoZmlyc3QoMSwgMiwgMyksfCBzZWNvbmQoKSwgMylcIlxuICAgICAgICBpdCAnY2hhbmdlIDJuZCcsIC0+IGVuc3VyZSAnYyBpICwnLCB0ZXh0QzogXCJ2YXIgYSA9IGZ1bmMoZmlyc3QoMSwgMiwgMyksIHwsIDMpXCJcbiAgICAgICAgaXQgJ2NoYW5nZSAybmQnLCAtPiBlbnN1cmUgJ2MgYSAsJywgdGV4dEM6IFwidmFyIGEgPSBmdW5jKGZpcnN0KDEsIDIsIDMpLCB8MylcIlxuXG4gICAgICBkZXNjcmliZSBcImN1cnNvci1pcy1vbi1wYXJlaHRoZXNpcywgaXQgd29udCB0YXJnZXQgaW5uZXItcGFyZW50XCIsIC0+XG4gICAgICAgIGl0ICdjaGFuZ2UgMXN0IG9mIG91dGVyLXBhcmVuJywgLT5cbiAgICAgICAgICBzZXQgdGV4dEM6IFwidmFyIGEgPSBmdW5jKGZpcnN0fCgxLCAyLCAzKSwgc2Vjb25kKCksIDMpXCJcbiAgICAgICAgICBlbnN1cmUgJ2MgaSAsJywgdGV4dEM6IFwidmFyIGEgPSBmdW5jKHwsIHNlY29uZCgpLCAzKVwiXG4gICAgICAgIGl0ICdjaGFuZ2UgM3JkIG9mIG91dGVyLXBhcmVuJywgLT5cbiAgICAgICAgICBzZXQgdGV4dEM6IFwidmFyIGEgPSBmdW5jKGZpcnN0KDEsIDIsIDN8KSwgc2Vjb25kKCksIDMpXCJcbiAgICAgICAgICBlbnN1cmUgJ2MgaSAsJywgdGV4dEM6IFwidmFyIGEgPSBmdW5jKHwsIHNlY29uZCgpLCAzKVwiXG5cbiAgICAgIGRlc2NyaWJlIFwiY3Vyc29yLWlzLW5leHQtb3ItYmVmb3JlIHBhcmVodGhlc2lzLCBpdCB0YXJnZXQgaW5uZXItcGFyZW50XCIsIC0+XG4gICAgICAgIGl0ICdjaGFuZ2UgMXN0IG9mIGlubmVyLXBhcmVuJywgLT5cbiAgICAgICAgICBzZXQgdGV4dEM6IFwidmFyIGEgPSBmdW5jKGZpcnN0KHwxLCAyLCAzKSwgc2Vjb25kKCksIDMpXCJcbiAgICAgICAgICBlbnN1cmUgJ2MgaSAsJywgdGV4dEM6IFwidmFyIGEgPSBmdW5jKGZpcnN0KHwsIDIsIDMpLCBzZWNvbmQoKSwgMylcIlxuICAgICAgICBpdCAnY2hhbmdlIDNyZCBvZiBpbm5lci1wYXJlbicsIC0+XG4gICAgICAgICAgc2V0IHRleHRDOiBcInZhciBhID0gZnVuYyhmaXJzdCgxLCAyLCB8MyksIHNlY29uZCgpLCAzKVwiXG4gICAgICAgICAgZW5zdXJlICdjIGkgLCcsIHRleHRDOiBcInZhciBhID0gZnVuYyhmaXJzdCgxLCAyLCB8KSwgc2Vjb25kKCksIDMpXCJcblxuICAgIGRlc2NyaWJlICdzbGluZ2xlIGxpbmUgc3BhY2Ugc2VwYXJhdGVkIHRleHQnLCAtPlxuICAgICAgZGVzY3JpYmUgXCJjaGFuZ2UgMXN0IGFyZ1wiLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+ICAgICAgICAgICAgICAgc2V0IHRleHRDOiBcIiV3KHwxc3QgMm5kIDNyZClcIlxuICAgICAgICBpdCAnY2hhbmdlJywgLT4gZW5zdXJlICdjIGkgLCcsIHRleHRDOiBcIiV3KHwgMm5kIDNyZClcIlxuICAgICAgICBpdCAnY2hhbmdlJywgLT4gZW5zdXJlICdjIGEgLCcsIHRleHRDOiBcIiV3KHwybmQgM3JkKVwiXG4gICAgICBkZXNjcmliZSBcImNoYW5nZSAybmQgYXJnXCIsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT4gICAgICAgICAgICAgICBzZXQgdGV4dEM6IFwiJXcoMXN0IHwybmQgM3JkKVwiXG4gICAgICAgIGl0ICdjaGFuZ2UnLCAtPiBlbnN1cmUgJ2MgaSAsJywgdGV4dEM6IFwiJXcoMXN0IHwgM3JkKVwiXG4gICAgICAgIGl0ICdjaGFuZ2UnLCAtPiBlbnN1cmUgJ2MgYSAsJywgdGV4dEM6IFwiJXcoMXN0IHwzcmQpXCJcbiAgICAgIGRlc2NyaWJlIFwiY2hhbmdlIDJuZCBhcmdcIiwgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPiAgICAgICAgICAgICAgIHNldCB0ZXh0QzogXCIldygxc3QgMm5kIHwzcmQpXCJcbiAgICAgICAgaXQgJ2NoYW5nZScsIC0+IGVuc3VyZSAnYyBpICwnLCB0ZXh0QzogXCIldygxc3QgMm5kIHwpXCJcbiAgICAgICAgaXQgJ2NoYW5nZScsIC0+IGVuc3VyZSAnYyBhICwnLCB0ZXh0QzogXCIldygxc3QgMm5kfClcIlxuXG4gICAgZGVzY3JpYmUgJ211bHRpIGxpbmUgY29tbWEgc2VwYXJhdGVkIHRleHQnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0Q186IFwiXCJcIlxuICAgICAgICAgIFtcbiAgICAgICAgICAgIFwiMXN0IGVsZW0gaXMgc3RyaW5nXCIsXG4gICAgICAgICAgICAoKSA9PiBoZWxsbygnMm5kIGVsbSBpcyBmdW5jdGlvbicpLFxuICAgICAgICAgICAgM3JkRWxtSGFzVHJhaWxpbmdDb21tYSxcbiAgICAgICAgICBdXG4gICAgICAgICAgXCJcIlwiXG4gICAgICBkZXNjcmliZSBcImNoYW5nZSAxc3QgYXJnXCIsIC0+XG4gICAgICAgIGl0ICdjaGFuZ2UgMXN0IGlubmVyLWFyZycsIC0+XG4gICAgICAgICAgc2V0IGN1cnNvcjogWzEsIDBdXG4gICAgICAgICAgZW5zdXJlICdjIGkgLCcsXG4gICAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIHwsXG4gICAgICAgICAgICAgICgpID0+IGhlbGxvKCcybmQgZWxtIGlzIGZ1bmN0aW9uJyksXG4gICAgICAgICAgICAgIDNyZEVsbUhhc1RyYWlsaW5nQ29tbWEsXG4gICAgICAgICAgICBdXG4gICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgaXQgJ2NoYW5nZSAxc3QgYS1hcmcnLCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFsxLCAwXVxuICAgICAgICAgIGVuc3VyZSAnYyBhICwnLFxuICAgICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICB8KCkgPT4gaGVsbG8oJzJuZCBlbG0gaXMgZnVuY3Rpb24nKSxcbiAgICAgICAgICAgICAgM3JkRWxtSGFzVHJhaWxpbmdDb21tYSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICBpdCAnY2hhbmdlIDJuZCBpbm5lci1hcmcnLCAtPlxuICAgICAgICAgIHNldCBjdXJzb3I6IFsyLCAwXVxuICAgICAgICAgIGVuc3VyZSAnYyBpICwnLFxuICAgICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBcIjFzdCBlbGVtIGlzIHN0cmluZ1wiLFxuICAgICAgICAgICAgICB8LFxuICAgICAgICAgICAgICAzcmRFbG1IYXNUcmFpbGluZ0NvbW1hLFxuICAgICAgICAgICAgXVxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgIGl0ICdjaGFuZ2UgMm5kIGEtYXJnJywgLT5cbiAgICAgICAgICBzZXQgY3Vyc29yOiBbMiwgMF1cbiAgICAgICAgICBlbnN1cmUgJ2MgYSAsJyxcbiAgICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgXCIxc3QgZWxlbSBpcyBzdHJpbmdcIixcbiAgICAgICAgICAgICAgfDNyZEVsbUhhc1RyYWlsaW5nQ29tbWEsXG4gICAgICAgICAgICBdXG4gICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgaXQgJ2NoYW5nZSAzcmQgaW5uZXItYXJnJywgLT5cbiAgICAgICAgICBzZXQgY3Vyc29yOiBbMywgMF1cbiAgICAgICAgICBlbnN1cmUgJ2MgaSAsJyxcbiAgICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgXCIxc3QgZWxlbSBpcyBzdHJpbmdcIixcbiAgICAgICAgICAgICAgKCkgPT4gaGVsbG8oJzJuZCBlbG0gaXMgZnVuY3Rpb24nKSxcbiAgICAgICAgICAgICAgfCxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICBpdCAnY2hhbmdlIDNyZCBhLWFyZycsIC0+XG4gICAgICAgICAgc2V0IGN1cnNvcjogWzMsIDBdXG4gICAgICAgICAgZW5zdXJlICdjIGEgLCcsXG4gICAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIFwiMXN0IGVsZW0gaXMgc3RyaW5nXCIsXG4gICAgICAgICAgICAgICgpID0+IGhlbGxvKCcybmQgZWxtIGlzIGZ1bmN0aW9uJyl8LFxuICAgICAgICAgICAgXVxuICAgICAgICAgICAgXCJcIlwiXG5cbiAgICBkZXNjcmliZSAnd2hlbiBpdCBjb3VkbnQgZmluZCBpbm5lci1wYWlyIGZyb20gY3Vyc29yIGl0IHRhcmdldCBjdXJyZW50LWxpbmUnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0Q186IFwiXCJcIlxuICAgICAgICAgIGlmIHxpc01vcm5pbmcodGltZSwgb2YsIHRoZSwgZGF5KSB7XG4gICAgICAgICAgICBoZWxsbG8oXCJ3b3JsZFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgXCJcIlwiXG4gICAgICBpdCBcImNoYW5nZSBpbm5lci1hcmdcIiwgLT5cbiAgICAgICAgZW5zdXJlIFwiYyBpICxcIixcbiAgICAgICAgICB0ZXh0Q186IFwiXCJcIlxuICAgICAgICAgIGlmIHwge1xuICAgICAgICAgICAgaGVsbGxvKFwid29ybGRcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIFwiXCJcIlxuICAgICAgaXQgXCJjaGFuZ2UgYS1hcmdcIiwgLT5cbiAgICAgICAgZW5zdXJlIFwiYyBhICxcIixcbiAgICAgICAgICB0ZXh0Q186IFwiXCJcIlxuICAgICAgICAgIGlmIHx7XG4gICAgICAgICAgICBoZWxsbG8oXCJ3b3JsZFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgXCJcIlwiXG5cbiAgZGVzY3JpYmUgJ0VudGlyZScsIC0+XG4gICAgdGV4dCA9IFwiXCJcIlxuICAgICAgVGhpcyBpc1xuICAgICAgICBtdWx0aSBsaW5lXG4gICAgICB0ZXh0XG4gICAgICBcIlwiXCJcbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBzZXQgdGV4dDogdGV4dCwgY3Vyc29yOiBbMCwgMF1cbiAgICBkZXNjcmliZSAnaW5uZXItZW50aXJlJywgLT5cbiAgICAgIGl0ICdzZWxlY3QgZW50aXJlIGJ1ZmZlcicsIC0+XG4gICAgICAgIGVuc3VyZSAnZXNjYXBlJywgc2VsZWN0ZWRUZXh0OiAnJ1xuICAgICAgICBlbnN1cmUgJ3YgaSBlJywgc2VsZWN0ZWRUZXh0OiB0ZXh0XG4gICAgICAgIGVuc3VyZSAnZXNjYXBlJywgc2VsZWN0ZWRUZXh0OiAnJ1xuICAgICAgICBlbnN1cmUgJ2ogaiB2IGkgZScsIHNlbGVjdGVkVGV4dDogdGV4dFxuICAgIGRlc2NyaWJlICdhLWVudGlyZScsIC0+XG4gICAgICBpdCAnc2VsZWN0IGVudGlyZSBidWZmZXInLCAtPlxuICAgICAgICBlbnN1cmUgJ2VzY2FwZScsIHNlbGVjdGVkVGV4dDogJydcbiAgICAgICAgZW5zdXJlICd2IGEgZScsIHNlbGVjdGVkVGV4dDogdGV4dFxuICAgICAgICBlbnN1cmUgJ2VzY2FwZScsIHNlbGVjdGVkVGV4dDogJydcbiAgICAgICAgZW5zdXJlICdqIGogdiBhIGUnLCBzZWxlY3RlZFRleHQ6IHRleHRcblxuICBkZXNjcmliZSAnU2VhcmNoTWF0Y2hGb3J3YXJkLCBTZWFyY2hCYWNrd2FyZHMnLCAtPlxuICAgIHRleHQgPSBcIlwiXCJcbiAgICAgIDAgeHh4XG4gICAgICAxIGFiYyB4eHhcbiAgICAgIDIgICB4eHggeXl5XG4gICAgICAzIHh4eCBhYmNcbiAgICAgIDQgYWJjXFxuXG4gICAgICBcIlwiXCJcbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBqYXNtaW5lLmF0dGFjaFRvRE9NKGF0b20udmlld3MuZ2V0VmlldyhhdG9tLndvcmtzcGFjZSkpXG5cbiAgICAgIHNldCB0ZXh0OiB0ZXh0LCBjdXJzb3I6IFswLCAwXVxuICAgICAgZW5zdXJlICcvIGFiYyBlbnRlcicsIGN1cnNvcjogWzEsIDJdLCBtb2RlOiAnbm9ybWFsJ1xuICAgICAgZXhwZWN0KHZpbVN0YXRlLmdsb2JhbFN0YXRlLmdldCgnbGFzdFNlYXJjaFBhdHRlcm4nKSkudG9FcXVhbCAvYWJjL2dcblxuICAgIGRlc2NyaWJlICdnbiBmcm9tIG5vcm1hbCBtb2RlJywgLT5cbiAgICAgIGl0ICdzZWxlY3QgcmFuZ2VzIG1hdGNoZXMgdG8gbGFzdCBzZWFyY2ggcGF0dGVybiBhbmQgZXh0ZW5kIHNlbGVjdGlvbicsIC0+XG4gICAgICAgIGVuc3VyZSAnZyBuJyxcbiAgICAgICAgICBjdXJzb3I6IFsxLCA1XVxuICAgICAgICAgIG1vZGU6IFsndmlzdWFsJywgJ2NoYXJhY3Rlcndpc2UnXVxuICAgICAgICAgIHNlbGVjdGlvbklzUmV2ZXJzZWQ6IGZhbHNlXG4gICAgICAgICAgc2VsZWN0ZWRUZXh0OiAnYWJjJ1xuICAgICAgICBlbnN1cmUgJ2cgbicsXG4gICAgICAgICAgc2VsZWN0aW9uSXNSZXZlcnNlZDogZmFsc2VcbiAgICAgICAgICBtb2RlOiBbJ3Zpc3VhbCcsICdjaGFyYWN0ZXJ3aXNlJ11cbiAgICAgICAgICBzZWxlY3RlZFRleHQ6IFwiXCJcIlxuICAgICAgICAgICAgYWJjIHh4eFxuICAgICAgICAgICAgMiAgIHh4eCB5eXlcbiAgICAgICAgICAgIDMgeHh4IGFiY1xuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZSAnZyBuJyxcbiAgICAgICAgICBzZWxlY3Rpb25Jc1JldmVyc2VkOiBmYWxzZVxuICAgICAgICAgIG1vZGU6IFsndmlzdWFsJywgJ2NoYXJhY3Rlcndpc2UnXVxuICAgICAgICAgIHNlbGVjdGVkVGV4dDogXCJcIlwiXG4gICAgICAgICAgICBhYmMgeHh4XG4gICAgICAgICAgICAyICAgeHh4IHl5eVxuICAgICAgICAgICAgMyB4eHggYWJjXG4gICAgICAgICAgICA0IGFiY1xuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZSAnZyBuJywgIyBEbyBub3RoaW5nXG4gICAgICAgICAgc2VsZWN0aW9uSXNSZXZlcnNlZDogZmFsc2VcbiAgICAgICAgICBtb2RlOiBbJ3Zpc3VhbCcsICdjaGFyYWN0ZXJ3aXNlJ11cbiAgICAgICAgICBzZWxlY3RlZFRleHQ6IFwiXCJcIlxuICAgICAgICAgICAgYWJjIHh4eFxuICAgICAgICAgICAgMiAgIHh4eCB5eXlcbiAgICAgICAgICAgIDMgeHh4IGFiY1xuICAgICAgICAgICAgNCBhYmNcbiAgICAgICAgICAgIFwiXCJcIlxuICAgIGRlc2NyaWJlICdnTiBmcm9tIG5vcm1hbCBtb2RlJywgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzQsIDNdXG4gICAgICBpdCAnc2VsZWN0IHJhbmdlcyBtYXRjaGVzIHRvIGxhc3Qgc2VhcmNoIHBhdHRlcm4gYW5kIGV4dGVuZCBzZWxlY3Rpb24nLCAtPlxuICAgICAgICBlbnN1cmUgJ2cgTicsXG4gICAgICAgICAgY3Vyc29yOiBbNCwgMl1cbiAgICAgICAgICBtb2RlOiBbJ3Zpc3VhbCcsICdjaGFyYWN0ZXJ3aXNlJ11cbiAgICAgICAgICBzZWxlY3Rpb25Jc1JldmVyc2VkOiB0cnVlXG4gICAgICAgICAgc2VsZWN0ZWRUZXh0OiAnYWJjJ1xuICAgICAgICBlbnN1cmUgJ2cgTicsXG4gICAgICAgICAgc2VsZWN0aW9uSXNSZXZlcnNlZDogdHJ1ZVxuICAgICAgICAgIG1vZGU6IFsndmlzdWFsJywgJ2NoYXJhY3Rlcndpc2UnXVxuICAgICAgICAgIHNlbGVjdGVkVGV4dDogXCJcIlwiXG4gICAgICAgICAgICBhYmNcbiAgICAgICAgICAgIDQgYWJjXG4gICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgZW5zdXJlICdnIE4nLFxuICAgICAgICAgIHNlbGVjdGlvbklzUmV2ZXJzZWQ6IHRydWVcbiAgICAgICAgICBtb2RlOiBbJ3Zpc3VhbCcsICdjaGFyYWN0ZXJ3aXNlJ11cbiAgICAgICAgICBzZWxlY3RlZFRleHQ6IFwiXCJcIlxuICAgICAgICAgICAgYWJjIHh4eFxuICAgICAgICAgICAgMiAgIHh4eCB5eXlcbiAgICAgICAgICAgIDMgeHh4IGFiY1xuICAgICAgICAgICAgNCBhYmNcbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICBlbnN1cmUgJ2cgTicsICMgRG8gbm90aGluZ1xuICAgICAgICAgIHNlbGVjdGlvbklzUmV2ZXJzZWQ6IHRydWVcbiAgICAgICAgICBtb2RlOiBbJ3Zpc3VhbCcsICdjaGFyYWN0ZXJ3aXNlJ11cbiAgICAgICAgICBzZWxlY3RlZFRleHQ6IFwiXCJcIlxuICAgICAgICAgICAgYWJjIHh4eFxuICAgICAgICAgICAgMiAgIHh4eCB5eXlcbiAgICAgICAgICAgIDMgeHh4IGFiY1xuICAgICAgICAgICAgNCBhYmNcbiAgICAgICAgICAgIFwiXCJcIlxuICAgIGRlc2NyaWJlICdhcyBvcGVyYXRvciB0YXJnZXQnLCAtPlxuICAgICAgaXQgJ2RlbGV0ZSBuZXh0IG9jY3VycmVuY2Ugb2YgbGFzdCBzZWFyY2ggcGF0dGVybicsIC0+XG4gICAgICAgIGVuc3VyZSAnZCBnIG4nLFxuICAgICAgICAgIGN1cnNvcjogWzEsIDJdXG4gICAgICAgICAgbW9kZTogJ25vcm1hbCdcbiAgICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICAgIDAgeHh4XG4gICAgICAgICAgICAxICB4eHhcbiAgICAgICAgICAgIDIgICB4eHggeXl5XG4gICAgICAgICAgICAzIHh4eCBhYmNcbiAgICAgICAgICAgIDQgYWJjXFxuXG4gICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgZW5zdXJlICcuJyxcbiAgICAgICAgICBjdXJzb3I6IFszLCA1XVxuICAgICAgICAgIG1vZGU6ICdub3JtYWwnXG4gICAgICAgICAgdGV4dF86IFwiXCJcIlxuICAgICAgICAgICAgMCB4eHhcbiAgICAgICAgICAgIDEgIHh4eFxuICAgICAgICAgICAgMiAgIHh4eCB5eXlcbiAgICAgICAgICAgIDMgeHh4X1xuICAgICAgICAgICAgNCBhYmNcXG5cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICBlbnN1cmUgJy4nLFxuICAgICAgICAgIGN1cnNvcjogWzQsIDFdXG4gICAgICAgICAgbW9kZTogJ25vcm1hbCdcbiAgICAgICAgICB0ZXh0XzogXCJcIlwiXG4gICAgICAgICAgICAwIHh4eFxuICAgICAgICAgICAgMSAgeHh4XG4gICAgICAgICAgICAyICAgeHh4IHl5eVxuICAgICAgICAgICAgMyB4eHhfXG4gICAgICAgICAgICA0IFxcblxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICBpdCAnY2hhbmdlIG5leHQgb2NjdXJyZW5jZSBvZiBsYXN0IHNlYXJjaCBwYXR0ZXJuJywgLT5cbiAgICAgICAgZW5zdXJlICdjIGcgbicsXG4gICAgICAgICAgY3Vyc29yOiBbMSwgMl1cbiAgICAgICAgICBtb2RlOiAnaW5zZXJ0J1xuICAgICAgICAgIHRleHQ6IFwiXCJcIlxuICAgICAgICAgICAgMCB4eHhcbiAgICAgICAgICAgIDEgIHh4eFxuICAgICAgICAgICAgMiAgIHh4eCB5eXlcbiAgICAgICAgICAgIDMgeHh4IGFiY1xuICAgICAgICAgICAgNCBhYmNcXG5cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICBlbnN1cmUgJ2VzY2FwZSdcbiAgICAgICAgc2V0IGN1cnNvcjogWzQsIDBdXG4gICAgICAgIGVuc3VyZSAnYyBnIE4nLFxuICAgICAgICAgIGN1cnNvcjogWzMsIDZdXG4gICAgICAgICAgbW9kZTogJ2luc2VydCdcbiAgICAgICAgICB0ZXh0XzogXCJcIlwiXG4gICAgICAgICAgICAwIHh4eFxuICAgICAgICAgICAgMSAgeHh4XG4gICAgICAgICAgICAyICAgeHh4IHl5eVxuICAgICAgICAgICAgMyB4eHhfXG4gICAgICAgICAgICA0IGFiY1xcblxuICAgICAgICAgICAgXCJcIlwiXG4iXX0=
