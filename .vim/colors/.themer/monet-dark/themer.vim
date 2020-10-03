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
hi Normal           guifg=#fcfcfb guibg=#60473A
hi Title            guifg=#fcfcfb guibg=#60473A gui=bold
hi LineNr           guifg=#A3C99C guibg=#60473A gui=none
hi CursorLineNr     guifg=#A3C99C guibg=#745b4e gui=bold
hi SpecialKey       guifg=#745b4e guibg=#60473A
hi ModeMsg          guifg=#60473A guibg=#A3C99C gui=bold
hi Cursor           guifg=#60473A guibg=#BEB7C6
hi ColorColumn                    guibg=#745b4e gui=none
hi CursorLine                     guibg=#745b4e gui=none
hi Visual           guifg=#fcfcfb guibg=#81886b
hi VisualNOS        guifg=#fcfcfb guibg=#81886b

hi Type             guifg=#fcfcfb guibg=#60473A gui=bold
hi Identifier       guifg=#D0DFB4 guibg=#60473A gui=italic
hi Comment          guifg=#81886b guibg=#60473A gui=italic
hi Folded           guifg=#A3C99C guibg=#60473A gui=italic
hi FoldColumn       guifg=#60473A guibg=#60473A gui=italic
hi Constant         guifg=#fcfcfb guibg=#60473A gui=italic
hi Special          guifg=#fcfcfb guibg=#60473A gui=bold
hi Statement        guifg=#fcfcfb guibg=#60473A gui=bold
hi PreProc          guifg=#A3C99C guibg=#60473A gui=bold
hi MatchParen       guifg=#D0DFB4 guibg=#60473A gui=bold
hi Search           guifg=#60473A guibg=#D0DFB4 gui=none
hi Error            guifg=#BEB7C6 guibg=#60473A gui=none
hi EndOfBuffer      guifg=#60473A guibg=#60473A gui=none

hi SpellBad         guifg=#BEB7C6 guibg=#60473A gui=undercurl,bold
hi SpellCap         guifg=#A3C99C guibg=#60473A gui=undercurl,bold
hi SpellRare        guifg=#9FCCD3 guibg=#60473A gui=undercurl,bold
hi SpellLocal       guifg=#D8DCD2 guibg=#60473A gui=undercurl,bold

hi StatusLine       guifg=#60473A guibg=#A3C99C
hi StatusLineNC     guifg=#60473A guibg=#A3C99C
hi StatusLineTerm   guifg=#60473A guibg=#A3C99C
hi StatusLineTermNC guifg=#60473A guibg=#A3C99C
hi ToolbarLine      guifg=#60473A guibg=#A3C99C
hi ToolbarButton    guifg=#60473A guibg=#A3C99C

hi Pmenu            guifg=#A3C99C guibg=#fcfcfb gui=none
hi PmenuSel         guifg=#60473A guibg=#A3C99C gui=none
hi PmenuSbar        guifg=#A3C99C guibg=#60473A gui=none
hi PmenuThumb       guifg=#CCDCB9 guibg=#CCDCB9 gui=none
hi TabLine          guifg=#A3C99C guibg=#60473A gui=none
hi TabLineSel       guifg=#60473A guibg=#A3C99C gui=none
hi TabLineFill      guifg=#A3C99C guibg=#60473A gui=none
hi TabLine          guifg=#A3C99C guibg=#81886b gui=none
hi TabLineSel       guifg=#fcfcfb guibg=#60473A gui=none
hi TabLineFill      guifg=#A3C99C guibg=#81886b gui=none

hi usrStatus        guifg=#fcfcfb guibg=#745b4e
hi usrgry           guifg=#81886b guibg=#745b4e gui=none
hi usrblu           guifg=#60473A guibg=#81886b gui=none
hi usrred           guifg=#60473A guibg=%%lightred%% gui=none
hi usrylw           guifg=#60473A guibg=%%lightylw%% gui=none
hi usrgrn           guifg=#60473A guibg=%%lightgrn%% gui=none
hi usrgnt           guifg=#60473A guibg=%%lightgnt%% gui=none
hi USRgry           guifg=#745b4e guibg=#81886b gui=bold
hi USRblu           guifg=#81886b guibg=#60473A gui=bold
hi USRred           guifg=%%lightred%% guibg=#60473A gui=bold
hi USRylw           guifg=%%lightylw%% guibg=#60473A gui=bold
hi USRgrn           guifg=%%lightgrn%% guibg=#60473A gui=bold
hi USRgnt           guifg=%%lightgnt%% guibg=#60473A gui=bold
