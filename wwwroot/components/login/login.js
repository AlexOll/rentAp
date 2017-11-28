'use strict';

angular.module('myApp.login', ['ngRoute', 'ngMaterial', 'services', 'toastr'])
    .controller('loginCtrl', ['$scope', '$location', '$mdDialog', 'AuthenticationService', 'toastr',
        function LoginController($scope, $location, $mdDialog, AuthenticationService, toastr) {
            debugger;
            var searchObject = $location.search().activationcode;
            if (searchObject) {
                AuthenticationService.CheckActivationCode(searchObject, function (response) {
                    if (!response.data.message) {

                        toastr.success('Activation code found', 'You may now login!');
                        $location.path('/login');
                    }
                    else {
                        toastr.error(response.data.message, "Error", {
                            "timeOut": "0",
                            "extendedTImeout": "0"
                        });
                    }
                })
            }

            $scope.login = function (ev) {

                $scope.dataLoading = true;
                AuthenticationService.Login($scope.username, $scope.password, function (response) {
                    if (!response.data.message) {
                        AuthenticationService.SetCredentials($scope.username, $scope.password);

                        toastr.success('Authentication succeeded', 'Have fun!');
                        $location.path('/');
                    }
                    else {
                        alert = $mdDialog.alert({
                            title: "You shall not pass",
                            textContent: response.data.message,
                            ok: 'Close',
                            clickOutsideToClose: true,
                            targetEvent: ev
                        });
                        $mdDialog.show(alert);

                        $scope.dataLoading = false;
                    }
                });
            }
        }]);

