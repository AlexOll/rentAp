
angular.module('myApp.profile', ['ngRoute', 'ngMaterial', 'services', 'toastr', 'base64', 'utilities'])
    .controller('profileCtrl',
    ['$rootScope', '$scope', 'UserService', 'AuthenticationService', 'toastr', '$timeout', 'AnchorSmoothScrollService', '$base64', 'ProfileService', 'GuidUtility',
        function ($rootScope, $scope, UserService, AuthenticationService, toastr, $timeout, AnchorSmoothScrollService, $base64, ProfileService, GuidUtility) {

            function ScrollChatDown() {
                $timeout(function () {
                    var objDiv = angular.element(document.querySelector('.chat-history'))[0];
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

            $scope.user = angular.copy($rootScope.globals.currentUser);

            $scope.userMessages = [
                { id: "111", body: "Hi to ME", createDateTime: "10:00 AM, Today", isRead: false, userIdFrom: "1ca88925-5ee3-4278-8808-d1229726af60", userIdTo: $scope.user.id },
                { id: "121", body: "Hi to U", createDateTime: "10:10 AM, Today", isRead: true, userIdFrom: $scope.user.id, userIdTo: "1ca88925-5ee3-4278-8808-d1229726af60" },
                { id: "131", body: "Hi to ME", createDateTime: "10:14 AM, Today", isRead: true, userIdFrom: "1ca88925-5ee3-4278-8808-d1229726af60", userIdTo: $scope.user.id },
                { id: "141", body: "Hi to ME", createDateTime: "10:18 AM, Today", isRead: true, userIdFrom: "1ca88925-5ee3-4278-8808-d1229726af60", userIdTo: $scope.user.id },
                { id: "151", body: "Hi!5", createDateTime: "today", isRead: false, userIdFrom: $scope.user.id, userIdTo: "1ca88925-5ee3-4278-8808-d1229726af60" },
                { id: "151", body: "Hi!5", createDateTime: "today", isRead: false, userIdFrom: $scope.user.id, userIdTo: "1211111" },
                { id: "151", body: "Hi!5", createDateTime: "today", isRead: false, userIdFrom: $scope.user.id, userIdTo: "1311111" },
                { id: "151", body: "Hi!5", createDateTime: "today", isRead: false, userIdFrom: $scope.user.id, userIdTo: "1411111" },
                { id: "151", body: "Hi!5", createDateTime: "today", isRead: false, userIdFrom: $scope.user.id, userIdTo: "1511111" },
                { id: "151", body: "Hi!5", createDateTime: "today", isRead: false, userIdFrom: "1511111", userIdTo: $scope.user.id }
            ]

            $scope.chatUsers = [
                { id: "1ca88925-5ee3-4278-8808-d1229726af60", name: "John Brown", isOnline: true, profileImageURL: "../../img/chat_avatars/chat_avatar_01.jpg", lastEntrance: "online" },
                { id: "1211111", name: "John2", isOnline: true, profileImageURL: "../../img/chat_avatars/chat_avatar_02.jpg", lastEntrance: "online" },
                { id: "1311111", name: "John3", isOnline: false, profileImageURL: "../../img/chat_avatars/chat_avatar_03.jpg", lastEntrance: " left 7 mins ago " },
                { id: "1411111", name: "John4", isOnline: false, profileImageURL: "../../img/chat_avatars/chat_avatar_04.jpg", lastEntrance: " left 7 mins ago " },
                { id: "1511111", name: "John5", isOnline: false, profileImageURL: "../../img/chat_avatars/chat_avatar_05.jpg", lastEntrance: " left 7 mins ago " }
            ]

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

            $scope.sendMessageInChat = function () {
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

                ProfileService.SendMessageInChat(message, function (response) {

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

            $scope.updateProfile = function (ev) {
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




