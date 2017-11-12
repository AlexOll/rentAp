﻿class UserService {
    constructor($http) {
        this.$http = $http;
    }

    Create(user, callback) {
        return this.$http.post('/api/user', {
            "Username": user.username,
            "FirstName": user.firstName,
            "LastName": user.lastName,
            "Password": user.password,
            "Email": user.email
        })
            .then(res => callback(res));
    }
}
