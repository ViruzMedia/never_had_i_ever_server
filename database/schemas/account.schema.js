const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    key: { type: String },
    personal: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        birthday: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            number: { type: Number, required: true },
            city: { type: String, required: true },
            plz: { type: Number, required: true },
        }
    },
    contact: {
        email: { type: String, required: true },
        tel_mobil: { type: Number, required: true },
    },
});

module.exports = mongoose.model('Accounts', accountSchema);