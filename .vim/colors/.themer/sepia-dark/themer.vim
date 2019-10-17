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
hi Normal           guifg=#FFD9B3 guibg=#1A110A
hi Title            guifg=#FFD9B3 guibg=#1A110A gui=bold
hi LineNr           guifg=#714019 guibg=#1A110A gui=none
hi CursorLineNr     guifg=#714019 guibg=#2e251e gui=bold
hi SpecialKey       guifg=#2e251e guibg=#1A110A
hi ModeMsg          guifg=#1A110A guibg=#714019 gui=bold
hi Cursor           guifg=#1A110A guibg=#cc241d
hi ColorColumn                    guibg=#2e251e gui=none
hi CursorLine                     guibg=#2e251e gui=none
hi Visual           guifg=#FFD9B3 guibg=#452811
hi VisualNOS        guifg=#FFD9B3 guibg=#452811

hi Type             guifg=#FFD9B3 guibg=#1A110A gui=bold
hi Identifier       guifg=#904800 guibg=#1A110A gui=italic
hi Comment          guifg=#452811 guibg=#1A110A gui=italic
hi Folded           guifg=#714019 guibg=#1A110A gui=italic
hi Constant         guifg=#FFD9B3 guibg=#1A110A gui=italic
hi Special          guifg=#FFD9B3 guibg=#1A110A gui=bold
hi Statement        guifg=#FFD9B3 guibg=#1A110A gui=bold
hi PreProc          guifg=#714019 guibg=#1A110A gui=bold
hi MatchParen       guifg=#904800 guibg=#1A110A gui=bold
hi Search           guifg=#1A110A guibg=#904800 gui=none
hi Error            guifg=#cc241d guibg=#1A110A gui=none
hi EndOfBuffer      guifg=#1A110A guibg=#1A110A gui=none

hi SpellBad         guifg=#cc241d guibg=#1A110A gui=underline,bold
hi SpellCap         guifg=#714019 guibg=#1A110A gui=underline,bold
hi SpellRare        guifg=#900048 guibg=#1A110A gui=underline,bold
hi SpellLocal       guifg=#009090 guibg=#1A110A gui=underline,bold

hi StatusLine       guifg=#1A110A guibg=#714019
hi StatusLineNC     guifg=#1A110A guibg=#714019
hi StatusLineTerm   guifg=#1A110A guibg=#714019
hi StatusLineTermNC guifg=#1A110A guibg=#714019
hi ToolbarLine      guifg=#1A110A guibg=#714019
hi ToolbarButton    guifg=#1A110A guibg=#714019

hi Pmenu            guifg=#714019 guibg=#FFD9B3 gui=none
hi PmenuSel         guifg=#1A110A guibg=#714019 gui=none
hi PmenuSbar        guifg=#714019 guibg=#1A110A gui=none
hi PmenuThumb       guifg=#009048 guibg=#009048 gui=none
hi TabLine          guifg=#714019 guibg=#1A110A gui=none
hi TabLineSel       guifg=#1A110A guibg=#714019 gui=none
hi TabLineFill      guifg=#714019 guibg=#1A110A gui=none
hi TabLine          guifg=#714019 guibg=#452811 gui=none
hi TabLineSel       guifg=#FFD9B3 guibg=#1A110A gui=none
hi TabLineFill      guifg=#714019 guibg=#452811 gui=none

hi usrred           guifg=#1A110A guibg=#cc241d
hi usrylw           guifg=#1A110A guibg=#904800
hi usrgrn           guifg=#1A110A guibg=#009048
hi usrgry           guifg=#1A110A guibg=#564d46
hi usrblu           guifg=#1A110A guibg=#714019
hi usrgnt           guifg=#1A110A guibg=#900048

