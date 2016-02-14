// JavaScript Document
$(document).ready(function() {
	bsCarouselAnimHeight();
	$.adaptiveBackground.run({
	  success: function($img, data) {
	    $($img[0]).find('.overlay').css("background",data.color);
	    textColor();
	  }
	});
	$('.team-container, .team-overlay').matchHeight();
	$('.marker').popover({html:true});
	countCl();
});

$(window).resize(function() {
	countCl();
});

$('.carousel-control.left').click(function(e) {
	e.preventDefault();
  $('.carousel').carousel('prev');
});

$('.carousel-control.right').click(function(e) {
	e.preventDefault();
  $('.carousel').carousel('next');
});

function textColor(){
	$('.target').each(function(){
		$(this).colourBrightness();
	})
}

function bsCarouselAnimHeight()
{
    $('.carousel').carousel({
        interval: 6000
    }).on('slide.bs.carousel', function (e)
    {
        var nextH = $(e.relatedTarget).height();
        $(this).find('.active.item').parent().animate({ height: nextH }, 500);
    });
}

$('.careers,.shake').on('mouseenter', function () {
    
    var $theClone = $(this).clone().css({ opacity : 0.5, position : 'absolute', top : 0 });
    
    $(this).parent().append($theClone);
    
    $theClone.animate({ left : 1 }, 500).on('mouseleave', function () {
        $(this).stop().fadeOut(250, function () {
            $(this).remove();
        });
    });      
});

function countCl(){
	var no = $('.client-logos .item').length;
	if($( window ).width() >= 991){
		if(no%4 == 0){
			$('.client-logos .item:nth-last-child(-n+4)').css("border-bottom","none")
		}else if(no%4 == 3){
			$('.client-logos .item:nth-last-child(-n+3)').css("border-bottom","none")
		}else if(no%4 == 2){
			$('.client-logos .item:nth-last-child(-n+2)').css("border-bottom","none")
		}else{
			$('.client-logos .item:last-child').css("border-bottom","none")
		}
	}else if($( window ).width() >= 767){
		if(no%3 == 0){
			$('.client-logos .item:nth-last-child(-n+3)').css("border-bottom","none")
		}else if(no%3 == 2){
			$('.client-logos .item:nth-last-child(-n+2)').css("border-bottom","none")
		}else{
			$('.client-logos .item:last-child').css("border-bottom","none")
		}
	}else{
		if(no%2 == 0){
			$('.client-logos .item:nth-last-child(-n+2)').css("border-bottom","none")
		}else{
			$('.client-logos .item:last-child').css("border-bottom","none")
		}
	}
}

$(document).ready(function() {
    var 
        $value = $(".core-values"),
    	$valueGroup = $(".value-group"),
        $cores = $(".cores"),
        lastPos = {x:0},
        valuePos = {x:0},
        currentImage = -1,
        imageWidth = 700,
        imageSpacing = 300,
        imageTotalWidth=imageWidth+imageSpacing,
        speedLog=[],
        speedLogLimit=5,
        minBlur=2,
        maxBlur=200,
        blurMultiplier=0.25,
        lastBlur=0,
        dragging=false,
        lastDragPos={x:0},
        dragPos={x:0},
        totalDist=0,
        distThreshold=10,
        distLog=[],
        distLogLimit=10,
        momentumTween=null
    ;

	function setBlur(v){
		if(v<minBlur) v=0;
		if(v>maxBlur) v=maxBlur;
		if(v!=lastBlur){
			$("#blur").get(0).firstElementChild.setAttribute("stdDeviation",v+",0");
		}
		lastBlur=v;
	}

	$valueGroup.css({
		webkitFilter:"url('#blur')",
		filter:"url('#blur')"
	});
    $cores.each(function(i) {
        var cur = $(this);
  		cur.click(function(){
  			if(Math.abs(totalDist)<distThreshold)
  				setvaluePos(i);
  		});
  		$(".gallery-pagination-dot").eq(i).click(function(){
  			setvaluePos(i);
  		})
    });

    function setvaluePos(v,anim){
    	if(typeof anim=="undefined") anim=true;
    	stopMomentum();
    	TweenMax.to(valuePos,anim?0.8:0,{
    		x:-v*imageTotalWidth,
    		ease:Quint.easeOut,
    		onUpdate:updatevaluePos,
    		onComplete:updatevaluePos
    	});
    }

    function updatevaluePos(){
    	TweenMax.set($valueGroup,{
    		x:valuePos.x+(($(window).width()-imageWidth)/2),
    		force3D:true,
    		lazy:true
    	});
    	var speed=lastPos.x-valuePos.x;
    	var blur=Math.abs(Math.round(speed*blurMultiplier));
	    setBlur(blur);
    	lastPos.x=valuePos.x;

	    var _currentImage=Math.round(-valuePos.x/imageTotalWidth);
	    if(_currentImage!=currentImage){
	    	currentImage=_currentImage;
	    	$(".gallery-pagination-dot-selected").removeClass('gallery-pagination-dot-selected');
	    	$(".gallery-pagination-dot").eq(currentImage).addClass('gallery-pagination-dot-selected')
	    }
    }
    $value.mousedown(function(event){
    	event.preventDefault();
    	dragging=true;
    	dragPos.x=event.pageX;
    	lastDragPos.x=dragPos.x;
    	totalDist=0;
    	distLog=[];

    	stopMomentum();

    	updatevaluePosLoop();
    });
    $(document).mousemove(function(event){
    	if(dragging){
    		dragPos.x=event.pageX;
    	}
    });
    function updatevaluePosLoop(){
    	if(dragging){
    		updatevaluePos();
    		var dist=dragPos.x-lastDragPos.x;
    		lastDragPos.x=dragPos.x;
    		totalDist+=dist;
    		distLog.push(dist);
    		while(distLog.length>distLogLimit){
    			distLog.splice(0,1);
    		};
    		valuePos.x+=dist;
    		requestAnimationFrame(updatevaluePosLoop)
    	}
    }
    $(document).mouseup(function(event){
    	if(dragging){
	    	dragging=false;
	    	var releaseSpeed=0;
	    	for (var i = 0; i < distLog.length; i++) {
	    		releaseSpeed+=distLog[i];
	    	};
	    	releaseSpeed/=distLog.length;

	    	var targetX=valuePos.x+(releaseSpeed*20);
	    	targetX=Math.round(targetX/imageTotalWidth)*imageTotalWidth;
	    	var targetImage=-targetX/imageTotalWidth;
	    	var excess=0;
	    	if(targetImage<0){
	    		excess=targetImage;
	    		targetImage=0;
	    	}else if(targetImage>=$cores.length){
	    		excess=targetImage-($cores.length-1);
	    		targetImage=$cores.length-1;
	    	}
	    	if(excess!=0){
	    		targetX=-targetImage*imageTotalWidth;
	    	}
	    	momentumTween=TweenMax.to(valuePos,1-(Math.abs(excess)/20),{
	    		x:targetX,
	    		ease:Quint.easeOut,
	    		onUpdate:updatevaluePos,
	    		onComplete:updatevaluePos
	    	});

	    	if(Math.abs(totalDist)>=distThreshold){
	    		event.preventDefault();
	    		event.stopPropagation();
	    	}
	    }
    });
    function stopMomentum(){
    	if(momentumTween!=null){
	    	momentumTween.kill();
	    	momentumTween=null;
	    	updatevaluePos();
	    }
    }

    setvaluePos(0,false);

    function playslider(){
		$('.gallery-pagination-dot').each(function(e) {
			if($(this).hasClass('gallery-pagination-dot-selected') && $(this).next().length > 0){
				$(this).next().trigger('click');
				return false;
			}else{
				console.log('no-next');
				$('.gallery-pagination-dot:first-child').trigger('click');
			}
		});
	 }  
    setInterval(playslider, 2000);
})