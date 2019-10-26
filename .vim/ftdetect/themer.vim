if &compatible || v:version < 603
    finish
endif

autocmd BufNewFile,BufRead themer/*,template_* set ft=themer
