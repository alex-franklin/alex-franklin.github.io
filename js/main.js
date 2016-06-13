// var WebFont = require('webfontloader');

WebFont.load({
    google: {
      families: ['Open Sans Condensed:300,700,300italic']
    }
  });

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


function window_onload() {
  window.addEventListener("scroll",navbar_reset_top,false);
}

// var navbar_top=parseInt(document.getElementById("header").height); //

function navbar_reset_top() {
  var $j = jQuery.noConflict();
  if ($j("#header").css("opacity") != "1") {
	  var header_height=0;}
  else 	  {
  	  var header_height=$j("#header").height();
  }
  var navbar_top=parseInt(header_height)+11;
  var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
  if(scrollTop>navbar_top&&navbar.className==="navbar_absolute") {
    document.getElementById("navbar").className="navbar_fixed";
	document.getElementById("navbar").style.top="0";
  }
  else if(scrollTop<navbar_top&&navbar.className==="navbar_fixed") {
    document.getElementById("navbar").className="navbar_absolute";
	document.getElementById("navbar").style.top= navbar_top + "px";
  }
  else if(scrollTop<navbar_top&&$j("#header").css("opacity") != "1") {
    document.getElementById("navbar").className="navbar_fixed";
  }
}
jQuery(function () {
	var $j = jQuery.noConflict();
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	$j(".fade_out").click(function() {
		$j(this).children(".twirl_down").toggleClass("twirled");
		$j(this).nextAll().eq(1).toggle(900);
//		  document.body.style.height -= 'e.style.height';
	});

	$j(".header_options").click(function() {
		$j("#header").toggle("slow");
		if ($j("#header").css("opacity") != "1") {
			$j("#navbar").animate({
				top: "+=185",
				}, 900, function() {
					if (scroll_top=0) {
						$j("#navbar").removeClass("navbar_absolute").addClass("navbar_fixed"); }
					else {
					}
				});
		}
		else {
			$j("#navbar").animate({
				top: "-=185px",
				}, 400, function() {
					$j("#navbar").removeClass("navbar_fixed").addClass("navbar_absolute");
					if ($j("#navbar").css("display") == "none") {
						$j("article").css("margin-top") == "10px"; }
					else {
					}
				});
		}
	});

	$j(".nav_options").click(function() {
		$j("#navbar").toggle("slow");
		if ($j("#header").css("opacity") != "1") {
			$j("#navbar").removeClass("navbar_absolute").addClass("navbar_fixed");
		}
		else {
			$j("#navbar").removeClass("navbar_fixed").addClass("navbar_absolute");
		}
	});

	$j(".footer_options").click(function() {
		$j("#footer").toggle("slow");
	});
});
