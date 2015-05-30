dmdApp.directive('fadeIn', function($timeout){
    return {
        restrict: 'A',
        link: function($scope, $element, attrs){
            $element.addClass("ng-hide-remove");
            $element.on('load', function() {
                $element.siblings('.placeholder').hide();
                $element.addClass("ng-hide-add");
            });

        }
    }
});