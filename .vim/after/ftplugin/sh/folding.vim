autocmd FileType sh inoremap if<Tab> <Esc>:read !snyp -t sh -g if<CR>/SNYP<CR>4xi
autocmd FileType sh inoremap elif <BS>elif [[  ]]; then<Enter><Tab><++><Esc>0kf[2la
autocmd FileType sh inoremap else <BS>else<Enter>
autocmd FileType sh inoremap [[ [[  ]]<Esc>F]hi
autocmd FileType sh inoremap cas<Tab> <Esc>:read !snyp -t sh -g case<CR>/SNYP<CR>4xi
autocmd FileType sh inoremap opt<Tab> <Esc>:read !snyp -t sh -g opt<CR>/SNYP<CR>4xi
autocmd FileType sh inoremap lop<Tab> <Esc>:read !snyp -t sh -g lop<CR>/SNYP<CR>4xi
autocmd FileType sh inoremap whi<Tab> <Esc>:read !snyp -t sh -g whi<CR>/SNYP<CR>4xi
autocmd FileType sh inoremap fun<Tab> <Esc>:read !snyp -t sh -g fun<CR>/SNYP<CR>4xi
autocmd FileType sh inoremap for<Tab> <Esc>:read !snyp -t sh -g for<CR>/SNYP<CR>4xi

function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^while ') >= 0
		return ">1"
	elseif match(thisline, '^# ━  ') >= 0
		return ">1"
	elseif match(thisline, '^if ') >= 0
		return ">1"
	elseif match(thisline, '^for ') >= 0
		return ">1"
	elseif match(thisline, '^case') >= 0
		return ">1"
	elseif match(thisline, '() {$') >= 0
		return ">1"
"	elseif match(thisline, '|| {$') >= 0
"		return ">1"
"	elseif match(thisline, '&& {$') >= 0
"		return ">1"
	elseif match(thisline, '^}$') >= 0
		return ">0"
	elseif match(thisline, '^done$') >= 0
		return ">0"
	elseif match(thisline, '^esac$') >= 0
		return ">0"
	elseif match(thisline, '^fi$') >= 0
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
"	let foldline = substitute(foldline, ' () {$', " F", "")
"	let foldline = substitute(foldline, '^while ', "", "")
"	let foldline = substitute(foldline, '^case ', "", "")
"	let foldline = substitute(foldline, ' in$', " C", "")
"	let foldline = substitute(foldline, 'opts; do$', "W", "")
	let text = foldline.foldsize.'line    '
"	let barcharcount = ((windowwidth * 2)/ 3) - strdisplaywidth(foldsize.'lines     ')
	let spacecharcount = windowwidth - strdisplaywidth(text)
	return foldline.' '.repeat("┈",spacecharcount).'  ('.foldsize.' lines)'
endfunction
