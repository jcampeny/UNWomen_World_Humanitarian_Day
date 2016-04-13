
angular.module('app').service("animateService", [function( ) {
	    return({
			animate : animate
		});

		function animate(e, time, delay, type, value){
			switch(type){
				case "fade":
					fade(e, time, delay);
					break;
				case "number":
					number(e, time, delay, value);
					break;
				default:
					fade(e, time, delay);
			}
	    }
	    function fade(e, time, delay){
	    	TweenLite.to(e,time,{opacity: 1, delay:delay});
	    }
	    function number(e, time, delay, value){
	    	TweenLite.to(e,time,{opacity: 1, delay:delay});
	    	var numberToReach = parseInt(value);
	    	var counter = { var: 0 };
			TweenMax.to(counter, 3, {
			    var:numberToReach, 
			    onUpdate: function () {
			    	$(e).text(numberWithCommas(Math.ceil(counter.var)));
			      },
			      ease:Circ.easeInOut
			  });
	    }
	    function numberWithCommas(x) {
		    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}]);
