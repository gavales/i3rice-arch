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

	if event.change == 'title':
		call('polybar-msg hook wintitle 1'.split(' '))
		call('polybar-msg hook media 1'.split(' '))

	if event.container.fullscreen_mode == 0:
		call('polybar-msg cmd show'.split(' '))
	else:
		call('polybar-msg cmd hide'.split(' '))

	if event.change == "close":
		if event.container.window_class == 'mpv':
			if event.container.focused == True:
				call('i3-msg [instance="MEDIA"] focus'.split(' '))
	
	if event.change == "close":
		if event.container.window_role == 'pop-up':
			if event.container.focused == True:
				call('i3-msg [instance="google-chrome-beta"] focus'.split(' '))
	
	if event.change == "close":
		if event.container.window_class == 'Zathura':
			if event.container.focused == True:
				call('i3-msg [class="Thunar"] focus'.split(' '))
				call('i3-msg [instance="FILES"] focus'.split(' '))
	
	if event.change == "close":
		if event.container.window_class == 'Sxiv':
			if event.container.focused == True:
				call('i3-msg [class="Thunar"] focus'.split(' '))
				call('i3-msg [instance="MEDIA"] focus'.split(' '))
	
	if event.change == "close":
		if event.container.window_class == 'feh':
			if event.container.focused == True:
				call('i3-msg [instance="RTV"] focus'.split(' '))
	
	if event.change == "close":
		if event.container.window_class == 'mpv':
			if event.container.focused == True:
				call('i3-msg [instance="RTV"] focus'.split(' '))
	
	if event.container.window_class == 'Thunar':
		if event.container.focused == True:
			if event.change == 'title':
				call('bash /home/gavarch/scr/thunarview'.split(' '))

#def set_floating(i3, event):
#	if event.container.window_class != 'URxvt':
#		event.container.command('floating enable, border normal 2')
#
#i3.on('window::new', set_floating)
i3.on('window', windownotify)
i3.on('workspace', wsnotify)

i3.main()
#	if event.container.window_instance == 'MEDIA':
#		if event.container.focused == True:
#			call('i3-msg mark _W2'.split(' '))
#
#	if event.container.window_instance == 'MUSIC':
#		if event.container.focused == True:
#			call('i3-msg mark _W3'.split(' '))

