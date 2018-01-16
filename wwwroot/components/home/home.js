angular.module('myApp.home', ['directives'])
    .controller('homeCtrl', ['$scope', 'DictionaryService', '$location', 'CookieUtility', '$timeout',
        function ($scope, DictionaryService, $location, CookieUtility, $timeout) {

            $scope.serviceType = {};
            $scope.serviceType.availableOptions = [];
            $scope.propertyType = {};
            $scope.propertyType.availableOptions = [];

            var search = CookieUtility.GetByName('search');;

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

                search.propertyType = $scope.propertyType.model;
                search.serviceType = $scope.serviceType.model;
                search.city = $scope.city;
                search.lat = $scope.form.city.$$attr.lat;
                search.lng = $scope.form.city.$$attr.lng;

                CookieUtility.PutObjectByName('search', search);

                $location.path('/search');
                //$location.path('/search/').search({
                //    propertyType: $scope.propertyType.model,
                //    serviceType: $scope.serviceType.model,
                //    city: $scope.city,
                //    lat: $scope.form.city.$$attr.lat,
                //    lng: $scope.form.city.$$attr.lng,
                //});
            }
        }]);