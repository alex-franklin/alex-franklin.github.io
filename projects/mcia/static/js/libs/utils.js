
define(['lodash'], function(_) {
    return {
        guid : function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }
        , chat_data_generator : function(){

            function randomDate(start, end) {
                return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            }

            var lorem     = "collaborative administrative empowered market plug-and-play network dynamic B2C users base benefit customer direct convergence revolving ROI synergy resource relational premier niche market one-to-one robust innovative resource-leveling".split(' ');
            var names     = _.shuffle("Bob Alice Jim John Roger Ransom Felix Sara".split(' '));
            var questions = _.shuffle([
                "If you could choose any era to live in, what would it be?",
                "What is the last dream that you remember?",
                "What is your favorite meal of the day?",
                "Do you have any pets?",
                "What is one of your favorite words or phrases?",
                "What is your dream job?",
                "What is your favorite sports team?"
            ]);
            return {
                started : new Date()
                ,name: names[0]
                ,question: questions[0]
            };
        }
        , deepattr : function(obj, path, def) {
            var props = path.split('.');
            var o = obj;
            for (var i=0; i < props.length; i++) {
                if (props[i] in o) {
                    o = o[props[i]];
                }else{
                    return def;
                }
            }
            return o;
        }

    };
});
