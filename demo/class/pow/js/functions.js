url = "https://fake-people.benspoon.com/8f5c171c/people"

$(document).ready(function($) {
  $.ajax({
    url: url,
    success: function(res) {
      res.forEach(function(hero){
        $('.hero-grid').append('<div class="col-xs-6"><a href="#" class="hero" data-id="'+hero.id+'" data-alias="'+hero.alias+'" data-city="'+hero.city+'" data-power="'+hero.power+'" data-enemy="'+hero.enemy+'" data-status="'+hero.stat+'" data-bio="'+hero.bio+'">'+hero.alias+'</a></div>');
      });
      var heroKey;
      $('.hero').on('click', function(event) {
        event.preventDefault();
        heroKey = $(this).data('id'); //get id of single hero
        heroAlias = $(this).data('alias');
        heroCity = $(this).data('city');
        heroEnemy = $(this).data('enemy');
        heroPower = $(this).data('power');
        heroStatus = $(this).data('status');
        heroBio = $(this).data('bio');
        $.ajax({
          url: url+"/"+heroKey, //gets single person
          success: function(res){
            $('#heroModal #heroID').val(heroKey);
            $('#heroModal #alias').val(heroAlias);
            $('#heroModal #gender').val(heroStatus);
            $('#heroModal #ability').val(heroPower);
            $('#heroModal #city').val(heroCity);
            $('#heroModal #bio').text(heroBio);
            $('#heroModal #enemy').val(heroEnemy);
            $('#heroModal').modal(); //triggers bootstrap modal
          }
        });
      });//clickevent

      //PATCH
      $('#edit').on('click',function(e){
        e.preventDefault();
        var hero = {};
        hero.power = $('#ability').val();
        hero.stat = $('#gender').val();
        hero.enemy = $('#enemy').val();
        hero.city = $('#city').val();
        hero.alias = $('#alias').val();
        hero.bio = $('#bio').val();
        $.ajax({
          url: url+"/"+heroKey,
          method: "PATCH",
          data: hero,
          success: function(res){
            $('#heroModal').modal('hide');
            $('.libModal').html('Congratulations!!!<br>Your hero was updated successfully.');
            $('#successModal').modal('show');
            $('.hero[data-id="'+heroKey+'"').data('alias',hero.alias).data('city',hero.city).data('bio',hero.bio).data('enemy',hero.enemy);
            $('.hero[data-id="'+heroKey+'"').text(hero.alias);
          }
        })
      });//clickevent
      $('#delete').on('click',function(e){
        e.preventDefault();
        $('#heroModal').modal('hide');
        $('#deleteModal').modal('show');
      })//clickevent
      //DELETE
      $('.btn-delete').on('click',function(e){
        $.ajax({
          url: url+"/"+heroKey,
          method: "DELETE",
          success: function(res){
            $('.hero[data-id="'+heroKey+'"').parent().remove();
            $('.libModal').html('Congratulations!!!<br>Your hero was deleted successfully.');
            $('#successModal').modal('show');
            console.log('deleted');
          }
        })
      })
    }
  });  
});



//localstorage
$('.box.status').on('click', function() {
  status = $(this).data('status');
  localStorage.setItem("stat", status);
});

$('.powerbox').on('click',function(e){
  power = $(this).data('power');
  localStorage.setItem("power",power);
});

//POST
$('#create-hero').on('click', function(event) {
  event.preventDefault();
  var hero = {};
  hero.power = localStorage.power;
  hero.stat = localStorage.stat;
  hero.enemy = $('#enemy').val();
  hero.city = $('#city').val();
  hero.alias = $('#alias').val();
  hero.bio = $('#bio').val();
  $.ajax({
   method: "POST",
   url: "http://fake-people.benspoon.com/8f5c171c/people",
   data: hero,
   success: function (res) {
    console.log(res)
  }
});
  $('#successModal').modal('show');
  //removes from localstorage
  localStorage.removeItem("status");
  localStorage.removeItem("power");
});


