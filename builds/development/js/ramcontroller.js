myApp.controller('RAMController', ['$scope','$http', function($scope,$http){
	
	$http.get('../data/ramprices.json').success(function(data){
		$scope.ramTypes = data;
	});

	$http.get('../data/imacram.json').success(function(data){
		$scope.iMacs = data;
	});

	$http.get('../data/mbpram.json').success(function(data){
		$scope.mbps = data;
	});

	$scope.tab = 'iMac';

	this.selectTab = function(setTab) {
		$scope.tab = setTab;
	};

	this.isSelected = function(checkTab) {
		return $scope.tab === checkTab;
	};
}]); // RAMController