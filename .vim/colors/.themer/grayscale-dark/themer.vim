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

hi usrStatus        ctermfg=black    ctermbg=blue
hi usrred           ctermfg=red      ctermbg=black    cterm=underline,bold
hi usrylw           ctermfg=yellow   ctermbg=black    cterm=underline,bold
hi usrgrn           ctermfg=green    ctermbg=black    cterm=underline,bold
hi usrgry           ctermfg=grey     ctermbg=black    cterm=underline,bold
hi usrblu           ctermfg=blue     ctermbg=black    cterm=underline,bold
hi usrgnt           ctermfg=magenta  ctermbg=black    cterm=underline,bold

" ━  GUI
hi Normal           guifg=#ececec guibg=#444444
hi Title            guifg=#ececec guibg=#444444 gui=bold
hi LineNr           guifg=#7f7f7f guibg=#444444 gui=none
hi CursorLineNr     guifg=#7f7f7f guibg=#585858 gui=bold
hi SpecialKey       guifg=#585858 guibg=#444444
hi ModeMsg          guifg=#444444 guibg=#7f7f7f gui=bold
hi Cursor           guifg=#444444 guibg=#cc241d
hi ColorColumn                    guibg=#585858 gui=none
hi CursorLine                     guibg=#585858 gui=none
hi Visual           guifg=#ececec guibg=#616161
hi VisualNOS        guifg=#ececec guibg=#616161

hi Type             guifg=#ececec guibg=#444444 gui=bold
hi Identifier       guifg=#904800 guibg=#444444 gui=italic
hi Comment          guifg=#616161 guibg=#444444 gui=italic
hi Folded           guifg=#7f7f7f guibg=#444444 gui=italic
hi Constant         guifg=#ececec guibg=#444444 gui=italic
hi Special          guifg=#ececec guibg=#444444 gui=bold
hi Statement        guifg=#ececec guibg=#444444 gui=bold
hi PreProc          guifg=#7f7f7f guibg=#444444 gui=bold
hi MatchParen       guifg=#904800 guibg=#444444 gui=bold
hi Search           guifg=#444444 guibg=#904800 gui=none
hi Error            guifg=#cc241d guibg=#444444 gui=none
hi EndOfBuffer      guifg=#444444 guibg=#444444 gui=none

hi SpellBad         guifg=#cc241d guibg=#444444 gui=underline,bold
hi SpellCap         guifg=#7f7f7f guibg=#444444 gui=underline,bold
hi SpellRare        guifg=#900048 guibg=#444444 gui=underline,bold
hi SpellLocal       guifg=#009090 guibg=#444444 gui=underline,bold

hi StatusLine       guifg=#444444 guibg=#7f7f7f
hi StatusLineNC     guifg=#444444 guibg=#7f7f7f
hi StatusLineTerm   guifg=#444444 guibg=#7f7f7f
hi StatusLineTermNC guifg=#444444 guibg=#7f7f7f
hi ToolbarLine      guifg=#444444 guibg=#7f7f7f
hi ToolbarButton    guifg=#444444 guibg=#7f7f7f

hi Pmenu            guifg=#7f7f7f guibg=#ececec gui=none
hi PmenuSel         guifg=#444444 guibg=#7f7f7f gui=none
hi PmenuSbar        guifg=#7f7f7f guibg=#444444 gui=none
hi PmenuThumb       guifg=#009048 guibg=#009048 gui=none
hi TabLine          guifg=#7f7f7f guibg=#444444 gui=none
hi TabLineSel       guifg=#444444 guibg=#7f7f7f gui=none
hi TabLineFill      guifg=#7f7f7f guibg=#444444 gui=none
hi TabLine          guifg=#7f7f7f guibg=#616161 gui=none
hi TabLineSel       guifg=#ececec guibg=#444444 gui=none
hi TabLineFill      guifg=#7f7f7f guibg=#616161 gui=none

hi usrStatus        guifg=#444444 guibg=#7f7f7f
hi usrred           guifg=#cc241d guibg=#444444 gui=underline,bold
hi usrylw           guifg=#904800 guibg=#444444 gui=underline,bold
hi usrgrn           guifg=#009048 guibg=#444444 gui=underline,bold
hi usrgry           guifg=#808080 guibg=#444444 gui=underline,bold
hi usrblu           guifg=#7f7f7f guibg=#444444 gui=underline,bold
hi usrgnt           guifg=#900048 guibg=#444444 gui=underline,bold
