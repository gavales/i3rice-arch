inoremap ;b  <Esc>o.B "" <++><CR><++><Esc>0kf"a
inoremap ;c  <Esc>o.[<CR><CR>.]<CR><++><Esc>02ki
inoremap ;d  <Esc>o.IP  2<CR><++><Esc>0kt2i
inoremap ;e0 <Esc>o.nr step 0 1<CR>.IP \n+[step]<CR>
inoremap ;ei <Esc>o.IP \n+[step]<CR>
inoremap ;i  <Esc>o.I "" <++><CR><++><Esc>0kf"a
inoremap ;l  <Esc>o.IP \[bu] 2<CR>
inoremap ;n  <Esc>o.RS<CR><CR>.RE<CR><++><Esc>02ki
inoremap ;s0 <Esc>o.SH<CR><CR>.PP<CR><++><Esc>02ki
inoremap ;s1 <Esc>o.NH<CR><CR>.PP<CR><++><Esc>02ki
inoremap ;s2 <Esc>o.NH 2<CR><CR>.PP<CR><++><Esc>02ki
inoremap ;s3 <Esc>o.NH 3<CR><CR>.PP<CR><++><Esc>02ki
inoremap ;s4 <Esc>o.NH 4<CR><CR>.PP<CR><++><Esc>02ki
inoremap ;u  <Esc>o.UL "" <++><CR><++><Esc>0kf"a
inoremap ;x  <Esc>o.BX "" <++><CR><++><Esc>0kf"a
inoremap <Tab><CR> <Esc>o.PP<CR>

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
autocmd CursorMoved,CursorMovedI * update
autocmd CursorHold,CursorHoldI * silent !compiler % &>/dev/null &
setlocal textwidth=80
