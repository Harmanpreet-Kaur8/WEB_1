const User = require("../../database/models/User");

module.exports = async (req, res) => {
    let user = null;
    if (req.session.userId) {
        user = await User.findById(req.session.userId);
        user = user.toObject();
    }
    res.render("general/clerk_dashboard", {
        title: "Clerk Dashboard",
        user
    })
}