#!/usr/bin/python
#import signal
#signal.signal(signal.SIGINT, signal.SIG_DFL)
import re
import os
import sys
import shutil
from PyQt4 import QtCore, QtGui

#################################################################################
#################################################################################
#################################################################################
#MOTIFCOLORS.PY BY JOS VAN RISWICK
#JOSVANR@GMAIL.COM
#GPL 3 
#VER1.2
#
#CAN BE USED AS STANDALONE SCRIPT BUT ALSO PART OF CDEPANEL 
#SCRIPT/XFCE THEME. SEE SOURCEFORGE
#################################################################################
#################################################################################
#################################################################################

#USAGE: SEE BOTTOM OF FILE
#USAGE: SEE BOTTOM OF FILE
#USAGE: SEE BOTTOM OF FILE
#USAGE: SEE BOTTOM OF FILE
#USAGE: SEE BOTTOM OF FILE

#todo put in class

bg=[0,0,0,0,0,0,0,0,0]
fg=[0,0,0,0,0,0,0,0,0]
bs=[0,0,0,0,0,0,0,0,0]
ts=[0,0,0,0,0,0,0,0,0]
sel=[0,0,0,0,0,0,0,0,0]

#introducing the legacy Motif thingies
XmCOLOR_LITE_SEL_FACTOR=15
XmCOLOR_LITE_BS_FACTOR=40
XmCOLOR_LITE_TS_FACTOR=20
XmCOLOR_LO_SEL_FACTOR=15
XmCOLOR_LO_BS_FACTOR=60
XmCOLOR_LO_TS_FACTOR=50
XmCOLOR_HI_SEL_FACTOR=15
XmCOLOR_HI_BS_FACTOR=40
XmCOLOR_HI_TS_FACTOR=60
XmCOLOR_DARK_SEL_FACTOR=15
XmCOLOR_DARK_BS_FACTOR=30
XmCOLOR_DARK_TS_FACTOR=50
XmRED_LUMINOSITY=0.30
XmGREEN_LUMINOSITY=0.59
XmBLUE_LUMINOSITY=0.11
XmINTENSITY_FACTOR=75
XmLIGHT_FACTOR=0
XmLUMINOSITY_FACTOR=25
XmMAX_SHORT=65535
XmDEFAULT_DARK_THRESHOLD=20
XmDEFAULT_LIGHT_THRESHOLD=93
XmDEFAULT_FOREGROUND_THRESHOLD=70
XmCOLOR_PERCENTILE = (XmMAX_SHORT / 100)
XmCOLOR_LITE_THRESHOLD = XmDEFAULT_LIGHT_THRESHOLD* XmCOLOR_PERCENTILE
XmCOLOR_DARK_THRESHOLD = XmDEFAULT_DARK_THRESHOLD* XmCOLOR_PERCENTILE
XmFOREGROUND_THRESHOLD = XmDEFAULT_FOREGROUND_THRESHOLD* XmCOLOR_PERCENTILE

HEX=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
HEXNUM=[4096,256,16,1]

def int2hex(n):
    if n==0: return '0000'
    h=''
    for a in HEXNUM:
        i=int(float(n)/a)
        h+=HEX[i]
        n-=i*a
    return h

palette=[
'#ed00a8007000',
'#9900991b99fe',
'#89559808aa00',
'#68006f008200',
'#c600b2d2a87e',
'#49009200a700',
'#b70087008d00',
'#938eab73bf00'
]

def encode16bpp(color):
    match=re.search('#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$',color)
    if match:
        a=match.group(1)
        b=match.group(2)
        c=match.group(3)
        return """#{a}{a}{b}{b}{c}{c}""".format(**locals())
    match=re.search('#[0-9a-fA-F]{12}$',color)
    if match:
        return color
    return "#888888888888";

#convert to rgb array
def bbpToRGB(hexcolor):
    rgb=[]
    match=re.search('#(....)(....)(....)',hexcolor)
    if match:
        rgb.append(int(match.group(1),16))
        rgb.append(int(match.group(2),16))
        rgb.append(int(match.group(3),16))
        return rgb
    match=re.search('#(..)(..)(..)',hexcolor)
    if match:
        rgb.append(int(match.group(1),16))
        rgb.append(int(match.group(2),16))
        rgb.append(int(match.group(3),16))
        return rgb
    return [0,0,0]

def Brightness(color):
    red = color[0]
    green = color[1]    
    blue = color[2]
    intensity = (red + green + blue) / 3.0
    luminosity = int ((XmRED_LUMINOSITY * red) + (XmGREEN_LUMINOSITY * green) + (XmBLUE_LUMINOSITY * blue))
    ma=0
    if red>green:
        if red>blue: ma=red
        else: ma=blue
    else:
        if green>blue: ma=green
        else: ma=blue
    mi=0
    if red<green:
        if red<blue:mi=red
        else: mi=blue
    else:
        if green<blue:mi=green
        else: mi=blue
    light = (mi+ ma) / 2.0
    brightness = ( (intensity * XmINTENSITY_FACTOR) + (light * XmLIGHT_FACTOR) + (luminosity * XmLUMINOSITY_FACTOR) ) / 100.0
    return brightness

def CalculateColorsForDarkBackground(bg_color):
    fg_color=[0,0,0]
    sel_color=[0,0,0]
    bs_color=[0,0,0]
    ts_color=[0,0,0]
    brightness=Brightness(bg_color)
    if brightness > XmFOREGROUND_THRESHOLD:
        fg_color[0]= 0 
        fg_color[1]= 0 
        fg_color[2]= 0
    else:
        fg_color[0]= XmMAX_SHORT 
        fg_color[1]= XmMAX_SHORT 
        fg_color[2]= XmMAX_SHORT
    color_value = bg_color[0] 
    color_value += XmCOLOR_DARK_SEL_FACTOR * (XmMAX_SHORT - color_value) / 100.0 
    sel_color[0] = color_value
    color_value = bg_color[1] 
    color_value += XmCOLOR_DARK_SEL_FACTOR * (XmMAX_SHORT - color_value) / 100.0    
    sel_color[1] = color_value
    color_value = bg_color[2] 
    color_value += XmCOLOR_DARK_SEL_FACTOR * (XmMAX_SHORT - color_value) / 100.0
    sel_color[2] = color_value
    color_value = bg_color[0] 
    color_value += XmCOLOR_DARK_BS_FACTOR * (XmMAX_SHORT - color_value) / 100.0 
    bs_color[0] = color_value
    color_value = bg_color[0]
    color_value += XmCOLOR_DARK_BS_FACTOR * (XmMAX_SHORT - color_value) / 100.0 
    bs_color[1] = color_value
    color_value = bg_color[2]
    color_value += XmCOLOR_DARK_BS_FACTOR * (XmMAX_SHORT - color_value) / 100.0 
    bs_color[2] = color_value
    color_value = bg_color[0]
    color_value += XmCOLOR_DARK_TS_FACTOR * (XmMAX_SHORT - color_value) / 100.0 
    ts_color[0] = color_value
    color_value = bg_color[1]
    color_value += XmCOLOR_DARK_TS_FACTOR * (XmMAX_SHORT - color_value) / 100.0 
    ts_color[1] = color_value
    color_value = bg_color[2]
    color_value += XmCOLOR_DARK_TS_FACTOR * (XmMAX_SHORT - color_value) / 100.0 
    ts_color[2] = color_value
    return fg_color,sel_color,bs_color,ts_color

def CalculateColorsForLightBackground(bg_color):
    fg_color=[0,0,0]
    sel_color=[0,0,0]
    bs_color=[0,0,0]
    ts_color=[0,0,0]
    brightness=Brightness(bg_color)
    if (brightness > XmFOREGROUND_THRESHOLD):
        fg_color[0] = 0
        fg_color[1] = 0
        fg_color[2] = 0
    else:
        fg_color[0] = XmMAX_SHORT
        fg_color[1] = XmMAX_SHORT
        fg_color[2] = XmMAX_SHORT
    color_value = bg_color[0]
    color_value -= (color_value * XmCOLOR_LITE_SEL_FACTOR) / 100.0
    sel_color[0] = color_value
    color_value = bg_color[1]
    color_value -= (color_value * XmCOLOR_LITE_SEL_FACTOR) / 100.0
    sel_color[1] = color_value
    color_value = bg_color[2]
    color_value -= (color_value * XmCOLOR_LITE_SEL_FACTOR) / 100.0
    sel_color[2] = color_value
    color_value = bg_color[0]
    color_value -= (color_value * XmCOLOR_LITE_BS_FACTOR) / 100.0
    bs_color[0] = color_value
    color_value = bg_color[1]
    color_value -= (color_value * XmCOLOR_LITE_BS_FACTOR) / 100.0
    bs_color[1] = color_value
    color_value = bg_color[2]
    color_value -= (color_value * XmCOLOR_LITE_BS_FACTOR) / 100.0
    bs_color[2] = color_value
    color_value = bg_color[0]
    color_value -= (color_value * XmCOLOR_LITE_TS_FACTOR) / 100.0
    ts_color[0] = color_value
    color_value = bg_color[1]
    color_value -= (color_value * XmCOLOR_LITE_TS_FACTOR) / 100.0
    ts_color[1] = color_value
    color_value = bg_color[2]
    color_value -= (color_value * XmCOLOR_LITE_TS_FACTOR) / 100.0
    ts_color[2] = color_value
    return (fg_color,sel_color,bs_color,ts_color)

def CalculateColorsForMediumBackground(bg_color):
    fg_color=[0,0,0]
    sel_color=[0,0,0]
    bs_color=[0,0,0]
    ts_color=[0,0,0]
    brightness=Brightness(bg_color)
    if (brightness > XmFOREGROUND_THRESHOLD):
        fg_color[0] = 0
        fg_color[1] = 0
        fg_color[2] = 0
    else:
        fg_color[0] = XmMAX_SHORT
        fg_color[1] = XmMAX_SHORT
        fg_color[2] = XmMAX_SHORT
    f = XmCOLOR_LO_SEL_FACTOR + (brightness * ( XmCOLOR_HI_SEL_FACTOR - XmCOLOR_LO_SEL_FACTOR ) / XmMAX_SHORT)
    color_value = bg_color[0]
    color_value -= (color_value * f) / 100.0
    sel_color[0] = color_value
    color_value = bg_color[1]
    color_value -= (color_value * f) / 100.0
    sel_color[1] = color_value
    color_value = bg_color[2]
    color_value -= (color_value * f) / 100.0
    sel_color[2] = color_value
    f = XmCOLOR_LO_BS_FACTOR + (brightness * ( XmCOLOR_HI_BS_FACTOR - XmCOLOR_LO_BS_FACTOR ) / XmMAX_SHORT)
    color_value = bg_color[0]
    color_value -= (color_value * f) / 100.0
    bs_color[0] = color_value
    color_value = bg_color[1]
    color_value -= (color_value * f) / 100.0
    bs_color[1] = color_value
    color_value = bg_color[2]
    color_value -= (color_value * f) / 100.0
    bs_color[2] = color_value
    f = XmCOLOR_LO_TS_FACTOR + (brightness * ( XmCOLOR_HI_TS_FACTOR - XmCOLOR_LO_TS_FACTOR ) / XmMAX_SHORT)
    color_value = bg_color[0]
    color_value += f * ( XmMAX_SHORT - color_value ) / 100.0
    ts_color[0] = color_value
    color_value = bg_color[1]
    color_value += f * ( XmMAX_SHORT - color_value ) / 100.0
    ts_color[1] = color_value
    color_value = bg_color[2]
    color_value += f * ( XmMAX_SHORT - color_value ) / 100.0
    ts_color[2] = color_value
    return (fg_color,sel_color,bs_color,ts_color)


def rgbToHex(rgb):
    a=int2hex(rgb[0])
    b=int2hex(rgb[1])
    c=int2hex(rgb[2])
    return """#{a}{b}{c}""".format(**locals())

def equal_colors_ab(a,b):
    bg[a]=bg[b]
    fg[a]=fg[b]
    bs[a]=bs[b]
    ts[a]=ts[b]
    sel[a]=sel[b]
    

def initcolors(palette):
    for a in range(1,9):
        color16=encode16bpp(palette[a-1])
        bg_color=bbpToRGB(color16)
        backgroundbrightness=Brightness(bg_color)
        if backgroundbrightness< XmCOLOR_DARK_THRESHOLD:
            (fg_color,sel_color,bs_color,ts_color)= CalculateColorsForDarkBackground(bg_color)
        elif backgroundbrightness> XmCOLOR_LITE_THRESHOLD:
            (fg_color,sel_color,bs_color,ts_color)= CalculateColorsForLightBackground(bg_color)
        else:
            (fg_color,sel_color,bs_color,ts_color)= CalculateColorsForMediumBackground(bg_color)
        #bg[a]=encode16bpp(palette[a-1])
        bg[a]=color16
        fg[a]=rgbToHex(fg_color)
        bs[a]=rgbToHex(bs_color)
        ts[a]=rgbToHex(ts_color)
        sel[a]=rgbToHex(sel_color)
    if use_4_colors:
        equal_colors_ab(5,2)
        equal_colors_ab(6,2)
        equal_colors_ab(8,2)
        equal_colors_ab(7,2)

def round_colors_6():
    for a in range(1,9):
        bg[a]='#'+bg[a][1:3]+bg[a][5:7]+bg[a][9:11]
        fg[a]='#'+fg[a][1:3]+fg[a][5:7]+fg[a][9:11]
        bs[a]='#'+bs[a][1:3]+bs[a][5:7]+bs[a][9:11]
        ts[a]='#'+ts[a][1:3]+ts[a][5:7]+ts[a][9:11]
        sel[a]='#'+sel[a][1:3]+sel[a][5:7]+sel[a][9:11]

def readPalette(filename):
    with open(filename) as f:lines=f.read().splitlines() 
    return lines
    
use_4_colors=False

def readMotifColors2(n,filename):
    global use_4_colors
    palette=readPalette(filename)
    if n==4: 
        use_4_colors=True
    else: 
        use_4_colors=False
    initcolors(palette)
    round_colors_6()
    colors={}
    for a in range(1,9):
        colors['bg_color_'+str(a)]=bg[a]
        colors['fg_color_'+str(a)]=fg[a]
        colors['ts_color_'+str(a)]=ts[a]
        colors['bs_color_'+str(a)]=bs[a]
        colors['sel_color_'+str(a)]=sel[a]
    return colors

# LIKE IN CDE, THE SOURCE XPM MUST HAVE 4 COLORS DEFINED: 
# ts_color, bg_color, sel_color and bs_color
def colorize_bg(infile,outfile,palettefile,n,colorsetnr):
    palette=readPalette(palettefile)
    global use_4_colors
    if n==4: 
        use_4_colors=True
    else: 
        use_4_colors=False
    initcolors(palette)
    round_colors_6()
    with open(infile) as f:lines=f.read().splitlines() 
    for i in range(0,20): #color defs are somewheres in the first 20 lines or so
        lines[i]=re.sub('ts_color',ts[colorsetnr],lines[i]) 
        lines[i]=re.sub('bg_color',bg[colorsetnr],lines[i]) 
        lines[i]=re.sub('bs_color',bs[colorsetnr],lines[i]) 
        lines[i]=re.sub('sel_color',sel[colorsetnr],lines[i]) 
    with open(outfile, 'w') as f: 
        for l in lines:
            f.write(l)

#move to ThemeXfce.py
def writethemerc(filename,palettefile,n):
    palette=readPalette(palettefile)
    global use_4_colors
    if n==4: 
        use_4_colors=True
    else: 
        use_4_colors=False
    initcolors(palette)
    round_colors_6()
    bgg=bg
    tsg=ts
    bsg=bs
    fgg=fg
    lines="""\
#XFCE Themerc for CDE Palette: {palettefile}
active_text_color={fgg[1]}
inactive_text_color={fgg[2]}
button_offset=0
button_spacing=0
full_width_title=true
maximized_offset=0
shadow_delta_height=0
shadow_delta_width=0
shadow_delta_x=0
shadow_delta_y=0
shadow_opacity=0
show_app_icon=false
title_horizontal_offset=1
title_shadow_active=false
title_shadow_inactive=false
title_vertical_offset_active=1
title_vertical_offset_inactive=1
active_color_1={bgg[1]}
active_hilight_1={tsg[1]}
active_shadow_1={bsg[1]}
inactive_color_1={bgg[2]}
inactive_hilight_1={tsg[2]}
inactive_shadow_1={bsg[2]}
    """.format(**locals())
    with open(filename, 'w') as f: 
        for l in lines:
            f.write(l)






#GENGTKRC2#######################################################
def gengtkrc(filename,palettefile,n):
    palette=readPalette(palettefile)
    global use_4_colors
    if n==4: 
        use_4_colors=True
    else: 
        use_4_colors=False
    initcolors(palette)
    round_colors_6()

    lines="""
#
# Generated by MotifColors.py/cdepanel.py for palette {palettefile}
# Edits will be overwritten
#
    """.format(**locals())


    #apparently this is necessary
    #make it default color scheme 5
    bgg=bg[5]
    tsg=ts[5]
    bsg=bs[5]
    fgg=fg[5]
    selg=sel[5]
    lines+="""
gtk-color-scheme = "base_color:{bgg}\\nfg_color:{fgg}\\ntooltip_fg_color:{fgg}\\nselected_bg_color:{selg}\\nselected_fg_color:{fgg}\\ntext_color:{fgg}\\nbg_color:{bgg}\\ninsensitive_bg_color:{selg}\\ntooltip_bg_color:{selg}"
    """.format(**locals())

    lines+="""
style "cde_style_bg_hi" 
{{
    fg[NORMAL]  ="{fgg}"
    bg[NORMAL]  ="{bgg}"
    text[NORMAL]="{fgg}"
    base[NORMAL]="{bgg}"

    fg[ACTIVE]  ="{fgg}"
    bg[ACTIVE]  ="{selg}"
    text[ACTIVE]="{fgg}"
    base[ACTIVE]="{selg}"

    fg[PRELIGHT]="{fgg}"
    bg[PRELIGHT]="{bgg}"
    text[PRELIGHT]="{fgg}"
    base[PRELIGHT] ="{bgg}"

    fg[SELECTED]="{bgg}"
    bg[SELECTED]="{fgg}"
    text[SELECTED]="{fgg}"
    base[SELECTED]="{selg}"

    fg[INSENSITIVE]="{fgg}"
    bg[INSENSITIVE]="{tsg}"
    text[INSENSITIVE]="{fgg}"
    base[INSENSITIVE]="{tsg}"
}}
    """.format(**locals())

    for a in range(1,9):
        bgg=bg[a]
        tsg=ts[a]
        bsg=bs[a]
        fgg=fg[a]
        selg=sel[a]
        lines+="""
style "cde_style_white_fg_{a}"
{{
    fg[NORMAL]  ="#ffffffffffff"
    bg[NORMAL]  ="{bgg}"
    text[NORMAL]="#ffffffffffff"
    base[NORMAL]="{bgg}"

    fg[ACTIVE]  ="#ffffffffffff"
    bg[ACTIVE]  ="{selg}"
    text[ACTIVE]="#ffffffffffff"
    base[ACTIVE]="{selg}"

    fg[PRELIGHT]="#ffffffffffff"
    bg[PRELIGHT]="{bgg}"
    text[PRELIGHT]="#ffffffffffff"
    base[PRELIGHT] ="{bgg}"

    fg[SELECTED]="#ffffffffffff"
    bg[SELECTED]="{selg}"
    text[SELECTED]="#ffffffffffff"
    base[SELECTED]="{selg}"

    fg[INSENSITIVE]="#ffffffffffff"
    bg[INSENSITIVE]="{tsg}"
    text[INSENSITIVE]="#ffffffffffff"
    base[INSENSITIVE]="{tsg}"
}}
        """.format(**locals())

    for a in range(1,9):
        bgg=bg[a]
        tsg=ts[a]
        bsg=bs[a]
        fgg=fg[a]
        selg=sel[a]
        lines+="""
style "cde_style_dark_fg_{a}"
{{
    fg[NORMAL]  ="{bsg}"
    bg[NORMAL]  ="{bgg}"
    text[NORMAL]="{bsg}"
    base[NORMAL]="{bgg}"

    fg[ACTIVE]  ="{bsg}"
    bg[ACTIVE]  ="{selg}"
    text[ACTIVE]="{bsg}"
    base[ACTIVE]="{selg}"

    fg[PRELIGHT]="{bsg}"
    bg[PRELIGHT]="{bgg}"
    text[PRELIGHT]="{bsg}"
    base[PRELIGHT] ="{bgg}"

    fg[SELECTED]="{bsg}"
    bg[SELECTED]="{selg}"
    text[SELECTED]="{bsg}"
    base[SELECTED]="{selg}"

    fg[INSENSITIVE]="{bsg}"
    bg[INSENSITIVE]="{tsg}"
    text[INSENSITIVE]="{bsg}"
    base[INSENSITIVE]="{tsg}"
}}
""".format(**locals())

    for a in range(1,9):
        bgg=bg[a]
        tsg=ts[a]
        bsg=bs[a]
        fgg=fg[a]
        selg=sel[a]
        lines+="""
style "cde_style_{a}"
{{
    fg[NORMAL]  ="{fgg}"
    bg[NORMAL]  ="{bgg}"
    text[NORMAL]="{fgg}"
    base[NORMAL]="{bgg}"

    fg[ACTIVE]  ="{fgg}"
    bg[ACTIVE]  ="{selg}"
    text[ACTIVE]="{fgg}"
    base[ACTIVE]="{selg}"

    fg[PRELIGHT]="{fgg}"
    bg[PRELIGHT]="{bgg}"
    text[PRELIGHT]="{fgg}"
    base[PRELIGHT] ="{bgg}"

    fg[SELECTED]="{bgg}"
    bg[SELECTED]="{fgg}"
    text[SELECTED]="{bgg}"
    base[SELECTED]="{fgg}"

    fg[INSENSITIVE]="{fgg}"
    bg[INSENSITIVE]="{tsg}"
    text[INSENSITIVE]="{fgg}"
    base[INSENSITIVE]="{tsg}"
}}
""".format(**locals())

    for a in range(1,9):
        bgg=bg[a]
        tsg=ts[a]
        bsg=bs[a]
        fgg=fg[a]
        selg=sel[a]
        lines+="""
style "cde_style_sel_{a}"
{{
    fg[NORMAL]  ="{fgg}"
    bg[NORMAL]  ="{selg}"
    text[NORMAL]="{fgg}"
    base[NORMAL]="{selg}"

    fg[ACTIVE]  ="{fgg}"
    bg[ACTIVE]  ="{bgg}"
    text[ACTIVE]="{fgg}"
    base[ACTIVE]="{bgg}"

    fg[PRELIGHT]="{fgg}"
    bg[PRELIGHT]="{bsg}"
    text[PRELIGHT]="{fgg}"
    base[PRELIGHT] ="{bsg}"

    fg[SELECTED]="{fgg}"
    bg[SELECTED]="{bsg}"
    text[SELECTED]="{fgg}"
    base[SELECTED]="{bsg}"

    fg[INSENSITIVE]="{fgg}"
    bg[INSENSITIVE]="{selg}"
    text[INSENSITIVE]="{fgg}"
    base[INSENSITIVE]="{selg}"
}}
""".format(**locals())

    for a in range(1,9):
        bgg=bg[a]
        tsg=ts[a]
        bsg=bs[a]
        fgg=fg[a]
        selg=sel[a]
        lines+="""
style "cde_prelight_style_{a}"
{{
    fg[NORMAL]  ="{fgg}"
    bg[NORMAL]  ="{bgg}"
    text[NORMAL]="{fgg}"
    base[NORMAL]="{bgg}"

    fg[ACTIVE]  ="{fgg}"
    bg[ACTIVE]  ="{selg}"
    text[ACTIVE]="{fgg}"
    base[ACTIVE]="{selg}"

    fg[PRELIGHT]="{fgg}"
    bg[PRELIGHT]="{selg}"
    text[PRELIGHT]="{fgg}"
    base[PRELIGHT] ="{selg}"

    fg[SELECTED]="{fgg}"
    bg[SELECTED]="{selg}"
    text[SELECTED]="{fgg}"
    base[SELECTED]="{selg}"

    fg[INSENSITIVE]="{fgg}"
    bg[INSENSITIVE]="{tsg}"
    text[INSENSITIVE]="{fgg}"
    base[INSENSITIVE]="{tsg}"
}}
""".format(**locals())




    #this has become static gtkrc with inclued cdecolrs.rc
    if False:
        #python = perl * 10
        def gtkrcwidget(s,n):
            return """
        widget "*{s}*" style "{n}" 
        class "*{s}*" style "{n}" 
        widget_class "*{s}*" style "{n}" 
        """.format(**locals())

        def widgetclass(s,n):
            return """
        widget_class "{s}" style "{n}"
            """.format(**locals())

        lines+="""#Oh Yes... """

        #lines+=""" gtk_color_scheme = "bg_color:#222222\nselected_bg_color:#332222\nbase_color:#223322"\n """

        lines+=widgetclass('*','cde_style_5')
        lines+=widgetclass('*GtkWindow*','cde_style_5')
        lines+=widgetclass('*Dialog*','cde_style_6')
        lines+=widgetclass('*MenuBar*','cde_style_6')
        lines+=widgetclass('*GtkMenu*','cde_style_6')
        lines+=widgetclass('*ToolBar*','cde_style_5')
        lines+=widgetclass('*List*','cde_style_4')
        lines+=widgetclass('*Text*','cde_style_4');
        lines+=widgetclass('*Edit*','cde_style_4');
        #Qt GTK+ enginge applies thisone to the list widget:
        lines+=widgetclass('*Tree*','cde_style_4');
        lines+=widgetclass('*Combo*','cde_style_4');
        #lines+=widgetclass('*Label*','cde_style_4');
        #lines+=widgetclass('*Entry*','cde_style_4');

        #lines+=widgetclass('*Paned*','cde_style_2');
        #lines+=widgetclass('*Container*','cde_style_2');
        #lines+=widgetclass('*GtkBox*','cde_style_2');
        #lines+=widgetclass('*GtkButtonBox*','cde_style_2');
        lines+=widgetclass('*GtkCell*','cde_style_sel_5');
        lines+=widgetclass('*Icon*','cde_style_sel_5');
        #lines+=widgetclass('*Box*','cde_style_2');
        #lines+=widgetclass('*Viewport*','cde_style_1');
        #lines+=widgetclass('*ScrolledWindow*','cde_style_1');#file dinges en zo/list
        #hmmm well..
        #lines+=gtkrcwidget('Menu','cde_style_6')
        #lines+=gtkrcwidget('GtkDialog','cde_style_6')
        #lines+=gtkrcwidget('GtkMenuBar','cde_style_6')
        #lines+=gtkrcwidget('GtkInfoBar','cde_style_5')
        #lines+=gtkrcwidget('GtkStatusBar','cde_style_5')
        #lines+=gtkrcwidget('Scroll','cde_style_6')
        #lines+=gtkrcwidget('List','cde_style_4')
        #lines+=gtkrcwidget('Text','cde_style_4');
        #lines+=gtkrcwidget('Edit','cde_style_4');
        #Qt GTK+ enginge applies thisone to the list widget:
        #lines+=gtkrcwidget('Tree','cde_style_4');
        #lines+=gtkrcwidget('Combo','cde_style_4');
        #lines+=gtkrcwidget('Label','cde_style_4');
        #lines+=gtkrcwidget('Entry','cde_style_4');


    with open(filename, 'w') as f: 
        for l in lines:
            f.write(l)

#END GENGTKRC2#######################################################






# /home/jos/.config/gtk-3.0/config.1.css
# /home/jos/.config/gtk-3.0/config.css
#def gengtkrc3 {
	#my ($filename)=@_;
	#my $a;
    #open(OUTFILE,">$filename" ); 




#not used
#gtkrc is now static except for colros
#GENGTKRC3.0#######################################################
def gengtkrc3(filename,palettefile,n):
    palette=readPalette(palettefile)
    global use_4_colors
    if n==4: 
        use_4_colors=True
    else: 
        use_4_colors=False
    initcolors(palette)
    round_colors_6()
    bgg=bg
    tsg=ts
    bsg=bs
    fgg=fg
    selg=sel
    lines=''
    lines+="""
#
# Generated by MotifColors.py/cdepanel.py for palette {palettefile}
#
@define-color bg_color_1 {bgg[1]}; 
@define-color bg_color_2 {bgg[2]}; 
@define-color bg_color_3 {bgg[3]}; 
@define-color bg_color_4 {bgg[4]}; 
@define-color bg_color_5 {bgg[5]}; 
@define-color bg_color_6 {bgg[6]}; 
@define-color bg_color_7 {bgg[7]}; 
@define-color bg_color_8 {bgg[8]}; 
 
@define-color fg_color_1 {fgg[1]}; 
@define-color fg_color_2 {fgg[2]}; 
@define-color fg_color_3 {fgg[3]}; 
@define-color fg_color_4 {fgg[4]}; 
@define-color fg_color_5 {fgg[5]}; 
@define-color fg_color_6 {fgg[6]}; 
@define-color fg_color_7 {fgg[7]}; 
@define-color fg_color_8 {fgg[8]}; 

@define-color ts_color_1 {tsg[1]}; 
@define-color ts_color_2 {tsg[2]}; 
@define-color ts_color_3 {tsg[3]}; 
@define-color ts_color_4 {tsg[4]}; 
@define-color ts_color_5 {tsg[5]}; 
@define-color ts_color_6 {tsg[6]}; 
@define-color ts_color_7 {tsg[7]}; 
@define-color ts_color_8 {tsg[8]}; 

@define-color sel_color_1 {selg[1]}; 
@define-color sel_color_2 {selg[2]}; 
@define-color sel_color_3 {selg[3]}; 
@define-color sel_color_4 {selg[4]}; 
@define-color sel_color_5 {selg[5]}; 
@define-color sel_color_6 {selg[6]}; 
@define-color sel_color_7 {selg[7]}; 
@define-color sel_color_8 {selg[8]}; 

@define-color bs_color_1 {bsg[1]}; 
@define-color bs_color_2 {bsg[2]}; 
@define-color bs_color_3 {bsg[3]}; 
@define-color bs_color_4 {bsg[4]}; 
@define-color bs_color_5 {bsg[5]}; 
@define-color bs_color_6 {bsg[6]}; 
@define-color bs_color_7 {bsg[7]}; 
@define-color bs_color_8 {bsg[8]}; 

@define-color bg_color {bgg[5]}; /* element id 0 - bg[NORMAL] */ 
@define-color prelight_bg_color {bgg[5]}; /* element id 1 - bg[PRELIGHT] */ 
@define-color selected_bg_color {selg[5]}; /* element id 2 - bg[SELECTED] */ 
@define-color active_bg_color {bgg[5]}; /* element id 3 - bg[ACTIVE] */ 
@define-color intensitive_bg_color {bgg[5]}; /* element id 4 - bg[INTENSITIVE] */ 
@define-color fg_color {fgg[5]}; /* element id 5 - fg[NORMAL] */ 
@define-color prelight_fg_color {fgg[5]}; /* element id 6 - fg[PRELIGHT] */ 
@define-color selected_fg_color {fgg[5]}; /* element id 7 - fg[SELECTED] */ 
@define-color active_fg_color {fgg[5]}; /* element id 8 - fg[ACTIVE] */ 
@define-color intensitive_fg_color {tsg[5]}; /* element id 9 - fg[INTENSITIVE] */ 
@define-color base_color {bgg[4]}; /* element id 10 - base[NORMAL] */ 
@define-color prelight_base_color {bgg[4]}; /* element id 11 - base[PRELIGHT] */ 
@define-color selected_base_color {bgg[4]}; /* element id 12 - base[SELECTED] */ 
@define-color active_base_color {bgg[4]}; /* element id 13 - base[ACTIVE] */ 
@define-color intensitive_base_color {bgg[4]}; /* element id 14 - base[INTENSITIVE] */ 
@define-color text_color {fgg[4]}; /* element id 15 - text[NORMAL] */ 
@define-color prelight_text_color {fgg[4]}; /* element id 16 - text[PRELIGHT] */ 
@define-color selected_text_color {fgg[4]}; /* element id 17 - text[SELECTED] */ 
@define-color active_text_color {fgg[4]}; /* element id 18 - text[ACTIVE] */ 
@define-color intensitive_text_color {tsg[4]}; /* element id 19 - text[INTENSITIVE] */ 
@define-color link_color {fgg[4]}; /* link - element id- 81 */
@define-color visited_link_color {fgg[4]}; /* visited link - element id 82 */
@define-color panel_bg_color {bgg[2]}; /* window background - element id 26 */ 
@define-color panel_prelight_bg_color {bgg[2]}; /* window background - element id 27 */ 
@define-color panel_selected_bg_color {bgg[2]}; /* selected background - element id 28 */ 
@define-color panel_active_bg_color {bgg[2]}; /* window background - element id 29 */ 
@define-color panel_intensitive_bg_color {bgg[2]}; /* window background - element id 30 */ 
@define-color panel_fg_color {bgg[2]}; /* window foreground - element id 31 */
@define-color panel_prelight_fg_color {bgg[2]}; /* window foreground - element id 32 */
@define-color panel_selected_fg_color {bgg[2]}; /* selected foreground - element id 33 */
@define-color panel_active_fg_color {bgg[2]}; /* window foreground - element id 34 */
@define-color panel_intensitive_fg_color {tsg[2]}; /* window foreground - element id 35 */
@define-color scrollbar_bg_color {bgg[5]}; /* scrollbar background - element id 44 */ 
@define-color scrollbar_prelight_bg_color {bgg[5]}; /* scrollbar background - element id 45 */ 
@define-color scrollbar_active_bg_color {bgg[5]}; /* scrollbar background - element id 46 */ 
@define-color progressbar_bg_color {bgg[5]}; /* progressbar background - element id 48 */ 
@define-color tooltip_bg_color {bgg[2]}; /* tooltip background - element id 51 */ 
@define-color tooltip_fg_color {fgg[2]}; /* tooltip foreground - element id 78 */ 
@define-color button_bg_color {bgg[5]}; /* button background - element id 83 */ 
@define-color button_prelight_bg_color {bgg[5]}; /* button background - element id 84 */ 
@define-color button_selected_bg_color {bgg[5]}; /* selected background - element id 85 */ 
@define-color button_active_bg_color {bgg[5]}; /* button background - element id 86 */ 
@define-color button_insensitive_bg_color {bgg[5]}; /* button background - element id 87 */ 
@define-color button_fg_color {fgg[5]}; /* button foreground - element id  88 */ 
@define-color button_prelight_fg_color {bgg[5]}; /* button foreground - element id  89 */ 
@define-color button_active_fg_color {bgg[5]}; /* button foreground - element id  91 */ 
@define-color button_intensitive_fg_color {tsg[5]}; /* button foreground - element id  92 */ 
@define-color combobox_fg_color {fgg[5]}; /* combobox foreground - element id 94 */
@define-color combobox_prelight_fg_color {fgg[5]}; /* combobox foreground - element id 95 */
@define-color combobox_active_fg_color {fgg[6]}; /* combobox foreground - element id 97 */
@define-color combobox_intensitive_fg_color {tsg[6]}; /* combobox foreground - element id 98 */
@define-color info_fg_color {fgg[6]};
@define-color info_bg_color {bgg[6]};
@define-color warning_fg_color {fgg[6]};
@define-color warning_bg_color {bgg[6]};
@define-color question_fg_color {fgg[6]};
@define-color question_bg_color {bgg[6]};
@define-color error_fg_color {fgg[6]};
@define-color error_bg_color {bgg[6]};
@define-color error_color {fgg[6]};
@define-color dark_bg_color {bgg[6]};
@define-color dark_fg_color {fgg[6]};
@define-color menu_item_color  {bgg[6]};
@define-color transparent rgba (0, 0, 0, 0);
    """.format(**locals())

    with open(filename, 'w') as f: 
        for l in lines:
            f.write(l)





#not used, gtkrc is now static except colors
#GENGTKRC3.2#######################################################
def gengtkrc32(filename,palettefile,n):
    palette=readPalette(palettefile)
    global use_4_colors
    if n==4: 
        use_4_colors=True
    else: 
        use_4_colors=False
    initcolors(palette)
    round_colors_6()
    bgg=bg
    tsg=ts
    bsg=bs
    fgg=fg
    selg=sel
    lines=''
    lines+="""
/*CDE color scheme*/
@define-color white_color #ffffff;
@define-color lighter_color {selg[6]};
@define-color base_color {bgg[6]};
@define-color darker_color {bsg[6]};
@define-color black_color #000000;
@define-color scale_color {tsg[6]};
    """.format(**locals())

    with open(filename, 'w') as f: 
        for l in lines:
            f.write(l)


#GENGTKRC3 color defs #######################################################
def gengtkrc3colordefs(filename,palettefile,n):
    palette=readPalette(palettefile)
    global use_4_colors
    if n==4: 
        use_4_colors=True
    else: 
        use_4_colors=False
    initcolors(palette)
    round_colors_6()
    bgg=bg
    tsg=ts
    bsg=bs
    fgg=fg
    selg=sel
    lines=''
    lines+="""


/*
 Generated by MotifColors.py/cdepanel.py for palette {palettefile}
 Edits will be overwritten
*/

@define-color bg_color_1 {bgg[1]}; 
@define-color bg_color_2 {bgg[2]}; 
@define-color bg_color_3 {bgg[3]}; 
@define-color bg_color_4 {bgg[4]}; 
@define-color bg_color_5 {bgg[5]}; 
@define-color bg_color_6 {bgg[6]}; 
@define-color bg_color_7 {bgg[7]}; 
@define-color bg_color_8 {bgg[8]}; 
 
@define-color fg_color_1 {fgg[1]}; 
@define-color fg_color_2 {fgg[2]}; 
@define-color fg_color_3 {fgg[3]}; 
@define-color fg_color_4 {fgg[4]}; 
@define-color fg_color_5 {fgg[5]}; 
@define-color fg_color_6 {fgg[6]}; 
@define-color fg_color_7 {fgg[7]}; 
@define-color fg_color_8 {fgg[8]}; 

@define-color ts_color_1 {tsg[1]}; 
@define-color ts_color_2 {tsg[2]}; 
@define-color ts_color_3 {tsg[3]}; 
@define-color ts_color_4 {tsg[4]}; 
@define-color ts_color_5 {tsg[5]}; 
@define-color ts_color_6 {tsg[6]}; 
@define-color ts_color_7 {tsg[7]}; 
@define-color ts_color_8 {tsg[8]}; 

@define-color sel_color_1 {selg[1]}; 
@define-color sel_color_2 {selg[2]}; 
@define-color sel_color_3 {selg[3]}; 
@define-color sel_color_4 {selg[4]}; 
@define-color sel_color_5 {selg[5]}; 
@define-color sel_color_6 {selg[6]}; 
@define-color sel_color_7 {selg[7]}; 
@define-color sel_color_8 {selg[8]}; 

@define-color bs_color_1 {bsg[1]}; 
@define-color bs_color_2 {bsg[2]}; 
@define-color bs_color_3 {bsg[3]}; 
@define-color bs_color_4 {bsg[4]}; 
@define-color bs_color_5 {bsg[5]}; 
@define-color bs_color_6 {bsg[6]}; 
@define-color bs_color_7 {bsg[7]}; 
@define-color bs_color_8 {bsg[8]}; 
    """.format(**locals())

    with open(filename, 'w') as f: 
        for l in lines:
            f.write(l)








if __name__ == '__main__':


















    #WHEN RUN AS STAND ALONE SCRIPT: USE  ~/.themes/CDEtheme INSTEAD OF ~/.themes/cdetheme
    #or not.... leave for now

    #NOTE: in cdepanel palettes/ is located in ~/.config/CdePanel so the panel app can be 
    #used without .themes

    switchtheme="""
    After generating new palette it will be applied to newly started apps.
    But you can also go into eg Xfce: Settings/Appearance and switch to 
    another theme, and then switch back to CDEtheme to make the colors
    apply to all running apps. Similar in other desktop envs.
    
    For the xfwm4 theme to apply, go into settings/window manager/theme and
    choose CDEtheme (for cde style window decorations)

    Script now also generates a new theme directory eg for

    ./MotifColors palettes/Charcoal.dp 8

    it makes a new theme 'CDEtheme-Charcoal-8-colors. So you can also click
    on that.

    For this script to work you need to install the pyqt4 modules. Eg on 
    ubuntu something like:

    sudo apt install python-qt4 

        """

    helptxt="""
    Generate gtk2 and gtk3 theme in style of CDE/Motif

    CDEtheme directory  should be copied to ~/.themes/CDEtheme

    USAGE: MotifColors.py palettes/Broica.dp 8

    First argument is palette file, second is nr of colors, should be 8 or 4
    See ~/.themes/CDEtheme/palettes for available color schemes

        """+switchtheme


    if len(sys.argv)!=3:
        print helptxt
        sys.exit()

    palettefilefullpath=sys.argv[1]
    ncolors=int(sys.argv[2])
    

    print 'MotifColors'
    print palettefilefullpath
    print ncolors

    userhome=os.path.expanduser("~")
    userdotthemesdir=os.path.join(userhome,'.themes')
    #NOTE: THIS IS USED WHEN RUN AS STAND ALONE SCRIPT. for cdepanel it is ~/.themes/cdepanel
    themedir=os.path.join(userdotthemesdir,'CDEtheme')
    if not os.path.isdir(themedir):
        print 'Theme directory not found, please check installation'
        print themedir
        print helptxt
        sys.exit()
    if not os.path.isfile(palettefilefullpath):
        print 'File not found'
        print palettefilefullpath
        print helptxt
        sys.exit()
    
    directory=os.path.join(themedir,'gtk-2.0')
    filename=os.path.join(directory,'cdecolors.rc')
    gengtkrc(filename,palettefilefullpath,ncolors)

    directory=os.path.join(themedir,'gtk-3.16')
    filename=os.path.join(directory,'cdecolors.css')
    gengtkrc3colordefs(filename,palettefilefullpath,ncolors)

    directory=os.path.join(themedir,'gtk-3.20')
    filename=os.path.join(directory,'cdecolors.css')
    gengtkrc3colordefs(filename,palettefilefullpath,ncolors)

    #filename=Globals.configdir+'/cdetheme/xfwm4/themerc'
    directory=os.path.join(themedir,'xfwm4')
    filename=os.path.join(directory,'themerc')
    writethemerc(filename,palettefilefullpath,ncolors)




    #############################################################################################
    #############################################################################################
    #PROTOTYPE 
    #############################################################################################
    #TODO: DO IT BETTER / CLEAN
    #TODO: DO IT BETTER / CLEAN
    #TODO: DO IT BETTER / CLEAN


    #need for qt pixmap editing funcs
    app = QtGui.QApplication(sys.argv)


    #############################################
    #hier

    def replaceColorsInPixmap(pixmap,fromcolor,tocolor):
            mask = pixmap.createMaskFromColor(QtGui.QColor(fromcolor), QtCore.Qt.MaskOutColor)
            p = QtGui.QPainter(pixmap)
            p.setPen(QtGui.QColor(tocolor))
            p.drawPixmap(pixmap.rect(), mask, mask.rect())
            p.end()


    from SpritesGtk2 import spriteLWHXYgtk2

    #gtk2resourcedir='/home/jos/.themes/cdethemeNewGtk2/img2'
    gtk2resourcedir=os.path.join(themedir,'img2')
    #print os.path.isdir(gtk2resourcedir)
    #print gtk2resourcedir
    gtk2resourcefile=os.path.join(gtk2resourcedir,'resource.indexed.png')
    #print gtk2resourcefile
    #print os.path.isfile(gtk2resourcefile)

    motifcolors=readMotifColors2(ncolors,palettefilefullpath)

    colormap =[     
        ['#000100','fg_color_5'], 
        ['#69605b','bs_color_5'], 
        ['#a9988d','sel_color_5'], 
        ['#eda86e','bg_color_1'], 
        ['#c5b3a8','bg_color_5'], 
        ['#e7ded7','ts_color_5']
    ]

    #for key in motifcolors:
        #print key
        #print motifcolors[key]

    tmppixmap=QtGui.QPixmap(gtk2resourcefile)
    for i in range(len(colormap)):
        fromcolor=colormap[i][0] #['#464D54','bs_color_3']
        tocolor=motifcolors[colormap[i][1]]#motifcolors[ts_color_4]=#72ab84
        replaceColorsInPixmap(tmppixmap,fromcolor,tocolor)

    targetdir=os.path.join(gtk2resourcedir,'5')

    for l in spriteLWHXYgtk2:
        label=l[0]
        rect=QtCore.QRect(l[3],l[4],l[1],l[2]) #qrect=xywh i prefer WxH+x+y
        img=tmppixmap.copy(rect)
        targetimagefile=os.path.join(targetdir,label+'.png')
        img.save(targetimagefile)


    colormap =[     
        ['#000100','fg_color_6'], 
        ['#69605b','bs_color_6'], 
        ['#a9988d','sel_color_6'], 
        ['#eda86e','bg_color_1'], 
        ['#c5b3a8','bg_color_6'], 
        ['#e7ded7','ts_color_6']
    ]


    tmppixmap=QtGui.QPixmap(gtk2resourcefile)
    for i in range(len(colormap)):
        fromcolor=colormap[i][0] #['#464D54','bs_color_3']
        tocolor=motifcolors[colormap[i][1]]#motifcolors[ts_color_4]=#72ab84
        replaceColorsInPixmap(tmppixmap,fromcolor,tocolor)

    targetdir=os.path.join(gtk2resourcedir,'6')
    #print '>>>'
    #print targetdir

    for l in spriteLWHXYgtk2:
        label=l[0]
        rect=QtCore.QRect(l[3],l[4],l[1],l[2]) #qrect=xywh i prefer WxH+x+y
        img=tmppixmap.copy(rect)
        targetimagefile=os.path.join(targetdir,label+'.png')
        img.save(targetimagefile)





    print switchtheme


    #print palettefilefullpath
    basename=os.path.basename(palettefilefullpath)
    basenamenoext, file_extension = os.path.splitext(basename)
    newthemedir=themedir+'-'+basenamenoext+'-'+str(ncolors)+'-colors'
    print themedir
    print newthemedir

    if os.path.exists(newthemedir):
            shutil.rmtree(newthemedir)
    shutil.copytree(themedir, newthemedir)

#  ./MotifColors.py /home/jos/.themes/cdetheme/palettes/Crimson.dp 8
#  ./MotifColors.py /home/jos/.themes/cdetheme/palettes/Broica.dp 8
#  ./MotifColors.py /home/jos/.themes/cdetheme/palettes/Cinnamon.dp 8

#  ./MotifColors.py palettes/Broica.dp 8
#  ./MotifColors.py palettes/Charcoal.dp 8
