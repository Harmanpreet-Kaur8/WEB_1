const User = require("../../database/models/User");
const Meal = require("../../database/models/Meal");

module.exports = async (req, res) => {
    let user = null;
    if (req.session.userId) {
        user = await User.findById(req.session.userId);
        user = user.toObject();
    }
    let meal = await Meal.findById(req.params.id).lean();
    meal.mealImage.data = meal.mealImage.data.toString('base64');
    let cart = req.session.cart;
    let available_product = {};
    cart.map(pro => {
        if (pro.product == meal._id) {
            available_product = pro;
        }
    })
    let cart_count = req.session.cart.length;
    res.render("product/view_product", {
        title: "View Products",
        user,
        meal,
        available_product,
        cart_count
    })
}