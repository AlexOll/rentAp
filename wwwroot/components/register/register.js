'use strict';

angular.module('myApp.register', ['ngRoute', 'services', 'toastr'])
    .controller('registerCtrl', RegisterController)
    .directive('uniqueField', function ($http) {
        var toId;
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                scope.$watch(attr.ngModel, function (inputValue) {

                    if (toId) clearTimeout(toId);

                    toId = setTimeout(function () {
                        ctrl.$setValidity('duplicate', true);
                        if (inputValue && !ctrl.$error.pattern) {

                            var url = '';
                            if (attr.id === "username")
                                url = '/api/user/usernamecheck'
                            else if (attr.id === "email")
                                url = '/api/user/emailcheck'

                            $http.get(url, { params: { value: inputValue } })
                                .then(function (response) {
                                    if (response.data) {
                                        ctrl.$setValidity('duplicate', false);
                                    }
                                    else {
                                        ctrl.$setValidity('duplicate', true);
                                    }
                                });
                        }
                    }, 200);
                })
            }
        }
    });

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

