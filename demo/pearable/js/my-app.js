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
   

$$('#profile').on('show', function(){
  $$(this).find('.swiper-container')[0].swiper.update();
  var usedHeight = $$('.profile-box').outerHeight() + $$('.profile-tabs').outerHeight() + $$('#profile .navbar').outerHeight() + $$('.tabbar-labels').outerHeight();
  var pageHeight = $$('#profile .page-content').outerHeight();
  var newHeight = pageHeight-usedHeight;
  $$('.profile-tab-content .tab').css('min-height',newHeight+'px');
});

$$('#about').on('show',function(){
  var preferenceSwiper = myApp.swiper('.preference-swiper', {
    spaceBetween: 15,
    slidesPerView: 4.5
  });
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

