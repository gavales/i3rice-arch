
/* vim:ft=c */
/* Vertical scale, larger values will amplify output */
#define VSCALE 500
/* Rendering direction, either -1 (outwards) or 1 (inwards). */
#define DIRECTION 1

/* Color gradient scale, (optionally) used in `COLOR` macro */
#define GRADIENT_SCALE 75
/* Color definition. By default this is a gradient formed by mixing two colors.
   `pos` represents the pixel position relative to the visualizer baseline. */
#define COLOR mix(#fd888d, #3c4c55, clamp(pos / GRADIENT_SCALE, 0, 1))
/* 1 to draw outline, 0 to disable */
#define DRAW_OUTLINE 0
/* 1 to draw edge highlight, 0 to disable */
#define DRAW_HIGHLIGHT 1
/* Whether to anti-alias the border of the graph, creating a smoother curve.
   This may have a small impact on performance.
   Note: requires `xroot` or `none` opacity to be set */
#define ANTI_ALIAS 0
/* outline color */
#define OUTLINE #3c4c55
/* 1 to join the two channels together in the middle, 0 to clamp both down to zero */
#define JOIN_CHANNELS 0
/* 1 to invert (vertically), 0 otherwise */
#define INVERT 1

/* Gravity step, overrude from `smooth_parameters.glsl` */
#request setgravitystep 2.4

/* Smoothing factor, override from `smooth_parameters.glsl` */
#request setsmoothfactor 0.015