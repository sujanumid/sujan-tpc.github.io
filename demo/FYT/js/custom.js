// JavaScript Document
$('.grid').masonry({
  // options
  itemSelector: '.grid-item'
});
$(document).ready(function() {
	$('.slider').slick({
		autoplay: true,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		variableWidth:true,
		arrows:false
	});
});

$(document).on('click','.question-group a',function(e){
	e.preventDefault();
	$(this).siblings('.answer').slideToggle();
});



//Add this code- SOCIAL SHARE//
$(document).on('click', '.share-post a', function(event) {
	event.preventDefault();
	url = $(this).attr('href')
	window.open(url,'name','width=600,height=400')
});