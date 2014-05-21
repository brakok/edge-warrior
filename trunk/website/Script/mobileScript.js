function mobile() {
	if ($(window).width() < 600) { 
		$("#updates .swiper-container").hide();
		$("#rules section").hide();
		$("#maps iframe").hide();
		$("#about .wrap section").hide();
		/* NEWS */
		$(document).ready(function () {
			$("#content article#updates>span").click(function () {
				$("#updates .swiper-container").toggle();
				$(this).toggleClass('clicked');
			});
		});
		/* RULES */
		$(document).ready(function () {
			$("#content article#rules>span ").click(function () {
				$("#rules section").toggle();
				$(this).toggleClass('clicked');
			});
		});
		/* WORLD */
		$(document).ready(function () {
			$("#content article#maps>span ").click(function () {
				$("#maps iframe").toggle();
				$(this).toggleClass('clicked');
			});
		});
		/* ABOUT */
		$(document).ready(function () {
			$("#content article#about>span ").click(function () {
				$("#about .wrap section").toggle();
				$(this).toggleClass('clicked');
			});
		});
	}
};