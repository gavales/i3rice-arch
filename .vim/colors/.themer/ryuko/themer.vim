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
hi Normal           guifg=#040817 guibg=#fdfcfb
hi Title            guifg=#040817 guibg=#fdfcfb gui=bold
hi LineNr           guifg=#666C99 guibg=#fdfcfb gui=none
hi CursorLineNr     guifg=#666C99 guibg=#e9e8e7 gui=bold
hi SpecialKey       guifg=#e9e8e7 guibg=#fdfcfb
hi ModeMsg          guifg=#fdfcfb guibg=#666C99 gui=bold
hi Cursor           guifg=#fdfcfb guibg=#5A4E59
hi ColorColumn                    guibg=#e9e8e7 gui=none
hi CursorLine                     guibg=#e9e8e7 gui=none
hi Visual           guifg=#040817 guibg=#b1b4ca
hi VisualNOS        guifg=#040817 guibg=#b1b4ca

hi Type             guifg=#040817 guibg=#fdfcfb gui=bold
hi Identifier       guifg=#2A44A9 guibg=#fdfcfb gui=italic
hi Comment          guifg=#b1b4ca guibg=#fdfcfb gui=italic
hi Folded           guifg=#666C99 guibg=#fdfcfb gui=italic
hi FoldColumn       guifg=#fdfcfb guibg=#fdfcfb gui=italic
hi Constant         guifg=#040817 guibg=#fdfcfb gui=italic
hi Special          guifg=#040817 guibg=#fdfcfb gui=bold
hi Statement        guifg=#040817 guibg=#fdfcfb gui=bold
hi PreProc          guifg=#666C99 guibg=#fdfcfb gui=bold
hi MatchParen       guifg=#2A44A9 guibg=#fdfcfb gui=bold
hi Search           guifg=#fdfcfb guibg=#2A44A9 gui=none
hi Error            guifg=#5A4E59 guibg=#fdfcfb gui=none
hi EndOfBuffer      guifg=#fdfcfb guibg=#fdfcfb gui=none

hi SpellBad         guifg=#5A4E59 guibg=#fdfcfb gui=undercurl,bold
hi SpellCap         guifg=#666C99 guibg=#fdfcfb gui=undercurl,bold
hi SpellRare        guifg=#7B87A5 guibg=#fdfcfb gui=undercurl,bold
hi SpellLocal       guifg=#B4A4A9 guibg=#fdfcfb gui=undercurl,bold

hi StatusLine       guifg=#fdfcfb guibg=#666C99
hi StatusLineNC     guifg=#fdfcfb guibg=#666C99
hi StatusLineTerm   guifg=#fdfcfb guibg=#666C99
hi StatusLineTermNC guifg=#fdfcfb guibg=#666C99
hi ToolbarLine      guifg=#fdfcfb guibg=#666C99
hi ToolbarButton    guifg=#fdfcfb guibg=#666C99

hi Pmenu            guifg=#666C99 guibg=#040817 gui=none
hi PmenuSel         guifg=#fdfcfb guibg=#666C99 gui=none
hi PmenuSbar        guifg=#666C99 guibg=#fdfcfb gui=none
hi PmenuThumb       guifg=#C02E17 guibg=#C02E17 gui=none
hi TabLine          guifg=#666C99 guibg=#fdfcfb gui=none
hi TabLineSel       guifg=#fdfcfb guibg=#666C99 gui=none
hi TabLineFill      guifg=#666C99 guibg=#fdfcfb gui=none
hi TabLine          guifg=#666C99 guibg=#b1b4ca gui=none
hi TabLineSel       guifg=#040817 guibg=#fdfcfb gui=none
hi TabLineFill      guifg=#666C99 guibg=#b1b4ca gui=none

hi usrStatus        guifg=#040817 guibg=#e9e8e7
hi usrgry           guifg=#b1b4ca guibg=#e9e8e7 gui=none
hi usrblu           guifg=#fdfcfb guibg=#b1b4ca gui=none
hi usrred           guifg=#fdfcfb guibg=#827981 gui=none
hi usrylw           guifg=#fdfcfb guibg=#5e72bd gui=none
hi usrgrn           guifg=#fdfcfb guibg=#cf6150 gui=none
hi usrgnt           guifg=#fdfcfb guibg=#9ba4ba gui=none
hi USRgry           guifg=#e9e8e7 guibg=#b1b4ca gui=bold
hi USRblu           guifg=#b1b4ca guibg=#fdfcfb gui=bold
hi USRred           guifg=#827981 guibg=#fdfcfb gui=bold
hi USRylw           guifg=#5e72bd guibg=#fdfcfb gui=bold
hi USRgrn           guifg=#cf6150 guibg=#fdfcfb gui=bold
hi USRgnt           guifg=#9ba4ba guibg=#fdfcfb gui=bold
