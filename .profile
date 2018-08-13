[[ -f ~/.bashrc ]] && . ~/.bashrc

export PATH=$PATH
export EDITOR="vim"
export TERMINAL="rxvt-unicode"
export BROWSER="chromium-browser"

if [[ "$(tty)" = "/dev/tty1" ]]; then
	pgrep i3 || startx
fi
