var app = angular.module("myapp",['slidenav']);

app.controller('myctrl',['$scope', 'slidenav',function($scope, slidenav){
	$scope.openNav = function(){
		slidenav.open();
	}
}]);

app.controller('navctrl',['$scope', 'slidenav',function($scope, slidenav){
	$scope.close = function(){
		slidenav.close();
	}
}]);