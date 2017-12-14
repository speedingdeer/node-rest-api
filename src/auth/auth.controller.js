import jwt from 'jsonwebtoken';
import db from '../db';
import config from '../config';

module.exports.token = function(req, res) {
  db.User.findOne({ where: { email: req.body.email } }).then(user => {
    if(!user) {
      return res.status(401).json({ message: 'User not found.' });
    } else {

      if(user.authenticate(req.body.password)) {
        return res.status(200).json({
          // user: Object.assign({}, user.profile, user.token), // we don't send user, user should come from /api/users/me
          token: jwt.sign({ id: user.id }, config.SESSION_SECRET, {
            // let it least forever
            // expiresIn: 60 * 60 * 5 
          })
        });
      } else {
        return res.status(401).json({ message: 'Wrong password.' });
      }
    }
  })
}