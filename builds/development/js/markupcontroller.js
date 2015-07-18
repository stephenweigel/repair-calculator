myApp.controller('MarkupController', ['$scope', function($scope){
			$scope.partCost = 0;
			$scope.partMarkedUp = 0;
			$scope.taxOnPart = 0;
			$scope.laborCost = 0;
			$scope.totalRepairCost = 0;
			$scope.partName = "";
			$scope.repair = [];
			$scope.repairTotal = 0;
			$scope.markup = {};

			$scope.setLaborCost = function(cost) {
				$scope.laborCost = parseInt(cost);
			};

			$scope.calculateTax = function(taxRate) {
				var tax = taxRate || .06;
				$scope.taxOnPart = $scope.markup.markedUpPrice * tax;
				return  $scope.taxOnPart;
			};

			$scope.calculateMarkup = function() {
				var sp = $scope.markup.startingPrice 
					   = Number($scope.partCost);
				if ( sp > 149.99 ) {
					$scope.markup.markupPercentage = .25;
					$scope.markup.markedUpPrice = sp * 1.25;
				} else { 
					$scope.markup.markupPercentage = .42;
					$scope.markup.markedUpPrice = sp * 1.42;
				}
				$scope.markup.markup = sp * $scope.markup.markupPercentage;
				return $scope.markup;
			};

			$scope.calculatePartTotal = function() {
				return Number($scope.markup.markedUpPrice) + Number($scope.taxOnPart)
						+ Number($scope.laborCost)
			};

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

			$scope.calculateRepairTotal = function() {
				$scope.repairTotal = 0;
				for ( var i = 0; i < $scope.repair.length; i++ ) {
					$scope.repairTotal += $scope.repair[i].total;
				}
				return $scope.repairTotal;
			};	

			$scope.resetPart = function() {
				$scope.partCost = 0;
				$scope.partMarkedUp = 0;
				$scope.taxOnPart = 0;
				$scope.laborCost = 0;
				$scope.partName = "";
				$('#partCost').focus();
			};	
}]); // MarkupController
