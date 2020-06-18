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
hi Normal           guifg=#c3bba6 guibg=#360A09
hi Title            guifg=#c3bba6 guibg=#360A09 gui=bold
hi LineNr           guifg=#D7AB39 guibg=#360A09 gui=none
hi CursorLineNr     guifg=#D7AB39 guibg=#4a1e1d gui=bold
hi SpecialKey       guifg=#4a1e1d guibg=#360A09
hi ModeMsg          guifg=#360A09 guibg=#D7AB39 gui=bold
hi Cursor           guifg=#360A09 guibg=#CC3B2F
hi ColorColumn                    guibg=#4a1e1d gui=none
hi CursorLine                     guibg=#4a1e1d gui=none
hi Visual           guifg=#c3bba6 guibg=#865a21
hi VisualNOS        guifg=#c3bba6 guibg=#865a21

hi Type             guifg=#c3bba6 guibg=#360A09 gui=bold
hi Identifier       guifg=#CE7012 guibg=#360A09 gui=italic
hi Comment          guifg=#865a21 guibg=#360A09 gui=italic
hi Folded           guifg=#D7AB39 guibg=#360A09 gui=italic
hi FoldColumn       guifg=#360A09 guibg=#360A09 gui=italic
hi Constant         guifg=#c3bba6 guibg=#360A09 gui=italic
hi Special          guifg=#c3bba6 guibg=#360A09 gui=bold
hi Statement        guifg=#c3bba6 guibg=#360A09 gui=bold
hi PreProc          guifg=#D7AB39 guibg=#360A09 gui=bold
hi MatchParen       guifg=#CE7012 guibg=#360A09 gui=bold
hi Search           guifg=#360A09 guibg=#CE7012 gui=none
hi Error            guifg=#CC3B2F guibg=#360A09 gui=none
hi EndOfBuffer      guifg=#360A09 guibg=#360A09 gui=none

hi SpellBad         guifg=#CC3B2F guibg=#360A09 gui=undercurl,bold
hi SpellCap         guifg=#D7AB39 guibg=#360A09 gui=undercurl,bold
hi SpellRare        guifg=#ECA421 guibg=#360A09 gui=undercurl,bold
hi SpellLocal       guifg=#F4D65E guibg=#360A09 gui=undercurl,bold

hi StatusLine       guifg=#360A09 guibg=#D7AB39
hi StatusLineNC     guifg=#360A09 guibg=#D7AB39
hi StatusLineTerm   guifg=#360A09 guibg=#D7AB39
hi StatusLineTermNC guifg=#360A09 guibg=#D7AB39
hi ToolbarLine      guifg=#360A09 guibg=#D7AB39
hi ToolbarButton    guifg=#360A09 guibg=#D7AB39

hi Pmenu            guifg=#D7AB39 guibg=#c3bba6 gui=none
hi PmenuSel         guifg=#360A09 guibg=#D7AB39 gui=none
hi PmenuSbar        guifg=#D7AB39 guibg=#360A09 gui=none
hi PmenuThumb       guifg=#A15B15 guibg=#A15B15 gui=none
hi TabLine          guifg=#D7AB39 guibg=#360A09 gui=none
hi TabLineSel       guifg=#360A09 guibg=#D7AB39 gui=none
hi TabLineFill      guifg=#D7AB39 guibg=#360A09 gui=none
hi TabLine          guifg=#D7AB39 guibg=#865a21 gui=none
hi TabLineSel       guifg=#c3bba6 guibg=#360A09 gui=none
hi TabLineFill      guifg=#D7AB39 guibg=#865a21 gui=none

hi usrStatus        guifg=#c3bba6 guibg=#4a1e1d
hi usrgry           guifg=#865a21 guibg=#4a1e1d gui=none
hi usrblu           guifg=#360A09 guibg=#865a21 gui=none
hi usrred           guifg=#360A09 guibg=#a62e25 gui=none
hi usrylw           guifg=#360A09 guibg=#a8560f gui=none
hi usrgrn           guifg=#360A09 guibg=#864612 gui=none
hi usrgnt           guifg=#360A09 guibg=#be7d1b gui=none
hi USRgry           guifg=#4a1e1d guibg=#865a21 gui=bold
hi USRblu           guifg=#865a21 guibg=#360A09 gui=bold
hi USRred           guifg=#a62e25 guibg=#360A09 gui=bold
hi USRylw           guifg=#a8560f guibg=#360A09 gui=bold
hi USRgrn           guifg=#864612 guibg=#360A09 gui=bold
hi USRgnt           guifg=#be7d1b guibg=#360A09 gui=bold
