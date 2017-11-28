(function () {
    angular
        .module("RecipeMan")
        .controller("UserController", UserController);

    function UserController($routeParams, $location, $http) {
        var vm = this;
        var id = $routeParams["uid"];
        vm.id = id;

        function init() {
            $http.get("/api/user/" + id).then(function (res) {
                vm.user = res.data;
            });

            $http.get("/api/" + id + "/recipes").then(function (res) {
                vm.recipes = res.data;
            });

            $http.get("/api/" + id + "/shared").then(function (res) {
                vm.shared = res.data;
            });

            $http.get("/api/" + id + "/pantry").then(function (res) {
                vm.pantries = res.data;
            });
        }
        init();

        vm.delete = function () {
            $http.delete("/api/user/" + id);
        };

        vm.update = function () {
            $http.put("/api/user/" + id + "/update", vm.user).then(function () {
                init();
            });
        };

        vm.createPantry = function () {
            $http.post("/api/" + id + "/pantry/add", {name:"My new Pantry"}).then(function () {
                init();
            });
        };
    }
})();