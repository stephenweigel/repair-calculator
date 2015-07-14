myApp.controller('MarkupController', ['$scope', function($scope){
			$scope.partCost = 0;
			$scope.partMarkedUp = 0;
			$scope.taxOnPart = 0;
			$scope.laborCost = 0;
			$scope.markupCalculated = false;
			$scope.laborCalculated = false;
			$scope.totalRepairCost = 0;
			$scope.partName = "";
			$scope.repair = [];
			$scope.repairTotal = 0;

			$scope.setPartCost = function(cost) {
				$scope.partCost = parseInt(cost).toFixed(2);
			};

			$scope.getPartCost = function() {
				return $scope.partCost;
			};

			$scope.getPartMarkedUp = function() {
				return $scope.partMarkedUp;
			};

			$scope.setLaborCost = function(cost) {
				$scope.laborCost = parseInt(cost);
				$scope.laborCalculated = true;
			};

			$scope.getTax = function() {
				return $scope.taxOnPart;
			};

			$scope.getLabor = function() {
				return $scope.laborCost;
			}

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


			$scope.calculateTotalRepair = function() {
				$scope.totalRepairCost = Number($scope.partMarkedUp) + Number($scope.laborCost);
				$scope.totalRepairCost = $scope.totalRepairCost.toFixed(2);
				return $scope.totalRepairCost;
			};

			$scope.displayTotalRepairCost = function(paragraphID) {
				var totalCost;
				totalCost  = Number($scope.partMarkedUp);
				totalCost += Number($scope.taxOnPart);
				totalCost += Number($scope.laborCost);
				$("#totalCost").text("$" + totalCost.toFixed(2));
			};

			$scope.addToRepair = function() {
				$scope.partName = $("#partName").val();
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
				$scope.calculateRepairTotal();
			};

			$scope.calculateRepairTotal = function() {
				$scope.repairTotal = 0;
				for ( var i = 0; i < $scope.repair.length; i++ ) {
					$scope.repairTotal += $scope.repair[i].total;
				}
			};			


		$("#partMarkupForm").on('submit', function(event){
			event.preventDefault(); // prevent form submission
			$scope.setPartCost($("#partCost").val());
			$("#partCostWithMarkup").val($scope.calculateMarkup());
			$("#partsCost").text("$" + Number($scope.calculateMarkup()).toFixed(2));
			$("#taxCost").text("$" + $scope.getTax().toFixed(2));
			if ( $scope.laborCalculated == true ) {
				$scope.displayTotalRepairCost();
			}
		});

		$("#labor99").click(function() {
			$scope.setLaborCost(99);
			$("#laborCost").text("$" + $scope.getLabor().toFixed(2));
			if ( $scope.markupCalculated === true ) {
				$scope.displayTotalRepairCost();
			}
		});

		$("#labor125").click(function() {
			$scope.setLaborCost(125);
			$("#laborCost").text("$" + $scope.getLabor().toFixed(2));
			if ( $scope.markupCalculated === true ) {
				$scope.displayTotalRepairCost();
			}
		});

		$("#labor150").click(function() {
			$scope.setLaborCost(150);
			$("#laborCost").text($scope.getLabor().toFixed(2));
			if ( $scope.markupCalculated === true ) {
				$scope.displayTotalRepairCost();
			}
		});	
}]); // MarkupController
