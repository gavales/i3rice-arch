" Vim color file
" Converted from Textmate theme Brogrammer using Coloration v0.4.0 (http://github.com/sickill/coloration)

set background=dark
highlight clear

if exists("syntax_on")
  syntax reset
endif

let g:colors_name = "themer"

" >> CTERM
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
hi TabLine          ctermfg=blue     ctermbg=Gray     cterm=none
hi TabLineSel       ctermfg=white    ctermbg=black    cterm=none
hi TabLineFill      ctermfg=blue     ctermbg=Gray     cterm=none

hi usrred           ctermfg=white    ctermbg=red
hi usrylw           ctermfg=black    ctermbg=yellow
hi usrgrn           ctermfg=black    ctermbg=green
hi usrgry           ctermfg=black    ctermbg=grey
hi usrblu           ctermfg=black    ctermbg=blue
hi usrgnt           ctermfg=black    ctermbg=magenta

" >> GUI
hi Normal           guifg=#f9efe9 guibg=#3e443e
hi Title            guifg=#f9efe9 guibg=#3e443e gui=bold
hi LineNr           guifg=#DC8E69 guibg=#3e443e gui=none
hi CursorLineNr     guifg=#DC8E69 guibg=#525852 gui=bold
hi SpecialKey       guifg=#525852 guibg=#3e443e
hi ModeMsg          guifg=#3e443e guibg=#DC8E69 gui=bold
hi Cursor           guifg=#3e443e guibg=#6F90A7
hi ColorColumn                    guibg=#525852 gui=none
hi CursorLine                     guibg=#525852 gui=none
hi Visual           guifg=#f9efe9 guibg=#8d6953
hi VisualNOS        guifg=#f9efe9 guibg=#8d6953

hi Type             guifg=#f9efe9 guibg=#3e443e gui=bold
hi Identifier       guifg=#A5896D guibg=#3e443e gui=italic
hi Comment          guifg=#8d6953 guibg=#3e443e gui=italic
hi Folded           guifg=#DC8E69 guibg=#3e443e gui=italic
hi Constant         guifg=#f9efe9 guibg=#3e443e gui=italic
hi Special          guifg=#f9efe9 guibg=#3e443e gui=bold
hi Statement        guifg=#f9efe9 guibg=#3e443e gui=bold
hi PreProc          guifg=#DC8E69 guibg=#3e443e gui=bold
hi MatchParen       guifg=#A5896D guibg=#3e443e gui=bold
hi Search           guifg=#3e443e guibg=#A5896D gui=none
hi Error            guifg=#6F90A7 guibg=#3e443e gui=none
hi EndOfBuffer      guifg=#3e443e guibg=#3e443e gui=none

hi SpellBad         guifg=#6F90A7 guibg=#3e443e gui=underline,bold
hi SpellCap         guifg=#DC8E69 guibg=#3e443e gui=underline,bold
hi SpellRare        guifg=#609AC1 guibg=#3e443e gui=underline,bold
hi SpellLocal       guifg=#60c1b8 guibg=#3e443e gui=underline,bold

hi StatusLine       guifg=#3e443e guibg=#DC8E69
hi StatusLineNC     guifg=#3e443e guibg=#DC8E69
hi StatusLineTerm   guifg=#3e443e guibg=#DC8E69
hi StatusLineTermNC guifg=#3e443e guibg=#DC8E69
hi ToolbarLine      guifg=#3e443e guibg=#DC8E69
hi ToolbarButton    guifg=#3e443e guibg=#DC8E69

hi Pmenu            guifg=#DC8E69 guibg=#f9efe9 gui=none
hi PmenuSel         guifg=#3e443e guibg=#DC8E69 gui=none
hi PmenuSbar        guifg=#DC8E69 guibg=#3e443e gui=none
hi PmenuThumb       guifg=#507C88 guibg=#507C88 gui=none
hi TabLine          guifg=#DC8E69 guibg=#3e443e gui=none
hi TabLineSel       guifg=#3e443e guibg=#DC8E69 gui=none
hi TabLineFill      guifg=#DC8E69 guibg=#3e443e gui=none
hi TabLine          guifg=#DC8E69 guibg=#8d6953 gui=none
hi TabLineSel       guifg=#f9efe9 guibg=#3e443e gui=none
hi TabLineFill      guifg=#DC8E69 guibg=#8d6953 gui=none

hi usrred           guifg=#3e443e guibg=#6F90A7
hi usrylw           guifg=#3e443e guibg=#A5896D
hi usrgrn           guifg=#3e443e guibg=#507C88
hi usrgry           guifg=#3e443e guibg=#7a807a
hi usrblu           guifg=#3e443e guibg=#DC8E69
hi usrgnt           guifg=#3e443e guibg=#609AC1

