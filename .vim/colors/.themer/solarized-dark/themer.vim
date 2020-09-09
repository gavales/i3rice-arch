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
hi Normal           guifg=#fdf6e3 guibg=#002b36
hi Title            guifg=#fdf6e3 guibg=#002b36 gui=bold
hi LineNr           guifg=#2aa198 guibg=#002b36 gui=none
hi CursorLineNr     guifg=#2aa198 guibg=#143f4a gui=bold
hi SpecialKey       guifg=#143f4a guibg=#002b36
hi ModeMsg          guifg=#002b36 guibg=#2aa198 gui=bold
hi Cursor           guifg=#002b36 guibg=#dc322f
hi ColorColumn                    guibg=#143f4a gui=none
hi CursorLine                     guibg=#143f4a gui=none
hi Visual           guifg=#fdf6e3 guibg=#156667
hi VisualNOS        guifg=#fdf6e3 guibg=#156667

hi Type             guifg=#fdf6e3 guibg=#002b36 gui=bold
hi Identifier       guifg=#b58900 guibg=#002b36 gui=italic
hi Comment          guifg=#156667 guibg=#002b36 gui=italic
hi Folded           guifg=#2aa198 guibg=#002b36 gui=italic
hi FoldColumn       guifg=#002b36 guibg=#002b36 gui=italic
hi Constant         guifg=#fdf6e3 guibg=#002b36 gui=italic
hi Special          guifg=#fdf6e3 guibg=#002b36 gui=bold
hi Statement        guifg=#fdf6e3 guibg=#002b36 gui=bold
hi PreProc          guifg=#2aa198 guibg=#002b36 gui=bold
hi MatchParen       guifg=#b58900 guibg=#002b36 gui=bold
hi Search           guifg=#002b36 guibg=#b58900 gui=none
hi Error            guifg=#dc322f guibg=#002b36 gui=none
hi EndOfBuffer      guifg=#002b36 guibg=#002b36 gui=none

hi SpellBad         guifg=#dc322f guibg=#002b36 gui=undercurl,bold
hi SpellCap         guifg=#2aa198 guibg=#002b36 gui=undercurl,bold
hi SpellRare        guifg=#d33682 guibg=#002b36 gui=undercurl,bold
hi SpellLocal       guifg=#268bd2 guibg=#002b36 gui=undercurl,bold

hi StatusLine       guifg=#002b36 guibg=#2aa198
hi StatusLineNC     guifg=#002b36 guibg=#2aa198
hi StatusLineTerm   guifg=#002b36 guibg=#2aa198
hi StatusLineTermNC guifg=#002b36 guibg=#2aa198
hi ToolbarLine      guifg=#002b36 guibg=#2aa198
hi ToolbarButton    guifg=#002b36 guibg=#2aa198

hi Pmenu            guifg=#2aa198 guibg=#fdf6e3 gui=none
hi PmenuSel         guifg=#002b36 guibg=#2aa198 gui=none
hi PmenuSbar        guifg=#2aa198 guibg=#002b36 gui=none
hi PmenuThumb       guifg=#859900 guibg=#859900 gui=none
hi TabLine          guifg=#2aa198 guibg=#002b36 gui=none
hi TabLineSel       guifg=#002b36 guibg=#2aa198 gui=none
hi TabLineFill      guifg=#2aa198 guibg=#002b36 gui=none
hi TabLine          guifg=#2aa198 guibg=#156667 gui=none
hi TabLineSel       guifg=#fdf6e3 guibg=#002b36 gui=none
hi TabLineFill      guifg=#2aa198 guibg=#156667 gui=none

hi usrStatus        guifg=#fdf6e3 guibg=#143f4a
hi usrgry           guifg=#156667 guibg=#143f4a gui=none
hi usrblu           guifg=#002b36 guibg=#156667 gui=none
hi usrred           guifg=#002b36 guibg=#a53030 gui=none
hi usrylw           guifg=#002b36 guibg=#87710d gui=none
hi usrgrn           guifg=#002b36 guibg=#637d0d gui=none
hi usrgnt           guifg=#002b36 guibg=#9e336f gui=none
hi USRgry           guifg=#143f4a guibg=#156667 gui=bold
hi USRblu           guifg=#156667 guibg=#002b36 gui=bold
hi USRred           guifg=#a53030 guibg=#002b36 gui=bold
hi USRylw           guifg=#87710d guibg=#002b36 gui=bold
hi USRgrn           guifg=#637d0d guibg=#002b36 gui=bold
hi USRgnt           guifg=#9e336f guibg=#002b36 gui=bold
