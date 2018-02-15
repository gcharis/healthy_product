import app from 'angularApp';

app.service('$products', function($http, $rootScope) {
	function deleteToken() {
		localStorage.removeItem('token');
		$rootScope.$broadcast('admin logged out');
	}

	return {
		getAll() {
			return $http.get('/products/all').then((res) => res.data);
		},
		getOneBySlug(slug) {
			return $http.get(`/products/one-slug/${slug}`).then((res) => res.data);
		},
		register(newProduct) {
			return $http
				.post('/products/new/admin', newProduct, { headers: { token: localStorage.token } })
				.then((res) => res.data);
		},
		updateOneById(product) {
			return $http
				.put(`/products/one/${product._id}/admin`, product, { headers: { token: localStorage.token } })
				.then((res) => res.data);
		},
		deleteOneById(id) {
			return $http
				.delete(`/products/one/${id}/admin`, { headers: { token: localStorage.token } })
				.then((res) => res.data);
		}
	};
});
