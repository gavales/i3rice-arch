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
hi Normal           guifg=#fdf6e3 guibg=#3b4d4f
hi Title            guifg=#fdf6e3 guibg=#3b4d4f gui=bold
hi LineNr           guifg=#e46c6d guibg=#3b4d4f gui=none
hi CursorLineNr     guifg=#e46c6d guibg=#4f6163 gui=bold
hi SpecialKey       guifg=#4f6163 guibg=#3b4d4f
hi ModeMsg          guifg=#3b4d4f guibg=#e46c6d gui=bold
hi Cursor           guifg=#3b4d4f guibg=#d65455
hi ColorColumn                    guibg=#4f6163 gui=none
hi CursorLine                     guibg=#4f6163 gui=none
hi Visual           guifg=#fdf6e3 guibg=#8f5c5e
hi VisualNOS        guifg=#fdf6e3 guibg=#8f5c5e

hi Type             guifg=#fdf6e3 guibg=#3b4d4f gui=bold
hi Identifier       guifg=#c49b4a guibg=#3b4d4f gui=italic
hi Comment          guifg=#8f5c5e guibg=#3b4d4f gui=italic
hi Folded           guifg=#e46c6d guibg=#3b4d4f gui=italic
hi FoldColumn       guifg=#3b4d4f guibg=#3b4d4f gui=italic
hi Constant         guifg=#fdf6e3 guibg=#3b4d4f gui=italic
hi Special          guifg=#fdf6e3 guibg=#3b4d4f gui=bold
hi Statement        guifg=#fdf6e3 guibg=#3b4d4f gui=bold
hi PreProc          guifg=#e46c6d guibg=#3b4d4f gui=bold
hi MatchParen       guifg=#c49b4a guibg=#3b4d4f gui=bold
hi Search           guifg=#3b4d4f guibg=#c49b4a gui=none
hi Error            guifg=#d65455 guibg=#3b4d4f gui=none
hi EndOfBuffer      guifg=#3b4d4f guibg=#3b4d4f gui=none

hi SpellBad         guifg=#d65455 guibg=#3b4d4f gui=undercurl,bold
hi SpellCap         guifg=#e46c6d guibg=#3b4d4f gui=undercurl,bold
hi SpellRare        guifg=#a38895 guibg=#3b4d4f gui=undercurl,bold
hi SpellLocal       guifg=#4eb3ac guibg=#3b4d4f gui=undercurl,bold

hi StatusLine       guifg=#3b4d4f guibg=#e46c6d
hi StatusLineNC     guifg=#3b4d4f guibg=#e46c6d
hi StatusLineTerm   guifg=#3b4d4f guibg=#e46c6d
hi StatusLineTermNC guifg=#3b4d4f guibg=#e46c6d
hi ToolbarLine      guifg=#3b4d4f guibg=#e46c6d
hi ToolbarButton    guifg=#3b4d4f guibg=#e46c6d

hi Pmenu            guifg=#e46c6d guibg=#fdf6e3 gui=none
hi PmenuSel         guifg=#3b4d4f guibg=#e46c6d gui=none
hi PmenuSbar        guifg=#e46c6d guibg=#3b4d4f gui=none
hi PmenuThumb       guifg=#8cb88b guibg=#8cb88b gui=none
hi TabLine          guifg=#e46c6d guibg=#3b4d4f gui=none
hi TabLineSel       guifg=#3b4d4f guibg=#e46c6d gui=none
hi TabLineFill      guifg=#e46c6d guibg=#3b4d4f gui=none
hi TabLine          guifg=#e46c6d guibg=#8f5c5e gui=none
hi TabLineSel       guifg=#fdf6e3 guibg=#3b4d4f gui=none
hi TabLineFill      guifg=#e46c6d guibg=#8f5c5e gui=none

hi usrStatus        guifg=#fdf6e3 guibg=#4f6163
hi usrgry           guifg=#8f5c5e guibg=#4f6163 gui=none
hi usrblu           guifg=#3b4d4f guibg=#8f5c5e gui=none
hi usrred           guifg=#3b4d4f guibg=#af5253 gui=none
hi usrylw           guifg=#3b4d4f guibg=#a1874b gui=none
hi usrgrn           guifg=#3b4d4f guibg=#779d7c gui=none
hi usrgnt           guifg=#3b4d4f guibg=#897983 gui=none
hi USRgry           guifg=#4f6163 guibg=#8f5c5e gui=bold
hi USRblu           guifg=#8f5c5e guibg=#3b4d4f gui=bold
hi USRred           guifg=#af5253 guibg=#3b4d4f gui=bold
hi USRylw           guifg=#a1874b guibg=#3b4d4f gui=bold
hi USRgrn           guifg=#779d7c guibg=#3b4d4f gui=bold
hi USRgnt           guifg=#897983 guibg=#3b4d4f gui=bold
