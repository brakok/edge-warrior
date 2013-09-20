chrome.app.runtime.onLaunched.addListener(function() { 
	chrome.app.window.create('edgeWarrior.html', {
		width: 1920,
		height: 1280,
		minWidth: 640,
		minHeight: 480,
		left: 100,
		top: 100,
		type: 'shell'
	});
});
