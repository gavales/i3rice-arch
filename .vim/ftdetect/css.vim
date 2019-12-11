if &compatible || v:version < 603
    finish
endif

autocmd BufNewFile,BufRead *.rasi,*.css set ft=css
"autocmd BufNewFile,BufRead goste   set ft=gostetoc
