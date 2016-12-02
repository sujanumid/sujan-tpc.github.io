// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view', {
  dynamicNavbar: true
});


$$('#profileView').on('show', function(){
  var usedHeight = $$('.profile-box').outerHeight() + $$('.profile-tabs').outerHeight() + $$('#profileView .navbar').outerHeight() + $$('.tabbar-labels').outerHeight();
  var pageHeight = $$('#profileView .page-content').outerHeight();
  var newHeight = pageHeight-usedHeight;
  $$('.profile-tab-content .tab').css('min-height',newHeight+'px');
});

$$('#searchView').on('show',function(){
  console.log($$('#searchView').outerHeight());
  $$('.search-posts').css('height',$$('#searchView').outerHeight()-136+'px');
})

$$('#about').on('show',function(){
  var preferenceSwiper = myApp.swiper('.preference-swiper', {
    spaceBetween: 15,
    slidesPerView: 4.5
  });
});

myApp.onPageInit('match', function (page) {
  $('.match-swiper').owlCarousel({
    center: true,
    items:1.25,
    loop:false,
    margin:10,
  });

  var availableHeight;

  $$('.match-card .card-header').each(function(index, el) {
    availableHeight = $$('.page-content').height()-186; //186 is the height of the navbar, match buttons including the margin of 25px and the margin of the card itself
    $$(this).css('height',availableHeight+'px');
    $$(this).parent().css('height',availableHeight+'px');
  });

  $('.match-card').on('click', function(event) {
    event.preventDefault();
    $(this).toggleClass('active');
    
    if($(this).find('.card-header').outerHeight() == availableHeight){
      $(this).find('.card-header').animate({ height: 360 }, 3 );
    }
    else{
      $(this).find('.card-header').animate({ height: availableHeight }, 3 );
    }
  });
});



myApp.onPageInit('addlocation',function (page){
  ulat= -12.043333,
  ulng= -77.028333
  map = new GMaps({
    div: '#map',
    lat: ulat,
    lng: ulng,
    disableDefaultUI: true
  });
  $(document).on('click','.modal-overlay,.close',function(e){
    myApp.closeModal('.modal') 
  });
  $('.get-location').on('click',function(e){
    e.preventDefault();
    if($('.search-pearable').val() != ""){
      searchInput = $('.search-pearable').val()
      if(searchInput == 'Philadelphia University'){
        ulat = 40.023208;
        ulng = -75.194264;
      }else if(searchInput == 'Stanford University'){
        ulat = 37.427526;
        ulng = -122.170062
      }
      map.setCenter(ulat, ulng);
      drawOverlay(ulat,ulng);
    }
  })
})

feed=""

function drawOverlay(ulat, ulng){
  map.removeOverlays();
  map.drawOverlay({
    lat: ulat,
    lng: ulng,
    content: '<div class="overlay map-pin"><i class="icon icon-location-pin"></i><span>Save this location</span></div>',
    click: function(e) {
      myApp.modal({
        title:  '',
        text: '<span class="close">&times;</span><img src="img/radar.png" class="modal-img"><p>Save this feed. You can switch from your local feed to saved feed(s) to see what people are sharing in other locations.</p><div class="input-field"><input type="text" class="modal-text-input" placeholder="Enter Feed Name"></div>',
        verticalButtons: true,
        buttons: [
        {
          text: 'Save Feed',
          onClick: function() {
            feed = $('.modal-text-input').val();
            console.log(feed);
            mainView.router.back();
            $('.popover-location ul li a.active').removeClass('active')
            $('.popover-location ul li:last-child').prepend('<li><a href="#" class="list-button item-link active"><i class="icon icon-location-pin"></i> '+feed+'</a></li>')
          }
        },
        ]
      })
    }
  });
}

myApp.onPageInit('newPost',function (page){
  $('textarea').focus();
});

myApp.onPageInit('onboard',function (page){
  var mySwiper = myApp.swiper('.onboard-container', {
    pagination: '.onboard-pagination',
    paginationHide: false,
    paginationClickable: true,
    nextButton: '.swiper-next'
  }); 
  mySwiper.on('onSlideChangeStart', function(){
    if(mySwiper.isEnd == true){
      $('.swiper-skip').hide();
      $('.swiper-next').text('GOT IT');
      $('.swiper-next').attr('href','register.html')
    }else{
      $('.swiper-skip').show();
      $('.swiper-next').text('NEXT');
      $('.swiper-next').attr('href','#')
    }
  })
})

//initialises chat
myApp.onPageInit('message', function (page) {
  // Conversation flag
  var conversationStarted = false;
  // Init Messages
  var myMessages = myApp.messages('.messages', {
    autoLayout:true
  });

  // Init Messagebar
  var myMessagebar = myApp.messagebar('.messagebar');

  // Handle message
  $$('.messagebar .send-link').on('click', function () {
    // Message text
    var messageText = myMessagebar.value().trim();
    // Exit if empy message
    if (messageText.length === 0) return;

    // Empty messagebar
    myMessagebar.clear()
    // Add message
    myMessages.addMessage({
      // Message text
      text: messageText,
      // Random message type
      type: 'sent',
      // Day
      day: !conversationStarted ? 'Today' : false,
      time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
    });
    // Update conversation flag
    conversationStarted = true;
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

$('#homeView .pearable-card .card-content').on('click', function(event) {
  event.preventDefault();
  mainView.router.loadPage('comment.html');
});

$(document).on('click','.open-card,.open-share',function(event) {
  event.preventDefault();
  var clickedLink = this;
  elementTop = $(this).offset().top;
  if($(this).hasClass('open-card')){
    myApp.popover('.popover-card', clickedLink);
    $('.popover-card').css('top',elementTop+7+'px');
  }else{
    myApp.popover('.popover-share', clickedLink);
    $('.popover-share').css('top',elementTop-43+'px');
  }
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


myApp.onPageInit('setup',function (page){
  $$('.setup-action').on('click', function () {

    var buttons = [
    {
      text: 'Take a photo',
    },
    {
      text: 'Choose existing photo'
    },
    {
      text: 'Cancel',
    },
    ];
    myApp.actions(buttons);
    $$('.login-now').hide();
  });
  
})
$(document).on('close', '.actions-modal', function(event){
  event.preventDefault();
  $('.login-now').show();
})

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

$('.user-profile-link').on('click',function(e){
  myApp.showTab('#profileView');
});
