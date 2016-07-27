$(document).ready(function(){
	$(".main-slider").owlCarousel({
		animateOut: 'bounceOutLeft',
    	animateIn: 'bounceInRight',
		items:1,
		autoplay:true,
		loop:true
	});
	$(".member-slider").owlCarousel({
		animateOut: 'fadeOut',
    	animateIn: 'fadeIn',
		items:1,
		autoplay:true,
		loop:true
	});
	var activeTab = getUrlParameter('tab');
	tabEnable(activeTab);

	equalWidth($('.ribbon:not(.sidebar .ribbon)'));

	$('.inner-scroll').slimScroll({
        height: '520px',
        allowPageScroll : true
    });
    $('.matchHeight,.team-block').matchHeight();
    $('.tabHeight').matchHeight({ property: 'min-height' });
});

$('#verticalTab').easyResponsiveTabs({
	type: 'vertical'
});
$('.horizontalTab').easyResponsiveTabs();

//masonry grid for gov affairs updates
$('.grid').masonry({
  itemSelector: '.grid-item'
});

$('.event-popover').popover({ html : true, container: 'body'})

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


//equalises width of elements
function equalWidth(selector){
	var oWidest;
	var nWidest = 0;
	selector.each(function(i) {
	    oWidth = $(this).actual( 'outerWidth' )
	    if( oWidth >= nWidest ) {
	        nWidest = oWidth;
	        oWidest = $(this);
	    }
	});
	selector.each(function(index, el) {
		$(this).css('width',nWidest)
	});
}

//removes preload class from body which prevents css transition
$(window).load(function() {
  $("body").removeClass("preload");
});

//triggers click event on tabs to enable them
function tabEnable(tabName){
	$("[data-tab='"+tabName+"']").trigger('click')
}

//search bar show and hide
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

$('.input-group-btn .close').on('click',function(e){
	$('.search-bar-wide').fadeOut();
	$('.search-btn').removeClass('search-now');
})


//modal show and hide for form
$('.feedback-form').on('submit',function(e) {
	e.preventDefault();
	$('#feedback-modal').modal('show')
});

$('#feedback-modal').on('hide.bs.modal', function (e) {
	$('.feedback-form')[0].reset()
})
