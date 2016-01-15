// JavaScript Document

$(document).ready(function(e) {
	$('.header').height($(window).outerHeight()-70);
	$('.loader-backdrop').height($(window).outerHeight());
	if(sessionStorage.getItem('pageNo')){
		pageDisable(sessionStorage.getItem('pageNo'));
	}else{
		pageNo = $('.next').attr('page');
		sessionStorage.setItem('pageNo',pageNo);
		pageDisable(pageNo);
	}
});

//sticky navbar
$(function() {
	// Do our DOM lookups beforehand
	var nav_container = $(".nav-container");
	var nav = $("nav");
	
	var top_spacing = 0;
	var waypoint_offset = 21;

	nav_container.waypoint({
		handler: function(event, direction) {
			if (direction == 'down') {
				nav.stop().addClass("sticky").css("top",-nav.outerHeight()).animate({"top":""});
			} else {
				nav.stop().removeClass("sticky").css("top",nav.outerHeight()+waypoint_offset).animate({"top":""});
			}
		},
		offset: function() {
			return -nav.outerHeight()-waypoint_offset;
		}
	}); 
});

//scrollto
$('.navbar a:not(#resume)').on('click',function(e){
	e.preventDefault();
	var destination = $(this).attr('href');
	$.scrollTo(destination, 1000, {
		easing:'easeInOutCirc',
		over:0.01
	});
});


//behance API
var apiKey  = 'f8ovCnQNCJlsHXtPEKrWfvB43FnJ9Tjt';
var userID  = '___sujan';
var perPage = 8;
var behanceProjectAPI = 'http://www.behance.net/v2/users/' + userID + '/projects?callback=?&api_key=' + apiKey + '&per_page=' + perPage;
var mainTemplate;
$(document).ready(function() {
	(function() {
		function setPortfolioTemplate() {
			var projectData = JSON.parse(sessionStorage.getItem('behanceProject')),
				getTemplate = $('#portfolio-template').html();
				mainTemplate    = getTemplate;
				template    = Handlebars.compile(getTemplate),
				result      = template(projectData);

			$('#portfolio').html(result);
		};
		
		if(sessionStorage.getItem('behanceProject')) {
			setPortfolioTemplate();
		} else {
			$.getJSON(behanceProjectAPI, function(project) {
				var data = JSON.stringify(project);
				sessionStorage.setItem('behanceProject', data);
				setPortfolioTemplate();
			});
		};
	})();
	if(sessionStorage.getItem('pageNo')){
		$('.next').attr('page',sessionStorage.getItem('pageNo'));
	}else{
		sessionStorage.setItem('pageNo',$('.next').attr('page'));
	}
});

//pagination
$(document).on('click','.next',function(e){
	$('.loader-backdrop').fadeIn();
	$('body').addClass('modal-open');
	pageNo = parseInt(sessionStorage.getItem('pageNo'))+1;
	sessionStorage.setItem('pageNo',pageNo);
	templating(pageNo);
	$('.loader-backdrop').fadeOut();
	$('body').removeClass('modal-open');
});

$(document).on('click','.prev',function(e){
	$('.loader-backdrop').fadeIn();
	$('body').addClass('modal-open');
	if(!$(this).hasClass('disabled')){
		pageNo = parseInt(sessionStorage.getItem('pageNo'))-1;
		sessionStorage.setItem('pageNo',pageNo);
		templating(pageNo);
		$('.loader-backdrop').fadeOut();
	$('body').removeClass('modal-open');
	}
});

function templating(pageNo){
	var behanceProjectAPI = 'http://www.behance.net/v2/users/' + userID + '/projects?callback=?&api_key=' + apiKey + '&per_page=' + perPage + '&page=' + pageNo;
	function setPortfolioTemplate() {
		var projectData = JSON.parse(sessionStorage.getItem('behanceProject')),
			getTemplate = mainTemplate,
			template    = Handlebars.compile(getTemplate),
			result      = template(projectData);
	
		$('#portfolio').html(result);
	};
	$.getJSON(behanceProjectAPI, function(project) {
		var data = JSON.stringify(project);
		sessionStorage.setItem('behanceProject', data);
		setPortfolioTemplate();
		pageDisable(pageNo);
	});
};

function pageDisable(pageNo){
	var nextPage = parseInt(pageNo) + 1;
	var behanceProjectAPI = 'http://www.behance.net/v2/users/' + userID + '/projects?callback=?&api_key=' + apiKey + '&per_page=' + perPage + '&page=' + nextPage;
	if(pageNo == 1){
		$('.prev').addClass('disabled');
	}else{
		$('.prev').removeClass('disabled');
	}
	$.getJSON(behanceProjectAPI, function(project) {
		if(project.projects.length == 0){
			$('.next').addClass('disabled');
		}else{
			$('.next').removeClass('disabled');
		}
	});
}

//show project details
$(document).on('click','.project-thumb',function(e){
	e.preventDefault();
	$('.loader-backdrop').fadeIn();
	$('body').addClass('modal-open');
	var $this =	$(this),
		projectID = $this.data('project-id'),
		beProjectContentAPI = 'http://www.behance.net/v2/projects/'+ projectID +'?callback=?&api_key=' + apiKey,
		keyName = 'behanceProjectImages-' + projectID;
		var projectDesc;
		var projectFields;
		
	function showProject(dataSource) {
		//gets project description and tags
		$.getJSON(beProjectContentAPI, function( json ) {
			projectDesc = json.project.description;
			projectFields = json.project.fields;
			projectName = json.project.name;
			projectURL = json.project.url;
			//assign images
			$('#project-modal .project-images').html('');
			$('#project-modal .project-desc .tags').html('');
			$('#project-modal .project-desc .creative-fields').html('');
			$('#project-modal .modal-title').html(projectName);
			for(i=0;i<dataSource.length;i++){
				$('#project-modal .project-images').append('<img src="'+dataSource[i].src+'" alt="project">')
			}
			//assign project desc
			$('#project-modal .project-desc .desc').html("<p>"+projectDesc+"</p>");
			for(j=0;j<projectFields.length;j++){
				$('#project-modal .project-desc .creative-fields').append("<li>"+projectFields[j]+"</li>");
			}
			$('.behance-link').attr('href',projectURL);
			//open modal
			$('#project-modal').modal();
			$('.loader-backdrop').fadeOut();
		});
	};

	if(localStorage.getItem(keyName)) {
		var srcItems = JSON.parse(localStorage.getItem(keyName));
		showProject(srcItems);
	} else {
		$.getJSON(beProjectContentAPI, function(projectContent) {
			var src = [];
			$.each(projectContent.project.modules, function(index, mod) {
				/*if(mod.src != undefined) {
					src.push({ src: mod.src });
				}*/
				if(mod.sizes.original != undefined){
					src.push({src: mod.sizes.original})
				}
			});
			showProject(src);
			var data = JSON.stringify(src);
			localStorage.setItem(keyName, data);
		});
	};
});