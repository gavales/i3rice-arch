map ;p :w !pdflatex -interaction=nonstopmode -shell-escape <C-r>%<CR><CR>
map ;x :w !xelatex -interaction=nonstopmode -shell-escape <C-r>%<CR><CR>
map ;b :!biber <C-r>%<BS><BS><BS>bcf<CR><CR>
map ;n :!makeindex <C-r>%<BS><BS><BS>nlo -s nomencl.ist -o <C-r>%<BS><BS><BS>nls<CR><CR>

inoremap $$      $$<++><Esc>F$i
inoremap <Tab>(  \left(\right)<++><Esc>T(i
inoremap <Tab>{{ \left\{\right\}<++><Esc>T{i
inoremap <Tab>[  \left[\right]<++><Esc>T[i
inoremap <Tab>bar \left\right<++><Esc>F\i
inoremap <Tab>bf \textbf{}<++><Esc>T{i
inoremap <Tab>ci \cite{}<++><Esc>T{i
inoremap <Tab>ct \citet{}<++><Esc>T{i
inoremap <Tab>cp \citep{}<++><Esc>T{i
inoremap <Tab>ch \chapter{}<CR><++><Esc>kf}i
inoremap <Tab>eq $$<CR><CR>$$<CR><++><Esc>03ki
inoremap <Tab>it \textit{}<++><Esc>T{i
inoremap <Tab>lf \label{fig:}<Esc>T:i
inoremap <Tab>lt \label{tab:}<Esc>T:i
inoremap <Tab>le \label{eq:}<Esc>T:i
inoremap <Tab>ls \label{sec:}<Esc>T:i
inoremap <Tab>nc \newcommand{}[<++>]<++>{<++>}<Esc>2F}i
inoremap <Tab>pc \parencite{}<++><Esc>T{i
inoremap <Tab>pt \item<space>
inoremap <Tab>rf \figref{fig:}<++><Esc>T:i
inoremap <Tab>rt \tabref{tab:}<++><Esc>T:i
inoremap <Tab>re \eqnref{eq:}<++><Esc>T:i
inoremap <Tab>rs \secref{sec:}<++><Esc>T:i
inoremap <Tab>sc \textsc{}<++><Esc>T{i
inoremap <Tab>s1 \section{}<CR><++><Esc>kf}i
inoremap <Tab>s2 \subsection{}<CR><++><Esc>kf}i
inoremap <Tab>s3 \subsubsection{}<CR><++><Esc>kf}i
inoremap <Tab>tt \texttt{}<++><Esc>T{i
inoremap <Tab>tc \textcite{}<++><Esc>T{i
inoremap <Tab>up \usepackage[]<++>{<++>}<Esc>T[i
inoremap <Tab>ul \underline{}<++><Esc>T{i

vnoremap <Tab>bf xi\textbf{<Esc>pa}<Esc>
vnoremap <Tab>it xi\textit{<Esc>pa}<Esc>
vnoremap <Tab>sc xi\textsc{<Esc>pa}<Esc>
vnoremap <Tab>tt xi\texttt{<Esc>pa}<Esc>
vnoremap <Tab>ul xi\underline{<Esc>pa}<Esc>

if has("win32")
	inoremap <Tab>bg \begin{DELRN}<CR><++><CR>\end{DELRN}<CR><CR><++><Esc>4k0fR:MultipleCursorsFind DELRN<CR>c
	inoremap <Tab>bm \begin{multicols}{2}<CR><CR><CR><CR>\end{multicols}<CR><CR><++><Esc>4k0fR
	inoremap <Tab>en \begin{equation}<CR><CR>\end{equation}<CR><++><Esc>02ki
	inoremap <Tab>pi \begin{figure}[H]<CR>
		\\centering<CR>
		\\includegraphics[width=]{<++>}<CR>
		\\caption{<++><CR>
		\\label{fig:<++>}}<CR>
		\<BS>\end{figure}<Esc>03kf=a
	inoremap <Tab>st {\setstretch{}<CR><++><CR><CR>}<CR><CR><++><Esc>5k0f{a
	inoremap <Tab>ta \begin{table}[H]<CR>
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

	vnoremap <Tab>st xi{\setstretch{1.0}<CR><Esc>pa}<Esc>
	vnoremap <Tab>bm xi\begin{multicols}{2}<CR><Esc>pa<CR>\end{multicols}<Esc>

else
	inoremap <Tab>bg <Esc>:read !snyp -t tex -g begin<CR>:MultipleCursorsFind SNYP<CR>c
	inoremap <Tab>bm <Esc>:read !snyp -t tex -g multicol<CR>/SNYP<CR>zo4xi
	inoremap <Tab>en <Esc>:read !snyp -t tex -g neq<CR>/SNYP<CR>zo4xi
	inoremap <Tab>pi <Esc>:read !snyp -t tex -g figure<CR>/SNYP<CR>zo4xi
	inoremap <Tab>st <Esc>:read !snyp -t tex -g stretch<CR>/SNYP<CR>zo4xi
	inoremap <Tab>ta <Esc>:read !snyp -t tex -g table<CR>/SNYP<CR>zo4xi

	vnoremap <Tab>st x:read !snyp -t tex -g stretch<CR>/<++><CR>v3lp/SNYP<CR>zo4xi
	vnoremap <Tab>bm x:read !snyp -t tex -g multicol<CR>/<++><CR>v3lp/SNYP<CR>zo4xi

endif


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

function FoldText()
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
setlocal nonumber norelativenumber laststatus=0 textwidth=60
"filetype plugin on
