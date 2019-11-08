if &compatible || v:version < 603
    finish
endif

autocmd BufNewFile,BufRead *.goste set ft=goste
"autocmd BufNewFile,BufRead goste   set ft=gostetoc
