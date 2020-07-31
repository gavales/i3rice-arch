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
hi Normal           guifg=#231F20 guibg=#fcfbfb
hi Title            guifg=#231F20 guibg=#fcfbfb gui=bold
hi LineNr           guifg=#A6D4D3 guibg=#fcfbfb gui=none
hi CursorLineNr     guifg=#A6D4D3 guibg=#e8e7e7 gui=bold
hi SpecialKey       guifg=#e8e7e7 guibg=#fcfbfb
hi ModeMsg          guifg=#fcfbfb guibg=#A6D4D3 gui=bold
hi Cursor           guifg=#fcfbfb guibg=#b85227
hi ColorColumn                    guibg=#e8e7e7 gui=none
hi CursorLine                     guibg=#e8e7e7 gui=none
hi Visual           guifg=#231F20 guibg=#d1e7e7
hi VisualNOS        guifg=#231F20 guibg=#d1e7e7

hi Type             guifg=#231F20 guibg=#fcfbfb gui=bold
hi Identifier       guifg=#DDB700 guibg=#fcfbfb gui=italic
hi Comment          guifg=#d1e7e7 guibg=#fcfbfb gui=italic
hi Folded           guifg=#A6D4D3 guibg=#fcfbfb gui=italic
hi FoldColumn       guifg=#fcfbfb guibg=#fcfbfb gui=italic
hi Constant         guifg=#231F20 guibg=#fcfbfb gui=italic
hi Special          guifg=#231F20 guibg=#fcfbfb gui=bold
hi Statement        guifg=#231F20 guibg=#fcfbfb gui=bold
hi PreProc          guifg=#A6D4D3 guibg=#fcfbfb gui=bold
hi MatchParen       guifg=#DDB700 guibg=#fcfbfb gui=bold
hi Search           guifg=#fcfbfb guibg=#DDB700 gui=none
hi Error            guifg=#b85227 guibg=#fcfbfb gui=none
hi EndOfBuffer      guifg=#fcfbfb guibg=#fcfbfb gui=none

hi SpellBad         guifg=#b85227 guibg=#fcfbfb gui=undercurl,bold
hi SpellCap         guifg=#A6D4D3 guibg=#fcfbfb gui=undercurl,bold
hi SpellRare        guifg=#B043D1 guibg=#fcfbfb gui=undercurl,bold
hi SpellLocal       guifg=#3FDCEE guibg=#fcfbfb gui=undercurl,bold

hi StatusLine       guifg=#fcfbfb guibg=#A6D4D3
hi StatusLineNC     guifg=#fcfbfb guibg=#A6D4D3
hi StatusLineTerm   guifg=#fcfbfb guibg=#A6D4D3
hi StatusLineTermNC guifg=#fcfbfb guibg=#A6D4D3
hi ToolbarLine      guifg=#fcfbfb guibg=#A6D4D3
hi ToolbarButton    guifg=#fcfbfb guibg=#A6D4D3

hi Pmenu            guifg=#A6D4D3 guibg=#231F20 gui=none
hi PmenuSel         guifg=#fcfbfb guibg=#A6D4D3 gui=none
hi PmenuSbar        guifg=#A6D4D3 guibg=#fcfbfb gui=none
hi PmenuThumb       guifg=#18E3C8 guibg=#18E3C8 gui=none
hi TabLine          guifg=#A6D4D3 guibg=#fcfbfb gui=none
hi TabLineSel       guifg=#fcfbfb guibg=#A6D4D3 gui=none
hi TabLineFill      guifg=#A6D4D3 guibg=#fcfbfb gui=none
hi TabLine          guifg=#A6D4D3 guibg=#d1e7e7 gui=none
hi TabLineSel       guifg=#231F20 guibg=#fcfbfb gui=none
hi TabLineFill      guifg=#A6D4D3 guibg=#d1e7e7 gui=none

hi usrStatus        guifg=#231F20 guibg=#e8e7e7
hi usrgry           guifg=#d1e7e7 guibg=#e8e7e7 gui=none
hi usrblu           guifg=#fcfbfb guibg=#d1e7e7 gui=none
hi usrred           guifg=#fcfbfb guibg=#c97c5c gui=none
hi usrylw           guifg=#fcfbfb guibg=#e4c83e gui=none
hi usrgrn           guifg=#fcfbfb guibg=#51e9d4 gui=none
hi usrgnt           guifg=#fcfbfb guibg=#c371db gui=none
hi USRgry           guifg=#e8e7e7 guibg=#d1e7e7 gui=bold
hi USRblu           guifg=#d1e7e7 guibg=#fcfbfb gui=bold
hi USRred           guifg=#c97c5c guibg=#fcfbfb gui=bold
hi USRylw           guifg=#e4c83e guibg=#fcfbfb gui=bold
hi USRgrn           guifg=#51e9d4 guibg=#fcfbfb gui=bold
hi USRgnt           guifg=#c371db guibg=#fcfbfb gui=bold
