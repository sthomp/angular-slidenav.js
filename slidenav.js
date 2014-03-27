angular.module("slidenav",[])
  .constant('stSlideNavCssClasses',{
    site: 'st-site',
    content: 'st-content',
    contentOverlay: 'st-content-overlay',
    nav: 'st-nav',
    menuOpen: 'st-drawer-open'
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
      },
      toggle: function() {
        $timeout(function(){
          state.isOpen = !state.isOpen;
        });
      }
    }
  }])
  .directive("slidenav", ['stSlideNavCssClasses',function(stSlideNavCssClasses){
      return {
          restrict: "E",
          scope: {},
          transclude: true,
          template: '<div class="'+ stSlideNavCssClasses.site + '" ng-class="{\'' + stSlideNavCssClasses.menuOpen + '\': slidenav.isOpen()}" ng-transclude></div>',
          replace: true,
          controller: ['$scope', '$timeout', 'slidenav', '$element',function($scope, $timeout, slidenav, $element){

            $scope.slidenav = slidenav;

          }],
          link: function(scope, element, attrs){
          }
      }
  }])
  .directive("slidenavMenu", ['stSlideNavCssClasses', function(stSlideNavCssClasses){
      return {
          restrict: "E",
          transclude: true,
          scope: {},  
          template: '<nav class="' + stSlideNavCssClasses.nav + '" ng-transclude></nav>',
          replace: true,
          controller: ['$scope',function($scope){
            
          }],
          link: function(scope, element, attrs){
          }
      }
  }])
  .directive("slidenavContent", ['slidenav', 'stSlideNavCssClasses', function(slidenav, stSlideNavCssClasses){
      return {
          restrict: "E",
          transclude: true,
          scope: {},
          template: '<div><div class="' + stSlideNavCssClasses.contentOverlay + '" ng-click="closeNav()"></div><div class="' + stSlideNavCssClasses.content + '" ng-transclude></div></div>',
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
