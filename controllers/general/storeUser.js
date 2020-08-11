const User = require('../../database/models/User')

module.exports = async (req, res) => {
    try {
        if (req.body.password != req.body.passwordRepeat) {
            throw new Error(`Confirm password failed`)
        }
        let user = await User.create(req.body);
        req.session.userId = user._id;
        req.session.cart = [];
        if (user.role == "customer") {
            res.redirect('/dashboard')
        }
        else {
            res.redirect("/clerk/dashboard")
        }
    } catch (error) {
        req.flash('fail', "Cannot create a user, please try later.")
        return res.redirect('/register/user')
    }
}