//***************PACKAGE-IMPORTS***************
const express = require('express');
const body_parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

//****************FILE-IMPORTS*****************
const config = require('./misc/config.misc');
const msg = require('./misc/msg.misc');
const misc = require('./misc/fnc.misc');

const database = require('./database/index');

//****************ROUTE-IMPORTS****************

console.log(Date.now() + " " + msg.setup_start)
const application = express();

console.log(Date.now() + " " + msg.setup_middleware)
const middleware = express.Router();

console.log(Date.now() + " " + msg.setup_database)
database.connect();

console.log(Date.now() + " " + msg.setup_morgan)
application.use(morgan(config.log_mode));

console.log(Date.now() + " " + msg.setup_parser)
application.use(body_parser.urlencoded({ extended: config.urlencoded }));
application.use(body_parser.json());

console.log(Date.now() + " " + msg.setup_private)

console.log(Date.now() + " " + msg.setup_public);
//bsp application.use('/public', cors(), account_router)

//*******************STARTUP*******************

//Start the API
application.listen(config.api_port, () => {
    console.log(Date.now() + " " + msg.api_started + config.api_domain + ':' + config.api_port)
});
application.get('/', function (req, res) {
    res.send({
        timestamp: Date.now(),
        message: msg.api_started + config.api_domain + ':' + config.api_port
    })
});