(function ($) {

$('[id^=feature-]').on('click', function(){
	$(this).toggleClass('active');
});


// waypoint sticky stop
$('.p-feature').last().addClass('stick-stop');


// Number Spinner
function Addtion(){

	$('.numb-spinner input').val( parseInt($('.numb-spinner input').val(), 10) + 1);
}

function Subraction(){
	$('.numb-spinner input').val( parseInt($('.numb-spinner input').val(), 10) - 1);
}

$('.numb-spinner .caret-up').on('click', function() {
	if($(".input-control").val()!= ""){
	 Addtion();
	 freshPlan();
	 Competitorplan();	
	 plansName(fresh_largest,largest);
	 Nullarray();
	}else{
		$(".input-control").val(0)
	}
});

$('.numb-spinner .caret-down').on('click', function() {
	if($(".input-control").val()>0){
		Subraction();
		freshPlan();
		Competitorplan();	
		plansName(fresh_largest,largest);
		Nullarray();
	}	
});


// Pricing Comparison
var comparison = {
	'email_ticketing' 		:{ 'freshdesk':0,  'zendesk':1,  'desk':3,  'service_cloud':65  },
	'automatic_ticket'		:{ 'freshdesk':0,  'zendesk':25, 'desk':3,  'service_cloud':65  },
	'knowledge_base'		:{ 'freshdesk':0,  'zendesk':1,  'desk':3,  'service_cloud':260 },
	'live_chat'  			:{ 'freshdesk':25, 'zendesk':25, 'desk':30, 'service_cloud':260 },
	'phone_support'  		:{ 'freshdesk':0,  'zendesk':1,  'desk':3,  'service_cloud':65  },
	'community_forums'  	:{ 'freshdesk':16, 'zendesk':25, 'desk':30, 'service_cloud':135 },
	'multiple_accounts'  	:{ 'freshdesk':16, 'zendesk':25, 'desk':30, 'service_cloud':135 },
	'reporting_analytics'	:{ 'freshdesk':0,  'zendesk':1,  'desk':30, 'service_cloud':65  },
	'multi_languages'		:{ 'freshdesk':25, 'zendesk':59, 'desk':30, 'service_cloud':65  },
	'CSS_customizations'	:{ 'freshdesk':25, 'zendesk':25, 'desk':30, 'service_cloud':135 },
	'muitple_products'		:{ 'freshdesk':25, 'zendesk':125,'desk':50, 'service_cloud':0	},
	'email_support'			:{ 'freshdesk':0,  'zendesk':59, 'desk':50, 'service_cloud':260 }
}

// pricing plan
var plans = {
	'freshdesk' 	: { '0'	 :'sprout', 	  '15'	: 'sprout', 	'16' : 'blossom', '25'  : 'garden'	  },
	'zendesk' 		: { '1'	 :'starter',	  '25'	: 'regular',	'59' : 'plus',	  '125' : 'enterprise'},
	'desk'			: { '3'	 : 'starter',	  '30' 	: 'standard',	'50' : 'plus'		},
	'service_cloud' : { '65' : 'professional','135' : 'enterprise', '260': 'performance'}
}

// Global Variables
	var companyName = 'zendesk',
		agentCount = 10,
		starter_agent,
		self_array = [],
		others_array = [],
		self,
		others,
		fresh_largest,
		largest,
		data;

var companyName = $('.pricing-cal h1 span').data("company");
var className = $('#other-logo').attr('class');
$('#other-logo').removeClass(className).addClass(companyName);



// Agent Count Spinner
$('.numb-spinner').on('click',function(){
	agentCount = $('.input-control').val();							// Getting the No. of Agents
		freshPlan();	
		Competitorplan();	
		plansName(fresh_largest,largest);
		Nullarray();
});
  

// Agent Count using Keypress
$('.numb-spinner').on('keyup',function(e){
	var code = e.which;
	if(code == 38){													// Keycode for Up arrow key
		if($(".input-control").val()!= ""){
			Addtion();
			agentCount = $('.input-control').val();					// Getting the N0. of Agents using Keypress
			freshPlan();	
			Competitorplan();	
			plansName(fresh_largest,largest);
			Nullarray();
		}else{
			$(".input-control").val(0);
		}
		
	}
	else if(code == 40){											// Keycode for down arrow key
		if($(".input-control").val()>0){
			Subraction();
			agentCount = $('.input-control').val();
			freshPlan();	
			Competitorplan();		
			plansName(fresh_largest,largest);
			Nullarray();
		}
	}
	else if(code == 13){											// KeyCode for Enter
		agentCount = $('.input-control').val();
		freshPlan();	
		Competitorplan();		
		plansName(fresh_largest,largest);
		Nullarray();
	}
});


//  Restricting the text in Agent Count
$('.input-control').keydown(function(event) {
    // Allow special chars + arrows 
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 
        || event.keyCode == 27 || event.keyCode == 13 
        || (event.keyCode == 65 && event.ctrlKey === true) 
        || (event.keyCode >= 35 && event.keyCode <= 39)){
            return;
    }else {
        // If it's not a number stop the keypress
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
            event.preventDefault(); 
        }   
    }
});



// if the sprout is out of free plan
function freeplan(className,starterPricing){
	var starter;
	starter_agent = agentCount - 3;												// If agent is greater than 4 in sprout plan
	starter = (starterPricing)*(starter_agent);
	$('.'+className).html('$'+starter);
}


// logic starter plan
function freshPlan(push){
	var sprout=15;

	fresh_pricing(push);

	if(agentCount >= 4 && fresh_largest < 15){
		freeplan('fd-feature-pricing',sprout);
	}
	else{
		pricingOutput('fd-feature-pricing', fresh_largest);
	}
}


function fresh_pricing(push){
	if(push){
		self_array.push(comparison[data]['freshdesk']);							// Pushing the value of feature in to an array
	}
	fresh_largest = Math.max.apply(Math, self_array);							// Finding the largest Value
}



// Competitor plan
function Competitorplan(push){
	var competetorPricing = {
			zendesk : 25,
			desk : 30,
			service_cloud : 0
		}; 

	competitor_pricing(push);

	if(agentCount >= 4 &&  largest < 16 ){										// if Agent is out of free plan 
		freeplan('other-feature-pricing',competetorPricing[companyName]);
	}
	else {
		pricingOutput('other-feature-pricing', largest);
	}
}


function competitor_pricing(push){
	if(push){
		others_array.push(comparison[data][companyName]);
	}
	largest = Math.max.apply(Math, others_array);
}


function pricingOutput(className, largest){
	var output = (largest)*(agentCount)||0;										// Mulitplying the price with no. of agents
	$('.'+className).html('$'+output);
}


function Nullarray(){	
		if(others_array.length === 0){
			$('.fd-feature-pricing,.other-feature-pricing').html('$0');
		}	
}

function deseletedPricing(){
	var fresh_index,
		other_index,
		sprout = 15,
		competetorPricing = {
			zendesk : 25,
			desk : 30,
			service_cloud : 0
		}; 

		self = comparison[data]['freshdesk'];
		others = comparison[data][companyName];

		fresh_index = self_array.indexOf(self);									// Finding the Index Value
		other_index = others_array.indexOf(others);	
		
		self_array.splice(fresh_index, 1);										// Removing the Index value	
		
		others_array.splice(other_index, 1);

		var other_largest = Math.max.apply(Math, others_array);  				// Finding the largest price in the array

		if(agentCount >= 4 && other_largest < 16){
			freeplan('other-feature-pricing',competetorPricing[companyName]);
		}
		else{
			pricingOutput('other-feature-pricing', other_largest);
		}

		var self_largest = Math.max.apply(Math, self_array);  					// Finding the largest price in the array

		if(agentCount >= 4 && self_largest < 15){
			freeplan('fd-feature-pricing',sprout);
		}else{
			pricingOutput('fd-feature-pricing', self_largest);
		}		

		plansName(self_largest,other_largest);

		Nullarray();
}

//Getting Plan name according to the pricing of helopdesk
function plansName(freshlargest,otherlargest){
	var competitor_plan = {
		'zendesk' : 'regular',
		'desk': 'standard'
	}

	var freshPlan = plans['freshdesk'][freshlargest];
	$('.freshplan').html(freshPlan);

	if(agentCount >= 4 && otherlargest < 24){
		var competetorPlan = competitor_plan[companyName];
	}else{
		competetorPlan = plans[companyName][otherlargest];
	}
	
	$('.competetor-plan').html(competetorPlan);
}


// Features selection
$('.p-feature').click(function(ev){
	ev.preventDefault();
	data = $(this).data('feature');
	$('.fd-plan,.cr-plan').css('display','block');

	if($(this).hasClass('active')){
		self = comparison[data]['freshdesk'];
		others = comparison[data][companyName];
		freshPlan(true);
		Competitorplan(true);
		plansName(fresh_largest,largest);
	}
	else{
		deseletedPricing();		
	}
	
});

try{
	var id_name = ['feature-mail','feature-automation', 'feature-knowledge', 'feature-phone', 'feature-analytics', 'feature-support'];

	$.each(id_name, function(index, value){
		var sprout_plan = $('.features #'+value).addClass('active');
		data = $(sprout_plan).data('feature');
		freshPlan(true);
		Competitorplan(true);
		plansName(fresh_largest,largest);
		$('.fd-plan, .cr-plan').css('display','block');
	});
}catch(ex){
	
}

})(jQuery);