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
hi Normal           guifg=#3a3a3a guibg=#dadada
hi Title            guifg=#3a3a3a guibg=#dadada gui=bold
hi LineNr           guifg=#008787 guibg=#dadada gui=none
hi CursorLineNr     guifg=#008787 guibg=#c6c6c6 gui=bold
hi SpecialKey       guifg=#c6c6c6 guibg=#dadada
hi ModeMsg          guifg=#dadada guibg=#008787 gui=bold
hi Cursor           guifg=#dadada guibg=#870100
hi ColorColumn                    guibg=#c6c6c6 gui=none
hi CursorLine                     guibg=#c6c6c6 gui=none
hi Visual           guifg=#3a3a3a guibg=#6db0b0
hi VisualNOS        guifg=#3a3a3a guibg=#6db0b0

hi Type             guifg=#3a3a3a guibg=#dadada gui=bold
hi Identifier       guifg=#d8865f guibg=#dadada gui=italic
hi Comment          guifg=#6db0b0 guibg=#dadada gui=italic
hi Folded           guifg=#008787 guibg=#dadada gui=italic
hi Constant         guifg=#3a3a3a guibg=#dadada gui=italic
hi Special          guifg=#3a3a3a guibg=#dadada gui=bold
hi Statement        guifg=#3a3a3a guibg=#dadada gui=bold
hi PreProc          guifg=#008787 guibg=#dadada gui=bold
hi MatchParen       guifg=#d8865f guibg=#dadada gui=bold
hi Search           guifg=#dadada guibg=#d8865f gui=none
hi Error            guifg=#870100 guibg=#dadada gui=none
hi EndOfBuffer      guifg=#dadada guibg=#dadada gui=none

hi SpellBad         guifg=#870100 guibg=#dadada gui=underline,bold
hi SpellCap         guifg=#008787 guibg=#dadada gui=underline,bold
hi SpellRare        guifg=#87025f guibg=#dadada gui=underline,bold
hi SpellLocal       guifg=#0087af guibg=#dadada gui=underline,bold

hi StatusLine       guifg=#dadada guibg=#008787
hi StatusLineNC     guifg=#dadada guibg=#008787
hi StatusLineTerm   guifg=#dadada guibg=#008787
hi StatusLineTermNC guifg=#dadada guibg=#008787
hi ToolbarLine      guifg=#dadada guibg=#008787
hi ToolbarButton    guifg=#dadada guibg=#008787

hi Pmenu            guifg=#008787 guibg=#3a3a3a gui=none
hi PmenuSel         guifg=#dadada guibg=#008787 gui=none
hi PmenuSbar        guifg=#008787 guibg=#dadada gui=none
hi PmenuThumb       guifg=#005f00 guibg=#005f00 gui=none
hi TabLine          guifg=#008787 guibg=#dadada gui=none
hi TabLineSel       guifg=#dadada guibg=#008787 gui=none
hi TabLineFill      guifg=#008787 guibg=#dadada gui=none
hi TabLine          guifg=#008787 guibg=#6db0b0 gui=none
hi TabLineSel       guifg=#3a3a3a guibg=#dadada gui=none
hi TabLineFill      guifg=#008787 guibg=#6db0b0 gui=none

hi usrred           guifg=#dadada guibg=#870100
hi usrylw           guifg=#dadada guibg=#d8865f
hi usrgrn           guifg=#dadada guibg=#005f00
hi usrgry           guifg=#dadada guibg=#9e9e9e
hi usrblu           guifg=#dadada guibg=#008787
hi usrgnt           guifg=#dadada guibg=#87025f

