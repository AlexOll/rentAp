angular.module('myApp.home', ['directives'])
    .controller('homeCtrl', ['$scope', '$location', function ($scope, $location) {

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

                var ss = $scope.placeId;
                $location.path('/search/').search({
                    propertyType: $scope.propertyType.model,
                    serviceType: $scope.serviceType.model,
                    city: $scope.city,
                    lat: $scope.form.city.$$attr.lat,
                    lng: $scope.form.city.$$attr.lng,
                });
            }

        }]);
