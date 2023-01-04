//***************PACKAGE-IMPORTS***************
const express = require('express')
//****************FILE-IMPORTS*****************
const account_fnc = require('../functions/account.fnc');
const misc = require('../misc/fnc.misc');
const msg = require('../misc/msg.misc');

//******************SCRIPT*********************
const middleware = express.Router();

middleware.get('/getAllAccounts', async (req, res) => {
    const response = await misc.check_user_roles(req, res)
    if (response) {
        account_fnc.getAllAccounts(
            req,
            res
        );
    } else {
        return res.json({
            error: true,
            message: msg.role_no_permission
        })
    }

})

module.exports = middleware;