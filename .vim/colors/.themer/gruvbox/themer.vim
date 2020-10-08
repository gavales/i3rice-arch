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
hi Normal           guifg=#282828 guibg=#fbf1c7
hi Title            guifg=#282828 guibg=#fbf1c7 gui=bold
hi LineNr           guifg=#689d6a guibg=#fbf1c7 gui=none
hi CursorLineNr     guifg=#689d6a guibg=#e7ddb3 gui=bold
hi SpecialKey       guifg=#e7ddb3 guibg=#fbf1c7
hi ModeMsg          guifg=#fbf1c7 guibg=#689d6a gui=bold
hi Cursor           guifg=#fbf1c7 guibg=#cc241d
hi ColorColumn                    guibg=#e7ddb3 gui=none
hi CursorLine                     guibg=#e7ddb3 gui=none
hi Visual           guifg=#282828 guibg=#b1c798
hi VisualNOS        guifg=#282828 guibg=#b1c798

hi Type             guifg=#282828 guibg=#fbf1c7 gui=bold
hi Identifier       guifg=#d79921 guibg=#fbf1c7 gui=italic
hi Comment          guifg=#b1c798 guibg=#fbf1c7 gui=italic
hi Folded           guifg=#689d6a guibg=#fbf1c7 gui=italic
hi FoldColumn       guifg=#fbf1c7 guibg=#fbf1c7 gui=italic
hi Constant         guifg=#282828 guibg=#fbf1c7 gui=italic
hi Special          guifg=#282828 guibg=#fbf1c7 gui=bold
hi Statement        guifg=#282828 guibg=#fbf1c7 gui=bold
hi PreProc          guifg=#689d6a guibg=#fbf1c7 gui=bold
hi MatchParen       guifg=#d79921 guibg=#fbf1c7 gui=bold
hi Search           guifg=#fbf1c7 guibg=#d79921 gui=none
hi Error            guifg=#cc241d guibg=#fbf1c7 gui=none
hi EndOfBuffer      guifg=#fbf1c7 guibg=#fbf1c7 gui=none

hi SpellBad         guifg=#cc241d guibg=#fbf1c7 gui=undercurl,bold
hi SpellCap         guifg=#689d6a guibg=#fbf1c7 gui=undercurl,bold
hi SpellRare        guifg=#b16286 guibg=#fbf1c7 gui=undercurl,bold
hi SpellLocal       guifg=#458588 guibg=#fbf1c7 gui=undercurl,bold

hi StatusLine       guifg=#fbf1c7 guibg=#689d6a
hi StatusLineNC     guifg=#fbf1c7 guibg=#689d6a
hi StatusLineTerm   guifg=#fbf1c7 guibg=#689d6a
hi StatusLineTermNC guifg=#fbf1c7 guibg=#689d6a
hi ToolbarLine      guifg=#fbf1c7 guibg=#689d6a
hi ToolbarButton    guifg=#fbf1c7 guibg=#689d6a

hi Pmenu            guifg=#689d6a guibg=#282828 gui=none
hi PmenuSel         guifg=#fbf1c7 guibg=#689d6a gui=none
hi PmenuSbar        guifg=#689d6a guibg=#fbf1c7 gui=none
hi PmenuThumb       guifg=#98971a guibg=#98971a gui=none
hi TabLine          guifg=#689d6a guibg=#fbf1c7 gui=none
hi TabLineSel       guifg=#fbf1c7 guibg=#689d6a gui=none
hi TabLineFill      guifg=#689d6a guibg=#fbf1c7 gui=none
hi TabLine          guifg=#689d6a guibg=#b1c798 gui=none
hi TabLineSel       guifg=#282828 guibg=#fbf1c7 gui=none
hi TabLineFill      guifg=#689d6a guibg=#b1c798 gui=none

hi usrStatus        guifg=#282828 guibg=#e7ddb3
hi usrgry           guifg=#b1c798 guibg=#e7ddb3 gui=none
hi usrblu           guifg=#fbf1c7 guibg=#b1c798 gui=none
hi usrred           guifg=#fbf1c7 guibg=#c25b46 gui=none
hi usrylw           guifg=#fbf1c7 guibg=#caa849 gui=none
hi usrgrn           guifg=#fbf1c7 guibg=#a0a744 gui=none
hi usrgnt           guifg=#fbf1c7 guibg=#b1848c gui=none
hi USRgry           guifg=#e7ddb3 guibg=#b1c798 gui=bold
hi USRblu           guifg=#b1c798 guibg=#fbf1c7 gui=bold
hi USRred           guifg=#c25b46 guibg=#fbf1c7 gui=bold
hi USRylw           guifg=#caa849 guibg=#fbf1c7 gui=bold
hi USRgrn           guifg=#a0a744 guibg=#fbf1c7 gui=bold
hi USRgnt           guifg=#b1848c guibg=#fbf1c7 gui=bold
