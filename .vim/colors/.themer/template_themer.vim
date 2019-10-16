" Vim color file
" Converted from Textmate theme Brogrammer using Coloration v0.4.0 (http://github.com/sickill/coloration)

set background=dark
highlight clear

if exists("syntax_on")
  syntax reset
endif

let g:colors_name = "themer"

" >> CTERM
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
hi TabLine          ctermfg=blue     ctermbg=Gray     cterm=none
hi TabLineSel       ctermfg=white    ctermbg=black    cterm=none
hi TabLineFill      ctermfg=blue     ctermbg=Gray     cterm=none

hi usrred           ctermfg=white    ctermbg=red
hi usrylw           ctermfg=black    ctermbg=yellow
hi usrgrn           ctermfg=black    ctermbg=green
hi usrgry           ctermfg=black    ctermbg=grey
hi usrblu           ctermfg=black    ctermbg=blue
hi usrgnt           ctermfg=black    ctermbg=magenta

" >> GUI
hi Normal           guifg=%%fg0%% guibg=%%bg0%%
hi Title            guifg=%%fg0%% guibg=%%bg0%% gui=bold
hi LineNr           guifg=%%acc%% guibg=%%bg0%% gui=none
hi CursorLineNr     guifg=%%acc%% guibg=%%bg1%% gui=bold
hi SpecialKey       guifg=%%bg1%% guibg=%%bg0%%
hi ModeMsg          guifg=%%bg0%% guibg=%%acc%% gui=bold
hi Cursor           guifg=%%bg0%% guibg=%%red%%
hi ColorColumn                    guibg=%%bg1%% gui=none
hi CursorLine                     guibg=%%bg1%% gui=none
hi Visual           guifg=%%fg0%% guibg=%%acb%%
hi VisualNOS        guifg=%%fg0%% guibg=%%acb%%

hi Type             guifg=%%fg0%% guibg=%%bg0%% gui=bold
hi Identifier       guifg=%%ylw%% guibg=%%bg0%% gui=italic
hi Comment          guifg=%%acb%% guibg=%%bg0%% gui=italic
hi Folded           guifg=%%acc%% guibg=%%bg0%% gui=italic
hi Constant         guifg=%%fg0%% guibg=%%bg0%% gui=italic
hi Special          guifg=%%fg0%% guibg=%%bg0%% gui=bold
hi Statement        guifg=%%fg0%% guibg=%%bg0%% gui=bold
hi PreProc          guifg=%%acc%% guibg=%%bg0%% gui=bold
hi MatchParen       guifg=%%ylw%% guibg=%%bg0%% gui=bold
hi Search           guifg=%%bg0%% guibg=%%ylw%% gui=none
hi Error            guifg=%%red%% guibg=%%bg0%% gui=none
hi EndOfBuffer      guifg=%%bg0%% guibg=%%bg0%% gui=none

hi SpellBad         guifg=%%red%% guibg=%%bg0%% gui=underline,bold
hi SpellCap         guifg=%%acc%% guibg=%%bg0%% gui=underline,bold
hi SpellRare        guifg=%%gnt%% guibg=%%bg0%% gui=underline,bold
hi SpellLocal       guifg=%%cyn%% guibg=%%bg0%% gui=underline,bold

hi StatusLine       guifg=%%bg0%% guibg=%%acc%%
hi StatusLineNC     guifg=%%bg0%% guibg=%%acc%%
hi StatusLineTerm   guifg=%%bg0%% guibg=%%acc%%
hi StatusLineTermNC guifg=%%bg0%% guibg=%%acc%%
hi ToolbarLine      guifg=%%bg0%% guibg=%%acc%%
hi ToolbarButton    guifg=%%bg0%% guibg=%%acc%%

hi Pmenu            guifg=%%acc%% guibg=%%fg0%% gui=none
hi PmenuSel         guifg=%%bg0%% guibg=%%acc%% gui=none
hi PmenuSbar        guifg=%%acc%% guibg=%%bg0%% gui=none
hi PmenuThumb       guifg=%%grn%% guibg=%%grn%% gui=none
hi TabLine          guifg=%%acc%% guibg=%%bg0%% gui=none
hi TabLineSel       guifg=%%bg0%% guibg=%%acc%% gui=none
hi TabLineFill      guifg=%%acc%% guibg=%%bg0%% gui=none
hi TabLine          guifg=%%acc%% guibg=%%acb%% gui=none
hi TabLineSel       guifg=%%fg0%% guibg=%%bg0%% gui=none
hi TabLineFill      guifg=%%acc%% guibg=%%acb%% gui=none

hi usrred           guifg=%%bg0%% guibg=%%red%%
hi usrylw           guifg=%%bg0%% guibg=%%ylw%%
hi usrgrn           guifg=%%bg0%% guibg=%%grn%%
hi usrgry           guifg=%%bg0%% guibg=%%bg3%%
hi usrblu           guifg=%%bg0%% guibg=%%acc%%
hi usrgnt           guifg=%%bg0%% guibg=%%gnt%%

