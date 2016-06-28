define(['knockout','lodash'], function(ko,_) {

    var debug = function(element, valueAccessor, allBindingsAccessor) {
        var label = allBindingsAccessor.get('label') || '';
        console.info('ko.debug ' + label, '>>', ko.unwrap(valueAccessor()));
    };
    ko.bindingHandlers.debug = {
        init: debug,
        update: debug
    };

});
