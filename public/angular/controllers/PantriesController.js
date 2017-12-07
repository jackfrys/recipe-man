(function () {
    angular
        .module("RecipeMan")
        .controller("PantriesController", PantriesController);

    function PantriesController($routeParams, $location, $http) {
        var vm = this;

        function init() {
            $http.get("/api/pantries").then(function (pantries) {
                vm.pantries = pantries.data;
            });
        }
        init();

        vm.remove = function (index) {
            $http.delete("/api/user/" + vm.pantries[index]._id);
            vm.pantries.splice(index, 1);
        };

        vm.update = function (index) {
            $http.put("/api/user/" + vm.pantries[index]._id + "/update", vm.pantries[index]);
        };

        vm.pantry = function (index) {
            $location.path("/pantry/" + vm.pantries[index]._id);
        };
    }
})();