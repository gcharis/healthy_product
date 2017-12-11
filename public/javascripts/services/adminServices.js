app.service('$admin', function($http) {
	return {
		login(data) {
			return new Promise((resolve, reject) => {
				$http
					.post(`${URL}/admin/login`, data)
					.then((res) => resolve(res.data.token))
					.catch((res) => console.error(res.data.message));
			});
		}
	};
});
