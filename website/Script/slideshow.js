var mySwiper = new Swiper('.swiper-container',{
    pagination: '.pagination',
    paginationClickable: true,
    slidesPerView: 3,
    loop: true
  })

  var mySwiper = $('.swiper-container').swiper({
  slidesPerView:3
})
$(window).resize(function(){
  var ww = $(window).width()
  if (ww>1600) mySwiper.params.slidesPerView = 3;
  if (ww<=1100) mySwiper.params.slidesPerView = 2;
  if (ww<=800) mySwiper.params.slidesPerView = 1;
  mySwiper.reInit()
})
$(window).trigger('resize');
  
  
  