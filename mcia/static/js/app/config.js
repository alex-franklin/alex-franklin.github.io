
(function(){
    require.config({
        baseUrl: "../../static/"
        , paths: {
            'async'                 : 'js/libs/async',
            'moment'                : 'js/libs/moment.min',
            'countdown'             : 'js/libs/countdown.min',
            'lodash'                : 'js/libs/lodash.min',
            'knockout'              : 'js/libs/ko/knockout.min',
            'ko.moment'             : 'js/libs/ko/ko.moment.plugin',
            'ko.postbox'            : 'js/libs/ko/ko.postbox',
            'ko.mapping'            : 'js/libs/ko/ko.mapping',
            'ko.utils'              : 'js/libs/ko/ko.utils',
            'ko.dict'               : 'js/libs/ko/ko.observableDictionary',
            'ko.router'             : 'js/libs/ko/ko.router',
            'lightbox'              : 'js/libs/lightbox.min',
            'reverse.url'           : 'js/libs/reverse.url',
            'utils'                 : 'js/libs/utils',
            'ko.tmpl8'              : 'js/libs/ko/ko.requirejs.template.loader',
            'ko.tmpl8.engine'       : 'js/libs/ko/ko.string.template.engine',
            'requirejs.text.plugin' : 'js/libs/require.js/requirejs.text.plugin',
            'jquery'                : 'js/libs/jquery/jquery.min',
            'foundation'            : 'js/libs/foundation/foundation.min',
            'app.core'              : 'js/app/core',
            'app.case'              : 'js/app/case',
            'case.structure'        : 'data/case.structure'
        }

        , map: {
            '*': { 'underscore': 'lodash' }
        }
        , shim: {
            'foundation': { deps: ["jquery"]}
        }
        , waitSeconds: 15
        , urlArgs: 'cb=' + Math.random()
    });

    require(['knockout','ko.mapping','ko.utils'], function(ko,kom) {
        ko.mapping = kom;
        require(['app.core'],function(app){
            app();
        });
    });
}());
