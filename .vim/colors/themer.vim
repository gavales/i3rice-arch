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
hi Normal           guifg=#505050 guibg=#fafafa
hi Title            guifg=#505050 guibg=#fafafa gui=bold
hi LineNr           guifg=#66ac68 guibg=#fafafa gui=none
hi CursorLineNr     guifg=#66ac68 guibg=#e6e6e6 gui=bold
hi SpecialKey       guifg=#e6e6e6 guibg=#fafafa
hi ModeMsg          guifg=#fafafa guibg=#66ac68 gui=bold
hi Cursor           guifg=#fafafa guibg=#c7728f
hi ColorColumn                    guibg=#e6e6e6 gui=none
hi CursorLine                     guibg=#e6e6e6 gui=none
hi Visual           guifg=#505050 guibg=#b0d3b1
hi VisualNOS        guifg=#505050 guibg=#b0d3b1

hi Type             guifg=#505050 guibg=#fafafa gui=bold
hi Identifier       guifg=#cec09f guibg=#fafafa gui=italic
hi Comment          guifg=#b0d3b1 guibg=#fafafa gui=italic
hi Folded           guifg=#66ac68 guibg=#fafafa gui=italic
hi FoldColumn       guifg=#fafafa guibg=#fafafa gui=italic
hi Constant         guifg=#505050 guibg=#fafafa gui=italic
hi Special          guifg=#505050 guibg=#fafafa gui=bold
hi Statement        guifg=#505050 guibg=#fafafa gui=bold
hi PreProc          guifg=#66ac68 guibg=#fafafa gui=bold
hi MatchParen       guifg=#cec09f guibg=#fafafa gui=bold
hi Search           guifg=#fafafa guibg=#cec09f gui=none
hi Error            guifg=#c7728f guibg=#fafafa gui=none
hi EndOfBuffer      guifg=#fafafa guibg=#fafafa gui=none

hi SpellBad         guifg=#c7728f guibg=#fafafa gui=undercurl,bold
hi SpellCap         guifg=#66ac68 guibg=#fafafa gui=undercurl,bold
hi SpellRare        guifg=#b66dac guibg=#fafafa gui=undercurl,bold
hi SpellLocal       guifg=#1cb9b1 guibg=#fafafa gui=undercurl,bold

hi StatusLine       guifg=#fafafa guibg=#66ac68
hi StatusLineNC     guifg=#fafafa guibg=#66ac68
hi StatusLineTerm   guifg=#fafafa guibg=#66ac68
hi StatusLineTermNC guifg=#fafafa guibg=#66ac68
hi ToolbarLine      guifg=#fafafa guibg=#66ac68
hi ToolbarButton    guifg=#fafafa guibg=#66ac68

hi Pmenu            guifg=#66ac68 guibg=#505050 gui=none
hi PmenuSel         guifg=#fafafa guibg=#66ac68 gui=none
hi PmenuSbar        guifg=#66ac68 guibg=#fafafa gui=none
hi PmenuThumb       guifg=#66ac68 guibg=#66ac68 gui=none
hi TabLine          guifg=#66ac68 guibg=#fafafa gui=none
hi TabLineSel       guifg=#fafafa guibg=#66ac68 gui=none
hi TabLineFill      guifg=#66ac68 guibg=#fafafa gui=none
hi TabLine          guifg=#66ac68 guibg=#b0d3b1 gui=none
hi TabLineSel       guifg=#505050 guibg=#fafafa gui=none
hi TabLineFill      guifg=#66ac68 guibg=#b0d3b1 gui=none

hi usrStatus        guifg=#505050 guibg=#e6e6e6
hi usrgry           guifg=#b0d3b1 guibg=#e6e6e6 gui=none
hi usrblu           guifg=#fafafa guibg=#b0d3b1 gui=none
hi usrred           guifg=#fafafa guibg=#bf929a gui=none
hi usrylw           guifg=#fafafa guibg=#c3c6a5 gui=none
hi usrgrn           guifg=#fafafa guibg=#7fb980 gui=none
hi usrgnt           guifg=#fafafa guibg=#b38fad gui=none
hi USRgry           guifg=#e6e6e6 guibg=#b0d3b1 gui=bold
hi USRblu           guifg=#b0d3b1 guibg=#fafafa gui=bold
hi USRred           guifg=#bf929a guibg=#fafafa gui=bold
hi USRylw           guifg=#c3c6a5 guibg=#fafafa gui=bold
hi USRgrn           guifg=#7fb980 guibg=#fafafa gui=bold
hi USRgnt           guifg=#b38fad guibg=#fafafa gui=bold
