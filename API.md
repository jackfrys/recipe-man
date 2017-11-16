## Users

* GET user by id: /api/user/<userId>
* POST user from body object: /api/user/create
* DELETE user by id: /api/user/<userId>
* PUT user by id from body object: /api/user/<userId>/update
* GET user by credentials: api/user/<username>/<password>


## Recipes

* GET recipes owned by user: /api/<userId>/recipes
* GET recipes shared with user: /api/<userId>/shared
* POST new recipe for user from body object: /api/<userId>/create
* DELETE recipe by id: /api/<recipeId>
* PUT recipe by id from body object: /api/<recipeId>/update


## Pantries

* GET pantry for user: /api/<userId>/pantry
* POST pantry for user from body object (only do this once per user): /api/<userId>/pantry/add
* PUT pantry by id from body object: /api/<pantryId>/update
