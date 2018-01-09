angular.module('myApp.home', ['directives'])
    .controller('homeCtrl', ['$scope', 'DictionaryService', 'toastr', '$location',
        function ($scope, DictionaryService, toastr, $location) {

            $scope.propertyType = {
                model: [],
                availableOptions: [
                    { id: 1, name: 'Appartment' },
                    { id: 2, name: 'House' },
                    { id: 3, name: 'Land' },
                    { id: 4, name: 'Garage' },
                    { id: 5, name: 'Office' },
                    { id: 6, name: 'Commercial space' },
                    { id: 7, name: 'Other' }
                ]
            };

            $scope.search = function () {

                $location.path('/search/').search({
                    propertyType: $scope.propertyType.model,
                    serviceType: $scope.serviceType.model,
                    city: $scope.city,
                    lat: $scope.form.city.$$attr.lat,
                    lng: $scope.form.city.$$attr.lng,
                });
            }


            DictionaryService.GetServiceTypes(function (response) {

                if (response.status === 200) {

                    $scope.serviceType = {};
                    $scope.serviceType.availableOptions = [];

                    angular.forEach(response.data, function (value, key) {
                        $scope.serviceType.availableOptions.push({ "id": key, "name": value });
                    });

                    $scope.serviceType.model = $scope.serviceType.availableOptions[0].id;
                }
                else {
                    toastr.error('Error code: ' + response.status, "Error", {
                        "timeOut": "5000",
                        "extendedTImeout": "0"
                    });
                }
            });
        }]);