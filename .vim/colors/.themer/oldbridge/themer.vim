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
hi Normal           guifg=#343235 guibg=#e9e7e3
hi Title            guifg=#343235 guibg=#e9e7e3 gui=bold
hi LineNr           guifg=#96778A guibg=#e9e7e3 gui=none
hi CursorLineNr     guifg=#96778A guibg=#d5d3cf gui=bold
hi SpecialKey       guifg=#d5d3cf guibg=#e9e7e3
hi ModeMsg          guifg=#e9e7e3 guibg=#96778A gui=bold
hi Cursor           guifg=#e9e7e3 guibg=#A36043
hi ColorColumn                    guibg=#d5d3cf gui=none
hi CursorLine                     guibg=#d5d3cf gui=none
hi Visual           guifg=#343235 guibg=#bfafb6
hi VisualNOS        guifg=#343235 guibg=#bfafb6

hi Type             guifg=#343235 guibg=#e9e7e3 gui=bold
hi Identifier       guifg=#D09B6D guibg=#e9e7e3 gui=italic
hi Comment          guifg=#bfafb6 guibg=#e9e7e3 gui=italic
hi Folded           guifg=#96778A guibg=#e9e7e3 gui=italic
hi FoldColumn       guifg=#e9e7e3 guibg=#e9e7e3 gui=italic
hi Constant         guifg=#343235 guibg=#e9e7e3 gui=italic
hi Special          guifg=#343235 guibg=#e9e7e3 gui=bold
hi Statement        guifg=#343235 guibg=#e9e7e3 gui=bold
hi PreProc          guifg=#96778A guibg=#e9e7e3 gui=bold
hi MatchParen       guifg=#D09B6D guibg=#e9e7e3 gui=bold
hi Search           guifg=#e9e7e3 guibg=#D09B6D gui=none
hi Error            guifg=#A36043 guibg=#e9e7e3 gui=none
hi EndOfBuffer      guifg=#e9e7e3 guibg=#e9e7e3 gui=none

hi SpellBad         guifg=#A36043 guibg=#e9e7e3 gui=undercurl,bold
hi SpellCap         guifg=#96778A guibg=#e9e7e3 gui=undercurl,bold
hi SpellRare        guifg=#D5AE91 guibg=#e9e7e3 gui=undercurl,bold
hi SpellLocal       guifg=#C4A7BB guibg=#e9e7e3 gui=undercurl,bold

hi StatusLine       guifg=#e9e7e3 guibg=#96778A
hi StatusLineNC     guifg=#e9e7e3 guibg=#96778A
hi StatusLineTerm   guifg=#e9e7e3 guibg=#96778A
hi StatusLineTermNC guifg=#e9e7e3 guibg=#96778A
hi ToolbarLine      guifg=#e9e7e3 guibg=#96778A
hi ToolbarButton    guifg=#e9e7e3 guibg=#96778A

hi Pmenu            guifg=#96778A guibg=#343235 gui=none
hi PmenuSel         guifg=#e9e7e3 guibg=#96778A gui=none
hi PmenuSbar        guifg=#96778A guibg=#e9e7e3 gui=none
hi PmenuThumb       guifg=#B98C68 guibg=#B98C68 gui=none
hi TabLine          guifg=#96778A guibg=#e9e7e3 gui=none
hi TabLineSel       guifg=#e9e7e3 guibg=#96778A gui=none
hi TabLineFill      guifg=#96778A guibg=#e9e7e3 gui=none
hi TabLine          guifg=#96778A guibg=#bfafb6 gui=none
hi TabLineSel       guifg=#343235 guibg=#e9e7e3 gui=none
hi TabLineFill      guifg=#96778A guibg=#bfafb6 gui=none

hi usrStatus        guifg=#343235 guibg=#d5d3cf
hi usrgry           guifg=#bfafb6 guibg=#d5d3cf gui=none
hi usrblu           guifg=#e9e7e3 guibg=#bfafb6 gui=none
hi usrred           guifg=#e9e7e3 guibg=#ac7a6a gui=none
hi usrylw           guifg=#e9e7e3 guibg=#caa185 gui=none
hi usrgrn           guifg=#e9e7e3 guibg=#bb9782 gui=none
hi usrgnt           guifg=#e9e7e3 guibg=#cdae9d gui=none
hi USRgry           guifg=#d5d3cf guibg=#bfafb6 gui=bold
hi USRblu           guifg=#bfafb6 guibg=#e9e7e3 gui=bold
hi USRred           guifg=#ac7a6a guibg=#e9e7e3 gui=bold
hi USRylw           guifg=#caa185 guibg=#e9e7e3 gui=bold
hi USRgrn           guifg=#bb9782 guibg=#e9e7e3 gui=bold
hi USRgnt           guifg=#cdae9d guibg=#e9e7e3 gui=bold
