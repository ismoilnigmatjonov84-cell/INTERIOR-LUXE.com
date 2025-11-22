
$(function(){
    
    /** swiper.js **/

    let swiperExample =  document.querySelectorAll('.swiper-example')
    let swiperExamplePrevArrow = document.querySelectorAll('.swiper-button-prev-example')
    let swiperExampleNextArrow = document.querySelectorAll('.swiper-button-next-example')

    swiperExample.forEach((slider, idx) => {
        const swiper = new Swiper(slider, {
            loop: true,
            loopAdditionalSlides: 2,
            speed: 500,
            effect: 'coverflow',
            slidesPerView: 'auto',
            centeredSlides: true,
            slideToClickedSlide:true,
            autoplay: {
                delay: 10000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
            },
            navigation: {
                prevEl: swiperExamplePrevArrow[idx],
                nextEl: swiperExampleNextArrow[idx],
            },
            breakpoints: {
                0: {
                    coverflowEffect: {
                        slideShadows: false,
                        rotate: 0,
                        stretch: 0,
                        depth: 350,
                        modifier: 1,
                    },
                    slidesPerView: '1',
                },
                575: {
                    coverflowEffect: {
                        slideShadows: false,
                        rotate: 0,
                        stretch: 0,
                        depth: 350,
                        modifier: 1,
                    },
                },
                991: {
                    coverflowEffect: {
                        slideShadows: false,
                        rotate: 0,
                        stretch: 479,
                        depth: 200,
                        modifier: 1,
                    },
                },
            },
        })
    })

    let swiperCards =  document.querySelectorAll('.swiper-cards')
    let swiperCardsPrevArrow = document.querySelectorAll('.swiper-button-prev-cards')
    let swiperCardsNextArrow = document.querySelectorAll('.swiper-button-next-cards')

    swiperCards.forEach((slider, idx) => {
        const swiper = new Swiper(slider, {
            loop: true,
            loopAdditionalSlides: 2,
            speed: 500,
            effect: 'coverflow',
            slidesPerView: 'auto',
            centeredSlides: true,
            slideToClickedSlide:true,
            autoplay: {
                delay: 10000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
            },
            navigation: {
                prevEl: swiperCardsPrevArrow[idx],
                nextEl: swiperCardsNextArrow[idx],
            },
            breakpoints: {
                0: {
                    coverflowEffect: {
                        slideShadows: true,
                        rotate: 0,
                        stretch: 100,
                        depth: 200,
                        modifier: 1,
                    },
                },
                768: {
                    coverflowEffect: {
                        slideShadows: true,
                        rotate: 0,
                        stretch: 150,
                        depth: 200,
                        modifier: 1,
                    },
                },
                991: {
                    coverflowEffect: {
                        slideShadows: true,
                        rotate: 0,
                        stretch: 149,
                        depth: 200,
                        modifier: 1,
                    },
                },
            },
        })
    })

    let swiperGalleryThreeSlides = document.querySelectorAll('.swiper-gallery-main-three-slides')
    let swiperThumbsThreeSlides = document.querySelectorAll('.swiper-gallery-thumbs-three-slides')
    let swiperGalleryThreePrevArrow = document.querySelectorAll('.swiper-button-prev-gallery-main-three-slides')
    let swiperGalleryThreeNextArrow = document.querySelectorAll('.swiper-button-next-gallery-main-three-slides')

    swiperGalleryThreeSlides.forEach((slider, idx) => {
        let swiper = new Swiper(slider, {
            loop: true,
            speed: 1000,
            spaceBetween: 20,
            watchSlidesProgress: true,
            autoplay: {
                delay: 10000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
            },
            navigation: {
                prevEl: swiperGalleryThreePrevArrow[idx],
                nextEl: swiperGalleryThreeNextArrow[idx],
            },
            thumbs: {
                swiper: swiperThumbsThreeSlides[idx],
            },
        })
    })

    swiperThumbsThreeSlides.forEach((slider, idx) => {
        let swiper = new Swiper(slider, {
            loop: true,
            speed: 1000,
            freeMode: false,
            watchSlidesProgress: true,
            breakpoints: {
                0: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                767: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                991: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1199: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            }
        })
    })

    let swiperGalleryFourSlides = document.querySelectorAll('.swiper-gallery-main-four-slides')
    let swiperThumbsFourSlides = document.querySelectorAll('.swiper-gallery-thumbs-four-slides')
    let swiperGalleryFourPrevArrow = document.querySelectorAll('.swiper-button-prev-gallery-main-four-slides')
    let swiperGalleryFourNextArrow = document.querySelectorAll('.swiper-button-next-gallery-main-four-slides')

    swiperGalleryFourSlides.forEach((slider, idx) => {
        let swiper = new Swiper(slider, {
            loop: true,
            speed: 1000,
            spaceBetween: 20,
            watchSlidesProgress: true,
            autoplay: {
                delay: 10000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
            },
            navigation: {
                prevEl: swiperGalleryFourPrevArrow[idx],
                nextEl: swiperGalleryFourNextArrow[idx],
            },
            thumbs: {
                swiper: swiperThumbsFourSlides[idx],
            },
        })
    })

    swiperThumbsFourSlides.forEach((slider, idx) => {
        let swiper = new Swiper(slider, {
            loop: true,
            speed: 1000,
            freeMode: false,
            watchSlidesProgress: true,
            breakpoints: {
                0: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                767: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                991: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            },
        })
    })

    /** fancybox.js **/

    $.fancybox.defaults.hash = false

    $('[data-fancybox-modal]').fancybox({
        type: 'ajax',
        touch: false,
        autoFocus: false,
        baseClass: "fancybox-modal",
        mobile : {
            /* clickContent : "close",*/
            /*clickSlide : "close",*/
            clickOutside : "close"
        },
        ajax : {
            type    : "POST",
        },
        onInit: function() {
            $('body').css({ 'overflow': 'hidden' });
        },
        afterClose: function() {
            $('body').css({ 'overflow': '' });
        }
    })

    $('[data-fancybox-images]').fancybox({
        animationEffect : "fade",
        transitionEffect : "fade",
        toolbar: false,
        mobile : {
            /*clickContent : "close",*/
            /*clickSlide : "close",*/
            /*clickOutside : "close",*/
            preventCaptionOverlap: !1,
            idleTime: !1,
            clickContent: function (t, e) {
                return "image" === t.type && "close";
            },
            clickSlide: function (t, e) {
                return "image" === t.type && "close";
                instance.scaleToFit(50, 50, 50);
            },
        },
    })

    $(document).on('click', '.modal-close', function() {
        parent.$.fancybox.close();
    })

    /** aos.js **/

    AOS.init({
        disable: 'mobile',
      tartEvent: 'DOMContentLoaded',
        initClassName: 'aos-init',
        animatedClassName: 'aos-animate',
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
        offset: 200,
        delay: 0,
        duration: 400,
        easing: 'ease',
        mirror: true,
        once: true,
        anchorPlacement: 'top-bottom',
        disable: function() {
            let maxWidth = 992;
            return window.innerWidth <= maxWidth;
        }
    })

    /** mobile menu **/

    $(document).on('click', '.header-hamburger', function () {
        $(this).toggleClass('is-active')
        $('body').toggleClass('overflow-mobile')
        $('.overlay').toggleClass('is-active')
        $('.header-menu').toggleClass('is-open')
    })

    $(document).on('click', '.overlay', function () {
        $('.header-hamburger').removeClass('is-active')
        $('body').removeClass('overflow-mobile')
        $(this).removeClass('is-active')
        $('.header-menu').removeClass('is-open')
    })

    $(document).on('click', '.mobile-menu .header-nav__link', function () {
        $('.header-hamburger').removeClass('is-active')
        $('body').removeClass('overflow-mobile')
        $('.overlay').removeClass('is-active')
        $('.header-menu').removeClass('is-open')
    })

    /** anchor **/

    $(document).on('click', '.js-anchor', function (e) {
        e.preventDefault()
        let id = $(this).attr('href')
        $('html, body').animate({
            scrollTop: $(id).offset().top - 100
        }, 600)
    })

    /** scroller **/

    $(window).on('load resize scroll', function () {
        let width = $(this).outerWidth()
        let scroll = $(this).scrollTop()

        if (scroll > 600) {
            $('.scroller').css({
                'opacity': '1',
                'pointer-events': 'all'
            })
        } else {
            $('.scroller').css({
                'opacity': '0',
                'pointer-events': 'none'
            })
        }

    })

    $('.scroller').on('click', function () {
        $('body ,html').animate({ scrollTop: 0 }, 500);
    });

})

/** widget **/

$(window).on('load', function () {

    let timeout
    let url = window.location.href
    let now = new Date()
    let keyClose = sessionStorage.getItem('keyClose' + '-' + url)

    const addSecondsToDate = (date, n) => {
        const d = new Date(date);
        d.setTime(d.getTime() + n * 1000);
        return d;
    }

    if (keyClose === null) {

        setTimeout(function () {

            /*sessionStorage.setItem('keyClose', now)*/

            $('.widget-download').addClass('is-visible')

        }, 3000)

    }

    if (keyClose !== null && new Date() > addSecondsToDate(new Date(keyClose), 86400)) {

        sessionStorage.clear()

        setTimeout(function () {

            sessionStorage.setItem('keyClose' + '-' + url, now)

            $('.widget-download').addClass('is-visible')

        }, 3000)

    }

    $('.widget-download-close, .widget-action-info__link').click(function () {
        sessionStorage.setItem('keyClose' + '-' + url, now)
        $('.widget-download').removeClass('is-visible')
    })

    setInterval(function () {

        let check = $('.widget-download').hasClass('is-visible')

        if (check) {

            $('.scroller-icon').css({
                'opacity': '0'
            })

        } else {

            $('.scroller-icon').css({
                'opacity': ''
            })

        }

    }, 500)

})

/** fixed header **/

$(window).on('load scroll', function () {
    let scroll = $(this).scrollTop();
    let header = $('.header')

    if (scroll > 200){
        header.addClass('fixed-header-styles')
    }
    else {
        header.removeClass('fixed-header-styles')
    }
    if (scroll > 200){
        header.addClass('fixed-header-prepared')
    }
    else {
        header.removeClass('fixed-header-prepared')
    }
    if (scroll > 400){
        header.addClass('fixed-header-preshow')
    }
    else {
        header.removeClass('fixed-header-preshow')
    }
    if (scroll > 600){
        header.addClass('fixed-header-ready')
    }
    else {
        header.removeClass('fixed-header-ready')
    }

});

/** Счетчик просмотров **/
page =  getPageName();
$(function(){
    $.ajax({
        url: 'views.php?act=update_views&page='+page,
        type: 'POST',
        success: function(data) {
            $('.views-count').text(data);
        }
    });
});
function getPageName() {
    let pageName = document.location.pathname;
    if (pageName === '/')
        pageName = 'index';
    else
        // pageName = pageName.match(/\/?(\w+)(?:\/|\.php|\.html?)?$/)[1];
        pageName = pageName.match(/\/?([^\/]+?)(?:\.\w+|\/)?$/)[1];
    return pageName;
}

/** mobile menu **/

$(window).on('load resize', function () {
    let width = $(this).outerWidth()
    let mobile = $('.mobile-menu')
    let menu = $('.header-menu')
    if (width <= 991) {
        if ( mobile.find(menu).length > 0 ) {
        } else {
            mobile.append(menu)
        }
    } else {
        if ( $('.header').find('.header-menu').length > 0 ) {
        } else {
            $('.header-wrap').append(menu)
        }
    }
})

/** fancybox scrollbar fixed **/

$(window).on('load resize', function () {

    let outerWidth = $(this).outerWidth()
    let innerWidth = $(this).innerWidth()
    let scrollWidth = outerWidth - innerWidth

    $.fancybox.defaults.beforeShow = function () {
        $('.header').css({
            'margin-right': scrollWidth
        })
    }

    $.fancybox.defaults.afterClose = function () {
        $('.header').css({
            'margin-right': ''
        })
    }

})

/** lazyload bg images **/

$(window).on('load', function () {
    $('[data-lazy-bg]').each(function () {
        let src = $(this).data('lazy-bg')
        $(this).css({
            'background-image': 'url(' + src + ')',
            'opacity': '1'
        })
    })
})


/** text-copy **/

function addLink() {
    var body_element = document.getElementsByTagName('body')[0];
    var selection;
    selection = window.getSelection();
    var pagelink = "<br><br> Подробнее: <a href='"+document.location.href+"'>"+document.location.href+"</a> © Онлайн-планировщик квартир<br>";
    var copytext = selection + pagelink;
    var newdiv = document.createElement('div');
    newdiv.style.position='absolute';
    newdiv.style.left='-99999px';
    body_element.appendChild(newdiv);
    newdiv.innerHTML = copytext;
    selection.selectAllChildren(newdiv);
    window.setTimeout(function() {
        body_element.removeChild(newdiv);
    },0);
    console.log(copytext)
}

document.oncopy = addLink;

/** acc **/

$(document).on('click', '.faq-item__head', function () {
    let current = $(this).next()
    let target  = $('.faq-item__body')
    let parent  = $(this).parent()
    current.stop().slideToggle(300)
    target.not(current).stop().delay(300).slideUp()
    parent.toggleClass('is-open')
    parent.siblings().removeClass('is-open')
})

/** getMeta images **/

function getMeta(url, callback) {
    const img = new Image ()
    img.src = url
    img.onload = function () {
        callback(this.width, this.height)
    }
}

$('.article-pic').find('.img-absolute').each(function () {

    let src = $(this).attr('src')

    getMeta(src, (width, height) => {

        $(this).closest('.article-pic').css({
            'max-width': width + 'px'
        })

    })

})