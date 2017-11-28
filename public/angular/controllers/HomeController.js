(function () {
    angular
        .module("RecipeMan")
        .controller("HomeController", HomeController);

    function HomeController($routeParams, $location, $http) {
        var vm = this;
        vm.new = {}

        function init() {
            $http.get("/api/users").then(function (res) {
                vm.users = res.data;
            });
        }
        init();

        vm.create = function () {
            $http.post("/api/user/create", vm.new).then(function () {
                init();
            });
        };
    }
})();