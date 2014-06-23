// JavaScript Document
var aHeight = $('.calendar-main').outerHeight();
var heightSample = aHeight - 140; //get height for article-content
$(document).ready(function() {
	initDot();
	$('.announcements').css({'height':aHeight});
	initSlider();
	initScroller();
	initVenoBox();
	initDot();
});

function initDot(){
	$('.rsTestimonial').dotdotdot({
		after: "i.fa-quote-right"
	});
	$('.testimony-desc').dotdotdot({
		watch: true,
		after: "i.fa-quote-right"
	});
}

function initVenoBox(){
	$('.lightbox').venobox({
		infinigall: true,
		frameheight: 80*$(window).height()/100,
	}); 
}

function initScroller(){
	$('.announcement-list, .event-list').slimScroll({
		allowPageScroll : false,
		opacity : 0.5,
		height: heightSample,
		distance: '0px',
	});
	
	$('.para').slimScroll({
		allowPageScroll : false,
		opacity : 0.5,
		height: '380px',
		distance: '0px',
	});
}

function initSlider(){
	/***init royal slide**/
	
	$.rsCSS3Easing.easeOutBack = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)';
	$('.testimonial-carousel').royalSlider({
		arrowsNav: true,
		arrowsNavAutoHide: true,
		fadeinLoadedSlide: false,
		controlNavigationSpacing: 0,
		controlNavigation: 'none',
		imageScaleMode: 'none',
		imageAlignCenter:false,
		blockLoop: true,
		loop: true,
		numImagesToPreload: 6,
		transitionType: 'fade',
		keyboardNavEnabled: true,
		block: {
			delay: 400
		},
		autoPlay: {
    		// autoplay options go gere
    		enabled: true,
    		pauseOnHover: true,
			delay: 5000
    	}
	});
	var slider = $('.royalSlider').data('royalSlider');
	slider.ev.on('rsAfterSlideChange', function(event) {
	});
}

$(document).on('click','.testimony-link',function(e){
	e.preventDefault();
	arg = $(this).attr('arg');
	$.post('admin/ajax/ajaxfunction.php?arg='+arg,function(data){
		$('#testimonial-modal .modal-testimony-content').empty();
		$('<span class="preloader"></span>').appendTo('#testimonial-modal .modal-testimony-content');
		$('#testimonial-modal').modal();
		if(data == 0){
			$('.preloader').fadeOut(function(){
				$('#testimonial-modal .modal-testimony-content').append("<span class='text-center empty-state warning'><strong>Something went wrong!</strong> Please try again later.</span>");
			});
		}else{
			$('.preloader').fadeOut(function(){
				$('#testimonial-modal').append(data);
			});
		}
	});
});
