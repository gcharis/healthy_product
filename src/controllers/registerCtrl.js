import app from 'angularApp';

app.controller('register', function($scope, $location, $admin) {
	$scope.onRegister = (data) =>
		$admin.register(data).then(() => $location.path('/home')).catch((res) => ($scope.message = res.data));

	$scope.passwordsMatch = (password, passwordAgain) => password && passwordAgain && password === passwordAgain;
});
