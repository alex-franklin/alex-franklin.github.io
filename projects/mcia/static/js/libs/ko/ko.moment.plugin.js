define(["knockout",'lodash','moment','countdown'], function(ko,_,moment,countdown) {

    var ONE_SECOND   = 1000
        , ONE_MINUTE = 60 * ONE_SECOND
        , ONE_HOUR   = 60 * ONE_MINUTE
        , ONE_DAY    = 24 * ONE_HOUR;

    moment.fn.countdown = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        // console.log('countdown args:',args);
        return countdown.apply(null, args);
    };

    ko.extenders.moment = function(target,options) {
        // console.log('ko.moment.countdown',moment().countdown);
        // console.log('Creating extender for',target,target());
        var _value             = ko.observable();  //private observable
        var opts = _.extend({
            units : countdown.DEFAULTS
            , max: 2
            , digits: 0
            , append : ' ago'
            , autoDiff: {
                unit: 'seconds'
                , repeat: 1000
                , append: 's'
            }
        },options);

        //create a writeable computed observable to intercept writes to our observable
        var result = ko.computed({
            read: function(){
                // console.log('reading moment!');
                return _value()?moment(_value()).format("ddd, MMMM Do YYYY, h:mm:ss a"):_value();
            }
            , write: function(value) {
                // console.log('writing moment!',value);
                _value(value);
            }
        });

        result.moment = function(){
            return moment(_value());
        };


        var autoDiff = function(){
            if (!autoDiff.started){
                autoDiff.options = autoDiff.options || _.extend({
                    unit: 'seconds'
                    , repeat: 1000
                    , append: 's'
                },options.autoDiff);
            }
            var diff = moment(new Date()).diff(_value(),autoDiff.options.unit) + autoDiff.options.append;
            // console.log('autoDiff:',diff);
            result.autoDiff(diff);

            setTimeout(autoDiff,autoDiff.options.repeat);
            if (!autoDiff.started){
                autoDiff.started = true;
                return autoDiff.computed;
            }
        };
        autoDiff.started = false;
        autoDiff.observable = ko.observable();
        result.autoDiff = ko.computed({
            // gets the value from the bucket or the server
            read: function(){
                if (!autoDiff.started){
                    autoDiff();
                }
                return autoDiff.observable();
            }
            , write: function(value) {
                autoDiff.observable(value);
            }
            , deferEvaluation: true
        });


        var _autoCountdown         = ko.observable();
        var autoCountdown = function(){
            autoCountdown.started = true;
            var m            = result.moment();
            var age          = Math.abs(m.diff(new Date()));

            console.log('countdown:',opts);
            result.autoCountdown(m.countdown(m.toDate(),new Date(),opts.units,opts.max,opts.digits).toString() + (opts.append?opts.append:''));

            var next_run = opts.repeat ||
                        age < ONE_MINUTE?ONE_SECOND:  // less than a minute
                        age < ONE_DAY?ONE_MINUTE: // less than an hour
                        ONE_DAY; // less than a day

            // console.log('next run:',age,next_run);
            setTimeout(autoCountdown,next_run);
        };
        autoCountdown.started = false;

        result.autoCountdown = ko.computed({
            // gets the value from the bucket or the server
            read: function(){
                if (!autoCountdown.started){
                    autoCountdown();
                }
                return _autoCountdown();
            }
            , write: function(value) {
                _autoCountdown(value);
            }
            , deferEvaluation: true
        });

        //initialize with current value
        result(target());

        //return the new computed observable
        return result;
    };

});
