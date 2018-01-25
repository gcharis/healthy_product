app.controller('shippings', function($scope, $shippings) {
	$shippings.getAll().then((shippings) => console.log(shippings)).catch((err) => console.warn(err));
});
