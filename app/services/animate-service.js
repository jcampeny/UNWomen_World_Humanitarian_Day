
angular.module('app').service("animateService", [function( ) {
	    return({
			animate : animate
		});

		function animate(e, time, delay, type, value){
			switch(type){
				case "fade":
					fade(e, time, delay, value);
					break;
				case "number":
					number(e, time, delay, value);
					break;
				default:
					fade(e, time, delay);
			}
	    }
	    function fade(e, time, delay, value){
	    	switch(value){
	    		case "right":
	    			TweenLite.fromTo(e,time,{opacity: 0, left: "-30px"},{opacity: 1,left: "0px", delay:delay});
	    			break;
	    		default:
	    			TweenLite.to(e,time,{opacity: 1, delay:delay});
	    	}
	    	
	    }
	    function number(e, time, delay, value){
	    	TweenLite.to(e,time,{opacity: 1, delay:delay});
	    	var numberToReach = parseFloat(value);
	    	var show;
	    	var counter = { var: 0 };
	    	if(((numberToReach%1) !== 0 ) || numberToReach < 10){
				show = function() {
					$(e).text(numberWithCommas(Math.round(counter.var * 10) / 10));
				};
	    	}else {
	    		show = function() {
					$(e).text(numberWithCommas(Math.ceil(counter.var)));
				};
	    	}
			TweenMax.to(counter, time, {
			    var:numberToReach, 
			    onUpdate: show,
			    ease:Circ.easeOut
			  });
	    }
	    function numberWithCommas(x) {
		    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}]);
