module.exports.me =  async (req, res, next) => {
  try {
    res.json({ profile: req.user.profile, token: req.user.token })
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }
}