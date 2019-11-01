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

inoremap 1n <Esc>A<Enter>1.<space>
inoremap 2n <Esc>A<Enter><Tab>#.<space>
inoremap 3n <Esc>A<Enter><Tab><Tab>(#)<space>
inoremap 4n <Esc>A<Enter><Tab><Tab><Tab>(1)<space>
inoremap 5n <Esc>A<Enter><Tab><Tab><Tab><Tab>#.<space>
inoremap 6n <Esc>A<Enter><Tab><Tab><Tab><Tab><Tab>(#)<space>
inoremap 7n <Esc>A<Enter><Tab><Tab><Tab><Tab><Tab><Tab>1.<space>

inoremap <Tab>b ****<++><Esc>5hi
inoremap <Tab>i __<++><Esc>4hi
inoremap <Tab>s ~~~~<++><Esc>5hi

inoremap <Tab>pic <Esc>A<Enter><Enter>![](<++>){#fig:<++>}<Esc>F]i
inoremap <Tab>eq  $$$$<space>{#eq:<++>}<++><Esc>F$hi
inoremap <Tab>lin <Esc>A<Enter><Enter>[](<++>)<Esc>F]i
inoremap <Tab>cod <Esc>A<Enter><Enter>```<Enter><++><Enter>```<Esc>2kA
inoremap <Tab>ytb <Esc>A<Enter><Enter>[![](http://img.youtube.com/vi/<++>
	\/0.jpg)](http://www.youtube.com/watch?v=<++>)<Esc>F[a

inoremap <Tab>ci [@]<Esc>i
inoremap <Tab>lt {#tbl:}<Esc>i
inoremap <Tab>ls {#sec:}<Esc>i
inoremap <Tab>rf [@fig:]<Esc>i
inoremap <Tab>rs [@sec:]<Esc>i
inoremap <Tab>re [@eq:]<Esc>i
inoremap <Tab>rt [@tbl:]<Esc>i

vnoremap \b xa**<Esc>pa**<Esc>
vnoremap \i xa_<Esc>pa_<Esc>
vnoremap \s xa~~<Esc>pa~~<Esc>
vnoremap \p :'<,'>norm 0i-<space><Esc>
vnoremap \n :'<,'>norm 0i1.<space><Esc>

vnoremap \1p :'<,'>norm 0dt+<Enter>
vnoremap \2p :'<,'>norm 0dt+i<Tab><Esc>
vnoremap \3p :'<,'>norm 0dt+i<Tab><Tab><Esc>
vnoremap \4p :'<,'>norm 0dt+i<Tab><Tab><Tab><Esc>
vnoremap \5p :'<,'>norm 0dt+i<Tab><Tab><Tab><Tab><Esc>
vnoremap \6p :'<,'>norm 0dt+i<Tab><Tab><Tab><Tab><Tab><Esc>
vnoremap \7p :'<,'>norm 0dt+i<Tab><Tab><Tab><Tab><Tab><Tab><Esc>

vnoremap \1n :'<,'>norm 0dt1.<Enter>
vnoremap \2n :'<,'>norm 0dt1.i<Tab><Esc>
vnoremap \3n :'<,'>norm 0dt1.i<Tab><Tab><Esc>
vnoremap \4n :'<,'>norm 0dt1.i<Tab><Tab><Tab><Esc>
vnoremap \5n :'<,'>norm 0dt1.i<Tab><Tab><Tab><Tab><Esc>
vnoremap \6n :'<,'>norm 0dt1.i<Tab><Tab><Tab><Tab><Tab><Esc>
vnoremap \7n :'<,'>norm 0dt1.i<Tab><Tab><Tab><Tab><Tab><Tab><Esc>

function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^### ') >= 0
		return ">1"
	elseif match(thisline, '^## ') >= 0
		return ">1"
	elseif match(thisline, '^# ') >= 0
		return ">1"
	elseif match(thisline, '^title: ') >= 0
		return ">1"
	elseif match(thisline, '^---$') >= 0
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
	let foldline = substitute(foldline, '^# ',   "┫ ",   "")
	let foldline = substitute(foldline, '^## ',  "╋  ",  "")
	let foldline = substitute(foldline, '^### ', "╋━  ", "")
	let text = foldline.foldsize.'line   '
	let spacecharcount = windowwidth - strdisplaywidth(text)
	return foldline.repeat(" ",spacecharcount).'  ('.foldsize.' lines)'
endfunction

setlocal spell spelllang=en_gb
setlocal nonumber norelativenumber laststatus=0
setlocal textwidth=80
autocmd CursorMoved,CursorMovedI * update
autocmd FileType markdown nnoremap \c :w !cmkd <C-r>%<Enter><Enter>
"autocmd VimEnter * Goyo"
