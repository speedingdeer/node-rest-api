'use strict';

import crypto from 'crypto';

// Salt Password

function genRandomString(length) {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,length);   /** return required number of characters */
}


function sha512(password, salt) {
  var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest('hex');
  return {
    salt: salt,
    password: value
  };
}

function encryptPassword(password, salt = null) {
  if(!salt) { salt = genRandomString(16); } 
  return sha512(password, salt);
}


export default function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'The specified email address is already in use.'
      },
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    salt: DataTypes.STRING

  }, {
    /**
     * Virtual Getters
     */
    getterMethods: {
      // Public profile information
      profile: function() {
        return {
          'email': this.email,
          'role': this.role
        };
      },

      // Non-sensitive info we'll be putting in the token
      token: function() {
        return {
          'id': this.id,
          'role': this.role
        };
      }

    },


    hooks: {

      beforeBulkCreate: function(users) { // eslint-disable-line no-unused-vars
        // @TODO:
        // make sure all passwords are hashed
      },
      beforeCreate: function(user) {
        Object.assign(user, encryptPassword(user.password, user.salt));
      },
      beforeUpdate: function(user) {
        if (user.changed('password')) {
           Object.assign(user, encryptPassword(user.password, user.salt));
        }
      }

    },

  });

  User.prototype.authenticate = function(password) {
    return this.password === encryptPassword(password, this.salt).password;
  };

  return User;

}
