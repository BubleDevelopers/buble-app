(function() {
	'use strict';

	angular
	.module('app')
	.factory('locator', function($http, $q, $cacheFactory, geolocation) {
		var lc = $cacheFactory('locator');

		// Functions for providing instructions on how to fetch new locator values
		// Assume nothing is defined if we reach here
		var fetchers = {
			'geo': function() {
				return geolocation.getCurrentPosition();
			},
			'address': function(args) {
				// We require geometrics to be resolved before we can fetch
				// the address
				if(args.geo) {
					return args.geo.then(function(geo) {
						var params = {
							'lat': geo.coords.latitude,
							'long': geo.coords.longitude
						};
						return $http({
							url: 'http://localhost:3001/location/address',
							params: params,
							method: 'GET'
						}).then(function(res) {
							return res.data.results[0];
						});
					});
				} else {
					return null;
				}
			},
			'nearbyPlaces': function(args) {
				// We require geometrics to be resolved before we can fetch
				// any nearby places
				if(args.geo) {
					return args.geo.then(function(geo) {
						var params = {
							'lat': geo.coords.latitude,
							'long': geo.coords.longitude
						};
						return $http({
							url: 'http://localhost:3001/location/places',
							params: params,
							method: 'GET'
						}).then(function(res) {
							return res.data.results;
						});
					});
				}
			}
		};

		var get = function(what, debug, args) {
			var data = lc.get(what);
				if(data) {
					if(debug) {
						console.log('Using cached ' + what + ' value');
					}
					// The cache may return an existing promise if a request is currently
					// already in progress. Wrap that (or the plain data returned) in a promise
					// and return that.
					return $q.when(data)
						.then(function(d) {
							return d;
						});
				} else {
					if(debug) {
						console.log('Fetching new ' + what + ' value');
					}
					// We store the promise in the cache until its value is resolved
					// so that subsequent request may simply way for the existing promise
					// to complete
					return lc.put(what, fetchers[what](args)
						.then(function(newData) {
							if(locator.debug) {
								console.log('New ' + what + ' value fetched:');
								console.log(newData);
							}
							// When the promise is resolved we repace the promise in the
							// cache with its concrete value
							return lc.put(what, newData);
						})
						.catch(function(err) {
							console.log(err);
						}));
				}
		};

		var locator = {
			debug: true,
			refreshCache: function() {
				lc.removeAll();
			},
			get geo() {
				return get('geo', locator.debug);
			},
			get address() {
				return get('address', locator.debug, { geo: locator.geo });
			},
			get nearbyPlaces() {
				return get('nearbyPlaces', locator.debug, { geo: locator.geo });
			}
		};

		return locator;
		// 	fetchPeople: function(placeId) {
		// 		var params = {
		// 			placeId: placeId
		// 		};
		// 		return $http({
		// 			url: 'http://localhost:3001/people',
		// 			params: params,
		// 			method: 'GET'
		// 		}).then(function(res) {
		// 			// $scope.places = res.data.results;
		// 			that.places = res.data.results;
		// 			console.log(res);
		// 		});
		// 	}
		// };
	});
})();