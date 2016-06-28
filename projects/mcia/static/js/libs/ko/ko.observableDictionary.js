define(['knockout'], function(ko) {

    // Knockout Observable Dictionary
    // (c) James Foster
    // License: MIT (http://www.opensource.org/licenses/mit-license.php)
    // edits by a.hughes/mirusresearch


    ko.observableDictionary = function (dictionary,extensions) {
        var result = {};
        result.items      = new ko.observableArray();
        result._wrappers  = {};
        result.extensions = extensions;
        ko.utils.extend(result, ko.observableDictionary['fn']);
        result.init();
        result.update(dictionary || {});

        return result;
    };

    ko.observableDictionary['fn'] = {

        init : function (){
            var self = this;
            self.keys = ko.computed(function(){
                return ko.utils.arrayMap(self.items(), function (item) { return item.key(); });
            },null,{deferEvaluation:true});

            self.values = ko.computed(function(){
                return ko.utils.arrayMap(self.items(), function (item) { return item.value(); });
            },null,{deferEvaluation:true});
        },

        remove: function (valueOrPredicate) {
            var predicate = valueOrPredicate;

            if (valueOrPredicate instanceof DictionaryItem) {
                predicate = function (item) {
                    return item.key() === valueOrPredicate.key();
                };
            }
            else if (typeof valueOrPredicate !== "function") {
                predicate = function (item) {
                    return item.key() === valueOrPredicate;
                };
            }
            ko.observableArray['fn'].remove.call(this.items, predicate);
        },

        push: function (key, value, extensions) {
            var item;
            if (!key){
                console.error('ko.observableDictionary: cannot push an key that is',typeof key);
                return;
            }

            // handle the case where only a DictionaryItem is passed in
            if (key instanceof DictionaryItem) {
                item  = key;
                value = item.value();
                key   = item.key();
            }

            var current = getValue(key, this.items());
            if (current !== undefined) { // update existing item and get out of dodge
                current(value);
                return current;
            }

            if (!item) { // create a new item
                var ext = this.extensions?this.extensions[key]:undefined;
                item = new DictionaryItem(key, value, this, ext);
                ko.observableArray['fn'].push.call(this.items, item);
            }
            return value;
        },

        // update existing keys
        // add new keys
        // REMOVE keys not being updated
        // use .extend for a completely additive approach
        update: function(dictionary,skip_cleaning){

            var old_keys = skip_cleaning?undefined:this.keys().slice();
            for (var key in dictionary) {
                if (dictionary.hasOwnProperty(key)) {
                    if (old_keys){
                        ko.utils.arrayRemoveItem(old_keys,key);
                    }
                    this.push(key,dictionary[key]);
                }
            }
            if (old_keys && old_keys.length > 0){
                for (var i = 0; i < old_keys.length; i++) {
                    this.remove(old_keys[i]);
                }
            }
        },

        // update existing keys leaving unchanged values in place
        extend : function(dictionary){
            this.update(dictionary,true);
        },

        computed : function(key,path,def,alter){
            var self = this;

            var da = function(_def){
                _def = _def || def;
                var p = self.get(key)();
                return (path && p)?deepattr(p,path,_def):(p || _def);
            };

            return ko.computed({
                read: function () {
                    return alter?alter(da()):da();
                },
                write: function (value) {
                    var DKE = '__DOESNOTEXIST__';
                    var val = da(DKE);
                    if (val !== DKE){
                        if (ko.isObservable(val)){
                            val(value);
                        }else{
                            val = value;
                        }
                    }
                },
                owner: self
            });

            // return ko.computed(function(){
            //     var p = self.get(key)();
            //     // console.log('prop "' + key + '":',p);
            //     return (path && p)?deepattr(p,path,def):(p || def);
            // });
        },

        sort: function (method) {
            if (method === undefined) {
                method = function (a, b) {
                    return defaultComparison(a.key(), b.key());
                };
            }

            return ko.observableArray['fn'].sort.call(this.items, method);
        },

        indexOf: function (key) {
            if (key instanceof DictionaryItem) {
                return ko.observableArray['fn'].indexOf.call(this.items, key);
            }

            var underlyingArray = this.items();
            for (var index = 0; index < underlyingArray.length; index++) {
                if (underlyingArray[index].key() === key){
                    return index;
                }
            }
            return -1;
        },

        get: function (key,direct) {
            if (direct === true){
                return getValue(key, this.items());
            }
            var wrapper = this._wrappers[key];
            if (!wrapper) {
                wrapper = this._wrappers[key] = new ko.computed({
                    read: function () {
                        // console.log('read for',key);
                        var value = getValue(key, this.items());
                        return (value === undefined)?value:value();
                    },
                    write: function (newValue) {
                        // console.log('write for',key);
                        this.push(key, newValue);
                    }
                }, this);
            }
            return wrapper;
        },

        set: function (key, value) {
            return this.push(key, value);
        },

        removeAll: function () {
            this.items.removeAll();
        },

        toJSON: function () {
            return JSON.stringify(this.toJS());
        },

        toJS: function () {
            var result = {};
            var items = ko.utils.unwrapObservable(this.items);

            ko.utils.arrayForEach(items, function (item) {
                var key = ko.utils.unwrapObservable(item.key);
                var value = ko.utils.unwrapObservable(item.value);
                result[key] = value;
            });

            return result;
        }
    };

    function DictionaryItem(key, value, dictionary, extensions) {
        // console.log('creating DictionaryItem for',key,value);
        var self = this;

        var observableKey = new ko.observable(key);
        self.key = new ko.computed({
            read: observableKey,
            write: function (newKey) {
                var current = observableKey();

                if (current === newKey){
                    return;
                }

                // no two items are allowed to share the same key.
                dictionary.remove(newKey);

                observableKey(newKey);
            }
        });

        if (extensions){
            self.value = new ko.observable(value).extend(extensions);
        }else{
            self.value = new ko.observable(value);
        }
    }

    function getValue(key, items) {
        var item = getItem(key,items);
        return item ? item.value : undefined;
    }

    function getItem(key, items) {
        return ko.utils.arrayFirst(items, function (item) {
            return item.key() === key;
        }) || undefined;
    }

    // Utility methods
    // ---------------------------------------------
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function defaultComparison(a, b) {
        if (isNumeric(a) && isNumeric(b)) {
            return a - b;
        }
        a = a.toString();
        b = b.toString();

        return a === b ? 0 : (a < b ? -1 : 1);
    }

    var deepattr = function(obj, path, def) {
        var props = path.split('.');
        var o = obj;
        for (var i=0; i < props.length; i++) {
            try{
                if (props[i] in o) {
                    o = o[props[i]];
                }else{
                    return def;
                }
            } catch(e){
                console.error('deepattr error:',e);
                console.error('deepattr:',obj,path);
            }
        }
        return o;
    };

    // ---------------------------------------------

});
