(function () {
    'use strict';

    angular
        .module('utilities')
        .factory('HubUtility', HubUtility);

    HubUtility.$inject = ['$rootScope'];

    function HubUtility($rootScope) {
        var service = {
            initConnection: initConnection,
            messageSent : messageSent
        };

        return service;

        function initConnection() {
            $rootScope.hubConnection = new signalR.HubConnection('/mainHub');
            $rootScope.hubConnection.start().then(
                function () {
                    $rootScope.hubConnection.invoke("InitConnection", $rootScope.globals.currentUser.id);
                });
        }

        function messageSent(callback) {
            $rootScope.hubConnection.on('messageSent', msg => callback(msg));
        }

        
    }
})();