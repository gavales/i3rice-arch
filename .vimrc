"               ██
"              ▒▒
"      ██    ██ ██ ██████████  ██████  █████
"     ▒██   ▒██▒██▒▒██▒▒██▒▒██▒▒██▒▒█ ██▒▒▒██
"     ▒▒██ ▒██ ▒██ ▒██ ▒██ ▒██ ▒██ ▒ ▒██  ▒▒
"   ██ ▒▒████  ▒██ ▒██ ▒██ ▒██ ▒██   ▒██   ██
"  ▒██  ▒▒██   ▒██ ███ ▒██ ▒██▒███   ▒▒█████
"  ▒▒    ▒▒    ▒▒ ▒▒▒  ▒▒  ▒▒ ▒▒▒     ▒▒▒▒▒

" ━  SETTINGS
" ━━ GENERAL
filetype plugin on
syntax enable
set encoding=utf-8
colorscheme themer
set number relativenumber
set hls
"set is
"set linebreak
set nowrap
set sidescroll=1
set textwidth=0 wrapmargin=0
set cursorline colorcolumn=61
set title titlelen=70
set titlestring=%{v:servername}
set mouse=a
set smartindent tabstop=2 shiftwidth=2
set incsearch
"set conceallevel=2 concealcursor=nic
set list listchars=tab:│\ ,trail:╳,precedes:←,extends:→
set noshowmode noruler noshowcmd
set cmdheight=1
set splitbelow splitright
set t_Co=16
set autoread
au CursorHold * checktime

" ━━ GLOBAL MAPS
map \gy           :Goyo \| set laststatus=2<CR><CR>
map \S            <Esc>/ ━  <Esc>
map \s            <Esc>/ ━━ <Esc>
map \pS           <Esc>0a ━  <Esc>
map \ps           <Esc>0a ━━ <Esc>
map <C-p>         "+P
map <C-Up>        :res +5<CR>
map <C-Down>      :res -5<CR>
map <C-Left>      :vertical resize -5<CR>
map <C-Right>     :vertical resize +5<CR>
map <F10>         :echo "hi<"
	\ . synIDattr(synID(line("."),col("."),1),"name") . '> trans<'
	\ . synIDattr(synID(line("."),col("."),0),"name") . "> lo<"
	\ . synIDattr(synIDtrans(synID(line("."),col("."),1)),"name") . ">"<CR>

nnoremap \ll   :!compiler <C-r>%<CR><CR>
nnoremap \ph   <Esc>i<++>
nnoremap <C-T> :tabnew<CR>
nnoremap <C-W> :tabclose<CR>
nnoremap <C-H> :tabprevious<CR>
nnoremap <C-L> :tabNext<CR>
nnoremap \r(   di(hPl2x
nnoremap \r[   di[hPl2x
nnoremap \r{   di{hPl2x
nnoremap \r'   di'hPl2x
nnoremap \r`   di`hPl2x
nnoremap \r<   di<hPl2x
nnoremap \r"   di"hPl2x

inoremap <space>i<space> <space>I<space>
inoremap \ph <++>
inoremap ()  ()<++><Esc>F)i
inoremap []  []<++><Esc>F]i
inoremap {}  {}<++><Esc>F}i
inoremap ""  ""<++><Esc>F"i
inoremap ''  ''<++><Esc>F'i
inoremap ``  ``<++><Esc>F`i
inoremap <>  <><++><Esc>2F>i

vnoremap <C-c> "+y
vnoremap <S-j> :m '>+1<CR>gv=gv
vnoremap <S-k> :m '<-2<CR>gv=gv
vnoremap //    y/<C-R>"<CR>

vnoremap \s(  c()<Esc>P
vnoremap \s[  c[]<Esc>P
vnoremap \s{  c{}<Esc>P
vnoremap \s'  c''<Esc>P
vnoremap \s`  c``<Esc>P
vnoremap \s<  c<><Esc>P
vnoremap \s"  c""<Esc>P

" ━━ COMMENTING
autocmd FileType tex              let b:comment_start = '%'  | let b:comment_end = ''
autocmd FileType vim              let b:comment_start = '"'  | let b:comment_end = ''
autocmd FileType css              let b:comment_start = '/* ' | let b:comment_end = ' */'
autocmd FileType mail             let b:comment_start = '>'  | let b:comment_end = ''
autocmd FileType dosini           let b:comment_start = ';'  | let b:comment_end = ''
autocmd FileType xdefaults        let b:comment_start = '!'  | let b:comment_end = ''
autocmd FileType sh,ruby,python   let b:comment_start = '#'  | let b:comment_end = ''
autocmd FileType conf,fstab,perl  let b:comment_start = '#'  | let b:comment_end = ''
autocmd FileType sxhkdrc          let b:comment_start = '#'  | let b:comment_end = ''
autocmd FileType c,cpp,java,scala let b:comment_start = '//' | let b:comment_end = ''

nnoremap \> mw:s/^/\=b:comment_start/<CR>:s/$/\=b:comment_end/<CR>:noh<CR>`wll
nnoremap \< mw:execute 's/^'.b:comment_start.'//'<CR>:execute 's/'.b:comment_end.'$//'<CR>:noh<CR>`whh

inoremap \> <Esc>mw:s/^/\=b:comment_start/<CR><bar>:s/$/\=b:comment_end/<CR>:noh<CR>`wlla
inoremap \< <Esc>mw:execute 's/^'.b:comment_start.'//'<CR>:execute 's/'.b:comment_end.'$//'<CR>:noh<CR>`whi

vnoremap \> :s/^/\=b:comment_start/ \| :'<,'>s/$/\=b:comment_end/ \| :noh<CR><CR>
" vnoremap \< :execute 's/^'.b:comment_start.'//g' \|
" 	\ :'<,'>execute 's/'.b:comment_end.'$//' \|
" 	\ :noh

" ━━ POST-WRITE
autocmd BufWritePost *sxhkdrc !kill -10 $(pidof sxhkd)
autocmd BufWritePost _dots,_flds,_scrs,_tmps !scgen
autocmd BufWritePost .dots,.flds,.scrs,.tmps !scgen

" ━━ CURSOR
autocmd CursorHold,CursorHoldI * update
autocmd CursorHold,CursorHoldI * redraw!
let &t_SI = "\<esc>[5 q"
let &t_SR = "\<esc>[3 q"
let &t_EI = "\<esc>[2 q"

" ━━ GUI-SPECIFIC
if has("gui_running")
	so ~/.guivimrc
endif

" ━━ CALENDAR

autocmd Filetype calendar set laststatus=0
autocmd Filetype calendar set nolist
let g:calendar_frame = 'default'
let g:calendar_google_calendar = 1
let g:calendar_google_task = 1
let g:calendar_modifiable = 1

" ━  STATUSLINE
" ━━ FUNCTIONS

set laststatus=2

function! FileSize()
	let bytes = getfsize(expand('%:p'))
	if (bytes >= 1024)
		let kbytes = bytes / 1024
	endif
	if (exists('kbytes') && kbytes >= 1000)
		let mbytes = kbytes / 1000
	endif

	if bytes <= 0
		return '0'
	endif

	if (exists('mbytes'))
		return mbytes . 'MB '
	elseif (exists('kbytes'))
		return kbytes . 'KB '
	else
		return bytes . 'B '
	endif
endfunction

function! ReadOnly()
	if &readonly || !&modifiable
		return '╳'
	else
		return ''
endfunction

function! GitBranch()
	return system("git rev-parse --abbrev-ref HEAD 2>/dev/null | tr -d '\n'")
endfunction

function! StatuslineGit()
	let l:branchname = GitBranch()
	return strlen(l:branchname) > 0?'  '.l:branchname.' ':''
endfunction

let g:currentmode={
	\ 'n'      : 'N ',       'no' : 'N·Operator Pending ',
	\ 'v'      : 'V ',       'V'  : 'V·Line ',             '\<C-V>' : 'V·Block ',
	\ 's'      : 'Select ',  'S'  : 'S·Line ',             '\<C-S>' : 'S·Block ',
	\ 'i'      : 'I ',       'R'  : 'R ',                  'Rv'     : 'V·Replace ',
	\ 'c'      : 'Command ', 'cv' : 'Vim Ex ',             'ce'     : 'Ex ',
	\ 'r'      : 'Prompt ',  'rm' : 'More ',               'r?'     : 'Confirm ',
	\ '!'      : 'Shell ',   't'  : 'Terminal '}

function! ModeCurrent() abort
	let l:modecurrent = mode()
	" use get() -> fails safely, since ^V doesn't seem to register
	" 3rd arg is used when return of mode() == 0, which is case with ^V
	" thus, ^V fails -> returns 0 -> replaced with 'V Block'
	let l:modelist = toupper(get(g:currentmode, l:modecurrent, 'V·Block '))
	let l:current_status_mode = l:modelist
	return l:current_status_mode
endfunction

" ━━ ACTUAL

set statusline=
set statusline+=%#Normal#
set statusline+=\ 
set statusline+=%#usrStatus#
set statusline+=\ %{ModeCurrent()}
set statusline+=\ %f\ 
set statusline+=\ %{ReadOnly()}\ %m\ %w\ 
set statusline+=%=
set statusline+=\ %{&fileencoding?&fileencoding:&encoding}
set statusline+=\[%{&fileformat}\]\ 
set statusline+=\ %Y\ 
set statusline+=\ %-3(%{FileSize()}%)
set statusline+=\ %p%%
set statusline+=\ L:
set statusline+=%l/
set statusline+=%L
set statusline+=\ C:
set statusline+=%c\ 
set statusline+=%#Normal#
set statusline+=\ 

" ━  LATEX
autocmd FileType tex set smartindent cinwords=\\begin

if has("win32")
	let g:Tex_DefaultTargetFormat = 'pdf'
	let g:Tex_CompileRule_pdf = 'xelatex -interaction=nonstopmode -shell-escape $*'
"	MuPDF: 'C:\Program Files\MuPDF\mupdf.exe'
	let g:Tex_ViewRule_pdf = 'C:\Users\test\AppData\Local\Apps\Evince-2.32.0.145\bin\evince.exe'
	let g:Tex_MultipleCompileFormats='dvi,pdf,bibtex,pdf'
	let g:Tex_BibtexFlavor = 'biber'

	set shellslash "for windows
	set grepprg=grep\ -nH\ $* "set grep to always generate filename
	let g:tex_flavor='latex' "invoke tex, not plaintex, for empty tex file
	set iskeyword+=: "press <C-n> to cycle through \label's
else
	let g:Tex_DefaultTargetFormat = 'pdf'
	let g:Tex_CompileRule_pdf = 'xelatex -interaction=nonstopmode -shell-escape $*'
	let g:Tex_ViewRule_pdf = '/usr/bin/zathura'
	let g:Tex_MultipleCompileFormats='pdf,dvi'
	let g:Tex_BibtexFlavor = 'biber'

	set grepprg=grep\ -nH\ $* "set grep to always generate filename
	let g:tex_flavor='latex' "invoke tex, not plaintex, for empty tex file
	set iskeyword+=: "press <C-n> to cycle through \label's
endif

" ━  GROFF
au BufNewFile,BufRead *.groff,*.ms set filetype=groff

" ━  R MARKDOWN
autocmd Filetype rmd map \c :!echo<space>"require(rmarkdown);<space>
	\render('<c-r>%')"<space>\|<space>R<space>--vanilla<Enter><Enter>

" ━  OPENERS

autocmd FileType tex,rmd        map ;vp :silent !zathura \<C-r>%<BS><BS><BS>pdf &<CR>
autocmd FileType markdown,groff map ;vp :silent !zathura \<C-r>%<BS><BS>pdf &<CR>
autocmd Filetype markdown       map ;vh :!openhtml <C-r>%<CR><CR>

" ━  PYTHON FILES
autocmd Filetype python nnoremap \ll :w !python<CR>
autocmd FileType python set noexpandtab smartindent tabstop=4 shiftwidth=4
	\ cinwords=if,elif,else,for,while,try,except,finally,def,class

" ━  PDF WORDCOUNT
autocmd Filetype tex map \wc :!pdftotext <C-r>%<BS><BS><BS><BS>.pdf -  \| wc -w<Enter>
autocmd Filetype rmd map \wc :!pdftotext <C-r>%<BS><BS><BS><BS>.pdf -  \| wc -w<Enter>
autocmd Filetype markdown map \wc :!pdftotext <C-r>%<BS><BS><BS>.pdf - \| wc -w<Enter>
