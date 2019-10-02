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
hi Normal           guifg=#000000 guibg=#ececec
hi Title            guifg=#000000 guibg=#ececec gui=bold
hi LineNr           guifg=#666666 guibg=#ececec gui=none
hi CursorLineNr     guifg=#666666 guibg=#d8d8d8 gui=bold
hi SpecialKey       guifg=#d8d8d8 guibg=#ececec
hi ModeMsg          guifg=#ececec guibg=#666666 gui=bold
hi Cursor           guifg=#ececec guibg=#cc241d
hi ColorColumn                    guibg=#d8d8d8 gui=none
hi CursorLine                     guibg=#d8d8d8 gui=none
hi Visual           guifg=#000000 guibg=#a9a9a9
hi VisualNOS        guifg=#000000 guibg=#a9a9a9

hi Type             guifg=#000000 guibg=#ececec gui=bold
hi Identifier       guifg=#904800 guibg=#ececec gui=italic
hi Comment          guifg=#a9a9a9 guibg=#ececec gui=italic
hi Folded           guifg=#000000 guibg=#ececec gui=italic
hi Constant         guifg=#000000 guibg=#ececec gui=italic
hi Special          guifg=#000000 guibg=#ececec gui=bold
hi Statement        guifg=#000000 guibg=#ececec gui=bold
hi PreProc          guifg=#666666 guibg=#ececec gui=bold
hi MatchParen       guifg=#904800 guibg=#ececec gui=bold
hi Search           guifg=#ececec guibg=#904800 gui=none
hi Error            guifg=#cc241d guibg=#ececec gui=none
hi EndOfBuffer      guifg=#ececec guibg=#ececec gui=none

hi SpellBad         guifg=#cc241d guibg=#ececec gui=underline,bold
hi SpellCap         guifg=#666666 guibg=#ececec gui=underline,bold
hi SpellRare        guifg=#900048 guibg=#ececec gui=underline,bold
hi SpellLocal       guifg=#009090 guibg=#ececec gui=underline,bold

hi StatusLine       guifg=#ececec guibg=#666666
hi StatusLineNC     guifg=#ececec guibg=#666666
hi StatusLineTerm   guifg=#ececec guibg=#666666
hi StatusLineTermNC guifg=#ececec guibg=#666666
hi ToolbarLine      guifg=#ececec guibg=#666666
hi ToolbarButton    guifg=#ececec guibg=#666666

hi Pmenu            guifg=#666666 guibg=#000000 gui=none
hi PmenuSel         guifg=#ececec guibg=#666666 gui=none
hi PmenuSbar        guifg=#666666 guibg=#ececec gui=none
hi PmenuThumb       guifg=#009048 guibg=#009048 gui=none
hi TabLine          guifg=#666666 guibg=#ececec gui=none
hi TabLineSel       guifg=#ececec guibg=#666666 gui=none
hi TabLineFill      guifg=#666666 guibg=#ececec gui=none

hi usrred           guifg=#ececec guibg=#cc241d
hi usrylw           guifg=#ececec guibg=#904800
hi usrgrn           guifg=#ececec guibg=#009048
hi usrgry           guifg=#ececec guibg=#b0b0b0
hi usrblu           guifg=#ececec guibg=#666666
hi usrgnt           guifg=#ececec guibg=#900048

