#!/bin/sh

black=$(xrdb -query | grep '*color0' | awk '{print $NF}')
green=$(xrdb -query | grep '*color2' | awk '{print $NF}')
yellow=$(xrdb -query | grep '*color3' | awk '{print $NF}')
red=$(xrdb -query | grep '*color9' | awk '{print $NF}')
white=$(xrdb -query | grep '*color7' | awk '{print $NF}')
blue=$(xrdb -query | grep '*color4' | awk '{print $NF}')

t="99"

B="$black$t"  # blank
C="$white$t"  # clear ish
D="$blue$t"  # default
T="$white$t"  # text
W="$red$t"  # wrong
V="$green$t"  # verifying

i3lock \
--image=/home/gavarch/.config/wall.png \
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
