'use strict';

angular.module('myApp.home', ['ngRoute'])
    .controller('homeCtrl', ['$scope', '$routeParams', function HomeCtrl($scope, $routeParams) {
        $scope.title = "Angular test";
    }]);
