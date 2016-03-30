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
        }).then(function(){
            $('.toggle').show();
        }).then(function(){
            $('#get-projects').attr('disabled', 'disabled');
        })
    });
    $(document).on('mouseenter','.project',function(e) {
      $(this).find('.details').fadeIn();
    });
    $(document).on('mouseleave','.project',function(e) {
      $(this).find('.details').fadeOut();
    });
    $('input[name=show]').on('change',function(e){
        if($(this).attr('id') == 'show3'){
            $('.project').slice(3,20).each(function(index, el) {
                $(this).addClass('hide')
            });
        }else{
            $('.project').removeClass('hide')
        }
    })
})();
