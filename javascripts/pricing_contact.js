$(document).ready(function(){

	var currentLocation;

    initialTrigger = function(locations) {
        var data = {};
        data['countryCode'] = locations.message.country.iso_code;
        data['countryName'] = locations.message.country.names.en;
        data['cityName'] = locations.message.city.names.en;
        data['continent'] = locations.message.continent.code;
        data['continentName'] = locations.message.continent.names.en;
        return data;
    }

    if (!localStorage.getItem('maxmind_location_v1')) {
        $(document).on('maxmind_locationSet', function(locations) {
            currentLocation = initialTrigger(locations)
            $('#cont_name').val(currentLocation.countryName);
            $('#continent_name').val(currentLocation.continentName);
        })
    } else {
        currentLocation = JSON.parse(localStorage.getItem("maxmind_location_v1"));
        $('#cont_name').val(currentLocation.countryName);
        $('#continent_name').val(currentLocation.continentName);
    }
    $(".forest-demo-form").validate({
        highlight: function(element) {
            $(element).parents(".textfield").addClass("error");
        },
        unhighlight: function(element) {
            $(element).parents(".textfield").removeClass("error");
        },
        errorPlacement: function(error, element) {
            $(element).parents(".textfield").append(error);
        },
        errorElement: "em",
        onkeyup: false,
        // Specify the validation rules
        rules: {
            "name": {
                "required": true
            },
            "email": {
                "required": true,
                "email": true
            },
            "phone": {
                required: true,
                number: true,
                minlength: 10
            },
            "Number_of_Agents": {
                required: true,
                number: true
            }
        },
        // Specify the validation error messages
        messages: {
            "name": "Please enter your name",
            "email": {
                required: "Please enter a valid email",
                email: "Please enter a valid email"
            },
            "phone": {
                required: "Please enter your phone number",
                number: "Please enter only digits",
                minlength: 'Please enter at least 10 digits.'
            },
            "Number_of_Agents": {
                required: "Please enter the number of agents",
                number: "Please enter only digits"
            }
        },
        submitHandler: function(form) {
            var forest_request = {
                "Last name": $('#lastName').val(),
                "Email": $('.sc-email').val(),
                "Work": $('#phone').val(),
                "Number of Employees": $('#number_of_agents').val(),
                "Country": $('#cont_name').val(),
                "Campaign": "Pricing - Contact Us page",
                "company": {
                    "Name": $("#demo-company_name").val()
                },
				"First Referrer": ($.cookie("fd_fr") || window.parent.location.href)
            }
            var identifier = $("#email").val();
            freshsales.identify(identifier, forest_request);

            var scheduler_object = {};
            scheduler_object.name = $('#lastName').val();
            scheduler_object.email = $('.sc-email').val();
            var num_agents = parseInt($('#number_of_agents').val(), 10);
            if (num_agents !== null && typeof num_agents === "number" && num_agents > 5) {
                scheduler_object.schedule = true;
            } else {
                scheduler_object.schedule = false;
            }
            sessionStorage.setItem("forest_request", JSON.stringify(scheduler_object));
            window.setTimeout(function() {
                window.location.href = "/thank-you";
            }, 500);
        }
    });

	$(".forest-demo-form").on("submit", function(e) {
		e.preventDefault();
		return false;
	});

	$(".forest-demo-form #mktFrmSubmit").on("click", function(e) {
		if($(".forest-demo-form").valid()) {
			$(".forest-demo-form").submit();
		};
	});
});