app.controller('categories', function($scope, $categories, $timeout, $hpLocation, $uiHandler) {
	showCategories();

	$scope.registerCategory = (newCategory) => {
		$categories
			.register(newCategory)
			.then((product) => {
				clearCategoryRegistrationForm();
				showCategories();
			})
			.catch((res) => ($scope.errMsg = res.data));
	};

	$scope.deleteCategory = (category) =>
		$categories
			.deleteById(category._id)
			.then((data) => showCategories())
			.catch((res) => ($scope.message = res.data));

	function showCategories() {
		$categories.getAll().then((categories) => ($scope.categories = categories)).catch((err) => console.warn(err));
	}

	function clearCategoryRegistrationForm() {
		$scope.newCategory = {};
		$uiHandler.hideModalById('registerModal');
	}
});
