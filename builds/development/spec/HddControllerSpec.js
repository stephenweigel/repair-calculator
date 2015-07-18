describe('HardDrivesController', function() {
    beforeEach(module('myApp'));

    var $controller, $scope, controller;

  beforeEach(inject(function(_$controller_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  beforeEach(function(){
    $scope = {};  
    controller = $controller('HardDrivesController', { $scope: $scope });

    // set drive price, pre-markup 
    $scope.gsxCost = 100;
  });

  //calculateGsxPrice
  it('should return a drive object with the drive price, and different service prices', function() {
    var drive = $scope.calculateGsxPrice();
    expect(drive.tax).toEqual(8.52);
    expect(drive.taxed).toEqual(150.52);
    expect(drive.clean).toEqual(299.52);
    expect(drive.migration).toEqual(324.52);
    expect(drive.recovery).toEqual(399.52);
  });
});