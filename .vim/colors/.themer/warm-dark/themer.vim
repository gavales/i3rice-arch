" Vim color file
" Converted from Textmate theme Brogrammer using Coloration v0.4.0 (http://github.com/sickill/coloration)

set background=dark
highlight clear

if exists("syntax_on")
  syntax reset
endif

let g:colors_name = "themer"

" >>>> CTERM
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
hi Folded           ctermfg=white    ctermbg=black    cterm=italic
hi Constant         ctermfg=white    ctermbg=black    cterm=italic
hi Special          ctermfg=white    ctermbg=black    cterm=bold
hi Statement        ctermfg=white    ctermbg=black    cterm=bold
hi PreProc          ctermfg=blue     ctermbg=black    cterm=bold
hi MatchParen       ctermfg=yellow   ctermbg=black    cterm=bold
hi Search           ctermfg=black    ctermbg=yellow   cterm=none
hi Error            ctermfg=red      ctermbg=black    cterm=none
hi EndOfBuffer      ctermfg=black    ctermbg=black    cterm=none

hi SpellBad         ctermfg=red      ctermbg=none     cterm=underline,bold
hi SpellCap         ctermfg=blue     ctermbg=none     cterm=underline,bold
hi SpellRare        ctermfg=magenta  ctermbg=none     cterm=underline,bold
hi SpellLocal       ctermfg=cyan     ctermbg=none     cterm=underline,bold

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
hi TabLine          ctermfg=blue     ctermbg=black    cterm=none
hi TabLineSel       ctermfg=black    ctermbg=blue     cterm=none
hi TabLineFill      ctermfg=blue     ctermbg=black    cterm=none

hi usrred           ctermfg=white    ctermbg=red
hi usrylw           ctermfg=black    ctermbg=yellow
hi usrgrn           ctermfg=black    ctermbg=green
hi usrgry           ctermfg=black    ctermbg=grey
hi usrblu           ctermfg=black    ctermbg=blue
hi usrgnt           ctermfg=black    ctermbg=magenta

" >>>> GUI
hi Normal           guifg=#C4D4AF guibg=#3f4e43
hi Title            guifg=#C4D4AF guibg=#3f4e43 gui=bold
hi LineNr           guifg=#68A8AD guibg=#3f4e43 gui=none
hi CursorLineNr     guifg=#68A8AD guibg=#536257 gui=bold
hi SpecialKey       guifg=#536257 guibg=#3f4e43
hi ModeMsg          guifg=#3f4e43 guibg=#68A8AD gui=bold
hi Cursor           guifg=#3f4e43 guibg=#F17D80
hi ColorColumn                    guibg=#536257 gui=none
hi CursorLine                     guibg=#536257 gui=none
hi Visual           guifg=#C4D4AF guibg=#537b78
hi VisualNOS        guifg=#C4D4AF guibg=#537b78

hi Type             guifg=#C4D4AF guibg=#3f4e43 gui=bold
hi Identifier       guifg=#904800 guibg=#3f4e43 gui=italic
hi Comment          guifg=#537b78 guibg=#3f4e43 gui=italic
hi Folded           guifg=#C4D4AF guibg=#3f4e43 gui=italic
hi Constant         guifg=#C4D4AF guibg=#3f4e43 gui=italic
hi Special          guifg=#C4D4AF guibg=#3f4e43 gui=bold
hi Statement        guifg=#C4D4AF guibg=#3f4e43 gui=bold
hi PreProc          guifg=#68A8AD guibg=#3f4e43 gui=bold
hi MatchParen       guifg=#904800 guibg=#3f4e43 gui=bold
hi Search           guifg=#3f4e43 guibg=#904800 gui=none
hi Error            guifg=#F17D80 guibg=#3f4e43 gui=none
hi EndOfBuffer      guifg=#3f4e43 guibg=#3f4e43 gui=none

hi SpellBad         guifg=#F17D80 guibg=#3f4e43 gui=underline,bold
hi SpellCap         guifg=#68A8AD guibg=#3f4e43 gui=underline,bold
hi SpellRare        guifg=#737495 guibg=#3f4e43 gui=underline,bold
hi SpellLocal       guifg=#009090 guibg=#3f4e43 gui=underline,bold

hi StatusLine       guifg=#3f4e43 guibg=#68A8AD
hi StatusLineNC     guifg=#3f4e43 guibg=#68A8AD
hi StatusLineTerm   guifg=#3f4e43 guibg=#68A8AD
hi StatusLineTermNC guifg=#3f4e43 guibg=#68A8AD
hi ToolbarLine      guifg=#3f4e43 guibg=#68A8AD
hi ToolbarButton    guifg=#3f4e43 guibg=#68A8AD

hi Pmenu            guifg=#68A8AD guibg=#C4D4AF gui=none
hi PmenuSel         guifg=#3f4e43 guibg=#68A8AD gui=none
hi PmenuSbar        guifg=#68A8AD guibg=#3f4e43 gui=none
hi PmenuThumb       guifg=#009048 guibg=#009048 gui=none
hi TabLine          guifg=#68A8AD guibg=#3f4e43 gui=none
hi TabLineSel       guifg=#3f4e43 guibg=#68A8AD gui=none
hi TabLineFill      guifg=#68A8AD guibg=#3f4e43 gui=none

hi usrred           guifg=#3f4e43 guibg=#F17D80
hi usrylw           guifg=#3f4e43 guibg=#904800
hi usrgrn           guifg=#3f4e43 guibg=#009048
hi usrgry           guifg=#3f4e43 guibg=#7b8a7f
hi usrblu           guifg=#3f4e43 guibg=#68A8AD
hi usrgnt           guifg=#3f4e43 guibg=#737495

