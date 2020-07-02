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
hi Normal           guifg=#e6d6ac guibg=#2A2426
hi Title            guifg=#e6d6ac guibg=#2A2426 gui=bold
hi LineNr           guifg=#87c095 guibg=#2A2426 gui=none
hi CursorLineNr     guifg=#87c095 guibg=#3e383a gui=bold
hi SpecialKey       guifg=#3e383a guibg=#2A2426
hi ModeMsg          guifg=#2A2426 guibg=#87c095 gui=bold
hi Cursor           guifg=#2A2426 guibg=#e68183
hi ColorColumn                    guibg=#3e383a gui=none
hi CursorLine                     guibg=#3e383a gui=none
hi Visual           guifg=#e6d6ac guibg=#58725d
hi VisualNOS        guifg=#e6d6ac guibg=#58725d

hi Type             guifg=#e6d6ac guibg=#2A2426 gui=bold
hi Identifier       guifg=#d9bb80 guibg=#2A2426 gui=italic
hi Comment          guifg=#58725d guibg=#2A2426 gui=italic
hi Folded           guifg=#87c095 guibg=#2A2426 gui=italic
hi FoldColumn       guifg=#2A2426 guibg=#2A2426 gui=italic
hi Constant         guifg=#e6d6ac guibg=#2A2426 gui=italic
hi Special          guifg=#e6d6ac guibg=#2A2426 gui=bold
hi Statement        guifg=#e6d6ac guibg=#2A2426 gui=bold
hi PreProc          guifg=#87c095 guibg=#2A2426 gui=bold
hi MatchParen       guifg=#d9bb80 guibg=#2A2426 gui=bold
hi Search           guifg=#2A2426 guibg=#d9bb80 gui=none
hi Error            guifg=#e68183 guibg=#2A2426 gui=none
hi EndOfBuffer      guifg=#2A2426 guibg=#2A2426 gui=none

hi SpellBad         guifg=#e68183 guibg=#2A2426 gui=undercurl,bold
hi SpellCap         guifg=#87c095 guibg=#2A2426 gui=undercurl,bold
hi SpellRare        guifg=#d3a0bc guibg=#2A2426 gui=undercurl,bold
hi SpellLocal       guifg=#87c095 guibg=#2A2426 gui=undercurl,bold

hi StatusLine       guifg=#2A2426 guibg=#87c095
hi StatusLineNC     guifg=#2A2426 guibg=#87c095
hi StatusLineTerm   guifg=#2A2426 guibg=#87c095
hi StatusLineTermNC guifg=#2A2426 guibg=#87c095
hi ToolbarLine      guifg=#2A2426 guibg=#87c095
hi ToolbarButton    guifg=#2A2426 guibg=#87c095

hi Pmenu            guifg=#87c095 guibg=#e6d6ac gui=none
hi PmenuSel         guifg=#2A2426 guibg=#87c095 gui=none
hi PmenuSbar        guifg=#87c095 guibg=#2A2426 gui=none
hi PmenuThumb       guifg=#87af87 guibg=#87af87 gui=none
hi TabLine          guifg=#87c095 guibg=#2A2426 gui=none
hi TabLineSel       guifg=#2A2426 guibg=#87c095 gui=none
hi TabLineFill      guifg=#87c095 guibg=#2A2426 gui=none
hi TabLine          guifg=#87c095 guibg=#58725d gui=none
hi TabLineSel       guifg=#e6d6ac guibg=#2A2426 gui=none
hi TabLineFill      guifg=#87c095 guibg=#58725d gui=none

hi usrStatus        guifg=#e6d6ac guibg=#3e383a
hi usrgry           guifg=#58725d guibg=#3e383a gui=none
hi usrblu           guifg=#2A2426 guibg=#58725d gui=none
hi usrred           guifg=#2A2426 guibg=#b7696b gui=none
hi usrylw           guifg=#2A2426 guibg=#ad9569 gui=none
hi usrgrn           guifg=#2A2426 guibg=#6f8c6e gui=none
hi usrgnt           guifg=#2A2426 guibg=#a88196 gui=none
hi USRgry           guifg=#3e383a guibg=#58725d gui=bold
hi USRblu           guifg=#58725d guibg=#2A2426 gui=bold
hi USRred           guifg=#b7696b guibg=#2A2426 gui=bold
hi USRylw           guifg=#ad9569 guibg=#2A2426 gui=bold
hi USRgrn           guifg=#6f8c6e guibg=#2A2426 gui=bold
hi USRgnt           guifg=#a88196 guibg=#2A2426 gui=bold
