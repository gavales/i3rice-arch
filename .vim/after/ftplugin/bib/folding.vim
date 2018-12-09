function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^@') >= 0
		return ">1"
	elseif match(thisline, '>>>>') >= 0
		return ">0"
	else
		return "="
	endif
endfunction
setlocal foldmethod=expr
setlocal foldexpr=Folds()
setlocal spell spelllang=en_gb
setlocal nonumber norelativenumber laststatus=0
