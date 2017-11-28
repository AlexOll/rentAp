'use strict';

angular.module('myApp.forgotpassword', ['ngRoute', 'ngMaterial', 'services', 'toastr', 'directives'])
    .controller('forgotpasswordCtrl', ForgotPassController);

ForgotPassController.$inject = ['$scope', '$location', '$mdDialog', 'AuthenticationService', 'toastr'];
function ForgotPassController($scope, $location, $mdDialog, AuthenticationService, toastr) {
    $scope.forgotpassword = function (ev) {
        $scope.dataLoading = true;
        AuthenticationService.ForgotPass($scope.email, function (response) {
            if (!response.data.message) {

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

