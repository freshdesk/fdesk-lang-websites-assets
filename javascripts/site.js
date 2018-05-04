/*
 * @author venom
 * Site init page scripts
 */

!function( $ ) {

	layoutResize(".right-panel", ".left-panel")

	$(function () {

		"use strict"
		
		// Attaching dom ready events

		// Preventing default click & event handlers for disabled or active links
		$(".disabled")
			.on("click", function(ev){
				ev.preventDefault()
				ev.stopImmediatePropagation()
			});

		$('.sticky-header').waypoint('sticky');
		$('.sticky-sidebar').waypoint('sticky', {
			wrapper: '<div class="sticky-sidebar-wrapper" />',
			offset: "60px"
		});

		$('.tour-sticky').waypoint('sticky', {
			stickyStartCallback: function(sticky, direction) {
	        	if(direction === 'down'){
	        		setTimeout(function(){
	        			$("#scroll-panel").scrollmilestones({ initOnLoad: false })	
	        		}, 200);
	        	} 
	      	}
		});
		
		// Header menu active in Current page
		var pageid = page['cID'];
			
		// Freshdesk home page
		if(pageid == 597){
			$('.fd-home-sticky').attr('id','fd-home');
			$(".fresh-widgets").hide();
			$(".footer-strip").remove();
		}

		if (pageid == 1523) {
			$('.pricing-tab').addClass('active');
		};
		if (pageid == 414) {
			$('.resources-tab').addClass('active');
		};
		if (pageid == 1499) {
			$('.customers-tab').addClass('active');
		};
		if (pageid == 1277 ) {
			$('.product-tab').addClass('active');
		};
		if (pageid == 1519 || pageid == 1533 || pageid == 1534 || pageid == 1535 || pageid == 1536 || pageid == 1538 || pageid == 1537 || pageid == 1522 || pageid == 1291) {
			$('.feature-tab').addClass('active');
		};

		$("#signup .textfield input").on({ 
			focus: function(ev){
				$(this).parents(".textfield").addClass("active")
			},
			blur: function(ev){
				$(this).parents(".textfield").removeClass("active")
			}
		})

		$('.smoothscroll').smoothScroll({ offset: -130 })

		// Autoplay default init
		$(".fd-autoplay").fd_autoplay();

		$(".sub-menu li").on("click", function(ev){
			var link = $(this).find("a").first().attr("href");

			if(link){
				window.location = link;
			}
		});

		// FancyBox
		$('.fancybox').fancybox();
		$('.youtube-widget a, .slideshare-widget a, .banner-video .fancybox').click(function(evt) {
			evt.preventDefault();
			evt.stopPropagation();
			var href = $(this).attr('href');
			$.fancybox.open({
				href : href,
				type : 'iframe',
				padding : 5,
				arrows : false,
				helpers : {
					media : {},
				}
			});
		});

		$("a.inline_fancy, .inline-fancybox a").fancybox({
			'width': 450,
			'height': 550,
			'autoDimensions': false,
			'autoSize': false
		});

		// IE Specific classes
        if($.browser.msie) {
            if ($.browser.version.slice(0,1) === '7') {
                $('html').addClass('ie7');
            } else if ($.browser.version.slice(0,1) === '8') {
                $('html').addClass('ie8');
            } else if ($.browser.version.slice(0,1) === '9') {
                $('html').addClass('ie9');
            }
        }

        if(getParameterByName('submitted') == 'mobihelp') {
	 	   $('#details_form').trigger('click');
		}

		//Tour sticky DOM _construct [As per the tour nav(images & text) provided]
		var tourStickyNavs = new Array('chaos-to-control-icon','proactive-icon','scaling_up-icon','business_alignment-icon');
    	var tourStickyDom = jQuery('#tour_controls').html();
    	jQuery('.tour_sticky').append(tourStickyDom);
    	jQuery('.tour_sticky').find('li a').each(function(index){ jQuery(this).attr('id', tourStickyNavs[index]) });
    	
    	// $('.fd-tour-sticky').waypoint('sticky');
    	if($(window).width() >= 721) {
	    	$('.comparison-right-panel').waypoint('sticky',{
	    		// wrapper: '<div class="sticky-sidebar-wrapper" />',
	    		offset:"90px"
	    	});
	    	$('.comparison-desk').waypoint('sticky');
    	}
    	if($(window).width() <= 720) {

    		$('.price-comparison .sticky-sidebar').removeClass('sticky-sidebar');
    		$('.price-comparison .sticky-sidebar-wrapper .stuck').removeClass('stuck');

    		$('.mainimgwrapper').each(function(){

    			$(this).children(".movedownimg").appendTo(this);

    		});

    		$(".affiliate-commission").parent().parent().parent().css("margin-left","10%");
    		$(".affiliate-manager").parent().css("margin-left","10%");
    		$(".affiliate-manager").parent().css("text-align","left");


    	}

    	if($(window).width() <= 1025) {

    		$('.mainimgwrapper').each(function(){
    			$(this).children(".movedownimg").appendTo(this);
    		});

    		$('.company-logo-blocks .company-block').each(function(){
    			$(this).css("height",$(this).css("width"));
    		});

    	}

  

		$(document).on("pagecreate",function(){
  			$(".main").on("swipeleft",function(){

  				$(".slideshow_item").each(function(){

  					if($(this).css("display") != "none")
  					{
  					var prevurl = $(this).children(".tour-banner").children().children().children(".right-nav.next").attr("href");
					window.location.href = prevurl;
  					}
  						
  				});
  				
  			

  			});
  			$(".main").on("swiperight",function(){
				$(".slideshow_item").each(function(){
  					if($(this).css("display") != "none")
  					{
  					var nextvurl = $(this).children(".tour-banner").children().children().children(".left-nav.prev").attr("href");  				
					window.location.href = nextvurl;
				  	}  						
  				});
  			});                  
		});

			
    	//Responsive Scripts
    	if($(window).width() <= 1025) {
			$('.menu-icon').on("click", function(){
				$(".site-nav").slideToggle();
			});

			$(".site-nav a").removeClass("btn btn-mini btn-red").addClass("nav-link");

			$.each($(".banner-image"), function(i, item){
				$(item).appendTo($(item).parent());
			});	
			$('.site-nav li.h-head').on("click",function(ev) {
		    	ev.preventDefault();
		    	$( ev.target ).siblings().slideToggle();
		    });
				
		}

		if ($(window).width() >= 980){
			$('.fd-tour-sticky,.fd-home-sticky,.fs-tour-sticky,.fd-page-sticky').waypoint('sticky');
			
			$('.h-head .sub-menu').on('mouseenter mouseleave', function(){
        		$(this).siblings('.nav-link').toggleClass('active');
    		});
		}
		// footer dropdown for mobile 
		if ($(window).width() <= 720) {
			$('.fmenu li.fhead').on("click",function(ev) {

				if($(this).hasClass("active"))
				{
					$(this).removeClass('active');
					$(this).siblings().slideToggle();
				}
				else
				{
				$('.fmenu').find('li.fhead.active').removeClass('active').siblings().slideToggle();
				$(this).addClass('active');
		    	ev.preventDefault();
				$( ev.target ).siblings().slideToggle();		    	
		    	}

		    });
		    //$('.footer-wrapper .parent2').prepend($('.f-contact')).prepend($('.footer-wrapper .parent2 .fg-4'));

			$.each($(".cust-info-box,.responsive-post,#signup-right-panel,.support-left-panel"), function(i, item){
				$(item).prependTo($(item).parent());
			});	
			$.each($(".landing-customer-info"), function(i, item){
				$(item).appendTo($(".landing-left-panel").parent());
			});

			$('.wrapper-dropdown').on("click", function(){
				$(".dropdown").slideToggle();
			});
		}


	$('.fd-signup-form .textfield').on('click keyup focus',function(){
			
			if($(this).hasClass('user_row')){
				$('.user_row').addClass('active');
			}else{
				$('.user_row').removeClass('active')
			}
	});

	$('.fd-signup-form .textfield.user_row input').on('blur',function(){

		if($('.user_row').hasClass('active')){
			$('.user_row').removeClass('active')
		}

	});


		
		$('.fd-signup-form .firstname #user_name').focus();

		if ($(window).width() <= 1040) {
			$('.fd-signup-form .user_row input').on('blur',function(){

				$('.user_row').each(function(){
					var userinput = $(this).children('input').val();
					if(userinput === ''){
					}else{
						$('.user_row').removeClass('error')
					}
				})

			});

			$('.fd-signup-form #signup_button').on('click blur focus',function(){
					setTimeout(function() {
	      				if ($('#error_container').hasClass("has_errors")){
						 		$('#error_container').hide();
						 	 	$('#signup_button').animate({
						            top: 50 + "px"
						        }, {
							     	duration: 400,
							     	complete: function(){
							     		$('#error_container').attr("style", "display: block !important");
							    	}
								});
						 }
					}, 500);

			});
		}
		
		$('.user_row input').on('focus',function(){
 			$('.user_row').addClass('active')
		});

		$('.fd-signup-form #signup_button').on('click blur focus',function(){

				if($('.user_row').hasClass('error')){
					$('.user_row').addClass('active');
					$('.user_row').addClass('error');
				}else{
					$('.user_row').removeClass('active')
					$('.user_row').removeClass('error');
				}
		});




		// Widget
		$('.support-widget').bind('click', function(){FreshWidget.show()})
			
		$("img").unveil();
		$("img").unveil(100, function() {
		  $(this).load(function() {
		    this.style.opacity = 1;
		  });
		});
		
		//freshchat header dynamic content	
		$('#target').teletype({
		  text: [
		    'random IPs into humans', 'eyeballs into engagement','visits into relationships','conversations into tickets'
		  ]
		});

		window['geoLocation'] = function () {
			if (typeof google !== 'undefined' && google.loader.ClientLocation){
				return currentLocation = google.loader.ClientLocation.address.country_code;
			}

			return 'US';
		};

        $('.banner-inner .video-play-btn').click( function(e){
        	 $('.banner-inner,.video-container,.home-customer-logos,.video-image,header').css('display','none');
        	  e.preventDefault();
        	 $('.origin-video,.animation-video,.close_btn').css('display','block');
            $('#origin-video').get(0).play();
        });

	   $("#origin-video").bind("ended", function(e) {
		   $('.origin-video,.animation-video,.close_btn').css('display','none');
		   e.preventDefault();
		   $('.banner-inner,.video-container,.home-customer-logos,.video-image,header').css('display','block');
		});

		try{
			$(".flipster").flipster({ style: 'carousel' });	
		}catch(e){

		}
		 $('.box-slider').boxRollSlider();

		$('.open-positon .roles.active .roles-status').html('Hiring now')

    // $(window).load(function() {
      $('.eu-extra-info .promotional-offers input').attr('checked', false);
      $.get("https://api.ipdata.co", function (response) {
        var clearCookies = function () {
          var expires = new Date();
          expires.setMilliseconds((expires.getMilliseconds() - 1) * 864e+5);
          document.cookie.split(';').map(function(pair) {
            document.cookie = pair.split('=')[0] + '=;path=/;expires=' + expires.toUTCString();
          });
        };
        // response.continent_code = 'EU'
        if (response.continent_code == 'EU') {
          $('#signup .tc-text').slideUp(100);
          $('.eu-extra-info:not(.modal-on-click)').show();

          if (window.localStorage.gdpr_preference) {
            if (window.localStorage.gdpr_preference === 'NOT_ACCEPTED') {
              clearCookies();
            }
          } else {
            $('#eu-cookie-policy-popop').fadeIn(250);
          }

          $('#eu-cookie-policy-popop .accept-cookies').click(function () {
            window.localStorage.gdpr_preference = 'ACCEPTED';
            $('#eu-cookie-policy-popop').fadeOut(250);
          });
          $('.eu-extra-info .promotional-offers input').attr('checked', true);
        } else {
          $('#signup .tc-text').show();
          $('.eu-extra-info .promotional-offers input').attr('checked', false);
          $('.eu-extra-info:not(.modal-on-click)').hide();
        }
      })
    // })

	});
}(window.jQuery);
