statAnimate();
$('#da-slider').cslider({
	autoplay	: true,
	bgincrement	: 1000
});

var waypoints = $('.da-slider,.inner').waypoint({
  handler: function(direction) {
  	$('.navbar-default').addClass('active')
  }
})

var waypoints = $('.menus').waypoint({
  handler: function(direction) {
  	$('.navbar-default').removeClass('active')
  }
})


//about content change
$('.about-link a').on('click', function(event) {
	event.preventDefault();
	linkText = $(this).text();
	if(linkText == "personal bio "){
		$(this).text('professional bio ')
	}else{
		$(this).text('personal bio ')
	}
	active = $('.about-section.active');
	notactive = $('.about-section:not(.active)');
		
		active.fadeOut('slow', function() {
			notactive.fadeIn('slow');
			active.removeClass('active')
			notactive.addClass('active')
		});
	
});


//stat content change
$('.stat-link').on('click', function(event) {
	event.preventDefault();
	linkText = $(this).text();
	console.log(linkText)
	if(linkText == "As a batsman →"){
		$(this).text('As a bowler →')
	}else{
		$(this).text('As a batsman →')
	}
	active = $('.stat-section.active');
	notactive = $('.stat-section:not(.active)');
		
		active.fadeOut('slow', function() {
			notactive.fadeIn('slow');
			//stat animation when section change
			statAnimate();
			active.removeClass('active')
			notactive.addClass('active')
		});
	
});

//stat animation when tab change
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  statAnimate()
})

//number animation
function statAnimate(){
$('.stat-value').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});
}


$('.search').on('click',function(e){
	e.preventDefault();
	$('body').addClass('search-on');
	$('.search-box').fadeIn('slow');
})

$('.close').on('click',function(e){
	$(this).parent().fadeOut('slow');
	$('body').removeClass('search-on');
})

$('.blog-wrapper').matchHeight();



/*============================================================================
  Social Icon Buttons v1.0
  Author:
    Carson Shold | @cshold
    http://www.carsonshold.com
  MIT License
==============================================================================*/
window.CSbuttons = window.CSbuttons || {};

$(function() {
  CSbuttons.cache = {
    $shareButtons: $('.social-sharing')
  }
});

CSbuttons.init = function () {
  CSbuttons.socialSharing();
}

CSbuttons.socialSharing = function () {
  var $buttons = CSbuttons.cache.$shareButtons,
      $shareLinks = $buttons.find('a'),
      permalink = $buttons.attr('data-permalink');

  // Get share stats from respective APIs
  var $fbLink = $('.share-facebook'),
      $twitLink = $('.share-twitter'),
      $pinLink = $('.share-pinterest'),
      $googleLink = $('.share-google');

  if ( $fbLink.length ) {
    $.getJSON('https://graph.facebook.com/?id=' + permalink + '&callback=?', function(data) {
      if (data.shares) {
        $fbLink.find('.share-count').text(data.shares).addClass('is-loaded');
      } else {
        $fbLink.find('.share-count').remove();
      }
    });
  };

  if ( $twitLink.length ) {
    $.getJSON('https://cdn.api.twitter.com/1/urls/count.json?url=' + permalink + '&callback=?', function(data) {
      if (data.count > 0) {
        $twitLink.find('.share-count').text(data.count).addClass('is-loaded');
      } else {
        $twitLink.find('.share-count').remove();
      }
    });
  };

  if ( $pinLink.length ) {
    $.getJSON('https://api.pinterest.com/v1/urls/count.json?url=' + permalink + '&callback=?', function(data) {
      if (data.count > 0) {
        $pinLink.find('.share-count').text(data.count).addClass('is-loaded');
      } else {
        $pinLink.find('.share-count').remove();
      }
    });
  };

  if ( $googleLink.length ) {
    // Can't currently get Google+ count with JS, so just pretend it loaded
    $googleLink.find('.share-count').addClass('is-loaded');
  }

  // Share popups
  $shareLinks.on('click', function(e) {
    e.preventDefault();
    var el = $(this),
        popup = el.attr('class').replace('-','_'),
        link = el.attr('href'),
        w = 700,
        h = 400;

    // Set popup sizes
    switch (popup) {
      case 'share-twitter':
        h = 300;
        break;
      case 'share-fancy':
        w = 480;
        h = 720;
        break;
      case 'share-google':
        w = 500;
        break;
    }

    window.open(link, popup, 'width=' + w + ', height=' + h);
  });
}

$(function() {
  window.CSbuttons.init();
});