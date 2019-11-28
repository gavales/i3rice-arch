inoremap if<Tab>  <Esc>:read !snyp -t sh -g if<CR>/SNYP<CR>zo4xi
inoremap elif     <BS>elif [[  ]]; then<Enter><Tab><++><Esc>0kf[2la
inoremap else     <BS>else<Enter>
inoremap [[       [[  ]]<Esc>F]hi
inoremap cas<Tab> <Esc>:read !snyp -t sh -g case<CR>/SNYP<CR>zo4xi
inoremap opt<Tab> <Esc>:read !snyp -t sh -g opt<CR>/SNYP<CR>zo4xi
inoremap lop<Tab> <Esc>:read !snyp -t sh -g lop<CR>/SNYP<CR>zo4xi
inoremap whi<Tab> <Esc>:read !snyp -t sh -g whi<CR>/SNYP<CR>zo4xi
inoremap fun<Tab> <Esc>:read !snyp -t sh -g fun<CR>/SNYP<CR>zo4xi
inoremap for<Tab> <Esc>:read !snyp -t sh -g for<CR>/SNYP<CR>zo4xi

function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^while ') >= 0
		return "a1"
	elseif match(thisline, '^# ━  ') >= 0
		return "a1"
	elseif match(thisline, '^if ') >= 0
		return "a1"
	elseif match(thisline, '^for ') >= 0
		return "a1"
	elseif match(thisline, '^case') >= 0
		return "a1"
	elseif match(thisline, '() {$') >= 0
		return "a1"
	elseif match(thisline, '^[[:space:]]\+while ') >= 0
		return "a1"
	elseif match(thisline, '^[[:space:]]\+# ━  ') >= 0
		return "a1"
	elseif match(thisline, '^[[:space:]]\+if ') >= 0
		return "a1"
	elseif match(thisline, '^[[:space:]]\+for ') >= 0
		return "a1"
	elseif match(thisline, '^[[:space:]]\+case') >= 0
		return "a1"
	elseif match(thisline, '|| {$') >= 0
		return "a1"
	elseif match(thisline, '&& {$') >= 0
		return "a1"
	elseif match(thisline, '^}$') >= 0
		return "s1"
	elseif match(thisline, '^done$') >= 0
		return "s1"
	elseif match(thisline, '^esac$') >= 0
		return "s1"
	elseif match(thisline, '^fi$') >= 0
		return "s1"
	elseif match(thisline, '^[[:space:]]\+done$') >= 0
		return "s1"
	elseif match(thisline, '^[[:space:]]\+esac$') >= 0
		return "s1"
	elseif match(thisline, '^[[:space:]]\+fi$') >= 0
		return "s1"
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
	let text = foldline.foldsize.'line    '
	let spacecharcount = windowwidth - strdisplaywidth(text)
	return foldline.' '.repeat("┈",spacecharcount).'  ('.foldsize.' lines)'
endfunction
