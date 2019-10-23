urxvtd -q -o -f                                                   &>/dev/null &
mpd                                                               &>/dev/null &
xautolock -corners 0-0- -cornersize 30 -time 5 -locker lockscreen &>/dev/null &
/usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1         &>/dev/null &
nm-applet                                                         &>/dev/null &
xfce4-power-manager                                               &>/dev/null &
pamac-tray                                                        &>/dev/null &
clipit                                                            &>/dev/null &
blueman-applet                                                    &>/dev/null &
compton                                                           &>/dev/null &
ff-theme-util                                                     &>/dev/null &
fix_xcursor                                                       &>/dev/null &
reloadconfs                                                       &>/dev/null &

userresources=$HOME/.Xresources
usermodmap=$HOME/.Xmodmap
sysresources=/etc/X11/xinit/.Xresources
sysmodmap=/etc/X11/xinit/.Xmodmap

DEFAULT_SESSION='i3 --shmlog-size 0'

# merge in defaults and keymaps

if [ -f $sysresources ]; then
    xrdb -merge $sysresources
fi

if [ -f $sysmodmap ]; then
    xmodmap $sysmodmap
fi

if [ -f "$userresources" ]; then
    xrdb -merge "$userresources"
fi

if [ -f "$usermodmap" ]; then
    xmodmap "$usermodmap"
fi

# start some nice programs

if [ -d /etc/X11/xinit/xinitrc.d ] ; then
    for f in /etc/X11/xinit/xinitrc.d/?*.sh ; do
        [ -x "$f" ] && . "$f"
    done
    unset f
fi

#get_session () {
#	local dbus_args=(--sh-syntax --exit-with-session)
#	case $1 in
#		awesome) dbus_args+=(awesome) ;;
#		bspwm) dbus_args+=(bspwm-session) ;;
#		budgie) dbus_args+=(budgie-desktop) ;;
#		cinnamon) dbus_args+=(cinnamon-session) ;;
#		deepin) dbus_args+=(startdde) ;;
#		enlightenment) dbus_args+=(enlightenment_start) ;;
#		fluxbox) dbus_args+=(startfluxbox) ;;
#		gnome) dbus_args+=(gnome-session) ;;
#		i3|i3wm) dbus_args+=(i3 --shmlog-size 0) ;;
#		jwm) dbus_args+=(jwm) ;;
#		kde) dbus_args+=(startkde) ;;
#		lxde) dbus_args+=(startlxde) ;;
#		lxqt) dbus_args+=(lxqt-session) ;;
#		mate) dbus_args+=(mate-session) ;;
#		xfce) dbus_args+=(xfce4-session) ;;
#		openbox) dbus_args+=(openbox-session) ;;
#		*) dbus_args+=($DEFAULT_SESSION) ;;
#	esac
#
#	echo "dbus-launch ${dbus_args[*]}"
#}
#
#exec $(get_session)

exec i3
