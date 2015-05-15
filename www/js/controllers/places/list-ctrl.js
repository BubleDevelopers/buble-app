(function() {
	'use strict';

	angular
	.module('app')
	.controller('PlacesListCtrl', function($scope, $location, locator) {
		locator.fetchPlaces()
			.then(function() {
				$scope.places = locator.getPlaces();
			});
	});
})();