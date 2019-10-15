function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^.NH 3') >= 0
		return ">1"
	elseif match(thisline, '^.NH 2') >= 0
		return ">1"
	elseif match(thisline, '^.NH') >= 0
		return ">1"
	elseif match(thisline, '^.SH') >= 0
		return ">1"
	elseif match(thisline, '^.TL') >= 0
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
	let foldbel = getline(v:foldstart + 1)
	let foldline = substitute(foldline, '^.TL',   "T: ", "")
	let foldline = substitute(foldline, '^.NH 2', "╋  ", "")
	let foldline = substitute(foldline, '^.NH 3', "╋━ ", "")
	let foldline = substitute(foldline, '^.NH',   "┫  ", "")
	let foldline = substitute(foldline, '^.SH',   "┤  ", "")
	let text = foldline.foldsize.'line         '
	let barcharcount = ((windowwidth * 2)/ 3) - strdisplaywidth(foldsize.'lines         ')
	let spacecharcount = windowwidth - strdisplaywidth(text) - barcharcount
	return foldline.' '.foldbel.repeat(" ",spacecharcount).'┣'.repeat("━",barcharcount).'  ('.foldsize.' lines)'
endfunction

setlocal updatetime=2000
setlocal spell spelllang=en_gb
setlocal nonumber norelativenumber
autocmd CursorHold,CursorHoldI * silent !compiler % &>/dev/null &
setlocal textwidth=80
