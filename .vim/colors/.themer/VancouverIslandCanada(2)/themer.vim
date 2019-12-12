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
hi Normal           guifg=#0c0e0d guibg=#bcb2be
hi Title            guifg=#0c0e0d guibg=#bcb2be gui=bold
hi LineNr           guifg=#686B98 guibg=#bcb2be gui=none
hi CursorLineNr     guifg=#686B98 guibg=#a89eaa gui=bold
hi SpecialKey       guifg=#a89eaa guibg=#bcb2be
hi ModeMsg          guifg=#bcb2be guibg=#686B98 gui=bold
hi Cursor           guifg=#bcb2be guibg=#316BAC
hi ColorColumn                    guibg=#a89eaa gui=none
hi CursorLine                     guibg=#a89eaa gui=none
hi Visual           guifg=#0c0e0d guibg=#928eab
hi VisualNOS        guifg=#0c0e0d guibg=#928eab

hi Type             guifg=#0c0e0d guibg=#bcb2be gui=bold
hi Identifier       guifg=#506596 guibg=#bcb2be gui=italic
hi Comment          guifg=#928eab guibg=#bcb2be gui=italic
hi Folded           guifg=#686B98 guibg=#bcb2be gui=italic
hi FoldColumn       guifg=#bcb2be guibg=#bcb2be gui=italic
hi Constant         guifg=#0c0e0d guibg=#bcb2be gui=italic
hi Special          guifg=#0c0e0d guibg=#bcb2be gui=bold
hi Statement        guifg=#0c0e0d guibg=#bcb2be gui=bold
hi PreProc          guifg=#686B98 guibg=#bcb2be gui=bold
hi MatchParen       guifg=#506596 guibg=#bcb2be gui=bold
hi Search           guifg=#bcb2be guibg=#506596 gui=none
hi Error            guifg=#316BAC guibg=#bcb2be gui=none
hi EndOfBuffer      guifg=#bcb2be guibg=#bcb2be gui=none

hi SpellBad         guifg=#316BAC guibg=#bcb2be gui=undercurl,bold
hi SpellCap         guifg=#686B98 guibg=#bcb2be gui=undercurl,bold
hi SpellRare        guifg=#4A70AA guibg=#bcb2be gui=undercurl,bold
hi SpellLocal       guifg=#5A79C5 guibg=#bcb2be gui=undercurl,bold

hi StatusLine       guifg=#bcb2be guibg=#686B98
hi StatusLineNC     guifg=#bcb2be guibg=#686B98
hi StatusLineTerm   guifg=#bcb2be guibg=#686B98
hi StatusLineTermNC guifg=#bcb2be guibg=#686B98
hi ToolbarLine      guifg=#bcb2be guibg=#686B98
hi ToolbarButton    guifg=#bcb2be guibg=#686B98

hi Pmenu            guifg=#686B98 guibg=#0c0e0d gui=none
hi PmenuSel         guifg=#bcb2be guibg=#686B98 gui=none
hi PmenuSbar        guifg=#686B98 guibg=#bcb2be gui=none
hi PmenuThumb       guifg=#4B5A8C guibg=#4B5A8C gui=none
hi TabLine          guifg=#686B98 guibg=#bcb2be gui=none
hi TabLineSel       guifg=#bcb2be guibg=#686B98 gui=none
hi TabLineFill      guifg=#686B98 guibg=#bcb2be gui=none
hi TabLine          guifg=#686B98 guibg=#928eab gui=none
hi TabLineSel       guifg=#0c0e0d guibg=#bcb2be gui=none
hi TabLineFill      guifg=#686B98 guibg=#928eab gui=none

hi usrStatus        guifg=#0c0e0d guibg=#a89eaa
hi usrgry           guifg=#928eab guibg=#a89eaa gui=none
hi usrblu           guifg=#bcb2be guibg=#928eab gui=none
hi usrred           guifg=#bcb2be guibg=#768eb5 gui=none
hi usrylw           guifg=#bcb2be guibg=#868baa gui=none
hi usrgrn           guifg=#bcb2be guibg=#8386a5 gui=none
hi usrgnt           guifg=#bcb2be guibg=#8391b4 gui=none
