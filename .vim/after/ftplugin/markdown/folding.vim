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

inoremap b<Tab> ****<++><Esc>5hi
inoremap i<Tab> __<++><Esc>4hi
inoremap s<Tab> ~~~~<++><Esc>5hi

inoremap pic<Tab> <Esc>A<Enter><Enter>![](<++>){#fig:<++>}<Esc>F]i
inoremap eq<Tab>  $$$$<space>{#eq:<++>}<++><Esc>F$hi
inoremap lin<Tab> <Esc>A<Enter><Enter>[](<++>)<Esc>F]i
inoremap cod<Tab> <Esc>A<Enter><Enter>```<Enter><++><Enter>```<Esc>2kA
inoremap ytb<Tab> <Esc>A<Enter><Enter>[![](http://img.youtube.com/vi/<++>
	\/0.jpg)](http://www.youtube.com/watch?v=<++>)<Esc>F[a

inoremap ci<Tab> [@]<Esc>i
inoremap lt<Tab> {#tbl:}<Esc>i
inoremap ls<Tab> {#sec:}<Esc>i
inoremap rf<Tab> [@fig:]<Esc>i
inoremap rs<Tab> [@sec:]<Esc>i
inoremap re<Tab> [@eq:]<Esc>i
inoremap rt<Tab> [@tbl:]<Esc>i

vnoremap b<Tab> xa**<Esc>pa**<Esc>
vnoremap i<Tab> xa_<Esc>pa_<Esc>
vnoremap s<Tab> xa~~<Esc>pa~~<Esc>
vnoremap p<Tab> :'<,'>norm 0i-<space><Esc>
vnoremap n<Tab> :'<,'>norm 0i1.<space><Esc>

vnoremap 1p<Tab> :'<,'>norm 0dt+<Enter>
vnoremap 2p<Tab> :'<,'>norm 0dt+i<Tab><Esc>
vnoremap 3p<Tab> :'<,'>norm 0dt+i<Tab><Tab><Esc>
vnoremap 4p<Tab> :'<,'>norm 0dt+i<Tab><Tab><Tab><Esc>
vnoremap 5p<Tab> :'<,'>norm 0dt+i<Tab><Tab><Tab><Tab><Esc>
vnoremap 6p<Tab> :'<,'>norm 0dt+i<Tab><Tab><Tab><Tab><Tab><Esc>
vnoremap 7p<Tab> :'<,'>norm 0dt+i<Tab><Tab><Tab><Tab><Tab><Tab><Esc>

vnoremap 1n<Tab> :'<,'>norm 0dt1.<Enter>
vnoremap 2n<Tab> :'<,'>norm 0dt1.i<Tab><Esc>
vnoremap 3n<Tab> :'<,'>norm 0dt1.i<Tab><Tab><Esc>
vnoremap 4n<Tab> :'<,'>norm 0dt1.i<Tab><Tab><Tab><Esc>
vnoremap 5n<Tab> :'<,'>norm 0dt1.i<Tab><Tab><Tab><Tab><Esc>
vnoremap 6n<Tab> :'<,'>norm 0dt1.i<Tab><Tab><Tab><Tab><Tab><Esc>
vnoremap 7n<Tab> :'<,'>norm 0dt1.i<Tab><Tab><Tab><Tab><Tab><Tab><Esc>

function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^### ') >= 0
		return ">3"
	elseif match(thisline, '^## ') >= 0
		return ">2"
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
setlocal nonumber norelativenumber laststatus=2
setlocal textwidth=60
autocmd CursorHold,CursorHoldI * update
autocmd CursorHold,CursorHoldI * silent !cmkd % &>/dev/null &
autocmd CursorHold,CursorHoldI * call UpdateWordCount()

"autocmd VimEnter * Goyo"

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
