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

	$scope.toggleProductCategory = (category) => {
		!$scope.categoryIsInProduct(category) ? addProductCategory(category) : removeProductCategory(category);
	};

	$scope.categoryIsInProduct = ({ name, slug }) =>
		!!$scope.product.category.find(
			(productCategory) => productCategory.name === name && productCategory.slug === slug
		);

	$scope.addNewProduct = () => {
		getCategories();
		$scope.addingNewProduct = true;
		openModalById('registerModal');
	};

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

	$scope.openModalById = $uiHandler.openModalById;
	$scope.hideModalById = $uiHandler.hideModalById;
});
