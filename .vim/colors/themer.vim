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
hi Normal           guifg=#d0cddb guibg=#050406
hi Title            guifg=#d0cddb guibg=#050406 gui=bold
hi LineNr           guifg=#A697AB guibg=#050406 gui=none
hi CursorLineNr     guifg=#A697AB guibg=#19181a gui=bold
hi SpecialKey       guifg=#19181a guibg=#050406
hi ModeMsg          guifg=#050406 guibg=#A697AB gui=bold
hi Cursor           guifg=#050406 guibg=#3874A6
hi ColorColumn                    guibg=#19181a gui=none
hi CursorLine                     guibg=#19181a gui=none
hi Visual           guifg=#d0cddb guibg=#554d58
hi VisualNOS        guifg=#d0cddb guibg=#554d58

hi Type             guifg=#d0cddb guibg=#050406 gui=bold
hi Identifier       guifg=#638CB1 guibg=#050406 gui=italic
hi Comment          guifg=#554d58 guibg=#050406 gui=italic
hi Folded           guifg=#A697AB guibg=#050406 gui=italic
hi FoldColumn       guifg=#050406 guibg=#050406 gui=italic
hi Constant         guifg=#d0cddb guibg=#050406 gui=italic
hi Special          guifg=#d0cddb guibg=#050406 gui=bold
hi Statement        guifg=#d0cddb guibg=#050406 gui=bold
hi PreProc          guifg=#A697AB guibg=#050406 gui=bold
hi MatchParen       guifg=#638CB1 guibg=#050406 gui=bold
hi Search           guifg=#050406 guibg=#638CB1 gui=none
hi Error            guifg=#3874A6 guibg=#050406 gui=none
hi EndOfBuffer      guifg=#050406 guibg=#050406 gui=none

hi SpellBad         guifg=#3874A6 guibg=#050406 gui=undercurl,bold
hi SpellCap         guifg=#A697AB guibg=#050406 gui=undercurl,bold
hi SpellRare        guifg=#E4A6A3 guibg=#050406 gui=undercurl,bold
hi SpellLocal       guifg=#FCD2A7 guibg=#050406 gui=undercurl,bold

hi StatusLine       guifg=#050406 guibg=#A697AB
hi StatusLineNC     guifg=#050406 guibg=#A697AB
hi StatusLineTerm   guifg=#050406 guibg=#A697AB
hi StatusLineTermNC guifg=#050406 guibg=#A697AB
hi ToolbarLine      guifg=#050406 guibg=#A697AB
hi ToolbarButton    guifg=#050406 guibg=#A697AB

hi Pmenu            guifg=#A697AB guibg=#d0cddb gui=none
hi PmenuSel         guifg=#050406 guibg=#A697AB gui=none
hi PmenuSbar        guifg=#A697AB guibg=#050406 gui=none
hi PmenuThumb       guifg=#318CBD guibg=#318CBD gui=none
hi TabLine          guifg=#A697AB guibg=#050406 gui=none
hi TabLineSel       guifg=#050406 guibg=#A697AB gui=none
hi TabLineFill      guifg=#A697AB guibg=#050406 gui=none
hi TabLine          guifg=#A697AB guibg=#554d58 gui=none
hi TabLineSel       guifg=#d0cddb guibg=#050406 gui=none
hi TabLineFill      guifg=#A697AB guibg=#554d58 gui=none

hi usrStatus        guifg=#d0cddb guibg=#19181a
hi usrgry           guifg=#554d58 guibg=#19181a gui=none
hi usrblu           guifg=#050406 guibg=#554d58 gui=none
hi usrred           guifg=#050406 guibg=#1e3c56 gui=none
hi usrylw           guifg=#050406 guibg=#34485b gui=none
hi usrgrn           guifg=#050406 guibg=#1b4861 gui=none
hi usrgnt           guifg=#050406 guibg=#745554 gui=none
