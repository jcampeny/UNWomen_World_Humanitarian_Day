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
      }else{
        templateName = "../app/components/section/desktop.html";
      }
      return templateName;
    }
  };
});
angular.module('app').directive('appSectionFixed', function (deviceDetector) {
  return {
    restrict: 'E',
    controllerAs: 'appSection',
    controller: function ($scope) {
    
    },
    templateUrl: function(e,a){
      var templateName = "../app/components/section/sectionFixed.html";
      
      if(deviceDetector.isMobile()){
        templateName = "../app/components/section/sectionFixed.html";
      }else{
        templateName = "../app/components/section/desktopFixed.html";
      }
      return templateName;
    }
  };
});