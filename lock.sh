#!/bin/sh

B='#002b3699'  # blank
C='#eee8d599'  # clear ish
D='#268bd299'  # default
T='#eee8d599'  # text
W='#dc322f99'  # wrong
V='#2aa19899'  # verifying

i3lock \
--insidevercolor=$B	\
--ringvercolor=$V	\
\
--insidewrongcolor=$W	\
--ringwrongcolor=$W	\
\
--insidecolor=$B	\
--ringcolor=$D		\
--linecolor=$B		\
--separatorcolor=$D	\
\
--verifcolor=$V		\
--wrongcolor=$W		\
--timecolor=$T		\
--datecolor=$T		\
--layoutcolor=$T	\
--keyhlcolor=$W		\
--bshlcolor=$W		\
\
--screen 0		\
--blur 5		\
--clock			\
--indicator		\
--timestr="%H:%M:%S"	\
--datestr="%A, %m %Y"	\
--keylayout 2		\
