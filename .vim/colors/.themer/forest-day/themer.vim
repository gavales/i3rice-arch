" Vim color file
" Converted from Textmate theme Brogrammer using Coloration v0.4.0 (http://github.com/sickill/coloration)

set background=dark
highlight clear

if exists("syntax_on")
  syntax reset
endif

let g:colors_name = "themer"

" >>>> CTERM
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
hi Folded           ctermfg=white    ctermbg=black    cterm=italic
hi Constant         ctermfg=white    ctermbg=black    cterm=italic
hi Special          ctermfg=white    ctermbg=black    cterm=bold
hi Statement        ctermfg=white    ctermbg=black    cterm=bold
hi PreProc          ctermfg=blue     ctermbg=black    cterm=bold
hi MatchParen       ctermfg=yellow   ctermbg=black    cterm=bold
hi Search           ctermfg=black    ctermbg=yellow   cterm=none
hi Error            ctermfg=red      ctermbg=black    cterm=none
hi EndOfBuffer      ctermfg=black    ctermbg=black    cterm=none

hi SpellBad         ctermfg=red      ctermbg=none     cterm=underline,bold
hi SpellCap         ctermfg=blue     ctermbg=none     cterm=underline,bold
hi SpellRare        ctermfg=magenta  ctermbg=none     cterm=underline,bold
hi SpellLocal       ctermfg=cyan     ctermbg=none     cterm=underline,bold

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
hi TabLine          ctermfg=blue     ctermbg=black    cterm=none
hi TabLineSel       ctermfg=black    ctermbg=blue     cterm=none
hi TabLineFill      ctermfg=blue     ctermbg=black    cterm=none

hi usrred           ctermfg=white    ctermbg=red
hi usrylw           ctermfg=black    ctermbg=yellow
hi usrgrn           ctermfg=black    ctermbg=green
hi usrgry           ctermfg=black    ctermbg=grey
hi usrblu           ctermfg=black    ctermbg=blue
hi usrgnt           ctermfg=black    ctermbg=magenta

" >>>> GUI
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
hi Folded           guifg=#3c4c55 guibg=#ffebc3 gui=italic
hi Constant         guifg=#3c4c55 guibg=#ffebc3 gui=italic
hi Special          guifg=#3c4c55 guibg=#ffebc3 gui=bold
hi Statement        guifg=#3c4c55 guibg=#ffebc3 gui=bold
hi PreProc          guifg=#fd888d guibg=#ffebc3 gui=bold
hi MatchParen       guifg=#eed094 guibg=#ffebc3 gui=bold
hi Search           guifg=#ffebc3 guibg=#eed094 gui=none
hi Error            guifg=#bdd0e5 guibg=#ffebc3 gui=none
hi EndOfBuffer      guifg=#ffebc3 guibg=#ffebc3 gui=none

hi SpellBad         guifg=#bdd0e5 guibg=#ffebc3 gui=underline,bold
hi SpellCap         guifg=#fd888d guibg=#ffebc3 gui=underline,bold
hi SpellRare        guifg=#daccf0 guibg=#ffebc3 gui=underline,bold
hi SpellLocal       guifg=#009090 guibg=#ffebc3 gui=underline,bold

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

hi usrred           guifg=#ffebc3 guibg=#bdd0e5
hi usrylw           guifg=#ffebc3 guibg=#eed094
hi usrgrn           guifg=#ffebc3 guibg=#a9dd9d
hi usrgry           guifg=#ffebc3 guibg=#c3af87
hi usrblu           guifg=#ffebc3 guibg=#fd888d
hi usrgnt           guifg=#ffebc3 guibg=#daccf0

