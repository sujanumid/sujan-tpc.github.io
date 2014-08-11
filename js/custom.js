// JavaScript Document

$(document).ready(function(e) {
	$('.home').height(getHeight(window));
	$('.home-container').height(getOuterHeight('.sujan-title')+getOuterHeight('.sujan-gif')+getOuterHeight('.border-box')+getOuterHeight('.credits'));
});


//character moving function
keyCount = 6; // variable used to act as frame counter. changes character background position every 6 counts
$('html').keydown(function(e){
	if (keyCount == 6){
		keyCount = 1;
		// up arrow
		if ((e.keyCode || e.which) == 38)
		{   
		
			//bound left side
			if($('#ground').position().left == 0){
				$('.character').css('left','50%');
			}else{
				//$('.character').css('left', parseInt($('.character').css('left'))-20);
				$('#ground').css({
					'left':parseInt($('#ground').css('left'))+10,
					'width':parseInt($('#ground').css('width'))-10
				});
				if($('.character').css('background-position') == '-150px 0px'){
					$('.character').css('background-position', '-100px 0px');
				} else {
					$('.character').css('background-position', '-150px 0px');
				}
			}
		}
		// down arrow
		if ((e.keyCode || e.which) == 40)
		{
			//$('.character').css('left', parseInt($('.character').css('left'))+20);
			$('#ground').css({
				'left':parseInt($('#ground').css('left'))-10,
				'width':parseInt($('#ground').css('width'))+10
			});
			if($('.character').css('background-position') == '0px 0px'){
				$('.character').css('background-position', '-50px 0px');
			} else {
				$('.character').css('background-position', '0px 0px');
			}
		}  
	}
	keyCount++;
	if(parseInt($('.character').css('left')) > $(window).width())
	{
		$('.character').css('left', -parseInt($('.character').width()));
	}
});


//returns character to standing position
$('html').keyup(function(e){
	if($('.character').css('background-position') == '-50px 0px'){
		$('.character').css('background-position', '0px 0px');
	}
	if($('.character').css('background-position') == '-100px 0px'){
		$('.character').css('background-position', '-150px 0px');
	} 
});

$(window).load(function(e){
	$(".sujan-title").addClass('animated bounceInLeft'); // Title in home section flys in from left
});


//get height of an element
function getHeight(element){
	return $(element).height();
}

//get height of an element including margin
function getOuterHeight(element){
	return $(element).outerHeight(true);
}

$('.venobox').venobox(); 

//typed.js initialise
$(function(){
	$("#typed").typed({
		strings: ["Hi! I'm Sujan Khadgi.","I'm 22 and I'm from Nepal.", "I'm an Interactive Designer."],
		typeSpeed: 60,
		backDelay: 500,
	});
});


//tooltop initialise
$('.help').tooltip();