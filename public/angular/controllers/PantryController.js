(function () {
    angular
        .module("RecipeMan")
        .controller("PantryController", PantryController);

    function PantryController($routeParams, $location, $http) {
        var vm = this;
        var id = $routeParams["pid"];

        function init() {
            $http.get("/api/pantry/" + id).then(function (res) {
                vm.pantry = res.data;
            });
        }
        init();

        vm.update = function () {
            $http.put("/api/" + id + "/update", vm.pantry).then(function () {
                init();
            });
        };
    }
})();