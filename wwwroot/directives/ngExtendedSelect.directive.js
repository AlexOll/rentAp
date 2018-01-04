(function () {
    'use strict';

    angular
        .module('directives')
        .directive('ngExtendedSelect', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, elem, attr, ctrl) {
                    $timeout(function () {
                        jQuery(elem).children().mousedown(function (e) {
                            e.preventDefault();
                            $(this).toggleClass('selected');
                            $(this).prop('selected', !$(this).prop('selected'));
                            $(this).parent().focus();
                            $(this).trigger('change');
                        });
                    }, 0);
                }
            }
        })
})();