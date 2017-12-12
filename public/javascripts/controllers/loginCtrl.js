app.controller('login', function($scope, $admin, $timeout, $rootScope, $location) {
	$scope.admin = {};

	$scope.onLogin = (data) => {
		$admin
			.login(data)
			.then((token) => {
				saveToken(token);
				$scope.$apply(() => $location.path('/home'));
			})
			.catch((errMsg) => showErrorMessage(errMsg));
	};

	function saveToken(token) {
		localStorage.setItem('token', token);
		$rootScope.$broadcast('admin logged in');
	}

	function showErrorMessage(errMsg) {
		$scope.$apply(() => {
			$scope.errMsg = errMsg;
			$timeout(() => ($scope.errMsg = ''), 3000);
		});
	}
});
