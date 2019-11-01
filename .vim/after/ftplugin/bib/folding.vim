if has("win32")
	autocmd Filetype bib inoremap \a <Esc>A<CR>@article{,<CR>}<Esc>kf,i
	autocmd Filetype bib inoremap \b <Esc>A<CR>@book{,<CR>}<Esc>kf,i
	autocmd Filetype bib inoremap \i <Esc>A<CR>@inproceedings{,<CR>}<Esc>kf,i
	autocmd Filetype bib inoremap \t <Esc>A<CR>@phdthesis{,<CR>}<Esc>kf,i
	autocmd Filetype bib inoremap \o <Esc>A<CR>@online{,<CR>
		\<Tab>title = {<++>},<CR>
		\<Tab>author = {<++>},<CR>
		\<Tab>publisher = {<++>}<CR>}<CR><CR><++><Esc>06kf,i
	autocmd Filetype bib inoremap <Tab>tit <Esc>A<CR><Tab>title = {},<Esc>hi
	autocmd Filetype bib inoremap <Tab>aut <Esc>A<CR><Tab>author = {},<Esc>hi
	autocmd Filetype bib inoremap <Tab>yea <Esc>A<CR><Tab>year = {},<Esc>hi
	autocmd Filetype bib inoremap <Tab>pub <Esc>A<CR><Tab>publisher = {},<Esc>hi
	autocmd Filetype bib inoremap <Tab>jou <Esc>A<CR><Tab>journal = {},<Esc>hi
	autocmd Filetype bib inoremap <Tab>vol <Esc>A<CR><Tab>volume = {},<Esc>hi
	autocmd Filetype bib inoremap <Tab>pag <Esc>A<CR><Tab>pages = {},<Esc>hi
	autocmd Filetype bib inoremap <Tab>sch <Esc>A<CR><Tab>school = {},<Esc>hi
	autocmd Filetype bib inoremap <Tab>boo <Esc>A<CR><Tab>booktitle = {},<Esc>hi
	autocmd Filetype bib inoremap <Tab>num <Esc>A<CR><Tab>number = {},<Esc>hi
	autocmd Filetype bib inoremap <Tab>org <Esc>A<CR><Tab>organization = {},<Esc>hi
else
	autocmd Filetype bib inoremap \a <Esc>:read !snyp -t bib -g art<CR>/SNYP<CR>4xi
	autocmd Filetype bib inoremap \b <Esc>:read !snyp -t bib -g book<CR>/SNYP<CR>4xi
	autocmd Filetype bib inoremap \i <Esc>:read !snyp -t bib -g inpro<CR>/SNYP<CR>4xi
	autocmd Filetype bib inoremap \t <Esc>:read !snyp -t bib -g phd<CR>/SNYP<CR>4xi
	autocmd Filetype bib inoremap \o <Esc>:read !snyp -t bib -g online<CR>/SNYP<CR>4xi
	autocmd Filetype bib inoremap <Tab>tit <Esc>:read !snyp -t bib -g title<CR>/SNYP<CR>4xi
	autocmd Filetype bib inoremap <Tab>aut <Esc>:read !snyp -t bib -g autho<CR>/SNYP<CR>4xi
	autocmd Filetype bib inoremap <Tab>yea <Esc>:read !snyp -t bib -g year<CR>/SNYP<CR>4xi
	autocmd Filetype bib inoremap <Tab>pub <Esc>:read !snyp -t bib -g pub<CR>/SNYP<CR>4xi
	autocmd Filetype bib inoremap <Tab>jou <Esc>:read !snyp -t bib -g jour<CR>/SNYP<CR>4xi
	autocmd Filetype bib inoremap <Tab>vol <Esc>:read !snyp -t bib -g vol<CR>/SNYP<CR>4xi
	autocmd Filetype bib inoremap <Tab>pag <Esc>:read !snyp -t bib -g pages<CR>/SNYP<CR>4xi
	autocmd Filetype bib inoremap <Tab>sch <Esc>:read !snyp -t bib -g school<CR>/SNYP<CR>4xi
	autocmd Filetype bib inoremap <Tab>boo <Esc>:read !snyp -t bib -g bktitle<CR>/SNYP<CR>4xi
	autocmd Filetype bib inoremap <Tab>num <Esc>:read !snyp -t bib -g number<CR>/SNYP<CR>4xi
	autocmd Filetype bib inoremap <Tab>org <Esc>:read !snyp -t bib -g org<CR>/SNYP<CR>4xi
endif

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
