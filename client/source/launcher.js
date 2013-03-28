chrome.app.runtime.onLaunched.addListener(function() { 
	chrome.app.window.create('edgeWarrior.html', {
		width: 1200,
		height: 800,
		minWidth: 1200,
		minHeight: 800,
		left: 100,
		top: 100,
		type: 'shell'
	});
});
