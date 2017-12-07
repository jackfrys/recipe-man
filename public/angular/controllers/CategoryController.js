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
            $http.put("/api/category/" + vm.categories[index]._id + "/update", vm.categories[index]);
        };
    }
})();