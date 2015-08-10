myApp.controller('HardDrivesController', ['$scope', '$http', function($scope, $http){
	$scope.gsxCost = ""; // set initial binding to 0 while allowing for a placeholder

	// retrieve hard drive JSON data
	$http.get('../data/hdds.json').success(function(data){
		$scope.hdds = data;
		for ( var i = 0; i < $scope.hdds.length; i++ ) {
			var drive = $scope.hdds[i];
			$scope.hdds[i] = $scope.calculatePrices(drive);
		}
	});

	// create object with GSX price info
	$scope.getGsxPrice = function() {
		var drive = { 
			"price" : $scope.gsxCost
		};
		return $scope.calculatePrices(drive);
	};

	// calculate various GSX prices
	$scope.calculatePrices = function(drive) {
		var cost = Number(drive.price);

		// define markup based on price
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
