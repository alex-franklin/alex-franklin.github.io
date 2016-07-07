angular.module('portfolioApp', ['ngRoute', 'ngTouch', 'ngAnimate', 'ngSanitize'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl:'../templates/resume.html',
				controller:''
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
				redirectTo: '../templates/resume.html',
				controller: ''
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
	.filter("sanitize", ['$sce', function($sce) {
	  return function(htmlCode){
	    return $sce.trustAsHtml(htmlCode);
	  }
	}])
	.directive('portfolioDirective', function() {
		return {
			restrict: 'C',
			link: function() {
				// bLazy = new Blazy({
				// 	src: 'data-blazy'
				// });
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
	.factory('edmundsAPI', function($http) {
		var cachedData,
			api_key = "wmawhp2cm7m83tff2vtn7bh9",
			api_url = "https://api.edmunds.com/api/";

		function getData(callback) {
			if (cachedData) {
				callback(cachedData);
			} else {
				$http({
					method: 'GET',
					url: api_url + "vehicle/v2/makes?fmt=json&api_key=" + api_key,
					cache: true,
				}).success(callback);
			}
		}
		function getArticleData(callback, make, model, year) {
			$http({
				method: 'GET',
				url: api_url + "editorial/v2/" + make + "/" + model + "/" + year + "?api_key=" + api_key + "&fmt=json",
				cache: true,
			}).success(callback);
		}
		function getVehicleData(callback, make, model, year) {
			$http({
				method: 'GET',
				url: api_url + "vehicle/v2/" + make + "/" + model + "/" + year + "/styles?fmt=json&api_key=" + api_key + "&view=full",
				cache: true,
			}).success(callback);
		}
		return {
			makeList: function(callback) {
				getData(function(data) {
					var makes = [];
					angular.forEach(data, function(value, key) {
						makes.push(data[key]);
					});
					callback(makes[0]);
				})
			},
			getArticle: function(callback, make, model, year) {
				getArticleData(function(data) {
					callback(data);
				}, make, model, year);
			},
			getVehicle: function(callback, make, model, year) {
				getVehicleData(function(data) {
					callback(data);
				}, make, model, year);
			}
		}
	})
	.controller('edmundsApiCtrl', function($scope, edmundsAPI) {
		edmundsAPI.makeList(function (makes) {
			$scope.makes = makes;
			$scope.loadMakes($scope.makes);
		}),

		$scope.loadMakes = function(arr) {
			var makeOpts = [];
			angular.forEach(arr, function(value, key) {
				makeOpts.push({'name': arr[key].name, 'value': arr[key].niceName});
			})
			$scope.makeOptions = makeOpts;
		},

		$scope.loadModels = function(makeName) {
			var makeFilter = function(makeObj) {
				if (this == makeObj.niceName) {
					return makeObj
				}
			};
			$scope.modelOptions = $scope.makes.filter(makeFilter, makeName)[0].models;
		},

		$scope.loadYears = function(modelName) {
			var modelFilter = function(modelObj) {
				if (this == modelObj.niceName) {
					return modelObj
				}
			};
			$scope.yearOptions = $scope.modelOptions.filter(modelFilter, modelName)[0].years;
		},

		$scope.getArticle = function(make, model, year) {
			edmundsAPI.getArticle(function(article) {

				// remove html entities that are unformatted
				angular.forEach(article, function(value, key) {
					if (typeof value == 'string') {
						article[key] = value.replace("&lt;p&gt;", "")
											.replace("&lt;/p&gt;", "");
						// 					.replace("&#39;", "'")
						// 					.replace("&quot;", '"');
						//article[key] = $scope.parseHtml(value);
					}
				})
				$scope.articleData = article;
				console.log($scope.articleData);
			}, make, model, year);
			$scope.getVehicle(make, model, year);
		},

		$scope.getVehicle = function(make, model, year) {
			edmundsAPI.getVehicle(function(vehicle) {
				$scope.vehicleData = vehicle;
				//$scope.vehicleData.title =
				console.log($scope.vehicleData);
			}, make, model, year)
		},

		$scope.displayStyles = function(vehicle) {
			$scope.displayStyles = true;
		}

		$scope.parseHtml = function($sce, value) {
			return $sce.trustAsHtml(value);
		}

	})
;

