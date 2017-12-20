class UserService {
    constructor($http) {
        this.$http = $http;
    }

    Create(user, callback) {
        return this.$http.post('/api/user', {
            "PhoneNumber": user.phonenumber,
            "FirstName": user.firstName,
            "LastName": user.lastName,
            "Password": user.password,
            "Email": user.email
        })
            .then(res => callback(res));
    }
    Update(user, callback) {
        debugger;
        return this.$http.put('/api/user', {
            "Id": user.id,
            "PhoneNumber": user.phonenumber,
            "FirstName": user.firstname,
            "LastName": user.lastname,
            "Password": user.password,
            "Email": user.email,
            "ProfileImageURL": user.profileImageURL
        })
            .then(res => callback(res));
    }
}

