angular.module('app').directive('appSection', function (deviceDetector) {
  return {
    restrict: 'E',
    //templateUrl: '../app/components/section/'+scope.name+'.html',
    controllerAs: 'appSection',
    controller: function ($scope) {

      
    },
    templateUrl: function (e, a){
      var templateName = "../app/components/section/section.html";
      if(deviceDetector.isMobile()){
        templateName = "../app/components/section/section.html";
      }
      return templateName;
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