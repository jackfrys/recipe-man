(function () {
    angular
        .module("RecipeMan")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/users", {
                templateUrl: "views/user.html",
                controller: "UserController",
                controllerAs: "model"
            })
            .when("/pantry/:pid", {
                templateUrl: "views/pantry.html",
                controller: "PantryController",
                controllerAs: "model"
            })
            .when("/recipe/:rid", {
                templateUrl: "views/recipe.html",
                controller: "RecipeController",
                controllerAs: "model"
            });
    }
})();