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
hi Normal           guifg=#302f30 guibg=#CDCBCD
hi Title            guifg=#302f30 guibg=#CDCBCD gui=bold
hi LineNr           guifg=#285577 guibg=#CDCBCD gui=none
hi CursorLineNr     guifg=#285577 guibg=#b9b7b9 gui=bold
hi SpecialKey       guifg=#b9b7b9 guibg=#CDCBCD
hi ModeMsg          guifg=#CDCBCD guibg=#285577 gui=bold
hi Cursor           guifg=#CDCBCD guibg=#cc241d
hi ColorColumn                    guibg=#b9b7b9 gui=none
hi CursorLine                     guibg=#b9b7b9 gui=none
hi Visual           guifg=#302f30 guibg=#7a90a2
hi VisualNOS        guifg=#302f30 guibg=#7a90a2

hi Type             guifg=#302f30 guibg=#CDCBCD gui=bold
hi Identifier       guifg=#904800 guibg=#CDCBCD gui=italic
hi Comment          guifg=#7a90a2 guibg=#CDCBCD gui=italic
hi Folded           guifg=#285577 guibg=#CDCBCD gui=italic
hi FoldColumn       guifg=#CDCBCD guibg=#CDCBCD gui=italic
hi Constant         guifg=#302f30 guibg=#CDCBCD gui=italic
hi Special          guifg=#302f30 guibg=#CDCBCD gui=bold
hi Statement        guifg=#302f30 guibg=#CDCBCD gui=bold
hi PreProc          guifg=#285577 guibg=#CDCBCD gui=bold
hi MatchParen       guifg=#904800 guibg=#CDCBCD gui=bold
hi Search           guifg=#CDCBCD guibg=#904800 gui=none
hi Error            guifg=#cc241d guibg=#CDCBCD gui=none
hi EndOfBuffer      guifg=#CDCBCD guibg=#CDCBCD gui=none

hi SpellBad         guifg=#cc241d guibg=#CDCBCD gui=undercurl,bold
hi SpellCap         guifg=#285577 guibg=#CDCBCD gui=undercurl,bold
hi SpellRare        guifg=#900048 guibg=#CDCBCD gui=undercurl,bold
hi SpellLocal       guifg=#009090 guibg=#CDCBCD gui=undercurl,bold

hi StatusLine       guifg=#CDCBCD guibg=#285577
hi StatusLineNC     guifg=#CDCBCD guibg=#285577
hi StatusLineTerm   guifg=#CDCBCD guibg=#285577
hi StatusLineTermNC guifg=#CDCBCD guibg=#285577
hi ToolbarLine      guifg=#CDCBCD guibg=#285577
hi ToolbarButton    guifg=#CDCBCD guibg=#285577

hi Pmenu            guifg=#285577 guibg=#302f30 gui=none
hi PmenuSel         guifg=#CDCBCD guibg=#285577 gui=none
hi PmenuSbar        guifg=#285577 guibg=#CDCBCD gui=none
hi PmenuThumb       guifg=#009048 guibg=#009048 gui=none
hi TabLine          guifg=#285577 guibg=#CDCBCD gui=none
hi TabLineSel       guifg=#CDCBCD guibg=#285577 gui=none
hi TabLineFill      guifg=#285577 guibg=#CDCBCD gui=none
hi TabLine          guifg=#285577 guibg=#7a90a2 gui=none
hi TabLineSel       guifg=#302f30 guibg=#CDCBCD gui=none
hi TabLineFill      guifg=#285577 guibg=#7a90a2 gui=none

hi usrStatus        guifg=#302f30 guibg=#b9b7b9
hi usrgry           guifg=#7a90a2 guibg=#b9b7b9 gui=none
hi usrblu           guifg=#CDCBCD guibg=#7a90a2 gui=none
hi usrred           guifg=#CDCBCD guibg=#cc4d49 gui=none
hi usrylw           guifg=#CDCBCD guibg=#9f6833 gui=none
hi usrgrn           guifg=#CDCBCD guibg=#339e69 gui=none
hi usrgnt           guifg=#CDCBCD guibg=#9f3269 gui=none
hi USRgry           guifg=#b9b7b9 guibg=#7a90a2 gui=bold
hi USRblu           guifg=#7a90a2 guibg=#CDCBCD gui=bold
hi USRred           guifg=#cc4d49 guibg=#CDCBCD gui=bold
hi USRylw           guifg=#9f6833 guibg=#CDCBCD gui=bold
hi USRgrn           guifg=#339e69 guibg=#CDCBCD gui=bold
hi USRgnt           guifg=#9f3269 guibg=#CDCBCD gui=bold
