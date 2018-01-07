app.controller('login', function($scope, $admin, $hpLocation) {
	$scope.$on('admin logged in', () => ($scope.isLoggedIn = true));
	$scope.$on('admin logged out', () => ($scope.isLoggedIn = false));

	$scope.admin = {};
	$scope.onLogin = (data) => {
		$admin
			.login(data)
			.then((token) => $hpLocation.replaceWith('/home'))
			.catch((res) => ($scope.message = res.data));
	};

	$scope.logout = $admin.logout;
});
