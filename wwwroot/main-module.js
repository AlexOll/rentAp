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
        'services',
        'utilities'
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
    .run(['$rootScope', '$location', '$cookies', '$http', '$window', '$interval', 'ProfileService', 'HubUtility',
        function ($rootScope, $location, $cookies, $http, $window, $interval, ProfileService, HubUtility) {

            $rootScope.isSmallResolution = $window.innerWidth <= 992;

            $interval(function () {
                ProfileService.UpdateOnlineStatus($rootScope.globals.currentUser.id);
            }, 10000);

            $rootScope.globals = $cookies.getObject('globals') || {};
            if ($rootScope.globals.currentUser) {

                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
                HubUtility.initConnection();
            }

            function onScroll() {
                $rootScope.windowScrollY = $window.scrollY;
                $rootScope.$apply();
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {

                $rootScope.loggedIn = $rootScope.globals.currentUser;

                if ($rootScope.loggedIn)
                    $rootScope.name = $rootScope.globals.currentUser.name;

                var isRestrictedPage = $.inArray($location.path(), ['/', '/login', '/register', '/forgotpassword']) >= 0;
                if (!isRestrictedPage && !$rootScope.loggedIn)
                    $location.path('/login');

                if (!$rootScope.isSmallResolution && $location.path() === '/profile')
                    angular.element($window).on('scroll', onScroll);
                else
                    angular.element($window).off('scroll', onScroll);

                if ($rootScope.isSmallResolution)
                    $('.navbar-collapse').collapse('hide');
            });
        }])
    .controller('mainCtrl', ['$scope', '$rootScope', '$location', '$timeout', 'AnchorSmoothScrollService', 'AuthenticationService',
        function ($scope, $rootScope, $location, $timeout, AnchorSmoothScrollService, AuthenticationService, $window) {

            $scope.gotoElement = function (eID) {

                if ($rootScope.isSmallResolution) {
                    $location.path('/profile');
                    $timeout(function () {
                        AnchorSmoothScrollService.scrollTo(eID);
                    }, 500);
                    $('.navbar-collapse').collapse('hide');
                }
                else {
                    AnchorSmoothScrollService.scrollTo(eID);
                }
            };

            $scope.logout = function () {
                AuthenticationService.ClearCredentials();
                $location.path('/login');
            }
        }])
    .animation('.reveal-animation', function () {
        return {
            enter: function (element, done) {
                jQuery(element).hide().fadeIn(1000, done);
            },
            leave: function (element, done) {
                jQuery(element).hide();
            }
        }
    })
