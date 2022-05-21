/*
Daniyar Kuzekov
*/

/*

Style   : MobApp Script JS
Version : 1.0
Author  : Surjith S M
URI     : https://surjithctly.in/

Copyright © All rights Reserved 

*/

$(function() {
  "use strict";

  /*-----------------------------------
   * FIXED  MENU - HEADER
   *-----------------------------------*/
  function menuscroll() {
      var $navmenu = $('.nav-menu');
      if ($(window).scrollTop() > 50) {
          $navmenu.addClass('is-scrolling');
      } else {
          $navmenu.removeClass("is-scrolling");
      }
  }
  menuscroll();
  $(window).on('scroll', function() {
      menuscroll();
  });
  /*-----------------------------------
   * NAVBAR CLOSE ON CLICK
   *-----------------------------------*/

  $('.navbar-nav > li:not(.dropdown) > a').on('click', function() {
      $('.navbar-collapse').collapse('hide');
  });
  /* 
   * NAVBAR TOGGLE BG
   *-----------------*/
  var siteNav = $('#navbar');
  siteNav.on('show.bs.collapse', function(e) {
      $(this).parents('.nav-menu').addClass('menu-is-open');
  })
  siteNav.on('hide.bs.collapse', function(e) {
      $(this).parents('.nav-menu').removeClass('menu-is-open');
  })

  /*-----------------------------------
   * ONE PAGE SCROLLING
   *-----------------------------------*/
  // Select all links with hashes
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-toggle="tab"]').on('click', function(event) {
      // On-page links
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
              // Only prevent default if animation is actually gonna happen
              event.preventDefault();
              $('html, body').animate({
                  scrollTop: target.offset().top
              }, 1000, function() {
                  // Callback after animation
                  // Must change focus!
                  var $target = $(target);
                  $target.focus();
                  if ($target.is(":focus")) { // Checking if the target was focused
                      return false;
                  } else {
                      $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                      $target.focus(); // Set focus again
                  };
              });
          }
      }
  });
  /*-----------------------------------
   * OWL CAROUSEL
   *-----------------------------------*/
  var $testimonialsDiv = $('.testimonials');
  if ($testimonialsDiv.length && $.fn.owlCarousel) {
      $testimonialsDiv.owlCarousel({
          items: 1,
          nav: true,
          dots: false,
          navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>']
      });
  }

  var $galleryDiv = $('.img-gallery');
  if ($galleryDiv.length && $.fn.owlCarousel) {
      $galleryDiv.owlCarousel({
          nav: false,
          center: true,
          loop: true,
          autoplay: true,
          dots: true,
          navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>'],
          responsive: {
              0: {
                  items: 1
              },
              768: {
                  items: 3
              }
          }
      });
  }

}); /* End Fn */


function myFunction() {
  var input, filter, ul, li, a, i, txtValue, otras;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    otras = li[i].getElementsByTagName("div")[0];
    txtValue = a.innerText + otras.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

var acc = document.getElementsByClassName("accor");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

var gallery = undefined;

function closeMenu() {
  $(".navbar-collapse").removeClass("show"); 
}

function highlightMenu(no) {
  $(".navbar .navbar-nav > .nav-item").removeClass('selected');
  $(".navbar .navbar-nav > .nav-item > .nav-link[data-no='" + no + "']").parent().addClass('selected');
}

function setupGallery() {
  gallery = $('.gallery-slider').slick({
    slidesToShow: 5,
    slidesToScroll: 3,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
}

function openPage(no) {
  if(no == 2) {
    if(gallery == undefined) {
      setupGallery();
    } else {
      $('.gallery-slider').slick('unslick');
      setupGallery();
    }    
  }

  $('.cd-hero-slider li').hide();
  $('.cd-hero-slider li[data-page-no="' + no + '"]')
    .fadeIn();
}

$(window).on('load', function() {
  $('body').addClass('loaded');
  openPage(1);
});

jQuery(function() {
    $('.tm-page-link').on('click', function(){
      var pageNo = $(this).data('page-no');
      openPage(pageNo);
      highlightMenu(pageNo);
    });

    $(".navbar .navbar-nav > .nav-item > a.nav-link").on('click', function(e){
      var pageNo = $(this).data('no');

      openPage(pageNo);
      highlightMenu(pageNo);
      closeMenu();     
    });

    $("html").click(function(e) {
      closeMenu();
    });
});