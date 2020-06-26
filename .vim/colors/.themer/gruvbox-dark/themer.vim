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
hi Normal           guifg=#fbf1c7 guibg=#282828
hi Title            guifg=#fbf1c7 guibg=#282828 gui=bold
hi LineNr           guifg=#689d6a guibg=#282828 gui=none
hi CursorLineNr     guifg=#689d6a guibg=#3c3c3c gui=bold
hi SpecialKey       guifg=#3c3c3c guibg=#282828
hi ModeMsg          guifg=#282828 guibg=#689d6a gui=bold
hi Cursor           guifg=#282828 guibg=#cc241d
hi ColorColumn                    guibg=#3c3c3c gui=none
hi CursorLine                     guibg=#3c3c3c gui=none
hi Visual           guifg=#fbf1c7 guibg=#486249
hi VisualNOS        guifg=#fbf1c7 guibg=#486249

hi Type             guifg=#fbf1c7 guibg=#282828 gui=bold
hi Identifier       guifg=#d79921 guibg=#282828 gui=italic
hi Comment          guifg=#486249 guibg=#282828 gui=italic
hi Folded           guifg=#689d6a guibg=#282828 gui=italic
hi FoldColumn       guifg=#282828 guibg=#282828 gui=italic
hi Constant         guifg=#fbf1c7 guibg=#282828 gui=italic
hi Special          guifg=#fbf1c7 guibg=#282828 gui=bold
hi Statement        guifg=#fbf1c7 guibg=#282828 gui=bold
hi PreProc          guifg=#689d6a guibg=#282828 gui=bold
hi MatchParen       guifg=#d79921 guibg=#282828 gui=bold
hi Search           guifg=#282828 guibg=#d79921 gui=none
hi Error            guifg=#cc241d guibg=#282828 gui=none
hi EndOfBuffer      guifg=#282828 guibg=#282828 gui=none

hi SpellBad         guifg=#cc241d guibg=#282828 gui=undercurl,bold
hi SpellCap         guifg=#689d6a guibg=#282828 gui=undercurl,bold
hi SpellRare        guifg=#b16286 guibg=#282828 gui=undercurl,bold
hi SpellLocal       guifg=#458588 guibg=#282828 gui=undercurl,bold

hi StatusLine       guifg=#282828 guibg=#689d6a
hi StatusLineNC     guifg=#282828 guibg=#689d6a
hi StatusLineTerm   guifg=#282828 guibg=#689d6a
hi StatusLineTermNC guifg=#282828 guibg=#689d6a
hi ToolbarLine      guifg=#282828 guibg=#689d6a
hi ToolbarButton    guifg=#282828 guibg=#689d6a

hi Pmenu            guifg=#689d6a guibg=#fbf1c7 gui=none
hi PmenuSel         guifg=#282828 guibg=#689d6a gui=none
hi PmenuSbar        guifg=#689d6a guibg=#282828 gui=none
hi PmenuThumb       guifg=#98971a guibg=#98971a gui=none
hi TabLine          guifg=#689d6a guibg=#282828 gui=none
hi TabLineSel       guifg=#282828 guibg=#689d6a gui=none
hi TabLineFill      guifg=#689d6a guibg=#282828 gui=none
hi TabLine          guifg=#689d6a guibg=#486249 gui=none
hi TabLineSel       guifg=#fbf1c7 guibg=#282828 gui=none
hi TabLineFill      guifg=#689d6a guibg=#486249 gui=none

hi usrStatus        guifg=#fbf1c7 guibg=#3c3c3c
hi usrgry           guifg=#486249 guibg=#3c3c3c gui=none
hi usrblu           guifg=#282828 guibg=#486249 gui=none
hi usrred           guifg=#282828 guibg=#a3251f gui=none
hi usrylw           guifg=#282828 guibg=#ab7c22 gui=none
hi usrgrn           guifg=#282828 guibg=#7c7b1d gui=none
hi usrgnt           guifg=#282828 guibg=#8e536e gui=none
hi USRgry           guifg=#3c3c3c guibg=#486249 gui=bold
hi USRblu           guifg=#486249 guibg=#282828 gui=bold
hi USRred           guifg=#a3251f guibg=#282828 gui=bold
hi USRylw           guifg=#ab7c22 guibg=#282828 gui=bold
hi USRgrn           guifg=#7c7b1d guibg=#282828 gui=bold
hi USRgnt           guifg=#8e536e guibg=#282828 gui=bold
