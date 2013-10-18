angular.module("slidenav",[])
	.constant('CSS_CLASSES',{
		site: 'site',
		content: 'container',
		contentOverlay: 'site-nav-overlay',
		navContainer: 'site-nav-scrollable-container',
		nav: 'site-nav',
		menuOpen: 'site-nav-drawer-open'
	})
	.factory('slidenav', ['$rootScope', '$timeout', function($rootScope, $timeout){

	    var state = {
	    	isOpen: false
	    }

		return {
			open: function(){
				$rootScope.$emit("slidenav:open", "");
				state.isOpen = true;
			},
			close: function(){
				$rootScope.$emit("slidenav:close", "");
				state.isOpen = false;
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
	        template: '<div class="'+ CSS_CLASSES.site + '" ng-transclude></div>',
	        replace: true,
	        controller: ['$rootScope', '$scope', '$timeout', 'slidenav', '$element',function($rootScope, $scope, $timeout, slidenav, $element){

	        	$rootScope.$on("slidenav:open", function(_, msg){
	                $element.addClass(CSS_CLASSES.menuOpen);
	            });

	            $rootScope.$on("slidenav:close", function(_, msg){
	                $element.removeClass(CSS_CLASSES.menuOpen);
	            });

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
	        template: '<nav class="' + CSS_CLASSES.nav + '"><div class="' + CSS_CLASSES.navContainer + '" ng-transclude></div></nav>',
	        replace: true,
	        controller: ['$scope','slidenav',function($scope,slidenav){
	        	$scope.slidenav = slidenav;
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
	        template: '<div><div class="' + CSS_CLASSES.contentOverlay + '" ng-click="pusherClick($event)"></div><div class="' + CSS_CLASSES.content + '" ng-transclude></div></div>',
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