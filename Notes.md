# Implementation notes

* Placed restriction on multiple users with same username. Database model first checks for existence of another use with the same username upon creating a new user. Only creates it if one does not presently exist.
* added default values to all objects in schema to disallow incomplete objects