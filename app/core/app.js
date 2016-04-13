var app = angular.module("app",['templates-dist', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'ngResource', 'sn.skrollr', 'ng.deviceDetector'])
.controller("mainController", [ '$scope', 'ArrayService', 'deviceDetector', '$document', 'scrollService', function($scope, ArrayService, deviceDetector, $document, scrollService) {

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
  snSkrollr.init({    
  	constants: {

    }});
}]);

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
				TweenLite.set(e, {height: $(sections[key]).height()});
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
					if(direction == "right"){
						if(actual < total){
							next = actual+1;	
						}else{
							next = 0;
						}
						TweenLite.set(sections[next], {left: "100%"});
						TweenLite.to(sections[next], 0.5, {left: "0%"});
						TweenLite.to(sections[actual], 0.5, {left: "-120%", onComplete: function() {slideMoving = false;}});
						actual = next;
					}else if(direction == "left"){
						if(actual > 0){
							next = actual-1;	
						}else{
							next = 2;
						}
						TweenLite.set(sections[next], {left: "-100%"});
						TweenLite.to(sections[next], 0.5, {left: "0%"});
						TweenLite.to(sections[actual], 0.5, {left: "120%", onComplete: function() {slideMoving = false;}});
						actual = next;
					}else{
						slideMoving = false;
					}
				}
			}
		}
	};
});
app.directive('screenDetector', ['$document','$timeout', 'animateService', function($document, $timeout, animateService){
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

