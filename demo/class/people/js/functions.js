url = "https://fake-people.benspoon.com/8f5c171c/people"

$.ajax({
  url: url,
  success: function(res) {
    res.forEach(function(person){
      $('.people').append('<div class="col-md-4 col-sm-6"><div class="media person"><div class="media-left media-top"><a href="#" data-id="'+person.id+'" class="person-id"><img class="media-object person-thumb" src='+person.picture+'></a></div><div class="media-body"><h4 class="media-heading person-name">'+person.name+'</h4><p class="person-friends">'+person.friends.length+' friends</p></div></div></div>')
    });
    $('.person-id').on("click", function(){
     personKey = $(this).data('id'); //get id of single person
     $.ajax({
      url: url+"/"+personKey, //gets single person
      success: function(res){
        $('#personModal').modal(); //triggers bootstrap modal
        //add person detail into modal
        $('.modal-title').text(res.name);
        $('.age span').text(res.age);
        $('.eye span').text(res.eyeColor);
        $('.gender span').text(res.gender);
        $('.email span').text(res.email);
        $('.phone span').text(res.phone);
        $('.address span').text(res.address);
        $('.friends').empty(); //removes child node in friends div before adding new child nodes
        res.friends.forEach(function(friends){ //loop through each friend
          $('.friends').append('<div class="col-xs-4"><h4 class="friend-name">'+friends.name+'</h4></div>')
        });
      }
    })
   });
  }
});



