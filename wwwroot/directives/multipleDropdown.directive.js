(function () {
    'use strict';

    angular
        .module('directives')
        .directive('multipleDropdown', function ($window) {
            return {
                scope: {
                    data: '=data',
                    sign: '=sign'
                },

                template:
                '<dl class="dropdown">' +
                '<dt>' +
                '<span>{{ data.model.length > 0 ? "Selected - " + data.model.length : "&lt;" +sign+ "&gt;" }}</span>' +
                '</dt>' +
                '<dd>' +
                '<div class="mutliSelect">' +
                '<ul>' +
                '<li ng-repeat="opt in data.availableOptions" ng-click="choosePropertyType(opt)">' +
                '<md-checkbox ng-checked="data.model.indexOf(opt.id) >= 0"> {{ opt.name }} </md-checkbox>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '</dd>' +
                '</dl>',

                restrict: 'A',
                link: function (scope, elem, attr, ctrl) {

                    scope.choosePropertyType = function (opt) {
                        var index = scope.data.model.indexOf(opt.id);
                        if (index >= 0)
                            scope.data.model.splice(index, 1);
                        else
                            scope.data.model.push(opt.id)
                    }

                    $(".dropdown dt").on('click', function () {
                        $(".dropdown dd ul").slideToggle('fast');
                    });

                    $(".dropdown dd ul li").on('click', function () {
                        $(".dropdown dd ul").hide();
                    });

                    $(document).bind('click', function (e) {
                        var $clicked = $(e.target);
                        if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
                    });
                }
            }
        })
})();