function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^@') >= 0
		return ">2"
	elseif match(thisline, '>>>>') >= 0
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
    let foldline = substitute(foldline, '% ', "", "")
    let foldline = substitute(foldline, '>>>> ', "  >>>> ", "")
    let foldline = substitute(foldline, ',.*', "", "")
    let foldline = substitute(foldline, '^.*{', " --> ", "")
    let text = foldline.foldsize.'line     '
    let fillcharcount = windowwidth - strdisplaywidth(text)
    return foldline.'  '.repeat(" ",fillcharcount).'  ('.foldsize.' lines)'
endfunction

setlocal spell spelllang=en_gb
setlocal nonumber norelativenumber
