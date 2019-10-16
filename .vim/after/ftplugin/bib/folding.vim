function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^@') >= 0
		return ">2"
	elseif match(thisline, '^% ━ ') >= 0
		return ">1"
	else
		return "="
	endif
endfunction
setlocal foldmethod=expr
setlocal foldexpr=Folds()

function FoldText()
	let nucolwidth = &fdc + &number * &numberwidth
	let windowwidth = winwidth(0) - nucolwidth - 3
	let foldsize = (v:foldend-v:foldstart)
	let foldline = getline(v:foldstart)
	let foldline = substitute(foldline, '^% ━  ',           " ┫  ",   "")
	let foldline = substitute(foldline, ',$',               "",       "")
	let foldline = substitute(foldline, '^@article{',       " ┣━ A ", "")
	let foldline = substitute(foldline, '^@book{',          " ┣━ B ", "")
	let foldline = substitute(foldline, '^@techreport{',    " ┣━ T ", "")
	let foldline = substitute(foldline, '^@phdthesis{',     " ┣━ P ", "")
	let foldline = substitute(foldline, '^@inproceedings{', " ┣━ I ", "")
	let foldline = substitute(foldline, '^@online{',        " ┣━ O ", "")
	let foldline = substitute(foldline, '^@misc{',          " ┣━ M ", "")
	let text = foldline.foldsize.'line     '
	let barcharcount = ((windowwidth * 2)/ 3) - strdisplaywidth(foldsize.'lines   ')
	let spacecharcount = windowwidth - strdisplaywidth(text) - barcharcount
	return ' '.foldline.repeat(" ",spacecharcount).'┣'.repeat("━",barcharcount).'  ('.foldsize.' lines)'
endfunction
setlocal foldtext=FoldText()

setlocal spell spelllang=en_gb
setlocal nonumber norelativenumber
