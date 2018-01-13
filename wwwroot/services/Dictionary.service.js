(function () {
    'use strict';

    angular
        .module('services')
        .factory('DictionaryService', DictionaryService)

    DictionaryService.$inject = ['$http', 'ErrorService'];

    function DictionaryService($http, ErrorService) {
        var service = {
            GetServiceTypes: GetServiceTypes,
            GetPropertiesTypes: GetPropertiesTypes
        };

        return service;

        function GetServiceTypes(callback) {
            $http.get('/api/dictionary/servicetypes')
                .then(function (res) { return callback(res) },
                function (res) { return ErrorService.ErrorCallback(res) }
                );
        }

        function GetPropertiesTypes(callback) {
            $http.get('/api/dictionary/propertytypes')
                .then(
                function (res) { return callback(res) },
                function (res) { return ErrorService.ErrorCallback(res) }
                );
        }
    }
})();
