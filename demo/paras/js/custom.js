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

$('.blog-wrapper').matchHeight();