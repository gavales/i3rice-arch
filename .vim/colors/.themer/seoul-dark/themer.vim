" Vim color file
" Converted from Textmate theme Brogrammer using Coloration v0.4.0 (http://github.com/sickill/coloration)

set background=dark
highlight clear

if exists("syntax_on")
  syntax reset
endif

let g:colors_name = "themer"

" >> CTERM
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
hi TabLine          ctermfg=blue     ctermbg=Gray     cterm=none
hi TabLineSel       ctermfg=white    ctermbg=black    cterm=none
hi TabLineFill      ctermfg=blue     ctermbg=Gray     cterm=none

hi usrred           ctermfg=white    ctermbg=red
hi usrylw           ctermfg=black    ctermbg=yellow
hi usrgrn           ctermfg=black    ctermbg=green
hi usrgry           ctermfg=black    ctermbg=grey
hi usrblu           ctermfg=black    ctermbg=blue
hi usrgnt           ctermfg=black    ctermbg=magenta

" >> GUI
hi Normal           guifg=#dadada guibg=#3a3a3a
hi Title            guifg=#dadada guibg=#3a3a3a gui=bold
hi LineNr           guifg=#008787 guibg=#3a3a3a gui=none
hi CursorLineNr     guifg=#008787 guibg=#4e4e4e gui=bold
hi SpecialKey       guifg=#4e4e4e guibg=#3a3a3a
hi ModeMsg          guifg=#3a3a3a guibg=#008787 gui=bold
hi Cursor           guifg=#3a3a3a guibg=#870100
hi ColorColumn                    guibg=#4e4e4e gui=none
hi CursorLine                     guibg=#4e4e4e gui=none
hi Visual           guifg=#dadada guibg=#1d6060
hi VisualNOS        guifg=#dadada guibg=#1d6060

hi Type             guifg=#dadada guibg=#3a3a3a gui=bold
hi Identifier       guifg=#d8865f guibg=#3a3a3a gui=italic
hi Comment          guifg=#1d6060 guibg=#3a3a3a gui=italic
hi Folded           guifg=#008787 guibg=#3a3a3a gui=italic
hi Constant         guifg=#dadada guibg=#3a3a3a gui=italic
hi Special          guifg=#dadada guibg=#3a3a3a gui=bold
hi Statement        guifg=#dadada guibg=#3a3a3a gui=bold
hi PreProc          guifg=#008787 guibg=#3a3a3a gui=bold
hi MatchParen       guifg=#d8865f guibg=#3a3a3a gui=bold
hi Search           guifg=#3a3a3a guibg=#d8865f gui=none
hi Error            guifg=#870100 guibg=#3a3a3a gui=none
hi EndOfBuffer      guifg=#3a3a3a guibg=#3a3a3a gui=none

hi SpellBad         guifg=#870100 guibg=#3a3a3a gui=underline,bold
hi SpellCap         guifg=#008787 guibg=#3a3a3a gui=underline,bold
hi SpellRare        guifg=#87025f guibg=#3a3a3a gui=underline,bold
hi SpellLocal       guifg=#0087af guibg=#3a3a3a gui=underline,bold

hi StatusLine       guifg=#3a3a3a guibg=#008787
hi StatusLineNC     guifg=#3a3a3a guibg=#008787
hi StatusLineTerm   guifg=#3a3a3a guibg=#008787
hi StatusLineTermNC guifg=#3a3a3a guibg=#008787
hi ToolbarLine      guifg=#3a3a3a guibg=#008787
hi ToolbarButton    guifg=#3a3a3a guibg=#008787

hi Pmenu            guifg=#008787 guibg=#dadada gui=none
hi PmenuSel         guifg=#3a3a3a guibg=#008787 gui=none
hi PmenuSbar        guifg=#008787 guibg=#3a3a3a gui=none
hi PmenuThumb       guifg=#005f00 guibg=#005f00 gui=none
hi TabLine          guifg=#008787 guibg=#3a3a3a gui=none
hi TabLineSel       guifg=#3a3a3a guibg=#008787 gui=none
hi TabLineFill      guifg=#008787 guibg=#3a3a3a gui=none
hi TabLine          guifg=#008787 guibg=#1d6060 gui=none
hi TabLineSel       guifg=#dadada guibg=#3a3a3a gui=none
hi TabLineFill      guifg=#008787 guibg=#1d6060 gui=none

hi usrred           guifg=#3a3a3a guibg=#870100
hi usrylw           guifg=#3a3a3a guibg=#d8865f
hi usrgrn           guifg=#3a3a3a guibg=#005f00
hi usrgry           guifg=#3a3a3a guibg=#767676
hi usrblu           guifg=#3a3a3a guibg=#008787
hi usrgnt           guifg=#3a3a3a guibg=#87025f

