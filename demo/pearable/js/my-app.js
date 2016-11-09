// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
  });

var messageView = myApp.addView('#messageView', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
  });


$$('#profileView').on('show', function(){
  var usedHeight = $$('.profile-box').outerHeight() + $$('.profile-tabs').outerHeight() + $$('#profileView .navbar').outerHeight() + $$('.tabbar-labels').outerHeight();
  var pageHeight = $$('#profileView .page-content').outerHeight();
  var newHeight = pageHeight-usedHeight;
  console.log(usedHeight);
  $$('.profile-tab-content .tab').css('min-height',newHeight+'px');
});


$$('#about').on('show',function(){
  var preferenceSwiper = myApp.swiper('.preference-swiper', {
    spaceBetween: 15,
    slidesPerView: 4.5
  });
})

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
$$('.messagebar .link').on('click', function () {
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
  })

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

