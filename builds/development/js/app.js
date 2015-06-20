var myApp = angular.module('myApp', ['ngRoute', 'appControllers']);


var appControllers = angular.module('appControllers',[]);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/login', {
			templateUrl: 'views/login.html'
		}).
		when('/markup', {
			templateUrl: 'views/markup.html'
		}).
		when('/harddrives', {
			templateUrl: 'views/harddrives.html'
		}).
		otherwise({
			redirectTo: '/markup'
		});
}]);