var mySwiper = new Swiper('.swiper-container',{
    grabCursor: true,
    paginationClickable: true,
  });
  
var mySwiper = $('.swiper-container').swiper({
  slidesPerView:5
})
$(window).resize(function(){
  var ww = $(window).width()
  if (ww>1600) mySwiper.params.slidesPerView = 5;
  if (ww>1280 && ww<=1600) mySwiper.params.slidesPerView = 4;
  if (ww>900 && ww<=1280) mySwiper.params.slidesPerView = 3;
  if (ww>680 && ww<=900) mySwiper.params.slidesPerView = 2;
  if (ww<=680) mySwiper.params.slidesPerView = 1;
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