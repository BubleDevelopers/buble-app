(function() {
	'use strict';

	angular
	.module('app')
	.controller('PlacesPeopleCtrl', function($scope, $location, $routeParams, locator, checkInService) {
		
		$scope.placeId = $routeParams.placeId;
		$scope.place = locator.place;

		$scope.checkIn = checkInService.checkIn;
		$scope.checkOut = checkInService.checkOut;

		locator.geo.then(function(geo) {
			$scope.checkIn($scope.user.username, $scope.placeId, geo.coords.latitude, geo.coords.longitude);
		});

		checkInService.getPeopleAtLocation($scope.placeId).then(function(checkins) {
			console.log(checkins);
			$scope.checkins = checkins.data;
		});
	});
})();
