app.controller('productInfo', function($scope, $routeParams, $products) {
	getProductInfo();

	function getProductInfo() {
		$products
			.getBySlug($routeParams.slug)
			.then((product) => {
				console.log(product);
				$scope.product = product;
			})
			.catch((res) => ($scope.errMsg = res.data));
	}
});
