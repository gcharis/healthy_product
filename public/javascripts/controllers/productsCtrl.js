app.controller('products', function($scope, $products, $timeout) {
	$products.getAll().then((products) => console.log(products)).catch((err) => console.warn(err));

	$scope.registerProduct = (newProduct) => {
		$products
			.register(newProduct)
			.then((product) => clearProductRegistrationForm())
			.catch((err) => showErrorMessage(err));
	};

	function clearProductRegistrationForm() {
		$scope.newProduct = {};
	}

	function showErrorMessage(errMsg) {
		$scope.$apply(() => {
			$scope.errMsg = errMsg;
			$timeout(() => ($scope.errMsg = ''), 3000);
		});
		function showSuccessMsg(successMsg) {
			$scope.$apply(() => {
				$scope.successMsg = successMsg;
				$timeout(() => ($scope.successMsg = ''), 3000);
			});
		}
	}
});
