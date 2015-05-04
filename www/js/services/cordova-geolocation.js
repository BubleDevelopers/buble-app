(function() {
	'use strict';

	angular
	.module('app')
	.factory('geolocation', function ($q) {
		return {
			getCurrentPosition: function (options) {
				var deferred = $q.defer();

				navigator.geolocation.getCurrentPosition(function () {
					var that = this,
					args = arguments;

					deferred.resolve.apply(that, args);
				}, function () {
					var that = this,
					args = arguments;

					deferred.reject.apply(that, args);
				},
				options);

				return deferred.promise;
			}
		};
	});
})();