app.controller('products', function($scope, $products, $timeout) {
	$products.getAll().then((products) => console.log(products)).catch((err) => console.warn(err));

	$scope.registerProduct = (newProduct) => {
		$products
			.register(newProduct)
			.then((product) => clearProductRegistrationForm())
			.catch((res) => ($scope.errMsg = res.data));
	};

	function clearProductRegistrationForm() {
		$scope.newProduct = {};
	}
});
