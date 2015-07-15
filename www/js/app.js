(function() {
	'use strict';

	angular
	.module('app', ['ngRoute'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'partials/index.html',
				controller: 'IndexCtrl'
			})
			.when('/places', {
				templateUrl: 'partials/places/list.html',
				controller: 'PlacesListCtrl'
			})
			.when('/places/:placeId/detail', {
				templateUrl: 'partials/places/detail.html',
				controller: 'PlacesDetailCtrl'
			});
	});
})();