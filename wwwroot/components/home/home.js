angular.module('myApp.home', ['directives'])
    .controller('homeCtrl', ['$scope', 'DictionaryService', '$location', 'CookieUtility', '$timeout',
        function ($scope, DictionaryService, $location, CookieUtility, $timeout) {

            $scope.serviceType = {};
            $scope.serviceType.availableOptions = [];
            $scope.propertyType = {};
            $scope.propertyType.availableOptions = [];

            var search = CookieUtility.GetByName('search');
            $scope.geoResult = $scope.city = search.geoResult === null ? "" : search.geoResult.city;

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
                $scope.propertyType.model = search.propertyType || [];
            });

            $scope.search = function () {
                let geometry = $scope.geoResult.geometry;
                search.propertyType = $scope.propertyType.model;
                search.serviceType = $scope.serviceType.model;
                search.geoResult = search.geoResult || {};
                search.geoResult.city = $scope.geoResult.formatted_address || $scope.city;
                if (geometry) {
                    search.geoResult.lat = geometry.location.lat();
                    search.geoResult.lng = geometry.location.lng();
                }

                CookieUtility.PutObjectByName('search', search);

                $location.path('/search');
            }
        }]);