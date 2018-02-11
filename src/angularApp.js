const app = angular.module('healthy_product_app', [ 'ngRoute', 'ngSanitize', 'textAngular', 'angularMoment' ]);

app
	.run(function($rootScope, $admin, $location) {
		$rootScope.$on('$locationChangeStart', async function($event) {
			if ($location.path() !== '/login' && $location.path() !== '/register')
				return await $admin
					.getVerification(localStorage.token)
					.then(() => $rootScope.$broadcast('admin logged in'))
					.catch((res) => {
						$event.preventDefault();
						$location.path('/login').replace();
					});

			!!localStorage.token ? $location.path('/products').replace() : null;
		});

		$rootScope.$on('admin logged out', function() {
			$location.path('/login').replace();
		});
	})
	.config(function($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('');

		$routeProvider
			.when('/', {
				template: ''
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
			})
			.when('/shippings', {
				templateUrl: '/public/views/shippings.html',
				controller: 'shippings'
			})
			.when('/site-sections', {
				templateUrl: '/public/views/site-sections.html',
				controller: 'siteSections'
			})
			.when('/orders/page/:page', {
				templateUrl: '/public/views/orders.html',
				controller: 'orders'
			})
			.when('/orders/:id', {
				templateUrl: '/public/views/order.html',
				controller: 'orderInfo'
			});
	});

export default app;
