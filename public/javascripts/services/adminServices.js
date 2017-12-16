app.service('$admin', function($http, $rootScope) {
	function saveToken(token) {
		localStorage.setItem('token', token);
		$rootScope.$broadcast('admin logged in');
	}

	return {
		getVerification(token) {
			return new Promise((resolve, reject) => {
				$http
					.post(`${URL}/admin/verify`, null, {
						headers: {
							token
						}
					})
					.then((res) => resolve(res.data))
					.catch((res) => reject(res.data));
			});
		},
		register(data) {
			return new Promise((resolve, reject) => {
				$http
					.post(`${URL}/admin/register`, data)
					.then((res) => {
						saveToken(res.data.token);
						resolve(res.data.message);
					})
					.catch((res) => reject(res.data));
			});
		},
		login(data) {
			return new Promise((resolve, reject) => {
				$http
					.post(`${URL}/admin/login`, data)
					.then((res) => {
						saveToken(res.data.token);
						resolve(res.data.token);
					})
					.catch((res) => reject(res.data));
			});
		}
	};
});
