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
    .service('MyService2', MyService2)