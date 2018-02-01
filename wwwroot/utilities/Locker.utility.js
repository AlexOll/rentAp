(function () {
    'use strict';

    angular
        .module('utilities')
        .factory('LockerUtility', LockerUtility);

    LockerUtility.$inject = ['$timeout'];

    function LockerUtility($timeout) {
        var service = {
            runLockedFunc: runLockedFunc
        };

        return service;
        var locked = false;

        function runLockedFunc(lockFunction) {

                if (locked) {
                    return false;
                }
                locked = true;

                $timeout(function () {
                    lockFunction();
                    locked = false;
                }, 2000);
        }
    }
})();