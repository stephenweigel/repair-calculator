myApp.controller('HardDrivesController', ['$scope', function($scope){
		
		
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
