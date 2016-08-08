app.directive('buttonbar', function () {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/buttonbar/buttonbar.html',
        link: function ($scope) {
            $scope.buttons = [
                {note: "c", color: "#ffffff"},
                {note: "d", color: "#ffeeee"},
                {note: "e", color: "#eeffff"},
                {note: "f", color: "#eeffee"},
                {note: "g", color: "#ffeeff"},
                {note: "a", color: "#eeeeff"},
                {note: "b", color: "#ffffee"},
            ];
            $scope.onTouch = function(color) {
                console.log(color);
            }
        }

    };

});
