app.controller('homepage', function ($scope, $products) {

    $products.getAll()
        .then(products => console.log(products))
})