angular.module('sbess.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
        console.log($window.localStorage[key]);
        return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('httpFactory', function($http) {
	return {
        get: function () {
            return $http.get('http://hari.sbess.ca/api/eventsapi/get_lazsoc_events');
        }
    }
});
