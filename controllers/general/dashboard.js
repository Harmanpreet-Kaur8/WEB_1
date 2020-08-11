const User = require("../../database/models/User");

module.exports = async (req, res) => {
    let user = null;
    if (req.session.userId) {
        user = await User.findById(req.session.userId);
        user = user.toObject();
    }
    let cart_count = req.session.cart.length;
    res.render("general/dashboard", {
        title: "Dashboard",
        user,
        cart_count
    })
}