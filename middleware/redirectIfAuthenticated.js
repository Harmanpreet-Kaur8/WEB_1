const User = require('../database/models/User')

module.exports = (req, res, next) => {
    if (req.session.userId) {
        req.flash("fail", "Your already logged in.")
        return res.redirect('/')
    }

    next()
}