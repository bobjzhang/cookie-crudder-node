// Base Setup --------------------------------------------------------
var bodyParser  = require('body-parser');
var express     = require('express');
var favicon 		= require('serve-favicon');
var items       = require('./app/routes/items');
var mongoose 		= require('mongoose');
var morgan      = require('morgan');
var users       = require('./app/routes/users');

var app         = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Favicon Setup -----------------------------------------------------
app.use(favicon('./app/images/favicon.ico'));

// ORM Mongoose Setup ------------------------------------------------
// Connect to your MongoDB instance
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://<dbuser>:<dbpassword>@<dbUrl');

// Routes ------------------------------------------------------------
var router = express.Router();

router.use((req, res, next) => {
    console.log('Transitioning...');
    next();
});

router.get('/', (req, res) => {
    res.json({ message: 'Arrived at the home route' });
});

// Item Routes
router.get('/items', items.findAll);
router.get('/items/:id', items.findById);
router.get('/items/search/query', items.search);
router.post('/items/:userId', items.addItem);
router.put('/items/:id', items.updateById);
router.delete('/items/:id', items.deleteById);

// User Routes
router.get('/users', users.findAll);
router.get('/users/:id', users.findById);
router.get('/users/:id', users.findByUsername);
router.get('/users/search/query', users.search);
router.get('/users/items/:id', users.getUsersItems);
router.post('/users', users.addUser);
router.put('/users/:id', users.updateById);
router.delete('/users/:id', users.deleteById);

app.use('/api', router);

// Port Setup --------------------------------------------------------
var port = process.env.PORT || 8080;
app.listen(port);
console.log(`Server listening on port ${port}`);
