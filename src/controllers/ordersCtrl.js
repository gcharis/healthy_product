import app from 'angularApp';

app.controller('orders', function($scope, $routeParams, $location, $orders) {
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

	$scope.deleteOrder = (order) => $orders.deleteByMongoId(order._id).then(() => getPageOrders());
});
