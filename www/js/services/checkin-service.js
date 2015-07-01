(function() {
	'use strict';

	angular
	.module('app')
	.factory('checkInService', function($http) {
		var HOST = 'http://localhost:3001';
		var URL_ROOT = HOST + '/checkins';

		var DEFAULT_RADIUS = 100;

		return {
			checkIn: function(userId, placeId, lat, long) {
				console.log('Checking in to ' + placeId);
				var data = {
					userId: userId || 12345,
					location: {
						lat: lat,
						long: long,
						placeId: placeId
					}
				};
				return $http({
					url: URL_ROOT,
					method: 'POST',
					data: data
				});
			},
			checkOut: function(checkInId) {
				console.log('Deleting checkin ' + checkInId);
				return $http({
					url: URL_ROOT + '/' + checkInId,
					method: 'DELETE'
				});
			},
			getPeopleAtLocation: function(placeId) {
				return $http({
					url: URL_ROOT + '/place/' + placeId,
					method: 'GET'
				});
			},
			getPeopleNearLocation: function(lat, long, radius) {
				return $http({
					url: URL_ROOT + '/near',
					params: { lat: lat, long: long, radius: radius || DEFAULT_RADIUS }
				});
			}
		};
	});
})();