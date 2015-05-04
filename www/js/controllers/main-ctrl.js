(function() {
	'use strict';

	angular
	.module('app')
	.controller('MainCtrl', function($scope, cordovaReady, geolocation) {
		// cordovaReady(function(success, error, options) {
		// 	if(success) { console.log('Successfully initialized'); }
		// 	else {
		// 		console.log(error);
		// 	}
		// });

		$scope.getLocation = function() {
			geolocation.getCurrentPosition()
				.then(function(pos) {
					$scope.location = pos;
				})
				.catch(function(err) {
					console.log(err);
				});
		};
	});
})();