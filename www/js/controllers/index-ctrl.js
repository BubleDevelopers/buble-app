(function() {
	'use strict';

	angular
	.module('app')
	.controller('IndexCtrl', function($scope, $location, locator) {

		$scope.advance = function() {
			$location.url('/places/');
		};
	});
})();