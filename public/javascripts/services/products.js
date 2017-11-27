app.service('$products', function ($http) {
    return {
        getAll() {
            return $http.get(URL + '/products/all')
        }
    }
})