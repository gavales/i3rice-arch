#!/usr/bin/env python3
from i3ipc import Connection
from subprocess import call

i3 = Connection()

def windownotify(i3, event):
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
                call('i3-msg [instance="FILES"] focus'.split(' '))

    if event.change == "close":
        if event.container.window_class == 'Sxiv':
            if event.container.focused == True:
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
            call('bash /home/gavarch/scripts/thunarview'.split(' '))

i3.on('window', windownotify)

i3.main()
