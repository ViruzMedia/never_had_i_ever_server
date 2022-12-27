//***************PACKAGE-IMPORTS***************
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

//****************FILE-IMPORTS*****************
const msg = require('./msg.misc');


//******************SCRIPT*********************
class Misc_Functions {   
    hashPassword(str) {
        const cipher = crypto.createCipher('aes192', 'a pass');
        let encrypted = cipher.update(str, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
};

const misc_functions = new Misc_Functions;
module.exports = misc_functions;