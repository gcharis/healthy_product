import app from 'angularApp';

app.controller('siteSections', function($scope, $categories, $http, $jsUtils, $timeout, $uiHandler, $orders) {
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
			.put('/datum/admin', newData, { headers: { token: localStorage.token } })
			.then(({ message, data }) => {
				$scope.introText = data.input;
			})
			.catch((err) => console.warn(err));

	function getIntroText() {
		$http
			.get('/datum/intro', { headers: { token: localStorage.token } })
			.then(({ message, data }) => {
				$scope.introText = data || { label: 'intro', content: '' };
			})
			.catch((err) => console.warn(err));
	}

	getSlider();

	$scope.updateSlider = (slider) => {
		slider.images = slider.images.map((image) => $jsUtils.resizeImage(image));

		$http
			.put('/images/slider/admin', slider, { headers: { token: localStorage.token } })
			.then((res) => console.log(res.data))
			.catch((err) => console.warn(err));
	};

	$scope.removeFormSLider = (i) => {
		$scope.slider.images.splice(i, 1);
	};

	function getSlider() {
		$http
			.get('/images/slider', { headers: { token: localStorage.token } })
			.then((res) => ($scope.slider = res.data[0] || { images: [] }))
			.catch((err) => console.warn(err));
	}

	getFrauds();

	$scope.addNewFraud = () => {
		$scope.addingNewFraud = true;
		$scope.newFraud = { orderId: [] };
		getOrders();

		// timeout does not immidiatelly puts the statement on top of the stack
		$timeout(() => $uiHandler.openModalById('newFraud'), 0);
	};

	function getOrders() {
		$orders.getAll().then((orders) => {
			$scope.orders = orders;
			$scope.fiteredOrders = orders;
		});
	}

	$scope.filterOrders = (match) => {
		const matchRegExp = new RegExp(match, 'i');
		$scope.filteredOrders = $scope.orders.filter((order) => matchRegExp.test(order.id));
	};

	$scope.toggleOrderFromFraud = (order) => {
		orderIsIncluded(order) ? removeOrderFromFraud(order) : addOrderToFraud(order);
	};

	$scope.registerFraud = (fraud) =>
		$http
			.post('/datum/frauds/admin', fraud, { headers: { token: localStorage.token } })
			.then((res) => {
				$scope.hideModalById('newFraud');
				getFrauds();
			})
			.catch((err) => console.warn(err));

	function orderIsIncluded(order) {
		return $scope.newFraud.orderId.includes(order.id);
	}

	function removeOrderFromFraud(order) {
		const i = $scope.newFraud.orderId.findIndex((fraudOrder) => order.id === fraudOrder);
		$scope.newFraud.orderId = [ ...$scope.newFraud.orderId.slice(0, i), ...$scope.newFraud.orderId.slice(i + 1) ];
	}

	function addOrderToFraud(order) {
		$scope.newFraud.orderId = [ ...$scope.newFraud.orderId, order.id ];
	}

	function getFrauds() {
		$http.get('/datum/frauds/admin', { headers: { token: localStorage.token } }).then((res) => {
			$scope.frauds = res.data;
			console.log(res.data);
		});
	}

	$scope.openModalById = (id) => $uiHandler.openModalById(id);
	$scope.hideModalById = (id) => $uiHandler.hideModalById(id);

	// getBanks();
	// function getBanks() {
	// 	$http
	// 		.post('/datum/banks/admin', { headers: { token: localStorage.token } })
	// 		.then((res) => {
	// 			$scope.bank = bank || { label: 'intro', content: '' };
	// 		})
	// 		.catch((err) => console.warn(err));
	// }
});
