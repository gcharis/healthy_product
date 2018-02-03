app.service('$orders', function($http) {
	return {
		getAll() {
			return $http
				.get('/orders/all/admin', {
					headers: {
						token: localStorage.token
					}
				})
				.then((res) => res.data);
		}
	};
});
