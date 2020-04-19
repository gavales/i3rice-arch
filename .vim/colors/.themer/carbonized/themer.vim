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

" ━  GUI
hi Normal           guifg=#2b2b2b guibg=#fffff0
hi Title            guifg=#2b2b2b guibg=#fffff0 gui=bold
hi LineNr           guifg=#e06a26 guibg=#fffff0 gui=none
hi CursorLineNr     guifg=#e06a26 guibg=#ebebdc gui=bold
hi SpecialKey       guifg=#ebebdc guibg=#fffff0
hi ModeMsg          guifg=#fffff0 guibg=#e06a26 gui=bold
hi Cursor           guifg=#fffff0 guibg=#f55050
hi ColorColumn                    guibg=#ebebdc gui=none
hi CursorLine                     guibg=#ebebdc gui=none
hi Visual           guifg=#2b2b2b guibg=#efb48b
hi VisualNOS        guifg=#2b2b2b guibg=#efb48b

hi Type             guifg=#2b2b2b guibg=#fffff0 gui=bold
hi Identifier       guifg=#d4ac35 guibg=#fffff0 gui=italic
hi Comment          guifg=#efb48b guibg=#fffff0 gui=italic
hi Folded           guifg=#e06a26 guibg=#fffff0 gui=italic
hi FoldColumn       guifg=#fffff0 guibg=#fffff0 gui=italic
hi Constant         guifg=#2b2b2b guibg=#fffff0 gui=italic
hi Special          guifg=#2b2b2b guibg=#fffff0 gui=bold
hi Statement        guifg=#2b2b2b guibg=#fffff0 gui=bold
hi PreProc          guifg=#e06a26 guibg=#fffff0 gui=bold
hi MatchParen       guifg=#d4ac35 guibg=#fffff0 gui=bold
hi Search           guifg=#fffff0 guibg=#d4ac35 gui=none
hi Error            guifg=#f55050 guibg=#fffff0 gui=none
hi EndOfBuffer      guifg=#fffff0 guibg=#fffff0 gui=none

hi SpellBad         guifg=#f55050 guibg=#fffff0 gui=undercurl,bold
hi SpellCap         guifg=#e06a26 guibg=#fffff0 gui=undercurl,bold
hi SpellRare        guifg=#a26fbf guibg=#fffff0 gui=undercurl,bold
hi SpellLocal       guifg=#1b9e9e guibg=#fffff0 gui=undercurl,bold

hi StatusLine       guifg=#fffff0 guibg=#e06a26
hi StatusLineNC     guifg=#fffff0 guibg=#e06a26
hi StatusLineTerm   guifg=#fffff0 guibg=#e06a26
hi StatusLineTermNC guifg=#fffff0 guibg=#e06a26
hi ToolbarLine      guifg=#fffff0 guibg=#e06a26
hi ToolbarButton    guifg=#fffff0 guibg=#e06a26

hi Pmenu            guifg=#e06a26 guibg=#2b2b2b gui=none
hi PmenuSel         guifg=#fffff0 guibg=#e06a26 gui=none
hi PmenuSbar        guifg=#e06a26 guibg=#fffff0 gui=none
hi PmenuThumb       guifg=#219e21 guibg=#219e21 gui=none
hi TabLine          guifg=#e06a26 guibg=#fffff0 gui=none
hi TabLineSel       guifg=#fffff0 guibg=#e06a26 gui=none
hi TabLineFill      guifg=#e06a26 guibg=#fffff0 gui=none
hi TabLine          guifg=#e06a26 guibg=#efb48b gui=none
hi TabLineSel       guifg=#2b2b2b guibg=#fffff0 gui=none
hi TabLineFill      guifg=#e06a26 guibg=#efb48b gui=none

hi usrStatus        guifg=#2b2b2b guibg=#ebebdc
hi usrgry           guifg=#efb48b guibg=#ebebdc gui=none
hi usrblu           guifg=#fffff0 guibg=#efb48b gui=none
hi usrred           guifg=#fffff0 guibg=#faa7a0 gui=none
hi usrylw           guifg=#fffff0 guibg=#e9d592 gui=none
hi usrgrn           guifg=#fffff0 guibg=#90ce88 gui=none
hi usrgnt           guifg=#fffff0 guibg=#d0b7d7 gui=none
