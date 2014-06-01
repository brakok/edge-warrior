var mySwiper = new Swiper('.swiper-container',{
    pagination: '.pagination',
    grabCursor: true,
	loop:true
  });
  	
$(window).resize(function(){
  var ww = $(window).width()
  if (ww>1370) mySwiper.params.slidesPerView = 3;
  if (ww<=1370) mySwiper.params.slidesPerView = 2;
  if (ww<=820) mySwiper.params.slidesPerView = 1;
  mySwiper.reInit()
})
$(window).trigger('resize');
  
  
  
  
  
