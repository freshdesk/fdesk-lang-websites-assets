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
	
	try{
			var countryEU = ["AUSTRIA", "BELGIUM", "CYPRUS", "ESTONIA", "FINLAND", "FRANCE", "GERMANY", "GREECE", "IRELAND", "ITALY", "LATVIA", "LUXEMBOURG", "MALTA", "NETHERLANDS", "PORTUGAL", "SLOVAKIA", "SLOVENIA", "SPAIN", "ANDORRA", "KOSOVO", "MONTENEGRO", "MONACO", "SAN MARINO", "THE VATICAN CITY"];
			var countryUS = ['US', 'BR'];
			

			var currentLocation = $.cookie("location") || { countryCode: "US" };
			currentLocation = JSON.parse(currentLocation);

			var countryCode = currentLocation.countryCode,
				countryName = currentLocation.countryName,
				countrySelected;
			
			if( $.inArray(countryName, countryEU)!== -1 ) {
				countrySelected = "EU"
			}else if($.inArray(countryCode, countryUS)!== -1){
				countrySelected = 'US';
			}else{
				countrySelected = countryCode;
			}

			var CountryPricing  = pricing[countrySelected];

			$(".currency-symbol").html(CountryPricing["symbol"]);

			$('.plans').each(function(){
				$(this).html(CountryPricing[$(this).data('plan')])
			});

			// Pricing page USD
			var us_listing = ["EU","ZAR","IN"];

			if( $.inArray(countryCode, us_listing)!== -1 ) {
				$('.pl-features #us_men').hide();
			}else{
				$('.pl-features #us_men').show();
			}

			// footer Phone Number
			var phoneNumber = phone_no[countrySelected];

			$(".f-contact .f-phone span").html(phoneNumber['number']);
			
		}catch(ex){

		}

}());