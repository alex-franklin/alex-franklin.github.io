define(['knockout', 'jquery', 'lodash', 'reverse.url'], function(ko, $, _, reverser) {

    // Top-level KO ViewModel that detects URL changes and shows the relevant page.
    function Router(routes) {
        var self = this;

        self.page = ko.observable(null);

        self.reverse = reverser(_.map(routes,function(route){
            return [route.url.source,route.name];
        }));

        // looks for first default:true  or defaults to first route
        self.defaultPage = _.first(routes,function(route){
            return route.default;
        });
        self.defaultPage = (self.defaultPage.length > 0)?self.defaultPage[0]:routes[0];


        // reverse routing via url key and additional args.  might work.
        self.go = function(route) {
            // url args to be determined from supplied additional arguments
            var args = Array.prototype.slice.call(arguments, 0);
            route = args.shift();
            var path = self.reverse(route,args);
            if (path){
                location.hash = '#'+path;
                return;
            }
            console.error('No route for:',route,args);
        };

        // Listen for changes to the URL fragment (hash) triggered by links, back/forward etc.
        // and make the relevant Page instance current.
        $(window).bind("hashchange", function() {
            // Use the path between # and ? (if present).
            // Note that when URL ends with just #, some browsers return '' for location.hash, others return '#'
            // but either way substr(1) will return '' which is what we want.
            var path = location.hash.substr(1).split('?')[0];

            // console.log('hashchange path:', path);
            self.page(getPage(path));
        });
        function getPage(path) {
            var out = new Router.Page('404 - Not Found', '404-template', {});
            if (path === ''){
                out = self.defaultPage.page.apply(this);
            }else{
                _.each(routes, function(route) {
                    var matches = route.url.exec(path);
                    if (matches) {
                        // Pass the group matches from the regex.
                        out = route.page.apply(this, matches.slice(1));
                        return false; // break the loop
                    }
                });
            }
            // console.log('getPage',path,ko.toJS(out));
            return out;
        }
        // Manually trigger initial load of the relevant start page.
        $(window).trigger("hashchange");
    }

    // A 'page' that can be shown, encompassing the view (string identifying a template),
    // model (a KO ViewModel) and title.
    Router.Page = function(title, view, model) {
        this.title = ko.observable(title);
        this.view = ko.computed(function() {
            // If model has an error or loading property, respect it.
            if (model.error && model.error()) {
                return 'error-template';
            }
            if (model.loading && model.loading()) {
                return 'loading-template';
            }
            return view;
        });
        this.model = ko.observable(model);
    };

    ko.router = Router;
    return Router;
});
