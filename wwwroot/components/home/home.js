angular.module('myApp.home', ['directives'])
    .controller('homeCtrl', ['$scope', 'DictionaryService', '$location', 'CookieUtility', '$timeout',
        function ($scope, DictionaryService, $location, CookieUtility, $timeout) {

            $scope.offerType = {};
            $scope.offerType.availableOptions = [];
            $scope.propertyType = {};
            $scope.propertyType.availableOptions = [];

            var search = CookieUtility.GetByName('search');

            if (search.geoResult !== undefined) {
                $scope.city = search.geoResult.city;
                $scope.geoResult = {};
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
                $scope.propertyType.model = search.propertyType || [];
            });

            $scope.search = function () {
                let geometry = $scope.geoResult.geometry;
                search.propertyType = $scope.propertyType.model;
                search.offerType = $scope.offerType.model;
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