app.controller('index', function($scope, $http, $location, $admin) {
	$admin.getVerification(localStorage['token']).then((res) => changeLocation('/home')).catch((res) => {
		console.warn(res.data);
		changeLocation('/login');
	});

	function changeLocation(path) {
		$location.path(path).replace();
	}
});
