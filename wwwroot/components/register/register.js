'use strict';

angular.module('myApp.register', ['ngRoute', 'services', 'toastr'])
    .controller('registerCtrl', RegisterController);

RegisterController.$inject = ['$scope', 'UserService', '$location', 'toastr'];
function RegisterController($scope, UserService, $location, toastr) {
    $scope.usernameCheck = function ()
    {
        $scope.dataLoading = true;
        console.log($scope.user.username.length);
        if ($scope.user.username.length===6)
        $scope.form.username.$setValidity("duplicate", false);
        //UserService.UsernameCheck($scope.user.username), function (response) {
        //    if (response.status === 200 && response.data.message !== null) {
        //        toastr.warning(response.data.message, 'Warning');
        //    }
        //}
        $scope.dataLoading = false;
    }
    $scope.register = function () {

        $scope.dataLoading = true;
        UserService.Create($scope.user, function (response) {
            if (response.status === 200) {
                if (response.data.message !== null) {
                    toastr.warning(response.data.message, 'Warning');
                }
                else
                {
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

