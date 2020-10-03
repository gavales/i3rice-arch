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
hi Normal           guifg=#60473A guibg=#fcfcfb
hi Title            guifg=#60473A guibg=#fcfcfb gui=bold
hi LineNr           guifg=#A3C99C guibg=#fcfcfb gui=none
hi CursorLineNr     guifg=#A3C99C guibg=#e8e8e7 gui=bold
hi SpecialKey       guifg=#e8e8e7 guibg=#fcfcfb
hi ModeMsg          guifg=#fcfcfb guibg=#A3C99C gui=bold
hi Cursor           guifg=#fcfcfb guibg=#BEB7C6
hi ColorColumn                    guibg=#e8e8e7 gui=none
hi CursorLine                     guibg=#e8e8e7 gui=none
hi Visual           guifg=#60473A guibg=#cfe2cb
hi VisualNOS        guifg=#60473A guibg=#cfe2cb

hi Type             guifg=#60473A guibg=#fcfcfb gui=bold
hi Identifier       guifg=#D0DFB4 guibg=#fcfcfb gui=italic
hi Comment          guifg=#cfe2cb guibg=#fcfcfb gui=italic
hi Folded           guifg=#A3C99C guibg=#fcfcfb gui=italic
hi FoldColumn       guifg=#fcfcfb guibg=#fcfcfb gui=italic
hi Constant         guifg=#60473A guibg=#fcfcfb gui=italic
hi Special          guifg=#60473A guibg=#fcfcfb gui=bold
hi Statement        guifg=#60473A guibg=#fcfcfb gui=bold
hi PreProc          guifg=#A3C99C guibg=#fcfcfb gui=bold
hi MatchParen       guifg=#D0DFB4 guibg=#fcfcfb gui=bold
hi Search           guifg=#fcfcfb guibg=#D0DFB4 gui=none
hi Error            guifg=#BEB7C6 guibg=#fcfcfb gui=none
hi EndOfBuffer      guifg=#fcfcfb guibg=#fcfcfb gui=none

hi SpellBad         guifg=#BEB7C6 guibg=#fcfcfb gui=undercurl,bold
hi SpellCap         guifg=#A3C99C guibg=#fcfcfb gui=undercurl,bold
hi SpellRare        guifg=#9FCCD3 guibg=#fcfcfb gui=undercurl,bold
hi SpellLocal       guifg=#D8DCD2 guibg=#fcfcfb gui=undercurl,bold

hi StatusLine       guifg=#fcfcfb guibg=#A3C99C
hi StatusLineNC     guifg=#fcfcfb guibg=#A3C99C
hi StatusLineTerm   guifg=#fcfcfb guibg=#A3C99C
hi StatusLineTermNC guifg=#fcfcfb guibg=#A3C99C
hi ToolbarLine      guifg=#fcfcfb guibg=#A3C99C
hi ToolbarButton    guifg=#fcfcfb guibg=#A3C99C

hi Pmenu            guifg=#A3C99C guibg=#60473A gui=none
hi PmenuSel         guifg=#fcfcfb guibg=#A3C99C gui=none
hi PmenuSbar        guifg=#A3C99C guibg=#fcfcfb gui=none
hi PmenuThumb       guifg=#CCDCB9 guibg=#CCDCB9 gui=none
hi TabLine          guifg=#A3C99C guibg=#fcfcfb gui=none
hi TabLineSel       guifg=#fcfcfb guibg=#A3C99C gui=none
hi TabLineFill      guifg=#A3C99C guibg=#fcfcfb gui=none
hi TabLine          guifg=#A3C99C guibg=#cfe2cb gui=none
hi TabLineSel       guifg=#60473A guibg=#fcfcfb gui=none
hi TabLineFill      guifg=#A3C99C guibg=#cfe2cb gui=none

hi usrStatus        guifg=#60473A guibg=#e8e8e7
hi usrgry           guifg=#cfe2cb guibg=#e8e8e7 gui=none
hi usrblu           guifg=#fcfcfb guibg=#cfe2cb gui=none
hi usrred           guifg=#fcfcfb guibg=#c3c5c7 gui=none
hi usrylw           guifg=#fcfcfb guibg=#cfe0bb gui=none
hi usrgrn           guifg=#fcfcfb guibg=#cddebf gui=none
hi usrgnt           guifg=#fcfcfb guibg=#afd3d0 gui=none
hi USRgry           guifg=#e8e8e7 guibg=#cfe2cb gui=bold
hi USRblu           guifg=#cfe2cb guibg=#fcfcfb gui=bold
hi USRred           guifg=#c3c5c7 guibg=#fcfcfb gui=bold
hi USRylw           guifg=#cfe0bb guibg=#fcfcfb gui=bold
hi USRgrn           guifg=#cddebf guibg=#fcfcfb gui=bold
hi USRgnt           guifg=#afd3d0 guibg=#fcfcfb gui=bold
