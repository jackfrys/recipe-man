(function () {
    angular
        .module("RecipeMan")
        .controller("CategoryController", CategoryController);

    function CategoryController($routeParams, $location, $http) {
        var vm = this;

        function init() {
            $http.get("/api/categories").then(function (categories) {
                vm.categories = categories.data;
            });
        }

        init();

        vm.remove = function (index) {
            $http.delete("/api/category/" + vm.categories[index]._id);
            vm.categories.splice(index, 1);
        };

        vm.update = function (index) {
            var category = vm.categories[index];
            if (category.hasOwnProperty("_id")) {
                $http.put("/api/category/" + category._id + "/modify", category);
            } else {
                $http.post("/api/category/create", category).then(function (category) {
                    vm.categories[index] = category.data;
                });
            }
        };

        vm.create = function () {
            vm.categories.push({});
        };
    }
})();