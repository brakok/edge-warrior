
var HtmlHelper = {
	computeWidth: function(el){
		var isVisible = el.style.display != "none";
		
		if(!isVisible)
		{
			el.style.visibility = "hidden";
			el.style.display = "block";
		}
		
		var width = parseInt(window.getComputedStyle(el).width);
		
		if(!isVisible)
		{
			el.style.visibility = null;
			el.style.display = "none";
		}
		
		return width;
	},
	showError: function(msg){
		
		var span = document.getElementById('error');
		
		span.innerHTML = msg;

		//Clean error message after specified time.
		setTimeout(function(){
			span.innerHTML = '';
		}, 5000);
	}
};