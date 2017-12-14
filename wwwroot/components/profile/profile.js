
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



