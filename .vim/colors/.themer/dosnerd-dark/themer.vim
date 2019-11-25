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
hi Normal           guifg=#DFBF9F guibg=#1F1F1F
hi Title            guifg=#DFBF9F guibg=#1F1F1F gui=bold
hi LineNr           guifg=#d5715e guibg=#1F1F1F gui=none
hi CursorLineNr     guifg=#d5715e guibg=#333333 gui=bold
hi SpecialKey       guifg=#333333 guibg=#1F1F1F
hi ModeMsg          guifg=#1F1F1F guibg=#d5715e gui=bold
hi Cursor           guifg=#1F1F1F guibg=#FF4971
hi ColorColumn                    guibg=#333333 gui=none
hi CursorLine                     guibg=#333333 gui=none
hi Visual           guifg=#DFBF9F guibg=#7a483e
hi VisualNOS        guifg=#DFBF9F guibg=#7a483e

hi Type             guifg=#DFBF9F guibg=#1F1F1F gui=bold
hi Identifier       guifg=#FF8037 guibg=#1F1F1F gui=italic
hi Comment          guifg=#7a483e guibg=#1F1F1F gui=italic
hi Folded           guifg=#d5715e guibg=#1F1F1F gui=italic
hi FoldColumn       guifg=#1F1F1F guibg=#1F1F1F gui=italic
hi Constant         guifg=#DFBF9F guibg=#1F1F1F gui=italic
hi Special          guifg=#DFBF9F guibg=#1F1F1F gui=bold
hi Statement        guifg=#DFBF9F guibg=#1F1F1F gui=bold
hi PreProc          guifg=#d5715e guibg=#1F1F1F gui=bold
hi MatchParen       guifg=#FF8037 guibg=#1F1F1F gui=bold
hi Search           guifg=#1F1F1F guibg=#FF8037 gui=none
hi Error            guifg=#FF4971 guibg=#1F1F1F gui=none
hi EndOfBuffer      guifg=#1F1F1F guibg=#1F1F1F gui=none

hi SpellBad         guifg=#FF4971 guibg=#1F1F1F gui=undercurl,bold
hi SpellCap         guifg=#d5715e guibg=#1F1F1F gui=undercurl,bold
hi SpellRare        guifg=#B043D1 guibg=#1F1F1F gui=undercurl,bold
hi SpellLocal       guifg=#3FDCEE guibg=#1F1F1F gui=undercurl,bold

hi StatusLine       guifg=#1F1F1F guibg=#d5715e
hi StatusLineNC     guifg=#1F1F1F guibg=#d5715e
hi StatusLineTerm   guifg=#1F1F1F guibg=#d5715e
hi StatusLineTermNC guifg=#1F1F1F guibg=#d5715e
hi ToolbarLine      guifg=#1F1F1F guibg=#d5715e
hi ToolbarButton    guifg=#1F1F1F guibg=#d5715e

hi Pmenu            guifg=#d5715e guibg=#DFBF9F gui=none
hi PmenuSel         guifg=#1F1F1F guibg=#d5715e gui=none
hi PmenuSbar        guifg=#d5715e guibg=#1F1F1F gui=none
hi PmenuThumb       guifg=#18E3C8 guibg=#18E3C8 gui=none
hi TabLine          guifg=#d5715e guibg=#1F1F1F gui=none
hi TabLineSel       guifg=#1F1F1F guibg=#d5715e gui=none
hi TabLineFill      guifg=#d5715e guibg=#1F1F1F gui=none
hi TabLine          guifg=#d5715e guibg=#7a483e gui=none
hi TabLineSel       guifg=#DFBF9F guibg=#1F1F1F gui=none
hi TabLineFill      guifg=#d5715e guibg=#7a483e gui=none

hi usrStatus        guifg=#DFBF9F guibg=#333333
hi usrgry           guifg=#7a483e guibg=#333333 gui=none
hi usrblu           guifg=#1F1F1F guibg=#7a483e gui=none
hi usrred           guifg=#1F1F1F guibg=#8f3448 gui=none
hi usrylw           guifg=#1F1F1F guibg=#8f4f2b gui=none
hi usrgrn           guifg=#1F1F1F guibg=#1b8173 gui=none
hi usrgnt           guifg=#1F1F1F guibg=#673178 gui=none
