angular.module('app').directive('loadingPage', function ($animate, preloader, $interval, deviceDetector, $timeout) {
  return {
    restrict: 'C',
    template : "<div class='loading-content'><span class='number1'>{{numberA}}</span><svg id='svg-rect' width='2%' height='1px'><rect width='100%' height='100%' fill='rgb(211, 45, 51)' style='rgb(211, 45, 51);stroke-width:1;stroke:rgb(211, 45, 51);' /></svg>  <span class='number2'>{{numberB}}</span></div>",
    link : function ($scope, element) {
//<span class='guion'>—</span><line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="460.505" y1="375.248" x2="452.065" y2="407.285"/><svg width='50px' height='50px'> <line stroke='#324' x1='0' y1='25' x2='100%' y2='25'></line></svg>
        var loadImages = []; 
        	
        if(deviceDetector.isTablet()){
            loadImages = [
                '../assets/img/img-1-desktop.jpg',
                '../assets/img/img-2-desktop.jpg',
                '../assets/img/img-3-desktop.jpg',
                '../assets/img/img-4-desktop.jpg'
            ]; 
        }else if(deviceDetector.isMobile()){
            loadImages = [
                '../assets/img/img-1.jpg',
                '../assets/img/img-2.jpg',
                '../assets/img/img-3.jpg',
                '../assets/img/img-4.jpg',
                '../assets/img/slide-arrow.png'
            ]; 
        } else {
            loadImages = [
                '../assets/img/img-1-desktop.jpg',
                '../assets/img/img-2-desktop.jpg',
                '../assets/img/img-3-desktop.jpg',
                '../assets/img/img-4-desktop.jpg',
                '../assets/img/cursor-left.png',
                '../assets/img/cursor-right.png'
            ]; 
        }


        $scope.numberA = 0;
        $scope.numberB = 100;

        var interval;
        var time = 300;
        var forced = false;

        interval = $interval(function() {
            $scope.numberA++;
            $scope.numberB--;
        }, time, 49);

        $timeout(function() {
            if($scope.numberA<49){
                window.scroll(0,0);
                forced = true;
                animateLoading();
                $scope.numberA = 50;
                $scope.numberB = 50;
                animateLoading();
            }
        }, 60*49*2);

    	preloader.preload(loadImages).then(function() {
            if(!forced){    
                window.scroll(0,0); 
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
            }
           
		});
        function animateLoading(){
            var time = 1;
            var delay = 0.3;
            TweenLite.fromTo('.number1',time,{ ease:Power4.easeInOut, left: "-30px", opacity : '1'},{ease:Power4.easeInOut, left: "-130px", opacity : '0', delay: 0.3});
            TweenLite.fromTo('.number2',time,{ ease:Power4.easeInOut, right: "-15px", opacity : '1'},{ease:Power4.easeInOut, right: "-115px", opacity : '0', delay: 0.3});
            TweenLite.fromTo('.guion',time,{ease: Power4.easeInOut, opacity: "1"},{ease: Power4.easeInOut, opacity: "0"});
            TweenLite.fromTo('#svg-rect',time,{ ease: Power4.easeInOut, width: "2%"},{ease: Power4.easeInOut, width: "100%", delay : time, onComplete : function(){
                 TweenLite.fromTo('#svg-rect',time,{ease: Power4.easeInOut,  height: "1px"},{ease: Power4.easeIn, height: "1300px"});
            }});
            TweenLite.set('#svg-rect', {left: "50%"});
            window.scroll(0,0); 
            TweenLite.fromTo('.loading-page',0.5,{ opacity: "1"},{opacity: "0" , delay : (time+time*2), onComplete: function(){
                TweenLite.set('.loading-page', {display: "none", onComplete: function(){
                    
                    TweenLite.fromTo('#animation-title',time*2,{ ease:Power4.easeInOut, top: "45%", opacity : '0'},{ease:Power4.easeInOut, top: "40%", opacity : '1', delay: 0});
                    TweenLite.fromTo('.scroll-btn',time*2,{ ease:Power4.easeInOut, bottom: "5%", opacity : '0'},{ease:Power4.easeInOut, bottom: "10%", opacity : '1', delay: 0.4});
                    TweenLite.fromTo('.lang',time*2,{ ease:Power4.easeInOut, "margin-top": "3%", opacity : '0'},{ease:Power4.easeInOut, "margin-top": "0%", opacity : '1', delay: 0.2});
                    TweenLite.fromTo('.un-logo-fixed',time*2,{ ease:Power4.easeInOut, top: "8%", opacity : '0'},{ease:Power4.easeInOut,top: "3%", opacity : '1', delay: 0.6});
                }});
            }});
            
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