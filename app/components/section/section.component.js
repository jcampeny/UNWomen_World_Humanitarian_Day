angular.module('app').directive('appSection', function (deviceDetector, $window, $state) {
  return {
    restrict: 'E',
    //templateUrl: '../app/components/section/'+scope.name+'.html',
    controllerAs: 'appSection',
    controller: function ($scope) {
    },
    templateUrl: function (e, a){

      var templateName = "../app/components/section/section.html";
      var lastState;
      angular.element($window).on('resize' , function() {
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
          };
          if(isMobile.any() && lastState===false){
            lastState = true;
            
            $window.location.reload();

          }else if((!isMobile.any() && lastState===true) ){
            lastState=false;
            
            $window.location.reload();
          }
      });

      if(deviceDetector.isMobile()){
        templateName = "../app/components/section/section.html";
        lastState = true;
      }else{
        templateName = "../app/components/section/desktop.html";
        lastState = false;
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

/*var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};*/