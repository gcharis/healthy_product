app.controller('orders', function($scope, $orders) {
	$orders.getAll().then((orders) => {
		console.log(orders);
		$scope.orders = orders;
	});
});
