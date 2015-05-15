(function() {
	'use strict';

	angular
	.module('app')
	.factory('locator', function($http, geolocation) {
		this.location = {};

		var that = this;

		return {
			getLocation: function() {
				return that.location;
			},
			fetchLocation: function() {
				that.location = { loading: true };
				return geolocation.getCurrentPosition()
					.then(function(pos) {
						that.location = pos;
						// $scope.getAddress(pos);
						// $scope.findPlaces(pos);
					})
					.catch(function(err) {
						console.log(err);
					});
			},
			fetchAddress: function() {
				var params = {
					'lat': that.location.coords.latitude,
					'long': that.location.coords.longitude
				};
				return $http({
					url: 'http://localhost:3001/address',
					params: params,
					method: 'GET'
				}).then(function(res) {
					that.location.address = res.data.results[0];
					console.log(res);
				});
			},
			getPlaces: function() {
				return that.places;
			},
			fetchPlaces: function() {
				var params = {
					'lat': that.location.coords.latitude,
					'long': that.location.coords.longitude
				};
				return $http({
					url: 'http://localhost:3001/locations',
					params: params,
					method: 'GET'
				}).then(function(res) {
					// $scope.places = res.data.results;
					that.places = res.data.results;
					console.log(res);
				});
			}
		};
	});
})();