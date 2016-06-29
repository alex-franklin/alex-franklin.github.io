// var WebFont = require('webfontloader');

WebFont.load({
    google: {
      families: ['Open Sans Condensed:300,700,300italic', 'Oswald:300,400']
    }
});

// Initialize image lazy loading
$(window).load(function() {
    var bLazy = new Blazy({
        src: 'data-blazy'
    });
});

// extend JS functionality. Method now chainable on string typed data
String.prototype.capFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
