var myApp = angular.module('myApp', ['ngRoute']);

// Routes

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/markup', {
			templateUrl: 'views/markup.html',
			controller: 'MarkupController'
		}).
		when('/harddrives', {
			templateUrl: 'views/harddrives.html',
			controller: 'HardDrivesController'
		}).
		when('/ram', {
			templateUrl: 'views/ram.html',
			controller: 'RAMController'
		}).
		otherwise({
			redirectTo: '/markup'
		});
}]);

angular.module('myApp.controllers',[]);

// This filter makes the assumption that the input will be in decimal form (i.e. 17% is 0.17).
myApp.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);


