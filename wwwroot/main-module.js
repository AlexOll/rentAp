(function () {
    'use strict';

    angular
        .module('myApp',
        [
            'ngRoute',
            'myApp.login', 
            'myApp.forgotpassword',
            'myApp.register',
            'myApp.view1',
            'myApp.view2',
            'myApp.view3',
            'myApp.version'
        ])
        .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
            $locationProvider.html5Mode(true).hashPrefix('');

            $routeProvider
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
                .when('/view1', {
                    templateUrl: 'components/view1/view1.html',
                    controller: 'View1Ctrl'
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
        .run(run);

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];

    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/forgotpassword']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
    
})();
