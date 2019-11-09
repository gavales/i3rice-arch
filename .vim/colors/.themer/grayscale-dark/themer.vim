" Vim color file
" Converted from Textmate theme Brogrammer using Coloration v0.4.0 (http://github.com/sickill/coloration)

set background=dark
highlight clear

if exists("syntax_on")
  syntax reset
endif

let g:colors_name = "themer"

" ━  CTERM
hi Normal           ctermfg=white    ctermbg=none
hi Title            ctermfg=white    ctermbg=none     cterm=bold
hi LineNr           ctermfg=blue     ctermbg=black    cterm=none
hi CursorLineNr     ctermfg=blue     ctermbg=DarkGray cterm=bold
hi SpecialKey       ctermfg=DarkGray ctermbg=none
hi ModeMsg          ctermfg=black    ctermbg=blue     cterm=bold
hi Cursor           ctermfg=black    ctermbg=red
hi ColorColumn                       ctermbg=DarkGray cterm=none
hi CursorLine                        ctermbg=DarkGray cterm=none
hi Visual           ctermfg=white    ctermbg=Gray
hi VisualNOS        ctermfg=white    ctermbg=Gray

hi Type             ctermfg=white    ctermbg=black    cterm=bold
hi Identifier       ctermfg=yellow   ctermbg=black    cterm=italic
hi Comment          ctermfg=Gray     ctermbg=black    cterm=italic
hi Folded           ctermfg=blue     ctermbg=black    cterm=italic
hi FoldColumn       ctermfg=black    ctermbg=black    cterm=italic
hi Constant         ctermfg=white    ctermbg=black    cterm=italic
hi Special          ctermfg=white    ctermbg=black    cterm=bold
hi Statement        ctermfg=white    ctermbg=black    cterm=bold
hi PreProc          ctermfg=blue     ctermbg=black    cterm=bold
hi MatchParen       ctermfg=yellow   ctermbg=black    cterm=bold
hi Search           ctermfg=black    ctermbg=yellow   cterm=none
hi Error            ctermfg=red      ctermbg=black    cterm=none
hi EndOfBuffer      ctermfg=black    ctermbg=black    cterm=none

hi SpellBad         ctermfg=red      ctermbg=none     cterm=underline,bold
hi SpellCap         ctermfg=blue     ctermbg=none     cterm=underline,bold
hi SpellRare        ctermfg=magenta  ctermbg=none     cterm=underline,bold
hi SpellLocal       ctermfg=cyan     ctermbg=none     cterm=underline,bold

hi StatusLine       ctermfg=black    ctermbg=blue
hi StatusLineNC     ctermfg=black    ctermbg=blue
hi StatusLineTerm   ctermfg=black    ctermbg=blue
hi StatusLineTermNC ctermfg=black    ctermbg=blue
hi ToolbarLine      ctermfg=black    ctermbg=blue
hi ToolbarButton    ctermfg=black    ctermbg=blue

hi Pmenu            ctermfg=blue     ctermbg=white    cterm=none
hi PmenuSel         ctermfg=black    ctermbg=blue     cterm=none
hi PmenuSbar        ctermfg=blue     ctermbg=black    cterm=none
hi PmenuThumb       ctermfg=green    ctermbg=green    cterm=none
hi TabLine          ctermfg=blue     ctermbg=Gray     cterm=none
hi TabLineSel       ctermfg=white    ctermbg=black    cterm=none
hi TabLineFill      ctermfg=blue     ctermbg=Gray     cterm=none

hi usrStatus        ctermfg=white    ctermbg=DarkGray
hi usrred           ctermfg=black    ctermbg=red      cterm=none
hi usrylw           ctermfg=black    ctermbg=yellow   cterm=none
hi usrgrn           ctermfg=black    ctermbg=green    cterm=none
hi usrgry           ctermfg=Gray     ctermbg=Darkgray cterm=none
hi usrblu           ctermfg=black    ctermbg=blue     cterm=none
hi usrgnt           ctermfg=black    ctermbg=magenta  cterm=none

" ━  GUI
hi Normal           guifg=#fafafa guibg=#282A36
hi Title            guifg=#fafafa guibg=#282A36 gui=bold
hi LineNr           guifg=#414458 guibg=#282A36 gui=none
hi CursorLineNr     guifg=#414458 guibg=#3c3e4a gui=bold
hi SpecialKey       guifg=#3c3e4a guibg=#282A36
hi ModeMsg          guifg=#282A36 guibg=#414458 gui=bold
hi Cursor           guifg=#282A36 guibg=#FF4971
hi ColorColumn                    guibg=#3c3e4a gui=none
hi CursorLine                     guibg=#3c3e4a gui=none
hi Visual           guifg=#fafafa guibg=#343747
hi VisualNOS        guifg=#fafafa guibg=#343747

hi Type             guifg=#fafafa guibg=#282A36 gui=bold
hi Identifier       guifg=#FF8037 guibg=#282A36 gui=italic
hi Comment          guifg=#343747 guibg=#282A36 gui=italic
hi Folded           guifg=#414458 guibg=#282A36 gui=italic
hi FoldColumn       guifg=#282A36 guibg=#282A36 gui=italic
hi Constant         guifg=#fafafa guibg=#282A36 gui=italic
hi Special          guifg=#fafafa guibg=#282A36 gui=bold
hi Statement        guifg=#fafafa guibg=#282A36 gui=bold
hi PreProc          guifg=#414458 guibg=#282A36 gui=bold
hi MatchParen       guifg=#FF8037 guibg=#282A36 gui=bold
hi Search           guifg=#282A36 guibg=#FF8037 gui=none
hi Error            guifg=#FF4971 guibg=#282A36 gui=none
hi EndOfBuffer      guifg=#282A36 guibg=#282A36 gui=none

hi SpellBad         guifg=#FF4971 guibg=#282A36 gui=underline,bold
hi SpellCap         guifg=#414458 guibg=#282A36 gui=underline,bold
hi SpellRare        guifg=#B043D1 guibg=#282A36 gui=underline,bold
hi SpellLocal       guifg=#3FDCEE guibg=#282A36 gui=underline,bold

hi StatusLine       guifg=#282A36 guibg=#414458
hi StatusLineNC     guifg=#282A36 guibg=#414458
hi StatusLineTerm   guifg=#282A36 guibg=#414458
hi StatusLineTermNC guifg=#282A36 guibg=#414458
hi ToolbarLine      guifg=#282A36 guibg=#414458
hi ToolbarButton    guifg=#282A36 guibg=#414458

hi Pmenu            guifg=#414458 guibg=#fafafa gui=none
hi PmenuSel         guifg=#282A36 guibg=#414458 gui=none
hi PmenuSbar        guifg=#414458 guibg=#282A36 gui=none
hi PmenuThumb       guifg=#18E3C8 guibg=#18E3C8 gui=none
hi TabLine          guifg=#414458 guibg=#282A36 gui=none
hi TabLineSel       guifg=#282A36 guibg=#414458 gui=none
hi TabLineFill      guifg=#414458 guibg=#282A36 gui=none
hi TabLine          guifg=#414458 guibg=#343747 gui=none
hi TabLineSel       guifg=#fafafa guibg=#282A36 gui=none
hi TabLineFill      guifg=#414458 guibg=#343747 gui=none

hi usrStatus        guifg=#fafafa guibg=#3c3e4a
hi usrgry           guifg=#343747 guibg=#3c3e4a gui=none
hi usrblu           guifg=#282A36 guibg=#343747 gui=none
hi usrred           guifg=#282A36 guibg=#933953 gui=none
hi usrylw           guifg=#282A36 guibg=#935536 gui=none
hi usrgrn           guifg=#282A36 guibg=#20867f gui=none
hi usrgnt           guifg=#282A36 guibg=#6c3683 gui=none
