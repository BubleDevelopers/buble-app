(function() {
	'use strict';

	angular
	.module('app')
	.controller('PlacesListCtrl', function($scope, $location, locator) {

		var init = function() {
			locator.nearbyPlaces.then(function(data) {
				$scope.nearbyPlaces = data;
			});
		};
		init();

		$scope.refreshLocation = function() {
			locator.refreshCache();
			$scope.nearbyPlaces = null;
			init();
		};

		$scope.setPlace = function(place) {
			console.log(place);
			$location.url('/places/' + place.place_id + '/people');
		};
	});
})();