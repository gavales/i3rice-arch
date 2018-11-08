[[ -f ~/.bashrc ]] && . ~/.bashrc

export PATH=$PATH
export QT_QPA_PLATFORMTHEME="qt5ct"
export GTK2_RC_FILES="$HOME/.gtkrc-2.0"
export EDITOR="vim"
export TERMINAL="rxvt-unicode"
export BROWSER="google-chrome-beta"

if [[ "$(tty)" = "/dev/tty1" ]]; then
	pgrep i3 || startx
fi
