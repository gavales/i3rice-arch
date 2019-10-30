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
hi Normal           guifg=#ececec guibg=#222222
hi Title            guifg=#ececec guibg=#222222 gui=bold
hi LineNr           guifg=#aa1924 guibg=#222222 gui=none
hi CursorLineNr     guifg=#aa1924 guibg=#363636 gui=bold
hi SpecialKey       guifg=#363636 guibg=#222222
hi ModeMsg          guifg=#222222 guibg=#aa1924 gui=bold
hi Cursor           guifg=#222222 guibg=#cc241d
hi ColorColumn                    guibg=#363636 gui=none
hi CursorLine                     guibg=#363636 gui=none
hi Visual           guifg=#ececec guibg=#661d23
hi VisualNOS        guifg=#ececec guibg=#661d23

hi Type             guifg=#ececec guibg=#222222 gui=bold
hi Identifier       guifg=#904800 guibg=#222222 gui=italic
hi Comment          guifg=#661d23 guibg=#222222 gui=italic
hi Folded           guifg=#aa1924 guibg=#222222 gui=italic
hi Constant         guifg=#ececec guibg=#222222 gui=italic
hi Special          guifg=#ececec guibg=#222222 gui=bold
hi Statement        guifg=#ececec guibg=#222222 gui=bold
hi PreProc          guifg=#aa1924 guibg=#222222 gui=bold
hi MatchParen       guifg=#904800 guibg=#222222 gui=bold
hi Search           guifg=#222222 guibg=#904800 gui=none
hi Error            guifg=#cc241d guibg=#222222 gui=none
hi EndOfBuffer      guifg=#222222 guibg=#222222 gui=none

hi SpellBad         guifg=#cc241d guibg=#222222 gui=underline,bold
hi SpellCap         guifg=#aa1924 guibg=#222222 gui=underline,bold
hi SpellRare        guifg=#900048 guibg=#222222 gui=underline,bold
hi SpellLocal       guifg=#009090 guibg=#222222 gui=underline,bold

hi StatusLine       guifg=#222222 guibg=#aa1924
hi StatusLineNC     guifg=#222222 guibg=#aa1924
hi StatusLineTerm   guifg=#222222 guibg=#aa1924
hi StatusLineTermNC guifg=#222222 guibg=#aa1924
hi ToolbarLine      guifg=#222222 guibg=#aa1924
hi ToolbarButton    guifg=#222222 guibg=#aa1924

hi Pmenu            guifg=#aa1924 guibg=#ececec gui=none
hi PmenuSel         guifg=#222222 guibg=#aa1924 gui=none
hi PmenuSbar        guifg=#aa1924 guibg=#222222 gui=none
hi PmenuThumb       guifg=#009048 guibg=#009048 gui=none
hi TabLine          guifg=#aa1924 guibg=#222222 gui=none
hi TabLineSel       guifg=#222222 guibg=#aa1924 gui=none
hi TabLineFill      guifg=#aa1924 guibg=#222222 gui=none
hi TabLine          guifg=#aa1924 guibg=#661d23 gui=none
hi TabLineSel       guifg=#ececec guibg=#222222 gui=none
hi TabLineFill      guifg=#aa1924 guibg=#661d23 gui=none

hi usrStatus        guifg=#222222 guibg=#aa1924
hi usrred           guifg=#cc241d guibg=#222222 gui=underline,bold
hi usrylw           guifg=#904800 guibg=#222222 gui=underline,bold
hi usrgrn           guifg=#009048 guibg=#222222 gui=underline,bold
hi usrgry           guifg=#5e5e5e guibg=#222222 gui=underline,bold
hi usrblu           guifg=#aa1924 guibg=#222222 gui=underline,bold
hi usrgnt           guifg=#900048 guibg=#222222 gui=underline,bold
