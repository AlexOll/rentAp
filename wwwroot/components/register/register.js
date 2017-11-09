'use strict';

angular.module('myApp.register', ['ngRoute', 'services', 'toastr'])
    .controller('registerCtrl', RegisterController);

RegisterController.$inject = ['$scope', 'UserService', '$location','toastr'];
function RegisterController($scope, UserService, $location, toastr) {

    $scope.register = function() {
        $scope.dataLoading = true;
        UserService.Create($scope.user)
            .then(function (response) {
                if (response.status === 200) {
                    FlashService.Success('Registration successful', true);
                    $location.path('/login');
                } else {
                    console.log(response.message);
                    vm.dataLoading = false;
                }
            });
    }
};