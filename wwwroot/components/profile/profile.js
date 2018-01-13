
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
                $rootScope.windowScrollY = 0;
                $scope.favoritesH = angular.element(document.querySelector('#favorites'))[0].offsetTop;
                $scope.editProfileH = angular.element(document.querySelector('#editProfile'))[0].offsetTop;
                $scope.myRealEstateH = angular.element(document.querySelector('#myRealEstate'))[0].offsetTop;
                $scope.watchDogH = angular.element(document.querySelector('#watchDog'))[0].offsetTop;
            }, 1000);

            ProfileService.GetUserMessages($scope.user.id, function (response) {

                $scope.userMessages = response.data["messages"];
                $scope.chatUsers = response.data["users"];
                $scope.chosenChater = $scope.chatUsers[0];

                ScrollChatDown();
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

                    $scope.userMessages.push(message);
                    ScrollChatDown();

                    $scope.newMessage = null;
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
                $scope.user.profileImageURL = $rootScope.globals.currentUser.profileImage.dataURL;
                UserService.Update($scope.user, function (response) {

                    if (response.data.responseCode === 200) {
                        AuthenticationService.SetCredentials(response.data);

                        toastr.success('Your profile has been updated.', 'Success!');
                        $scope.user.password = '';
                    }
                    else {
                        toastr.error(response.data.message, "Error", {
                            "timeOut": "3000",
                            "extendedTImeout": "0"
                        });
                        $scope.user.password = '';
                    }
                });
                $scope.dataLoading = false;
            }

            $scope.myLocations = [
                { id: 11, address: 'Rusakovskaya Naberezhnaya 1', description: "Description", price: 500, photoURL: '../../img/flat/noImage.jpg' },
                { id: 12, address: 'Rusakovskaya Naberezhnaya 2', description: "Description", price: 500, photoURL: '../../img/flat/noImage.jpg' },
                { id: 13, address: 'Rusakovskaya Naberezhnaya 3', description: "Description", price: 500, photoURL: '../../img/flat/noImage.jpg' },
                { id: 14, address: 'Rusakovskaya Naberezhnaya 4', description: "Description", price: 500, photoURL: '../../img/flat/noImage.jpg' },
            ]

            $scope.deleteMyRealEstate = function (id) {
                alert("delete "+id)
            }

            $scope.editMyRealEstate = function (id) {
                alert("edit " + id)
            }
            
        }])




