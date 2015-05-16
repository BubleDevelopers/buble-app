(function() {
	'use strict';

	angular
	.module('app')
	.controller('PlacesPeopleCtrl', function($scope, $location, $routeParams, locator) {
		
		$scope.placeId = $routeParams.placeId;
		$scope.place = locator.place;
		console.log($scope.place);
	});
})();