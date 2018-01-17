﻿(function () {
    'use strict';

    angular
        .module('services')
        .factory('OfferService', OfferService);

    OfferService.$inject = ['$http'];

    function OfferService($http) {
        var service = {
            GetByFilter: GetByFilter
        };

        return service;

        function GetByFilter(search, callback) {
            $http.post('/api/realestateoffer/filter', {
                "serviceType": search.serviceType,
                "lat": search.lat,
                "lng": search.lng,
                "propertyTypeList": search.propertyTypeList//,
                //"priceFrom": filter.priceFrom,
                //"priceTo": filter.priceTo
            }).then(function (response) {
                return callback(response);
            });
        }
    }
})();
