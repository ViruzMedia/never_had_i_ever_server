//***************PACKAGE-IMPORTS***************
const express = require('express')
//****************FILE-IMPORTS*****************
const account_fnc = require('../functions/account.fnc');
const misc = require('../misc/fnc.misc');
const msg = require('../misc/msg.misc');

//******************SCRIPT*********************
const router = express.Router();

router.post('/authentication/register', (req, res)=> {
    console.log(req.body)
    account_fnc.register_account(
        req,
        req.body.username,
        req.body.password,
        req.body.firstname,
        req.body.lastname,
        req.body.birthday,
        req.body.street,
        req.body.number,
        req.body.city,
        req.body.plz,
        req.body.email,
        req.body.tel_mobil,
        res
    )
})
router.post('/authentication/login', (req, res) => {
    account_fnc.credential_login(
        req,
        req.body.username,
        req.body.password,
        res
    )
})

router.post('/authentication/key_login', (req, res) => {
    account_fnc.key_login(
        req,
        req.body.uid,
        req.body.key,
        res
    )
})

module.exports = router;