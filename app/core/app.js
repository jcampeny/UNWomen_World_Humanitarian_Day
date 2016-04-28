var app = angular.module("app",['templates-dist', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'ngResource', 'sn.skrollr', 'ng.deviceDetector'])
.controller("mainController", [ '$scope', 'ArrayService', 'deviceDetector', '$document', 'scrollService','snSkrollr','$window','$timeout', function($scope, ArrayService, deviceDetector, $document, scrollService, snSkrollr, $window, $timeout) {

	angular.element($window).on('resize' , function() {
		snSkrollr.destroy();
		skrollrInit(snSkrollr, deviceDetector);
		setScroll();

	});
	
	angular.element($document).ready(function () {
		setScroll();
    });

	var scrolling = false;

	$document.bind('mousewheel DOMMouseScroll touchmove scroll', function(e){				
		//console.log($(document).scrollTop());
		var actual = $(document).scrollTop();
		//var time = 0.5;
		//
		//var direction = scrollService.getDirectionOnMouseWheel(e);console.log(direction);
		//if(!scrolling && direction == "down"){
		//	scrolling = true;
		//	e.preventDefault();
		//	
		//TweenLite.to(window, 0.3, {scrollTo:{y:actual+100}, ease: Power1.easeOut, onComplete: function(){$timeout(function(){e.preventDefault();},100)}});
//
		//}
	});

	$document.bind('touchmove touchstart touchmove touchcancel touchend', function(e){
		var direction = scrollService.getDirectionOnTouchMove(e);
		var openMenu = $('#menu-mobile').css('opacity');
		if(direction == "right" || direction == "left"){
			e.preventDefault();
		}
		if(openMenu == "0"){
			if(direction == "down"){
				TweenLite.to('#menu-burger', 0.5, {top: '-60px'});
			}else if(direction == "up"){
				TweenLite.to('#menu-burger', 0.5, {top: '0px'});
			}
		}

	});
	function setScroll(){
	    $scope.scrollToMobile = {
			section1 : ($('#section1').height()/2) + 50,
			section2 : (($('#section1').height() + $('#section2').height() + $('#section3').height()+ $('#section4').height())/2) + 60,
			section3 : (($('#section1').height() + $('#section2').height() + $('#section3').height()+ $('#section4').height()+ $('#section5').height() + $('#section6').height()+ $('#section7').height())/2) + 130,
			section4 : (($('#section1').height() + $('#section2').height() + $('#section3').height()+ $('#section4').height()+ $('#section5').height() + $('#section6').height()+ $('#section7').height()+ $('#section8').height() + $('#section9').height()+ $('#section10').height())/2)+ 2180,
		};
	    $scope.scrollToDesktop = {
			section1 : (($('#section1').height())/2) + 650,
			section2 : (($('#section1').height() + $('#section2').height() + $('#section3').height())/2) + 650,
			section3 : (($('#section1').height() + $('#section2').height() + $('#section3').height()+ $('#section4').height()+ $('#section5').height())/2)  + 550,
			section4 : (($('#section1').height() + $('#section2').height() + $('#section3').height()+ $('#section4').height()+ $('#section5').height() + $('#section6').height() + 350)/2)+ 6900,
		};
	}

}])
.config(["snSkrollrProvider", function(snSkrollrProvider) {
  snSkrollrProvider.config = { smoothScrolling: true};
}])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$resourceProvider', '$httpProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider, $resourceProvider, $httpProvider) {
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state('app', {url:'/', templateUrl: '../app/core/main.html', abstract: true})
			.state('app.section', {url:'', template: '<app-section></app-section><app-section-fixed></app-section-fixed>'});


		$locationProvider.html5Mode(true);
		$resourceProvider.defaults.stripTrailingSlashes = false;

}])
.constant("APPLICATION_CONFIG", {
    "NAME": "ANGULAR_SLIDES"
})
.constant("API_CONFIG", {
    "BASE_URL": ""
})
.run(['$rootScope', '$location', '$window', '$state', function($rootScope, $location, $window, $state){
     $rootScope.$on('$stateChangeSuccess',
        function(event){
            if (!$window.ga)
            return;
            //$window.ga('send', 'pageview', { page: $location.path() });
    });

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {

	});

}])
.run(["snSkrollr",'deviceDetector', function(snSkrollr,deviceDetector) {
	setTimeout(function() {
		skrollrInit(snSkrollr, deviceDetector);
	}, 500);//loading
	
}]);
app.directive('burgerMenu', function($document, $timeout){
	return {
		restrict: 'E',
		link: function (s, e, a){
			s.clicked=true;
			var open = false;
			var animated = false;	
			$('.scroll-burger').on('touchstart', function() {
				animateBurger();
				TweenLite.to('#menu-burger', 0.5, {top: '-60px'});
			});
			e.bind('touchstart click', function(){
				animateBurger();
			});
			function animateBurger(){
				if(!animated){
					animated = true;
					var h = $('#section1').offset();
					var color = $('body').css('background-color');
					if(s.clicked){
						
						if(h.top > -400){
							color = 'rgb(211,45,51)';
						}
						TweenMax.to("#mov1", 0.5, {attr:{d:"M35,35 C39,39 41,41 45,45"},stroke:color });
						TweenMax.to("#mov2", 0.5, {attr:{d:"M45,45 C49,41 51,39 55,35"},stroke:color });

						TweenMax.to("#mov3", 0.5, {attr:{x1:"45", 'stroke-opacity' : "1"}});
						TweenMax.to("#mov4", 0.5, {attr:{x2:"45", 'stroke-opacity' : "1"}});

						TweenMax.to("#mov5", 0.5, {attr:{d:"M35,55 C39,51 41,49 45,45"},stroke:color});
						TweenMax.to("#mov6", 0.5, {attr:{d:"M45,45 C49,49 51,51 55,55"},stroke:color, onComplete: function(){animated=false;}});
						open = true;
						TweenLite.set('#menu-mobile',{"z-index": 19});
						TweenLite.to('#menu-mobile', 0.5, {opacity: 1});
						TweenLite.to(e, 0.5, {color: color});
					}else{
						if(h.top > -400){
							color = 'rgb(255,255,255)';
						}
						open = false;
						TweenMax.to("#mov1", 0.5, {attr:{d:"M35,38 C39,38 41,38 45,38"}, stroke : color});
						TweenMax.to("#mov2", 0.5, {attr:{d:"M45,38 C49,38 51,38 55,38"}, stroke : color});

						TweenMax.to("#mov3", 0.5, {attr:{x1:"35", stroke : color, 'stroke-opacity' : "1"}});
						TweenMax.to("#mov4", 0.5, {attr:{x2:"55", stroke : color, 'stroke-opacity' : "1"}});

						TweenMax.to("#mov5", 0.5, {attr:{d:"M35,52 C39,52 41,52 45,52"}, stroke : color});
						TweenMax.to("#mov6", 0.5, {attr:{d:"M45,52 C49,52 51,52 55,52"}, stroke : color, onComplete: function(){animated=false;}});

						TweenLite.set('#menu-mobile',{"z-index": -1});
						TweenLite.to('#menu-mobile', 0.5, {opacity: 0});
						TweenLite.to(e, 0.5, {color: "rgb(255,255,255)"});
					}
				}	
			}
		}
	};
});
app.directive('slide',function(scrollService, $document) {
	return {
		restrict : 'AE',
		link : function(s, e, a) {
			var sections = e.find("section");
			var actual = 0;
			var total = sections.length-1;
			var slideMoving = false;

			angular.forEach(sections, function(value, key) {
				var opacity = "0";
				if(key===0){
					opacity = "1";
				}
				TweenLite.set(e, {height: $(sections[key]).height()+50});
			  //	TweenLite.set(sections[key], {position: "absolute", width : "100%", left: left});
			  TweenLite.set(sections[key], {position: "absolute", width : "100%", opacity: opacity});

			});

		/*	e.bind('touchmove',function(e) {
				//var direction = scrollService.getDirectionOnTouchMove(e);
				//moveSlide(direction);
			});*/
			$('.right-arrow').bind('click', function(){
				moveSlide('right', false);
			});
			$('.left-arrow').bind('click', function(){
				moveSlide('left', false);
			});
			$('.arrow-right').bind('click', function(){
				moveSlide('right', true);
			});
			$('.arrow-left').bind('click', function(){
				moveSlide('left', true);
			});
			
			function moveSlide(direction, isMobile){
				var svg = {
					second : e[0].querySelector('.to-show-2'),
					third : e[0].querySelector('.to-show-3'),
					fourth : e[0].querySelector('.to-show-4'),
					fifth : e[0].querySelector('.to-show-5')
				};
				if(!slideMoving){
					slideMoving = true;
					var next;
					var time = 0.5;
					if(direction == "right"){
						if(actual < total){
							next = actual+1;	
						}else{
							next = 0;
						}
						
			
						//TweenLite.set(sections[next], {left: "100%"});
						//TweenLite.to(sections[next], time, {left: "0%"});
						//TweenLite.to(sections[actual], time, {left: "-120%", onComplete: function() {slideMoving = false;}});
						TweenLite.to(sections[next], time,{opacity: "1", delay: time});
						TweenLite.to(sections[actual], time,{opacity: "0", onComplete: function() {slideMoving = false;}});
						//var queryRight = e[0].querySelector('.to-show-'+ (next+1));
						//TweenLite.to(queryRight, time,{opacity: "1", delay: time});
						actual = next;
					}else if(direction == "left"){
						if(actual > 0){
							next = actual-1;	
						}else{
							next = 4;
						}
						//TweenLite.set(sections[next], {left: "-100%"});
						//TweenLite.to(sections[next], time, {left: "0%"});
						//TweenLite.to(sections[actual], time, {left: "120%", onComplete: function() {slideMoving = false;}});
						TweenLite.to(sections[next], time,{opacity: "1", delay: time});
						TweenLite.to(sections[actual], time,{opacity: "0", onComplete: function() {slideMoving = false;}});
						//var queryLeft = e[0].querySelector('.to-show-'+ (next+1));
						//TweenLite.to(queryLeft, time,{opacity: "1", delay: time});
						actual = next;
					}else{
						slideMoving = false;
					}
					if(!isMobile){
						switch(actual){
							case 1:
								TweenLite.to(svg.second, time,{opacity: "1", delay: time});
								TweenLite.to(svg.third, time,{opacity: "0", delay: time});
								TweenLite.to(svg.fourth, time,{opacity: "0", delay: time});
								TweenLite.to(svg.fifth, time,{opacity: "0", delay: time});
								break;
							case 2:
								TweenLite.to(svg.second, time,{opacity: "1", delay: time});
								TweenLite.to(svg.third, time,{opacity: "1", delay: time});
								TweenLite.to(svg.fourth, time,{opacity: "0", delay: time});
								TweenLite.to(svg.fifth, time,{opacity: "0", delay: time});
								break;
							case 3:
								TweenLite.to(svg.second, time,{opacity: "1", delay: time});
								TweenLite.to(svg.third, time,{opacity: "1", delay: time});
								TweenLite.to(svg.fourth, time,{opacity: "1", delay: time});
								TweenLite.to(svg.fifth, time,{opacity: "0", delay: time});
								break;
							case 4:
								TweenLite.to(svg.second, time,{opacity: "1", delay: time});
								TweenLite.to(svg.third, time,{opacity: "1", delay: time});
								TweenLite.to(svg.fourth, time,{opacity: "1", delay: time});
								TweenLite.to(svg.fifth, time,{opacity: "1", delay: time});
								break;
							default:
								TweenLite.to(svg.second, time,{opacity: "0", delay: time});
								TweenLite.to(svg.third, time,{opacity: "0", delay: time});
								TweenLite.to(svg.fourth, time,{opacity: "0", delay: time});
								TweenLite.to(svg.fifth, time,{opacity: "0", delay: time});
						}
					}
				}
			}
		}
	};
});
app.directive('svgContainer',['$window','svgService', function($window, svgService){
	return {
		restrict : 'AC',
		scope : {
			proportional : "@"
		},
		link : function (s, e, a){

			if(!s.proportional){
            	svgService.setSizeToSvg(e);					
			}else{
				svgService.setSizeToSvgProportional(e, s.proportional);	
			}

			angular.element($window).on('resize' , function() {
				if(!s.proportional){
	            	svgService.setSizeToSvg(e);					
				}else{
					svgService.setSizeToSvgProportional(e, s.proportional);	
				}

	        });
		},
	    templateUrl: function (e, a){
	      var templateName = "../assets/img/"+a.name+".svg";   
	      return templateName;
	    }
	};
}]);
app.directive('screenDetector', ['$window', '$document','$timeout', 'animateService','svgService', function($window, $document, $timeout, animateService, svgService){
	return {
		restrict : 'AC',
		scope: {
			type : '@',
			time : '@',
			delay : '@',
			value: '@'
		},
		link : function(s, e, a) {


		var animated = false;

		var type = s.type || "fade";
		var time = s.time || 1;
		var delay = s.delay || 0.5;
		var timeout;
		$document.bind('mousewheel DOMMouseScroll touchmove scroll', function(){
			if(!animated){
				if(inScreen()){
					animateService.animate(e, time, delay, type, s.value);
					animated = true;
				}else{
					$timeout.cancel(timeout);
					timeout = $timeout(function(){
						if(inScreen()){
							animateService.animate(e, time, delay, type, s.value);
							animated = true;
						}
					},500);
				}				
			}
		});

		function inScreen(){
			var $window = $(window);
		    var w_bottom = $window.scrollTop() + $window.height(); //distancia al top + altura del viewport = posición del bottom del content
		    var element = $(e);
		    var top = element.offset().top; //posición a top independiente del scroll
		    var height = element.height(); //su altura
		    var bottom = top + height; //parte inferior

		    return (top >= $window.scrollTop() && top < w_bottom) || 
		    	   (bottom > $window.scrollTop() && bottom <= w_bottom) ||
                   (height > $window.height() && top <= $window.scrollTop() && bottom >= w_bottom);
		}

		}
	};
}]);
app.directive('stateMenuDesktop', ['$document', function ($document){
	return {
		restrict : 'AC',
		link : function(s,e,a) {
		    var scrollStates = {
				section1 : (($('#section1').height())/2),
				section2 : (($('#section1').height() + $('#section2').height() + $('#section3').height())/2),
				section3 : (($('#section1').height() + $('#section2').height() + $('#section3').height()+ $('#section4').height()+ $('#section5').height())/2),
				section4 : (($('#section1').height() + $('#section2').height() + $('#section3').height()+ $('#section4').height()+ $('#section5').height() + $('#section6').height() + 350)/2)+ 5300,
			};
			$document.bind('mousewheel DOMMouseScroll touchmove scroll', function(){
				var scrollTop = $(document).scrollTop() / 2;
				var states = e.find("a");
				var time = 0.2;
				var actualState; 
				if(scrollStates.section2 > scrollTop+100){
					TweenLite.to(states[0], time,{opacity: "1"});
					actualState = 0;
				}else if(scrollStates.section3 > scrollTop+100){
					TweenLite.to(states[1], time,{opacity: "1"});
					actualState = 1;
				}else if(scrollStates.section4 > scrollTop+100){
					TweenLite.to(states[2], time,{opacity: "1"});
					actualState = 2;
				}else{
					TweenLite.to(states[3], time,{opacity: "1"});
					actualState = 3;
				}
				resetStates(states, actualState);
			});
			function resetStates(states, avoidState){
				angular.forEach(states, function(v, k) {
					if(avoidState != k){
						TweenLite.set(states[k], {opacity: '0.5'});
					}
				});	
			}
		}
	};
}]);
app.directive('langMenu', [ function (){
	return {
		restrict : 'E',
		link : function (s,e,a){
			var options = e.find('div');
			var hr = e.find('hr');
			var i = e.find('i');
			e.bind('touchstart click', function(){

				if($(options).css('height') == '72px'){
					TweenLite.to(options, 0.5, {ease: Back.easeIn.config(2), height: '0px', delay : 0.2 });
					TweenLite.to(hr, 0.2, { ease: Power1.easeIn, width: '0%' , delay: 0.2});
					TweenLite.to(i, 0.5, {ease: Back.easeIn.config(2), rotation:0});
				}else{
					TweenLite.to(options, 0.2, { ease: Power1.easeIn, height: '72px' });
					TweenLite.to(hr, 0.2, { ease: Power1.easeIn, width: '80%' , delay: 0.2});
					TweenLite.to(i, 0.5, {ease: Back.easeIn.config(2), rotation:180});
				}
			});
			e.on('mouseleave', function() {
					TweenLite.to(options, 0.5, {ease: Back.easeIn.config(2), height: '0px', delay : 0.2 });
					TweenLite.to(hr, 0.2, { ease: Power1.easeIn, width: '0%' , delay: 0.2});
					TweenLite.to(i, 0.5, {ease: Back.easeIn.config(2), rotation:0});
			});
		}
	};
}]);
function test(){
	 return $('#section1').height();
}
function skrollrInit(snSkrollr, deviceDetector){
	if(deviceDetector.isMobile()){
		snSkrollr.init({ //mobile   
	  	constants: {
	  		section1: function(){
	  			var h = $("#section1").offset().top;
	  			return h;
	  		},
	  		section11 : function(){
	  			var h = $("#section1").height() + $("#section2").height() + $("#section3").height() + $("#section4").height() + $("#section5").height()+ $("#section6").height()+$("#section7").height()+$("#section8").height()+$("#section9").height()+$("#section10").height(); // para que phantom no pete...
	  			
	  			/*console.log($("#section1").height());
				console.log($("#section2").height());
	  			console.log($("#section3").height());
	  			console.log($("#section4").height());
	  			console.log($("#section5").height());
	  			console.log($("#section6").height());
	  			console.log($("#section7").height());
	  			console.log($("#section8").height());
	  			console.log($("#section9").height());
	  			console.log($("#section10").height());
	  			console.log(h);*/
	  			return h+200;
	  		}
	    }});

	}else{
		snSkrollr.init({
			constants: {
				section11: function(){
					return 17000;
				}
			}
		});	
	}


}