(function () {

	var CustomerLogos ={
		"US":{
			"logo_image" : "<img class='flipkart' src='/files/3614/0229/4063/petrsons1.png' alt='USA Customers' width='15%' height='54' /><img class='star' src='/files/4513/8777/6812/US_Gaiam.png' alt='USA Customers' width='15%' height='54' /><img class='naukri' src='/files/9513/8777/6812/US_Goodreads.png' alt='USA Customers' width='15%' height='54' /><img class='decathlon' src='/files/4713/9347/7662/unicef.png' alt='USA Customers' width='15%' height='54' /><img class='makemytrip' src='/files/1913/8777/6813/US_theAtlantic.png' alt='USA Customers' width='15%' height='54' />"
		},
		"AU":{
			"logo_image" : "<img class='flipkart' src='/files/9113/8777/6686/AU_Leopard.png' alt='Australia Customers' width='15%' height='54' /><img class='star' src='/files/3913/8777/6686/AU_saiglobal.png' alt='Australia Customers' width='15%' height='54' /><img class='naukri' src='/files/1813/8777/6687/AU_securatrak.png' alt='Australia Customers' width='15%' height='54' /><img class='decathlon' src='/files/8613/8777/6687/AU_tearaustralia.png' alt='Australia Customers' width='15%' height='54' /><img class='makemytrip' src='/files/4013/8777/6688/AU_vaya.png' alt='Australia Customers' width='15%' height='54' />"
		},
		"IN":{
			"logo_image" : "<img class='flipkart' src='/files/9113/9106/2893/IN_flipkart.png' alt='Asia Customers' width='15%' height='54' /><img class='naukri' src='/files/4113/9106/3031/IN_Naukri.png' alt='Asia Customers' width='15%' height='54' /><img class='decathlon' src='/files/5213/9106/3050/IN_decathlon.png' alt='Asia Customers' width='15%' height='54' /><img class='makemytrip' src='/files/2814/0110/3272/unicef.png' alt='Asia Customers' width='15%' height='54' /><img class='star' src='/files/1113/9106/3008/IN_Star.png' alt='Asia Customers' width='15%' height='54' />"
		},
		"DE":{
			"logo_image" : "<img class='flipkart' src='/files/3113/8777/6945/EU_kaisergames.png' alt='Europe Customers' width='15%' height='54' /><img class='star' src='/files/2013/8777/6946/EU_Norpost.png' alt='Europe Customers' width='15%'height='54' /><img class='naukri' src='/files/4913/8777/6946/EU_pixavi.png' alt='Europe Customers' width='15%' height='54' /><img class='decathlon' src='/files/1413/8777/6947/EU_tennant.png' alt='Europe Customers' width='15%' height='54' /><img class='makemytrip' src='/files/6913/8777/6947/EU_truecaller.png' alt='Europe Customers' width='15%' height='54' />"
		}
	};
	try{
		 var countryEU = ["GERMANY"];
		 var currentLocation = $.cookie("location") || { countryCode: "US" };
			currentLocation = JSON.parse(currentLocation);
			var countryCode = currentLocation.countryCode,
				countryName = currentLocation.countryName,
				countrySelected;
			if( $.inArray(countryName, countryEU)!== -1 ) {
				countrySelected = "DE"
			}else{
				countrySelected = countryCode;
			}

		 var GeoLogos = CustomerLogos[countrySelected];

		 $('#geo-banner-logos').html(GeoLogos["logo_image"]);
	}catch(ex){
		
	}

}());