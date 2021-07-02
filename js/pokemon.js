$(document).ready(function() {
	/* tab */
  $('.tab:first-of-type, .tabpanel:first-of-type').addClass('active').attr('tabIndex', 0);
  $('.tab:first-of-type').attr('aria-selected', true).siblings().attr('aria-selected', false);
  $('.tabpanel:first-of-type').attr('aria-hidden', false).siblings('.tabpanel').attr('aria-hidden', true);


  $('.tab').on('keydown', function (e) {
    var key = e.keyCode;
    console.log(key); 
    switch (key) {
      case 37:   
        $(this).attr('tabIndex', -1);
        if ($(this).hasClass('first')) $(this).siblings('.last').attr('tabIndex', 0).focus();
        else $(this).prev().attr('tabIndex', 0).focus();
        break;
      case 39: 
        $(this) .attr('tabIndex', -1);
        if ($(this).hasClass('last')) $(this).siblings('.first').attr('tabIndex', 0).focus();
        else $(this).next().attr('tabIndex', 0).focus();
        break;
      case 36: 
        e.preventDefault();
        $(this).siblings('.first').attr('tabIndex', 0).focus();
        break;
      case 35:  
        e.preventDefault();
        $(this).siblings('.last').attr('tabIndex', 0).focus();
        break;
      case 32:  
      case 13: 
        var $tg = $(this);
        activeOn($tg);
        break;
    }
  });

  //3) 탭 클릭 이벤트
  $('.tab').on('click', function () {
    var $tg = $(this);
    activeOn($tg);
  });

  function activeOn($target) {
    $target.addClass('active').attr({'aria-selected': true, tabIndex: 0}).siblings().removeClass('active').attr({'aria-selected': false, tabIndex: -1});
    $('#' + $target.attr('aria-controls')).addClass('active').attr({'aria-hidden': false, tabIndex: 0}).siblings('.tabpanel').removeClass('active').attr({'aria-hidden': true, tabIndex: -1});
  }

});

//모바일 전체 메뉴 열기
const $mgnbWrap = $('#mHeader .mgnb_wrap');
$('#mHeader .btn_gnb_open').on('click', function () {
  const $first =  $mgnbWrap.find('.first');
  const $last =  $mgnbWrap.find('.last');
  const $openBtn = $(this); //닫기 버튼을 누른 경우 포커스 강제 이동

  $(this).after('<div id="mgnbDim"></div>').next().stop().fadeIn('fast');
  $mgnbWrap.css('visibility', 'visible').stop().animate({left: 0}, 300, function () {
    $first.focus();  //포커스 아웃라인 안보인다
    $('html').css({overflowY: 'hidden', height: '100%'});
  });

  //키보드 제어 접근성 - keydown
  //$first에서 shift+tab 눌러 이전으로 나가는 경우 마지막으로 포커스 이동
  $first.on('keydown', function (e) {
    //console.log(e.keyCode);  //tab => 9
    if ( e.shiftKey && e.keyCode === 9 ) {
      e.preventDefault();
      $last.focus();
    }
  })

  //$last에서 (shift는 누르면 안됨)tab만 눌러 다음으로 나가는 경우 처음으로 포커스 이동
  $last.on('keydown', function (e) {
    if (!e.shiftKey && e.keyCode === 9) {
      e.preventDefault();
      $first.focus();
    }
  });

  //닫기 버튼 클릭으로 닫아주기 : animate() -> 완료함수 none, 열기버튼으로 포커스 강제 이동
  $mgnbWrap.find('.btn_gnb_close').on('click', function () {
    $('html').removeAttr('style');
    $('#mgnbDim').stop().fadeOut('fast', function () {
      $(this).remove();
    });

    $mgnbWrap.stop().animate({left: '-100%'}, 300, function () {
      $(this).css('visibility', 'hidden');
      $openBtn.focus();
      //열려진 #mGnb는 닫아준다 - 추가 - 연결해서 하자!
      $('#mGnb ul li.on').removeClass('on').children('ul').css({visibility: 'hidden', maxHeight: 0});
    });
  });
});

//attr
$(document).ready(function () {
  $('#btn li a').on('click', function () {
    // 1) .blind에 들어갈 텍스트 : 현재 클릭한 나자신 a를 선택해서 자식인 img의 alt 속성 가져오기
    const hTxt = $(this).children().attr('alt');
    //console.log(hTxt);
  
    // 2) img src 속성에 들어갈 경로명 => href 속성 재활용
    const bigSrc = $(this).attr('href');
    //console.log(bigSrc);
  
    // 3) img src 속성에 들어갈 텍스트 => 배열
    const altArr = ['치코리타', '리아코', '나무지기'];
    // 4) 배열 인덱스 번호를 저장하는 상수
    const tgNum = $(this).parent().index();
    console.log(altArr[tgNum]);  //0, 1, 2, 3
  
    // $big.find('.blind').text('봄').next().attr({src: 'images/spring.jpg', alt: '하얗게 피어있는 벚꽃'});
    $('#pPokemon .blind').text(hTxt).next().attr({src: 'images/main/pokemon/' + bigSrc, alt: altArr[tgNum]});
  
    return false;
  });
  
});
