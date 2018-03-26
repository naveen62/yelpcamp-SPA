const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: (mail) => {
                return validator.isEmail(mail)
            },
            message: 'is not a valid Email'
        }   
    },
    password: {
        type: String,
        min: [6, 'Should include more then 6 characters'],
        required: [true, 'password is requied']
    },
    tokens: [
        {
            token: {type: String},
            access: {type: String}
        }
    ]
})
UserSchema.methods.genAuthToken = function() {
    const user = this
    const token = jwt.sign({_id: user._id.toHexString(), access: 'auth'}, '123abc').toString()
    user.tokens.push({
        token,
        access: 'auth'
    })
    return user.save().then(() => {
        return token;
    })
}

UserSchema.methods.hashPassword = function(password) {
   const salt = bcrypt.genSaltSync(10);
   return bcrypt.hashSync(password, salt);  
}
UserSchema.methods.checkPassword = function(password, hash) {
    return bcrypt.compareSync(password, hash)
}
UserSchema.statics.findByToken = function(token) {
    const User = this;
    let decoded
    try {
        decoded = jwt.verify(token, '123abc')
    } catch(e) {
        return new Promise((resolve, reject) => {
            return reject();
        })
    }
   return User.findOne({
            _id: decoded._id,
            'tokens.token': token,
            'tokens.access': decoded.access
        })
}
const User = mongoose.model('User', UserSchema)

module.exports = {
    User,
}