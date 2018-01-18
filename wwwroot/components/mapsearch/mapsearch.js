angular.module('myApp.mapSearch', [])
    .controller('mapSearchCtrl', ['$scope', '$location', '$timeout', 'DictionaryService', 'MapUtility', 'CookieUtility',
        function ($scope, $location, $timeout, DictionaryService, MapUtility, CookieUtility) {

            $scope.propertyType = {};
            $scope.propertyType.availableOptions = [];
            $scope.serviceType = {};
            $scope.serviceType.availableOptions = [];

            var search = CookieUtility.GetByName('search');
            $scope.city = search.geoResult == null ? "" : search.geoResult.city;

            DictionaryService.GetServiceTypes(function (response) {

                angular.forEach(response.data, function (value, key) {
                    $scope.serviceType.availableOptions.push({ "id": key, "name": value });
                });
                $scope.serviceType.model = search.serviceType;
            });

            DictionaryService.GetPropertiesTypes(function (response) {

                angular.forEach(response.data, function (value, key) {
                    $scope.propertyType.availableOptions.push({ "id": key, "name": value });
                });
                $scope.propertyType.model = search.propertyType;
            });

            var locations = $scope.locations = [
                { id: 11, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -31.563910, lng: 147.154312 },
                { id: 12, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -33.718234, lng: 150.363181 },
                { id: 13, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -33.727111, lng: 150.371124 },
                { id: 14, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -33.848588, lng: 151.209834 },
                { id: 15, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -33.851702, lng: 151.216968 },
                { id: 16, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -34.671264, lng: 150.863657 },
                { id: 17, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -35.304724, lng: 148.662905 },
                { id: 18, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -36.817685, lng: 175.699196 },
                { id: 19, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -36.828611, lng: 175.790222 },
                { id: 20, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -37.750000, lng: 145.116667 },
                { id: 21, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -37.759859, lng: 145.128708 },
                { id: 22, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -37.765015, lng: 145.133858 },
                { id: 23, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -37.770104, lng: 145.143299 },
                { id: 24, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -37.773700, lng: 145.145187 },
                { id: 25, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -37.774785, lng: 145.137978 },
                { id: 26, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -37.819616, lng: 144.968119 },
                { id: 27, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -38.330766, lng: 144.695692 },
                { id: 28, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -39.927193, lng: 175.053218 },
                { id: 29, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -41.330162, lng: 174.865694 },
                { id: 30, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -42.734358, lng: 147.439506 },
                { id: 31, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -42.734358, lng: 147.501315 },
                { id: 32, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -42.735258, lng: 147.438000 },
                { id: 33, address: 'Appartment', description: "Description", price: 500, photoURLs: ['../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg', '../../img/flat/noImage.jpg'], lat: -43.999792, lng: 170.463352 }
            ]

            MapUtility.CreateMap(
                parseFloat(search.geoResult.lat),
                parseFloat(search.geoResult.lng),
                locations);

            $scope.$watch('geoResult', function () {
                if ($scope.geoResult) {
                    MapUtility.CreateMap(
                        $scope.geoResult.geometry.location.lat(),
                        $scope.geoResult.geometry.location.lng(),
                        locations);
                }
            })

        }]);
