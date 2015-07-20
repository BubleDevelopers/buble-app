(function() {
	'use strict';

	angular
	.module('app')
	.controller('AppCtrl', function($scope, $location, locator, userService) {
		userService.getCurrentUser().catch(function(err) {
			console.log(err);
			// location.assign('http://localhost:3001/auth/facebook?successUrl=' + window.encodeURIComponent($location.absUrl()));
		});

		$scope.location = {};

		locator.geo.then(function(data) {
			$scope.location.geo = data;
		});

		locator.address.then(function(data) {
			$scope.location.address = data;
		});

		$scope.user = {};
	});
})();
