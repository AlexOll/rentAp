class DictionaryService {
	constructor($http) {
		this.$http = $http;
	}

    GetServiceTypes(callback) {
        this.$http.get('/api/dictionary/servicetypes')
            .then(res => callback(res));
	}
}