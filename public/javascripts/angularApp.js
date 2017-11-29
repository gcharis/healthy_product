const app = angular.module('healthy_product_app', ['ngRoute'])

// const URL = 'http://192.168.1.4:4000'
const URL = 'http://localhost:4000'

app.config(function ($locationProvider, $routeProvider) {
    $locationProvider
        .hashPrefix('')
        .html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: '/static/views/homepage.html',
            controller: 'homepage'
        })
        .when('/products', {
            templateUrl: '/static/views/products.html',
            controller: 'homepage'
        })
        .when('/product', {
            templateUrl: '/static/views/product.html',
            controller: 'homepage'
        })

});