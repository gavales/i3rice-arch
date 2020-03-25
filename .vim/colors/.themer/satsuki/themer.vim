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

hi SpellBad         ctermfg=red      ctermbg=none     cterm=undercurl,bold
hi SpellCap         ctermfg=blue     ctermbg=none     cterm=undercurl,bold
hi SpellRare        ctermfg=magenta  ctermbg=none     cterm=undercurl,bold
hi SpellLocal       ctermfg=cyan     ctermbg=none     cterm=undercurl,bold

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
hi Normal           guifg=#383436 guibg=#fbf4f1
hi Title            guifg=#383436 guibg=#fbf4f1 gui=bold
hi LineNr           guifg=#df8578 guibg=#fbf4f1 gui=none
hi CursorLineNr     guifg=#df8578 guibg=#e7e0dd gui=bold
hi SpecialKey       guifg=#e7e0dd guibg=#fbf4f1
hi ModeMsg          guifg=#fbf4f1 guibg=#df8578 gui=bold
hi Cursor           guifg=#fbf4f1 guibg=#b85227
hi ColorColumn                    guibg=#e7e0dd gui=none
hi CursorLine                     guibg=#e7e0dd gui=none
hi Visual           guifg=#383436 guibg=#edbcb4
hi VisualNOS        guifg=#383436 guibg=#edbcb4

hi Type             guifg=#383436 guibg=#fbf4f1 gui=bold
hi Identifier       guifg=#DDB700 guibg=#fbf4f1 gui=italic
hi Comment          guifg=#edbcb4 guibg=#fbf4f1 gui=italic
hi Folded           guifg=#df8578 guibg=#fbf4f1 gui=italic
hi FoldColumn       guifg=#fbf4f1 guibg=#fbf4f1 gui=italic
hi Constant         guifg=#383436 guibg=#fbf4f1 gui=italic
hi Special          guifg=#383436 guibg=#fbf4f1 gui=bold
hi Statement        guifg=#383436 guibg=#fbf4f1 gui=bold
hi PreProc          guifg=#df8578 guibg=#fbf4f1 gui=bold
hi MatchParen       guifg=#DDB700 guibg=#fbf4f1 gui=bold
hi Search           guifg=#fbf4f1 guibg=#DDB700 gui=none
hi Error            guifg=#b85227 guibg=#fbf4f1 gui=none
hi EndOfBuffer      guifg=#fbf4f1 guibg=#fbf4f1 gui=none

hi SpellBad         guifg=#b85227 guibg=#fbf4f1 gui=undercurl,bold
hi SpellCap         guifg=#df8578 guibg=#fbf4f1 gui=undercurl,bold
hi SpellRare        guifg=#B043D1 guibg=#fbf4f1 gui=undercurl,bold
hi SpellLocal       guifg=#3FDCEE guibg=#fbf4f1 gui=undercurl,bold

hi StatusLine       guifg=#fbf4f1 guibg=#df8578
hi StatusLineNC     guifg=#fbf4f1 guibg=#df8578
hi StatusLineTerm   guifg=#fbf4f1 guibg=#df8578
hi StatusLineTermNC guifg=#fbf4f1 guibg=#df8578
hi ToolbarLine      guifg=#fbf4f1 guibg=#df8578
hi ToolbarButton    guifg=#fbf4f1 guibg=#df8578

hi Pmenu            guifg=#df8578 guibg=#383436 gui=none
hi PmenuSel         guifg=#fbf4f1 guibg=#df8578 gui=none
hi PmenuSbar        guifg=#df8578 guibg=#fbf4f1 gui=none
hi PmenuThumb       guifg=#18E3C8 guibg=#18E3C8 gui=none
hi TabLine          guifg=#df8578 guibg=#fbf4f1 gui=none
hi TabLineSel       guifg=#fbf4f1 guibg=#df8578 gui=none
hi TabLineFill      guifg=#df8578 guibg=#fbf4f1 gui=none
hi TabLine          guifg=#df8578 guibg=#edbcb4 gui=none
hi TabLineSel       guifg=#383436 guibg=#fbf4f1 gui=none
hi TabLineFill      guifg=#df8578 guibg=#edbcb4 gui=none

hi usrStatus        guifg=#383436 guibg=#e7e0dd
hi usrgry           guifg=#edbcb4 guibg=#e7e0dd gui=none
hi usrblu           guifg=#fbf4f1 guibg=#edbcb4 gui=none
hi usrred           guifg=#fbf4f1 guibg=#d9a38c gui=none
hi usrylw           guifg=#fbf4f1 guibg=#ecd578 gui=none
hi usrgrn           guifg=#fbf4f1 guibg=#89ebdc gui=none
hi usrgnt           guifg=#fbf4f1 guibg=#d59be1 gui=none
