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
hi Normal           guifg=#f8fafd guibg=#262a3b
hi Title            guifg=#f8fafd guibg=#262a3b gui=bold
hi LineNr           guifg=#9299A9 guibg=#262a3b gui=none
hi CursorLineNr     guifg=#9299A9 guibg=#3a3e4f gui=bold
hi SpecialKey       guifg=#3a3e4f guibg=#262a3b
hi ModeMsg          guifg=#262a3b guibg=#9299A9 gui=bold
hi Cursor           guifg=#262a3b guibg=#6D86A9
hi ColorColumn                    guibg=#3a3e4f gui=none
hi CursorLine                     guibg=#3a3e4f gui=none
hi Visual           guifg=#f8fafd guibg=#5c6172
hi VisualNOS        guifg=#f8fafd guibg=#5c6172

hi Type             guifg=#f8fafd guibg=#262a3b gui=bold
hi Identifier       guifg=#6A9ADC guibg=#262a3b gui=italic
hi Comment          guifg=#5c6172 guibg=#262a3b gui=italic
hi Folded           guifg=#9299A9 guibg=#262a3b gui=italic
hi FoldColumn       guifg=#262a3b guibg=#262a3b gui=italic
hi Constant         guifg=#f8fafd guibg=#262a3b gui=italic
hi Special          guifg=#f8fafd guibg=#262a3b gui=bold
hi Statement        guifg=#f8fafd guibg=#262a3b gui=bold
hi PreProc          guifg=#9299A9 guibg=#262a3b gui=bold
hi MatchParen       guifg=#6A9ADC guibg=#262a3b gui=bold
hi Search           guifg=#262a3b guibg=#6A9ADC gui=none
hi Error            guifg=#6D86A9 guibg=#262a3b gui=none
hi EndOfBuffer      guifg=#262a3b guibg=#262a3b gui=none

hi SpellBad         guifg=#6D86A9 guibg=#262a3b gui=undercurl,bold
hi SpellCap         guifg=#9299A9 guibg=#262a3b gui=undercurl,bold
hi SpellRare        guifg=#DAB9AD guibg=#262a3b gui=undercurl,bold
hi SpellLocal       guifg=#96B3E0 guibg=#262a3b gui=undercurl,bold

hi StatusLine       guifg=#262a3b guibg=#9299A9
hi StatusLineNC     guifg=#262a3b guibg=#9299A9
hi StatusLineTerm   guifg=#262a3b guibg=#9299A9
hi StatusLineTermNC guifg=#262a3b guibg=#9299A9
hi ToolbarLine      guifg=#262a3b guibg=#9299A9
hi ToolbarButton    guifg=#262a3b guibg=#9299A9

hi Pmenu            guifg=#9299A9 guibg=#f8fafd gui=none
hi PmenuSel         guifg=#262a3b guibg=#9299A9 gui=none
hi PmenuSbar        guifg=#9299A9 guibg=#262a3b gui=none
hi PmenuThumb       guifg=#388CE8 guibg=#388CE8 gui=none
hi TabLine          guifg=#9299A9 guibg=#262a3b gui=none
hi TabLineSel       guifg=#262a3b guibg=#9299A9 gui=none
hi TabLineFill      guifg=#9299A9 guibg=#262a3b gui=none
hi TabLine          guifg=#9299A9 guibg=#5c6172 gui=none
hi TabLineSel       guifg=#f8fafd guibg=#262a3b gui=none
hi TabLineFill      guifg=#9299A9 guibg=#5c6172 gui=none

hi usrStatus        guifg=#f8fafd guibg=#3a3e4f
hi usrgry           guifg=#5c6172 guibg=#3a3e4f gui=none
hi usrblu           guifg=#262a3b guibg=#5c6172 gui=none
hi usrred           guifg=#262a3b guibg=#495872 gui=none
hi usrylw           guifg=#262a3b guibg=#48628b gui=none
hi usrgrn           guifg=#262a3b guibg=#2f5b91 gui=none
hi usrgnt           guifg=#262a3b guibg=#807174 gui=none
