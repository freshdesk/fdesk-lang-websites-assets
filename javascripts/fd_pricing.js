(function () {

	var pricing = {
		"US":{
			"symbol":"$",
			"estate_annual" : 40,
			"blossom_annual": 16,
			"garden_annual" : 25,
			"forest_annual" : 70,
			"estate_monthly" : 49,
			"blossom_monthly": 19,
			"garden_monthly" : 29,
			"sprout_monthly" : 15,
			"forest_monthly" : 79,
			"estate_day_pass" : 3,
			"blossom_day_pass": 2,
			"garden_day_pass" : 2,
			"sprout_day_pass" : 1,
			"forest_day_pass" : 3,
			"sprout_additional_agent": 15
		},

		"EU" : {
			"symbol":"€",
			"estate_annual" : 32,
			"blossom_annual": 14,
			"garden_annual" : 20,
			"forest_annual" : 56,
			"estate_monthly" : 40,
			"blossom_monthly": 16,
			"garden_monthly" : 25,
			"sprout_monthly" : 12,
			"forest_monthly" : 62,
			"estate_day_pass" : 3,
			"blossom_day_pass": 2,
			"garden_day_pass" : 2,
			"sprout_day_pass" : 1,
			"forest_day_pass" : 3,
			"sprout_additional_agent": 12
		},
		"ZAR":{
			"symbol":"R",
			"estate_annual" : 449,
			"blossom_annual": 189,
			"garden_annual" : 289,
			"forest_annual" : 789,
			"estate_monthly" : 549,
			"blossom_monthly": 229,
			"garden_monthly" : 349,
			"sprout_monthly" : 169,
			"forest_monthly" : 889,
			"estate_day_pass" : 35,
			"blossom_day_pass": 25,
			"garden_day_pass" : 25,
			"sprout_day_pass" : 15,
			"forest_day_pass" : 35,
			"sprout_additional_agent": 169
		},
		"IN":{
			"symbol":"₹",
			"estate_annual" : 2499,
			"blossom_annual": 999,
			"garden_annual" : 1499,
			"forest_annual" : 4499,
			"estate_monthly" : 2999,
			"blossom_monthly": 1199,
			"garden_monthly" : 1799,
			"sprout_monthly" : 899,
			"forest_monthly" : 4999,
			"estate_day_pass" : 180,
			"blossom_day_pass": 120,
			"garden_day_pass" : 120,
			"sprout_day_pass" : 60,
			"forest_day_pass" : 180,
			"sprout_additional_agent": 899
		}
	};

	var phone_no = {
		"US":{ "number": "+1 (866) 832-3090" },
		"UK":{ "number": "+44 (800) 808-5790" },
		"AUS":{ "number": "+61 (894) 687-228" }
	};
	
	// Maxmind Code Starts

	var currentLocation,
		countryCode,
		countryName,
		countrySelected;

	var initialTrigger = function(locations){
		var data = {};
	  	data['countryCode']	= locations.message.country.iso_code;
	  	data['countryName']	= locations.message.country.names.en;
	  	data['cityName']  	= locations.message.city.names.en;
	  	data['regionName']	= locations.message.subdivisions[0].names.en;
	    return data;
	}

	var pricing_geolocation = function(){
		var countryEU = ["Austria", "Belgium", "Cyprus", "Estonia", "Finland", "France", "Germany", "Greece", "Ireland", "Italy", "Latvia", "Luxembourg", "Malta", "Netherlands", "Portugal", "Slovakia", "Slovenia", "Spain", "Andorra", "Kosovo", "Montenegro", "Monaco", "San Marino", "The Vatican City"];
		
		if( $.inArray(countryName, countryEU)!== -1 ) {
			countrySelected = "EU"
			$('.pl-features #eu_men').show();
		}else if(countryCode === 'ZAR'){
			countrySelected = 'ZAR'
			$('.pl-features #us_men').hide();
		}else if(countryCode === 'IN'){
			countrySelected = 'IN'
			$('.pl-features #in_men').show();
		}else if(countryCode === 'GB'){
			countrySelected = 'US';
			$('.pl-features #us_men').show();
		}else{
			countrySelected = 'US'
			$('.pl-features #us_men').show();
		}

		var CountryPricing  = pricing[countrySelected];

		$(".currency-symbol").html(CountryPricing["symbol"]);

		$('.plans').each(function(){
			$(this).html(CountryPricing[$(this).data('plan')])
		});

		// footer Phone Number
		var phoneNumber = phone_no[countrySelected] || phone_no['US'];
		
		$(".f-contact .f-phone span").html(phoneNumber['number']);
		
		$('#contryName').val(countryName);
	}

	// maxmind location
	if(!localStorage.getItem('maxmind_location')){
		$(document).on('maxmind_locationSet', function(locations){
			currentLocation = initialTrigger(locations);
			countryName = currentLocation.countryName;
			countryCode = currentLocation.countryCode;
			pricing_geolocation();
		})
	}else{
		currentLocation = JSON.parse(localStorage.getItem("maxmind_location"));
		countryName = currentLocation.countryName;
		countryCode = currentLocation.countryCode;
		pricing_geolocation();
	}


}());