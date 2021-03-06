var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
//var config = require('../config/config');

var UserSchema = new mongoose.Schema({
  username: {type: String },
  mobile:   {type: String },
  email:    {type: String },   
  subscribe: {type: Boolean ,  default: false },
  status:   {type: Boolean ,  default: false },
  hash: String,
  salt: String,
  MobileData:String
});
 

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

UserSchema.methods.setStatus = function(status) {
   this.status = status;
};

UserSchema.methods.generateJWT = function() {

  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 3);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  });
};

mongoose.model('User', UserSchema);