(function () {
    'use strict';

    angular
        .module('directives')
        .directive('setHeight', function ($window) {
            return {
                link: function (scope, element, attrs) {
                    element.css('height', $window.innerHeight * attrs.setHeight + 'px');
                }
            }
        })


})();