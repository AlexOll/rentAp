﻿(function () {
    'use strict';

    angular
        .module('services')
        .factory('OfferService', OfferService);

    OfferService.$inject = ['$http', 'ErrorService'];

    function OfferService($http, ErrorService) {
        var service = {
            GetByFilter: GetByFilter,
            Create: Create,
            GetByUserId: GetByUserId,
            CheckIfImgsExist: CheckIfImgsExist
        };

        return service;

        function GetByFilter(search, callback) {
            $http.post('/api/offer/search', {
                "offerType": search.offerType,
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
        function GetByUserId(id, callback) {
            $http.get('/api/offer/' + id)
                .then(
                function (res) { return callback(res) },
                function (res) { return ErrorService.ErrorCallback(res) }
                )
        }
        function CheckIfImgsExist(imgSourceList, callback) {
            $http.post('/api/offer/imgCheck', imgSourceList).then(
                function (res) { return callback(res) },
                function (res) { return ErrorService.ErrorCallback(res) }
                )
        }
        

        function Create(offer, callback) {
            $http.post('/api/offer', {
                "userId": offer.userId,
                "offerType": offer.offerType,
                "address": offer.address,
                "lat": offer.lat,
                "lng": offer.lng,
                "propertyType": offer.propertyType,
                "price": offer.price,
                "photoURLs": offer.photoURLs,

                "roomsQuantity": offer.roomsQuantity,
                "floorNumber": offer.floorNumber,
                "area": offer.area,
                "payments": offer.payments,
                "availableFrom": offer.availableFrom,
                "availableTill": offer.availableTill,
                "withFurniture": offer.withFurniture,
                "withBalcony": offer.withBalcony,
                "withParking": offer.withParking,
                "allowPets": offer.allowPets,
                "allowChildren": offer.allowChildren,
                "description": offer.description

            }).then(
                function (res) { return callback(res) },
                function (res) { return ErrorService.ErrorCallback(res) }
                )
        }
    }
})();
