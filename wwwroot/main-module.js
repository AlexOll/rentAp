'use strict';

angular
    .module('myApp',
    [
        'ngRoute',
        'ngAnimate',
        'ngCookies',
        'myApp.login',
        'myApp.forgotpassword',
        'myApp.register',
        'myApp.home',
        'myApp.profile',
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
            .otherwise({ redirectTo: '/' })
    }])
    .run(['$rootScope', '$location', '$cookies', '$http', function ($rootScope, $location, $cookies, $http) {

        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {

            $rootScope.loggedIn = $rootScope.globals.currentUser;

            $rootScope.currentPath = $location.path();
            if ($rootScope.loggedIn)
            {
                $rootScope.firstname = $rootScope.globals.currentUser.firstname
                $rootScope.lastname = $rootScope.globals.currentUser.lastname;
            }

            var isRestrictedPage = $.inArray($location.path(), ['/', '/login', '/register', '/forgotpassword']) >= 0;
            if (!isRestrictedPage && !$rootScope.loggedIn)
                $location.path('/login');

            $('.navbar-collapse').collapse('hide');
        });
    }])
    .controller('mainCtrl', ['$scope', '$location', '$timeout', 'AnchorSmoothScrollService', 'AuthenticationService', 
        function ($scope, $location, $timeout, AnchorSmoothScrollService, AuthenticationService) {

            $scope.gotoElement = function (eID) {

                if ($location.path() !== '/profile') {
                    $location.path('/profile');
                    $timeout(function () {
                        AnchorSmoothScrollService.scrollTo(eID);
                    }, 1000);
                }
                else {
                    AnchorSmoothScrollService.scrollTo(eID);
                }
                $('.navbar-collapse').collapse('hide');
            };

            $scope.logout = function () {
                AuthenticationService.ClearCredentials();
                $location.path('/login');
            }
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
