//****************FILE-IMPORTS*****************
const route_schema = require('../schemas/route.schema');
const msg = require('../../misc/msg.misc');
//*****************SCRIPT**********************

class Route_Db_fnc {
    async addRoute(req, name, route, needed_priority, needed_role, res) {
        const newRoute = new route_schema({
            name: name,
            route: route,
            needed_priority: needed_priority,
            needed_role: needed_role
        })

        await newRoute.save(function (req, err, res) {
            if (err) {
                return console.log(err);
            }
        });

        return res.status(201).send({
            error: false,
            message: msg.route_created
        })

    }
    async getAllRoutes(req, res) {
        route_schema.find({}, (err, doc) => {
            if (err) {
                console.log(err)
            } else {
                return res.status(201).send({
                    error: false,
                    routes: doc
                });
            }
        })
    }
    async getRouteByRoute(req, route, res) {
        return new Promise((r, j) => route_schema.find({ route: route }, null, (err, data) => {
            if (err) {
                console.log(err)
                return j(err);
            } else {
                // console.log(data)
                r(data);
            }
        }))
    }
    async getRouteByName(req, name, res) {
        return new Promise((r, j) => route_schema.find({ name: name }, null, (err, data) => {
            if (err) {
                return j(err);
            } else {
                r(data);
            }
        }))
    }
    async updateRouteByID(req, id, res) {
        const filter = {
            _id: req.body._id
        }
        console.log(filter)
        const update = {
            name: req.body.name,
            route: req.body.route,
            needed_priority: req.body.needed_priority,
            needed_role: req.body.needed_role
        }
        console.log(update)
        await route_schema.findOneAndUpdate(filter, { $set: { name: req.body.name, route: req.body.route, needed_priority: req.body.needed_priority, needed_role: req.body.needed_role } }, { new: true }, (err, data) => {
            if (err) {
                console.log("Error" + err);
            } else {
                return data
            }
        });
    }
    async deleteRoute(req, res) {
        const filter = {
            _id: req.body._id
        }
        await route_schema.deleteOne(filter, (err, data) => {
            if (err) {
                console.log("Error" + err);
            } else {
                return data
            }
        })
    }
}

const route_db_fnc = new Route_Db_fnc();
module.exports = route_db_fnc; 