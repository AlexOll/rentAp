(function () {
    'use strict';

    angular
        .module('utilities')
        .factory('MapUtility', MapUtility);

    MapUtility.$inject = ['$timeout'];

    function MapUtility($timeout) {
        var service = {
            CreateMap: CreateMap
        };

        return service;

        function CreateMap(_lat, _lng, locations = [], _zoom = 14,) {
            $timeout(function () {
                var myLatlng = { lat: _lat, lng: _lng };
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: _zoom,
                    center: myLatlng
                });

                var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

                var markers = locations.map(function (location, i) {
                    return new google.maps.Marker({
                        position: location,
                        label: labels[i % labels.length]
                    });
                });

                var markerCluster = new MarkerClusterer(map, markers,
                    { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
            }, 100)
        }
    }
})();