signup = document.getElementsByClassName('btn-signup');
login = document.getElementsByClassName('login');
overlay = document.getElementsByClassName('overlay');

signup[0].addEventListener('click',function(e){
	e.preventDefault();
	modal('signup');
});

login[0].addEventListener('click',function(e){
	e.preventDefault();
	modal('login');
});

function modal(modaltype){
	document.getElementById('signup').style.display = (modaltype == "signup") ? "block" : "none"
	document.getElementById('login').style.display = (modaltype == "login") ? "block" : "none"
	overlay[0].style.opacity = (overlay[0].style.opacity == "0") ? "1" : "0";
	overlay[0].style.zIndex = (overlay[0].style.zIndex == "-1") ? "1" : "-1";
}

overlay[0].addEventListener('click',function(e){
	if( e.target == this ) {
		modal();
	}
});