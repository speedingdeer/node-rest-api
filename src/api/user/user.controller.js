import util from '../util';

module.exports.me = function(req, res) {
  return util.responseWithResult(res)({ profile: req.user.profile, token: req.user.token })
}