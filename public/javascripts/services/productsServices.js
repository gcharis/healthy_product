app.service('$products', function ($http) {
    return {
        getAll() {
            return new Promise((resolve, reject) => {
                $http.get(URL + '/products/all')
                    .then(res => {
                        if (res.status === 500) return reject(res.data.err)
                        resolve(res.data)
                    })
            })
        }
    }
})
