chrome.app.runtime.onLaunched.addListener(function()
{
	chrome.app.window.create('index.html',
	{
		bounds:
		{
			width: Math.floor(Math.min(screen.availWidth * 3 / 4, 1024)),
			height: Math.floor(Math.min(screen.availHeight * 3 / 4, 768)),
			left: Math.floor((screen.availWidth - Math.min(screen.availWidth * 3 / 4, 1024)) / 2),
			top: Math.floor((screen.availHeight - Math.min(screen.availHeight * 3 / 4, 768)) / 3)
		}
	});
});
