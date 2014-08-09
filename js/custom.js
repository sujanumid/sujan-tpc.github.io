// JavaScript Document

$(document).ready(function(e) {
	$('.home').height(getHeight(window));
	$('.home-container').height(getOuterHeight('.sujan-title')+getOuterHeight('.sujan-gif')+getOuterHeight('.border-box')+getOuterHeight('.credits'));
});

$(window).load(function(e){
	$(".sujan-title").addClass('animated bounceInLeft');
});

function getHeight(element){
	return $(element).height();
}

function getOuterHeight(element){
	return $(element).outerHeight(true);
}

$('.venobox').venobox(); 

$(function(){
	$("#typed").typed({
		strings: ["Hi! I'm Sujan Khadgi.","I'm 22 and I'm from Nepal.", "I'm an Interactive Designer."],
		typeSpeed: 60,
		backDelay: 500,
	});
});

