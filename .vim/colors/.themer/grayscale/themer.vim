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
hi Normal           guifg=#222222 guibg=#ececec
hi Title            guifg=#222222 guibg=#ececec gui=bold
hi LineNr           guifg=#7f7f7f guibg=#ececec gui=none
hi CursorLineNr     guifg=#7f7f7f guibg=#d8d8d8 gui=bold
hi SpecialKey       guifg=#d8d8d8 guibg=#ececec
hi ModeMsg          guifg=#ececec guibg=#7f7f7f gui=bold
hi Cursor           guifg=#ececec guibg=#999999
hi ColorColumn                    guibg=#d8d8d8 gui=none
hi CursorLine                     guibg=#d8d8d8 gui=none
hi Visual           guifg=#222222 guibg=#b5b5b5
hi VisualNOS        guifg=#222222 guibg=#b5b5b5

hi Type             guifg=#222222 guibg=#ececec gui=bold
hi Identifier       guifg=#999999 guibg=#ececec gui=italic
hi Comment          guifg=#b5b5b5 guibg=#ececec gui=italic
hi Folded           guifg=#7f7f7f guibg=#ececec gui=italic
hi FoldColumn       guifg=#ececec guibg=#ececec gui=italic
hi Constant         guifg=#222222 guibg=#ececec gui=italic
hi Special          guifg=#222222 guibg=#ececec gui=bold
hi Statement        guifg=#222222 guibg=#ececec gui=bold
hi PreProc          guifg=#7f7f7f guibg=#ececec gui=bold
hi MatchParen       guifg=#999999 guibg=#ececec gui=bold
hi Search           guifg=#ececec guibg=#999999 gui=none
hi Error            guifg=#999999 guibg=#ececec gui=none
hi EndOfBuffer      guifg=#ececec guibg=#ececec gui=none

hi SpellBad         guifg=#999999 guibg=#ececec gui=undercurl,bold
hi SpellCap         guifg=#7f7f7f guibg=#ececec gui=undercurl,bold
hi SpellRare        guifg=#999999 guibg=#ececec gui=undercurl,bold
hi SpellLocal       guifg=#999999 guibg=#ececec gui=undercurl,bold

hi StatusLine       guifg=#ececec guibg=#7f7f7f
hi StatusLineNC     guifg=#ececec guibg=#7f7f7f
hi StatusLineTerm   guifg=#ececec guibg=#7f7f7f
hi StatusLineTermNC guifg=#ececec guibg=#7f7f7f
hi ToolbarLine      guifg=#ececec guibg=#7f7f7f
hi ToolbarButton    guifg=#ececec guibg=#7f7f7f

hi Pmenu            guifg=#7f7f7f guibg=#222222 gui=none
hi PmenuSel         guifg=#ececec guibg=#7f7f7f gui=none
hi PmenuSbar        guifg=#7f7f7f guibg=#ececec gui=none
hi PmenuThumb       guifg=#999999 guibg=#999999 gui=none
hi TabLine          guifg=#7f7f7f guibg=#ececec gui=none
hi TabLineSel       guifg=#ececec guibg=#7f7f7f gui=none
hi TabLineFill      guifg=#7f7f7f guibg=#ececec gui=none
hi TabLine          guifg=#7f7f7f guibg=#b5b5b5 gui=none
hi TabLineSel       guifg=#222222 guibg=#ececec gui=none
hi TabLineFill      guifg=#7f7f7f guibg=#b5b5b5 gui=none

hi usrStatus        guifg=#222222 guibg=#d8d8d8
hi usrgry           guifg=#b5b5b5 guibg=#d8d8d8 gui=none
hi usrblu           guifg=#ececec guibg=#b5b5b5 gui=none
hi usrred           guifg=#ececec guibg=#adadad gui=none
hi usrylw           guifg=#ececec guibg=#adadad gui=none
hi usrgrn           guifg=#ececec guibg=#adadad gui=none
hi usrgnt           guifg=#ececec guibg=#adadad gui=none
hi USRgry           guifg=#d8d8d8 guibg=#b5b5b5 gui=bold
hi USRblu           guifg=#b5b5b5 guibg=#ececec gui=bold
hi USRred           guifg=#adadad guibg=#ececec gui=bold
hi USRylw           guifg=#adadad guibg=#ececec gui=bold
hi USRgrn           guifg=#adadad guibg=#ececec gui=bold
hi USRgnt           guifg=#adadad guibg=#ececec gui=bold
