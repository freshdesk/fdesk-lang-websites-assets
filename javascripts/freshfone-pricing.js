(function ($) {

	//Global variables
	var _freshfonePrices = {},
		_numberRates = {},
		_minimum = [],
		_tollFreeNo = null,
		_settings = {
			'INCOMING'  : 'incoming_via_browser',
			'VOICEMAIL' : 'voice_mail',
			'tollFree'  : {
				'US' : 'usca_tollfree',
				'GB' : 'uk_tollfree',
				'CA' : 'usca_tollfree'
			},
			'requestType' : {
				'standard' : 'incoming_via_phone',
				'outgoing' : 'outgoing_via_phone'
			}
		};

	function setSelected(obj){
		var currentLocation = window.geoLocation;
		return (currentLocation in obj) ? currentLocation : 'US';
	}

	function prependCountryFlag(option) {
		return "<span class='country flag-"+ option.id +"'></span>" + option.text;
	}

	function incomingCallRates(ary, isTollFree) {
		for (var i = 0; i < ary.length; i++) {
			var price = isTollFree ? _settings['tollFree'][_tollFreeNo] : 'standard';
			document.getElementById(_settings[ary[i]]).innerHTML = '$' + _freshfonePrices[ary[i]][price];
		}
	}
	
	function constructMenu(obj, menuids) {
		var menuId = menuids.split(',');

		for (var i = 0; i < menuId.length; i++) {
			var selectMenu = document.getElementById(menuId[i].replace(/\s/, '')),
				options = new String,
				initSelected = setSelected(obj);
			
			for (k in obj) {
				if (obj.hasOwnProperty(k)) {
					// Skip country if it is Beta
					var isBeta = obj[k]['beta'];
					if (isBeta) {
						continue;
					}

					// Pick country name according to json obj
					var country_name = obj[k]['name'] || obj[k]['country'];
					if (typeof country_name === 'undefined') {
						continue;
					}

					if (obj[k]['toll_free']) {
						options += '<option value="' + k + '-TF">' + country_name + ' (toll free) ' + '</option>';
					}

					var selected = (initSelected == k) ? 'selected = selected' : '';

					options += '<option value="' + k + '"'+ selected +'>' + country_name + '</option>';
				}
			}

			selectMenu.innerHTML = options;
		}
	}

	function getHelpdeskNoPrice(country_code) {
		var hasTollFree = country_code.indexOf('-TF') !== -1,
			country = country_code.replace(/-TF/gi, ''),
			number = _numberRates[country],
			price = hasTollFree ? number['toll_free'] : number['national'] || number['local'];

		_tollFreeNo = hasTollFree ? country : null;

		document.getElementById('number_price').innerHTML = '$ ' + price;

		incomingCallRates(['INCOMING', 'VOICEMAIL'], hasTollFree);
	}

	function constructPriceTable(priceTable, requestFrom) {
		var constructedDom = new String;

		for(item in priceTable) {
			if (priceTable.hasOwnProperty(item)) {
				constructedDom += 	'<tr>'
										+ '<td class="prefixes">' + priceTable[item]['prefix'].replace(/,/g, ', ') + '</td>';
				constructedDom += 	'<td class="rates">'
											+ '<span class="prices"> $' + priceTable[item]['price'] + '</span>'
											+ '<div class="rate-arb">'
												+ '<span>per min.</span>'
											+ '</div>'
										+ '</td>'
									+ '</tr>';
			}
		}

		document.getElementById(requestFrom).innerHTML = '$' + priceTable[0]['price'];
		document.getElementById(requestFrom+'_table').innerHTML = constructedDom;
	}

	function getPriceFor (country_code, priceOf) {
		var country = _freshfonePrices[country_code],
			numbers = country['numbers'],
			pickBestPrice = (_tollFreeNo && priceOf !== 'outgoing') ? _settings['tollFree'][_tollFreeNo] : priceOf;
			charges = [];

		for(prefix in numbers) {
			if (numbers.hasOwnProperty(prefix)) {
				var price = parseFloat(numbers[prefix][pickBestPrice]);
				charges.push({
					'prefix' : prefix,
					'price'  : price
				});
			}
		}

		constructPriceTable(charges.sort(function(a, b) { return a.price - b.price; }), _settings['requestType'][priceOf]);
	}

	function bindChangeEvent() {
		$('#ff_no').bind('change', function(ev) {
			var countryCode = $(this).val() || "US";
			
			//Get phone no. price for the selected country
			getHelpdeskNoPrice(countryCode);

			$("#standard").trigger('change');
		});

		$('#standard, #outgoing').bind('change', function(ev) {
			var countryCode = $(this).val(),
				priceOf = $(this).attr('id');

			// Get incoming / outgoing price for the selected country
			// According to the selection
			getPriceFor(countryCode, priceOf);
		});
	}

	$(document).ready(function(){
		// Get Number-rates json obj
		$.getJSON("/themes/freshdesk/javascripts/number-rates.json", function(json) {
			_numberRates = json;
			constructMenu(_numberRates, 'ff_no');
		})
		.done(function(){
			// Get Freshfone charges json obj
			$.getJSON("/themes/freshdesk/javascripts/freshfone_charges.json", function(json) {
				_freshfonePrices = json;
				constructMenu(_freshfonePrices, 'standard, outgoing');
				bindChangeEvent();
			})
			.done(function(){

				//select option sorting
				var selectList,
					tollFree_list;

				tollFree_list = $('#ff_no option');

				$('.drpDwn').each(function(){
					selectList = $(this).children().children('option');
					selectList.sort(sort);
				})

				function sort(a,b){
				    a = a.text.toLowerCase();
				    b = b.text.toLowerCase();
				    if(a > b) {
				        return 1;
				    } else if (a < b) {
				        return -1;
				    }
				    return 0;
				}

				tollFree_list.sort(sort);
				
				$('.country-list #ff_no').html(tollFree_list);
				$('.drpDwn select').html(selectList);

				// Select2 init
				$('#ff_no, #standard, #outgoing')
				.select2({
					'width' : 'resolve',
					formatResult: prependCountryFlag,
					formatSelection: prependCountryFlag,
					escapeMarkup: function(m) { return m; }
				})
				.trigger('change');
			});
		});

		$('body').on('click', '.detailed-pricing', function(ev) {
			ev.preventDefault();
			$(this).parent().next().slideToggle(100);
		});
	});
	
}(jQuery));

