(function () {
    'use strict';

    angular
        .module('services')
        .factory('AuthenticationService', AuthenticationService)

    AuthenticationService.$inject = ['$http', 'CookieUtility', '$rootScope', '$base64','ErrorService'];

    function AuthenticationService($http, CookieUtility, $rootScope, $base64, ErrorService) {
        var service = {
            Login: Login,
            ForgotPass: ForgotPass,
            ResendActivationCode: ResendActivationCode,
            CheckActivationCode: CheckActivationCode,
            SetCredentials: SetCredentials,
            ClearCredentials: ClearCredentials
        };

        return service;

        function Login(input, password, callback) {
            $http.post('/api/authentication', { Input: input, Password: password })
                .then(
                function (res) { return callback(res) },
                function (res) { return ErrorService.ErrorCallback(res) }
                );
        }

        function ForgotPass(email, callback) {
            $http.get('/api/authentication/forgotpassword/' + email)
                .then(
                function (res) { return callback(res) },
                function (res) { return ErrorService.ErrorCallback(res) }
                );
        }

        function ResendActivationCode(email, callback) {
            $http.get('/api/authentication/newactivationcode/' + email)
                .then(
                function (res) { return callback(res) },
                function (res) { return ErrorService.ErrorCallback(res) }
                );
        }

        function CheckActivationCode(activationCode, callback) {
            $http.get('/api/authentication/' + activationCode)
                .then(
                function (res) { return callback(res) },
                function (res) { return ErrorService.ErrorCallback(res) }
                );
        }

        function SetCredentials(user) {

            var input = user.email + ':' + user.id;
            var authdata = Base64Encode(input);

            $rootScope.globals = {
                currentUser: {
                    id: user.id,
                    email: user.email,
                    firstname: user.firstname,
                    phonenumber: user.phonenumber,
                    lastname: user.lastname,
                    name: user.firstname + ' ' + user.lastname,
                    profileImageURL: user.profileImageURL,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

            CookieUtility.PutObjectByName('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            CookieUtility.RemoveByName('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }

        function Base64Encode(input) {
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
                var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        }

        //Base64Decode(input) {

        //    var output = "";
        //    var chr1, chr2, chr3 = "";
        //    var enc1, enc2, enc3, enc4 = "";
        //    var i = 0;

        //    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        //    var base64test = /[^A-Za-z0-9\+\/\=]/g;
        //    if (base64test.exec(input)) {
        //        window.alert("There were invalid base64 characters in the input text.\n" +
        //            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
        //            "Expect errors in decoding.");
        //    }
        //    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        //    do {
        //        enc1 = keyStr.indexOf(input.charAt(i++));
        //        enc2 = keyStr.indexOf(input.charAt(i++));
        //        enc3 = keyStr.indexOf(input.charAt(i++));
        //        enc4 = keyStr.indexOf(input.charAt(i++));

        //        chr1 = (enc1 << 2) | (enc2 >> 4);
        //        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        //        chr3 = ((enc3 & 3) << 6) | enc4;

        //        output = output + String.fromCharCode(chr1);

        //        if (enc3 !== 64) {
        //            output = output + String.fromCharCode(chr2);
        //        }
        //        if (enc4 !== 64) {
        //            output = output + String.fromCharCode(chr3);
        //        }

        //        chr1 = chr2 = chr3 = "";
        //        enc1 = enc2 = enc3 = enc4 = "";

        //    } while (i < input.length);

        //    return output;
        //}


    }
})();
