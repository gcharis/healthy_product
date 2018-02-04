app.controller('siteSections', function($scope, $categories, $http) {
	$scope.navCategories = [];
	getCategories();
	$scope.startUploadingPictures = () => document.getElementById('picture-input').click();

	$scope.filterCategories = (searchText) => {
		const searchRegExp = new RegExp(searchText, 'i');
		$scope.filteredCategories = $scope.categories.filter(
			(category) => searchRegExp.test(category.name) || searchRegExp.test(category.slug)
		);
	};

	$scope.toggleCategoryFromNav = (category) => {
		const i = $scope.navCategories.findIndex((navCategory) => navCategory._id === category._id);
		i === -1 ? $scope.navCategories.push(category) : $scope.navCategories.splice(i, 1);
	};

	$scope.updateNavigationBar = async (navCategories) => {
		navCategories.forEach((cat, i) => {
			cat.orderInNavBar = i;
			cat.isInNavBar = true;
		});
		try {
			await $categories.clearNavBar();
			console.log(navCategories);
			$categories.updateMultiple(navCategories).then((res) => console.log(res));
		} catch (err) {
			console.warn(err);
		}
	};

	function getCategories() {
		$categories.getAll().then((categories) => {
			$scope.categories = categories;
			$scope.filteredCategories = categories;

			$scope.navCategories = $scope.categories
				.filter((category) => !!category.isInNavBar)
				.sort((a, b) => a.orderInNavBar > b.orderInNavBar);
		});
	}
});
