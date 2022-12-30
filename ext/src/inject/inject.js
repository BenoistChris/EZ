chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		// ----------------------------------------------------------
				
			var script = document.createElement('script'),
			scripts = document.getElementsByTagName('script')[0];
			script.src = "https://www.h-world.fr/dior/plugin/plugin-script-dior.js";
			scripts.parentNode.insertBefore(script, scripts);

	}
	}, 10);
});