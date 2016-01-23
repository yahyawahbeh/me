var currentMenu = "home";
var animating = false;
var menuMinWidth;

$(document).ready(function() {
	resizeHome();
	
	// ENABLE MENU ITEMS and AUTO SCROLLING
	$('a[href*=#], div[id*=-]').click(function(e) {
	  e.preventDefault();
	  
		var menuItem = (this.hash == undefined) ? false: true;
		var $target = (menuItem) ? $(this.hash): $(this.id);
		var $targetName = (menuItem) ? this.hash.slice(1): this.id.slice(1);
		var $hash = this.hash;
		
		$('a[href*=#]').removeClass('selected');
		$('a[href=#'+$targetName+']').addClass('selected');
		
		$target = $target.length && $target || $('[id=' + $targetName +']');
		if ($target.length) {
			var targetOffset = $target.offset().top;
			$('html,body').stop(false,false);
			animating = true;
			$('html,body').animate({
			  scrollTop: targetOffset
		  }, 1000, function() {
			  animating = false;
			  window.location.hash = $hash;
		  });
			currentMenu = $targetName;
		};
		
    //;
	});
	
	// RESIZE MENU BASED ON ITEMS IN MENU
	menuMinWidth = parseInt($('#menuLeft').css('min-width')) + parseInt($('#menuRight').css('min-width')) + parseInt($('#menu').css('min-width'));
	$('#menuWrapper').css('min-width',menuMinWidth);
	$('#content > section').css('min-width',menuMinWidth);
	$('body').css('min-width',menuMinWidth);
	
	// INIT PORTFOLIO ITEMS
	$('div#portfolioBox').each(function() {
		var portfolioBox = $(this);
		var boxContent = $('.boxContent',this);
		var infoBox = $('.infoBox',portfolioBox.parent());
		var titleBox = $('.titleBox',portfolioBox.parent());
		var pieceLength = $('.pieceBox',portfolioBox).length;
		
		boxContent.data('pp',0);
		
		$(this).css('top',parseInt(titleBox.css('top'))+15);
		infoBox.css('top',parseInt(titleBox.height())+parseInt(titleBox.css('top'))+15);
		infoBox.height(portfolioBox.height());
		
		if (infoBox.length) {
			var infoTargetLeft = infoBox.width()+parseInt(infoBox.css('padding-left'))+parseInt(infoBox.css('padding-right'));
			infoBox.css('left',-infoTargetLeft);
		}
		
		if (parseInt(boxContent.css('left')) == 0) {
			$('#arrowLeft',this).hide();
		};
		
		if ($('.pieceBox',portfolioBox).length < 2) {
			$('#arrowLeft',this).hide();
			$('#arrowRight',this).hide();
		}
			
		$('div[id^=arrow]',portfolioBox).each(function() {
			$(this).css('top',(portfolioBox.height()/2)-($(this).height()/2));
		});
		
		$('.boxContent',infoBox).width(pieceLength*infoBox.width());
	});
	
	// FILL IN HEIGHT OF DIVS
	$('div#portfolioBox,div.textBox').each(function() {
		$(this).parent().css('min-height', $(this).height()+parseInt($(this).css('top'))+$('.titleBox',$(this).parent()).height() );
	});
	
	//
  $('.sliderContainer').each(function() {
	  andrewuSlider($(this) ,750,3000,'D0E182','D0E182');
  });
	
	// CONTACT FORM
	$('form#contactus').submit(function() {
		var $form = $(this);
		var dataString = $form.serialize();
		
		$('input, select, textarea', $form).each(function() {
			$(this).attr('disabled','disabled');
		});
		
		$.ajax({
			type: "POST",
			url: "mailer/mailer.php",
			data: dataString,
			success: function(data) {
				$form.fadeOut('slow');
				$('.thankyou', $form.parent()).fadeIn('slow').delay(5000).queue(function() {
					$form[0].reset();
					$('input, select, textarea', $form).each(function() {
						$(this).removeAttr('disabled');
					});
					$(this).fadeOut();
					$form.fadeIn();
					$(this).dequeue();
				});
				
				return false;
			}
		});
		
		return false;
	});
	
	resizeMenu();
});

$(window).load(function() {
	resizeHome();
	
	$('div#portfolioBox').each(function() {
		var portfolioBox = $(this);
		$('div.pieceBox',portfolioBox).each(function() {
			$(this).css('top',(portfolioBox.height()/2)-($(this).height()/2));
			if ($(this).hasClass('gallery')) {
			  initGallery($(this));
			}
		});
	});
	
/* 	initServices(); */
	resizeMenu();
});

$(window).resize(function() {
	resizeMenu();
	resizeHome();
});
	
$(window).scroll(function() {
	if (!animating) {
		var aPos = $('nav').position();
		$($('#content > section').get().reverse()).each(function(i){
			if ($(this).position().top <= aPos.top) {
				var $targetName = this.id;
				if (currentMenu != $targetName) {				
					$('a[href*=#]').removeClass('selected');
					$('a[href=#'+$targetName+']').addClass('selected');
					currentMenu = $targetName;
				}
				return false;
			}
		});
		
		var positionL = $('nav').position().left;
		$('nav #menuWrapper').css('left',-positionL);
	}
});

function resizeMenu() {
	var docWidth = $(window).width();
	docWidth = (docWidth < parseInt($('body').css('min-width'))) ? parseInt($('body').css('min-width')) : docWidth;
	var sideWidth = Math.round((docWidth-$('#menu').width())/2);
	
	if ($('#menuWrapper').width() > menuMinWidth) {
		$('#menu').css('left',sideWidth);
		$('#menuLeft').width(sideWidth);
		$('#menuRight').width(sideWidth);
	} else {
		$('#menu').css('left',parseInt($('#menuLeft').css('min-width')));
		$('#menuLeft').width(parseInt($('#menuLeft').css('min-width')));
		$('#menuRight').width(parseInt($('#menuRight').css('min-width')));
	}
	
	$('#menuLeft a[href*=#] > div, #menuRight a[href*=#] > div').each(function() {
		var targetName = $(this).parent().attr('href').slice(1);
		var menuCounter = $('#home #-'+targetName);
		var menuOffset = $(this).offset();
		var contentBox = $('#content #'+targetName);
		var titleBox = $('.titleBox', contentBox);
		var textBox = $('.textBox', contentBox);
		var portfolioBox = $('#portfolioBox', contentBox);
		var boxContent = $('.boxContent', portfolioBox);
		var infoBox = $('.infoBox', contentBox);
		
		/*
		menuCounter.unbind('mouseenter');
		menuCounter.unbind('mouseleave');
		menuCounter.mouseenter(function() {
			$(this).css('top',-5);
		}).mouseleave(function() {
			$(this).css('top',0);
		});
		
		menuCounter.width($(this).parent().width());
		menuCounter.offset({left:menuOffset.left});
		menuCounter.css('border-bottom-left-radius',Math.round(menuCounter.width()/2));
		menuCounter.css('border-bottom-right-radius',Math.round(menuCounter.width()/2));
		//DEMO
		menuCounter.animate({height:(Math.floor(Math.random()*($('#home').height()-100))+100)},500);
		*/
		
		if (targetName == "contact" || targetName == "clients" || targetName == "motion" || targetName == "photo") {
			titleBox.offset({left: menuOffset.left-(titleBox.width()-menuCounter.width()-$('div[class^=greenCircle]',titleBox).width())});
		} else {
			titleBox.offset({left: menuOffset.left});
		}
		
		if (textBox.length) {
			if (targetName == "mantra") {
				textBox.offset({left: menuOffset.left+60});
			}
			if (targetName == "contact") {
				textBox.offset({left: menuOffset.left-$('h2',titleBox).width()-parseInt($('h2',titleBox).css('margin-right'))-$('div[class^=greenCircle]',titleBox).width()});
			}
		}
		
		if (infoBox.length) {
			var infoTargetLeft = infoBox.width()+parseInt(infoBox.css('padding-left'))+parseInt(infoBox.css('padding-right'));
		}
		
		if (portfolioBox.length) {
			var pieceLength = $('div.pieceBox',portfolioBox).length;
			
			if (infoBox.length && parseInt(infoBox.css('left')) == 0) {
				portfolioBox.width(docWidth-infoTargetLeft);
			} else {
				portfolioBox.width(docWidth);
			}
			
			var pbWidth = portfolioBox.width();
			boxContent.width(pieceLength * pbWidth);
			boxContent.css('left',-(boxContent.data('pp') * pbWidth));
			
			$('div[id^=arrow]',portfolioBox).each(function() {
				$(this).unbind('click');
				$(this).click(function() {
				  if (!animating) {
				    animating = true;
  					var infoPanel = $('.infoBox',portfolioBox.parent());
  					var pp = $('.boxContent',portfolioBox).data('pp');
  					var targetP = pp;
  					
  					$('div[id^=arrow]',$(this).parent()).each(function() {
  						$(this).show("slow");
  					});
  					
  					if ($(this).attr('id') == "arrowLeft") {
  						targetP--;
  						if (targetP == 0) {
  							$(this).hide("slow");
  						}
  					} else if ($(this).attr('id') == "arrowRight") {
  						targetP++;  
  						if (!$('.pieceInfo:eq('+(targetP+1)+')',infoPanel).length && !$('.pieceBox:eq('+(targetP+1)+')',portfolioBox).length) {
  							$(this).hide("slow");
  						}
  					};
  					
  					var targetPanel = $('.pieceInfo:eq('+targetP+')',infoPanel);
  					var targetBox = $('.pieceBox:eq('+targetP+')',portfolioBox);
  					var panelContent = $('.boxContent',infoPanel);
  					var boxContent = $('.boxContent',portfolioBox);
  					
  					if (targetPanel.length && targetBox.length) {
  						boxContent.data('pp',targetP);
  						//alert("exists" + " : " + targetPanel.position().left + " : " + targetBox.position().left);
  						panelContent.stop().animate({ left: -targetPanel.position().left },1000);
  						boxContent.stop().animate({ left: -targetBox.position().left },1000, function() {
    						animating = false;
  						});
  					} else {
  						//alert("does not exist");
  					};
  					
  					//if (targetName == "motion") {
  					$.jPlayer.pause();
  					//}
  					
  					return false;
					}
				});
			});
			
			$('.pieceBox',portfolioBox).each(function() {
				$(this).width(pbWidth);
				
				var pieceLink = $('.pieceTitle',this);
				if (infoBox.length && pieceLink.length) {
					pieceLink.unbind('click');
					pieceLink.click(function() {
						var targetPBwidth = 0;
						
						if (parseInt(infoBox.css('left')) != 0) {
							targetPBwidth = docWidth-infoTargetLeft;
							infoBox.stop().animate({ left: 0 }, 500);
							portfolioBox.stop().animate({ left: infoTargetLeft, width: targetPBwidth }, 500);
							$('a.infoLink > div',portfolioBox).addClass('selected');
						} else {
							targetPBwidth = docWidth;
							infoBox.stop().animate({ left: -infoTargetLeft }, 500);
							portfolioBox.stop().animate({ left: 0, width: targetPBwidth }, 500);
							$('a.infoLink > div',portfolioBox).removeClass('selected');
						}
						
						// causing problems
						boxContent.stop().animate({ width: pieceLength * targetPBwidth, left: -(boxContent.data('pp') * targetPBwidth) }, 500);
						//
						
						$('.pieceBox',boxContent).each(function() { $(this).stop().animate({ width: targetPBwidth }, 500) });
						
						return false;
					});
				};
			});
		};
	});
}

function resizeHome() {
	var docHeight = $(window).height();
	docHeight = (docHeight < parseInt($('#home').css('min-height'))) ? parseInt($('#home').css('min-height')) : docHeight;
	var sideHeight = (docHeight-$('#home #podLogo').height())/2;
	$('#home #podLogo').css('top',sideHeight);
	$('footer').height(docHeight/3);
}

function initGallery($gallery) {
  //$('.pieceImg img:eq(0)',$gallery).addClass('selected');
  //$('img',$gallery).css('margin-left',-$('img',$gallery).width()/2);
}


$("#slideshow > div:gt(0)").hide();

setInterval(function() { 
  $('#slideshow > div:first')
    .fadeOut(2000)
    .next()
    .fadeIn(2000)
    .end()
    .appendTo('#slideshow');
},  6000);




/*
function initServices() {
  var $services = $('.words').html();
  var words = $.map($services.split(","), $.trim);
  var word_list = new Array();
  for (var a = 0; a < words.length; a++) {
    var word = {text: words[a], weight: Math.floor(Math.random()*25)+25};
    word_list.push(word);
  }
  
  for (var i in word_list) {
*/
    //console.log(word_list[i].text, word_list[i].weight);
/*
  }
  
  $("#wordcloud .container").jQCloud(word_list);
*/
  /*
var fill = d3.scale.linear()
             .domain([0,100])
             .interpolate(d3.interpolateRgb)
             .range(["#D0E182","#000"]);
               
  var w = 972,
      h = 500;
      
  var $services = $('#services .words').html();
  var words = $.map($services.split(","), $.trim);
  
  d3.layout.cloud().size([w, h])
      .words(words.map(function(d) {
        return {text: d, size: 30 + Math.random() * 30};
      }))
      .rotate(function(d) { return ~~(Math.random() * 3) * 90 - 90; })
      .fontSize(function(d) { return d.size; })
      .font("museo-sans")
      .on("end", draw)
      .start();

  function draw(words) {
    d3.select("#wordcloud .container").append("svg")
        .attr("width", w)
        .attr("height", h)
      .append("g")
        //.attr("transform", "translate("+w/2+","+h/2+")")
        .attr("transform", "translate(" + [w >> 1, h >> 1] + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("fill", function(d) { return fill(d.text.length*5); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
      .text(function(d) { return d.text; });
  }
*/
/* } */