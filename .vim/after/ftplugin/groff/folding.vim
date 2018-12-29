function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^.NH 3') >= 0
		return ">3"
	elseif match(thisline, '^.NH 2') >= 0
		return ">2"
	elseif match(thisline, '^.NH') >= 0
		return ">1"
	elseif match(thisline, '^.TL') >= 0
		return ">1"
	else
		return "="
	endif
endfunction
setlocal foldmethod=expr
setlocal foldexpr=Folds()
setlocal updatetime=500
setlocal spell spelllang=en_gb
setlocal nonumber norelativenumber laststatus=0
autocmd CursorHold,CursorHoldI * silent !bash ~/scripts/cgroff % &
