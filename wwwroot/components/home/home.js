'use strict';

angular.module('myApp.home', ['ngRoute'])
    .controller('homeCtrl', ['$scope', function HomeCtrl($scope) {
        $scope.title = "Angular test";
    }]);
