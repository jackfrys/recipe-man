# Recipe Man

`npm install`

`npm start`

to run the backend server.

Each of the http-based API calls can be performed with via the instructions in `API.md`.

The React frontend lives in a separate repository - it is set to use a Heroku instance of the backend, not a local server.
The remote backend is located [here](recipe-man-db.herokuapp.com).

The remote frontend is located [here](recipe-man-frontend.herokuapp.com) and the repository is [here](https://github.com/trentduffy/recipe-man-frontend). The frontend can be run locally, but it will still query the remote backend.

## Editing all objects
The admin view can be accessed in the backend repo in the `angular` subdirectory. It provides a simple Angular-based UI for editing all objects. You must log in with an admin account - `admin:admin`.

## Database checks
* only one user per username: added `unique` attribute to field