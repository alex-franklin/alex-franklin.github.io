// var WebFont = require('webfontloader');

WebFont.load({
    google: {
      families: ['Open Sans Condensed:300,700,300italic', 'Oswald:300,400']
    }
});

$(window).load(function() {
    // Initialize image lazy loading
    var bLazy = new Blazy({
        src: 'data-blazy'
    });
});
