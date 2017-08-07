$(document).on("ready",function(){
	var languages = [];
	languages.push({key:'cs', url: 'http://cz.freshdesk.com',value:'Czech'});
	languages.push({key:'nl', url: 'http://freshdesk.nl',value:'Dutch'});
	languages.push({key:'nl-BE', url: 'http://freshdesk.be',value:'Flemish'});
	languages.push({key:'da', url: 'http://freshdesk.dk',value:'Danish'});
	languages.push({key:'de-DE', url: 'http://freshdesk.de',value:'Deutsch'});
	languages.push({key:'en-US', url: 'http://freshdesk.com',value:'English'});
	languages.push({key:'es', url: 'http://freshdesk.es',value:'Español'});
	languages.push({key:'fr', url: 'http://freshdesk.fr',value:'Français'});
	languages.push({key:'fi', url: 'http://freshdesk.fi',value:'Finnish'});
	languages.push({key:'it', url: 'http://freshdesk.it',value:'Italiano'});
	languages.push({key:'nb-NO', url: 'http://freshdesk.no',value:'Norwegian'});
	languages.push({key:'pt-BR', url: 'http://freshdesk.com.br',value:'Portuguès'});
	languages.push({key:'pl', url: 'http://freshdesk.com.pl',value:'Polski'});
	// languages.push({key:'tr', url: 'http://freshdesk.tr',value:'Turkish'});
	languages.push({key:'zh-TW', url: 'http://freshdesk.hk',value:'中文'});
	languages.push({key:'ko', url: 'http://freshdesk.kr',value:'한국어'});
	languages.push({key:'zh-CN', url: 'http://cn.freshdesk.com',value:'中文简体‍'});
	languages.push({key:'sv-SE', url: 'http://se.freshdesk.com',value:'Svenska'});
	languages.push({key:'ru', url: 'http://freshdesk.ru',value:'Pусский'});
	languages.push({key:'ja-JP', url: 'http://freshdesk.jp',value:'日本語'});
  languages.push({key:'ar', url: 'http://freshdesk.ae',value:'العربية'});
	// languages.push({key:'he', url: 'http://freshdesk.co.il',value:'עִברִית'});
	//languages.push({key:'ar-QA', url: 'http://freshdesk.com.qa',value:'العربية'});

	var current_language = $('html').attr('lang');
	for (var i=0; i<languages.length;i++)
	{
		if(languages[i].key == current_language) {
			var main_lang = '<a href="'+languages[i].url+'" class="nav-link">'+languages[i].value+'</a>';
			$("#lang-switch").append(main_lang);
		}
		else {
			var child_lang = '<li><a href="'+languages[i].url+'">'+languages[i].value+'</a></li>';
			$("#lang-select").append(child_lang);
		}
	}
});
