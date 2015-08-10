myApp.controller('RAMController', ['$scope','$http', function($scope,$http){
	
	// get RAM JSON data

	// RAM pricing
	$http.get('../data/ramprices.json').success(function(data){
		$scope.ramTypes = data;
	});

	// iMac RAM types
	$http.get('../data/imacram.json').success(function(data){
		$scope.iMacs = data;
	});

	// MacBook Pro RAM types
	$http.get('../data/mbpram.json').success(function(data){
		$scope.mbps = data;
	});

	// Set initial RAM types tab
	$scope.tab = 'iMac';

	// select RAM types tab
	this.selectTab = function(setTab) {
		$scope.tab = setTab;
	};

	// check for active tab for CSS highlighting
	this.isSelected = function(checkTab) {
		return $scope.tab === checkTab;
	};
}]); // RAMController