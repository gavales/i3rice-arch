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
hi Normal           guifg=#3e443e guibg=#f9efe9
hi Title            guifg=#3e443e guibg=#f9efe9 gui=bold
hi LineNr           guifg=#DC8E69 guibg=#f9efe9 gui=none
hi CursorLineNr     guifg=#DC8E69 guibg=#e5dbd5 gui=bold
hi SpecialKey       guifg=#e5dbd5 guibg=#f9efe9
hi ModeMsg          guifg=#f9efe9 guibg=#DC8E69 gui=bold
hi Cursor           guifg=#f9efe9 guibg=#6F90A7
hi ColorColumn                    guibg=#e5dbd5 gui=none
hi CursorLine                     guibg=#e5dbd5 gui=none
hi Visual           guifg=#3e443e guibg=#eabea9
hi VisualNOS        guifg=#3e443e guibg=#eabea9

hi Type             guifg=#3e443e guibg=#f9efe9 gui=bold
hi Identifier       guifg=#A5896D guibg=#f9efe9 gui=italic
hi Comment          guifg=#eabea9 guibg=#f9efe9 gui=italic
hi Folded           guifg=#3e443e guibg=#f9efe9 gui=italic
hi Constant         guifg=#3e443e guibg=#f9efe9 gui=italic
hi Special          guifg=#3e443e guibg=#f9efe9 gui=bold
hi Statement        guifg=#3e443e guibg=#f9efe9 gui=bold
hi PreProc          guifg=#DC8E69 guibg=#f9efe9 gui=bold
hi MatchParen       guifg=#A5896D guibg=#f9efe9 gui=bold
hi Search           guifg=#f9efe9 guibg=#A5896D gui=none
hi Error            guifg=#6F90A7 guibg=#f9efe9 gui=none
hi EndOfBuffer      guifg=#f9efe9 guibg=#f9efe9 gui=none

hi SpellBad         guifg=#6F90A7 guibg=#f9efe9 gui=underline,bold
hi SpellCap         guifg=#DC8E69 guibg=#f9efe9 gui=underline,bold
hi SpellRare        guifg=#609AC1 guibg=#f9efe9 gui=underline,bold
hi SpellLocal       guifg=#60c1b8 guibg=#f9efe9 gui=underline,bold

hi StatusLine       guifg=#f9efe9 guibg=#DC8E69
hi StatusLineNC     guifg=#f9efe9 guibg=#DC8E69
hi StatusLineTerm   guifg=#f9efe9 guibg=#DC8E69
hi StatusLineTermNC guifg=#f9efe9 guibg=#DC8E69
hi ToolbarLine      guifg=#f9efe9 guibg=#DC8E69
hi ToolbarButton    guifg=#f9efe9 guibg=#DC8E69

hi Pmenu            guifg=#DC8E69 guibg=#3e443e gui=none
hi PmenuSel         guifg=#f9efe9 guibg=#DC8E69 gui=none
hi PmenuSbar        guifg=#DC8E69 guibg=#f9efe9 gui=none
hi PmenuThumb       guifg=#507C88 guibg=#507C88 gui=none
hi TabLine          guifg=#DC8E69 guibg=#f9efe9 gui=none
hi TabLineSel       guifg=#f9efe9 guibg=#DC8E69 gui=none
hi TabLineFill      guifg=#DC8E69 guibg=#f9efe9 gui=none

hi usrred           guifg=#f9efe9 guibg=#6F90A7
hi usrylw           guifg=#f9efe9 guibg=#A5896D
hi usrgrn           guifg=#f9efe9 guibg=#507C88
hi usrgry           guifg=#f9efe9 guibg=#bdb3ad
hi usrblu           guifg=#f9efe9 guibg=#DC8E69
hi usrgnt           guifg=#f9efe9 guibg=#609AC1

