(function(){
    var apiKey = 'f8ovCnQNCJlsHXtPEKrWfvB43FnJ9Tjt',
    userID  = '___sujan';
    url =  'http://www.behance.net/v2/users/' + userID + "/projects?callback=?&api_key=" + apiKey,
    $('#get-projects').on('click',function(){
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            success: function(response){
                for(i=0;i<response.projects.length;i++){
                    $('.projects').append('<div class="project col-md-4"><a href="'+response.projects[i].url+'" id="'+response.projects[i].id+'" target="_blank"><img class="thumb" src="'+response.projects[i].covers[404]+'"><div class="details"><span class="project-title">'+response.projects[i].name+'</span></div></a></div>');
                }
            }
        })
    });
    $(document).on('mouseenter','.project',function(event) {
      $(this).find('.details').fadeIn();
    });
    $(document).on('mouseleave','.project',function(event) {
      $(this).find('.details').fadeOut();
    });
})();
