$(function() {
    // symposiumのカルーセル
    $(".symposium_carousel").slick({
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
    // 全文表示アコーディオン
    $(".member_accordion .member_faq, .interview_accordion .interview_faq").hide();
    $(".member_accordion .accordion-btn, .interview_accordion .accordion-btn").on("click", function() {
        const $button = $(this);
        const isOpen = $button.attr("aria-expanded") === "true";

        $button.attr("aria-expanded", String(!isOpen));
        $button.text(isOpen ? "全文を見る" : "閉じる");
        $button.next().stop(true, true).slideToggle();
    });

    // ハンバーガーメニュー
    $(".nav-button").on("click", function() {
        const isOpen = $("body").toggleClass("menu-open").hasClass("menu-open");
        $(this)
            .attr("aria-expanded", String(isOpen))
            .attr("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
    });
    $(".menu a").on("click", function() {
        if ($("body").hasClass("menu-open")) {
            $(".nav-button").trigger("click");
        }
    });

    // ヘッダーと固定応募ボタンの表示制御
    const $window = $(window);
    const $header = $("header");
    const $fixedEntry = $(".fixed_entry-btn");
    const $footer = $("footer");

    function updateFixedElements() {
        const scrollTop = $window.scrollTop();
        const footerTop = $footer.offset().top;
        const viewportBottom = scrollTop + $window.height();

        $header.toggleClass("active", scrollTop > 100);
        $fixedEntry.toggleClass("active", scrollTop > 500);
        $fixedEntry.toggleClass("is-hidden", viewportBottom >= footerTop);
    }

    $window.on("load scroll resize", updateFixedElements);
    updateFixedElements();
});
