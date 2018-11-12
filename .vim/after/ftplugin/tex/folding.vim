function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^\\subsubsection') >= 0
		return ">3"
	elseif match(thisline, '^\\subsection') >= 0
		return ">2"
	elseif match(thisline, '^\\section') >= 0
		return ">1"
	elseif match(thisline, '^\\begin{document}') >= 0
		return ">0"
	elseif match(thisline, '^\\end{document}') >= 0
		return ">0"
	elseif match(thisline, '^\\printbibliography') >= 0
		return ">0"
	elseif match(thisline, '^\\tableofcontents') >= 0
		return ">0"
	elseif match(thisline, '//////') >= 0
		return ">2"
	elseif match(thisline, '>>>>') >= 0
		return ">1"
	else
		return "="
	endif
endfunction
setlocal foldmethod=expr
setlocal foldexpr=Folds()
