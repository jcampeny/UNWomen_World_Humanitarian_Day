angular.module('app').directive('loadingPage', function ($animate, preloader, $interval) {
  return {
    restrict: 'C',
    template : "<div class='loading-content'><span class='number1'>{{numberA}}</span> <span class='guion'>—</span> <span class='number2'>{{numberB}}</span></div>",
    link : function ($scope, element) {

    	var loadImages = [
    		'../assets/img/img-1.jpg',
            '../assets/img/img-2.jpg',
            '../assets/img/img-3.jpg',
            '../assets/img/img-4.jpg'
    	];

        $scope.numberA = 0;
        $scope.numberB = 100;

        var interval;
        var time = 300;

        interval = $interval(function() {
            $scope.numberA++;
            $scope.numberB--;
        }, time, 49);

    	preloader.preload(loadImages).then(function() {

            $interval.cancel(interval);
            interval = $interval(function() {
                if($scope.numberA == 50 && $scope.numberB == 50){
                    animateLoading();
                    $interval.cancel(interval); 
                }else {
                    $scope.numberA++;
                    $scope.numberB--;                    
                }
            }, 40);
           
		});
        function animateLoading(){
            var time = 1;
            var delay = 0.3;
            TweenLite.fromTo('.number1',time,{ left: "0%", opacity : '1'},{left: "-80%", opacity : '0', delay: 0.3});
            TweenLite.fromTo('.number2',time,{ right: "0%", opacity : '1'},{right: "-80%", opacity : '0', delay: 0.3});
            TweenLite.fromTo('.guion',time,{ opacity: "1"},{opacity: "0"});
            TweenLite.fromTo('.loading-page',0.5,{ opacity: "1"},{opacity: "0" , delay : time, onComplete: function(){
                TweenLite.set('.loading-page', {display: "none"});
            }});
            //TweenLite.to('.number1', 0.5, {opacity: "1"});
        }
    }
  };
});

/*app.animation('.loading-page', ['stateSection','animationService' , function(stateSection, animationService ) {
	return {
		addClass: function(element, doneFn) {
			//animación del loading cuando la página ha sido cargada
		}

	};


}]);*/