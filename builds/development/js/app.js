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


// Directives

// Markup

myApp.directive('markupPartCost', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/directives/markup_part_cost.html'
	};
});

myApp.directive('markupLaborCost', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/directives/markup_labor.html'
	};
});

myApp.directive('markupTotalCost', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/directives/markup_total_cost.html'
	};
});

myApp.directive('multipartRepair', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/directives/markup_multipart.html'
	};
});

// Hard Drives

myApp.directive('standardHardDrives', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/directives/harddrives_standard.html'
	};
});

myApp.directive('appleHardDrives', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/directives/harddrives_apple.html'
	};
});

// RAM

myApp.directive('ramPricing', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/directives/ram_pricing.html'
	};
});

myApp.directive('ramSpecs', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/directives/ram_computer_specs.html'
	};
});

// Filters

// This filter makes the assumption that the input will be in decimal form 
// (i.e. 17% is 0.17).
myApp.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);
