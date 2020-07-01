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
hi Normal           guifg=#CDCBCD guibg=#302f30
hi Title            guifg=#CDCBCD guibg=#302f30 gui=bold
hi LineNr           guifg=#285577 guibg=#302f30 gui=none
hi CursorLineNr     guifg=#285577 guibg=#444344 gui=bold
hi SpecialKey       guifg=#444344 guibg=#302f30
hi ModeMsg          guifg=#302f30 guibg=#285577 gui=bold
hi Cursor           guifg=#302f30 guibg=#cc241d
hi ColorColumn                    guibg=#444344 gui=none
hi CursorLine                     guibg=#444344 gui=none
hi Visual           guifg=#CDCBCD guibg=#2c4253
hi VisualNOS        guifg=#CDCBCD guibg=#2c4253

hi Type             guifg=#CDCBCD guibg=#302f30 gui=bold
hi Identifier       guifg=#904800 guibg=#302f30 gui=italic
hi Comment          guifg=#2c4253 guibg=#302f30 gui=italic
hi Folded           guifg=#285577 guibg=#302f30 gui=italic
hi FoldColumn       guifg=#302f30 guibg=#302f30 gui=italic
hi Constant         guifg=#CDCBCD guibg=#302f30 gui=italic
hi Special          guifg=#CDCBCD guibg=#302f30 gui=bold
hi Statement        guifg=#CDCBCD guibg=#302f30 gui=bold
hi PreProc          guifg=#285577 guibg=#302f30 gui=bold
hi MatchParen       guifg=#904800 guibg=#302f30 gui=bold
hi Search           guifg=#302f30 guibg=#904800 gui=none
hi Error            guifg=#cc241d guibg=#302f30 gui=none
hi EndOfBuffer      guifg=#302f30 guibg=#302f30 gui=none

hi SpellBad         guifg=#cc241d guibg=#302f30 gui=undercurl,bold
hi SpellCap         guifg=#285577 guibg=#302f30 gui=undercurl,bold
hi SpellRare        guifg=#900048 guibg=#302f30 gui=undercurl,bold
hi SpellLocal       guifg=#009090 guibg=#302f30 gui=undercurl,bold

hi StatusLine       guifg=#302f30 guibg=#285577
hi StatusLineNC     guifg=#302f30 guibg=#285577
hi StatusLineTerm   guifg=#302f30 guibg=#285577
hi StatusLineTermNC guifg=#302f30 guibg=#285577
hi ToolbarLine      guifg=#302f30 guibg=#285577
hi ToolbarButton    guifg=#302f30 guibg=#285577

hi Pmenu            guifg=#285577 guibg=#CDCBCD gui=none
hi PmenuSel         guifg=#302f30 guibg=#285577 gui=none
hi PmenuSbar        guifg=#285577 guibg=#302f30 gui=none
hi PmenuThumb       guifg=#009048 guibg=#009048 gui=none
hi TabLine          guifg=#285577 guibg=#302f30 gui=none
hi TabLineSel       guifg=#302f30 guibg=#285577 gui=none
hi TabLineFill      guifg=#285577 guibg=#302f30 gui=none
hi TabLine          guifg=#285577 guibg=#2c4253 gui=none
hi TabLineSel       guifg=#CDCBCD guibg=#302f30 gui=none
hi TabLineFill      guifg=#285577 guibg=#2c4253 gui=none

hi usrStatus        guifg=#CDCBCD guibg=#444344
hi usrgry           guifg=#2c4253 guibg=#444344 gui=none
hi usrblu           guifg=#302f30 guibg=#2c4253 gui=none
hi usrred           guifg=#302f30 guibg=#a52621 gui=none
hi usrylw           guifg=#302f30 guibg=#78410c gui=none
hi usrgrn           guifg=#302f30 guibg=#0c7742 gui=none
hi usrgnt           guifg=#302f30 guibg=#780b42 gui=none
hi USRgry           guifg=#444344 guibg=#2c4253 gui=bold
hi USRblu           guifg=#2c4253 guibg=#302f30 gui=bold
hi USRred           guifg=#a52621 guibg=#302f30 gui=bold
hi USRylw           guifg=#78410c guibg=#302f30 gui=bold
hi USRgrn           guifg=#0c7742 guibg=#302f30 gui=bold
hi USRgnt           guifg=#780b42 guibg=#302f30 gui=bold
