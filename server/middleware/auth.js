const {User} = require('../models/User');

const auth = (req, res, next) => {
        let token =  req.header('x-auth');
        User.findByToken(token).then((user) => {
            req.user = user;
            req.token = token
            next();
        }).catch((e) => {
           res.send({
               err: true,
               msg: 'Please sign in to produce'
           })
        })
}
module.exports = {
    auth
}