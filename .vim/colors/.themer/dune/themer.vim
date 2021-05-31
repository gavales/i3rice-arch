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
hi Normal           guifg=#461717 guibg=#fef7ec
hi Title            guifg=#461717 guibg=#fef7ec gui=bold
hi LineNr           guifg=#EFA92E guibg=#fef7ec gui=none
hi CursorLineNr     guifg=#EFA92E guibg=#eae3d8 gui=bold
hi SpecialKey       guifg=#eae3d8 guibg=#fef7ec
hi ModeMsg          guifg=#fef7ec guibg=#EFA92E gui=bold
hi Cursor           guifg=#fef7ec guibg=#b85227
hi ColorColumn                    guibg=#eae3d8 gui=none
hi CursorLine                     guibg=#eae3d8 gui=none
hi Visual           guifg=#461717 guibg=#f6d08d
hi VisualNOS        guifg=#461717 guibg=#f6d08d

hi Type             guifg=#461717 guibg=#fef7ec gui=bold
hi Identifier       guifg=#DDB700 guibg=#fef7ec gui=italic
hi Comment          guifg=#f6d08d guibg=#fef7ec gui=italic
hi Folded           guifg=#EFA92E guibg=#fef7ec gui=italic
hi FoldColumn       guifg=#fef7ec guibg=#fef7ec gui=italic
hi Constant         guifg=#461717 guibg=#fef7ec gui=italic
hi Special          guifg=#461717 guibg=#fef7ec gui=bold
hi Statement        guifg=#461717 guibg=#fef7ec gui=bold
hi PreProc          guifg=#EFA92E guibg=#fef7ec gui=bold
hi MatchParen       guifg=#DDB700 guibg=#fef7ec gui=bold
hi Search           guifg=#fef7ec guibg=#DDB700 gui=none
hi Error            guifg=#b85227 guibg=#fef7ec gui=none
hi EndOfBuffer      guifg=#fef7ec guibg=#fef7ec gui=none

hi SpellBad         guifg=#b85227 guibg=#fef7ec gui=undercurl,bold
hi SpellCap         guifg=#EFA92E guibg=#fef7ec gui=undercurl,bold
hi SpellRare        guifg=#B043D1 guibg=#fef7ec gui=undercurl,bold
hi SpellLocal       guifg=#3FDCEE guibg=#fef7ec gui=undercurl,bold

hi StatusLine       guifg=#fef7ec guibg=#EFA92E
hi StatusLineNC     guifg=#fef7ec guibg=#EFA92E
hi StatusLineTerm   guifg=#fef7ec guibg=#EFA92E
hi StatusLineTermNC guifg=#fef7ec guibg=#EFA92E
hi ToolbarLine      guifg=#fef7ec guibg=#EFA92E
hi ToolbarButton    guifg=#fef7ec guibg=#EFA92E

hi Pmenu            guifg=#EFA92E guibg=#461717 gui=none
hi PmenuSel         guifg=#fef7ec guibg=#EFA92E gui=none
hi PmenuSbar        guifg=#EFA92E guibg=#fef7ec gui=none
hi PmenuThumb       guifg=#18E3C8 guibg=#18E3C8 gui=none
hi TabLine          guifg=#EFA92E guibg=#fef7ec gui=none
hi TabLineSel       guifg=#fef7ec guibg=#EFA92E gui=none
hi TabLineFill      guifg=#EFA92E guibg=#fef7ec gui=none
hi TabLine          guifg=#EFA92E guibg=#f6d08d gui=none
hi TabLineSel       guifg=#461717 guibg=#fef7ec gui=none
hi TabLineFill      guifg=#EFA92E guibg=#f6d08d gui=none

hi usrStatus        guifg=#461717 guibg=#eae3d8
hi usrgry           guifg=#f6d08d guibg=#eae3d8 gui=none
hi usrblu           guifg=#fef7ec guibg=#f6d08d gui=none
hi usrred           guifg=#fef7ec guibg=#cd7c49 gui=none
hi usrylw           guifg=#fef7ec guibg=#e5bf2f gui=none
hi usrgrn           guifg=#fef7ec guibg=#63dcb3 gui=none
hi usrgnt           guifg=#fef7ec guibg=#c772b9 gui=none
hi USRgry           guifg=#eae3d8 guibg=#f6d08d gui=bold
hi USRblu           guifg=#f6d08d guibg=#fef7ec gui=bold
hi USRred           guifg=#cd7c49 guibg=#fef7ec gui=bold
hi USRylw           guifg=#e5bf2f guibg=#fef7ec gui=bold
hi USRgrn           guifg=#63dcb3 guibg=#fef7ec gui=bold
hi USRgnt           guifg=#c772b9 guibg=#fef7ec gui=bold
