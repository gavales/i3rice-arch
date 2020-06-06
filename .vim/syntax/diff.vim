if exists("b:current_syntax")
    finish
endif

syn match diffOlf /^---/
syn match diffNwf /^+++/
syn match diffOld /^-.*/
syn match diffNew /^+.*/
syn match diffUnc /^ .*/
syn match diffLoc /^@@.*@@/
syn match diffCom /\/\* \*\//

hi def link diffOlf usrred
hi def link diffNwf usrgrn
hi def link diffOld USRred
hi def link diffNew USRgrn
hi def link diffLoc usrgnt
hi def link diffUnc Normal
hi def link diffCom Comment

hi Folded cterm=none gui=none

setlocal colorcolumn=0

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
	let text = foldline.foldsize
	let spacecharcount = windowwidth - strdisplaywidth(foldsize.text)
	return foldline.'  ('.foldsize.')'.repeat(" ",spacecharcount)
endfunction
setlocal foldtext=FoldText()

let b:current_syntax = "diff"
