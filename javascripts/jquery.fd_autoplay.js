!function( $ ) {

	"use strict"

	/* AUTOPLAY PUBLIC CLASS DEFINITION
	* ============================== */
	var FD_AutoPlay = function(element, options){		
		this.$element 		= $(element)
		this.$interval 		= null		
		this.options 		= $.extend({}, $.fn.fd_autoplay.defaults, options, this.$element.data())
		
		// Waypoint check
		this.$waypoint 		= this.options.waypoint && checkPlugin('waypoint')

		this.$items 		= this.$element.find(this.options.triggerItem)
		this.$currentItem	= this.$items.first()

		this.$element
			.delegate(this.options.triggerItem, "click.fd_autoplay", $.proxy(this.select, this))

		// Start the animation from the current item
		if(this.options.autoPlay && !this.$waypoint) this.start()

		if(this.$waypoint){
			this.$element.waypoint(this.options);
			this.$element.waypoint({
				offset: function(){ return -$(this).height(); },
				handler: this.options.handlerDown
			});
		}
	}
	
	FD_AutoPlay.prototype = {
		constructor: FD_AutoPlay
		// To start the slide at anypoint
	,   start: function(e){
			e && e.preventDefault()

			if(this.$started) return

			this.$currentItem.trigger("click")
			this.$interval = setInterval($.proxy(this.nextSlide, this), this.options.duration)

			this.$started = true
		} 
		// To move to the next item
	,	nextSlide: function(e){
			this.$items.removeClass("active")
			this.$currentItem = $(this.$currentItem.next().get(0))

			if(!this.$currentItem.get(0))
				this.$currentItem = this.$items.first()				
				
			this.$currentItem.addClass("active")

			this.selectSlideItem()

			this.options.changeSlide(this.$currentItem)
		}
		// To stop the slide at anypoint
	,	stop: function(e){
			e && e.preventDefault()
			this.$started = false
			clearInterval(this.$interval)
		}
		// Select a particular silde
	,	select: function(e){
			// e && e.preventDefault()

			this.stop()

			if(this.options.stopOnClick == false){			
				setTimeout($.proxy(this.start, this), this.options.duration)
			}	

			this.$currentItem = $(e.currentTarget);
			this.$items.removeClass("active")
			this.$currentItem.addClass("active")

			this.selectSlideItem()

			this.options.changeSlide(this.$currentItem)
		}
	,	selectSlideItem: function(e){
			if(this.options.slideItem != ''){
				$(this.options.slideItem + ".active").removeClass("active")
				$(this.options.slideItem + ":eq("+ this.$currentItem.index() +")").addClass("active")
			}
		}
	}

	$.fn.fd_autoplay = function(option, opt_setting) {
		return this.each(function () {
			var $this = $(this)
			, data = $this.data('fd_autoplay')
			, options = typeof option == 'object' && option

			if(!data) $this.data('fd_autoplay', (data = new FD_AutoPlay(this, options)))

			if(typeof option == 'string') data[option](opt_setting)
		})
	}

	$.fn.fd_autoplay.defaults = {
		// autoplays the set on load of the document
		autoPlay: true,
		// Duration for each slide
		duration: 5000,
	  	// Stops play when an item is selected manually 
	  	stopOnClick: true,
	  	// Any dom element inside the container 
	  	// So general action calls are binded during this stage
	  	triggerItem: "a",
	  	// Associated slide to make active
	  	slideItem: "",
	  	// On change of item
	  	changeSlide: function(){ },
	  	// !IMPORTANT the options requires jQuery waypoint http://imakewebthings.com/jquery-waypoints/
		// autoplay on waypoint
		// All waypoint related options can be namespaced with data-waypoint-...
		waypoint: false, // true | false
		activateClass: "animate",		
		triggerOnce: true,
		offset: "50%",
		handler: function(direction){
			var src_opts = $(this).data('fd_autoplay')

			if(src_opts){
				$(this).addClass(src_opts.options.activateClass)
				$(this).fd_autoplay("start")
			}
		},
		// handle when the bottom reaches the top of the viewport
		handlerDown: function(direction){
			$(this).fd_autoplay((direction == 'down') ? "stop" : "start")
		}
	}

	$.fn.fd_autoplay.Constructor = FD_AutoPlay

}(window.jQuery);