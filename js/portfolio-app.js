angular.module('portfolioApp', [])
	.directive('pageTemplates', function() {
		return  {
			restrict: 'A',
			templateUrl: article.url,
		}
	});
	.controller('articleControl', function() {
		var articleList = this;

		articleList.articles = [
			// {
			// 	name: 'home',
			// 	url: '../templates/home.html'
			// },
			{
				name: 'resume',
				url: '../templates/resume.html'
			},
			{
				name: 'portfolio',
				url: '../templates/header.html'
			},
			{
				name: 'd3',
				url: '../templates/d3.html'
			},
			{
				name: 'd3-api',
				url: '../templates/d3-api.html'
			}
		];
});