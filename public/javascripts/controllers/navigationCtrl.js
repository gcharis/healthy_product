app.controller('nav-menu', function ($scope, $categories, $timeout, $location, $uiHandler) {
    showCategories();


    // $scope.registerCategory = (newCategory) => {
    //     $categories
    //         .register(newCategory)
    //         .then((product) => {
    //             clearCategoryRegistrationForm();
    //             showCategories();
    //         })
    //         .catch((res) => ($scope.message = res.data));
    // };

    // $scope.deleteCategory = (category) =>
    //     $categories
    //     .deleteOneById(category._id)
    //     .then((data) => showCategories())
    //     .catch((res) => ($scope.message = res.data));

    function showCategories() {
        $categories.getAll().then((categories) => ($scope.categories = categories)).catch((err) => console.warn(err));
        // console.log(categories)
    }

    // function clearCategoryRegistrationForm() {
    //     $scope.newCategory = {};
    //     $uiHandler.hideModalById('registerModal');
    // }

    // $scope.openModalById = $uiHandler.openModalById;
    // $scope.hideModalById = $uiHandler.hideModalById;

    $scope.items = [{
            name: 'BOOM'
        },
        {
            name: 'kalisperoboom'
        }
    ];
    $scope.checked = [];

    // Add a Item to the list
    // $scope.addItem = function () {

    //     $scope.items.push({
    //         amount: $scope.itemAmount,
    //         name: $scope.itemName
    //     });

    //     // Clear input fields after push
    //     $scope.itemAmount = "";
    //     $scope.itemName = "";

    // };
    console.log($scope.checked)

    // Add Item to Checked List and delete from Unchecked List
    $scope.toggleChecked = function (index) {
        $scope.checked.push($scope.items[index]);
        // $scope.items.splice(index, 1);
        console.log($scope.checked)
    };
    $scope.removeChecked = function (index) {
        $scope.checked.splice(index, 1);
        console.log($scope.checked)
    }

    // Get Total Items
    $scope.getTotalItems = function () {
        return $scope.items.length;
    };

    // Get Total Checked Items
    $scope.getTotalCheckedItems = function () {
        return $scope.checked.length;
    };

})