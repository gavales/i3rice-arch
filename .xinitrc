[[ -f ~/.Xresources ]] && xrdb -merge ~/.Xresources
exec i3
exec polybar top
