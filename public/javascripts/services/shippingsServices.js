app.service('$shippings', function($http) {
	return {
		getAll() {
			return $http
				.get('/shippings/all/admin', {
					headers: {
						token: localStorage.token
					}
				})
				.then((res) => res.data);
		}
	};
});
