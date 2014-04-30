  var mySwiper = new Swiper('.swiper-container',{
    pagination: '.pagination',
    centeredSlides: true,
    slidesPerView: 3,
    watchActiveIndex: true,
    loop:true
  })
  
  $('.arrow-left').on('click', function(e){
    e.preventDefault()
    mySwiper.swipePrev()
  })
  $('.arrow-right').on('click', function(e){
    e.preventDefault()
    mySwiper.swipeNext()
  })