$(document).ready(function(){
	$('div[class=jp-type-single]').each(function() {
		$(this).bind($.jPlayer.event.play, function() { // Bind an event handler to the instance's play event.
			$(this).jPlayer("pauseOthers"); // pause all players except this one.
			$('div[class=video-play]',this).hide();
			$('div[class=video-pause]',this).hide();
			$('img[id^=jp_poster]',this).animate({left:-$(this).width()},1000);
			
			$(this).mouseenter(function() {
				$('div[class=video-pause]',this).show();
			}).mouseleave(function() {
				$('div[class=video-pause]',this).hide();
			});
		});
		$(this).bind($.jPlayer.event.pause, function() {
			$('div[class=video-play]',this).show();
			$(this).unbind('mouseenter');
			$(this).unbind('mouseleave');
		});
		$(this).bind($.jPlayer.event.ended, function() {
			$('img[id^=jp_poster]',this).show().animate({left:0},1000);
			$(this).unbind('mouseenter');
			$(this).unbind('mouseleave');
		});
	});
	
	//webmv not supported on dreamhost
	$("#jquery_jplayer_1").jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				m4v: window.location.pathname+"portfolio/assets/incubate.m4v",
				poster: window.location.pathname+"portfolio/assets/incubate.png"
			});
		},
		swfPath: "js",
		supplied: "m4v",
		size: {
			width: "848px",
			height: "480px",
			cssClass: "jp-video-480p"
		},
	    cssSelectorAncestor: "#jp_container_1",
	    cssSelector: {
	      play:".video-play",
	      pause:".video-pause"
	    }
	});
	
	$("#jquery_jplayer_2").jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				m4v: window.location.pathname+"portfolio/assets/paperbox.m4v",
				poster: window.location.pathname+"portfolio/assets/paperbox.png"
			});
		},
		swfPath: "js",
		supplied: "m4v",
		size: {
			width: "848px",
			height: "480px",
			cssClass: "jp-video-480p"
		},
	    cssSelectorAncestor: "#jp_container_2",
	    cssSelector: {
	      play:".video-play",
	      pause:".video-pause"
	    }
	});
});