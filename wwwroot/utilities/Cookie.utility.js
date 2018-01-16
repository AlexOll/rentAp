(function () {
    'use strict';

    angular
        .module('utilities')
        .factory('CookieUtility', CookieUtility);

    CookieUtility.$inject = ['$cookies'];

    function CookieUtility($cookies) {
        var service = {
            GetByName: GetByName,
            PutObjectByName: PutObjectByName,
            RemoveByName: RemoveByName
        };

        return service;

        function GetByName(name, defaultValue = {}) {
            return $cookies.getObject(name) || defaultValue;
        }

        function PutObjectByName(name, value) {
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            $cookies.putObject(name, value, { expires: cookieExp });
        }
        function RemoveByName(name) {
            $cookies.remove(name);
        }
    }
})();