angular.module('portfolioApp', ['ngRoute', 'ngTouch', 'ngAnimate'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl:'../templates/portfolio.html',
				controller:'portfolioCtrl'
			})
			.when('/resume', {
				templateUrl:'../templates/resume.html',
				controller:''
			})
			.when('/portfolio', {
				templateUrl:'../templates/portfolio.html',
				controller:'portfolioCtrl'
			})
			.when('/d3', {
				templateUrl:'../templates/d3.html',
				controller:''
			})
			.when('/d3-api', {
				templateUrl:'../templates/d3-api.html',
				controller:''
			})
			.otherwise({
				redirectTo: '../templates/portfolio.html',
				controller: 'portfolioCtrl'
			})
	})
	.factory('portfolio', function($http) {
		var cachedData;

		function getData(callback) {
			if (cachedData) {
				callback(cachedData);
			} else {
				$http({
					method: 'GET',
					url: 'js/data/portfolio.json',
					cache: true,
				}).success(callback);;
			}
		}
		return {
			categories: function(callback) {
				getData(function(data) {
					var categories = [];
					angular.forEach(data, function(value, key) {
						categories.push(data[key]);
					});
					callback(categories);
				})
			}
		}
	})
	.controller('mainCtrl', function($scope) { // controls index.html

	})
	.controller('portfolioCtrl', function($scope, portfolio) {

		portfolio.categories(function (categories) {
			$scope.categories = categories;
			console.log($scope.categories);
		})

	})
	.directive('portfolioDirective', function() {
		return {
			restrict: 'C',
			link: function() {
				bLazy = new Blazy({
					src: 'data-blazy'
				});
				lightbox.init();
			}
		}
	})
	.directive('lightboxDirective', function() {
		return {
			restrict: 'C',
			link: function(scope, element, attrs) {
				if (scope.sample.thumb.new_window) {
					attrs.$set('target', '_blank')
				} else {
					attrs.$set('data-lightbox', 'lightbox[' + scope.$parent.obj.category + ']');
				}
			}
		}
	})
;

