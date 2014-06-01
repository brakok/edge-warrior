var mySwiper = new Swiper('.swiper-container',{
    grabCursor: true,
    paginationClickable: true,
	loop:true
  });
  
  var mySwiper = $('.swiper-container').swiper({
  slidesPerView:3
})
$(window).resize(function(){
  var ww = $(window).width()
  if (ww>1370) mySwiper.params.slidesPerView = 3;
  if (ww<=1370) mySwiper.params.slidesPerView = 2;
  if (ww<=950) mySwiper.params.slidesPerView = 1;
  mySwiper.reInit()
})
$(window).trigger('resize');
  
  $('.arrow-left').on('click', function(e){
    e.preventDefault()
    mySwiper.swipePrev()
  })
  $('.arrow-right').on('click', function(e){
    e.preventDefault()
    mySwiper.swipeNext()
  })
  
  