#!/usr/bin/env python3
from i3ipc import Connection
from subprocess import call

i3 = Connection()

def wsnotify(i3, event):
	if event.change == 'focus':
		call('polybar-msg hook ws 1'.split(' '))

def windownotify(i3, event):
	if event.change == 'focus':
		call('polybar-msg hook wintitle 1'.split(' '))

#	if event.change == 'title':
#		call('polybar-msg hook wintitle 1'.split(' '))
#		call('i3media'.split(' '))

	if event.container.window_class == 'Spotify':
		if event.change == 'title':
			call('i3media'.split(' '))

	if event.container.window_class == 'mpv':
		if event.change == 'title':
			call('i3media'.split(' '))

	if event.change == "close":
		if event.container.window_class == 'mpv':
			if event.container.focused == True:
#				call('i3-msg [instance="MEDIA"] focus'.split(' '))
				call('i3-msg -q [class="Thunar"] focus'.split(' '))
	
		if event.container.window_role == 'pop-up':
			if event.container.focused == True:
				call('i3-msg -q [instance="google-chrome-beta"] focus'.split(' '))
	
		if event.container.window_class == 'Zathura':
			if event.container.focused == True:
				call('i3-msg -q [class="Thunar"] focus'.split(' '))
#				call('i3-msg [instance="FILES"] focus'.split(' '))
	
		if event.container.window_class == 'Sxiv':
			if event.container.focused == True:
				call('i3-msg -q [class="Thunar"] focus'.split(' '))
#				call('i3-msg [instance="MEDIA"] focus'.split(' '))
	
		if event.container.window_class == 'feh':
			if event.container.focused == True:
				call('i3-msg -q [instance="RTV"] focus'.split(' '))
	
		if event.container.window_class == 'mpv':
			if event.container.focused == True:
				call('i3-msg -q [instance="RTV"] focus'.split(' '))
	
	if event.container.window_class == 'Thunar':
		if event.container.focused == True:
			if event.change == 'title':
				call('thunarview'.split(' '))

def set_floating(i3, event):
	event.container.command('floating enable, border normal 1')

i3.on('window', windownotify)
i3.on('workspace', wsnotify)
i3.on('window::new', set_floating)

i3.main()

#	if event.container.fullscreen_mode == 0:
#		call('polybar-msg cmd show'.split(' '))
#	else:
#		call('polybar-msg cmd hide'.split(' '))
