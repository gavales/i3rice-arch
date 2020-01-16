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
hi Normal           guifg=#fdfbfa guibg=#383436
hi Title            guifg=#fdfbfa guibg=#383436 gui=bold
hi LineNr           guifg=#EEC3B7 guibg=#383436 gui=none
hi CursorLineNr     guifg=#EEC3B7 guibg=#4c484a gui=bold
hi SpecialKey       guifg=#4c484a guibg=#383436
hi ModeMsg          guifg=#383436 guibg=#EEC3B7 gui=bold
hi Cursor           guifg=#383436 guibg=#AA999C
hi ColorColumn                    guibg=#4c484a gui=none
hi CursorLine                     guibg=#4c484a gui=none
hi Visual           guifg=#fdfbfa guibg=#937b76
hi VisualNOS        guifg=#fdfbfa guibg=#937b76

hi Type             guifg=#fdfbfa guibg=#383436 gui=bold
hi Identifier       guifg=#D3C4BB guibg=#383436 gui=italic
hi Comment          guifg=#937b76 guibg=#383436 gui=italic
hi Folded           guifg=#EEC3B7 guibg=#383436 gui=italic
hi FoldColumn       guifg=#383436 guibg=#383436 gui=italic
hi Constant         guifg=#fdfbfa guibg=#383436 gui=italic
hi Special          guifg=#fdfbfa guibg=#383436 gui=bold
hi Statement        guifg=#fdfbfa guibg=#383436 gui=bold
hi PreProc          guifg=#EEC3B7 guibg=#383436 gui=bold
hi MatchParen       guifg=#D3C4BB guibg=#383436 gui=bold
hi Search           guifg=#383436 guibg=#D3C4BB gui=none
hi Error            guifg=#AA999C guibg=#383436 gui=none
hi EndOfBuffer      guifg=#383436 guibg=#383436 gui=none

hi SpellBad         guifg=#AA999C guibg=#383436 gui=undercurl,bold
hi SpellCap         guifg=#EEC3B7 guibg=#383436 gui=undercurl,bold
hi SpellRare        guifg=#DDCFD0 guibg=#383436 gui=undercurl,bold
hi SpellLocal       guifg=#F6D7D7 guibg=#383436 gui=undercurl,bold

hi StatusLine       guifg=#383436 guibg=#EEC3B7
hi StatusLineNC     guifg=#383436 guibg=#EEC3B7
hi StatusLineTerm   guifg=#383436 guibg=#EEC3B7
hi StatusLineTermNC guifg=#383436 guibg=#EEC3B7
hi ToolbarLine      guifg=#383436 guibg=#EEC3B7
hi ToolbarButton    guifg=#383436 guibg=#EEC3B7

hi Pmenu            guifg=#EEC3B7 guibg=#fdfbfa gui=none
hi PmenuSel         guifg=#383436 guibg=#EEC3B7 gui=none
hi PmenuSbar        guifg=#EEC3B7 guibg=#383436 gui=none
hi PmenuThumb       guifg=#E2B6AF guibg=#E2B6AF gui=none
hi TabLine          guifg=#EEC3B7 guibg=#383436 gui=none
hi TabLineSel       guifg=#383436 guibg=#EEC3B7 gui=none
hi TabLineFill      guifg=#EEC3B7 guibg=#383436 gui=none
hi TabLine          guifg=#EEC3B7 guibg=#937b76 gui=none
hi TabLineSel       guifg=#fdfbfa guibg=#383436 gui=none
hi TabLineFill      guifg=#EEC3B7 guibg=#937b76 gui=none

hi usrStatus        guifg=#fdfbfa guibg=#4c484a
hi usrgry           guifg=#937b76 guibg=#4c484a gui=none
hi usrblu           guifg=#383436 guibg=#937b76 gui=none
hi usrred           guifg=#383436 guibg=#716669 gui=none
hi usrylw           guifg=#383436 guibg=#857c78 gui=none
hi usrgrn           guifg=#383436 guibg=#8d7572 gui=none
hi usrgnt           guifg=#383436 guibg=#8a8183 gui=none
