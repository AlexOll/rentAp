
angular.module('myApp.login', ['ngRoute', 'ngMaterial', 'services', 'toastr'])
    .controller('loginCtrl', ['$scope', '$location', '$mdDialog', 'AuthenticationService', 'toastr',
        function ($scope, $location, $mdDialog, AuthenticationService, toastr) {

            var searchObject = $location.search().activationcode;
            if (searchObject) {

                AuthenticationService.CheckActivationCode(searchObject, function (response) {
                    if (response.data.responseCode === 200) {

                        AuthenticationService.SetCredentials(response.data);
                        toastr.success('Activation code submitted', 'Have fun!');
                        $location.url('/');
                    }
                    else {
                        toastr.error(response.data.message, "Error", {
                            "timeOut": "5000",
                            "extendedTImeout": "0"
                        });
                    }
                })
            }

            $scope.login = function (ev) {
                $scope.dataLoading = true;
                AuthenticationService.Login($scope.username, $scope.password, function (response) {

                    if (response.data.responseCode === 200) {
                        
                        AuthenticationService.SetCredentials(response.data);
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

