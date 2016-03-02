$(document).on("ready pjax:success",function(){
	if ($(window).width() >= 980){
		$('.tour-features-strip,.team-inner-navbar .team-navbar').waypoint('sticky');
	}
	if ($(window).width() <= 720) {

		var navstripwidth = 0;

		$('.menuholder').css("width", $('.menucontainer').width()-60);
		$('.nav-tour-strip li').each(function(){
			navstripwidth = navstripwidth + $(this).width();		
		});
		$('.nav-tour-strip').css("width", navstripwidth+"px");

		try {
			if($('.nav-tour-strip.nav-pills li.active').index() != 1){
				$('.nav-pills').css("left", -($('.nav-tour-strip.nav-pills li.active').position().left));
			}
		}
		catch(err) {
			var testmsg = err.message;
		}
		// mobile menu script for icon menus on desktop
		var maxcountlimit = Math.floor($('.nav-tour-strip').width()/ $('.menuholder').width()),
			slidelength = $('.menuholder').width() / 2,
			lvalue = 0,
			leftlength = 0;

		try {
			if($('.nav-tour-strip.nav-pills li.active').index() != 1){		
				lvalue = Math.floor(parseInt(-($('.nav-tour-strip').css("left").slice(0,-2)) / $('.menuholder').width()));
				leftlength = $('.nav-tour-strip').css("left").slice(0,-2);
			}
		}catch(err) {
			var testmsg = err.message;
		}

		$(".menuholder .rightmove").click(function(){
			var pos = $('.nav-tour-strip').position().left + $('.nav-tour-strip').width();
			if(pos > $(".menucontainer").width()){
				leftlength = parseInt(leftlength) - parseInt(slidelength);
				lvalue = lvalue + 1;				
				$(".nav-tour-strip").animate({ left: leftlength });
			}
		});

		$(".menuholder .leftmove").click(function(){			
			if($('.nav-tour-strip').position().left < 30){
				lvalue = lvalue - 1;
				leftlength = parseInt(leftlength) + parseInt(slidelength);
				if(leftlength>0)
				$(".nav-tour-strip").animate({ left: '0px'});									
				else
				$(".nav-tour-strip").animate({ left: leftlength});											
			}
		});

	}
});