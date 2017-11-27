app.controller('homepage', function ($scope, $products) {

    $products.getAll()
        .then(res => console.log(res.data, 'asda'))
})