filetype plugin indent on    " required
execute pathogen#infect()
syntax enable
set background=dark
colorscheme solarized
hi Normal ctermbg=none
set number
" set relativenumber
hi Folded gui=italic,bold guifg=white guibg=black cterm=italic,bold ctermfg=white ctermbg=none
hi ModeMsg cterm=bold ctermfg=white

set laststatus=2

" Find out current buffer's size and output it.
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
    return ''
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

set statusline=
set statusline+=%#lCursor#
set statusline+=\ /%f 
set statusline+=\ 
set statusline+=%#TabLineSel#
set statusline+=\ %-3(%{FileSize()}%) 
set statusline+=\ %{ReadOnly()}\ %m\ %w\ 
set statusline+=%=
set statusline+=\ %Y
set statusline+=\ %{&fileencoding?&fileencoding:&encoding}
set statusline+=\[%{&fileformat}\]
set statusline+=\ 
set statusline+=%#lCursor#
set statusline+=\ %p%%
set statusline+=\ L:
set statusline+=%l/
set statusline+=%L
set statusline+=\ C:
set statusline+=%c
set statusline+=\ 

" LaTex-Suite
let g:Tex_DefaultTargetFormat = 'pdf'
let g:Tex_CompileRule_pdf = 'pdflatex -interaction=nonstopmode $*'
let g:Tex_ViewRule_pdf = '/usr/bin/evince'
let g:Tex_MultipleCompileFormats='dvi,pdf,makeindex,pdf,bibtex,pdf'
let g:Tex_BibtexFlavor = 'biber'

" The following is relevant to make LaTeX rerun after biber if necessary: 
" " (include all formats for which re-running is to be enabled)
" let g:Tex_MultipleCompileFormats='pdf,dvi'

"let g:Tex_FormatDependency_pdf = 'dvi,ps,pdf'
"let g:Tex_CompileRule_dvi = 'latex --interaction=nonstopmode $*'
"let g:Tex_CompileRule_ps = 'dvips -Ppdf -o $*.ps $*.dvi'
"let g:Tex_CompileRule_pdf = 'ps2pdf $*.ps'

" REQUIRED. This makes vim invoke Latex-Suite when you open a tex file.
filetype plugin on

" IMPORTANT: win32 users will need to have 'shellslash' set so that latex
" can be called correctly.
" set shellslash

" IMPORTANT: grep will sometimes skip displaying the file name if you
" search in a singe file. This will confuse Latex-Suite. Set your grep
" program to always generate a file-name.
set grepprg=grep\ -nH\ $*

" OPTIONAL: This enables automatic indentation as you type.
" filetype indent on

" OPTIONAL: Starting with Vim 7, the filetype of empty .tex files defaults to
" 'plaintex' instead of 'tex', which results in vim-latex not being loaded.
" The following changes the default filetype back to 'tex':
let g:tex_flavor='latex'

" this is mostly a matter of taste. but LaTeX looks good with just a bit
" of indentation.
"set sw=2
" TIP: if you write your \label's as \label{fig:something}, then if you
" type in \ref{fig: and press <C-n> you will automatically cycle through
" all the figure labels. Very useful!
set iskeyword+=:


