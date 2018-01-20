﻿(function () {
    'use strict';

    angular
        .module('services')
        .factory('OfferService', OfferService);

    OfferService.$inject = ['$http', 'ErrorService'];

    function OfferService($http, ErrorService) {
        var service = {
            GetByFilter: GetByFilter
        };

        return service;

        function GetByFilter(search, callback) {
            $http.post('/api/realestateoffer/search', {
                "serviceType": search.serviceType,
                "lat": search.lat,
                "lng": search.lng,
                "propertyTypeList": search.propertyTypeList,
                "priceFrom": search.priceFrom,
                "priceTill": search.priceTill,
                "roomsQuantity": search.roomsQuantity,
                "floorNumber": search.floorNumber,
                "area": search.area,
                "payments": search.payments,
                "availableFrom": search.availableFrom,
                "availableTill": search.availableTill,
                "withFurniture": search.withFurniture,
                "withBalcony": search.withBalcony,
                "withParking": search.withParking,
                "allowPets": search.allowPets,
                "allowChildren": search.allowChildren

            }).then(
                function (res) { return callback(res) },
                function (res) { return ErrorService.ErrorCallback(res) }
                )
        }
    }
})();
