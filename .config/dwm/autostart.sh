#!/bin/sh

#urxvtd -q -o -f
mpd &
xautolock -corners 0-0- -cornersize 30 -time 5 -locker lscr &
/usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1 &
nm-applet &
xfce4-power-manager &
pamac-tray &
clipit &
blueman-applet &
ff-theme-util &
fix_xcursor &
reloadconfs &
xfsettingsd &
sxhkd &
spicetify &
