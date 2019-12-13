map ;p :w !pdflatex -interaction=nonstopmode -shell-escape <C-r>%<CR><CR>
map ;x :w !xelatex -interaction=nonstopmode -shell-escape <C-r>%<CR><CR>
map ;b :!biber <C-r>%<BS><BS><BS>bcf<CR><CR>
map ;n :!makeindex <C-r>%<BS><BS><BS>nlo -s nomencl.ist -o <C-r>%<BS><BS><BS>nls<CR><CR>

inoremap $$      $$<++><Esc>F$i
inoremap (<Tab>  \left(\right)<++><Esc>T(i
inoremap {{<Tab> \left\{\right\}<++><Esc>T{i
inoremap [<Tab>  \left[\right]<++><Esc>T[i
inoremap bar<Tab> \left\right<++><Esc>F\i
inoremap bf<Tab> \textbf{}<++><Esc>T{i
inoremap ci<Tab> \cite{}<++><Esc>T{i
inoremap ct<Tab> \citet{}<++><Esc>T{i
inoremap cp<Tab> \citep{}<++><Esc>T{i
inoremap ch<Tab> \chapter{}<CR><++><Esc>kf}i
inoremap eq<Tab> $$<CR><CR>$$<CR><++><Esc>03ki
inoremap it<Tab> \textit{}<++><Esc>T{i
inoremap lf<Tab> \label{fig:}<Esc>T:i
inoremap lt<Tab> \label{tab:}<Esc>T:i
inoremap le<Tab> \label{eq:}<Esc>T:i
inoremap ls<Tab> \label{sec:}<Esc>T:i
inoremap nc<Tab> \newcommand{}[<++>]<++>{<++>}<Esc>2F}i
inoremap pc<Tab> \parencite{}<++><Esc>T{i
inoremap pt<Tab> \item<space>
inoremap rf<Tab> \figref{fig:}<++><Esc>T:i
inoremap rt<Tab> \tabref{tab:}<++><Esc>T:i
inoremap re<Tab> \eqnref{eq:}<++><Esc>T:i
inoremap rs<Tab> \secref{sec:}<++><Esc>T:i
inoremap sc<Tab> \textsc{}<++><Esc>T{i
inoremap s1<Tab> \section{}<CR><++><Esc>kf}i
inoremap s2<Tab> \subsection{}<CR><++><Esc>kf}i
inoremap s3<Tab> \subsubsection{}<CR><++><Esc>kf}i
inoremap tt<Tab> \texttt{}<++><Esc>T{i
inoremap tc<Tab> \textcite{}<++><Esc>T{i
inoremap up<Tab> \usepackage[]<++>{<++>}<Esc>T[i
inoremap ul<Tab> \underline{}<++><Esc>T{i
inoremap bg<Tab> \begin{DELRN}<CR><++><CR>\end{DELRN}<CR><CR><++><Esc>4k0fR:MultipleCursorsFind DELRN<CR>c
inoremap bm<Tab> \begin{multicols}{2}<CR><CR><CR><CR>\end{multicols}<CR><CR><++><Esc>4k0fR
inoremap en<Tab> \begin{equation}<CR><CR>\end{equation}<CR><++><Esc>02ki
inoremap pi<Tab> \begin{figure}[H]<CR>
	\\centering<CR>
	\\includegraphics[width=]{<++>}<CR>
	\\caption{<++><CR>
	\\label{fig:<++>}}<CR>
	\<BS>\end{figure}<Esc>03kf=a
inoremap st<Tab> {\setstretch{}<CR><++><CR><CR>}<CR><CR><++><Esc>5k0f{a
inoremap ta<Tab> \begin{table}[H]<CR>
	\\centering<CR>
	\<Tab>\begin{tabular}{c}<CR>
	\<Tab>\toprule<CR>
	\\textbf{<++>} \\<CR>
	\\midrule<CR>
	\<++> \\<CR>
	\\bottomrule<CR>
	\<BS>\end{tabular}<CR>
	\<BS>\caption{<++><CR>
	\\label{tab:<++>}}<CR>
	\<BS>\end{table}<Esc>09kfca

vnoremap bf<Tab> xi\textbf{<Esc>pa}<Esc>
vnoremap it<Tab> xi\textit{<Esc>pa}<Esc>
vnoremap sc<Tab> xi\textsc{<Esc>pa}<Esc>
vnoremap tt<Tab> xi\texttt{<Esc>pa}<Esc>
vnoremap ul<Tab> xi\underline{<Esc>pa}<Esc>
vnoremap st<Tab> xi{\setstretch{1.0}<CR><Esc>pa}<Esc>
vnoremap bm<Tab> xi\begin{multicols}{2}<CR><Esc>pa<CR>\end{multicols}<Esc>

function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^\\section{') >= 0
		return ">1"
	elseif match(thisline, '^\\subsection{') >= 0
		return ">2"
	elseif match(thisline, '^\\subsubsection{') >= 0
		return ">3"
	elseif match(thisline, '\\column{') >= 0
		return ">0"
	elseif match(thisline, '\\block{') >= 0
		return ">1"
	elseif match(thisline, '^\\section\*{') >= 0
		return ">1"
	elseif match(thisline, '^\\subsection\*{') >= 0
		return ">2"
	elseif match(thisline, '^\\subsubsection\*{') >= 0
		return ">3"
	elseif match(thisline, '^\\documentclass') >= 0
		return ">1"
	elseif match(thisline, '^\\begin{document}') >= 0
		return ">0"
	elseif match(thisline, '^\\end{document}') >= 0
		return ">0"
	elseif match(thisline, '^\\begin{columns}') >= 0
		return ">0"
	elseif match(thisline, '^\\end{columns}') >= 0
		return ">0"
"	elseif match(thisline, '^\\begin{multicols}') >= 0
"		return ">0"
"	elseif match(thisline, '^\\end{multicols}') >= 0
"		return ">0"
	elseif match(thisline, '^\\printbibliography') >= 0
		return ">0"
	elseif match(thisline, '^\\tableofcontents') >= 0
		return ">0"
	elseif match(thisline, '^\\appendix') >= 0
		return ">0"
	elseif match(thisline, '% ━━') >= 0
		return ">2"
	elseif match(thisline, '% ━ ') >= 0
		return ">1"
	else
		return "="
	endif
endfunction

setlocal foldmethod=expr
setlocal foldexpr=Folds()
setlocal foldtext=FoldText()

function! FoldText()
	let nucolwidth = &fdc + &number * &numberwidth
	let windowwidth = winwidth(0) - nucolwidth - 3
	let foldsize = (v:foldend-v:foldstart)
	let foldline = getline(v:foldstart)
	let foldline = substitute(foldline, '% ',                 "",          "")
	let foldline = substitute(foldline, '^━ ',                "╢    ",     "")
	let foldline = substitute(foldline, '^━━',                "╫    ",     "")
	let foldline = substitute(foldline, '\\documentclass',    "┫ PAmble ", "")
	let foldline = substitute(foldline, '\\section{',         "┫    ",     "")
	let foldline = substitute(foldline, '\\subsection{',      "╋━   ",     "")
	let foldline = substitute(foldline, '\\subsubsection{',   "╋━━━ ",     "")
	let foldline = substitute(foldline, '\\section\*{',       "┫    ",     "")
	let foldline = substitute(foldline, '\\subsection\*{',    "╋┅   ",     "")
	let foldline = substitute(foldline, '\\subsubsection\*{', "╋┅┅┅ ",     "")
	let foldline = substitute(foldline, '\\block{',           "┫    ",     "")
	let foldline = substitute(foldline, '\\column{',          "Column:",   "")
	let foldline = substitute(foldline, '\[',                 "",          "")
	let foldline = substitute(foldline, '\]',                 ",",         "")
	let foldline = substitute(foldline, '{',                  "",          "")
	let foldline = substitute(foldline, '}.*',                "",          "")
	let text = foldline.foldsize.'line     '
	let barcharcount = ((windowwidth * 2)/ 3) - strdisplaywidth(foldsize.'lines     ')
	let spacecharcount = windowwidth - strdisplaywidth(text) - barcharcount
	return ' '.foldline.repeat(" ",spacecharcount).'┣'.repeat("━",barcharcount).'  ('.foldsize.' lines)'
endfunction

setlocal spell spelllang=en_gb
setlocal nonumber norelativenumber laststatus=2 textwidth=60
"filetype plugin on
augroup WordCounter
	au! CursorHold,CursorHoldI * call UpdateWordCount()
augroup END

set statusline=
set statusline+=%#Normal#
set statusline+=\ 
set statusline+=%#usrStatus#
set statusline+=\ %{ModeCurrent()}
set statusline+=\ %f
set statusline+=\ %{ReadOnly()}\ %m\ %w
set statusline+=%=
set statusline+=\ %-3(%{FileSize()}%)
set statusline+=\ %p%%
set statusline+=\ \ %{WordCount()}\ 
set statusline+=%#Normal#
set statusline+=\ 
