(function() {
	'use strict';

	angular
	.module('app')
	.controller('IndexCtrl', function($scope, $location, locator) {
		// cordovaReady(function(success, error, options) {
		// 	if(success) { console.log('Successfully initialized'); }
		// 	else {
		// 		console.log(error);
		// 	}
		// });

		$scope.getLocation = function() {
			locator.getLocation();
		};

		$scope.advance = function() {
			$location.url('/places/');
		};
	});
})();