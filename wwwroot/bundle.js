class MyService1 {
    sayHello() {
        console.log('hello1');
    }
}

class MyService2 {
    sayHello() {
        console.log('hello2');
    }
}

class UserService {
    constructor($http) {
        this.$http = $http;
    }

    Create(user, callback) {
        return this.$http.post('/api/user', {
            "Username": user.username,
            "FirstName": user.firstName,
            "LastName": user.lastName,
            "Password": user.password,
            "Email": user.email
        })
            .then(res => callback(res));
    }
}


class AuthenticationService {
    constructor($http, $cookies, $rootScope) {

        this.$http = $http;
        this.$cookies = $cookies;
        this.$rootScope = $rootScope;
        this.keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    }

    Login(username, password, callback) {

        this.$http.post('/api/authentication', { Username: username, Password: password })
            .then(res => callback(res));
    }

    SetCredentials(username, password) {
        var input = username + ':' + password;
        var authdata = this.Base64Encode(input);

        this.$rootScope.globals = {
            currentUser: {
                username: username,
                authdata: authdata
            }
        };

        this.$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

        var cookieExp = new Date();
        cookieExp.setDate(cookieExp.getDate() + 7);
        this.$cookies.putObject('globals', this.$rootScope.globals, { expires: cookieExp });
    }

    ClearCredentials() {
        $rootScope.globals = {};
        $cookies.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic';
    }

    Base64Encode(input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this.keyStr.charAt(enc1) +
                this.keyStr.charAt(enc2) +
                this.keyStr.charAt(enc3) +
                this.keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    };

    Base64Decode(input) {

        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            window.alert("There were invalid base64 characters in the input text.\n" +
                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;
    }
};



'use strict';
angular.module('services', [])
    .service('MyService1', MyService1)
    .service('MyService2', MyService2)
    .service('UserService', UserService)
    .service('AuthenticationService', AuthenticationService);


'use strict';

angular.module('myApp.version.version-directive', [])

.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}]);

'use strict';

angular.module('myApp.version.interpolate-filter', [])

.filter('interpolate', ['version', function(version) {
  return function(text) {
    return String(text).replace(/\%VERSION\%/mg, version);
  };
}]);

'use strict';

angular.module('myApp.version', [
  'myApp.version.interpolate-filter',
  'myApp.version.version-directive'
])

.value('version', '0.1');

'use strict';

angular.module('myApp.login', ['ngRoute', 'ngMaterial', 'services', 'toastr'])
    .controller('loginCtrl', LoginController);

LoginController.$inject = ['$scope', '$location', '$mdDialog', 'AuthenticationService', 'toastr'];
function LoginController($scope, $location, $mdDialog, AuthenticationService, toastr) {

    $scope.login = function (ev) {
        $scope.dataLoading = true;
        AuthenticationService.Login($scope.username, $scope.password, function (response) {

            if (response.status === 200) {
                AuthenticationService.SetCredentials($scope.username, $scope.password);

                toastr.success('Authentication succeeded', 'Have fun!');
                $location.path('/');
            }
            else if (response.status === 204) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("You shall not pass")
                        .textContent("Account doesn't exist!")
                        .ok('Back')
                        .targetEvent(ev)
                );
                $scope.dataLoading = false;
            }
        });
    }
}


'use strict';

angular.module('myApp.register', ['ngRoute', 'services', 'toastr'])
    .controller('registerCtrl', RegisterController);

RegisterController.$inject = ['$scope', 'UserService', '$location', 'toastr'];
function RegisterController($scope, UserService, $location, toastr) {
    $scope.usernameCheck = function ()
    {
        $scope.dataLoading = true;
        console.log($scope.user.username.length);
        if ($scope.user.username.length===6)
        $scope.form.username.$setValidity("duplicate", false);
        //UserService.UsernameCheck($scope.user.username), function (response) {
        //    if (response.status === 200 && response.data.message !== null) {
        //        toastr.warning(response.data.message, 'Warning');
        //    }
        //}
        $scope.dataLoading = false;
    }
    $scope.register = function () {

        $scope.dataLoading = true;
        UserService.Create($scope.user, function (response) {
            if (response.status === 200) {
                if (response.data.message !== null) {
                    toastr.warning(response.data.message, 'Warning');
                }
                else
                {
                    toastr.success('Registration succeeded', 'Check your e-mail for submition');
                    $location.path('/');
                }
            }
            else {
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("You shall not pass")
                        .textContent("Account doesn't exist!")
                        .ok('Back')
                        .targetEvent(ev)
                );
            }
            $scope.dataLoading = false;
        })
    }
};


'use strict';

angular.module('myApp.register', ['ngRoute', 'services', 'toastr'])
    .controller('registerCtrl', RegisterController);

RegisterController.$inject = ['$scope', 'UserService', '$location', 'toastr'];
function RegisterController($scope, UserService, $location, toastr) {
    $scope.usernameCheck = function ()
    {
        $scope.dataLoading = true;
        console.log($scope.user.username.length);
        if ($scope.user.username.length===6)
        $scope.form.username.$setValidity("duplicate", false);
        //UserService.UsernameCheck($scope.user.username), function (response) {
        //    if (response.status === 200 && response.data.message !== null) {
        //        toastr.warning(response.data.message, 'Warning');
        //    }
        //}
        $scope.dataLoading = false;
    }
    $scope.register = function () {

        $scope.dataLoading = true;
        UserService.Create($scope.user, function (response) {
            if (response.status === 200) {
                if (response.data.message !== null) {
                    toastr.warning(response.data.message, 'Warning');
                }
                else
                {
                    toastr.success('Registration succeeded', 'Check your e-mail for submition');
                    $location.path('/');
                }
            }
            else {
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("You shall not pass")
                        .textContent("Account doesn't exist!")
                        .ok('Back')
                        .targetEvent(ev)
                );
            }
            $scope.dataLoading = false;
        })
    }
};


'use strict';

angular.module('myApp.view1', ['ngRoute'])



    .controller('View1Ctrl', [function () {
        this.title = "sssss";
    }]);

'use strict';

angular.module('myApp.view2', ['ngRoute'])



    .controller('View2Ctrl', [function () {

    }]);
'use strict';

angular.module('myApp.view3', ['ngRoute', 'ngCookies', 'services'])


    .controller('View3Ctrl', ['$cookies', 'MyService1', 'MyService2', function ($cookies, MyService1, MyService2) {
        // Retrieving a cookie
        //var favoriteCookie = $cookies.put('myFavorite', 'oatmeal');
        MyService1.sayHello();
        MyService2.sayHello();
        // Setting a cookie
    }]);