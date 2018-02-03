app.controller('categories', function($http, $scope, $categories, $timeout, $location, $uiHandler) {
	showCategories();

	$scope.registerCategory = (newCategory) => {
		$categories
			.register(newCategory)
			.then((product) => {
				$uiHandler.hideModalById('registerModal');
				showCategories();
			})
			.catch((res) => ($scope.message = res.data));
	};

	$scope.addNewCategory = () => {
		$scope.addingNewCategory = true;
		$timeout(() => $uiHandler.openModalById('registerModal'), 0);
	};

	$scope.updateCategory = (category) => {
		$categories
			.updateOneById(category)
			.then((category) => {
				clearCategoryEditingForm();
				$timeout(() => ($scope.editingCategory = false), 0);

				showCategories();
			})
			.catch((res) => ($scope.message = res.data));
	};

	$scope.editCategory = (category) => {
		$scope.editingCategory = true;
		$scope.categories = $scope.categories.filter((cat) => cat._id !== category._id);
		$timeout(() => $uiHandler.openModalById('editModal'), 0);

		showCategoryInfo(category);
	};

	$scope.deleteCategory = (category) =>
		$categories
			.deleteOneById(category._id)
			.then((data) => showCategories())
			.catch((res) => ($scope.message = res.data));

	function showCategories() {
		$categories.getAll().then((categories) => ($scope.categories = categories)).catch((err) => console.warn(err));
	}

	function showCategoryInfo(category) {
		$categories
			.getOneById(category._id)
			.then((category) => ($scope.category = category))
			.catch((res) => console.warn(res.data));
	}

	function clearCategoryEditingForm() {
		$scope.category = {};
		$uiHandler.hideModalById('editModal');
	}

	$scope.openModalById = (id) => $uiHandler.openModalById(id);
	$scope.hideModalById = (id) => $uiHandler.hideModalById(id);
});
