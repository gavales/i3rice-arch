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
hi Normal           guifg=#CDCBCD guibg=#3d3d3d
hi Title            guifg=#CDCBCD guibg=#3d3d3d gui=bold
hi LineNr           guifg=#285577 guibg=#3d3d3d gui=none
hi CursorLineNr     guifg=#285577 guibg=#515151 gui=bold
hi SpecialKey       guifg=#515151 guibg=#3d3d3d
hi ModeMsg          guifg=#3d3d3d guibg=#285577 gui=bold
hi Cursor           guifg=#3d3d3d guibg=#900000
hi ColorColumn                    guibg=#515151 gui=none
hi CursorLine                     guibg=#515151 gui=none
hi Visual           guifg=#CDCBCD guibg=#32495a
hi VisualNOS        guifg=#CDCBCD guibg=#32495a

hi Type             guifg=#CDCBCD guibg=#3d3d3d gui=bold
hi Identifier       guifg=#904800 guibg=#3d3d3d gui=italic
hi Comment          guifg=#32495a guibg=#3d3d3d gui=italic
hi Folded           guifg=#CDCBCD guibg=#3d3d3d gui=italic
hi Constant         guifg=#CDCBCD guibg=#3d3d3d gui=italic
hi Special          guifg=#CDCBCD guibg=#3d3d3d gui=bold
hi Statement        guifg=#CDCBCD guibg=#3d3d3d gui=bold
hi PreProc          guifg=#285577 guibg=#3d3d3d gui=bold
hi MatchParen       guifg=#904800 guibg=#3d3d3d gui=bold
hi Search           guifg=#3d3d3d guibg=#904800 gui=none
hi Error            guifg=#900000 guibg=#3d3d3d gui=none
hi EndOfBuffer      guifg=#3d3d3d guibg=#3d3d3d gui=none

hi SpellBad         guifg=#900000 guibg=#3d3d3d gui=underline,bold
hi SpellCap         guifg=#285577 guibg=#3d3d3d gui=underline,bold
hi SpellRare        guifg=#900048 guibg=#3d3d3d gui=underline,bold
hi SpellLocal       guifg=#009090 guibg=#3d3d3d gui=underline,bold

hi StatusLine       guifg=#3d3d3d guibg=#285577
hi StatusLineNC     guifg=#3d3d3d guibg=#285577
hi StatusLineTerm   guifg=#3d3d3d guibg=#285577
hi StatusLineTermNC guifg=#3d3d3d guibg=#285577
hi ToolbarLine      guifg=#3d3d3d guibg=#285577
hi ToolbarButton    guifg=#3d3d3d guibg=#285577

hi Pmenu            guifg=#285577 guibg=#CDCBCD gui=none
hi PmenuSel         guifg=#3d3d3d guibg=#285577 gui=none
hi PmenuSbar        guifg=#285577 guibg=#3d3d3d gui=none
hi PmenuThumb       guifg=#009048 guibg=#009048 gui=none
hi TabLine          guifg=#285577 guibg=#3d3d3d gui=none
hi TabLineSel       guifg=#3d3d3d guibg=#285577 gui=none
hi TabLineFill      guifg=#285577 guibg=#3d3d3d gui=none

hi usrred           guifg=#3d3d3d guibg=#900000
hi usrylw           guifg=#3d3d3d guibg=#904800
hi usrgrn           guifg=#3d3d3d guibg=#009048
hi usrgry           guifg=#3d3d3d guibg=#797979
hi usrblu           guifg=#3d3d3d guibg=#285577
hi usrgnt           guifg=#3d3d3d guibg=#900048

