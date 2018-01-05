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
                    lat: "=lat",
                    lng: "=lng"
                },

                link: function (scope, element, attr, ctrl) {

                    $timeout(function () {
                        //options for autocomplete
                        var opts
                        var watchEnter = false
                        //convert options provided to opts
                        var initOpts = function () {

                            opts = {}
                            if (scope.options) {

                                if (scope.options.watchEnter !== true) {
                                    watchEnter = false
                                } else {
                                    watchEnter = true
                                }

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
                        }

                        if (scope.gPlace === undefined) {
                            scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
                        }

                        google.maps.event.addListener(scope.gPlace, 'place_changed', function () {

                            var result = scope.gPlace.getPlace();

                            if (result !== undefined) {

                                if (result.address_components !== undefined) {
                                    ctrl.$setValidity('notexists', false);

                                    attr.$set('lat', result.geometry.location.lat());
                                    attr.$set('lng', result.geometry.location.lng());

                                    scope.$apply(function () {

                                        scope.details = result;

                                        ctrl.$setViewValue(element.val());
                                    });
                                }
                                else {
                                    ctrl.$setValidity('notexists', true);
                                    if (watchEnter) {
                                        getPlace(result)
                                    }
                                }
                            }
                        })

                        var getPlace = function (result) {
                            var autocompleteService = new google.maps.places.AutocompleteService();
                            if (result.name.length > 0) {
                                autocompleteService.getPlacePredictions(
                                    {
                                        input: result.name,
                                        offset: result.name.length
                                    },
                                    function listentoresult(list, status) {
                                        if (list === null || list.length === 0) {

                                            scope.$apply(function () {
                                                scope.details = null;
                                            });

                                        } else {
                                            var placesService = new google.maps.places.PlacesService(element[0]);
                                            placesService.getDetails(
                                                { 'reference': list[0].reference },
                                                function detailsresult(detailsResult, placesServiceStatus) {

                                                    if (placesServiceStatus === google.maps.GeocoderStatus.OK) {
                                                        scope.$apply(function () {

                                                            ctrl.$setViewValue(detailsResult.formatted_address);
                                                            element.val(detailsResult.formatted_address);

                                                            scope.details = detailsResult;

                                                            var watchFocusOut = element.on('focusout', function (event) {
                                                                element.val(detailsResult.formatted_address);
                                                                element.unbind('focusout')
                                                            })

                                                        });
                                                    }
                                                }
                                            );
                                        }
                                    });
                            }
                        }

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

                    },1000);   
                 
                }
            };
        })


})();