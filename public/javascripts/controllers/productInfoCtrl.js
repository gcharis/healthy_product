app.controller('productInfo', function($scope, $routeParams, $location, $products, $categories) {
	showProductInfo();
	showCategories();

	$scope.updateProduct = (product) =>
		$products
			.updateOneById(product)
			.then((data) => $location.path('/products'))
			.catch((res) => ($scope.message = res.data));

	$scope.changeProductCategory = ({ name, slug }) => {
		const i = $scope.product.category.findIndex(
			(productCategory) => productCategory.name === name && productCategory.slug === slug
		);
		i === -1 ? $scope.product.category.push({ name, slug }) : $scope.product.category.splice(i, 1);
	};

	$scope.categoryIsInProduct = ({ name, slug }) =>
		!!$scope.product.category.find(
			(productCategory) => productCategory.name === name && productCategory.slug === slug
		);

	function showProductInfo() {
		$products
			.getBySlug($routeParams.slug)
			.then((product) => ($scope.product = product))
			.catch((res) => ($scope.message = res.data));
	}

	function showCategories() {
		$categories
			.getAll()
			.then((categories) => ($scope.categories = categories))
			.catch((res) => ($scope.message = res.data));
	}
});
