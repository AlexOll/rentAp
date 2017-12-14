class AnchorSmoothScrollService {

    scrollTo(eID) {

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 20);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (var j = startY; j > stopY; j -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent !== document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };

}
class UserService {
    constructor($http) {
        this.$http = $http;
    }

    Create(user, callback) {
        return this.$http.post('/api/user', {
            "PhoneNumber": user.phonenumber,
            "FirstName": user.firstName,
            "LastName": user.lastName,
            "Password": user.password,
            "Email": user.email
        })
            .then(res => callback(res));
    }
    Update(user, callback) {
        return this.$http.put('/api/user', {
            "Id": user.id,
            "PhoneNumber": user.phonenumber,
            "FirstName": user.firstname,
            "LastName": user.lastname,
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

    Login(input, password, callback) {
        this.$http.post('/api/authentication', { Input: input, Password: password })
            .then(res => callback(res));
    }

    ForgotPass(email, callback) {
        this.$http.get('/api/authentication/forgotpassword/'+ email )
            .then(res => callback(res));
    }

    ResendActivationCode(email, callback) {
        this.$http.get('/api/authentication/newactivationcode/' + email)
            .then(res => callback(res));
    }

    CheckActivationCode(activationCode, callback) {
        this.$http.get('/api/authentication/' + activationCode)
            .then(res => callback(res));
    }

    SetCredentials(user) {
        var input = user.email + ':' + user.id;
        var authdata = this.Base64Encode(input);
        this.$rootScope.globals = {
            currentUser: {
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                phonenumber: user.phonenumber,
                lastname: user.lastname,
                name: user.firstname+' '+user.lastname,
                authdata: authdata
            }
        };

        this.$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

        var cookieExp = new Date();
        cookieExp.setDate(cookieExp.getDate() + 7);
        this.$cookies.putObject('globals', this.$rootScope.globals, { expires: cookieExp });
    }

    ClearCredentials() {
        this.$rootScope.globals = {};
        this.$cookies.remove('globals');
        this.$http.defaults.headers.common.Authorization = 'Basic';
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
﻿
angular.module('services', ['ngRoute','ngCookies'])
    .service('UserService', UserService)
    .service('AuthenticationService', AuthenticationService)
    .service('AnchorSmoothScrollService', AnchorSmoothScrollService)



angular.module('myApp.login', ['ngRoute', 'ngMaterial', 'services', 'toastr'])
    .controller('loginCtrl', ['$scope', '$location', '$mdDialog', 'AuthenticationService', 'toastr',
        function ($scope, $location, $mdDialog, AuthenticationService, toastr) {

            var searchObject = $location.search().activationcode;
            if (searchObject) {

                AuthenticationService.CheckActivationCode(searchObject, function (response) {
                    if (response.data.responseCode === 200) {

                        AuthenticationService.SetCredentials(response.data);
                        toastr.success('Activation code submitted', 'Have fun!');
                        $location.url('/');
                    }
                    else {
                        toastr.error(response.data.message, "Error", {
                            "timeOut": "5000",
                            "extendedTImeout": "0"
                        });
                    }
                })
            }

            $scope.login = function (ev) {
                $scope.dataLoading = true;
                AuthenticationService.Login($scope.input, $scope.password, function (response) {

                    if (response.data.responseCode === 200) {

                        AuthenticationService.SetCredentials(response.data);
                        toastr.success('Authentication succeeded', 'Have fun!');
                        $location.path('/');
                    }
                    else {
                        alert = $mdDialog.alert({
                            title: "You shall not pass",
                            textContent: response.data.message,
                            ok: 'Close',
                            clickOutsideToClose: true,
                            targetEvent: ev
                        });
                        $mdDialog.show(alert);

                        $scope.dataLoading = false;
                    }
                });
            }

        }]);



angular.module('myApp.forgotpassword', ['ngRoute', 'services', 'toastr', 'directives'])
    .controller('forgotpasswordCtrl', ['$scope', '$location', 'AuthenticationService', 'toastr',
        function ($scope, $location, AuthenticationService, toastr) {

            $scope.forgotPassword = function (ev) {
                $scope.dataLoading = true;
                AuthenticationService.ForgotPass($scope.email, function (response) {

                    if (response.data.responseCode === 200) {

                        toastr.success('Your new Password was sent', 'Check email!');
                        $location.path('/');
                    }
                    else {
                        toastr.error(response.data.message, "Title", {
                            "timeOut": "0",
                            "extendedTImeout": "0"
                        });
                    }
                });
            }

            $scope.resendActivationCode = function (ev) {
                $scope.dataLoading = true;
                AuthenticationService.ResendActivationCode($scope.email, function (response) {
                    if (response.status === 204) {

                        toastr.success('Your new Activation Code was sent', 'Check email!');
                        $location.path('/');
                    }
                    else {
                        toastr.error("Noooo oo oo ooooo!!!", "Title", {
                            "timeOut": "0",
                            "extendedTImeout": "0"
                        });
                    }
                });
            }

        }]);


'use strict';

angular.module('myApp.register', ['ngRoute', 'services', 'toastr', 'directives'])
    .controller('registerCtrl', ['$scope', 'UserService', '$location', 'toastr',
        function ($scope, UserService, $location, toastr) {

            $scope.register = function () {

                $scope.dataLoading = true;
                UserService.Create($scope.user, function (response) {

                    if (response.data.responseCode === 200) {
                        toastr.success('Check your e-mail for submission', 'Registration succeeded');
                        $location.path('/');
                    }
                    else {
                        alert = $mdDialog.alert({
                            title: "Can't register you're account!",
                            textContent: response.data.message,
                            ok: 'Close',
                            clickOutsideToClose: true,
                            targetEvent: ev
                        });
                        $mdDialog.show(alert);
                    }
                })
                $scope.dataLoading = false;
            }
        }]);


angular.module('myApp.home', ['ngRoute', 'directives'])
    .controller('homeCtrl', ['$scope', function ($scope) {

        $scope.city = null;
        $scope.options = {
            country: 'ukr',
            types: '(cities)'
        }; 

        $scope.serviceType = {
            model: 1,
            availableOptions: [
                { id: 1, name: 'Offer sale' },
                { id: 2, name: 'Rental offer' },
                { id: 3, name: 'Offer roommate' },
                { id: 4, name: 'Sales demand' },
                { id: 5, name: 'Demand rental' },
                { id: 6, name: 'Demand for roommates' }
            ]
        };

        $scope.propertyType = {
            model: [],
            availableOptions: [
                { id: 1, name: 'Appartment' },
                { id: 2, name: 'House' },
                { id: 3, name: 'Land' },
                { id: 4, name: 'Garage' },
                { id: 5, name: 'Office' },
                { id: 6, name: 'Commercial space' },
                { id: 7, name: 'Other' }
            ]
        };

        $scope.search = function () {

            var e = angular.element(document.querySelector('#city'))[0];
            $scope.placeId = e.attributes['placeid'].value;

            alert('see console log');
            console.log('placeId - ' + $scope.placeId);
            console.log('propertyType - ' + $scope.propertyType.model);
            console.log('serviceType - ' + $scope.serviceType.model);

        }
    }]);


angular.module('myApp.profile', ['ngRoute', 'ngMaterial', 'services', 'toastr'])
    .controller('profileCtrl', ['$rootScope', '$scope', 'UserService', 'AuthenticationService', 'toastr', '$mdDialog', '$timeout',
        function ($rootScope, $scope, UserService, AuthenticationService, toastr, $mdDialog, $timeout) {

            if (!$rootScope.isSmallResolution)
                $timeout(function () {
                    $rootScope.windowScrollY = 0;
                    $scope.favoritesH = angular.element(document.querySelector('#favorites'))[0].offsetTop;
                    $scope.editProfileH = angular.element(document.querySelector('#editProfile'))[0].offsetTop;
                    $scope.watchDogH = angular.element(document.querySelector('#watchDog'))[0].offsetTop;
                }, 100);

            $scope.user = $rootScope.globals.currentUser;

            $scope.userMessages = [
                { messageId: "111", body: "Hi!", createDateTime: "10:00 AM, Today", isRead: false, userIdFrom: "1111111", userIdTo: $scope.user.id },
                { messageId: "121", body: "Hi Vincent, how are you? How is the project coming along?", createDateTime: "10:10 AM, Today", isRead: true, userIdFrom: $scope.user.id, userIdTo: "1111111" },
                { messageId: "131", body: "Are we meeting today? Project has been already finished and I have results to show you.", createDateTime: "10:14 AM, Today", isRead: true, userIdFrom: "1111111", userIdTo: $scope.user.id },
                { messageId: "141", body: "Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?", createDateTime: "10:18 AM, Today", isRead: true, userIdFrom: "1111111", userIdTo: $scope.user.id },
                { messageId: "151", body: "Hi!5", createDateTime: "today", isRead: false, userIdFrom: $scope.user.id, userIdTo: "1111111" },
                { messageId: "151", body: "Hi!5", createDateTime: "today", isRead: false, userIdFrom: $scope.user.id, userIdTo: "1211111" },
                { messageId: "151", body: "Hi!5", createDateTime: "today", isRead: false, userIdFrom: $scope.user.id, userIdTo: "1311111" },
                { messageId: "151", body: "Hi!5", createDateTime: "today", isRead: false, userIdFrom: $scope.user.id, userIdTo: "1411111" },
                { messageId: "151", body: "Hi!5", createDateTime: "today", isRead: false, userIdFrom: $scope.user.id, userIdTo: "1511111" },
                { messageId: "151", body: "Hi!5", createDateTime: "today", isRead: false, userIdFrom: "1511111", userIdTo: $scope.user.id }
            ]

            $scope.chatUsers = [
                { userId: "1111111", name: "John Brown", isOnline: true, avatar: "../../img/chat_avatars/chat_avatar_01.jpg", lastEntrance: "online" },
                { userId: "1211111", name: "John2", isOnline: true, avatar: "../../img/chat_avatars/chat_avatar_02.jpg", lastEntrance: "online" },
                { userId: "1311111", name: "John3", isOnline: false, avatar: "../../img/chat_avatars/chat_avatar_03.jpg", lastEntrance: " left 7 mins ago " },
                { userId: "1411111", name: "John4", isOnline: false, avatar: "../../img/chat_avatars/chat_avatar_04.jpg", lastEntrance: " left 7 mins ago " },
                { userId: "1511111", name: "John5", isOnline: false, avatar: "../../img/chat_avatars/chat_avatar_05.jpg", lastEntrance: " left 7 mins ago " }
            ]
            $scope.chosenChater = $scope.chatUsers[0];

            $scope.chooseChater = function (user) {
                $scope.chosenChater = user;
            }
            $scope.editProfile = function (ev) {

                UserService.Update($scope.user, function (response) {

                    if (response.data.responseCode === 200) {

                        AuthenticationService.SetCredentials(response.data);
                        $scope.actualPhoneNumber = $rootScope.globals.currentUser.phonenumber;
                        $rootScope.name = $rootScope.globals.currentUser.name;
                        toastr.success('Your profile has been updated.', 'Success!');

                        $scope.user.password = '';
                    }
                    else {
                        alert = $mdDialog.alert({
                            title: "You shall not pass",
                            textContent: response.data.message,
                            ok: 'Close',
                            clickOutsideToClose: true,
                            targetEvent: ev
                        });
                        $mdDialog.show(alert);

                        $scope.dataLoading = false;
                    }
                });
            }
        }])




angular
    .module('directives', [])
    .directive('uniqueField', ['$http','$rootScope', function ($http,$rootScope) {
        var toId;
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                scope.$watch(attr.ngModel, function (inputValue) {

                    if (toId) clearTimeout(toId);

                    toId = setTimeout(function () {
                        ctrl.$setValidity('duplicate', true);
                        if (inputValue === $rootScope.globals.currentUser.phonenumber) {
                            return;
                        }
                        if (inputValue && !ctrl.$error.pattern) {

                            var url = '';
                            if (attr.id === "phonenumber")
                                url = '/api/user/phonenumbercheck'
                            else if (attr.id === "email")
                                url = '/api/user/emailcheck'

                            $http.get(url, { params: { value: inputValue } })
                                .then(function (response) {
                                    if (response.data) {
                                        ctrl.$setValidity('duplicate', false);
                                    }
                                    else {
                                        ctrl.$setValidity('duplicate', true);
                                    }
                                });
                        }
                    }, 500);
                })
            }
        }
    }])
    .directive('ngAutocomplete', function () {
        return {
            require: 'ngModel',
            scope: {
                ngModel: '=',
                options: '=?',
                details: '=?',
                placeid: "=placeid"
            },

            link: function (scope, element, attr, ctrl) {

                //options for autocomplete
                var opts
                var watchEnter = false
                //convert options provided to opts
                var initOpts = function () {

                    opts = {}
                    if (scope.options) {

                        if (scope.options.watchEnter !== true) {
                            watchEnter = false
                        } else {
                            watchEnter = true
                        }

                        if (scope.options.types) {
                            opts.types = []
                            opts.types.push(scope.options.types)
                            scope.gPlace.setTypes(opts.types)
                        } else {
                            scope.gPlace.setTypes([])
                        }

                        if (scope.options.bounds) {
                            opts.bounds = scope.options.bounds
                            scope.gPlace.setBounds(opts.bounds)
                        } else {
                            scope.gPlace.setBounds(null)
                        }

                        if (scope.options.country) {
                            opts.componentRestrictions = {
                                country: scope.options.country
                            }
                            scope.gPlace.setComponentRestrictions(opts.componentRestrictions)
                        } else {
                            scope.gPlace.setComponentRestrictions(null)
                        }
                    }
                }

                if (scope.gPlace == undefined) {
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
                }
                google.maps.event.addListener(scope.gPlace, 'place_changed', function () {

                    var result = scope.gPlace.getPlace();
                    attr.$set('placeid', result.place_id);
                    if (result !== undefined) {
                        if (result.address_components !== undefined) {
                            ctrl.$setValidity('notexists', false);

                            scope.$apply(function () {

                                scope.details = result;

                                ctrl.$setViewValue(element.val());
                            });
                        }
                        else {
                            ctrl.$setValidity('notexists', true);
                            if (watchEnter) {
                                getPlace(result)
                            }
                        }
                    }
                })

                //function to get retrieve the autocompletes first result using the AutocompleteService 
                var getPlace = function (result) {
                    var autocompleteService = new google.maps.places.AutocompleteService();
                    if (result.name.length > 0) {
                        autocompleteService.getPlacePredictions(
                            {
                                input: result.name,
                                offset: result.name.length
                            },
                            function listentoresult(list, status) {
                                if (list == null || list.length == 0) {

                                    scope.$apply(function () {
                                        scope.details = null;
                                    });

                                } else {
                                    var placesService = new google.maps.places.PlacesService(element[0]);
                                    placesService.getDetails(
                                        { 'reference': list[0].reference },
                                        function detailsresult(detailsResult, placesServiceStatus) {

                                            if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
                                                scope.$apply(function () {

                                                    ctrl.$setViewValue(detailsResult.formatted_address);
                                                    element.val(detailsResult.formatted_address);

                                                    scope.details = detailsResult;

                                                    //on focusout the value reverts, need to set it again.
                                                    var watchFocusOut = element.on('focusout', function (event) {
                                                        element.val(detailsResult.formatted_address);
                                                        element.unbind('focusout')
                                                    })

                                                });
                                            }
                                        }
                                    );
                                }
                            });
                    }
                }

                ctrl.$render = function () {
                    var location = ctrl.$viewValue;
                    element.val(location);
                };

                //watch options provided to directive
                scope.watchOptions = function () {
                    return scope.options
                };
                scope.$watch(scope.watchOptions, function () {
                    initOpts()
                }, true);

            }
        };
    })