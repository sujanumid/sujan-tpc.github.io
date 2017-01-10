// Initialize your app
var myApp = new Framework7({
    swipePanel: 'left'
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view', {
  dynamicNavbar: true
});


myApp.onPageInit('onboard',function (page){
  var mySwiper = myApp.swiper('.onboard-container', {
    pagination: '.onboard-pagination',
    paginationHide: false,
    paginationClickable: true,
    nextButton: '.swiper-next',
    prevButton: '.swiper-back',
  }); 
  mySwiper.on('onSlideChangeStart', function(){
    if(mySwiper.isEnd == true){
      $('.swiper-skip').hide();
      $('.onboard-pagination').hide();
      $('.gymbuddy-logo').addClass('start').text('Welcome to gym buddy, Jim!');
    }else{
      $('.swiper-skip').show();
      $('.onboard-pagination').show();
      $('.gymbuddy-logo').removeClass('start').text('gym buddy');
    }
  });
  mySwiper.on('onSlideChangeEnd', function(){
  if(mySwiper.isBeginning == true){
      $('.swiper-back').attr('href','welcome.html').addClass('back');
    }else{
      $('.swiper-back').attr('href','#').removeClass('back');
    }
  })
  $('.swiper-skip').on('click',function(){
    mySwiper.slideTo(3);
  })
  $('.privacy').on('click',function(e){
    e.preventDefault();
    myApp.popup('.popup-privacy');
  })
})

myApp.onPageInit('signup',function (page){
$('.tos').on('click',function(e){
    e.preventDefault();
    myApp.popup('.popup-privacy');
  });
});

$(document).ready(function($) {
  if($('body').hasClass('first-login')){
    myApp.popup('.popup-login');
  }
  $('.tos').on('click',function(e){
    e.preventDefault();
    myApp.popup('.popup-privacy');
  });

$$('.forgot-pass').on('click', function () {
    var buttons1 = [
        {
            text: 'Need Help?',
            label: true
        },
        {
            text: 'Forgot Password',
        },
        {
            text: 'Help',
            color: 'red'
        }
    ];
    var buttons2 = [
        {
            text: 'Cancel',
            color: 'red'
        }
    ];
    var groups = [buttons1, buttons2];
    myApp.actions(groups);
});
});




$('.close').on('click', function(event) {
  event.preventDefault();
  $(this).parent().slideUp();
});

$('.popover a').on('click', function(event) {
  event.preventDefault();
  myApp.closeModal()
});


myApp.onPageInit('register',function (page){
  $('.has-helper').on('focus', function(event) {
    event.preventDefault();
    $(this).siblings('.helper').slideDown('fast');
  });
  $('.has-helper').on('blur', function(event) {
    event.preventDefault();
    $(this).siblings('.helper').slideUp('fast');
  });
});



/***search***/

$('.btn-main-search').on('click',function(e){
  e.preventDefault();
  if($('.search-pearable').val() != ""){
    myApp.showIndicator();
    setTimeout(function () {
      $('.post-search').show();
      myApp.hideIndicator();
      $('.default-search').fadeOut('fast');
    }, 1000);
  }
})

