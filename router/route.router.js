//***************PACKAGE-IMPORTS***************
const express = require('express');
const middleware = express.Router();

//****************FILE-IMPORTS*****************
const misc = require('../misc/fnc.misc');
const msg = require('../misc/msg.misc');

const route_fnc = require('../functions/route.fnc');
const { response } = require('express');

//****************SCRIPT*****************
middleware.get('/getAllRoutes', async (req, res) => {
    const response = await misc.check_user_roles(req, res)
    console.log
    if (response) {
        route_fnc.getAllRoutes(req, res);
    } else {
        return res.json({
            error: true,
            message: msg.role_no_permission
        })
    }
})
middleware.post('/addRoute', async (req, res) => {
    const response = await misc.check_user_roles(req, res)
    if (response) {
        route_fnc.addRoute(
            req,
            req.body.name,
            req.body.route,
            req.body.needed_priority,
            req.body.needed_role,
            res
        );
    } else {
        return res.json({
            error: true,
            message: msg.role_no_permission
        })
    }

})

middleware.put('/updateRoute', async (req, res) => {

    const response = await misc.check_user_roles(req, res);
    //  console.log(response)
    if (response) {
        route_fnc.updateRouteByID(req, req.body.route_id, res);
    } else {
        return res.json({
            error: true,
            message: msg.role_no_permission
        })

    }
})

middleware.post('/checkRoute', async (req, res) => {
    const response = await misc.check_user_roles(req, res);
    if (response) {
        route_fnc.checkRoute(
            req,
            req.body.route_name,
            res
        )
    } else {
        return res.json({
            error: true,
            message: msg.role_no_permission
        })
    }
})

middleware.post('/deleteRoute', async (req, res) => {
    const response = await misc.check_user_roles(req, res);
    if (response) {
        route_fnc.deleteRoute(req, res)
    } else {
        return res.json({
            error: true,
            message: msg.role_no_permission
        })
    }
})


module.exports = middleware;