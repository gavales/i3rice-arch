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
hi Folded           guifg=#DC8E69 guibg=#f9efe9 gui=italic
hi FoldColumn       guifg=#f9efe9 guibg=#f9efe9 gui=italic
hi Constant         guifg=#3e443e guibg=#f9efe9 gui=italic
hi Special          guifg=#3e443e guibg=#f9efe9 gui=bold
hi Statement        guifg=#3e443e guibg=#f9efe9 gui=bold
hi PreProc          guifg=#DC8E69 guibg=#f9efe9 gui=bold
hi MatchParen       guifg=#A5896D guibg=#f9efe9 gui=bold
hi Search           guifg=#f9efe9 guibg=#A5896D gui=none
hi Error            guifg=#6F90A7 guibg=#f9efe9 gui=none
hi EndOfBuffer      guifg=#f9efe9 guibg=#f9efe9 gui=none

hi SpellBad         guifg=#6F90A7 guibg=#f9efe9 gui=undercurl,bold
hi SpellCap         guifg=#DC8E69 guibg=#f9efe9 gui=undercurl,bold
hi SpellRare        guifg=#609AC1 guibg=#f9efe9 gui=undercurl,bold
hi SpellLocal       guifg=#60c1b8 guibg=#f9efe9 gui=undercurl,bold

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
hi TabLine          guifg=#DC8E69 guibg=#eabea9 gui=none
hi TabLineSel       guifg=#3e443e guibg=#f9efe9 gui=none
hi TabLineFill      guifg=#DC8E69 guibg=#eabea9 gui=none

hi usrStatus        guifg=#3e443e guibg=#e5dbd5
hi usrgry           guifg=#eabea9 guibg=#e5dbd5 gui=none
hi usrblu           guifg=#f9efe9 guibg=#eabea9 gui=none
hi usrred           guifg=#f9efe9 guibg=#91a7b7 gui=none
hi usrylw           guifg=#f9efe9 guibg=#baa28c gui=none
hi usrgrn           guifg=#f9efe9 guibg=#7a98a0 gui=none
hi usrgnt           guifg=#f9efe9 guibg=#86afcb gui=none
hi USRgry           guifg=#e5dbd5 guibg=#eabea9 gui=bold
hi USRblu           guifg=#eabea9 guibg=#f9efe9 gui=bold
hi USRred           guifg=#91a7b7 guibg=#f9efe9 gui=bold
hi USRylw           guifg=#baa28c guibg=#f9efe9 gui=bold
hi USRgrn           guifg=#7a98a0 guibg=#f9efe9 gui=bold
hi USRgnt           guifg=#86afcb guibg=#f9efe9 gui=bold
