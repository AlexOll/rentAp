(function () {
    'use strict';

    angular
        .module('services')
        .factory('UserService', UserService)

    UserService.$inject = ['$http', 'ErrorService'];

    function UserService($http, ErrorService) {
        var service = {
            Create: Create,
            Update: Update
        };

        return service;

        function Create(user, callback) {
            $http.post('/api/user', {
                "PhoneNumber": user.phonenumber,
                "FirstName": user.firstName,
                "LastName": user.lastName,
                "Password": user.password,
                "Email": user.email
            })
                .then(
                function (res) { return callback(res) },
                function (res) { return ErrorService.ErrorCallback(res) }
                )
        }
        function Update(user, callback) {
            $http.post('/api/user/update', {
                "Id": user.id,
                "PhoneNumber": user.phonenumber,
                "FirstName": user.firstname,
                "LastName": user.lastname,
                "Password": user.password,
                "Email": user.email,
                "ProfileImageURL": user.profileImageURL
            })
                .then(
                function (res) { return callback(res) },
                function (res) { return ErrorService.ErrorCallback(res) }
                )
        }
    }
})();