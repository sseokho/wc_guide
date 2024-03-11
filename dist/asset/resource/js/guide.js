'use strict';

$(function () {
    $('html').fnInit();
    buttonFn();
    sideNav();
    folderTreeFn('.directory-tree-wrap');

});

$.fn.tabFn = function () {
    const linkWrap = $('.el-tab__link'),
    linkItem = linkWrap.find('li'),
    linkBtn = linkItem.find('button'),
    linkClose = linkItem.find('> span');

    $('.el-tab-wrap').parent().addClass('tabs-on');

    linkBtn.click(function(){
        const thisId = $(this).parent().data('id'),
        thisConId = $('#' + thisId);

        linkItem.removeClass('is-open');
        $(this).parent().addClass('is-open');
        $('.el-tab__cont').removeClass('is-open');
        thisConId.addClass('is-open');
    })
    linkClose.click(function(){
        const thisId = $(this).parent().data('id'),
        thisConId = $('#' + thisId);

        thisConId.remove();
        $(this).parent('li').remove();
    })
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
};

function buttonFn(){
    $('.boxItem__reset').click(function(){
        $(this).addClass("fn-reset");
        setTimeout(function(){ 
            $(".boxItem__reset").removeClass("fn-reset"); 
        }, 400)
    })
};

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

function sideNav(){ //side link navigation
    const scrollToSection = {
        init: function() {
            this.navLinks = document.querySelectorAll('.side-nav a');
            this.boxSections = document.querySelectorAll('.box-section');
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
            const targetBox = document.getElementById(`box-section--0${index + 1}`);
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

$.fn.fnInit = function () {
    $('.custom-sel').setFormFn();
    $('.el-tab-wrap').tabFn();
};

