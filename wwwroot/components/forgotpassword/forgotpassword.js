'use strict';

angular.module('myApp.forgotpassword', ['ngRoute', 'ngMaterial', 'services', 'toastr', 'directives'])
    .controller('forgotpasswordCtrl', ForgotPassController);

ForgotPassController.$inject = ['$scope', '$location', '$mdDialog', 'AuthenticationService', 'toastr'];
function ForgotPassController($scope, $location, $mdDialog, AuthenticationService, toastr) {
    $scope.test = function (record) {
        alert(record);
    }
    $scope.forgotPassword = function (ev) {
        $scope.dataLoading = true;
        AuthenticationService.ForgotPass($scope.email, function (response) {

            if (response.data.responseCode === 200) {

                toastr.success('Your new Password was sent', 'Check email!');
                $location.path('/');
            }
            else
            {
                toastr.error(response.data.message, "Title", {
                    "timeOut": "0",
                    "extendedTImeout": "0"
                });
            }
        });
    }

    $scope.resendActivationCode = function (ev) {
        $scope.dataLoading = true;
        AuthenticationService.ResendActivationCode($scope.email, function (response) {
            if (response.status === 204) {

                toastr.success('Your new Activation Code was sent', 'Check email!');
                $location.path('/');
            }
            else {
                toastr.error("Noooo oo oo ooooo!!!", "Title", {
                    "timeOut": "0",
                    "extendedTImeout": "0"
                });
            }
        });
    }

}

