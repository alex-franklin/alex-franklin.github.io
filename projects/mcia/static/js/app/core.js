define(['jquery','lodash','knockout','app.case','utils','foundation',
        // templates
        'ko.tmpl8!../static/html/dashboard.ko.html!dashboard',
        'ko.tmpl8!../static/html/welcome.ko.html!welcome',
        'ko.tmpl8!../static/html/case/case.ko.html!case',

        // add-ons
        'ko.postbox','ko.dict'],
function($,_,ko,CaseVM,utils){
    return function(){
        var AppVM = function(){
            var self     = this;
            self.cases   = ko.observableDictionary({});

            var pages = {
                'welcome' : function(){
                    return new ko.router.Page('Welcome', 'welcome', {});
                },
                'dash' : function(){
                    return new ko.router.Page('Dash', 'dashboard', {});
                },
                'case' : function(caseid,stepid,groupid) {
                    var c = self.cases.get(caseid)();
                    if (c){
                        c.viewing.group(groupid);
                        c.viewing.step(stepid || 1);
                        // console.log('case -- ',stepid,c.viewing.step());
                        // indicate what view we want of the data
                        return new ko.router.Page('Case', 'case', c);
                    }else{
                        console.error('Case not found');
                        return new ko.router.Page('Error', 'fail', {});
                    }
                },
                'new' : function(){
                    var c = new CaseVM(self);
                    console.log(self);
                    self.cases.set(c.id,c);
                    self.router.go('case',c.id);
                },

                'group' : function(caseid,groupid){
                    return pages.case(caseid,undefined,groupid);
                },

                'loading': function(){

                },
                'error': function(){

                }
            };
            var routes = [
                {name: 'welcome', page: pages.welcome,  url: /^welcome$/},
                {name: 'dash',  page: pages.dash,   url: /^dash$/},
                {name: 'new',   page: pages.new,    url: /^new$/},
                {name: 'step',  page: pages.case,   url: /^case\/(.+)\/step\/(\d+)$/},
                {name: 'group', page: pages.group,  url: /^case\/(.+)\/group\/(.+)$/},
                {name: 'case',  page: pages.case,   url: /^case\/(.+)$/}
            ];
            self.router = new ko.router(routes);

        };

        ko.applyBindings(new AppVM(),$('html').get(0));
    };
});

