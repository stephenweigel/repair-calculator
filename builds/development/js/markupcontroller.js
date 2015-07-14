myApp.controller('MarkupController', ['$scope', function($scope){
			$scope.partCost = 0;
			$scope.partMarkedUp = 0;
			$scope.taxOnPart = 0;
			$scope.laborCost = 0;
			$scope.totalRepairCost = 0;
			$scope.partName = "";
			$scope.repair = [];
			$scope.repairTotal = 0;

			$scope.setLaborCost = function(cost) {
				$scope.laborCost = parseInt(cost);
			};

			$scope.calculateMarkup = function() {
				var markup = $scope.partCost;
				if ( $scope.partCost > 149.99 ) {
					markup *= 1.25; // 25% markup
				} else {
					markup *= 1.42; // 42% markup
				}
				markup = Number(markup).toFixed(2);
				$scope.partMarkedUp = Number(markup).toFixed(2);
				$scope.taxOnPart = Number($scope.partMarkedUp) * .06;
				$scope.markupCalculated = true;
				return markup;
			};

			$scope.calculatePartTotal = function() {
				return Number($scope.partMarkedUp) + Number($scope.taxOnPart)
						+ Number($scope.laborCost)
			};

			$scope.addToRepair = function() {
				var partInfo = {
					"price" : $scope.partMarkedUp,
					"tax" : $scope.taxOnPart,
					"labor" : $scope.laborCost,
					"name" : $scope.partName,
					"total": Number($scope.partMarkedUp) 
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
