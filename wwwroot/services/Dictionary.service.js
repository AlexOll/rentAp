(function () {
    'use strict';

    angular
        .module('services')
        .factory('DictionaryService', DictionaryService)

    DictionaryService.$inject = ['$http'];

    function DictionaryService($http) {
        var service = {
            GetServiceTypes: GetServiceTypes
        };

        return service;

        function GetServiceTypes(callback) {
            $http.get('/api/dictionary/servicetypes')
                .then(function (res) { return callback(res) });
        }
    }
})();
