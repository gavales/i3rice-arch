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
hi Normal           guifg=#fdd89a guibg=#3c4542
hi Title            guifg=#fdd89a guibg=#3c4542 gui=bold
hi LineNr           guifg=#fc796b guibg=#3c4542 gui=none
hi CursorLineNr     guifg=#fc796b guibg=#505956 gui=bold
hi SpecialKey       guifg=#505956 guibg=#3c4542
hi ModeMsg          guifg=#3c4542 guibg=#fc796b gui=bold
hi Cursor           guifg=#3c4542 guibg=#bcbfb4
hi ColorColumn                    guibg=#505956 gui=none
hi CursorLine                     guibg=#505956 gui=none
hi Visual           guifg=#fdd89a guibg=#9c5f56
hi VisualNOS        guifg=#fdd89a guibg=#9c5f56

hi Type             guifg=#fdd89a guibg=#3c4542 gui=bold
hi Identifier       guifg=#edc074 guibg=#3c4542 gui=italic
hi Comment          guifg=#9c5f56 guibg=#3c4542 gui=italic
hi Folded           guifg=#fc796b guibg=#3c4542 gui=italic
hi FoldColumn       guifg=#3c4542 guibg=#3c4542 gui=italic
hi Constant         guifg=#fdd89a guibg=#3c4542 gui=italic
hi Special          guifg=#fdd89a guibg=#3c4542 gui=bold
hi Statement        guifg=#fdd89a guibg=#3c4542 gui=bold
hi PreProc          guifg=#fc796b guibg=#3c4542 gui=bold
hi MatchParen       guifg=#edc074 guibg=#3c4542 gui=bold
hi Search           guifg=#3c4542 guibg=#edc074 gui=none
hi Error            guifg=#bcbfb4 guibg=#3c4542 gui=none
hi EndOfBuffer      guifg=#3c4542 guibg=#3c4542 gui=none

hi SpellBad         guifg=#bcbfb4 guibg=#3c4542 gui=undercurl,bold
hi SpellCap         guifg=#fc796b guibg=#3c4542 gui=undercurl,bold
hi SpellRare        guifg=#d8bbbd guibg=#3c4542 gui=undercurl,bold
hi SpellLocal       guifg=#3FDCEE guibg=#3c4542 gui=undercurl,bold

hi StatusLine       guifg=#3c4542 guibg=#fc796b
hi StatusLineNC     guifg=#3c4542 guibg=#fc796b
hi StatusLineTerm   guifg=#3c4542 guibg=#fc796b
hi StatusLineTermNC guifg=#3c4542 guibg=#fc796b
hi ToolbarLine      guifg=#3c4542 guibg=#fc796b
hi ToolbarButton    guifg=#3c4542 guibg=#fc796b

hi Pmenu            guifg=#fc796b guibg=#fdd89a gui=none
hi PmenuSel         guifg=#3c4542 guibg=#fc796b gui=none
hi PmenuSbar        guifg=#fc796b guibg=#3c4542 gui=none
hi PmenuThumb       guifg=#a8cb79 guibg=#a8cb79 gui=none
hi TabLine          guifg=#fc796b guibg=#3c4542 gui=none
hi TabLineSel       guifg=#3c4542 guibg=#fc796b gui=none
hi TabLineFill      guifg=#fc796b guibg=#3c4542 gui=none
hi TabLine          guifg=#fc796b guibg=#9c5f56 gui=none
hi TabLineSel       guifg=#fdd89a guibg=#3c4542 gui=none
hi TabLineFill      guifg=#fc796b guibg=#9c5f56 gui=none

hi usrStatus        guifg=#fdd89a guibg=#505956
hi usrgry           guifg=#9c5f56 guibg=#505956 gui=none
hi usrblu           guifg=#3c4542 guibg=#9c5f56 gui=none
hi usrred           guifg=#3c4542 guibg=#7c827b gui=none
hi usrylw           guifg=#3c4542 guibg=#94825b gui=none
hi usrgrn           guifg=#3c4542 guibg=#72885d gui=none
hi usrgnt           guifg=#3c4542 guibg=#8a807f gui=none
