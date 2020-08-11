var nodemailer = require('nodemailer');
const User = require("../../database/models/User");
const Meal = require("../../database/models/Meal");

module.exports = async (req, res) => {
    let cart = req.session.cart;
    let total = 0;
    let user = await User.findById(req.session.userId);

    let table_data = '';

    cart.forEach(item => {
        let tr = `<tr><td style="border: 1px solid #dddddd;text-align: left;padding: 8px;">${item.name}</td><td style="border: 1px solid #dddddd;text-align: left;padding: 8px;">${item.price}</td><td style="border: 1px solid #dddddd;text-align: left;padding: 8px;">${item.quantity}</td><td style="border: 1px solid #dddddd;text-align: left;padding: 8px;">${item.subtotal}</td></tr>`
        table_data = table_data + tr;
        total = total + item.subtotal;
    })

    req.session.cart = [];

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'southindiancuisine1@gmail.com',
            pass: 'wnjabzmwkwfifwao'
        }
    });
    var mailOptions = {
        from: 'southindiancuisine1@gmail.com',
        to: user.email,
        subject: 'Order Confirmation !...',
        html: `<style>table {background-color: white;font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}tr:nth-child(even) {background-color: #dddddd;}</style><div class="container"><p>Hey ${user.username}, <br> Thanks for Ordering with us, we are happy to serve you.</p><br><h1><u>Your Order Details</u></h1> <br><table><tr><th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Product Name</th><th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Price</th><th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Quantity</th><th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Total</th></tr>${table_data}<tr><td style="border: 1px solid #dddddd;text-align: left;padding: 8px;"></td><td style="border: 1px solid #dddddd;text-align: left;padding: 8px;"></td><th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Total:</th><td style="border: 1px solid #dddddd;text-align: left;padding: 8px;">${total}</td></tr></table></div>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            req.flash("success", "Order placed successfully.")
        }
    });
    res.redirect("/dashboard");
}