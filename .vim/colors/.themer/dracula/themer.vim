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
hi Folded           guifg=#48b06f guibg=#ffffde gui=italic
hi FoldColumn       guifg=#ffffde guibg=#ffffde gui=italic
hi Constant         guifg=#282A36 guibg=#ffffde gui=italic
hi Special          guifg=#282A36 guibg=#ffffde gui=bold
hi Statement        guifg=#282A36 guibg=#ffffde gui=bold
hi PreProc          guifg=#48b06f guibg=#ffffde gui=bold
hi MatchParen       guifg=#939411 guibg=#ffffde gui=bold
hi Search           guifg=#ffffde guibg=#939411 gui=none
hi Error            guifg=#b55655 guibg=#ffffde gui=none
hi EndOfBuffer      guifg=#ffffde guibg=#ffffde gui=none

hi SpellBad         guifg=#b55655 guibg=#ffffde gui=undercurl,bold
hi SpellCap         guifg=#48b06f guibg=#ffffde gui=undercurl,bold
hi SpellRare        guifg=#b56e9b guibg=#ffffde gui=undercurl,bold
hi SpellLocal       guifg=#68a7b8 guibg=#ffffde gui=undercurl,bold

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
hi TabLine          guifg=#48b06f guibg=#a3d7a6 gui=none
hi TabLineSel       guifg=#282A36 guibg=#ffffde gui=none
hi TabLineFill      guifg=#48b06f guibg=#a3d7a6 gui=none

hi usrStatus        guifg=#282A36 guibg=#ebebca
hi usrgry           guifg=#a3d7a6 guibg=#ebebca gui=none
hi usrblu           guifg=#ffffde guibg=#a3d7a6 gui=none
hi usrred           guifg=#ffffde guibg=#c78077 gui=none
hi usrylw           guifg=#ffffde guibg=#aeae44 gui=none
hi usrgrn           guifg=#ffffde guibg=#a692c0 gui=none
hi usrgnt           guifg=#ffffde guibg=#c792ab gui=none
hi USRgry           guifg=#ebebca guibg=#a3d7a6 gui=bold
hi USRblu           guifg=#a3d7a6 guibg=#ffffde gui=bold
hi USRred           guifg=#c78077 guibg=#ffffde gui=bold
hi USRylw           guifg=#aeae44 guibg=#ffffde gui=bold
hi USRgrn           guifg=#a692c0 guibg=#ffffde gui=bold
hi USRgnt           guifg=#c792ab guibg=#ffffde gui=bold
