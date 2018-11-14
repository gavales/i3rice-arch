">>>> SETTINGS
"////// GENERAL
filetype plugin on    " required
execute pathogen#infect()
syntax enable
set encoding=utf-8
set number
set relativenumber
set hls
set is
set wrap
set linebreak
set nolist  "disable linebreak
set textwidth=0
set wrapmargin=0
set tabstop=4
set cursorline
set colorcolumn=80

inoremap ;<Tab> <Esc>/>>>>>><Enter>
map ;<Tab> <Esc>/>>>>>><Enter>

inoremap ph<Tab> <++>
nnoremap ph<Tab> i<++><Esc>

inoremap ,<Tab> <Esc>/<++><Enter>4xi
nnoremap ,<Tab> /<++><Enter>4xi

"////// CHANGE HIGHLIGHT COLOURS
hi Normal ctermbg=none guibg=black
hi LineNr ctermbg=none ctermfg=grey
hi Folded ctermfg=grey ctermbg=none
hi ModeMsg cterm=bold ctermfg=white
hi lCursor ctermbg=white ctermfg=black

"////// RESIZING
map .rk :res<space>+5<Enter>
map .rj :res<space>-5<Enter>
map .rh :vertical<space>resize<space>-5<Enter>
map .rl :vertical<space>resize<space>+5<Enter>

"////// SPLIT OPEN AT BOTTOM & RIGHT
set splitbelow
set splitright

"////// BRACKETS
inoremap () ()<++><Esc>F)i
inoremap [] []<++><Esc>F]i
inoremap {} {}<++><Esc>F}i

">>>> COMMENT/UNCOMMENT
vnoremap \# :'<,'>norm 0i#<Enter>
vnoremap \d# :'<,'>norm 0x<Enter>
vnoremap \% :'<,'>norm 0i%<Enter>
vnoremap \d% :'<,'>norm 0x<Enter>
vnoremap \! :'<,'>norm 0i!<Enter>
vnoremap \d! :'<,'>norm 0x<Enter>
vnoremap \" :'<,'>norm 0i"<Enter>
vnoremap \d" :'<,'>norm 0x<Enter>

">>>> GOYO
map <F11> :Goyo<bar>hi<space>Normal<space>ctermbg=none<space>guibg=black<bar>
	\hi<space>LineNr<space>ctermbg=none<space>ctermfg=grey<bar>
	\hi<space>Folded<space>ctermfg=grey<space>ctermbg=none<bar>
	\hi<space>ModeMsg<space>cterm=bold<space>ctermfg=white<bar>
	\hi<space>lCursor<space>ctermbg=white<space>ctermfg=black
	\<Enter><Enter>

">>>> STATUSLINE
"////// FUNCTIONS
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

"////// ACTUAL
set statusline=
set statusline+=%#lCursor#
set statusline+=\ /%F 
set statusline+=\ 
set statusline+=%#LineNr#
set statusline+=\ %-3(%{FileSize()}%) 
set statusline+=\ %{ReadOnly()}\ %m\ %w\ 
set statusline+=%=
set statusline+=\ %Y
set statusline+=\ %{&fileencoding?&fileencoding:&encoding}
set statusline+=\[%{&fileformat}\]
set statusline+=\ 
set statusline+=%#lCursor#
set statusline+=\ %p%%
set statusline+=\ L:
set statusline+=%l/
set statusline+=%L
set statusline+=\ C:
set statusline+=%c
set statusline+=\ 


">>>> LATEX
"////// LATEX-SUITE
let g:Tex_DefaultTargetFormat = 'pdf'
let g:Tex_CompileRule_pdf = 'pdflatex -interaction=nonstopmode -shell-escape $*'
"let g:Tex_ViewRule_pdf = '/usr/bin/evince'
let g:Tex_ViewRule_pdf = '/usr/bin/zathura'
let g:Tex_MultipleCompileFormats='pdf,dvi'
let g:Tex_BibtexFlavor = 'biber'

"let g:Tex_FormatDependency_pdf = 'dvi,ps,pdf'
"let g:Tex_CompileRule_dvi = 'latex --interaction=nonstopmode $*'
"let g:Tex_CompileRule_ps = 'dvips -Ppdf -o $*.ps $*.dvi'
"let g:Tex_CompileRule_pdf = 'ps2pdf $*.ps'

filetype plugin on "invoke latex-suite when opening tex file
set grepprg=grep\ -nH\ $* "set grep to always generate filename
let g:tex_flavor='latex' "invoke tex, not plaintex, for empty tex file
set iskeyword+=: "press <C-n> to cycle through \label's

"////// COMPILE PDF
autocmd Filetype tex map \cp :w<space>!bash<space>~/scripts/clatex<space><C-r>
	\%<Enter><Enter>
autocmd Filetype tex map \sp :w<space>!pdflatex<space>-interaction=nonstopmode
	\<space>-shell-escape<space><C-r>%<Enter><Enter>
autocmd Filetype tex map \sx :w<space>!xelatex<space>-interaction=nonstopmode
	\<space>-shell-escape<space><C-r>%<Enter><Enter>

autocmd Filetype tex inoremap \cp <Esc>:w<Space>!bash<space>~/scripts/clatex
	\<space><C-r>%<Enter><Enter>i
autocmd Filetype tex inoremap \sp <Esc>:w<Space>!pdflatex<space>
	\-interaction=nonstopmode<space>-shell-escape<space><C-r>%<Enter><Enter>i
autocmd Filetype tex inoremap \sx <Esc>:w<Space>!xelatex<space>
	\-interaction=nonstopmode<space>-shell-escape<space><C-r>%<Enter><Enter>i

"////// VIEW PDF
autocmd Filetype tex map \vp :silent<space>!bash<space>~/scripts/openpdf<space>
	\<C-r>%<BS><BS><BS>pdf<Enter>
autocmd Filetype rmd map \vp :silent<space>!bash<space>~/scripts/openpdf<space>
	\<C-r>%<BS><BS><BS>pdf<Enter>
autocmd Filetype markdown map \vp :silent<space>!bash<space>~/scripts/openpdf
	\<space><C-r>%<BS><BS>pdf<Enter>

"////// BIBER
autocmd Filetype tex map \cb :!biber<space><C-r>%<BS><BS><BS>bcf<Enter><Enter>

"////// MAKEINDEX
autocmd Filetype tex map \mi :!makeindex<space><C-r>%<BS><BS><BS>
	\nlo<space>-s<space>nomencl.ist<space>-o<space><C-r>%<BS><BS><BS>
	\nls<Enter><Enter>

"////// LUKE SMITH'S FANTASTIC VIM MACROS
autocmd FileType tex inoremap $$ $$<++><Esc>F$i
autocmd FileType tex inoremap \( \left(\right)<++><Esc>T(i
autocmd FileType tex inoremap \{{ \left\{\right\}<++><Esc>T{i
autocmd FileType tex inoremap \[ \left[\right]<++><Esc>T[i
autocmd FileType tex inoremap \bar \left\right<++><Esc>F\i

autocmd FileType tex inoremap \bf \textbf{}<++><Esc>T{i
autocmd FileType tex inoremap \bg \begin{DELRN}% <Enter><++><Enter>\end{DELRN}
	\<Enter><Enter><++><Esc>4k0fR:MultipleCursorsFind<Space>DELRN<Enter>c
autocmd FileType tex inoremap \bm \begin{multicols}{2}<Enter><Enter><Enter>
	\<Enter>\end{multicols}<Enter><Enter><++><Esc>4k0fR

autocmd FileType tex inoremap \ci \cite{}<++><Esc>T{i
autocmd FileType tex inoremap \ct \citet{}<++><Esc>T{i
autocmd FileType tex inoremap \cp \citep{}<++><Esc>T{i
autocmd FileType tex inoremap \ch \chapter{}<Enter><++><Esc>kf}i

autocmd FileType tex inoremap \en \begin{equation}<Enter><Enter>\end{equation}
	\<Enter><++><Esc>02ki
autocmd FileType tex inoremap \eq $$<Enter><Enter>$$<Enter><++><Esc>03ki

autocmd FileType tex inoremap \it \textit{}<++><Esc>T{i

autocmd FileType tex inoremap \lf \label{fig:}<Space><++><Esc>T:i
autocmd FileType tex inoremap \lt \label{tab:}<Space><++><Esc>T:i
autocmd FileType tex inoremap \le \label{eq:}<Space><++><Esc>T:i
autocmd FileType tex inoremap \ls1 \label{sec:}<Space><++><Esc>T:i
autocmd FileType tex inoremap \ls2 \label{ssec:}<Space><++><Esc>T:i
autocmd FileType tex inoremap \ls3 \label{sssec:}<Space><++><Esc>T:i

autocmd FileType tex inoremap \pc \parencite{}<++><Esc>T{i
autocmd FileType tex inoremap \pt \item 

autocmd FileType tex inoremap \rf \ref{fig:}<Space><++><Esc>T:i
autocmd FileType tex inoremap \rt \ref{tab:}<Space><++><Esc>T:i
autocmd FileType tex inoremap \re \ref{eq:}<Space><++><Esc>T:i
autocmd FileType tex inoremap \rs1 \ref{sec:}<Space><++><Esc>T:i
autocmd FileType tex inoremap \rs2 \ref{ssec:}<Space><++><Esc>T:i
autocmd FileType tex inoremap \rs3 \ref{sssec:}<Space><++><Esc>T:i

autocmd FileType tex inoremap \st {\setstretch{}<Enter><++><Enter>
	\<Enter>}<Enter><Enter><++><Esc>5k0f{a
autocmd FileType tex inoremap \sc \textsc{}<++><Esc>T{i
autocmd FileType tex inoremap \s1 \section{}<Enter><++><Esc>kf}i
autocmd FileType tex inoremap \s2 \subsection{}<Enter><++><Esc>kf}i
autocmd FileType tex inoremap \s3 \subsubsection{}<Enter><++><Esc>kf}i

autocmd FileType tex inoremap \tt \texttt{}<++><Esc>T{i
autocmd FileType tex inoremap \tc \textcite{}<++><Esc>T{i

autocmd FileType tex inoremap \up \usepackage{}<++><Esc>T{i
autocmd FileType tex inoremap \ul \underline{}<++><Esc>T{i

autocmd FileType tex vnoremap \bf xa\textbf{<Esc>pa}<Esc>
autocmd FileType tex vnoremap \it xa\textit{<Esc>pa}<Esc>
autocmd FileType tex vnoremap \sc xa\textsc{<Esc>pa}<Esc>
autocmd FileType tex vnoremap \tt xa\texttt{<Esc>pa}<Esc>
autocmd FileType tex vnoremap \ul xa\underline{<Esc>pa}<Esc>
autocmd FileType tex vnoremap \st xa{\setstretch{1.0}<Enter><Esc>pa}<Esc>
autocmd FileType tex vnoremap \bm xa\begin{multicols}{2}<Enter><Esc>pa
	\<Enter>\end{multicols}<Esc>

autocmd FileType tex map \ob :sp<space><C-r>%<BS><BS><BS>bib<Enter>

"////// BIB SHORTCUTS
autocmd Filetype bib inoremap b<Tab> @book{,<Enter>
	\<Tab>title<space>=<space>{<++>},<Enter>
	\<Tab>author<space>=<space>{<++>},<Enter>
	\<Tab>year<space>=<space>{<++>},<Enter>
	\<Tab>publisher<space>=<space>{<++>}<Enter>}<Enter><Enter><++><Esc>07kf{a
autocmd Filetype bib inoremap a<Tab> @article{,<Enter>
	\<Tab>title<space>=<space>{<++>},<Enter>
	\<Tab>author<space>=<space>{<++>},<Enter>
	\<Tab>journal<space>=<space>{<++>},<Enter>
	\<Tab>volume<space>=<space>{<++>},<Enter>
	\<Tab>pages<space>=<space>{<++>},<Enter>
	\<Tab>year<space>=<space>{<++>},<Enter>
	\<Tab>publisher<space>=<space>{<++>}<Enter>}<Enter><Enter><++><Esc>010kf{a
autocmd Filetype bib inoremap t<Tab> @phdthesis{,<Enter>
	\<Tab>title<space>=<space>{<++>},<Enter>
	\<Tab>author<space>=<space>{<++>},<Enter>
	\<Tab>school<space>=<space>{<++>},<Enter>
	\<Tab>year<space>=<space>{<++>},<Enter>
	\<Tab>publisher<space>=<space>{<++>}<Enter>}<Enter><Enter><++><Esc>08kf{a
autocmd Filetype bib inoremap i<Tab> @inproceedings{,<Enter>
	\<Tab>title<space>=<space>{<++>},<Enter>
	\<Tab>author<space>=<space>{<++>},<Enter>
	\<Tab>booktitle<space>=<space>{<++>},<Enter>
	\<Tab>volume<space>=<space>{<++>},<Enter>
	\<Tab>number<space>=<space>{<++>},<Enter>
	\<Tab>pages<space>=<space>{<++>},<Enter>
	\<Tab>year<space>=<space>{<++>},<Enter>
	\<Tab>organization<space>=<space>{<++>}<Enter>}<Enter><Enter><++><Esc>011kf{a
autocmd Filetype bib inoremap o<Tab> @online{,<Enter>
	\<Tab>title<space>=<space>{<++>},<Enter>
	\<Tab>author<space>=<space>{<++>},<Enter>
	\<Tab>publisher<space>=<space>{<++>}<Enter>}<Enter><Enter><++><Esc>06kf{a

">>>> PDF WORDCOUNT
autocmd Filetype tex map \wc :!bash<space>~/scripts/wcpdf<space><C-r>%
	\<BS><BS><BS><BS><Enter>
autocmd Filetype rmd map \wc :!bash<space>~/scripts/wcpdf<space><C-r>%
	\<BS><BS><BS><BS><Enter>
autocmd Filetype markdown map \wc :!bash<space>~/scripts/wcpdf<space><C-r>%
	\<BS><BS><BS><Enter>


">>>> MARKDOWN FILES
autocmd FileType markdown inoremap 2h ##<space>
autocmd FileType markdown inoremap 2h ###<space>
autocmd FileType markdown inoremap 2h ####<space>
autocmd FileType markdown inoremap 2h #####<space>
autocmd FileType markdown inoremap 2h ######<space>

autocmd FileType markdown inoremap 2p <Tab>-<space>
autocmd FileType markdown inoremap 3p <Tab><Tab>-<space>
autocmd FileType markdown inoremap 4p <Tab><Tab><Tab>-<space>
autocmd FileType markdown inoremap 5p <Tab><Tab><Tab><Tab>-<space>
autocmd FileType markdown inoremap 6p <Tab><Tab><Tab><Tab><Tab>-<space>

autocmd FileType markdown inoremap b<Tab> ****<++><Esc>5hi
autocmd FileType markdown inoremap i<Tab> __<++><Esc>4hi
autocmd FileType markdown inoremap u<Tab> ~~~~<++><Esc>5hi
autocmd FileType markdown inoremap pic<Tab> ![](<++>)<Esc>F]i
autocmd FileType markdown inoremap lin<Tab> [](<++>)<Esc>F]i
autocmd FileType markdown inoremap cod<Tab> ```<Enter><++><Enter>```<Esc>2kA
autocmd FileType markdown inoremap ytb<Tab> [![](http://img.youtube.com/vi/<++>
	\/0.jpg)](http://www.youtube.com/watch?v=<++>)<Esc>F[a

autocmd Filetype markdown map \cp :w<space>!pandoc<space>-o<space><C-r>
	\%<BS><BS><BS>.pdf<Enter><Enter>
autocmd Filetype markdown map \cw :w<space>!pandoc<space>-o<space><C-r>
	\%<BS><BS><BS>.docx<Enter><Enter>
autocmd Filetype markdown map \ch :w<space>!pandoc<space>--css<space>
	\~/pandoc.css<space>-o<space><C-r>%<BS><BS><BS>.html<Enter><Enter>
autocmd Filetype markdown map \cb :w<space>!pandoc<space>-t<space>
	\beamer<space>-o<space><C-r>%<BS><BS><BS>.pdf<Enter><Enter>

">>>> R MARKDOWN
autocmd Filetype rmd map \ll :!echo<space>"require(rmarkdown);<space>
	\render('<c-r>%')"<space>\|<space>R<space>--vanilla<Enter><Enter>
autocmd Filetype rmd inoremap ;r ```{r}<CR>```<CR><CR><esc>2kO
autocmd Filetype rmd inoremap ;p ```{python}<CR>```<CR><CR><esc>2kO

autocmd FileType rmd inoremap 2h ##<space>
autocmd FileType rmd inoremap 2h ###<space>
autocmd FileType rmd inoremap 2h ####<space>
autocmd FileType rmd inoremap 2h #####<space>
autocmd FileType rmd inoremap 2h ######<space>

autocmd FileType rmd inoremap 2p <Tab>-<space>
autocmd FileType rmd inoremap 3p <Tab><Tab>-<space>
autocmd FileType rmd inoremap 4p <Tab><Tab><Tab>-<space>
autocmd FileType rmd inoremap 5p <Tab><Tab><Tab><Tab>-<space>
autocmd FileType rmd inoremap 6p <Tab><Tab><Tab><Tab><Tab>-<space>

autocmd FileType rmd inoremap b<Tab> ****<++><Esc>5hi
autocmd FileType rmd inoremap i<Tab> __<++><Esc>4hi
autocmd FileType rmd inoremap u<Tab> ~~~~<++><Esc>5hi
autocmd FileType rmd inoremap pic<Tab> ![](<++>)<Esc>F]i
autocmd FileType rmd inoremap lin<Tab> [](<++>)<Esc>F]i
autocmd FileType rmd inoremap cod<Tab> ```{}<Enter><++><Enter>```<Esc>02kf{a
autocmd FileType rmd inoremap ytb<Tab> [![](http://img.youtube.com/vi/<++>
	\/0.jpg)](http://www.youtube.com/watch?v=<++>)<Esc>F[a

">>>> PYTHON FILES
autocmd Filetype python map \ll :w<space>!python<Enter>


