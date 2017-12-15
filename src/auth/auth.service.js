
export function authRequired(role = null) {
  return function (req, res, next) {
    if(!req.user) { return res.status(401).send('Unauthorized'); } // not logged in
    if(!role) { return next(); } // any loggged in
    if(req.user.role === role) { return next(); } // role matchs
    res.status(403).send('Forbidden'); // Forbidden
  }
}