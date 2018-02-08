import app from 'angularApp';

app.controller('shippings', function($scope, $shippings, $uiHandler, $timeout) {
	showShippings();

	$scope.registerShipping = (newShipping) => {
		$shippings
			.register(newShipping)
			.then((product) => {
				clearShippingRegistrationForm();
				showShippings();
			})
			.catch((err) => ($scope.message = err));
	};

	$scope.addNewShipping = () => {
		$scope.addingNewShipping = true;
		$timeout(() => $uiHandler.openModalById('newShippingModal'), 0);
	};

	$scope.updateShipping = (shipping) => {
		$shippings
			.updateOneById(shipping)
			.then((shipping) => {
				clearShippingEditingForm();
				$timeout(() => ($scope.editingShipping = false), 0);

				showShippings();
			})
			.catch((err) => ($scope.message = err));
	};

	$scope.editShipping = (shipping) => {
		$scope.editingShipping = true;
		$timeout(() => $uiHandler.openModalById('editShippingModal'), 0);

		showShippingInfo(shipping);
	};

	$scope.deleteShipping = (shipping) =>
		$shippings.deleteOneById(shipping._id).then((data) => showShippings()).catch((err) => ($scope.message = err));

	function clearShippingRegistrationForm() {
		$scope.newShipping = {};
		$uiHandler.hideModalById('newShippingModal');
	}

	function clearShippingEditingForm() {
		$scope.shipping = {};
		$uiHandler.hideModalById('editShippingModal');
	}

	function showShippings() {
		$shippings.getAll().then((shippings) => ($scope.shippings = shippings)).catch((err) => console.warn(err));
	}

	function showShippingInfo(shipping) {
		$shippings
			.getOneById(shipping._id)
			.then((shipping) => ($scope.shipping = shipping))
			.catch((err) => console.warn(err));
	}

	$scope.openModalById = (id) => $uiHandler.openModalById(id);
	$scope.hideModalById = (id) => $uiHandler.hideModalById(id);
});
