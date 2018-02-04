app.service('$orders', function($http) {
	return {
		getPage(page) {
			return $http
				.post(
					'/orders/all/admin',
					{ page },
					{
						headers: {
							token: localStorage.token
						}
					}
				)
				.then((res) => res.data);
		},
		getByOrderId(id) {
			return $http
				.get(`/orders/one/${id}/admin`, {
					headers: {
						token: localStorage.token
					}
				})
				.then((res) => res.data);
		},
		updateByMongoId(order) {
			return $http
				.put(`/orders/one/${order._id}/admin`, order, {
					headers: {
						token: localStorage.token
					}
				})
				.then((res) => res.data);
		},
		deleteByMongoId(_id) {
			return $http
				.delete(`/orders/one/${_id}/admin`, {
					headers: {
						token: localStorage.token
					}
				})
				.then((res) => res.data);
		}
	};
});
