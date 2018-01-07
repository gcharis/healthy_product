app.controller('products', function($scope, $products, $categories, $timeout, $hpLocation, $uiHandler) {
	showProducts();
	getCategories();

	$scope.registerProduct = (newProduct) => {
		$products
			.register(newProduct)
			.then((product) => {
				clearProductRegistrationForm();
				showProducts();
			})
			.catch((res) => ($scope.errMsg = res.data));
	};

	$scope.deleteProduct = (product) =>
		$products.deleteById(product._id).then((data) => showProducts()).catch((res) => ($scope.message = res.data));

	function getCategories() {
		$categories
			.getAll()
			.then((categories) => {
				categories = [ { name: 'Καμία κατηγορία', description: 'Καμία κατηγορία' }, ...categories ];

				$scope.categories = categories;
				$scope.selectedCategory = categories[0];
			})
			.catch((res) => ($scope.errMsg = res.data));
	}

	function showProducts() {
		$products.getAll().then((products) => ($scope.products = products)).catch((err) => console.warn(err));
	}

	function clearProductRegistrationForm() {
		$scope.newProduct = { images: [] };
		$uiHandler.hideModalById('registerModal');
	}
});
