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
hi Normal           guifg=#fef7ec guibg=#461717
hi Title            guifg=#fef7ec guibg=#461717 gui=bold
hi LineNr           guifg=#EFA92E guibg=#461717 gui=none
hi CursorLineNr     guifg=#EFA92E guibg=#5a2b2b gui=bold
hi SpecialKey       guifg=#5a2b2b guibg=#461717
hi ModeMsg          guifg=#461717 guibg=#EFA92E gui=bold
hi Cursor           guifg=#461717 guibg=#b85227
hi ColorColumn                    guibg=#5a2b2b gui=none
hi CursorLine                     guibg=#5a2b2b gui=none
hi Visual           guifg=#fef7ec guibg=#9a6022
hi VisualNOS        guifg=#fef7ec guibg=#9a6022

hi Type             guifg=#fef7ec guibg=#461717 gui=bold
hi Identifier       guifg=#DDB700 guibg=#461717 gui=italic
hi Comment          guifg=#9a6022 guibg=#461717 gui=italic
hi Folded           guifg=#EFA92E guibg=#461717 gui=italic
hi FoldColumn       guifg=#461717 guibg=#461717 gui=italic
hi Constant         guifg=#fef7ec guibg=#461717 gui=italic
hi Special          guifg=#fef7ec guibg=#461717 gui=bold
hi Statement        guifg=#fef7ec guibg=#461717 gui=bold
hi PreProc          guifg=#EFA92E guibg=#461717 gui=bold
hi MatchParen       guifg=#DDB700 guibg=#461717 gui=bold
hi Search           guifg=#461717 guibg=#DDB700 gui=none
hi Error            guifg=#b85227 guibg=#461717 gui=none
hi EndOfBuffer      guifg=#461717 guibg=#461717 gui=none

hi SpellBad         guifg=#b85227 guibg=#461717 gui=undercurl,bold
hi SpellCap         guifg=#EFA92E guibg=#461717 gui=undercurl,bold
hi SpellRare        guifg=#B043D1 guibg=#461717 gui=undercurl,bold
hi SpellLocal       guifg=#3FDCEE guibg=#461717 gui=undercurl,bold

hi StatusLine       guifg=#461717 guibg=#EFA92E
hi StatusLineNC     guifg=#461717 guibg=#EFA92E
hi StatusLineTerm   guifg=#461717 guibg=#EFA92E
hi StatusLineTermNC guifg=#461717 guibg=#EFA92E
hi ToolbarLine      guifg=#461717 guibg=#EFA92E
hi ToolbarButton    guifg=#461717 guibg=#EFA92E

hi Pmenu            guifg=#EFA92E guibg=#fef7ec gui=none
hi PmenuSel         guifg=#461717 guibg=#EFA92E gui=none
hi PmenuSbar        guifg=#EFA92E guibg=#461717 gui=none
hi PmenuThumb       guifg=#18E3C8 guibg=#18E3C8 gui=none
hi TabLine          guifg=#EFA92E guibg=#461717 gui=none
hi TabLineSel       guifg=#461717 guibg=#EFA92E gui=none
hi TabLineFill      guifg=#EFA92E guibg=#461717 gui=none
hi TabLine          guifg=#EFA92E guibg=#9a6022 gui=none
hi TabLineSel       guifg=#fef7ec guibg=#461717 gui=none
hi TabLineFill      guifg=#EFA92E guibg=#9a6022 gui=none

hi usrStatus        guifg=#fef7ec guibg=#5a2b2b
hi usrgry           guifg=#9a6022 guibg=#5a2b2b gui=none
hi usrblu           guifg=#461717 guibg=#9a6022 gui=none
hi usrred           guifg=#461717 guibg=#ad5625 gui=none
hi usrylw           guifg=#461717 guibg=#c6990b gui=none
hi usrgrn           guifg=#461717 guibg=#44b68f gui=none
hi usrgnt           guifg=#461717 guibg=#a84c95 gui=none
hi USRgry           guifg=#5a2b2b guibg=#9a6022 gui=bold
hi USRblu           guifg=#9a6022 guibg=#461717 gui=bold
hi USRred           guifg=#ad5625 guibg=#461717 gui=bold
hi USRylw           guifg=#c6990b guibg=#461717 gui=bold
hi USRgrn           guifg=#44b68f guibg=#461717 gui=bold
hi USRgnt           guifg=#a84c95 guibg=#461717 gui=bold
