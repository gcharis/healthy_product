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
