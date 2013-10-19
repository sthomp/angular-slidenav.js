angular.module("slidenav",[])
	.constant('CSS_CLASSES',{
		site: 'site',
		content: 'content',
		nav: 'nav',
		menuOpen: 'drawer-open'
	})
	.factory('slidenav', ['$timeout', function($timeout){

	    var state = {
	    	isOpen: false
	    }

		return {
			state: state,
			open: function(){
				$timeout(function(){
					state.isOpen = true;	
				});
				
			},
			close: function(){
				$timeout(function(){
					state.isOpen = false;	
				});
				
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
	        template: '<div class="'+ CSS_CLASSES.site + '" ng-class="{\'' + CSS_CLASSES.menuOpen + '\': slidenav.isOpen()}" ng-transclude></div>',
	        replace: true,
	        controller: ['$scope', '$timeout', 'slidenav', '$element',function($scope, $timeout, slidenav, $element){

	        	$scope.slidenav = slidenav;

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
	        template: '<nav class="' + CSS_CLASSES.nav + '" ng-transclude></nav>',
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
	        template: '<div class="' + CSS_CLASSES.content + '" ng-click="closeNav()" ng-transclude></div>',
	        replace: true,
	        controller: ['$scope', '$element', 'slidenav', function($scope, $element, slidenav){

	        	$scope.closeNav = function(){
	            	if(slidenav.isOpen()){
	            		slidenav.close();
	            	}
	            }

	        }],
	        link: function(scope, element, attrs, ctrl){
	        }
	    }
	}]);