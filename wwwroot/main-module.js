
'use strict';

angular
    .module('myApp',
    [
        'ngRoute',
        'myApp.login',
        'myApp.forgotpassword',
        'myApp.register',
        'myApp.home',
        'myApp.view2',
        'myApp.view3',
        'myApp.version'
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
            .when('/view2', {
                templateUrl: 'components/view2/view2.html',
                controller: 'View2Ctrl'
            })
            .when('/view3', {
                templateUrl: 'components/view3/view3.html',
                controller: 'View3Ctrl'
            });
    }])
    .run(['$rootScope', '$location', '$cookies', '$http', function ($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/forgotpassword']) === -1;
            $rootScope.loggedIn = $rootScope.globals.currentUser;
            if ($rootScope.loggedIn) {
                $rootScope.username = $rootScope.globals.currentUser.username;
                if (restrictedPage) {
                    $location.path('/');
                }
            }
            $rootScope.logout = function () {
                alert();
                $rootScope.globals = {};
                $cookies.remove('globals');
                $http.defaults.headers.common.Authorization = 'Basic';

                $location.path('/login');
            }
        });
    }])
