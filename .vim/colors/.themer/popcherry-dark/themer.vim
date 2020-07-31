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
hi Normal           guifg=#e9f1f1 guibg=#231F20
hi Title            guifg=#e9f1f1 guibg=#231F20 gui=bold
hi LineNr           guifg=#65A9AA guibg=#231F20 gui=none
hi CursorLineNr     guifg=#65A9AA guibg=#373334 gui=bold
hi SpecialKey       guifg=#373334 guibg=#231F20
hi ModeMsg          guifg=#231F20 guibg=#65A9AA gui=bold
hi Cursor           guifg=#231F20 guibg=#b85227
hi ColorColumn                    guibg=#373334 gui=none
hi CursorLine                     guibg=#373334 gui=none
hi Visual           guifg=#e9f1f1 guibg=#446465
hi VisualNOS        guifg=#e9f1f1 guibg=#446465

hi Type             guifg=#e9f1f1 guibg=#231F20 gui=bold
hi Identifier       guifg=#DDB700 guibg=#231F20 gui=italic
hi Comment          guifg=#446465 guibg=#231F20 gui=italic
hi Folded           guifg=#65A9AA guibg=#231F20 gui=italic
hi FoldColumn       guifg=#231F20 guibg=#231F20 gui=italic
hi Constant         guifg=#e9f1f1 guibg=#231F20 gui=italic
hi Special          guifg=#e9f1f1 guibg=#231F20 gui=bold
hi Statement        guifg=#e9f1f1 guibg=#231F20 gui=bold
hi PreProc          guifg=#65A9AA guibg=#231F20 gui=bold
hi MatchParen       guifg=#DDB700 guibg=#231F20 gui=bold
hi Search           guifg=#231F20 guibg=#DDB700 gui=none
hi Error            guifg=#b85227 guibg=#231F20 gui=none
hi EndOfBuffer      guifg=#231F20 guibg=#231F20 gui=none

hi SpellBad         guifg=#b85227 guibg=#231F20 gui=undercurl,bold
hi SpellCap         guifg=#65A9AA guibg=#231F20 gui=undercurl,bold
hi SpellRare        guifg=#B043D1 guibg=#231F20 gui=undercurl,bold
hi SpellLocal       guifg=#3FDCEE guibg=#231F20 gui=undercurl,bold

hi StatusLine       guifg=#231F20 guibg=#65A9AA
hi StatusLineNC     guifg=#231F20 guibg=#65A9AA
hi StatusLineTerm   guifg=#231F20 guibg=#65A9AA
hi StatusLineTermNC guifg=#231F20 guibg=#65A9AA
hi ToolbarLine      guifg=#231F20 guibg=#65A9AA
hi ToolbarButton    guifg=#231F20 guibg=#65A9AA

hi Pmenu            guifg=#65A9AA guibg=#e9f1f1 gui=none
hi PmenuSel         guifg=#231F20 guibg=#65A9AA gui=none
hi PmenuSbar        guifg=#65A9AA guibg=#231F20 gui=none
hi PmenuThumb       guifg=#18E3C8 guibg=#18E3C8 gui=none
hi TabLine          guifg=#65A9AA guibg=#231F20 gui=none
hi TabLineSel       guifg=#231F20 guibg=#65A9AA gui=none
hi TabLineFill      guifg=#65A9AA guibg=#231F20 gui=none
hi TabLine          guifg=#65A9AA guibg=#446465 gui=none
hi TabLineSel       guifg=#e9f1f1 guibg=#231F20 gui=none
hi TabLineFill      guifg=#65A9AA guibg=#446465 gui=none

hi usrStatus        guifg=#e9f1f1 guibg=#373334
hi usrgry           guifg=#446465 guibg=#373334 gui=none
hi usrblu           guifg=#231F20 guibg=#446465 gui=none
hi usrred           guifg=#231F20 guibg=#924525 gui=none
hi usrylw           guifg=#231F20 guibg=#ae9108 gui=none
hi usrgrn           guifg=#231F20 guibg=#1ab29e gui=none
hi usrgnt           guifg=#231F20 guibg=#8c3aa4 gui=none
hi USRgry           guifg=#373334 guibg=#446465 gui=bold
hi USRblu           guifg=#446465 guibg=#231F20 gui=bold
hi USRred           guifg=#924525 guibg=#231F20 gui=bold
hi USRylw           guifg=#ae9108 guibg=#231F20 gui=bold
hi USRgrn           guifg=#1ab29e guibg=#231F20 gui=bold
hi USRgnt           guifg=#8c3aa4 guibg=#231F20 gui=bold
