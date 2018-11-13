function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^##') >= 0
		return ">2"
	elseif match(thisline, '^#') >= 0
		return ">1"
	else
		return "="
	endif
endfunction
setlocal foldmethod=expr
setlocal foldexpr=Folds()
