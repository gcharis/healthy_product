app.service('$admin', function($http, $rootScope) {
	function saveToken(token) {
		localStorage.setItem('token', token);
		$rootScope.$broadcast('admin logged in');
	}

	return {
		getVerification(token) {
			return $http.post(`${URL}/admin/verify`, null, {
				headers: {
					token
				}
			});
		},
		register(data) {
			return $http.post(`${URL}/admin/register`, data).then((res) => {
				saveToken(res.data.token);
				return res.data.message;
			});
		},
		login(data) {
			return $http.post(`${URL}/admin/login`, data).then((res) => {
				saveToken(res.data.token);
				return res.data.token;
			});
		}
	};
});
