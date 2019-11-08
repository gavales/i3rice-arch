if exists("b:current_syntax")
    finish
endif

syn match gosteUrg /\[×\]/
syn match gosteDon /\[✔\].*$/
syn match gostePen /\[\ \]/

syn keyword gosteFunc colmix :

hi def link gosteUrg  usrred
hi def link gosteDon  usrgry
hi def link gostePen  usrylw
hi def link gosteFunc Define

hi Folded cterm=none gui=none

setlocal foldcolumn=5
setlocal colorcolumn=0
setlocal nonumber
setlocal norelativenumber
setlocal laststatus=0

"set statusline=
"set statusline+=%#Normal#
"set statusline+=\ 
"set statusline+=%#usrStatus#
"set statusline+=\ %{ModeCurrent()}
"set statusline+=\ %f
"set statusline+=%=
"set statusline+=\ %Y
"set statusline+=\ 
"set statusline+=%#Normal#
"set statusline+=\ 

nnoremap <Tab><Tab> A<Enter>[ ]<space>
inoremap <Tab><Tab>  <Enter>[ ]<space>

nnoremap <Tab><Enter> mw:s/\[.*\]/\[✔\]/<CR>:noh<CR>`wll
inoremap <Tab><Enter> <Esc>mw:s/\[.*\]/\[✔\]/<CR>:noh<CR>`wlli
vnoremap <Tab><Enter> :s/\[.*\]/\[✔\]/ \| :noh<CR><CR>

nnoremap <Tab>w mw:s/\[.*\]/\[×\]/<CR>:noh<CR>`w
inoremap <Tab>w <Esc>mw:s/\[.*\]/\[×\]/<CR>:noh<CR>`wi
vnoremap <Tab>w :s/\[.*\]/\[×\]/ \| :noh<CR><CR>

nnoremap <Tab><Space> mw:s/\[[✔\|×]\]/\[\ \]/<CR>:noh<CR>`whh
inoremap <Tab><Space> <Esc>mw:s/\[[✔\|×]\]/\[\ \]/<CR>:noh<CR>`whha
vnoremap <Tab><Space> :s/\[[✔\|×]\]/\[\ \]/ \| :noh<CR><CR>

nnoremap \> mw:s/^/\t/<CR>:noh<CR>`wll
nnoremap \< mw:s/^\t//<CR>:noh<CR>`whh
inoremap \> <Esc>mw:s/^/\t/<CR>:noh<CR>`wlla
inoremap \< <Esc>mw:s/^\t//<CR>:noh<CR>`whi

function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^\[.*\] ') >= 0
		return ">1"
	elseif match(thisline, '^$') >= 0
		return ">0"
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
"	let foldline = substitute(foldline, '^[.*] ',           " ┫  ",   "")
	let text = foldline.foldsize.'line  '
	let spacecharcount = windowwidth - strdisplaywidth(foldsize.text)
	return foldline.repeat(" ",spacecharcount).'  ('.foldsize.' tasks)'
endfunction
setlocal foldtext=FoldText()

setlocal spell spelllang=en_gb
setlocal nonumber norelativenumber

let b:current_syntax = "goste"
