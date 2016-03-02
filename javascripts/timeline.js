if ($(window).width() >= 1080){
	$(document).ready(function(){
		var $timeline_block = $('.fd-timeline-block');
		var animate = true;
		//hide timeline blocks which are outside the viewport
		$timeline_block.each(function(){
			if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.95) {
				$(this).find('.fd-timeline-content').addClass('animate');
				$(this).find('.fd-img-timeline').addClass('hidden');
			}
		});

		//on scolling, show/animate timeline blocks when enter the viewport
		$(window).on('scroll', function(){
			$timeline_block.each(function(index){
				if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75) {
					 if (index%2 == 0) {
					 	$(this).find('.fd-timeline-content.animate').animate( { right: '250' },{
							duration: 500,
							complete: function(){
								$(this).parent().find('.fd-img-timeline.hidden').fadeIn('slow');
						    }
						});
					}else{
						$(this).find('.fd-timeline-content.animate').animate( { left: '250' },{
							duration: 500,
							complete: function(){
								$(this).parent().find('.fd-img-timeline.hidden').fadeIn('slow');
						    }
						});
					}
				}
			});
		});
	});
}