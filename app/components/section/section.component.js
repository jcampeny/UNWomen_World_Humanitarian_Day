angular.module('app').directive('appSection', function () {
  return {
    restrict: 'E',
    templateUrl: '../app/components/section/section.html',
    controllerAs: 'appSection',
    controller: function ($scope) {
    
    }
  };
});
angular.module('app').directive('appSectionFixed', function () {
  return {
    restrict: 'E',
    templateUrl: '../app/components/section/sectionFixed.html',
    controllerAs: 'appSection',
    controller: function ($scope) {
    
    }
  };
});