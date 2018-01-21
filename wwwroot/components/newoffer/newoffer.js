angular.module('myApp.newoffer', [])
    .controller('newOfferCtrl', ['$rootScope', '$scope', 'toastr', 'MapUtility', 'CookieUtility', 'DictionaryService', 'AnchorSmoothScrollService', '$timeout',
        function ($rootScope, $scope, toastr, MapUtility, CookieUtility, DictionaryService, AnchorSmoothScrollService, $timeout) {

            $scope.serviceType = {};
            $scope.serviceType.availableOptions = [];
            $scope.propertyType = {};
            $scope.propertyType.availableOptions = [];

            var search = CookieUtility.GetByName('search');
            $scope.city = search.geoResult == null ? "" : search.geoResult.city;
            $scope.geoResult = search.geoResult;

            DictionaryService.GetServiceTypes(function (response) {

                angular.forEach(response.data, function (value, key) {
                    $scope.serviceType.availableOptions.push({ "id": key, "name": value });
                });
                $scope.serviceType.model = search.serviceType || $scope.serviceType.availableOptions[0].id;
            });

            DictionaryService.GetPropertiesTypes(function (response) {

                angular.forEach(response.data, function (value, key) {
                    $scope.propertyType.availableOptions.push({ "id": key, "name": value });
                });
            });

            $scope.uploadedImages = [];
            $scope.$watch('newImage', function (scope) {
                if ($scope.newImage)
                    if ($scope.uploadedImages.length >= $rootScope.photoUploadLimit)
                        toastr.info('Not more than ' + $rootScope.photoUploadLimit + ' photos', 'Photo limit');
                    else
                        $scope.uploadedImages.push($scope.newImage);
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

            $scope.addOffer = function () {

            }

        }]);