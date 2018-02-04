app.service('$categories', function($http) {
	return {
		getAll() {
			return $http
				.get('/categories/all/admin', {
					headers: {
						token: localStorage.token
					}
				})
				.then((res) => res.data);
		},
		getOneById(id) {
			return $http
				.get(`/categories/one/${id}/admin`, {
					headers: {
						token: localStorage.token
					}
				})
				.then((res) => res.data);
		},
		register(newCategory) {
			return $http
				.post('/categories/new/admin', newCategory, {
					headers: {
						token: localStorage.token
					}
				})
				.then((res) => res.data);
		},
		updateOneById(category) {
			return $http
				.put(`/categories/one/${category._id}/admin`, category, {
					headers: {
						token: localStorage.token
					}
				})
				.then((res) => res.data.category);
		},
		updateMultiple(categories) {
			return $http
				.put(
					'/categories/multiple/admin',
					{ categories },
					{
						headers: {
							token: localStorage.token
						}
					}
				)
				.then((res) => res.data);
		},
		deleteOneById(id) {
			return $http
				.delete(`/categories/one/${id}/admin`, {
					headers: {
						token: localStorage.token
					}
				})
				.then((res) => res.data);
		},
		clearNavBar() {
			return $http
				.put(`/categories/clear-navbar`, {
					headers: {
						token: localStorage.token
					}
				})
				.then((res) => res.data);
		}
	};
});
