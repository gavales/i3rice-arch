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
hi Normal           guifg=#3b4d4f guibg=#fdf6e3
hi Title            guifg=#3b4d4f guibg=#fdf6e3 gui=bold
hi LineNr           guifg=#e46c6d guibg=#fdf6e3 gui=none
hi CursorLineNr     guifg=#e46c6d guibg=#e9e2cf gui=bold
hi SpecialKey       guifg=#e9e2cf guibg=#fdf6e3
hi ModeMsg          guifg=#fdf6e3 guibg=#e46c6d gui=bold
hi Cursor           guifg=#fdf6e3 guibg=#d65455
hi ColorColumn                    guibg=#e9e2cf gui=none
hi CursorLine                     guibg=#e9e2cf gui=none
hi Visual           guifg=#3b4d4f guibg=#f0b1a8
hi VisualNOS        guifg=#3b4d4f guibg=#f0b1a8

hi Type             guifg=#3b4d4f guibg=#fdf6e3 gui=bold
hi Identifier       guifg=#c49b4a guibg=#fdf6e3 gui=italic
hi Comment          guifg=#f0b1a8 guibg=#fdf6e3 gui=italic
hi Folded           guifg=#e46c6d guibg=#fdf6e3 gui=italic
hi FoldColumn       guifg=#fdf6e3 guibg=#fdf6e3 gui=italic
hi Constant         guifg=#3b4d4f guibg=#fdf6e3 gui=italic
hi Special          guifg=#3b4d4f guibg=#fdf6e3 gui=bold
hi Statement        guifg=#3b4d4f guibg=#fdf6e3 gui=bold
hi PreProc          guifg=#e46c6d guibg=#fdf6e3 gui=bold
hi MatchParen       guifg=#c49b4a guibg=#fdf6e3 gui=bold
hi Search           guifg=#fdf6e3 guibg=#c49b4a gui=none
hi Error            guifg=#d65455 guibg=#fdf6e3 gui=none
hi EndOfBuffer      guifg=#fdf6e3 guibg=#fdf6e3 gui=none

hi SpellBad         guifg=#d65455 guibg=#fdf6e3 gui=undercurl,bold
hi SpellCap         guifg=#e46c6d guibg=#fdf6e3 gui=undercurl,bold
hi SpellRare        guifg=#a38895 guibg=#fdf6e3 gui=undercurl,bold
hi SpellLocal       guifg=#4eb3ac guibg=#fdf6e3 gui=undercurl,bold

hi StatusLine       guifg=#fdf6e3 guibg=#e46c6d
hi StatusLineNC     guifg=#fdf6e3 guibg=#e46c6d
hi StatusLineTerm   guifg=#fdf6e3 guibg=#e46c6d
hi StatusLineTermNC guifg=#fdf6e3 guibg=#e46c6d
hi ToolbarLine      guifg=#fdf6e3 guibg=#e46c6d
hi ToolbarButton    guifg=#fdf6e3 guibg=#e46c6d

hi Pmenu            guifg=#e46c6d guibg=#3b4d4f gui=none
hi PmenuSel         guifg=#fdf6e3 guibg=#e46c6d gui=none
hi PmenuSbar        guifg=#e46c6d guibg=#fdf6e3 gui=none
hi PmenuThumb       guifg=#8cb88b guibg=#8cb88b gui=none
hi TabLine          guifg=#e46c6d guibg=#fdf6e3 gui=none
hi TabLineSel       guifg=#fdf6e3 guibg=#e46c6d gui=none
hi TabLineFill      guifg=#e46c6d guibg=#fdf6e3 gui=none
hi TabLine          guifg=#e46c6d guibg=#f0b1a8 gui=none
hi TabLineSel       guifg=#3b4d4f guibg=#fdf6e3 gui=none
hi TabLineFill      guifg=#e46c6d guibg=#f0b1a8 gui=none

hi usrStatus        guifg=#3b4d4f guibg=#e9e2cf
hi usrgry           guifg=#f0b1a8 guibg=#e9e2cf gui=none
hi usrblu           guifg=#fdf6e3 guibg=#f0b1a8 gui=none
hi usrred           guifg=#fdf6e3 guibg=#df7c78 gui=none
hi usrylw           guifg=#fdf6e3 guibg=#d2b170 gui=none
hi usrgrn           guifg=#fdf6e3 guibg=#a8c7a1 gui=none
hi usrgnt           guifg=#fdf6e3 guibg=#b9a3a8 gui=none
hi USRgry           guifg=#e9e2cf guibg=#f0b1a8 gui=bold
hi USRblu           guifg=#f0b1a8 guibg=#fdf6e3 gui=bold
hi USRred           guifg=#df7c78 guibg=#fdf6e3 gui=bold
hi USRylw           guifg=#d2b170 guibg=#fdf6e3 gui=bold
hi USRgrn           guifg=#a8c7a1 guibg=#fdf6e3 gui=bold
hi USRgnt           guifg=#b9a3a8 guibg=#fdf6e3 gui=bold
