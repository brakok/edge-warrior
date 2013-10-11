
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
	}
};