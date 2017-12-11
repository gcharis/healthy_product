app.controller('homepage', function($scope, $admin, $timeout, $rootScope) {
	$scope.admin = {};

	$scope.onLogin = (data) => {
		$admin.login(data).then((token) => saveToken(token)).catch((errMsg) => showErrorMessage(errMsg));
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
