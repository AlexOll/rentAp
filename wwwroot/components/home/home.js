angular.module('myApp.home', ['ngRoute', 'directives'])
    .controller('homeCtrl', ['$scope', function ($scope) {

        $scope.city = null;
        $scope.options = {
            country: 'ukr',
            types: '(cities)'
        }; 

        $scope.serviceType = {
            model: 1,
            availableOptions: [
                { id: 1, name: 'Offer sale' },
                { id: 2, name: 'Rental offer' },
                { id: 3, name: 'Offer roommate' },
                { id: 4, name: 'Sales demand' },
                { id: 5, name: 'Demand rental' },
                { id: 6, name: 'Demand for roommates' }
            ]
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
    }]);
