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

        $scope.choosePropertyType = function (opt) {

            var index = $scope.propertyType.model.indexOf(opt.id);
            if (index >= 0)
                $scope.propertyType.model.splice(index, 1);
            else
                $scope.propertyType.model.push(opt.id)
        }

        $(".dropdown dt").on('click', function () {
            $(".dropdown dd ul").slideToggle('fast');
        });

        $(".dropdown dd ul li").on('click', function () {
            $(".dropdown dd ul").hide();
        });

        $(document).bind('click', function (e) {
            var $clicked = $(e.target);
            if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
        });

        var locations = [
            { lat: -31.563910, lng: 147.154312 },
            { lat: -33.718234, lng: 150.363181 },
            { lat: -33.727111, lng: 150.371124 },
            { lat: -33.848588, lng: 151.209834 },
            { lat: -33.851702, lng: 151.216968 },
            { lat: -34.671264, lng: 150.863657 },
            { lat: -35.304724, lng: 148.662905 },
            { lat: -36.817685, lng: 175.699196 },
            { lat: -36.828611, lng: 175.790222 },
            { lat: -37.750000, lng: 145.116667 },
            { lat: -37.759859, lng: 145.128708 },
            { lat: -37.765015, lng: 145.133858 },
            { lat: -37.770104, lng: 145.143299 },
            { lat: -37.773700, lng: 145.145187 },
            { lat: -37.774785, lng: 145.137978 },
            { lat: -37.819616, lng: 144.968119 },
            { lat: -38.330766, lng: 144.695692 },
            { lat: -39.927193, lng: 175.053218 },
            { lat: -41.330162, lng: 174.865694 },
            { lat: -42.734358, lng: 147.439506 },
            { lat: -42.734358, lng: 147.501315 },
            { lat: -42.735258, lng: 147.438000 },
            { lat: -43.999792, lng: 170.463352 }
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
