(function() {
	'use strict';

	angular
	.module('app')
	.controller('PlacesPeopleCtrl', function($scope, $location, $routeParams, locator, checkInService) {
		
		$scope.placeId = $routeParams.placeId;
		$scope.place = locator.place;

		$scope.checkIn = checkInService.checkIn;
		$scope.checkOut = checkInService.checkOut;
	});
})();