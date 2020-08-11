const Meal = require("../../database/models/Meal");
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
    try {
        let highlight = false;
        if (req.body.highlight) highlight = true;
        const { mealImage } = req.files;
        let imageData = mealImage.data;
        let imageType = mealImage.mimetype
        Meal.create({
            ...req.body,
            mealImage: {
                data: imageData,
                contentType: imageType
            },
            highlight,
            createdBy: req.session.userId
        })
        req.flash("success", "Meal Package added successfully")
        res.redirect("/product/list");
    } catch (error) {
        console.log("[controller:product:storeMealPackage] e", error);
        req.flash("fail", "Failed to add a Meal Package");
        res.redirect("/product/list");
    }
}