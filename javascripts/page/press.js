// Press page js
!function( $ ) {

	$(function () {

		"use strict"

		if(window['page']['edit_mode']) return;

		var $press_year = {}, month_index = 0;

		$("#year-panel").empty()

		$.each($('.press-item'), function(i, item){
			var year = item.id.split('-')[1], month = item.id.split('-')[0]
			
			if($press_year[year] === undefined){
				$press_year[year] = {}
				month_index = 0
			}

			if($press_year[year][month] === undefined)
				$press_year[year][month] = month_index++;
		})

		$.each($press_year, function(year, months){
			var $year_link = $("<a id='year-"+year+"'>"+year+"</a>"), 
				$year = $("<li></li>").append($year_link),
				$months = $("<ul class='nav nav-list nav-sidebar nav-months'></ul>");


			$.each(months, function(month, val){
				var month_anchor = "#"+month+"-"+year;
				$months.append("<li><a href='"+month_anchor+"'>"+month+"</a></li>");

				if(val == 0) $year_link.attr("href", month_anchor)
			})

			$year.append($months).prependTo("#year-panel")
		})

		// Making the top elements as active by default
		$("#year-panel li")
			.first()
			.addClass("active")
			.find("li").first().addClass("active");
		$(".press-item").last().addClass("stick-stop");

		$('.press-item').waypoint({
			offset: "60px",
			handler:function(direction){
				var $month_element = $("[href=#"+this.id+"]"),
					$year_element = $("#year-" + this.id.split("-")[1]),
			        $month_li = (direction == 'down') ? $month_element.parent() : $month_element.parent().prev(),
			        $year_li = $year_element.parent();

			    if($month_li.get(0))
			        $month_li.addClass("active").siblings().removeClass('active')

			    if($year_li.get(0))
			    	$year_li.addClass("active").siblings().removeClass('active')

			}
		})

		// Smooth scroll
		$('#year-panel a').smoothScroll()
	})
	
}(window.jQuery);