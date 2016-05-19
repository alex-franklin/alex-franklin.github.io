define(['jquery',"knockout",'lodash','moment'], function($,ko,_,moment) {

    return function(){
        var self = this;
        self.lorem = "collaborative administrative empowered market plug-and-play network dynamic B2C users base benefit customer direct convergence revolving ROI synergy resource relational premier niche market one-to-one robust innovative resource-leveling".split(' '),

        self.generate = function(blank,qty,props){
            var results = [];
            _.each(_.range((qty||1)),function(idx){
                var b          = _.cloneDeep(self.blanks[blank]);
                b.id           = _.random(1000,100000);
                b.resource_uri = b.resource_uri.replace('@id',b.id);
                b              = _.extend({},b,(props||{}));
                _.each(_.functions(b),function(fn){
                    b[fn] = _.result(b,fn);
                });
                results.push(b);
            });
            return qty===1?results[0]:results;
        };

        self.gibberish = function(qty,casing){
            var words = _.map(_.range(qty), function(idx) { return _.first(_.shuffle(self.lorem)); } );
            if (casing == 'title'){
                return _.map(words,function(word){ return word.charAt(0).toUpperCase() + word.substr(1);}).join(' ');
            }else if (casing == 'sentence'){
                return words.join(' ').charAt(0).toUpperCase() + words.join(' ').substr(1);
            }else{
                return words.join(' ');
            }
        };

        self.payments = function(qty,props){
            var wf = self.generate('workflow',1,_.extend(props,{
                name          : self.gibberish(_.random(1,3),'title') + ' Workflow'
                , description : self.gibberish(_.random(1,3),'sentence')
                , stages      : function(){
                    return self.generate('stage',_.random(2,5),{
                        name:function(){
                            return self.gibberish(_.random(1,3),'title') + ' Stage';
                        }
                        ,description: function(){
                            return self.gibberish(_.random(6,10),'sentence');
                        }
                    });
                }
            }));

            var p  = self.generate('payment',qty,_.extend(props,{
                workflow    : wf
                ,check_front : function(){
                    return self.generate('check',1);
                }
                ,check_back : function(){
                    return self.generate('check',1);
                }
                ,stage : function(){
                    return _.first(_.shuffle(wf.stages));
                }
                ,date_created:function(){
                    return moment(new Date()).subtract(_.random(1,12000),'minutes').toString();
                }
            }));
            // console.log('generated',p);
        };
    };
});
