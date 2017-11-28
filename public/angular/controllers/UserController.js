(function () {
    angular
        .module("RecipeMan")
        .controller("UserController", UserController);

    function UserController($routeParams, $location, $http) {
        var vm = this;
        var id = $routeParams["uid"];
        vm.id = id;

        $http.get("/api/user/" + id).then(function (res) {
            vm.user = res.data;
        });

        $http.get("/api/" + id + "/recipes").then(function (res) {
            vm.recipes = res.data;
        });

        $http.get("/api/" + id + "/shared").then(function (res) {
            vm.shared = res.data;
        });
    }
})();