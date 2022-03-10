const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1    
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type:String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next) {
    const user = this

    if(user.isModified('password')) {
        bcrypt.genSalt(process.env.saltRounds, function(err, salt) {
            if(err) return next(err);
                bcrypt.hash(user.password, salt, function(err,hash) {
                if(err) return next(err);
                user.password = hash;
                next()
             })
        })
    } else {
        next();
    } 
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err),
        cb(null,isMatch)
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }