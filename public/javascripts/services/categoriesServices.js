app.service('$categories', function($http) {
	return {
		getAll() {
			return $http
				.get('/categories/all/admin', {
					headers: {
						token: localStorage['token']
					}
				})
				.then((res) => res.data);
		},
		getBySlug(slug) {
			return $http.get(`/categories/one-slug/${slug}`).then((res) => res.data);
		},
		register(newCategory) {
			return $http
				.post('/categories/new/admin', newCategory, {
					headers: {
						token: localStorage['token']
					}
				})
				.then((res) => res.data);
		},
		deleteById(id) {
			return $http
				.delete(`/categories/one/${id}/admin`, {
					headers: {
						token: localStorage['token']
					}
				})
				.then((res) => res.data);
		}
	};
});
