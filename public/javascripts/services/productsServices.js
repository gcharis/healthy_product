app.service('$products', function($http) {
	return {
		getAll() {
			return new Promise((resolve, reject) => {
				$http.get(`${URL}/products/all`).then((res) => resolve(res.data)).catch((res) => reject(res.data));
			});
		},
		register(newProduct) {
			return new Promise((resolve, reject) => {
				$http
					.post(`${URL}/products/new/admin`, newProduct, {
						headers: {
							token: localStorage['token']
						}
					})
					.then((res) => resolve(res.data))
					.catch((res) => reject(res.data));
			});
		}
	};
});
