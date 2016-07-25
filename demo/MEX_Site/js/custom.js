
$('.feedback-form').on('submit',function(e) {
	e.preventDefault();
	$('#feedback-modal').modal('show')
});

$('#feedback-modal').on('hide.bs.modal', function (e) {
	$('.feedback-form')[0].reset()
})

$(document).ready(function(){
	$(".main-slider").owlCarousel({
		animateOut: 'bounceOutLeft',
    	animateIn: 'bounceInRight',
		items:1,
		autoplay:true,
		loop:true
	});
	$(".ad-slider").owlCarousel({
		animateOut: 'fadeOut',
    	animateIn: 'fadeIn',
		items:1,
		autoplay:true,
		loop:true
	});
});

$('#verticalTab').easyResponsiveTabs({
	type: 'vertical'
});
$('.horizontalTab').easyResponsiveTabs();

//masonry grid for gov affairs updates
$('.grid').masonry({
  itemSelector: '.grid-item'
});

$('.event-popover').popover()

//gets url parameter
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$(document).ready(function($) {
	var activeTab = getUrlParameter('tab');
	tabEnable(activeTab);

	var oSpan;
	var oWidest;
	var nWidest = 0;

	$('.team-ribbon').each(function(i) {
	    oSpan = $(this);
	    oWidth = oSpan.outerWidth();
	    if( oWidth >= nWidest ) {
	        nWidest = oWidth;
	        oWidest = oSpan;
	    }
	});
	$('.team-ribbon').each(function(index, el) {
		$(this).css('width',nWidest)
	});
	$('.inner-scroll').slimScroll({
        height: '520px'
    });
    $('.matchHeight,.team-block').matchHeight();
    $('.tabHeight').matchHeight({ property: 'min-height' });
});


$(window).load(function() {
  $("body").removeClass("preload");
});

function tabEnable(tabName){
	$("[data-tab='"+tabName+"']").trigger('click')
}

$('.search-btn').on('click',function(event) {
	event.preventDefault();
	if($(this).hasClass('search-now')){
		$('.search-bar-wide').fadeOut();
		$(this).removeClass('search-now');
		$('.search-bar-wide').submit();
	}else{
		$(this).addClass('search-now');
		$('.search-bar-wide').fadeIn();
		$('.search-bar-wide :input').focus();
	}
});

$('.search-bar-wide :input').on('blur',function(e){
	$('.search-bar-wide').fadeOut();
	$('.search-btn').removeClass('search-now');
})


