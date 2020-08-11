const User = require("../../database/models/User");
const Meal = require("../../database/models/Meal");

module.exports = async (req, res) => {
    let total = 0;
    let user = null;
    if (req.session.userId) {
        user = await User.findById(req.session.userId);
        user = user.toObject();
    }
    let cart = req.session.cart;
    for (i = 0; i < cart.length; i++) {
        let meal = await Meal.findById(cart[i].product);
        cart[i].name = meal.name;
        cart[i].price = meal.price;
        cart[i].subtotal = parseInt(meal.price) * parseInt(cart[i].quantity);
        total = total + cart[i].subtotal;
    }
    let cart_count = req.session.cart.length;
    res.render("product/cart", {
        title: "My Cart",
        user,
        cart,
        total,
        cart_count
    })
}