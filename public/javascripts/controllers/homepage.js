app.controller('homepage', function($scope, $admin) {
	$scope.admin = {};

	$scope.onLogin = (data) => {
		$admin.login(data).then((token) => saveToken(token));
	};

	function saveToken(token) {
		localStorage.setItem('token', token);
	}
});
