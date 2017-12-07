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
            var pantry = vm.pantries[index];
            if (pantry.hasOwnProperty("_id")) {
                $http.delete("/api/user/" + pantry._id);
            }
            vm.pantries.splice(index, 1);
        };

        vm.update = function (index) {
            var pantry = vm.pantries[index];
            if (pantry.hasOwnProperty("_id")) {
                $http.put("/api/" + pantry._id + "/update", pantry);
            }
        };

        vm.pantry = function (index) {
            var pantry = vm.pantries[index];
            if (pantry.hasOwnProperty("_id")) {
                $location.path("/pantry/" + pantry._id);
            }
        };
    }
})();