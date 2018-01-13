angular.module('myApp.flatdetails', [])
    .controller('flatdetailsCtrl', ['$scope', 'toastr', 'MapUtility',
        function ($scope, toastr, MapUtility) {

            $scope.uploadedImages = [];

            $scope.$watch('newImage', function (scope) {
                if ($scope.newImage)
                    $scope.uploadedImages.push($scope.newImage);
            })

            $scope.deletePhoto = function (image) {
                var index = $scope.uploadedImages.indexOf(image);
                $scope.uploadedImages.splice(index, 1);
            }

            $scope.setMainPhoto = function (image) {
                var index = $scope.uploadedImages.indexOf(image);
                if (index != 0) {
                    $scope.uploadedImages.splice(index, 1);
                    $scope.uploadedImages.unshift(image);
                }
            }

            var UkraineCoordinates = { lat: 48.3794, lng: 31.1656 };

            MapUtility.CreateMap(
                UkraineCoordinates.lat,
                UkraineCoordinates.lng,
                [],
                5);

            $scope.$watch('city', function () {
                if ($scope.form.city.$$attr.lat && $scope.form.city.$$attr.lng) {
                    var location = [{ lat: $scope.form.city.$$attr.lat, lng: $scope.form.city.$$attr.lng }]
                    MapUtility.CreateMap(
                        $scope.form.city.$$attr.lat,
                        $scope.form.city.$$attr.lng,
                        location);
                    $scope.form.city.$$attr.lat = null;
                    $scope.form.city.$$attr.lng = null;
                    //$scope.myClass = "moving-div";
                }

            })
        }]);