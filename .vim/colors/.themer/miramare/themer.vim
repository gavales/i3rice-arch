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
hi USRred           ctermfg=red      ctermbg=black    cterm=bold
hi USRylw           ctermfg=yellow   ctermbg=black    cterm=bold
hi USRgrn           ctermfg=green    ctermbg=black    cterm=bold
hi USRgry           ctermfg=Darkgray ctermbg=Gray     cterm=bold
hi USRblu           ctermfg=blue     ctermbg=black    cterm=bold
hi USRgnt           ctermfg=magenta  ctermbg=black    cterm=bold

" ━  GUI
hi Normal           guifg=#2A2426 guibg=#e6d6ac
hi Title            guifg=#2A2426 guibg=#e6d6ac gui=bold
hi LineNr           guifg=#87c095 guibg=#e6d6ac gui=none
hi CursorLineNr     guifg=#87c095 guibg=#d2c298 gui=bold
hi SpecialKey       guifg=#d2c298 guibg=#e6d6ac
hi ModeMsg          guifg=#e6d6ac guibg=#87c095 gui=bold
hi Cursor           guifg=#e6d6ac guibg=#e68183
hi ColorColumn                    guibg=#d2c298 gui=none
hi CursorLine                     guibg=#d2c298 gui=none
hi Visual           guifg=#2A2426 guibg=#b6cba0
hi VisualNOS        guifg=#2A2426 guibg=#b6cba0

hi Type             guifg=#2A2426 guibg=#e6d6ac gui=bold
hi Identifier       guifg=#d9bb80 guibg=#e6d6ac gui=italic
hi Comment          guifg=#b6cba0 guibg=#e6d6ac gui=italic
hi Folded           guifg=#87c095 guibg=#e6d6ac gui=italic
hi FoldColumn       guifg=#e6d6ac guibg=#e6d6ac gui=italic
hi Constant         guifg=#2A2426 guibg=#e6d6ac gui=italic
hi Special          guifg=#2A2426 guibg=#e6d6ac gui=bold
hi Statement        guifg=#2A2426 guibg=#e6d6ac gui=bold
hi PreProc          guifg=#87c095 guibg=#e6d6ac gui=bold
hi MatchParen       guifg=#d9bb80 guibg=#e6d6ac gui=bold
hi Search           guifg=#e6d6ac guibg=#d9bb80 gui=none
hi Error            guifg=#e68183 guibg=#e6d6ac gui=none
hi EndOfBuffer      guifg=#e6d6ac guibg=#e6d6ac gui=none

hi SpellBad         guifg=#e68183 guibg=#e6d6ac gui=undercurl,bold
hi SpellCap         guifg=#87c095 guibg=#e6d6ac gui=undercurl,bold
hi SpellRare        guifg=#d3a0bc guibg=#e6d6ac gui=undercurl,bold
hi SpellLocal       guifg=#87c095 guibg=#e6d6ac gui=undercurl,bold

hi StatusLine       guifg=#e6d6ac guibg=#87c095
hi StatusLineNC     guifg=#e6d6ac guibg=#87c095
hi StatusLineTerm   guifg=#e6d6ac guibg=#87c095
hi StatusLineTermNC guifg=#e6d6ac guibg=#87c095
hi ToolbarLine      guifg=#e6d6ac guibg=#87c095
hi ToolbarButton    guifg=#e6d6ac guibg=#87c095

hi Pmenu            guifg=#87c095 guibg=#2A2426 gui=none
hi PmenuSel         guifg=#e6d6ac guibg=#87c095 gui=none
hi PmenuSbar        guifg=#87c095 guibg=#e6d6ac gui=none
hi PmenuThumb       guifg=#87af87 guibg=#87af87 gui=none
hi TabLine          guifg=#87c095 guibg=#e6d6ac gui=none
hi TabLineSel       guifg=#e6d6ac guibg=#87c095 gui=none
hi TabLineFill      guifg=#87c095 guibg=#e6d6ac gui=none
hi TabLine          guifg=#87c095 guibg=#b6cba0 gui=none
hi TabLineSel       guifg=#2A2426 guibg=#e6d6ac gui=none
hi TabLineFill      guifg=#87c095 guibg=#b6cba0 gui=none

hi usrStatus        guifg=#2A2426 guibg=#d2c298
hi usrgry           guifg=#b6cba0 guibg=#d2c298 gui=none
hi usrblu           guifg=#e6d6ac guibg=#b6cba0 gui=none
hi usrred           guifg=#e6d6ac guibg=#e6968d gui=none
hi usrylw           guifg=#e6d6ac guibg=#dcc18b gui=none
hi usrgrn           guifg=#e6d6ac guibg=#9eb890 gui=none
hi usrgnt           guifg=#e6d6ac guibg=#d7adb8 gui=none
hi USRgry           guifg=#d2c298 guibg=#b6cba0 gui=bold
hi USRblu           guifg=#b6cba0 guibg=#e6d6ac gui=bold
hi USRred           guifg=#e6968d guibg=#e6d6ac gui=bold
hi USRylw           guifg=#dcc18b guibg=#e6d6ac gui=bold
hi USRgrn           guifg=#9eb890 guibg=#e6d6ac gui=bold
hi USRgnt           guifg=#d7adb8 guibg=#e6d6ac gui=bold
