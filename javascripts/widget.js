$(document).ready(function(){
	// Dropdown
	function DropDown(el) {
		this.dd = el;
		this.placeholder = this.dd.children('span');
		this.opts = this.dd.find('ul.dropdown > li');
		this.val = '';
		this.index = -1;
		this.initEvents();
	}
	DropDown.prototype = {
		initEvents : function() {
			var obj = this;

			obj.dd.on('click', function(event){
				$(this).toggleClass('active');
				$('.wrapper-dropdown .caret').toggleClass('active');
				return false;
			});

			obj.opts.on('click',function(){
				var opt = $(this);
				obj.val = opt.children().clone();
				obj.index = opt.index();
				obj.placeholder.html(obj.val);
			});
		},
		getValue : function() {
			return this.val;
		},
		getIndex : function() {
			return this.index;
		}
	}
	var dd = new DropDown( $('#dd') );

	$(document).click(function() {
		// all dropdowns
		$('.wrapper-dropdown').removeClass('active');
		$(".wrapper-dropdown .caret").removeClass('active');
	});

	

	var expand = true;
if ($(window).width() >= 980){

	$('.res-search').on('click',function() {
		$('#dd').fadeOut(150);
		$('.icon-close').show('slow')
		if(expand == true){
			$(this).animate({ width: '+=330' }, {
				duration: 700,
					complete: function(){
						expand = false;
					}
			});
		}
	});
	
	$('.icon-close').click(function(e){
		e.stopPropagation();
		if(e.target.className !== "res-search"){
			$(this).hide('slow');
			$(".res-search").animate({ width: '-=330' }, 
				{
			     duration: 500,
			     complete: function(){
					$('#dd').fadeIn('slow');	
					$('.null-value').hide(); 
					widget(integrationName);	
					$(".search-text").val('');  
					expand = true;     
			    }
			});
		}
		
	});
}	

$(document).click(function(e){
	
	if($('.icon-close').is(':visible') ){

		if(e.target.className !== "search-text"){
			$('.icon-close').hide('slow');
			$(".res-search").animate({ width: '-=330' }, 
				{
			     duration: 500,
			     complete: function(){
					$('#dd').fadeIn('slow');	
					$('.null-value').hide(); 
					widget(integrationName);	
					$(".search-text").val('');  
					expand = true;     
			    }
			});
		}
	}
		
});


	var integrationName = '',
		TempArray;
	$('#dd li').on('click',function(e){
		$(".wrapper-dropdown .caret").hide();
		e.preventDefault();
		integrationName = $(this).children().data('category');
		widget(integrationName);		
	});


	function widget(integrationName){
		$('.res-widget').hide();
		if (integrationName != '') {
			var $obj = $('.res-widget');
			$obj.each(function(i,val){
				TempArray = $(val).data('title').split(',');
				if (TempArray.indexOf(integrationName) != -1) {
					$(val).show();
				};
			});
		}else{
			$('.res-widget').show();
		};
	}

	

	$('#search-keyword').on( "keyup", function() {
		$('.null-value').hide();
		if($(this).val()) {
			var input = $(this).val().toLowerCase();
			$(".res-widget").hide();
			$(".res-widget[data-head*='"+ input +"']").show();
			if(!$('.res-widget:visible').get(0)){
				$('.null-value').show();
			}
		}else{
			$('.null-value').hide();
			widget(integrationName);		
		}
	});
		  


});