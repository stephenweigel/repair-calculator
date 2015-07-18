describe('MarkupController', function() {
    beforeEach(module('myApp'));

    var $controller, $scope, controller;

	beforeEach(inject(function(_$controller_){
	    // The injector unwraps the underscores (_) from around the parameter names when matching
	  $controller = _$controller_;
	}));

	beforeEach(function(){
		$scope = {};	
	  	controller = $controller('MarkupController', { $scope: $scope });
	  	$scope.partCost = 10;
	  	$scope.laborCost = 99;
		$scope.taxOnPart = .6;
		$scope.partName = "test part",
		$scope.markup = {
				'markedUpPrice' : 14.2,
			};
	});

	//setLaborCost
  	it ('sets the labor cost using $scope.laborCost', function() {
  		expect($scope.laborCost).not.toEqual(25);
  		$scope.setLaborCost(25);
  		expect($scope.laborCost).toEqual(25);
  	});

  	//calculateTax
  	it ('should automatically use a 6% tax rate if no rate is provided', function() {
  		expect($scope.partCost).toEqual(10);
  		$scope.calculateTax();
  		expect(Number($scope.taxOnPart.toFixed(2))).toEqual(.85);
  	});

  	it ('should use the tax rate provided when one is provided', function() {
  		expect($scope.partCost).toEqual(10);
  		$scope.calculateTax(.09);
  		expect(Number($scope.taxOnPart.toFixed(2))).toEqual(1.28);
  	});

  	//calculateMarkup
  	it ('should mark up 42% for parts under $150', function() {
  		$scope.partCost = 10;
  		$scope.calculateMarkup();
  		expect($scope.markup.markedUpPrice).toEqual(14.2);
  	});

  	it ('should mark up 25% for parts $150 and higher', function() {
  		$scope.partCost = 150;
  		$scope.calculateMarkup();
  		expect($scope.markup.markedUpPrice).toEqual(187.5);
  	});
  	
  	//calculatePartTotal
  	it('should add markedUpPrice, taxOnPart, and laborCost to find the part total', function() {
  	 	$scope.markup.markedUpPrice = 10;
  	 	$scope.taxOnPart = 10;
  	 	$scope.laborCost = 10;
  	 	var total = $scope.calculatePartTotal();
  	 	expect(total).toEqual(30);
  	 });

  	//addToRepair
  	it('should add that part to the repair array', function() {
  		$scope.partName = "testPart";
  		expect($scope.repair.length).toBeFalsy();
  		$scope.addToRepair();
  		expect($scope.repair.length).not.toBeFalsy();
  	});

  	it('should calculate that part\'s total cost including tax and labor', function() {
  		// markedUpPrice = 14.2 | laborCost = 99 | taxOnPart = .60
  		$scope.addToRepair();
  		expect($scope.repair[0].total).toEqual(113.8);
  	});

  	//calculateRepairTotal
  	it('should claculate the total of all the part totals in the repair', function() {
  		// beforeEach : markedUpPrice = 14.2 | laborCost = 99 | taxOnPart = .60
  		$scope.addToRepair();
  		// add second part
  		$scope.markup.markedUpPrice = 20;
  		$scope.laborCost = 149;
  		$scope.taxOnPart = 1.2;
  		$scope.addToRepair();
  		expect($scope.calculateRepairTotal()).toEqual(284);
  	});

  	//resetPart
  	it('should set the partCost to 0', function() {
  		expect($scope.partCost).not.toEqual(0);
  		$scope.resetPart();
  		expect($scope.partCost).toEqual(0);

  	});

});