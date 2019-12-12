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

" ━  GUI
hi Normal           guifg=#0F1610 guibg=#c2c6c4
hi Title            guifg=#0F1610 guibg=#c2c6c4 gui=bold
hi LineNr           guifg=#667B86 guibg=#c2c6c4 gui=none
hi CursorLineNr     guifg=#667B86 guibg=#aeb2b0 gui=bold
hi SpecialKey       guifg=#aeb2b0 guibg=#c2c6c4
hi ModeMsg          guifg=#c2c6c4 guibg=#667B86 gui=bold
hi Cursor           guifg=#c2c6c4 guibg=#8A806F
hi ColorColumn                    guibg=#aeb2b0 gui=none
hi CursorLine                     guibg=#aeb2b0 gui=none
hi Visual           guifg=#0F1610 guibg=#94a0a5
hi VisualNOS        guifg=#0F1610 guibg=#94a0a5

hi Type             guifg=#0F1610 guibg=#c2c6c4 gui=bold
hi Identifier       guifg=#517689 guibg=#c2c6c4 gui=italic
hi Comment          guifg=#94a0a5 guibg=#c2c6c4 gui=italic
hi Folded           guifg=#667B86 guibg=#c2c6c4 gui=italic
hi FoldColumn       guifg=#c2c6c4 guibg=#c2c6c4 gui=italic
hi Constant         guifg=#0F1610 guibg=#c2c6c4 gui=italic
hi Special          guifg=#0F1610 guibg=#c2c6c4 gui=bold
hi Statement        guifg=#0F1610 guibg=#c2c6c4 gui=bold
hi PreProc          guifg=#667B86 guibg=#c2c6c4 gui=bold
hi MatchParen       guifg=#517689 guibg=#c2c6c4 gui=bold
hi Search           guifg=#c2c6c4 guibg=#517689 gui=none
hi Error            guifg=#8A806F guibg=#c2c6c4 gui=none
hi EndOfBuffer      guifg=#c2c6c4 guibg=#c2c6c4 gui=none

hi SpellBad         guifg=#8A806F guibg=#c2c6c4 gui=undercurl,bold
hi SpellCap         guifg=#667B86 guibg=#c2c6c4 gui=undercurl,bold
hi SpellRare        guifg=#6F8B94 guibg=#c2c6c4 gui=undercurl,bold
hi SpellLocal       guifg=#638D9C guibg=#c2c6c4 gui=undercurl,bold

hi StatusLine       guifg=#c2c6c4 guibg=#667B86
hi StatusLineNC     guifg=#c2c6c4 guibg=#667B86
hi StatusLineTerm   guifg=#c2c6c4 guibg=#667B86
hi StatusLineTermNC guifg=#c2c6c4 guibg=#667B86
hi ToolbarLine      guifg=#c2c6c4 guibg=#667B86
hi ToolbarButton    guifg=#c2c6c4 guibg=#667B86

hi Pmenu            guifg=#667B86 guibg=#0F1610 gui=none
hi PmenuSel         guifg=#c2c6c4 guibg=#667B86 gui=none
hi PmenuSbar        guifg=#667B86 guibg=#c2c6c4 gui=none
hi PmenuThumb       guifg=#3E6881 guibg=#3E6881 gui=none
hi TabLine          guifg=#667B86 guibg=#c2c6c4 gui=none
hi TabLineSel       guifg=#c2c6c4 guibg=#667B86 gui=none
hi TabLineFill      guifg=#667B86 guibg=#c2c6c4 gui=none
hi TabLine          guifg=#667B86 guibg=#94a0a5 gui=none
hi TabLineSel       guifg=#0F1610 guibg=#c2c6c4 gui=none
hi TabLineFill      guifg=#667B86 guibg=#94a0a5 gui=none

hi usrStatus        guifg=#0F1610 guibg=#aeb2b0
hi usrgry           guifg=#94a0a5 guibg=#aeb2b0 gui=none
hi usrblu           guifg=#c2c6c4 guibg=#94a0a5 gui=none
hi usrred           guifg=#c2c6c4 guibg=#a6a399 gui=none
hi usrylw           guifg=#c2c6c4 guibg=#899ea6 gui=none
hi usrgrn           guifg=#c2c6c4 guibg=#8097a2 gui=none
hi usrgnt           guifg=#c2c6c4 guibg=#98a8ac gui=none
