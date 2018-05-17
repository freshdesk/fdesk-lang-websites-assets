function catchSignupException(fn, submit_form) {
	var submit_form = submit_form || true;
	try {
		return fn();
	} catch(e) {
		console.log(e);
		if (typeof Bugsnag !== "undefined"){
			Bugsnag.notifyException(e);
		}
		if(submit_form){
			setTimeout(function(){
				jQuery("#signup").get(0).submit();
			}, 3000);
		}		
	}
}

if(!window['signup-url']){
	window['signup-url'] = "https://freshsignup.freshdesk.com/accounts/new_signup_free"; 
}

// Maxmind Code Starts

var currentLocation,
	maxmind_location;

var initialTrigger = function(locations){
	var data = {};
	data['ipAddress'] 	= locations.message.traits.ip_address;
  	data['countryCode']	= locations.message.country.iso_code;
  	data['countryName']	= locations.message.country.names.en;
  	data['cityName']  	= locations.message.city.names.en;
  	data['regionName']	= locations.message.subdivisions[0].names.en;
  	data['zipCode']   	= locations.message.postal.code;
  	data['latitude']  	= locations.message.location.latitude;
  	data['longitude'] 	= locations.message.location.longitude;
  	data['timeZone']  	= locations.message.location.time_zone;
    data['source'] 		= 'maxmind';
    return data;
}

if(!localStorage.getItem('maxmind_location')){
	$(document).on('maxmind_locationSet', function(locations){
		currentLocation = initialTrigger(locations);
		session.location = currentLocation;
		maxmind_location = JSON.stringify(session);
	})
}else{
	currentLocation = JSON.parse(localStorage.getItem("maxmind_location"));
	session.location = currentLocation;
	maxmind_location = JSON.stringify(session);
}

// Maxmind Code Ends


(function($){	
	var TRANSLATED = TRANSLATED || {
		messages:{
			"user[first_name]"  : {
				required: "First name field is required"
			},
			"user[last_name]"  : {
				required: "Last name field is required"
			},
			"account[name]"  : {
				required: "You'll need to tell us where you work",
				minlength: "Company name should exceed 2 characters"
			},
			"account[domain]": {
				required: "Give your helpdesk a name",
				maxlength: "Helpdesk name shouldn't exceed 25 characters",
				subdomain:"Only letters, numbers and hyphen allowed"
			},
			"user[email]":{
				required: "Please enter a valid email",
				email:"Please enter a valid email"
			}
		},
		already_exists: 'This Helpdesk already exists',
		email_like:'This Helpdesk already exists',
		thankyoumsg:["Setting up your self service portal", 
					"Cranking up your knowledge base",
					"Configuring your Community Platform", "_redirect"]
	};
	var timeoutId;
	var currentText	= "Please wait ....";
	var firstRequest = false;		
	var userName, fullName, firstName, lastName;
	var current_loc = window.parent.location.href;


	$.validator.addMethod("subdomain", function(value, element) {
		var re = /[^a-zA-Z0-9\-]/;
		return this.optional(element) || !re.test(value.replace(/^\s*|\s*$/g, "")); 
	}, "Only letters, numbers and hyphen allowed.");
	

	$("#signup").validate({
		highlight: function(element) {
			$(element).parents(".textfield").addClass("error");
	    },
	    unhighlight:function(element){
	    	$(element).parents(".textfield").removeClass("error");
	    },
	    errorPlacement: function(error, element){
	    	$(element).parents(".textfield").append(error);
	    },
		errorElement: "em", 
		onkeyup: false,
		rules:{
			"account[name]": {
				"required":true,
				minlength: 3
			},
			"account[domain]": {
				"required":true,
				"maxlength":25,
				"subdomain":true
			},
			"user[email]": {
				"required": true,
				"email": true
			},
			"user[name]": {
				"required": true
			},
			"user[first_name]": {
				"required": true
			},
			"user[last_name]":{
				"required": true
			}
		},
		messages: TRANSLATED.messages,
		submitHandler: function(form, btn) {

			if(!firstRequest){

				catchSignupException(function(){
					$("#session_json").val(maxmind_location); // passing replacer and indent to stringify
					$("#first_referrer").val(($.cookie("fd_fr")||current_loc));
					$("#first_landing_url").val(($.cookie("fd_flu")||""));
					$("#first_search_engine").val(($.cookie("fd_se")||""));
					$("#first_search_query").val(($.cookie("fd_sq")||""));
					$("#pre_visits").val(($.cookie("fd_vi")||0));
					$("#account_timezone_offset").val(getLocalTimeZoneOffset());
					$("#error_container").empty().hide();

					
					
					var freshsales_id =  typeof freshsales != "undefined" ? freshsales.anonymous_id : "error freshsales is not defined",
						html_lang = $('html')[0].lang || 'en-US';
					$("form#signup").append("<input type='text' value='"+html_lang+"' id='account_lang' name='account[lang]' style='display:none'/>");
					$("form#signup").append("<input type='text' value='"+freshsales_id+"' id='freshsales_anonymous_id' name='fs_cookie' style='display:none'/>");
					
					var signupString = $(form).serializeArray();	
					var form_type = $(form).data('form-type');
					if(form_type != undefined && form_type == 'old'){
						$.each(signupString, function(i, val){
							if(val.name == "user[name]"){
								signupString.splice(i, 1);
								signupString.push({'name':'user[first_name]', 'value': firstName });
								signupString.push({'name':'user[last_name]', 'value': lastName });
								return false;
							}
						})
					}

					// Posting signup to Freshdesk.
					var signup_options = { 
						type: "POST",
                        dataType: "json",
						url 	: window['signup-url'],
						data    : signupString,
						success : signupResponse,
						crossDomain: true
					};

					$.ajax(signup_options);

					

					$("#loading_data").show();
					var $btn = $("#signup_button")
					$btn.attr("disabled", true)
						.addClass("btn-disabled btn-loading").data("originalText", $btn.val())
						.val($btn.data("loadingText") || "Please wait...")
						timeoutId = setInterval(function() {
											var text = toggleText(currentText);
											$("#signup_button").val($btn.data("loadingText") || text );
										}, 5000);

					firstRequest = true;
				});
			}
			return false;
		} 			
	});	
	
	// Hack to slide up the error when validator will hide errors
	$.validator.prototype.hideErrors = function(){ this.addWrapper(this.toHide).slideUp(); }
 	
	// $(document).ready(function(){
		checkCookie();

		$("#signup .textfield input").on({ 
			focus: function(ev){
				$(this).parents(".textfield").addClass("active")
			},
			blur: function(ev){
				$(this).parents(".textfield").removeClass("active")
			},
			keyup: function(ev){
				var $this = $(this)
				setTimeout(function(){
					// Remove required tag if input has value
					$this.parents(".textfield").toggleClass("presence", ($this.val() !== ''))	
				}, 0)
			}
		});

 		$("#user_name").keyup(function(){
			userName = $(this).val();
			fullName = userName.split(' ');
			firstName = fullName.slice(0, -1).join(' ');
			lastName = fullName.slice(-1).join(' ');
		});


		$('#signup').click(function(){
			var wait = window.setTimeout( 
				function(){
				  	$('.whitebg').removeClass('animate')
				}, 1300
			);
		});

		$("#account_domain").on("keyup keydown keypress change", 
            function(ev) {
	            var domain_name = $(this).val();
	            if (domain_name.trim() != '') {
	            	$('#domain_url').text(domain_name);
	            } else {
	            	$('#domain_url').text('domain-name');
	            }
			});
		
		function toggleText(currentTxt) {
			return currentText = (currentTxt == "Please wait...") ? 'Creating your Account' : 'Please wait...';
		}	
		
		function isDST() {
		   var today = new Date();
		   var jan = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
		   var jul = new Date(today.getFullYear(), 6, 1, 0, 0, 0, 0);
		   var temp = jan.toGMTString();
		   var jan_local = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
		       temp = jul.toGMTString();
		   var jul_local = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
		   var hoursDiffStdTime = (jan - jan_local) / (1000 * 60 * 60);
		   var hoursDiffDaylightTime = (jul - jul_local) / (1000 * 60 * 60);
		
		   return hoursDiffDaylightTime != hoursDiffStdTime;
		}
		
		function getLocalTimeZoneOffset() {
		  var timeZoneOffset = (new Date()).getTimezoneOffset() / 60 * (-1);
		  timeZoneOffset -= (isDST() ? 1 : 0);
		  return timeZoneOffset;
		}
		
		var showErrors = function(errors){
			errors = eval(errors);
			$("#error_container").empty();
			clearInterval(timeoutId);
			timeoutId = 0;
			combined_errors = {};
			$.each(errors, function(index, value){ 
				combined_errors['' + value[0] + ''] = value[1];
			});

			for (key in combined_errors) {
				var error_message = combined_errors[key];
				if(key == "account_domain"){
					$("#account_domain").addClass("error");
					key = "";
					error_message = TRANSLATED.already_exists
				}
				if(key == "base"){
					$("#user_email").addClass("error");
					key = "";
					error_message = TRANSLATED.email_like
				}
				$('<label />')
					// .append(key)
					.append(" "+error_message)
					.appendTo("#error_container");
			}
			$("#error_container").show();
			$("#error_container").addClass("has_errors");

			var $btn = $("#signup_button")
				$btn.attr("disabled", false)
					.removeClass("submit-btn-disabled btn-disabled btn-loading")
					.val($btn.data("originalText") || "Please try again...")
		};
		
		var showSuccess = function(url){

			url = window['signup-thankyou-url']+"?redirect=" + encodeURIComponent(url) + "&account=" + jQuery("#account_domain").val() + "&lang=" + jQuery("html").attr('lang');

			var autopilotData = {
				'autopilotObject': {
				  'contact': {
					'FirstName': $('input[name^="user[first_name]"]').val(),
					'LastName': $('input[name^="user[last_name]"]').val(),
					'Email': $('input[name^="user[email]"]').val(),
					'Phone': $('input[name^="user[phone]"]').val() || '',
					'Company': $('input[name^="account[name]"]').val(),
					// Please dont forget the !
					'unsubscribed': !($('input[name="send_promotions"]').is(':checked')),
					'custom': {
					  'string--Account--URL': $('input[name^="account[domain]"]').val(),
					  'string--Original--Referrer': $.cookie('fw_fr') || window.parent.location.href,
					  'string--Last--Referrer': $.cookie('fw_flu') || '',
					  'string--Signup--Referrer': window.location.href || '',
					  'string--Mailing--Country': currentLocation.countryName
					},
					'Type': 'fdesk',
					'_autopilot_list': 'contactlist_' + $(form).find('.list-id').val(),
					'_autopilot_session_id': window.AutopilotAnywhere.sessionId
				  }
				}
			  };

			  $.ajax({
				data: JSON.stringify(autopilotData),
				type: 'POST',
				url: 'https://alfred.freshworks.com/v1/autopilot-post',
				crossDomain: true,
				dataType: 'json',
				contentType: 'application/json',
				complete: function (event, xhr, settings){
				  $('body').trigger('autopilotPostCompleted');
				}
			  });
			
			$('body').on('autopilotPostCompleted', function() {
               // Create a new Link
				var a = document.createElement('a');
				if(!a.click) { //for IE
					window.location = url;
					return;
				}
				a.setAttribute("href", url);
				a.style.display = "none";
				document.body.appendChild(a);
				a.click();
			});
			
		};
		 
		var signupResponse = function(responseText){
			catchSignupException(function(){

				if (responseText.success) {
					showSuccess(responseText.url);
				} else {
					showErrors(responseText.errors);
				}

				firstRequest = false;

				$("#loading_data").hide();

			}, false);			
		};

		var signupFailure = function( jqxhr, textStatus, error ){

			var _backend = $("<input type='hidden' name='backend_response' value='failure' />"),
				$form    = $("#signup");

			
			// Adding additional information of backend issue to mail
			$form.append(_backend);

			// Submitting the base form so than an email can be sent to support
			$form.get(0).submit();
		};
					
		$("#account_name").change(function(){ 
			if($("#account_domain").val() === ''){
				$("#account_domain").val($(this).val().toLowerCase().replace(/\W/g, ''));
		    	$('#account_domain').trigger('change');		
		    }
		});
		
		$('#account_domain').change(function(){
			$(this).val($(this).val().toLowerCase().replace(/\W/g, ''));
		});

		$('.error').removeClass('error');

		// Hack to trim text in ie
		if(typeof String.prototype.trim !== 'function') {
		  String.prototype.trim = function() {
		    return this.replace(/^\s+|\s+$/g, ''); 
		  }
		}
		
	// });
		
})(jQuery);


function checkCookie(){
	// Cookies for Universities Landing pages
	var EmailId = jQuery.cookie("EmailId");
	if(EmailId != null && EmailId != ""){
	  	jQuery("#user_email").val(EmailId);

	  	//Deleting the cookie.
	  	jQuery.cookie('EmailId', null);
	}
}

// Input Hidden Fields in signup form

$('#signup input[type="hidden"]').remove();

var hiddenInput = {
	"items":"<noscript> <input type='hidden' name='noscript' id='no_script' value='No Script Support'> </noscript><input type='hidden' name='session_json' id='session_json' value='' /><input type='hidden' name='first_referrer' id='first_referrer' value='' /><input type='hidden' name='first_landing_url' id='first_landing_url' value='' /><input type='hidden' name='first_search_engine' id='first_search_engine' value='' /><input type='hidden' name='first_search_query' id='first_search_query' value='' /><input type='hidden' name='pre_visits' id='pre_visits' value='' />"
};

var hiddenFields = hiddenInput['items'];

$('#signup #signup_error').after(hiddenFields); 