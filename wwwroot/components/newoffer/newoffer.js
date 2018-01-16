angular.module('myApp.newoffer', [])
    .controller('newOfferCtrl', ['$scope', 'toastr', 'MapUtility', 'CookieUtility', 'DictionaryService', 'AnchorSmoothScrollService','$timeout',
        function ($scope, toastr, MapUtility, CookieUtility, DictionaryService, AnchorSmoothScrollService, $timeout) {

            $scope.serviceType = {};
            $scope.serviceType.availableOptions = [];
            $scope.propertyType = {};
            $scope.propertyType.availableOptions = [];

            var search = CookieUtility.GetByName('search');

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
            var photoLimit = 8
            $scope.$watch('newImage', function (scope) {
                if ($scope.newImage)
                    if ($scope.uploadedImages.length >= photoLimit)
                        toastr.info('Not more than ' + photoLimit + ' photos', 'Photo limit');
                    else {
                        $scope.uploadedImages.push($scope.newImage);
                        //$timeout(function () {
                        //    AnchorSmoothScrollService.ScrollTo('apartment',-100);
                        //}, 3000);
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

            var UkraineCoordinates = { lat: 48.3794, lng: 31.1656 };

            MapUtility.CreateMap(
                UkraineCoordinates.lat,
                UkraineCoordinates.lng,
                [],
                5);

            $scope.$watch('city', function () {
                if ($scope.form.city.$$attr.lat && $scope.form.city.$$attr.lng) {
                    var location = [{ lat: $scope.form.city.$$attr.lat, lng: $scope.form.city.$$attr.lng }]
                    MapUtility.CreateMap(
                        $scope.form.city.$$attr.lat,
                        $scope.form.city.$$attr.lng,
                        location);
                    $scope.form.city.$$attr.lat = null;
                    $scope.form.city.$$attr.lng = null;
                    //$scope.myClass = "moving-div";
                }

            })
        }]);