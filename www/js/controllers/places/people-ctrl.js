(function() {
	'use strict';

	angular
	.module('app')
	.controller('PlacesPeopleCtrl', function($scope, $location, $routeParams, locator, checkInService, userService) {
		
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
			$scope.people = [];
			$scope.checkins.forEach(function(checkin) {
				userService.getUserById(checkin.userId)
					.then(function(user) {
						console.log(user);
						$scope.people.push(user.data);
					});
			});
		});
	});
})();
