

// To control colors when portItem is clicked
$(document).ready(function(){
    $('.portItem').click(function(){
      if ($(this).hasClass('selected')) {
        $('.selected').removeClass('selected');    
        return false;
      }
      
      $('.portItem.selected').removeClass('selected');
      $(this).addClass("selected");
      $('.portWrap').addClass("selected");
 });
  
  
	// ENABLE MENU ITEMS and AUTO SCROLLING
/*
	$('a[href*=#], div[id*=-]').click(function(e) {
	  e.preventDefault();
	  
		var menuItem = (this.hash == undefined) ? false: true;
		var $target = (menuItem) ? $(this.hash): $(this.id);
		var $targetName = (menuItem) ? this.hash.slice(1): this.id.slice(1);
		
		$('a[href*=#]').removeClass('selected');
		$('a[href=#'+$targetName+']').addClass('selected');
		
		$target = $target.length && $target || $('[id=' + $targetName +']');
		if ($target.length) {
			var targetOffset = $target.offset().top;
			$('html,body').stop(true,false);
			animating = true;
			$('html,body').animate({scrollTop: targetOffset}, 1000, function() { animating = false; });
			currentMenu = $targetName;
		};
		
    window.location.hash = this.hash;
	});  
*/

  



   
// Filmstrip when portItem is clicked.
$(function () {

    $(window).on('resize', function () {
/*         $('.openEntry').remove(); */
		$('.itemContent').css('z-index', 1000000);
        $('.itemContent').hide();

        var startPosX = $('.portItem:first').position().left;
        console.log(startPosX);
        $('.portItem').removeClass("first last");
        $('.portItem').each(function () {
            if ($(this).position().left == startPosX) {
                $(this).addClass("first").prev().addClass("last");
            }
        });
        $('.portItem:last').addClass("last");
    });
    $(window).trigger('resize');

    $('.portItem').click(function (e) {
        $('.openEntry').slideUp(10);
        // stopPropogation: so that it doesn't hide when you click it once
        e.stopPropagation();
        
        
        var preview = $(this);



if ($(this).hasClass("last")){
preview.find('.itemContent').clone(true).addClass('openEntry').insertAfter(preview).slideDown(800);   
}
else if($('.portItem').is('#firstPort')){
preview.find('.itemContent').clone(true).addClass('openEntry').insertAfter(preview.nextAll('.last:first')).slideDown(800);
}

        
        
    });
    
    // to hide it when the document is clicked
    $(document).click(function() {
    /* $('.itemContent').slideUp(); */
    
    // this gets the portItems back to full opacity when we click away, instead of the 0.25 opacity
    $('.selected').removeClass('selected'); 
      });
    
    

    $('body').on('click', '.close', function () {
        $('.openEntry').slideUp(800);
    });

});





// Enlarging thumbs when clicked
    $(document).ready(function(){
       $('.thumb').each(function()
       {
       $(this).click(function(e)
       {
       
       //so that the container doesn't close when a thumb is clicked. Since we told the container to close whenever the document is clicked. So we're exempting the thumbs from that rule
       e.stopPropagation();
       
       
          $('.itemContent',this).css("cursor","pointer");
          $(this).closest('.itemContent').addClass('itemContent2');
          $('.right-arrow').show();
          $('.left-arrow').show();


          var thisThumbWrap = $(this).closest('.thumbWrap');

          var firstMajor = $(thisThumbWrap).find('.major:first-child');
          var thisMajor = $(this).parent();
          var allMyThumbs = $(this).closest('.thumbWrap');
          $(allMyThumbs).find('.thumb').addClass('thumb2'); //using $(this) instead of '.thumb' will enlarge only the clicked one 
          
          thisThumbWrap.css({paddingLeft: 0, paddingRight: 0});
          thisMajor.css({width: $( window ).width()});
          thisMajor.siblings().css({width: $( window ).width()});
          
           // why not make the offset of this equal to it's child number * width

          console.log("offset left of thismajor: " + (thisMajor).offset().left);
          var firstClickedOff = $(firstMajor).offset().left;
          var clickedOffset = $(thisMajor).offset().left;
          console.log("clickedOffset: " + clickedOffset);
          


          // MOST IMPORTANT LINE: TELLS IT WHERE IT SHOULD EXPAND TO WHEN CLICKED
          $(thisThumbWrap).offset({left: (firstClickedOff-clickedOffset)});
          


          console.log("offset left of thumbWrap: " + (thisThumbWrap).offset().left);
          
          var firstMajor = $(this).closest('.container2').find('.thumbWrap .major:first-child');
          var firstThumb = $(firstMajor).children('.thumb:first-child');
          console.log("left offset first major: " + (firstMajor).offset().left);
          console.log("left offset first thumb: " + (firstThumb).offset().left);

    })})});

   

    
    
    
// Controls movement left and right (when in normal size and when enlarged)
   var onMyEvent = function(e) {

       e.stopPropagation();
        var div = $(this).siblings('.container2');
        var lastMajor = $(div).find('.thumbWrap .major:last-child');
        var lastThumb = $(lastMajor).children('.thumb:last-child');
        var firstMajor = $(div).find('.thumbWrap .major:first-child');
        var firstThumb = $(firstMajor).children('.thumb:first-child');
        var liNum = $(div).find('.thumbWrap .thumb').length;
        var speed = 'fast';
        var itemWidth = $(lastThumb).width();
        var MajorWidth = $(lastMajor).width();
                
        
        if($(this).is('.right-arrow')){

        $('.left-arrow').show();
        if ((($(lastThumb).offset().left) + itemWidth >  $( window ).width()) && !$(div).is(':animated')) {
          console.log("(($(lastThumb).offset().left) + itemWidth+25    " + (($(lastThumb).offset().left) + itemWidth+25));
            $(div).animate({left: '-=' + (MajorWidth)});
            console.log("window width:" + $( window ).width());
            console.log("last thumb left offset:" + $(lastThumb).offset().left);
        } 
        else {
            $(this).hide();
        }
        }
              

        if($(this).is('.left-arrow')){
        $('.right-arrow').show();
        if (($(firstThumb).offset().left) < (60) && !$(div).is(':animated')) {
           //$(div).animate({left: '+=' + (itemWidth/3)}, speed);
           $(div).animate({left: '+=' + (MajorWidth)});
           
           
        } else {
            $(this).hide();
        }
        }

};

$('.right-arrow').click({type: '.right-arrow'}, onMyEvent);
$('.left-arrow').click({type: '.left-arrow'}, onMyEvent);







    
    

    var sun$ = $(".sun");

var rays = [ "banner", "photography", "interactive", "jQuery", "eCommerce", "SQLite", "business cards", "mobile", "responsive design", "flash", "PHP", "graphic design", "logo", "animation", "layout", "website development", "wordpress", "content management", "3D", "database", "printing", "AJAX", "touchscreen", "design" ]; //24 items
for(var i = 0; i < rays.length; i++) {
if (i>12){
    sun$.append($('<div class="ray" rel= "' + rays[i] + '">' + rays[i] + '</div>')
                .css('transform', 'rotate(' + (i * 360 / rays.length) + 'deg)')

                  .css('width', (100-5*(24-i))+20)
                  .css('opacity', (i-10)*0.1)
/*                  .css('z-index', 1000000000) */
              
                 .css('transform-origin', '0px 50%')
                
 
               );
                                                
                                   $('.ray').each(function() {
                  $(this).hover(function() {
                     $('.sun div[rel= "'+ $(this).attr('rel') +'"] ul ').css({visibility: 'visible'});
                  },
                  function() {
                     $('.sun div[rel= "'+ $(this).attr('rel') +'"] ul ').css({visibility: 'hidden'});
                  });
                });

                                
  
  }
  
  
if (i<13){
    sun$.append($('<div class="ray" rel= "' + rays[i] + '">' + rays[i] + '</div>')
                .css('transform', 'rotate(' + (i * 360 / rays.length) + 'deg)')

                  .css('width', 120-5*i)

                  .css('opacity', (15-i)/13)
/*                   .css('z-index', 1000000000) */
                
               //.css({width: ($(rays).width()-5)});
                .css('transform-origin', '0px 50%'));
                //rays.style.width = "10px";
                
                   
                                   $('.ray').each(function() {
                  $(this).hover(function() {
                    $('.sun div[rel= "'+ $(this).attr('rel') +'"] ul ').css({visibility: 'visible'});
                  });
                });


  
  }             
}
});