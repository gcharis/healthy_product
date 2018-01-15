app.controller('productInfo', function($scope, $routeParams, $location, $products, $categories, $jsUtils) {
	Promise.all([ getProductInfo(), getCategories() ])
		.then((results) => {
			$scope.$apply(() => {
				$scope.product = results[0];
				$scope.categories = results[1];
			});
		})
		.catch((res) => ($scope.message = res.data));

	$scope.updateProduct = (product) =>
		$products
			.updateOneById(product)
			.then((data) => $location.path('/products'))
			.catch((res) => ($scope.message = res.data));

	$scope.changeProductCategory = (category) => {
		const i = $scope.product.category.findIndex(
			(productCategory) => productCategory.name === category.name && productCategory.slug === category.slug
		);

		i === -1 ? addProductCategory(category) : removeProductCategory(category);
	};

	$scope.categoryIsInProduct = ({ name, slug }) =>
		!!$scope.product.category.find(
			(productCategory) => productCategory.name === name && productCategory.slug === slug
		);

	function getProductInfo() {
		return $products.getOneBySlug($routeParams.slug);
	}

	function getCategories() {
		return $categories.getAll();
	}

	function addProductCategory(category) {
		// first find parent category
		const parent = $scope.categories.find((parent) => parent._id === category.parent);

		if (!!parent)
			$scope.categoryIsInProduct(parent)
				? null //do nothing;
				: $scope.product.category.push({ name: parent.name, slug: parent.slug }); //push parent to product category

		!!$scope.categoryIsInProduct(category)
			? null //do nothing;
			: $scope.product.category.push({ name: category.name, slug: category.slug }); //push category to product category
	}

	function removeProductCategory(category) {
		// first find category children
		const children = $scope.categories.filter((child) => child.parent === category._id);
		if (!!children.length)
			$scope.product.category = $scope.product.category.filter(
				({ name, slug }) => !children.includesElem((child) => child.name === name && child.slug === slug)
			);

		$scope.product.category = $scope.product.category.filter(
			({ name, slug }) => category.name !== name || category.slug !== slug
		);
	}
});
