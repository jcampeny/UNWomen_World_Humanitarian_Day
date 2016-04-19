var app = angular.module("app",['templates-dist', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'ngResource', 'sn.skrollr', 'ng.deviceDetector'])
.controller("mainController", [ '$scope', 'ArrayService', 'deviceDetector', '$document', 'scrollService','snSkrollr','$window', function($scope, ArrayService, deviceDetector, $document, scrollService, snSkrollr, $window) {

	angular.element($window).on('resize' , function() {
		snSkrollr.destroy();
		skrollrInit(snSkrollr);
	});

	$document.bind('mousewheel DOMMouseScroll touchmove scroll touchstart touchmove touchcancel touchend', function(e){
		var direction = scrollService.getDirectionOnTouchMove(e);
		if(direction == "right" || direction == "left"){
			e.preventDefault();
		}
	});

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
.run(["snSkrollr", function(snSkrollr) {
	skrollrInit(snSkrollr);
}]);
app.directive('burgerMenu', function(){
	return {
		restrict: 'E',
		link: function (s, e, a){
			s.clicked=true;
			var animated = false;	
			e.bind('touchstart click', function(){
				if(!animated){
					animated = true;
					if(s.clicked){
						TweenLite.set('#menu-mobile',{"z-index": 19});
						TweenLite.to('#menu-mobile', 0.5, {opacity: 1});
						TweenLite.to(e, 0.5, {color: "rgb(211,45,51)"});
						TweenLite.to('.line1', 0.5, {rotation: 45, transformOrigin:"left 50%", left: "39%", top: "29%"});
						TweenLite.to('.line2', 0.5, {rotationY: 90, top: "47%", left: "38%"});
						TweenLite.to('.line3', 0.5, {rotation: -45,left: "33%", top: "47%", onComplete: function(){animated=false;}});					
					}else{
						TweenLite.set('#menu-mobile',{"z-index": -1});
						TweenLite.to('#menu-mobile', 0.5, {opacity: 0});
						TweenLite.to(e, 0.5, {color: "rgb(255,255,255)"});
						TweenLite.to('.line1', 0.5, {rotation: 0, transformOrigin:"0", left: "35%", top: "36%"});
						TweenLite.to('.line2', 0.5, {rotationY: 0, top: "48%", left: "35%"});
						TweenLite.to('.line3', 0.5, {rotation: 0,left: "35%", top: "60%", onComplete: function(){animated=false;}});	
					}
					}	
			});
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
				var left = "100%";
				if(key===0){
					left = "0%";
				}
				TweenLite.set(e, {height: $(sections[key]).height()+50});
			  	TweenLite.set(sections[key], {position: "absolute", width : "100%", left: left});

			});

			e.bind('touchmove',function(e) {
				var direction = scrollService.getDirectionOnTouchMove(e);
				moveSlide(direction);
			});

			function moveSlide(direction){
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
						TweenLite.set(sections[next], {left: "100%"});
						TweenLite.to(sections[next], time, {left: "0%"});
						TweenLite.to(sections[actual], time, {left: "-120%", onComplete: function() {slideMoving = false;}});
						actual = next;
					}else if(direction == "left"){
						if(actual > 0){
							next = actual-1;	
						}else{
							next = 2;
						}
						TweenLite.set(sections[next], {left: "-100%"});
						TweenLite.to(sections[next], time, {left: "0%"});
						TweenLite.to(sections[actual], time, {left: "120%", onComplete: function() {slideMoving = false;}});
						actual = next;
					}else{
						slideMoving = false;
					}
				}
			}
		}
	};
});
app.directive('svgContainer',['$window','svgService', function($window, svgService){
	return {
		restrict : 'AC',
		link : function (s, e, a){

			svgService.setSizeToSvg(e);

			angular.element($window).on('resize' , function() {
	            svgService.setSizeToSvg(e);
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

		TweenLite.set(e,{opacity: 0});//

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

function skrollrInit(snSkrollr){
	snSkrollr.init({    
  	constants: {
  		section1: function(){
  			console.log($("#section1"));
  			var h = $("#section1").offset().top;
  			return h;
  		},
  		section11 : function(){
  			var h = $("#section1").height() + $("#section2").height() + $("#section3").height() + $("#section4").height() + $("#section5").height()+ $("#section6").height()+$("#section7").height()+$("#section8").height()+$("#section9").height()+$("#section10").height(); // para que phantom no pete...
  			return h+310;
  		}
    }});
}