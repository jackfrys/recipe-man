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
* GET recipe by id: `/api/recipe/<recipeId>`
* POST new recipe for user from body object: `/api/<userId>/recipe/create`
* DELETE recipe by id: `/api/<recipeId>`
* PUT recipe by id from body object: `/api/recipe/<recipeId>/update`
* POST a new recipe share: `/api/<recipeId>/share/<userId>`
* PUT a new recipe category: `/api/<recipeId>/category/<categoryId>`
* DELETE a recipe category: `/api/<recipeId>/category/<categoryId>`
* GET whether a recipe can be made with a pantry: `/api/recipe/<recipeId>/complete/<pantryId>`
* POST that a recipe has beem made with a pantry: `/api/recipe/<recipeId>/complete/<pantryId>`

### Fields
* title : String
* userId (don't modify in or add to JSON object, send via path in API call)
* steps: [String]
* ingredients: [{name: String, quantity: Number, unit: String}]
* shared: [userId] (same thing, don't modify on client)

## Recipe categories

* GET all categories: `/api/categories`
* GET category by id: `/api/category/<categoryId>`
* PUT change to category by id and body object: `/api/category/<categoryId>/modify`
* DELETE category: `/api/category/<categoryId>`
* POST a new category from body object: `/api/category/create`

### Fields
* name: String
* description: String

## Pantries

* GET pantry for user: `/api/<userId>/pantry`
* POST new pantry for user from body object: `/api/<userId>/pantry/add`
* PUT pantry by id from body object: `/api/<pantryId>/update`

### Fields
* name: String
* userId (same thing, don't modify on client)
* ingredients: [{name: String, quantity: Number, unit: String}]