app.controller('index', function($scope, $http, $location, $admin) {
	$admin.getVerification(localStorage['token']).then((res) => changeLocation('/home')).catch((errMsg) => {
		console.warn(errMsg);
		changeLocation('/login');
	});

	function changeLocation(path) {
		$scope.$apply(() => $location.path(path).replace());
	}
});
