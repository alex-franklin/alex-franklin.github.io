// var WebFont = require('webfontloader');

WebFont.load({
    google: {
      families: ['Open Sans Condensed:300,700,300italic', 'Oswald:300,400']
    }
});

// Initialize image lazy loading
$(document).ready(function() {
    // var bLazy = new Blazy({
    //     src: 'data-blazy'
    // });
});

// extend JS functionality. Method now chainable on string typed data
String.prototype.capFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.formatHtmlEntity = function() {
	console.log(this);
	return this.replace("&lt;p&gt;", "").replace("&lt;/p&gt;", "").replace("&#39;", "'").replace("&quot;", '"');
}
