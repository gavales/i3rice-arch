function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^" ━━ ') >= 0
		return ">2"
	elseif match(thisline, '^" ━  ') >= 0
		return ">1"
	elseif match(thisline, '^if') >= 0
		return "a1"
	elseif match(thisline, '^function') >= 0
		return "a1"
	elseif match(thisline, '^endif') >= 0
		return "s1"
	elseif match(thisline, '^endfunction') >= 0
		return "s1"
	elseif match(thisline, '^[[:space:]]\+if') >= 0
		return "a1"
	elseif match(thisline, '^[[:space:]]\+function') >= 0
		return "a1"
	elseif match(thisline, '^[[:space:]]\+endif') >= 0
		return "s1"
	elseif match(thisline, '^[[:space:]]\+endfunction') >= 0
		return "s1"
	else
		return "="
	endif
endfunction
setlocal foldmethod=expr
setlocal foldexpr=Folds()

setlocal foldtext=FText()
function FText()
	let nucolwidth = &fdc + &number * &numberwidth
	let windowwidth = winwidth(0) - nucolwidth - 3
	let foldsize = (v:foldend-v:foldstart)
	let foldline = getline(v:foldstart)
	let foldline = substitute(foldline, '\t', repeat("┈",&tabstop), "g")
	let foldline = substitute(foldline, '^" ━  ', "  ┫  ", "")
	let foldline = substitute(foldline, '^" ━━ ', "  ┣━ ", "")
	let text = foldline.foldsize.'lines'
	let spacecharcount = windowwidth - strdisplaywidth(text)
	return foldline.repeat(" ",spacecharcount).'('.foldsize.' lines)'
endfunction
