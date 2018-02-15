import app from 'angularApp';

app.service('$orders', function($http, $location, $rootScope) {
	function deleteToken() {
		localStorage.removeItem('token');
		$rootScope.$broadcast('admin logged out');
	}

	return {
		getPage(page) {
			return $http
				.post('/orders/all/admin', { page }, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					if (res.status === 401) {
						deleteToken();
						$location.path('/login').replace();
					}
					return res.data;
				});
		},
		getByOrderId(id) {
			return $http
				.get(`/orders/one/${id}/admin`, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					if (res.status === 401) {
						deleteToken();
						$location.path('/login').replace();
					}
					return res.data;
				});
		},
		updateByMongoId(order) {
			return $http
				.put(`/orders/one/${order._id}/admin`, order, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					if (res.status === 401) {
						deleteToken();
						$location.path('/login').replace();
					}
					return res.data;
				});
		},
		deleteByMongoId(_id) {
			return $http
				.delete(`/orders/one/${_id}/admin`, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					if (res.status === 401) {
						deleteToken();
						$location.path('/login').replace();
					}
					return res.data;
				});
		}
	};
});
