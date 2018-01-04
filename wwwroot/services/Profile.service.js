﻿
(function () {
    'use strict';

    angular
        .module('services')
        .factory('ProfileService', ProfileService)

    ProfileService.$inject = ['$http','$interval'];

    function ProfileService($http, $interval) {
        var service = {
            GetUserMessages: getUserMessages,
            SendChatMessage: SendChatMessage,
            UpdateOnlineStatus: UpdateOnlineStatus
        };

        return service;

        function getUserMessages(id, callback) {
            $http.get('/api/profile/usermessages/' + id)
                .then(function (res) { return callback(res) });
        }

        function SendChatMessage(message, callback) {
            $http.post('/api/profile', {
                "Id": message.id,
                "UserIdFrom": message.userIdFrom,
                "UserIdTo": message.userIdTo,
                "Body": message.body,
                "CreateDateTime": message.createDateTime,
            })
                .then(function (res) { return callback(res) });
        }

        function UpdateOnlineStatus(id) {
            $interval(function () {
                $http.put('/api/profile/updateonlinestatus/' + id)
                    .then();
            }, 60000);
        }
    }
})();
