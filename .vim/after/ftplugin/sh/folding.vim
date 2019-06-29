function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^while ') >= 0
		return ">1"
	elseif match(thisline, '^# >>>> ') >= 0
		return ">1"
	elseif match(thisline, '^if ') >= 0
		return ">1"
	elseif match(thisline, '^for ') >= 0
		return ">1"
	elseif match(thisline, '{$') >= 0
		return ">1"
	elseif match(thisline, '^case') >= 0
		return ">1"
	elseif match(thisline, '^}') >= 0
		return ">0"
	elseif match(thisline, '^done') >= 0
		return ">0"
	elseif match(thisline, '^esac') >= 0
		return ">0"
	elseif match(thisline, '^fi') >= 0
		return ">0"
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
"    let foldline = substitute(foldline, ' () {$', " F", "")
"    let foldline = substitute(foldline, '^while ', "", "")
"    let foldline = substitute(foldline, '^case ', "", "")
"    let foldline = substitute(foldline, ' in$', " C", "")
"    let foldline = substitute(foldline, 'opts; do$', "W", "")
    let text = foldline.foldsize.'line     '
    let fillcharcount = windowwidth - strdisplaywidth(text)
    return foldline.'  '.repeat(".",fillcharcount).'  ('.foldsize.' lines)'
endfunction

setlocal spell spelllang=en_gb
setlocal nonumber norelativenumber laststatus=0
setlocal textwidth=80
autocmd FileType markdown nnoremap \c :w !bash ~/scr/cmkd <C-r>%<Enter><Enter>
"autocmd VimEnter * Goyo"
