app.controller('siteSections', function($scope, $categories, $http, $jsUtils) {
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

	$scope.categoryIsInNavBar = (category) =>
		!!$scope.navCategories.find((navCategory) => navCategory._id === category._id);

	function getCategories() {
		$categories.getAll().then((categories) => {
			$scope.categories = categories;
			$scope.filteredCategories = categories;

			$scope.navCategories = $scope.categories
				.filter((category) => !!category.isInNavBar)
				.sort((a, b) => a.orderInNavBar > b.orderInNavBar);
		});
	}

	getIntroText();

	$scope.updateIntroText = (newData) =>
		$http
			.put('/datum/admin', newData, {
				headers: {
					token: localStorage.token
				}
			})
			.then(({ message, data }) => {
				$scope.introText = data.input;
			})
			.catch((err) => console.warn(err));

	function getIntroText() {
		$http
			.get('/datum/intro/admin', {
				headers: {
					token: localStorage.token
				}
			})
			.then(({ message, data }) => {
				$scope.introText = data || { label: 'intro', content: '' };
			})
			.catch((err) => console.warn(err));
	}

	getSlider();

	$scope.updateSlider = (sliderImages) => {
		const resizedImages = $jsUtils.resizeImages(sliderImages);

		$http
			.put('/images/slider/admin', resizedImages, {
				headers: {
					token: localStorage.token
				}
			})
			.then((res) => console.log(res.data))
			.catch((err) => console.warn(err));
	};

	function getSlider() {
		$http
			.get('/images/slider/admin', {
				headers: {
					token: localStorage.token
				}
			})
			.then((res) => ($scope.slider = res.data))
			.catch((err) => console.warn(err));
	}
});
