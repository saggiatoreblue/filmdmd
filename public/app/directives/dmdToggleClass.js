dmdApp.directive('toggleClass', function() {
    return {
        restrict: 'A',
        link: function($scope, $element, attrs) {
            $element.bind('click', function() {
                $element.parent().toggleClass(attrs.toggleClass);
            });
        }
    };
});