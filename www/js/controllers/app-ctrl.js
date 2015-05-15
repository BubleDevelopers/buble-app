(function() {
	'use strict';

	angular
	.module('app')
	.controller('AppCtrl', function($scope, locator) {
		$scope.getLocation = function() {
			locator.fetchLocation()
				.then(function() {
					$scope.location = locator.getLocation();
					locator.fetchAddress();
				});
		};

		$scope.getLocation();

		$scope.user = {};
	});
})();