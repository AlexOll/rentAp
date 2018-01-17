angular.module('myApp.mapSearch', [])
    .controller('mapSearchCtrl', ['$scope', '$location', '$timeout', 'OfferService', 'DictionaryService', 'MapUtility', 'CookieUtility', 'toastr',
        function ($scope, $location, $timeout, OfferService, DictionaryService, MapUtility, CookieUtility, toastr) {

            $scope.propertyType = {};
            $scope.propertyType.availableOptions = [];
            $scope.serviceType = {};
            $scope.serviceType.availableOptions = [];

            //var params = $location.search()
            //$scope.city = params.city;
            //$scope.propertyType.model = params.propertyType === null ? [] : params.propertyType;

            var search = CookieUtility.GetByName('search');
            $scope.city = search.city;
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

                if (response.status === 200) {
                    $scope.locations = response.data;
                    MapUtility.CreateMap(search.lat, search.lng, $scope.locations);
                }
                else {
                    toastr.error('Error code: ' + response.status, "Error", {
                        "timeOut": "5000",
                        "extendedTImeout": "0"
                    });
                }
            });

            MapUtility.CreateMap(
                parseFloat(search.lat),
                parseFloat(search.lng),
                $scope.locations);

            $scope.$watch('city', function () {
                if ($scope.form.city.$$attr.lat && $scope.form.city.$$attr.lng)
                    MapUtility.CreateMap(
                        $scope.form.city.$$attr.lat,
                        $scope.form.city.$$attr.lng,
                        $scope.locations);
            });
        }]);
