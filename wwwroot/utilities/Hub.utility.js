(function () {
    'use strict';

    angular
        .module('utilities')
        .factory('HubUtility', HubUtility);

    HubUtility.$inject = ['$rootScope'];

    function HubUtility($rootScope) {
        var service = {
            InitConnection: InitConnection,
            MessageSent: MessageSent,
            OnlineStatusUpdated: OnlineStatusUpdated,
            Disconnect: Disconnect
        };

        return service;

        function InitConnection() {
            $rootScope.hubConnection = new signalR.HubConnection('/mainHub');
            $rootScope.hubConnection.start().then(
                function () {
                    $rootScope.hubConnection.invoke("InitConnection", $rootScope.globals.currentUser.id);
                });
            $rootScope.hubConnection.on('messageSent', function (res) { });
            $rootScope.hubConnection.on('onlineStatusUpdated', function (res) { });
        }

        function MessageSent(callback) {
            $rootScope.hubConnection.on('messageSent', function (res) { return callback(res) });
        }
        function OnlineStatusUpdated(callback) {
            $rootScope.hubConnection.on('onlineStatusUpdated', function (res) { return callback(res) });
        }
        function Disconnect() {
            $rootScope.hubConnection.stop()
        }

    }
})();