app.controller('categories', function ($scope, $categories, $timeout, $location, $uiHandler) {
	showCategories();

	$scope.registerCategory = (newCategory) => {
		$categories
			.register(newCategory)
			.then((product) => {
				clearCategoryRegistrationForm();
				showCategories();
			})
			.catch((res) => ($scope.message = res.data));
	};

	$scope.deleteCategory = (category) =>
		$categories
		.deleteOneById(category._id)
		.then((data) => showCategories())
		.catch((res) => ($scope.message = res.data));

	function showCategories() {
		$categories.getAll().then((categories) => ($scope.categories = categories)).catch((err) => console.warn(err));
	}

	function clearCategoryRegistrationForm() {
		$scope.newCategory = {};
		$uiHandler.hideModalById('registerModal');
	}

	$scope.openModalById = $uiHandler.openModalById;
	$scope.hideModalById = $uiHandler.hideModalById;
});