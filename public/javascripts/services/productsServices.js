app.service('$products', function($http) {
	return {
		getAll() {
			return $http.get('/products/all').then((res) => res.data);
		},
		getOneBySlug(slug) {
			return $http.get(`/products/one-slug/${slug}`).then((res) => res.data);
		},
		register(newProduct) {
			return $http
				.post('/products/new/admin', newProduct, {
					headers: {
						token: localStorage.token
					}
				})
				.then((res) => res.data);
		},
		updateOneById(product) {
			return $http
				.put(`/products/one/${product._id}/admin`, product, {
					headers: {
						token: localStorage.token
					}
				})
				.then((res) => res.data);
		},
		deleteOneById(id) {
			return $http
				.delete(`/products/one/${id}/admin`, {
					headers: {
						token: localStorage.token
					}
				})
				.then((res) => res.data);
		},
		resizeImages(product) {
			product.images.forEach((image, i) => {
				const img = document.createElement('img');
				img.src = image;

				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				const maxWidth = 800;
				const maxHeight = 800;

				if (img.width > img.height) {
					if (img.width > maxWidth) {
						img.height *= maxWidth / img.width;
						img.width = maxWidth;
					}
				} else {
					if (img.height > maxHeight) {
						img.width *= maxHeight / img.height;
						img.height = maxHeight;
					}
				}

				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0, img.width, img.height);

				const results = canvas.toDataURL('image/jpeg', 0.5);
				product.images[i] = results;
				product.featuredImage === image ? (product.featuredImage = results) : null;
			});
		}
	};
});
