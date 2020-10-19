#
# ~/.bash_profile
#

[[ -f ~/.bashrc ]] && . ~/.bashrc

export QT_QPA_PLATFORMTHEME="qt5ct"
export EDITOR=$HOME/scr/edtr
export GTK2_RC_FILES="$HOME/.gtkrc-2.0"
# fix "xdg-open fork-bomb" export your preferred browser from here
export BROWSER=/usr/bin/firefox
export TERMINAL=/usr/local/bin/st
#export TERMINAL=/usr/bin/urxvt
#export TWOMINAL=/usr/bin/urxvtc
export TWOMINAL=/usr/bin/urxvt
export TREMINAL=/usr/bin/xterm
export PATH="$PATH:$HOME/scr:$HOME/.config/gwm/bin"
export USER_I3LAUNCH_WS="1"
export USER_SCR_DIR="$HOME/scr"
export USER_TMP_DIR="$HOME/.tmp"
export USER_XRS_DIR="$HOME/xrs"
export USER_DRV_DIR="$HOME/Drive"
export USER_REPO_DIR="$HOME/git"
export XDG_DESKTOP_DIR="$HOME/dtp"
export XDG_DOWNLOAD_DIR="$HOME/dwn"
export XDG_TEMPLATES_DIR="$HOME/plt"
export XDG_PUBLICSHARE_DIR="$HOME/plc"
export XDG_DOCUMENTS_DIR="$HOME/doc"
export XDG_MUSIC_DIR="$HOME/mus"
export XDG_PICTURES_DIR="$HOME/pic"
export XDG_VIDEOS_DIR="$HOME/vid"
