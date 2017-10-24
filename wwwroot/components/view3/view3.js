'use strict';

angular.module('myApp.view3', ['ngRoute', 'ngCookies', 'services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', function ($cookies, MyService1, MyService2) {
        // Retrieving a cookie
        //var favoriteCookie = $cookies.put('myFavorite', 'oatmeal');
        //alert($cookies);
        MyService1.sayHello();
        MyService2.sayHello();
        // Setting a cookie
    });

