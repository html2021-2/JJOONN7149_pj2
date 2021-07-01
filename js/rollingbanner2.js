$(document).ready(function() {
  $(window).on('resize', function () {

    // 12장의 사진을 2번 반복하여 동적 생성
    $('.banner div').each(function (idx) {
      for (let j=1; j<=2; j++) {
        for (let i=1; i<=12; i++) {
          $(this).append(`<img src="images/main/banner/banner${idx+1}/${idx+1}-${i}.jpg" alt="">`);
        }
      }
    });
    
    setTimeout(function () {
      $('.banner div').each(function () {
        let bannerWid = 0;
        for (let i=1; i<=12; i++) {
          bannerWid += $(this).children().eq(i).width();
        }
        // console.log(bannerWid);
        $(this).css('width', bannerWid);
      });
    }, 500);
  });
  $(window).trigger('resize');
});