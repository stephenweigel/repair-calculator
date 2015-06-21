var myApp = angular.module('myApp', ['ngRoute', 'appControllers']);


myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/login', {
			templateUrl: 'views/login.html'
		}).
		when('/markup', {
			templateUrl: 'views/markup.html',
			controller: 'MarkupController'
		}).
		when('/harddrives', {
			templateUrl: 'views/harddrives.html',
			controller: 'HardDrivesController'
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
			this.laborCost = 0;
			this.markupCalculated = false;
			this.laborCost = 0;
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
			};

			this.calculateMarkup = function() {
				var markup = this.partCost;
				if ( this.partCost > 149.99 ) {
					markup *= 1.25; // 25% markup
				} else {
					markup *= 1.42; // 42% markup
				}
				markup *= 1.06; // 6% tax
				markup = Number(markup).toFixed(2);
				this.partMarkedUp = Number(markup).toFixed(2);
				this.markupCalculated = true;
				return markup;
			};

			this.displayPartMarkedUp = function(paragraphID) {
				$("#" + paragraphID).text("The cost of the part is: $" + this.partMarkedUp + ". Please select the labor cost.");
				return true;
			};

			this.calculateTotalRepair = function() {
				this.totalRepairCost = Number(this.partMarkedUp) + Number(this.laborCost);
				this.totalRepairCost = this.totalRepairCost.toFixed(2);
				return this.totalRepairCost;
			};

			this.displayTotalRepairCost = function(paragraphID) {
				var message;
				if ( this.markupCalculated ) {
					this.calculateTotalRepair();
					message  =  "The total cost of the repair is: $" + this.totalRepairCost + ".";
					message += "The part cost is: $" + this.partMarkedUp + ".";
					message += "The labor cost is: $" + this.laborCost + ".";
					$("#" + paragraphID).text(message);
				} else {
					$("#" + paragraphID).text("Please calculate the part cost first.");
				}
			};
		} // MarkupCalculator

		var absmac = new MarkupCalculator;

		$("#partMarkupForm").on('submit', function(event){
			event.preventDefault(); // prevent form submission
			absmac.setPartCost($("#partCost").val());
			$("#partCostWithMarkup").val(absmac.calculateMarkup());
			absmac.displayPartMarkedUp("totalRepairCost");
		});

		$("#labor99").click(function() {
			absmac.setLaborCost(99);
			absmac.displayTotalRepairCost('totalRepairCost');
		});

		$("#labor125").click(function() {
			absmac.setLaborCost(125);
			absmac.displayTotalRepairCost('totalRepairCost');
		});

		$("#labor150").click(function() {
			absmac.setLaborCost(150);
			absmac.displayTotalRepairCost('totalRepairCost');
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
