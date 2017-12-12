app.service('$admin', function($http) {
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
		login(data) {
			return new Promise((resolve, reject) => {
				$http
					.post(`${URL}/admin/login`, data)
					.then((res) => resolve(res.data.token))
					.catch((res) => reject(res.data));
			});
		}
	};
});
