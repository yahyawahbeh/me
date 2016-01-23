function andrewuSlider(parent,transition,interval,color,color2) {
	var counter = 1;
	
	var parentDIV = parent;
	var length = $('.sliderItems > .item',parentDIV).length;
	var hover = false;
	
	if (length > 1) {
  	//parentDIV.prepend('<div id="sliderBullets"></div>');
		var bulletDIV = $('.sliderBullets',$(parentDIV).parent());
		//parentDIV.prepend('<div id="sliderPrevDiv"><div id="prevBtn"></div></div>');
		//parentDIV.prepend('<div id="sliderNextDiv"><div id="nextBtn"></div></div>');
		bulletDIV.prepend('<div id="sliderPrevDiv"><div id="prevBtn"></div></div>');
		bulletDIV.prepend('<div id="sliderNextDiv"><div id="nextBtn"></div></div>');
		
		var overlayHTML = '<div id="sliderOverlay"';
		if (color) {
			overlayHTML += 'style="background-color:#'+color+';"';
		}
		overlayHTML += '></div><div id="sliderOverlay2"';
		if (color2) {
			overlayHTML += 'style="background-color:#'+color2+';"';
		}
		overlayHTML += '></div>';
		
		parentDIV.prepend(overlayHTML);	
		
		var timerInterval = interval + (transition*2);
		var timer = null;
		var currentSlide = $('.sliderItems div:nth-child('+counter+')',parentDIV);
		var overlay = $('#sliderOverlay',parentDIV);
		var overlay2 = $('#sliderOverlay2',parentDIV);
		var nextDiv = $('#sliderNextDiv',bulletDIV);
		var prevDiv = $('#sliderPrevDiv',bulletDIV);
		var nextBtn = $('#nextBtn',nextDiv);
		var prevBtn = $('#prevBtn',prevDiv);
		var killSlide;
		
		var pHeight = parentDIV.height();
		var pWidth = parentDIV.width();
		
		var animating = false;
		
		//var methodIn = "blinkVert"; // vertical blink
		//var methodIn = "blinkHori" // horizontal blink
		//var methodIn = "dropVert"; // vertical blink // 1750 interval is MINIMUM - just enough for the transition
		//var methodIn = "slideDropVert";
		//var methodIn = "circleVert";
		var methodIn = "circleVertTB";
		//var methodOut = "blinkVert";
		//var methodOut = "blinkHori";
		//var methodOut = "circleVert";
		var methodOut = "circleVertTB";
		//var methodOut = "dropVert";
		
		if (length > 1) {
			$('.sliderItems > .item', parentDIV).each(function(i) {
  			var $btn = $('<div class="circleBtn"></div>').data('pp',i);
				bulletDIV.append($btn);
			});
			
			$('> div.circleBtn', bulletDIV).click(function() {
				gotoDiv($(this).data('pp')+1)
			});
			
			$('> div:nth-child('+(counter+2)+')', bulletDIV).addClass('selected');
		}
		
		$('> div.circleBtn:first', bulletDIV).css({'margin':0});
		$(bulletDIV).css({'margin-left':-bulletDIV.outerWidth(true)/2});
		$('.sliderItems > .item img',parentDIV).attr('width',pWidth);
		//$('#titleContainer #titles',parentDIV).html($('img',currentSlide).attr('alt'));
		currentSlide.show();
			
		if (methodIn == "blinkHori") {
			overlay.offset({left: -pWidth});
			overlay2.offset({left: pWidth});
		} else if (methodIn == "blinkVert") {
			overlay.offset({top: -pHeight});
			overlay2.offset({top: pHeight});
		} else if (methodIn == "dropVert") {
			overlay.offset({top: pHeight});
			overlay2.offset({top: pHeight});
		} else if (methodIn == "slideDropVert") {
			//overlay.offset({top: pHeight});
			overlay2.offset({top: pHeight});
		} else if (methodIn == "circleVert") {
			overlay.css({opacity: 1, top: pHeight, left: (pWidth-(pWidth+pHeight))/2, width: pWidth+pHeight, height: pWidth+pHeight, 'border-radius': (pWidth+pHeight)});
			overlay2.css({opacity: 0.5, top: pHeight, left: (pWidth-(pWidth+pHeight))/2, width: pWidth+pHeight, height: pWidth+pHeight, 'border-radius': (pWidth+pHeight)});
		} else if (methodIn == "circleVertTB") {
			overlay.css({opacity: 1, top: pHeight, left: (pWidth-(pWidth+pHeight))/2, width: pWidth+pHeight, height: pWidth+pHeight, 'border-radius': (pWidth+pHeight)});
			overlay2.css({opacity: 0.5, top: pHeight, left: (pWidth-(pWidth+pHeight))/2, width: pWidth+pHeight, height: pWidth+pHeight, 'border-radius': (pWidth+pHeight)});
		}
		
		/*
if (nextDiv && prevDiv) {
			nextDiv.css({left: pWidth});
  		prevDiv.css({left: -prevDiv.width()});
  		nextBtn.css({top: (pHeight-nextBtn.height()-30)/2}); // ADJUSTED FOR PINNACLE
  		prevBtn.css({top: (pHeight-prevBtn.height()-30)/2}); // ADJUSTED FOR PINNACLE
		}
*/
		
		if (length > 1) {
			parentDIV.hover(function() {
			  hover = true;
				showControls();
				if (timer) { clearInterval(timer); timer = null; }
			}, function() {
			  hover = false;
				hideControls();
				if (!timer) { timer = setInterval(showDiv, timerInterval); }
			});
		}
		
		function showControls() {
			/*
if (nextDiv && prevDiv) {
  			nextDiv.stop(true);
  			prevDiv.stop(true);
  			//nextDiv.show().animate({left:pWidth-nextDiv.width(), opacity: 1}, 250);
  			prevDiv.show().animate({left:0, opacity: 1}, 250);
			}
*/
			//if (timer) { clearInterval(timer); timer = null; }
		}
		
		function hideControls() {
			/*
if (nextDiv && prevDiv) {
  			nextDiv.stop(true);
  			prevDiv.stop(true);
  			nextDiv.animate({left:pWidth, opacity: 0}, 250);
  			prevDiv.animate({left:-prevDiv.width(), opacity: 0}, 250);
			}
*/
			/*
if (length > 1) {
				if (!timer) { timer = setInterval(showDiv, timerInterval); }
			}
*/
		}
		
		if (nextDiv && prevDiv) {
  		prevDiv.click(function() {
  			//overlay.stop();
  			//overlay2.stop(true);
  			
  			var num = counter;
  			num <= 1 ? num = length : num--;
  			gotoDiv(num);
  			
  			//showDiv('prev');
  		});
  		
  		nextDiv.click(function() {
  			//overlay.stop();
  			//overlay2.stop(true);
  			
  			var num = counter;
  			num >= length ? num = 1 : num++;
  			gotoDiv(num);
  			
  			//showDiv();
  		});
		}
	
		function showDiv(dir) {
			if (!animating) {
				if (timer) { clearInterval(timer); timer = null; }
				
				if (!killSlide) {
					killSlide = currentSlide;
				}
				
				//if (dir == "prev") {
					//counter <= 1 ? counter = length : counter--;
				//} else {
					counter >= length ? counter = 1 : counter++;
				//}
				
			    currentSlide = $('.sliderItems div:nth-child('+counter+')',parentDIV);
		
				startOverlay("timer");
			}
			
			return false;
		}
		
		function gotoDiv(num) {
			if (num != counter && !animating) {
				overlay.stop();
				overlay2.stop(true);
			
				if (timer) { clearInterval(timer); timer = null; }
				
				if (!killSlide) {
					killSlide = currentSlide;
				}
				
				counter = num;
				
			    currentSlide = $('.sliderItems div:nth-child('+counter+')',parentDIV);
	
			    startOverlay("click");
		    }
		    
		    return false;
		}
		
		function startOverlay(from) {
			animating = true;
			overlay.stop();
			overlay2.stop(true);
			
			if (methodIn == "blinkHori") {
				overlay.show().animate({left:0, opacity: 1}, transition);
				overlay2.show().animate({left:0, opacity: 0.5}, transition+50, function(){
					showSlide(from);
				});
			} else if (methodIn == "blinkVert") {
				////console.log(overlay.css('top'), overlay2.css('top'));
				overlay.show().animate({top:0, opacity: 1}, transition);
				overlay2.show().animate({top:0, opacity: 0.5}, transition+50, function(){
					showSlide(from);
				});
			} else if (methodIn == "dropVert") {
				overlay2.show().animate({top:0, opacity: 0.5}, transition);
				overlay.delay(300).show().animate({top:0, opacity: 1}, transition, function(){
					showSlide(from);
				});
			} else if (methodIn == "slideDropVert") {
				overlay2.show().animate({top:0, opacity: 0.5}, transition);
				overlay.delay(350).show().animate({opacity: 1}, transition, function(){
					showSlide(from);
				});
			} else if (methodIn == "circleVert") {
				overlay2.show().animate({top:(pHeight-(pWidth+pHeight))/2, opacity: 0.5}, transition);
				//overlay2.show().animate({top:0, opacity: 0.5}, transition);
				overlay.delay(transition/2).show().animate({top:(pHeight-(pWidth+pHeight))/2, opacity: 1}, transition, function(){
					showSlide(from);
				});
			} else if (methodIn == "circleVertTB") {
				overlay2.show().animate({top:(pHeight-(pWidth+pHeight))/2, opacity: 0.5}, transition);
				//overlay2.show().animate({top:0, opacity: 0.5}, transition);
				overlay.delay(transition/2).show().animate({top:(pHeight-(pWidth+pHeight))/2, opacity: 1}, transition, function(){
					showSlide(from);
				});
			}
		}
		
		function showSlide(from) {
			resetOverlays();
			
			$('div.circleBtn', bulletDIV).removeClass('selected');
			$('> div:nth-child('+(counter+2)+')', bulletDIV).addClass('selected');
			//alert((currentSlide.index())+1);
			
			if (killSlide) {
				killSlide.hide();
				killSlide = null;
			}
			
			//$('#titleContainer #titles',parentDIV).html($('img',currentSlide).attr('alt'));
		  currentSlide.show();
			
			if (from == "timer") {
				timer = setInterval(showDiv, timerInterval);
			}
		}
		
		function resetOverlays() {
			if (methodOut == "blinkHori") {
				//overlay.fadeOut(500).animate({left: -pWidth, opacity: 0}, 500);
				//overlay2.fadeOut(550).animate({left: pWidth, opacity: 0}, 550);
				overlay.animate({left: -pWidth, opacity: 0}, transition);
				overlay2.animate({left: pWidth, opacity: 0}, transition+50, function(){
					overlay.css({top: -pHeight});
					overlay2.css({top: pHeight});
					overlay.css({left: 0});
					overlay2.css({left: 0});
					animating = false;
				});
			} else if (methodOut == "blinkVert") {
				//overlay.fadeOut(500).animate({top: -pHeight, opacity: 0}, 500);
				//overlay2.fadeOut(550).animate({top: pHeight, opacity: 0}, 550);
				overlay.animate({top: -pHeight, opacity: 0}, transition);
				overlay2.animate({top: pHeight, opacity: 0}, transition+50, function(){
					overlay.css({left: 0});
					overlay2.css({left: 0});
					overlay.css({top: -pHeight});
					overlay2.css({top: pHeight});
					animating = false;
				});
			} else if (methodOut == "dropVert") {
				overlay.animate({top: -pHeight}, transition);
				overlay2.delay(300).animate({top: -pHeight}, transition+50, function(){
					overlay.css({top: pHeight});
					overlay2.css({top: pHeight});
					animating = false;
				});
			} else if (methodOut == "slideDropVert") {
				overlay.animate({opacity: 0}, transition);
				overlay2.delay(150).show().animate({top: -pHeight}, transition, function(){
					overlay2.css({top: pHeight});
					animating = false;
				});
			} else if (methodOut == "fadeOut") {
				overlay.animate({opacity: 0}, transition);
				overlay2.delay(150).animate({opacity: 0}, transition, function(){
					overlay2.css({top: pHeight});
					animating = false;
				});
			} else if (methodOut == "circleVert") {
				overlay.animate({top: -overlay.height()}, transition, function(){
					overlay.css({top: pHeight});
				});
				
				//overlay2.show().animate({top:0, opacity: 0.5, left: 0, width: pWidth, height: pWidth, 'border-radius': pWidth/2}, transition);
				
				overlay2.delay(transition/2).animate({top: -overlay2.height()}, transition+50, function(){
					overlay2.css({top: pHeight});
					
					animating = false;
				});
			} else if (methodOut == "circleVertTB") {
				overlay.animate({top: -overlay.height()}, transition, function(){
					overlay.css({top: pHeight});
				});
				
				//overlay2.show().animate({top:0, opacity: 0.5, left: 0, width: pWidth, height: pWidth, 'border-radius': pWidth/2}, transition);
				
				overlay2.delay(transition/2).animate({top: -overlay2.height()}, transition+50, function(){
					overlay2.css({top: pHeight});
					
					animating = false;
				});
			}
		}
		
		if (length > 1) {
			timer = setInterval(showDiv, timerInterval);
		}
	} else {
		$('.sliderItems > .item',parentDIV).show();
		$('.sliderBullets',$(parentDIV).parent()).remove();
	}
};