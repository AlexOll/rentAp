(function () {
    'use strict';

    angular
        .module('directives')
        .directive('ngAutocomplete', function ($timeout) {
            return {
                require: 'ngModel',
                scope: {
                    ngModel: '=',
                    options: '=?',
                    details: '=?',
                    geoResult: '=',
                    lat: "=",
                    lng: "="
                },

                link: function (scope, element, attr, ctrl) {

                    $timeout(function () {

                        var initOpts = function () {

                            var opts = {}
                            scope.options = {
                                country: 'ukr'
                            };

                            if (scope.options.types) {
                                opts.types = []
                                opts.types.push(scope.options.types)
                                scope.gPlace.setTypes(opts.types)
                            } else {
                                scope.gPlace.setTypes([])
                            }

                            if (scope.options.bounds) {
                                opts.bounds = scope.options.bounds
                                scope.gPlace.setBounds(opts.bounds)
                            } else {
                                scope.gPlace.setBounds(null)
                            }

                            if (scope.options.country) {
                                opts.componentRestrictions = {
                                    country: scope.options.country
                                }
                                scope.gPlace.setComponentRestrictions(opts.componentRestrictions)
                            } else {
                                scope.gPlace.setComponentRestrictions(null)
                            }
                        }

                        if (scope.gPlace === undefined) {
                            scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
                        }

                        google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                            scope.geoResult = null;
                            var result = scope.gPlace.getPlace();

                            if (result !== undefined) {
                                if (result.address_components !== undefined) {
                                    ctrl.$setValidity('notexists', true);
                                    scope.details = result;
                                    scope.geoResult = result;
                                    scope.ngModel = result.formatted_address;
                                    ctrl.$setViewValue(element.val())
                                }
                                else {
                                    ctrl.$setValidity('notexists', false);
                                }
                            }
                            scope.$apply();
                        })


                        ctrl.$render = function () {
                            var location = ctrl.$viewValue;
                            element.val(location);
                        };

                        scope.watchOptions = function () {
                            return scope.options
                        };

                        scope.$watch(scope.watchOptions, function () {
                            initOpts()
                        }, true);

                    }, 1000);

                    element.bind('blur', function () {
                        google.maps.event.trigger(scope.gPlace, 'place_changed');
                    });
                }
            };
        })


})();