const app = angular.module('healthy_product_app', [ 'ngRoute' ]);

// const URL = 'http://192.168.1.4:4000'
const URL = 'http://localhost:4000';

app.config(function($locationProvider, $routeProvider) {
	$locationProvider.hashPrefix('').html5Mode(true);

	$routeProvider
		.when('/', {
			template: '',
			controller: 'index'
		})
		.when('/register', {
			templateUrl: '/public/views/register.html',
			controller: 'register'
		})
		.when('/login', {
			templateUrl: '/public/views/login.html',
			controller: 'login'
		})
		.when('/products', {
			templateUrl: '/public/views/products.html',
			controller: 'products'
		})
		.when('/product', {
			templateUrl: '/public/views/product.html',
			controller: 'homepage'
		})
		.when('/categories', {
			templateUrl: '/public/views/categories.html'
		})
		.when('/test', {
			templateUrl: '/public/views/test.html'
		});
});

app
	.directive('uiMessage', function($timeout) {
		return {
			restrict: 'EA',
			transclude: true,
			scope: {
				message: '='
			},
			link: function(scope, element, attrs, controller, transcludeFn) {
				scope.$watch('message', function(newValue, oldValue) {
					if (!newValue) return;
					element[0].innerHTML = newValue;
					$timeout(() => {
						scope.message = '';
						element[0].innerHTML = '';
					}, 2500);
				});
			}
		};
	})
	.directive('password', function($timeout) {
		return {
			restrict: 'A',
			transclude: true,
			// scope: {
			// 	value: '='
			// },
			link: function(scope, element, attrs, controller, transcludeFn) {
				element[0].onchange = () => $timeout(() => (element[0].type = 'password'), 100);
			}
		};
	});
