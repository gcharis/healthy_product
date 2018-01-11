app.controller('products', function($scope, $products, $categories, $timeout, $location, $uiHandler) {
	showProducts();
	showCategories();

	$scope.registerProduct = (newProduct) => {
		$products
			.register(newProduct)
			.then((product) => {
				clearProductRegistrationForm();
				showProducts();
			})
			.catch((res) => ($scope.message = res.data));
	};

	$scope.deleteProduct = (product) =>
		$products.deleteOneById(product._id).then((data) => showProducts()).catch((res) => ($scope.message = res.data));

	$scope.renderProductCategories = (product) => product.category.map((category) => category.name).toString();

	function showCategories() {
		$categories
			.getAll()
			.then((categories) => ($scope.categories = categories))
			.catch((res) => ($scope.message = res.data));
	}

	function showProducts() {
		$products.getAll().then((products) => ($scope.products = products)).catch((err) => console.warn(err));
	}

	function clearProductRegistrationForm() {
		$scope.newProduct = { images: [] };
		$uiHandler.hideModalById('registerModal');
	}
});
