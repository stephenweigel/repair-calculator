myApp.controller('HardDrivesController', ['$scope', '$http', function($scope, $http){
	$scope.gsxCost = "";

	$http.get('../data/hdds.json').success(function(data){
		$scope.hdds = data;
		for ( var i = 0; i < $scope.hdds.length; i++ ) {
			var drive = $scope.hdds[i];
			$scope.hdds[i] = $scope.calculatePrices(drive);
		}
	});

	$scope.calculateGsxPrice = function() {
		var drive = { 
			"price" : $scope.gsxCost
		};
		return $scope.calculatePrices(drive);
	};

	$scope.calculatePrices = function(drive) {
		var cost = Number(drive.price);

		if ( cost > 149.99 ) {
			drive.markup = cost * 1.25;
		} else {
			drive.markup = cost * 1.42;
		}
		
		drive.tax = drive.markup * .06;
		drive.taxed = drive.markup + drive.tax;
		drive.clean = drive.taxed + 149;
		drive.migration = drive.taxed + 174;
		drive.recovery = drive.taxed + 249;
		return drive;
	};

}]); // HardDrivesController
