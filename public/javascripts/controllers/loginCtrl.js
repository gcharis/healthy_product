app.controller('login', function($scope, $rootScope, $admin, $hpLocation) {
	$scope.isLoggedIn = !!localStorage.token;
	$rootScope.$on('admin logged in', ($event) => ($scope.isLoggedIn = true));
	$rootScope.$on('admin logged out', ($event) => ($scope.isLoggedIn = false));

	$scope.admin = {};
	$scope.onLogin = (data) => {
		$admin.login(data).then((token) => $hpLocation.replaceWith('/')).catch((res) => ($scope.message = res.data));
	};

	$scope.onLogout = $admin.logout;
});
