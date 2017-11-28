(function () {
    angular
        .module("RecipeMan")
        .controller("PantryController", PantryController);

    function PantryController($routeParams, $location, $http) {
        var vm = this;
        var id = $routeParams["uid"];

        $http.get("/api/" + id + "/pantry").then(function (res) {
            vm.pantry = res.data;
        });
    }
})();