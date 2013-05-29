chrome.app.runtime.onLaunched.addListener(function() { 
	chrome.app.window.create('edgeWarrior.html', {
		width: 1400,
		height: 900,
		minWidth: 1400,
		minHeight: 900,
		left: 100,
		top: 100,
		type: 'shell'
	});
});
