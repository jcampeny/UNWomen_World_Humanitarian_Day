angular.module('app').service("preloader",[ '$q', function($q) {

    return {
        preload : preload
    };
    function loadImg(img) {
        var defered = $q.defer();
        var promise = defered.promise;
        img.addEventListener('load', function() {
            defered.resolve({value : 1});
        });
//modificar valores si queremos % en el loaging
        return promise;
    }
    function preload(images) {
        var defered = $q.defer();
        var promise = defered.promise;
        var imgsLoadeds = [];
        if(typeof images == "object"){
            angular.forEach(images, function(value, key) {
                var image = new Image();
                image.src = value;
                if(!image.complete){
                    imgsLoadeds[key] = loadImg(image);
                }
            });
            $q.all(imgsLoadeds).then(function(){
                defered.resolve();
            });   
        } 
        return promise;
    }
}]);
