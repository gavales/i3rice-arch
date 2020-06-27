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
hi Normal           guifg=#fffff0 guibg=#2b2b2b
hi Title            guifg=#fffff0 guibg=#2b2b2b gui=bold
hi LineNr           guifg=#e06a26 guibg=#2b2b2b gui=none
hi CursorLineNr     guifg=#e06a26 guibg=#3f3f3f gui=bold
hi SpecialKey       guifg=#3f3f3f guibg=#2b2b2b
hi ModeMsg          guifg=#2b2b2b guibg=#e06a26 gui=bold
hi Cursor           guifg=#2b2b2b guibg=#f55050
hi ColorColumn                    guibg=#3f3f3f gui=none
hi CursorLine                     guibg=#3f3f3f gui=none
hi Visual           guifg=#fffff0 guibg=#854a28
hi VisualNOS        guifg=#fffff0 guibg=#854a28

hi Type             guifg=#fffff0 guibg=#2b2b2b gui=bold
hi Identifier       guifg=#d4ac35 guibg=#2b2b2b gui=italic
hi Comment          guifg=#854a28 guibg=#2b2b2b gui=italic
hi Folded           guifg=#e06a26 guibg=#2b2b2b gui=italic
hi FoldColumn       guifg=#2b2b2b guibg=#2b2b2b gui=italic
hi Constant         guifg=#fffff0 guibg=#2b2b2b gui=italic
hi Special          guifg=#fffff0 guibg=#2b2b2b gui=bold
hi Statement        guifg=#fffff0 guibg=#2b2b2b gui=bold
hi PreProc          guifg=#e06a26 guibg=#2b2b2b gui=bold
hi MatchParen       guifg=#d4ac35 guibg=#2b2b2b gui=bold
hi Search           guifg=#2b2b2b guibg=#d4ac35 gui=none
hi Error            guifg=#f55050 guibg=#2b2b2b gui=none
hi EndOfBuffer      guifg=#2b2b2b guibg=#2b2b2b gui=none

hi SpellBad         guifg=#f55050 guibg=#2b2b2b gui=undercurl,bold
hi SpellCap         guifg=#e06a26 guibg=#2b2b2b gui=undercurl,bold
hi SpellRare        guifg=#a26fbf guibg=#2b2b2b gui=undercurl,bold
hi SpellLocal       guifg=#1b9e9e guibg=#2b2b2b gui=undercurl,bold

hi StatusLine       guifg=#2b2b2b guibg=#e06a26
hi StatusLineNC     guifg=#2b2b2b guibg=#e06a26
hi StatusLineTerm   guifg=#2b2b2b guibg=#e06a26
hi StatusLineTermNC guifg=#2b2b2b guibg=#e06a26
hi ToolbarLine      guifg=#2b2b2b guibg=#e06a26
hi ToolbarButton    guifg=#2b2b2b guibg=#e06a26

hi Pmenu            guifg=#e06a26 guibg=#fffff0 gui=none
hi PmenuSel         guifg=#2b2b2b guibg=#e06a26 gui=none
hi PmenuSbar        guifg=#e06a26 guibg=#2b2b2b gui=none
hi PmenuThumb       guifg=#219e21 guibg=#219e21 gui=none
hi TabLine          guifg=#e06a26 guibg=#2b2b2b gui=none
hi TabLineSel       guifg=#2b2b2b guibg=#e06a26 gui=none
hi TabLineFill      guifg=#e06a26 guibg=#2b2b2b gui=none
hi TabLine          guifg=#e06a26 guibg=#854a28 gui=none
hi TabLineSel       guifg=#fffff0 guibg=#2b2b2b gui=none
hi TabLineFill      guifg=#e06a26 guibg=#854a28 gui=none

hi usrStatus        guifg=#fffff0 guibg=#3f3f3f
hi usrgry           guifg=#854a28 guibg=#3f3f3f gui=none
hi usrblu           guifg=#2b2b2b guibg=#854a28 gui=none
hi usrred           guifg=#2b2b2b guibg=#c24646 gui=none
hi usrylw           guifg=#2b2b2b guibg=#a98b32 gui=none
hi usrgrn           guifg=#2b2b2b guibg=#238123 gui=none
hi usrgnt           guifg=#2b2b2b guibg=#845e9a gui=none
hi USRgry           guifg=#3f3f3f guibg=#854a28 gui=bold
hi USRblu           guifg=#854a28 guibg=#2b2b2b gui=bold
hi USRred           guifg=#c24646 guibg=#2b2b2b gui=bold
hi USRylw           guifg=#a98b32 guibg=#2b2b2b gui=bold
hi USRgrn           guifg=#238123 guibg=#2b2b2b gui=bold
hi USRgnt           guifg=#845e9a guibg=#2b2b2b gui=bold
