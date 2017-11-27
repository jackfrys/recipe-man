(function () {
    angular
        .module("RecipeMan")
        .controller("HomeController", HomeController);

    function HomeController($routeParams, $location, $http) {
        var vm = this;

        $http.get("/api/users").then(function (res) {
            vm.users = res.data;
        });
    }
})();