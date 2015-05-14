(function() {
	'use strict';

	angular
	.module('app')
	.controller('MainCtrl', function($scope, $http, cordovaReady, geolocation) {
		// cordovaReady(function(success, error, options) {
		// 	if(success) { console.log('Successfully initialized'); }
		// 	else {
		// 		console.log(error);
		// 	}
		// });

		$scope.getLocation = function() {
			$scope.location = { loading: true };
			geolocation.getCurrentPosition()
				.then(function(pos) {
					$scope.location = pos;
					$scope.getAddress(pos);
					$scope.findPlaces(pos);
				})
				.catch(function(err) {
					console.log(err);
				});
		};

		$scope.getAddress = function(location) {
			var params = {
				'lat': location.coords.latitude,
				'long': location.coords.longitude
			};
			$http({
				url: 'http://localhost:3001/address',
				params: params,
				method: 'GET'
			}).then(function(res) {
				location.address = res.data.results[0];
				console.log(res);
			});
		};

		$scope.findPlaces = function(location) {
			var params = {
				'lat': location.coords.latitude,
				'long': location.coords.longitude
			};
			$http({
				url: 'http://localhost:3001/locations',
				params: params,
				method: 'GET'
			}).then(function(res) {
				$scope.places = res.data.results;
				console.log(res);
			});
		};

		$scope.setPlace = function(place) {
			console.log(place);
		};
	});
})();