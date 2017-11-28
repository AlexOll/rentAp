'use strict';

angular
    .module('directives', [])
    .directive('uniqueField', uniqueDirective);

uniqueDirective.$inject = ['$http'];
function uniqueDirective($http) {
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

                        var url = '';
                        if (attr.id === "username")
                            url = '/api/user/usernamecheck'
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
}
