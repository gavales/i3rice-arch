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
hi Normal           guifg=#fdf9f7 guibg=#19181a
hi Title            guifg=#fdf9f7 guibg=#19181a gui=bold
hi LineNr           guifg=#A697AB guibg=#19181a gui=none
hi CursorLineNr     guifg=#A697AB guibg=#2d2c2e gui=bold
hi SpecialKey       guifg=#2d2c2e guibg=#19181a
hi ModeMsg          guifg=#19181a guibg=#A697AB gui=bold
hi Cursor           guifg=#19181a guibg=#3874A6
hi ColorColumn                    guibg=#2d2c2e gui=none
hi CursorLine                     guibg=#2d2c2e gui=none
hi Visual           guifg=#fdf9f7 guibg=#5f5762
hi VisualNOS        guifg=#fdf9f7 guibg=#5f5762

hi Type             guifg=#fdf9f7 guibg=#19181a gui=bold
hi Identifier       guifg=#638CB1 guibg=#19181a gui=italic
hi Comment          guifg=#5f5762 guibg=#19181a gui=italic
hi Folded           guifg=#A697AB guibg=#19181a gui=italic
hi FoldColumn       guifg=#19181a guibg=#19181a gui=italic
hi Constant         guifg=#fdf9f7 guibg=#19181a gui=italic
hi Special          guifg=#fdf9f7 guibg=#19181a gui=bold
hi Statement        guifg=#fdf9f7 guibg=#19181a gui=bold
hi PreProc          guifg=#A697AB guibg=#19181a gui=bold
hi MatchParen       guifg=#638CB1 guibg=#19181a gui=bold
hi Search           guifg=#19181a guibg=#638CB1 gui=none
hi Error            guifg=#3874A6 guibg=#19181a gui=none
hi EndOfBuffer      guifg=#19181a guibg=#19181a gui=none

hi SpellBad         guifg=#3874A6 guibg=#19181a gui=undercurl,bold
hi SpellCap         guifg=#A697AB guibg=#19181a gui=undercurl,bold
hi SpellRare        guifg=#E4A6A3 guibg=#19181a gui=undercurl,bold
hi SpellLocal       guifg=#FCD2A7 guibg=#19181a gui=undercurl,bold

hi StatusLine       guifg=#19181a guibg=#A697AB
hi StatusLineNC     guifg=#19181a guibg=#A697AB
hi StatusLineTerm   guifg=#19181a guibg=#A697AB
hi StatusLineTermNC guifg=#19181a guibg=#A697AB
hi ToolbarLine      guifg=#19181a guibg=#A697AB
hi ToolbarButton    guifg=#19181a guibg=#A697AB

hi Pmenu            guifg=#A697AB guibg=#fdf9f7 gui=none
hi PmenuSel         guifg=#19181a guibg=#A697AB gui=none
hi PmenuSbar        guifg=#A697AB guibg=#19181a gui=none
hi PmenuThumb       guifg=#318CBD guibg=#318CBD gui=none
hi TabLine          guifg=#A697AB guibg=#19181a gui=none
hi TabLineSel       guifg=#19181a guibg=#A697AB gui=none
hi TabLineFill      guifg=#A697AB guibg=#19181a gui=none
hi TabLine          guifg=#A697AB guibg=#5f5762 gui=none
hi TabLineSel       guifg=#fdf9f7 guibg=#19181a gui=none
hi TabLineFill      guifg=#A697AB guibg=#5f5762 gui=none

hi usrStatus        guifg=#fdf9f7 guibg=#2d2c2e
hi usrgry           guifg=#5f5762 guibg=#2d2c2e gui=none
hi usrblu           guifg=#19181a guibg=#5f5762 gui=none
hi usrred           guifg=#19181a guibg=#284660 gui=none
hi usrylw           guifg=#19181a guibg=#3e5265 gui=none
hi usrgrn           guifg=#19181a guibg=#25526b gui=none
hi usrgnt           guifg=#19181a guibg=#7e5f5e gui=none
