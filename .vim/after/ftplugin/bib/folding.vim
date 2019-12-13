inoremap \a <Esc>A<CR>@article{,<CR>}<Esc>kf,i
inoremap \b <Esc>A<CR>@book{,<CR>}<Esc>kf,i
inoremap \i <Esc>A<CR>@inproceedings{,<CR>}<Esc>kf,i
inoremap \t <Esc>A<CR>@phdthesis{,<CR>}<Esc>kf,i
inoremap \o <Esc>A<CR>@online{,<CR>
	\<Tab>title = {<++>},<CR>
	\<Tab>author = {<++>},<CR>
	\<Tab>publisher = {<++>}<CR>}<CR><CR><++><Esc>06kf,i
inoremap <Tab>tit <Esc>A<CR><Tab>title = {},<Esc>hi
inoremap <Tab>aut <Esc>A<CR><Tab>author = {},<Esc>hi
inoremap <Tab>yea <Esc>A<CR><Tab>year = {},<Esc>hi
inoremap <Tab>pub <Esc>A<CR><Tab>publisher = {},<Esc>hi
inoremap <Tab>jou <Esc>A<CR><Tab>journal = {},<Esc>hi
inoremap <Tab>vol <Esc>A<CR><Tab>volume = {},<Esc>hi
inoremap <Tab>pag <Esc>A<CR><Tab>pages = {},<Esc>hi
inoremap <Tab>sch <Esc>A<CR><Tab>school = {},<Esc>hi
inoremap <Tab>boo <Esc>A<CR><Tab>booktitle = {},<Esc>hi
inoremap <Tab>num <Esc>A<CR><Tab>number = {},<Esc>hi
inoremap <Tab>org <Esc>A<CR><Tab>organization = {},<Esc>hi

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
