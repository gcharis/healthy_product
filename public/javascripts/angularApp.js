const app = angular.module('healthy_product_app', [ 'ngRoute' ]);

app
	.run(function($rootScope, $admin, $hpLocation, $location) {
		$rootScope.$on('$routeChangeStart', function($event, next, current) {
			if ($location.path() !== '/login' && $location.path() !== '/register')
				return $admin
					.getVerification(localStorage.token)
					.then(() => $rootScope.$broadcast('admin logged in'))
					.catch((res) => $hpLocation.replaceWith('/login'));

			!!localStorage.token
				? $admin
						.getVerification(localStorage.token)
						.then((res) => {
							$rootScope.$broadcast('admin logged in');
							$hpLocation.replaceWith('/');
						})
						.catch((res) => console.warn(res.data))
				: console.warn('No token found');
		});

		$rootScope.$on('admin logged out', function() {
			$hpLocation.replaceWith('/login');
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
			});
	});
