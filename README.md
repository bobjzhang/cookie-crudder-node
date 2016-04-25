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

Routes
======
