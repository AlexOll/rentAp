
angular.module('myApp.profile', ['ngRoute', 'ngMaterial', 'services', 'toastr', 'base64', 'utilities'])
    .controller('profileCtrl',
    ['$rootScope', '$scope', 'UserService', 'AuthenticationService', 'toastr', '$timeout', 'AnchorSmoothScrollService', '$base64', 'ProfileService', 'GuidUtility', 'HubUtility',
        function ($rootScope, $scope, UserService, AuthenticationService, toastr, $timeout, AnchorSmoothScrollService, $base64, ProfileService, GuidUtility, HubUtility) {

            $scope.user = angular.copy($rootScope.globals.currentUser);

            HubUtility.messageSent(function (msg) {
                $scope.userMessages.push(msg);
                $scope.$apply();
                ScrollChatDown();
            });

            HubUtility.onlineStatusUpdated(function (msg) {
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
                        AnchorSmoothScrollService.scrollTo('chat-header', -70);
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
                debugger;
                $scope.dataLoading = true;
                $scope.user.profileImageURL = $rootScope.globals.currentUser.profileImageURL;
                UserService.Update($scope.user, function (response) {

                    if (response.data.responseCode === 200) {
                        AuthenticationService.SetCredentials(response.data);
                        $rootScope.name = $rootScope.globals.currentUser.name;
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




