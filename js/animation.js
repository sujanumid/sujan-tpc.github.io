var character = $('#character'),
	pLocs = [0, -72, -144, -216,-288,-360,-432,-504,-576],
	curFrm = 0,
	lastStep = 0,
	animationCycle, backPosY;

skrollr.init({
	beforerender: function(o){
		// If the user has scrolled 120 pixels down
		// since the last time we shifted the background image,
		// we must be moving forward, so move to the next frame
		// in the spritesheet
		if(o.curTop > lastStep + 120) {
			if (curFrm>=8){
				curFrm=0; 
			}
			character.css('background-position', pLocs[curFrm++] + 'px 0px');
			lastStep = o.curTop;
		// If the user has scrolled 120 pixels up,
		// we’re moving backwards, so move to the previous frame
		} else if(o.curTop < lastStep - 120) {
			if (curFrm<=0){
				curFrm=7;
			}
			console.log("curtop:" + o.curTop+ "lastStep:" + lastStep + "curFrm:" + curFrm);
			character.css('background-position', pLocs[curFrm--] + 'px 0px');
			lastStep = o.curTop;
		}
	}
});	

$(window).load(function(e){
	e.preventDefault()
	$("#sujan-title").addClass('animated bounceInDown'); // Title in home section flys in from left
});



