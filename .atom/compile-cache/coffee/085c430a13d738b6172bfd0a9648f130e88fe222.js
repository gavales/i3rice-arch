(function() {
  var dispatch, getVimState, ref, settings,
    slice = [].slice;

  ref = require('./spec-helper'), getVimState = ref.getVimState, dispatch = ref.dispatch;

  settings = require('../lib/settings');

  describe("Operator TransformString", function() {
    var bindEnsureOption, bindEnsureWaitOption, editor, editorElement, ensure, ensureWait, ref1, ref2, set, vimState;
    ref1 = [], set = ref1[0], ensure = ref1[1], ensureWait = ref1[2], bindEnsureOption = ref1[3], bindEnsureWaitOption = ref1[4];
    ref2 = [], editor = ref2[0], editorElement = ref2[1], vimState = ref2[2];
    beforeEach(function() {
      return getVimState(function(state, vim) {
        vimState = state;
        editor = vimState.editor, editorElement = vimState.editorElement;
        return set = vim.set, ensure = vim.ensure, ensureWait = vim.ensureWait, bindEnsureOption = vim.bindEnsureOption, bindEnsureWaitOption = vim.bindEnsureWaitOption, vim;
      });
    });
    describe('the ~ keybinding', function() {
      beforeEach(function() {
        return set({
          textC: "|aBc\n|XyZ"
        });
      });
      it('toggles the case and moves right', function() {
        ensure('~', {
          textC: "A|Bc\nx|yZ"
        });
        ensure('~', {
          textC: "Ab|c\nxY|Z"
        });
        return ensure('~', {
          textC: "Ab|C\nxY|z"
        });
      });
      it('takes a count', function() {
        return ensure('4 ~', {
          textC: "Ab|C\nxY|z"
        });
      });
      describe("in visual mode", function() {
        return it("toggles the case of the selected text", function() {
          set({
            cursor: [0, 0]
          });
          return ensure('V ~', {
            text: 'AbC\nXyZ'
          });
        });
      });
      return describe("with g and motion", function() {
        it("toggles the case of text, won't move cursor", function() {
          set({
            textC: "|aBc\nXyZ"
          });
          return ensure('g ~ 2 l', {
            textC: '|Abc\nXyZ'
          });
        });
        it("g~~ toggles the line of text, won't move cursor", function() {
          set({
            textC: "a|Bc\nXyZ"
          });
          return ensure('g ~ ~', {
            textC: 'A|bC\nXyZ'
          });
        });
        return it("g~g~ toggles the line of text, won't move cursor", function() {
          set({
            textC: "a|Bc\nXyZ"
          });
          return ensure('g ~ g ~', {
            textC: 'A|bC\nXyZ'
          });
        });
      });
    });
    describe('the U keybinding', function() {
      beforeEach(function() {
        return set({
          text: 'aBc\nXyZ',
          cursor: [0, 0]
        });
      });
      it("makes text uppercase with g and motion, and won't move cursor", function() {
        ensure('g U l', {
          text: 'ABc\nXyZ',
          cursor: [0, 0]
        });
        ensure('g U e', {
          text: 'ABC\nXyZ',
          cursor: [0, 0]
        });
        set({
          cursor: [1, 0]
        });
        return ensure('g U $', {
          text: 'ABC\nXYZ',
          cursor: [1, 0]
        });
      });
      it("makes the selected text uppercase in visual mode", function() {
        return ensure('V U', {
          text: 'ABC\nXyZ'
        });
      });
      it("gUU upcase the line of text, won't move cursor", function() {
        set({
          cursor: [0, 1]
        });
        return ensure('g U U', {
          text: 'ABC\nXyZ',
          cursor: [0, 1]
        });
      });
      return it("gUgU upcase the line of text, won't move cursor", function() {
        set({
          cursor: [0, 1]
        });
        return ensure('g U g U', {
          text: 'ABC\nXyZ',
          cursor: [0, 1]
        });
      });
    });
    describe('the u keybinding', function() {
      beforeEach(function() {
        return set({
          text: 'aBc\nXyZ',
          cursor: [0, 0]
        });
      });
      it("makes text lowercase with g and motion, and won't move cursor", function() {
        return ensure('g u $', {
          text: 'abc\nXyZ',
          cursor: [0, 0]
        });
      });
      it("makes the selected text lowercase in visual mode", function() {
        return ensure('V u', {
          text: 'abc\nXyZ'
        });
      });
      it("guu downcase the line of text, won't move cursor", function() {
        set({
          cursor: [0, 1]
        });
        return ensure('g u u', {
          text: 'abc\nXyZ',
          cursor: [0, 1]
        });
      });
      return it("gugu downcase the line of text, won't move cursor", function() {
        set({
          cursor: [0, 1]
        });
        return ensure('g u g u', {
          text: 'abc\nXyZ',
          cursor: [0, 1]
        });
      });
    });
    describe('change case for greek character', function() {
      var lowerGreek, upperGreek;
      lowerGreek = "α β δ ε θ ι κ λ ο π ρ τ υ φ χ ψ γ ζ η μ ν ξ σ ω";
      upperGreek = "Α Β Δ Ε Θ Ι Κ Λ Ο Π Ρ Τ Υ Φ Χ Ψ Γ Ζ Η Μ Ν Ξ Σ Ω";
      it("change case to lower-to-upper", function() {
        set({
          text: lowerGreek,
          cursor: [0, 0]
        });
        return ensure('g U $', {
          text: upperGreek,
          cursor: [0, 0]
        });
      });
      return it("change case to upper-to-lower", function() {
        set({
          text: upperGreek,
          cursor: [0, 0]
        });
        return ensure('g u $', {
          text: lowerGreek,
          cursor: [0, 0]
        });
      });
    });
    describe("the > keybinding", function() {
      beforeEach(function() {
        return set({
          text: "12345\nabcde\nABCDE"
        });
      });
      describe("> >", function() {
        describe("from first line", function() {
          it("indents the current line", function() {
            set({
              cursor: [0, 0]
            });
            return ensure('> >', {
              textC: "  |12345\nabcde\nABCDE"
            });
          });
          return it("count means N line indents and undoable, repeatable", function() {
            set({
              cursor: [0, 0]
            });
            ensure('3 > >', {
              textC_: "__|12345\n__abcde\n__ABCDE"
            });
            ensure('u', {
              textC: "|12345\nabcde\nABCDE"
            });
            return ensure('. .', {
              textC_: "____|12345\n____abcde\n____ABCDE"
            });
          });
        });
        return describe("from last line", function() {
          return it("indents the current line", function() {
            set({
              cursor: [2, 0]
            });
            return ensure('> >', {
              textC: "12345\nabcde\n  |ABCDE"
            });
          });
        });
      });
      describe("in visual mode", function() {
        beforeEach(function() {
          return set({
            cursor: [0, 0]
          });
        });
        it("[vC] indent selected lines", function() {
          return ensure("v j >", {
            mode: 'normal',
            textC_: "__|12345\n__abcde\nABCDE"
          });
        });
        it("[vL] indent selected lines", function() {
          ensure("V >", {
            mode: 'normal',
            textC_: "__|12345\nabcde\nABCDE"
          });
          return ensure('.', {
            textC_: "____|12345\nabcde\nABCDE"
          });
        });
        return it("[vL] count means N times indent", function() {
          ensure("V 3 >", {
            mode: 'normal',
            textC_: "______|12345\nabcde\nABCDE"
          });
          return ensure('.', {
            textC_: "____________|12345\nabcde\nABCDE"
          });
        });
      });
      return describe("in visual mode and stayOnTransformString enabled", function() {
        beforeEach(function() {
          settings.set('stayOnTransformString', true);
          return set({
            cursor: [0, 0]
          });
        });
        it("indents the current selection and exits visual mode", function() {
          return ensure('v j >', {
            mode: 'normal',
            textC: "  12345\n  |abcde\nABCDE"
          });
        });
        it("when repeated, operate on same range when cursor was not moved", function() {
          ensure('v j >', {
            mode: 'normal',
            textC: "  12345\n  |abcde\nABCDE"
          });
          return ensure('.', {
            mode: 'normal',
            textC: "    12345\n    |abcde\nABCDE"
          });
        });
        return it("when repeated, operate on relative range from cursor position with same extent when cursor was moved", function() {
          ensure('v j >', {
            mode: 'normal',
            textC: "  12345\n  |abcde\nABCDE"
          });
          return ensure('l .', {
            mode: 'normal',
            textC_: "__12345\n____a|bcde\n__ABCDE"
          });
        });
      });
    });
    describe("the < keybinding", function() {
      beforeEach(function() {
        return set({
          textC_: "|__12345\n__abcde\nABCDE"
        });
      });
      describe("when followed by a <", function() {
        return it("indents the current line", function() {
          return ensure('< <', {
            textC_: "|12345\n__abcde\nABCDE"
          });
        });
      });
      describe("when followed by a repeating <", function() {
        return it("indents multiple lines at once and undoable", function() {
          ensure('2 < <', {
            textC_: "|12345\nabcde\nABCDE"
          });
          return ensure('u', {
            textC_: "|__12345\n__abcde\nABCDE"
          });
        });
      });
      return describe("in visual mode", function() {
        beforeEach(function() {
          return set({
            textC_: "|______12345\n______abcde\nABCDE"
          });
        });
        return it("count means N times outdent", function() {
          ensure('V j 2 <', {
            textC_: "__|12345\n__abcde\nABCDE"
          });
          return ensure('u', {
            textC_: "______12345\n|______abcde\nABCDE"
          });
        });
      });
    });
    describe("the = keybinding", function() {
      var oldGrammar;
      oldGrammar = [];
      beforeEach(function() {
        waitsForPromise(function() {
          return atom.packages.activatePackage('language-javascript');
        });
        oldGrammar = editor.getGrammar();
        return set({
          text: "foo\n  bar\n  baz",
          cursor: [1, 0]
        });
      });
      return describe("when used in a scope that supports auto-indent", function() {
        beforeEach(function() {
          var jsGrammar;
          jsGrammar = atom.grammars.grammarForScopeName('source.js');
          return editor.setGrammar(jsGrammar);
        });
        afterEach(function() {
          return editor.setGrammar(oldGrammar);
        });
        describe("when followed by a =", function() {
          beforeEach(function() {
            return ensure('= =');
          });
          return it("indents the current line", function() {
            return expect(editor.indentationForBufferRow(1)).toBe(0);
          });
        });
        return describe("when followed by a repeating =", function() {
          beforeEach(function() {
            return ensure('2 = =');
          });
          it("autoindents multiple lines at once", function() {
            return ensure(null, {
              text: "foo\nbar\nbaz",
              cursor: [1, 0]
            });
          });
          return describe("undo behavior", function() {
            return it("indents both lines", function() {
              return ensure('u', {
                text: "foo\n  bar\n  baz"
              });
            });
          });
        });
      });
    });
    describe('CamelCase', function() {
      beforeEach(function() {
        return set({
          text: 'vim-mode\natom-text-editor\n',
          cursor: [0, 0]
        });
      });
      it("transform text by motion and repeatable", function() {
        ensure('g C $', {
          text: 'vimMode\natom-text-editor\n',
          cursor: [0, 0]
        });
        return ensure('j .', {
          text: 'vimMode\natomTextEditor\n',
          cursor: [1, 0]
        });
      });
      it("transform selection", function() {
        return ensure('V j g C', {
          text: 'vimMode\natomTextEditor\n',
          cursor: [0, 0]
        });
      });
      return it("repeating twice works on current-line and won't move cursor", function() {
        return ensure('l g C g C', {
          text: 'vimMode\natom-text-editor\n',
          cursor: [0, 1]
        });
      });
    });
    describe('PascalCase', function() {
      beforeEach(function() {
        atom.keymaps.add("test", {
          'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
            'g C': 'vim-mode-plus:pascal-case'
          }
        });
        return set({
          text: 'vim-mode\natom-text-editor\n',
          cursor: [0, 0]
        });
      });
      it("transform text by motion and repeatable", function() {
        ensure('g C $', {
          text: 'VimMode\natom-text-editor\n',
          cursor: [0, 0]
        });
        return ensure('j .', {
          text: 'VimMode\nAtomTextEditor\n',
          cursor: [1, 0]
        });
      });
      it("transform selection", function() {
        return ensure('V j g C', {
          text: 'VimMode\nAtomTextEditor\n',
          cursor: [0, 0]
        });
      });
      return it("repeating twice works on current-line and won't move cursor", function() {
        return ensure('l g C g C', {
          text: 'VimMode\natom-text-editor\n',
          cursor: [0, 1]
        });
      });
    });
    describe('SnakeCase', function() {
      beforeEach(function() {
        set({
          text: 'vim-mode\natom-text-editor\n',
          cursor: [0, 0]
        });
        return atom.keymaps.add("g_", {
          'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
            'g _': 'vim-mode-plus:snake-case'
          }
        });
      });
      it("transform text by motion and repeatable", function() {
        ensure('g _ $', {
          text: 'vim_mode\natom-text-editor\n',
          cursor: [0, 0]
        });
        return ensure('j .', {
          text: 'vim_mode\natom_text_editor\n',
          cursor: [1, 0]
        });
      });
      it("transform selection", function() {
        return ensure('V j g _', {
          text: 'vim_mode\natom_text_editor\n',
          cursor: [0, 0]
        });
      });
      return it("repeating twice works on current-line and won't move cursor", function() {
        return ensure('l g _ g _', {
          text: 'vim_mode\natom-text-editor\n',
          cursor: [0, 1]
        });
      });
    });
    describe('DashCase', function() {
      beforeEach(function() {
        return set({
          text: 'vimMode\natom_text_editor\n',
          cursor: [0, 0]
        });
      });
      it("transform text by motion and repeatable", function() {
        ensure('g - $', {
          text: 'vim-mode\natom_text_editor\n',
          cursor: [0, 0]
        });
        return ensure('j .', {
          text: 'vim-mode\natom-text-editor\n',
          cursor: [1, 0]
        });
      });
      it("transform selection", function() {
        return ensure('V j g -', {
          text: 'vim-mode\natom-text-editor\n',
          cursor: [0, 0]
        });
      });
      return it("repeating twice works on current-line and won't move cursor", function() {
        return ensure('l g - g -', {
          text: 'vim-mode\natom_text_editor\n',
          cursor: [0, 1]
        });
      });
    });
    describe('ConvertToSoftTab', function() {
      beforeEach(function() {
        return atom.keymaps.add("test", {
          'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
            'g tab': 'vim-mode-plus:convert-to-soft-tab'
          }
        });
      });
      return describe("basic behavior", function() {
        return it("convert tabs to spaces", function() {
          expect(editor.getTabLength()).toBe(2);
          set({
            text: "\tvar10 =\t\t0;",
            cursor: [0, 0]
          });
          return ensure('g tab $', {
            text: "  var10 =   0;"
          });
        });
      });
    });
    describe('ConvertToHardTab', function() {
      beforeEach(function() {
        return atom.keymaps.add("test", {
          'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
            'g shift-tab': 'vim-mode-plus:convert-to-hard-tab'
          }
        });
      });
      return describe("basic behavior", function() {
        return it("convert spaces to tabs", function() {
          expect(editor.getTabLength()).toBe(2);
          set({
            text: "  var10 =    0;",
            cursor: [0, 0]
          });
          return ensure('g shift-tab $', {
            text: "\tvar10\t=\t\t 0;"
          });
        });
      });
    });
    describe('CompactSpaces', function() {
      beforeEach(function() {
        return set({
          cursor: [0, 0]
        });
      });
      return describe("basic behavior", function() {
        it("compats multiple space into one", function() {
          set({
            text: 'var0   =   0; var10   =   10',
            cursor: [0, 0]
          });
          return ensure('g space $', {
            text: 'var0 = 0; var10 = 10'
          });
        });
        it("don't apply compaction for leading and trailing space", function() {
          set({
            text_: "___var0   =   0; var10   =   10___\n___var1   =   1; var11   =   11___\n___var2   =   2; var12   =   12___\n\n___var4   =   4; var14   =   14___",
            cursor: [0, 0]
          });
          return ensure('g space i p', {
            text_: "___var0 = 0; var10 = 10___\n___var1 = 1; var11 = 11___\n___var2 = 2; var12 = 12___\n\n___var4   =   4; var14   =   14___"
          });
        });
        return it("but it compact spaces when target all text is spaces", function() {
          set({
            text: '01234    90',
            cursor: [0, 5]
          });
          return ensure('g space w', {
            text: '01234 90'
          });
        });
      });
    });
    describe('AlignOccurrence family', function() {
      beforeEach(function() {
        return atom.keymaps.add("test", {
          'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
            'g |': 'vim-mode-plus:align-occurrence'
          }
        });
      });
      return describe("AlignOccurrence", function() {
        it("align by =", function() {
          set({
            textC: "\na |= 100\nbcd = 1\nijklm = 1000\n"
          });
          return ensure("g | p", {
            textC: "\na |    = 100\nbcd   = 1\nijklm = 1000\n"
          });
        });
        it("align by comma", function() {
          set({
            textC: "\na|, 100, 30\nb, 30000, 50\n200000, 1\n"
          });
          return ensure("g | p", {
            textC: "\na|,      100,   30\nb,      30000, 50\n200000, 1\n"
          });
        });
        it("align by non-word-char-ending", function() {
          set({
            textC: "\nabc|: 10\ndefgh: 20\nij: 30\n"
          });
          return ensure("g | p", {
            textC: "\nabc|:   10\ndefgh: 20\nij:    30\n"
          });
        });
        it("align by normal word", function() {
          set({
            textC: "\nxxx fir|stName: \"Hello\", lastName: \"World\"\nyyyyyyyy firstName: \"Good Bye\", lastName: \"World\"\n"
          });
          return ensure("g | p", {
            textC: "\nxxx    |  firstName: \"Hello\", lastName: \"World\"\nyyyyyyyy firstName: \"Good Bye\", lastName: \"World\"\n"
          });
        });
        return it("align by `|` table-like text", function() {
          set({
            text: "\n+--------+------------------+---------+\n| where | move to 1st char | no move |\n+--------+------------------+---------+\n| top | `z enter` | `z t` |\n| middle | `z .` | `z z` |\n| bottom | `z -` | `z b` |\n+--------+------------------+---------+\n",
            cursor: [2, 0]
          });
          return ensure("g | p", {
            text: "\n+--------+------------------+---------+\n| where  | move to 1st char | no move |\n+--------+------------------+---------+\n| top    | `z enter`        | `z t`   |\n| middle | `z .`            | `z z`   |\n| bottom | `z -`            | `z b`   |\n+--------+------------------+---------+\n",
            cursor: [2, 0]
          });
        });
      });
    });
    describe('TrimString', function() {
      beforeEach(function() {
        return set({
          text: " text = @getNewText( selection.getText(), selection )  ",
          cursor: [0, 42]
        });
      });
      return describe("basic behavior", function() {
        it("trim string for a-line text object", function() {
          set({
            text_: "___abc___\n___def___",
            cursor: [0, 0]
          });
          ensure('g | a l', {
            text_: "abc\n___def___"
          });
          return ensure('j .', {
            text_: "abc\ndef"
          });
        });
        it("trim string for inner-parenthesis text object", function() {
          set({
            text_: "(  abc  )\n(  def  )",
            cursor: [0, 0]
          });
          ensure('g | i (', {
            text_: "(abc)\n(  def  )"
          });
          return ensure('j .', {
            text_: "(abc)\n(def)"
          });
        });
        return it("trim string for inner-any-pair text object", function() {
          atom.keymaps.add("test", {
            'atom-text-editor.vim-mode-plus.operator-pending-mode, atom-text-editor.vim-mode-plus.visual-mode': {
              'i ;': 'vim-mode-plus:inner-any-pair'
            }
          });
          set({
            text_: "( [ {  abc  } ] )",
            cursor: [0, 8]
          });
          ensure('g | i ;', {
            text_: "( [ {abc} ] )"
          });
          ensure('2 h .', {
            text_: "( [{abc}] )"
          });
          return ensure('2 h .', {
            text_: "([{abc}])"
          });
        });
      });
    });
    describe('surround family', function() {
      beforeEach(function() {
        var keymapsForSurround;
        keymapsForSurround = {
          'atom-text-editor.vim-mode-plus.normal-mode': {
            'y s': 'vim-mode-plus:surround',
            'd s': 'vim-mode-plus:delete-surround-any-pair',
            'd S': 'vim-mode-plus:delete-surround',
            'c s': 'vim-mode-plus:change-surround-any-pair',
            'c S': 'vim-mode-plus:change-surround'
          },
          'atom-text-editor.vim-mode-plus.operator-pending-mode.surround-pending': {
            's': 'vim-mode-plus:inner-current-line'
          },
          'atom-text-editor.vim-mode-plus.visual-mode': {
            'S': 'vim-mode-plus:surround'
          }
        };
        atom.keymaps.add("keymaps-for-surround", keymapsForSurround);
        return set({
          textC: "|apple\npairs: [brackets]\npairs: [brackets]\n( multi\n  line )"
        });
      });
      describe('cancellation', function() {
        beforeEach(function() {
          return set({
            textC: "(a|bc) def\n(g!hi) jkl\n(m|no) pqr\n"
          });
        });
        describe('surround cancellation', function() {
          it("[normal] keep multpcursor on surround cancel", function() {
            return ensure("y s escape", {
              textC: "(a|bc) def\n(g!hi) jkl\n(m|no) pqr\n",
              mode: "normal"
            });
          });
          return it("[visual] keep multpcursor on surround cancel", function() {
            ensure("v", {
              mode: ["visual", "characterwise"],
              textC: "(ab|c) def\n(gh!i) jkl\n(mn|o) pqr\n",
              selectedTextOrdered: ["b", "h", "n"]
            });
            return ensureWait("S escape", {
              mode: ["visual", "characterwise"],
              textC: "(ab|c) def\n(gh!i) jkl\n(mn|o) pqr\n",
              selectedTextOrdered: ["b", "h", "n"]
            });
          });
        });
        describe('delete-surround cancellation', function() {
          return it("[from normal] keep multpcursor on cancel", function() {
            return ensure("d S escape", {
              mode: "normal",
              textC: "(a|bc) def\n(g!hi) jkl\n(m|no) pqr\n"
            });
          });
        });
        describe('change-surround cancellation', function() {
          it("[from normal] keep multpcursor on cancel of 1st input", function() {
            return ensure("c S escape", {
              mode: "normal",
              textC: "(a|bc) def\n(g!hi) jkl\n(m|no) pqr\n"
            });
          });
          return it("[from normal] keep multpcursor on cancel of 2nd input", function() {
            ensure("c S (", {
              selectedTextOrdered: ["(abc)", "(ghi)", "(mno)"]
            });
            return ensureWait("escape", {
              mode: "normal",
              textC: "(a|bc) def\n(g!hi) jkl\n(m|no) pqr\n"
            });
          });
        });
        return describe('surround-word cancellation', function() {
          beforeEach(function() {
            return atom.keymaps.add("surround-test", {
              'atom-text-editor.vim-mode-plus.normal-mode': {
                'y s w': 'vim-mode-plus:surround-word'
              }
            });
          });
          return it("[from normal] keep multi cursor on cancel", function() {
            ensure("y s w", {
              selectedTextOrdered: ["abc", "ghi", "mno"]
            });
            return ensureWait("escape", {
              mode: "normal",
              textC: "(a|bc) def\n(g!hi) jkl\n(m|no) pqr\n"
            });
          });
        });
      });
      describe('alias keymap for surround, change-surround, delete-surround', function() {
        describe("surround by aliased char", function() {
          it("c1", function() {
            set({
              textC: "|abc"
            });
            return ensureWait('y s i w b', {
              text: "(abc)"
            });
          });
          it("c2", function() {
            set({
              textC: "|abc"
            });
            return ensureWait('y s i w B', {
              text: "{abc}"
            });
          });
          it("c3", function() {
            set({
              textC: "|abc"
            });
            return ensureWait('y s i w r', {
              text: "[abc]"
            });
          });
          return it("c4", function() {
            set({
              textC: "|abc"
            });
            return ensureWait('y s i w a', {
              text: "<abc>"
            });
          });
        });
        describe("delete surround by aliased char", function() {
          it("c1", function() {
            set({
              textC: "|(abc)"
            });
            return ensure('d S b', {
              text: "abc"
            });
          });
          it("c2", function() {
            set({
              textC: "|{abc}"
            });
            return ensure('d S B', {
              text: "abc"
            });
          });
          it("c3", function() {
            set({
              textC: "|[abc]"
            });
            return ensure('d S r', {
              text: "abc"
            });
          });
          return it("c4", function() {
            set({
              textC: "|<abc>"
            });
            return ensure('d S a', {
              text: "abc"
            });
          });
        });
        return describe("change surround by aliased char", function() {
          it("c1", function() {
            set({
              textC: "|(abc)"
            });
            return ensureWait('c S b B', {
              text: "{abc}"
            });
          });
          it("c2", function() {
            set({
              textC: "|(abc)"
            });
            return ensureWait('c S b r', {
              text: "[abc]"
            });
          });
          it("c3", function() {
            set({
              textC: "|(abc)"
            });
            return ensureWait('c S b a', {
              text: "<abc>"
            });
          });
          it("c4", function() {
            set({
              textC: "|{abc}"
            });
            return ensureWait('c S B b', {
              text: "(abc)"
            });
          });
          it("c5", function() {
            set({
              textC: "|{abc}"
            });
            return ensureWait('c S B r', {
              text: "[abc]"
            });
          });
          it("c6", function() {
            set({
              textC: "|{abc}"
            });
            return ensureWait('c S B a', {
              text: "<abc>"
            });
          });
          it("c7", function() {
            set({
              textC: "|[abc]"
            });
            return ensureWait('c S r b', {
              text: "(abc)"
            });
          });
          it("c8", function() {
            set({
              textC: "|[abc]"
            });
            return ensureWait('c S r B', {
              text: "{abc}"
            });
          });
          it("c9", function() {
            set({
              textC: "|[abc]"
            });
            return ensureWait('c S r a', {
              text: "<abc>"
            });
          });
          it("c10", function() {
            set({
              textC: "|<abc>"
            });
            return ensureWait('c S a b', {
              text: "(abc)"
            });
          });
          it("c11", function() {
            set({
              textC: "|<abc>"
            });
            return ensureWait('c S a B', {
              text: "{abc}"
            });
          });
          return it("c12", function() {
            set({
              textC: "|<abc>"
            });
            return ensureWait('c S a r', {
              text: "[abc]"
            });
          });
        });
      });
      describe('surround', function() {
        describe('basic behavior', function() {
          it("surround text object with ( and repeatable", function() {
            ensureWait('y s i w (', {
              textC: "|(apple)\npairs: [brackets]\npairs: [brackets]\n( multi\n  line )"
            });
            return ensureWait('j .', {
              textC: "(apple)\n|(pairs): [brackets]\npairs: [brackets]\n( multi\n  line )"
            });
          });
          it("surround text object with { and repeatable", function() {
            ensureWait('y s i w {', {
              textC: "|{apple}\npairs: [brackets]\npairs: [brackets]\n( multi\n  line )"
            });
            return ensureWait('j .', {
              textC: "{apple}\n|{pairs}: [brackets]\npairs: [brackets]\n( multi\n  line )"
            });
          });
          return it("surround current-line", function() {
            ensureWait('y s s {', {
              textC: "|{apple}\npairs: [brackets]\npairs: [brackets]\n( multi\n  line )"
            });
            return ensureWait('j .', {
              textC: "{apple}\n|{pairs: [brackets]}\npairs: [brackets]\n( multi\n  line )"
            });
          });
        });
        describe('adjustIndentation when surround linewise target', function() {
          beforeEach(function() {
            waitsForPromise(function() {
              return atom.packages.activatePackage('language-javascript');
            });
            return runs(function() {
              return set({
                textC: "function hello() {\n  if true {\n  |  console.log('hello');\n  }\n}",
                grammar: 'source.js'
              });
            });
          });
          return it("adjustIndentation surrounded text ", function() {
            return ensureWait('y s i f {', {
              textC: "function hello() {\n|  {\n    if true {\n      console.log('hello');\n    }\n  }\n}"
            });
          });
        });
        describe('with motion which takes user-input', function() {
          beforeEach(function() {
            return set({
              text: "s _____ e",
              cursor: [0, 0]
            });
          });
          describe("with 'f' motion", function() {
            return it("surround with 'f' motion", function() {
              return ensureWait('y s f e (', {
                text: "(s _____ e)",
                cursor: [0, 0]
              });
            });
          });
          return describe("with '`' motion", function() {
            beforeEach(function() {
              runs(function() {
                set({
                  cursor: [0, 8]
                });
                return ensureWait('m a', {
                  mark: {
                    'a': [0, 8]
                  }
                });
              });
              return runs(function() {
                return set({
                  cursor: [0, 0]
                });
              });
            });
            return it("surround with '`' motion", function() {
              return ensureWait('y s ` a (', {
                text: "(s _____ )e",
                cursor: [0, 0]
              });
            });
          });
        });
        return describe('charactersToAddSpaceOnSurround setting', function() {
          beforeEach(function() {
            settings.set('charactersToAddSpaceOnSurround', ['(', '{', '[']);
            return set({
              textC: "|apple\norange\nlemmon"
            });
          });
          describe("char is in charactersToAddSpaceOnSurround", function() {
            return it("add additional space inside pair char when surround", function() {
              ensureWait('y s i w (', {
                text: "( apple )\norange\nlemmon"
              });
              ensureWait('j y s i w {', {
                text: "( apple )\n{ orange }\nlemmon"
              });
              return ensureWait('j y s i w [', {
                text: "( apple )\n{ orange }\n[ lemmon ]"
              });
            });
          });
          describe("char is not in charactersToAddSpaceOnSurround", function() {
            return it("add additional space inside pair char when surround", function() {
              ensureWait('y s i w )', {
                text: "(apple)\norange\nlemmon"
              });
              ensureWait('j y s i w }', {
                text: "(apple)\n{orange}\nlemmon"
              });
              return ensureWait('j y s i w ]', {
                text: "(apple)\n{orange}\n[lemmon]"
              });
            });
          });
          return describe("it distinctively handle aliased keymap", function() {
            beforeEach(function() {
              return set({
                textC: "|abc"
              });
            });
            describe("normal pair-chars are set to add space", function() {
              beforeEach(function() {
                return settings.set('charactersToAddSpaceOnSurround', ['(', '{', '[', '<']);
              });
              it("c1", function() {
                return ensureWait('y s i w (', {
                  text: "( abc )"
                });
              });
              it("c2", function() {
                return ensureWait('y s i w b', {
                  text: "(abc)"
                });
              });
              it("c3", function() {
                return ensureWait('y s i w {', {
                  text: "{ abc }"
                });
              });
              it("c4", function() {
                return ensureWait('y s i w B', {
                  text: "{abc}"
                });
              });
              it("c5", function() {
                return ensureWait('y s i w [', {
                  text: "[ abc ]"
                });
              });
              it("c6", function() {
                return ensureWait('y s i w r', {
                  text: "[abc]"
                });
              });
              it("c7", function() {
                return ensureWait('y s i w <', {
                  text: "< abc >"
                });
              });
              return it("c8", function() {
                return ensureWait('y s i w a', {
                  text: "<abc>"
                });
              });
            });
            return describe("aliased pair-chars are set to add space", function() {
              beforeEach(function() {
                return settings.set('charactersToAddSpaceOnSurround', ['b', 'B', 'r', 'a']);
              });
              it("c1", function() {
                return ensureWait('y s i w (', {
                  text: "(abc)"
                });
              });
              it("c2", function() {
                return ensureWait('y s i w b', {
                  text: "( abc )"
                });
              });
              it("c3", function() {
                return ensureWait('y s i w {', {
                  text: "{abc}"
                });
              });
              it("c4", function() {
                return ensureWait('y s i w B', {
                  text: "{ abc }"
                });
              });
              it("c5", function() {
                return ensureWait('y s i w [', {
                  text: "[abc]"
                });
              });
              it("c6", function() {
                return ensureWait('y s i w r', {
                  text: "[ abc ]"
                });
              });
              it("c7", function() {
                return ensureWait('y s i w <', {
                  text: "<abc>"
                });
              });
              return it("c8", function() {
                return ensureWait('y s i w a', {
                  text: "< abc >"
                });
              });
            });
          });
        });
      });
      describe('map-surround', function() {
        beforeEach(function() {
          jasmine.attachToDOM(editorElement);
          set({
            textC: "\n|apple\npairs tomato\norange\nmilk\n"
          });
          return atom.keymaps.add("ms", {
            'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
              'm s': 'vim-mode-plus:map-surround'
            },
            'atom-text-editor.vim-mode-plus.visual-mode': {
              'm s': 'vim-mode-plus:map-surround'
            }
          });
        });
        it("surround text for each word in target case-1", function() {
          return ensureWait('m s i p (', {
            textC: "\n(|apple)\n(pairs) (tomato)\n(orange)\n(milk)\n"
          });
        });
        it("surround text for each word in target case-2", function() {
          set({
            cursor: [2, 1]
          });
          return ensureWait('m s i l <', {
            textC: "\napple\n<p|airs> <tomato>\norange\nmilk\n"
          });
        });
        return it("surround text for each word in visual selection", function() {
          settings.set("stayOnSelectTextObject", true);
          return ensureWait('v i p m s "', {
            textC: "\n\"apple\"\n\"pairs\" \"tomato\"\n\"orange\"\n\"|milk\"\n"
          });
        });
      });
      describe('delete surround', function() {
        beforeEach(function() {
          return set({
            cursor: [1, 8]
          });
        });
        it("delete surrounded chars and repeatable", function() {
          ensure('d S [', {
            text: "apple\npairs: brackets\npairs: [brackets]\n( multi\n  line )"
          });
          return ensure('j l .', {
            text: "apple\npairs: brackets\npairs: brackets\n( multi\n  line )"
          });
        });
        it("delete surrounded chars expanded to multi-line", function() {
          set({
            cursor: [3, 1]
          });
          return ensure('d S (', {
            text: "apple\npairs: [brackets]\npairs: [brackets]\n multi\n  line "
          });
        });
        it("delete surrounded chars and trim padding spaces for non-identical pair-char", function() {
          set({
            text: "( apple )\n{  orange   }\n",
            cursor: [0, 0]
          });
          ensure('d S (', {
            text: "apple\n{  orange   }\n"
          });
          return ensure('j d S {', {
            text: "apple\norange\n"
          });
        });
        it("delete surrounded chars and NOT trim padding spaces for identical pair-char", function() {
          set({
            text: "` apple `\n\"  orange   \"\n",
            cursor: [0, 0]
          });
          ensure('d S `', {
            text_: '_apple_\n"__orange___"\n'
          });
          return ensure('j d S "', {
            text_: "_apple_\n__orange___\n"
          });
        });
        return it("delete surrounded for multi-line but dont affect code layout", function() {
          set({
            cursor: [0, 34],
            text: "highlightRanges @editor, range, {\n  timeout: timeout\n  hello: world\n}"
          });
          return ensure('d S {', {
            text: ["highlightRanges @editor, range, ", "  timeout: timeout", "  hello: world", ""].join("\n")
          });
        });
      });
      describe('change surround', function() {
        beforeEach(function() {
          return set({
            text: "(apple)\n(grape)\n<lemmon>\n{orange}",
            cursor: [0, 1]
          });
        });
        it("change surrounded chars and repeatable", function() {
          ensureWait('c S ( [', {
            text: "[apple]\n(grape)\n<lemmon>\n{orange}"
          });
          return ensureWait('j l .', {
            text: "[apple]\n[grape]\n<lemmon>\n{orange}"
          });
        });
        it("change surrounded chars", function() {
          ensureWait('j j c S < "', {
            text: "(apple)\n(grape)\n\"lemmon\"\n{orange}"
          });
          return ensureWait('j l c S { !', {
            text: "(apple)\n(grape)\n\"lemmon\"\n!orange!"
          });
        });
        it("change surrounded for multi-line but dont affect code layout", function() {
          set({
            cursor: [0, 34],
            text: "highlightRanges @editor, range, {\n  timeout: timeout\n  hello: world\n}"
          });
          return ensureWait('c S { (', {
            text: "highlightRanges @editor, range, (\n  timeout: timeout\n  hello: world\n)"
          });
        });
        describe('charactersToAddSpaceOnSurround setting', function() {
          beforeEach(function() {
            return settings.set('charactersToAddSpaceOnSurround', ['(', '{', '[']);
          });
          describe('when input char is in charactersToAddSpaceOnSurround', function() {
            describe('[single line text] add single space around pair regardless of exsiting inner text', function() {
              it("case1", function() {
                set({
                  textC: "|(apple)"
                });
                return ensureWait('c S ( {', {
                  text: "{ apple }"
                });
              });
              it("case2", function() {
                set({
                  textC: "|( apple )"
                });
                return ensureWait('c S ( {', {
                  text: "{ apple }"
                });
              });
              return it("case3", function() {
                set({
                  textC: "|(  apple  )"
                });
                return ensureWait('c S ( {', {
                  text: "{ apple }"
                });
              });
            });
            return describe("[multi line text] don't add single space around pair", function() {
              return it("don't add single space around pair", function() {
                set({
                  textC: "|(\napple\n)"
                });
                return ensureWait("c S ( {", {
                  text: "{\napple\n}"
                });
              });
            });
          });
          return describe('when first input char is not in charactersToAddSpaceOnSurround', function() {
            describe("remove surrounding space of inner text for identical pair-char", function() {
              it("case1", function() {
                set({
                  textC: "|(apple)"
                });
                return ensureWait("c S ( }", {
                  text: "{apple}"
                });
              });
              it("case2", function() {
                set({
                  textC: "|( apple )"
                });
                return ensureWait("c S ( }", {
                  text: "{apple}"
                });
              });
              return it("case3", function() {
                set({
                  textC: "|(  apple  )"
                });
                return ensureWait("c S ( }", {
                  text: "{apple}"
                });
              });
            });
            return describe("doesn't remove surrounding space of inner text for non-identical pair-char", function() {
              it("case1", function() {
                set({
                  textC: '|"apple"'
                });
                return ensureWait('c S " `', {
                  text: "`apple`"
                });
              });
              it("case2", function() {
                set({
                  textC: '|"  apple  "'
                });
                return ensureWait('c S " `', {
                  text: "`  apple  `"
                });
              });
              return it("case3", function() {
                set({
                  textC: '|"  apple  "'
                });
                return ensureWait('c S " \'', {
                  text: "'  apple  '"
                });
              });
            });
          });
        });
        return describe('customSurroundPairs setting', function() {
          beforeEach(function() {
            var constomSurround;
            constomSurround = '{\n  "p": ["<?php", "?>", true],\n  "%": ["<%", "%>", true],\n  "=": ["<%=", "%>", true],\n  "s": ["\\"", "\\""]\n}';
            return settings.set('customSurroundPairs', constomSurround);
          });
          describe('surround', function() {
            it("case1", function() {
              set({
                textC: "ap|ple"
              });
              return ensureWait('y s c p', {
                text: "<?php apple ?>"
              });
            });
            it("case2", function() {
              set({
                textC: "ap|ple"
              });
              return ensureWait('y s c %', {
                text: "<% apple %>"
              });
            });
            it("case2", function() {
              set({
                textC: "ap|ple"
              });
              return ensureWait('y s c =', {
                text: "<%= apple %>"
              });
            });
            return it("case2", function() {
              set({
                textC: "ap|ple"
              });
              return ensureWait('y s c s', {
                text: '"apple"'
              });
            });
          });
          describe('delete-surround', function() {
            it("case1", function() {
              set({
                textC: "<?php ap|ple ?>"
              });
              return ensureWait('d S p', {
                text: "apple"
              });
            });
            it("case2", function() {
              set({
                textC: "<% ap|ple %>"
              });
              return ensureWait('d S %', {
                text: "apple"
              });
            });
            it("case2", function() {
              set({
                textC: "<%= ap|ple %>"
              });
              return ensureWait('d S =', {
                text: "apple"
              });
            });
            return it("case2", function() {
              set({
                textC: '"ap|ple"'
              });
              return ensureWait('d S s', {
                text: "apple"
              });
            });
          });
          return describe('change-surround', function() {
            it("case1", function() {
              set({
                textC: "<?php ap|ple ?>"
              });
              return ensureWait('c S p %', {
                text: "<% apple %>"
              });
            });
            it("case2", function() {
              set({
                textC: "<% ap|ple %>"
              });
              return ensureWait('c S % =', {
                text: "<%= apple %>"
              });
            });
            it("case2", function() {
              set({
                textC: "<%= ap|ple %>"
              });
              return ensureWait('c S = s', {
                text: '"apple"'
              });
            });
            return it("case2", function() {
              set({
                textC: '"ap|ple"'
              });
              return ensureWait('c S s p', {
                text: "<?php apple ?>"
              });
            });
          });
        });
      });
      describe('surround-word', function() {
        beforeEach(function() {
          return atom.keymaps.add("surround-test", {
            'atom-text-editor.vim-mode-plus.normal-mode': {
              'y s w': 'vim-mode-plus:surround-word'
            }
          });
        });
        it("surround a word with ( and repeatable", function() {
          ensureWait('y s w (', {
            textC: "|(apple)\npairs: [brackets]\npairs: [brackets]\n( multi\n  line )"
          });
          return ensureWait('j .', {
            textC: "(apple)\n|(pairs): [brackets]\npairs: [brackets]\n( multi\n  line )"
          });
        });
        return it("surround a word with { and repeatable", function() {
          ensureWait('y s w {', {
            textC: "|{apple}\npairs: [brackets]\npairs: [brackets]\n( multi\n  line )"
          });
          return ensureWait('j .', {
            textC: "{apple}\n|{pairs}: [brackets]\npairs: [brackets]\n( multi\n  line )"
          });
        });
      });
      describe('delete-surround-any-pair', function() {
        beforeEach(function() {
          return set({
            textC: "apple\n(pairs: [|brackets])\n{pairs \"s\" [brackets]}\n( multi\n  line )"
          });
        });
        it("delete surrounded any pair found and repeatable", function() {
          ensure('d s', {
            text: 'apple\n(pairs: brackets)\n{pairs "s" [brackets]}\n( multi\n  line )'
          });
          return ensure('.', {
            text: 'apple\npairs: brackets\n{pairs "s" [brackets]}\n( multi\n  line )'
          });
        });
        it("delete surrounded any pair found with skip pair out of cursor and repeatable", function() {
          set({
            cursor: [2, 14]
          });
          ensure('d s', {
            text: 'apple\n(pairs: [brackets])\n{pairs "s" brackets}\n( multi\n  line )'
          });
          ensure('.', {
            text: 'apple\n(pairs: [brackets])\npairs "s" brackets\n( multi\n  line )'
          });
          return ensure('.', {
            text: 'apple\n(pairs: [brackets])\npairs "s" brackets\n( multi\n  line )'
          });
        });
        return it("delete surrounded chars expanded to multi-line", function() {
          set({
            cursor: [3, 1]
          });
          return ensure('d s', {
            text: 'apple\n(pairs: [brackets])\n{pairs "s" [brackets]}\n multi\n  line '
          });
        });
      });
      describe('delete-surround-any-pair-allow-forwarding', function() {
        beforeEach(function() {
          atom.keymaps.add("keymaps-for-surround", {
            'atom-text-editor.vim-mode-plus.normal-mode': {
              'd s': 'vim-mode-plus:delete-surround-any-pair-allow-forwarding'
            }
          });
          return settings.set('stayOnTransformString', true);
        });
        return it("[1] single line", function() {
          set({
            textC: "|___(inner)\n___(inner)"
          });
          ensure('d s', {
            textC: "|___inner\n___(inner)"
          });
          return ensure('j .', {
            textC: "___inner\n|___inner"
          });
        });
      });
      describe('change-surround-any-pair', function() {
        beforeEach(function() {
          return set({
            textC: "(|apple)\n(grape)\n<lemmon>\n{orange}"
          });
        });
        return it("change any surrounded pair found and repeatable", function() {
          ensureWait('c s <', {
            textC: "|<apple>\n(grape)\n<lemmon>\n{orange}"
          });
          ensureWait('j .', {
            textC: "<apple>\n|<grape>\n<lemmon>\n{orange}"
          });
          return ensureWait('2 j .', {
            textC: "<apple>\n<grape>\n<lemmon>\n|<orange>"
          });
        });
      });
      return describe('change-surround-any-pair-allow-forwarding', function() {
        beforeEach(function() {
          atom.keymaps.add("keymaps-for-surround", {
            'atom-text-editor.vim-mode-plus.normal-mode': {
              'c s': 'vim-mode-plus:change-surround-any-pair-allow-forwarding'
            }
          });
          return settings.set('stayOnTransformString', true);
        });
        return it("[1] single line", function() {
          set({
            textC: "|___(inner)\n___(inner)"
          });
          ensureWait('c s <', {
            textC: "|___<inner>\n___(inner)"
          });
          return ensureWait('j .', {
            textC: "___<inner>\n|___<inner>"
          });
        });
      });
    });
    describe('ReplaceWithRegister', function() {
      var originalText;
      originalText = null;
      beforeEach(function() {
        atom.keymaps.add("test", {
          'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
            '_': 'vim-mode-plus:replace-with-register'
          }
        });
        originalText = "abc def 'aaa'\nhere (parenthesis)\nhere (parenthesis)";
        set({
          text: originalText,
          cursor: [0, 9]
        });
        set({
          register: {
            '"': {
              text: 'default register',
              type: 'characterwise'
            }
          }
        });
        return set({
          register: {
            'a': {
              text: 'A register',
              type: 'characterwise'
            }
          }
        });
      });
      it("replace selection with regisgter's content", function() {
        ensure('v i w', {
          selectedText: 'aaa'
        });
        return ensure('_', {
          mode: 'normal',
          text: originalText.replace('aaa', 'default register')
        });
      });
      it("replace text object with regisgter's content", function() {
        set({
          cursor: [1, 6]
        });
        return ensure('_ i (', {
          mode: 'normal',
          text: originalText.replace('parenthesis', 'default register')
        });
      });
      it("can repeat", function() {
        set({
          cursor: [1, 6]
        });
        return ensure('_ i ( j .', {
          mode: 'normal',
          text: originalText.replace(/parenthesis/g, 'default register')
        });
      });
      return it("can use specified register to replace with", function() {
        set({
          cursor: [1, 6]
        });
        return ensure('" a _ i (', {
          mode: 'normal',
          text: originalText.replace('parenthesis', 'A register')
        });
      });
    });
    describe('SwapWithRegister', function() {
      var originalText;
      originalText = null;
      beforeEach(function() {
        atom.keymaps.add("test", {
          'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
            'g p': 'vim-mode-plus:swap-with-register'
          }
        });
        originalText = "abc def 'aaa'\nhere (111)\nhere (222)";
        set({
          text: originalText,
          cursor: [0, 9]
        });
        set({
          register: {
            '"': {
              text: 'default register',
              type: 'characterwise'
            }
          }
        });
        return set({
          register: {
            'a': {
              text: 'A register',
              type: 'characterwise'
            }
          }
        });
      });
      it("swap selection with regisgter's content", function() {
        ensure('v i w', {
          selectedText: 'aaa'
        });
        return ensure('g p', {
          mode: 'normal',
          text: originalText.replace('aaa', 'default register'),
          register: {
            '"': {
              text: 'aaa'
            }
          }
        });
      });
      it("swap text object with regisgter's content", function() {
        set({
          cursor: [1, 6]
        });
        return ensure('g p i (', {
          mode: 'normal',
          text: originalText.replace('111', 'default register'),
          register: {
            '"': {
              text: '111'
            }
          }
        });
      });
      it("can repeat", function() {
        var updatedText;
        set({
          cursor: [1, 6]
        });
        updatedText = "abc def 'aaa'\nhere (default register)\nhere (111)";
        return ensure('g p i ( j .', {
          mode: 'normal',
          text: updatedText,
          register: {
            '"': {
              text: '222'
            }
          }
        });
      });
      return it("can use specified register to swap with", function() {
        set({
          cursor: [1, 6]
        });
        return ensure('" a g p i (', {
          mode: 'normal',
          text: originalText.replace('111', 'A register'),
          register: {
            'a': {
              text: '111'
            }
          }
        });
      });
    });
    describe("Join and it's family", function() {
      beforeEach(function() {
        return set({
          textC_: "__0|12\n__345\n__678\n__9ab\n"
        });
      });
      describe("Join", function() {
        it("joins lines with triming leading whitespace", function() {
          ensure('J', {
            textC_: "__012| 345\n__678\n__9ab\n"
          });
          ensure('.', {
            textC_: "__012 345| 678\n__9ab\n"
          });
          ensure('.', {
            textC_: "__012 345 678| 9ab\n"
          });
          ensure('u', {
            textC_: "__012 345| 678\n__9ab\n"
          });
          ensure('u', {
            textC_: "__012| 345\n__678\n__9ab\n"
          });
          return ensure('u', {
            textC_: "__0|12\n__345\n__678\n__9ab\n"
          });
        });
        it("joins do nothing when it cannot join any more", function() {
          return ensure('1 0 0 J', {
            textC_: "  012 345 678 9a|b\n"
          });
        });
        return it("joins do nothing when it cannot join any more", function() {
          ensure('J J J', {
            textC_: "  012 345 678| 9ab\n"
          });
          ensure('J', {
            textC_: "  012 345 678 9a|b"
          });
          return ensure('J', {
            textC_: "  012 345 678 9a|b"
          });
        });
      });
      describe("JoinWithKeepingSpace", function() {
        beforeEach(function() {
          return atom.keymaps.add("test", {
            'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
              'g J': 'vim-mode-plus:join-with-keeping-space'
            }
          });
        });
        return it("joins lines without triming leading whitespace", function() {
          ensure('g J', {
            textC_: "__0|12__345\n__678\n__9ab\n"
          });
          ensure('.', {
            textC_: "__0|12__345__678\n__9ab\n"
          });
          ensure('u u', {
            textC_: "__0|12\n__345\n__678\n__9ab\n"
          });
          return ensure('4 g J', {
            textC_: "__0|12__345__678__9ab\n"
          });
        });
      });
      describe("JoinByInput", function() {
        beforeEach(function() {
          return atom.keymaps.add("test", {
            'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
              'g J': 'vim-mode-plus:join-by-input'
            }
          });
        });
        it("joins lines by char from user with triming leading whitespace", function() {
          ensureWait('g J : : enter', {
            textC_: "__0|12::345\n__678\n__9ab\n"
          });
          ensureWait('.', {
            textC_: "__0|12::345::678\n__9ab\n"
          });
          ensureWait('u u', {
            textC_: "__0|12\n__345\n__678\n__9ab\n"
          });
          return ensureWait('4 g J : : enter', {
            textC_: "__0|12::345::678::9ab\n"
          });
        });
        return it("keep multi-cursors on cancel", function() {
          set({
            textC: "  0|12\n  345\n  6!78\n  9ab\n  c|de\n  fgh\n"
          });
          return ensureWait("g J : escape", {
            textC: "  0|12\n  345\n  6!78\n  9ab\n  c|de\n  fgh\n"
          });
        });
      });
      return describe("JoinByInputWithKeepingSpace", function() {
        beforeEach(function() {
          return atom.keymaps.add("test", {
            'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
              'g J': 'vim-mode-plus:join-by-input-with-keeping-space'
            }
          });
        });
        return it("joins lines by char from user without triming leading whitespace", function() {
          ensureWait('g J : : enter', {
            textC_: "__0|12::__345\n__678\n__9ab\n"
          });
          ensureWait('.', {
            textC_: "__0|12::__345::__678\n__9ab\n"
          });
          ensureWait('u u', {
            textC_: "__0|12\n__345\n__678\n__9ab\n"
          });
          return ensureWait('4 g J : : enter', {
            textC_: "__0|12::__345::__678::__9ab\n"
          });
        });
      });
    });
    describe('ToggleLineComments', function() {
      var oldGrammar, originalText, ref3;
      ref3 = [], oldGrammar = ref3[0], originalText = ref3[1];
      beforeEach(function() {
        waitsForPromise(function() {
          return atom.packages.activatePackage('language-coffee-script');
        });
        return runs(function() {
          var grammar;
          oldGrammar = editor.getGrammar();
          grammar = atom.grammars.grammarForScopeName('source.coffee');
          editor.setGrammar(grammar);
          originalText = "class Base\n  constructor: (args) ->\n    pivot = items.shift()\n    left = []\n    right = []\n\nconsole.log \"hello\"";
          return set({
            text: originalText
          });
        });
      });
      afterEach(function() {
        return editor.setGrammar(oldGrammar);
      });
      it('toggle comment for textobject for indent and repeatable', function() {
        set({
          cursor: [2, 0]
        });
        ensure('g / i i', {
          text: "class Base\n  constructor: (args) ->\n    # pivot = items.shift()\n    # left = []\n    # right = []\n\nconsole.log \"hello\""
        });
        return ensure('.', {
          text: originalText
        });
      });
      return it('toggle comment for textobject for paragraph and repeatable', function() {
        set({
          cursor: [2, 0]
        });
        ensure('g / i p', {
          text: "# class Base\n#   constructor: (args) ->\n#     pivot = items.shift()\n#     left = []\n#     right = []\n\nconsole.log \"hello\""
        });
        return ensure('.', {
          text: originalText
        });
      });
    });
    describe("SplitString, SplitStringWithKeepingSplitter", function() {
      beforeEach(function() {
        atom.keymaps.add("test", {
          'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
            'g /': 'vim-mode-plus:split-string',
            'g ?': 'vim-mode-plus:split-string-with-keeping-splitter'
          }
        });
        return set({
          textC: "|a:b:c\nd:e:f\n"
        });
      });
      describe("SplitString", function() {
        it("split string into lines", function() {
          ensureWait("g / : enter", {
            textC: "|a\nb\nc\nd:e:f\n"
          });
          return ensureWait("G .", {
            textC: "a\nb\nc\n|d\ne\nf\n"
          });
        });
        it("[from normal] keep multi-cursors on cancel", function() {
          set({
            textC_: "  0|12  345  6!78  9ab  c|de  fgh"
          });
          return ensureWait("g / : escape", {
            textC_: "  0|12  345  6!78  9ab  c|de  fgh"
          });
        });
        return it("[from visual] keep multi-cursors on cancel", function() {
          set({
            textC: "  0|12  345  6!78  9ab  c|de  fgh"
          });
          ensure("v", {
            textC: "  01|2  345  67!8  9ab  cd|e  fgh",
            selectedTextOrdered: ["1", "7", "d"],
            mode: ["visual", "characterwise"]
          });
          return ensureWait("g / escape", {
            textC: "  01|2  345  67!8  9ab  cd|e  fgh",
            selectedTextOrdered: ["1", "7", "d"],
            mode: ["visual", "characterwise"]
          });
        });
      });
      return describe("SplitStringWithKeepingSplitter", function() {
        it("split string into lines without removing spliter char", function() {
          ensureWait("g ? : enter", {
            textC: "|a:\nb:\nc\nd:e:f\n"
          });
          return ensureWait("G .", {
            textC: "a:\nb:\nc\n|d:\ne:\nf\n"
          });
        });
        it("keep multi-cursors on cancel", function() {
          set({
            textC_: "  0|12  345  6!78  9ab  c|de  fgh"
          });
          return ensureWait("g ? : escape", {
            textC_: "  0|12  345  6!78  9ab  c|de  fgh"
          });
        });
        return it("[from visual] keep multi-cursors on cancel", function() {
          set({
            textC: "  0|12  345  6!78  9ab  c|de  fgh"
          });
          ensure("v", {
            textC: "  01|2  345  67!8  9ab  cd|e  fgh",
            selectedTextOrdered: ["1", "7", "d"],
            mode: ["visual", "characterwise"]
          });
          return ensureWait("g ? escape", {
            textC: "  01|2  345  67!8  9ab  cd|e  fgh",
            selectedTextOrdered: ["1", "7", "d"],
            mode: ["visual", "characterwise"]
          });
        });
      });
    });
    describe("SplitArguments, SplitArgumentsWithRemoveSeparator", function() {
      beforeEach(function() {
        atom.keymaps.add("test", {
          'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
            'g ,': 'vim-mode-plus:split-arguments',
            'g !': 'vim-mode-plus:split-arguments-with-remove-separator'
          }
        });
        waitsForPromise(function() {
          return atom.packages.activatePackage('language-javascript');
        });
        return runs(function() {
          return set({
            grammar: 'source.js',
            text: "hello = () => {\n  {f1, f2, f3} = require('hello')\n  f1(f2(1, \"a, b, c\"), 2, (arg) => console.log(arg))\n  s = `abc def hij`\n}"
          });
        });
      });
      describe("SplitArguments", function() {
        it("split by commma with adjust indent", function() {
          set({
            cursor: [1, 3]
          });
          return ensure('g , i {', {
            textC: "hello = () => {\n  |{\n    f1,\n    f2,\n    f3\n  } = require('hello')\n  f1(f2(1, \"a, b, c\"), 2, (arg) => console.log(arg))\n  s = `abc def hij`\n}"
          });
        });
        it("split by commma with adjust indent", function() {
          set({
            cursor: [2, 5]
          });
          ensure('g , i (', {
            textC: "hello = () => {\n  {f1, f2, f3} = require('hello')\n  f1|(\n    f2(1, \"a, b, c\"),\n    2,\n    (arg) => console.log(arg)\n  )\n  s = `abc def hij`\n}"
          });
          ensure('j w');
          return ensure('g , i (', {
            textC: "hello = () => {\n  {f1, f2, f3} = require('hello')\n  f1(\n    f2|(\n      1,\n      \"a, b, c\"\n    ),\n    2,\n    (arg) => console.log(arg)\n  )\n  s = `abc def hij`\n}"
          });
        });
        return it("split by white-space with adjust indent", function() {
          set({
            cursor: [3, 10]
          });
          return ensure('g , i `', {
            textC: "hello = () => {\n  {f1, f2, f3} = require('hello')\n  f1(f2(1, \"a, b, c\"), 2, (arg) => console.log(arg))\n  s = |`\n    abc\n    def\n    hij\n  `\n}"
          });
        });
      });
      return describe("SplitByArgumentsWithRemoveSeparator", function() {
        beforeEach(function() {});
        return it("remove splitter when split", function() {
          set({
            cursor: [1, 3]
          });
          return ensure('g ! i {', {
            textC: "hello = () => {\n  |{\n    f1\n    f2\n    f3\n  } = require('hello')\n  f1(f2(1, \"a, b, c\"), 2, (arg) => console.log(arg))\n  s = `abc def hij`\n}"
          });
        });
      });
    });
    describe("Change Order faimliy: Reverse, Sort, SortCaseInsensitively, SortByNumber", function() {
      beforeEach(function() {
        return atom.keymaps.add("test", {
          'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
            'g r': 'vim-mode-plus:reverse',
            'g s': 'vim-mode-plus:sort',
            'g S': 'vim-mode-plus:sort-by-number'
          }
        });
      });
      describe("characterwise target", function() {
        describe("Reverse", function() {
          it("[comma separated] reverse text", function() {
            set({
              textC: "   ( dog, ca|t, fish, rabbit, duck, gopher, squid )"
            });
            return ensure('g r i (', {
              textC_: "   (| squid, gopher, duck, rabbit, fish, cat, dog )"
            });
          });
          it("[comma sparated] reverse text", function() {
            set({
              textC: "   ( 'dog ca|t', 'fish rabbit', 'duck gopher squid' )"
            });
            return ensure('g r i (', {
              textC_: "   (| 'duck gopher squid', 'fish rabbit', 'dog cat' )"
            });
          });
          it("[space sparated] reverse text", function() {
            set({
              textC: "   ( dog ca|t fish rabbit duck gopher squid )"
            });
            return ensure('g r i (', {
              textC_: "   (| squid gopher duck rabbit fish cat dog )"
            });
          });
          it("[comma sparated multi-line] reverse text", function() {
            set({
              textC: "{\n  |1, 2, 3, 4,\n  5, 6,\n  7,\n  8, 9\n}"
            });
            return ensure('g r i {', {
              textC: "{\n|  9, 8, 7, 6,\n  5, 4,\n  3,\n  2, 1\n}"
            });
          });
          it("[comma sparated multi-line] keep comma followed to last entry", function() {
            set({
              textC: "[\n  |1, 2, 3, 4,\n  5, 6,\n]"
            });
            return ensure('g r i [', {
              textC: "[\n|  6, 5, 4, 3,\n  2, 1,\n]"
            });
          });
          it("[comma sparated multi-line] aware of nexted pair and quotes and escaped quote", function() {
            set({
              textC: "(\n  |\"(a, b, c)\", \"[( d e f\", test(g, h, i),\n  \"\\\"j, k, l\",\n  '\\'m, n', test(o, p),\n)"
            });
            return ensure('g r i (', {
              textC: "(\n|  test(o, p), '\\'m, n', \"\\\"j, k, l\",\n  test(g, h, i),\n  \"[( d e f\", \"(a, b, c)\",\n)"
            });
          });
          it("[space sparated multi-line] aware of nexted pair and quotes and escaped quote", function() {
            set({
              textC_: "(\n  |\"(a, b, c)\" \"[( d e f\"      test(g, h, i)\n  \"\\\"j, k, l\"___\n  '\\'m, n'    test(o, p)\n)"
            });
            return ensure('g r i (', {
              textC_: "(\n|  test(o, p) '\\'m, n'      \"\\\"j, k, l\"\n  test(g, h, i)___\n  \"[( d e f\"    \"(a, b, c)\"\n)"
            });
          });
          return it("[text not separated] reverse text", function() {
            set({
              textC_: " 12|345 "
            });
            return ensure('g r i w', {
              textC_: " |54321 "
            });
          });
        });
        describe("Sort", function() {
          it("[comma separated] sort text", function() {
            set({
              textC: "   ( dog, ca|t, fish, rabbit, duck, gopher, squid )"
            });
            return ensure('g s i (', {
              textC: "   (| cat, dog, duck, fish, gopher, rabbit, squid )"
            });
          });
          return it("[text not separated] sort text", function() {
            set({
              textC_: " fe|dcba "
            });
            return ensure('g s i w', {
              textC_: " |abcdef "
            });
          });
        });
        return describe("SortByNumber", function() {
          it("[comma separated] sort by number", function() {
            set({
              textC_: "___(9, 1, |10, 5)"
            });
            return ensure('g S i (', {
              textC_: "___(|1, 5, 9, 10)"
            });
          });
          return it("[text not separated] sort by number", function() {
            set({
              textC_: " 91|3za87 "
            });
            return ensure('g s i w', {
              textC_: " |13789az "
            });
          });
        });
      });
      return describe("linewise target", function() {
        beforeEach(function() {
          return set({
            textC: "|z\n\n10a\nb\na\n\n5\n1\n"
          });
        });
        describe("Reverse", function() {
          return it("reverse rows", function() {
            return ensure('g r G', {
              textC: "|1\n5\n\na\nb\n10a\n\nz\n"
            });
          });
        });
        describe("Sort", function() {
          return it("sort rows", function() {
            return ensure('g s G', {
              textC: "|\n\n1\n10a\n5\na\nb\nz\n"
            });
          });
        });
        describe("SortByNumber", function() {
          return it("sort rows numerically", function() {
            return ensure("g S G", {
              textC: "|1\n5\n10a\nz\n\nb\na\n\n"
            });
          });
        });
        return describe("SortCaseInsensitively", function() {
          beforeEach(function() {
            return atom.keymaps.add("test", {
              'atom-text-editor.vim-mode-plus:not(.insert-mode)': {
                'g s': 'vim-mode-plus:sort-case-insensitively'
              }
            });
          });
          return it("Sort rows case-insensitively", function() {
            set({
              textC: "|apple\nBeef\nAPPLE\nDOG\nbeef\nApple\nBEEF\nDog\ndog\n"
            });
            return ensure("g s G", {
              text: "apple\nApple\nAPPLE\nbeef\nBeef\nBEEF\ndog\nDog\nDOG\n"
            });
          });
        });
      });
    });
    describe("NumberingLines", function() {
      var ensureNumbering;
      ensureNumbering = function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        dispatch(editor.element, 'vim-mode-plus:numbering-lines');
        return ensure.apply(null, args);
      };
      beforeEach(function() {
        return set({
          textC: "|a\nb\nc\n\n"
        });
      });
      it("numbering by motion", function() {
        return ensureNumbering("j", {
          textC: "|1: a\n2: b\nc\n\n"
        });
      });
      return it("numbering by text-object", function() {
        return ensureNumbering("p", {
          textC: "|1: a\n2: b\n3: c\n\n"
        });
      });
    });
    return describe("DuplicateWithCommentOutOriginal", function() {
      beforeEach(function() {
        return set({
          textC: "\n1: |Pen\n2: Pineapple\n\n4: Apple\n5: Pen\n"
        });
      });
      it("dup-and-commentout", function() {
        waitsForPromise(function() {
          return atom.packages.activatePackage('language-javascript').then(function() {
            set({
              grammar: "source.js"
            });
            dispatch(editor.element, 'vim-mode-plus:duplicate-with-comment-out-original');
            return ensure("i p", {
              textC: "\n// 1: Pen\n// 2: Pineapple\n1: |Pen\n2: Pineapple\n\n4: Apple\n5: Pen\n"
            });
          });
        });
        return runs(function() {
          return ensure(".", {
            textC: "\n// // 1: Pen\n// // 2: Pineapple\n// 1: Pen\n// 2: Pineapple\n// 1: Pen\n// 2: Pineapple\n1: |Pen\n2: Pineapple\n\n4: Apple\n5: Pen\n"
          });
        });
      });
      return it("dup-and-commentout", function() {
        waitsForPromise(function() {
          return atom.packages.activatePackage('language-ruby').then(function() {
            set({
              grammar: "source.ruby"
            });
            dispatch(editor.element, 'vim-mode-plus:duplicate-with-comment-out-original');
            return ensure("i p", {
              textC: "\n# 1: Pen\n# 2: Pineapple\n1: |Pen\n2: Pineapple\n\n4: Apple\n5: Pen\n"
            });
          });
        });
        return runs(function() {
          return ensure(".", {
            textC: "\n# # 1: Pen\n# # 2: Pineapple\n# 1: Pen\n# 2: Pineapple\n# 1: Pen\n# 2: Pineapple\n1: |Pen\n2: Pineapple\n\n4: Apple\n5: Pen\n"
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy92aW0tbW9kZS1wbHVzL3NwZWMvb3BlcmF0b3ItdHJhbnNmb3JtLXN0cmluZy1zcGVjLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsb0NBQUE7SUFBQTs7RUFBQSxNQUEwQixPQUFBLENBQVEsZUFBUixDQUExQixFQUFDLDZCQUFELEVBQWM7O0VBQ2QsUUFBQSxHQUFXLE9BQUEsQ0FBUSxpQkFBUjs7RUFFWCxRQUFBLENBQVMsMEJBQVQsRUFBcUMsU0FBQTtBQUNuQyxRQUFBO0lBQUEsT0FBb0UsRUFBcEUsRUFBQyxhQUFELEVBQU0sZ0JBQU4sRUFBYyxvQkFBZCxFQUEwQiwwQkFBMUIsRUFBNEM7SUFDNUMsT0FBb0MsRUFBcEMsRUFBQyxnQkFBRCxFQUFTLHVCQUFULEVBQXdCO0lBRXhCLFVBQUEsQ0FBVyxTQUFBO2FBQ1QsV0FBQSxDQUFZLFNBQUMsS0FBRCxFQUFRLEdBQVI7UUFDVixRQUFBLEdBQVc7UUFDVix3QkFBRCxFQUFTO2VBQ1IsYUFBRCxFQUFNLG1CQUFOLEVBQWMsMkJBQWQsRUFBMEIsdUNBQTFCLEVBQTRDLCtDQUE1QyxFQUFvRTtNQUgxRCxDQUFaO0lBRFMsQ0FBWDtJQU1BLFFBQUEsQ0FBUyxrQkFBVCxFQUE2QixTQUFBO01BQzNCLFVBQUEsQ0FBVyxTQUFBO2VBQ1QsR0FBQSxDQUNFO1VBQUEsS0FBQSxFQUFPLFlBQVA7U0FERjtNQURTLENBQVg7TUFPQSxFQUFBLENBQUcsa0NBQUgsRUFBdUMsU0FBQTtRQUNyQyxNQUFBLENBQU8sR0FBUCxFQUNFO1VBQUEsS0FBQSxFQUFPLFlBQVA7U0FERjtRQUtBLE1BQUEsQ0FBTyxHQUFQLEVBQ0U7VUFBQSxLQUFBLEVBQU8sWUFBUDtTQURGO2VBTUEsTUFBQSxDQUFRLEdBQVIsRUFDRTtVQUFBLEtBQUEsRUFBTyxZQUFQO1NBREY7TUFacUMsQ0FBdkM7TUFr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LENBQVcsU0FBWCxFQUFzQjtjQUFBLElBQUEsRUFBTSxPQUFOO2FBQXRCO1VBQXhCLENBQVQ7VUFFQSxFQUFBLENBQUcsSUFBSCxFQUFTLFNBQUE7WUFBRyxHQUFBLENBQUk7Y0FBQSxLQUFBLEVBQU8sUUFBUDthQUFKO21CQUFxQixVQUFBLENBQVcsU0FBWCxFQUFzQjtjQUFBLElBQUEsRUFBTSxPQUFOO2FBQXRCO1VBQXhCLENBQVQ7VUFDQSxFQUFBLENBQUcsSUFBSCxFQUFTLFNBQUE7WUFBRyxHQUFBLENBQUk7Y0FBQSxLQUFBLEVBQU8sUUFBUDthQUFKO21CQUFxQixVQUFBLENBQVcsU0FBWCxFQUFzQjtjQUFBLElBQUEsRUFBTSxPQUFOO2FBQXRCO1VBQXhCLENBQVQ7VUFDQSxFQUFBLENBQUcsSUFBSCxFQUFTLFNBQUE7WUFBRyxHQUFBLENBQUk7Y0FBQSxLQUFBLEVBQU8sUUFBUDthQUFKO21CQUFxQixVQUFBLENBQVcsU0FBWCxFQUFzQjtjQUFBLElBQUEsRUFBTSxPQUFOO2FBQXRCO1VBQXhCLENBQVQ7VUFFQSxFQUFBLENBQUcsSUFBSCxFQUFTLFNBQUE7WUFBRyxHQUFBLENBQUk7Y0FBQSxLQUFBLEVBQU8sUUFBUDthQUFKO21CQUFxQixVQUFBLENBQVcsU0FBWCxFQUFzQjtjQUFBLElBQUEsRUFBTSxPQUFOO2FBQXRCO1VBQXhCLENBQVQ7VUFDQSxFQUFBLENBQUcsSUFBSCxFQUFTLFNBQUE7WUFBRyxHQUFBLENBQUk7Y0FBQSxLQUFBLEVBQU8sUUFBUDthQUFKO21CQUFxQixVQUFBLENBQVcsU0FBWCxFQUFzQjtjQUFBLElBQUEsRUFBTSxPQUFOO2FBQXRCO1VBQXhCLENBQVQ7VUFDQSxFQUFBLENBQUcsSUFBSCxFQUFTLFNBQUE7WUFBRyxHQUFBLENBQUk7Y0FBQSxLQUFBLEVBQU8sUUFBUDthQUFKO21CQUFxQixVQUFBLENBQVcsU0FBWCxFQUFzQjtjQUFBLElBQUEsRUFBTSxPQUFOO2FBQXRCO1VBQXhCLENBQVQ7VUFFQSxFQUFBLENBQUcsS0FBSCxFQUFVLFNBQUE7WUFBRyxH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Z0IsU0FBQTtpQkFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsZUFBOUIsQ0FBOEMsQ0FBQyxJQUEvQyxDQUFvRCxTQUFBO1lBQ2xELEdBQUEsQ0FBSTtjQUFBLE9BQUEsRUFBUyxhQUFUO2FBQUo7WUFDQSxRQUFBLENBQVMsTUFBTSxDQUFDLE9BQWhCLEVBQXlCLG1EQUF6QjttQkFDQSxNQUFBLENBQU8sS0FBUCxFQUNFO2NBQUEsS0FBQSxFQUFPLHlFQUFQO2FBREY7VUFIa0QsQ0FBcEQ7UUFEYyxDQUFoQjtlQWVBLElBQUEsQ0FBSyxTQUFBO2lCQUNILE1BQUEsQ0FBTyxHQUFQLEVBQ0U7WUFBQSxLQUFBLEVBQU8saUlBQVA7V0FERjtRQURHLENBQUw7TUFoQnVCLENBQXpCO0lBNUMwQyxDQUE1QztFQTl5RG1DLENBQXJDO0FBSEEiLCJzb3VyY2VzQ29udGVudCI6WyJ7Z2V0VmltU3RhdGUsIGRpc3BhdGNofSA9IHJlcXVpcmUgJy4vc3BlYy1oZWxwZXInXG5zZXR0aW5ncyA9IHJlcXVpcmUgJy4uL2xpYi9zZXR0aW5ncydcblxuZGVzY3JpYmUgXCJPcGVyYXRvciBUcmFuc2Zvcm1TdHJpbmdcIiwgLT5cbiAgW3NldCwgZW5zdXJlLCBlbnN1cmVXYWl0LCBiaW5kRW5zdXJlT3B0aW9uLCBiaW5kRW5zdXJlV2FpdE9wdGlvbl0gPSBbXVxuICBbZWRpdG9yLCBlZGl0b3JFbGVtZW50LCB2aW1TdGF0ZV0gPSBbXVxuXG4gIGJlZm9yZUVhY2ggLT5cbiAgICBnZXRWaW1TdGF0ZSAoc3RhdGUsIHZpbSkgLT5cbiAgICAgIHZpbVN0YXRlID0gc3RhdGVcbiAgICAgIHtlZGl0b3IsIGVkaXRvckVsZW1lbnR9ID0gdmltU3RhdGVcbiAgICAgIHtzZXQsIGVuc3VyZSwgZW5zdXJlV2FpdCwgYmluZEVuc3VyZU9wdGlvbiwgYmluZEVuc3VyZVdhaXRPcHRpb259ID0gdmltXG5cbiAgZGVzY3JpYmUgJ3RoZSB+IGtleWJpbmRpbmcnLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIHNldFxuICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgIHxhQmNcbiAgICAgICAgfFh5WlxuICAgICAgICBcIlwiXCJcblxuICAgIGl0ICd0b2dnbGVzIHRoZSBjYXNlIGFuZCBtb3ZlcyByaWdodCcsIC0+XG4gICAgICBlbnN1cmUgJ34nLFxuICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgIEF8QmNcbiAgICAgICAgeHx5WlxuICAgICAgICBcIlwiXCJcbiAgICAgIGVuc3VyZSAnficsXG4gICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgQWJ8Y1xuICAgICAgICB4WXxaXG4gICAgICAgIFwiXCJcIlxuXG4gICAgICBlbnN1cmUgICd+JyxcbiAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICBBYnxDXG4gICAgICAgIHhZfHpcbiAgICAgICAgXCJcIlwiXG5cbiAgICBpdCAndGFrZXMgYSBjb3VudCcsIC0+XG4gICAgICBlbnN1cmUgJzQgficsXG4gICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgQWJ8Q1xuICAgICAgICB4WXx6XG4gICAgICAgIFwiXCJcIlxuXG4gICAgZGVzY3JpYmUgXCJpbiB2aXN1YWwgbW9kZVwiLCAtPlxuICAgICAgaXQgXCJ0b2dnbGVzIHRoZSBjYXNlIG9mIHRoZSBzZWxlY3RlZCB0ZXh0XCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFswLCAwXVxuICAgICAgICBlbnN1cmUgJ1YgficsIHRleHQ6ICdBYkNcXG5YeVonXG5cbiAgICBkZXNjcmliZSBcIndpdGggZyBhbmQgbW90aW9uXCIsIC0+XG4gICAgICBpdCBcInRvZ2dsZXMgdGhlIGNhc2Ugb2YgdGV4dCwgd29uJ3QgbW92ZSBjdXJzb3JcIiwgLT5cbiAgICAgICAgc2V0IHRleHRDOiBcInxhQmNcXG5YeVpcIlxuICAgICAgICBlbnN1cmUgJ2cgfiAyIGwnLCB0ZXh0QzogJ3xBYmNcXG5YeVonXG5cbiAgICAgIGl0IFwiZ35+IHRvZ2dsZXMgdGhlIGxpbmUgb2YgdGV4dCwgd29uJ3QgbW92ZSBjdXJzb3JcIiwgLT5cbiAgICAgICAgc2V0IHRleHRDOiBcImF8QmNcXG5YeVpcIlxuICAgICAgICBlbnN1cmUgJ2cgfiB+JywgdGV4dEM6ICdBfGJDXFxuWHlaJ1xuXG4gICAgICBpdCBcImd+Z34gdG9nZ2xlcyB0aGUgbGluZSBvZiB0ZXh0LCB3b24ndCBtb3ZlIGN1cnNvclwiLCAtPlxuICAgICAgICBzZXQgdGV4dEM6IFwiYXxCY1xcblh5WlwiXG4gICAgICAgIGVuc3VyZSAnZyB+IGcgficsIHRleHRDOiAnQXxiQ1xcblh5WidcblxuICBkZXNjcmliZSAndGhlIFUga2V5YmluZGluZycsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgc2V0XG4gICAgICAgIHRleHQ6ICdhQmNcXG5YeVonXG4gICAgICAgIGN1cnNvcjogWzAsIDBdXG5cbiAgICBpdCBcIm1ha2VzIHRleHQgdXBwZXJjYXNlIHdpdGggZyBhbmQgbW90aW9uLCBhbmQgd29uJ3QgbW92ZSBjdXJzb3JcIiwgLT5cbiAgICAgIGVuc3VyZSAnZyBVIGwnLCB0ZXh0OiAnQUJjXFxuWHlaJywgY3Vyc29yOiBbMCwgMF1cbiAgICAgIGVuc3VyZSAnZyBVIGUnLCB0ZXh0OiAnQUJDXFxuWHlaJywgY3Vyc29yOiBbMCwgMF1cbiAgICAgIHNldCBjdXJzb3I6IFsxLCAwXVxuICAgICAgZW5zdXJlICdnIFUgJCcsIHRleHQ6ICdBQkNcXG5YWVonLCBjdXJzb3I6IFsxLCAwXVxuXG4gICAgaXQgXCJtYWtlcyB0aGUgc2VsZWN0ZWQgdGV4dCB1cHBlcmNhc2UgaW4gdmlzdWFsIG1vZGVcIiwgLT5cbiAgICAgIGVuc3VyZSAnViBVJywgdGV4dDogJ0FCQ1xcblh5WidcblxuICAgIGl0IFwiZ1VVIHVwY2FzZSB0aGUgbGluZSBvZiB0ZXh0LCB3b24ndCBtb3ZlIGN1cnNvclwiLCAtPlxuICAgICAgc2V0IGN1cnNvcjogWzAsIDFdXG4gICAgICBlbnN1cmUgJ2cgVSBVJywgdGV4dDogJ0FCQ1xcblh5WicsIGN1cnNvcjogWzAsIDFdXG5cbiAgICBpdCBcImdVZ1UgdXBjYXNlIHRoZSBsaW5lIG9mIHRleHQsIHdvbid0IG1vdmUgY3Vyc29yXCIsIC0+XG4gICAgICBzZXQgY3Vyc29yOiBbMCwgMV1cbiAgICAgIGVuc3VyZSAnZyBVIGcgVScsIHRleHQ6ICdBQkNcXG5YeVonLCBjdXJzb3I6IFswLCAxXVxuXG4gIGRlc2NyaWJlICd0aGUgdSBrZXliaW5kaW5nJywgLT5cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBzZXQgdGV4dDogJ2FCY1xcblh5WicsIGN1cnNvcjogWzAsIDBdXG5cbiAgICBpdCBcIm1ha2VzIHRleHQgbG93ZXJjYXNlIHdpdGggZyBhbmQgbW90aW9uLCBhbmQgd29uJ3QgbW92ZSBjdXJzb3JcIiwgLT5cbiAgICAgIGVuc3VyZSAnZyB1ICQnLCB0ZXh0OiAnYWJjXFxuWHlaJywgY3Vyc29yOiBbMCwgMF1cblxuICAgIGl0IFwibWFrZXMgdGhlIHNlbGVjdGVkIHRleHQgbG93ZXJjYXNlIGluIHZpc3VhbCBtb2RlXCIsIC0+XG4gICAgICBlbnN1cmUgJ1YgdScsIHRleHQ6ICdhYmNcXG5YeVonXG5cbiAgICBpdCBcImd1dSBkb3duY2FzZSB0aGUgbGluZSBvZiB0ZXh0LCB3b24ndCBtb3ZlIGN1cnNvclwiLCAtPlxuICAgICAgc2V0IGN1cnNvcjogWzAsIDFdXG4gICAgICBlbnN1cmUgJ2cgdSB1JywgdGV4dDogJ2FiY1xcblh5WicsIGN1cnNvcjogWzAsIDFdXG5cbiAgICBpdCBcImd1Z3UgZG93bmNhc2UgdGhlIGxpbmUgb2YgdGV4dCwgd29uJ3QgbW92ZSBjdXJzb3JcIiwgLT5cbiAgICAgIHNldCBjdXJzb3I6IFswLCAxXVxuICAgICAgZW5zdXJlICdnIHUgZyB1JywgdGV4dDogJ2FiY1xcblh5WicsIGN1cnNvcjogWzAsIDFdXG5cbiAgZGVzY3JpYmUgJ2NoYW5nZSBjYXNlIGZvciBncmVlayBjaGFyYWN0ZXInLCAtPlxuICAgIGxvd2VyR3JlZWsgPSBcIs6xIM6yIM60IM61IM64IM65IM66IM67IM6/IM+AIM+BIM+EIM+FIM+GIM+HIM+IIM6zIM62IM63IM68IM69IM6+IM+DIM+JXCJcbiAgICB1cHBlckdyZWVrID0gXCLOkSDOkiDOlCDOlSDOmCDOmSDOmiDOmyDOnyDOoCDOoSDOpCDOpSDOpiDOpyDOqCDOkyDOliDOlyDOnCDOnSDOniDOoyDOqVwiXG5cbiAgICBpdCBcImNoYW5nZSBjYXNlIHRvIGxvd2VyLXRvLXVwcGVyXCIsIC0+XG4gICAgICBzZXQgdGV4dDogbG93ZXJHcmVlaywgY3Vyc29yOiBbMCwgMF1cbiAgICAgIGVuc3VyZSAnZyBVICQnLCB0ZXh0OiB1cHBlckdyZWVrLCBjdXJzb3I6IFswLCAwXVxuXG4gICAgaXQgXCJjaGFuZ2UgY2FzZSB0byB1cHBlci10by1sb3dlclwiLCAtPlxuICAgICAgc2V0IHRleHQ6IHVwcGVyR3JlZWssIGN1cnNvcjogWzAsIDBdXG4gICAgICBlbnN1cmUgJ2cgdSAkJywgdGV4dDogbG93ZXJHcmVlaywgY3Vyc29yOiBbMCwgMF1cblxuICBkZXNjcmliZSBcInRoZSA+IGtleWJpbmRpbmdcIiwgLT5cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBzZXQgdGV4dDogXCJcIlwiXG4gICAgICAgIDEyMzQ1XG4gICAgICAgIGFiY2RlXG4gICAgICAgIEFCQ0RFXG4gICAgICAgIFwiXCJcIlxuXG4gICAgZGVzY3JpYmUgXCI+ID5cIiwgLT5cbiAgICAgIGRlc2NyaWJlIFwiZnJvbSBmaXJzdCBsaW5lXCIsIC0+XG4gICAgICAgIGl0IFwiaW5kZW50cyB0aGUgY3VycmVudCBsaW5lXCIsIC0+XG4gICAgICAgICAgc2V0IGN1cnNvcjogWzAsIDBdXG4gICAgICAgICAgZW5zdXJlICc+ID4nLFxuICAgICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgICAgICB8MTIzNDVcbiAgICAgICAgICAgIGFiY2RlXG4gICAgICAgICAgICBBQkNERVxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgIGl0IFwiY291bnQgbWVhbnMgTiBsaW5lIGluZGVudHMgYW5kIHVuZG9hYmxlLCByZXBlYXRhYmxlXCIsIC0+XG4gICAgICAgICAgc2V0IGN1cnNvcjogWzAsIDBdXG4gICAgICAgICAgZW5zdXJlICczID4gPicsXG4gICAgICAgICAgICB0ZXh0Q186IFwiXCJcIlxuICAgICAgICAgICAgX198MTIzNDVcbiAgICAgICAgICAgIF9fYWJjZGVcbiAgICAgICAgICAgIF9fQUJDREVcbiAgICAgICAgICAgIFwiXCJcIlxuXG4gICAgICAgICAgZW5zdXJlICd1JyxcbiAgICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAgIHwxMjM0NVxuICAgICAgICAgICAgYWJjZGVcbiAgICAgICAgICAgIEFCQ0RFXG4gICAgICAgICAgICBcIlwiXCJcblxuICAgICAgICAgIGVuc3VyZSAnLiAuJyxcbiAgICAgICAgICAgIHRleHRDXzogXCJcIlwiXG4gICAgICAgICAgICBfX19ffDEyMzQ1XG4gICAgICAgICAgICBfX19fYWJjZGVcbiAgICAgICAgICAgIF9fX19BQkNERVxuICAgICAgICAgICAgXCJcIlwiXG5cbiAgICAgIGRlc2NyaWJlIFwiZnJvbSBsYXN0IGxpbmVcIiwgLT5cbiAgICAgICAgaXQgXCJpbmRlbnRzIHRoZSBjdXJyZW50IGxpbmVcIiwgLT5cbiAgICAgICAgICBzZXQgY3Vyc29yOiBbMiwgMF1cbiAgICAgICAgICBlbnN1cmUgJz4gPicsXG4gICAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgICAxMjM0NVxuICAgICAgICAgICAgYWJjZGVcbiAgICAgICAgICAgICAgfEFCQ0RFXG4gICAgICAgICAgICBcIlwiXCJcblxuICAgIGRlc2NyaWJlIFwiaW4gdmlzdWFsIG1vZGVcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgc2V0IGN1cnNvcjogWzAsIDBdXG5cbiAgICAgIGl0IFwiW3ZDXSBpbmRlbnQgc2VsZWN0ZWQgbGluZXNcIiwgLT5cbiAgICAgICAgZW5zdXJlIFwidiBqID5cIixcbiAgICAgICAgICBtb2RlOiAnbm9ybWFsJ1xuICAgICAgICAgIHRleHRDXzogXCJcIlwiXG4gICAgICAgICAgX198MTIzNDVcbiAgICAgICAgICBfX2FiY2RlXG4gICAgICAgICAgQUJDREVcbiAgICAgICAgICBcIlwiXCJcbiAgICAgIGl0IFwiW3ZMXSBpbmRlbnQgc2VsZWN0ZWQgbGluZXNcIiwgLT5cbiAgICAgICAgZW5zdXJlIFwiViA+XCIsXG4gICAgICAgICAgbW9kZTogJ25vcm1hbCdcbiAgICAgICAgICB0ZXh0Q186IFwiXCJcIlxuICAgICAgICAgIF9ffDEyMzQ1XG4gICAgICAgICAgYWJjZGVcbiAgICAgICAgICBBQkNERVxuICAgICAgICAgIFwiXCJcIlxuICAgICAgICBlbnN1cmUgJy4nLFxuICAgICAgICAgIHRleHRDXzogXCJcIlwiXG4gICAgICAgICAgX19fX3wxMjM0NVxuICAgICAgICAgIGFiY2RlXG4gICAgICAgICAgQUJDREVcbiAgICAgICAgICBcIlwiXCJcbiAgICAgIGl0IFwiW3ZMXSBjb3VudCBtZWFucyBOIHRpbWVzIGluZGVudFwiLCAtPlxuICAgICAgICBlbnN1cmUgXCJWIDMgPlwiLFxuICAgICAgICAgIG1vZGU6ICdub3JtYWwnXG4gICAgICAgICAgdGV4dENfOiBcIlwiXCJcbiAgICAgICAgICBfX19fX198MTIzNDVcbiAgICAgICAgICBhYmNkZVxuICAgICAgICAgIEFCQ0RFXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZSAnLicsXG4gICAgICAgICAgdGV4dENfOiBcIlwiXCJcbiAgICAgICAgICBfX19fX19fX19fX198MTIzNDVcbiAgICAgICAgICBhYmNkZVxuICAgICAgICAgIEFCQ0RFXG4gICAgICAgICAgXCJcIlwiXG5cbiAgICBkZXNjcmliZSBcImluIHZpc3VhbCBtb2RlIGFuZCBzdGF5T25UcmFuc2Zvcm1TdHJpbmcgZW5hYmxlZFwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXR0aW5ncy5zZXQoJ3N0YXlPblRyYW5zZm9ybVN0cmluZycsIHRydWUpXG4gICAgICAgIHNldCBjdXJzb3I6IFswLCAwXVxuXG4gICAgICBpdCBcImluZGVudHMgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGFuZCBleGl0cyB2aXN1YWwgbW9kZVwiLCAtPlxuICAgICAgICBlbnN1cmUgJ3YgaiA+JyxcbiAgICAgICAgICBtb2RlOiAnbm9ybWFsJ1xuICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAgIDEyMzQ1XG4gICAgICAgICAgICB8YWJjZGVcbiAgICAgICAgICBBQkNERVxuICAgICAgICAgIFwiXCJcIlxuICAgICAgaXQgXCJ3aGVuIHJlcGVhdGVkLCBvcGVyYXRlIG9uIHNhbWUgcmFuZ2Ugd2hlbiBjdXJzb3Igd2FzIG5vdCBtb3ZlZFwiLCAtPlxuICAgICAgICBlbnN1cmUgJ3YgaiA+JyxcbiAgICAgICAgICBtb2RlOiAnbm9ybWFsJ1xuICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAgIDEyMzQ1XG4gICAgICAgICAgICB8YWJjZGVcbiAgICAgICAgICBBQkNERVxuICAgICAgICAgIFwiXCJcIlxuICAgICAgICBlbnN1cmUgJy4nLFxuICAgICAgICAgIG1vZGU6ICdub3JtYWwnXG4gICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgICAgICAxMjM0NVxuICAgICAgICAgICAgICB8YWJjZGVcbiAgICAgICAgICBBQkNERVxuICAgICAgICAgIFwiXCJcIlxuICAgICAgaXQgXCJ3aGVuIHJlcGVhdGVkLCBvcGVyYXRlIG9uIHJlbGF0aXZlIHJhbmdlIGZyb20gY3Vyc29yIHBvc2l0aW9uIHdpdGggc2FtZSBleHRlbnQgd2hlbiBjdXJzb3Igd2FzIG1vdmVkXCIsIC0+XG4gICAgICAgIGVuc3VyZSAndiBqID4nLFxuICAgICAgICAgIG1vZGU6ICdub3JtYWwnXG4gICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgICAgMTIzNDVcbiAgICAgICAgICAgIHxhYmNkZVxuICAgICAgICAgIEFCQ0RFXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZSAnbCAuJyxcbiAgICAgICAgICBtb2RlOiAnbm9ybWFsJ1xuICAgICAgICAgIHRleHRDXzogXCJcIlwiXG4gICAgICAgICAgX18xMjM0NVxuICAgICAgICAgIF9fX19hfGJjZGVcbiAgICAgICAgICBfX0FCQ0RFXG4gICAgICAgICAgXCJcIlwiXG5cbiAgZGVzY3JpYmUgXCJ0aGUgPCBrZXliaW5kaW5nXCIsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgc2V0XG4gICAgICAgIHRleHRDXzogXCJcIlwiXG4gICAgICAgIHxfXzEyMzQ1XG4gICAgICAgIF9fYWJjZGVcbiAgICAgICAgQUJDREVcbiAgICAgICAgXCJcIlwiXG5cbiAgICBkZXNjcmliZSBcIndoZW4gZm9sbG93ZWQgYnkgYSA8XCIsIC0+XG4gICAgICBpdCBcImluZGVudHMgdGhlIGN1cnJlbnQgbGluZVwiLCAtPlxuICAgICAgICBlbnN1cmUgJzwgPCcsXG4gICAgICAgICAgdGV4dENfOiBcIlwiXCJcbiAgICAgICAgICB8MTIzNDVcbiAgICAgICAgICBfX2FiY2RlXG4gICAgICAgICAgQUJDREVcbiAgICAgICAgICBcIlwiXCJcblxuICAgIGRlc2NyaWJlIFwid2hlbiBmb2xsb3dlZCBieSBhIHJlcGVhdGluZyA8XCIsIC0+XG4gICAgICBpdCBcImluZGVudHMgbXVsdGlwbGUgbGluZXMgYXQgb25jZSBhbmQgdW5kb2FibGVcIiwgLT5cbiAgICAgICAgZW5zdXJlICcyIDwgPCcsXG4gICAgICAgICAgdGV4dENfOiBcIlwiXCJcbiAgICAgICAgICB8MTIzNDVcbiAgICAgICAgICBhYmNkZVxuICAgICAgICAgIEFCQ0RFXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZSAndScsXG4gICAgICAgICAgdGV4dENfOiBcIlwiXCJcbiAgICAgICAgICB8X18xMjM0NVxuICAgICAgICAgIF9fYWJjZGVcbiAgICAgICAgICBBQkNERVxuICAgICAgICAgIFwiXCJcIlxuXG4gICAgZGVzY3JpYmUgXCJpbiB2aXN1YWwgbW9kZVwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0Q186IFwiXCJcIlxuICAgICAgICAgIHxfX19fX18xMjM0NVxuICAgICAgICAgIF9fX19fX2FiY2RlXG4gICAgICAgICAgQUJDREVcbiAgICAgICAgICBcIlwiXCJcblxuICAgICAgaXQgXCJjb3VudCBtZWFucyBOIHRpbWVzIG91dGRlbnRcIiwgLT5cbiAgICAgICAgZW5zdXJlICdWIGogMiA8JyxcbiAgICAgICAgICB0ZXh0Q186IFwiXCJcIlxuICAgICAgICAgIF9ffDEyMzQ1XG4gICAgICAgICAgX19hYmNkZVxuICAgICAgICAgIEFCQ0RFXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgICMgVGhpcyBpcyBub3QgaWRlYWwgY3Vyc29yIHBvc2l0aW9uLCBidXQgY3VycmVudCBsaW1pdGF0aW9uLlxuICAgICAgICAjIFNpbmNlIGluZGVudCBkZXBlbmRpbmcgb24gQXRvbSdzIHNlbGVjdGlvbi5pbmRlbnRTZWxlY3RlZFJvd3MoKVxuICAgICAgICAjIEltcGxlbWVudGluZyBpdCB2bXAgaW5kZXBlbmRlbnRseSBzb2x2ZSBpc3N1ZSwgYnV0IEkgaGF2ZSBhbm90aGVyIGlkZWEgYW5kIHdhbnQgdG8gdXNlIEF0b20ncyBvbmUgbm93LlxuICAgICAgICBlbnN1cmUgJ3UnLFxuICAgICAgICAgIHRleHRDXzogXCJcIlwiXG4gICAgICAgICAgX19fX19fMTIzNDVcbiAgICAgICAgICB8X19fX19fYWJjZGVcbiAgICAgICAgICBBQkNERVxuICAgICAgICAgIFwiXCJcIlxuXG4gIGRlc2NyaWJlIFwidGhlID0ga2V5YmluZGluZ1wiLCAtPlxuICAgIG9sZEdyYW1tYXIgPSBbXVxuXG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgd2FpdHNGb3JQcm9taXNlIC0+XG4gICAgICAgIGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCdsYW5ndWFnZS1qYXZhc2NyaXB0JylcblxuICAgICAgb2xkR3JhbW1hciA9IGVkaXRvci5nZXRHcmFtbWFyKClcbiAgICAgIHNldCB0ZXh0OiBcImZvb1xcbiAgYmFyXFxuICBiYXpcIiwgY3Vyc29yOiBbMSwgMF1cblxuXG4gICAgZGVzY3JpYmUgXCJ3aGVuIHVzZWQgaW4gYSBzY29wZSB0aGF0IHN1cHBvcnRzIGF1dG8taW5kZW50XCIsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIGpzR3JhbW1hciA9IGF0b20uZ3JhbW1hcnMuZ3JhbW1hckZvclNjb3BlTmFtZSgnc291cmNlLmpzJylcbiAgICAgICAgZWRpdG9yLnNldEdyYW1tYXIoanNHcmFtbWFyKVxuXG4gICAgICBhZnRlckVhY2ggLT5cbiAgICAgICAgZWRpdG9yLnNldEdyYW1tYXIob2xkR3JhbW1hcilcblxuICAgICAgZGVzY3JpYmUgXCJ3aGVuIGZvbGxvd2VkIGJ5IGEgPVwiLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgZW5zdXJlICc9ID0nXG5cbiAgICAgICAgaXQgXCJpbmRlbnRzIHRoZSBjdXJyZW50IGxpbmVcIiwgLT5cbiAgICAgICAgICBleHBlY3QoZWRpdG9yLmluZGVudGF0aW9uRm9yQnVmZmVyUm93KDEpKS50b0JlIDBcblxuICAgICAgZGVzY3JpYmUgXCJ3aGVuIGZvbGxvd2VkIGJ5IGEgcmVwZWF0aW5nID1cIiwgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIGVuc3VyZSAnMiA9ID0nXG5cbiAgICAgICAgaXQgXCJhdXRvaW5kZW50cyBtdWx0aXBsZSBsaW5lcyBhdCBvbmNlXCIsIC0+XG4gICAgICAgICAgZW5zdXJlIG51bGwsIHRleHQ6IFwiZm9vXFxuYmFyXFxuYmF6XCIsIGN1cnNvcjogWzEsIDBdXG5cbiAgICAgICAgZGVzY3JpYmUgXCJ1bmRvIGJlaGF2aW9yXCIsIC0+XG4gICAgICAgICAgaXQgXCJpbmRlbnRzIGJvdGggbGluZXNcIiwgLT5cbiAgICAgICAgICAgIGVuc3VyZSAndScsIHRleHQ6IFwiZm9vXFxuICBiYXJcXG4gIGJhelwiXG5cbiAgZGVzY3JpYmUgJ0NhbWVsQ2FzZScsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgc2V0XG4gICAgICAgIHRleHQ6ICd2aW0tbW9kZVxcbmF0b20tdGV4dC1lZGl0b3JcXG4nXG4gICAgICAgIGN1cnNvcjogWzAsIDBdXG5cbiAgICBpdCBcInRyYW5zZm9ybSB0ZXh0IGJ5IG1vdGlvbiBhbmQgcmVwZWF0YWJsZVwiLCAtPlxuICAgICAgZW5zdXJlICdnIEMgJCcsIHRleHQ6ICd2aW1Nb2RlXFxuYXRvbS10ZXh0LWVkaXRvclxcbicsIGN1cnNvcjogWzAsIDBdXG4gICAgICBlbnN1cmUgJ2ogLicsIHRleHQ6ICd2aW1Nb2RlXFxuYXRvbVRleHRFZGl0b3JcXG4nLCBjdXJzb3I6IFsxLCAwXVxuXG4gICAgaXQgXCJ0cmFuc2Zvcm0gc2VsZWN0aW9uXCIsIC0+XG4gICAgICBlbnN1cmUgJ1YgaiBnIEMnLCB0ZXh0OiAndmltTW9kZVxcbmF0b21UZXh0RWRpdG9yXFxuJywgY3Vyc29yOiBbMCwgMF1cblxuICAgIGl0IFwicmVwZWF0aW5nIHR3aWNlIHdvcmtzIG9uIGN1cnJlbnQtbGluZSBhbmQgd29uJ3QgbW92ZSBjdXJzb3JcIiwgLT5cbiAgICAgIGVuc3VyZSAnbCBnIEMgZyBDJywgdGV4dDogJ3ZpbU1vZGVcXG5hdG9tLXRleHQtZWRpdG9yXFxuJywgY3Vyc29yOiBbMCwgMV1cblxuICBkZXNjcmliZSAnUGFzY2FsQ2FzZScsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgYXRvbS5rZXltYXBzLmFkZCBcInRlc3RcIixcbiAgICAgICAgJ2F0b20tdGV4dC1lZGl0b3IudmltLW1vZGUtcGx1czpub3QoLmluc2VydC1tb2RlKSc6XG4gICAgICAgICAgJ2cgQyc6ICd2aW0tbW9kZS1wbHVzOnBhc2NhbC1jYXNlJ1xuXG4gICAgICBzZXRcbiAgICAgICAgdGV4dDogJ3ZpbS1tb2RlXFxuYXRvbS10ZXh0LWVkaXRvclxcbidcbiAgICAgICAgY3Vyc29yOiBbMCwgMF1cblxuICAgIGl0IFwidHJhbnNmb3JtIHRleHQgYnkgbW90aW9uIGFuZCByZXBlYXRhYmxlXCIsIC0+XG4gICAgICBlbnN1cmUgJ2cgQyAkJywgdGV4dDogJ1ZpbU1vZGVcXG5hdG9tLXRleHQtZWRpdG9yXFxuJywgY3Vyc29yOiBbMCwgMF1cbiAgICAgIGVuc3VyZSAnaiAuJywgdGV4dDogJ1ZpbU1vZGVcXG5BdG9tVGV4dEVkaXRvclxcbicsIGN1cnNvcjogWzEsIDBdXG5cbiAgICBpdCBcInRyYW5zZm9ybSBzZWxlY3Rpb25cIiwgLT5cbiAgICAgIGVuc3VyZSAnViBqIGcgQycsIHRleHQ6ICdWaW1Nb2RlXFxuQXRvbVRleHRFZGl0b3JcXG4nLCBjdXJzb3I6IFswLCAwXVxuXG4gICAgaXQgXCJyZXBlYXRpbmcgdHdpY2Ugd29ya3Mgb24gY3VycmVudC1saW5lIGFuZCB3b24ndCBtb3ZlIGN1cnNvclwiLCAtPlxuICAgICAgZW5zdXJlICdsIGcgQyBnIEMnLCB0ZXh0OiAnVmltTW9kZVxcbmF0b20tdGV4dC1lZGl0b3JcXG4nLCBjdXJzb3I6IFswLCAxXVxuXG4gIGRlc2NyaWJlICdTbmFrZUNhc2UnLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIHNldFxuICAgICAgICB0ZXh0OiAndmltLW1vZGVcXG5hdG9tLXRleHQtZWRpdG9yXFxuJ1xuICAgICAgICBjdXJzb3I6IFswLCAwXVxuICAgICAgYXRvbS5rZXltYXBzLmFkZCBcImdfXCIsXG4gICAgICAgICdhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXM6bm90KC5pbnNlcnQtbW9kZSknOlxuICAgICAgICAgICdnIF8nOiAndmltLW1vZGUtcGx1czpzbmFrZS1jYXNlJ1xuXG4gICAgaXQgXCJ0cmFuc2Zvcm0gdGV4dCBieSBtb3Rpb24gYW5kIHJlcGVhdGFibGVcIiwgLT5cbiAgICAgIGVuc3VyZSAnZyBfICQnLCB0ZXh0OiAndmltX21vZGVcXG5hdG9tLXRleHQtZWRpdG9yXFxuJywgY3Vyc29yOiBbMCwgMF1cbiAgICAgIGVuc3VyZSAnaiAuJywgdGV4dDogJ3ZpbV9tb2RlXFxuYXRvbV90ZXh0X2VkaXRvclxcbicsIGN1cnNvcjogWzEsIDBdXG5cbiAgICBpdCBcInRyYW5zZm9ybSBzZWxlY3Rpb25cIiwgLT5cbiAgICAgIGVuc3VyZSAnViBqIGcgXycsIHRleHQ6ICd2aW1fbW9kZVxcbmF0b21fdGV4dF9lZGl0b3JcXG4nLCBjdXJzb3I6IFswLCAwXVxuXG4gICAgaXQgXCJyZXBlYXRpbmcgdHdpY2Ugd29ya3Mgb24gY3VycmVudC1saW5lIGFuZCB3b24ndCBtb3ZlIGN1cnNvclwiLCAtPlxuICAgICAgZW5zdXJlICdsIGcgXyBnIF8nLCB0ZXh0OiAndmltX21vZGVcXG5hdG9tLXRleHQtZWRpdG9yXFxuJywgY3Vyc29yOiBbMCwgMV1cblxuICBkZXNjcmliZSAnRGFzaENhc2UnLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIHNldFxuICAgICAgICB0ZXh0OiAndmltTW9kZVxcbmF0b21fdGV4dF9lZGl0b3JcXG4nXG4gICAgICAgIGN1cnNvcjogWzAsIDBdXG5cbiAgICBpdCBcInRyYW5zZm9ybSB0ZXh0IGJ5IG1vdGlvbiBhbmQgcmVwZWF0YWJsZVwiLCAtPlxuICAgICAgZW5zdXJlICdnIC0gJCcsIHRleHQ6ICd2aW0tbW9kZVxcbmF0b21fdGV4dF9lZGl0b3JcXG4nLCBjdXJzb3I6IFswLCAwXVxuICAgICAgZW5zdXJlICdqIC4nLCB0ZXh0OiAndmltLW1vZGVcXG5hdG9tLXRleHQtZWRpdG9yXFxuJywgY3Vyc29yOiBbMSwgMF1cblxuICAgIGl0IFwidHJhbnNmb3JtIHNlbGVjdGlvblwiLCAtPlxuICAgICAgZW5zdXJlICdWIGogZyAtJywgdGV4dDogJ3ZpbS1tb2RlXFxuYXRvbS10ZXh0LWVkaXRvclxcbicsIGN1cnNvcjogWzAsIDBdXG5cbiAgICBpdCBcInJlcGVhdGluZyB0d2ljZSB3b3JrcyBvbiBjdXJyZW50LWxpbmUgYW5kIHdvbid0IG1vdmUgY3Vyc29yXCIsIC0+XG4gICAgICBlbnN1cmUgJ2wgZyAtIGcgLScsIHRleHQ6ICd2aW0tbW9kZVxcbmF0b21fdGV4dF9lZGl0b3JcXG4nLCBjdXJzb3I6IFswLCAxXVxuXG4gIGRlc2NyaWJlICdDb252ZXJ0VG9Tb2Z0VGFiJywgLT5cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBhdG9tLmtleW1hcHMuYWRkIFwidGVzdFwiLFxuICAgICAgICAnYXRvbS10ZXh0LWVkaXRvci52aW0tbW9kZS1wbHVzOm5vdCguaW5zZXJ0LW1vZGUpJzpcbiAgICAgICAgICAnZyB0YWInOiAndmltLW1vZGUtcGx1czpjb252ZXJ0LXRvLXNvZnQtdGFiJ1xuXG4gICAgZGVzY3JpYmUgXCJiYXNpYyBiZWhhdmlvclwiLCAtPlxuICAgICAgaXQgXCJjb252ZXJ0IHRhYnMgdG8gc3BhY2VzXCIsIC0+XG4gICAgICAgIGV4cGVjdChlZGl0b3IuZ2V0VGFiTGVuZ3RoKCkpLnRvQmUoMilcbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dDogXCJcXHR2YXIxMCA9XFx0XFx0MDtcIlxuICAgICAgICAgIGN1cnNvcjogWzAsIDBdXG4gICAgICAgIGVuc3VyZSAnZyB0YWIgJCcsXG4gICAgICAgICAgdGV4dDogXCIgIHZhcjEwID0gICAwO1wiXG5cbiAgZGVzY3JpYmUgJ0NvbnZlcnRUb0hhcmRUYWInLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIGF0b20ua2V5bWFwcy5hZGQgXCJ0ZXN0XCIsXG4gICAgICAgICdhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXM6bm90KC5pbnNlcnQtbW9kZSknOlxuICAgICAgICAgICdnIHNoaWZ0LXRhYic6ICd2aW0tbW9kZS1wbHVzOmNvbnZlcnQtdG8taGFyZC10YWInXG5cbiAgICBkZXNjcmliZSBcImJhc2ljIGJlaGF2aW9yXCIsIC0+XG4gICAgICBpdCBcImNvbnZlcnQgc3BhY2VzIHRvIHRhYnNcIiwgLT5cbiAgICAgICAgZXhwZWN0KGVkaXRvci5nZXRUYWJMZW5ndGgoKSkudG9CZSgyKVxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0OiBcIiAgdmFyMTAgPSAgICAwO1wiXG4gICAgICAgICAgY3Vyc29yOiBbMCwgMF1cbiAgICAgICAgZW5zdXJlICdnIHNoaWZ0LXRhYiAkJyxcbiAgICAgICAgICB0ZXh0OiBcIlxcdHZhcjEwXFx0PVxcdFxcdCAwO1wiXG5cbiAgZGVzY3JpYmUgJ0NvbXBhY3RTcGFjZXMnLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIHNldFxuICAgICAgICBjdXJzb3I6IFswLCAwXVxuXG4gICAgZGVzY3JpYmUgXCJiYXNpYyBiZWhhdmlvclwiLCAtPlxuICAgICAgaXQgXCJjb21wYXRzIG11bHRpcGxlIHNwYWNlIGludG8gb25lXCIsIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIHRleHQ6ICd2YXIwICAgPSAgIDA7IHZhcjEwICAgPSAgIDEwJ1xuICAgICAgICAgIGN1cnNvcjogWzAsIDBdXG4gICAgICAgIGVuc3VyZSAnZyBzcGFjZSAkJyxcbiAgICAgICAgICB0ZXh0OiAndmFyMCA9IDA7IHZhcjEwID0gMTAnXG4gICAgICBpdCBcImRvbid0IGFwcGx5IGNvbXBhY3Rpb24gZm9yIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNwYWNlXCIsIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIHRleHRfOiBcIlwiXCJcbiAgICAgICAgICBfX192YXIwICAgPSAgIDA7IHZhcjEwICAgPSAgIDEwX19fXG4gICAgICAgICAgX19fdmFyMSAgID0gICAxOyB2YXIxMSAgID0gICAxMV9fX1xuICAgICAgICAgIF9fX3ZhcjIgICA9ICAgMjsgdmFyMTIgICA9ICAgMTJfX19cblxuICAgICAgICAgIF9fX3ZhcjQgICA9ICAgNDsgdmFyMTQgICA9ICAgMTRfX19cbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgICBjdXJzb3I6IFswLCAwXVxuICAgICAgICBlbnN1cmUgJ2cgc3BhY2UgaSBwJyxcbiAgICAgICAgICB0ZXh0XzogXCJcIlwiXG4gICAgICAgICAgX19fdmFyMCA9IDA7IHZhcjEwID0gMTBfX19cbiAgICAgICAgICBfX192YXIxID0gMTsgdmFyMTEgPSAxMV9fX1xuICAgICAgICAgIF9fX3ZhcjIgPSAyOyB2YXIxMiA9IDEyX19fXG5cbiAgICAgICAgICBfX192YXI0ICAgPSAgIDQ7IHZhcjE0ICAgPSAgIDE0X19fXG4gICAgICAgICAgXCJcIlwiXG4gICAgICBpdCBcImJ1dCBpdCBjb21wYWN0IHNwYWNlcyB3aGVuIHRhcmdldCBhbGwgdGV4dCBpcyBzcGFjZXNcIiwgLT5cbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dDogJzAxMjM0ICAgIDkwJ1xuICAgICAgICAgIGN1cnNvcjogWzAsIDVdXG4gICAgICAgIGVuc3VyZSAnZyBzcGFjZSB3JyxcbiAgICAgICAgICB0ZXh0OiAnMDEyMzQgOTAnXG5cbiAgZGVzY3JpYmUgJ0FsaWduT2NjdXJyZW5jZSBmYW1pbHknLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIGF0b20ua2V5bWFwcy5hZGQgXCJ0ZXN0XCIsXG4gICAgICAgICdhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXM6bm90KC5pbnNlcnQtbW9kZSknOlxuICAgICAgICAgICdnIHwnOiAndmltLW1vZGUtcGx1czphbGlnbi1vY2N1cnJlbmNlJ1xuXG4gICAgZGVzY3JpYmUgXCJBbGlnbk9jY3VycmVuY2VcIiwgLT5cbiAgICAgIGl0IFwiYWxpZ24gYnkgPVwiLCAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0QzogXCJcIlwiXG5cbiAgICAgICAgICBhIHw9IDEwMFxuICAgICAgICAgIGJjZCA9IDFcbiAgICAgICAgICBpamtsbSA9IDEwMDBcblxuICAgICAgICAgIFwiXCJcIlxuICAgICAgICBlbnN1cmUgXCJnIHwgcFwiLFxuICAgICAgICAgIHRleHRDOiBcIlwiXCJcblxuICAgICAgICAgIGEgfCAgICA9IDEwMFxuICAgICAgICAgIGJjZCAgID0gMVxuICAgICAgICAgIGlqa2xtID0gMTAwMFxuXG4gICAgICAgICAgXCJcIlwiXG4gICAgICBpdCBcImFsaWduIGJ5IGNvbW1hXCIsIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIHRleHRDOiBcIlwiXCJcblxuICAgICAgICAgIGF8LCAxMDAsIDMwXG4gICAgICAgICAgYiwgMzAwMDAsIDUwXG4gICAgICAgICAgMjAwMDAwLCAxXG5cbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgZW5zdXJlIFwiZyB8IHBcIixcbiAgICAgICAgICB0ZXh0QzogXCJcIlwiXG5cbiAgICAgICAgICBhfCwgICAgICAxMDAsICAgMzBcbiAgICAgICAgICBiLCAgICAgIDMwMDAwLCA1MFxuICAgICAgICAgIDIwMDAwMCwgMVxuXG4gICAgICAgICAgXCJcIlwiXG4gICAgICBpdCBcImFsaWduIGJ5IG5vbi13b3JkLWNoYXItZW5kaW5nXCIsIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIHRleHRDOiBcIlwiXCJcblxuICAgICAgICAgIGFiY3w6IDEwXG4gICAgICAgICAgZGVmZ2g6IDIwXG4gICAgICAgICAgaWo6IDMwXG5cbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgZW5zdXJlIFwiZyB8IHBcIixcbiAgICAgICAgICB0ZXh0QzogXCJcIlwiXG5cbiAgICAgICAgICBhYmN8OiAgIDEwXG4gICAgICAgICAgZGVmZ2g6IDIwXG4gICAgICAgICAgaWo6ICAgIDMwXG5cbiAgICAgICAgICBcIlwiXCJcbiAgICAgIGl0IFwiYWxpZ24gYnkgbm9ybWFsIHdvcmRcIiwgLT5cbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dEM6IFwiXCJcIlxuXG4gICAgICAgICAgeHh4IGZpcnxzdE5hbWU6IFwiSGVsbG9cIiwgbGFzdE5hbWU6IFwiV29ybGRcIlxuICAgICAgICAgIHl5eXl5eXl5IGZpcnN0TmFtZTogXCJHb29kIEJ5ZVwiLCBsYXN0TmFtZTogXCJXb3JsZFwiXG5cbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgZW5zdXJlIFwiZyB8IHBcIixcbiAgICAgICAgICB0ZXh0QzogXCJcIlwiXG5cbiAgICAgICAgICB4eHggICAgfCAgZmlyc3ROYW1lOiBcIkhlbGxvXCIsIGxhc3ROYW1lOiBcIldvcmxkXCJcbiAgICAgICAgICB5eXl5eXl5eSBmaXJzdE5hbWU6IFwiR29vZCBCeWVcIiwgbGFzdE5hbWU6IFwiV29ybGRcIlxuXG4gICAgICAgICAgXCJcIlwiXG4gICAgICBpdCBcImFsaWduIGJ5IGB8YCB0YWJsZS1saWtlIHRleHRcIiwgLT5cbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dDogXCJcIlwiXG5cbiAgICAgICAgICArLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLStcbiAgICAgICAgICB8IHdoZXJlIHwgbW92ZSB0byAxc3QgY2hhciB8IG5vIG1vdmUgfFxuICAgICAgICAgICstLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tK1xuICAgICAgICAgIHwgdG9wIHwgYHogZW50ZXJgIHwgYHogdGAgfFxuICAgICAgICAgIHwgbWlkZGxlIHwgYHogLmAgfCBgeiB6YCB8XG4gICAgICAgICAgfCBib3R0b20gfCBgeiAtYCB8IGB6IGJgIHxcbiAgICAgICAgICArLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLStcblxuICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgIGN1cnNvcjogWzIsIDBdXG4gICAgICAgIGVuc3VyZSBcImcgfCBwXCIsXG4gICAgICAgICAgdGV4dDogXCJcIlwiXG5cbiAgICAgICAgICArLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLStcbiAgICAgICAgICB8IHdoZXJlICB8IG1vdmUgdG8gMXN0IGNoYXIgfCBubyBtb3ZlIHxcbiAgICAgICAgICArLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLStcbiAgICAgICAgICB8IHRvcCAgICB8IGB6IGVudGVyYCAgICAgICAgfCBgeiB0YCAgIHxcbiAgICAgICAgICB8IG1pZGRsZSB8IGB6IC5gICAgICAgICAgICAgfCBgeiB6YCAgIHxcbiAgICAgICAgICB8IGJvdHRvbSB8IGB6IC1gICAgICAgICAgICAgfCBgeiBiYCAgIHxcbiAgICAgICAgICArLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLStcblxuICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgIGN1cnNvcjogWzIsIDBdXG5cbiAgZGVzY3JpYmUgJ1RyaW1TdHJpbmcnLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIHNldFxuICAgICAgICB0ZXh0OiBcIiB0ZXh0ID0gQGdldE5ld1RleHQoIHNlbGVjdGlvbi5nZXRUZXh0KCksIHNlbGVjdGlvbiApICBcIlxuICAgICAgICBjdXJzb3I6IFswLCA0Ml1cblxuICAgIGRlc2NyaWJlIFwiYmFzaWMgYmVoYXZpb3JcIiwgLT5cbiAgICAgIGl0IFwidHJpbSBzdHJpbmcgZm9yIGEtbGluZSB0ZXh0IG9iamVjdFwiLCAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0XzogXCJcIlwiXG4gICAgICAgICAgX19fYWJjX19fXG4gICAgICAgICAgX19fZGVmX19fXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgICAgY3Vyc29yOiBbMCwgMF1cbiAgICAgICAgZW5zdXJlICdnIHwgYSBsJyxcbiAgICAgICAgICB0ZXh0XzogXCJcIlwiXG4gICAgICAgICAgYWJjXG4gICAgICAgICAgX19fZGVmX19fXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZSAnaiAuJyxcbiAgICAgICAgICB0ZXh0XzogXCJcIlwiXG4gICAgICAgICAgYWJjXG4gICAgICAgICAgZGVmXG4gICAgICAgICAgXCJcIlwiXG4gICAgICBpdCBcInRyaW0gc3RyaW5nIGZvciBpbm5lci1wYXJlbnRoZXNpcyB0ZXh0IG9iamVjdFwiLCAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICB0ZXh0XzogXCJcIlwiXG4gICAgICAgICAgKCAgYWJjICApXG4gICAgICAgICAgKCAgZGVmICApXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgICAgY3Vyc29yOiBbMCwgMF1cbiAgICAgICAgZW5zdXJlICdnIHwgaSAoJyxcbiAgICAgICAgICB0ZXh0XzogXCJcIlwiXG4gICAgICAgICAgKGFiYylcbiAgICAgICAgICAoICBkZWYgIClcbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgZW5zdXJlICdqIC4nLFxuICAgICAgICAgIHRleHRfOiBcIlwiXCJcbiAgICAgICAgICAoYWJjKVxuICAgICAgICAgIChkZWYpXG4gICAgICAgICAgXCJcIlwiXG4gICAgICBpdCBcInRyaW0gc3RyaW5nIGZvciBpbm5lci1hbnktcGFpciB0ZXh0IG9iamVjdFwiLCAtPlxuICAgICAgICBhdG9tLmtleW1hcHMuYWRkIFwidGVzdFwiLFxuICAgICAgICAgICdhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXMub3BlcmF0b3ItcGVuZGluZy1tb2RlLCBhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXMudmlzdWFsLW1vZGUnOlxuICAgICAgICAgICAgJ2kgOyc6ICAndmltLW1vZGUtcGx1czppbm5lci1hbnktcGFpcidcblxuICAgICAgICBzZXQgdGV4dF86IFwiKCBbIHsgIGFiYyAgfSBdIClcIiwgY3Vyc29yOiBbMCwgOF1cbiAgICAgICAgZW5zdXJlICdnIHwgaSA7JywgdGV4dF86IFwiKCBbIHthYmN9IF0gKVwiXG4gICAgICAgIGVuc3VyZSAnMiBoIC4nLCB0ZXh0XzogXCIoIFt7YWJjfV0gKVwiXG4gICAgICAgIGVuc3VyZSAnMiBoIC4nLCB0ZXh0XzogXCIoW3thYmN9XSlcIlxuXG4gIGRlc2NyaWJlICdzdXJyb3VuZCBmYW1pbHknLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIGtleW1hcHNGb3JTdXJyb3VuZCA9IHtcbiAgICAgICAgJ2F0b20tdGV4dC1lZGl0b3IudmltLW1vZGUtcGx1cy5ub3JtYWwtbW9kZSc6XG4gICAgICAgICAgJ3kgcyc6ICd2aW0tbW9kZS1wbHVzOnN1cnJvdW5kJ1xuICAgICAgICAgICdkIHMnOiAndmltLW1vZGUtcGx1czpkZWxldGUtc3Vycm91bmQtYW55LXBhaXInXG4gICAgICAgICAgJ2QgUyc6ICd2aW0tbW9kZS1wbHVzOmRlbGV0ZS1zdXJyb3VuZCdcbiAgICAgICAgICAnYyBzJzogJ3ZpbS1tb2RlLXBsdXM6Y2hhbmdlLXN1cnJvdW5kLWFueS1wYWlyJ1xuICAgICAgICAgICdjIFMnOiAndmltLW1vZGUtcGx1czpjaGFuZ2Utc3Vycm91bmQnXG5cbiAgICAgICAgJ2F0b20tdGV4dC1lZGl0b3IudmltLW1vZGUtcGx1cy5vcGVyYXRvci1wZW5kaW5nLW1vZGUuc3Vycm91bmQtcGVuZGluZyc6XG4gICAgICAgICAgJ3MnOiAndmltLW1vZGUtcGx1czppbm5lci1jdXJyZW50LWxpbmUnXG5cbiAgICAgICAgJ2F0b20tdGV4dC1lZGl0b3IudmltLW1vZGUtcGx1cy52aXN1YWwtbW9kZSc6XG4gICAgICAgICAgJ1MnOiAndmltLW1vZGUtcGx1czpzdXJyb3VuZCdcbiAgICAgIH1cblxuICAgICAgYXRvbS5rZXltYXBzLmFkZChcImtleW1hcHMtZm9yLXN1cnJvdW5kXCIsIGtleW1hcHNGb3JTdXJyb3VuZClcblxuICAgICAgc2V0XG4gICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICB8YXBwbGVcbiAgICAgICAgICBwYWlyczogW2JyYWNrZXRzXVxuICAgICAgICAgIHBhaXJzOiBbYnJhY2tldHNdXG4gICAgICAgICAgKCBtdWx0aVxuICAgICAgICAgICAgbGluZSApXG4gICAgICAgICAgXCJcIlwiXG5cbiAgICBkZXNjcmliZSAnY2FuY2VsbGF0aW9uJywgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgIChhfGJjKSBkZWZcbiAgICAgICAgICAoZyFoaSkgamtsXG4gICAgICAgICAgKG18bm8pIHBxclxcblxuICAgICAgICAgIFwiXCJcIlxuXG4gICAgICBkZXNjcmliZSAnc3Vycm91bmQgY2FuY2VsbGF0aW9uJywgLT5cbiAgICAgICAgaXQgXCJbbm9ybWFsXSBrZWVwIG11bHRwY3Vyc29yIG9uIHN1cnJvdW5kIGNhbmNlbFwiLCAtPlxuICAgICAgICAgIGVuc3VyZSBcInkgcyBlc2NhcGVcIixcbiAgICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAgIChhfGJjKSBkZWZcbiAgICAgICAgICAgIChnIWhpKSBqa2xcbiAgICAgICAgICAgIChtfG5vKSBwcXJcXG5cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgICAgbW9kZTogXCJub3JtYWxcIlxuXG4gICAgICAgIGl0IFwiW3Zpc3VhbF0ga2VlcCBtdWx0cGN1cnNvciBvbiBzdXJyb3VuZCBjYW5jZWxcIiwgLT5cbiAgICAgICAgICBlbnN1cmUgXCJ2XCIsXG4gICAgICAgICAgICBtb2RlOiBbXCJ2aXN1YWxcIiwgXCJjaGFyYWN0ZXJ3aXNlXCJdXG4gICAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgICAoYWJ8YykgZGVmXG4gICAgICAgICAgICAoZ2ghaSkgamtsXG4gICAgICAgICAgICAobW58bykgcHFyXFxuXG4gICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgICAgIHNlbGVjdGVkVGV4dE9yZGVyZWQ6IFtcImJcIiwgXCJoXCIsIFwiblwiXVxuICAgICAgICAgIGVuc3VyZVdhaXQgXCJTIGVzY2FwZVwiLFxuICAgICAgICAgICAgbW9kZTogW1widmlzdWFsXCIsIFwiY2hhcmFjdGVyd2lzZVwiXVxuICAgICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgICAgKGFifGMpIGRlZlxuICAgICAgICAgICAgKGdoIWkpIGprbFxuICAgICAgICAgICAgKG1ufG8pIHBxclxcblxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgICAgICBzZWxlY3RlZFRleHRPcmRlcmVkOiBbXCJiXCIsIFwiaFwiLCBcIm5cIl1cblxuICAgICAgZGVzY3JpYmUgJ2RlbGV0ZS1zdXJyb3VuZCBjYW5jZWxsYXRpb24nLCAtPlxuICAgICAgICBpdCBcIltmcm9tIG5vcm1hbF0ga2VlcCBtdWx0cGN1cnNvciBvbiBjYW5jZWxcIiwgLT5cbiAgICAgICAgICBlbnN1cmUgXCJkIFMgZXNjYXBlXCIsXG4gICAgICAgICAgICBtb2RlOiBcIm5vcm1hbFwiXG4gICAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgICAoYXxiYykgZGVmXG4gICAgICAgICAgICAoZyFoaSkgamtsXG4gICAgICAgICAgICAobXxubykgcHFyXFxuXG4gICAgICAgICAgICBcIlwiXCJcblxuICAgICAgZGVzY3JpYmUgJ2NoYW5nZS1zdXJyb3VuZCBjYW5jZWxsYXRpb24nLCAtPlxuICAgICAgICBpdCBcIltmcm9tIG5vcm1hbF0ga2VlcCBtdWx0cGN1cnNvciBvbiBjYW5jZWwgb2YgMXN0IGlucHV0XCIsIC0+XG4gICAgICAgICAgZW5zdXJlIFwiYyBTIGVzY2FwZVwiLCAjIE9uIGNob29zaW5nIGRlbGV0aW5nIHBhaXItY2hhclxuICAgICAgICAgICAgbW9kZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgICAgKGF8YmMpIGRlZlxuICAgICAgICAgICAgKGchaGkpIGprbFxuICAgICAgICAgICAgKG18bm8pIHBxclxcblxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgIGl0IFwiW2Zyb20gbm9ybWFsXSBrZWVwIG11bHRwY3Vyc29yIG9uIGNhbmNlbCBvZiAybmQgaW5wdXRcIiwgLT5cbiAgICAgICAgICBlbnN1cmUgXCJjIFMgKFwiLFxuICAgICAgICAgICAgc2VsZWN0ZWRUZXh0T3JkZXJlZDogW1wiKGFiYylcIiwgXCIoZ2hpKVwiLCBcIihtbm8pXCJdICMgZWFybHkgc2VsZWN0KGZvciBiZXR0ZXIgVVgpIGVmZmVjdC5cblxuICAgICAgICAgIGVuc3VyZVdhaXQgXCJlc2NhcGVcIiwgIyBPbiBjaG9vc2luZyBkZWxldGluZyBwYWlyLWNoYXJcbiAgICAgICAgICAgIG1vZGU6IFwibm9ybWFsXCJcbiAgICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAgIChhfGJjKSBkZWZcbiAgICAgICAgICAgIChnIWhpKSBqa2xcbiAgICAgICAgICAgIChtfG5vKSBwcXJcXG5cbiAgICAgICAgICAgIFwiXCJcIlxuXG4gICAgICBkZXNjcmliZSAnc3Vycm91bmQtd29yZCBjYW5jZWxsYXRpb24nLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgYXRvbS5rZXltYXBzLmFkZCBcInN1cnJvdW5kLXRlc3RcIixcbiAgICAgICAgICAgICdhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXMubm9ybWFsLW1vZGUnOlxuICAgICAgICAgICAgICAneSBzIHcnOiAndmltLW1vZGUtcGx1czpzdXJyb3VuZC13b3JkJ1xuXG4gICAgICAgIGl0IFwiW2Zyb20gbm9ybWFsXSBrZWVwIG11bHRpIGN1cnNvciBvbiBjYW5jZWxcIiwgLT5cbiAgICAgICAgICBlbnN1cmUgXCJ5IHMgd1wiLCBzZWxlY3RlZFRleHRPcmRlcmVkOiBbXCJhYmNcIiwgXCJnaGlcIiwgXCJtbm9cIl0gIyBzZWxlY3QgdGFyZ2V0IGltbWVkaWF0ZWx5XG4gICAgICAgICAgZW5zdXJlV2FpdCBcImVzY2FwZVwiLFxuICAgICAgICAgICAgbW9kZTogXCJub3JtYWxcIlxuICAgICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgICAgKGF8YmMpIGRlZlxuICAgICAgICAgICAgKGchaGkpIGprbFxuICAgICAgICAgICAgKG18bm8pIHBxclxcblxuICAgICAgICAgICAgXCJcIlwiXG5cbiAgICBkZXNjcmliZSAnYWxpYXMga2V5bWFwIGZvciBzdXJyb3VuZCwgY2hhbmdlLXN1cnJvdW5kLCBkZWxldGUtc3Vycm91bmQnLCAtPlxuICAgICAgZGVzY3JpYmUgXCJzdXJyb3VuZCBieSBhbGlhc2VkIGNoYXJcIiwgLT5cbiAgICAgICAgaXQgXCJjMVwiLCAtPiBzZXQgdGV4dEM6IFwifGFiY1wiOyBlbnN1cmVXYWl0ICd5IHMgaSB3IGInLCB0ZXh0OiBcIihhYmMpXCJcbiAgICAgICAgaXQgXCJjMlwiLCAtPiBzZXQgdGV4dEM6IFwifGFiY1wiOyBlbnN1cmVXYWl0ICd5IHMgaSB3IEInLCB0ZXh0OiBcInthYmN9XCJcbiAgICAgICAgaXQgXCJjM1wiLCAtPiBzZXQgdGV4dEM6IFwifGFiY1wiOyBlbnN1cmVXYWl0ICd5IHMgaSB3IHInLCB0ZXh0OiBcIlthYmNdXCJcbiAgICAgICAgaXQgXCJjNFwiLCAtPiBzZXQgdGV4dEM6IFwifGFiY1wiOyBlbnN1cmVXYWl0ICd5IHMgaSB3IGEnLCB0ZXh0OiBcIjxhYmM+XCJcbiAgICAgIGRlc2NyaWJlIFwiZGVsZXRlIHN1cnJvdW5kIGJ5IGFsaWFzZWQgY2hhclwiLCAtPlxuICAgICAgICBpdCBcImMxXCIsIC0+IHNldCB0ZXh0QzogXCJ8KGFiYylcIjsgZW5zdXJlICdkIFMgYicsIHRleHQ6IFwiYWJjXCJcbiAgICAgICAgaXQgXCJjMlwiLCAtPiBzZXQgdGV4dEM6IFwifHthYmN9XCI7IGVuc3VyZSAnZCBTIEInLCB0ZXh0OiBcImFiY1wiXG4gICAgICAgIGl0IFwiYzNcIiwgLT4gc2V0IHRleHRDOiBcInxbYWJjXVwiOyBlbnN1cmUgJ2QgUyByJywgdGV4dDogXCJhYmNcIlxuICAgICAgICBpdCBcImM0XCIsIC0+IHNldCB0ZXh0QzogXCJ8PGFiYz5cIjsgZW5zdXJlICdkIFMgYScsIHRleHQ6IFwiYWJjXCJcbiAgICAgIGRlc2NyaWJlIFwiY2hhbmdlIHN1cnJvdW5kIGJ5IGFsaWFzZWQgY2hhclwiLCAtPlxuICAgICAgICBpdCBcImMxXCIsIC0+IHNldCB0ZXh0QzogXCJ8KGFiYylcIjsgZW5zdXJlV2FpdCAnYyBTIGIgQicsIHRleHQ6IFwie2FiY31cIlxuICAgICAgICBpdCBcImMyXCIsIC0+IHNldCB0ZXh0QzogXCJ8KGFiYylcIjsgZW5zdXJlV2FpdCAnYyBTIGIgcicsIHRleHQ6IFwiW2FiY11cIlxuICAgICAgICBpdCBcImMzXCIsIC0+IHNldCB0ZXh0QzogXCJ8KGFiYylcIjsgZW5zdXJlV2FpdCAnYyBTIGIgYScsIHRleHQ6IFwiPGFiYz5cIlxuXG4gICAgICAgIGl0IFwiYzRcIiwgLT4gc2V0IHRleHRDOiBcInx7YWJjfVwiOyBlbnN1cmVXYWl0ICdjIFMgQiBiJywgdGV4dDogXCIoYWJjKVwiXG4gICAgICAgIGl0IFwiYzVcIiwgLT4gc2V0IHRleHRDOiBcInx7YWJjfVwiOyBlbnN1cmVXYWl0ICdjIFMgQiByJywgdGV4dDogXCJbYWJjXVwiXG4gICAgICAgIGl0IFwiYzZcIiwgLT4gc2V0IHRleHRDOiBcInx7YWJjfVwiOyBlbnN1cmVXYWl0ICdjIFMgQiBhJywgdGV4dDogXCI8YWJjPlwiXG5cbiAgICAgICAgaXQgXCJjN1wiLCAtPiBzZXQgdGV4dEM6IFwifFthYmNdXCI7IGVuc3VyZVdhaXQgJ2MgUyByIGInLCB0ZXh0OiBcIihhYmMpXCJcbiAgICAgICAgaXQgXCJjOFwiLCAtPiBzZXQgdGV4dEM6IFwifFthYmNdXCI7IGVuc3VyZVdhaXQgJ2MgUyByIEInLCB0ZXh0OiBcInthYmN9XCJcbiAgICAgICAgaXQgXCJjOVwiLCAtPiBzZXQgdGV4dEM6IFwifFthYmNdXCI7IGVuc3VyZVdhaXQgJ2MgUyByIGEnLCB0ZXh0OiBcIjxhYmM+XCJcblxuICAgICAgICBpdCBcImMxMFwiLCAtPiBzZXQgdGV4dEM6IFwifDxhYmM+XCI7IGVuc3VyZVdhaXQgJ2MgUyBhIGInLCB0ZXh0OiBcIihhYmMpXCJcbiAgICAgICAgaXQgXCJjMTFcIiwgLT4gc2V0IHRleHRDOiBcInw8YWJjPlwiOyBlbnN1cmVXYWl0ICdjIFMgYSBCJywgdGV4dDogXCJ7YWJjfVwiXG4gICAgICAgIGl0IFwiYzEyXCIsIC0+IHNldCB0ZXh0QzogXCJ8PGFiYz5cIjsgZW5zdXJlV2FpdCAnYyBTIGEgcicsIHRleHQ6IFwiW2FiY11cIlxuXG4gICAgZGVzY3JpYmUgJ3N1cnJvdW5kJywgLT5cbiAgICAgIGRlc2NyaWJlICdiYXNpYyBiZWhhdmlvcicsIC0+XG4gICAgICAgIGl0IFwic3Vycm91bmQgdGV4dCBvYmplY3Qgd2l0aCAoIGFuZCByZXBlYXRhYmxlXCIsIC0+XG4gICAgICAgICAgZW5zdXJlV2FpdCAneSBzIGkgdyAoJywgdGV4dEM6IFwifChhcHBsZSlcXG5wYWlyczogW2JyYWNrZXRzXVxcbnBhaXJzOiBbYnJhY2tldHNdXFxuKCBtdWx0aVxcbiAgbGluZSApXCJcbiAgICAgICAgICBlbnN1cmVXYWl0ICdqIC4nLCAgICAgICB0ZXh0QzogXCIoYXBwbGUpXFxufChwYWlycyk6IFticmFja2V0c11cXG5wYWlyczogW2JyYWNrZXRzXVxcbiggbXVsdGlcXG4gIGxpbmUgKVwiXG4gICAgICAgIGl0IFwic3Vycm91bmQgdGV4dCBvYmplY3Qgd2l0aCB7IGFuZCByZXBlYXRhYmxlXCIsIC0+XG4gICAgICAgICAgZW5zdXJlV2FpdCAneSBzIGkgdyB7JywgdGV4dEM6IFwifHthcHBsZX1cXG5wYWlyczogW2JyYWNrZXRzXVxcbnBhaXJzOiBbYnJhY2tldHNdXFxuKCBtdWx0aVxcbiAgbGluZSApXCJcbiAgICAgICAgICBlbnN1cmVXYWl0ICdqIC4nLCAgICAgICB0ZXh0QzogXCJ7YXBwbGV9XFxufHtwYWlyc306IFticmFja2V0c11cXG5wYWlyczogW2JyYWNrZXRzXVxcbiggbXVsdGlcXG4gIGxpbmUgKVwiXG4gICAgICAgIGl0IFwic3Vycm91bmQgY3VycmVudC1saW5lXCIsIC0+XG4gICAgICAgICAgZW5zdXJlV2FpdCAneSBzIHMgeycsIHRleHRDOiBcInx7YXBwbGV9XFxucGFpcnM6IFticmFja2V0c11cXG5wYWlyczogW2JyYWNrZXRzXVxcbiggbXVsdGlcXG4gIGxpbmUgKVwiXG4gICAgICAgICAgZW5zdXJlV2FpdCAnaiAuJywgICAgIHRleHRDOiBcInthcHBsZX1cXG58e3BhaXJzOiBbYnJhY2tldHNdfVxcbnBhaXJzOiBbYnJhY2tldHNdXFxuKCBtdWx0aVxcbiAgbGluZSApXCJcblxuICAgICAgZGVzY3JpYmUgJ2FkanVzdEluZGVudGF0aW9uIHdoZW4gc3Vycm91bmQgbGluZXdpc2UgdGFyZ2V0JywgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPlxuICAgICAgICAgICAgYXRvbS5wYWNrYWdlcy5hY3RpdmF0ZVBhY2thZ2UoJ2xhbmd1YWdlLWphdmFzY3JpcHQnKVxuICAgICAgICAgIHJ1bnMgLT5cbiAgICAgICAgICAgIHNldFxuICAgICAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaGVsbG8oKSB7XG4gICAgICAgICAgICAgICAgICBpZiB0cnVlIHtcbiAgICAgICAgICAgICAgICAgIHwgIGNvbnNvbGUubG9nKCdoZWxsbycpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgICAgICAgZ3JhbW1hcjogJ3NvdXJjZS5qcydcblxuICAgICAgICBpdCBcImFkanVzdEluZGVudGF0aW9uIHN1cnJvdW5kZWQgdGV4dCBcIiwgLT5cbiAgICAgICAgICBlbnN1cmVXYWl0ICd5IHMgaSBmIHsnLFxuICAgICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgICAgICBmdW5jdGlvbiBoZWxsbygpIHtcbiAgICAgICAgICAgICAgfCAge1xuICAgICAgICAgICAgICAgICAgaWYgdHJ1ZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoZWxsbycpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBcIlwiXCJcblxuICAgICAgZGVzY3JpYmUgJ3dpdGggbW90aW9uIHdoaWNoIHRha2VzIHVzZXItaW5wdXQnLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgc2V0IHRleHQ6IFwicyBfX19fXyBlXCIsIGN1cnNvcjogWzAsIDBdXG4gICAgICAgIGRlc2NyaWJlIFwid2l0aCAnZicgbW90aW9uXCIsIC0+XG4gICAgICAgICAgaXQgXCJzdXJyb3VuZCB3aXRoICdmJyBtb3Rpb25cIiwgLT5cbiAgICAgICAgICAgIGVuc3VyZVdhaXQgJ3kgcyBmIGUgKCcsIHRleHQ6IFwiKHMgX19fX18gZSlcIiwgY3Vyc29yOiBbMCwgMF1cblxuICAgICAgICBkZXNjcmliZSBcIndpdGggJ2AnIG1vdGlvblwiLCAtPlxuICAgICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICAgIHJ1bnMgLT5cbiAgICAgICAgICAgICAgc2V0IGN1cnNvcjogWzAsIDhdICMgc3RhcnQgYXQgYGVgIGNoYXJcbiAgICAgICAgICAgICAgZW5zdXJlV2FpdCAnbSBhJywgbWFyazogJ2EnOiBbMCwgOF1cbiAgICAgICAgICAgIHJ1bnMgLT5cbiAgICAgICAgICAgICAgc2V0IGN1cnNvcjogWzAsIDBdXG5cbiAgICAgICAgICBpdCBcInN1cnJvdW5kIHdpdGggJ2AnIG1vdGlvblwiLCAtPlxuICAgICAgICAgICAgZW5zdXJlV2FpdCAneSBzIGAgYSAoJywgdGV4dDogXCIocyBfX19fXyApZVwiLCBjdXJzb3I6IFswLCAwXVxuXG4gICAgICBkZXNjcmliZSAnY2hhcmFjdGVyc1RvQWRkU3BhY2VPblN1cnJvdW5kIHNldHRpbmcnLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgc2V0dGluZ3Muc2V0KCdjaGFyYWN0ZXJzVG9BZGRTcGFjZU9uU3Vycm91bmQnLCBbJygnLCAneycsICdbJ10pXG4gICAgICAgICAgc2V0XG4gICAgICAgICAgICB0ZXh0QzogXCJ8YXBwbGVcXG5vcmFuZ2VcXG5sZW1tb25cIlxuXG4gICAgICAgIGRlc2NyaWJlIFwiY2hhciBpcyBpbiBjaGFyYWN0ZXJzVG9BZGRTcGFjZU9uU3Vycm91bmRcIiwgLT5cbiAgICAgICAgICBpdCBcImFkZCBhZGRpdGlvbmFsIHNwYWNlIGluc2lkZSBwYWlyIGNoYXIgd2hlbiBzdXJyb3VuZFwiLCAtPlxuICAgICAgICAgICAgZW5zdXJlV2FpdCAneSBzIGkgdyAoJywgICB0ZXh0OiBcIiggYXBwbGUgKVxcbm9yYW5nZVxcbmxlbW1vblwiXG4gICAgICAgICAgICBlbnN1cmVXYWl0ICdqIHkgcyBpIHcgeycsIHRleHQ6IFwiKCBhcHBsZSApXFxueyBvcmFuZ2UgfVxcbmxlbW1vblwiXG4gICAgICAgICAgICBlbnN1cmVXYWl0ICdqIHkgcyBpIHcgWycsIHRleHQ6IFwiKCBhcHBsZSApXFxueyBvcmFuZ2UgfVxcblsgbGVtbW9uIF1cIlxuXG4gICAgICAgIGRlc2NyaWJlIFwiY2hhciBpcyBub3QgaW4gY2hhcmFjdGVyc1RvQWRkU3BhY2VPblN1cnJvdW5kXCIsIC0+XG4gICAgICAgICAgaXQgXCJhZGQgYWRkaXRpb25hbCBzcGFjZSBpbnNpZGUgcGFpciBjaGFyIHdoZW4gc3Vycm91bmRcIiwgLT5cbiAgICAgICAgICAgIGVuc3VyZVdhaXQgJ3kgcyBpIHcgKScsICAgdGV4dDogXCIoYXBwbGUpXFxub3JhbmdlXFxubGVtbW9uXCJcbiAgICAgICAgICAgIGVuc3VyZVdhaXQgJ2ogeSBzIGkgdyB9JywgdGV4dDogXCIoYXBwbGUpXFxue29yYW5nZX1cXG5sZW1tb25cIlxuICAgICAgICAgICAgZW5zdXJlV2FpdCAnaiB5IHMgaSB3IF0nLCB0ZXh0OiBcIihhcHBsZSlcXG57b3JhbmdlfVxcbltsZW1tb25dXCJcblxuICAgICAgICBkZXNjcmliZSBcIml0IGRpc3RpbmN0aXZlbHkgaGFuZGxlIGFsaWFzZWQga2V5bWFwXCIsIC0+XG4gICAgICAgICAgYmVmb3JlRWFjaCAtPiBzZXQgdGV4dEM6IFwifGFiY1wiXG4gICAgICAgICAgZGVzY3JpYmUgXCJub3JtYWwgcGFpci1jaGFycyBhcmUgc2V0IHRvIGFkZCBzcGFjZVwiLCAtPlxuICAgICAgICAgICAgYmVmb3JlRWFjaCAtPiBzZXR0aW5ncy5zZXQoJ2NoYXJhY3RlcnNUb0FkZFNwYWNlT25TdXJyb3VuZCcsIFsnKCcsICd7JywgJ1snLCAnPCddKVxuICAgICAgICAgICAgaXQgXCJjMVwiLCAtPiBlbnN1cmVXYWl0ICd5IHMgaSB3ICgnLCB0ZXh0OiBcIiggYWJjIClcIlxuICAgICAgICAgICAgaXQgXCJjMlwiLCAtPiBlbnN1cmVXYWl0ICd5IHMgaSB3IGInLCB0ZXh0OiBcIihhYmMpXCJcbiAgICAgICAgICAgIGl0IFwiYzNcIiwgLT4gZW5zdXJlV2FpdCAneSBzIGkgdyB7JywgdGV4dDogXCJ7IGFiYyB9XCJcbiAgICAgICAgICAgIGl0IFwiYzRcIiwgLT4gZW5zdXJlV2FpdCAneSBzIGkgdyBCJywgdGV4dDogXCJ7YWJjfVwiXG4gICAgICAgICAgICBpdCBcImM1XCIsIC0+IGVuc3VyZVdhaXQgJ3kgcyBpIHcgWycsIHRleHQ6IFwiWyBhYmMgXVwiXG4gICAgICAgICAgICBpdCBcImM2XCIsIC0+IGVuc3VyZVdhaXQgJ3kgcyBpIHcgcicsIHRleHQ6IFwiW2FiY11cIlxuICAgICAgICAgICAgaXQgXCJjN1wiLCAtPiBlbnN1cmVXYWl0ICd5IHMgaSB3IDwnLCB0ZXh0OiBcIjwgYWJjID5cIlxuICAgICAgICAgICAgaXQgXCJjOFwiLCAtPiBlbnN1cmVXYWl0ICd5IHMgaSB3IGEnLCB0ZXh0OiBcIjxhYmM+XCJcbiAgICAgICAgICBkZXNjcmliZSBcImFsaWFzZWQgcGFpci1jaGFycyBhcmUgc2V0IHRvIGFkZCBzcGFjZVwiLCAtPlxuICAgICAgICAgICAgYmVmb3JlRWFjaCAtPiBzZXR0aW5ncy5zZXQoJ2NoYXJhY3RlcnNUb0FkZFNwYWNlT25TdXJyb3VuZCcsIFsnYicsICdCJywgJ3InLCAnYSddKVxuICAgICAgICAgICAgaXQgXCJjMVwiLCAtPiBlbnN1cmVXYWl0ICd5IHMgaSB3ICgnLCB0ZXh0OiBcIihhYmMpXCJcbiAgICAgICAgICAgIGl0IFwiYzJcIiwgLT4gZW5zdXJlV2FpdCAneSBzIGkgdyBiJywgdGV4dDogXCIoIGFiYyApXCJcbiAgICAgICAgICAgIGl0IFwiYzNcIiwgLT4gZW5zdXJlV2FpdCAneSBzIGkgdyB7JywgdGV4dDogXCJ7YWJjfVwiXG4gICAgICAgICAgICBpdCBcImM0XCIsIC0+IGVuc3VyZVdhaXQgJ3kgcyBpIHcgQicsIHRleHQ6IFwieyBhYmMgfVwiXG4gICAgICAgICAgICBpdCBcImM1XCIsIC0+IGVuc3VyZVdhaXQgJ3kgcyBpIHcgWycsIHRleHQ6IFwiW2FiY11cIlxuICAgICAgICAgICAgaXQgXCJjNlwiLCAtPiBlbnN1cmVXYWl0ICd5IHMgaSB3IHInLCB0ZXh0OiBcIlsgYWJjIF1cIlxuICAgICAgICAgICAgaXQgXCJjN1wiLCAtPiBlbnN1cmVXYWl0ICd5IHMgaSB3IDwnLCB0ZXh0OiBcIjxhYmM+XCJcbiAgICAgICAgICAgIGl0IFwiYzhcIiwgLT4gZW5zdXJlV2FpdCAneSBzIGkgdyBhJywgdGV4dDogXCI8IGFiYyA+XCJcblxuICAgIGRlc2NyaWJlICdtYXAtc3Vycm91bmQnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBqYXNtaW5lLmF0dGFjaFRvRE9NKGVkaXRvckVsZW1lbnQpXG5cbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dEM6IFwiXCJcIlxuXG4gICAgICAgICAgICB8YXBwbGVcbiAgICAgICAgICAgIHBhaXJzIHRvbWF0b1xuICAgICAgICAgICAgb3JhbmdlXG4gICAgICAgICAgICBtaWxrXG5cbiAgICAgICAgICAgIFwiXCJcIlxuXG4gICAgICAgIGF0b20ua2V5bWFwcy5hZGQgXCJtc1wiLFxuICAgICAgICAgICdhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXM6bm90KC5pbnNlcnQtbW9kZSknOlxuICAgICAgICAgICAgJ20gcyc6ICd2aW0tbW9kZS1wbHVzOm1hcC1zdXJyb3VuZCdcbiAgICAgICAgICAnYXRvbS10ZXh0LWVkaXRvci52aW0tbW9kZS1wbHVzLnZpc3VhbC1tb2RlJzpcbiAgICAgICAgICAgICdtIHMnOiAgJ3ZpbS1tb2RlLXBsdXM6bWFwLXN1cnJvdW5kJ1xuXG4gICAgICBpdCBcInN1cnJvdW5kIHRleHQgZm9yIGVhY2ggd29yZCBpbiB0YXJnZXQgY2FzZS0xXCIsIC0+XG4gICAgICAgIGVuc3VyZVdhaXQgJ20gcyBpIHAgKCcsXG4gICAgICAgICAgdGV4dEM6IFwiXCJcIlxuXG4gICAgICAgICAgKHxhcHBsZSlcbiAgICAgICAgICAocGFpcnMpICh0b21hdG8pXG4gICAgICAgICAgKG9yYW5nZSlcbiAgICAgICAgICAobWlsaylcblxuICAgICAgICAgIFwiXCJcIlxuICAgICAgaXQgXCJzdXJyb3VuZCB0ZXh0IGZvciBlYWNoIHdvcmQgaW4gdGFyZ2V0IGNhc2UtMlwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMiwgMV1cbiAgICAgICAgZW5zdXJlV2FpdCAnbSBzIGkgbCA8JyxcbiAgICAgICAgICB0ZXh0QzogXCJcIlwiXG5cbiAgICAgICAgICBhcHBsZVxuICAgICAgICAgIDxwfGFpcnM+IDx0b21hdG8+XG4gICAgICAgICAgb3JhbmdlXG4gICAgICAgICAgbWlsa1xuXG4gICAgICAgICAgXCJcIlwiXG4gICAgICBpdCBcInN1cnJvdW5kIHRleHQgZm9yIGVhY2ggd29yZCBpbiB2aXN1YWwgc2VsZWN0aW9uXCIsIC0+XG4gICAgICAgIHNldHRpbmdzLnNldChcInN0YXlPblNlbGVjdFRleHRPYmplY3RcIiwgdHJ1ZSlcbiAgICAgICAgZW5zdXJlV2FpdCAndiBpIHAgbSBzIFwiJyxcbiAgICAgICAgICB0ZXh0QzogXCJcIlwiXG5cbiAgICAgICAgICBcImFwcGxlXCJcbiAgICAgICAgICBcInBhaXJzXCIgXCJ0b21hdG9cIlxuICAgICAgICAgIFwib3JhbmdlXCJcbiAgICAgICAgICBcInxtaWxrXCJcblxuICAgICAgICAgIFwiXCJcIlxuXG4gICAgZGVzY3JpYmUgJ2RlbGV0ZSBzdXJyb3VuZCcsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFsxLCA4XVxuXG4gICAgICBpdCBcImRlbGV0ZSBzdXJyb3VuZGVkIGNoYXJzIGFuZCByZXBlYXRhYmxlXCIsIC0+XG4gICAgICAgIGVuc3VyZSAnZCBTIFsnLFxuICAgICAgICAgIHRleHQ6IFwiYXBwbGVcXG5wYWlyczogYnJhY2tldHNcXG5wYWlyczogW2JyYWNrZXRzXVxcbiggbXVsdGlcXG4gIGxpbmUgKVwiXG4gICAgICAgIGVuc3VyZSAnaiBsIC4nLFxuICAgICAgICAgIHRleHQ6IFwiYXBwbGVcXG5wYWlyczogYnJhY2tldHNcXG5wYWlyczogYnJhY2tldHNcXG4oIG11bHRpXFxuICBsaW5lIClcIlxuICAgICAgaXQgXCJkZWxldGUgc3Vycm91bmRlZCBjaGFycyBleHBhbmRlZCB0byBtdWx0aS1saW5lXCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFszLCAxXVxuICAgICAgICBlbnN1cmUgJ2QgUyAoJyxcbiAgICAgICAgICB0ZXh0OiBcImFwcGxlXFxucGFpcnM6IFticmFja2V0c11cXG5wYWlyczogW2JyYWNrZXRzXVxcbiBtdWx0aVxcbiAgbGluZSBcIlxuICAgICAgaXQgXCJkZWxldGUgc3Vycm91bmRlZCBjaGFycyBhbmQgdHJpbSBwYWRkaW5nIHNwYWNlcyBmb3Igbm9uLWlkZW50aWNhbCBwYWlyLWNoYXJcIiwgLT5cbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dDogXCJcIlwiXG4gICAgICAgICAgICAoIGFwcGxlIClcbiAgICAgICAgICAgIHsgIG9yYW5nZSAgIH1cXG5cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgIGN1cnNvcjogWzAsIDBdXG4gICAgICAgIGVuc3VyZSAnZCBTICgnLCB0ZXh0OiBcImFwcGxlXFxueyAgb3JhbmdlICAgfVxcblwiXG4gICAgICAgIGVuc3VyZSAnaiBkIFMgeycsIHRleHQ6IFwiYXBwbGVcXG5vcmFuZ2VcXG5cIlxuICAgICAgaXQgXCJkZWxldGUgc3Vycm91bmRlZCBjaGFycyBhbmQgTk9UIHRyaW0gcGFkZGluZyBzcGFjZXMgZm9yIGlkZW50aWNhbCBwYWlyLWNoYXJcIiwgLT5cbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dDogXCJcIlwiXG4gICAgICAgICAgICBgIGFwcGxlIGBcbiAgICAgICAgICAgIFwiICBvcmFuZ2UgICBcIlxcblxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgICAgY3Vyc29yOiBbMCwgMF1cbiAgICAgICAgZW5zdXJlICdkIFMgYCcsIHRleHRfOiAnX2FwcGxlX1xcblwiX19vcmFuZ2VfX19cIlxcbidcbiAgICAgICAgZW5zdXJlICdqIGQgUyBcIicsIHRleHRfOiBcIl9hcHBsZV9cXG5fX29yYW5nZV9fX1xcblwiXG4gICAgICBpdCBcImRlbGV0ZSBzdXJyb3VuZGVkIGZvciBtdWx0aS1saW5lIGJ1dCBkb250IGFmZmVjdCBjb2RlIGxheW91dFwiLCAtPlxuICAgICAgICBzZXRcbiAgICAgICAgICBjdXJzb3I6IFswLCAzNF1cbiAgICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICAgIGhpZ2hsaWdodFJhbmdlcyBAZWRpdG9yLCByYW5nZSwge1xuICAgICAgICAgICAgICB0aW1lb3V0OiB0aW1lb3V0XG4gICAgICAgICAgICAgIGhlbGxvOiB3b3JsZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZSAnZCBTIHsnLFxuICAgICAgICAgIHRleHQ6IFtcbiAgICAgICAgICAgICAgXCJoaWdobGlnaHRSYW5nZXMgQGVkaXRvciwgcmFuZ2UsIFwiXG4gICAgICAgICAgICAgIFwiICB0aW1lb3V0OiB0aW1lb3V0XCJcbiAgICAgICAgICAgICAgXCIgIGhlbGxvOiB3b3JsZFwiXG4gICAgICAgICAgICAgIFwiXCJcbiAgICAgICAgICAgIF0uam9pbihcIlxcblwiKVxuXG4gICAgZGVzY3JpYmUgJ2NoYW5nZSBzdXJyb3VuZCcsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIHRleHQ6IFwiXCJcIlxuICAgICAgICAgICAgKGFwcGxlKVxuICAgICAgICAgICAgKGdyYXBlKVxuICAgICAgICAgICAgPGxlbW1vbj5cbiAgICAgICAgICAgIHtvcmFuZ2V9XG4gICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgICBjdXJzb3I6IFswLCAxXVxuICAgICAgaXQgXCJjaGFuZ2Ugc3Vycm91bmRlZCBjaGFycyBhbmQgcmVwZWF0YWJsZVwiLCAtPlxuICAgICAgICBlbnN1cmVXYWl0ICdjIFMgKCBbJyxcbiAgICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICAgIFthcHBsZV1cbiAgICAgICAgICAgIChncmFwZSlcbiAgICAgICAgICAgIDxsZW1tb24+XG4gICAgICAgICAgICB7b3JhbmdlfVxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZVdhaXQgJ2ogbCAuJyxcbiAgICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICAgIFthcHBsZV1cbiAgICAgICAgICAgIFtncmFwZV1cbiAgICAgICAgICAgIDxsZW1tb24+XG4gICAgICAgICAgICB7b3JhbmdlfVxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICBpdCBcImNoYW5nZSBzdXJyb3VuZGVkIGNoYXJzXCIsIC0+XG4gICAgICAgIGVuc3VyZVdhaXQgJ2ogaiBjIFMgPCBcIicsXG4gICAgICAgICAgdGV4dDogXCJcIlwiXG4gICAgICAgICAgICAoYXBwbGUpXG4gICAgICAgICAgICAoZ3JhcGUpXG4gICAgICAgICAgICBcImxlbW1vblwiXG4gICAgICAgICAgICB7b3JhbmdlfVxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZVdhaXQgJ2ogbCBjIFMgeyAhJyxcbiAgICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICAgIChhcHBsZSlcbiAgICAgICAgICAgIChncmFwZSlcbiAgICAgICAgICAgIFwibGVtbW9uXCJcbiAgICAgICAgICAgICFvcmFuZ2UhXG4gICAgICAgICAgICBcIlwiXCJcblxuICAgICAgaXQgXCJjaGFuZ2Ugc3Vycm91bmRlZCBmb3IgbXVsdGktbGluZSBidXQgZG9udCBhZmZlY3QgY29kZSBsYXlvdXRcIiwgLT5cbiAgICAgICAgc2V0XG4gICAgICAgICAgY3Vyc29yOiBbMCwgMzRdXG4gICAgICAgICAgdGV4dDogXCJcIlwiXG4gICAgICAgICAgICBoaWdobGlnaHRSYW5nZXMgQGVkaXRvciwgcmFuZ2UsIHtcbiAgICAgICAgICAgICAgdGltZW91dDogdGltZW91dFxuICAgICAgICAgICAgICBoZWxsbzogd29ybGRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICBlbnN1cmVXYWl0ICdjIFMgeyAoJyxcbiAgICAgICAgICB0ZXh0OiBcIlwiXCJcbiAgICAgICAgICAgIGhpZ2hsaWdodFJhbmdlcyBAZWRpdG9yLCByYW5nZSwgKFxuICAgICAgICAgICAgICB0aW1lb3V0OiB0aW1lb3V0XG4gICAgICAgICAgICAgIGhlbGxvOiB3b3JsZFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgXCJcIlwiXG5cbiAgICAgIGRlc2NyaWJlICdjaGFyYWN0ZXJzVG9BZGRTcGFjZU9uU3Vycm91bmQgc2V0dGluZycsIC0+XG4gICAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgICBzZXR0aW5ncy5zZXQoJ2NoYXJhY3RlcnNUb0FkZFNwYWNlT25TdXJyb3VuZCcsIFsnKCcsICd7JywgJ1snXSlcblxuICAgICAgICBkZXNjcmliZSAnd2hlbiBpbnB1dCBjaGFyIGlzIGluIGNoYXJhY3RlcnNUb0FkZFNwYWNlT25TdXJyb3VuZCcsIC0+XG4gICAgICAgICAgZGVzY3JpYmUgJ1tzaW5nbGUgbGluZSB0ZXh0XSBhZGQgc2luZ2xlIHNwYWNlIGFyb3VuZCBwYWlyIHJlZ2FyZGxlc3Mgb2YgZXhzaXRpbmcgaW5uZXIgdGV4dCcsIC0+XG4gICAgICAgICAgICBpdCBcImNhc2UxXCIsIC0+IHNldCB0ZXh0QzogXCJ8KGFwcGxlKVwiOyAgICAgZW5zdXJlV2FpdCAnYyBTICggeycsIHRleHQ6IFwieyBhcHBsZSB9XCJcbiAgICAgICAgICAgIGl0IFwiY2FzZTJcIiwgLT4gc2V0IHRleHRDOiBcInwoIGFwcGxlIClcIjsgICBlbnN1cmVXYWl0ICdjIFMgKCB7JywgdGV4dDogXCJ7IGFwcGxlIH1cIlxuICAgICAgICAgICAgaXQgXCJjYXNlM1wiLCAtPiBzZXQgdGV4dEM6IFwifCggIGFwcGxlICApXCI7IGVuc3VyZVdhaXQgJ2MgUyAoIHsnLCB0ZXh0OiBcInsgYXBwbGUgfVwiXG5cbiAgICAgICAgICBkZXNjcmliZSBcIlttdWx0aSBsaW5lIHRleHRdIGRvbid0IGFkZCBzaW5nbGUgc3BhY2UgYXJvdW5kIHBhaXJcIiwgLT5cbiAgICAgICAgICAgIGl0IFwiZG9uJ3QgYWRkIHNpbmdsZSBzcGFjZSBhcm91bmQgcGFpclwiLCAtPlxuICAgICAgICAgICAgICBzZXQgdGV4dEM6IFwifChcXG5hcHBsZVxcbilcIjsgZW5zdXJlV2FpdCBcImMgUyAoIHtcIiwgdGV4dDogXCJ7XFxuYXBwbGVcXG59XCJcblxuICAgICAgICBkZXNjcmliZSAnd2hlbiBmaXJzdCBpbnB1dCBjaGFyIGlzIG5vdCBpbiBjaGFyYWN0ZXJzVG9BZGRTcGFjZU9uU3Vycm91bmQnLCAtPlxuICAgICAgICAgIGRlc2NyaWJlIFwicmVtb3ZlIHN1cnJvdW5kaW5nIHNwYWNlIG9mIGlubmVyIHRleHQgZm9yIGlkZW50aWNhbCBwYWlyLWNoYXJcIiwgLT5cbiAgICAgICAgICAgIGl0IFwiY2FzZTFcIiwgLT4gc2V0IHRleHRDOiBcInwoYXBwbGUpXCI7ICAgICBlbnN1cmVXYWl0IFwiYyBTICggfVwiLCB0ZXh0OiBcInthcHBsZX1cIlxuICAgICAgICAgICAgaXQgXCJjYXNlMlwiLCAtPiBzZXQgdGV4dEM6IFwifCggYXBwbGUgKVwiOyAgIGVuc3VyZVdhaXQgXCJjIFMgKCB9XCIsIHRleHQ6IFwie2FwcGxlfVwiXG4gICAgICAgICAgICBpdCBcImNhc2UzXCIsIC0+IHNldCB0ZXh0QzogXCJ8KCAgYXBwbGUgIClcIjsgZW5zdXJlV2FpdCBcImMgUyAoIH1cIiwgdGV4dDogXCJ7YXBwbGV9XCJcbiAgICAgICAgICBkZXNjcmliZSBcImRvZXNuJ3QgcmVtb3ZlIHN1cnJvdW5kaW5nIHNwYWNlIG9mIGlubmVyIHRleHQgZm9yIG5vbi1pZGVudGljYWwgcGFpci1jaGFyXCIsIC0+XG4gICAgICAgICAgICBpdCBcImNhc2UxXCIsIC0+IHNldCB0ZXh0QzogJ3xcImFwcGxlXCInOyAgICAgZW5zdXJlV2FpdCAnYyBTIFwiIGAnLCB0ZXh0OiBcImBhcHBsZWBcIlxuICAgICAgICAgICAgaXQgXCJjYXNlMlwiLCAtPiBzZXQgdGV4dEM6ICd8XCIgIGFwcGxlICBcIic7IGVuc3VyZVdhaXQgJ2MgUyBcIiBgJywgdGV4dDogXCJgICBhcHBsZSAgYFwiXG4gICAgICAgICAgICBpdCBcImNhc2UzXCIsIC0+IHNldCB0ZXh0QzogJ3xcIiAgYXBwbGUgIFwiJzsgZW5zdXJlV2FpdCAnYyBTIFwiIFxcJycsIHRleHQ6IFwiJyAgYXBwbGUgICdcIlxuXG4gICAgICBkZXNjcmliZSAnY3VzdG9tU3Vycm91bmRQYWlycyBzZXR0aW5nJywgLT5cbiAgICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICAgIGNvbnN0b21TdXJyb3VuZCA9ICcnJ1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInBcIjogW1wiPD9waHBcIiwgXCI/PlwiLCB0cnVlXSxcbiAgICAgICAgICAgICAgXCIlXCI6IFtcIjwlXCIsIFwiJT5cIiwgdHJ1ZV0sXG4gICAgICAgICAgICAgIFwiPVwiOiBbXCI8JT1cIiwgXCIlPlwiLCB0cnVlXSxcbiAgICAgICAgICAgICAgXCJzXCI6IFtcIlxcXFxcIlwiLCBcIlxcXFxcIlwiXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICcnJ1xuICAgICAgICAgIHNldHRpbmdzLnNldCgnY3VzdG9tU3Vycm91bmRQYWlycycsIGNvbnN0b21TdXJyb3VuZClcblxuICAgICAgICBkZXNjcmliZSAnc3Vycm91bmQnLCAtPlxuICAgICAgICAgIGl0IFwiY2FzZTFcIiwgLT4gc2V0IHRleHRDOiBcImFwfHBsZVwiOyBlbnN1cmVXYWl0ICd5IHMgYyBwJywgdGV4dDogXCI8P3BocCBhcHBsZSA/PlwiXG4gICAgICAgICAgaXQgXCJjYXNlMlwiLCAtPiBzZXQgdGV4dEM6IFwiYXB8cGxlXCI7IGVuc3VyZVdhaXQgJ3kgcyBjICUnLCB0ZXh0OiBcIjwlIGFwcGxlICU+XCJcbiAgICAgICAgICBpdCBcImNhc2UyXCIsIC0+IHNldCB0ZXh0QzogXCJhcHxwbGVcIjsgZW5zdXJlV2FpdCAneSBzIGMgPScsIHRleHQ6IFwiPCU9IGFwcGxlICU+XCJcbiAgICAgICAgICBpdCBcImNhc2UyXCIsIC0+IHNldCB0ZXh0QzogXCJhcHxwbGVcIjsgZW5zdXJlV2FpdCAneSBzIGMgcycsIHRleHQ6ICdcImFwcGxlXCInXG4gICAgICAgIGRlc2NyaWJlICdkZWxldGUtc3Vycm91bmQnLCAtPlxuICAgICAgICAgIGl0IFwiY2FzZTFcIiwgLT4gc2V0IHRleHRDOiBcIjw/cGhwIGFwfHBsZSA/PlwiOyBlbnN1cmVXYWl0ICdkIFMgcCcsIHRleHQ6IFwiYXBwbGVcIlxuICAgICAgICAgIGl0IFwiY2FzZTJcIiwgLT4gc2V0IHRleHRDOiBcIjwlIGFwfHBsZSAlPlwiOyAgICBlbnN1cmVXYWl0ICdkIFMgJScsIHRleHQ6IFwiYXBwbGVcIlxuICAgICAgICAgIGl0IFwiY2FzZTJcIiwgLT4gc2V0IHRleHRDOiBcIjwlPSBhcHxwbGUgJT5cIjsgICBlbnN1cmVXYWl0ICdkIFMgPScsIHRleHQ6IFwiYXBwbGVcIlxuICAgICAgICAgIGl0IFwiY2FzZTJcIiwgLT4gc2V0IHRleHRDOiAnXCJhcHxwbGVcIic7ICAgICAgICBlbnN1cmVXYWl0ICdkIFMgcycsIHRleHQ6IFwiYXBwbGVcIlxuICAgICAgICBkZXNjcmliZSAnY2hhbmdlLXN1cnJvdW5kJywgLT5cbiAgICAgICAgICBpdCBcImNhc2UxXCIsIC0+IHNldCB0ZXh0QzogXCI8P3BocCBhcHxwbGUgPz5cIjsgZW5zdXJlV2FpdCAnYyBTIHAgJScsIHRleHQ6IFwiPCUgYXBwbGUgJT5cIlxuICAgICAgICAgIGl0IFwiY2FzZTJcIiwgLT4gc2V0IHRleHRDOiBcIjwlIGFwfHBsZSAlPlwiOyAgICBlbnN1cmVXYWl0ICdjIFMgJSA9JywgdGV4dDogXCI8JT0gYXBwbGUgJT5cIlxuICAgICAgICAgIGl0IFwiY2FzZTJcIiwgLT4gc2V0IHRleHRDOiBcIjwlPSBhcHxwbGUgJT5cIjsgICBlbnN1cmVXYWl0ICdjIFMgPSBzJywgdGV4dDogJ1wiYXBwbGVcIidcbiAgICAgICAgICBpdCBcImNhc2UyXCIsIC0+IHNldCB0ZXh0QzogJ1wiYXB8cGxlXCInOyAgICAgICAgZW5zdXJlV2FpdCAnYyBTIHMgcCcsIHRleHQ6IFwiPD9waHAgYXBwbGUgPz5cIlxuXG4gICAgZGVzY3JpYmUgJ3N1cnJvdW5kLXdvcmQnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBhdG9tLmtleW1hcHMuYWRkIFwic3Vycm91bmQtdGVzdFwiLFxuICAgICAgICAgICdhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXMubm9ybWFsLW1vZGUnOlxuICAgICAgICAgICAgJ3kgcyB3JzogJ3ZpbS1tb2RlLXBsdXM6c3Vycm91bmQtd29yZCdcblxuICAgICAgaXQgXCJzdXJyb3VuZCBhIHdvcmQgd2l0aCAoIGFuZCByZXBlYXRhYmxlXCIsIC0+XG4gICAgICAgIGVuc3VyZVdhaXQgJ3kgcyB3ICgnLCB0ZXh0QzogXCJ8KGFwcGxlKVxcbnBhaXJzOiBbYnJhY2tldHNdXFxucGFpcnM6IFticmFja2V0c11cXG4oIG11bHRpXFxuICBsaW5lIClcIlxuICAgICAgICBlbnN1cmVXYWl0ICdqIC4nLCAgICAgdGV4dEM6IFwiKGFwcGxlKVxcbnwocGFpcnMpOiBbYnJhY2tldHNdXFxucGFpcnM6IFticmFja2V0c11cXG4oIG11bHRpXFxuICBsaW5lIClcIlxuICAgICAgaXQgXCJzdXJyb3VuZCBhIHdvcmQgd2l0aCB7IGFuZCByZXBlYXRhYmxlXCIsIC0+XG4gICAgICAgIGVuc3VyZVdhaXQgJ3kgcyB3IHsnLCB0ZXh0QzogXCJ8e2FwcGxlfVxcbnBhaXJzOiBbYnJhY2tldHNdXFxucGFpcnM6IFticmFja2V0c11cXG4oIG11bHRpXFxuICBsaW5lIClcIlxuICAgICAgICBlbnN1cmVXYWl0ICdqIC4nLCAgICAgdGV4dEM6IFwie2FwcGxlfVxcbnx7cGFpcnN9OiBbYnJhY2tldHNdXFxucGFpcnM6IFticmFja2V0c11cXG4oIG11bHRpXFxuICBsaW5lIClcIlxuXG4gICAgZGVzY3JpYmUgJ2RlbGV0ZS1zdXJyb3VuZC1hbnktcGFpcicsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAgIGFwcGxlXG4gICAgICAgICAgICAocGFpcnM6IFt8YnJhY2tldHNdKVxuICAgICAgICAgICAge3BhaXJzIFwic1wiIFticmFja2V0c119XG4gICAgICAgICAgICAoIG11bHRpXG4gICAgICAgICAgICAgIGxpbmUgKVxuICAgICAgICAgICAgXCJcIlwiXG5cbiAgICAgIGl0IFwiZGVsZXRlIHN1cnJvdW5kZWQgYW55IHBhaXIgZm91bmQgYW5kIHJlcGVhdGFibGVcIiwgLT5cbiAgICAgICAgZW5zdXJlICdkIHMnLCB0ZXh0OiAnYXBwbGVcXG4ocGFpcnM6IGJyYWNrZXRzKVxcbntwYWlycyBcInNcIiBbYnJhY2tldHNdfVxcbiggbXVsdGlcXG4gIGxpbmUgKSdcbiAgICAgICAgZW5zdXJlICcuJywgICB0ZXh0OiAnYXBwbGVcXG5wYWlyczogYnJhY2tldHNcXG57cGFpcnMgXCJzXCIgW2JyYWNrZXRzXX1cXG4oIG11bHRpXFxuICBsaW5lICknXG5cbiAgICAgIGl0IFwiZGVsZXRlIHN1cnJvdW5kZWQgYW55IHBhaXIgZm91bmQgd2l0aCBza2lwIHBhaXIgb3V0IG9mIGN1cnNvciBhbmQgcmVwZWF0YWJsZVwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMiwgMTRdXG4gICAgICAgIGVuc3VyZSAnZCBzJywgdGV4dDogJ2FwcGxlXFxuKHBhaXJzOiBbYnJhY2tldHNdKVxcbntwYWlycyBcInNcIiBicmFja2V0c31cXG4oIG11bHRpXFxuICBsaW5lICknXG4gICAgICAgIGVuc3VyZSAnLicsICAgdGV4dDogJ2FwcGxlXFxuKHBhaXJzOiBbYnJhY2tldHNdKVxcbnBhaXJzIFwic1wiIGJyYWNrZXRzXFxuKCBtdWx0aVxcbiAgbGluZSApJ1xuICAgICAgICBlbnN1cmUgJy4nLCAgIHRleHQ6ICdhcHBsZVxcbihwYWlyczogW2JyYWNrZXRzXSlcXG5wYWlycyBcInNcIiBicmFja2V0c1xcbiggbXVsdGlcXG4gIGxpbmUgKScgIyBkbyBub3RoaW5nIGFueSBtb3JlXG5cbiAgICAgIGl0IFwiZGVsZXRlIHN1cnJvdW5kZWQgY2hhcnMgZXhwYW5kZWQgdG8gbXVsdGktbGluZVwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMywgMV1cbiAgICAgICAgZW5zdXJlICdkIHMnLCB0ZXh0OiAnYXBwbGVcXG4ocGFpcnM6IFticmFja2V0c10pXFxue3BhaXJzIFwic1wiIFticmFja2V0c119XFxuIG11bHRpXFxuICBsaW5lICdcblxuICAgIGRlc2NyaWJlICdkZWxldGUtc3Vycm91bmQtYW55LXBhaXItYWxsb3ctZm9yd2FyZGluZycsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIGF0b20ua2V5bWFwcy5hZGQgXCJrZXltYXBzLWZvci1zdXJyb3VuZFwiLFxuICAgICAgICAgICdhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXMubm9ybWFsLW1vZGUnOlxuICAgICAgICAgICAgJ2Qgcyc6ICd2aW0tbW9kZS1wbHVzOmRlbGV0ZS1zdXJyb3VuZC1hbnktcGFpci1hbGxvdy1mb3J3YXJkaW5nJ1xuXG4gICAgICAgIHNldHRpbmdzLnNldCgnc3RheU9uVHJhbnNmb3JtU3RyaW5nJywgdHJ1ZSlcblxuICAgICAgaXQgXCJbMV0gc2luZ2xlIGxpbmVcIiwgLT5cbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgIHxfX18oaW5uZXIpXG4gICAgICAgICAgX19fKGlubmVyKVxuICAgICAgICAgIFwiXCJcIlxuICAgICAgICBlbnN1cmUgJ2QgcycsXG4gICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgIHxfX19pbm5lclxuICAgICAgICAgIF9fXyhpbm5lcilcbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgZW5zdXJlICdqIC4nLFxuICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICBfX19pbm5lclxuICAgICAgICAgIHxfX19pbm5lclxuICAgICAgICAgIFwiXCJcIlxuXG4gICAgZGVzY3JpYmUgJ2NoYW5nZS1zdXJyb3VuZC1hbnktcGFpcicsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAgICh8YXBwbGUpXG4gICAgICAgICAgICAoZ3JhcGUpXG4gICAgICAgICAgICA8bGVtbW9uPlxuICAgICAgICAgICAge29yYW5nZX1cbiAgICAgICAgICAgIFwiXCJcIlxuXG4gICAgICBpdCBcImNoYW5nZSBhbnkgc3Vycm91bmRlZCBwYWlyIGZvdW5kIGFuZCByZXBlYXRhYmxlXCIsIC0+XG4gICAgICAgIGVuc3VyZVdhaXQgJ2MgcyA8JywgdGV4dEM6IFwifDxhcHBsZT5cXG4oZ3JhcGUpXFxuPGxlbW1vbj5cXG57b3JhbmdlfVwiXG4gICAgICAgIGVuc3VyZVdhaXQgJ2ogLicsICAgdGV4dEM6IFwiPGFwcGxlPlxcbnw8Z3JhcGU+XFxuPGxlbW1vbj5cXG57b3JhbmdlfVwiXG4gICAgICAgIGVuc3VyZVdhaXQgJzIgaiAuJywgdGV4dEM6IFwiPGFwcGxlPlxcbjxncmFwZT5cXG48bGVtbW9uPlxcbnw8b3JhbmdlPlwiXG5cbiAgICBkZXNjcmliZSAnY2hhbmdlLXN1cnJvdW5kLWFueS1wYWlyLWFsbG93LWZvcndhcmRpbmcnLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBhdG9tLmtleW1hcHMuYWRkIFwia2V5bWFwcy1mb3Itc3Vycm91bmRcIixcbiAgICAgICAgICAnYXRvbS10ZXh0LWVkaXRvci52aW0tbW9kZS1wbHVzLm5vcm1hbC1tb2RlJzpcbiAgICAgICAgICAgICdjIHMnOiAndmltLW1vZGUtcGx1czpjaGFuZ2Utc3Vycm91bmQtYW55LXBhaXItYWxsb3ctZm9yd2FyZGluZydcbiAgICAgICAgc2V0dGluZ3Muc2V0KCdzdGF5T25UcmFuc2Zvcm1TdHJpbmcnLCB0cnVlKVxuICAgICAgaXQgXCJbMV0gc2luZ2xlIGxpbmVcIiwgLT5cbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgIHxfX18oaW5uZXIpXG4gICAgICAgICAgX19fKGlubmVyKVxuICAgICAgICAgIFwiXCJcIlxuICAgICAgICBlbnN1cmVXYWl0ICdjIHMgPCcsXG4gICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgIHxfX188aW5uZXI+XG4gICAgICAgICAgX19fKGlubmVyKVxuICAgICAgICAgIFwiXCJcIlxuICAgICAgICBlbnN1cmVXYWl0ICdqIC4nLFxuICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICBfX188aW5uZXI+XG4gICAgICAgICAgfF9fXzxpbm5lcj5cbiAgICAgICAgICBcIlwiXCJcblxuICBkZXNjcmliZSAnUmVwbGFjZVdpdGhSZWdpc3RlcicsIC0+XG4gICAgb3JpZ2luYWxUZXh0ID0gbnVsbFxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIGF0b20ua2V5bWFwcy5hZGQgXCJ0ZXN0XCIsXG4gICAgICAgICdhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXM6bm90KC5pbnNlcnQtbW9kZSknOlxuICAgICAgICAgICdfJzogJ3ZpbS1tb2RlLXBsdXM6cmVwbGFjZS13aXRoLXJlZ2lzdGVyJ1xuXG4gICAgICBvcmlnaW5hbFRleHQgPSBcIlwiXCJcbiAgICAgIGFiYyBkZWYgJ2FhYSdcbiAgICAgIGhlcmUgKHBhcmVudGhlc2lzKVxuICAgICAgaGVyZSAocGFyZW50aGVzaXMpXG4gICAgICBcIlwiXCJcbiAgICAgIHNldFxuICAgICAgICB0ZXh0OiBvcmlnaW5hbFRleHRcbiAgICAgICAgY3Vyc29yOiBbMCwgOV1cblxuICAgICAgc2V0IHJlZ2lzdGVyOiAnXCInOiB0ZXh0OiAnZGVmYXVsdCByZWdpc3RlcicsIHR5cGU6ICdjaGFyYWN0ZXJ3aXNlJ1xuICAgICAgc2V0IHJlZ2lzdGVyOiAnYSc6IHRleHQ6ICdBIHJlZ2lzdGVyJywgdHlwZTogJ2NoYXJhY3Rlcndpc2UnXG5cbiAgICBpdCBcInJlcGxhY2Ugc2VsZWN0aW9uIHdpdGggcmVnaXNndGVyJ3MgY29udGVudFwiLCAtPlxuICAgICAgZW5zdXJlICd2IGkgdycsXG4gICAgICAgIHNlbGVjdGVkVGV4dDogJ2FhYSdcbiAgICAgIGVuc3VyZSAnXycsXG4gICAgICAgIG1vZGU6ICdub3JtYWwnXG4gICAgICAgIHRleHQ6IG9yaWdpbmFsVGV4dC5yZXBsYWNlKCdhYWEnLCAnZGVmYXVsdCByZWdpc3RlcicpXG5cbiAgICBpdCBcInJlcGxhY2UgdGV4dCBvYmplY3Qgd2l0aCByZWdpc2d0ZXIncyBjb250ZW50XCIsIC0+XG4gICAgICBzZXQgY3Vyc29yOiBbMSwgNl1cbiAgICAgIGVuc3VyZSAnXyBpICgnLFxuICAgICAgICBtb2RlOiAnbm9ybWFsJ1xuICAgICAgICB0ZXh0OiBvcmlnaW5hbFRleHQucmVwbGFjZSgncGFyZW50aGVzaXMnLCAnZGVmYXVsdCByZWdpc3RlcicpXG5cbiAgICBpdCBcImNhbiByZXBlYXRcIiwgLT5cbiAgICAgIHNldCBjdXJzb3I6IFsxLCA2XVxuICAgICAgZW5zdXJlICdfIGkgKCBqIC4nLFxuICAgICAgICBtb2RlOiAnbm9ybWFsJ1xuICAgICAgICB0ZXh0OiBvcmlnaW5hbFRleHQucmVwbGFjZSgvcGFyZW50aGVzaXMvZywgJ2RlZmF1bHQgcmVnaXN0ZXInKVxuXG4gICAgaXQgXCJjYW4gdXNlIHNwZWNpZmllZCByZWdpc3RlciB0byByZXBsYWNlIHdpdGhcIiwgLT5cbiAgICAgIHNldCBjdXJzb3I6IFsxLCA2XVxuICAgICAgZW5zdXJlICdcIiBhIF8gaSAoJyxcbiAgICAgICAgbW9kZTogJ25vcm1hbCdcbiAgICAgICAgdGV4dDogb3JpZ2luYWxUZXh0LnJlcGxhY2UoJ3BhcmVudGhlc2lzJywgJ0EgcmVnaXN0ZXInKVxuXG4gIGRlc2NyaWJlICdTd2FwV2l0aFJlZ2lzdGVyJywgLT5cbiAgICBvcmlnaW5hbFRleHQgPSBudWxsXG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgYXRvbS5rZXltYXBzLmFkZCBcInRlc3RcIixcbiAgICAgICAgJ2F0b20tdGV4dC1lZGl0b3IudmltLW1vZGUtcGx1czpub3QoLmluc2VydC1tb2RlKSc6XG4gICAgICAgICAgJ2cgcCc6ICd2aW0tbW9kZS1wbHVzOnN3YXAtd2l0aC1yZWdpc3RlcidcblxuICAgICAgb3JpZ2luYWxUZXh0ID0gXCJcIlwiXG4gICAgICBhYmMgZGVmICdhYWEnXG4gICAgICBoZXJlICgxMTEpXG4gICAgICBoZXJlICgyMjIpXG4gICAgICBcIlwiXCJcbiAgICAgIHNldFxuICAgICAgICB0ZXh0OiBvcmlnaW5hbFRleHRcbiAgICAgICAgY3Vyc29yOiBbMCwgOV1cblxuICAgICAgc2V0IHJlZ2lzdGVyOiAnXCInOiB0ZXh0OiAnZGVmYXVsdCByZWdpc3RlcicsIHR5cGU6ICdjaGFyYWN0ZXJ3aXNlJ1xuICAgICAgc2V0IHJlZ2lzdGVyOiAnYSc6IHRleHQ6ICdBIHJlZ2lzdGVyJywgdHlwZTogJ2NoYXJhY3Rlcndpc2UnXG5cbiAgICBpdCBcInN3YXAgc2VsZWN0aW9uIHdpdGggcmVnaXNndGVyJ3MgY29udGVudFwiLCAtPlxuICAgICAgZW5zdXJlICd2IGkgdycsIHNlbGVjdGVkVGV4dDogJ2FhYSdcbiAgICAgIGVuc3VyZSAnZyBwJyxcbiAgICAgICAgbW9kZTogJ25vcm1hbCdcbiAgICAgICAgdGV4dDogb3JpZ2luYWxUZXh0LnJlcGxhY2UoJ2FhYScsICdkZWZhdWx0IHJlZ2lzdGVyJylcbiAgICAgICAgcmVnaXN0ZXI6ICdcIic6IHRleHQ6ICdhYWEnXG5cbiAgICBpdCBcInN3YXAgdGV4dCBvYmplY3Qgd2l0aCByZWdpc2d0ZXIncyBjb250ZW50XCIsIC0+XG4gICAgICBzZXQgY3Vyc29yOiBbMSwgNl1cbiAgICAgIGVuc3VyZSAnZyBwIGkgKCcsXG4gICAgICAgIG1vZGU6ICdub3JtYWwnXG4gICAgICAgIHRleHQ6IG9yaWdpbmFsVGV4dC5yZXBsYWNlKCcxMTEnLCAnZGVmYXVsdCByZWdpc3RlcicpXG4gICAgICAgIHJlZ2lzdGVyOiAnXCInOiB0ZXh0OiAnMTExJ1xuXG4gICAgaXQgXCJjYW4gcmVwZWF0XCIsIC0+XG4gICAgICBzZXQgY3Vyc29yOiBbMSwgNl1cbiAgICAgIHVwZGF0ZWRUZXh0ID0gXCJcIlwiXG4gICAgICAgIGFiYyBkZWYgJ2FhYSdcbiAgICAgICAgaGVyZSAoZGVmYXVsdCByZWdpc3RlcilcbiAgICAgICAgaGVyZSAoMTExKVxuICAgICAgICBcIlwiXCJcbiAgICAgIGVuc3VyZSAnZyBwIGkgKCBqIC4nLFxuICAgICAgICBtb2RlOiAnbm9ybWFsJ1xuICAgICAgICB0ZXh0OiB1cGRhdGVkVGV4dFxuICAgICAgICByZWdpc3RlcjogJ1wiJzogdGV4dDogJzIyMidcblxuICAgIGl0IFwiY2FuIHVzZSBzcGVjaWZpZWQgcmVnaXN0ZXIgdG8gc3dhcCB3aXRoXCIsIC0+XG4gICAgICBzZXQgY3Vyc29yOiBbMSwgNl1cbiAgICAgIGVuc3VyZSAnXCIgYSBnIHAgaSAoJyxcbiAgICAgICAgbW9kZTogJ25vcm1hbCdcbiAgICAgICAgdGV4dDogb3JpZ2luYWxUZXh0LnJlcGxhY2UoJzExMScsICdBIHJlZ2lzdGVyJylcbiAgICAgICAgcmVnaXN0ZXI6ICdhJzogdGV4dDogJzExMSdcblxuICBkZXNjcmliZSBcIkpvaW4gYW5kIGl0J3MgZmFtaWx5XCIsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgc2V0XG4gICAgICAgIHRleHRDXzogXCJcIlwiXG4gICAgICAgIF9fMHwxMlxuICAgICAgICBfXzM0NVxuICAgICAgICBfXzY3OFxuICAgICAgICBfXzlhYlxcblxuICAgICAgICBcIlwiXCJcblxuICAgIGRlc2NyaWJlIFwiSm9pblwiLCAtPlxuICAgICAgaXQgXCJqb2lucyBsaW5lcyB3aXRoIHRyaW1pbmcgbGVhZGluZyB3aGl0ZXNwYWNlXCIsIC0+XG4gICAgICAgIGVuc3VyZSAnSicsXG4gICAgICAgICAgdGV4dENfOiBcIlwiXCJcbiAgICAgICAgICBfXzAxMnwgMzQ1XG4gICAgICAgICAgX182NzhcbiAgICAgICAgICBfXzlhYlxcblxuICAgICAgICAgIFwiXCJcIlxuICAgICAgICBlbnN1cmUgJy4nLFxuICAgICAgICAgIHRleHRDXzogXCJcIlwiXG4gICAgICAgICAgX18wMTIgMzQ1fCA2NzhcbiAgICAgICAgICBfXzlhYlxcblxuICAgICAgICAgIFwiXCJcIlxuICAgICAgICBlbnN1cmUgJy4nLFxuICAgICAgICAgIHRleHRDXzogXCJcIlwiXG4gICAgICAgICAgX18wMTIgMzQ1IDY3OHwgOWFiXFxuXG4gICAgICAgICAgXCJcIlwiXG5cbiAgICAgICAgZW5zdXJlICd1JyxcbiAgICAgICAgICB0ZXh0Q186IFwiXCJcIlxuICAgICAgICAgIF9fMDEyIDM0NXwgNjc4XG4gICAgICAgICAgX185YWJcXG5cbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgZW5zdXJlICd1JyxcbiAgICAgICAgICB0ZXh0Q186IFwiXCJcIlxuICAgICAgICAgIF9fMDEyfCAzNDVcbiAgICAgICAgICBfXzY3OFxuICAgICAgICAgIF9fOWFiXFxuXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZSAndScsXG4gICAgICAgICAgdGV4dENfOiBcIlwiXCJcbiAgICAgICAgICBfXzB8MTJcbiAgICAgICAgICBfXzM0NVxuICAgICAgICAgIF9fNjc4XG4gICAgICAgICAgX185YWJcXG5cbiAgICAgICAgICBcIlwiXCJcblxuICAgICAgaXQgXCJqb2lucyBkbyBub3RoaW5nIHdoZW4gaXQgY2Fubm90IGpvaW4gYW55IG1vcmVcIiwgLT5cbiAgICAgICAgIyBGSVhNRTogXCJcXG5cIiByZW1haW4gaXQncyBpbmNvbnNpc3RlbnQgd2l0aCBtdWx0aS10aW1lIEpcbiAgICAgICAgZW5zdXJlICcxIDAgMCBKJywgdGV4dENfOiBcIiAgMDEyIDM0NSA2NzggOWF8YlxcblwiXG5cbiAgICAgIGl0IFwiam9pbnMgZG8gbm90aGluZyB3aGVuIGl0IGNhbm5vdCBqb2luIGFueSBtb3JlXCIsIC0+XG4gICAgICAgIGVuc3VyZSAnSiBKIEonLCB0ZXh0Q186IFwiICAwMTIgMzQ1IDY3OHwgOWFiXFxuXCJcbiAgICAgICAgZW5zdXJlICdKJywgdGV4dENfOiBcIiAgMDEyIDM0NSA2NzggOWF8YlwiXG4gICAgICAgIGVuc3VyZSAnSicsIHRleHRDXzogXCIgIDAxMiAzNDUgNjc4IDlhfGJcIlxuXG4gICAgZGVzY3JpYmUgXCJKb2luV2l0aEtlZXBpbmdTcGFjZVwiLCAtPlxuICAgICAgYmVmb3JlRWFjaCAtPlxuICAgICAgICBhdG9tLmtleW1hcHMuYWRkIFwidGVzdFwiLFxuICAgICAgICAgICdhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXM6bm90KC5pbnNlcnQtbW9kZSknOlxuICAgICAgICAgICAgJ2cgSic6ICd2aW0tbW9kZS1wbHVzOmpvaW4td2l0aC1rZWVwaW5nLXNwYWNlJ1xuXG4gICAgICBpdCBcImpvaW5zIGxpbmVzIHdpdGhvdXQgdHJpbWluZyBsZWFkaW5nIHdoaXRlc3BhY2VcIiwgLT5cbiAgICAgICAgZW5zdXJlICdnIEonLFxuICAgICAgICAgIHRleHRDXzogXCJcIlwiXG4gICAgICAgICAgX18wfDEyX18zNDVcbiAgICAgICAgICBfXzY3OFxuICAgICAgICAgIF9fOWFiXFxuXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZSAnLicsXG4gICAgICAgICAgdGV4dENfOiBcIlwiXCJcbiAgICAgICAgICBfXzB8MTJfXzM0NV9fNjc4XG4gICAgICAgICAgX185YWJcXG5cbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgZW5zdXJlICd1IHUnLFxuICAgICAgICAgIHRleHRDXzogXCJcIlwiXG4gICAgICAgICAgX18wfDEyXG4gICAgICAgICAgX18zNDVcbiAgICAgICAgICBfXzY3OFxuICAgICAgICAgIF9fOWFiXFxuXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZSAnNCBnIEonLFxuICAgICAgICAgIHRleHRDXzogXCJcIlwiXG4gICAgICAgICAgX18wfDEyX18zNDVfXzY3OF9fOWFiXFxuXG4gICAgICAgICAgXCJcIlwiXG5cbiAgICBkZXNjcmliZSBcIkpvaW5CeUlucHV0XCIsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgIGF0b20ua2V5bWFwcy5hZGQgXCJ0ZXN0XCIsXG4gICAgICAgICAgJ2F0b20tdGV4dC1lZGl0b3IudmltLW1vZGUtcGx1czpub3QoLmluc2VydC1tb2RlKSc6XG4gICAgICAgICAgICAnZyBKJzogJ3ZpbS1tb2RlLXBsdXM6am9pbi1ieS1pbnB1dCdcblxuICAgICAgaXQgXCJqb2lucyBsaW5lcyBieSBjaGFyIGZyb20gdXNlciB3aXRoIHRyaW1pbmcgbGVhZGluZyB3aGl0ZXNwYWNlXCIsIC0+XG4gICAgICAgIGVuc3VyZVdhaXQgJ2cgSiA6IDogZW50ZXInLFxuICAgICAgICAgIHRleHRDXzogXCJcIlwiXG4gICAgICAgICAgX18wfDEyOjozNDVcbiAgICAgICAgICBfXzY3OFxuICAgICAgICAgIF9fOWFiXFxuXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZVdhaXQgJy4nLFxuICAgICAgICAgIHRleHRDXzogXCJcIlwiXG4gICAgICAgICAgX18wfDEyOjozNDU6OjY3OFxuICAgICAgICAgIF9fOWFiXFxuXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZVdhaXQgJ3UgdScsXG4gICAgICAgICAgdGV4dENfOiBcIlwiXCJcbiAgICAgICAgICBfXzB8MTJcbiAgICAgICAgICBfXzM0NVxuICAgICAgICAgIF9fNjc4XG4gICAgICAgICAgX185YWJcXG5cbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgZW5zdXJlV2FpdCAnNCBnIEogOiA6IGVudGVyJyxcbiAgICAgICAgICB0ZXh0Q186IFwiXCJcIlxuICAgICAgICAgIF9fMHwxMjo6MzQ1Ojo2Nzg6OjlhYlxcblxuICAgICAgICAgIFwiXCJcIlxuXG4gICAgICBpdCBcImtlZXAgbXVsdGktY3Vyc29ycyBvbiBjYW5jZWxcIiwgLT5cbiAgICAgICAgc2V0ICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEM6IFwiICAwfDEyXFxuICAzNDVcXG4gIDYhNzhcXG4gIDlhYlxcbiAgY3xkZVxcbiAgZmdoXFxuXCJcbiAgICAgICAgZW5zdXJlV2FpdCBcImcgSiA6IGVzY2FwZVwiLCB0ZXh0QzogXCIgIDB8MTJcXG4gIDM0NVxcbiAgNiE3OFxcbiAgOWFiXFxuICBjfGRlXFxuICBmZ2hcXG5cIlxuXG4gICAgZGVzY3JpYmUgXCJKb2luQnlJbnB1dFdpdGhLZWVwaW5nU3BhY2VcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgYXRvbS5rZXltYXBzLmFkZCBcInRlc3RcIixcbiAgICAgICAgICAnYXRvbS10ZXh0LWVkaXRvci52aW0tbW9kZS1wbHVzOm5vdCguaW5zZXJ0LW1vZGUpJzpcbiAgICAgICAgICAgICdnIEonOiAndmltLW1vZGUtcGx1czpqb2luLWJ5LWlucHV0LXdpdGgta2VlcGluZy1zcGFjZSdcblxuICAgICAgaXQgXCJqb2lucyBsaW5lcyBieSBjaGFyIGZyb20gdXNlciB3aXRob3V0IHRyaW1pbmcgbGVhZGluZyB3aGl0ZXNwYWNlXCIsIC0+XG4gICAgICAgIGVuc3VyZVdhaXQgJ2cgSiA6IDogZW50ZXInLFxuICAgICAgICAgIHRleHRDXzogXCJcIlwiXG4gICAgICAgICAgX18wfDEyOjpfXzM0NVxuICAgICAgICAgIF9fNjc4XG4gICAgICAgICAgX185YWJcXG5cbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgZW5zdXJlV2FpdCAnLicsXG4gICAgICAgICAgdGV4dENfOiBcIlwiXCJcbiAgICAgICAgICBfXzB8MTI6Ol9fMzQ1OjpfXzY3OFxuICAgICAgICAgIF9fOWFiXFxuXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZVdhaXQgJ3UgdScsXG4gICAgICAgICAgdGV4dENfOiBcIlwiXCJcbiAgICAgICAgICBfXzB8MTJcbiAgICAgICAgICBfXzM0NVxuICAgICAgICAgIF9fNjc4XG4gICAgICAgICAgX185YWJcXG5cbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgZW5zdXJlV2FpdCAnNCBnIEogOiA6IGVudGVyJyxcbiAgICAgICAgICB0ZXh0Q186IFwiXCJcIlxuICAgICAgICAgIF9fMHwxMjo6X18zNDU6Ol9fNjc4OjpfXzlhYlxcblxuICAgICAgICAgIFwiXCJcIlxuXG4gIGRlc2NyaWJlICdUb2dnbGVMaW5lQ29tbWVudHMnLCAtPlxuICAgIFtvbGRHcmFtbWFyLCBvcmlnaW5hbFRleHRdID0gW11cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgICAgYXRvbS5wYWNrYWdlcy5hY3RpdmF0ZVBhY2thZ2UoJ2xhbmd1YWdlLWNvZmZlZS1zY3JpcHQnKVxuXG4gICAgICBydW5zIC0+XG4gICAgICAgIG9sZEdyYW1tYXIgPSBlZGl0b3IuZ2V0R3JhbW1hcigpXG4gICAgICAgIGdyYW1tYXIgPSBhdG9tLmdyYW1tYXJzLmdyYW1tYXJGb3JTY29wZU5hbWUoJ3NvdXJjZS5jb2ZmZWUnKVxuICAgICAgICBlZGl0b3Iuc2V0R3JhbW1hcihncmFtbWFyKVxuICAgICAgICBvcmlnaW5hbFRleHQgPSBcIlwiXCJcbiAgICAgICAgICBjbGFzcyBCYXNlXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcjogKGFyZ3MpIC0+XG4gICAgICAgICAgICAgIHBpdm90ID0gaXRlbXMuc2hpZnQoKVxuICAgICAgICAgICAgICBsZWZ0ID0gW11cbiAgICAgICAgICAgICAgcmlnaHQgPSBbXVxuXG4gICAgICAgICAgY29uc29sZS5sb2cgXCJoZWxsb1wiXG4gICAgICAgIFwiXCJcIlxuICAgICAgICBzZXQgdGV4dDogb3JpZ2luYWxUZXh0XG5cbiAgICBhZnRlckVhY2ggLT5cbiAgICAgIGVkaXRvci5zZXRHcmFtbWFyKG9sZEdyYW1tYXIpXG5cbiAgICBpdCAndG9nZ2xlIGNvbW1lbnQgZm9yIHRleHRvYmplY3QgZm9yIGluZGVudCBhbmQgcmVwZWF0YWJsZScsIC0+XG4gICAgICBzZXQgY3Vyc29yOiBbMiwgMF1cbiAgICAgIGVuc3VyZSAnZyAvIGkgaScsXG4gICAgICAgIHRleHQ6IFwiXCJcIlxuICAgICAgICAgIGNsYXNzIEJhc2VcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yOiAoYXJncykgLT5cbiAgICAgICAgICAgICAgIyBwaXZvdCA9IGl0ZW1zLnNoaWZ0KClcbiAgICAgICAgICAgICAgIyBsZWZ0ID0gW11cbiAgICAgICAgICAgICAgIyByaWdodCA9IFtdXG5cbiAgICAgICAgICBjb25zb2xlLmxvZyBcImhlbGxvXCJcbiAgICAgICAgXCJcIlwiXG4gICAgICBlbnN1cmUgJy4nLCB0ZXh0OiBvcmlnaW5hbFRleHRcblxuICAgIGl0ICd0b2dnbGUgY29tbWVudCBmb3IgdGV4dG9iamVjdCBmb3IgcGFyYWdyYXBoIGFuZCByZXBlYXRhYmxlJywgLT5cbiAgICAgIHNldCBjdXJzb3I6IFsyLCAwXVxuICAgICAgZW5zdXJlICdnIC8gaSBwJyxcbiAgICAgICAgdGV4dDogXCJcIlwiXG4gICAgICAgICAgIyBjbGFzcyBCYXNlXG4gICAgICAgICAgIyAgIGNvbnN0cnVjdG9yOiAoYXJncykgLT5cbiAgICAgICAgICAjICAgICBwaXZvdCA9IGl0ZW1zLnNoaWZ0KClcbiAgICAgICAgICAjICAgICBsZWZ0ID0gW11cbiAgICAgICAgICAjICAgICByaWdodCA9IFtdXG5cbiAgICAgICAgICBjb25zb2xlLmxvZyBcImhlbGxvXCJcbiAgICAgICAgXCJcIlwiXG5cbiAgICAgIGVuc3VyZSAnLicsIHRleHQ6IG9yaWdpbmFsVGV4dFxuXG4gIGRlc2NyaWJlIFwiU3BsaXRTdHJpbmcsIFNwbGl0U3RyaW5nV2l0aEtlZXBpbmdTcGxpdHRlclwiLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIGF0b20ua2V5bWFwcy5hZGQgXCJ0ZXN0XCIsXG4gICAgICAgICdhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXM6bm90KC5pbnNlcnQtbW9kZSknOlxuICAgICAgICAgICdnIC8nOiAndmltLW1vZGUtcGx1czpzcGxpdC1zdHJpbmcnXG4gICAgICAgICAgJ2cgPyc6ICd2aW0tbW9kZS1wbHVzOnNwbGl0LXN0cmluZy13aXRoLWtlZXBpbmctc3BsaXR0ZXInXG4gICAgICBzZXRcbiAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICB8YTpiOmNcbiAgICAgICAgZDplOmZcXG5cbiAgICAgICAgXCJcIlwiXG4gICAgZGVzY3JpYmUgXCJTcGxpdFN0cmluZ1wiLCAtPlxuICAgICAgaXQgXCJzcGxpdCBzdHJpbmcgaW50byBsaW5lc1wiLCAtPlxuICAgICAgICBlbnN1cmVXYWl0IFwiZyAvIDogZW50ZXJcIixcbiAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgfGFcbiAgICAgICAgICBiXG4gICAgICAgICAgY1xuICAgICAgICAgIGQ6ZTpmXFxuXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAgIGVuc3VyZVdhaXQgXCJHIC5cIixcbiAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgYVxuICAgICAgICAgIGJcbiAgICAgICAgICBjXG4gICAgICAgICAgfGRcbiAgICAgICAgICBlXG4gICAgICAgICAgZlxcblxuICAgICAgICAgIFwiXCJcIlxuICAgICAgaXQgXCJbZnJvbSBub3JtYWxdIGtlZXAgbXVsdGktY3Vyc29ycyBvbiBjYW5jZWxcIiwgLT5cbiAgICAgICAgc2V0ICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENfOiBcIiAgMHwxMiAgMzQ1ICA2ITc4ICA5YWIgIGN8ZGUgIGZnaFwiXG4gICAgICAgIGVuc3VyZVdhaXQgXCJnIC8gOiBlc2NhcGVcIiwgdGV4dENfOiBcIiAgMHwxMiAgMzQ1ICA2ITc4ICA5YWIgIGN8ZGUgIGZnaFwiXG4gICAgICBpdCBcIltmcm9tIHZpc3VhbF0ga2VlcCBtdWx0aS1jdXJzb3JzIG9uIGNhbmNlbFwiLCAtPlxuICAgICAgICBzZXQgICAgICAgICAgICAgICAgICAgICAgdGV4dEM6IFwiICAwfDEyICAzNDUgIDYhNzggIDlhYiAgY3xkZSAgZmdoXCJcbiAgICAgICAgZW5zdXJlIFwidlwiLCAgICAgICAgICAgICAgdGV4dEM6IFwiICAwMXwyICAzNDUgIDY3ITggIDlhYiAgY2R8ZSAgZmdoXCIsIHNlbGVjdGVkVGV4dE9yZGVyZWQ6IFtcIjFcIiwgXCI3XCIsIFwiZFwiXSwgbW9kZTogW1widmlzdWFsXCIsIFwiY2hhcmFjdGVyd2lzZVwiXVxuICAgICAgICBlbnN1cmVXYWl0IFwiZyAvIGVzY2FwZVwiLCB0ZXh0QzogXCIgIDAxfDIgIDM0NSAgNjchOCAgOWFiICBjZHxlICBmZ2hcIiwgc2VsZWN0ZWRUZXh0T3JkZXJlZDogW1wiMVwiLCBcIjdcIiwgXCJkXCJdLCBtb2RlOiBbXCJ2aXN1YWxcIiwgXCJjaGFyYWN0ZXJ3aXNlXCJdXG5cbiAgICBkZXNjcmliZSBcIlNwbGl0U3RyaW5nV2l0aEtlZXBpbmdTcGxpdHRlclwiLCAtPlxuICAgICAgaXQgXCJzcGxpdCBzdHJpbmcgaW50byBsaW5lcyB3aXRob3V0IHJlbW92aW5nIHNwbGl0ZXIgY2hhclwiLCAtPlxuICAgICAgICBlbnN1cmVXYWl0IFwiZyA/IDogZW50ZXJcIixcbiAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgfGE6XG4gICAgICAgICAgYjpcbiAgICAgICAgICBjXG4gICAgICAgICAgZDplOmZcXG5cbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgZW5zdXJlV2FpdCBcIkcgLlwiLFxuICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICBhOlxuICAgICAgICAgIGI6XG4gICAgICAgICAgY1xuICAgICAgICAgIHxkOlxuICAgICAgICAgIGU6XG4gICAgICAgICAgZlxcblxuICAgICAgICAgIFwiXCJcIlxuICAgICAgaXQgXCJrZWVwIG11bHRpLWN1cnNvcnMgb24gY2FuY2VsXCIsIC0+XG4gICAgICAgIHNldCAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDXzogXCIgIDB8MTIgIDM0NSAgNiE3OCAgOWFiICBjfGRlICBmZ2hcIlxuICAgICAgICBlbnN1cmVXYWl0IFwiZyA/IDogZXNjYXBlXCIsIHRleHRDXzogXCIgIDB8MTIgIDM0NSAgNiE3OCAgOWFiICBjfGRlICBmZ2hcIlxuICAgICAgaXQgXCJbZnJvbSB2aXN1YWxdIGtlZXAgbXVsdGktY3Vyc29ycyBvbiBjYW5jZWxcIiwgLT5cbiAgICAgICAgc2V0ICAgICAgICAgICAgICAgICAgICAgIHRleHRDOiBcIiAgMHwxMiAgMzQ1ICA2ITc4ICA5YWIgIGN8ZGUgIGZnaFwiXG4gICAgICAgIGVuc3VyZSBcInZcIiwgICAgICAgICAgICAgIHRleHRDOiBcIiAgMDF8MiAgMzQ1ICA2NyE4ICA5YWIgIGNkfGUgIGZnaFwiLCBzZWxlY3RlZFRleHRPcmRlcmVkOiBbXCIxXCIsIFwiN1wiLCBcImRcIl0sIG1vZGU6IFtcInZpc3VhbFwiLCBcImNoYXJhY3Rlcndpc2VcIl1cbiAgICAgICAgZW5zdXJlV2FpdCBcImcgPyBlc2NhcGVcIiwgdGV4dEM6IFwiICAwMXwyICAzNDUgIDY3ITggIDlhYiAgY2R8ZSAgZmdoXCIsIHNlbGVjdGVkVGV4dE9yZGVyZWQ6IFtcIjFcIiwgXCI3XCIsIFwiZFwiXSwgbW9kZTogW1widmlzdWFsXCIsIFwiY2hhcmFjdGVyd2lzZVwiXVxuXG4gIGRlc2NyaWJlIFwiU3BsaXRBcmd1bWVudHMsIFNwbGl0QXJndW1lbnRzV2l0aFJlbW92ZVNlcGFyYXRvclwiLCAtPlxuICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgIGF0b20ua2V5bWFwcy5hZGQgXCJ0ZXN0XCIsXG4gICAgICAgICdhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXM6bm90KC5pbnNlcnQtbW9kZSknOlxuICAgICAgICAgICdnICwnOiAndmltLW1vZGUtcGx1czpzcGxpdC1hcmd1bWVudHMnXG4gICAgICAgICAgJ2cgISc6ICd2aW0tbW9kZS1wbHVzOnNwbGl0LWFyZ3VtZW50cy13aXRoLXJlbW92ZS1zZXBhcmF0b3InXG5cbiAgICAgIHdhaXRzRm9yUHJvbWlzZSAtPlxuICAgICAgICBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZSgnbGFuZ3VhZ2UtamF2YXNjcmlwdCcpXG4gICAgICBydW5zIC0+XG4gICAgICAgIHNldFxuICAgICAgICAgIGdyYW1tYXI6ICdzb3VyY2UuanMnXG4gICAgICAgICAgdGV4dDogXCJcIlwiXG4gICAgICAgICAgICBoZWxsbyA9ICgpID0+IHtcbiAgICAgICAgICAgICAge2YxLCBmMiwgZjN9ID0gcmVxdWlyZSgnaGVsbG8nKVxuICAgICAgICAgICAgICBmMShmMigxLCBcImEsIGIsIGNcIiksIDIsIChhcmcpID0+IGNvbnNvbGUubG9nKGFyZykpXG4gICAgICAgICAgICAgIHMgPSBgYWJjIGRlZiBoaWpgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcIlwiXCJcblxuICAgIGRlc2NyaWJlIFwiU3BsaXRBcmd1bWVudHNcIiwgLT5cbiAgICAgIGl0IFwic3BsaXQgYnkgY29tbW1hIHdpdGggYWRqdXN0IGluZGVudFwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMSwgM11cbiAgICAgICAgZW5zdXJlICdnICwgaSB7JyxcbiAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgICBoZWxsbyA9ICgpID0+IHtcbiAgICAgICAgICAgICAgfHtcbiAgICAgICAgICAgICAgICBmMSxcbiAgICAgICAgICAgICAgICBmMixcbiAgICAgICAgICAgICAgICBmM1xuICAgICAgICAgICAgICB9ID0gcmVxdWlyZSgnaGVsbG8nKVxuICAgICAgICAgICAgICBmMShmMigxLCBcImEsIGIsIGNcIiksIDIsIChhcmcpID0+IGNvbnNvbGUubG9nKGFyZykpXG4gICAgICAgICAgICAgIHMgPSBgYWJjIGRlZiBoaWpgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcIlwiXCJcbiAgICAgIGl0IFwic3BsaXQgYnkgY29tbW1hIHdpdGggYWRqdXN0IGluZGVudFwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMiwgNV1cbiAgICAgICAgZW5zdXJlICdnICwgaSAoJyxcbiAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgICBoZWxsbyA9ICgpID0+IHtcbiAgICAgICAgICAgICAge2YxLCBmMiwgZjN9ID0gcmVxdWlyZSgnaGVsbG8nKVxuICAgICAgICAgICAgICBmMXwoXG4gICAgICAgICAgICAgICAgZjIoMSwgXCJhLCBiLCBjXCIpLFxuICAgICAgICAgICAgICAgIDIsXG4gICAgICAgICAgICAgICAgKGFyZykgPT4gY29uc29sZS5sb2coYXJnKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIHMgPSBgYWJjIGRlZiBoaWpgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgZW5zdXJlICdqIHcnXG4gICAgICAgIGVuc3VyZSAnZyAsIGkgKCcsXG4gICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgICAgaGVsbG8gPSAoKSA9PiB7XG4gICAgICAgICAgICAgIHtmMSwgZjIsIGYzfSA9IHJlcXVpcmUoJ2hlbGxvJylcbiAgICAgICAgICAgICAgZjEoXG4gICAgICAgICAgICAgICAgZjJ8KFxuICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgIFwiYSwgYiwgY1wiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAyLFxuICAgICAgICAgICAgICAgIChhcmcpID0+IGNvbnNvbGUubG9nKGFyZylcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBzID0gYGFiYyBkZWYgaGlqYFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICBpdCBcInNwbGl0IGJ5IHdoaXRlLXNwYWNlIHdpdGggYWRqdXN0IGluZGVudFwiLCAtPlxuICAgICAgICBzZXQgY3Vyc29yOiBbMywgMTBdXG4gICAgICAgIGVuc3VyZSAnZyAsIGkgYCcsXG4gICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgICAgaGVsbG8gPSAoKSA9PiB7XG4gICAgICAgICAgICAgIHtmMSwgZjIsIGYzfSA9IHJlcXVpcmUoJ2hlbGxvJylcbiAgICAgICAgICAgICAgZjEoZjIoMSwgXCJhLCBiLCBjXCIpLCAyLCAoYXJnKSA9PiBjb25zb2xlLmxvZyhhcmcpKVxuICAgICAgICAgICAgICBzID0gfGBcbiAgICAgICAgICAgICAgICBhYmNcbiAgICAgICAgICAgICAgICBkZWZcbiAgICAgICAgICAgICAgICBoaWpcbiAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXCJcIlwiXG5cbiAgICBkZXNjcmliZSBcIlNwbGl0QnlBcmd1bWVudHNXaXRoUmVtb3ZlU2VwYXJhdG9yXCIsIC0+XG4gICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBpdCBcInJlbW92ZSBzcGxpdHRlciB3aGVuIHNwbGl0XCIsIC0+XG4gICAgICAgIHNldCBjdXJzb3I6IFsxLCAzXVxuICAgICAgICBlbnN1cmUgJ2cgISBpIHsnLFxuICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICBoZWxsbyA9ICgpID0+IHtcbiAgICAgICAgICAgIHx7XG4gICAgICAgICAgICAgIGYxXG4gICAgICAgICAgICAgIGYyXG4gICAgICAgICAgICAgIGYzXG4gICAgICAgICAgICB9ID0gcmVxdWlyZSgnaGVsbG8nKVxuICAgICAgICAgICAgZjEoZjIoMSwgXCJhLCBiLCBjXCIpLCAyLCAoYXJnKSA9PiBjb25zb2xlLmxvZyhhcmcpKVxuICAgICAgICAgICAgcyA9IGBhYmMgZGVmIGhpamBcbiAgICAgICAgICB9XG4gICAgICAgICAgXCJcIlwiXG5cbiAgZGVzY3JpYmUgXCJDaGFuZ2UgT3JkZXIgZmFpbWxpeTogUmV2ZXJzZSwgU29ydCwgU29ydENhc2VJbnNlbnNpdGl2ZWx5LCBTb3J0QnlOdW1iZXJcIiwgLT5cbiAgICBiZWZvcmVFYWNoIC0+XG4gICAgICBhdG9tLmtleW1hcHMuYWRkIFwidGVzdFwiLFxuICAgICAgICAnYXRvbS10ZXh0LWVkaXRvci52aW0tbW9kZS1wbHVzOm5vdCguaW5zZXJ0LW1vZGUpJzpcbiAgICAgICAgICAnZyByJzogJ3ZpbS1tb2RlLXBsdXM6cmV2ZXJzZSdcbiAgICAgICAgICAnZyBzJzogJ3ZpbS1tb2RlLXBsdXM6c29ydCdcbiAgICAgICAgICAnZyBTJzogJ3ZpbS1tb2RlLXBsdXM6c29ydC1ieS1udW1iZXInXG4gICAgZGVzY3JpYmUgXCJjaGFyYWN0ZXJ3aXNlIHRhcmdldFwiLCAtPlxuICAgICAgZGVzY3JpYmUgXCJSZXZlcnNlXCIsIC0+XG4gICAgICAgIGl0IFwiW2NvbW1hIHNlcGFyYXRlZF0gcmV2ZXJzZSB0ZXh0XCIsIC0+XG4gICAgICAgICAgc2V0IHRleHRDOiBcIiAgICggZG9nLCBjYXx0LCBmaXNoLCByYWJiaXQsIGR1Y2ssIGdvcGhlciwgc3F1aWQgKVwiXG4gICAgICAgICAgZW5zdXJlICdnIHIgaSAoJywgdGV4dENfOiBcIiAgICh8IHNxdWlkLCBnb3BoZXIsIGR1Y2ssIHJhYmJpdCwgZmlzaCwgY2F0LCBkb2cgKVwiXG4gICAgICAgIGl0IFwiW2NvbW1hIHNwYXJhdGVkXSByZXZlcnNlIHRleHRcIiwgLT5cbiAgICAgICAgICBzZXQgdGV4dEM6IFwiICAgKCAnZG9nIGNhfHQnLCAnZmlzaCByYWJiaXQnLCAnZHVjayBnb3BoZXIgc3F1aWQnIClcIlxuICAgICAgICAgIGVuc3VyZSAnZyByIGkgKCcsIHRleHRDXzogXCIgICAofCAnZHVjayBnb3BoZXIgc3F1aWQnLCAnZmlzaCByYWJiaXQnLCAnZG9nIGNhdCcgKVwiXG4gICAgICAgIGl0IFwiW3NwYWNlIHNwYXJhdGVkXSByZXZlcnNlIHRleHRcIiwgLT5cbiAgICAgICAgICBzZXQgdGV4dEM6IFwiICAgKCBkb2cgY2F8dCBmaXNoIHJhYmJpdCBkdWNrIGdvcGhlciBzcXVpZCApXCJcbiAgICAgICAgICBlbnN1cmUgJ2cgciBpICgnLCB0ZXh0Q186IFwiICAgKHwgc3F1aWQgZ29waGVyIGR1Y2sgcmFiYml0IGZpc2ggY2F0IGRvZyApXCJcbiAgICAgICAgaXQgXCJbY29tbWEgc3BhcmF0ZWQgbXVsdGktbGluZV0gcmV2ZXJzZSB0ZXh0XCIsIC0+XG4gICAgICAgICAgc2V0IHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgfDEsIDIsIDMsIDQsXG4gICAgICAgICAgICAgIDUsIDYsXG4gICAgICAgICAgICAgIDcsXG4gICAgICAgICAgICAgIDgsIDlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICAgIGVuc3VyZSAnZyByIGkgeycsXG4gICAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB8ICA5LCA4LCA3LCA2LFxuICAgICAgICAgICAgICA1LCA0LFxuICAgICAgICAgICAgICAzLFxuICAgICAgICAgICAgICAyLCAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgaXQgXCJbY29tbWEgc3BhcmF0ZWQgbXVsdGktbGluZV0ga2VlcCBjb21tYSBmb2xsb3dlZCB0byBsYXN0IGVudHJ5XCIsIC0+XG4gICAgICAgICAgc2V0IHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgfDEsIDIsIDMsIDQsXG4gICAgICAgICAgICAgIDUsIDYsXG4gICAgICAgICAgICBdXG4gICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgICBlbnN1cmUgJ2cgciBpIFsnLFxuICAgICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgfCAgNiwgNSwgNCwgMyxcbiAgICAgICAgICAgICAgMiwgMSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgICBpdCBcIltjb21tYSBzcGFyYXRlZCBtdWx0aS1saW5lXSBhd2FyZSBvZiBuZXh0ZWQgcGFpciBhbmQgcXVvdGVzIGFuZCBlc2NhcGVkIHF1b3RlXCIsIC0+XG4gICAgICAgICAgc2V0IHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgfFwiKGEsIGIsIGMpXCIsIFwiWyggZCBlIGZcIiwgdGVzdChnLCBoLCBpKSxcbiAgICAgICAgICAgICAgXCJcXFxcXCJqLCBrLCBsXCIsXG4gICAgICAgICAgICAgICdcXFxcJ20sIG4nLCB0ZXN0KG8sIHApLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgICAgZW5zdXJlICdnIHIgaSAoJyxcbiAgICAgICAgICAgIHRleHRDOiBcIlwiXCJcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgIHwgIHRlc3QobywgcCksICdcXFxcJ20sIG4nLCBcIlxcXFxcImosIGssIGxcIixcbiAgICAgICAgICAgICAgdGVzdChnLCBoLCBpKSxcbiAgICAgICAgICAgICAgXCJbKCBkIGUgZlwiLCBcIihhLCBiLCBjKVwiLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICAgIGl0IFwiW3NwYWNlIHNwYXJhdGVkIG11bHRpLWxpbmVdIGF3YXJlIG9mIG5leHRlZCBwYWlyIGFuZCBxdW90ZXMgYW5kIGVzY2FwZWQgcXVvdGVcIiwgLT5cbiAgICAgICAgICBzZXQgdGV4dENfOiBcIlwiXCJcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgfFwiKGEsIGIsIGMpXCIgXCJbKCBkIGUgZlwiICAgICAgdGVzdChnLCBoLCBpKVxuICAgICAgICAgICAgICBcIlxcXFxcImosIGssIGxcIl9fX1xuICAgICAgICAgICAgICAnXFxcXCdtLCBuJyAgICB0ZXN0KG8sIHApXG4gICAgICAgICAgICApXG4gICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgICBlbnN1cmUgJ2cgciBpICgnLFxuICAgICAgICAgICAgdGV4dENfOiBcIlwiXCJcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgIHwgIHRlc3QobywgcCkgJ1xcXFwnbSwgbicgICAgICBcIlxcXFxcImosIGssIGxcIlxuICAgICAgICAgICAgICB0ZXN0KGcsIGgsIGkpX19fXG4gICAgICAgICAgICAgIFwiWyggZCBlIGZcIiAgICBcIihhLCBiLCBjKVwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICBcIlwiXCJcbiAgICAgICAgaXQgXCJbdGV4dCBub3Qgc2VwYXJhdGVkXSByZXZlcnNlIHRleHRcIiwgLT5cbiAgICAgICAgICBzZXQgdGV4dENfOiBcIiAxMnwzNDUgXCJcbiAgICAgICAgICBlbnN1cmUgJ2cgciBpIHcnLCB0ZXh0Q186IFwiIHw1NDMyMSBcIlxuICAgICAgZGVzY3JpYmUgXCJTb3J0XCIsIC0+XG4gICAgICAgIGl0IFwiW2NvbW1hIHNlcGFyYXRlZF0gc29ydCB0ZXh0XCIsIC0+XG4gICAgICAgICAgc2V0IHRleHRDOiBcIiAgICggZG9nLCBjYXx0LCBmaXNoLCByYWJiaXQsIGR1Y2ssIGdvcGhlciwgc3F1aWQgKVwiXG4gICAgICAgICAgZW5zdXJlICdnIHMgaSAoJywgdGV4dEM6IFwiICAgKHwgY2F0LCBkb2csIGR1Y2ssIGZpc2gsIGdvcGhlciwgcmFiYml0LCBzcXVpZCApXCJcbiAgICAgICAgaXQgXCJbdGV4dCBub3Qgc2VwYXJhdGVkXSBzb3J0IHRleHRcIiwgLT5cbiAgICAgICAgICBzZXQgdGV4dENfOiBcIiBmZXxkY2JhIFwiXG4gICAgICAgICAgZW5zdXJlICdnIHMgaSB3JywgdGV4dENfOiBcIiB8YWJjZGVmIFwiXG4gICAgICBkZXNjcmliZSBcIlNvcnRCeU51bWJlclwiLCAtPlxuICAgICAgICBpdCBcIltjb21tYSBzZXBhcmF0ZWRdIHNvcnQgYnkgbnVtYmVyXCIsIC0+XG4gICAgICAgICAgc2V0IHRleHRDXzogXCJfX18oOSwgMSwgfDEwLCA1KVwiXG4gICAgICAgICAgZW5zdXJlICdnIFMgaSAoJywgdGV4dENfOiBcIl9fXyh8MSwgNSwgOSwgMTApXCJcbiAgICAgICAgaXQgXCJbdGV4dCBub3Qgc2VwYXJhdGVkXSBzb3J0IGJ5IG51bWJlclwiLCAtPlxuICAgICAgICAgIHNldCB0ZXh0Q186IFwiIDkxfDN6YTg3IFwiXG4gICAgICAgICAgZW5zdXJlICdnIHMgaSB3JywgdGV4dENfOiBcIiB8MTM3ODlheiBcIlxuXG4gICAgZGVzY3JpYmUgXCJsaW5ld2lzZSB0YXJnZXRcIiwgLT5cbiAgICAgIGJlZm9yZUVhY2ggLT5cbiAgICAgICAgc2V0XG4gICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgIHx6XG5cbiAgICAgICAgICAxMGFcbiAgICAgICAgICBiXG4gICAgICAgICAgYVxuXG4gICAgICAgICAgNVxuICAgICAgICAgIDFcXG5cbiAgICAgICAgICBcIlwiXCJcbiAgICAgIGRlc2NyaWJlIFwiUmV2ZXJzZVwiLCAtPlxuICAgICAgICBpdCBcInJldmVyc2Ugcm93c1wiLCAtPlxuICAgICAgICAgIGVuc3VyZSAnZyByIEcnLFxuICAgICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgICAgfDFcbiAgICAgICAgICAgIDVcblxuICAgICAgICAgICAgYVxuICAgICAgICAgICAgYlxuICAgICAgICAgICAgMTBhXG5cbiAgICAgICAgICAgIHpcXG5cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgZGVzY3JpYmUgXCJTb3J0XCIsIC0+XG4gICAgICAgIGl0IFwic29ydCByb3dzXCIsIC0+XG4gICAgICAgICAgZW5zdXJlICdnIHMgRycsXG4gICAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgICB8XG5cbiAgICAgICAgICAgIDFcbiAgICAgICAgICAgIDEwYVxuICAgICAgICAgICAgNVxuICAgICAgICAgICAgYVxuICAgICAgICAgICAgYlxuICAgICAgICAgICAgelxcblxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICBkZXNjcmliZSBcIlNvcnRCeU51bWJlclwiLCAtPlxuICAgICAgICBpdCBcInNvcnQgcm93cyBudW1lcmljYWxseVwiLCAtPlxuICAgICAgICAgIGVuc3VyZSBcImcgUyBHXCIsXG4gICAgICAgICAgICB0ZXh0QzogXCJcIlwiXG4gICAgICAgICAgICB8MVxuICAgICAgICAgICAgNVxuICAgICAgICAgICAgMTBhXG4gICAgICAgICAgICB6XG5cbiAgICAgICAgICAgIGJcbiAgICAgICAgICAgIGFcbiAgICAgICAgICAgIFxcblxuICAgICAgICAgICAgXCJcIlwiXG4gICAgICBkZXNjcmliZSBcIlNvcnRDYXNlSW5zZW5zaXRpdmVseVwiLCAtPlxuICAgICAgICBiZWZvcmVFYWNoIC0+XG4gICAgICAgICAgYXRvbS5rZXltYXBzLmFkZCBcInRlc3RcIixcbiAgICAgICAgICAgICdhdG9tLXRleHQtZWRpdG9yLnZpbS1tb2RlLXBsdXM6bm90KC5pbnNlcnQtbW9kZSknOlxuICAgICAgICAgICAgICAnZyBzJzogJ3ZpbS1tb2RlLXBsdXM6c29ydC1jYXNlLWluc2Vuc2l0aXZlbHknXG4gICAgICAgIGl0IFwiU29ydCByb3dzIGNhc2UtaW5zZW5zaXRpdmVseVwiLCAtPlxuICAgICAgICAgIHNldFxuICAgICAgICAgICAgdGV4dEM6IFwiXCJcIlxuICAgICAgICAgICAgfGFwcGxlXG4gICAgICAgICAgICBCZWVmXG4gICAgICAgICAgICBBUFBMRVxuICAgICAgICAgICAgRE9HXG4gICAgICAgICAgICBiZWVmXG4gICAgICAgICAgICBBcHBsZVxuICAgICAgICAgICAgQkVFRlxuICAgICAgICAgICAgRG9nXG4gICAgICAgICAgICBkb2dcXG5cbiAgICAgICAgICAgIFwiXCJcIlxuXG4gICAgICAgICAgZW5zdXJlIFwiZyBzIEdcIixcbiAgICAgICAgICAgIHRleHQ6IFwiXCJcIlxuICAgICAgICAgICAgYXBwbGVcbiAgICAgICAgICAgIEFwcGxlXG4gICAgICAgICAgICBBUFBMRVxuICAgICAgICAgICAgYmVlZlxuICAgICAgICAgICAgQmVlZlxuICAgICAgICAgICAgQkVFRlxuICAgICAgICAgICAgZG9nXG4gICAgICAgICAgICBEb2dcbiAgICAgICAgICAgIERPR1xcblxuICAgICAgICAgICAgXCJcIlwiXG5cbiAgZGVzY3JpYmUgXCJOdW1iZXJpbmdMaW5lc1wiLCAtPlxuICAgIGVuc3VyZU51bWJlcmluZyA9IChhcmdzLi4uKSAtPlxuICAgICAgZGlzcGF0Y2goZWRpdG9yLmVsZW1lbnQsICd2aW0tbW9kZS1wbHVzOm51bWJlcmluZy1saW5lcycpXG4gICAgICBlbnN1cmUgYXJncy4uLlxuXG4gICAgYmVmb3JlRWFjaCAtPiBzZXQgdGV4dEM6IFwifGFcXG5iXFxuY1xcblxcblwiXG4gICAgaXQgXCJudW1iZXJpbmcgYnkgbW90aW9uXCIsIC0+ICAgICBlbnN1cmVOdW1iZXJpbmcgXCJqXCIsIHRleHRDOiBcInwxOiBhXFxuMjogYlxcbmNcXG5cXG5cIlxuICAgIGl0IFwibnVtYmVyaW5nIGJ5IHRleHQtb2JqZWN0XCIsIC0+IGVuc3VyZU51bWJlcmluZyBcInBcIiwgdGV4dEM6IFwifDE6IGFcXG4yOiBiXFxuMzogY1xcblxcblwiXG5cbiAgZGVzY3JpYmUgXCJEdXBsaWNhdGVXaXRoQ29tbWVudE91dE9yaWdpbmFsXCIsIC0+XG4gICAgYmVmb3JlRWFjaCAtPlxuICAgICAgc2V0XG4gICAgICAgIHRleHRDOiBcIlwiXCJcblxuICAgICAgICAxOiB8UGVuXG4gICAgICAgIDI6IFBpbmVhcHBsZVxuXG4gICAgICAgIDQ6IEFwcGxlXG4gICAgICAgIDU6IFBlblxcblxuICAgICAgICBcIlwiXCJcblxuICAgIGl0IFwiZHVwLWFuZC1jb21tZW50b3V0XCIsIC0+XG4gICAgICB3YWl0c0ZvclByb21pc2UgLT5cbiAgICAgICAgYXRvbS5wYWNrYWdlcy5hY3RpdmF0ZVBhY2thZ2UoJ2xhbmd1YWdlLWphdmFzY3JpcHQnKS50aGVuIC0+XG4gICAgICAgICAgc2V0IGdyYW1tYXI6IFwic291cmNlLmpzXCJcbiAgICAgICAgICBkaXNwYXRjaChlZGl0b3IuZWxlbWVudCwgJ3ZpbS1tb2RlLXBsdXM6ZHVwbGljYXRlLXdpdGgtY29tbWVudC1vdXQtb3JpZ2luYWwnKVxuICAgICAgICAgIGVuc3VyZSBcImkgcFwiLFxuICAgICAgICAgICAgdGV4dEM6IFwiXCJcIlxuXG4gICAgICAgICAgICAvLyAxOiBQZW5cbiAgICAgICAgICAgIC8vIDI6IFBpbmVhcHBsZVxuICAgICAgICAgICAgMTogfFBlblxuICAgICAgICAgICAgMjogUGluZWFwcGxlXG5cbiAgICAgICAgICAgIDQ6IEFwcGxlXG4gICAgICAgICAgICA1OiBQZW5cXG5cbiAgICAgICAgICAgIFwiXCJcIlxuICAgICAgcnVucyAtPlxuICAgICAgICBlbnN1cmUgXCIuXCIsXG4gICAgICAgICAgdGV4dEM6IFwiXCJcIlxuXG4gICAgICAgICAgLy8gLy8gMTogUGVuXG4gICAgICAgICAgLy8gLy8gMjogUGluZWFwcGxlXG4gICAgICAgICAgLy8gMTogUGVuXG4gICAgICAgICAgLy8gMjogUGluZWFwcGxlXG4gICAgICAgICAgLy8gMTogUGVuXG4gICAgICAgICAgLy8gMjogUGluZWFwcGxlXG4gICAgICAgICAgMTogfFBlblxuICAgICAgICAgIDI6IFBpbmVhcHBsZVxuXG4gICAgICAgICAgNDogQXBwbGVcbiAgICAgICAgICA1OiBQZW5cXG5cbiAgICAgICAgICBcIlwiXCJcbiAgICBpdCBcImR1cC1hbmQtY29tbWVudG91dFwiLCAtPlxuICAgICAgd2FpdHNGb3JQcm9taXNlIC0+XG4gICAgICAgIGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCdsYW5ndWFnZS1ydWJ5JykudGhlbiAtPlxuICAgICAgICAgIHNldCBncmFtbWFyOiBcInNvdXJjZS5ydWJ5XCJcbiAgICAgICAgICBkaXNwYXRjaChlZGl0b3IuZWxlbWVudCwgJ3ZpbS1tb2RlLXBsdXM6ZHVwbGljYXRlLXdpdGgtY29tbWVudC1vdXQtb3JpZ2luYWwnKVxuICAgICAgICAgIGVuc3VyZSBcImkgcFwiLFxuICAgICAgICAgICAgdGV4dEM6IFwiXCJcIlxuXG4gICAgICAgICAgICAjIDE6IFBlblxuICAgICAgICAgICAgIyAyOiBQaW5lYXBwbGVcbiAgICAgICAgICAgIDE6IHxQZW5cbiAgICAgICAgICAgIDI6IFBpbmVhcHBsZVxuXG4gICAgICAgICAgICA0OiBBcHBsZVxuICAgICAgICAgICAgNTogUGVuXFxuXG4gICAgICAgICAgICBcIlwiXCJcbiAgICAgIHJ1bnMgLT5cbiAgICAgICAgZW5zdXJlIFwiLlwiLFxuICAgICAgICAgIHRleHRDOiBcIlwiXCJcblxuICAgICAgICAgICMgIyAxOiBQZW5cbiAgICAgICAgICAjICMgMjogUGluZWFwcGxlXG4gICAgICAgICAgIyAxOiBQZW5cbiAgICAgICAgICAjIDI6IFBpbmVhcHBsZVxuICAgICAgICAgICMgMTogUGVuXG4gICAgICAgICAgIyAyOiBQaW5lYXBwbGVcbiAgICAgICAgICAxOiB8UGVuXG4gICAgICAgICAgMjogUGluZWFwcGxlXG5cbiAgICAgICAgICA0OiBBcHBsZVxuICAgICAgICAgIDU6IFBlblxcblxuICAgICAgICAgIFwiXCJcIlxuIl19
