import app from 'angularApp';

app.controller('orderInfo', function($scope, $orders, $routeParams, $location) {
	$orders.getByOrderId($routeParams.id).then((order) => ($scope.order = order)).catch((err) => {
		if (err.status === 401) return catchUnauthorizedErr();
		$scope.message = err.data;
	});

	$scope.getSubTotal = (items) => (items ? items.reduce((sum, item) => sum + item.price * item.amount, 0) : 0);

	$scope.updateOrder = (order) => {
		$orders.updateByMongoId(order).then((message) => $location.path('/orders/page/1'));
	};

	function catchUnauthorizedErr() {
		localStorage.removeItem('token');
		$location.path('/login').replace();
	}
});
