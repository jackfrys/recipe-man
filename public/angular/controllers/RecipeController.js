(function () {
    angular
        .module("RecipeMan")
        .controller("RecipeController", RecipeController);

    function RecipeController($routeParams, $location, $http) {
        var vm = this;
        var id = $routeParams["rid"];
        vm.newCat = "";

        function init() {
            $http.get("/api/recipecat/" + id).then(function (res) {
                vm.recipe = res.data;
                vm.recipe.steps = vm.recipe.steps.map(function (t) {
                    return {description:t};
                });
            });
        }
        init();

        vm.update = function () {
            var d = vm.recipe;
            d.steps = d.steps.map(function (t) {
                return t.description;
            });
            $http.put("/api/recipe/" + id + "/update", d).then(function () {
                init();
            });
        };

        vm.add = function () {
            vm.recipe.steps.push({});
        };

        vm.addIngredient = function () {
            vm.recipe.ingredients.push({});
        };

        vm.remove = function (item) {
            vm.recipe.steps.splice(item, 1);
        };

        vm.removeIngredient = function (item) {
            vm.recipe.ingredients.splice(item, 1);
        };

        vm.addCategory = function () {
            $http.get("/api/categoryname/" + vm.newCat).then(function (cat) {
                if (cat.data) {
                    $http.put("/api/" + id + "/category/" + cat.data._id).then(function () {
                        init();
                    });
                }
            });
        };

        vm.removeCategory = function (item) {
            vm.recipe.categories.splice(item, 1);
        };
    }
})();