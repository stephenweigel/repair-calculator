var myApp = angular.module('myApp', ['ngRoute', 'appControllers']);

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

// Controllers

var appControllers = angular.module('appControllers',[]);


appControllers.controller('MarkupController', ['$scope', function($scope){
	angular.element(document).ready(function () {
		function MarkupCalculator() {
			this.partCost = 0;
			this.partMarkedUp = 0;
			this.taxOnPart = 0;
			this.laborCost = 0;
			this.markupCalculated = false;
			this.laborCalculated = false;
			this.totalRepairCost = 0;

			this.setPartCost = function(cost) {
				this.partCost = parseInt(cost).toFixed(2);
			};

			this.getPartCost = function() {
				return this.partCost;
			};

			this.getPartMarkedUp = function() {
				return this.partMarkedUp;
			};

			this.setLaborCost = function(cost) {
				this.laborCost = parseInt(cost);
				this.laborCalculated = true;
			};

			this.getTax = function() {
				return this.taxOnPart;
			};

			this.getLabor = function() {
				return this.laborCost;
			}

			this.calculateMarkup = function() {
				var markup = this.partCost;
				if ( this.partCost > 149.99 ) {
					markup *= 1.25; // 25% markup
				} else {
					markup *= 1.42; // 42% markup
				}
				markup = Number(markup).toFixed(2);
				this.partMarkedUp = Number(markup).toFixed(2);
				this.taxOnPart = Number(this.partMarkedUp) * .06;
				this.markupCalculated = true;
				return markup;
			};

			

			this.calculateTotalRepair = function() {
				this.totalRepairCost = Number(this.partMarkedUp) + Number(this.laborCost);
				this.totalRepairCost = this.totalRepairCost.toFixed(2);
				return this.totalRepairCost;
			};

			this.displayTotalRepairCost = function(paragraphID) {
				var totalCost;
				totalCost  = Number(this.partMarkedUp);
				totalCost += Number(this.taxOnPart);
				totalCost += Number(this.laborCost);
				$("#totalCost").text("$" + totalCost.toFixed(2));
			};
		} // MarkupCalculator

		var absmac = new MarkupCalculator;

		$("#partMarkupForm").on('submit', function(event){
			event.preventDefault(); // prevent form submission
			absmac.setPartCost($("#partCost").val());
			$("#partCostWithMarkup").val(absmac.calculateMarkup());
			$("#partsCost").text("$" + Number(absmac.calculateMarkup()).toFixed(2));
			$("#taxCost").text("$" + absmac.getTax().toFixed(2));
			if ( absmac.laborCalculated == true ) {
				absmac.displayTotalRepairCost();
			}
		});

		$("#labor99").click(function() {
			absmac.setLaborCost(99);
			$("#laborCost").text("$" + absmac.getLabor().toFixed(2));
			if ( absmac.markupCalculated === true ) {
				absmac.displayTotalRepairCost();
			}
		});

		$("#labor125").click(function() {
			absmac.setLaborCost(125);
			$("#laborCost").text("$" + absmac.getLabor().toFixed(2));
			if ( absmac.markupCalculated === true ) {
				absmac.displayTotalRepairCost();
			}
		});

		$("#labor150").click(function() {
			absmac.setLaborCost(150);
			$("#laborCost").text(absmac.getLabor().toFixed(2));
			if ( absmac.markupCalculated === true ) {
				absmac.displayTotalRepairCost();
			}
		});	
	}); // document.ready
}]); // HardDrivesController


appControllers.controller('HardDrivesController', ['$scope', function($scope){
		
		
	angular.element(document).ready(function () {
		function HardDrivePricing() {
			this.cost = 0;
			this.markedUp = 0;
			this.clean;
			this.migration;
			this.recovery;

			this.setCost = function(cost) {
				this.cost = Number(cost);
				this.calculateMarkup();
			};

			this.getMarkedUp = function() {
				return this.markedUp;
			};

			this.getCleanInstall = function() {
				this.clean = Number(this.markedUp) + Number(149);
				return this.clean;
			};

			this.getDataMigration = function() {
				this.migration = Number(this.markedUp) + Number(174);
				return this.migration;
			};

			this.getDataRecovery = function() {
				this.recovery = Number(this.markedUp) + Number(249);
				return this.recovery;
			};

			this.calculateMarkup = function() {
				var markup;
				markup  = this.cost + 7; // shipping
				if ( this.cost > 149.99 ) {
					markup *= 1.25; // markup
				} else {
					markup *= 1.42; // markup
				}
				markup *= 1.06; // tax
				this.markedUp = markup;
				return true;
			};
		} // HardDrivePricing

		function displayDrivePrices() {
			displayDrivePrice('HDD-25-500GB', 58.92);
			displayDrivePrice('HDD-25-1TB', 64.99);
			displayDrivePrice('HDD-35-500GB', 68.99);
			displayDrivePrice('HDD-35-1TB', 70.31);
		}

		function displayDrivePrice(drive,cost) {
			var hdd = new HardDrivePricing;
			hdd.setCost(cost);
			$('#' + drive + '-Price').html('$' + hdd.getMarkedUp().toFixed(2));
			$('#' + drive + '-Clean').html('$' + hdd.getCleanInstall().toFixed(2));
			$('#' + drive + '-Migration').html('$' + hdd.getDataMigration().toFixed(2));
			$('#' + drive + '-Recovery').html('$' + hdd.getDataRecovery().toFixed(2));
		}

		displayDrivePrices();
	}); // document.ready
}]); // HardDrivesController


appControllers.controller('RAMController', ['$scope', function($scope){
	angular.element(document).ready(function () {

	}); // document.ready
}]); // RAMController
