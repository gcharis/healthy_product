app.controller('products', function($scope, $products, $timeout, $hpLocation, $uiHandler) {
	showProducts();

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
		$products.deleteById(product._id).then((data) => {
			console.log(data);
			showProducts();
		});

	function showProducts() {
		$products.getAll().then((products) => ($scope.products = products)).catch((err) => console.warn(err));
	}

	function clearProductRegistrationForm() {
		$scope.newProduct = {};
		$uiHandler.hideModalById('registerModal');
	}
});
