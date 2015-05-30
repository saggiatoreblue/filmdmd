dmdApp.directive('preloadContent', function() {
    return {
        restrict: 'A',
        link: function($scope, $element, attrs) {
            $element.css({opacity: 0});
            $element.delay(700).animate({opacity: 1}, 400);

        }
    };
});