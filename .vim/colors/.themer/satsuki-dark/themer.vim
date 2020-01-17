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
hi Normal           guifg=#fbf4f1 guibg=#383436
hi Title            guifg=#fbf4f1 guibg=#383436 gui=bold
hi LineNr           guifg=#df8578 guibg=#383436 gui=none
hi CursorLineNr     guifg=#df8578 guibg=#4c484a gui=bold
hi SpecialKey       guifg=#4c484a guibg=#383436
hi ModeMsg          guifg=#383436 guibg=#df8578 gui=bold
hi Cursor           guifg=#383436 guibg=#b85227
hi ColorColumn                    guibg=#4c484a gui=none
hi CursorLine                     guibg=#4c484a gui=none
hi Visual           guifg=#fbf4f1 guibg=#8b5c57
hi VisualNOS        guifg=#fbf4f1 guibg=#8b5c57

hi Type             guifg=#fbf4f1 guibg=#383436 gui=bold
hi Identifier       guifg=#DDB700 guibg=#383436 gui=italic
hi Comment          guifg=#8b5c57 guibg=#383436 gui=italic
hi Folded           guifg=#df8578 guibg=#383436 gui=italic
hi FoldColumn       guifg=#383436 guibg=#383436 gui=italic
hi Constant         guifg=#fbf4f1 guibg=#383436 gui=italic
hi Special          guifg=#fbf4f1 guibg=#383436 gui=bold
hi Statement        guifg=#fbf4f1 guibg=#383436 gui=bold
hi PreProc          guifg=#df8578 guibg=#383436 gui=bold
hi MatchParen       guifg=#DDB700 guibg=#383436 gui=bold
hi Search           guifg=#383436 guibg=#DDB700 gui=none
hi Error            guifg=#b85227 guibg=#383436 gui=none
hi EndOfBuffer      guifg=#383436 guibg=#383436 gui=none

hi SpellBad         guifg=#b85227 guibg=#383436 gui=undercurl,bold
hi SpellCap         guifg=#df8578 guibg=#383436 gui=undercurl,bold
hi SpellRare        guifg=#B043D1 guibg=#383436 gui=undercurl,bold
hi SpellLocal       guifg=#3FDCEE guibg=#383436 gui=undercurl,bold

hi StatusLine       guifg=#383436 guibg=#df8578
hi StatusLineNC     guifg=#383436 guibg=#df8578
hi StatusLineTerm   guifg=#383436 guibg=#df8578
hi StatusLineTermNC guifg=#383436 guibg=#df8578
hi ToolbarLine      guifg=#383436 guibg=#df8578
hi ToolbarButton    guifg=#383436 guibg=#df8578

hi Pmenu            guifg=#df8578 guibg=#fbf4f1 gui=none
hi PmenuSel         guifg=#383436 guibg=#df8578 gui=none
hi PmenuSbar        guifg=#df8578 guibg=#383436 gui=none
hi PmenuThumb       guifg=#18E3C8 guibg=#18E3C8 gui=none
hi TabLine          guifg=#df8578 guibg=#383436 gui=none
hi TabLineSel       guifg=#383436 guibg=#df8578 gui=none
hi TabLineFill      guifg=#df8578 guibg=#383436 gui=none
hi TabLine          guifg=#df8578 guibg=#8b5c57 gui=none
hi TabLineSel       guifg=#fbf4f1 guibg=#383436 gui=none
hi TabLineFill      guifg=#df8578 guibg=#8b5c57 gui=none

hi usrStatus        guifg=#fbf4f1 guibg=#4c484a
hi usrgry           guifg=#8b5c57 guibg=#4c484a gui=none
hi usrblu           guifg=#383436 guibg=#8b5c57 gui=none
hi usrred           guifg=#383436 guibg=#78432e gui=none
hi usrylw           guifg=#383436 guibg=#8a751b gui=none
hi usrgrn           guifg=#383436 guibg=#288b7f gui=none
hi usrgnt           guifg=#383436 guibg=#743b83 gui=none
