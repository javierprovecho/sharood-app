define(['directives/module'], function (directives) {
    'use strict';

    directives.directive('stars', function () {
        return {
            templateUrl: "views/templates/stars.html",
            restrict: 'E',
            replace: true,
            scope: {
                config: '='
            },
            link: function($scope, element, attrs) {
                element.on('click', function(e) {
                    if(!$scope.config.editable){
                        return false;
                    } else {
                        var starList = element.context.children;
                        var starListId = element.context.id;
                        var clickedStar = e.target.children;
                        var starIndex = clickedStar[0].dataset.index;

                        Array.prototype.forEach.call(starList, function(star, index) {
                            var checkbox = document.querySelector('#' + starListId +  ' [data-index="' + index + '"]');
                            checkbox.parentNode.classList.toggle("active", index < starIndex);
                            checkbox.checked = index < starIndex;
                        });
                    }
                });
            }
        };
    });
});