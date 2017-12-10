(function () {
    angular
        .module("RecipeMan")
        .controller("HomeController", HomeController);

    function HomeController($routeParams, $location, $http) {
        var vm = this;
        vm.new = {};

        vm.login = function () {
            var un = vm.new.username;
            var pw = vm.new.password;
            $http.get("/api/user/" + un + "/" + pw).then(function (user) {
                var u = user.data[0];
                if (u.admin) {
                    $location.path("users");
                }
            });
        };
    }
})();