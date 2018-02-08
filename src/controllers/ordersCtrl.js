import app from 'angularApp';

app.controller('orders', function($scope, $routeParams, $orders) {
	getPageOrders();
	function getPageOrders() {
		$orders
			.getPage($routeParams.page)
			.then(({ orders, pages }) => {
				$scope.orders = orders;
				createPagination(pages);
			})
			.catch((err) => console.warn(err));
	}

	function createPagination(totalPages) {
		$scope.totalPages = totalPages;
		$scope.pages = new Array(totalPages);
		$scope.currentPage = parseInt($routeParams.page);
	}

	$scope.deleteOrder = (order) => $orders.deleteByMongoId(order._id).then(() => getPageOrders());
});
