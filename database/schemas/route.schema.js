const mongoose = require('mongoose');

const routeSchema = mongoose.Schema({
    name: { type: String, require: true},
    route: { type: String, require: true},
    needed_priority: { type: Number, default: 0 },
    needed_role: { type: Array, require: true }
});


module.exports = mongoose.model('Routes', routeSchema);