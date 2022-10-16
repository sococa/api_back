const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

if(!process.env.HOST) {
    var config = require('../config')
}else {
    var config = require('../config-exemple')
}
let secret = process.env.SECRET || config.token.secret;
const withAuth = require('../withAuth');


module.exports = (app, db)=>{
    const userModel = require('../models/UserModel')(db);

   	app.get('/api/checkToken', withAuth, async (req, res, next)=>{
        console.log(req)
        let user = await userModel.getUserByEmail(req.email); 
        console.log(user);
        res.json({status: 200, msg: "token valide ", user: user})
    })

}