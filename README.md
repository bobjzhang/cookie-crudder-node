# cookie-crudder-nodejs
Cookie Cutter For CRUD Operations Using Node Express Mongoose and Mongo to play around with.

Build cookie-crudder-node
==========================
```
cd node_modules && npm install
node server.js
```
Will be hosted on on http://localhost:8080/api

Add Mongoose/mongoDB integration
================================
Un-comment:
```
var mongoose = require('mongoose');
mongoose.connect('mongodb://<\dbuser>:<\dbpassword>@<\dbUrl>');
```
And replace 'mongodb://<\dbuser>:<\dbpassword>@<\dbUrl>' with your appropriate MongoDB service

Item Routes
===========
GET all items
```
localhost:8080/api/items
```

GET item by id
```
localhost:8080/api/items/:id
```

GET items by query parameters
```
localhost:8080/api/items/search/query?name=....
localhost:8080/api/items/search/query?description=.....
```

POST item
```
localhost:8080/api/items/:userId
```

```json
{
	"name": "The Design of Everyday Things",
	"description": "Part operating manual for designers and part manifesto on the power of designing for people.",
}
```

PUT item
```
localhost:8080/api/items/:id
```

```json
{
	"name": "New Item Name",
}
```

DELETE item
```
localhost:8080/api/items/:id
```

User Routes
===========
GET all users
```
localhost:8080/api/users
```

GET user by id
```
localhost:8080/api/users/:id
```

GET all items belonging to a user
```
localhost:8080/api/users/items/:id
```

GET users by query parameters
```
localhost:8080/api/users/search/query?name=
```

POST user
```
localhost:8080/api/users
```

```json
{
	"name": "Bob Zhang",
	"username": "bobjzhang",
	"items": []
}
```

PUT user
```
localhost:8080/api/users/:id
```

```json
{
	"name": "Bob Zhang 2.0",
}
```

DELETE user
```
localhost:8080/api/users/:id
```
