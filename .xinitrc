[[ -f ~/.Xresources ]] && xrdb -merge ~/.Xresources
systemctl --user import-environment DISPLAY
exec i3
exec polybar top
