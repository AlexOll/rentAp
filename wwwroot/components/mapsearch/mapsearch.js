angular.module('myApp.mapSearch', [])
    .controller('mapSearchCtrl', ['$scope', '$location', '$timeout', 'OfferService', 'DictionaryService', 'MapUtility', 'CookieUtility', 'toastr',
        function ($scope, $location, $timeout, OfferService, DictionaryService, MapUtility, CookieUtility, toastr) {

            $scope.propertyType = {};
            $scope.propertyType.availableOptions = [];
            $scope.serviceType = {};
            $scope.serviceType.availableOptions = [];

            var search = CookieUtility.GetByName('search');

            $scope.city = search.geoResult == null ? "" : search.geoResult.city;
            $scope.propertyType.model = search.propertyType;
            $scope.serviceType.model = search.serviceType;

            DictionaryService.GetServiceTypes(function (response) {

                angular.forEach(response.data, function (value, key) {
                    $scope.serviceType.availableOptions.push({ "id": key, "name": value });
                });
            });

            DictionaryService.GetPropertiesTypes(function (response) {

                angular.forEach(response.data, function (value, key) {
                    $scope.propertyType.availableOptions.push({ "id": key, "name": value });
                });
            });

            $scope.locations = [];

            OfferService.GetByFilter(search, function (response) {
                $scope.locations = response.data;
                MapUtility.CreateMap(
                    parseFloat(search.geoResult.lat),
                    parseFloat(search.geoResult.lng),
                    $scope.locations);
            });

            $scope.$watch('geoResult', function () {
                if ($scope.geoResult) {
                    MapUtility.CreateMap(
                        $scope.geoResult.geometry.location.lat(),
                        $scope.geoResult.geometry.location.lng(),
                        $scope.locations)
                }
            });
        }]);
