app.controller('login', function($scope, $admin, $timeout, $rootScope, $location) {
	$scope.admin = {};
	$scope.onLogin = (data) => {
		$admin
			.login(data)
			.then((token) => $scope.$apply(() => $location.path('/home')))
			.catch((errMsg) => $scope.$apply(() => ($scope.message = errMsg)));
	};
});
