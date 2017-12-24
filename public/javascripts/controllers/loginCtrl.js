app.controller('login', function($scope, $admin, $timeout, $rootScope, $location) {
	$scope.admin = {};
	$scope.onLogin = (data) => {
		$admin.login(data).then((token) => $location.path('/home')).catch((res) => ($scope.message = res.data));
	};
});
