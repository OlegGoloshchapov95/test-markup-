var slide = $(".hero-section .swiper-container .swiper-slide");
        var pagBullets = $(".hero-section .swiper-pagination .swiper-pagination-bullet");
        var active = "swiper-pagination-bullet-active";
$(slide).mySimpleSlider({
        selectors:pagBullets,
        selectorsActiveClass:active,
        animationType:"fade",
        duration:1000
});