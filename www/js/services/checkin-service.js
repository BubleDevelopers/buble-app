(function() {
	'use strict';

	angular
	.module('app')
	.factory('checkInService', function($http) {
		var HOST = 'http://localhost:3001';
		var URL_ROOT = HOST + '/checkins';

		return {
			checkIn: function(placeId, lat, long) {
				return $http({
					url: URL_ROOT,
					method: 'POST',
					data: {
						lat: lat,
						long: long,
						placeId: placeId
					}
				});
			},
			checkOut: function(checkInId) {
				return $http({
					url: URL_ROOT + '/' + checkInId,
					method: 'DELETE'
				});
			}
		};
	});
})();