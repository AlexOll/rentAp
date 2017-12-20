angular
    .module('directives', [])
    .directive('uniqueField', ['$http', '$rootScope', function ($http, $rootScope) {
        var toId;
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                scope.$watch(attr.ngModel, function (inputValue) {
                    if (toId) clearTimeout(toId);

                    toId = setTimeout(function () {
                        ctrl.$setValidity('duplicate', true);
                        if (inputValue === $rootScope.globals.currentUser.phonenumber) {
                            return;
                        }
                        if (inputValue && !ctrl.$error.pattern) {

                            var url = '';
                            if (attr.id === "phonenumber")
                                url = '/api/user/phonenumbercheck'
                            else if (attr.id === "email")
                                url = '/api/user/emailcheck'

                            $http.get(url, { params: { value: inputValue } })
                                .then(function (response) {
                                    if (response.data) {
                                        ctrl.$setValidity('duplicate', false);
                                    }
                                    else {
                                        ctrl.$setValidity('duplicate', true);
                                    }
                                });
                        }
                    }, 500);
                })
            }
        }
    }])
    .directive('ngAutocomplete', function () {
        return {
            require: 'ngModel',
            scope: {
                ngModel: '=',
                options: '=?',
                details: '=?',
                placeid: "=placeid"
            },

            link: function (scope, element, attr, ctrl) {

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

                if (scope.gPlace == undefined) {
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
                }
                google.maps.event.addListener(scope.gPlace, 'place_changed', function () {

                    var result = scope.gPlace.getPlace();
                    attr.$set('placeid', result.place_id);
                    if (result !== undefined) {
                        if (result.address_components !== undefined) {
                            ctrl.$setValidity('notexists', false);

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

                //function to get retrieve the autocompletes first result using the AutocompleteService 
                var getPlace = function (result) {
                    var autocompleteService = new google.maps.places.AutocompleteService();
                    if (result.name.length > 0) {
                        autocompleteService.getPlacePredictions(
                            {
                                input: result.name,
                                offset: result.name.length
                            },
                            function listentoresult(list, status) {
                                if (list == null || list.length == 0) {

                                    scope.$apply(function () {
                                        scope.details = null;
                                    });

                                } else {
                                    var placesService = new google.maps.places.PlacesService(element[0]);
                                    placesService.getDetails(
                                        { 'reference': list[0].reference },
                                        function detailsresult(detailsResult, placesServiceStatus) {

                                            if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
                                                scope.$apply(function () {

                                                    ctrl.$setViewValue(detailsResult.formatted_address);
                                                    element.val(detailsResult.formatted_address);

                                                    scope.details = detailsResult;

                                                    //on focusout the value reverts, need to set it again.
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

                //watch options provided to directive
                scope.watchOptions = function () {
                    return scope.options
                };
                scope.$watch(scope.watchOptions, function () {
                    initOpts()
                }, true);

            }
        };
    })
    .directive('setHeight', function ($window) {
        return {
            link: function (scope, element, attrs) {
                element.css('height', $window.innerHeight * 0.6 + 'px');
            }
        }
    })
    .directive('ngImageCompress', ['$q', '$rootScope', function ($q, $rootScope) {


            var URL = window.URL || window.webkitURL;

            var getResizeArea = function() {
                var resizeAreaId = 'fileupload-resize-area';

                var resizeArea = document.getElementById(resizeAreaId);

                if (!resizeArea) {
                    resizeArea = document.createElement('canvas');
                    resizeArea.id = resizeAreaId;
                    resizeArea.style.visibility = 'hidden';
                    document.body.appendChild(resizeArea);
                }

                return resizeArea;
            };

            /**
             * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
             * @param {Image} sourceImgObj The source Image Object
             * @param {Integer} quality The output quality of Image Object
             * @return {Image} result_image_obj The compressed Image Object
             */

            var jicCompress = function(sourceImgObj, options) {
                var outputFormat = options.resizeType;
                var quality = options.resizeQuality * 100 || 70;
                var mimeType = 'image/jpeg';
                if (outputFormat !== undefined && outputFormat === 'png') {
                    mimeType = 'image/png';
                }


                var maxHeight = options.resizeMaxHeight || 300;
                var maxWidth = options.resizeMaxWidth || 250;

                var height = sourceImgObj.height;
                var width = sourceImgObj.width;

                // calculate the width and height, constraining the proportions
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round(height *= maxWidth / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round(width *= maxHeight / height);
                        height = maxHeight;
                    }
                }

                var cvs = document.createElement('canvas');
                cvs.width = width; //sourceImgObj.naturalWidth;
                cvs.height = height; //sourceImgObj.naturalHeight;
                var ctx = cvs.getContext('2d').drawImage(sourceImgObj, 0, 0, width, height);
                var newImageData = cvs.toDataURL(mimeType, quality / 100);
                var resultImageObj = new Image();
                resultImageObj.src = newImageData;
                return resultImageObj.src;

            };

            var createImage = function(url, callback) {
                var image = new Image();
                image.onload = function() {
                    callback(image);
                };
                image.src = url;
            };

            var fileToDataURL = function(file) {
                var deferred = $q.defer();
                var reader = new FileReader();
                reader.onload = function(e) {
                    deferred.resolve(e.target.result);
                };
                reader.readAsDataURL(file);
                return deferred.promise;
            };


            return {
                restrict: 'A',
                scope: {
                    //image: '=',
                    resizeMaxHeight: '@?',
                    resizeMaxWidth: '@?',
                    resizeQuality: '@?',
                    resizeType: '@?'
                },
                link: function (scope, element, attrs) {
                    var doResizing = function(imageResult, callback) {
                        createImage(imageResult.url, function(image) {
                            var dataURLcompressed = jicCompress(image, scope);
                            imageResult.compressed = {
                                dataURL: dataURLcompressed,
                                type: dataURLcompressed.match(/:(.+\/.+);/)[1]
                            };
                            callback(imageResult);
                        });
                    };

                    var applyScope = function(imageResult) {
                        scope.$apply(function() {
                            if (attrs.multiple) {
                                //scope.image.push(imageResult);
                            } else {
                                $rootScope.globals.currentUser.profileImageURL = imageResult.compressed.dataURL;
                                //scope.image = imageResult;
                            }
                        });
                    };


                    element.bind('change', function(evt) {
                        //when multiple always return an array of images
                        if (attrs.multiple) {
                            scope.image = [];
                        }

                        var files = evt.target.files;
                        for (var i = 0; i < files.length; i++) {
                            //create a result object for each file in files
                            var imageResult = {
                                file: files[i],
                                url: URL.createObjectURL(files[i])
                            };

                            fileToDataURL(files[i]).then(function(dataURL) {
                                imageResult.dataURL = dataURL;
                            });

                            if (scope.resizeMaxHeight || scope.resizeMaxWidth) { //resize image
                                doResizing(imageResult, function(imageResult) {
                                    applyScope(imageResult);
                                });
                            } else { //no resizing
                                applyScope(imageResult);
                            }
                        }
                    });
                }
            };
        }
    ]);