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
hi Normal           guifg=#1A110A guibg=#FFD9B3
hi Title            guifg=#1A110A guibg=#FFD9B3 gui=bold
hi LineNr           guifg=#714019 guibg=#FFD9B3 gui=none
hi CursorLineNr     guifg=#714019 guibg=#ebc59f gui=bold
hi SpecialKey       guifg=#ebc59f guibg=#FFD9B3
hi ModeMsg          guifg=#FFD9B3 guibg=#714019 gui=bold
hi Cursor           guifg=#FFD9B3 guibg=#cc241d
hi ColorColumn                    guibg=#ebc59f gui=none
hi CursorLine                     guibg=#ebc59f gui=none
hi Visual           guifg=#1A110A guibg=#b88c66
hi VisualNOS        guifg=#1A110A guibg=#b88c66

hi Type             guifg=#1A110A guibg=#FFD9B3 gui=bold
hi Identifier       guifg=#904800 guibg=#FFD9B3 gui=italic
hi Comment          guifg=#b88c66 guibg=#FFD9B3 gui=italic
hi Folded           guifg=#714019 guibg=#FFD9B3 gui=italic
hi Constant         guifg=#1A110A guibg=#FFD9B3 gui=italic
hi Special          guifg=#1A110A guibg=#FFD9B3 gui=bold
hi Statement        guifg=#1A110A guibg=#FFD9B3 gui=bold
hi PreProc          guifg=#714019 guibg=#FFD9B3 gui=bold
hi MatchParen       guifg=#904800 guibg=#FFD9B3 gui=bold
hi Search           guifg=#FFD9B3 guibg=#904800 gui=none
hi Error            guifg=#cc241d guibg=#FFD9B3 gui=none
hi EndOfBuffer      guifg=#FFD9B3 guibg=#FFD9B3 gui=none

hi SpellBad         guifg=#cc241d guibg=#FFD9B3 gui=underline,bold
hi SpellCap         guifg=#714019 guibg=#FFD9B3 gui=underline,bold
hi SpellRare        guifg=#900048 guibg=#FFD9B3 gui=underline,bold
hi SpellLocal       guifg=#009090 guibg=#FFD9B3 gui=underline,bold

hi StatusLine       guifg=#FFD9B3 guibg=#714019
hi StatusLineNC     guifg=#FFD9B3 guibg=#714019
hi StatusLineTerm   guifg=#FFD9B3 guibg=#714019
hi StatusLineTermNC guifg=#FFD9B3 guibg=#714019
hi ToolbarLine      guifg=#FFD9B3 guibg=#714019
hi ToolbarButton    guifg=#FFD9B3 guibg=#714019

hi Pmenu            guifg=#714019 guibg=#1A110A gui=none
hi PmenuSel         guifg=#FFD9B3 guibg=#714019 gui=none
hi PmenuSbar        guifg=#714019 guibg=#FFD9B3 gui=none
hi PmenuThumb       guifg=#009048 guibg=#009048 gui=none
hi TabLine          guifg=#714019 guibg=#FFD9B3 gui=none
hi TabLineSel       guifg=#FFD9B3 guibg=#714019 gui=none
hi TabLineFill      guifg=#714019 guibg=#FFD9B3 gui=none
hi TabLine          guifg=#714019 guibg=#b88c66 gui=none
hi TabLineSel       guifg=#1A110A guibg=#FFD9B3 gui=none
hi TabLineFill      guifg=#714019 guibg=#b88c66 gui=none

hi usrred           guifg=#FFD9B3 guibg=#cc241d
hi usrylw           guifg=#FFD9B3 guibg=#904800
hi usrgrn           guifg=#FFD9B3 guibg=#009048
hi usrgry           guifg=#FFD9B3 guibg=#c39d77
hi usrblu           guifg=#FFD9B3 guibg=#714019
hi usrgnt           guifg=#FFD9B3 guibg=#900048

