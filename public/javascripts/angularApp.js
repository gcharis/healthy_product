const app = angular.module('healthy_product_app', [ 'ngRoute', 'ngSanitize', 'textAngular', 'angularMoment' ]);

app
	.run(function($rootScope, $admin, $location, $location) {
		$rootScope.$on('$routeChangeStart', function($event, next, current) {
			if ($location.path() !== '/login' && $location.path() !== '/register')
				return $admin
					.getVerification(localStorage.token)
					.then(() => $rootScope.$broadcast('admin logged in'))
					.catch((res) => $location.path('/login').replace());

			!!localStorage.token
				? $admin
						.getVerification(localStorage.token)
						.then((res) => {
							$rootScope.$broadcast('admin logged in');
							$location.path('/products').replace();
						})
						.catch((res) => console.warn(res.data))
				: console.warn('No token found');
		});

		$rootScope.$on('admin logged out', function() {
			$location.path('/login').replace();
		});
	})
	.config(function($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('');

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
		// .when('/navigation-bar', {
		// 	templateUrl: '/public/views/navigation.html',
		// 	controller: 'nav-menu'
		// });
	});
