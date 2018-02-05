app.controller('orderInfo', function($scope, $orders, $routeParams, $location) {
	$orders.getByOrderId($routeParams.id).then((order) => ($scope.order = order)).catch((err) => console.warn(err));

	$scope.getSubTotal = (items) => (items ? items.reduce((sum, item) => sum + item.price * item.amount, 0) : 0);

	$scope.updateOrder = (order) => {
		$orders.updateByMongoId(order).then((message) => $location.path('/orders/page/1'));
	};
});
