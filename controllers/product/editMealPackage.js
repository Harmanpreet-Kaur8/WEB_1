const User = require("../../database/models/User");
const Meal = require("../../database/models/Meal");

module.exports = async (req, res) => {
    let user = null;
    if (req.session.userId) {
        user = await User.findById(req.session.userId).lean();
    }
    let meal = await Meal.findById(req.params.id).lean();
    res.render("product/edit_meal", {
        title: "Edit Meal Package",
        user,
        meal
    })
}