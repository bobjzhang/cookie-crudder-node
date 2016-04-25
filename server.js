// Base Setup --------------------------------------------------------
var express     = require('express');
var morgan      = require('morgan');
var favicon 		= require('serve-favicon');
var bodyParser  = require('body-parser');
var items       = require('./app/routes/items');
var users       = require('./app/routes/users');
var app         = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Favicon Setup -----------------------------------------------------
app.use(favicon('./app/images/favicon.ico'));

// Routes ------------------------------------------------------------
var router = express.Router();

router.use((req, res, next) => {
    console.log('Transitioning...');
    next();
});

router.get('/', (req, res) => {
    res.json({ message: 'Arrived at the home route' });
});

app.use('/api', router);

// Port Setup --------------------------------------------------------
var port = process.env.PORT || 8080;
app.listen(port);
console.log(`Server listening on port ${port}`);
