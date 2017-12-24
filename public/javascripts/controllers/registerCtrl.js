app.controller('register', function($scope, $location, $admin) {
	$scope.onRegister = (data) =>
		$admin.register(data).then(() => $location.path('/home')).catch((res) => ($scope.message = res.data));

	$scope.matchPasswords = (password, passwordAgain) => ($scope.submitDisabled = passwordAgain !== password);
});
