'use strict';

angular.module('myApp.register', ['ngRoute', 'services', 'toastr', 'directives'])
    .controller('registerCtrl', RegisterController)

RegisterController.$inject = ['$scope', 'UserService', '$location', 'toastr'];
function RegisterController($scope, UserService, $location, toastr) {

    $scope.register = function () {

        $scope.dataLoading = true;
        UserService.Create($scope.user, function (response) {
            if (response.status === 200) {
                if (response.data.message !== null) {
                    toastr.warning(response.data.message, 'Warning');
                }
                else {
                    toastr.success('Registration succeeded', 'Check your e-mail for submition');
                    $location.path('/');
                }
            }
            else {
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("You shall not pass")
                        .textContent("Account doesn't exist!")
                        .ok('Back')
                        .targetEvent(ev)
                );
            }
            $scope.dataLoading = false;
        })
    }
};

