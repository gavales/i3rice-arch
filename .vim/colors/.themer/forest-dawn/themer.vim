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
hi Normal           guifg=#3c4542 guibg=#fdd89a
hi Title            guifg=#3c4542 guibg=#fdd89a gui=bold
hi LineNr           guifg=#fc796b guibg=#fdd89a gui=none
hi CursorLineNr     guifg=#fc796b guibg=#e9c486 gui=bold
hi SpecialKey       guifg=#e9c486 guibg=#fdd89a
hi ModeMsg          guifg=#fdd89a guibg=#fc796b gui=bold
hi Cursor           guifg=#fdd89a guibg=#bcbfb4
hi ColorColumn                    guibg=#e9c486 gui=none
hi CursorLine                     guibg=#e9c486 gui=none
hi Visual           guifg=#3c4542 guibg=#fca882
hi VisualNOS        guifg=#3c4542 guibg=#fca882

hi Type             guifg=#3c4542 guibg=#fdd89a gui=bold
hi Identifier       guifg=#edc074 guibg=#fdd89a gui=italic
hi Comment          guifg=#fca882 guibg=#fdd89a gui=italic
hi Folded           guifg=#fc796b guibg=#fdd89a gui=italic
hi FoldColumn       guifg=#fdd89a guibg=#fdd89a gui=italic
hi Constant         guifg=#3c4542 guibg=#fdd89a gui=italic
hi Special          guifg=#3c4542 guibg=#fdd89a gui=bold
hi Statement        guifg=#3c4542 guibg=#fdd89a gui=bold
hi PreProc          guifg=#fc796b guibg=#fdd89a gui=bold
hi MatchParen       guifg=#edc074 guibg=#fdd89a gui=bold
hi Search           guifg=#fdd89a guibg=#edc074 gui=none
hi Error            guifg=#bcbfb4 guibg=#fdd89a gui=none
hi EndOfBuffer      guifg=#fdd89a guibg=#fdd89a gui=none

hi SpellBad         guifg=#bcbfb4 guibg=#fdd89a gui=undercurl,bold
hi SpellCap         guifg=#fc796b guibg=#fdd89a gui=undercurl,bold
hi SpellRare        guifg=#d8bbbd guibg=#fdd89a gui=undercurl,bold
hi SpellLocal       guifg=#3FDCEE guibg=#fdd89a gui=undercurl,bold

hi StatusLine       guifg=#fdd89a guibg=#fc796b
hi StatusLineNC     guifg=#fdd89a guibg=#fc796b
hi StatusLineTerm   guifg=#fdd89a guibg=#fc796b
hi StatusLineTermNC guifg=#fdd89a guibg=#fc796b
hi ToolbarLine      guifg=#fdd89a guibg=#fc796b
hi ToolbarButton    guifg=#fdd89a guibg=#fc796b

hi Pmenu            guifg=#fc796b guibg=#3c4542 gui=none
hi PmenuSel         guifg=#fdd89a guibg=#fc796b gui=none
hi PmenuSbar        guifg=#fc796b guibg=#fdd89a gui=none
hi PmenuThumb       guifg=#a8cb79 guibg=#a8cb79 gui=none
hi TabLine          guifg=#fc796b guibg=#fdd89a gui=none
hi TabLineSel       guifg=#fdd89a guibg=#fc796b gui=none
hi TabLineFill      guifg=#fc796b guibg=#fdd89a gui=none
hi TabLine          guifg=#fc796b guibg=#fca882 gui=none
hi TabLineSel       guifg=#3c4542 guibg=#fdd89a gui=none
hi TabLineFill      guifg=#fc796b guibg=#fca882 gui=none

hi usrStatus        guifg=#3c4542 guibg=#e9c486
hi usrgry           guifg=#fca882 guibg=#e9c486 gui=none
hi usrblu           guifg=#fdd89a guibg=#fca882 gui=none
hi usrred           guifg=#fdd89a guibg=#dccba7 gui=none
hi usrylw           guifg=#fdd89a guibg=#f5cc87 gui=none
hi usrgrn           guifg=#fdd89a guibg=#d2d189 gui=none
hi usrgnt           guifg=#fdd89a guibg=#eac9ab gui=none
