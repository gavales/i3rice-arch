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
hi Normal           guifg=#493C2C guibg=#F7F3EE
hi Title            guifg=#493C2C guibg=#F7F3EE gui=bold
hi LineNr           guifg=#277eb8 guibg=#F7F3EE gui=none
hi CursorLineNr     guifg=#277eb8 guibg=#e3dfda gui=bold
hi SpecialKey       guifg=#e3dfda guibg=#F7F3EE
hi ModeMsg          guifg=#F7F3EE guibg=#277eb8 gui=bold
hi Cursor           guifg=#F7F3EE guibg=#b85227
hi ColorColumn                    guibg=#e3dfda gui=none
hi CursorLine                     guibg=#e3dfda gui=none
hi Visual           guifg=#493C2C guibg=#8fb8d3
hi VisualNOS        guifg=#493C2C guibg=#8fb8d3

hi Type             guifg=#493C2C guibg=#F7F3EE gui=bold
hi Identifier       guifg=#DDB700 guibg=#F7F3EE gui=italic
hi Comment          guifg=#8fb8d3 guibg=#F7F3EE gui=italic
hi Folded           guifg=#277eb8 guibg=#F7F3EE gui=italic
hi FoldColumn       guifg=#F7F3EE guibg=#F7F3EE gui=italic
hi Constant         guifg=#493C2C guibg=#F7F3EE gui=italic
hi Special          guifg=#493C2C guibg=#F7F3EE gui=bold
hi Statement        guifg=#493C2C guibg=#F7F3EE gui=bold
hi PreProc          guifg=#277eb8 guibg=#F7F3EE gui=bold
hi MatchParen       guifg=#DDB700 guibg=#F7F3EE gui=bold
hi Search           guifg=#F7F3EE guibg=#DDB700 gui=none
hi Error            guifg=#b85227 guibg=#F7F3EE gui=none
hi EndOfBuffer      guifg=#F7F3EE guibg=#F7F3EE gui=none

hi SpellBad         guifg=#b85227 guibg=#F7F3EE gui=undercurl,bold
hi SpellCap         guifg=#277eb8 guibg=#F7F3EE gui=undercurl,bold
hi SpellRare        guifg=#B043D1 guibg=#F7F3EE gui=undercurl,bold
hi SpellLocal       guifg=#3FDCEE guibg=#F7F3EE gui=undercurl,bold

hi StatusLine       guifg=#F7F3EE guibg=#277eb8
hi StatusLineNC     guifg=#F7F3EE guibg=#277eb8
hi StatusLineTerm   guifg=#F7F3EE guibg=#277eb8
hi StatusLineTermNC guifg=#F7F3EE guibg=#277eb8
hi ToolbarLine      guifg=#F7F3EE guibg=#277eb8
hi ToolbarButton    guifg=#F7F3EE guibg=#277eb8

hi Pmenu            guifg=#277eb8 guibg=#493C2C gui=none
hi PmenuSel         guifg=#F7F3EE guibg=#277eb8 gui=none
hi PmenuSbar        guifg=#277eb8 guibg=#F7F3EE gui=none
hi PmenuThumb       guifg=#18E3C8 guibg=#18E3C8 gui=none
hi TabLine          guifg=#277eb8 guibg=#F7F3EE gui=none
hi TabLineSel       guifg=#F7F3EE guibg=#277eb8 gui=none
hi TabLineFill      guifg=#277eb8 guibg=#F7F3EE gui=none
hi TabLine          guifg=#277eb8 guibg=#8fb8d3 gui=none
hi TabLineSel       guifg=#493C2C guibg=#F7F3EE gui=none
hi TabLineFill      guifg=#277eb8 guibg=#8fb8d3 gui=none

hi usrStatus        guifg=#493C2C guibg=#e3dfda
hi usrgry           guifg=#8fb8d3 guibg=#e3dfda gui=none
hi usrblu           guifg=#F7F3EE guibg=#8fb8d3 gui=none
hi usrred           guifg=#F7F3EE guibg=#aa7461 gui=none
hi usrylw           guifg=#F7F3EE guibg=#c2b747 gui=none
hi usrgrn           guifg=#F7F3EE guibg=#40d4cb gui=none
hi usrgnt           guifg=#F7F3EE guibg=#a46ad1 gui=none
hi USRgry           guifg=#e3dfda guibg=#8fb8d3 gui=bold
hi USRblu           guifg=#8fb8d3 guibg=#F7F3EE gui=bold
hi USRred           guifg=#aa7461 guibg=#F7F3EE gui=bold
hi USRylw           guifg=#c2b747 guibg=#F7F3EE gui=bold
hi USRgrn           guifg=#40d4cb guibg=#F7F3EE gui=bold
hi USRgnt           guifg=#a46ad1 guibg=#F7F3EE gui=bold
