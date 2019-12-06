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
hi Normal           guifg=#ffebc3 guibg=#3c4c55
hi Title            guifg=#ffebc3 guibg=#3c4c55 gui=bold
hi LineNr           guifg=#fd888d guibg=#3c4c55 gui=none
hi CursorLineNr     guifg=#fd888d guibg=#506069 gui=bold
hi SpecialKey       guifg=#506069 guibg=#3c4c55
hi ModeMsg          guifg=#3c4c55 guibg=#fd888d gui=bold
hi Cursor           guifg=#3c4c55 guibg=#bdd0e5
hi ColorColumn                    guibg=#506069 gui=none
hi CursorLine                     guibg=#506069 gui=none
hi Visual           guifg=#ffebc3 guibg=#9c6a71
hi VisualNOS        guifg=#ffebc3 guibg=#9c6a71

hi Type             guifg=#ffebc3 guibg=#3c4c55 gui=bold
hi Identifier       guifg=#eed094 guibg=#3c4c55 gui=italic
hi Comment          guifg=#9c6a71 guibg=#3c4c55 gui=italic
hi Folded           guifg=#fd888d guibg=#3c4c55 gui=italic
hi FoldColumn       guifg=#3c4c55 guibg=#3c4c55 gui=italic
hi Constant         guifg=#ffebc3 guibg=#3c4c55 gui=italic
hi Special          guifg=#ffebc3 guibg=#3c4c55 gui=bold
hi Statement        guifg=#ffebc3 guibg=#3c4c55 gui=bold
hi PreProc          guifg=#fd888d guibg=#3c4c55 gui=bold
hi MatchParen       guifg=#eed094 guibg=#3c4c55 gui=bold
hi Search           guifg=#3c4c55 guibg=#eed094 gui=none
hi Error            guifg=#bdd0e5 guibg=#3c4c55 gui=none
hi EndOfBuffer      guifg=#3c4c55 guibg=#3c4c55 gui=none

hi SpellBad         guifg=#bdd0e5 guibg=#3c4c55 gui=undercurl,bold
hi SpellCap         guifg=#fd888d guibg=#3c4c55 gui=undercurl,bold
hi SpellRare        guifg=#daccf0 guibg=#3c4c55 gui=undercurl,bold
hi SpellLocal       guifg=#3FDCEE guibg=#3c4c55 gui=undercurl,bold

hi StatusLine       guifg=#3c4c55 guibg=#fd888d
hi StatusLineNC     guifg=#3c4c55 guibg=#fd888d
hi StatusLineTerm   guifg=#3c4c55 guibg=#fd888d
hi StatusLineTermNC guifg=#3c4c55 guibg=#fd888d
hi ToolbarLine      guifg=#3c4c55 guibg=#fd888d
hi ToolbarButton    guifg=#3c4c55 guibg=#fd888d

hi Pmenu            guifg=#fd888d guibg=#ffebc3 gui=none
hi PmenuSel         guifg=#3c4c55 guibg=#fd888d gui=none
hi PmenuSbar        guifg=#fd888d guibg=#3c4c55 gui=none
hi PmenuThumb       guifg=#a9dd9d guibg=#a9dd9d gui=none
hi TabLine          guifg=#fd888d guibg=#3c4c55 gui=none
hi TabLineSel       guifg=#3c4c55 guibg=#fd888d gui=none
hi TabLineFill      guifg=#fd888d guibg=#3c4c55 gui=none
hi TabLine          guifg=#fd888d guibg=#9c6a71 gui=none
hi TabLineSel       guifg=#ffebc3 guibg=#3c4c55 gui=none
hi TabLineFill      guifg=#fd888d guibg=#9c6a71 gui=none

hi usrStatus        guifg=#ffebc3 guibg=#506069
hi usrgry           guifg=#9c6a71 guibg=#506069 gui=none
hi usrblu           guifg=#3c4c55 guibg=#9c6a71 gui=none
hi usrred           guifg=#3c4c55 guibg=#7c8e9d gui=none
hi usrylw           guifg=#3c4c55 guibg=#958e74 gui=none
hi usrgrn           guifg=#3c4c55 guibg=#729479 gui=none
hi usrgnt           guifg=#3c4c55 guibg=#8b8ca2 gui=none
