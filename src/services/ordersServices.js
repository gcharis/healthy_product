import app from 'angularApp';

app.service('$orders', function($http, $location) {
	return {
		getPage(page) {
			return $http
				.post('/orders/all/admin', { page }, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					res.status === 401 ? $location.path('/login') : null;
					return res.data;
				});
		},
		getByOrderId(id) {
			return $http
				.get(`/orders/one/${id}/admin`, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					res.status === 401 ? $location.path('/login') : null;
					return res.data;
				});
		},
		updateByMongoId(order) {
			return $http
				.put(`/orders/one/${order._id}/admin`, order, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					res.status === 401 ? $location.path('/login') : null;
					return res.data;
				});
		},
		deleteByMongoId(_id) {
			return $http
				.delete(`/orders/one/${_id}/admin`, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					res.status === 401 ? $location.path('/login') : null;
					return res.data;
				});
		}
	};
});
