// no conflict check for jQuery
// $j = jQuery.noConflict();

// Error handling for console.log
if (typeof console === "undefined" || typeof console.log === "undefined") {
    console = { };
    console.log = function(){ };
};

function log() {
    var args = Array.prototype.slice.call(arguments);
    if (window.console && window.console.log && window.console.log.apply) {
        console.log(args.join(" "));
    } else {
        // alert(entry);
    }
};

function checkPlugin(name){
    return (jQuery()[name]) ? true : false
}

// Mobile checking utility inside javascript
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

// Layout resize util for portal
function layoutResize(layoutClass1, layoutClass2){
    "use strict"
    var mainbar = $(layoutClass1).get(0),
        sidebar = $(layoutClass2).get(0)

    // If no sidebar is present make the main content to stretch to full-width
    if(!sidebar) $(mainbar).removeClass(layoutClass1.replace(/./, ""))

    // If no mainbar is present make the sidebar content to stretch to full-width
    if(!mainbar) $(sidebar).removeClass(layoutClass2.replace(/./, ""))

    // Setting equal height for main & sidebar if both are present
    if(!isMobile.any() && (mainbar || sidebar)){        
        $(layoutClass1 + ", " + layoutClass2)
            .css("minHeight", Math.max($(mainbar).outerHeight(true), $(sidebar).outerHeight(true)) + "px")
    }
}

// Getting a Query string
function getParameterByName(name){
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}