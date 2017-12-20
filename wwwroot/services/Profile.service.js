class ProfileService {
    constructor($http) {
        this.$http = $http;
    }

    GetUserMessages(id, callback) {
        this.$http.get('/api/profile/usermessages/' + id)
            .then(res => callback(res));
    }

    SendMessageInChat(message, callback) {
        return this.$http.post('/api/profile', {
            "Id": message.id,
            "UserIdFrom": message.userIdFrom,
            "UserIdTo": message.userIdTo,
            "Body": message.body,
            "CreateDateTime": message.createDateTime,
        })
            .then(res => callback(res));
    }
}

