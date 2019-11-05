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

hi usrStatus        ctermfg=white    ctermbg=Gray
hi usrred           ctermfg=red      ctermbg=black    cterm=underline,bold
hi usrylw           ctermfg=yellow   ctermbg=black    cterm=underline,bold
hi usrgrn           ctermfg=green    ctermbg=black    cterm=underline,bold
hi usrgry           ctermfg=grey     ctermbg=black    cterm=underline,bold
hi usrblu           ctermfg=blue     ctermbg=black    cterm=underline,bold
hi usrgnt           ctermfg=magenta  ctermbg=black    cterm=underline,bold

" ━  GUI
hi Normal           guifg=#303030 guibg=#f6f6f4
hi Title            guifg=#303030 guibg=#f6f6f4 gui=bold
hi LineNr           guifg=#b46b7d guibg=#f6f6f4 gui=none
hi CursorLineNr     guifg=#b46b7d guibg=#e2e2e0 gui=bold
hi SpecialKey       guifg=#e2e2e0 guibg=#f6f6f4
hi ModeMsg          guifg=#f6f6f4 guibg=#b46b7d gui=bold
hi Cursor           guifg=#f6f6f4 guibg=#ff4845
hi ColorColumn                    guibg=#e2e2e0 gui=none
hi CursorLine                     guibg=#e2e2e0 gui=none
hi Visual           guifg=#303030 guibg=#d5b0b8
hi VisualNOS        guifg=#303030 guibg=#d5b0b8

hi Type             guifg=#303030 guibg=#f6f6f4 gui=bold
hi Identifier       guifg=#ff890a guibg=#f6f6f4 gui=italic
hi Comment          guifg=#d5b0b8 guibg=#f6f6f4 gui=italic
hi Folded           guifg=#b46b7d guibg=#f6f6f4 gui=italic
hi Constant         guifg=#303030 guibg=#f6f6f4 gui=italic
hi Special          guifg=#303030 guibg=#f6f6f4 gui=bold
hi Statement        guifg=#303030 guibg=#f6f6f4 gui=bold
hi PreProc          guifg=#b46b7d guibg=#f6f6f4 gui=bold
hi MatchParen       guifg=#ff890a guibg=#f6f6f4 gui=bold
hi Search           guifg=#f6f6f4 guibg=#ff890a gui=none
hi Error            guifg=#ff4845 guibg=#f6f6f4 gui=none
hi EndOfBuffer      guifg=#f6f6f4 guibg=#f6f6f4 gui=none

hi SpellBad         guifg=#ff4845 guibg=#f6f6f4 gui=underline,bold
hi SpellCap         guifg=#b46b7d guibg=#f6f6f4 gui=underline,bold
hi SpellRare        guifg=#288ad6 guibg=#f6f6f4 gui=underline,bold
hi SpellLocal       guifg=#6bb4a2 guibg=#f6f6f4 gui=underline,bold

hi StatusLine       guifg=#f6f6f4 guibg=#b46b7d
hi StatusLineNC     guifg=#f6f6f4 guibg=#b46b7d
hi StatusLineTerm   guifg=#f6f6f4 guibg=#b46b7d
hi StatusLineTermNC guifg=#f6f6f4 guibg=#b46b7d
hi ToolbarLine      guifg=#f6f6f4 guibg=#b46b7d
hi ToolbarButton    guifg=#f6f6f4 guibg=#b46b7d

hi Pmenu            guifg=#b46b7d guibg=#303030 gui=none
hi PmenuSel         guifg=#f6f6f4 guibg=#b46b7d gui=none
hi PmenuSbar        guifg=#b46b7d guibg=#f6f6f4 gui=none
hi PmenuThumb       guifg=#47aa12 guibg=#47aa12 gui=none
hi TabLine          guifg=#b46b7d guibg=#f6f6f4 gui=none
hi TabLineSel       guifg=#f6f6f4 guibg=#b46b7d gui=none
hi TabLineFill      guifg=#b46b7d guibg=#f6f6f4 gui=none
hi TabLine          guifg=#b46b7d guibg=#d5b0b8 gui=none
hi TabLineSel       guifg=#303030 guibg=#f6f6f4 gui=none
hi TabLineFill      guifg=#b46b7d guibg=#d5b0b8 gui=none

hi usrStatus        guifg=#303030 guibg=#e2e2e0
hi usrred           guifg=#ff4845 guibg=#f6f6f4 gui=underline,bold
hi usrylw           guifg=#ff890a guibg=#f6f6f4 gui=underline,bold
hi usrgrn           guifg=#47aa12 guibg=#f6f6f4 gui=underline,bold
hi usrgry           guifg=#babab8 guibg=#f6f6f4 gui=underline,bold
hi usrblu           guifg=#b46b7d guibg=#f6f6f4 gui=underline,bold
hi usrgnt           guifg=#288ad6 guibg=#f6f6f4 gui=underline,bold
