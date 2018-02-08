import app from 'angularApp';

app.service('$shippings', function($http) {
	return {
		getAll() {
			return $http
				.get('/shippings/all', {
					headers: {
						token: localStorage.token
					}
				})
				.then((res) => res.data);
		},
		getOneById(id) {
			return $http
				.get(`/shippings/one/${id}/admin`, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					res.status === 401 ? $location.path('/login') : null;
					return res.data;
				});
		},
		register(newShipping) {
			return $http
				.post('/shippings/new/admin', newShipping, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					res.status === 401 ? $location.path('/login') : null;
					return res.data;
				});
		},
		updateOneById(shipping) {
			return $http
				.put(`/shippings/one/${shipping._id}/admin`, shipping, { headers: { token: localStorage.token } })
				.then((res) => res.data.shipping)
				.catch((res) => {
					res.status === 401 ? $location.path('/login') : null;
					return res.data;
				});
		},
		deleteOneById(id) {
			return $http
				.delete(`/shippings/one/${id}/admin`, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					res.status === 401 ? $location.path('/login') : null;
					return res.data;
				});
		}
	};
});
