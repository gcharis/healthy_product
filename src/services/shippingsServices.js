import app from 'angularApp';

app.service('$shippings', function($http, $rootScope, $location) {
	function deleteToken() {
		localStorage.removeItem('token');
		$rootScope.$broadcast('admin logged out');
	}

	return {
		getAll() {
			return $http.get('/shippings/all').then((res) => res.data);
		},
		getOneById(id) {
			return $http
				.get(`/shippings/one/${id}/admin`, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					if (res.status === 401) {
						deleteToken();
						$location.path('/login');
					}
					return res.data;
				});
		},
		register(newShipping) {
			return $http
				.post('/shippings/new/admin', newShipping, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					if (res.status === 401) {
						deleteToken();
						$location.path('/login');
					}
					return res.data;
				});
		},
		updateOneById(shipping) {
			return $http
				.put(`/shippings/one/${shipping._id}/admin`, shipping, { headers: { token: localStorage.token } })
				.then((res) => res.data.shipping)
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
				.delete(`/shippings/one/${id}/admin`, { headers: { token: localStorage.token } })
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
