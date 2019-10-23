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
hi Normal           guifg=#3B4252 guibg=#D8DEE9
hi Title            guifg=#3B4252 guibg=#D8DEE9 gui=bold
hi LineNr           guifg=#8FBCBB guibg=#D8DEE9 gui=none
hi CursorLineNr     guifg=#8FBCBB guibg=#c4cad5 gui=bold
hi SpecialKey       guifg=#c4cad5 guibg=#D8DEE9
hi ModeMsg          guifg=#D8DEE9 guibg=#8FBCBB gui=bold
hi Cursor           guifg=#D8DEE9 guibg=#bf616a
hi ColorColumn                    guibg=#c4cad5 gui=none
hi CursorLine                     guibg=#c4cad5 gui=none
hi Visual           guifg=#3B4252 guibg=#b3cdd2
hi VisualNOS        guifg=#3B4252 guibg=#b3cdd2

hi Type             guifg=#3B4252 guibg=#D8DEE9 gui=bold
hi Identifier       guifg=#ebcb8b guibg=#D8DEE9 gui=italic
hi Comment          guifg=#b3cdd2 guibg=#D8DEE9 gui=italic
hi Folded           guifg=#8FBCBB guibg=#D8DEE9 gui=italic
hi Constant         guifg=#3B4252 guibg=#D8DEE9 gui=italic
hi Special          guifg=#3B4252 guibg=#D8DEE9 gui=bold
hi Statement        guifg=#3B4252 guibg=#D8DEE9 gui=bold
hi PreProc          guifg=#8FBCBB guibg=#D8DEE9 gui=bold
hi MatchParen       guifg=#ebcb8b guibg=#D8DEE9 gui=bold
hi Search           guifg=#D8DEE9 guibg=#ebcb8b gui=none
hi Error            guifg=#bf616a guibg=#D8DEE9 gui=none
hi EndOfBuffer      guifg=#D8DEE9 guibg=#D8DEE9 gui=none

hi SpellBad         guifg=#bf616a guibg=#D8DEE9 gui=underline,bold
hi SpellCap         guifg=#8FBCBB guibg=#D8DEE9 gui=underline,bold
hi SpellRare        guifg=#b48ead guibg=#D8DEE9 gui=underline,bold
hi SpellLocal       guifg=#009090 guibg=#D8DEE9 gui=underline,bold

hi StatusLine       guifg=#D8DEE9 guibg=#8FBCBB
hi StatusLineNC     guifg=#D8DEE9 guibg=#8FBCBB
hi StatusLineTerm   guifg=#D8DEE9 guibg=#8FBCBB
hi StatusLineTermNC guifg=#D8DEE9 guibg=#8FBCBB
hi ToolbarLine      guifg=#D8DEE9 guibg=#8FBCBB
hi ToolbarButton    guifg=#D8DEE9 guibg=#8FBCBB

hi Pmenu            guifg=#8FBCBB guibg=#3B4252 gui=none
hi PmenuSel         guifg=#D8DEE9 guibg=#8FBCBB gui=none
hi PmenuSbar        guifg=#8FBCBB guibg=#D8DEE9 gui=none
hi PmenuThumb       guifg=#a3be8c guibg=#a3be8c gui=none
hi TabLine          guifg=#8FBCBB guibg=#D8DEE9 gui=none
hi TabLineSel       guifg=#D8DEE9 guibg=#8FBCBB gui=none
hi TabLineFill      guifg=#8FBCBB guibg=#D8DEE9 gui=none
hi TabLine          guifg=#8FBCBB guibg=#b3cdd2 gui=none
hi TabLineSel       guifg=#3B4252 guibg=#D8DEE9 gui=none
hi TabLineFill      guifg=#8FBCBB guibg=#b3cdd2 gui=none

hi usrred           guifg=#D8DEE9 guibg=#bf616a
hi usrylw           guifg=#D8DEE9 guibg=#ebcb8b
hi usrgrn           guifg=#D8DEE9 guibg=#a3be8c
hi usrgry           guifg=#D8DEE9 guibg=#9ca2ad
hi usrblu           guifg=#D8DEE9 guibg=#8FBCBB
hi usrgnt           guifg=#D8DEE9 guibg=#b48ead

