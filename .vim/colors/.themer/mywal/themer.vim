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
hi Normal           guifg=#262a3b guibg=#f8fafd
hi Title            guifg=#262a3b guibg=#f8fafd gui=bold
hi LineNr           guifg=#9299A9 guibg=#f8fafd gui=none
hi CursorLineNr     guifg=#9299A9 guibg=#e4e6e9 gui=bold
hi SpecialKey       guifg=#e4e6e9 guibg=#f8fafd
hi ModeMsg          guifg=#f8fafd guibg=#9299A9 gui=bold
hi Cursor           guifg=#f8fafd guibg=#6D86A9
hi ColorColumn                    guibg=#e4e6e9 gui=none
hi CursorLine                     guibg=#e4e6e9 gui=none
hi Visual           guifg=#262a3b guibg=#c5c9d3
hi VisualNOS        guifg=#262a3b guibg=#c5c9d3

hi Type             guifg=#262a3b guibg=#f8fafd gui=bold
hi Identifier       guifg=#6A9ADC guibg=#f8fafd gui=italic
hi Comment          guifg=#c5c9d3 guibg=#f8fafd gui=italic
hi Folded           guifg=#9299A9 guibg=#f8fafd gui=italic
hi FoldColumn       guifg=#f8fafd guibg=#f8fafd gui=italic
hi Constant         guifg=#262a3b guibg=#f8fafd gui=italic
hi Special          guifg=#262a3b guibg=#f8fafd gui=bold
hi Statement        guifg=#262a3b guibg=#f8fafd gui=bold
hi PreProc          guifg=#9299A9 guibg=#f8fafd gui=bold
hi MatchParen       guifg=#6A9ADC guibg=#f8fafd gui=bold
hi Search           guifg=#f8fafd guibg=#6A9ADC gui=none
hi Error            guifg=#6D86A9 guibg=#f8fafd gui=none
hi EndOfBuffer      guifg=#f8fafd guibg=#f8fafd gui=none

hi SpellBad         guifg=#6D86A9 guibg=#f8fafd gui=undercurl,bold
hi SpellCap         guifg=#9299A9 guibg=#f8fafd gui=undercurl,bold
hi SpellRare        guifg=#DAB9AD guibg=#f8fafd gui=undercurl,bold
hi SpellLocal       guifg=#96B3E0 guibg=#f8fafd gui=undercurl,bold

hi StatusLine       guifg=#f8fafd guibg=#9299A9
hi StatusLineNC     guifg=#f8fafd guibg=#9299A9
hi StatusLineTerm   guifg=#f8fafd guibg=#9299A9
hi StatusLineTermNC guifg=#f8fafd guibg=#9299A9
hi ToolbarLine      guifg=#f8fafd guibg=#9299A9
hi ToolbarButton    guifg=#f8fafd guibg=#9299A9

hi Pmenu            guifg=#9299A9 guibg=#262a3b gui=none
hi PmenuSel         guifg=#f8fafd guibg=#9299A9 gui=none
hi PmenuSbar        guifg=#9299A9 guibg=#f8fafd gui=none
hi PmenuThumb       guifg=#388CE8 guibg=#388CE8 gui=none
hi TabLine          guifg=#9299A9 guibg=#f8fafd gui=none
hi TabLineSel       guifg=#f8fafd guibg=#9299A9 gui=none
hi TabLineFill      guifg=#9299A9 guibg=#f8fafd gui=none
hi TabLine          guifg=#9299A9 guibg=#c5c9d3 gui=none
hi TabLineSel       guifg=#262a3b guibg=#f8fafd gui=none
hi TabLineFill      guifg=#9299A9 guibg=#c5c9d3 gui=none

hi usrStatus        guifg=#262a3b guibg=#e4e6e9
hi usrgry           guifg=#c5c9d3 guibg=#e4e6e9 gui=none
hi usrblu           guifg=#f8fafd guibg=#c5c9d3 gui=none
hi usrred           guifg=#f8fafd guibg=#b2c0d3 gui=none
hi usrylw           guifg=#f8fafd guibg=#b1caec gui=none
hi usrgrn           guifg=#f8fafd guibg=#98c3f2 gui=none
hi usrgnt           guifg=#f8fafd guibg=#e9d9d5 gui=none
