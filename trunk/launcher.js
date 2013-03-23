chrome.app.runtime.onLaunched.addListener(function() { 
	chrome.app.window.create('edgeWarrior.html', {
		width: 1200,
		height: 600,
		minWidth: 1200,
		minHeight: 600,
		left: 100,
		top: 100,
		type: 'shell'
	});
});
