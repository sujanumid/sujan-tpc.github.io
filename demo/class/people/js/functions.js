url = "https://fake-people.benspoon.com/d82f0f23/people"

$.ajax({
  url: url,
  success: function(res) {
    res.forEach(function(person){
      //console.log(person);
      $('.people').append('<div class="col-md-4 col-sm-6"><div class="media person"><div class="media-left media-top"><a href="#" data-id="'+person.id+'" class="person-id"><img class="media-object person-thumb" src='+person.picture+'></a></div><div class="media-body"><h4 class="media-heading person-name">'+person.name+'</h4><p class="person-friends">'+person.friends.length+' friends</p></div></div></div>')
     
    });
    $('.person-id').on("click", function(){
     personKey = $(this).data('id');
     $.ajax({
      url: url+"/"+personKey,
      success: function(res){
        $('#personModal').modal();
        $('.modal-title').text(res.name);
        $('.age span').text(res.age);
        $('.eye span').text(res.eyeColor);
        $('.gender span').text(res.gender);
        $('.email span').text(res.email);
        $('.phone span').text(res.phone);
        $('.address span').text(res.address);
        console.log(res)
      }
     })
       // Do the ajax call for a single person
       // https://fake-people.benspoon.com/#get-your-api-keypeopleid
       // Then display that person's info somehow
     });
  }
});

