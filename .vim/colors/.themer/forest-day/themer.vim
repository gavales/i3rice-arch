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
hi Normal           guifg=#3c4c55 guibg=#ffebc3
hi Title            guifg=#3c4c55 guibg=#ffebc3 gui=bold
hi LineNr           guifg=#fd888d guibg=#ffebc3 gui=none
hi CursorLineNr     guifg=#fd888d guibg=#ebd7af gui=bold
hi SpecialKey       guifg=#ebd7af guibg=#ffebc3
hi ModeMsg          guifg=#ffebc3 guibg=#fd888d gui=bold
hi Cursor           guifg=#ffebc3 guibg=#bdd0e5
hi ColorColumn                    guibg=#ebd7af gui=none
hi CursorLine                     guibg=#ebd7af gui=none
hi Visual           guifg=#3c4c55 guibg=#feb9a8
hi VisualNOS        guifg=#3c4c55 guibg=#feb9a8

hi Type             guifg=#3c4c55 guibg=#ffebc3 gui=bold
hi Identifier       guifg=#eed094 guibg=#ffebc3 gui=italic
hi Comment          guifg=#feb9a8 guibg=#ffebc3 gui=italic
hi Folded           guifg=#fd888d guibg=#ffebc3 gui=italic
hi FoldColumn       guifg=#ffebc3 guibg=#ffebc3 gui=italic
hi Constant         guifg=#3c4c55 guibg=#ffebc3 gui=italic
hi Special          guifg=#3c4c55 guibg=#ffebc3 gui=bold
hi Statement        guifg=#3c4c55 guibg=#ffebc3 gui=bold
hi PreProc          guifg=#fd888d guibg=#ffebc3 gui=bold
hi MatchParen       guifg=#eed094 guibg=#ffebc3 gui=bold
hi Search           guifg=#ffebc3 guibg=#eed094 gui=none
hi Error            guifg=#bdd0e5 guibg=#ffebc3 gui=none
hi EndOfBuffer      guifg=#ffebc3 guibg=#ffebc3 gui=none

hi SpellBad         guifg=#bdd0e5 guibg=#ffebc3 gui=undercurl,bold
hi SpellCap         guifg=#fd888d guibg=#ffebc3 gui=undercurl,bold
hi SpellRare        guifg=#daccf0 guibg=#ffebc3 gui=undercurl,bold
hi SpellLocal       guifg=#3FDCEE guibg=#ffebc3 gui=undercurl,bold

hi StatusLine       guifg=#ffebc3 guibg=#fd888d
hi StatusLineNC     guifg=#ffebc3 guibg=#fd888d
hi StatusLineTerm   guifg=#ffebc3 guibg=#fd888d
hi StatusLineTermNC guifg=#ffebc3 guibg=#fd888d
hi ToolbarLine      guifg=#ffebc3 guibg=#fd888d
hi ToolbarButton    guifg=#ffebc3 guibg=#fd888d

hi Pmenu            guifg=#fd888d guibg=#3c4c55 gui=none
hi PmenuSel         guifg=#ffebc3 guibg=#fd888d gui=none
hi PmenuSbar        guifg=#fd888d guibg=#ffebc3 gui=none
hi PmenuThumb       guifg=#a9dd9d guibg=#a9dd9d gui=none
hi TabLine          guifg=#fd888d guibg=#ffebc3 gui=none
hi TabLineSel       guifg=#ffebc3 guibg=#fd888d gui=none
hi TabLineFill      guifg=#fd888d guibg=#ffebc3 gui=none
hi TabLine          guifg=#fd888d guibg=#feb9a8 gui=none
hi TabLineSel       guifg=#3c4c55 guibg=#ffebc3 gui=none
hi TabLineFill      guifg=#fd888d guibg=#feb9a8 gui=none

hi usrStatus        guifg=#3c4c55 guibg=#ebd7af
hi usrgry           guifg=#feb9a8 guibg=#ebd7af gui=none
hi usrblu           guifg=#ffebc3 guibg=#feb9a8 gui=none
hi usrred           guifg=#ffebc3 guibg=#deddd4 gui=none
hi usrylw           guifg=#ffebc3 guibg=#f6ddab gui=none
hi usrgrn           guifg=#ffebc3 guibg=#d4e4b0 gui=none
hi usrgnt           guifg=#ffebc3 guibg=#ecdbd9 gui=none
