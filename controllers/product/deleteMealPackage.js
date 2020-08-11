const Meal = require("../../database/models/Meal");

module.exports = async (req, res) => {
    try {
        await Meal.findByIdAndRemove(req.params.id);
        req.flash("success", "Meal Package Deleted successfully")
        res.redirect("/product/list");
    } catch (error) {
        console.log("[controller:product:storeMealPackage] e", error);
        req.flash("fail", "Failed to Delete Meal Package");
        res.redirect("/product/list");
    }
}