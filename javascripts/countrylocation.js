(function () {

	var geo_location,
		locationField,
		currentLocation;

	var maxmind_Onsuccess = function(location){
		var locations = location;
			locationField = geo_location(location);

		localStorage.setItem( 'maxmind_location', JSON.stringify(locationField) );
		$.cookie("maxmind_location",7);	

		$(document).trigger({
			type : 'maxmind_locationSet',
			message : locations
		});
	};

	//  Check Cookie
	if ($.cookie('maxmind_location') == undefined && $.cookie('maxmind_location') == null){
	 	geoip2.city(maxmind_Onsuccess);
	} else {
	 	locations = $.cookie("maxmind_location",7);
		$(document).trigger({
			type : 'maxmind_locationSet',
			message : locations
		});
	}

	geo_location = function(location){
		var data = {};
		data['ipAddress'] 	= location.traits.ip_address;
      	data['countryCode']	= location.country.iso_code;
      	data['countryName']	= location.country.names.en;
      	data['cityName']  	= location.city.names.en;
      	data['regionName']	= location.subdivisions[0].names.en;
      	data['zipCode']   	= location.postal.code;
      	data['latitude']  	= location.location.latitude;
      	data['longitude'] 	= location.location.longitude;
      	data['timeZone']  	= location.location.time_zone;
        data['source'] 		= 'maxmind';
        
        return data;
	}

	
	if (!$.cookie('maxmind_location') || !localStorage.getItem('maxmind_location')) {
    	geoip2.city(maxmind_Onsuccess);
    }else{
    	currentLocation = JSON.parse(localStorage.getItem("maxmind_location"));
	}

}());