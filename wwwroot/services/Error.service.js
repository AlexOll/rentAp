(function () {
    'use strict';

    angular
        .module('services')
        .factory('ErrorService', ErrorService);

    ErrorService.$inject = ['$http','toastr'];

    function ErrorService($http, toastr) {
        var service = {
            ErrorCallback: ErrorCallback
        };

        return service;

        function ErrorCallback(response) {
            toastr.error('Error code: ' + response.status, "Request failed", {
                "timeOut": "3000",
                "extendedTImeout": "0"
            });
        }
    }
})();