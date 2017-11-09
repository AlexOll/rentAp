class UserService {
    constructor($http) {
        this.$http = $http;
        }

    GetAll() {
        return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
    }

    GetById(id) {
        return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
    }

    GetByUsername(username) {
        return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
    }

    Create(user) {
        return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
    }

    Update(user) {
        return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
    }

    Delete(id) {
        return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
    }

    // private functions

    handleSuccess(res) {
        return res.data;
    }

    handleError(error) {
        return function () {
            return { success: false, message: error };
        };
    }
}

