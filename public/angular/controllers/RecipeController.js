(function () {
    angular
        .module("RecipeMan")
        .controller("RecipeController", RecipeController);

    function RecipeController($routeParams, $location, $http) {
        var vm = this;
        var id = $routeParams["rid"];

        $http.get("/api/recipe/" + id).then(function (res) {
            vm.recipe = res.data;
        });
    }
})();