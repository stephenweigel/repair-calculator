myApp.controller('MarkupController', ['$scope', function($scope){
	// set initial costs for two-way bindings
	$scope.partCost = 0;
	$scope.partMarkedUp = 0;
	$scope.taxOnPart = 0;
	$scope.laborCost = 0;
	$scope.totalRepairCost = 0;
	$scope.repairTotal = 0;

	$scope.partName = ""; // part name for multi-part repair
	$scope.repair = []; // empty array for multi-part repairs
	$scope.markup = {}; // empty object for markup breakdown
	$scope.tab = 'standardLabor'; // set initial labor tab


	// select tab for labor pricing
	this.selectTab = function(setTab) {
		$scope.tab = setTab;
	};

	// check for active tab for CSS highlighting
	this.isSelected = function(checkTab) {
		return $scope.tab === checkTab;
	};

	// used by buttons to set labor cost
	$scope.setLaborCost = function(cost) {
		$scope.laborCost = parseInt(cost);
	};


	// Part Totals 

	// set tax based on the price of the part after markup
	$scope.calculateTax = function(taxRate) {
		var tax = taxRate || .06;
		$scope.taxOnPart = $scope.markup.markedUpPrice * tax;
		return  $scope.taxOnPart;
	};

	// 
	$scope.calculatePartTotal = function() {
		return Number($scope.markup.markedUpPrice) + Number($scope.taxOnPart)
				+ Number($scope.laborCost)
	};

	// calculate prices for markup object
	$scope.calculateMarkup = function() {
		var sp = $scope.markup.startingPrice 
			   = Number($scope.partCost);

		// calculate markup based on starting price	   
		if ( sp > 149.99 ) {
			$scope.markup.markupPercentage = .25;
			$scope.markup.markedUpPrice = sp * 1.25;
		} else { 
			$scope.markup.markupPercentage = .42;
			$scope.markup.markedUpPrice = sp * 1.42;
		}

		// amount marked up
		$scope.markup.markup = sp * $scope.markup.markupPercentage;
		return $scope.markup;
	};

	// Multi-part repair

	// add current part information to the multi-part repair array
	//   and reset part information
	$scope.addToRepair = function() {
		var partInfo = {
			"price" : $scope.markup.markedUpPrice,
			"tax" : $scope.taxOnPart,
			"labor" : $scope.laborCost,
			"name" : $scope.partName,
			"total": Number($scope.markup.markedUpPrice) 
					+ Number($scope.taxOnPart)
					+ Number($scope.laborCost)
		};
		$scope.repair.push(partInfo);
		$scope.resetPart();
	};

	// calculate total for all parts in the multi-part repair
	$scope.calculateRepairTotal = function() {
		$scope.repairTotal = 0;
		for ( var i = 0; i < $scope.repair.length; i++ ) {
			$scope.repairTotal += $scope.repair[i].total;
		}
		return $scope.repairTotal;
	};	

	// reset part pricing information
	$scope.resetPart = function() {
		$scope.partCost = 0;
		$scope.partMarkedUp = 0;
		$scope.taxOnPart = 0;
		$scope.laborCost = 0;
		$scope.partName = "";
	};	
}]); // MarkupController
