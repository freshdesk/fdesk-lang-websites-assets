(function () {
	window['countryCode'];

	var onSuccess = function(location){
		countryCode = location.country;
		$.cookie("maxmindcountryCode", countryCode, { expires : 1 });
		console.log(countryCode);
		$(document).trigger({
			type : 'maxmindcountrySet',
			message : countryCode
		});
	};

	var onError = function(error){
		console.log(
		  "Error:\n\n"
		  + JSON.stringify(error, undefined, 4)
		);
	};

	// Check Cookie
	if ($.cookie('maxmindcountryCode') == undefined && $.cookie('maxmindcountryCode') == null){
		console.log('no-cookie');
	 	geoip2.city(onSuccess, onError);
	} else {
	 	countryCode = $.cookie('maxmindcountryCode');
	 	$(document).trigger({
			type : 'maxmindcountrySet',
			message : countryCode
		});
	}	

	// window.getCurrentLocation = function(){
	// 	var defaultLocation = { country: "US" };
	// 	try{
	// 		// return $.cookie('countryCode') || countryCode || defaultCountry; 	

	// 	} catch(ex) {
	// 		return defaultCountry;
	// 	}		
	// };

}());

