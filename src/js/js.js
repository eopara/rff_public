$(document).ready( function() {
});

$(window).on("load", function() {

  //disable save as functionality to images that are not background-images
  $("body").on("contextmenu", "img", function(e) {
    return false;
  });
  // event handlers
  initArtistControls();
  initSearch();
  initMenu();
  initFilters();
  var height;
  var trigger = 50;
  $(window).resize( function() {
    height = $(document).height()-$(window).height();
  });

  lazyLoad();
  $(window).scroll(function() {
    height = $(document).height()-$(window).height();
    if ($(this).scrollTop() > height - trigger) {
      $( '.footer').slideDown(300);
    } else {
      $('.footer').slideUp(300);
    }
		lazyLoad();
  });

  $('.small-video-c').each( function() {
    initFullScreenSlideshow($(this));
  });
  $('.small-slideshow-c').each( function() {
    initFullScreenSlideshow($(this));
  });
  $('.hero-container').each (function () {
    initSlideshow($(this));
  });
  $('.feat-col').each (function () {
    initSlideshow($(this));
  });
  $('.preview-slideshow-c').each (function () {
    initSlideshow($(this));
  });
  $('.exhibit-c').each (function () {
    initSlideshow($(this));
  });


  var didScroll;
  var lastScrollTop = 0;
  var delta = 1;
  var navbarHeight = $('.header').outerHeight();

  $(window).scroll(function(event){
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
      return;
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
      // Scroll Down
      $('.header').removeClass('nav-down').addClass('nav-up');
    } else {
      // Scroll Up
      if(st + $(window).height() < $(document).height()) {
        $('.header').removeClass('nav-up').addClass('nav-down');
      }
    }
    lastScrollTop = st;
  }
});

$(window).resize(function() {
});

function lazyLoad() {
	var scrollTop = $(window).scrollTop();
	var offset = 100, animationTime = 1500;
	$(".lazy").each(function() {
		if(scrollTop + window.innerHeight > $(this).offset().top + offset) {
			$(this).removeClass("unloaded");
      $(".fade-overlay", this).removeClass("unloaded");
		}
	});
}

function initArtistNav() {
  $('.navigation-menu .artist-nav span').each(function () { // for each span
    var target = $(this).html(); // get the text of the span
    var scrollObj = $(".artist-list-c .list-c").has("span[data-alphabet=" + target + "]"); // use the text of the span to create an ID and get the top position of that elementA
    var scrollPos = 0;
    if (scrollObj.length > 0 && scrollObj.position().top != undefined) {
      var scrollPos = scrollObj.position().top;
    }
    console.log(scrollPos);
    $(this).click(function () { // when you click each span
      $('.artist-list-c').animate({ // animate your right div
        scrollTop: scrollPos // to the position of the target
      }, 400);
    });
  });
}

function initArtistControls() {
  //controls on expanded menu on the exhibition / artist page
  $('.artist-col-c .expand-btn').click( function(e) {
    $('.expand-c').each (function () {
      if ($(this).hasClass('active')) {
        $(this).siblings('.expand-btn').children('span').removeClass('close');
        $(this).removeClass('active');
      }
    });
    $(this).find('span').addClass('close');
    var activeMenu = $(this).siblings('.expand-c');
    activeMenu.addClass('active');
  });
}



function initSearch() {
  $("#search").change(function() {
    $("#search-form").submit(function(e) {
      e.preventDefault();
      var query = $(this).serialize();
      query[csrfTokenName] = csrfTokenValue;
      console.log(query);

      $.ajaxSetup ({
        cache: false
      });

      $.ajax({
        type: "POST",
        url: "../search/_results.html",
        data: query,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        success: function(data, textStatus) {
          $('.results-container').html(data);
          $('.results-container').addClass('active');
        },
        error: function() {
          $('.results-container').removeClass('active');
        }
      });
    });
  });
}


function initMenu() {
  $('.menu-btn-c').click( function(e) {
    var activeClass = $(this).data('exType');

    if ($('.expanded-nav').hasClass(activeClass)) {

      $('.expanded-nav').removeClass(activeClass);
    }

    else {
      $('.menu-btn-c span').removeClass('close');
      $('.expand-nav, .search-menu, .artist-expand').removeClass('active');
      $('.expanded-nav').removeClass('expand-nav search-menu artist-expand');

      $('.expanded-nav').addClass(activeClass);
      $('.' + activeClass).addClass('active');
    }

    if(activeClass == "artist-expand") {
      initArtistNav();
    }

    if($(this).hasClass('main')) { //main navigation
      //animate hamburger menu
      $('.menu-btn-c span').each ( function() {
        $(this).toggleClass('close');
      });
    }

    if($('.expanded-nav').hasClass(activeClass)) {
      $('.body-container').addClass('mask');
      $('body').addClass('lock-scroll');
      $('.thumb-img, .img-slide-c, .thumbnail, .hero-img, .slide-img, img').addClass('dim');
    }

    else {
      $('.body-container').removeClass('mask');
      $('.thumb-img, .img-slide-c, .thumbnail, .hero-img, .slide-img, img').removeClass('dim');
      $('body').removeClass('lock-scroll');
    }
  });

  $('.close-btn').click( function(e) {
    $('.expanded-nav').removeClass('artist-expand');
    $('.expanded-nav').removeClass('search-menu');
    $('.menu-panel').removeClass('active');
    $('.body-container').removeClass('mask');
    $('body').removeClass('lock-scroll');
    $('.thumb-img, .img-slide-c, .thumbnail, .hero-img, .slide-img, img').removeClass('dim');
  });

  //mobile menu links
  $('.mobile-search').click( function(e) {
    $('.expanded-nav').removeClass('expand-nav');
    $('.expand-nav, .search-menu, .artist-expand').removeClass('active');
    $('.expanded-nav').removeClass('expand-nav search-menu artist-expand');
    $('.expanded-nav').addClass('search-menu');
    $('.search-menu').addClass('active');
  });

  $('.mobile-ai').click( function(e) {
    $('.expanded-nav').removeClass('expand-nav');
    $('.expand-nav, .search-menu, .artist-expand').removeClass('active');
    $('.expanded-nav').removeClass('expand-nav search-menu artist-expand');
    $('.expanded-nav').addClass('artist-expand');
    $('.artist-expand').addClass('active');
  });
}

// ///////////////////////////////////////////
// F I L T E R
// //////////////////////

function initFilters() {

  var activeClass = $('.filters-c .grid-select span.active').data('view');
  $('.views-c .'+ activeClass ).addClass('active');
  setTimeout(function() {
    $('.views-c div.active').addClass('fade');
  }, 200);

  $('.filters-c .filter-col .grid-select span').click( function(e) {
    $('.views-c div.active').removeClass('fade');
    $('.views-c div.active').removeClass('active');
    $('.filters-c .filter-col .grid-select span').removeClass('active');
    $(this).addClass('active');
    activeClass = $('.filters-c .grid-select span.active').data('view');
    $('.views-c .'+ activeClass ).addClass('active');
    if ($('.list-view').hasClass('active')) {
      $('.pagination-c').addClass('hide');
    }

    else {
      $('.pagination-c').removeClass('hide');
    }
    setTimeout(function() {
      $('.views-c div.active').addClass('fade');
    }, 200);
  });


  //fiter menu expand on click
  $('.filters-c .filter-col .expand-btn' ).click ( function(e) {
    $('.filters-c .filter-col .expand-btn span' ).toggleClass('close');
    $('.filters-c .filters-expand' ).toggleClass('active');
  });


  //ordering menu expand
  $('.filters-c .filter-col .sort-btn' ).click ( function(e) {
    $('.filters-c .filter-col .sort-btn img' ).toggleClass('flip');
    $('.filters-c .order-expand' ).toggleClass('active');
  });

  //click function for the individual filters
  $('.filters-expand .checkbox' ).click ( function(e) { $(this).toggleClass('active'); });

  $('.order-col .checkbox' ).click ( function(e) {
    $('.order-col .checkbox').removeClass('active');
    $(this).toggleClass('active');
  });

  var url = new URL(window.location.href);
  var filter = url.searchParams.get("filter");
  $(".order-col .checkbox-c .checkbox[data-filter='" + filter + "']").addClass('active');

  //retrieve the data target to 'category' then loop through the data-categories array for each grid element, if category != data-categories, add class display none; all classes with that filter selected display none
  $(".order-col .checkbox-c .checkbox[data-filter=" + filter + "]").addClass('active'); //if a filter is removed loop through each element and turn it active
  $('.filters-expand .nav-filter' ).click ( function(e) {
    var target_cat = $(this).data('target');
    console.log(target_cat);
    //loop through each grid element
    $('.grid-wrapper .grid-item-c').each( function() {
      var category_array = $(this).data('categories');
      var active = false;

      for ( var i = 0; i < category_array.length; i++ ) {
        if (target_cat == category_array[i]) {
          if ( $('.nav-filter[data-target="' + target_cat + '"]').hasClass('active') ) {
            active = true; break;
          }
        }
      }

      if ( active && $('.nav-filter[data-target="' + target_cat + '"]').hasClass('active')) {
        $(this).addClass('active');
        $(this).removeClass('hide');
      }

      else if ( active == false && $('.nav-filter[data-target="' + target_cat + '"]').hasClass('active')) {
        $(this).removeClass('active');
        $(this).addClass('hide');
      }

      else {
        $(this).addClass('active');
        $(this).removeClass('hide');
      }
    });
    $('.grid-wrapper .grid-item-c').each( function() {

    });
  });
}
// some demo tings

function getWindowCoords() {
  if (window.innerWidth || window.innerHeight) {
    return [window.innerWidth,window.innerHeight];
  } else {
    return [(document.documentElement.clientWidth||document.body.clientWidth||document.body.scrollWidth),(document.documentElement.clientHeight||document.body.clientHeight||document.body.scrollHeight)];
  }
}

function initFullScreenSlideshow(sliderC) { //replace background images in divs with the correct slideshow update the DOM and animate div container

  var galleryControls = sliderC.children(".thumb-wrapper").find('.gallery-btn');
  var thumbnail = sliderC.children(".thumb-wrapper").find('.thumb-img');
  var fullScreenContainer = sliderC.children(".fullscreen-slideshow");

  fullScreenContainer.each (function () {
    initSlideshow($(this));
  });

  thumbnail.add(galleryControls).click(function (e) {
    //load the images on click
    var slideshow = fullScreenContainer.children('.full-slideshow-c');

    $(slideshow).find('.slide-container').each( function() {
      var url = $(this).find('.full-img').data("imageUrl");
      $(this).find('.full-img').css("background-image", url);
      $(this).find('.slide-container').addClass('active');
    });

    $(this).children('.slide-center-btn').children('.expand-btn').children('span').toggleClass('close');
    fullScreenContainer.toggleClass('active');
    $('.menu').addClass('hide');
    $('.header').addClass('hide');
    $('body').addClass('lock-scroll');
    $('.body-container').addClass('mask');
    $(window).scrollTop("0");
  });

  $('.close-btn').click(function (e) {
    //close the slideshow and reanimate the items on the screen
    galleryControls.find('.slide-center-btn').children('.expand-btn').children('span').removeClass('close');
    fullScreenContainer.removeClass('active');
    $('.menu').removeClass('hide');
    $('.header').removeClass('hide');
    $('body').removeClass('lock-scroll');
    $('.body-container').removeClass('mask');
  });
}
function initSlideshow(sliderC) {
  // change this to support multiple slideshows on page
  //
  //

  var heroSlider = sliderC.children(".hero-slideshow-c");
  var previewSlider = sliderC.children(".slideshow-container");
  var slider = sliderC.children(".homepage-slideshow-c");
  var sliderExhibition = sliderC.children(".exhibition-slideshow-c");
  var sliderFullscreen= sliderC.children(".full-slideshow-c");

  sliderFullscreen.slick({
    infinite: true,
    lazyLoad: 'ondemand',
    slidesToShow: 1,
    arrows: false,
    fade: true,
    autoplay: false
  });

  sliderExhibition.slick({
    infinite: true,
    slidesToShow: 1,
    arrows: false
  });

  previewSlider.slick({
    infinite: true,
    slidesToShow: 3,
    arrows: false
  });

  slider.slick({
    infinite: true,
    slidesToShow: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000
  });

  heroSlider.slick({
    infinite: false,
    slidesToShow: 1,
    arrows: false
  });


  //INITIALIZE SLIDER CONTROLS
  sliderExhibition.on("afterChange", function(e, s, currentSlide) { //feature exhibition slideshows
    $(this).siblings(".dots").children(".dot").removeClass("active").filter("[data-index=" + currentSlide + "]").addClass("active");
  });
  slider.on("afterChange", function(e, s, currentSlide) { //homepage slideshows
    $(this).siblings(".dots").children(".dot").removeClass("active").filter("[data-index=" + currentSlide + "]").addClass("active");
  });

  $(".dots .dot", sliderC).click(function() { //homepage slideshows
    slider.slick("slickGoTo", $(this).data("index"));
  });

  $(".dots .dot", sliderC).click(function() { //feature exhibitions slideshow
    sliderExhibition.slick("slickGoTo", $(this).data("index"));
  });

  //////////////////////////////////////////////////////
  //hero slideshow controls

  $(".slide-arrow-btn.left", sliderC).click(function() {
    heroSlider.slick("slickPrev");
  });

  $(".slide-arrow-btn.right", sliderC ).click(function() {
    heroSlider.slick("slickNext");
  });
  /////////////////////////////////////////////////////////
  //
  ////////////////////////////////////////////////////////
  //preview slideshow

  $(".slide-arrow-btn.left", sliderC ).click(function() {
    previewSlider.slick("slickPrev");
  });

  $(".slide-arrow-btn.right", sliderC).click(function() {
    previewSlider.slick("slickNext");
  });
  ////////////////////////////////////////////////////////
  //fullscreen slideshow

  $(".slide-arrow-btn.left", sliderC ).click(function() {
    sliderFullscreen.slick("slickPrev");
  });

  $(".slide-arrow-btn.right", sliderC).click(function() {
    sliderFullscreen.slick("slickNext");
  });
  ////////////////////////////////////////////////////////
}

