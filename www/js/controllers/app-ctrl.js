(function() {
	'use strict';

	angular
	.module('app')
	.controller('AppCtrl', function($scope, locator) {
		
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