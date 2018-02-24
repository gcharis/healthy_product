import app from 'angularApp';

app.controller('categories', function ($http, $scope, $categories, $timeout, $location, $uiHandler) {
	showCategories();

	$scope.registerCategory = (newCategory) => {
		$categories
			.register(newCategory)
			.then((product) => {
				$uiHandler.hideModalById('registerModal');
				showCategories();
			})
			.catch((err) => {
				if (err.status === 401) return catchUnauthorizedErr();
				$scope.message = err.data;
			});
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
			.catch((err) => {
				if (err.status === 401) return catchUnauthorizedErr();
				$scope.message = err.data;
			});
	};

	$scope.editCategory = (category) => {
		$scope.editingCategory = true;
		$scope.restCategories = $scope.categories.filter((cat) => cat._id !== category._id);
		$timeout(() => $uiHandler.openModalById('editModal'), 0);
		showCategoryInfo(category);
	};

	// ANDREAS WARNING MESSAGE
	$scope.warningModal = (category) => {
		$scope.deletingStuff = true;
		$timeout(() => $uiHandler.openModalById('warningModal'), 0);

		$categories.getOneById(category._id).then((data) => {
			$scope.category = data
			console.log(data)
		})
	}

	$scope.deleteCategory = (category) => {
		$categories.deleteOneById(category._id).then((data) => showCategories()).catch((err) => {
			if (err.status === 401) return catchUnauthorizedErr();
			$scope.message = err.data;
		});
		$timeout(() => $scope.hideModalById('warningModal'), 2000);
	}


	function showCategories() {
		$categories.getAll().then((categories) => ($scope.categories = categories)).catch((err) => {
			if (err.status === 401) return catchUnauthorizedErr();
			$scope.message = err.data;
		});
	}

	function showCategoryInfo(category) {
		$categories.getOneById(category._id).then((category) => ($scope.category = category)).catch((err) => {
			if (err.status === 401) return catchUnauthorizedErr();
			$scope.message = err.data;
		});
	}

	function clearCategoryEditingForm() {
		$scope.category = {};
		$uiHandler.hideModalById('editModal');
	}

	function catchUnauthorizedErr() {
		localStorage.removeItem('token');
		$location.path('/login').replace();
	}

	$scope.openModalById = (id) => $uiHandler.openModalById(id);
	$scope.hideModalById = (id) => $uiHandler.hideModalById(id);
});
