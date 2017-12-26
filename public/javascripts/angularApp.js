const app = angular.module('healthy_product_app', [ 'ngRoute' ]);

// const URL = 'http://192.168.1.4:4000'
const URL = 'http://localhost:4000';

app
	.run(function($rootScope, $admin, $hpLocation, $location) {
		$rootScope.$on('$locationChangeStart', async function($event, next, current) {
			if ($location.url() === '/login' || $location.url() === '/register') return;
			await $admin.getVerification(localStorage['token']).catch((res) => $hpLocation.replaceWith('/login'));
		});
	})
	.config(function($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('').html5Mode(true);

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
				templateUrl: '/public/views/categories.html'
			});
	});
