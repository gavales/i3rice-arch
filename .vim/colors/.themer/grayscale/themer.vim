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
hi Normal           guifg=#282A36 guibg=#fafafa
hi Title            guifg=#282A36 guibg=#fafafa gui=bold
hi LineNr           guifg=#414458 guibg=#fafafa gui=none
hi CursorLineNr     guifg=#414458 guibg=#e6e6e6 gui=bold
hi SpecialKey       guifg=#e6e6e6 guibg=#fafafa
hi ModeMsg          guifg=#fafafa guibg=#414458 gui=bold
hi Cursor           guifg=#fafafa guibg=#FF4971
hi ColorColumn                    guibg=#e6e6e6 gui=none
hi CursorLine                     guibg=#e6e6e6 gui=none
hi Visual           guifg=#282A36 guibg=#9d9fa9
hi VisualNOS        guifg=#282A36 guibg=#9d9fa9

hi Type             guifg=#282A36 guibg=#fafafa gui=bold
hi Identifier       guifg=#FF8037 guibg=#fafafa gui=italic
hi Comment          guifg=#9d9fa9 guibg=#fafafa gui=italic
hi Folded           guifg=#414458 guibg=#fafafa gui=italic
hi FoldColumn       guifg=#fafafa guibg=#fafafa gui=italic
hi Constant         guifg=#282A36 guibg=#fafafa gui=italic
hi Special          guifg=#282A36 guibg=#fafafa gui=bold
hi Statement        guifg=#282A36 guibg=#fafafa gui=bold
hi PreProc          guifg=#414458 guibg=#fafafa gui=bold
hi MatchParen       guifg=#FF8037 guibg=#fafafa gui=bold
hi Search           guifg=#fafafa guibg=#FF8037 gui=none
hi Error            guifg=#FF4971 guibg=#fafafa gui=none
hi EndOfBuffer      guifg=#fafafa guibg=#fafafa gui=none

hi SpellBad         guifg=#FF4971 guibg=#fafafa gui=underline,bold
hi SpellCap         guifg=#414458 guibg=#fafafa gui=underline,bold
hi SpellRare        guifg=#B043D1 guibg=#fafafa gui=underline,bold
hi SpellLocal       guifg=#3FDCEE guibg=#fafafa gui=underline,bold

hi StatusLine       guifg=#fafafa guibg=#414458
hi StatusLineNC     guifg=#fafafa guibg=#414458
hi StatusLineTerm   guifg=#fafafa guibg=#414458
hi StatusLineTermNC guifg=#fafafa guibg=#414458
hi ToolbarLine      guifg=#fafafa guibg=#414458
hi ToolbarButton    guifg=#fafafa guibg=#414458

hi Pmenu            guifg=#414458 guibg=#282A36 gui=none
hi PmenuSel         guifg=#fafafa guibg=#414458 gui=none
hi PmenuSbar        guifg=#414458 guibg=#fafafa gui=none
hi PmenuThumb       guifg=#18E3C8 guibg=#18E3C8 gui=none
hi TabLine          guifg=#414458 guibg=#fafafa gui=none
hi TabLineSel       guifg=#fafafa guibg=#414458 gui=none
hi TabLineFill      guifg=#414458 guibg=#fafafa gui=none
hi TabLine          guifg=#414458 guibg=#9d9fa9 gui=none
hi TabLineSel       guifg=#282A36 guibg=#fafafa gui=none
hi TabLineFill      guifg=#414458 guibg=#9d9fa9 gui=none

hi usrStatus        guifg=#282A36 guibg=#e6e6e6
hi usrgry           guifg=#9d9fa9 guibg=#e6e6e6 gui=none
hi usrblu           guifg=#fafafa guibg=#9d9fa9 gui=none
hi usrred           guifg=#fafafa guibg=#fca1b5 gui=none
hi usrylw           guifg=#fafafa guibg=#fcbd98 gui=none
hi usrgrn           guifg=#fafafa guibg=#89eee1 gui=none
hi usrgnt           guifg=#fafafa guibg=#d59ee5 gui=none
