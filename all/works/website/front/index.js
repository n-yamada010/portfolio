$(function(){
    // symposiumのカルーセル
    $(".symposium_carousel") .slick({
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        centerMode: false,
        centerPadding: "5px",
        dots: false,
        fade: false,
        cssEase: "linear",
        infinite: true,
        pauseOnFocus: false,
        pauseOnHover: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
    });

    // symposium memberのアコーディオン
    $(".member_accordion button").on("click",function(){
        $(this).next().slideToggle();
    });
    $(".member_accordion .member_faq").hide();

    $('.member_accordion .member_faq').click(function() {
      // 現在開いているアコーディオンを閉じる
      $('.member_accordion .member_faq').slideUp('fast');
    });

    // interviewのアコーディオン
    $(".interview_accordion button").on("click",function(){
        $(this).next().slideToggle();
    });
    $(".interview_accordion .interview_faq").hide();

    $('.interview_accordion .interview_faq').click(function() {
      // 現在開いているアコーディオンを閉じる
      $('.interview_accordion .interview_faq').slideUp('fast');
    });

    // ハンバーガーメニュー
    $(".nav-button").on("click",function(){
        $("body").toggleClass("menu-open");
        });
    $(document).on('click','.menu-open nav',function(){
        $(".nav-button").trigger('click');    
    });
});

// fixed_entry-btnの表示表示
jQuery(function() {

    var footer = $('footer').innerHeight();
    
    window.onscroll = function () {
      var point = window.pageYOffset;
      var docHeight = $(document).height();
      var dispHeight = $(window).height();
    
      if(point > docHeight-dispHeight-footer){
        $('.fixed_entry-btn').addClass('is-hidden');
      }else{
        $('.fixed_entry-btn').removeClass('is-hidden');
      }
    };
});
$(function() {
    var btn = $('.fixed_entry-btn');
    
    $(window).on('load scroll', function(){
      if($(this).scrollTop() > 500) {
        btn.addClass('active');
      }else{
        btn.removeClass('active');
      }
    });
  });

// headerの表示非表示
  $(function() {
    var btn = $('header');
    
    $(window).on('load scroll', function(){
      if($(this).scrollTop() > 100) {
        btn.addClass('active');
      }else{
        btn.removeClass('active');
      }
    });
  });