myApp.controller('RAMController', ['$scope', function($scope){
	$scope.ramTypes = ramTypes;
	$scope.iMacs = iMacsByRamType;
	$scope.mbps = mbpByRamType;

	$scope.tab = 'iMac';

	this.selectTab = function(setTab) {
		$scope.tab = setTab;
	};

	this.isSelected = function(checkTab) {
		return $scope.tab === checkTab;
	};
}]); // RAMController

var ramTypes = [
	{
		"size" : "2GB",
		"costToStore" : 27.99,
		"costToCustomer" : 49
	},
	{
		"size" : "4GB",
		"costToStore" : 50,
		"costToCustomer" : 99
	},
	{
		"size" : "8GB",
		"costToStore" : 56,
		"costToCustomer" : 149
	},
	{
		"size" : "2GB",
		"costToStore" : 100,
		"costToCustomer" : 199
	}
];

var iMacsByRamType = [
	{
		"models" : [
			"iMac 20-inch Mid-2007",
			"iMac 24-inch Mid-2007"
		],
		"ramType" : "PC2-5300 | 667 Mhz",
		"maxRam" : "4GB",
		"stickSizes" : [ "1GB", "2GB" ]
	},
	{
		"models" : [
			"iMac 20-inch Early-2008",
			"iMac 24-inch Early-2008"
		],
		"ramType" : "PC2-6400 | 800 Mhz",
		"maxRam" : "4GB",
		"stickSizes" : [ "1GB", "2GB" ]
	},
	{
		"models" : [
			"iMac 20-inch Early-2009",
			"iMac 24-inch Early-2009"
		],
		"ramType" : "PC3-8500 | 1066 Mhz",
		"maxRam" : "8GB",
		"stickSizes" : [ "1GB", "2GB", "4GB" ]
	},
	{
		"models" : [
			"iMac 21.5-inch Late-2009",
			"iMac 27-inch Late-2009"
		],
		"ramType" : "PC3-8500 | 1066 Mhz",
		"maxRam" : "16GB",
		"stickSizes" : [ "2GB", "4GB" ]
	},
	{
		"models" : [
			"iMac 21.5-inch Mid-2010",
			"iMac 27-inch Mid-2010",
			"iMac 21.5-inch Mid-2011",
			"iMac 27-inch Mid-2011"
		],
		"ramType" : "PC3-10600 | 1333 Mhz",
		"maxRam" : "16GB",
		"stickSizes" : [ "2GB", "4GB" ]
	},
	{
		"models" : [
			"iMac 27-inch Mid-2012",
			"iMac 27-inch Mid-2013",
			"iMac Retina 5K Late-2014",
			"iMac Retina 5K Mid-2015"
		],
		"ramType" : "PC3-12800 | 1600 Mhz",
		"maxRam" : "32GB",
		"stickSizes" : [ "2GB", "4GB", "8GB" ]
	}
];

var mbpByRamType = [
	{
		"models" : [
			"MacBook Pro 17-inch Early-2009",
			"MacBook Pro 13-inch Mid-2009",
			"MacBook Pro 15-inch 2.53GHz Mid-2009",
			"MacBook Pro 15-inch Mid-2009",
			"MacBook Pro 17-inch Mid-2009",
			"MacBook Pro 13-inch Mid-2010",
			"MacBook Pro 15-inch Mid-2010",
			"MacBook Pro 17-inch Mid-2010"
		],
		"ramType" : "PC3-8500 | 1066 Mhz",
		"maxRam" : "8GB",
		"stickSizes" : [ "2GB", "4GB" ]
	},
	{
		"models" : [
			"MacBook Pro 13-inch Early-2011",
			"MacBook Pro 15-inch Early-2011",
			"MacBook Pro 17-inch Early-2011",
			"MacBook Pro 13-inch Late-2011",
			"MacBook Pro 15-inch Late-2011",
			"MacBook Pro 17-inch Late-2011"
		],
		"ramType" : "PC3-10600 | 1333 Mhz",
		"maxRam" : "8GB",
		"stickSizes" : [ "2GB", "4GB" ]
	},
	{
		"models" : [
			"MacBook Pro 13-inch Mid-2012",
			"MacBook Pro 15-inch Mid-2012"
		],
		"ramType" : "PC3-12800 | 1600 Mhz",
		"maxRam" : "8GB",
		"stickSizes" : [ "2GB", "4GB" ]
	}
];