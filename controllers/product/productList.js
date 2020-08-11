const User = require("../../database/models/User");
const Meal = require("../../database/models/Meal");

module.exports = async (req, res) => {
    let user = null;
    if (req.session.userId) {
        user = await User.findById(req.session.userId);
        user = user.toObject();
    }
    let cart_count;
    if (req.session.cart) {
        cart_count = req.session.cart.length;
    }
    let meals = await Meal.find().lean();
    meals.map(meal => {
        meal.mealImage.data = meal.mealImage.data.toString('base64');
    })
    res.render("product/prolisting", {
        title: "Products List",
        user,
        meals,
        cart_count
    })
}