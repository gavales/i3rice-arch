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
hi Normal           guifg=#6C8672 guibg=#C4D4AF
hi Title            guifg=#6C8672 guibg=#C4D4AF gui=bold
hi LineNr           guifg=#68A8AD guibg=#C4D4AF gui=none
hi CursorLineNr     guifg=#68A8AD guibg=#b0c09b gui=bold
hi SpecialKey       guifg=#b0c09b guibg=#C4D4AF
hi ModeMsg          guifg=#C4D4AF guibg=#68A8AD gui=bold
hi Cursor           guifg=#C4D4AF guibg=#F17D80
hi ColorColumn                    guibg=#b0c09b gui=none
hi CursorLine                     guibg=#b0c09b gui=none
hi Visual           guifg=#6C8672 guibg=#96beae
hi VisualNOS        guifg=#6C8672 guibg=#96beae

hi Type             guifg=#6C8672 guibg=#C4D4AF gui=bold
hi Identifier       guifg=#904800 guibg=#C4D4AF gui=italic
hi Comment          guifg=#96beae guibg=#C4D4AF gui=italic
hi Folded           guifg=#6C8672 guibg=#C4D4AF gui=italic
hi Constant         guifg=#6C8672 guibg=#C4D4AF gui=italic
hi Special          guifg=#6C8672 guibg=#C4D4AF gui=bold
hi Statement        guifg=#6C8672 guibg=#C4D4AF gui=bold
hi PreProc          guifg=#68A8AD guibg=#C4D4AF gui=bold
hi MatchParen       guifg=#904800 guibg=#C4D4AF gui=bold
hi Search           guifg=#C4D4AF guibg=#904800 gui=none
hi Error            guifg=#F17D80 guibg=#C4D4AF gui=none
hi EndOfBuffer      guifg=#C4D4AF guibg=#C4D4AF gui=none

hi SpellBad         guifg=#F17D80 guibg=#C4D4AF gui=underline,bold
hi SpellCap         guifg=#68A8AD guibg=#C4D4AF gui=underline,bold
hi SpellRare        guifg=#737495 guibg=#C4D4AF gui=underline,bold
hi SpellLocal       guifg=#009090 guibg=#C4D4AF gui=underline,bold

hi StatusLine       guifg=#C4D4AF guibg=#68A8AD
hi StatusLineNC     guifg=#C4D4AF guibg=#68A8AD
hi StatusLineTerm   guifg=#C4D4AF guibg=#68A8AD
hi StatusLineTermNC guifg=#C4D4AF guibg=#68A8AD
hi ToolbarLine      guifg=#C4D4AF guibg=#68A8AD
hi ToolbarButton    guifg=#C4D4AF guibg=#68A8AD

hi Pmenu            guifg=#68A8AD guibg=#6C8672 gui=none
hi PmenuSel         guifg=#C4D4AF guibg=#68A8AD gui=none
hi PmenuSbar        guifg=#68A8AD guibg=#C4D4AF gui=none
hi PmenuThumb       guifg=#009048 guibg=#009048 gui=none
hi TabLine          guifg=#68A8AD guibg=#C4D4AF gui=none
hi TabLineSel       guifg=#C4D4AF guibg=#68A8AD gui=none
hi TabLineFill      guifg=#68A8AD guibg=#C4D4AF gui=none

hi usrred           guifg=#C4D4AF guibg=#F17D80
hi usrylw           guifg=#C4D4AF guibg=#904800
hi usrgrn           guifg=#C4D4AF guibg=#009048
hi usrgry           guifg=#C4D4AF guibg=#889873
hi usrblu           guifg=#C4D4AF guibg=#68A8AD
hi usrgnt           guifg=#C4D4AF guibg=#737495

