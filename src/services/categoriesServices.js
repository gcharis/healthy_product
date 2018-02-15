import app from 'angularApp';

app.service('$categories', function($http, $location, $rootScope) {
	function deleteToken() {
		localStorage.removeItem('token');
		$rootScope.$broadcast('admin logged out');
	}
	return {
		getAll() {
			return $http
				.get('/categories/all/admin', {
					headers: {
						token: localStorage.token
					}
				})
				.then((res) => res.data)
				.catch((res) => {
					if (res.status === 401) {
						deleteToken();
						$location.path('/login').replace();
					}
					return res.data;
				});
		},
		getOneById(id) {
			return $http
				.get(`/categories/one/${id}/admin`, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					if (res.status === 401) {
						deleteToken();
						$location.path('/login').replace();
					}
					return res.data;
				});
		},
		register(newCategory) {
			return $http
				.post('/categories/new/admin', newCategory, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					if (res.status === 401) {
						deleteToken();
						$location.path('/login').replace();
					}
					return res.data;
				});
		},
		updateOneById(category) {
			return $http
				.put(`/categories/one/${category._id}/admin`, category, { headers: { token: localStorage.token } })
				.then((res) => res.data.category)
				.catch((res) => {
					if (res.status === 401) {
						deleteToken();
						$location.path('/login').replace();
					}
					return res.data;
				});
		},
		updateMultiple(categories) {
			return $http
				.put('/categories/multiple/admin', { categories }, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					if (res.status === 401) {
						deleteToken();
						$location.path('/login').replace();
					}
					return res.data;
				});
		},
		deleteOneById(id) {
			return $http
				.delete(`/categories/one/${id}/admin`, { headers: { token: localStorage.token } })
				.then((res) => res.data)
				.catch((res) => {
					if (res.status === 401) {
						deleteToken();
						$location.path('/login').replace();
					}
					return res.data;
				});
		},
		clearNavBar() {
			return $http
				.put(`/categories/clear-navbar/admin`, null, { headers: { token: localStorage.token } })
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
