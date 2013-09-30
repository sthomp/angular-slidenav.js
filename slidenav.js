angular.module("slidenav",[])
	.factory('slidenav', ['$rootScope', '$timeout', function($rootScope, $timeout){

	    var state = {
	    	isOpen: false
	    }

		return {
			state: state,
			open: function(){
				$rootScope.$emit("slidenav:open", "test");
				$timeout(function(){
					state.isOpen = true;
				}, 500);	// Timeout is set to be the CSS transition time
			},
			close: function(){
				$rootScope.$emit("slidenav:close", "test");
				$timeout(function(){
					state.isOpen = false;
				}, 500);	// Timeout is set to be the CSS transition time
			},
			isOpen: function(){
				return state.isOpen;
			}
		}
	}])
	.directive("slidenav", ['$compile' ,function($compile){
	    return {
	        restrict: "E",
	        scope: {},
	        transclude: true,
	        template: '<div id="st-container" class="st-container st-effect-2" ng-transclude></div>',
	        replace: true,
	        controller: ['$rootScope', '$scope', '$timeout', 'slidenav', '$element',function($rootScope, $scope, $timeout, slidenav, $element){

	        	$rootScope.$on("slidenav:open", function(_, msg){
	                $element.addClass('st-menu-open');
	            });

	            $rootScope.$on("slidenav:close", function(_, msg){
	                $element.removeClass('st-menu-open');
	            });
	            

	            $scope.init = function(containerElement){
	            	$scope.model.containerElement = containerElement;
	            }
	        }],
	        link: function(scope, element, attrs){
	        }
	    }
	}])
	.directive("slidenavNav", [function(){
	    return {
	        restrict: "E",
	        transclude: true,
	        scope: {},
	        template: '<nav class="st-menu st-effect-2" ng-transclude></nav>',
	        replace: true,
	        controller: ['$scope',function($scope){
	        }],
	        link: function(scope, element, attrs){
	        }
	    }
	}])
	.directive("slidenavContent", ['$compile', 'slidenav', function($compile, slidenav){
	    return {
	        restrict: "E",
	        transclude: true,
	        scope: {},
	        template: '<div class="st-pusher" ng-click="pusherClick($event)"><div class="st-content"><div class="st-content-inner" ng-transclude></div></div></div>',
	        replace: true,
	        controller: ['$rootScope', '$scope', '$timeout',function($rootScope, $scope, $timeout){

	        	$scope.pusherClick = function(event){
	            	if(slidenav.state.isOpen){
	            		slidenav.close();
	            	}
	            }

	        }],
	        link: function(scope, element, attrs, ctrl){
	        }
	    }
	}]);