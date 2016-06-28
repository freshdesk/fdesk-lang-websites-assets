$(document).ready(function(){

	var currentLocation;

	initialTrigger = function(locations){
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
			currentLocation = initialTrigger(locations);	$('#cont_name').val(currentLocation.countryName);
		})
	}else{
		currentLocation = JSON.parse(localStorage.getItem("maxmind_location"));
		$('#cont_name').val(currentLocation.countryName)
	}

	$("#demo-form .demo_form").validate({
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
	      // Specify the validation rules
	      rules: {
	          	"Name": {
	          	  	"required": true
	          	},
	          	"Email": {
	              	"required": true,
	              	"email": true
	          	},
	          	"Phone": {
	                required: true,
	                 minlength: 10
	            }
	      	},
	      
	      // Specify the validation error messages
	        messages: {
	          	
	            "Name": "Please enter your name",
	            "Email":{
	            	required: "Please enter a valid email",
					email:"Please enter a valid email"
				},
				"Phone": {
	                required: "Please enter your phone number",
	                minlength: 'Please enter at least 10 digits.'
	            }
	        },
	      
	    submitHandler: function(form) {
			var demo_request = {
				"Last name" : $('#LastName').val(),
				"Email": $('.sc-email').val(),
				"Work": $('#Phone').val(),
				"Number of Agents" : $('#Number_of_Agents').val(),
				"Country":$('#cont_name').val(),
				"Sales Campaign": "Demo Request from Website",
				"company" : {
					"Name" : $("#demo-company_name").val()
				}
				
			}
			var identifier = $("#Email").val();
			freshsales.identify(identifier, demo_request);
	        form.submit();
	    }
  	});
});