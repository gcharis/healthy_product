app.service('$products', function($http) {
	return {
		getAll() {
			return $http.get(`${URL}/products/all`).then((res) => res.data);
		},
		register(newProduct) {
			return $http
				.post(`${URL}/products/new/admin`, newProduct, {
					headers: {
						token: localStorage['token']
					}
				})
				.then((res) => res.data);
		},
		deleteById(id) {
			return $http
				.delete(`${URL}/products/one/${id}/admin`, {
					headers: {
						token: localStorage['token']
					}
				})
				.then((res) => res.data);
		}
	};
});
