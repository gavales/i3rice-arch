function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^.NH 3') >= 0
		return ">3"
	elseif match(thisline, '^.NH 2') >= 0
		return ">2"
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
    let foldline = substitute(foldline, '.TL', "Preamble: ", "")
    let foldline = substitute(foldline, '.NH', "====> ", "")
    let foldline = substitute(foldline, '.SH', "~~~~> ", "")
    let foldline = substitute(foldline, '.NH 2', "~~~~~~~~> ", "")
    let foldline = substitute(foldline, '.NH 3', "------------> ", "")
    let text = foldline.foldsize.'line '
    let fillcharcount = windowwidth - strdisplaywidth(text)
    return foldline. repeat("-",fillcharcount).'('.foldsize.' lines)'
endfunction

setlocal updatetime=500
setlocal spell spelllang=en_gb
setlocal nonumber norelativenumber laststatus=0
autocmd CursorHold,CursorHoldI * silent !bash ~/scripts/cgroff % &
