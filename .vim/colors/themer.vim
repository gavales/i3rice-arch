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
hi Normal           guifg=#1F1F1F guibg=#DFBF9F
hi Title            guifg=#1F1F1F guibg=#DFBF9F gui=bold
hi LineNr           guifg=#d5715e guibg=#DFBF9F gui=none
hi CursorLineNr     guifg=#d5715e guibg=#cbab8b gui=bold
hi SpecialKey       guifg=#cbab8b guibg=#DFBF9F
hi ModeMsg          guifg=#DFBF9F guibg=#d5715e gui=bold
hi Cursor           guifg=#DFBF9F guibg=%%red%%
hi ColorColumn                    guibg=#cbab8b gui=none
hi CursorLine                     guibg=#cbab8b gui=none
hi Visual           guifg=#1F1F1F guibg=#da987e
hi VisualNOS        guifg=#1F1F1F guibg=#da987e

hi Type             guifg=#1F1F1F guibg=#DFBF9F gui=bold
hi Identifier       guifg=%%ylw%% guibg=#DFBF9F gui=italic
hi Comment          guifg=#da987e guibg=#DFBF9F gui=italic
hi Folded           guifg=#1F1F1F guibg=#DFBF9F gui=italic
hi Constant         guifg=#1F1F1F guibg=#DFBF9F gui=italic
hi Special          guifg=#1F1F1F guibg=#DFBF9F gui=bold
hi Statement        guifg=#1F1F1F guibg=#DFBF9F gui=bold
hi PreProc          guifg=#d5715e guibg=#DFBF9F gui=bold
hi MatchParen       guifg=%%ylw%% guibg=#DFBF9F gui=bold
hi Search           guifg=#DFBF9F guibg=%%ylw%% gui=none
hi Error            guifg=%%red%% guibg=#DFBF9F gui=none
hi EndOfBuffer      guifg=#DFBF9F guibg=#DFBF9F gui=none

hi SpellBad         guifg=%%red%% guibg=#DFBF9F gui=underline,bold
hi SpellCap         guifg=#d5715e guibg=#DFBF9F gui=underline,bold
hi SpellRare        guifg=%%gnt%% guibg=#DFBF9F gui=underline,bold
hi SpellLocal       guifg=%%cyn%% guibg=#DFBF9F gui=underline,bold

hi StatusLine       guifg=#DFBF9F guibg=#d5715e
hi StatusLineNC     guifg=#DFBF9F guibg=#d5715e
hi StatusLineTerm   guifg=#DFBF9F guibg=#d5715e
hi StatusLineTermNC guifg=#DFBF9F guibg=#d5715e
hi ToolbarLine      guifg=#DFBF9F guibg=#d5715e
hi ToolbarButton    guifg=#DFBF9F guibg=#d5715e

hi Pmenu            guifg=#d5715e guibg=#1F1F1F gui=none
hi PmenuSel         guifg=#DFBF9F guibg=#d5715e gui=none
hi PmenuSbar        guifg=#d5715e guibg=#DFBF9F gui=none
hi PmenuThumb       guifg=%%grn%% guibg=%%grn%% gui=none
hi TabLine          guifg=#d5715e guibg=#DFBF9F gui=none
hi TabLineSel       guifg=#DFBF9F guibg=#d5715e gui=none
hi TabLineFill      guifg=#d5715e guibg=#DFBF9F gui=none

hi usrred           guifg=#DFBF9F guibg=%%red%%
hi usrylw           guifg=#DFBF9F guibg=%%ylw%%
hi usrgrn           guifg=#DFBF9F guibg=%%grn%%
hi usrgry           guifg=#DFBF9F guibg=#a38363
hi usrblu           guifg=#DFBF9F guibg=#d5715e
hi usrgnt           guifg=#DFBF9F guibg=%%gnt%%

