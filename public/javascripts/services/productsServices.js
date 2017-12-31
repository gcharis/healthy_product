app.service('$products', function($http) {
	return {
		getAll() {
			return $http.get('/products/all').then((res) => res.data);
		},
		getBySlug(slug) {
			return $http.get(`/products/one-slug/${slug}`).then((res) => res.data);
		},
		register(newProduct) {
			return $http
				.post('/products/new/admin', newProduct, {
					headers: {
						token: localStorage['token']
					}
				})
				.then((res) => res.data);
		},
		deleteById(id) {
			return $http
				.delete(`/products/one/${id}/admin`, {
					headers: {
						token: localStorage['token']
					}
				})
				.then((res) => res.data);
		}
	};
});
