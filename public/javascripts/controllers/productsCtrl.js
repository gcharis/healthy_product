app.controller('products', function($scope, $products, $timeout) {
	$products.getAll().then((products) => console.log(products)).catch((err) => console.warn(err));

	$scope.registerProduct = (newProduct) => {
		$products
			.register(newProduct)
			.then((product) => clearProductRegisterForm())
			.catch((err) => showErrorMessage(err));
	};

	function clearProductRegisterForm() {
		$scope.newProduct = {};
	}

	function showErrorMessage(errMsg) {
		$scope.$apply(() => {
			$scope.errMsg = errMsg;
			$timeout(() => ($scope.errMsg = ''), 3000);
		});
	}
});
