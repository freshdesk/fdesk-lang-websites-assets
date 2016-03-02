/*
 * @author vadivel
 * Scrolling Plugin
 */

!function( $ ) {

$(function () {

	"use strict"
	//Smooth Scroll
	$('.smoothscroll').click(function(e){
	    var targetName = $(this).attr('href').slice(1);
	    var target = $('#scrolling').find('section[id=' + targetName+"]");
	    var stickyHeight = $('.tour_sticky').outerHeight();
	    
	    var targetOffset = (target.offset().top)-stickyHeight;
	    $('html,body')
	    .animate({
	        scrollTop: targetOffset
	    }, 500);
	    e.preventDefault();
	});

	function stickySlide( positionCheck,currentScrollTop,tourStickyId ){
		if(positionCheck < currentScrollTop){
				tourStickyId.slideDown(100);
			
		}else{
				tourStickyId.slideUp(100);
		}
	}

	function scroller(currentScrollTop, stickyHeight, scrollDirection){
		var features = ["chaos-to-control", "proactive", "scaling_up", "business_alignment"]; // Class name of scrolling sections
		var scrollerWidth = $('#movable').outerWidth(true);
		var scrollerleft = $('#movable').offset().left;
		var previous;
		$.each(features, function(i, v) {
			if(i) {
		 		previous = features[i-1]; // Finding the previous feature id 
		 	}
		 	//console.log(currentScrollTop);
		 	//console.log($('#'+features[features.length-1]).offset().top);
			if(i < (features.length-1)){ // loop only 3 times
				$('#movable').show();
				var next = features[i+1];  // Finding the next feature id 
				var contentScrollTop = ($('#'+v).offset().top)-stickyHeight;
				var contentHeight = $('#'+v).outerHeight(true);
				var currentLeftPosition = $('#'+v+'-icon').offset().left; // Finiding Current feature icon left position
				var nextLeftPosition = $('#'+next+'-icon').offset().left; // Finiding Next feature icon left position
				var scrollPosition = currentLeftPosition +  ($('#'+v+'-icon').outerWidth(true)); // Finiding the scroller start position
					
				if(currentScrollTop >= contentScrollTop && currentScrollTop <= (contentScrollTop+contentHeight)){
					var scrollingWidth = nextLeftPosition - scrollPosition+3; // Finidng the total width for scroll div
					var relativeScroll = currentScrollTop - contentScrollTop;
					var scrollingPercentage = ((relativeScroll / contentHeight) * 100);

					if(scrollingPercentage <= 100 && scrollingPercentage >= 0){
						if(previous != ""){
							var styles = {
							    left : (scrollPosition - scrollerWidth),
							    width: (scrollingWidth + scrollerWidth)
							 };
						 	$('#scrolling-circle').css(styles);
							$('#movable').css("left", scrollingPercentage+"%");
						}	
					}
				}
				var currentTop =  ($('#'+v).offset().top);
				var currentBottom = currentTop + $('#'+v).outerHeight(true);
				if(scrollDirection == "down"){	
					if(currentTop <= (currentScrollTop+stickyHeight)){
						$('#'+v+'-icon').addClass('active');
					}
					if(currentBottom <= (currentScrollTop+stickyHeight) ){
						$('#'+v+'-icon').addClass('inactive');
						$('#'+next+'-icon').removeClass('inactive');
					}
				} 	
				if(scrollDirection == "up"){
					if(currentTop >= (currentScrollTop+stickyHeight)){
						$('#'+v+'-icon').removeClass('active');
					}
					if(currentBottom >= (currentScrollTop+stickyHeight) ){
						$('#'+v+'-icon').removeClass('inactive');
					}
				} 	
			}else if(currentScrollTop >= $('#'+features[features.length-1]).offset().top){
				$('#movable').hide();
			}
		 });
	}

	var lastScrollTop = 0;
	$(window).scroll(function () {
		var currentScrollTop =  $(window).scrollTop();
		var positionCheck = $('#scrolling').offset().top; // Parent div of scrolling area
		var tourStickyId = $('.tour_sticky');
		var stickyHeight = tourStickyId.outerHeight(true);

		var st=currentScrollTop+130;//currentScrollTop+stickyHeight;
		stickySlide(positionCheck,st,tourStickyId);

		// downscroll code
		if (currentScrollTop > lastScrollTop){	
			if(tourStickyId.length != 0 && tourStickyId.is(':visible')) {
				scroller(currentScrollTop, stickyHeight,"down");
		    }

		 // upscroll code 
		} else {	
			if(tourStickyId.length != 0 && tourStickyId.is(':visible')) {
				scroller(currentScrollTop, stickyHeight,"up");
		    }
		}
		lastScrollTop = currentScrollTop;
	});
})
}(window.jQuery)