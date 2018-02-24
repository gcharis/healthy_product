import app from 'angularApp';

app.controller('orders', function ($scope, $routeParams, $location, $orders, $timeout, $uiHandler) {
	getPageOrders();
	function getPageOrders() {
		$orders
			.getPage($routeParams.page)
			.then(({ orders, pages }) => {
				$scope.orders = orders;
				createPagination(pages);
			})
			.catch((err) => {
				if (err.status === 401) return catchUnauthorizedErr();
				$scope.message = err.data;
			});
	}

	function createPagination(totalPages) {
		$scope.totalPages = totalPages;
		$scope.pages = new Array(totalPages);
		$scope.currentPage = parseInt($routeParams.page);
	}

	function catchUnauthorizedErr() {
		localStorage.removeItem('token');
		$location.path('/login').replace();
	}

	// ANDREAS WARNING MESSAGE
	$scope.warningModal = (order) => {
		$scope.deletingStuff = true;
		$timeout(() => $uiHandler.openModalById('warningModal'), 0);

		$orders.getByOrderId(order._id).then((data) => {
			$scope.order = data
			console.log(data)
		})
	}

	$scope.deleteOrder = (order) => $orders.deleteByMongoId(order._id).then(() => getPageOrders());
});
