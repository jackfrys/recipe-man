# Recipe Man

* `npm install`
* `cd client`
* `npm install`
* `npm run build`
* `cd ..`
* `npm start`

Make sure an instance of `mongod` is running as well. You can install mongoDB using Homebrew.

## Editing all objects
The admin view can be accessed in the backend repo in the `angular` subdirectory. It provides a simple Angular-based UI for editing all objects. You must log in with an admin account - `admin:admin`.

The Heroku-based admin view is [here](https://recipe-man-db.herokuapp.com/angular/#!/).

## Database checks
* only one user per username: added `unique` attribute to field
