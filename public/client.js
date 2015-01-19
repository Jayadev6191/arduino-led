var arduino=angular.module('arduino',[]);

arduino.controller('ledController',['$scope','$filter', '$http',function($scope,$filter,$http){


	$scope.on=function(){
		console.log('on called');
		$http.post('/on','').success(function(result){
			//led on
			console.log('led on');
		}).
		error(function(data,status){
			console.log(data);
		});
	}


	$scope.off=function(){
		console.log('off called');
		$http.post('/off','').success(function(result){
			//led off
			console.log('led off');
		}).
		error(function(data,status){
			console.log(data);
		});
	}


	
	$scope.update = function(rate) {
        console.log(rate);
    };


	$scope.flicker=function(led){
		console.log(led);
		$scope.rate=led.rate;
		$http.post('/flicker',led).success(function(result){
			console.log(result);
		}).
		error(function(data,status){
			console.log(data);
		});	
	}


}]);