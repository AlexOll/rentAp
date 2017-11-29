'use strict';

angular.module('myApp.register', ['ngRoute', 'services', 'toastr', 'directives'])
    .controller('registerCtrl', ['$scope', 'UserService', '$location', 'toastr',
        function RegisterController($scope, UserService, $location, toastr) {

            $scope.register = function () {

                $scope.dataLoading = true;
                UserService.Create($scope.user, function (response) {

                    if (response.data.responseCode === 200) {
                        toastr.success('Check your e-mail for submition', 'Registration succeeded');
                        $location.path('/');
                    }
                    else {
                        alert = $mdDialog.alert({
                            title: "Can't register you're account!",
                            textContent: response.data.message,
                            ok: 'Close',
                            clickOutsideToClose: true,
                            targetEvent: ev
                        });
                        $mdDialog.show(alert);
                    }
                })
                $scope.dataLoading = false;
            }
        }]);

