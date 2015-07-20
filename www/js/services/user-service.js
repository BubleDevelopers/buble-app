(function() {
	'use strict';

	angular
	.module('app')
	.factory('userService', function($http) {
		var HOST = 'http://localhost:3001';
		var URL_ROOT = HOST + '/users';

		return {
			getUserById: function(userId) {
				return $http({
					url: URL_ROOT + '/' + userId,
					method: 'GET'
				});
			},
			getCurrentUser: function() {
				return $http({
					url: URL_ROOT + '/me',
					method: 'GET'
				});
			}
		};
	});
})();
