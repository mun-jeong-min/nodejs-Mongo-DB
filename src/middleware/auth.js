const {User} = require('../models/User')

let auth = (req,res,next) => {
    let token = req.cookies.x_auth;
    const user = User.findByToken(token, (err,user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: 404 })

        req.token = token;
        req.user =user;
        next();
    })
}

module.exports = {auth}