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