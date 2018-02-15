import app from 'angularApp';

app.service('$orders', function($http, $rootScope) {
	function deleteToken() {
		localStorage.removeItem('token');
		$rootScope.$broadcast('admin logged out');
	}

	return {
		getAll() {
			return $http.get('/orders/all/admin', { headers: { token: localStorage.token } }).then((res) => res.data);
		},
		getPage(page) {
			return $http
				.post('/orders/page/admin', { page }, { headers: { token: localStorage.token } })
				.then((res) => res.data);
		},
		getByOrderId(id) {
			return $http
				.get(`/orders/one/${id}/admin`, { headers: { token: localStorage.token } })
				.then((res) => res.data);
		},
		updateByMongoId(order) {
			return $http
				.put(`/orders/one/${order._id}/admin`, order, { headers: { token: localStorage.token } })
				.then((res) => res.data);
		},
		deleteByMongoId(_id) {
			return $http
				.delete(`/orders/one/${_id}/admin`, { headers: { token: localStorage.token } })
				.then((res) => res.data);
		},
		search(match) {
			return $http
				.get(`/orders/search/${match}/admin`, { headers: { token: localStorage.token } })
				.then((res) => res.data);
		}
	};
});
