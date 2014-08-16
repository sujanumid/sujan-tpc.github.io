var character = $('#character'),
	pLocs = [0, -72, -144, -216,-288,-360,-432,-504,-576,-648,-720,-792,-864,-936,-1008,-1080,-1152,-1224],
	curFrm = 0,
	lastStep = 0,
	animationCycle, backPosY;

skrollr.init({
	beforerender: function(o){
		// If the user has scrolled 120 pixels down
		// since the last time we shifted the background image,
		// we must be moving forward, so move to the next frame
		// in the spritesheet
		
		/***code to change clothing**/
		/*if(o.curTop < 2000){
			animationCycle=9;
			backPosY='0px';
		}else{
			animationCycle=9;
			backPosY='0px'; //second row of sprite
		}
		
		if(o.curTop > lastStep + 120){
			if (curFrm>=animationCycle-1){curFrm=-1;}
			character.css('background-position', pLocs[++curFrm] + 'px ' + backPosY);
			lastStep=o.curTop;
			
			
		}else if(o.curTop < lastStep - 120){
			if (curFrm<=8){curFrm=16;}
			character.css('background-position', pLocs[--curFrm] + 'px ' + backPosY);
			lastStep = o.curTop;
		}*/
		/****/
		
		
		if(o.curTop > lastStep + 120) {
			if (curFrm>=8){
				curFrm=1; 
			}
			character.css('background-position', pLocs[curFrm++] + 'px 0px');
			lastStep = o.curTop;
		// If the user has scrolled 120 pixels up,
		// we’re moving backwards, so move to the previous frame
		} else if(o.curTop < lastStep - 120) {
			if (curFrm<=8){
				curFrm=16;
			}
			character.css('background-position', pLocs[curFrm--] + 'px 0px');
			lastStep = o.curTop;
		}
	}
});		

$(window).load(function(e){
	e.preventDefault()
	$("#sujan-title").addClass('animated bounceInDown'); // Title in home section flys in from left
});



