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
hi Normal           guifg=#085175 guibg=#a4dfe5
hi Title            guifg=#085175 guibg=#a4dfe5 gui=bold
hi LineNr           guifg=#259BE0 guibg=#a4dfe5 gui=none
hi CursorLineNr     guifg=#259BE0 guibg=#90cbd1 gui=bold
hi SpecialKey       guifg=#90cbd1 guibg=#a4dfe5
hi ModeMsg          guifg=#a4dfe5 guibg=#259BE0 gui=bold
hi Cursor           guifg=#a4dfe5 guibg=#08A2B5
hi ColorColumn                    guibg=#90cbd1 gui=none
hi CursorLine                     guibg=#90cbd1 gui=none
hi Visual           guifg=#085175 guibg=#64bde2
hi VisualNOS        guifg=#085175 guibg=#64bde2

hi Type             guifg=#085175 guibg=#a4dfe5 gui=bold
hi Identifier       guifg=#07AFCC guibg=#a4dfe5 gui=italic
hi Comment          guifg=#64bde2 guibg=#a4dfe5 gui=italic
hi Folded           guifg=#259BE0 guibg=#a4dfe5 gui=italic
hi FoldColumn       guifg=#a4dfe5 guibg=#a4dfe5 gui=italic
hi Constant         guifg=#085175 guibg=#a4dfe5 gui=italic
hi Special          guifg=#085175 guibg=#a4dfe5 gui=bold
hi Statement        guifg=#085175 guibg=#a4dfe5 gui=bold
hi PreProc          guifg=#259BE0 guibg=#a4dfe5 gui=bold
hi MatchParen       guifg=#07AFCC guibg=#a4dfe5 gui=bold
hi Search           guifg=#a4dfe5 guibg=#07AFCC gui=none
hi Error            guifg=#08A2B5 guibg=#a4dfe5 gui=none
hi EndOfBuffer      guifg=#a4dfe5 guibg=#a4dfe5 gui=none

hi SpellBad         guifg=#08A2B5 guibg=#a4dfe5 gui=undercurl,bold
hi SpellCap         guifg=#259BE0 guibg=#a4dfe5 gui=undercurl,bold
hi SpellRare        guifg=#64B1E7 guibg=#a4dfe5 gui=undercurl,bold
hi SpellLocal       guifg=#1DC9D6 guibg=#a4dfe5 gui=undercurl,bold

hi StatusLine       guifg=#a4dfe5 guibg=#259BE0
hi StatusLineNC     guifg=#a4dfe5 guibg=#259BE0
hi StatusLineTerm   guifg=#a4dfe5 guibg=#259BE0
hi StatusLineTermNC guifg=#a4dfe5 guibg=#259BE0
hi ToolbarLine      guifg=#a4dfe5 guibg=#259BE0
hi ToolbarButton    guifg=#a4dfe5 guibg=#259BE0

hi Pmenu            guifg=#259BE0 guibg=#085175 gui=none
hi PmenuSel         guifg=#a4dfe5 guibg=#259BE0 gui=none
hi PmenuSbar        guifg=#259BE0 guibg=#a4dfe5 gui=none
hi PmenuThumb       guifg=#0690CF guibg=#0690CF gui=none
hi TabLine          guifg=#259BE0 guibg=#a4dfe5 gui=none
hi TabLineSel       guifg=#a4dfe5 guibg=#259BE0 gui=none
hi TabLineFill      guifg=#259BE0 guibg=#a4dfe5 gui=none
hi TabLine          guifg=#259BE0 guibg=#64bde2 gui=none
hi TabLineSel       guifg=#085175 guibg=#a4dfe5 gui=none
hi TabLineFill      guifg=#259BE0 guibg=#64bde2 gui=none

hi usrStatus        guifg=#085175 guibg=#90cbd1
hi usrgry           guifg=#64bde2 guibg=#90cbd1 gui=none
hi usrblu           guifg=#a4dfe5 guibg=#64bde2 gui=none
hi usrred           guifg=#a4dfe5 guibg=#56c0cd gui=none
hi usrylw           guifg=#a4dfe5 guibg=#55c7d8 gui=none
hi usrgrn           guifg=#a4dfe5 guibg=#55b7da gui=none
hi usrgnt           guifg=#a4dfe5 guibg=#84c8e6 gui=none
