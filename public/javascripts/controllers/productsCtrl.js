app.controller('products', function($scope, $products, $categories, $timeout, $location, $uiHandler, $jsUtils) {
	showProducts();

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
		!!$scope.newProduct.category &&
		!!$scope.newProduct.category.find(
			(productCategory) => productCategory.name === name && productCategory.slug === slug
		);

	$scope.addNewProduct = () => {
		showCategories();
		initiateNewProduct();
		$scope.addingNewProduct = true;
		$timeout(() => $uiHandler.openModalById('registerModal'), 0);
	};

	function showProducts() {
		$products.getAll().then((products) => ($scope.products = products)).catch((err) => ($scope.message = err));
	}

	function showCategories() {
		$categories
			.getAll()
			.then((categories) => ($scope.categories = categories))
			.catch((res) => ($scope.message = res.data));
	}

	function clearProductRegistrationForm() {
		initiateNewProduct();
		$uiHandler.hideModalById('registerModal');
	}

	function addProductCategory(category) {
		// first find parent category
		const parent = $scope.categories.find((parent) => parent._id === category.parent);

		if (!!parent)
			$scope.categoryIsInProduct(parent)
				? null //do nothing;
				: $scope.newProduct.category.push({ name: parent.name, slug: parent.slug }); //push parent to product category

		!!$scope.categoryIsInProduct(category)
			? null //do nothing;
			: $scope.newProduct.category.push({ name: category.name, slug: category.slug }); //push category to product category
	}

	function removeProductCategory(category) {
		// first find category children
		const children = $scope.categories.filter((child) => child.parent === category._id);

		//remove children if there are any in product
		if (!!children.length)
			$scope.newProduct.category = $scope.newProduct.category.filter(
				({ name, slug }) => !children.includesElem((child) => child.name === name && child.slug === slug)
			);

		//remove the required category
		$scope.newProduct.category = $scope.newProduct.category.filter(
			({ name, slug }) => category.name !== name || category.slug !== slug
		);
	}

	function initiateNewProduct() {
		$scope.newProduct = {
			name: '',
			price: '',
			salesPrice: '',
			weight: '',
			sku: '',
			category: [],
			description: '',
			stock: '',
			images: [],
			featuredImage: ''
		};
	}

	$scope.openModalById = (id) => $uiHandler.openModalById(id);
	$scope.hideModalById = (id) => $uiHandler.hideModalById(id);
	$scope.startUploadingPictures = () => document.getElementById('picture-input').click();
});
