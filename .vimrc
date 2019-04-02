"  dBP dP  dBP dBBBBBBb dBBBBBb  dBBBP
"         '   dB'   dBP
" dB .BP dBP dB'dB'dB'  dBBBBK'  dBP
" BB.BP dBP dB'dB'dB'  dBP  BB  dBP
" BBBP dBP dB'dB'dB'  dBP  dB' dBBBBP

" >>>> SETTINGS
" //// GENERAL

filetype plugin on
execute pathogen#infect()
syntax enable
set encoding=utf-8
colorscheme koehler
set number
set relativenumber
set hls
set is
set wrap
set linebreak
set textwidth=0
set wrapmargin=0
set title titlestring=%f titlelen=70
set mouse=a
vnoremap <C-c> "+y
map <C-p> "+P
set smartindent
set tabstop=4
set shiftwidth=4
set cursorline
set colorcolumn=81
set list
set listchars=tab:│\ 
autocmd CursorHold,CursorHoldI * update
autocmd CursorHold,CursorHoldI * redraw!

map <Tab><Tab> <Esc>/>>>><Enter>
inoremap \ph <++>

vnoremap <S-j> :m '>+1<CR>gv=gv
vnoremap <S-k> :m '<-2<CR>gv=gv

"autocmd FileType python,css,html,vim,json,perl,sh set tabstop=4
"autocmd FileType python,css,html,vim,json,perl,sh set shiftwidth=4
"autocmd FileType python,css,html,vim,json,perl,sh set colorcolumn=80
"autocmd FileType python,css,html,vim,json,perl,sh set list
"autocmd FileType python,css,html,vim,json,perl,sh set listchars=tab:│\ 
"autocmd FileType python call matchadd('ColorColumn', '\%81v', 100)

" //// CURSOR
let &t_SI = "\<esc>[5 q"
let &t_SR = "\<esc>[5 q"
let &t_EI = "\<esc>[2 q"

" //// GUI-SPECIFIC
if has("gui_running")
	so ~/.guivimrc
endif

" //// CHANGE HIGHLIGHT COLOURS

map <F10> :echo "hi<" . synIDattr(synID(line("."),col("."),1),"name") . '> trans<'
\ . synIDattr(synID(line("."),col("."),0),"name") . "> lo<"
\ . synIDattr(synIDtrans(synID(line("."),col("."),1)),"name") . ">"<CR>

hi Normal			ctermfg=white ctermbg=none
hi Title			cterm=bold ctermfg=white ctermbg=none
hi StatusLineTerm	ctermfg=black ctermbg=green
hi StatusLineTermNC	ctermfg=white ctermbg=green
hi LineNr			cterm=none ctermfg=DarkGray ctermbg=none
hi SpecialKey		ctermfg=DarkGray ctermbg=none
hi ModeMsg			cterm=bold ctermfg=white
hi Cursor			ctermfg=black ctermbg=blue
hi ColorColumn		ctermfg=black ctermbg=blue
hi CursorLine		cterm=underline ctermbg=none
hi Visual			ctermfg=blue ctermbg=black
hi VisualNOS		ctermfg=blue ctermbg=black

hi Type				cterm=italic ctermfg=red ctermbg=black
hi Identifier		cterm=italic ctermfg=yellow ctermbg=black
hi Comment			cterm=italic ctermfg=DarkGray ctermbg=black
hi Folded			cterm=italic ctermfg=DarkGray ctermbg=black
hi Constant			cterm=italic ctermfg=white ctermbg=black
hi Special			cterm=none ctermfg=blue ctermbg=black
hi Statement		cterm=none ctermfg=magenta ctermbg=black
hi PreProc			cterm=none ctermfg=magenta ctermbg=black
hi MatchParen		cterm=italic,bold ctermfg=yellow ctermbg=black
hi Search			cterm=none ctermfg=black ctermbg=yellow

hi SpellBad			cterm=underline,bold ctermfg=red ctermbg=none
hi SpellCap			cterm=underline,bold ctermfg=blue ctermbg=none
hi SpellRare		cterm=underline,bold ctermfg=magenta ctermbg=none
hi SpellLocal		cterm=underline,bold ctermfg=cyan ctermbg=none

hi Pmenu			cterm=none ctermfg=blue ctermbg=white
hi PmenuSel			cterm=none ctermfg=black ctermbg=blue
hi PmenuSbar		cterm=none ctermfg=blue ctermbg=black
hi PmenuThumb		cterm=none ctermfg=green ctermbg=green
hi TabLine			cterm=none ctermfg=blue ctermbg=black
hi TabLineSel		cterm=none ctermfg=black ctermbg=blue
hi TabLineFill		cterm=none ctermfg=blue ctermbg=black

hi User1 ctermbg=red ctermfg=black
hi User2 ctermbg=yellow ctermfg=black
hi User3 ctermbg=green ctermfg=black
hi User4 ctermbg=grey ctermfg=black
hi User5 ctermbg=blue ctermfg=black
hi User6 ctermbg=magenta ctermfg=black

"hi EndOfBuffer    Normal
"hi NonText        Normal
"hi Directory      Normal
"hi ErrorMsg       Normal
"hi IncSearch      Normal
"hi MoreMsg        Normal
"hi CursorLineNr   Normal
"hi Question       Normal
"hi StatusLine     Normal
"hi StatusLineNC   Normal
"hi VertSplit      Normal
"hi WarningMsg     Normal
"hi WildMenu       Normal
"hi FoldColumn     Normal
"hi DiffAdd        Normal
"hi DiffChange     Normal
"hi DiffDelete     Normal
"hi DiffText       Normal
"hi SignColumn     Normal
"hi Conceal        Normal
"hi ToolbarLine    Normal
"hi ToolbarButton  Normal
"hi Underlined     Normal
"hi Ignore         Normal
"hi Error          Normal
"hi Todo           Normal

" //// LAYOUT

map <C-Up> :res<space>+5<Enter>
map <C-Down> :res<space>-5<Enter>
map <C-Left> :vertical<space>resize<space>-5<Enter>
map <C-Right> :vertical<space>resize<space>+5<Enter>

noremap <C-T> :tabnew<return>
noremap <C-W> :tabclose<return>
noremap <C-H> :tabprevious<return>
noremap <C-L> :tabNext<return>

set splitbelow
set splitright

" //// BRACKETS

inoremap () ()<++><Esc>F)i
inoremap [] []<++><Esc>F]i
inoremap {} {}<++><Esc>F}i

" //// CALENDAR

autocmd Filetype calendar set laststatus=0
autocmd Filetype calendar set nolist
let g:calendar_frame = 'default'
let g:calendar_google_calendar = 1
let g:calendar_google_task = 1
let g:calendar_modifiable = 1

" //// COMMENT/UNCOMMENT

vnoremap \# :'<,'>norm 0i#<Enter>
vnoremap \d# :'<,'>norm 0x<Enter>
vnoremap \% :'<,'>norm 0i%<Enter>
vnoremap \d% :'<,'>norm 0x<Enter>
vnoremap \! :'<,'>norm 0i!<Enter>
vnoremap \d! :'<,'>norm 0x<Enter>
vnoremap \" :'<,'>norm 0i"<Enter>
vnoremap \d" :'<,'>norm 0x<Enter>
vnoremap \/ :'<,'>norm 0i//<Enter>
vnoremap \d/ :'<,'>norm 0xx<Enter>

" >>>> GOYO

map \gy :Goyo<bar>
	\hi Normal ctermbg=none<bar>
	\hi StatusLineTerm ctermfg=black ctermbg=green<bar>
	\hi StatusLineTermNC ctermfg=white ctermbg=green<bar>
	\hi LineNr ctermfg=DarkGray ctermbg=none<bar>
	\hi SpecialKey ctermfg=DarkGray ctermbg=none<bar>
	\hi ModeMsg cterm=bold ctermfg=white<bar>
	\hi lCursor ctermfg=black ctermbg=blue<bar>
	\hi ColorColumn ctermfg=black ctermbg=blue<bar>
	\hi CursorLine cterm=underline ctermbg=none<bar>
	\hi Type cterm=italic ctermfg=red ctermbg=black<bar>
	\hi Identifier cterm=italic ctermfg=yellow ctermbg=black<bar>
	\hi Comment cterm=italic ctermfg=DarkGray ctermbg=black<bar>
	\hi Folded cterm=italic ctermfg=DarkGray ctermbg=black<bar>
	\hi Constant cterm=italic ctermfg=white ctermbg=black<bar>
	\hi Special cterm=none ctermfg=blue ctermbg=black<bar>
	\hi Statement cterm=none ctermfg=magenta ctermbg=black<bar>
	\hi PreProc cterm=none ctermfg=magenta ctermbg=black<bar>
	\hi MatchParen cterm=italic,bold ctermfg=yellow ctermbg=black<bar>
	\hi Search cterm=none ctermfg=black ctermbg=yellow<bar>
	\hi SpellBad cterm=underline,bold ctermfg=red ctermbg=none<bar>
	\hi SpellCap cterm=underline,bold ctermfg=blue ctermbg=none<bar>
	\hi SpellRare cterm=underline,bold ctermfg=magenta ctermbg=none<bar>
	\hi SpellLocal cterm=underline,bold ctermfg=cyan ctermbg=none<bar>
	\hi User1 ctermbg=red ctermfg=black guibg=red guifg=black<bar>
	\hi User2 ctermbg=yellow ctermfg=black guibg=yellow guifg=black<bar>
	\hi User3 ctermbg=green ctermfg=black guibg=green guifg=black<bar>
	\hi User4 ctermbg=grey ctermfg=black guibg=DarkGray guifg=black<bar>
	\hi User5 ctermbg=blue ctermfg=black guibg=blue guifg=black<bar>
	\hi User6 ctermbg=magenta ctermfg=black guibg=magenta guifg=black<bar>
	\<Enter><Enter>


" >>>> STATUSLINE
" //// FUNCTIONS

set laststatus=2

function! FileSize()
  let bytes = getfsize(expand('%:p'))
  if (bytes >= 1024)
	let kbytes = bytes / 1024
  endif
  if (exists('kbytes') && kbytes >= 1000)
	let mbytes = kbytes / 1000
  endif

  if bytes <= 0
	return '0'
  endif

  if (exists('mbytes'))
	return mbytes . 'MB '
  elseif (exists('kbytes'))
	return kbytes . 'KB '
  else
	return bytes . 'B '
  endif
endfunction

function! ReadOnly()
  if &readonly || !&modifiable
	return ''
  else
	return ''
endfunction

function! GitBranch()
  return system("git rev-parse --abbrev-ref HEAD 2>/dev/null | tr -d '\n'")
endfunction

function! StatuslineGit()
  let l:branchname = GitBranch()
  return strlen(l:branchname) > 0?'  '.l:branchname.' ':''
endfunction

let g:currentmode={
	\ 'n'	  : 'N ',
	\ 'no'	 : 'N·Operator Pending ',
	\ 'v'	  : 'V ',
	\ 'V'	  : 'V·Line ',
	\ '\<C-V>' : 'V·Block ',
	\ 's'	  : 'Select ',
	\ 'S'	  : 'S·Line ',
	\ '\<C-S>' : 'S·Block ',
	\ 'i'	  : 'I ',
	\ 'R'	  : 'R ',
	\ 'Rv'	 : 'V·Replace ',
	\ 'c'	  : 'Command ',
	\ 'cv'	 : 'Vim Ex ',
	\ 'ce'	 : 'Ex ',
	\ 'r'	  : 'Prompt ',
	\ 'rm'	 : 'More ',
	\ 'r?'	 : 'Confirm ',
	\ '!'	  : 'Shell ',
	\ 't'	  : 'Terminal '
	\}

function! ModeCurrent() abort
	let l:modecurrent = mode()
	" use get() -> fails safely, since ^V doesn't seem to register
	" 3rd arg is used when return of mode() == 0, which is case with ^V
	" thus, ^V fails -> returns 0 -> replaced with 'V Block'
	let l:modelist = toupper(get(g:currentmode, l:modecurrent, 'V·Block '))
	let l:current_status_mode = l:modelist
	return l:current_status_mode
endfunction

" //// ACTUAL

set statusline=
set statusline+=%#Normal#
set statusline+=\ 
set statusline+=%#User1#
set statusline+=\ %{ModeCurrent()}
set statusline+=%#User2#
set statusline+=\ %f
set statusline+=\ 
set statusline+=%#Normal#
set statusline+=\ %{ReadOnly()}\ %m\ %w\ 
set statusline+=%=
set statusline+=\ %{&fileencoding?&fileencoding:&encoding}
set statusline+=\[%{&fileformat}\]
set statusline+=\ 
set statusline+=%#User3#
set statusline+=\ %Y
set statusline+=\ 
set statusline+=%#User5#
set statusline+=\ %-3(%{FileSize()}%)
set statusline+=%#User6#
set statusline+=\ %p%%
set statusline+=\ L:
set statusline+=%l/
set statusline+=%L
set statusline+=\ C:
set statusline+=%c
set statusline+=\ 

" >>>> LATEX
" //// LATEX-SUITE
autocmd FileType tex set smartindent
	\ cinwords=\\begin

if has("win32")
	let g:Tex_DefaultTargetFormat = 'pdf'
	let g:Tex_CompileRule_pdf = 'xelatex -interaction=nonstopmode -shell-escape $*'
	"let g:Tex_ViewRule_pdf = 'C:\Program Files\MuPDF\mupdf.exe'
	let g:Tex_ViewRule_pdf = 'C:\Users\test\AppData\Local\Apps\Evince-2.32.0.145\bin\evince.exe'
	let g:Tex_MultipleCompileFormats='dvi,pdf,bibtex,pdf'
	let g:Tex_BibtexFlavor = 'biber'

	"let g:Tex_FormatDependency_pdf = 'dvi,ps,pdf'
	"let g:Tex_CompileRule_dvi = 'latex --interaction=nonstopmode $*'
	"let g:Tex_CompileRule_ps = 'dvips -Ppdf -o $*.ps $*.dvi'
	"let g:Tex_CompileRule_pdf = 'ps2pdf $*.ps'

	"filetype plugin on "invoke latex-suite when opening tex file
	set shellslash "for windows
	set grepprg=grep\ -nH\ $* "set grep to always generate filename
	let g:tex_flavor='latex' "invoke tex, not plaintex, for empty tex file
	set iskeyword+=: "press <C-n> to cycle through \label's
else
	let g:Tex_DefaultTargetFormat = 'pdf'
	let g:Tex_CompileRule_pdf = 'xelatex -interaction=nonstopmode -shell-escape $*'
	let g:Tex_ViewRule_pdf = '/usr/bin/zathura'
	let g:Tex_MultipleCompileFormats='pdf,dvi'
	let g:Tex_BibtexFlavor = 'biber'

	"let g:Tex_FormatDependency_pdf = 'dvi,ps,pdf'
	"let g:Tex_CompileRule_dvi = 'latex --interaction=nonstopmode $*'
	"let g:Tex_CompileRule_ps = 'dvips -Ppdf -o $*.ps $*.dvi'
	"let g:Tex_CompileRule_pdf = 'ps2pdf $*.ps'

	"filetype plugin on "invoke latex-suite when opening tex file
	set grepprg=grep\ -nH\ $* "set grep to always generate filename
	let g:tex_flavor='latex' "invoke tex, not plaintex, for empty tex file
	set iskeyword+=: "press <C-n> to cycle through \label's
endif

" //// COMPILING

" COMPLETE
autocmd Filetype tex map ;C :w<space>!bash<space>~/scripts/clatex<space><C-r>
	\%<Enter><Enter>

" PDFLATEX
autocmd Filetype tex map ;p :w<space>!pdflatex<space>-interaction=nonstopmode
	\<space>-shell-escape<space><C-r>%<Enter><Enter>

" XELATEX
autocmd Filetype tex map ;x :w<space>!xelatex<space>-interaction=nonstopmode
	\<space>-shell-escape<space><C-r>%<Enter><Enter>

" BIBER
autocmd Filetype tex map ;b :!biber<space><C-r>%<BS><BS><BS>bcf<Enter><Enter>

" MAKEINDEX
autocmd Filetype tex map ;n :!makeindex<space><C-r>%<BS><BS><BS>
	\nlo<space>-s<space>nomencl.ist<space>-o<space><C-r>%<BS><BS><BS>
	\nls<Enter><Enter>

" //// (LUKE SMITH'S) SNIPPETS

autocmd FileType tex inoremap $$ $$<++><Esc>F$i
autocmd FileType tex inoremap <Tab>( \left(\right)<++><Esc>T(i
autocmd FileType tex inoremap <Tab>{{ \left\{\right\}<++><Esc>T{i
autocmd FileType tex inoremap <Tab>[ \left[\right]<++><Esc>T[i
autocmd FileType tex inoremap <Tab>bar \left\right<++><Esc>F\i

autocmd FileType tex inoremap <Tab>bf \textbf{}<++><Esc>T{i
autocmd FileType tex inoremap <Tab>bg \begin{DELRN}<Enter><++><Enter>\end{DELRN}
	\<Enter><Enter><++><Esc>4k0fR:MultipleCursorsFind<Space>DELRN<Enter>c
autocmd FileType tex inoremap <Tab>bm \begin{multicols}{2}<Enter><Enter><Enter>
	\<Enter>\end{multicols}<Enter><Enter><++><Esc>4k0fR

autocmd FileType tex inoremap <Tab>ci \cite{}<++><Esc>T{i
autocmd FileType tex inoremap <Tab>ct \citet{}<++><Esc>T{i
autocmd FileType tex inoremap <Tab>cp \citep{}<++><Esc>T{i
autocmd FileType tex inoremap <Tab>ch \chapter{}<Enter><++><Esc>kf}i

autocmd FileType tex inoremap <Tab>en \begin{equation}<Enter><Enter>\end{equation}
	\<Enter><++><Esc>02ki
autocmd FileType tex inoremap <Tab>eq $$<Enter><Enter>$$<Enter><++><Esc>03ki

autocmd FileType tex inoremap <Tab>it \textit{}<++><Esc>T{i

autocmd FileType tex inoremap <Tab>lf \label{fig:}<Esc>T:i
autocmd FileType tex inoremap <Tab>lt \label{tab:}<Esc>T:i
autocmd FileType tex inoremap <Tab>le \label{eq:}<Esc>T:i
autocmd FileType tex inoremap <Tab>ls \label{sec:}<Esc>T:i

autocmd FileType tex inoremap <Tab>nc \newcommand{}[<++>]<++>{<++>}<Esc>2F}i

autocmd FileType tex inoremap <Tab>pc \parencite{}<++><Esc>T{i
autocmd FileType tex inoremap <Tab>pt \item<space>
autocmd FileType tex inoremap <Tab>pi \begin{figure}[H]<Enter>
	\\centering<Enter>
	\\includegraphics[width=]{<++>}<Enter>
	\\caption{<++><Enter>
	\\label{fig:<++>}}<Enter>
	\<BS>\end{figure}<Esc>03kf=a

autocmd FileType tex inoremap <Tab>rf \figref{fig:}<++><Esc>T:i
autocmd FileType tex inoremap <Tab>rt \tabref{tab:}<++><Esc>T:i
autocmd FileType tex inoremap <Tab>re \eqnref{eq:}<++><Esc>T:i
autocmd FileType tex inoremap <Tab>rs \secref{sec:}<++><Esc>T:i

autocmd FileType tex inoremap <Tab>st {\setstretch{}<Enter><++><Enter>
	\<Enter>}<Enter><Enter><++><Esc>5k0f{a
autocmd FileType tex inoremap <Tab>sc \textsc{}<++><Esc>T{i
autocmd FileType tex inoremap <Tab>s1 \section{}<Enter><++><Esc>kf}i
autocmd FileType tex inoremap <Tab>s2 \subsection{}<Enter><++><Esc>kf}i
autocmd FileType tex inoremap <Tab>s3 \subsubsection{}<Enter><++><Esc>kf}i

autocmd FileType tex inoremap <Tab>tt \texttt{}<++><Esc>T{i
autocmd FileType tex inoremap <Tab>tc \textcite{}<++><Esc>T{i
autocmd FileType tex inoremap <Tab>ta \begin{table}[H]<Enter>
	\\centering<Enter>
	\<Tab>\begin{tabular}{c}<Enter>
	\<Tab>\toprule<Enter>
	\\textbf{<++>} \\<Enter>
	\\midrule<Enter>
	\<++> \\<Enter>
	\\bottomrule<Enter>
	\<BS>\end{tabular}<Enter>
	\<BS>\caption{<++><Enter>
	\\label{tab:<++>}}<Enter>
	\<BS>\end{table}<Esc>09kfca

autocmd FileType tex inoremap <Tab>up \usepackage[]<++>{<++>}<Esc>T[i
autocmd FileType tex inoremap <Tab>ul \underline{}<++><Esc>T{i

autocmd FileType tex vnoremap <Tab>bf xi\textbf{<Esc>pa}<Esc>
autocmd FileType tex vnoremap <Tab>it xi\textit{<Esc>pa}<Esc>
autocmd FileType tex vnoremap <Tab>sc xi\textsc{<Esc>pa}<Esc>
autocmd FileType tex vnoremap <Tab>tt xi\texttt{<Esc>pa}<Esc>
autocmd FileType tex vnoremap <Tab>ul xi\underline{<Esc>pa}<Esc>
autocmd FileType tex vnoremap <Tab>st xi{\setstretch{1.0}<Enter><Esc>pa}<Esc>
autocmd FileType tex vnoremap <Tab>bm xi\begin{multicols}{2}<Enter><Esc>pa
	\<Enter>\end{multicols}<Esc>

" //// BIB SHORTCUTS

autocmd Filetype bib inoremap \a <Esc>A<Enter>@article{,<Enter>}<Esc>kf,i
autocmd Filetype bib inoremap \b <Esc>A<Enter>@book{,<Enter>}<Esc>kf,i
autocmd Filetype bib inoremap \i <Esc>A<Enter>@inproceedings{,<Enter>}<Esc>kf,i
autocmd Filetype bib inoremap \t <Esc>A<Enter>@phdthesis{,<Enter>}<Esc>kf,i
autocmd Filetype bib inoremap \o <Esc>A<Enter>@online{,<Enter>
	\<Tab>title<space>=<space>{<++>},<Enter>
	\<Tab>author<space>=<space>{<++>},<Enter>
	\<Tab>publisher<space>=<space>{<++>}<Enter>}<Enter><Enter><++><Esc>06kf,i

autocmd Filetype bib inoremap <Tab>tit <Esc>A<Enter>
	\<Tab>title<space>=<space>{},<Esc>hi
autocmd Filetype bib inoremap <Tab>aut <Esc>A<Enter>
	\<Tab>author<space>=<space>{},<Esc>hi
autocmd Filetype bib inoremap <Tab>yea <Esc>A<Enter>
	\<Tab>year<space>=<space>{},<Esc>hi
autocmd Filetype bib inoremap <Tab>pub <Esc>A<Enter>
	\<Tab>publisher<space>=<space>{},<Esc>hi
autocmd Filetype bib inoremap <Tab>jou <Esc>A<Enter>
	\<Tab>journal<space>=<space>{},<Esc>hi
autocmd Filetype bib inoremap <Tab>vol <Esc>A<Enter>
	\<Tab>volume<space>=<space>{},<Esc>hi
autocmd Filetype bib inoremap <Tab>pag <Esc>A<Enter>
	\<Tab>pages<space>=<space>{},<Esc>hi
autocmd Filetype bib inoremap <Tab>sch <Esc>A<Enter>
	\<Tab>school<space>=<space>{},<Esc>hi
autocmd Filetype bib inoremap <Tab>boo <Esc>A<Enter>
	\<Tab>booktitle<space>=<space>{},<Esc>hi
autocmd Filetype bib inoremap <Tab>num <Esc>A<Enter>
	\<Tab>number<space>=<space>{},<Esc>hi
autocmd Filetype bib inoremap <Tab>org <Esc>A<Enter>
	\<Tab>organization<space>=<space>{},<Esc>hi

" >>>> GROFF

au BufNewFile,BufRead *.groff,*.ms set filetype=groff
autocmd FileType groff nnoremap \c :!bash<space>~/scripts/cgroff<space><C-r>%<Enter><Enter>

" //// SNIPPETS

autocmd FileType groff inoremap ;b <Esc>o.B<space>""<space><++><Enter><++><Esc>0kf"a
autocmd FileType groff inoremap ;c <Esc>o.[<Enter><Enter>.]<Enter><++><Esc>02ki
autocmd FileType groff inoremap ;d <Esc>o.IP<space><space>2<Enter><++><Esc>0kt2i
autocmd FileType groff inoremap ;e0 <Esc>o.nr<space>step<space>0<space>1<Enter>
	\.IP<space>\n+[step]<Enter>
autocmd FileType groff inoremap ;ei <Esc>o.IP<space>\n+[step]<Enter>
autocmd FileType groff inoremap ;i <Esc>o.I<space>""<space><++><Enter><++><Esc>0kf"a
autocmd FileType groff inoremap ;l <Esc>o.IP<space>\[bu]<space>2<Enter>
autocmd FileType groff inoremap ;n <Esc>o.RS<Enter><Enter>.RE<Enter><++><Esc>02ki
autocmd FileType groff inoremap ;s0 <Esc>o.SH<Enter><Enter>.PP<Enter><++><Esc>02ki
autocmd FileType groff inoremap ;s1 <Esc>o.NH<Enter><Enter>.PP<Enter><++><Esc>02ki
autocmd FileType groff inoremap ;s2 <Esc>o.NH<space>2<Enter><Enter>.PP<Enter><++><Esc>02ki
autocmd FileType groff inoremap ;s3 <Esc>o.NH<space>3<Enter><Enter>.PP<Enter><++><Esc>02ki
autocmd FileType groff inoremap ;s4 <Esc>o.NH<space>4<Enter><Enter>.PP<Enter><++><Esc>02ki
autocmd FileType groff inoremap ;u <Esc>o.UL<space>""<space><++><Enter><++><Esc>0kf"a
autocmd FileType groff inoremap ;x <Esc>o.BX<space>""<space><++><Enter><++><Esc>0kf"a
autocmd FileType groff inoremap <Tab><Enter> <Esc>o.PP<Enter>

" >>>> MARKDOWN
" //// MACROS

autocmd FileType markdown inoremap 1h <Esc>A<Enter><Enter>#<space>
autocmd FileType markdown inoremap 2h <Esc>A<Enter><Enter>##<space>
autocmd FileType markdown inoremap 3h <Esc>A<Enter><Enter>###<space>
autocmd FileType markdown inoremap 4h <Esc>A<Enter><Enter>####<space>
autocmd FileType markdown inoremap 5h <Esc>A<Enter><Enter>#####<space>
autocmd FileType markdown inoremap 6h <Esc>A<Enter><Enter>######<space>
autocmd FileType markdown inoremap 7h <Esc>A<Enter><Enter>#######<space>

autocmd FileType markdown inoremap 1p <Esc>A<Enter>+<space>
autocmd FileType markdown inoremap 2p <Esc>A<Enter><Tab>+<space>
autocmd FileType markdown inoremap 3p <Esc>A<Enter><Tab><Tab>+<space>
autocmd FileType markdown inoremap 4p <Esc>A<Enter><Tab><Tab><Tab>+<space>
autocmd FileType markdown inoremap 5p <Esc>A<Enter><Tab><Tab><Tab><Tab>+<space>
autocmd FileType markdown inoremap 6p <Esc>A<Enter><Tab><Tab><Tab><Tab><Tab>+<space>
autocmd FileType markdown inoremap 7p <Esc>A<Enter><Tab><Tab><Tab><Tab><Tab><Tab>+<space>

autocmd FileType markdown inoremap 1n <Esc>A<Enter>1.<space>
autocmd FileType markdown inoremap 2n <Esc>A<Enter><Tab>#.<space>
autocmd FileType markdown inoremap 3n <Esc>A<Enter><Tab><Tab>(#)<space>
autocmd FileType markdown inoremap 4n <Esc>A<Enter><Tab><Tab><Tab>(1)<space>
autocmd FileType markdown inoremap 5n <Esc>A<Enter><Tab><Tab><Tab><Tab>#.<space>
autocmd FileType markdown inoremap 6n <Esc>A<Enter><Tab><Tab><Tab><Tab><Tab>(#)<space>
autocmd FileType markdown inoremap 7n <Esc>A<Enter><Tab><Tab><Tab><Tab><Tab><Tab>1.<space>

autocmd FileType markdown inoremap <Tab>b ****<++><Esc>5hi
autocmd FileType markdown inoremap <Tab>i __<++><Esc>4hi
autocmd FileType markdown inoremap <Tab>s ~~~~<++><Esc>5hi

autocmd FileType markdown inoremap <Tab>pic <Esc>A<Enter><Enter>![](<++>){#fig:<++>}<Esc>F]i
autocmd FileType markdown inoremap <Tab>eq $$$$<space>{#eq:<++>}<++><Esc>F$hi
autocmd FileType markdown inoremap <Tab>lin <Esc>A<Enter><Enter>[](<++>)<Esc>F]i
autocmd FileType markdown inoremap <Tab>cod <Esc>A<Enter><Enter>```<Enter><++><Enter>```<Esc>2kA
autocmd FileType markdown inoremap <Tab>ytb <Esc>A<Enter><Enter>[![](http://img.youtube.com/vi/<++>
	\/0.jpg)](http://www.youtube.com/watch?v=<++>)<Esc>F[a

autocmd FileType markdown inoremap <Tab>ci [@]<Esc>i
autocmd FileType markdown inoremap <Tab>lt {#tbl:}<Esc>i
autocmd FileType markdown inoremap <Tab>ls {#sec:}<Esc>i
autocmd FileType markdown inoremap <Tab>rf [@fig:]<Esc>i
autocmd FileType markdown inoremap <Tab>rs [@sec:]<Esc>i
autocmd FileType markdown inoremap <Tab>re [@eq:]<Esc>i
autocmd FileType markdown inoremap <Tab>rt [@tbl:]<Esc>i

autocmd FileType markdown vnoremap \b xa**<Esc>pa**<Esc>
autocmd FileType markdown vnoremap \i xa_<Esc>pa_<Esc>
autocmd FileType markdown vnoremap \s xa~~<Esc>pa~~<Esc>
autocmd FileType markdown vnoremap \p :'<,'>norm 0i-<space><Esc>
autocmd FileType markdown vnoremap \n :'<,'>norm 0i1.<space><Esc>

autocmd FileType markdown vnoremap \1p :'<,'>norm 0dt+<Enter>
autocmd FileType markdown vnoremap \2p :'<,'>norm 0dt+i<Tab><Esc>
autocmd FileType markdown vnoremap \3p :'<,'>norm 0dt+i<Tab><Tab><Esc>
autocmd FileType markdown vnoremap \4p :'<,'>norm 0dt+i<Tab><Tab><Tab><Esc>
autocmd FileType markdown vnoremap \5p :'<,'>norm 0dt+i<Tab><Tab><Tab><Tab><Esc>
autocmd FileType markdown vnoremap \6p :'<,'>norm 0dt+i<Tab><Tab><Tab><Tab><Tab><Esc>
autocmd FileType markdown vnoremap \7p :'<,'>norm 0dt+i<Tab><Tab><Tab><Tab><Tab><Tab><Esc>

autocmd FileType markdown vnoremap \1n :'<,'>norm 0dt1.<Enter>
autocmd FileType markdown vnoremap \2n :'<,'>norm 0dt1.i<Tab><Esc>
autocmd FileType markdown vnoremap \3n :'<,'>norm 0dt1.i<Tab><Tab><Esc>
autocmd FileType markdown vnoremap \4n :'<,'>norm 0dt1.i<Tab><Tab><Tab><Esc>
autocmd FileType markdown vnoremap \5n :'<,'>norm 0dt1.i<Tab><Tab><Tab><Tab><Esc>
autocmd FileType markdown vnoremap \6n :'<,'>norm 0dt1.i<Tab><Tab><Tab><Tab><Tab><Esc>
autocmd FileType markdown vnoremap \7n :'<,'>norm 0dt1.i<Tab><Tab><Tab><Tab><Tab><Tab><Esc>

" //// COMPILER

autocmd Filetype markdown map \c :!bash<space>~/scripts/cmkd<space><C-r>%<Enter><Enter>

" >>>> R MARKDOWN

autocmd Filetype rmd map \c :!echo<space>"require(rmarkdown);<space>
	\render('<c-r>%')"<space>\|<space>R<space>--vanilla<Enter><Enter>

autocmd FileType rmd inoremap 1n A<Enter>1.<space>
autocmd FileType rmd inoremap 2n A<Enter><Tab>#.<space>
autocmd FileType rmd inoremap 3n A<Enter><Tab><Tab>(#)<space>
autocmd FileType rmd inoremap 4n A<Enter><Tab><Tab><Tab>(1)<space>
autocmd FileType rmd inoremap 5n A<Enter><Tab><Tab><Tab><Tab>#.<space>
autocmd FileType rmd inoremap 6n A<Enter><Tab><Tab><Tab><Tab><Tab>(#)<space>
autocmd FileType rmd inoremap 7n A<Enter><Tab><Tab><Tab><Tab><Tab><Tab>1.<space>

autocmd FileType rmd inoremap 1h <Esc>A<Enter><Enter>#<space>
autocmd FileType rmd inoremap 2h <Esc>A<Enter><Enter>##<space>
autocmd FileType rmd inoremap 3h <Esc>A<Enter><Enter>###<space>
autocmd FileType rmd inoremap 4h <Esc>A<Enter><Enter>####<space>
autocmd FileType rmd inoremap 5h <Esc>A<Enter><Enter>#####<space>
autocmd FileType rmd inoremap 6h <Esc>A<Enter><Enter>######<space>
autocmd FileType rmd inoremap 7h <Esc>A<Enter><Enter>#######<space>

autocmd FileType rmd inoremap 1p <Esc>A<Enter>+<space>
autocmd FileType rmd inoremap 2p <Esc>A<Enter><Tab>+<space>
autocmd FileType rmd inoremap 3p <Esc>A<Enter><Tab><Tab>+<space>
autocmd FileType rmd inoremap 4p <Esc>A<Enter><Tab><Tab><Tab>+<space>
autocmd FileType rmd inoremap 5p <Esc>A<Enter><Tab><Tab><Tab><Tab>+<space>
autocmd FileType rmd inoremap 6p <Esc>A<Enter><Tab><Tab><Tab><Tab><Tab>+<space>
autocmd FileType rmd inoremap 7p <Esc>A<Enter><Tab><Tab><Tab><Tab><Tab><Tab>+<space>

autocmd FileType rmd inoremap <Tab>b ****<++><Esc>5hi
autocmd FileType rmd inoremap <Tab>i __<++><Esc>4hi
autocmd FileType rmd inoremap <Tab>u ~~~~<++><Esc>5hi
autocmd FileType rmd inoremap <Tab>pic <Esc>A<Enter><Enter>![](<++>)<Esc>F]i
autocmd FileType rmd inoremap <Tab>lin <Esc>A<Enter><Enter>[](<++>)<Esc>F]i
autocmd FileType rmd inoremap <Tab>cod <Esc>A<Enter><Enter>```{}<Enter><++><Enter>```<Esc>02kf{a
autocmd FileType rmd inoremap <Tab>ytb <Esc>A<Enter><Enter>[![](http://img.youtube.com/vi/<++>
	\/0.jpg)](http://www.youtube.com/watch?v=<++>)<Esc>F[a

autocmd FileType rmd vnoremap \b xa**<Esc>pa**<Esc>
autocmd FileType rmd vnoremap \i xa_<Esc>pa_<Esc>
autocmd FileType rmd vnoremap \s xa~~<Esc>pa~~<Esc>
autocmd Filetype rmd inoremap \r ```{r}<CR>```<CR><CR><esc>2kO
autocmd Filetype rmd inoremap \p ```{python}<CR>```<CR><CR><esc>2kO

" >>>> SHELL

autocmd FileType sh inoremap if<Tab> if [[  ]]; then
	\<Enter><++>
	\<Enter><BS>fi<Esc>02kf[2la
autocmd FileType sh inoremap elif <BS>elif [[  ]]; then
	\<Enter><Tab><++><Esc>0kf[2la
autocmd FileType sh inoremap else <BS>else
	\<Enter><Tab>
autocmd FileType sh inoremap [[ [[  ]]<Esc>F]hi
autocmd FileType sh inoremap opt<Tab> while getopts ::<++> <++>; do
	\<Enter><++>
	\<Enter><BS>done<Esc>02kf:a
autocmd FileType sh inoremap whi<Tab> while ; do
	\<Enter><++>
	\<Enter><BS>done<Esc>02kf;i
autocmd FileType sh inoremap fun<Tab> * () {
	\<Enter><++>
	\<Enter><BS>}<Esc>02kf*xi
autocmd FileType sh inoremap for<Tab> for i in *; do
	\<Enter><++>
	\<Enter><BS>done<Esc>02kf*xi
autocmd FileType sh inoremap col<Tab> <Enter>
	\bkd=$(xrdb -query <bar> grep '*color0' <bar> awk '{print $NF}')
	\<Enter>bkl=$(xrdb -query <bar> grep '*color8' <bar> awk '{print $NF}')
	\<Enter>grn=$(xrdb -query <bar> grep '*color2' <bar> awk '{print $NF}')
	\<Enter>ylw=$(xrdb -query <bar> grep '*color3' <bar> awk '{print $NF}')
	\<Enter>red=$(xrdb -query <bar> grep '*color9' <bar> awk '{print $NF}')
	\<Enter>wtd=$(xrdb -query <bar> grep '*color7' <bar> awk '{print $NF}')
	\<Enter>wtl=$(xrdb -query <bar> grep '*color15' <bar> awk '{print $NF}')
	\<Enter>blu=$(xrdb -query <bar> grep '*color4' <bar> awk '{print $NF}')
	\<Enter>gnt=$(xrdb -query <bar> grep '*color5' <bar> awk '{print $NF}')
	\<Enter>cyn=$(xrdb -query <bar> grep '*color6' <bar> awk '{print $NF}')
	\<Enter>


" >>>> VIEW PDF

autocmd FileType tex,rmd map ;vp :silent<space>!zathura<space>
	\<C-r>%<BS><BS><BS>pdf<space>&<Enter>
autocmd FileType markdown,groff map ;vp :silent<space>!zathura<space>
	\<C-r>%<BS><BS>pdf<space>&<Enter>

" >>>> VIEW HTML

autocmd Filetype markdown map ;vh :!bash<space>~/scripts/openhtml<space><C-r>%<Enter><Enter>

" >>>> PYTHON FILES

autocmd Filetype python map \ll :w<space>!python<Enter>
autocmd FileType python set noexpandtab smartindent tabstop=4 shiftwidth=4
	\ cinwords=if,elif,else,for,while,try,except,finally,def,class

" >>>> PDF WORDCOUNT

autocmd Filetype tex map ;wc :!bash<space>~/scripts/wcpdf<space><C-r>%
	\<BS><BS><BS><BS><Enter>
autocmd Filetype rmd map \wc :!bash<space>~/scripts/wcpdf<space><C-r>%
	\<BS><BS><BS><BS><Enter>
autocmd Filetype markdown map \wc :!bash<space>~/scripts/wcpdf<space><C-r>%
	\<BS><BS><BS><Enter>

