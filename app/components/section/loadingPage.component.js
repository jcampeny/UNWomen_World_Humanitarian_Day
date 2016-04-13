angular.module('app').directive('loadingPage', function ($animate, preloader) {
  return {
    restrict: 'C',
    link : function ($scope, element) {
    	/*var loadImages = [
    		'../dist/section9.jpg',
    		'../dist/section4.jpg',
    		'../dist/section2.jpg',
    		'../dist/section3.jpg',
    		'../dist/section1.jpg',
    		'../dist/section3-subsection1.jpg',
    		'../dist/section3-subsection2.jpg',
    		'../dist/section3-subsection3.jpg',
    		'../dist/section3-subsection4.jpg',
    		'../dist/section2-subsection1.jpg',
    		'../dist/section2-subsection2.jpg'
    	];

    	preloader.preload(loadImages ).then(function() {*/
			$scope.loadingState = "loaded";
		/*});*/
        
    }
  };
});

app.animation('.loading-page', ['stateSection','animationService' , function(stateSection, animationService ) {
	return {
		addClass: function(element, doneFn) {
			//animación del loading cuando la página ha sido cargada
		}

	};


}]);