(function () {

	// Display the Customer logos dyanamicallys
	var count=0;

    setInterval(function() {
	    $('.company-block.active,.tour-company-block.active').removeClass('active');
	   
	    if(count===6){ count=0 }
        count++
       
        $('#cb-'+count).addClass('active');
   		
   		var imgActive = $('.company-block.active .cb-img.active,.tour-company-block.active .cb-img.active').removeClass('active');
   		
   		if(imgActive.next() && imgActive.next().length){
                imgActive .next().addClass('active');
   		}else{ 
   			imgActive.siblings(":first").addClass('active'); 
   		}
    }, 1000);
    

    setInterval(function() {
       	$('.flipster .flipto-next').trigger('click');
    }, 3000);

   

    //  Page scroll Animation


  	$(window).on("scroll", function () {
	 	
	 	var y = $(this).scrollTop();	      
        
        if (y > 410) {
			$('.home-features .fg-4').each(function(i) {
			    var $div = $(this);
			    setTimeout(function() { 
			    	$div.addClass('load'); 
			    }, i*300); // delay 300 ms
			});
		}
		 
		if (y > 200) {
			
			$("#bars li .bar,#bars li .bar1").each( function( key, bar ) {
			    var percentage = $(this).data('percentage');
			    
			    $(this).animate({ 'height' : percentage + '%' }, 2000)
			});

		    setTimeout(function(){
		    	$("#bars").addClass("risen");
		    	$("#bars li").first().addClass("active");

		    	$("#bars li").on("mouseenter", function(){
		    		$(this).parent().find(".active").removeClass("active");
		    		$(this).addClass("active");
		    	});
		    	$("#bars li").on("mouseleave", function(){
		    		$(this).removeClass("active");
		    	});
		    }, 2000);

			$('.tour-game.object').addClass('move-left');
			
			$('.tour-secondary-banner .pointer, .tour1-content').each(function(i) {
			    var $div = $(this);
			    setTimeout(function() { $div.addClass('active'); }, i*130); // delay 130 ms
			});
		}

		//  Header Sticky showen after the First Div

    	var topDiv = ($('.header.fd-sticky.fc').offset() || { "top": NaN }).top;
    	var isStuck = false;
    	if(!isStuck)
    	{
    	    $('#fd-home.fd-home-sticky.in').removeClass("stuck");
    	    if( y > topDiv)
    	    {
    	          $("#fd-home.fd-home-sticky.in").addClass('stuck');
    	          $(".fresh-widgets").show();
    	          isStuck = true;
    	   }
    	}
    	else {
    		if( y < topDiv)
    	    {
    	       $('#fd-home.fd-home-sticky.in').removeClass("stuck");
    	       isStuck = false;
    	   	}
    	}
        	
	});		
	var pageTitle = getPageTitle();
	var slide_index = $('[rel="'+ pageTitle +'"]').index() - 1,
		slide_pos = slide_index,
		slide_len = 0,
		slide_int,
		restart;
 	
   
	// Tour Pagination

	$(document).pjax('a[data-pjax]', '#tour-append');
	
	$('#tour-append')
		.on('pjax:start', function (xhr, options) {
			pageTitle =  getPageTitle();
			slide_pos = $('[rel="'+ pageTitle +'"]').index() - 1;
			console.log(pageTitle);
			
			$('#tour-append')
					.removeClass('fade-in')
					.addClass('fade-out');
			
			$('html, body').animate({
		        scrollTop: $('#slideshow').offset().top
		    }, 1000);
		}).
		on('pjax:send', function (xhr, options) {
			window['tourLoader'] =  setTimeout(function(){ 
										$('#loader')
											.addClass('tour-loader') 
											.fadeIn(500);
									}, 2000);
		}).
		on('pjax:complete', function (xhr, options) {
			clearTimeout(window['tourLoader']);	
		
			$('#loader')
				.fadeOut(500, function(){ 
					$(this).removeClass('tour-loader');
				});

			$('#tour-append')
					.removeClass('fade-out')
					.addClass('fade-in');

			$('.flipster').flipster({ style: 'carousel' });
			
			$(".topImage").css('width', '50%');
			
			$(".beforeAfterSlidebar").mousemove( function(e) {
				// get the mouse x (horizontal) position and offset of the div
				var offset =  $(this).offset();
				var iTopWidth = (e.pageX - offset.left);
				// set width of bottomimage div
				$(this).find(".topImage").width(iTopWidth);
			});
			changeIt();
		}).
		on('pjax:popstate', function (ev) {
			slide_pos = $('[rel="'+ pageTitle +'"]').index() - 1;
		});
	
	 /*home slide show */

	$(document).ready(function() {
	    var $next = $('.next');
	    var $prev = $('.prev');
	    pageTitle = getPageTitle();
	    slide_pos = $('[rel="'+ pageTitle +'"]').index() - 1;
	    slide_len = $(".slideshow_item").size() - 1;

	    $(".slideshow_item:eq(" + slide_pos + ")").show();
	    $(".tour-features-strip li:eq(" + slide_pos + ")").addClass('active');

	    $next.click(function(){
	        if (slide_pos < slide_len){
	            clearInterval( slide_int );
	            slide_pos++;
	        }
	        else{
	        	clearInterval( slide_int );          
            	slide_pos = 0;
	        }
	    })
	    
	    $prev.click(function(){
	        if (slide_pos > 0){
	            clearInterval( slide_int);
	            slide_pos--;
	        }
	        else{
	        	clearInterval( slide_int );           
            	if(slide_pos == 0){
            		slide_pos = $(".slideshow_item").size() - 1 ;
            	} else{
            		slide_pos--;
            	}
	        }
	    })
	});

	function changeIt(){
	    $(".slideshow_item").fadeOut(500);
	    $(".slideshow_item:eq(" + slide_pos + ")").fadeIn(1000);

	    $(".tour-features-strip li.active").removeClass('active');
	    $(".tour-features-strip li:eq(" + slide_pos + ")").addClass('active');
	}

	function getPageTitle() {
		var win_pathname = decodeURI(window.location.pathname);
		var pathArr = win_pathname.split('/');
		var newArray = pathArr.filter(function(v){return v!==''});
		var pageTitle = newArray[newArray.length - 1];
		return pageTitle;
	}

	$('.tour-features-strip a').on('click', function(ev){
		if($(this).parent().hasClass("active")){
			ev.preventDefault();
		}
	});


	
}());