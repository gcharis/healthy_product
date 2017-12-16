app.controller('register', function($scope, $location, $admin) {
	$scope.onRegister = (data) =>
		$admin
			.register(data)
			.then((scsMsg) => $scope.$apply(() => $location.path('/home')))
			.catch((errMsg) => $scope.$apply(() => ($scope.message = errMsg)));
});
