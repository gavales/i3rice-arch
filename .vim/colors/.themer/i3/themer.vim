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
hi Normal           guifg=#3d3d3d guibg=#CDCBCD
hi Title            guifg=#3d3d3d guibg=#CDCBCD gui=bold
hi LineNr           guifg=#285577 guibg=#CDCBCD gui=none
hi CursorLineNr     guifg=#285577 guibg=#b9b7b9 gui=bold
hi SpecialKey       guifg=#b9b7b9 guibg=#CDCBCD
hi ModeMsg          guifg=#CDCBCD guibg=#285577 gui=bold
hi Cursor           guifg=#CDCBCD guibg=#900000
hi ColorColumn                    guibg=#b9b7b9 gui=none
hi CursorLine                     guibg=#b9b7b9 gui=none
hi Visual           guifg=#3d3d3d guibg=#7a90a2
hi VisualNOS        guifg=#3d3d3d guibg=#7a90a2

hi Type             guifg=#3d3d3d guibg=#CDCBCD gui=bold
hi Identifier       guifg=#904800 guibg=#CDCBCD gui=italic
hi Comment          guifg=#7a90a2 guibg=#CDCBCD gui=italic
hi Folded           guifg=#3d3d3d guibg=#CDCBCD gui=italic
hi Constant         guifg=#3d3d3d guibg=#CDCBCD gui=italic
hi Special          guifg=#3d3d3d guibg=#CDCBCD gui=bold
hi Statement        guifg=#3d3d3d guibg=#CDCBCD gui=bold
hi PreProc          guifg=#285577 guibg=#CDCBCD gui=bold
hi MatchParen       guifg=#904800 guibg=#CDCBCD gui=bold
hi Search           guifg=#CDCBCD guibg=#904800 gui=none
hi Error            guifg=#900000 guibg=#CDCBCD gui=none
hi EndOfBuffer      guifg=#CDCBCD guibg=#CDCBCD gui=none

hi SpellBad         guifg=#900000 guibg=#CDCBCD gui=underline,bold
hi SpellCap         guifg=#285577 guibg=#CDCBCD gui=underline,bold
hi SpellRare        guifg=#900048 guibg=#CDCBCD gui=underline,bold
hi SpellLocal       guifg=#009090 guibg=#CDCBCD gui=underline,bold

hi StatusLine       guifg=#CDCBCD guibg=#285577
hi StatusLineNC     guifg=#CDCBCD guibg=#285577
hi StatusLineTerm   guifg=#CDCBCD guibg=#285577
hi StatusLineTermNC guifg=#CDCBCD guibg=#285577
hi ToolbarLine      guifg=#CDCBCD guibg=#285577
hi ToolbarButton    guifg=#CDCBCD guibg=#285577

hi Pmenu            guifg=#285577 guibg=#3d3d3d gui=none
hi PmenuSel         guifg=#CDCBCD guibg=#285577 gui=none
hi PmenuSbar        guifg=#285577 guibg=#CDCBCD gui=none
hi PmenuThumb       guifg=#009048 guibg=#009048 gui=none
hi TabLine          guifg=#285577 guibg=#CDCBCD gui=none
hi TabLineSel       guifg=#CDCBCD guibg=#285577 gui=none
hi TabLineFill      guifg=#285577 guibg=#CDCBCD gui=none

hi usrred           guifg=#CDCBCD guibg=#900000
hi usrylw           guifg=#CDCBCD guibg=#904800
hi usrgrn           guifg=#CDCBCD guibg=#009048
hi usrgry           guifg=#CDCBCD guibg=#918f91
hi usrblu           guifg=#CDCBCD guibg=#285577
hi usrgnt           guifg=#CDCBCD guibg=#900048

