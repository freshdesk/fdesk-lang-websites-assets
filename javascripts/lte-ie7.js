/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-facebook' : '&#x21;',
			'icon-twitter' : '&#x22;',
			'icon-linkedin' : '&#x23;',
			'icon-mobile' : '&#x25;',
			'icon-location' : '&#x27;',
			'icon-rocket' : '&#x2c;',
			'icon-heart' : '&#x2d;',
			'icon-office' : '&#x32;',
			'icon-user' : '&#x24;',
			'icon-envelope' : '&#xf003;',
			'icon-globe' : '&#xf0ac;',
			'icon-leaf' : '&#xe000;',
			'icon-checkmark' : '&#x28;',
			'icon-phone' : '&#xf095;',
			'icon-youtube' : '&#xf16a;',
			'icon-google-plus' : '&#xf0d5;',
			'icon-envelope-alt' : '&#xf0e0;',
			'icon-leaf-strikethrough' : '&#xe001;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};