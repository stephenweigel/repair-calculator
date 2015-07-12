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




