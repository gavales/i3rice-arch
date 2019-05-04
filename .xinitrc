[[ -f ~/.Xresources ]] && xrdb -merge ~/.Xresources
#/usr/bin/xcalib -d :0 -s 0 -v /home/gavarch/PROFILES/HV121WX4_110-6500K.icc
systemctl --user import-environment DISPLAY
exec i3
