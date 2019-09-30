" Vim color file
" Converted from Textmate theme Brogrammer using Coloration v0.4.0 (http://github.com/sickill/coloration)

set background=dark
highlight clear

if exists("syntax_on")
  syntax reset
endif

let g:colors_name = "themer"

" >>>> CTERM
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
hi Folded           ctermfg=white    ctermbg=black    cterm=italic
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
hi TabLine          ctermfg=blue     ctermbg=black    cterm=none
hi TabLineSel       ctermfg=black    ctermbg=blue     cterm=none
hi TabLineFill      ctermfg=blue     ctermbg=black    cterm=none

hi usrred           ctermfg=white    ctermbg=red
hi usrylw           ctermfg=black    ctermbg=yellow
hi usrgrn           ctermfg=black    ctermbg=green
hi usrgry           ctermfg=black    ctermbg=grey
hi usrblu           ctermfg=black    ctermbg=blue
hi usrgnt           ctermfg=black    ctermbg=magenta

" >>>> GUI
hi Normal           guifg=#282A36 guibg=#ffffde
hi Title            guifg=#282A36 guibg=#ffffde gui=bold
hi LineNr           guifg=#48b06f guibg=#ffffde gui=none
hi CursorLineNr     guifg=#48b06f guibg=#ebebca gui=bold
hi SpecialKey       guifg=#ebebca guibg=#ffffde
hi ModeMsg          guifg=#ffffde guibg=#48b06f gui=bold
hi Cursor           guifg=#ffffde guibg=#b55655
hi ColorColumn                    guibg=#ebebca gui=none
hi CursorLine                     guibg=#ebebca gui=none
hi Visual           guifg=#282A36 guibg=#a3d7a6
hi VisualNOS        guifg=#282A36 guibg=#a3d7a6

hi Type             guifg=#282A36 guibg=#ffffde gui=bold
hi Identifier       guifg=#939411 guibg=#ffffde gui=italic
hi Comment          guifg=#a3d7a6 guibg=#ffffde gui=italic
hi Folded           guifg=#282A36 guibg=#ffffde gui=italic
hi Constant         guifg=#282A36 guibg=#ffffde gui=italic
hi Special          guifg=#282A36 guibg=#ffffde gui=bold
hi Statement        guifg=#282A36 guibg=#ffffde gui=bold
hi PreProc          guifg=#48b06f guibg=#ffffde gui=bold
hi MatchParen       guifg=#939411 guibg=#ffffde gui=bold
hi Search           guifg=#ffffde guibg=#939411 gui=none
hi Error            guifg=#b55655 guibg=#ffffde gui=none
hi EndOfBuffer      guifg=#ffffde guibg=#ffffde gui=none

hi SpellBad         guifg=#b55655 guibg=#ffffde gui=underline,bold
hi SpellCap         guifg=#48b06f guibg=#ffffde gui=underline,bold
hi SpellRare        guifg=#b56e9b guibg=#ffffde gui=underline,bold
hi SpellLocal       guifg=#68a7b8 guibg=#ffffde gui=underline,bold

hi StatusLine       guifg=#ffffde guibg=#48b06f
hi StatusLineNC     guifg=#ffffde guibg=#48b06f
hi StatusLineTerm   guifg=#ffffde guibg=#48b06f
hi StatusLineTermNC guifg=#ffffde guibg=#48b06f
hi ToolbarLine      guifg=#ffffde guibg=#48b06f
hi ToolbarButton    guifg=#ffffde guibg=#48b06f

hi Pmenu            guifg=#48b06f guibg=#282A36 gui=none
hi PmenuSel         guifg=#ffffde guibg=#48b06f gui=none
hi PmenuSbar        guifg=#48b06f guibg=#ffffde gui=none
hi PmenuThumb       guifg=#896eb6 guibg=#896eb6 gui=none
hi TabLine          guifg=#48b06f guibg=#ffffde gui=none
hi TabLineSel       guifg=#ffffde guibg=#48b06f gui=none
hi TabLineFill      guifg=#48b06f guibg=#ffffde gui=none

hi usrred           guifg=#ffffde guibg=#b55655
hi usrylw           guifg=#ffffde guibg=#939411
hi usrgrn           guifg=#ffffde guibg=#896eb6
hi usrgry           guifg=#ffffde guibg=#c3c3a2
hi usrblu           guifg=#ffffde guibg=#48b06f
hi usrgnt           guifg=#ffffde guibg=#b56e9b

