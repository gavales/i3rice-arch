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

hi usrred           ctermfg=black    ctermbg=red
hi usrylw           ctermfg=black    ctermbg=yellow
hi usrgrn           ctermfg=black    ctermbg=green
hi usrgry           ctermfg=black    ctermbg=grey
hi usrblu           ctermfg=black    ctermbg=blue
hi usrgnt           ctermfg=black    ctermbg=magenta

" >>>> GUI
hi Normal           guifg=%%fg0%% guibg=%%bg0%%
hi Title            guifg=%%fg0%% guibg=%%bg0%% gui=bold
hi LineNr           guifg=%%blu%% guibg=%%bg0%% gui=none
hi CursorLineNr     guifg=%%blu%% guibg=%%bg1%% gui=bold
hi SpecialKey       guifg=%%bg1%% guibg=%%bg0%%
hi ModeMsg          guifg=%%bg0%% guibg=%%blu%% gui=bold
hi Cursor           guifg=%%bg0%% guibg=%%red%%
hi ColorColumn                    guibg=%%bg1%% gui=none
hi CursorLine                     guibg=%%bg1%% gui=none
hi Visual           guifg=%%fg0%% guibg=%%acb%%
hi VisualNOS        guifg=%%fg0%% guibg=%%acb%%

hi Type             guifg=%%fg0%% guibg=%%bg0%% gui=bold
hi Identifier       guifg=%%ylw%% guibg=%%bg0%% gui=italic
hi Comment          guifg=%%acb%% guibg=%%bg0%% gui=italic
hi Folded           guifg=%%fg0%% guibg=%%bg0%% gui=italic
hi Constant         guifg=%%fg0%% guibg=%%bg0%% gui=italic
hi Special          guifg=%%fg0%% guibg=%%bg0%% gui=bold
hi Statement        guifg=%%fg0%% guibg=%%bg0%% gui=bold
hi PreProc          guifg=%%blu%% guibg=%%bg0%% gui=bold
hi MatchParen       guifg=%%ylw%% guibg=%%bg0%% gui=bold
hi Search           guifg=%%bg0%% guibg=%%ylw%% gui=none
hi Error            guifg=%%red%% guibg=%%bg0%% gui=none
hi EndOfBuffer      guifg=%%bg0%% guibg=%%bg0%% gui=none

hi SpellBad         guifg=%%red%% guibg=%%bg0%% gui=underline,bold
hi SpellCap         guifg=%%blu%% guibg=%%bg0%% gui=underline,bold
hi SpellRare        guifg=%%gnt%% guibg=%%bg0%% gui=underline,bold
hi SpellLocal       guifg=%%cyn%% guibg=%%bg0%% gui=underline,bold

hi StatusLine       guifg=%%bg0%% guibg=%%blu%%
hi StatusLineNC     guifg=%%bg0%% guibg=%%blu%%
hi StatusLineTerm   guifg=%%bg0%% guibg=%%blu%%
hi StatusLineTermNC guifg=%%bg0%% guibg=%%blu%%
hi ToolbarLine      guifg=%%bg0%% guibg=%%blu%%
hi ToolbarButton    guifg=%%bg0%% guibg=%%blu%%

hi Pmenu            guifg=%%blu%% guibg=%%fg0%% gui=none
hi PmenuSel         guifg=%%bg0%% guibg=%%blu%% gui=none
hi PmenuSbar        guifg=%%blu%% guibg=%%bg0%% gui=none
hi PmenuThumb       guifg=%%grn%% guibg=%%grn%% gui=none
hi TabLine          guifg=%%blu%% guibg=%%bg0%% gui=none
hi TabLineSel       guifg=%%bg0%% guibg=%%blu%% gui=none
hi TabLineFill      guifg=%%blu%% guibg=%%bg0%% gui=none

hi usrred           guifg=%%bg0%% guibg=%%red%%
hi usrylw           guifg=%%bg0%% guibg=%%ylw%%
hi usrgrn           guifg=%%bg0%% guibg=%%grn%%
hi usrgry           guifg=%%bg0%% guibg=%%bg3%%
hi usrblu           guifg=%%bg0%% guibg=%%blu%%
hi usrgnt           guifg=%%bg0%% guibg=%%gnt%%

" >>>> brogrammer
"hi Cursor ctermfg=234 ctermbg=231 cterm=NONE
"hi Cursor guifg=#1a1a1a guibg=#ecf0f1 gui=NONE
"hi Visual ctermfg=NONE ctermbg=238 cterm=NONE
"hi Visual guifg=NONE guibg=#444444 gui=NONE
"hi CursorLine ctermfg=NONE ctermbg=236 cterm=NONE
"hi CursorLine guifg=NONE guibg=#2f2f2f gui=NONE
"hi CursorColumn ctermfg=NONE ctermbg=236 cterm=NONE
"hi CursorColumn guifg=NONE guibg=#2f2f2f gui=NONE
"hi ColorColumn ctermfg=NONE ctermbg=236 cterm=NONE
"hi ColorColumn guifg=NONE guibg=#2f2f2f gui=NONE
"hi LineNr ctermfg=244 ctermbg=236 cterm=NONE
"hi LineNr guifg=#838586 guibg=#2f2f2f gui=NONE
"hi VertSplit ctermfg=240 ctermbg=240 cterm=NONE
"hi VertSplit guifg=#575858 guibg=#575858 gui=NONE
"hi MatchParen ctermfg=167 ctermbg=NONE cterm=underline
"hi MatchParen guifg=#e74c3c guibg=NONE gui=underline
"hi StatusLine ctermfg=231 ctermbg=240 cterm=bold
"hi StatusLine guifg=#ecf0f1 guibg=#575858 gui=bold
"hi StatusLineNC ctermfg=231 ctermbg=240 cterm=NONE
"hi StatusLineNC guifg=#ecf0f1 guibg=#575858 gui=NONE
"hi Pmenu ctermfg=41 ctermbg=NONE cterm=NONE
"hi Pmenu guifg=#2ecc71 guibg=NONE gui=NONE
"hi PmenuSel ctermfg=NONE ctermbg=238 cterm=NONE
"hi PmenuSel guifg=NONE guibg=#444444 gui=NONE
"hi Search term=reverse cterm=bold ctermfg=15 ctermbg=196 gui=bold
"hi Search guifg=#f7f3ff guibg=#e14d42
"hi IncSearch term=reverse cterm=bold ctermfg=16 ctermbg=39 gui=bold
"hi IncSearch guifg=#000000 guibg=#6c71c4
"hi Directory ctermfg=62 ctermbg=NONE cterm=NONE
"hi Directory guifg=#6c71c4 guibg=NONE gui=NONE
"hi Folded ctermfg=241 ctermbg=234 cterm=NONE
"hi Folded guifg=#606060 guibg=#1a1a1a gui=NONE
"
"hi Normal ctermfg=231 ctermbg=234 cterm=NONE
"hi Normal guifg=#ecf0f1 guibg=#1a1a1a gui=NONE
"hi Boolean ctermfg=62 ctermbg=NONE cterm=NONE
"hi Boolean guifg=#6c71c4 guibg=NONE gui=NONE
"hi Character ctermfg=62 ctermbg=NONE cterm=NONE
"hi Character guifg=#6c71c4 guibg=NONE gui=NONE
"hi Comment ctermfg=241 ctermbg=NONE cterm=NONE
"hi Comment guifg=#606060 guibg=NONE gui=italic
"hi Conditional ctermfg=167 ctermbg=NONE cterm=bold
"hi Conditional guifg=#e74c3c guibg=NONE gui=bold
"hi Constant ctermfg=62 ctermbg=NONE cterm=NONE
"hi Constant guifg=#6c71c4 guibg=NONE gui=NONE
"hi Define ctermfg=167 ctermbg=NONE cterm=bold
"hi Define guifg=#e74c3c guibg=NONE gui=bold
"hi DiffAdd ctermfg=231 ctermbg=64 cterm=bold
"hi DiffAdd guifg=#ecf0f1 guibg=#44800a gui=bold
"hi DiffDelete ctermfg=88 ctermbg=NONE cterm=NONE
"hi DiffDelete guifg=#880505 guibg=NONE gui=NONE
"hi DiffChange ctermfg=231 ctermbg=23 cterm=NONE
"hi DiffChange guifg=#ecf0f1 guibg=#1d3251 gui=NONE
"hi DiffText ctermfg=231 ctermbg=40 cterm=bold
"hi DiffText guifg=#ecf0f1 guibg=#00df00 gui=bold
"hi ErrorMsg ctermfg=15 ctermbg=167 cterm=NONE
"hi ErrorMsg guifg=#ffffff guibg=#e74c3c gui=NONE
"hi WarningMsg ctermfg=15 ctermbg=167 cterm=NONE
"hi WarningMsg guifg=#ffffff guibg=#e74c3c gui=NONE
"hi Float ctermfg=62 ctermbg=NONE cterm=NONE
"hi Float guifg=#6c71c4 guibg=NONE gui=NONE
"hi Function ctermfg=41 ctermbg=NONE cterm=NONE
"hi Function guifg=#2ecc71 guibg=NONE gui=NONE
"hi Identifier ctermfg=68 ctermbg=NONE cterm=NONE
"hi Identifier guifg=#3498db guibg=NONE gui=NONE
"hi Keyword ctermfg=167 ctermbg=NONE cterm=bold
"hi Keyword guifg=#e74c3c guibg=NONE gui=bold
"hi Label ctermfg=220 ctermbg=NONE cterm=NONE
"hi Label guifg=#f1c40f guibg=NONE gui=NONE
"hi NonText ctermfg=22 ctermbg=234 cterm=NONE
"hi NonText guifg=#30312a guibg=#1a1a1a gui=NONE
"hi Number ctermfg=62 ctermbg=NONE cterm=NONE
"hi Number guifg=#6c71c4 guibg=NONE gui=NONE
"hi Operator ctermfg=167 ctermbg=NONE cterm=bold
"hi Operator guifg=#e74c3c guibg=NONE gui=bold
"hi PreProc ctermfg=167 ctermbg=NONE cterm=bold
"hi PreProc guifg=#e74c3c guibg=NONE gui=bold
"hi Special ctermfg=62 ctermbg=NONE cterm=NONE
"hi Special guifg=#6c71c4 guibg=NONE gui=NONE
"hi SpecialKey ctermfg=22 ctermbg=236 cterm=NONE
"hi SpecialKey guifg=#f1530f guibg=#1a1a1a gui=NONE
"hi Statement ctermfg=167 ctermbg=NONE cterm=bold
"hi Statement guifg=#e74c3c guibg=NONE gui=bold
"hi StorageClass ctermfg=68 ctermbg=NONE cterm=NONE
"hi StorageClass guifg=#3498db guibg=NONE gui=NONE
"hi String ctermfg=220 ctermbg=NONE cterm=NONE
"hi String guifg=#f1c40f guibg=NONE gui=NONE
"hi Structure ctermfg=68 ctermbg=NONE cterm=bold
"hi Structure guifg=#3498db guibg=NONE gui=bold
"hi Tag ctermfg=41 ctermbg=NONE cterm=NONE
"hi Tag guifg=#2ecc71 guibg=NONE gui=NONE
"hi Title ctermfg=231 ctermbg=NONE cterm=bold
"hi Title guifg=#ecf0f1 guibg=NONE gui=bold
"hi Todo ctermfg=241 ctermbg=NONE cterm=inverse,bold
"hi Todo guifg=#606060 guibg=NONE gui=inverse,bold,italic
"hi Type ctermfg=41 ctermbg=NONE cterm=NONE
"hi Type guifg=#2ecc71 guibg=NONE gui=NONE
"hi Underlined ctermfg=NONE ctermbg=NONE cterm=underline
"hi Underlined guifg=NONE guibg=NONE gui=underline
"hi SpellBad term=reverse ctermfg=167 ctermbg=224 gui=undercurl guisp=Red
"hi rubyClass ctermfg=167 ctermbg=NONE cterm=bold
"hi rubyClass guifg=#e74c3c guibg=NONE gui=bold
"hi rubyFunction ctermfg=41 ctermbg=NONE cterm=NONE
"hi rubyFunction guifg=#2ecc71 guibg=NONE gui=NONE
"hi rubyInterpolationDelimiter ctermfg=NONE ctermbg=NONE cterm=NONE
"hi rubyInterpolationDelimiter guifg=NONE guibg=NONE gui=NONE
"hi rubySymbol ctermfg=62 ctermbg=NONE cterm=NONE
"hi rubySymbol guifg=#6c71c4 guibg=NONE gui=NONE
"hi rubyConstant ctermfg=68 ctermbg=NONE cterm=bold
"hi rubyConstant guifg=#3498db guibg=NONE gui=bold
"hi rubyStringDelimiter ctermfg=220 ctermbg=NONE cterm=NONE
"hi rubyStringDelimiter guifg=#f1c40f guibg=NONE gui=NONE
"hi rubyBlockParameter ctermfg=172 ctermbg=NONE cterm=NONE
"hi rubyBlockParameter guifg=#e67e22 guibg=NONE gui=NONE
"hi rubyInstanceVariable ctermfg=172 ctermbg=NONE cterm=NONE
"hi rubyInstanceVariable guifg=#e67e22 guibg=NONE gui=NONE
"hi rubyInclude ctermfg=167 ctermbg=NONE cterm=bold
"hi rubyInclude guifg=#e74c3c guibg=NONE gui=bold
"hi rubyGlobalVariable ctermfg=172 ctermbg=NONE cterm=NONE
"hi rubyGlobalVariable guifg=#e67e22 guibg=NONE gui=NONE
"hi rubyRegexp ctermfg=68 ctermbg=NONE cterm=NONE
"hi rubyRegexp guifg=#3498db guibg=NONE gui=NONE
"hi rubyRegexpDelimiter ctermfg=68 ctermbg=NONE cterm=NONE
"hi rubyRegexpDelimiter guifg=#3498db guibg=NONE gui=NONE
"hi rubyEscape ctermfg=62 ctermbg=NONE cterm=NONE
"hi rubyEscape guifg=#6c71c4 guibg=NONE gui=NONE
"hi rubyControl ctermfg=167 ctermbg=NONE cterm=bold
"hi rubyControl guifg=#e74c3c guibg=NONE gui=bold
"hi rubyClassVariable ctermfg=172 ctermbg=NONE cterm=NONE
"hi rubyClassVariable guifg=#e67e22 guibg=NONE gui=NONE
"hi rubyOperator ctermfg=167 ctermbg=NONE cterm=bold
"hi rubyOperator guifg=#e74c3c guibg=NONE gui=bold
"hi rubyException ctermfg=167 ctermbg=NONE cterm=bold
"hi rubyException guifg=#e74c3c guibg=NONE gui=bold
"hi rubyPseudoVariable ctermfg=172 ctermbg=NONE cterm=NONE
"hi rubyPseudoVariable guifg=#e67e22 guibg=NONE gui=NONE
"hi rubyRailsUserClass ctermfg=68 ctermbg=NONE cterm=bold
"hi rubyRailsUserClass guifg=#3498db guibg=NONE gui=bold
"hi rubyRailsARAssociationMethod ctermfg=68 ctermbg=NONE cterm=NONE
"hi rubyRailsARAssociationMethod guifg=#3498db guibg=NONE gui=NONE
"hi rubyRailsARMethod ctermfg=68 ctermbg=NONE cterm=NONE
"hi rubyRailsARMethod guifg=#3498db guibg=NONE gui=NONE
"hi rubyRailsRenderMethod ctermfg=68 ctermbg=NONE cterm=NONE
"hi rubyRailsRenderMethod guifg=#3498db guibg=NONE gui=NONE
"hi rubyRailsMethod ctermfg=68 ctermbg=NONE cterm=NONE
"hi rubyRailsMethod guifg=#3498db guibg=NONE gui=NONE
"hi erubyDelimiter ctermfg=NONE ctermbg=NONE cterm=NONE
"hi erubyDelimiter guifg=NONE guibg=NONE gui=NONE
"hi erubyComment ctermfg=241 ctermbg=NONE cterm=NONE
"hi erubyComment guifg=#606060 guibg=NONE gui=italic
"hi erubyRailsMethod ctermfg=68 ctermbg=NONE cterm=NONE
"hi erubyRailsMethod guifg=#3498db guibg=NONE gui=NONE
"hi htmlTag ctermfg=167 ctermbg=NONE cterm=NONE
"hi htmlTag guifg=#e74c3c guibg=NONE gui=NONE
"hi htmlEndTag ctermfg=167 ctermbg=NONE cterm=NONE
"hi htmlEndTag guifg=#e74c3c guibg=NONE gui=NONE
"hi htmlTagName ctermfg=167 ctermbg=NONE cterm=NONE
"hi htmlTagName guifg=#e74c3c guibg=NONE gui=NONE
"hi htmlArg ctermfg=167 ctermbg=NONE cterm=NONE
"hi htmlArg guifg=#e74c3c guibg=NONE gui=NONE
"hi htmlSpecialChar ctermfg=68 ctermbg=NONE cterm=NONE
"hi htmlSpecialChar guifg=#3498db guibg=NONE gui=NONE
"hi javaScriptFunction ctermfg=68 ctermbg=NONE cterm=NONE
"hi javaScriptFunction guifg=#3498db guibg=NONE gui=NONE
"hi javaScriptRailsFunction ctermfg=68 ctermbg=NONE cterm=NONE
"hi javaScriptRailsFunction guifg=#3498db guibg=NONE gui=NONE
"hi javaScriptBraces ctermfg=NONE ctermbg=NONE cterm=NONE
"hi javaScriptBraces guifg=NONE guibg=NONE gui=NONE
"hi yamlKey ctermfg=41 ctermbg=NONE cterm=NONE
"hi yamlKey guifg=#2ecc71 guibg=NONE gui=NONE
"hi yamlAnchor ctermfg=172 ctermbg=NONE cterm=NONE
"hi yamlAnchor guifg=#e67e22 guibg=NONE gui=NONE
"hi yamlAlias ctermfg=172 ctermbg=NONE cterm=NONE
"hi yamlAlias guifg=#e67e22 guibg=NONE gui=NONE
"hi yamlDocumentHeader ctermfg=220 ctermbg=NONE cterm=NONE
"hi yamlDocumentHeader guifg=#f1c40f guibg=NONE gui=NONE
"hi cssURL ctermfg=172 ctermbg=NONE cterm=NONE
"hi cssURL guifg=#e67e22 guibg=NONE gui=NONE
"hi cssFunctionName ctermfg=68 ctermbg=NONE cterm=NONE
"hi cssFunctionName guifg=#3498db guibg=NONE gui=NONE
"hi cssColor ctermfg=62 ctermbg=NONE cterm=NONE
"hi cssColor guifg=#6c71c4 guibg=NONE gui=NONE
"hi cssPseudoClassId ctermfg=41 ctermbg=NONE cterm=NONE
"hi cssPseudoClassId guifg=#2ecc71 guibg=NONE gui=NONE
"hi cssClassName ctermfg=41 ctermbg=NONE cterm=NONE
"hi cssClassName guifg=#2ecc71 guibg=NONE gui=NONE
"hi cssValueLength ctermfg=62 ctermbg=NONE cterm=NONE
"hi cssValueLength guifg=#6c71c4 guibg=NONE gui=NONE
"hi cssCommonAttr ctermfg=41 ctermbg=NONE cterm=NONE
"hi cssCommonAttr guifg=#2ecc71 guibg=NONE gui=NONE
"hi cssBraces ctermfg=NONE ctermbg=NONE cterm=NONE
"hi cssBraces guifg=NONE guibg=NONE gui=NONE
"
"" GitGutter Customizations
"hi SignColumn             ctermfg=244   ctermbg=236
"hi SignColumn             guifg=#838586 guibg=#2f2f2f
"hi GitGutterChangeDefault ctermfg=244   ctermbg=236
"hi GitGutterChangeDefault guifg=#bbbb00 guibg=#2f2f2f
"hi GitGutterAddDefault    ctermfg=2     ctermbg=236
"hi GitGutterAddDefault    guifg=#009900 guibg=#2f2f2f
"hi GitGutterDeleteDefault ctermfg=1     ctermbg=236
"hi GitGutterDeleteDefault guifg=#ff2222 guibg=#2f2f2f
