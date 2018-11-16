#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Feb  8 21:56:24 2018

@author: gavaro
"""

import color_tracker

cam = color_tracker.WebCamera(video_src=0)
cam.start_camera()

detector = color_tracker.HSVColorRangeDetector(camera=cam)
lower, upper, kernel = detector.detect()

print("Lower HSV color is: {0}".format(lower))
print("Upper HSV color is: {0}".format(upper))
print("Kernel is: {0}".format(kernel))