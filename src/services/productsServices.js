import app from 'angularApp';

app.service('$products', function($http, $rootScope, $location) {
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
				.then((res) => res.data)
				.catch((res) => {
					if (res.status === 401) {
						deleteToken();
						$location.path('/login');
					}
					return res.data;
				});
		},
		updateOneById(product) {
			return $http
				.put(`/products/one/${product._id}/admin`, product, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					if (res.status === 401) {
						deleteToken();
						$location.path('/login');
					}
					return res.data;
				});
		},
		deleteOneById(id) {
			return $http
				.delete(`/products/one/${id}/admin`, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					if (res.status === 401) {
						deleteToken();
						$location.path('/login');
					}
					return res.data;
				});
		}
	};
});
