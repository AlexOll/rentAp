angular.module('myApp.home', ['ngRoute', 'directives', 'toastr'])
    .controller('homeCtrl', ['$scope', 'toastr', 'DictionaryService', function ($scope, toastr, DictionaryService) {

        $scope.city = null;
        $scope.options = {
            country: 'ukr',
            types: '(cities)'
        }; 

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

            var e = angular.element(document.querySelector('#city'))[0];
            $scope.placeId = e.attributes['placeid'].value;

            alert('see console log');
            console.log('placeId - ' + $scope.placeId);
            console.log('propertyType - ' + $scope.propertyType.model);
            console.log('serviceType - ' + $scope.serviceType.model);

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
