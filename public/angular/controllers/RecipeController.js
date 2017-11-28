(function () {
    angular
        .module("RecipeMan")
        .controller("RecipeController", RecipeController);

    function RecipeController($routeParams, $location, $http) {
        var vm = this;
        var id = $routeParams["rid"];

        function init() {
            $http.get("/api/recipe/" + id).then(function (res) {
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

        vm.remove = function (item) {
            vm.recipe.steps.splice(item, 1);
        };
    }
})();