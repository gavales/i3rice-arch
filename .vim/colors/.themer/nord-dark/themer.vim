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
hi Normal           guifg=#D8DEE9 guibg=#3B4252
hi Title            guifg=#D8DEE9 guibg=#3B4252 gui=bold
hi LineNr           guifg=#8FBCBB guibg=#3B4252 gui=none
hi CursorLineNr     guifg=#8FBCBB guibg=#4f5666 gui=bold
hi SpecialKey       guifg=#4f5666 guibg=#3B4252
hi ModeMsg          guifg=#3B4252 guibg=#8FBCBB gui=bold
hi Cursor           guifg=#3B4252 guibg=#bf616a
hi ColorColumn                    guibg=#4f5666 gui=none
hi CursorLine                     guibg=#4f5666 gui=none
hi Visual           guifg=#D8DEE9 guibg=#657f86
hi VisualNOS        guifg=#D8DEE9 guibg=#657f86

hi Type             guifg=#D8DEE9 guibg=#3B4252 gui=bold
hi Identifier       guifg=#ebcb8b guibg=#3B4252 gui=italic
hi Comment          guifg=#657f86 guibg=#3B4252 gui=italic
hi Folded           guifg=#8FBCBB guibg=#3B4252 gui=italic
hi Constant         guifg=#D8DEE9 guibg=#3B4252 gui=italic
hi Special          guifg=#D8DEE9 guibg=#3B4252 gui=bold
hi Statement        guifg=#D8DEE9 guibg=#3B4252 gui=bold
hi PreProc          guifg=#8FBCBB guibg=#3B4252 gui=bold
hi MatchParen       guifg=#ebcb8b guibg=#3B4252 gui=bold
hi Search           guifg=#3B4252 guibg=#ebcb8b gui=none
hi Error            guifg=#bf616a guibg=#3B4252 gui=none
hi EndOfBuffer      guifg=#3B4252 guibg=#3B4252 gui=none

hi SpellBad         guifg=#bf616a guibg=#3B4252 gui=underline,bold
hi SpellCap         guifg=#8FBCBB guibg=#3B4252 gui=underline,bold
hi SpellRare        guifg=#b48ead guibg=#3B4252 gui=underline,bold
hi SpellLocal       guifg=#009090 guibg=#3B4252 gui=underline,bold

hi StatusLine       guifg=#3B4252 guibg=#8FBCBB
hi StatusLineNC     guifg=#3B4252 guibg=#8FBCBB
hi StatusLineTerm   guifg=#3B4252 guibg=#8FBCBB
hi StatusLineTermNC guifg=#3B4252 guibg=#8FBCBB
hi ToolbarLine      guifg=#3B4252 guibg=#8FBCBB
hi ToolbarButton    guifg=#3B4252 guibg=#8FBCBB

hi Pmenu            guifg=#8FBCBB guibg=#D8DEE9 gui=none
hi PmenuSel         guifg=#3B4252 guibg=#8FBCBB gui=none
hi PmenuSbar        guifg=#8FBCBB guibg=#3B4252 gui=none
hi PmenuThumb       guifg=#a3be8c guibg=#a3be8c gui=none
hi TabLine          guifg=#8FBCBB guibg=#3B4252 gui=none
hi TabLineSel       guifg=#3B4252 guibg=#8FBCBB gui=none
hi TabLineFill      guifg=#8FBCBB guibg=#3B4252 gui=none
hi TabLine          guifg=#8FBCBB guibg=#657f86 gui=none
hi TabLineSel       guifg=#D8DEE9 guibg=#3B4252 gui=none
hi TabLineFill      guifg=#8FBCBB guibg=#657f86 gui=none

hi usrred           guifg=#3B4252 guibg=#bf616a
hi usrylw           guifg=#3B4252 guibg=#ebcb8b
hi usrgrn           guifg=#3B4252 guibg=#a3be8c
hi usrgry           guifg=#3B4252 guibg=#777e8e
hi usrblu           guifg=#3B4252 guibg=#8FBCBB
hi usrgnt           guifg=#3B4252 guibg=#b48ead

