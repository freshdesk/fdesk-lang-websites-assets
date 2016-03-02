// !PLUGIN
// Mimics window scroll position usefull to show milestones
!function( $ ) {

	"use strict"

	/* SCROLLMAP PUBLIC CLASS DEFINITION
	* ============================== */

	var Scrollmilestones = function(element, options) {

		this.$element = $(element)
		this.options = $.extend({}, $.fn.scrollmilestones.defaults, options, this.$element.data())
		this.milestones = [];
		this.milestoneLine = $(this.options.lineTemplate).prependTo(this.$element);
		this.milestoneIndicator = $(this.options.indicatorTemplate).appendTo(this.milestoneLine);
		this.currentMilestone = 0;
		this.ready = false;

		if(this.options.initOnLoad){
			$(window).on("load", $.proxy(this.init, this))
		}else{
			this.init()
		}

		$(window).on("scroll", $.proxy(this.onScroll, this));

	}

	Scrollmilestones.prototype = {
		constructor: Scrollmilestones,
		// Get the Dom coordinated of the reference DOMs in place
		init: function(){
			var $self = this, left = 0,
				$items = this.$milestones = this.$element.find(this.options.milestoneSelector);

			$.each($items, function(i, item){
				var content = $($(item).attr("href")), top = content.position().top;
				
				$self.milestones.push(top);

				if(i == 0){
					left = $self.domCenterX($(item).parent());
					$self.milestoneLine.css("left", left);
					$self.firstStone = top + $self.options.offset;
				}

				if(i == $items.length - 1){ 
					$self.milestoneLine.width($self.domCenterX($(item).parent()) - left);
					$self.lastStone = top + $self.options.offset;
				}
			})

			this.lineWidth = this.milestoneLine.innerWidth();

			this.milestoneSize = this.milestones.length;

			this.ready = true;

			this.onScroll();
		},

		windowTop: function(){
			return $(window).scrollTop() + this.options.offset;
		},

		onScroll: function(){
			// Check if the plugin is ready to track points
			if(!this.ready) return;

			// Setting milestone position to -1 if the window pos is lesser than the prime stone
			if(this.windowTop() < this.firstStone){
				this.currentMilestone = -1
			}else{
				var milestonePos = (this.windowTop() > this.lastStone) ? 
									this.lineWidth : this.normalize(0, this.relativePoint(), this.lineWidth)	
				this.milestoneIndicator.css("left", milestonePos);
			}
			
			this.$milestones.parent()
				.removeClass("inactive active")
				.eq(this.currentMilestone).addClass("active")

			this.$milestones.slice(0, Math.max(0, this.currentMilestone)).parent().addClass("inactive")
		},

		domCenterX: function(dom){
			return(dom.width()/2 + dom.offset().left)
		},

		normalize: function(a, x, b){
 		   return(Math.min(Math.max(a, x), b));
		},

		relativePoint: function(){
			for(var i = 0; i < this.milestones.length; i++){
				this.currentMilestone = i
				this.getPointOnVertical()

				if(this.relativePosition < 1) break;
			}

			return this.pointOnHorizontal()
		},

		// Calculate the point on the horizontal scroll window relative to the milestone content height
		// This will return a value between 0 & 1
		pointOnHorizontal: function(){
			var h = this.lineWidth/(this.milestoneSize-1), 
				l = this.currentMilestone * h;

			return((this.relativePosition * ((l + h) - l)) + l);
		},

		getPointOnVertical: function(){
			var i = this.currentMilestone;

			this.relativePosition = (this.windowTop() - this.milestones[i])/(this.milestones[i+1] - this.milestones[i]);

			return(this.relativePosition)
		}
	}

	/* SCROLLMAP PLUGIN DEFINITION
	* ======================= */

	$.fn.scrollmilestones = function (option) {
		return this.each(function () {			
			var $this = $(this)
			, data = $this.data('scrollmilestones')
			, options = typeof option == 'object' && option

			if (!data) $this.data('scrollmilestones', (data = new Scrollmilestones(this, options)))

			if (typeof option == 'string') data[option]()
		})
	}

	$.fn.scrollmilestones.defaults = {
		milestoneSelector: "a",
		indicatorTemplate: "<i class='milestone-indicator'></i>",
		lineTemplate: "<i class='milestone-line'></i>",
		offset: 200, 
		initOnLoad: true 
	}

	$.fn.scrollmilestones.Constructor = Scrollmilestones
	

}(window.jQuery);