## Users

* GET user by id: `/api/user/<userId>`
* POST new user from body object: `/api/user/create`
* DELETE user by id: `/api/user/<userId>`
* PUT changes to user by id from body object: `/api/user/<userId>/update`
* GET user by credentials: `/api/user/<username>/<password>`

### Fields
* email: String
* name: String
* username: String
* password: String

## Recipes

* GET recipes owned by user: `/api/<userId>/recipes`
* GET recipes shared with user: `/api/<userId>/shared`
* POST new recipe for user from body object: `/api/<userId>/create`
* DELETE recipe by id: `/api/<recipeId>`
* PUT recipe by id from body object: `/api/<recipeId>/update`
* POST a new recipe share: `/api/<recipeId>/share/<userId>`
* PUT a new recipe category: `/api/<recipeId>/category/<categoryId>`
* DELETE a recipe category: `/api/<recipeId>/category/<categoryId>`

### Fields
* userId (don't modify in or add to JSON object, send via path in API call)
* steps: [String]
* ingredients: [{name: String, quantity: Number}]
* shared: [userId] (same thing, don't modify on client)

## Recipe categories

* GET all categories: `/api/category`
* GET category by id: `/api/category/<categoryId>`
* PUT change to category by id and body object: `/api/category/<categoryId>/modify`
* DELETE category: `/api/category/<categoryId>`
* POST a new category from body object: `/api/category/create`

### Fields
* name: String
* description: String

## Pantries

* GET pantry for user: `/api/<userId>/pantry`
* POST pantry for user from body object (only do this once per user): `/api/<userId>/pantry/add`
* PUT pantry by id from body object: `/api/<pantryId>/update`

### Fields
* userId (same thing, don't modify on client)
* ingredients: [{name: String, quantity: Number}]
