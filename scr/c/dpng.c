#include <stdio.h>
#include <stdlib.h>
#include <X11/Xlib.h>

//XPutImage(display, d, gc, image, src_x, src_y, dest_x, dest_y, width, height)
//        Display *display;
//        Drawable d;
//        GC gc;
//        XImage *image;
//        int src_x, src_y;
//        int dest_x, dest_y;
//        unsigned int width, height;

int main(int argc, char *argv[])
{
	Display *dpy;
	int screen;
	Window win;
	XEvent event;

	dpy = XOpenDisplay(NULL);

	if(dpy == NULL)
	{
		fprintf(stderr, "Cannot open display\n");
		exit(1);
	}

	screen = DefaultScreen(dpy);
	win = XCreateSimpleWindow(dpy, RootWindow(dpy, screen),
		100, 100, 500, 300,
		1, BlackPixel(dpy, screen), WhitePixel(dpy, screen));

	XSelectInput(dpy, win, ExposureMask | KeyPressMask);
	XMapWindow(dpy, win);

	while(1)
	{
		XNextEvent(dpy, &event);
	}

	return 0;
}
