inoremap 1n A<Enter>1.<space>
inoremap 2n A<Enter><Tab>#.<space>
inoremap 3n A<Enter><Tab><Tab>(#)<space>
inoremap 4n A<Enter><Tab><Tab><Tab>(1)<space>
inoremap 5n A<Enter><Tab><Tab><Tab><Tab>#.<space>
inoremap 6n A<Enter><Tab><Tab><Tab><Tab><Tab>(#)<space>
inoremap 7n A<Enter><Tab><Tab><Tab><Tab><Tab><Tab>1.<space>

inoremap 1h <Esc>A<Enter><Enter>#<space>
inoremap 2h <Esc>A<Enter><Enter>##<space>
inoremap 3h <Esc>A<Enter><Enter>###<space>
inoremap 4h <Esc>A<Enter><Enter>####<space>
inoremap 5h <Esc>A<Enter><Enter>#####<space>
inoremap 6h <Esc>A<Enter><Enter>######<space>
inoremap 7h <Esc>A<Enter><Enter>#######<space>

inoremap 1p <Esc>A<Enter>+<space>
inoremap 2p <Esc>A<Enter><Tab>+<space>
inoremap 3p <Esc>A<Enter><Tab><Tab>+<space>
inoremap 4p <Esc>A<Enter><Tab><Tab><Tab>+<space>
inoremap 5p <Esc>A<Enter><Tab><Tab><Tab><Tab>+<space>
inoremap 6p <Esc>A<Enter><Tab><Tab><Tab><Tab><Tab>+<space>
inoremap 7p <Esc>A<Enter><Tab><Tab><Tab><Tab><Tab><Tab>+<space>

inoremap <Tab>b ****<++><Esc>5hi
inoremap <Tab>i __<++><Esc>4hi
inoremap <Tab>u ~~~~<++><Esc>5hi
inoremap <Tab>pic <Esc>A<Enter><Enter>![](<++>)<Esc>F]i
inoremap <Tab>lin <Esc>A<Enter><Enter>[](<++>)<Esc>F]i
inoremap <Tab>cod <Esc>A<Enter><Enter>```{}<Enter><++><Enter>```<Esc>02kf{a
inoremap <Tab>ytb <Esc>A<Enter><Enter>[![](http://img.youtube.com/vi/<++>
	\/0.jpg)](http://www.youtube.com/watch?v=<++>)<Esc>F[a

vnoremap \b xa**<Esc>pa**<Esc>
vnoremap \i xa_<Esc>pa_<Esc>
vnoremap \s xa~~<Esc>pa~~<Esc>
autocmd Filetype rmd inoremap \r ```{r}<CR>```<CR><CR><esc>2kO
autocmd Filetype rmd inoremap \p ```{python}<CR>```<CR><CR><esc>2kO

function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^### ') >= 0
		return "a1"
	elseif match(thisline, '^## ') >= 0
		return "a1"
	elseif match(thisline, '^# ') >= 0
		return "a1"
	elseif match(thisline, '^title: ') >= 0
		return ">1"
	elseif match(thisline, '^---') >= 0
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
	let foldline = substitute(foldline, '^# ',   "┫ ",   "")
	let foldline = substitute(foldline, '^## ',  "╋  ",  "")
	let foldline = substitute(foldline, '^### ', "╋━  ", "")
	let text = foldline.foldsize.'line   '
	let spacecharcount = windowwidth - strdisplaywidth(text)
	return foldline.repeat(" ",spacecharcount).'  ('.foldsize.' lines)'
endfunction

setlocal spell spelllang=en_gb
setlocal nonumber norelativenumber laststatus=2
setlocal textwidth=60
"autocmd VimEnter * Goyo"
augroup WordCounter
	au! CursorHold,CursorHoldI * silent !compiler % &>/dev/null &
	au! CursorHold,CursorHoldI * call UpdateWordCount()
augroup END

set statusline=
set statusline+=%#Normal#
set statusline+=\ 
set statusline+=%#usrStatus#
set statusline+=\ %{ModeCurrent()}
set statusline+=\ %f
set statusline+=\ %{ReadOnly()}\ %m\ %w
set statusline+=%=
set statusline+=\ %-3(%{FileSize()}%)
set statusline+=\ %p%%
set statusline+=\ \ %{WordCount()}\ 
set statusline+=%#Normal#
set statusline+=\ 
