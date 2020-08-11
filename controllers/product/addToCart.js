var _ = require('lodash');

module.exports = (req, res) => {
    try {
        product_object = {
            product: req.params.id,
            quantity: req.body.quantity
        }
        if (req.session.cart.length > 0) {
            let item = _.findIndex(req.session.cart, ['product', product_object.product]);
            if (item >= 0) {
                req.session.cart[item].quantity = product_object.quantity;
            }
            else {
                req.session.cart.push(product_object);
            }
        }
        else {
            req.session.cart.push(product_object);
        }
        res.redirect("/product/list")
    } catch (error) {
        console.log(error);
    }
}