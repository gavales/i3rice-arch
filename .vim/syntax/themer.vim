if exists("b:current_syntax")
    finish
endif

syn match themerComment /^[#!;"/%].*$/
syn match themerCen     /%%\S\+%%/
syn match themerAtt     /@@\S\+@@/
syn match themerVar     /\$\S\+/

syn keyword themerFunc    colmix :

hi def link themerComment Comment
hi def link themerVar     Identifier
hi def link themerCen     usrgrn
hi def link themerAtt     usrylw
hi def link themerFunc    Define

function! Folds()
	let thisline = getline(v:lnum)
	if match(thisline, '^[#;"!/%] ━━ ') >= 0
		return ">2"
	elseif match(thisline, '^[#;"!/%] ━  ') >= 0
		return ">1"
	elseif match(thisline, '^\[.*\]') >= 0
		return ">1"
	else
		return "="
	endif
endfunction
setlocal foldmethod=expr
setlocal foldexpr=Folds()

function! FText()
	let nucolwidth = &fdc + &number * &numberwidth
	let windowwidth = winwidth(0) - nucolwidth - 3
	let foldsize = (v:foldend-v:foldstart)
	let foldline = getline(v:foldstart)
	let foldline = substitute(foldline, '^[#;"!/%] ━  ', " ┫  ", "")
	let foldline = substitute(foldline, '^[#;"!/%] ━━ ', " ┣━ ", "")
	let text = foldline.foldsize.'lines    '
	let barcharcount = ((windowwidth * 2)/ 3) - strdisplaywidth(foldsize.'lines    ')
	let spacecharcount = windowwidth - strdisplaywidth(text) - barcharcount
	return ' '.foldline.repeat(" ",spacecharcount).'┣'.repeat("━",barcharcount).'  ('.foldsize.' lines)'
endfunction
setlocal foldtext=FText()

let b:current_syntax = "themer"
