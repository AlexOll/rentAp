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
        'myApp.mapSearch',
        'myApp.flatdetails',
        'myApp.newoffer',
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
            .when('/search', {
                templateUrl: 'components/mapsearch/mapsearch.html',
                controller: 'mapSearchCtrl'
            })
            .when('/new-offer', {
                templateUrl: 'components/newoffer/newoffer.html',
                controller: 'newOfferCtrl'
            })
            .when('/flatdetails/:id/address-:address/price-:price', {
                templateUrl: 'components/flatdetails/flatdetails.html',
                controller: 'flatdetailsCtrl'
            })
            .otherwise({ redirectTo: '/' })

    }])
    .run(['$rootScope', '$location', 'CookieUtility', '$http', '$window', '$interval', 'ProfileService', 'HubUtility',
        function ($rootScope, $location, CookieUtility, $http, $window, $interval, ProfileService, HubUtility) {

            $rootScope.globals = CookieUtility.GetByName('globals');
            $rootScope.photoUploadLimit = 9;

            if ($rootScope.globals.currentUser) {

                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
                HubUtility.InitConnection();
                ProfileService.UpdateOnlineStatus($rootScope.globals.currentUser.id);
            }

            function onScroll() {
                $rootScope.windowScrollY = $window.scrollY;
                $rootScope.$apply();
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {

                $rootScope.isSmallResolution = $window.innerWidth <= 992;
                $rootScope.isFooterHidden = $location.path().includes('/search');

                if ($rootScope.globals.currentUser)
                    $rootScope.name = $rootScope.globals.currentUser.name;

                var isRestrictedPage = $.inArray($location.path(), ['/profile']) >= 0;
                if (isRestrictedPage && !$rootScope.globals.currentUser)
                    $location.path('/login');

                if (!$rootScope.isSmallResolution && $location.path() === '/profile')
                    angular.element($window).on('scroll', onScroll);
                else
                    angular.element($window).off('scroll', onScroll);

                if ($rootScope.isSmallResolution)
                    $('.navbar-collapse').collapse('hide');
            });
        }])
    .controller('mainCtrl', ['$scope', '$rootScope', '$location', '$timeout', 'AnchorSmoothScrollService', 'AuthenticationService', 'HubUtility',
        function ($scope, $rootScope, $location, $timeout, AnchorSmoothScrollService, AuthenticationService, HubUtility) {

            $scope.gotoElement = function (eID) {
                if ($rootScope.isSmallResolution) {
                    $location.path('/profile');
                    $timeout(function () {
                        AnchorSmoothScrollService.ScrollTo(eID);
                    }, 500);
                }
                else {
                    AnchorSmoothScrollService.ScrollTo(eID);
                }
                $('.navbar-collapse').collapse('hide');
            };

            $scope.logout = function () {
                AuthenticationService.ClearCredentials();
                HubUtility.Disconnect();
                $location.path('/login');
            }
        }])
    .animation('.reveal-animation',function () {
        return {
            enter: function (element, done) {
                jQuery(element).hide().fadeIn(1000, done);
            },
            leave: function (element, done) {
                jQuery(element).hide();
            }
        }
    })
