const app = angular.module('healthy_product_app', ['ngRoute']);

app
	.run(function ($rootScope, $admin, $hpLocation, $location) {
		$rootScope.$on('$locationChangeStart', function ($event, next, current) {
			if (next === 'http://localhost:4000/login' || next === 'http://localhost:4000/register') return;

			$admin.getVerification(localStorage['token']).catch((res) => {
				$hpLocation.replaceWith('/login');
			});
		});
	})
	.config(function ($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('')

		$routeProvider
			.when('/', {
				template: '',
				controller: 'homepage'
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
			.when('/products/:slug', {
				templateUrl: '/public/views/product.html',
				controller: 'productInfo'
			})
			.when('/categories', {
				templateUrl: '/public/views/categories.html',
				controller: 'categories'
			});
	});