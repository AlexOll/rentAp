angular.module('myApp.newoffer', [])
    .controller('newOfferCtrl', ['$rootScope', '$scope', 'toastr', 'MapUtility', 'CookieUtility', 'DictionaryService', 'AnchorSmoothScrollService', '$timeout', 'OfferService', '$location', 'LockerUtility',
        function ($rootScope, $scope, toastr, MapUtility, CookieUtility, DictionaryService, AnchorSmoothScrollService, $timeout, OfferService, $location, LockerUtility) {

            $scope.offerType = {};
            $scope.offerType.availableOptions = [];
            $scope.propertyType = {};
            $scope.propertyType.availableOptions = [];

            var search = CookieUtility.GetByName('search');

            if (search.geoResult) {
                $scope.city = search.geoResult.city;
                $scope.geoResult = search.geoResult;
            }

            DictionaryService.GetOfferTypes(function (response) {

                angular.forEach(response.data, function (value, key) {
                    $scope.offerType.availableOptions.push({ "id": key, "name": value });
                });
                $scope.offerType.model = search.offerType || $scope.offerType.availableOptions[0].id;
            });

            DictionaryService.GetPropertiesTypes(function (response) {

                angular.forEach(response.data, function (value, key) {
                    $scope.propertyType.availableOptions.push({ "id": key, "name": value });
                });
            });

            $scope.uploadedImages = [];
            $scope.$watch('newImage', function (scope) {

                if ($scope.newImage) {
                    if ($scope.uploadedImages.length >= $rootScope.photoUploadLimit)
                        toastr.info('Not more than ' + $rootScope.photoUploadLimit + ' photos', 'Photo limit');
                    else {
                        var isExist = true;
                        $scope.uploadedImages.forEach(function (image) {
                            if (image.dataURL === $scope.newImage.dataURL)
                                isExist = false;
                        })
                        if (isExist)
                            $scope.uploadedImages.push($scope.newImage);
                    }
                }
            })

            $scope.deletePhoto = function (image) {
                var index = $scope.uploadedImages.indexOf(image);
                $scope.uploadedImages.splice(index, 1);
            }

            $scope.setMainPhoto = function (image) {
                var index = $scope.uploadedImages.indexOf(image);
                if (index !== 0) {
                    $scope.uploadedImages.splice(index, 1);
                    $scope.uploadedImages.unshift(image);
                }
            }

            if (search.geoResult) {
                let _location = [{ lat: search.geoResult.lat, lng: search.geoResult.lng }]
                MapUtility.CreateMap(
                    _location[0].lat,
                    _location[0].lng,
                    _location)
            }
            else {
                var UkraineCoordinates = { lat: 48.3794, lng: 31.1656 };

                MapUtility.CreateMap(
                    UkraineCoordinates.lat,
                    UkraineCoordinates.lng,
                    [],
                    5);
            }

            $scope.$watch('geoResult', function () {
                if ($scope.geoResult) {
                    let _location = [{
                        lat: $scope.geoResult.lat || $scope.geoResult.geometry.location.lat(),
                        lng: $scope.geoResult.lng || $scope.geoResult.geometry.location.lng(),
                    }]

                    MapUtility.CreateMap(
                        _location[0].lat,
                        _location[0].lng,
                        _location);
                }
            })


            function CheckDublicateImages() {

                let imgSources = [];

                $scope.uploadedImages.forEach(function (image) {

                    var isChecked = dublicateImages.indexOf(image.dataURL);
                    if (isChecked === -1)
                        imgSources.push(image.dataURL);
                })
                if (imgSources.length > 0)
                    OfferService.CheckIfImgsExist(imgSources, function (response) {

                        if (response.data.length) {
                            let index = 0;
                            $scope.uploadedImages.forEach(function (image) {
                                if (response.data.indexOf(image.dataURL) !== -1) {
                                    toastr.warning('Image was allready uploaded!', 'Warning!');
                                    $scope.uploadedImages.splice(index, 1);
                                }
                                index++;
                            })

                        }
                    });
            }


            var dublicateImages = [];
            $scope.$watchCollection('uploadedImages', function (image) {

                LockerUtility.runLockedFunc(CheckDublicateImages)
            })

            $scope.addOffer = function () {

                let offer = {};
                offer.userId = $rootScope.globals.currentUser.id
                offer.offerType = $scope.offerType.model;
                offer.address = $scope.city;
                offer.lat = $scope.geoResult.lat || $scope.geoResult.geometry.location.lat();
                offer.lng = $scope.geoResult.lng || $scope.geoResult.geometry.location.lng();
                offer.propertyType = $scope.propertyType.model;
                offer.price = $scope.price;
                offer.photoURLs = getDataURLS();

                offer.roomsQuantity = $scope.roomsQuantity;
                offer.floorNumber = $scope.floorNumber;
                offer.area = $scope.area;
                offer.payments = $scope.payments;
                offer.availableFrom = $scope.form.availableFrom.$viewValue;
                offer.availableTill = $scope.form.availableTill.$viewValue;
                offer.withFurniture = $scope.withFurniture;
                offer.withBalcony = $scope.withBalcony;
                offer.withParking = $scope.withParking;
                offer.allowPets = $scope.allowPets;
                offer.allowChildren = $scope.allowChildren;
                offer.description = $scope.description;

                OfferService.Create(offer, function (response) {
                    toastr.success('After moderating it will be posted', 'Offer created')
                    $location.path('/profile');
                });
            }
            function getDataURLS() {
                let dataURLs = [];
                $scope.uploadedImages.forEach(function (image) {
                    dataURLs.push(image.dataURL);
                });
                return dataURLs;
            }
        }]);