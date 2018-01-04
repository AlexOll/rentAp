(function () {

    'use strict';

    angular.module('utilities', []);

})();


(function () {
    'use strict';

    angular
        .module('utilities')
        .factory('GuidUtility', GuidUtility);

    GuidUtility.$inject = [];

    function GuidUtility() {
        var service = {
            createGuid: createGuid
        };

        return service;

        function createGuid() {
            function _p8(s) {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('utilities')
        .factory('HubUtility', HubUtility);

    HubUtility.$inject = ['$rootScope'];

    function HubUtility($rootScope) {
        var service = {
            InitConnection: InitConnection,
            MessageSent: MessageSent,
            OnlineStatusUpdated: OnlineStatusUpdated,
            Disconnect: Disconnect
        };

        return service;

        function InitConnection() {
            $rootScope.hubConnection = new signalR.HubConnection('/mainHub');
            $rootScope.hubConnection.start().then(
                function () {
                    $rootScope.hubConnection.invoke("InitConnection", $rootScope.globals.currentUser.id);
                });
            $rootScope.hubConnection.on('messageSent', function (res) { });
            $rootScope.hubConnection.on('onlineStatusUpdated', function (res) { });
        }

        function MessageSent(callback) {
            $rootScope.hubConnection.on('messageSent', function (res) { return callback(res) });
        }
        function OnlineStatusUpdated(callback) {
            $rootScope.hubConnection.on('onlineStatusUpdated', function (res) { return callback(res) });
        }
        function Disconnect() {
            $rootScope.hubConnection.stop()
        }

    }
})();
(function () {

    'use strict';

    angular.module('directives', []);

})();


(function () {
    'use strict';

    angular
        .module('directives')
        .directive('ngAutocomplete', function ($timeout) {
            return {
                require: 'ngModel',
                scope: {
                    ngModel: '=',
                    options: '=?',
                    details: '=?',
                    lat: "=lat",
                    lng: "=lng"
                },

                link: function (scope, element, attr, ctrl) {

                    $timeout(function () {
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

                        if (scope.gPlace === undefined) {
                            scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
                        }

                        google.maps.event.addListener(scope.gPlace, 'place_changed', function () {

                            var result = scope.gPlace.getPlace();

                            if (result !== undefined) {

                                if (result.address_components !== undefined) {
                                    ctrl.$setValidity('notexists', false);

                                    attr.$set('lat', result.geometry.location.lat());
                                    attr.$set('lng', result.geometry.location.lng());

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
                                        if (list === null || list.length === 0) {

                                            scope.$apply(function () {
                                                scope.details = null;
                                            });

                                        } else {
                                            var placesService = new google.maps.places.PlacesService(element[0]);
                                            placesService.getDetails(
                                                { 'reference': list[0].reference },
                                                function detailsresult(detailsResult, placesServiceStatus) {

                                                    if (placesServiceStatus === google.maps.GeocoderStatus.OK) {
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

                    },1000);   
                 
                }
            };
        })


})();
(function () {
    'use strict';

    angular
        .module('directives')
        .directive('ngExtendedSelect', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, elem, attr, ctrl) {
                    $timeout(function () {
                        jQuery(elem).children().mousedown(function (e) {
                            e.preventDefault();
                            $(this).toggleClass('selected');
                            $(this).prop('selected', !$(this).prop('selected'));
                            $(this).parent().focus();
                            $(this).trigger('change');
                        });
                    }, 0);
                }
            }
        })
})();
(function () {
    'use strict';

    angular
        .module('directives')
        .directive('ngImageCompress', ['$q', '$rootScope', function ($q, $rootScope) {


            var URL = window.URL || window.webkitURL;

            var getResizeArea = function () {
                var resizeAreaId = 'fileupload-resize-area';

                var resizeArea = document.getElementById(resizeAreaId);

                if (!resizeArea) {
                    resizeArea = document.createElement('canvas');
                    resizeArea.id = resizeAreaId;
                    resizeArea.style.visibility = 'hidden';
                    document.body.appendChild(resizeArea);
                }

                return resizeArea;
            };

            /**
             * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
             * @param {Image} sourceImgObj The source Image Object
             * @param {Integer} quality The output quality of Image Object
             * @return {Image} result_image_obj The compressed Image Object
             */

            var jicCompress = function (sourceImgObj, options) {
                var outputFormat = options.resizeType;
                var quality = options.resizeQuality * 100 || 70;
                var mimeType = 'image/jpeg';
                if (outputFormat !== undefined && outputFormat === 'png') {
                    mimeType = 'image/png';
                }


                var maxHeight = options.resizeMaxHeight || 300;
                var maxWidth = options.resizeMaxWidth || 250;

                var height = sourceImgObj.height;
                var width = sourceImgObj.width;

                // calculate the width and height, constraining the proportions
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round(height *= maxWidth / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round(width *= maxHeight / height);
                        height = maxHeight;
                    }
                }

                var cvs = document.createElement('canvas');
                cvs.width = width; //sourceImgObj.naturalWidth;
                cvs.height = height; //sourceImgObj.naturalHeight;
                var ctx = cvs.getContext('2d').drawImage(sourceImgObj, 0, 0, width, height);
                var newImageData = cvs.toDataURL(mimeType, quality / 100);
                var resultImageObj = new Image();
                resultImageObj.src = newImageData;
                return resultImageObj.src;

            };

            var createImage = function (url, callback) {
                var image = new Image();
                image.onload = function () {
                    callback(image);
                };
                image.src = url;
            };

            var fileToDataURL = function (file) {
                var deferred = $q.defer();
                var reader = new FileReader();
                reader.onload = function (e) {
                    deferred.resolve(e.target.result);
                };
                reader.readAsDataURL(file);
                return deferred.promise;
            };


            return {
                restrict: 'A',
                scope: {
                    //image: '=',
                    resizeMaxHeight: '@?',
                    resizeMaxWidth: '@?',
                    resizeQuality: '@?',
                    resizeType: '@?'
                },
                link: function (scope, element, attrs) {
                    var doResizing = function (imageResult, callback) {
                        createImage(imageResult.url, function (image) {
                            var dataURLcompressed = jicCompress(image, scope);
                            imageResult.compressed = {
                                dataURL: dataURLcompressed,
                                type: dataURLcompressed.match(/:(.+\/.+);/)[1]
                            };
                            callback(imageResult);
                        });
                    };

                    var applyScope = function (imageResult) {
                        scope.$apply(function () {
                            if (attrs.multiple) {
                                //scope.image.push(imageResult);
                            } else {
                                $rootScope.globals.currentUser.profileImageURL = imageResult.compressed.dataURL;
                                //scope.image = imageResult;
                            }
                        });
                    };


                    element.bind('change', function (evt) {
                        //when multiple always return an array of images
                        if (attrs.multiple) {
                            scope.image = [];
                        }

                        var files = evt.target.files;
                        for (var i = 0; i < files.length; i++) {
                            //create a result object for each file in files
                            var imageResult = {
                                file: files[i],
                                url: URL.createObjectURL(files[i])
                            };

                            fileToDataURL(files[i]).then(function (dataURL) {
                                imageResult.dataURL = dataURL;
                            });

                            if (scope.resizeMaxHeight || scope.resizeMaxWidth) { //resize image
                                doResizing(imageResult, function (imageResult) {
                                    applyScope(imageResult);
                                });
                            } else { //no resizing
                                applyScope(imageResult);
                            }
                        }
                    });
                }
            };
        }
        ]);

})();
(function () {
    'use strict';

    angular
        .module('directives')
        .directive('setHeight', function ($window) {
            return {
                link: function (scope, element, attrs) {
                    element.css('height', $window.innerHeight * attrs.setHeight + 'px');
                }
            }
        })


})();
(function () {
    'use strict';

    angular
        .module('directives')
        .directive('uniqueField', ['$http', '$rootScope', function ($http, $rootScope) {
            var toId;
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attr, ctrl) {
                    scope.$watch(attr.ngModel, function (inputValue) {
                        if (toId) clearTimeout(toId);

                        toId = setTimeout(function () {
                            ctrl.$setValidity('duplicate', true);

                            if (inputValue && !ctrl.$error.pattern) {
                                if ($rootScope.globals.currentUser &&
                                    inputValue === $rootScope.globals.currentUser.phonenumber) {
                                    return;
                                }
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

})();

(function () {

    'use strict';

    angular.module('services', ['ngRoute', 'ngCookies']);

})();




(function () {
    'use strict';

    angular
        .module('services')
        .factory('AnchorSmoothScrollService', AnchorSmoothScrollService)

    AnchorSmoothScrollService.$inject = [];

    function AnchorSmoothScrollService() {
        var service = {
            ScrollTo: ScrollTo
        };

        return service;

        function ScrollTo(eID) {

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
                if (self.pageYOffset) return self.pageYOffset;
                if (document.documentElement && document.documentElement.scrollTop)
                    return document.documentElement.scrollTop;
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
})();

(function () {
    'use strict';

    angular
        .module('services')
        .factory('UserService', UserService)

    UserService.$inject = ['$http'];

    function UserService($http) {
        var service = {
            Create: Create,
            Update: Update
        };

        return service;

        function Create(user, callback) {
            $http.post('/api/user', {
                "PhoneNumber": user.phonenumber,
                "FirstName": user.firstName,
                "LastName": user.lastName,
                "Password": user.password,
                "Email": user.email
            }).then(function (res) {
                return callback(res);
            })
        }
        function Update(user, callback) {
             $http.post('/api/user/update', {
                "Id": user.id,
                "PhoneNumber": user.phonenumber,
                "FirstName": user.firstname,
                "LastName": user.lastname,
                "Password": user.password,
                "Email": user.email,
                "ProfileImageURL": user.profileImageURL
             }).then(function (res) {
                 return callback(res);
             })
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('services')
        .factory('AuthenticationService', AuthenticationService)

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$base64'];

    function AuthenticationService($http, $cookies, $rootScope, $base64) {
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
                .then(function (res) {return callback(res)});
        }

        function ForgotPass(email, callback) {
            $http.get('/api/authentication/forgotpassword/' + email)
                .then(function (res) { return callback(res) });
        }

        function ResendActivationCode(email, callback) {
            $http.get('/api/authentication/newactivationcode/' + email)
                .then(function (res) { return callback(res) });
        }

        function CheckActivationCode(activationCode, callback) {
            $http.get('/api/authentication/' + activationCode)
                .then(function (res) { return callback(res) });
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

            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
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
        };

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

            //Base64ToImage(source) {
    //    var result = null;

    //    if (typeof source !== 'string') {
    //        return result;
    //    }
    //    var dataURL = $base64.decode(source);
    //    var mime = dataURL.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

    //    if (mime && mime.length) {
    //        result = new File([""], "", { type: mime[1] })
    //        result.dataURL = dataURL;
    //    }

    //    return result;
    //}
    }
})();

(function () {
    'use strict';

    angular
        .module('services')
        .factory('DictionaryService', DictionaryService)

    DictionaryService.$inject = ['$http'];

    function DictionaryService($http) {
        var service = {
            GetServiceTypes: GetServiceTypes
        };

        return service;

        function GetServiceTypes(callback) {
            $http.get('/api/dictionary/servicetypes')
                .then(function (res) { return callback(res) });
        }
    }
})();


(function () {
    'use strict';

    angular
        .module('services')
        .factory('ProfileService', ProfileService)

    ProfileService.$inject = ['$http','$interval'];

    function ProfileService($http, $interval) {
        var service = {
            GetUserMessages: getUserMessages,
            SendChatMessage: SendChatMessage,
            UpdateOnlineStatus: UpdateOnlineStatus
        };

        return service;

        function getUserMessages(id, callback) {
            $http.get('/api/profile/usermessages/' + id)
                .then(function (res) { return callback(res) });
        }

        function SendChatMessage(message, callback) {
            $http.post('/api/profile', {
                "Id": message.id,
                "UserIdFrom": message.userIdFrom,
                "UserIdTo": message.userIdTo,
                "Body": message.body,
                "CreateDateTime": message.createDateTime,
            })
                .then(function (res) { return callback(res) });
        }

        function UpdateOnlineStatus(id) {
            $interval(function () {
                $http.put('/api/profile/updateonlinestatus/' + id)
                    .then();
            }, 60000);
        }
    }
})();


angular.module('myApp.login', ['ngRoute', 'ngMaterial', 'services', 'toastr'])
    .controller('loginCtrl', ['$scope', '$location', '$mdDialog', 'AuthenticationService', 'toastr', 'HubUtility',
        function ($scope, $location, $mdDialog, AuthenticationService, toastr, HubUtility) {

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
                        HubUtility.InitConnection();
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


angular.module('myApp.home', ['directives'])
    .controller('homeCtrl', ['$scope', 'DictionaryService', 'toastr', '$location',
        function ($scope, DictionaryService, toastr, $location) {

            $scope.city = null;
            $scope.options = {
                country: 'ukr',
                types: '(cities)'
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

                $location.path('/search/').search({
                    propertyType: $scope.propertyType.model,
                    serviceType: $scope.serviceType.model,
                    city: $scope.city,
                    lat: $scope.form.city.$$attr.lat,
                    lng: $scope.form.city.$$attr.lng,
                });
            }


            DictionaryService.GetServiceTypes(function (response) {

                if (response.status === 200) {

                    $scope.serviceType = {};
                    $scope.serviceType.availableOptions = [];

                    angular.forEach(response.data, function (value, key) {
                        $scope.serviceType.availableOptions.push({ "id": key, "name": value });
                    });

                    $scope.serviceType.model = $scope.serviceType.availableOptions[0].id;
                }
                else {
                    toastr.error('Error code: ' + response.status, "Error", {
                        "timeOut": "5000",
                        "extendedTImeout": "0"
                    });
                }
            });
        }]);

angular.module('myApp.profile', ['ngRoute', 'ngMaterial', 'services', 'toastr', 'base64', 'utilities'])
    .controller('profileCtrl',
    ['$rootScope', '$scope', 'UserService', 'AuthenticationService', 'toastr', '$timeout', 'AnchorSmoothScrollService', '$base64', 'ProfileService', 'GuidUtility', 'HubUtility',
        function ($rootScope, $scope, UserService, AuthenticationService, toastr, $timeout, AnchorSmoothScrollService, $base64, ProfileService, GuidUtility, HubUtility) {

            $scope.user = angular.copy($rootScope.globals.currentUser);

            HubUtility.MessageSent(function (msg) {
                $scope.userMessages.push(msg);
                $scope.$apply();
                ScrollChatDown();
            });

            HubUtility.OnlineStatusUpdated(function (msg) {
                $scope.chatUsers.forEach(function (user) {
                        user.lastOnlineDateTime = msg[user.id.toString()] || user.lastOnlineDateTime;
                });
                $scope.$apply();
            });
            

            function ScrollChatDown() {
                $timeout(function () {
                    var objDiv = angular.element(document.querySelector('.chat-history'))[0];
                    if (objDiv)
                        objDiv.scrollTop = objDiv.scrollHeight;
                }, 200);
            }

            $timeout(function () {
                if (!$rootScope.isSmallResolution) {
                    $rootScope.windowScrollY = 0;
                    $scope.favoritesH = angular.element(document.querySelector('#favorites'))[0].offsetTop;
                    $scope.editProfileH = angular.element(document.querySelector('#editProfile'))[0].offsetTop;
                    $scope.watchDogH = angular.element(document.querySelector('#watchDog'))[0].offsetTop;
                }
            }, 1000);

            ProfileService.GetUserMessages($scope.user.id, function (response) {

                if (response.data.responseCode === 200) {
                    $scope.userMessages = response.data["messages"];
                    $scope.chatUsers = response.data["users"];
                    $scope.chosenChater = $scope.chatUsers[0];

                    ScrollChatDown();
                }
                else {
                    toastr.error(response.data.message, "Error", {
                        "timeOut": "5000",
                        "extendedTImeout": "0"
                    });
                }
            });

            $scope.chooseChater = function (user) {
                $scope.chosenChater = user;
                $timeout(function () {
                    ScrollChatDown();
                    if ($rootScope.isSmallResolution) {
                        AnchorSmoothScrollService.ScrollTo('chat-header', -70);
                    }
                }, 500);
            }

            $scope.sendChatMessage = function () {
                var now = new Date();
                var guid = GuidUtility.createGuid();
                var message =
                    {
                        id: guid,
                        body: $scope.newMessage,
                        createDateTime: now,
                        userIdFrom: $scope.user.id,
                        userIdTo: $scope.chosenChater.id
                    }

                ProfileService.SendChatMessage(message, function (response) {

                    if (response.data.responseCode === 200) {
                        $scope.userMessages.push(message);
                        ScrollChatDown();

                        $scope.newMessage = null;
                    }
                    else {
                        toastr.error(response.data.message, "Error", {
                            "timeOut": "5000",
                            "extendedTImeout": "0"
                        });
                    }
                });
            }

            $scope.getMessageCreateDateTime = function (dateTime) {

                var actual = new Date(dateTime);
                var now = new Date();
                var diff = (now - actual) / 60 / 1000;
                if (diff < 1)
                    return "Just sent"
                else if (diff < 60) //less than an hour
                    return parseInt(diff) + " minutes ago"
                else if (diff < 60 * 24) //less than 24 hours
                    return actual.getHours() + ":" + actual.getMinutes()
                else
                    return actual.toLocaleDateString() + " " + actual.toLocaleTimeString();
            }

            $scope.getOnlineStatus = function (dateTime) {

                var actual = new Date(dateTime);
                var now = new Date();
                var diff = (now - actual) / 60 / 1000;
                if (diff < 1)
                    return "Online"
                else if (diff < 60)
                    return "Was here " + parseInt(diff) + " minutes ago"
                else if (diff < 60 * 24)
                    return "Last entrance - " + actual.getHours() + ":" + actual.getMinutes()
                else
                    return "Last entrance - " + actual.toLocaleDateString() + " " + actual.toLocaleTimeString();
            }

            $scope.updateProfile = function (ev) {

                $scope.dataLoading = true;
                $scope.user.profileImageURL = $rootScope.globals.currentUser.profileImageURL;
                UserService.Update($scope.user, function (response) {

                    if (response.data.responseCode === 200) {
                        AuthenticationService.SetCredentials(response.data);

                        toastr.success('Your profile has been updated.', 'Success!');
                        $scope.user.password = '';
                    }
                    else {
                        toastr.error(response.data.message, "Error", {
                            "timeOut": "5000",
                            "extendedTImeout": "0"
                        });
                        $scope.user.password = '';
                    }
                });
                $scope.dataLoading = false;
            }

        }])





angular.module('myApp.mapSearch', [])
    .controller('mapSearchCtrl', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {

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

        var params = $location.search()

        $scope.city = params.city;
        $scope.serviceType.model = parseInt(params.serviceType);
        $scope.propertyType.model = params.propertyType == null ? [] : params.propertyType.map(Number);

        $scope.choosePropertyType = function (opt) {

            var index = $scope.propertyType.model.indexOf(opt.id);
            if (index >= 0)
                $scope.propertyType.model.splice(index, 1);
            else
                $scope.propertyType.model.push(opt.id)
        }

        $(".dropdown dt").on('click', function () {
            $(".dropdown dd ul").slideToggle('fast');
        });

        $(".dropdown dd ul li").on('click', function () {
            $(".dropdown dd ul").hide();
        });

        $(document).bind('click', function (e) {
            var $clicked = $(e.target);
            if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
        });

        var locations = [
            { lat: -31.563910, lng: 147.154312 },
            { lat: -33.718234, lng: 150.363181 },
            { lat: -33.727111, lng: 150.371124 },
            { lat: -33.848588, lng: 151.209834 },
            { lat: -33.851702, lng: 151.216968 },
            { lat: -34.671264, lng: 150.863657 },
            { lat: -35.304724, lng: 148.662905 },
            { lat: -36.817685, lng: 175.699196 },
            { lat: -36.828611, lng: 175.790222 },
            { lat: -37.750000, lng: 145.116667 },
            { lat: -37.759859, lng: 145.128708 },
            { lat: -37.765015, lng: 145.133858 },
            { lat: -37.770104, lng: 145.143299 },
            { lat: -37.773700, lng: 145.145187 },
            { lat: -37.774785, lng: 145.137978 },
            { lat: -37.819616, lng: 144.968119 },
            { lat: -38.330766, lng: 144.695692 },
            { lat: -39.927193, lng: 175.053218 },
            { lat: -41.330162, lng: 174.865694 },
            { lat: -42.734358, lng: 147.439506 },
            { lat: -42.734358, lng: 147.501315 },
            { lat: -42.735258, lng: 147.438000 },
            { lat: -43.999792, lng: 170.463352 }
        ]

        function createMap(_lat, _lng, locations) {
            $timeout(function () {
                var myLatlng = { lat: _lat, lng: _lng };

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 14,
                    center: myLatlng
                });

                // Create an array of alphabetical characters used to label the markers.
                var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

                var markers = locations.map(function (location, i) {
                    return new google.maps.Marker({
                        position: location,
                        label: labels[i % labels.length]
                    });
                });

                // Add a marker clusterer to manage the markers.
                var markerCluster = new MarkerClusterer(map, markers,
                    { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
            }, 1000)
        }

        createMap(parseFloat(params.lat), parseFloat(params.lng), locations);

        $scope.$watch('city', function () {
            if ($scope.form.city.$$attr.lat && $scope.form.city.$$attr.lng)
                createMap($scope.form.city.$$attr.lat, $scope.form.city.$$attr.lng, locations);
        })
    }]);