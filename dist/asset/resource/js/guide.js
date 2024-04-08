'use strict';

$(function () {
    $('html').fnInit();
    sideNav('.side-nav a', '.box-section');
    sideNav('.evalList-tit', '.evalList-cont');
    folderTreeFn('.directory-tree-wrap');
    subsenarioFn();
    toggleBtnFn();
    focusFn();
    scrollTop();
});

function folderTreeFn(obj){
    const depth01 = $('>ul>li>a', obj),
    siblingFolder = depth01.siblings('ul');

    const treeFolderLink = $('.directory-tree__folder > li > a');
    const treeFileLink = $('.directory-tree__file > li > a');

    treeFolderLink.attr('href', 'javascript:void(0)');
    $('a', this).click(function(){
        siblingFolder.slideToggle();
    })
}
function sideNav(navSelector, sectionSelector){ //side link navigation
    const scrollToSection = {
        init: function() {
            this.navLinks = document.querySelectorAll(navSelector);
            this.boxSections = document.querySelectorAll(sectionSelector);
            const observer = new IntersectionObserver(this.handleIntersection, {
                rootMargin: '-50% 0px -50% 0px',
                threshold: 0
            });
            this.navLinks.forEach((link, index) => {
                link.addEventListener('click', (event) => this.handleClick(event, index));
            });
            this.boxSections.forEach((section, index) => {
                observer.observe(section);
            });
        },
        handleClick: function(event, index) {
            event.preventDefault(); // Prevent default link behavior
            const targetBox = document.getElementById(`${sectionSelector.substring(1)}--${index + 1}`);
            if (targetBox) {
                this.navLinks.forEach(link => link.classList.remove('is-active'));
                event.target.classList.add('is-active');
                targetBox.scrollIntoView({ behavior: 'smooth' });
            }
        },
        handleIntersection: function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(scrollToSection.boxSections).indexOf(entry.target);
                    scrollToSection.navLinks.forEach(link => {
                        link.classList.remove('is-active');
                    });
                    scrollToSection.navLinks[index].classList.add('is-active');
                }
            });
        }
    };
    scrollToSection.init();
}
function evalListFn(){ //side link navigation
    const scrollToSection = {
        init: function() {
            this.navLinks = document.querySelectorAll('.evalList-tit');
            this.boxSections = document.querySelectorAll('.evalList-cont');
            const observer = new IntersectionObserver(this.handleIntersection, {
                rootMargin: '-50% 0px -50% 0px',
                threshold: 0
            });
            this.navLinks.forEach((link, index) => {
                link.addEventListener('click', (event) => this.handleClick(event, index));
            });
            this.boxSections.forEach((section, index) => {
                observer.observe(section);
            });
        },
        handleClick: function(event, index) {
            event.preventDefault(); // Prevent default link behavior
            const targetBox = document.getElementById(`evalLIst-cont--0${index + 1}`);
            if (targetBox) {
                this.navLinks.forEach(link => link.classList.remove('is-active'));
                event.target.classList.add('is-active');
                targetBox.scrollIntoView({ behavior: 'smooth' });
            }
        },
        handleIntersection: function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(scrollToSection.boxSections).indexOf(entry.target);
                    scrollToSection.navLinks.forEach(link => {
                        link.classList.remove('is-active');
                    });
                    scrollToSection.navLinks[index].classList.add('is-active');
                }
            });
        }
    };
    scrollToSection.init();
}
function subsenarioFn(){
    /** 시나리오 swiper **/
    function scenarioSwiper1(swiperClassName, totalSlides, paginationClass) {
        // Create a swiper instance
        const ScenarioSwiper = new Swiper(`.${swiperClassName}`, {
            loop:false,
            slidesPerView:'auto',
            breakpoints:{
                320:{
                    allowTouchMove:true,
                },
                1024:{
                    allowTouchMove:false,
                }
            },
            // pagination:{
            //     el: `.${paginationClass} .swiper-pagination`,
            //     type:'fraction',
            //     formatFractionCurrent: function (number) {
            //         return ('0' + number).slice(-2);
            //     },
            //     formatFractionTotal: function (number) {
            //         return ('0' + number).slice(-2);
            //     },
            //     renderFraction: function (currentClass, totalSlides) {
            //         return '<span class="' + currentClass + '"></span>' +
            //                 '<em></em>' +
            //                 '<span class="' + totalSlides + '"></span>';
            //     },
            // },
            // navigation: {
            //     nextEl: `.${paginationClass} .swiper-button-next`,
            //     prevEl: `.${paginationClass} .swiper-button-prev`,
            // },
        });
        return ScenarioSwiper;
    }

    // Swiper 인스턴스 생성 및 이벤트 핸들러 등록
    const swipers = [
        { className: 'side-nav .swiper', totalSlides: 6, paginationClass: 'swiper-control' },
    ];
    swipers.forEach(({ className, totalSlides, paginationClass }) => {
        const swiperInstance = scenarioSwiper1(className, totalSlides, paginationClass);
        // swiperInstance.on('slideChange', () => handleSlideChange(swiperInstance));
    });
}
/** 포커싱 이벤트 **/
function focusFn(){
    $("a, button").on("focus", function() {
        $(this).addClass("is-focus");
    }).on("blur", function() {
        $(this).removeClass("is-focus");
    });
}
/** 다크모드 온/오프 **/
function toggleBtnFn(){
    let BODY = document.body;
    let SIDENAV = document.querySelector('.side-nav');
    let MODESWITCH = SIDENAV.querySelector('.btn-modeSwitch');
    let DARKMODE = localStorage.getItem('dark-mode');

    /** 
     * dark | light switch mode 
     **/
    const enableDarkMode = () => {
        MODESWITCH.classList.replace('fa-sun', 'fa-moon');
        BODY.classList.add('switch-dark');
        localStorage.setItem('dark-mode', 'enabled');
    };
    const disableDarkMode = () => {
        MODESWITCH.classList.replace('fa-moon', 'fa-sun');
        BODY.classList.remove('switch-dark');
        localStorage.setItem('dark-mode', 'disabled');
    };
    if (DARKMODE === 'enabled') {
        enableDarkMode();
    }
    MODESWITCH.onclick = (e) => {
        DARKMODE = localStorage.getItem('dark-mode');
        if (DARKMODE === 'disabled') {
        enableDarkMode();
        } else {
        disableDarkMode();
        }
    };
}
/** 스크롤 TOP 이벤트 **/
function scrollTop(){
	var scrollTopBtn = $('.scroll-top');/* 스크롤에 따른 hidden처리 */
	$(window).scroll(function(){
		var topPos = $(this).scrollTop();
		if(topPos <500){
			scrollTopBtn.removeClass('is-visible');
		}else{
			scrollTopBtn.addClass('is-visible');
		}
	});
    scrollTopBtn.click(function(){
        $("html,body").animate({scrollTop:0}, 300);
    })
}

$.fn.tabFn = function () {
    let tabLi = $('>ul>li', this);
}
$.fn.setFormFn = function () {
    const $this = $(this),
        selBtn = $('> button', this),
        selCont = $('> ul', this),
        selValue = selCont.find('> li');
    selCont.hide();
    selBtn.click(function () {
        $(this).parent().toggleClass('is-open').find('ul').slideToggle('fast', 'swing');
    });
    selValue.click(function () {
        $(this).parent().prev('button').find('span').text($(this).text());
        selCont.slideUp('fast', 'swing');
        $this.removeClass('is-open');
    });
    selValue.hover(function () {
        $(this).toggleClass('is-hover');
    })
}
$.fn.buttonFn = function(){
    const $this = $(this);
    $this.addClass("fn-reset");
    setTimeout(function(){ 
        $this.removeClass("fn-reset"); 
    }, 400)
}

$.fn.fnInit = function () {
    $('.custom-sel').setFormFn();
    $('.evalList-tab').tabFn();
    $('.boxItem__reset').buttonFn();
};