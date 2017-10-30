class MyService1 {
    sayHello() {
        console.log('hello1');
    }
}

class MyService2 {
    sayHello() {
        console.log('hello1');
    }
}

'use strict';
angular.module('services', [])
    .service('MyService1', MyService1)
    .service('MyService2', MyService2);

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

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'components/view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', [function () {
        this.title = "sssss";
    }]);

'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'components/view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', [function () {

    }]);
'use strict';

angular.module('myApp.view3', ['ngRoute', 'ngCookies', 'services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'components/view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', ['$cookies', 'MyService1', 'MyService2', function ($cookies, MyService1, MyService2) {
        alert(MyService1);
        // Retrieving a cookie
        //var favoriteCookie = $cookies.put('myFavorite', 'oatmeal');
        alert($cookies);
        MyService1.sayHello();
        MyService2.sayHello();
        // Setting a cookie
    }]);