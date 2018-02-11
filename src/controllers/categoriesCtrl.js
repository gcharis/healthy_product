import app from 'angularApp';

app.controller('categories', function($http, $scope, $categories, $timeout, $location, $uiHandler) {
	showCategories();

	$scope.registerCategory = (newCategory) => {
		$categories
			.register(newCategory)
			.then((product) => {
				$uiHandler.hideModalById('registerModal');
				showCategories();
			})
			.catch((err) => ($scope.message = err));
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
			.catch((err) => ($scope.message = err));
	};

	$scope.editCategory = (category) => {
		$scope.editingCategory = true;
		$scope.restCategories = $scope.categories.filter((cat) => cat._id !== category._id);
		$timeout(() => $uiHandler.openModalById('editModal'), 0);
		showCategoryInfo(category);
	};

	$scope.deleteCategory = (category) =>
		$categories.deleteOneById(category._id).then((data) => showCategories()).catch((err) => ($scope.message = err));

	function showCategories() {
		$categories.getAll().then((categories) => ($scope.categories = categories)).catch((err) => console.warn(err));
	}

	function showCategoryInfo(category) {
		$categories
			.getOneById(category._id)
			.then((category) => ($scope.category = category))
			.catch((err) => console.warn(err));
	}

	function clearCategoryEditingForm() {
		$scope.category = {};
		$uiHandler.hideModalById('editModal');
	}

	$scope.openModalById = (id) => $uiHandler.openModalById(id);
	$scope.hideModalById = (id) => $uiHandler.hideModalById(id);
});
