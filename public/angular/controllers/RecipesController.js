(function () {
    angular
        .module("RecipeMan")
        .controller("RecipesController", RecipesController);

    function RecipesController($routeParams, $location, $http) {
        var vm = this;

        function init() {
            $http.get("/api/recipes/users").then(function (recipes) {
                vm.recipes = recipes.data;
            });
        }

        init();

        vm.remove = function (index) {
            $http.delete("/api/" + vm.recipes[index]._id);
            vm.recipes.splice(index, 1);
        };

        vm.update = function (index) {
            $http.put("/api/recipe/" + vm.recipes[index]._id + "/update", vm.recipes[index]);
        };

        vm.recipe = function (index) {
            $location.path("/recipe/" + vm.recipes[index]._id);
        };
    }
})();