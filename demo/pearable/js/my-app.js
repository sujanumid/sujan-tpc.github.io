// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
});

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
    // Avatar and name:
    avatar: avatar,
    name: name,
    // Day
    day: !conversationStarted ? 'Today' : false,
    time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  })
 
  // Update conversation flag
  conversationStarted = true;
});              


$$('#profile').on('show', function(){
  $$(this).find('.swiper-container')[0].swiper.update();
  var usedHeight = $$('.profile-box').outerHeight() + $$('.profile-tabs').outerHeight() + $$('#profile .navbar').outerHeight() + $$('.tabbar-labels').outerHeight();
  var pageHeight = $$('#profile .page-content').outerHeight();
  var newHeight = pageHeight-usedHeight;
  $$('.profile-tab-content .tab').css('min-height',newHeight+'px');
});

var mySwiper3 = myApp.swiper('.preference-swiper', {
  spaceBetween: 15,
  slidesPerView: 4.5
});
