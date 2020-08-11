module.exports = (req, res) => {
    req.session.cart = [];
    res.redirect("/mycart");
}