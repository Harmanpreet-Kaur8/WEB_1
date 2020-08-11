const bcrypt = require('bcryptjs')
const User = require('../../database/models/User')

module.exports = (req, res) => {
    const { email, password } = req.body;
    // try to find the user
    User.findOne({ email }, (error, user) => {
        if (user) {
            // compare passwords.
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id;
                    req.session.cart = [];
                    if (user.role == "customer") {
                        res.redirect('/dashboard')
                    }
                    else {
                        res.redirect("/clerk/dashboard")
                    }
                } else {
                    req.flash("fail", "Please check your credentials and try again.")
                    res.redirect('/login')
                }
            })
        } else {
            req.flash("fail", "User does not found.")
            return res.redirect('/login')
        }
    })
}