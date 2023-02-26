const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');


const userSchema = new mongoose.Schema({
    username: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    bio: {type: String},
    bros: {type: Array},
    bestbros: {type: Array},
    bestbroingme: {type: Array}
});

userSchema.methods.generateAuthToken = function (){
     const token = jwt.sign({_id:this._id}, process.env.JWTPRIVATEKEY, {expiresIn:"7d"})
     return token   
}

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label('username'),
        email: Joi.string().email().required().label('email'),
        password: passwordComplexity().required().label('password'),
        bio: '',
        bros: Joi.array(),
        bestbros: Joi.array(),
        bestbroingme: Joi.array()
    })
    return schema.validate(data)
};

module.exports = {User, validate};