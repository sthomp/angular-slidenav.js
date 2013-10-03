angular.module("slidenav",[])
	.constant('CSS_CLASSES',{
		container: 'st-container',
		effect: 'st-effect',
		pusher: 'st-pusher',
		content: 'st-content',
		menu: 'st-menu',
		menuOpen: 'st-menu-open'
	})
	.factory('slidenav', ['$rootScope', '$timeout', function($rootScope, $timeout){

	    var state = {
	    	isOpen: false
	    }

		return {
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
	.directive("slidenav", ['CSS_CLASSES',function(CSS_CLASSES){
	    return {
	        restrict: "E",
	        scope: {},
	        transclude: true,
	        template: '<div class="'+ CSS_CLASSES.container + ' ' + CSS_CLASSES.effect + '" ng-transclude></div>',
	        replace: true,
	        controller: ['$rootScope', '$scope', '$timeout', 'slidenav', '$element',function($rootScope, $scope, $timeout, slidenav, $element){

	        	$rootScope.$on("slidenav:open", function(_, msg){
	                $element.addClass(CSS_CLASSES.menuOpen);
	            });

	            $rootScope.$on("slidenav:close", function(_, msg){
	                $element.removeClass(CSS_CLASSES.menuOpen);
	            });
	            

	            $scope.init = function(containerElement){
	            	$scope.model.containerElement = containerElement;
	            }
	        }],
	        link: function(scope, element, attrs){
	        }
	    }
	}])
	.directive("slidenavMenu", ['CSS_CLASSES', function(CSS_CLASSES){
	    return {
	        restrict: "E",
	        transclude: true,
	        scope: {},	
	        template: '<div class="' + CSS_CLASSES.menu + ' ' + CSS_CLASSES.effect + '" ng-transclude></div>',
	        replace: true,
	        controller: ['$scope',function($scope){
	        }],
	        link: function(scope, element, attrs){
	        }
	    }
	}])
	.directive("slidenavContent", ['slidenav', 'CSS_CLASSES', function(slidenav, CSS_CLASSES){
	    return {
	        restrict: "E",
	        transclude: true,
	        scope: {},
	        template: '<div class="' + CSS_CLASSES.pusher + '" ng-click="pusherClick($event)"><div class="' + CSS_CLASSES.content + '" ng-transclude></div></div>',
	        replace: true,
	        controller: ['$rootScope', '$scope', '$timeout',function($rootScope, $scope, $timeout){

	        	$scope.pusherClick = function(event){
	            	if(slidenav.isOpen()){
	            		slidenav.close();
	            	}
	            }

	        }],
	        link: function(scope, element, attrs, ctrl){
	        }
	    }
	}]);