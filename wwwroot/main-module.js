'use strict';

angular
    .module('myApp',
    [
        'ngRoute',
        'ngAnimate',
        'myApp.login',
        'myApp.forgotpassword',
        'myApp.register',
        'myApp.home',
        'myApp.profile',
        'myApp.view3',
        'myApp.version',
        'services'
    ])
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true).hashPrefix('');

        $routeProvider
            .when('/', {
                templateUrl: 'components/home/home.html',
                controller: 'homeCtrl'
            })
            .when('/login', {
                templateUrl: 'components/login/login.html',
                controller: 'loginCtrl'
            })
            .when('/logout', {
                templateUrl: '',
                controller: 'loginCtrl'
            })
            .when('/forgotpassword', {
                templateUrl: 'components/forgotpassword/forgotpassword.html',
                controller: 'forgotpasswordCtrl'
            })
            .when('/register', {
                templateUrl: 'components/register/register.html',
                controller: 'registerCtrl'
            })
            .when('/profile', {
                templateUrl: 'components/profile/profile.html',
                controller: 'profileCtrl'
            })
            .when('/view3', {
                templateUrl: 'components/view3/view3.html',
                controller: 'View3Ctrl'
            })
            .otherwise({ redirectTo: '/login' })
    }])
    .run(['$rootScope', '$location', '$cookies', '$http', function ($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {

            $rootScope.loggedIn = $rootScope.globals.currentUser;

            $rootScope.currentPath = $location.path();
            if ($rootScope.loggedIn)
                $rootScope.username = $rootScope.globals.currentUser.username;

            var isRestrictedPage = $.inArray($location.path(), ['/', '/login', '/register', '/forgotpassword']) >= 0;
            if (!isRestrictedPage && !$rootScope.loggedIn)
                $location.path('/login');

            $rootScope.logout = function () {
                $rootScope.globals = {};
                $cookies.remove('globals');
                $http.defaults.headers.common.Authorization = 'Basic';

                $location.path('/login');
            }

            $('.navbar-collapse').collapse('hide');
        });
    }])
    .controller('mainCtrl', ['$scope', 'AnchorSmoothScrollService', '$location',
        function ($scope, AnchorSmoothScrollService, $location) {
            $scope.gotoElement = function (eID) {
                AnchorSmoothScrollService.scrollTo(eID);
                $('.navbar-collapse').collapse('hide');
            };
        }])
    .animation('.reveal-animation', function () {
        return {
            enter: function (element, done) {
                jQuery(element).hide().fadeIn(800, done);
            },
            leave: function (element, done) {
                jQuery(element).hide();
            }
        }
    })
