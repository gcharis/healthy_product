app.controller('categories', function($http, $scope, $categories, $timeout, $location, $uiHandler) {
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

	$scope.addNewCategory = () => {
		initiateNewCategory();
		$scope.addingNewCategory = true;
		$timeout(() => $uiHandler.openModalById('registerModal'), 0);
	};

	$scope.updateCategory = (category) => {
		$categories
			.updateOneById(category)
			.then((category) => {
				clearCategoryEditingForm();
				showCategories();
			})
			.catch((res) => ($scope.message = res.data));
	};

	$scope.editCategory = (category) => {
		$scope.openModalById('editModal');
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

	function clearCategoryRegistrationForm() {
		$scope.newCategory = {};
		$uiHandler.hideModalById('registerModal');
	}

	function clearCategoryEditingForm() {
		$scope.category = {};
		$uiHandler.hideModalById('editModal');
	}

	function initiateNewCategory() {
		$scope.newProduct = {
			name: '',
			parent: '',
			description: ''
		};
	}

	$scope.openModalById = (id) => $uiHandler.openModalById(id);
	$scope.hideModalById = (id) => $uiHandler.hideModalById(id);
});
