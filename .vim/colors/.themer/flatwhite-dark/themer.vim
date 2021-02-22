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
hi Normal           guifg=#F7F3EE guibg=#493C2C
hi Title            guifg=#F7F3EE guibg=#493C2C gui=bold
hi LineNr           guifg=#277eb8 guibg=#493C2C gui=none
hi CursorLineNr     guifg=#277eb8 guibg=#5d5040 gui=bold
hi SpecialKey       guifg=#5d5040 guibg=#493C2C
hi ModeMsg          guifg=#493C2C guibg=#277eb8 gui=bold
hi Cursor           guifg=#493C2C guibg=#b85227
hi ColorColumn                    guibg=#5d5040 gui=none
hi CursorLine                     guibg=#5d5040 gui=none
hi Visual           guifg=#F7F3EE guibg=#385d72
hi VisualNOS        guifg=#F7F3EE guibg=#385d72

hi Type             guifg=#F7F3EE guibg=#493C2C gui=bold
hi Identifier       guifg=#DDB700 guibg=#493C2C gui=italic
hi Comment          guifg=#385d72 guibg=#493C2C gui=italic
hi Folded           guifg=#277eb8 guibg=#493C2C gui=italic
hi FoldColumn       guifg=#493C2C guibg=#493C2C gui=italic
hi Constant         guifg=#F7F3EE guibg=#493C2C gui=italic
hi Special          guifg=#F7F3EE guibg=#493C2C gui=bold
hi Statement        guifg=#F7F3EE guibg=#493C2C gui=bold
hi PreProc          guifg=#277eb8 guibg=#493C2C gui=bold
hi MatchParen       guifg=#DDB700 guibg=#493C2C gui=bold
hi Search           guifg=#493C2C guibg=#DDB700 gui=none
hi Error            guifg=#b85227 guibg=#493C2C gui=none
hi EndOfBuffer      guifg=#493C2C guibg=#493C2C gui=none

hi SpellBad         guifg=#b85227 guibg=#493C2C gui=undercurl,bold
hi SpellCap         guifg=#277eb8 guibg=#493C2C gui=undercurl,bold
hi SpellRare        guifg=#B043D1 guibg=#493C2C gui=undercurl,bold
hi SpellLocal       guifg=#3FDCEE guibg=#493C2C gui=undercurl,bold

hi StatusLine       guifg=#493C2C guibg=#277eb8
hi StatusLineNC     guifg=#493C2C guibg=#277eb8
hi StatusLineTerm   guifg=#493C2C guibg=#277eb8
hi StatusLineTermNC guifg=#493C2C guibg=#277eb8
hi ToolbarLine      guifg=#493C2C guibg=#277eb8
hi ToolbarButton    guifg=#493C2C guibg=#277eb8

hi Pmenu            guifg=#277eb8 guibg=#F7F3EE gui=none
hi PmenuSel         guifg=#493C2C guibg=#277eb8 gui=none
hi PmenuSbar        guifg=#277eb8 guibg=#493C2C gui=none
hi PmenuThumb       guifg=#18E3C8 guibg=#18E3C8 gui=none
hi TabLine          guifg=#277eb8 guibg=#493C2C gui=none
hi TabLineSel       guifg=#493C2C guibg=#277eb8 gui=none
hi TabLineFill      guifg=#277eb8 guibg=#493C2C gui=none
hi TabLine          guifg=#277eb8 guibg=#385d72 gui=none
hi TabLineSel       guifg=#F7F3EE guibg=#493C2C gui=none
hi TabLineFill      guifg=#277eb8 guibg=#385d72 gui=none

hi usrStatus        guifg=#F7F3EE guibg=#5d5040
hi usrgry           guifg=#385d72 guibg=#5d5040 gui=none
hi usrblu           guifg=#493C2C guibg=#385d72 gui=none
hi usrred           guifg=#493C2C guibg=#8c5540 gui=none
hi usrylw           guifg=#493C2C guibg=#a49826 gui=none
hi usrgrn           guifg=#493C2C guibg=#22b5aa gui=none
hi usrgnt           guifg=#493C2C guibg=#874bb0 gui=none
hi USRgry           guifg=#5d5040 guibg=#385d72 gui=bold
hi USRblu           guifg=#385d72 guibg=#493C2C gui=bold
hi USRred           guifg=#8c5540 guibg=#493C2C gui=bold
hi USRylw           guifg=#a49826 guibg=#493C2C gui=bold
hi USRgrn           guifg=#22b5aa guibg=#493C2C gui=bold
hi USRgnt           guifg=#874bb0 guibg=#493C2C gui=bold
