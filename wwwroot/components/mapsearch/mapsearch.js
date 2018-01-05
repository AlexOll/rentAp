angular.module('myApp.mapSearch', [])
    .controller('mapSearchCtrl', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {

        $scope.options = {
            country: 'ukr',
            types: '(cities)'
        };

        $scope.serviceType = {
            model: 1,
            availableOptions: [
                { id: 1, name: 'Offer sale' },
                { id: 2, name: 'Rental offer' },
                { id: 3, name: 'Offer roommate' },
                { id: 4, name: 'Sales demand' },
                { id: 5, name: 'Demand rental' },
                { id: 6, name: 'Demand for roommates' }
            ]
        };

        $scope.propertyType = {
            model: [],
            availableOptions: [
                { id: 1, name: 'Appartment' },
                { id: 2, name: 'House' },
                { id: 3, name: 'Land' },
                { id: 4, name: 'Garage' },
                { id: 5, name: 'Office' },
                { id: 6, name: 'Commercial space' },
                { id: 7, name: 'Other' }
            ]
        };

        var params = $location.search()

        $scope.city = params.city;
        $scope.serviceType.model = parseInt(params.serviceType);
        $scope.propertyType.model = params.propertyType == null ? [] : params.propertyType.map(Number);

        var locations = [

            { id: 11, address: 'Appartment', price: 500, photosBase64: ["base64code", "base64code", "base64code"], lat: -31.563910, lng: 147.154312 },
            { id: 12, address: 'Appartment', price: 500, lat: -33.718234, lng: 150.363181 },
            { id: 13, address: 'Appartment', price: 500, lat: -33.727111, lng: 150.371124 },
            { id: 14, address: 'Appartment', price: 500, lat: -33.848588, lng: 151.209834 },
            { id: 15, address: 'Appartment', price: 500, lat: -33.851702, lng: 151.216968 },
            { id: 16, address: 'Appartment', price: 500, lat: -34.671264, lng: 150.863657 },
            { id: 17, address: 'Appartment', price: 500, lat: -35.304724, lng: 148.662905 },
            { id: 18, address: 'Appartment', price: 500, lat: -36.817685, lng: 175.699196 },
            { id: 19, address: 'Appartment', price: 500, lat: -36.828611, lng: 175.790222 },
            { id: 111, address: 'Appartment', price: 500, lat: -37.750000, lng: 145.116667 },
            { id: 121, address: 'Appartment', price: 500, lat: -37.759859, lng: 145.128708 },
            { id: 131, address: 'Appartment', price: 500, lat: -37.765015, lng: 145.133858 },
            { id: 141, address: 'Appartment', price: 500, lat: -37.770104, lng: 145.143299 },
            { id: 151, address: 'Appartment', price: 500, lat: -37.773700, lng: 145.145187 },
            { id: 161, address: 'Appartment', price: 500, lat: -37.774785, lng: 145.137978 },
            { id: 171, address: 'Appartment', price: 500, lat: -37.819616, lng: 144.968119 },
            { id: 181, address: 'Appartment', price: 500, lat: -38.330766, lng: 144.695692 },
            { id: 191, address: 'Appartment', price: 500, lat: -39.927193, lng: 175.053218 },
            { id: 1911, address: 'Appartment', price: 500, lat: -41.330162, lng: 174.865694 },
            { id: 1211, address: 'Appartment', price: 500, lat: -42.734358, lng: 147.439506 },
            { id: 1311, address: 'Appartment', price: 500, lat: -42.734358, lng: 147.501315 },
            { id: 1411, address: 'Appartment', price: 500, lat: -42.735258, lng: 147.438000 },
            { id: 1511, address: 'Appartment', price: 500, lat: -43.999792, lng: 170.463352 }
        ]

        function createMap(_lat, _lng, locations) {
            $timeout(function () {
                var myLatlng = { lat: _lat, lng: _lng };

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 14,
                    center: myLatlng
                });

                // Create an array of alphabetical characters used to label the markers.
                var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

                var markers = locations.map(function (location, i) {
                    return new google.maps.Marker({
                        position: location,
                        label: labels[i % labels.length]
                    });
                });

                // Add a marker clusterer to manage the markers.
                var markerCluster = new MarkerClusterer(map, markers,
                    { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
            }, 1000)
        }

        createMap(parseFloat(params.lat), parseFloat(params.lng), locations);

        $scope.$watch('city', function () {
            if ($scope.form.city.$$attr.lat && $scope.form.city.$$attr.lng)
                createMap($scope.form.city.$$attr.lat, $scope.form.city.$$attr.lng, locations);
        })
    }]);
