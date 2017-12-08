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

        vm.pantry = function (index) {
            $http.get("/api/" + vm.users[index]._id + "/pantry").then(function (pantry) {
                if (pantry.data.length > 0) {
                    $location.path("/pantry/" + pantry.data[0]._id);
                }
            });
        };

        vm.addPantry = function (index) {
            var obj = {name:vm.users[index].username + "'s Pantry"};
            $http.post("/api/" + vm.users[index]._id + "/pantry/add", obj);
        };
    }
})();