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
hi Normal           guifg=#f6f6f4 guibg=#303030
hi Title            guifg=#f6f6f4 guibg=#303030 gui=bold
hi LineNr           guifg=#b46b7d guibg=#303030 gui=none
hi CursorLineNr     guifg=#b46b7d guibg=#444444 gui=bold
hi SpecialKey       guifg=#444444 guibg=#303030
hi ModeMsg          guifg=#303030 guibg=#b46b7d gui=bold
hi Cursor           guifg=#303030 guibg=#ff4845
hi ColorColumn                    guibg=#444444 gui=none
hi CursorLine                     guibg=#444444 gui=none
hi Visual           guifg=#f6f6f4 guibg=#724d56
hi VisualNOS        guifg=#f6f6f4 guibg=#724d56

hi Type             guifg=#f6f6f4 guibg=#303030 gui=bold
hi Identifier       guifg=#ff890a guibg=#303030 gui=italic
hi Comment          guifg=#724d56 guibg=#303030 gui=italic
hi Folded           guifg=#b46b7d guibg=#303030 gui=italic
hi FoldColumn       guifg=#303030 guibg=#303030 gui=italic
hi Constant         guifg=#f6f6f4 guibg=#303030 gui=italic
hi Special          guifg=#f6f6f4 guibg=#303030 gui=bold
hi Statement        guifg=#f6f6f4 guibg=#303030 gui=bold
hi PreProc          guifg=#b46b7d guibg=#303030 gui=bold
hi MatchParen       guifg=#ff890a guibg=#303030 gui=bold
hi Search           guifg=#303030 guibg=#ff890a gui=none
hi Error            guifg=#ff4845 guibg=#303030 gui=none
hi EndOfBuffer      guifg=#303030 guibg=#303030 gui=none

hi SpellBad         guifg=#ff4845 guibg=#303030 gui=undercurl,bold
hi SpellCap         guifg=#b46b7d guibg=#303030 gui=undercurl,bold
hi SpellRare        guifg=#288ad6 guibg=#303030 gui=undercurl,bold
hi SpellLocal       guifg=#6bb4a2 guibg=#303030 gui=undercurl,bold

hi StatusLine       guifg=#303030 guibg=#b46b7d
hi StatusLineNC     guifg=#303030 guibg=#b46b7d
hi StatusLineTerm   guifg=#303030 guibg=#b46b7d
hi StatusLineTermNC guifg=#303030 guibg=#b46b7d
hi ToolbarLine      guifg=#303030 guibg=#b46b7d
hi ToolbarButton    guifg=#303030 guibg=#b46b7d

hi Pmenu            guifg=#b46b7d guibg=#f6f6f4 gui=none
hi PmenuSel         guifg=#303030 guibg=#b46b7d gui=none
hi PmenuSbar        guifg=#b46b7d guibg=#303030 gui=none
hi PmenuThumb       guifg=#47aa12 guibg=#47aa12 gui=none
hi TabLine          guifg=#b46b7d guibg=#303030 gui=none
hi TabLineSel       guifg=#303030 guibg=#b46b7d gui=none
hi TabLineFill      guifg=#b46b7d guibg=#303030 gui=none
hi TabLine          guifg=#b46b7d guibg=#724d56 gui=none
hi TabLineSel       guifg=#f6f6f4 guibg=#303030 gui=none
hi TabLineFill      guifg=#b46b7d guibg=#724d56 gui=none

hi usrStatus        guifg=#f6f6f4 guibg=#444444
hi usrgry           guifg=#724d56 guibg=#444444 gui=none
hi usrblu           guifg=#303030 guibg=#724d56 gui=none
hi usrred           guifg=#303030 guibg=#cf494a gui=none
hi usrylw           guifg=#303030 guibg=#cf7423 gui=none
hi usrgrn           guifg=#303030 guibg=#558a29 gui=none
hi usrgnt           guifg=#303030 guibg=#4175aa gui=none
hi USRgry           guifg=#444444 guibg=#724d56 gui=bold
hi USRblu           guifg=#724d56 guibg=#303030 gui=bold
hi USRred           guifg=#cf494a guibg=#303030 gui=bold
hi USRylw           guifg=#cf7423 guibg=#303030 gui=bold
hi USRgrn           guifg=#558a29 guibg=#303030 gui=bold
hi USRgnt           guifg=#4175aa guibg=#303030 gui=bold
