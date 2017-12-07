(function () {
    angular
        .module("RecipeMan")
        .controller("UserController", UserController);

    function UserController($routeParams, $location, $http) {
        var vm = this;

        function init() {
            $http.get("/api/users").then(function (users) {
                vm.users = users.data;
            });
        }
        init();

        vm.remove = function (index) {
            $http.delete("/api/user/" + vm.users[index]._id);
            vm.users.splice(index, 1);
        };

        vm.update = function (index) {
            $http.put("/api/user/" + vm.users[index]._id + "/update", vm.users[index]);
        };
    }
})();