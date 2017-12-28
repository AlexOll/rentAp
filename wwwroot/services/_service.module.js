﻿'use strict';
﻿
angular.module('services', ['ngRoute','ngCookies'])
    .service('UserService', UserService)
    .service('AuthenticationService', AuthenticationService)
    .service('AnchorSmoothScrollService', AnchorSmoothScrollService)
    .service('ProfileService', ProfileService)
    .service('DictionaryService', DictionaryService)

