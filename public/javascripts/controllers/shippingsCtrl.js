app.controller('shippings', function ($scope, $shippings, $uiHandler, $timeout) {
	showShipping()

	$scope.registerShipping = (newShipping) => {
		$shippings
			.register(newShipping)
			.then((product) => {
				clearShippingRegistrationForm();
				showShippings();
			})
			.catch((res) => ($scope.message = res.data));
	};
	$scope.addNewShipping = () => {
		$scope.addingNewShipping = true;
		$timeout(() => $uiHandler.openModalById('newShippingModal'), 0);
	};


	function initiateNewShipping() {
		$scope.newShipping = {

		};
	}

	function clearShippingRegistrationForm() {
		$scope.newShipping = {};
		$uiHandler.hideModalById('registerModal');
	}

	function showShipping() {
		$shippings.getAll().then((shippings) => console.log(shippings)).catch((err) => console.warn(err));
	}

	$scope.openModalById = (id) => $uiHandler.openModalById(id);
	$scope.hideModalById = (id) => $uiHandler.hideModalById(id);
});