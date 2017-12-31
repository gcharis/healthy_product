app.controller('login', function($scope, $admin, $hpLocation) {
	$scope.admin = {};
	$scope.onLogin = (data) => {
		$admin
			.login(data)
			.then((token) => $hpLocation.replaceWith('/home'))
			.catch((res) => ($scope.message = res.data));
	};

	$scope.requestRegisterForm = (registerKey) => {
		$admin.requestRegisterForm(registerKey).then((data) => console.log(data));
	};
});
