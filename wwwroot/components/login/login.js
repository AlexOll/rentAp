'use strict';

angular.module('myApp.login', ['ngRoute', 'ngMaterial', 'services', 'toastr'])
    .controller('loginCtrl', LoginController);

LoginController.$inject = ['$scope', '$location', '$mdDialog', 'AuthenticationService', 'toastr'];
function LoginController($scope, $location, $mdDialog, AuthenticationService, toastr) {

    $scope.login = function (ev) {
        $scope.dataLoading = true;
        AuthenticationService.Login($scope.username, $scope.password, function (response) {
            if (!response.data.message) {
                AuthenticationService.SetCredentials($scope.username, $scope.password);

                toastr.success('Authentication succeeded', 'Have fun!');
                $location.path('/');
            }
            else {
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("You shall not pass")
                        .textContent(response.data.message)
                        .ok('Back')
                        .targetEvent(ev)
                );
                $scope.dataLoading = false;
            }
        });
    }
}

