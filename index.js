//***************PACKAGE-IMPORTS***************
const express = require('express');
const body_parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const schedule = require('node-schedule');

//****************FILE-IMPORTS*****************
const config = require('./misc/config.misc');
const msg = require('./misc/msg.misc');
const misc = require('./misc/fnc.misc');
const database = require('./database/index');

//****************ROUTE-IMPORTS****************
const authentication_router = require('./router/authentication.router');
const role_router = require('./router/role.router');
const route_router = require('./router/route.router');
const account_router = require('./router/account.router')

//****************PREPROCESSING****************

console.log(Date.now() + " " + msg.setup_start)
const application = express();

application.use(cors());

//console.log(Date.now() + " " + msg.setup_middleware)
const private = express.Router();
const games = express.Router()

//console.log(Date.now() + " " + msg.setup_database)
database.connect();

//console.log(Date.now() + " " + msg.setup_morgan)
application.use(morgan(config.log_mode));

//console.log(Date.now() + " " + msg.setup_parser)
application.use(body_parser.urlencoded({ extended: config.urlencoded }));
application.use(body_parser.json());

//console.log(Date.now() + " " + msg.setup_private)
application.use('/private', cors(), private);
private.use((req, res, next) => {
    misc.check_api_token(req, res, next, config.api_secret);
})

private.use('/role-system', role_router)
private.use('/route-system', route_router)
private.use('/account-system', account_router)

//console.log(Date.now() + " " + msg.setup_public);
application.use('/', cors(), authentication_router)

//*******************STARTUP*******************

//Start the API
application.listen(config.api_port, '0.0.0.0', () => {
    console.log(Date.now() + " " + msg.api_started + config.api_domain + ':' + config.api_port)
});
application.get('/', function (req, res) {
    res.send({
        timestamp: Date.now(),
        status: "Online",
        message: msg.api_started + config.api_domain + ':' + config.api_port
    })
});