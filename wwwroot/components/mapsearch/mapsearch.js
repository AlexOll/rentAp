angular.module('myApp.mapSearch', [])
    .controller('mapSearchCtrl', ['$scope', '$location', '$timeout', 'OfferService', 'DictionaryService', 'MapUtility', 'CookieUtility', 'toastr',
        function ($scope, $location, $timeout, OfferService, DictionaryService, MapUtility, CookieUtility, toastr) {

            $scope.propertyType = {};
            $scope.propertyType.availableOptions = [];
            $scope.offerType = {};
            $scope.offerType.availableOptions = [];

            var search = CookieUtility.GetByName('search');
            if (search.geoResult) {
                $scope.city = search.geoResult.city;
            }
            else {
                $location.path('/');
            }

            $scope.propertyType.model = search.propertyType;
            $scope.offerType.model = search.offerType;

            DictionaryService.GetOfferTypes(function (response) {

                angular.forEach(response.data, function (value, key) {
                    $scope.offerType.availableOptions.push({ "id": key, "name": value });
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

                    search.geoResult.lat = $scope.geoResult.geometry.location.lat();
                    search.geoResult.lng = $scope.geoResult.geometry.location.lng();

                    MapUtility.CreateMap(
                        search.geoResult.lat,
                        search.geoResult.lng,
                        $scope.locations)
                }
            });

            $scope.search = function () {
                let filter = {};
                filter.offerType = $scope.offerType.model;
                filter.lat = search.geoResult.lat;
                filter.lng = search.geoResult.lng;
                filter.propertyTypeList = $scope.propertyType.model;
                filter.priceFrom = $scope.priceFrom;
                filter.priceTill = $scope.priceTill;
                
                if ($scope.hasFilters) {
                    filter.roomsQuantity = $scope.roomsQuantity;
                    filter.floorNumber = $scope.floorNumber;
                    filter.area = $scope.area;
                    filter.payments = $scope.payments;
                    filter.availableFrom = $scope.form.availableFrom.$viewValue;
                    filter.availableTill = $scope.form.availableTill.$viewValue;
                    filter.withFurniture = $scope.withFurniture;
                    filter.withBalcony = $scope.withBalcony;
                    filter.withParking = $scope.withParking;
                    filter.allowPets = $scope.allowPets;
                    filter.allowChildren = $scope.allowChildren;
                }
              

                OfferService.GetByFilter(filter, function (response) {
                    $scope.locations = response.data;
                    MapUtility.CreateMap(
                        parseFloat(search.geoResult.lat),
                        parseFloat(search.geoResult.lng),
                        $scope.locations);
                });
            }

        }]);
