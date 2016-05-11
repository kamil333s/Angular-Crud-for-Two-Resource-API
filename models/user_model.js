'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
	name: {
    type: String,
    required: true
  }, 
  password: {
    type: String,
    required: true
  },
  sid: {
    type: Number
  },
  favClass: {type: String }

});

userSchema.pre('save', function(next) {
	console.log('here!');
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  console.log(this.password);
  next();
});

userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function() {
  return jwt.sign({_id: this._id}, 'CHANGE ME') ;
};

var User = mongoose.model('User', userSchema);
module.exports = User;