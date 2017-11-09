'use strict';

angular.module('myApp.view3', ['ngRoute', 'ngCookies', 'services'])


    .controller('View3Ctrl', ['$cookies', 'MyService1', 'MyService2', function ($cookies, MyService1, MyService2) {
        // Retrieving a cookie
        //var favoriteCookie = $cookies.put('myFavorite', 'oatmeal');
        MyService1.sayHello();
        MyService2.sayHello();
        // Setting a cookie
    }]);

